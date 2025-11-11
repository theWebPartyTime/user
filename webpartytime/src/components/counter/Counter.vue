<template>
  <div>
    <p>Online: {{ count }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Centrifuge } from 'centrifuge';

export default defineComponent({
  name: 'Counter',
  
  data() {
    return {
      count: 0 as number,
      centrifuge: null as Centrifuge | null,
      onlineCountSub: null as any
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

      this.centrifuge.connect()
    },

    disconnectCentrifuge(): void {
      if (this.onlineCountSub) {
        this.onlineCountSub.unsubscribe()
      }
      if (this.centrifuge) {
        this.centrifuge.disconnect()
      }
    }
  },

  mounted(): void {
    this.initializeCentrifuge()
  },

  beforeUnmount(): void {
    this.disconnectCentrifuge()
  }
})
</script>