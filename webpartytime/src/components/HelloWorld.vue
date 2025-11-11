<script setup lang="ts">
import { ref } from 'vue'
import { motion } from 'motion-v'


defineProps<{ msg: string }>()

const dragConstraints = ref(undefined)
const count = ref(0)
</script>

<template>
  <div ref="dragConstraints" style="width: 500px; height: 300px;">
    <motion.h1
      drag
      :drag-constraints="dragConstraints"
      :drag-elastic="0.5"
      :initial="{ opacity: 0 }" :animate="{ opacity: 1, transition: { duration: 0.3 } }"
      :whileHover="{ scale: 1.5 }">
        {{ msg }}
    </motion.h1>
  </div>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>
</template>

<style scoped>
</style>
