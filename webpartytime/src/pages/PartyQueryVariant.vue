<template>
  <section class="pq-variant-section">
    <h2 class="pq-section-title">{{ title }}</h2>
    <p class="pq-section-text">{{ question }}</p>
    <div class="variants">
      <PrimaryButton v-for="response in responseOptions">{{
        response
      }}</PrimaryButton>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PrimaryButton from "@/components/ui/PrimaryButton.vue";
import type { PropType } from "vue";
export default defineComponent({
  name: "PartyQueryVariant",
  data() {
    return {};
  },
  components: {
    PrimaryButton,
  },
  props: {
    title: {
      type: String as () => string,
      default: "Заголовок запроса",
    },
    question: {
      type: String as () => string,
      default: "Тут должен быть вопрос викторины",
    },
    responseOptions: {
      type: Array as PropType<string[]>,
      default: () => ["Вариант 1", "Вариант 2", "Вариант 3"],
    },
  },
});
</script>

<style>
.pq-variant-section {
  height: 86vh;
  width: 100%;
  padding: 80px 42px 0px 42px;
  text-align: center;
  color: var(--primary);
}
.pq-variant-section .pq-section-title {
  margin: 0px 0px 30px;
  font-size: 40px;
  color: var(--primary);
  font-weight: 800;
}

.pq-variant-section .pq-section-text {
  margin: 0px 0px 30px;
  font-size: 32px;
  color: var(--primary);
  font-weight: 800;
}

.pq-variant-section .variants {
  margin-top: 250px;
  display: flex;
  justify-content: center;
  gap: 54px;
}
.pq-variant-section .variants a {
  padding: 20px 90px;
}
</style>
