<template>
  <div class="pq-text">
    <div class="main-section">
      <h1>{{ title }}</h1>
      <h2>{{ msg }}</h2>
      <div class="input-form">
        <input id="input-text" v-model="input" type="text" required />
        <label for="input-text">Ответ</label>
      </div>
    </div>
    <PrimaryButton @click="$emit('onsend', input)">Отправить</PrimaryButton>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PrimaryButton from "@/components/ui/PrimaryButton.vue";

import useCentrifugeStore from "../stores/centrifugeStore";
import { mapState } from "pinia";

export default defineComponent({
  name: "PartyQueryText",
  data() {
    return {
      input: "" as string
    };
  },

  emits: ['onsend'],

  computed: {
    ...mapState(useCentrifugeStore, ['centrifuge', 'owner'])
  },

  components: {
    PrimaryButton,
  },

  props: {
    title: {
      type: String as () => string,
      default: "",
    },

    msg: {
      type: String as () => string,
      default: "",
    },
  },
});
</script>

<style>
.pq-text {
  display: flex;
  gap: 130px;
  padding: 100px 42px;
  align-items: center;
  flex-direction: column;
}

.pq-text .main-section {
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: center;
}

.pq-text .main-section h1,
h2 {
  margin: 0;
  color: var(--primary);
  font-weight: 800;
}

.pq-text .main-section h1 {
  font-size: 40px;
}

.pq-text .main-section h2 {
  font-size: 32px;
}

.pq-text .input-form {
  position: relative;
}

.pq-text .input-form input {
  width: 210px;
  padding: 16px;
  border-radius: var(--input-border-radius);
  border: var(--border);
  background: transparent;
  transition: 0.3s;
}

.pq-text .input-form label {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  background: white;
  padding: 0 4px;
  color: #999;
  transition: 0.3s;
  pointer-events: none;
}

.pq-text .input-form input:focus,
.pq-text .input-form input:not(:placeholder-shown) {
  border-color: var(--on-surface-variant);
}

.pq-text .input-form input:focus + label,
.pq-text .input-form input:not(:placeholder-shown) + label {
  top: 0;
  font-size: 12px;
  color: var(--on-surface-variant);
  font-weight: 400;
}
</style>
