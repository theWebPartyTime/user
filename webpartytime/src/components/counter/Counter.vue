<template>
  <div>
    <p>Угадай число от 0 до 10</p>
    <p>Online: {{ count }}</p>

    <br/>

    <input type="button" @click="onMakeRoomButtonClicked" value="Создать комнату" />
    <label>Номер комнаты: {{ roomId }}</label>
    
    <br/>

    <input type="text" v-model="roomIdInput"></input>
    <input type="button" @click="onJoinRoomButtonClicked" value="Присоединиться к комнате" />

    <br/>

    <input type="text" v-model="msg"></input>
    <input type="button" @click="onSendMessageButtonClicked" value="Отправить сообщение" />

    <br/>

    <p>Чат</p>
    <p v-for="(item, index) in items" :key="index">{{ item }}</p>

    <br/>

    <p>{{ serverMsg }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, type Ref, ref } from 'vue'
import { Centrifuge } from 'centrifuge';

export default defineComponent({
  name: 'Counter',
  
  data() {
    return {
      count: 0 as number,
      roomId: "#" as string,
      serverMsg: "" as string,
      roomIdInput: ref('') as Ref<string>,
      msg: ref('') as Ref<string>,
      items: [] as any,
      centrifuge: null as Centrifuge | null,
      onlineCountSub: null as any,
      gameRoomSub: null as any,
    }
  },

  methods: {
    initializeCentrifuge(): void {
      this.centrifuge = new Centrifuge("ws://localhost:8080/w")
      this.onlineCountSub = this.centrifuge.newSubscription('online-count')

      this.onlineCountSub.subscribe()
      
      this.onlineCountSub.on('publication', () => {
        this.onlineCountSub.presence().then((data: any) => {
          this.count = Object.keys(data['clients']).length
        })
      })

      this.onlineCountSub.presence().then((data: any) => {
        this.count = Object.keys(data['clients']).length
      })

      this.centrifuge.on('message', (context) => {
        this.serverMsg = context.data
      })

      this.centrifuge.connect()
    },

    disconnectCentrifuge(): void {
      if (this.onlineCountSub) {
        this.onlineCountSub.unsubscribe()
      }
      if (this.centrifuge) {
        this.centrifuge.disconnect()
      }
    },

    onMakeRoomButtonClicked(event: MouseEvent): void {
      this.roomId = String.fromCharCode(Math.floor(Math.random() * 26) + 97)
      this.gameRoomSub = this.centrifuge?.newSubscription(this.roomId)
      this.gameRoomSub.subscribe()
      this.setPublicationCallback()
    },

    onJoinRoomButtonClicked(event: MouseEvent): void {
      this.gameRoomSub = this.centrifuge?.newSubscription(this.roomIdInput)
      this.gameRoomSub.subscribe()
      this.roomId = this.roomIdInput
      this.setPublicationCallback()
    },

    setPublicationCallback() {
      this.gameRoomSub.on('publication', (context: any) => {
        console.log(context.data)
        var displayedMessage = ""
        if (context.data["Presenter"]) {
          displayedMessage += "ведущий -> "
        }
        displayedMessage += context.data["Message"] 
        this.items.push(displayedMessage)
      })
    },

    onSendMessageButtonClicked(event: MouseEvent): void {
      this.centrifuge?.publish(this.roomId, {"Message": this.msg, "Presenter": false})
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