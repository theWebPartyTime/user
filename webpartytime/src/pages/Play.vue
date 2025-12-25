<template>
  <NavPanel v-bind="getTimer">
      <span class="page-header">{{title}}</span>
  </NavPanel>
  <div style="display: flex; flex-direction: column; width: 100%; height: 100%; gap: 10px; align-items: center; ">
    <component :is="getQueryComponent" @onsend="(e: any) => {sendInput(e, inputType, step)}" v-bind="getQueryProps"></component>
  </div>
</template>

<script lang="ts">
import NavPanel from '../components/layout/NavPanel.vue';
import { defineComponent, type Ref, ref } from 'vue'
import { markRaw } from 'vue';
import { mapState, mapActions } from 'pinia';
import useCentrifugeStore from '../stores/centrifugeStore';
import PartyQueryDefault from './PartyQueryDefault.vue';
import PartyQueryMultimedia from './PartyQueryMultimedia.vue';
import PartyQueryList from './PartyQueryList.vue';
import PartyQueryText from './PartyQueryText.vue';
import PartyQueryAll from './PartyQueryAll.vue';
import type { Participant } from './PartyQueryAll.vue';
import { useUserStore } from '../stores/userStore';

export default defineComponent({
  name: 'Play',

  computed: {
    ...mapState(useCentrifugeStore, ['usersOnline', 'centrifuge', 'roomSub', 'owner', 'nicknameMappings']),
    ...mapState(useUserStore, ['user']),

    getTimer() {
      return {timer: this.timer as number} 
    },

    getInputMetadata() {
      const inputType = this.queryData["type"] as string
      const step = this.queryData["step"] as number
      return {inputType: inputType, step: step}
    },

    getQueryProps() {
      const queryType = this.queryData["type"] as string
      if ("timer" in this.queryData) {
        this.timer = this.queryData["timer"]
      }

      switch (queryType) {
      default:
        return {}

      case "list":
        return {title: this.queryData["title"] as string, items: this.queryData["items"] as string[]}

      case "text":
        return {title: this.queryData["title"] as string, msg: this.queryData["msg"] as string}

      case "overviewer winner":
        let winners: Participant[] = []
        for (const [key, value] of Object.entries(this.queryData["winners"])) {
          const winnerData: any = value
          winners.push({id: key, username: this.nicknameMappings["all"][key] as string, 
            winCount: winnerData["winCount"] as number, msg: winnerData["lastInput"] as string})
        }

        return {participants: winners}

      case "vote all":
        let candidates: Participant[] = []
        for (const [key, value] of Object.entries(this.queryData["candidates"])) {
          const candidateData: any = value
          candidates.push({id: key, username: this.nicknameMappings["all"][key] as string, 
            winCount: -1, msg: candidateData as string})
        }

        return {participants: candidates}

      case "multimedia":
        let multimediaProps = {title: this.queryData["title"] as string, 
          msg: this.queryData["msg"] as string,
          image: ""}

        if ("image" in this.queryData) {
          multimediaProps.image = this.queryData["image"] as string
        }

        return multimediaProps
      }
    },
    
    getQueryComponent() {
      const queryType = this.queryData["type"] as string
      switch (queryType) {
      default:
        return markRaw(PartyQueryDefault)

      case "list":
        return markRaw(PartyQueryList)

      case "text":
        return markRaw(PartyQueryText)
        
      case "overviewer winner":
          return markRaw(PartyQueryAll)

      case "vote all":
          return markRaw(PartyQueryAll)

      case "multimedia":
        return markRaw(PartyQueryMultimedia)
      }

    },
  },

  data() {
    return {
      userInput: ref('') as Ref<string>,
      roomCode: "" as string,
      roomIdInput: ref('') as Ref<string>,
      msgInput: ref('') as Ref<string>,
      inputType: "" as string,
      queryData: {} as any,
      step: -1,
      timer: -1,
      currentQuery: markRaw(PartyQueryDefault) as any,
      title: "" as string
    }
  },
  components: {
    NavPanel,
  },

  methods: {
    ...mapActions(useCentrifugeStore, ['sendInput'])
  },

  mounted() {
    this.roomSub?.on('publication', (response: any) => {
      console.log(response.data)
      this.queryData = response.data

      if (response.data.type == "unsubscribe") {
        this.roomSub?.unsubscribe()
      } else if (response.data != null) {
        this.step = response.data["step"]
        this.inputType = response.data["type"]
      }
    })
  }
})
</script>