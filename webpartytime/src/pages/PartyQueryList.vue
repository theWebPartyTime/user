<template>
  <div class="pq-list-section">
    <h2 class="pq-section-title">{{ title }}</h2>
    <ul class="section-items">
      <li v-for="item in items" class="list-item">{{ item }}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import type { PropType } from "vue";
export default defineComponent({
  name: "PartyQueryList",
  data() {
    return {};
  },
  props: {
    title: {
      type: String as () => string,
      default: "Заголовок запроса",
    },
    items: {
      type: Array as PropType<string[]>,
      default: () => [
        "Текст пункта",
        "Текст пункта",
        "Текст пункта",
        "Текст пункта",
        "Текст пункта",
        "Текст пункта",
      ],
    },
  },
});
</script>

<style>
.pq-list-section {
  color: var(--primary);
  height: 86vh;
  padding-top: 75px;
}

.pq-list-section .pq-section-title {
  font-size: 40px;
  font-weight: 800;
  text-align: center;
}

.pq-list-section .section-items {
  margin: 30px 100px 0px;
}

.pq-list-section .section-items .list-item {
  color: var(--primary);
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 24px;
}
</style>
