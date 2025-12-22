<template>
  <section class="pq-leader-section">
    <p class="pq-section-text">{{ msg }}</p>
    <div class="leader-info">
      <img
        src="@/assets/avatar_nav.svg"
        alt=""
        class="leader-avatar"
        v-if="!username"
      />
      <Identicon :username="username" class="leader-avatar" v-else />
      <span class="pq-section-title">{{ username }}</span>
      <span class="pq-section-title">Побед: {{ wins }}</span>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Identicon from "@/components/ui/Identicon.vue";

export default defineComponent({
  name: "PartyQueryLeader",
  data() {
    return {};
  },
  components: {
    Identicon,
  },
  props: {
    msg: {
      type: String as () => string,
      default:
        "Это для вывода пользовательского контента. Это для вывода пользовательского контента. Это для вывода пользовательского контента",
    },
    username: {
      type: String as () => string,
      default: "Пользователь 1",
    },
    wins: {
      type: Number as () => number,
      default: 0,
    },
  },
});
</script>

<style>
.pq-leader-section {
  color: var(--primary);
  display: flex;
  height: 86vh;
  width: 100%;
  align-items: center;
  gap: 60px;
  padding: 0px 150px;
}

.pq-leader-section .pq-section-text {
  font-size: 36px;
  text-align: right;
}

.pq-leader-section .pq-section-title {
  font-size: 40px;
  text-align: center;
}
.pq-leader-section .leader-info {
  width: auto;
  display: flex;
  flex-direction: column;
  gap: 34px;
  padding: 0px 90px;
  text-align: center;
}
.pq-leader-section .leader-avatar {
  background: var(--primary-container);
  border-radius: 50%;
  height: 345px;
  aspect-ratio: 1;
}
</style>
