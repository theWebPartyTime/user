<template>
    <div class="authorized" v-if="isAuthenticated">
        <NavPanel :connected-to-room="connectedToRoom">
            <span class="page-header">WebPartyTime</span>
            <div class="current-online">Сейчас онлайн: {{ usersOnline }}</div>
        </NavPanel>
        <ChoosePanel 
            v-if="!connectedToRoom"
            :selectedTab="selectedTab" 
            @action-selected="handleActionSelected" 
        />
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
                        <PrimaryButton @click="createScript"><img src="@/assets/plus_icon.svg" alt=""></PrimaryButton>
                    </div>

                    <div v-if="selectedInner == 'addScript'" class="section-script changes-in-script">
                        <header class="section-header">
                            <p>Новый сценарий</p>
                            <div class="header-buttons">
                                <button @click="confirmCreatingScript" :disabled="loading || !formData.scriptFile || !formData.coverFile || !formData.title.trim() || !formData.description.trim()">
                                    <img src="@/assets/confirm_icon.svg" alt="">
                                </button>
                                <button @click="selectedInner = 'gameList'">
                                    <img src="@/assets/decline_icon.svg" alt="">
                                </button>
                            </div>
                        </header>
                        <section class="section-main">
                            <fieldset class="input-fieldset">
                                <legend class="fieldset-legend">Название</legend>
                                <input v-model="formData.title" type="text" class="fieldset-input">
                            </fieldset>
                            <fieldset class="input-fieldset">
                                <legend class="fieldset-legend">Описание</legend>
                                <input v-model="formData.description" type="text" class="fieldset-input">
                            </fieldset>
                            <div class="autostart-bar">
                                <input v-model="formData.public" type="checkbox" id="autostart">
                                <label for="autostart">Публичный</label>  
                            </div>
                        </section>
                        <footer class="section-footer">
                            <div class="download-file-button" @click="($refs.scriptFileInput as HTMLInputElement).click()">
                                <PrimaryButton>
                                    <div class="button-inner">
                                        <img src="@/assets/download_script_icon.svg" alt="">
                                        <p>Загрузить файл сценария</p>
                                        <img src="@/assets/confirm_icon.svg" alt="" v-if="formData.scriptFile">
                                        <input 
                                            type="file" 
                                            @change="handleScriptFile"
                                            accept=".toml"
                                            style="display: none"
                                            ref="scriptFileInput"
                                            required
                                        >
                                    </div>
                                </PrimaryButton>
                            </div>
                            <div class="script-cover-action" @click="($refs.coverFileInput as HTMLInputElement).click()">
                                <VariantButton>
                                    <div class="button-inner">
                                        <img src="@/assets/download_cover_icon.svg" alt="">
                                        <p>Загрузить обложку</p>
                                        <input 
                                            type="file" 
                                            @change="handleCoverFile"
                                            accept=".jpg"
                                            style="display: none"
                                            ref="coverFileInput"
                                            required
                                        >
                                    </div>
                                    
                                </VariantButton>
                            </div>
                        </footer>                        
                    </div>
                    <div v-if="selectedInner == 'editScript'" class="section-script changes-in-script">
                        <header class="section-header">
                            <p>Изменить сценарий</p>
                            <div class="header-buttons">
                                <button @click="updateScript">
                                    <img src="@/assets/confirm_icon.svg" alt="">
                                </button>
                                <button @click="selectedInner = 'gameList'">
                                    <img src="@/assets/decline_icon.svg" alt="">
                                </button>
                            </div>
                        </header>
                        <section class="section-main">
                            <fieldset class="input-fieldset">
                                <legend class="fieldset-legend">Название</legend>
                                <input v-model="formData.title" type="text" class="fieldset-input">
                            </fieldset>
                            <fieldset class="input-fieldset">
                                <legend class="fieldset-legend">Описание</legend>
                                <input v-model="formData.description" type="text" class="fieldset-input">
                            </fieldset>
                            <div class="autostart-bar">
                                <input v-model="formData.public" type="checkbox" id="autostart">
                                <label for="autostart">Публичный</label>  
                            </div>
                        </section>
                        <footer class="section-footer">
                            <div class="download-file-button" @click="($refs.scriptFileInputEdit as HTMLInputElement).click()">
                                <VariantButton>
                                    <div class="button-inner">
                                        <img src="@/assets/change_script_icon.svg" alt="">
                                        <p>Изменить файл сценария</p>
                                        <input 
                                            type="file" 
                                            @change="handleScriptFile"
                                            accept=".toml"
                                            style="display: none"
                                            ref="scriptFileInputEdit"
                                        >
                                    </div>
                                </VariantButton>
                            </div>
                            <div class="script-cover-action" @click="($refs.coverFileInputEdit as HTMLInputElement).click()">
                                <VariantButton>
                                    <div class="button-inner">
                                        <img src="@/assets/download_cover_icon.svg" alt="">
                                        <p>Загрузить обложку</p>
                                        <input 
                                            type="file" 
                                            @change="handleCoverFile"
                                            accept=".jpg"
                                            style="display: none"
                                            ref="coverFileInputEdit"
                                        >
                                    </div>
                                    
                                </VariantButton>
                            </div>
                        </footer> 
                    </div>
                    <div v-else-if="selectedInner == 'gameList'" class="section-script">
                        <div class="game-list" v-if="activePublic && !loading">
                            <div 
                                v-if="allScripts.length > 0" 
                                v-for="script in allScripts"
                                :key="script.id"
                                class="game-field"
                                :class="{ 'selected-field': selectedFieldIndex === script.id }"
                                :style="{
                                    '--selected-image': `url('${getImageUrl(script.cover_hash)}')`
                                }"
                                @click="selectField(script.id)"
                            >
                                <div class="game-field-info">
                                    <span class="field-title">{{ script.title }}</span>
                                    <span class="field-subtitle">{{ script.description }}</span>
                                </div>
                            </div>  
                            <div v-else style="display: flex;align-items: center;flex-direction: row;padding-top: 40px;">
                                <h2 style="margin: 0;">Пока ничего нет! Создайте первый сценарий</h2>
                            </div>     
                        </div>
                        <div class="game-list" v-if="activePrivate && !loading">
                            <div
                                v-if="userScripts.length > 0" 
                                v-for="script in userScripts"
                                :key="script.id"
                                class="game-field"
                                :class="{ 'selected-field': selectedFieldIndex === script.id }"
                                :style="{
                                    '--selected-image': `url('${getImageUrl(script.cover_hash)}')`
                                }"
                                @click="selectField(script.id)"
                            >
                                <div class="game-field-info">
                                    <span class="field-title">{{ script.title }}</span>
                                    <span class="field-subtitle">{{ script.description }}</span>
                                </div>
                            </div>  
                            <div class="game-list" v-else style="display: flex;align-items: center;flex-direction: row;">
                                <h2>Пока ничего нет! Создайте первый сценарий</h2>
                            </div>   
                        </div>
                    </div>
                </section>
                
                <div class="game-card" v-if="selectedInner === 'addScript' || selectedInner === 'editScript'">
                    <h3>{{ formData.title || 'Новый сценарий' }}</h3>
                    <img :src="getFilePreview(formData.coverFile)" alt="Превью обложки">
                    <p>{{ formData.description || 'Описание сценария' }}</p>
                    
                </div>
                <div class="game-card" v-else-if="selectedScript">
                    <h3>{{ selectedScript.title }}</h3>
                    <img :src="getImageUrl(selectedScript.cover_hash)" alt="">
                    <p>{{ selectedScript.description }}</p>
                    <div class="game-buttons">
                        <VariantButton v-if="activePrivate" @click="changeScript" :disabled="selectedFieldIndex < 0 || (activePrivate ? userScripts.length === 0 : allScripts.length === 0)">Изменить</VariantButton>
                        <PrimaryButton @click="connectToRoom">Создать</PrimaryButton>
                    </div>
                </div>
                <div class="game-card" v-else-if="allScripts.length != 0">
                    <h3>{{ allScripts[selectedFieldIndex]?.title }}</h3>
                    <img :src="`${getImageUrl(allScripts[selectedFieldIndex]?.cover_hash)}`" alt="">
                    <p>{{ allScripts[selectedFieldIndex]?.description }}</p>
                </div>
                <div class="game-card" v-else style="display: flex;align-items: center;flex-direction: row; padding-inline: 10px;">
                    <h2>Пока ничего нет! Создайте первый сценарий</h2>
                </div>
            </div>
            <div v-else class="connect-to-party-main">
                <div class="organizer-view" v-if="isOrganizer">
                    <aside class="room-settings">
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
                        <div class="new-users-access-bar">
                            <input type="checkbox" id="new-users-access-checkbox">
                            <label for="new-users-access-checkbox">Принимать новые подключения</label>
                        </div>
                        <div class="viewer-access-bar">
                            <input type="checkbox" id="viewer-access-checkbox">
                            <label for="viewer-access-checkbox">Разрешить зрителей</label>
                        </div>
                        <div class="unauthorized-access-bar">
                            <input type="checkbox" id="unauthorized-access-checkbox">
                            <label for="unauthorized-access-checkbox">Разрешить неавторизованных пользователей</label>
                        </div>    
                    </aside>
                    <div class="selected-game-info">
                        <div class="room-code">
                            <div v-if="codeVisibility">{{ roomCode.toUpperCase() }}</div>
                            <div v-else>{{ '**********' }}</div>
                            <button @click="codeVisibility = !codeVisibility">
                                <img :src="codeVisibility ? visibleCode : hiddenCode" alt="" style="width: 24px; height: 24px;">
                            </button>
                        </div>
                        <div class="selected-game-card">
                            <h3>Угадай число</h3>
                            <img src="@/assets/game_preview_image.png" alt="">
                            <div class="game-description">Простейшая игра на угадывание случайного числаПростейшая игра на угадывание случайного числаПростейшая игра на угадывание случайного числаПростейшая игра на угадывание случайного числаПростейшая игра на угадывание случайного числаПростейшая игра на угадывание случайного числа</div>
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
                                <SecondaryButton class="close-room" @click="connectedToRoom = false">Закрыть комнату</SecondaryButton>
                                <SecondaryButton class="start-game">Запустить</SecondaryButton>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="participant-view" v-else>             
                    <div class="selected-game-card">
                        <h3>Угадай число</h3>
                        <img src="@/assets/game_preview_image.png" alt="">
                        <div class="game-description">Простейшая игра на угадывание случайного числа</div>
                        <div class="room-buttons">
                            <VariantButton @click="connectedToRoom = false">Выйти</VariantButton>
                            <PrimaryButton @click="isReady = !isReady" v-if="isReady">
                                <div class="room-button-inner">
                                    <p>Не готов</p>
                                    <img src="@/assets/confirm_icon.svg" alt="">
                                </div>
                            </PrimaryButton>
                            <PrimaryButton @click="isReady = !isReady" v-else>
                                <div class="room-button-inner">
                                    <p>Готов</p>
                                    <img src="@/assets/confirm_icon.svg" alt="">
                                </div>
                            </PrimaryButton>
                        </div>
                        
                    </div>
   
                    <div class="participants">
                        <div class="participant">
                            <div class="participant-info">
                                <Identicon :username="userInfo.username" class="participant-avatar" />
                                <div class="participant-info-main">
                                    <span class="participant-role">Организатор</span>
                                    <span class="participant-username">Пользователь 1</span>
                                </div>
                                
                            </div>
                        </div>
                        <div class="participants-list">
                            <div class="participant">
                                <div class="participant-info">
                                    <Identicon :username="userInfo.username" class="participant-avatar" />
                                    <div class="participant-info-main">
                                        <span class="participant-role">Вы</span>
                                        <span class="participant-username">{{ userInfo.username }}</span>
                                    </div>
                                </div>
                                
                                <img src="@/assets/ready_icon.svg" alt="" v-if="isReady" class="ready-participant-img">
                            </div>
                            <div class="participant">
                                <div class="participant-info">
                                    <Identicon :username="userInfo.username" class="participant-avatar" />
                                    <div class="participant-info-main">
                                        <span class="participant-role">Игрок</span>
                                        <span class="participant-username">Пользователь 3</span>
                                    </div>
                                </div>
                                <img src="@/assets/ready_icon.svg" alt="" v-if="isReady" class="ready-participant-img">
                            </div>
                            <div class="participant">
                                <div class="participant-info">
                                    <Identicon :username="userInfo.username" class="participant-avatar" />
                                    <div class="participant-info-main">
                                        <span class="participant-role">Игрок</span>
                                        <span class="participant-username">Пользователь 3</span>
                                    </div>
                                </div>
                                
                                <img src="@/assets/ready_icon.svg" alt="" v-if="isReady" class="ready-participant-img">
                            </div>
                            <div class="participant">
                                <div class="participant-info">
                                    <Identicon :username="userInfo.username" class="participant-avatar" />
                                    <div class="participant-info-main">
                                        <span class="participant-role">Игрок</span>
                                        <span class="participant-username">Пользователь 4</span>
                                    </div>
                                </div>
                                
                                <img src="@/assets/ready_icon.svg" alt="" v-if="isReady" class="ready-participant-img">
                            </div>
                            <div class="participant">
                                <div class="participant-info">
                                    <Identicon :username="userInfo.username" class="participant-avatar" />
                                    <div class="participant-info-main">
                                        <span class="participant-role">Игрок</span>
                                        <span class="participant-username">Пользователь 5</span>
                                    </div>
                                </div>

                                <img src="@/assets/ready_icon.svg" alt="" v-if="isReady" class="ready-participant-img">
                            </div>
                            
                        </div>
                        <div class="room-settings-container">
                            <div class="duration-of-game-bar">
                                <img src="@/assets/alarm.svg" alt="">
                                <div class="access-main">
                                    <span class="access-main-setting-name">Время работы комнаты</span>
                                    <span class="access-main-setting-value">0:10:00</span>
                                </div>
                            </div>
                        </div>
                    </div>
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
    <div v-else-if="username">
        <NavPanel :connected-to-room="connectedToRoom">
            <span class="page-header">WebPartyTime</span>
            <div class="current-online">Сейчас онлайн: {{ usersOnline }}</div>
        </NavPanel>
        <JoiningParty/>
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
import { useUserStore } from '../stores/userStore'
import useCentrifugeStore from '../stores/centrifugeStore';
import { mapState } from 'pinia'
import Identicon from '../components/ui/Identicon.vue';
import { generateUsername } from 'unique-username-generator'
import visibleCode from '@/assets/show_code_icon.svg';
import hiddenCode from '@/assets/hide_code_icon.svg';
import { scriptsApi } from '../services/scripts'
import type { Script } from '../types/script'
import defaultCover from '@/assets/game_img.svg'


type ActionType = 'create' | 'connect' | null;
type HomeMainSectionInnerType = 'gameList' | 'addScript' | 'editScript' | null;

interface HomeState {
  isAuth: boolean;
  selectedTab: ActionType;
  connectedToRoom: boolean;
  isOrganizer: boolean;
  searchQuery: string;
  activePublic: boolean;
  activePrivate: boolean;
  roomCode: string;
  codeVisibility: boolean;
  gameButtonsVisible: boolean;
  selectedFieldIndex: number;
  selectedInner: HomeMainSectionInnerType;
  downloadedScript: boolean;
  isReady: boolean;
}

export default defineComponent({
    name: 'Home',
    data(){
        return{
            // Никнейм для неавторизованных
            localUsername: localStorage.getItem('username') || '' as string,
            
            // Авторизация и состояние
            isAuth: false as boolean,
            selectedTab: 'create' as ActionType,
            connectedToRoom: false as boolean,
            isOrganizer: false as boolean,

            // Поиск и фильтрация
            searchQuery: '' as string,
            activePublic: true as boolean,
            activePrivate: false as boolean,

            // Комната
            roomCode: 'QWERTYUIO' as string,
            codeVisibility: true as boolean,
            visibleCode: visibleCode as string,
            hiddenCode: hiddenCode as string,
            gameButtonsVisible: false as boolean,
            isReady: false as boolean,

            // Загрузка данных
            loading: false as boolean,
            error: null as string | null,

            // Сценарии
            selectedFieldIndex: 1 as number,
            selectedInner: 'gameList' as HomeMainSectionInnerType,
            downloadedScript: true as boolean,
            allScripts: [] as Script[],
            userScripts: [] as Script[],
            
            // Форма создания/редактирования
            formData: {
                title: '' as string,
                description: '' as string,
                public: false as boolean,
                scriptFile: null as File | null,
                coverFile: null as File | null
            },
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
        handleUsernameUpdated(event: Event) {
            const customEvent = event as CustomEvent<{ username: string }>;
            this.localUsername = customEvent.detail.username;
            
            if (!customEvent.detail.username) {
                localStorage.removeItem('username');
            } else if (!this.isAuthenticated) {
                localStorage.setItem('username', customEvent.detail.username);
            }
        },

        handleStorageChange(event: StorageEvent) {
            if (event.key === 'username') {
                this.localUsername = event.newValue || '';
            }
        },

        handleAuthenticated() {
            this.isAuth = true;
            this.loadHomeState();
            
            if (this.activePrivate) {
                this.loadUserScripts();
            } else {
                this.loadPublicScripts();
            }
            
            if (!this.roomCode || this.roomCode === 'QWERTYUIO') {
                this.roomCode = this.createCode();
            }
        },

        getFilePreview(file: File | null): string | undefined {
            if (!file || !(file instanceof File)) {
                return defaultCover;
            }
            try {
                return URL.createObjectURL(file);
            } catch (error) {
                console.error('Ошибка создания preview файла:', error);
                return undefined;
            }
        },

        getImageUrl(coverHash: string | undefined | null): string{
            if (coverHash != '') {
                return `https://api.webparty.fun/uploads/images/${coverHash}`;
            }
            return defaultCover;
        },

        async loadPublicScripts() {
            this.loading = true;
            this.error = null;
            try {
                const response = await scriptsApi.getPublicScripts(20, 0, this.searchQuery);
                this.allScripts = response.scripts;
            } catch (err) {
                this.error = err instanceof Error ? err.message : 'Не удалось загрузить публичные сценарии';
                console.error('Ошибка загрузки публичных сценариев:', err);
            } finally {
                this.loading = false;
            }
        },

        async loadUserScripts() {
            this.loading = true;
            this.error = null;
            try {
                const response = await scriptsApi.getUserScripts(6, 0, this.searchQuery);
                this.userScripts = response.scripts;
            } catch (err) {
                this.error = err instanceof Error ? err.message : 'Не удалось загрузить ваши сценарии';
                console.error('Ошибка загрузки сценариев пользователя:', err);
            } finally {
                this.loading = false;
            }
        },

        async confirmCreatingScript() {
            if (!this.formData.scriptFile) {
                this.error = 'Выберите файл сценария';
                return;
            }

            if (!this.formData.coverFile) {
                this.error = 'Выберите обложку сценария';
                return;
            }

            if (!this.formData.title.trim()) {
                this.error = 'Введите название';
                return;
            }

            if (!this.formData.description.trim()) {
                this.error = 'Введите описание сценария';
                return;
            }

            this.loading = true;
            this.error = null;

            try {
                const formReq = new FormData();
                formReq.append('title', this.formData.title);
                formReq.append('description', this.formData.description);
                formReq.append('public', this.formData.public.toString());
                formReq.append('script', this.formData.scriptFile);
                if (this.formData.coverFile) {
                    formReq.append('cover', this.formData.coverFile);
                }
                console.log('FormData создана. Поля:');
                for (let [key, value] of formReq.entries()) {
                    console.log(key, ':', value);
                }

                await scriptsApi.uploadScript(formReq);
                
                this.resetForm();
                
                this.selectedInner = 'gameList';
                this.downloadedScript = false;
                
                if (this.activePrivate) {
                    await this.loadUserScripts();
                } else {
                    await this.loadPublicScripts();
                }
                
            } catch (err) {
                this.error = err instanceof Error ? err.message : 'Ошибка создания сценария';
                console.error('Ошибка создания сценария:', err);
            } finally {
                this.loading = false;
            }
        },

        handleScriptFile(event: Event) {
            const input = event.target as HTMLInputElement;
            if (input.files && input.files[0]) {
                this.formData.scriptFile = input.files[0];
                console.log('Файл скрипта выбран:', input.files[0].name);
            }
        },

        handleCoverFile(event: Event) {
            const input = event.target as HTMLInputElement;
            if (input.files && input.files[0]) {
                this.formData.coverFile = input.files[0];
                console.log('Файл обложки выбран:', input.files[0].name);
            }
        },

        resetForm() {
            this.formData = {
                title: '',
                description: '',
                public: false,
                scriptFile: null,
                coverFile: null
            };
            
            if (this.$refs.scriptFileInput) {
                (this.$refs.scriptFileInput as HTMLInputElement).value = '';
            }
            if (this.$refs.coverFileInput) {
                (this.$refs.coverFileInput as HTMLInputElement).value = '';
            }
        },

        saveHomeState(): void {
            const state: HomeState = {
                isAuth: this.isAuth,
                selectedTab: this.selectedTab,
                connectedToRoom: this.connectedToRoom,
                isOrganizer: this.isOrganizer,
                searchQuery: this.searchQuery,
                activePublic: this.activePublic,
                activePrivate: this.activePrivate,
                roomCode: this.roomCode,
                codeVisibility: this.codeVisibility,
                gameButtonsVisible: this.gameButtonsVisible,
                selectedFieldIndex: this.selectedFieldIndex,
                selectedInner: this.selectedInner,
                downloadedScript: this.downloadedScript,
                isReady: this.isReady
            };
            localStorage.setItem('homeState', JSON.stringify(state));
        },
        
        loadHomeState(): void {
            const saved = localStorage.getItem('homeState');
            if (saved) {
                try {
                    const parsedState: HomeState = JSON.parse(saved);
                    
                    if (parsedState.isAuth !== undefined) this.isAuth = parsedState.isAuth;
                    if (parsedState.selectedTab !== undefined) this.selectedTab = parsedState.selectedTab;
                    if (parsedState.connectedToRoom !== undefined) this.connectedToRoom = parsedState.connectedToRoom;
                    if (parsedState.isOrganizer !== undefined) this.isOrganizer = parsedState.isOrganizer;
                    if (parsedState.searchQuery !== undefined) this.searchQuery = parsedState.searchQuery;
                    if (parsedState.activePublic !== undefined) this.activePublic = parsedState.activePublic;
                    if (parsedState.activePrivate !== undefined) this.activePrivate = parsedState.activePrivate;
                    if (parsedState.roomCode !== undefined) this.roomCode = parsedState.roomCode;
                    if (parsedState.codeVisibility !== undefined) this.codeVisibility = parsedState.codeVisibility;
                    if (parsedState.gameButtonsVisible !== undefined) this.gameButtonsVisible = parsedState.gameButtonsVisible;
                    if (parsedState.selectedFieldIndex !== undefined) this.selectedFieldIndex = parsedState.selectedFieldIndex;
                    if (parsedState.selectedInner !== undefined) this.selectedInner = parsedState.selectedInner;
                    if (parsedState.downloadedScript !== undefined) this.downloadedScript = parsedState.downloadedScript;
                    if (parsedState.isReady !== undefined) this.isReady = parsedState.isReady;
                    
                } catch (error) {
                    console.error('Ошибка при загрузке состояния Home:', error);
                    this.clearHomeState();
                }
            }
        },
        
        clearHomeState(): void {
            localStorage.removeItem('homeState');
        },
        updateConnection(newValue: boolean){
            this.connectedToRoom = newValue
        },
        updateOrganizer(newValue: boolean) {
            this.isOrganizer = newValue;
        },
        updateTab(newTab: ActionType) {
            this.selectedTab = newTab;
        },
        createCode(): string {
            const code = generateUsername("", 1, 10)
            this.roomCode = code
            return code
        },
        createScript(){
            this.formData = {
                title: '',
                description: '',
                public: false,
                scriptFile: null,
                coverFile: null
            };
            this.selectedInner = 'addScript';
            this.activePrivate = true;
            this.activePublic = false;
        },
        changeScript(){
            if (this.selectedFieldIndex < 0) {
                this.error = 'Выберите сценарий для редактирования';
                return;
            }

            const scriptsArray = this.activePrivate ? this.userScripts : this.allScripts;
            const script = scriptsArray.find(s => s.id === this.selectedFieldIndex);
            console.log(scriptsArray)
            if (script) {
                this.formData = {
                    title: script.title,
                    description: script.description,
                    public: script.public,
                    scriptFile: null,
                    coverFile: null
                };
                this.selectedInner = 'editScript';
            } else {
                this.error = 'Сценарий не найден';
            }
        },
        async updateScript() {
            if (this.selectedFieldIndex < 0) return;
            
            if (!this.formData.title.trim()) {
                this.error = 'Введите название';
                return;
            }

            if (!this.formData.description.trim()) {
                this.error = 'Введите описание сценария';
                return;
            }

            if (this.selectedFieldIndex < 0) {
                this.error = 'Сценарий не выбран';
                return;
            }
            
            // Находим скрипт по ID, а не по индексу массива
            const scriptsArray = this.activePrivate ? this.userScripts : this.allScripts;
            const script = scriptsArray.find(s => s.id === this.selectedFieldIndex);
            
            if (!script) {
                this.error = 'Сценарий не найден';
                return;
            }

            this.loading = true;
            this.error = null;

            try {
                const formData = new FormData();
                formData.append('title', this.formData.title);
                formData.append('description', this.formData.description);
                formData.append('public', this.formData.public.toString());
                if (this.formData.scriptFile) {
                    formData.append('script', this.formData.scriptFile);
                }
                if (this.formData.coverFile) {
                    formData.append('cover', this.formData.coverFile);
                }

                await scriptsApi.updateScript(script.script_hash, formData);
                
                this.selectedInner = 'gameList';
                
                if (this.activePrivate) {
                    await this.loadUserScripts();
                } else {
                    await this.loadPublicScripts();
                }
                
            } catch (err) {
                this.error = err instanceof Error ? err.message : 'Ошибка обновления сценария';
                console.error('Ошибка обновления сценария:', err);
            } finally {
                this.loading = false;
            }
        },
        handleActionSelected(action: ActionType): void {
            this.selectedTab = action;

            console.log('Выбрана вкладка:', action);
        },
        toggleActivePublic(){
            this.selectedFieldIndex = 0;
            this.activePublic = true;
            this.activePrivate = false;
            this.selectedInner = 'gameList';
            this.loadPublicScripts();
        },
        connectToRoom() {
            this.connectedToRoom = true;
            this.isOrganizer = true;
            
        },
        toggleActivePrivate(){
            this.selectedFieldIndex = 0;
            this.activePublic = false;
            this.activePrivate = true;
            this.selectedInner = 'gameList';
            this.loadUserScripts();
        },
        deleteParticipant(){
            console.log('Deleted')
        },
        openGameButtons(){
            this.gameButtonsVisible = !this.gameButtonsVisible;
        },
        selectField(scriptId: number) {
            this.selectedFieldIndex = scriptId;
        }
    },
    computed: {
        ...mapState(useUserStore, ['user', 'isAuthenticated']),
        ...mapState(useCentrifugeStore, ['usersOnline']),
        selectedScript() {
            if (this.selectedFieldIndex < 0) return null;
            
            const scriptsArray = this.activePrivate ? this.userScripts : this.allScripts;
            return scriptsArray.find(script => script.id === this.selectedFieldIndex) || null;
        },
        username(){
            return this.localUsername || localStorage.getItem('username') || '';
        },
        userInfo() {
            if (this.isAuthenticated && this.user) {
                return {
                    username: this.user.username || 'Пользователь'
                };
            } else {
                return {
                    username: this.localUsername || localStorage.getItem('username') || 'Гость'
                };
            }
        }
    },
    created() {
        const userStore  = useUserStore()
        userStore.loadFromLocalStorage();
        if (userStore.isAuthenticated && userStore.accessToken) {
            this.isAuth = true;
            
            this.loadHomeState();

            if (!this.roomCode || this.roomCode === 'QWERTYUIO') {
                this.roomCode = this.createCode();
            };

            if (this.activePrivate) {
                this.loadUserScripts();
            } else {
                this.loadPublicScripts();
            }
        } else {
            this.isAuth = false;
            this.clearHomeState();
        }
    },
    mounted(){
        this.roomCode = this.createCode()
        this.saveHomeState();

        window.addEventListener('username-updated', this.handleUsernameUpdated);
        window.addEventListener('storage', this.handleStorageChange);
    },
    beforeUnmount() {
        this.saveHomeState();

        window.removeEventListener('username-updated', this.handleUsernameUpdated);
        window.removeEventListener('storage', this.handleStorageChange);
    },
    watch: {
        isAuth: { handler() { this.saveHomeState(); } },
        selectedTab: { handler() { this.saveHomeState(); } },
        connectedToRoom: { handler() { this.saveHomeState(); } },
        isOrganizer: { handler() { this.saveHomeState(); } },
        searchQuery: { handler() { this.saveHomeState(); } },
        activePublic: { handler() { this.saveHomeState(); } },
        activePrivate: { handler() { this.saveHomeState(); } },
        roomCode: { handler() { this.saveHomeState(); } },
        codeVisibility: { handler() { this.saveHomeState(); } },
        gameButtonsVisible: { handler() { this.saveHomeState(); } },
        selectedFieldIndex: { handler() { this.saveHomeState(); } },
        selectedInner: { handler(_newVal) { this.saveHomeState(); } },
        downloadedScript: { handler(_newVal) { this.saveHomeState(); } },
        isReady: { handler(_newVal) { this.saveHomeState(); } }
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

.creating-party-main-section .section-script{
    width: 100%;
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
    background-image: var(--selected-image), red;
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
    height: 480px;
    background: var(--background);
    border: var(--border-variant);
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    text-align: center;
}

.game-card h3{
    margin: 22px 10px;
    font-size: 22px;
}

.game-card p{
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
.connect-to-party-main .organizer-view{
    display: flex;
    justify-content: space-between;
    gap: 28px;
    align-items: center;
    padding: 30px 40px 40px 40px;
    height: 80vh;
    width: 100%;
}

.connect-to-party-main .participant-view{
    display: flex;
    justify-content: center;
    gap: 8%;
    align-items: center;
    padding: 40px 0px;
    height: 80vh;
    width: 100%;
}

.room-settings{
    display: flex;
    flex-direction: column;
    text-align: left;
    align-items: start;
    gap: 5px;
    min-width: 18%;
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

.organizer-view .duration-of-game-bar{
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

.new-users-access-bar{
    border-bottom: var(--border-variant);
}

.autostart-bar label::before,
.viewer-access-bar label::before,
.unauthorized-access-bar label::before,
.new-users-access-bar label::before{
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
.unauthorized-access-bar:hover label::before,
.new-users-access-bar :hover label::before{
    border-color: var(--primary);
}

.autostart-bar input[type="checkbox"]:checked + label::before,
.viewer-access-bar input[type="checkbox"]:checked + label::before,
.unauthorized-access-bar input[type="checkbox"]:checked + label::before,
.new-users-access-bar input[type="checkbox"]:checked + label::before{
    background-color: var(--primary);
    border-color: var(--primary);
}

.autostart-bar input[type="checkbox"]:checked + label::after,
.viewer-access-bar input[type="checkbox"]:checked + label::after,
.unauthorized-access-bar input[type="checkbox"]:checked + label::after,
.new-users-access-bar input[type="checkbox"]:checked + label::after{
    content: '';
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
    content: '';
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
    content: '';
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

.organizer-view .selected-game-info{
    width: auto;
    min-width: 45%;
    max-width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.participant-view .selected-game-info{
    width: auto;
    min-width: 60%;
    max-width: 65%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.room-code{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 40px;
    align-items: center;
}

.room-code button{
    height: 28px;
    background: none;
    border: none;
    cursor: pointer;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.room-code div{
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

.participant-view .selected-game-card{
    width: auto;
    min-width: 50%;
    max-width: 52%; 
    min-height: 400px;
    max-height: 500px;
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    background: var(--background);
    border: 2px solid var(--outline-variant);
    border-radius: 12px;
}

.organizer-view .selected-game-card{
    width: 100%; 
    max-height: 420px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    background: var(--background);
    border: 2px solid var(--outline-variant);
    border-radius: 12px;
}

.selected-game-card h3{
    margin: 22px auto;
    font-size: 22px;
    color: var(--on-surface)
}

.selected-game-card .game-description{
    margin: 16px;
    color: var(--on-surface-variant);
    font-size: 14px;
}

.selected-game-card img{
    width: 100%;
}

.game-card img{
    width: 100%;
    max-height: 250px;
}

.organizer-view .participants{
    display: flex;
    flex-direction: column;
    position: relative;
    width: auto;
    min-width: 20%;
    max-width: 20%;
    margin-top: 30px;
}

.participant-view .participants{
    display: flex;
    flex-direction: column;
    position: relative;
    width: auto;
    min-width: 15%;
    max-width: 17%;
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

.participant-view .participant {
    display: flex;
    flex-direction: row;
    justify-content: space-between; 
    align-items: center;
    padding: 8px;
}

.participant-view .participant .participant-info{
    min-width: 90%;
    width: auto;
    display: flex;
    flex-direction: row;
    gap: 5%;
    align-items: center;    
}

.participant-view .participants .participants-list .participant .participant-info{
    min-width: 90%;
}

.participant-view .participant .participant-info .participant-info-main{
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
    gap: 5%;
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
    font-size: 15px;
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

.section-header{
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.section-header p{
    font-weight: 500;
    font-size: 16px;
    line-height: 1.5;
}

.header-buttons{
    display: flex;
    gap: 16px;
}

.header-buttons button{
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    border: 0;
}

.header-buttons button:nth-child(1){
    background-color: var(--primary)
}

.header-buttons button:nth-child(2){
    border: var(--border-variant);
    background: transparent;
}

.header-buttons button:nth-child(3){
    border: var(--border-variant);
    background: transparent;
}

.creating-party-main .changes-in-script{
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

.input-fieldset{
    border-radius: 4px;
    border: var(--border);
}

.fieldset-legend{
    font-size: 12px;
    font-weight: 400;
    color: var(--on-surface-variant)
}

.fieldset-input{
    width: 100%;
    border: 0;
    background: transparent;
}

.fieldset-input:focus{
    border: none;
    outline: none;
}

.section-main{
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.section-footer{
    display: flex;
    justify-content: center;
    gap: 18px;
    height: 48px;
}

.section-footer div{
    position: relative;
    background: 0;
    border: 0;
    padding: 0;
}

.section-footer div a{
    display: flex;
    align-items: center;
    height: 100%;
    padding: 10px 16px
}

.section-footer .button-inner{
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 8px;
    align-items: center;
}

.section-footer .button-inner p{
    margin: 0;
}

.section-main .autostart-bar input[type="checkbox"]:checked + label::after{
    right: 25.6px;
}

.section-main .autostart-bar label{
    margin-left: 8px;
    font-size: 16px;
    font-weight: 400;
    color: var(--on-surface)
}

.room-settings-container .duration-of-game-bar{
    margin-top: 40px;
    display: flex;
    flex-direction: row;
    gap: 6px;
    padding: 8px 16px;
}
.room-settings-container .duration-of-game-bar img{
    width: 18px;
    aspect-ratio: 1;
}

.room-buttons{
    display: flex;
    justify-content: end;
    gap: 8px;
    padding-inline: 10px; 
}

.room-buttons a{
    height: 40px;
    padding: 10px 16px;
}

.room-button-inner{
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 13px;
}

.room-button-inner p{
    margin: 0;
}

.room-button-inner img{
    height: 19px;
    width: 16px;
}
</style>