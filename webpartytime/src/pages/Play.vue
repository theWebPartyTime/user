<template>
  <div style="display: flex; flex-direction: column; width: 100%; gap: 10px; align-items: center; ">
    <p>Онлайн: {{ count }}</p>
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>

    <!-- <component :is="currentComponent" @input-sent="onSendMessageButtonClicked" v-bind="passProps"></component> -->

    <br/>

    <label>Код комнаты: {{ roomID }}</label>
    <input type="button" @click="onMakeRoomButtonClicked" value="Создать комнату" />
    <input type="button" @click="onStartRoom" value="Начать игру" />

    <br/>

    <input type="text" v-model="roomIdInput"></input>
    <input type="button" @click="onJoinRoomButtonClicked" value="Присоединиться к комнате" />

    <br/>

    <input type="text" v-model="msgInput">
    <input type="button" @click="onSendMessageButtonClicked" value="Отправить сообщение" />

    <br/>

    <p>{{ serverMsg }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, type Ref, ref } from 'vue'
import { Centrifuge } from 'centrifuge';

export default defineComponent({
  name: 'Counter',

  computed: {
    passProps() {
      if (this.currentComponent === 'TextInput') {
        return {title: "123", description: "12345"}
      }

      return {}
    }
  },

  data() {
    return {
    //   currentComponent: ref('TextInput') as Ref<string>,
      userInput: ref('') as Ref<string>,
      count: 0 as number,
      title: "Заголовок" as string,
      description: "Описание" as string,
      roomID: "" as string,
      serverMsg: "" as string,
      roomIdInput: ref('') as Ref<string>,
      msgInput: ref('') as Ref<string>,
      items: [] as any,
      centrifuge: null as Centrifuge | null,
      main: null as any,
      roomSubscription: null as any,
    }
  },

  methods: {
    initializeCentrifuge(): void {
      this.centrifuge = new Centrifuge("ws://localhost:8080/join")

      this.main = this.centrifuge.newSubscription('main')
      this.main.subscribe()

      this.main.on('join', () => {
        this.count += 1
      })

      this.main.on('leave', () => {
        this.count -= 1
      })

      this.centrifuge.connect()
    },

    disconnectCentrifuge(): void {},

    onMakeRoomButtonClicked(): void {
      this.centrifuge?.rpc("createRoom", {}).then(response => {
        this.roomID = response.data
        this.roomSubscription = this.centrifuge?.newSubscription("watch@" + this.roomID)
        this.setPublicationCallback()
      })
    },

    onStartRoom(): void {
        this.centrifuge?.rpc("startRoom", {}).then(response => {
          if (response.data == true) console.log("Room started")
        })
    },

    onJoinRoomButtonClicked(): void {
      this.roomSubscription = this.centrifuge?.newSubscription("play@" + this.roomIdInput)
      this.roomID = this.roomIdInput
      this.setPublicationCallback()
    },

    setPublicationCallback() {
      this.roomSubscription.subscribe()
      this.roomSubscription.on('publication', (response: any) => {
        console.log(response.data)
        // this.title = response.data.title
        // this.description = response.data.description
      })
    },

    onSendMessageButtonClicked(input: String): void {
      this.centrifuge?.send(input)
    }
  },

  mounted(): void {
    this.initializeCentrifuge()
  },

  beforeUnmount(): void {
    this.disconnectCentrifuge()
  },
})
</script>