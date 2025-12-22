<template>
  <section class="pq-winner-section">
    <p class="pq-section-text">{{ msg }}</p>
    <div class="winner-info">
      <img
        src="@/assets/avatar_nav.svg"
        alt=""
        class="winner-avatar"
        v-if="!username"
      />
      <Identicon :username="username" class="winner-avatar" v-else />
      <span class="pq-section-title">{{ username }}</span>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Identicon from "@/components/ui/Identicon.vue";

export default defineComponent({
  name: "PartyQueryWinner",
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
  },
});
</script>

<style>
.pq-winner-section {
  display: flex;
  height: 86vh;
  width: 100%;
  align-items: center;
  gap: 60px;
  padding: 0px 150px;
  color: var(--primary);
}

.pq-winner-section .pq-section-text {
  font-size: 36px;
  margin: 0;
  text-align: right;
}

.pq-winner-section .pq-section-title {
  font-size: 40px;
  text-align: center;
}
.pq-winner-section .winner-info {
  width: auto;
  display: flex;
  flex-direction: column;
  gap: 34px;
  padding: 0px 90px;
  text-align: center;
}
.pq-winner-section .winner-avatar {
  height: 345px;
  aspect-ratio: 1;
  background: var(--primary-container);
  border-radius: 50%;
}
</style>
