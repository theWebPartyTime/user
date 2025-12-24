<template>
  <NavPanel>
      <span class="page-header">{{title}}</span>
  </NavPanel>
  <div style="display: flex; flex-direction: column; width: 100%; gap: 10px; align-items: center; ">
    <p>Онлайн: {{ usersOnline }}</p>

    <!-- <component :is="currentComponent" @input-sent="onSendMessageButtonClicked" v-bind="passProps"></component> -->

    <br/>

    <label>Код комнаты: {{ roomCode }}</label>
    <input type="button" @click="onCreateRoom" value="Создать комнату" />
    <input type="button" @click="onStartRoom" value="Начать игру" />

    <br/>

    <input type="text" v-model="roomIdInput"></input>
    <input type="button" @click="onJoinRoom(false)" value="Присоединиться к комнате" />
    <input type="button" @click="onJoinRoom(true) " value="Присоединиться к комнате (как зритель)" />

    <br/>

    <input type="text" v-model="msgInput"></input>
    <input type="button" @click="onSendMessageButtonClicked" value="Отправить сообщение" />
  </div>
</template>

<script lang="ts">
import NavPanel from '../components/layout/NavPanel.vue';
import { defineComponent, type Ref, ref } from 'vue'
import { Subscription } from 'centrifuge';
import useCentrifugeStore from '../stores/centrifugeStore';
import { useUserStore } from '../stores/userStore';
import { mapState } from 'pinia';

export default defineComponent({
  name: 'Play',

  computed: {
    ...mapState(useCentrifugeStore, ['usersOnline', 'centrifuge']),
    ...mapState(useUserStore, ['user']),
    passProps() {
      // if (this.currentComponent === 'TextInput') {
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
      owner: false,
      msgInput: ref('') as Ref<string>,
      inputType: "" as string,
      step: -1,
      roomSubscription: undefined as Subscription | undefined,
      title: "Заголовок" as string
    }
  },
  components: {
    NavPanel
  },
  methods: {
    onCreateRoom(): void {
      this.centrifuge?.rpc("createRoom", {hash: "minimal.webparty"}).then(response => {
        const roomCode = response.data.code
        this.roomSubscription = this.centrifuge?.newSubscription("watch@" + roomCode)
        this.owner = true
        this.setPublicationCallback(roomCode)
      })
    },

    onStartRoom(): void {
        this.centrifuge?.rpc("startRoom", null).then(response => {
          if (response.data == true) console.log("Room started")
        })
    },

    onJoinRoom(watchMode: boolean): void {
      const mode = watchMode ? "watch@" : "play@"
      this.roomSubscription = this.centrifuge?.newSubscription(mode + this.roomIdInput)
      this.owner = false
      this.setPublicationCallback(this.roomIdInput)
    },

    onMessage(): void {
        this.centrifuge?.on('message', (response: any) => {
          console.log(response)
        })
    },

    setPublicationCallback(roomCode: string) {
      this.roomSubscription?.subscribe()

      this.roomSubscription?.on('subscribed', () => {
        this.roomCode = roomCode
      })

      this.roomSubscription?.on('unsubscribed', () => {
        this.centrifuge?.removeSubscription(this.roomSubscription as Subscription)
      })

      this.roomSubscription?.on('publication', (response: any) => {
        console.log(response.data)

        if (response.data != null) {
          this.step = response.data["step"]
          this.inputType = response.data["type"]
        }
      })
    },

    onSendMessageButtonClicked(): void {
      if (!this.owner) {
        this.centrifuge?.send({step: this.step, content: this.msgInput, type: this.inputType})
      } else {
        this.centrifuge?.send(null)
      }
    }
  },
})
</script>