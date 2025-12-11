<template>
    <div class="authorized" v-if="isAuth">
        <NavPanel>
            <span class="page-header">WebPartyTime</span>
            <div class="current-online">Сейчас онлайн: {{ usersOnline }}</div>
        </NavPanel>
        <ChoosePanel @action-selected="handleActionSelected"/>
        <main v-if="selectedTab === 'create'">
            <div v-if="!connectedToRoom" class="creating-party-main">
                <aside class="aside-navigation">
                    <button class="aside-button-public" :class="{'active-aside-button': activePublic}" @click="toggleActivePublic()">Публичные сценарии</button>
                    <button class="aside-button-private" :class="{'active-aside-button': activePrivate}" @click="toggleActivePrivate()">Мои сценарии</button>
                </aside>    
                <section class="creating-party-main-section">
                    <div class="search-field">
                        <div class="search-bar">
                            <button class="burger-button">
                                <img src="@/assets/burger_button.svg" alt="">
                            </button>
                            <input
                                v-model="searchQuery"
                                class="search-input"
                                type="text"
                                placeholder="Поиск по сценариям"
                            />
                            <button class="search-button">
                                <img src="@/assets/search_icon.svg" alt="">
                            </button>
                        </div>
                        <PrimaryButton><img src="@/assets/plus_icon.svg" alt=""></PrimaryButton>
                    </div>
                    <div class="game-list">
                        <div 
                            v-for="fields in 5"
                            class="game-field"
                            :class="{ 'selected-field': selectedFieldIndex === fields }"
                            @click="selectField(fields)"
                        >
                            <div class="game-field-info">
                                <span class="field-title">Викторина “Устройство Linux”</span>
                                <span class="field-subtitle">Тестовые вопросы по устройству операционной системы...</span>
                            </div>
                        </div>     
                    </div>
                </section>
                <div class="game-card">
                    <h3>Угадай число</h3>
                    <img src="@/assets/game_img.svg" alt="">
                    <span>Простейшая игра на угадывание случайного числа</span>
                    <div class="game-buttons">
                        <VariantButton>Изменить</VariantButton>
                        <PrimaryButton @click="connectToRoom">Создать</PrimaryButton>
                    </div>
                </div>
            </div>
                        <div v-else class="connect-to-party-main">
                <aside class="room-settings">
                    <div class="number-of-players-bar">
                        <img src="@/assets/private_scenario_icon.svg" alt="">
                        <div class="access-main">
                            <span class="access-main-setting-name">Число игроков</span>
                            <span class="access-main-setting-value">1+</span>
                        </div>
                    </div>
                    <div class="duration-of-game-bar">
                        <img src="@/assets/alarm.svg" alt="">
                        <div class="access-main">
                            <span class="access-main-setting-name">Время работы комнаты</span>
                            <span class="access-main-setting-value">0:10:00</span>
                        </div>
                    </div>
                    <div class="autostart-bar">
                        <input type="checkbox" id="autostart">
                        <label for="autostart">Начинать автоматичеcки</label>  
                    </div>
                    <div class="viewer-access-bar">
                        <input type="checkbox" id="viewer-access-checkbox">
                        <label for="viewer-access-checkbox">Разрешить зрителей</label>
                    </div>
                    <div class="unauthorized-access-bar">
                        <input type="checkbox" id="unauthorized-access-checkbox">
                        <label for="unauthorized-access-checkbox">Разрешить неавторизованных пользователей</label>
                    </div>
                    <div class="new-users-access">
                        <div class="cancel-bar">
                            <input type="radio" 
                                id="cancel-new-connections"
                                name="new-user-access" 
                                value="cancel"
                                checked>
                            <label for="cancel-new-connections">Отклонять новые подключения</label>
                        </div>
                        <div class="as-viewer-bar">
                            <input type="radio" 
                                id="new-connections-as-viewer" 
                                name="new-user-access"
                                value="as-viewer">
                            <label for="new-connections-as-viewer">Подключать новых пользователей как зрителей</label>
                        </div>
                    </div>       
                </aside>
                <div class="selected-game-info">
                    <div class="room-code">
                        <button><img src="@/assets/update_icon.svg" alt=""></button>
                        <span>{{ roomCode }}</span>
                        <button><img src="@/assets/hide_code_icon.svg" alt=""></button>
                    </div>
                    <div class="selected-game-card">
                        <h3>Угадай число</h3>
                        <img src="@/assets/game_preview_image.png" alt="">
                        <span>Простейшая игра на угадывание случайного числа</span>
                    </div>
                </div>    
                <div class="participants">
                    <div class="organizer">
                        <Identicon :username="userInfo.username" class="participant-avatar" />
                        <div class="participant-info">
                            <div class="participant-role">Организатор</div>
                            <div class="organizer-name">
                                {{ userInfo.username }}
                            </div>
                            
                        </div>
                    </div>
                    <div class="participants-list">
                        <div class="participant">
                            <div class="participant-info">
                                <Identicon :username="userInfo.username" class="participant-avatar" />
                                <div class="participant-info-main">
                                    <span class="participant-role">Игрок</span>
                                    <span class="participant-username">Пользователь 1</span>
                                </div>
                            </div>
                            
                            <img src="@/assets/delete_participant.svg" alt="" @click="deleteParticipant()" class="delete-participant-img">
                        </div>
                        <div class="participant">
                            <div class="participant-info">
                                <Identicon :username="userInfo.username" class="participant-avatar" />
                                <div class="participant-info-main">
                                    <span class="participant-role">Игрок</span>
                                    <span class="participant-username">Пользователь 3</span>
                                </div>
                            </div>
                            
                            <img src="@/assets/delete_participant.svg" alt="" @click="deleteParticipant()" class="delete-participant-img">
                        </div>
                        <div class="participant">
                            <div class="participant-info">
                                <Identicon :username="userInfo.username" class="participant-avatar" />
                                <div class="participant-info-main">
                                    <span class="participant-role">Игрок</span>
                                    <span class="participant-username">Пользователь 3</span>
                                </div>
                            </div>
                            
                            <img src="@/assets/delete_participant.svg" alt="" @click="deleteParticipant()" class="delete-participant-img">
                        </div>
                        <div class="participant">
                            <div class="participant-info">
                                <Identicon :username="userInfo.username" class="participant-avatar" />
                                <div class="participant-info-main">
                                    <span class="participant-role">Игрок</span>
                                    <span class="participant-username">Пользователь 4</span>
                                </div>
                            </div>
                            
                            <img src="@/assets/delete_participant.svg" alt="" @click="deleteParticipant()" class="delete-participant-img">
                        </div>
                        <div class="participant">
                            <div class="participant-info">
                                <Identicon :username="userInfo.username" class="participant-avatar" />
                                <div class="participant-info-main">
                                    <span class="participant-role">Игрок</span>
                                    <span class="participant-username">Пользователь 5</span>
                                </div>
                            </div>
                            
                            <img src="@/assets/delete_participant.svg" alt="" @click="deleteParticipant()" class="delete-participant-img">
                        </div>
                        
                    </div>
                    <div class="settings-container">
                        <PrimaryButton class="burger-game-button" @click="openGameButtons">
                            <img src="@/assets/burger_icon.svg" alt="Настройки">
                        </PrimaryButton>
                        
                        <div class="game-settings-buttons" :class="{ 'visible': gameButtonsVisible }">
                            <SecondaryButton class="close-room">Закрыть комнату</SecondaryButton>
                            <SecondaryButton class="leave-from-room">Покинуть комнату</SecondaryButton>
                            <SecondaryButton class="start-game">Запустить</SecondaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <main v-else>
            <JoiningParty>
            </JoiningParty>
        </main>
    </div>
    <div class="unauthorized" v-else>
        <Onboarding/>
    </div>
    
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavPanel from '@/components/layout/NavPanel.vue';
import ChoosePanel from '@/components/layout/ChoosePanel.vue';
import PrimaryButton from '@/components/ui/PrimaryButton.vue';
import VariantButton from '@/components/ui/VariantButton.vue';
import SecondaryButton from '@/components/ui/SecondaryButton.vue';
import Onboarding from '@/pages/Onboarding.vue';
import JoiningParty from '@/pages/JoiningParty.vue';
import useUserStore from '../stores/userStore'
import useCentrifugeStore from '../stores/centrifugeStore';
import { mapState, mapActions } from 'pinia'
import Identicon from '../components/ui/Identicon.vue';

type ActionType = 'create' | 'connect' | null;

export default defineComponent({
    name: 'Home',
    data(){
        return{
            isAuth: true as Boolean,
            selectedTab: 'create' as ActionType,
            searchQuery: '' as String,
            activePublic: true as Boolean,
            activePrivate: false as Boolean,
            accessType: 'По ссылке' as String,
            roomCode: 'QWERTYUIO' as String,
            gameButtonsVisible: false as Boolean,
            selectedFieldIndex: 1 as number,
            connectedToRoom: false as Boolean,
            userInfo: null as any
        }
    },
    components: {
        NavPanel,
        ChoosePanel,
        PrimaryButton,
        VariantButton,
        SecondaryButton,
        Onboarding,
        JoiningParty,
        Identicon
    },
    methods: {
        handleActionSelected(action: ActionType): void {
            this.selectedTab = action;

            console.log('Выбрана вкладка:', action);
        },
        toggleActivePublic(){
            this.activePublic = true,
            this.activePrivate = false
        },
        connectToRoom() {
            this.connectedToRoom = true
        },
        toggleActivePrivate(){
            this.activePublic = false,
            this.activePrivate = true
        },
        deleteParticipant(){
            console.log('Deleted')
        },
        openGameButtons(){
            this.gameButtonsVisible = !this.gameButtonsVisible
        },
        selectField(index: number) {
            this.selectedFieldIndex = index
        },
        ...mapActions(useUserStore, ['generateUsername', 'setUsername'])
    },
    computed: {
        ...mapState(useUserStore, ['username']),
        ...mapState(useCentrifugeStore, ['usersOnline'])
    },
    mounted() {
        const store = useUserStore()
        this.userInfo = store
        // Дополнительные действия, если нужно
    }

})
</script>

<style>

/* Создание комнаты */
.current-online{
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

.current-online::before{
    content: '';
    background-image: url('@/assets/online_icon.svg');
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

.creating-party-main{
    height: 80vh;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 36px 44px;
}

.aside-navigation{
    width: auto;
    max-width: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 8px 28px;
    margin-bottom: 25%;
}

.aside-navigation button{
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

.aside-button-public::before{
    content: '';
    background-image: url('@/assets/public_scenario_icon.svg');
    width: 24px;
    height: 12px;
    position: absolute;
    left: 8%;
    top: 40%;
}

.aside-button-private::before{
    content: '';
    background-image: url('@/assets/private_scenario_icon.svg');
    width: 16px;
    height: 16px;
    position: absolute;
    left: 10%;
    top: 34%;
}


.active-aside-button{
    background: var(--secondary-container) !important;
}

.creating-party-main-section{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: auto;
    min-width: 40%;
    max-width: 55%;
    max-height: 577px;
}

.search-field{
    width: 100%;
    display: flex;
    gap: 15px
}

.search-field a{
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
  color: #1C1B1F;
  padding: 0 8px;
}

.search-input::placeholder {
  color: #79747E;
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
  color: #49454F;
  transition: background-color 0.2s ease;
}

.search-button:hover {
  background: rgba(73, 69, 79, 0.08);
}

.search-button:active {
  background: rgba(73, 69, 79, 0.12);
}

.game-list{
    width: 100%;
    padding-top: 4%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.game-field{
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

.game-field img{
    height: 36px;
    aspect-ratio: 1;
}

.game-field-info{
    margin-left: 16px;
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.game-field .field-title{
    font-weight: 500;
    font-size: 15px;
}

.game-field .field-subtitle{
    font-size: 13px;
}

.game-list .selected-field{
    width: 105%;
    position: relative;

}

.game-list .selected-field::after{
    content: '';
    position: absolute;
    background-image: url('@/assets/game_img2.svg');
    background-size: contain;
    background-repeat: no-repeat;
    aspect-ratio: 1;
    height: 100%;
    border-top-right-radius: 12px;
    border-bottom-right-radius: 12px;
    right: 0px;
    z-index: 1;
}

.game-card{ 
    width: 100%;
    max-width: 30%;
    background: var(--background);
    border: 2px solid var(--outline-variant);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    text-align: center;
}

.game-card h3{
    margin: 22px auto;
    font-size: 22px;
}

.game-card span{
    margin: 16px 16px 32px;
    color: var(--on-surface-variant);
    font-size: 14px;
}

.game-buttons{
    display: flex;
    justify-content: end;
    margin-right: 16px;
    gap: 8px;
    margin-bottom: 13%;
}

.game-buttons a{
    padding: 10px 16px;
}

/* Подключение к комнате */
.connect-to-party-main{
    display: flex;
    justify-content: space-between;
    gap: 28px;
    align-items: center;
    padding: 30px 40px 40px 40px;
    height: 80vh;
    width: 100%;
}

.room-settings{
    display: flex;
    flex-direction: column;
    text-align: left;
    align-items: start;
    gap: 5px;
    min-width: 16%;
    max-width: 25%;
    width: auto;
}

.room-settings div{
    width: 100%;
}

.number-of-players-bar{
    display: flex;
    gap: 6px;
}

.number-of-players-bar img{
    width: 15px;
    aspect-ratio: 1;
}

.duration-of-game-bar{
    display: flex;
    gap: 6px;
}

.duration-of-game-bar img{
    width: 18px;
    aspect-ratio: 1;
}

.number-of-players-bar{
    display: flex;
    flex-direction: row;
    gap: 20px;
    padding: 8px 16px;
}

.access-main{
    display: flex;
    flex-direction: column;
}

.access-main-setting-name{
    color: var(--on-surface-variant);
    font-size: 12px;
    letter-spacing: 0.5px;
    line-height: 1.33;
    font-weight: 500;
}

.access-main-value-name{
    font-size: 16px;
    color: var(--on-surface);
}

.duration-of-game-bar{
    display: flex;
    flex-direction: row;
    gap: 20px;
    padding: 8px 16px;
    border-bottom: var(--border-variant);
}

.autostart-bar input[type="checkbox"],
.viewer-access-bar input[type="checkbox"],
.unauthorized-access-bar input[type="checkbox"] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
}

.autostart-bar,
.viewer-access-bar,
.unauthorized-access-bar {
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

.unauthorized-access-bar{
    border-bottom: var(--border-variant);
}

.autostart-bar label::before,
.viewer-access-bar label::before,
.unauthorized-access-bar label::before {
    content: '';
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
.unauthorized-access-bar:hover label::before {
    border-color: var(--primary);
}

.autostart-bar input[type="checkbox"]:checked + label::before,
.viewer-access-bar input[type="checkbox"]:checked + label::before,
.unauthorized-access-bar input[type="checkbox"]:checked + label::before {
    background-color: var(--primary);
    border-color: var(--primary);
}

.autostart-bar input[type="checkbox"]:checked + label::after,
.viewer-access-bar input[type="checkbox"]:checked + label::after,
.unauthorized-access-bar input[type="checkbox"]:checked + label::after {
    content: '';
    position: absolute;
    right: 26px;
    top: 50%;
    transform: translateY(-65%) rotate(45deg);
    width: 5px;
    height: 9px;
    border: solid white;
    border-width: 0 2.5px 2.5px 0;
}

.autostart-bar label,
.viewer-access-bar label,
.unauthorized-access-bar label {
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
    content: '';
    position: absolute;
    right: 30px;
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
    content: '';
    position: absolute;
    right: 34.3px;
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

.selected-game-info{
    width: auto;
    min-width: 45%;
    max-width: 55%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    margin-bottom: 5%;
}

.room-code{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.room-code button{
    height: 28px;
    background: none;
    border: none;
    cursor: pointer;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.room-code span{
    border: var(--border-variant);
    border-radius: 8px;
    padding: 6px 120px;
    text-align: center;
    font-size: 28px;
    font-weight: 500;
    color: var(--on-surface-variant);
}

.selected-game-card{
    width: 100%;
    max-height: 500px;
    display: flex;
    flex-direction: column;
    background: var(--background);
    border: 2px solid var(--outline-variant);
    border-radius: 12px;
}

.selected-game-card h3{
    margin: 22px auto;
    font-size: 22px;
    color: var(--on-surface)
}

.selected-game-card span{
    margin: 16px 16px 32px;
    color: var(--on-surface-variant);
    font-size: 14px;
}

.selected-game-card img{
    width: 100%;
}

.participants{
    display: flex;
    flex-direction: column;
    position: relative;
    width: auto;
    min-width: 16%;
    max-width: 20%;
    margin-top: 30px;
}

.participants .organizer{
    display: flex;
    flex-direction: row;
    justify-content: start; 
    align-items: center;
    padding: 8px 0px 8px 16px;
    gap: 12px;
}

.participants .organizer .participant-avatar{
    aspect-ratio: 1;
    height: 45px;
    display: block;
    background: var(--primary-container);
    border-radius: 50%;
}


.participants .organizer .participant-avatar svg{
    height: 40px;
    aspect-ratio: 1;
    margin: 2.5px;
}

.participants .organizer .participant-info .organizer-name{
    width: 80%;
}

.participants-list .participant:first-child{
    border-top: var(--border-variant);
}

.participants .organizer .participant-info{
    width: 70%;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.participants-list{
    display: flex;
    flex-direction: column;
}

.participants .participants-list .participant{
    display: flex;
    flex-direction: row;
    justify-content: space-between; 
    align-items: center;
    padding: 8px;
}

.participants .participants-list .participant:hover{
    background: var(--background);
}

.participants .participants-list .participant .participant-info{
    min-width: 80%;
    width: auto;
    display: flex;
    flex-direction: row;
    gap: 12px;
    align-items: center;    
}

.participants .participants-list .participant .participant-info-main{
    display: flex;
    flex-direction: column;
}

.participants .participant-role{
    font-size: 12px;
    font-weight: 500;
    color: var(--on-surface-variant);
    line-height: 1.3;
    letter-spacing: 0.5px;
}

.participant-username{
    font-size: 16px;
    color: var(--on-surface);
}

.participant .participant-avatar{
    aspect-ratio: 1;
    height: 35px;
    display: block;
    background: var(--primary-container);
    border-radius: 50%;
}

.participant .participant-avatar svg{
    aspect-ratio: 1;
    height: 30px;
    margin: 2.5px;
}

.participant .delete-participant-img{
    width: 18px;
    aspect-ratio: 1;
    cursor: pointer;
}

.update-username-img{
    cursor: pointer;
}

.burger-game-button{
    position: relative;
    transition: transform 0.3s ease;
    padding: 20px 23px;
    border-radius: 50%;
    z-index: 10;
}

.burger-game-button:hover {
  transform: scale(1.05);
}
.burger-game-button img{
    width: 15px;
    height: 10px;
}

.settings-container {
    margin-top: 25%;
    position: relative;
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

.game-settings-buttons a{
    position: relative;
    padding: 10px 24px 10px 54px;
}

.game-settings-buttons .close-room::before{
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    position: absolute;
    content: '';
    width: 20px;
    height: 20px;
    background-image: url('@/assets/close_room.svg');
    top: 30%;
    left: 26px;
}

.game-settings-buttons .leave-from-room::before{
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    position: absolute;
    content: '';
    width: 21px;
    height: 18px;
    background-image: url('@/assets/leave_from_room.svg');
    top: 30%;
    left: 27px;
}

.game-settings-buttons .start-game::before{
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    position: absolute;
    content: '';
    width: 11px;
    height: 14px;
    background-image: url('@/assets/start_game.svg');
    top: 36%;
    left: 32px;
}
</style>