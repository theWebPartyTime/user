<template>
  {{timeSinceCreated }}
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "pinia";
import useCentrifugeStore from "../../stores/centrifugeStore";

export default defineComponent({
  name: "CreatedTimer",
  data() {
    return {
        timer: undefined as number | undefined,
        timeSinceCreated: "00:00:00" as String,
    };
  },

  computed: {
    ...mapState(useCentrifugeStore, ["roomCreatedAt"])
  },

  methods: {
    updateTime() {
      const now = new Date()
      now.setMinutes(now.getMinutes() + now.getTimezoneOffset())
      const difference = new Date((Number(now) - Number(this.roomCreatedAt)))
      this.timeSinceCreated = difference.toTimeString().split(' ')[0] as string
    }
  },

  mounted() {
    this.updateTime()
    this.timer = setInterval(() => {this.updateTime()}, 1000)
  },

  unmounted() {
    if (this.timer != undefined) {
        clearInterval(this.timer)
    }
  }
});
</script>