<template>
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
import { defineComponent, type Ref, ref } from 'vue'
import { Subscription } from 'centrifuge';
import useCentrifugeStore from '../stores/centrifugeStore';
import useUserStore from '../stores/userStore';
import { mapState } from 'pinia';

export default defineComponent({
  name: 'Play',

  computed: {
    ...mapState(useCentrifugeStore, ['usersOnline', 'centrifuge']),
    ...mapState(useUserStore, ['username']),
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
    }
  },

  methods: {
    onCreateRoom(): void {
      this.centrifuge?.rpc("createRoom", {hash: "minimal.webparty"}).then(response => {
        this.centrifuge?.removeSubscription(this.roomSubscription as Subscription)
        const roomCode = response.data.code
        this.roomSubscription = this.centrifuge?.newSubscription(
          "watch@" + roomCode, {data: this.username})
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
      this.centrifuge?.removeSubscription(this.roomSubscription as Subscription)
      const mode = watchMode ? "watch@" : "play@"
      this.roomSubscription = this.centrifuge?.newSubscription(
        mode + this.roomIdInput,
        {data: this.username}
      )

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
        console.log("subscribed to: " + roomCode)
      })

      this.roomSubscription?.on('unsubscribed', () => {
        
        console.log("unsubscribed from: " + this.roomSubscription?.channel)
      })

      this.roomSubscription?.on('publication', (response: any) => {
        console.log(response.data)
        
        if (response.data.type == "unsubscribe") {
          this.roomSubscription?.unsubscribe()
        } else if (response.data != null) {
          this.step = response.data["step"]
          this.inputType = response.data["type"]
        }
      })
    },

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
    this.onMessage()
  },
})
</script>