<template>
  <h2 class="pq-section-title" style="text-align: center; margin: 15px 0px 0px">
    {{ title }}
  </h2>
  <section class="pq-vote-section">
    <div
      class="user-card"
      v-for="participant in participants"
      :key="participant.id"
    >
      <div class="user-info">
        <img
          src="@/assets/avatar_nav.svg"
          alt=""
          class="user-avatar"
          v-if="!participant.username"
        />
        <Identicon
          :username="participant.username"
          class="user-avatar"
          v-else
        />
        <p class="user-name">{{ participant.username }}</p>
      </div>
      <p class="user-content">{{ participant.msg }}</p>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
import Identicon from "../components/ui/Identicon.vue";

interface Participant {
  id: number;
  username: string;
  msg: string;
}

export default defineComponent({
  name: "PartyQueryVote",
  data() {
    return {};
  },
  components: {
    Identicon,
  },
  props: {
    title: {
      type: String as () => string,
      default: "Заголовок для голосования",
    },
    participants: {
      type: Array as PropType<Participant[]>,
      required: true,
      default: () => [
        {
          id: 0,
          username: "Пользователь 5",
          msg: "Это для вывода пользовательского контента",
        },
        {
          id: 1,
          username: "Пользователь 5",
          msg: "Это для вывода пользовательского контента",
        },
        {
          id: 2,
          username: "Пользователь 5",
          msg: "Это для вывода пользовательского контента",
        },
        {
          id: 3,
          username: "Пользователь 5",
          msg: "Это для вывода пользовательского контента",
        },
        {
          id: 4,
          username: "Пользователь 5",
          msg: "Это для вывода пользовательского контента",
        },
        {
          id: 5,
          username: "Пользователь 5",
          msg: "Это для вывода пользовательского контента",
        },
        {
          id: 6,
          username: "Пользователь 5",
          msg: "Это для вывода пользовательского контента",
        },
        {
          id: 7,
          username: "Пользователь 5",
          msg: "Это для вывода пользовательского контента",
        },
      ],
    },
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

.pq-vote-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  height: 80vh;
  width: 100%;
  padding: 5px 40px 20px;
  align-items: center;
}

.pq-vote-section .user-card {
  margin: 0px 15px;
  border: 5px solid var(--primary);
  border-radius: 16px;
  padding: 0px 25px 15px;
  height: 90%;
}

.pq-vote-section .user-card .user-info {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
  border-bottom: var(--border-variant);
  margin-bottom: 15px;
}

.pq-vote-section .user-card .user-info .user-avatar {
  background: var(--primary-container);
  border-radius: 50%;
  width: 46px;
  height: 46px;
}

.pq-vote-section .user-card .user-info .user-name {
  font-size: 20px;
  color: var(--primary);
  font-weight: 700;
}

.pq-vote-section .user-card .user-content {
  font-size: 20px;
  color: var(--primary);
  font-weight: 700;
  margin: 0;
}
</style>
