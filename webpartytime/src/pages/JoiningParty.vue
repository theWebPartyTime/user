<template>
  <div class="joining-party">
    <h1>Код комнаты</h1>
    <div class="code-container" @click="focusHiddenInput">
      <div class="dashes-wrapper">
        <div
          v-for="i in 9"
          :key="i"
          class="dash"
          :class="{
            'dash-filled': code[i - 1],
            'dash-active': activeIndex === i - 1,
          }"
        >
          <span class="dash-digit">{{ code[i - 1] }}</span>
          <div
            v-if="activeIndex === i - 1 && isFocused"
            class="dash-cursor"
          ></div>
        </div>
      </div>

      <!-- Скрытый input для фактического ввода -->
      <input
        ref="hiddenInput"
        v-model="internalValue"
        @input="handleInput"
        @keydown="handleKeydown"
        @focus="handleFocus"
        @blur="handleBlur"
        @paste="handlePaste"
        type="text"
        inputmode="numeric"
        maxlength="9"
        class="hidden-input"
      />
    </div>
    <div class="connect-buttons">
      <PrimaryButton
        @click="connectToRoom('create', false)"
        :class="{ 'disabled-link': code.length != 9 }"
        >Подключиться</PrimaryButton
      >
      <VariantButton
        @click="connectToRoom('create', true)"
        :class="{ 'disabled-link': code.length != 9 }"
        >Подключиться как зритель</VariantButton
      >
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import PrimaryButton from "@/components/ui/PrimaryButton.vue";
import VariantButton from "@/components/ui/VariantButton.vue";
import useCentrifugeStore from "../stores/centrifugeStore";
import { mapState } from "pinia";
import router from "../routes/router";
import { mapActions } from "pinia";
import useUserStore from "../stores/userStore";

export default defineComponent({
  name: "CodeInput",
  components: {
    PrimaryButton,
    VariantButton,
  },
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    length: {
      type: Number,
      default: 9,
      validator: (value: number) => value > 0 && value <= 12,
    },
    isOrganizer: Boolean,
    selectedTab: String,
    connectedToRoom: Boolean,
  },

  emits: {
    "update:modelValue": (value: string) => typeof value === "string",
    complete: (code: string) => typeof code === "string",
    "update-organizer": (value: boolean) => typeof value === "boolean",
    "update-tab": (tab: string) => typeof tab === "string",
    "update-connection": (value: boolean) => typeof value === "boolean",
  },

  data() {
    return {
      code: [] as string[],
      internalValue: "",
      activeIndex: -1,
      isFocused: false,
      isInvalidCode: false,
    };
  },

  computed: {
    ...mapState(useCentrifugeStore, ["roomSub", "centrifuge"]),
    ...mapState(useUserStore, ['username']),

    fullCode(): string {
      return this.code.join("");
    },

    isComplete(): boolean {
      return this.code.length === this.length;
    },
  },

  watch: {
    modelValue: {
      immediate: true,
      handler(newValue: string) {
        this.internalValue = newValue;
        this.updateCodeFromValue(newValue);
      },
    },

    internalValue(newValue: string) {
      this.updateCodeFromValue(newValue);
      this.$emit("update:modelValue", newValue);

      if (this.isComplete) {
        this.$emit("complete", newValue);
      }
    },

    "code.length"(newLength: number) {
      this.activeIndex = Math.min(newLength, this.length - 1);
    },
  },

  mounted() {
    this.updateCodeFromValue(this.modelValue);
    this.focusHiddenInput();
  },

  methods: {
    updateCodeFromValue(value: string) {
      const filtered = value.replace(/[^A-Za-z]/g, "").toUpperCase();
      const slicedValue = filtered.slice(0, this.length);
      this.code = slicedValue.split("");
    },

    connectToRoom(tab: string, spectatorMode: boolean) {
      this.join(this.username as string, this.fullCode, spectatorMode, 
      () => {router.push("/play")}, () => {if (!spectatorMode) router.push("/")}
    ).then((success) => {
        if (success) {
          this.$emit("update-organizer", false);
          this.$emit("update-tab", tab);
          this.$emit("update-connection", true);
        }
      })
    },

    focusHiddenInput() {
      const input = this.$refs.hiddenInput as HTMLInputElement;
      if (input) {
        input.focus();
        input.setSelectionRange(input.value.length, input.value.length);
      }
    },

    handleInput(event: Event) {
      const input = event.target as HTMLInputElement;
      this.internalValue = input.value.replace(/[^A-Za-z]/g, "").toUpperCase();

      this.activeIndex = Math.min(this.code.length, this.length - 1);
    },

    handleKeydown(event: KeyboardEvent) {
      const input = event.target as HTMLInputElement;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        this.activeIndex = Math.max(0, this.activeIndex - 1);
        setTimeout(() => {
          input.setSelectionRange(this.activeIndex, this.activeIndex);
        });
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        this.activeIndex = Math.min(this.code.length, this.length - 1);
        setTimeout(() => {
          input.setSelectionRange(this.activeIndex, this.activeIndex);
        });
      } else if (event.key === "Backspace" || event.key === "Delete") {
        if (this.code.length > 0) {
          this.activeIndex = Math.max(0, this.code.length - 1);
        }
      }
    },

    handleFocus() {
      this.isFocused = true;
      this.activeIndex = Math.min(this.code.length, this.length - 1);
    },

    handleBlur() {
      this.isFocused = false;
      this.activeIndex = -1;
    },

    handlePaste(event: ClipboardEvent) {
      event.preventDefault();
      const pastedText = event.clipboardData?.getData("text") || "";
      const filtered = pastedText.replace(/[^A-Za-z]/g, "").toUpperCase();
      const slicedValue = filtered.slice(0, this.length);

      if (slicedValue) {
        this.internalValue = slicedValue;
        this.activeIndex = Math.min(slicedValue.length, this.length - 1);
      }
    },

    clear() {
      this.internalValue = "";
      this.code = [];
      this.activeIndex = -1;
      this.focusHiddenInput();
    },

    getCode(): string {
      return this.fullCode;
    },

    setCode(code: string) {
      const filtered = code.replace(/[^A-Za-z]/g, "").toUpperCase();
      this.internalValue = filtered.slice(0, this.length);
    },

    ...mapActions(useCentrifugeStore, ["join"]),
  },
});
</script>

<style scoped>
.joining-party {
  height: 80vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 87px;
  align-items: center;
  padding: 0px 40px;
}

.joining-party h1 {
  margin: 0;
  font-weight: 700;
  font-size: 42px;
  color: var(--primary);
  line-height: 100%;
}

.connect-buttons {
  display: flex;
  gap: 80px;
}

.connect-buttons a {
  width: 256px;
  text-align: center;
  padding: 16px 0px;
}

.disabled-link {
  pointer-events: none;
  cursor: default;
  color: #1d1b2066;
  background: #1d1b201a;
  text-decoration: none;
  border: 0;
}

.code-container {
  position: relative;
  display: inline-block;
  cursor: text;
}

.dashes-wrapper {
  display: flex;
  gap: 29px;
  justify-content: center;
  align-items: center;
}

.dash {
  position: relative;
  width: 42px;
  height: 56px;
  border-bottom: 6px solid var(--primary-container);
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  transition: all 0.2s ease;
  background-color: white;
}

.dash-filled {
  border-bottom-color: var(--primary);
}

.dash-active {
  border-bottom-color: var(--light-primary);
  box-shadow: 0 2px 0 -1px var(--light-primary);
}

.dash-digit {
  min-height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dash-cursor {
  position: absolute;
  bottom: 11px;
  width: 2px;
  height: 24px;
  background-color: var(--primary);
  animation: blink 1s infinite;
}

@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}

.hidden-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 1px;
  opacity: 0;
  pointer-events: none;
  z-index: -1;
}
</style>
