<template>
  <NavPanel :timer="10">
      <span class="page-header">{{title}}</span>
  </NavPanel>
  <div style="display: flex; flex-direction: column; width: 100%; height: 100%; gap: 10px; align-items: center; ">
    <component :is="currentQuery" @input-sent="onSendMessageButtonClicked" v-bind="passProps"></component>
  </div>
</template>

<script lang="ts">
import NavPanel from '../components/layout/NavPanel.vue';
import { defineComponent, type Ref, ref } from 'vue'
import { Subscription } from 'centrifuge';
import { markRaw } from 'vue';
import { mapState } from 'pinia';
import useCentrifugeStore from '../stores/centrifugeStore';
import useUserStore from '../stores/userStore';

import PartyQueryDefault from './PartyQueryDefault.vue';
import PartyQueryAll from './PartyQueryAll.vue';

export default defineComponent({
  name: 'Play',

  computed: {
    ...mapState(useCentrifugeStore, ['usersOnline', 'centrifuge', 'owner', 'roomSub']),
    ...mapState(useUserStore, ['username']),
    passProps() {
      // if (this.currentQuery === 'TextInput') {
      //   return {title: "123", description: "12345"}
      // }

      return {}
    },
  },

  data() {
    return {
    //   currentComponent: ref('TextInput') as Ref<string>,
      userInput: ref('') as Ref<string>,
      roomCode: "" as string,
      roomIdInput: ref('') as Ref<string>,
      msgInput: ref('') as Ref<string>,
      inputType: "" as string,
      step: -1,
      currentQuery: markRaw(PartyQueryDefault),
      title: "" as string
    }
  },
  components: {
    NavPanel
  },
  methods: {
    onSendMessageButtonClicked(): void {
      if (!this.owner) {
        this.centrifuge?.send({type: "input", 
          content: {type: this.inputType, step: this.step, message: this.msgInput}
        })
      } else {
        this.centrifuge?.send(null)
      }
    },
  },

  mounted() {
    this.roomSub?.on('publication', (response: any) => {
      console.log(response.data)
      
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