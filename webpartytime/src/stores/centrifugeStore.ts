import { defineStore } from 'pinia'
import { Centrifuge, Subscription } from 'centrifuge'

interface CentrifugeState {
  centrifuge: Centrifuge | null,
  usersOnline: number,
  mainChannel: Subscription | null
}

export const useCentrifugeStore = defineStore('centrifuge', {
  state: (): CentrifugeState => ({
    usersOnline: 0,
    centrifuge: null,
    mainChannel: null
  }),
  
  actions: {
    connect(): void {
      this.centrifuge = new Centrifuge("ws://localhost:8080/join")

      this.mainChannel = this.centrifuge.newSubscription('main')
      this.mainChannel?.subscribe()

      this.mainChannel.presenceStats().then((result) => {
        this.usersOnline = result.numClients
      })

      this.mainChannel.on('join', () => {
        this.usersOnline += 1
      }) 

      this.mainChannel.on('leave', () => {
        this.usersOnline -= 1
      })

      this.centrifuge.connect()
    }
  }
})

export default useCentrifugeStore
