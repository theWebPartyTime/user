<template>
  <div class="authorized" v-if="true">
    <NavPanel :connected-to-room>
      <motion.span
        :initial="{ scale: 0 }"
        :animate="{ scale: 1 }"
        class="page-header"
        >WebPartyTime</motion.span
      >
      <div class="current-online">Сейчас онлайн: {{ usersOnline }}</div>
    </NavPanel>
    <ChoosePanel v-if="!connectedToRoom" @action-selected="handleActionSelected" />
    <main v-if="selectedTab === 'create'">
      <div v-if="!connectedToRoom" class="creating-party-main">
        <aside class="aside-navigation">
          <button
            class="aside-button-public"
            :class="{ 'active-aside-button': activePublic }"
            @click="toggleActivePublic()"
          >
            Публичные сценарии
          </button>
          <button
            class="aside-button-private"
            :class="{ 'active-aside-button': activePrivate }"
            @click="toggleActivePrivate()"
          >
            Мои сценарии
          </button>
        </aside>
        <section class="creating-party-main-section">
          <div class="search-field">
            <div class="search-bar">
              <button class="burger-button">
                <img src="@/assets/burger_button.svg" alt="" />
              </button>
              <input
                v-model="searchQuery"
                class="search-input"
                type="text"
                placeholder="Поиск по сценариям"
              />
              <button class="search-button">
                <img src="@/assets/search_icon.svg" alt="" />
              </button>
            </div>
            <PrimaryButton @click="createScript"
              ><img src="@/assets/plus_icon.svg" alt=""
            /></PrimaryButton>
          </div>

          <div
            v-if="selectedInner == 'addScript'"
            class="section-script changes-in-script"
          >
            <header class="section-header">
              <p>Новый сценарий</p>
              <div class="header-buttons">
                <button @click="confirmCreatingScript">
                  <img src="@/assets/confirm_icon.svg" alt="" />
                </button>
                <button @click="selectedInner = 'gameList'">
                  <img src="@/assets/decline_icon.svg" alt="" />
                </button>
              </div>
            </header>
            <section class="section-main">
              <fieldset class="input-fieldset">
                <legend class="fieldset-legend">Название</legend>
                <input type="text" class="fieldset-input" />
              </fieldset>
              <fieldset class="input-fieldset">
                <legend class="fieldset-legend">Описание</legend>
                <input type="text" class="fieldset-input" />
              </fieldset>
              <div class="autostart-bar">
                <input type="checkbox" id="autostart" />
                <label for="autostart">Публичный</label>
              </div>
            </section>
            <footer class="section-footer">
              <button class="download-file-button">
                <PrimaryButton>
                  <div class="button-inner">
                    <img src="@/assets/download_script_icon.svg" alt="" />
                    <p>Загрузить файл сценария</p>
                    <img
                      src="@/assets/confirm_icon.svg"
                      alt=""
                      v-if="downloadedScript"
                    />
                  </div>
                </PrimaryButton>
              </button>
              <button class="script-cover-action">
                <VariantButton>
                  <div class="button-inner">
                    <img src="@/assets/download_cover_icon.svg" alt="" />
                    <p>Загрузить обложку</p>
                  </div>
                </VariantButton>
              </button>
            </footer>
          </div>
          <div
            v-if="selectedInner == 'editScript'"
            class="section-script changes-in-script"
          >
            <header class="section-header">
              <p>Изменить сценарий</p>
              <div class="header-buttons">
                <button @click="confirmCreatingScript">
                  <img src="@/assets/confirm_icon.svg" alt="" />
                </button>
                <button @click="selectedInner = 'gameList'">
                  <img src="@/assets/decline_icon.svg" alt="" />
                </button>
                <button @click="selectedInner = 'gameList'">
                  <img src="@/assets/delete_script_icon.svg" alt="" />
                </button>
              </div>
            </header>
            <section class="section-main">
              <fieldset class="input-fieldset">
                <legend class="fieldset-legend">Название</legend>
                <input type="text" class="fieldset-input" />
              </fieldset>
              <fieldset class="input-fieldset">
                <legend class="fieldset-legend">Описание</legend>
                <input type="text" class="fieldset-input" />
              </fieldset>
              <div class="autostart-bar">
                <input type="checkbox" id="autostart" />
                <label for="autostart">Публичный</label>
              </div>
            </section>
            <footer class="section-footer">
              <button class="download-file-button">
                <VariantButton>
                  <div class="button-inner">
                    <img src="@/assets/change_script_icon.svg" alt="" />
                    <p>Изменить файл сценария</p>
                  </div>
                </VariantButton>
              </button>
              <button class="script-cover-action">
                <VariantButton>
                  <div class="button-inner">
                    <img src="@/assets/download_cover_icon.svg" alt="" />
                    <p>Загрузить обложку</p>
                  </div>
                </VariantButton>
              </button>
            </footer>
          </div>
          <div v-else-if="selectedInner == 'gameList'" class="section-script">
            <div class="game-list">
              <div
                v-for="fields in 5"
                class="game-field"
                :class="{ 'selected-field': selectedFieldIndex === fields }"
                @click="selectField(fields)"
              >
                <div class="game-field-info">
                  <span class="field-title">Викторина “Устройство Linux”</span>
                  <span class="field-subtitle"
                    >Тестовые вопросы по устройству операционной
                    системы...</span
                  >
                </div>
              </div>
            </div>
          </div>
        </section>
        <div
          class="game-card"
          v-if="selectedInner == 'editScript' || selectedInner == 'addScript'"
        >
          <h3>Угадай число</h3>
          <img src="@/assets/game_img.svg" alt="" />
          <p>Простейшая игра на угадывание случайного числа</p>
        </div>
        <div class="game-card" v-else>
          <h3>Угадай число</h3>
          <img src="@/assets/game_img.svg" alt="" />
          <p>Простейшая игра на угадывание случайного числа</p>
          <div class="game-buttons">
            <VariantButton @click="changeScript">Изменить</VariantButton>
            <PrimaryButton @click="createRoom">Создать</PrimaryButton>
          </div>
        </div>
      </div>
      <div v-else class="connect-to-party-main">
        <div class="organizer-view" v-if="isOrganizer">
          <aside class="room-settings">
            <div class="duration-of-game-bar">
              <img src="@/assets/alarm.svg" alt="" />
              <div class="access-main">
                <span class="access-main-setting-name"
                  >Время работы комнаты</span
                >
                <p class="access-main-setting-value"><CreatedTimer /></p>
              </div>
            </div>
            <div class="autostart-bar">
              <input v-model="roomConfig.autoStart" type="checkbox" id="autostart" />
              <label for="autostart">Начинать автоматичеcки</label>
            </div>
            <div class="new-users-access-bar">
              <input v-model="roomConfig.allowJoins" type="checkbox" id="new-users-access-checkbox" />
              <label for="new-users-access-checkbox"
                >Принимать новые подключения</label
              >
            </div>
            <div class="viewer-access-bar">
              <input v-model="roomConfig.allowSpectators" type="checkbox" id="viewer-access-checkbox" />
              <label for="viewer-access-checkbox">Разрешить зрителей</label>
            </div>
            <!-- <div class="unauthorized-access-bar">
              <input v-model="roomConfig.allowAnonymous" type="checkbox" id="unauthorized-access-checkbox" />
              <label for="unauthorized-access-checkbox"
                >Разрешить неавторизованных пользователей</label
              >
            </div> -->
          </aside>
          <div class="selected-game-info">
            <div class="room-code">
              <div v-if="codeVisibility">{{ roomCode.toUpperCase() }}</div>
              <div v-else>{{ roomCodeHidden }}</div>
              <button @click="changeCodeVisibility">
                <img
                  :src="codeVisibility ? visibleCode : hiddenCode"
                  alt=""
                  style="width: 24px; height: 24px"
                />
              </button>
            </div>
            <div class="selected-game-card">
              <h3>Угадай число</h3>
              <img src="@/assets/game_preview_image.png" alt="" />
              <div class="game-description">
                Простейшая игра на угадывание случайного числаПростейшая игра на
                угадывание случайного числаПростейшая игра на угадывание
                случайного числаПростейшая игра на угадывание случайного
                числаПростейшая игра на угадывание случайного числаПростейшая
                игра на угадывание случайного числа
              </div>
            </div>
          </div>
          <Participants />
          <div class="settings-container">
              <PrimaryButton
                class="burger-game-button"
                @click="openGameButtons"
              >
                <img src="@/assets/burger_icon.svg" alt="Настройки" />
              </PrimaryButton>

              <div
                class="game-settings-buttons"
                :class="{ visible: gameButtonsVisible }"
              >
                <SecondaryButton
                  class="close-room"
                  @click="connectedToRoom = false"
                  >Закрыть комнату</SecondaryButton
                >
                <SecondaryButton class="start-game" @click="startRoom"
                  >Запустить</SecondaryButton
                >
              </div>
            </div>
        </div>
        <div class="participant-view" v-else>
          <div class="selected-game-card">
            <h3>Угадай число</h3>
            <img src="@/assets/game_preview_image.png" alt="" />
            <div class="game-description">
              Простейшая игра на угадывание случайного числа
            </div>
            <div class="room-buttons">
              <VariantButton @click="connectedToRoom = false"
                >Выйти</VariantButton
              >
              <PrimaryButton @click="toggleReady" v-if="isReady">
                <div class="room-button-inner">
                  <p>Не готов</p>
                  <img src="@/assets/confirm_icon.svg" alt="" />
                </div>
              </PrimaryButton>
              <PrimaryButton @click="toggleReady" v-else>
                <div class="room-button-inner">
                  <p>Готов</p>
                  <img src="@/assets/confirm_icon.svg" alt="" />
                </div>
              </PrimaryButton>
            </div>
          </div>

          <Participants />
        </div>
      </div>
    </main>
    <main v-else>
      <JoiningParty
        @update-organizer="updateOrganizer"
        @update-tab="updateTab"
        @update-connection="updateConnection"
      />
    </main>
  </div>
  <div class="unauthorized" v-else>
    <Onboarding />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NavPanel from "@/components/layout/NavPanel.vue";
import ChoosePanel from "@/components/layout/ChoosePanel.vue";
import PrimaryButton from "@/components/ui/PrimaryButton.vue";
import VariantButton from "@/components/ui/VariantButton.vue";
import SecondaryButton from "@/components/ui/SecondaryButton.vue";
import Onboarding from "@/pages/Onboarding.vue";
import JoiningParty from "@/pages/JoiningParty.vue";
import useUserStore from "../stores/userStore";
import useCentrifugeStore from "../stores/centrifugeStore";
import { mapState, mapActions } from "pinia";
import Identicon from "@/components/ui/Identicon.vue";
import visibleCode from "@/assets/show_code_icon.svg";
import hiddenCode from "@/assets/hide_code_icon.svg";
import router from "../routes/router";
import Participants from "@/components/ui/Participants.vue";
import CreatedTimer from "@/components/ui/CreatedTimer.vue";
import type { RoomConfig } from "../stores/centrifugeStore";

type ActionType = "create" | "connect" | null;
type HomeMainSectionInnerType = "gameList" | "addScript" | "editScript" | null;

export default defineComponent({
  name: "Home",
  data() {
    return {
      selectedTab: "create" as ActionType,
      searchQuery: "" as string,
      activePublic: true as boolean,
      activePrivate: false as boolean,
      accessType: "По ссылке" as string,
      gameButtonsVisible: false as boolean,
      selectedFieldIndex: 1 as number,
      connectedToRoom: false as boolean,
      userInfo: null as any,
      roomConfig: {allowAnonymous: false, allowSpectators: false,
        allowJoins: false, autoStart: false,
      } as RoomConfig,
      selectedInner: "gameList" as HomeMainSectionInnerType,
      downloadedScript: true as boolean,
      codeVisibility: false as boolean,
      visibleCode: visibleCode as string,
      hiddenCode: hiddenCode as string,
      isOrganizer: false as boolean,
      title: "Угадай число" as string,
      isReady: false as boolean,
    };
  },
  components: {
    NavPanel,
    ChoosePanel,
    PrimaryButton,
    VariantButton,
    SecondaryButton,
    Onboarding,
    JoiningParty,
    CreatedTimer,
    Identicon,
  },
  methods: {
    updateConnection(newValue: boolean) {
      this.connectedToRoom = newValue;
    },

    updateOrganizer(newValue: boolean) {
      this.isOrganizer = newValue;
    },

    updateTab(newTab: ActionType) {
      this.selectedTab = newTab;
    },

    toggleReady() {
      this.isReady = !this.isReady
      this.sendInput("", "", -1)
    },

    changeCodeVisibility() {
      this.codeVisibility = !this.codeVisibility;
      if (this.codeVisibility == false) {
      }
    },

    confirmCreatingScript() {
      this.selectedInner = "gameList";
    },

    createScript() {
      this.selectedInner = "addScript";
    },

    changeScript() {
      this.selectedInner = "editScript";
    },

    handleActionSelected(action: ActionType): void {
      this.selectedTab = action;
    },

    startRoom(): void {
      this.start()
      router.push("/play")
    },

    toggleActivePublic() {
      this.activePublic = true;
      this.activePrivate = false;
    },

    createRoom() {
      this.connectedToRoom = true;
      this.isOrganizer = true;
      this.create(this.username as string, 
      () => {router.push("/play")}, () => {router.push("/")});
    },

    toggleActivePrivate() {
      this.activePublic = false;
      this.activePrivate = true;
    },

    openGameButtons() {
      this.gameButtonsVisible = !this.gameButtonsVisible;
    },
    
    selectField(index: number) {
      this.selectedFieldIndex = index;
    },

    ...mapActions(useUserStore, ["generateUsername", "setUsername"]),
    ...mapActions(useCentrifugeStore, ["create", "start", "updateRoomConfig", "sendInput"]),
  },
  computed: {
    ...mapState(useUserStore, ["username", "authorized"]),
    ...mapState(useCentrifugeStore, ["usersOnline", "centrifuge", "roomCode"]),
    roomCodeHidden() { return this.roomCode.replace(/./g, "*") }

  },
  created() {
    const store = useUserStore();
    this.userInfo = store;
  },

  watch: {
    roomConfig: {
      handler(newValue) {
        this.updateRoomConfig(newValue)
      },
      deep: true
    }
  }
});
</script>

<script lang="ts" setup>
import { motion } from "motion-v";
</script>

<style>
/* Создание комнаты */
.current-online {
  position: relative;
  color: var(--on-primary);
  padding: 10px 16px 10px 44px;
  background: var(--primary);
  border: none;
  font-size: 16px;
  border-radius: var(--button-border-radius);
  font-weight: 500;
  text-decoration: none;
  display: inline-block;
}

.current-online::before {
  content: "";
  background-image: url("@/assets/online_icon.svg");
  background-size: contain;
  background-repeat: no-repeat;
  position: absolute;
  top: 50%;
  left: 14px;
  transform: translateY(-50%);
  height: 20px;
  width: 20px;
  display: inline-block;
}

.creating-party-main {
  height: 80vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 36px 44px;
}

.aside-navigation {
  width: auto;
  max-width: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 28px;
  margin-bottom: 25%;
}

.aside-navigation button {
  text-align: left;
  padding: 18px 16px 18px 48px;
  max-width: 100%;
  width: fit-content;
  background: none;
  border: none;
  position: relative;
  cursor: pointer;
  color: var(--on-secondary-container);
  font-size: 15px;
  font-weight: 500;
  border-radius: 100px;
}

.aside-button-public::before {
  content: "";
  background-image: url("@/assets/public_scenario_icon.svg");
  width: 24px;
  height: 12px;
  position: absolute;
  left: 8%;
  top: 40%;
}

.aside-button-private::before {
  content: "";
  background-image: url("@/assets/private_scenario_icon.svg");
  width: 16px;
  height: 16px;
  position: absolute;
  left: 10%;
  top: 34%;
}

.active-aside-button {
  background: var(--secondary-container) !important;
}

.creating-party-main-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: auto;
  min-width: 40%;
  max-width: 55%;
  max-height: 577px;
}

.creating-party-main-section .section-script {
  width: 100%;
}

.search-field {
  width: 100%;
  display: flex;
  gap: 15px;
}

.search-field a {
  width: 56px;
  height: 56px;
  padding: 21px;
  border-radius: 50%;
}

.search-bar {
  display: flex;
  align-items: center;
  width: 100%;
  height: 56px;
  gap: 4px;
  border-radius: 28px;
  background: var(--surface-container);
  padding: 0 8px;
  box-sizing: border-box;
}

.burger-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  border-radius: 20px;
  cursor: pointer;
  color: var(--on-surface-variant);
  transition: background-color 0.2s ease;
}

.burger-button:hover {
  background: rgba(73, 69, 79, 0.08);
}

.burger-button:active {
  background: rgba(73, 69, 79, 0.12);
}

.search-input {
  flex: 1;
  height: 100%;
  border: none;
  background: transparent;
  outline: none;
  font-size: 16px;
  color: #1c1b1f;
  padding: 0 8px;
}

.search-input::placeholder {
  color: #79747e;
}

.search-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  border-radius: 20px;
  cursor: pointer;
  color: #49454f;
  transition: background-color 0.2s ease;
}

.search-button:hover {
  background: rgba(73, 69, 79, 0.08);
}

.search-button:active {
  background: rgba(73, 69, 79, 0.12);
}

.game-list {
  width: 100%;
  padding-top: 4%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.game-field {
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  border: 2px solid var(--outline-variant);
  border-radius: 12px;
  padding: 2.5% 3%;
  background: var(--background);
  transition: all 0.3s ease;
}

.game-field img {
  height: 36px;
  aspect-ratio: 1;
}

.game-field-info {
  margin-left: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.game-field .field-title {
  font-weight: 500;
  font-size: 15px;
}

.game-field .field-subtitle {
  font-size: 13px;
}

.game-list .selected-field {
  width: 105%;
  position: relative;
}

.game-list .selected-field::after {
  content: "";
  position: absolute;
  background-image: url("@/assets/game_img2.svg");
  background-size: contain;
  background-repeat: no-repeat;
  aspect-ratio: 1;
  height: 100%;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  right: 0px;
  z-index: 1;
}

.game-card {
  width: 100%;
  max-width: 30%;
  height: 480px;
  background: var(--background);
  border: var(--border-variant);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  text-align: center;
}

.game-card h3 {
  margin: 22px auto;
  font-size: 22px;
}

.game-card p {
  margin: 16px 16px 32px;
  color: var(--on-surface-variant);
  font-size: 14px;
}

.game-buttons {
  display: flex;
  justify-content: end;
  margin-right: 16px;
  gap: 8px;
  margin-bottom: 13%;
}

.game-buttons a {
  padding: 10px 16px;
}

/* Подключение к комнате */
.connect-to-party-main .organizer-view {
  display: flex;
  justify-content: space-between;
  gap: 28px;
  align-items: center;
  padding: 30px 40px 40px 40px;
  height: 80vh;
  width: 100%;
}

.connect-to-party-main .participant-view {
  display: flex;
  justify-content: center;
  gap: 8%;
  align-items: center;
  padding: 40px 0px;
  height: 80vh;
  width: 100%;
}

.room-settings {
  display: flex;
  flex-direction: column;
  text-align: left;
  align-items: start;
  gap: 5px;
  min-width: 18%;
  max-width: 25%;
  width: auto;
}

.room-settings div {
  width: 100%;
}

.number-of-players-bar {
  display: flex;
  gap: 6px;
}

.number-of-players-bar img {
  width: 15px;
  aspect-ratio: 1;
}

.duration-of-game-bar img {
  width: 18px;
  aspect-ratio: 1;
}

.number-of-players-bar {
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 8px 16px;
}

.room-settings-container .duration-of-game-bar {
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  gap: 6px;
  padding: 8px 16px;
}

.room-settings-container .duration-of-game-bar img {
  width: 18px;
  aspect-ratio: 1;
}

.access-main {
  display: flex;
  flex-direction: column;
}

.access-main-setting-name {
  color: var(--on-surface-variant);
  font-size: 12px;
  letter-spacing: 0.5px;
  line-height: 1.33;
  font-weight: 500;
}

.access-main-value-name {
  font-size: 16px;
  color: var(--on-surface);
}

.organizer-view .duration-of-game-bar {
  display: flex;
  flex-direction: row;
  gap: 6px;
  padding: 8px 16px;
  border-bottom: var(--border-variant);
}

.autostart-bar input[type="checkbox"],
.viewer-access-bar input[type="checkbox"],
.unauthorized-access-bar input[type="checkbox"],
.new-users-access-bar input[type="checkbox"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.autostart-bar,
.viewer-access-bar,
.unauthorized-access-bar,
.new-users-access-bar {
  padding-top: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-bottom: 8px;
  position: relative;
  padding-right: 30px;
  min-height: 24px;
  justify-content: space-between;
}

.new-users-access-bar {
  border-bottom: var(--border-variant);
}

.autostart-bar label::before,
.viewer-access-bar label::before,
.unauthorized-access-bar label::before,
.new-users-access-bar label::before {
  content: "";
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  border: 2px solid var(--outline);
  border-radius: 2px;
  background: #fff;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.autostart-bar:hover label::before,
.viewer-access-bar:hover label::before,
.unauthorized-access-bar:hover label::before,
.new-users-access-bar :hover label::before {
  border-color: var(--primary);
}

.autostart-bar input[type="checkbox"]:checked + label::before,
.viewer-access-bar input[type="checkbox"]:checked + label::before,
.unauthorized-access-bar input[type="checkbox"]:checked + label::before,
.new-users-access-bar input[type="checkbox"]:checked + label::before {
  background-color: var(--primary);
  border-color: var(--primary);
}

.autostart-bar input[type="checkbox"]:checked + label::after,
.viewer-access-bar input[type="checkbox"]:checked + label::after,
.unauthorized-access-bar input[type="checkbox"]:checked + label::after,
.new-users-access-bar input[type="checkbox"]:checked + label::after {
  content: "";
  position: absolute;
  right: 25.7px;
  top: 50%;
  transform: translateY(-65%) rotate(45deg);
  width: 5px;
  height: 9px;
  border: solid white;
  border-width: 0 2.5px 2.5px 0;
}

.autostart-bar label,
.viewer-access-bar label,
.unauthorized-access-bar label,
.new-users-access-bar label {
  width: 185px;
  cursor: pointer;
  margin: 0;
  margin-left: 16px;
  font-size: 16px;
  line-height: 1.5;
  user-select: none;
  order: -1;
}

.new-users-access {
  padding: 0px 16px;
}

.cancel-bar,
.as-viewer-bar {
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  padding-bottom: 16px;
  min-height: 24px;
  justify-content: space-between;
}

.cancel-bar input[type="radio"],
.as-viewer-bar input[type="radio"] {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}

.cancel-bar label::before,
.as-viewer-bar label::before {
  content: "";
  position: absolute;
  right: 5px;
  top: 40%;
  transform: translateY(-50%);
  width: 18px;
  height: 18px;
  border: 2px solid var(--outline);
  border-radius: 50%;
  background: #fff;
  transition: all 0.2s ease;
  box-sizing: border-box;
}

.cancel-bar:hover label::before,
.as-viewer-bar:hover label::before {
  border-color: var(--primary);
}

.cancel-bar input[type="radio"]:checked + label::before,
.as-viewer-bar input[type="radio"]:checked + label::before {
  border-color: var(--primary);
}

.cancel-bar input[type="radio"]:checked + label::after,
.as-viewer-bar input[type="radio"]:checked + label::after {
  content: "";
  position: absolute;
  right: 9.3px;
  top: 40%;
  transform: translateY(-50%);
  width: 9.5px;
  height: 9.5px;
  border-radius: 50%;
  background-color: var(--primary);
}

.cancel-bar label,
.as-viewer-bar label {
  cursor: pointer;
  width: 185px;
  margin: 0;
  font-size: 16px;
  line-height: 1.5;
  user-select: none;
  order: -1;
}

.organizer-view .selected-game-info {
  width: auto;
  min-width: 45%;
  max-width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.room-code {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.room-code button {
  height: 28px;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.room-code div {
  display: flex;
  align-items: center;
  justify-content: center;
  border: var(--border-variant);
  border-radius: 8px;
  width: 300px;
  padding: 12px 20px;
  text-align: center;
  font-size: 28px;
  font-weight: 500;
  color: var(--on-surface-variant);
}

.organizer-view .selected-game-card {
  width: 100%;
  max-height: 420px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  background: var(--background);
  border: 2px solid var(--outline-variant);
  border-radius: 12px;
}

.selected-game-card h3 {
  margin: 22px auto;
  font-size: 22px;
  color: var(--on-surface);
}

.selected-game-card .game-description {
  margin: 16px;
  color: var(--on-surface-variant);
  font-size: 14px;
}

.selected-game-card img {
  width: 100%;
}

.organizer-view .participants {
  display: flex;
  flex-direction: column;
  position: relative;
  width: auto;
  min-width: 20%;
  max-width: 20%;
  margin-top: 30px;
}

.update-username-img {
  cursor: pointer;
}

.burger-game-button {
  position: relative;
  transition: transform 0.3s ease;
  padding: 20px 20px;
  border-radius: 50%;
  z-index: 10;
}

.burger-game-button:hover {
  transform: scale(1.01);
}

.burger-game-button img {
  width: 15px;
  height: 10px;
}

.settings-container {
  right: 5%;
  bottom: 5%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.game-settings-buttons {
  display: flex;
  flex-direction: column;
  justify-content: end;
  align-items: flex-end;
  gap: 4px;
  opacity: 0;
  transform: translateY(-10px) scale(0.95);
  visibility: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  bottom: 100%;
  right: 0;
  margin-bottom: 10px;
  z-index: 5;
}

.game-settings-buttons.visible {
  opacity: 1;
  transform: translateY(0) scale(1);
  visibility: visible;
}

.game-settings-buttons a {
  position: relative;
  padding: 10px 24px 10px 54px;
}

.game-settings-buttons .close-room::before {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  content: "";
  width: 20px;
  height: 20px;
  background-image: url("@/assets/close_room.svg");
  top: 30%;
  left: 26px;
}

.game-settings-buttons .leave-from-room::before {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  content: "";
  width: 21px;
  height: 18px;
  background-image: url("@/assets/leave_from_room.svg");
  top: 30%;
  left: 27px;
}

.game-settings-buttons .start-game::before {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  position: absolute;
  content: "";
  width: 11px;
  height: 14px;
  background-image: url("@/assets/start_game.svg");
  top: 36%;
  left: 32px;
}

.section-header {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.section-header p {
  font-weight: 500;
  font-size: 16px;
  line-height: 1.5;
}

.header-buttons {
  display: flex;
  gap: 16px;
}

.header-buttons button {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 0;
}

.header-buttons button:nth-child(1) {
  background-color: var(--primary);
}

.header-buttons button:nth-child(2) {
  border: var(--border-variant);
  background: transparent;
}

.header-buttons button:nth-child(3) {
  border: var(--border-variant);
  background: transparent;
}

.creating-party-main .changes-in-script {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  background: var(--background);
  margin-top: 30px;
  border: var(--border-variant);
  border-radius: 12px;
  height: 53vh;
}

.input-fieldset {
  border-radius: 4px;
  border: var(--border);
}

.fieldset-legend {
  font-size: 12px;
  font-weight: 400;
  color: var(--on-surface-variant);
}

.fieldset-input {
  width: 100%;
  border: 0;
  background: transparent;
}

.fieldset-input:focus {
  border: none;
  outline: none;
}

.section-main {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section-footer {
  display: flex;
  justify-content: center;
  gap: 18px;
  height: 48px;
}

.section-footer button {
  position: relative;
  background: 0;
  border: 0;
  padding: 0;
}

.section-footer button a {
  display: flex;
  align-items: center;
  height: 100%;
  padding: 10px 16px;
}

.section-footer .button-inner {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 8px;
  align-items: center;
}

.section-footer .button-inner p {
  margin: 0;
}

.section-main .autostart-bar input[type="checkbox"]:checked + label::after {
  right: 25.6px;
}

.section-main .autostart-bar label {
  margin-left: 8px;
  font-size: 16px;
  font-weight: 400;
  color: var(--on-surface);
}

.room-buttons {
  display: flex;
  justify-content: end;
  gap: 8px;
  padding-inline: 10px;
}

.room-buttons a {
  height: 40px;
  padding: 10px 16px;
}

.room-button-inner {
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 13px;
}

.room-button-inner p {
  margin: 0;
}

.room-button-inner img {
  height: 19px;
  width: 16px;
}
</style>
