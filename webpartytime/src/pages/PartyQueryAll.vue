<template>
  <h2 class="pq-section-title" style="text-align: center; margin-top: 15px">
    <span v-if="participants.length > 0">Текущие успехи</span>
    <span v-else>Пока что правильных ответов не было</span>
  </h2>
  <section class="pq-all-section">
    <div class="user-card" v-for="participant in participants" :key="participant.id" @click="$emit('onsend', participant.id)">
      <div class="user-info">
        <Identicon
          :username="participant.username"
          class="user-avatar"
        />
        <p class="user-name">{{ participant.username }}</p>
        <p class="user-name" v-if="participant.winCount != -1">{{ participant.winCount }}</p>
      </div>
      <p class="user-content">{{ participant.msg }}</p>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import Identicon from "@/components/ui/Identicon.vue";

export interface Participant {
  id: string;
  username: string;
  winCount: number;
  msg: string;
}

export default defineComponent({
  name: "PartyQueryAll",
  data() {
    return {};
  },

  emits: ['onsend'],

  props: {
    participants: {
      type: Array as PropType<Participant[]>,
      required: true,
    },
  },
  
  components: {
    Identicon,
  },
});
</script>

<style>
.pq-section-title {
  font-size: 40px;
  color: var(--primary);
  font-weight: 800;
}

.pq-section-text {
  font-size: 32px;
  color: var(--primary);
  font-weight: 800;
}

.pq-all-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  height: 80vh;
  width: 100%;
  padding: 5px 40px 20px;
  align-items: center;
}

.pq-all-section .user-card {
  margin: 0px 15px;
  border: 5px solid var(--primary);
  border-radius: 16px;
  padding: 0px 25px 15px;
  height: 90%;
}

.pq-all-section .user-card .user-info {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
  border-bottom: var(--border-variant);
  margin-bottom: 15px;
}

.pq-all-section .user-card .user-info .user-avatar {
  background: var(--primary-container);
  border-radius: 50%;
  width: 46px;
  height: 46px;
}

.pq-all-section .user-card .user-info .user-name {
  font-size: 20px;
  color: var(--primary);
  font-weight: 700;
}

.pq-all-section .user-card .user-content {
  font-size: 20px;
  color: var(--primary);
  font-weight: 700;
  margin: 0;
}
</style>
