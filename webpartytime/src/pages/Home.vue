<template>
    <NavPanel>
        <span class="page-header">WebPartyTime</span>
        <div class="current-online">Сейчас онлайн: 20</div>
    </NavPanel>
    <ChoosePanel/>
    <main class="creating-party-main">
        <aside class="aside-navigation">
            <button class="aside-button-public" :class="{'active-aside-button': activePublic}">Публичные сценарии</button>
            <button class="aside-button-private">Мои сценарии</button>
        </aside>    
        <section class="creating-party-main-section">
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
            <div class="game-list">
                <div class="game-field">
                    <img src="@/assets/avatar.svg" alt="">
                    <div class="game-field-info">
                        <span class="field-title">Викторина “Устройство Linux”</span>
                        <span class="field-subtitle">Тестовые вопросы по устройству операционной системы...</span>
                    </div>
                </div>
                <div class="game-field selected-field">
                    <img src="@/assets/avatar.svg" alt="">
                    <div class="game-field-info">
                        <span class="field-title">Угадай число</span>
                        <span class="field-subtitle">Простейшая игра на угадывание случайного числа</span>
                    </div>
                </div>
                <div class="game-field">
                    <img src="@/assets/avatar.svg" alt="">
                    <div class="game-field-info">
                        <span class="field-title">Игра 1</span>
                        <span class="field-subtitle"></span>
                    </div>
                </div>
                <div class="game-field">
                    <img src="@/assets/avatar.svg" alt="">
                    <div class="game-field-info">
                        <span class="field-title">Игра 2</span>
                        <span class="field-subtitle"></span>
                    </div>
                </div>
                <div class="game-field">
                    <img src="@/assets/avatar.svg" alt="">
                    <div class="game-field-info">
                        <span class="field-title">Игра 3</span>
                        <span class="field-subtitle"></span>
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
                <PrimaryButton>Запустить</PrimaryButton>
            </div>
        </div>
    </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavPanel from '@/components/layout/NavPanel.vue';
import ChoosePanel from '@/components/layout/ChoosePanel.vue';
import PrimaryButton from '@/components/ui/PrimaryButton.vue';
import VariantButton from '@/components/ui/VariantButton.vue';

export default defineComponent({
    name: 'Home',
    data(){
        return{
            searchQuery: '',
            activePublic: true,
            activePrivate: false
        }
    },
    components: {
        NavPanel,
        ChoosePanel,
        PrimaryButton,
        VariantButton
    }

})
</script>

<style>
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
    display: flex;
    justify-content: space-between;
    align-items: start;
    padding: 36px 44px;
}

.aside-navigation{
    min-width: 220px;
    max-width: 360px;
    display: flex;
    flex-direction: column;
    padding: 8px 28px
}

.aside-navigation button{
    padding: 18px 16px 18px 48px;
    background: none;
    border: none;
    position: relative;
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
    left: 16px;
    top: 19px;
}

.aside-button-private::before{
    content: '';
    background-image: url('@/assets/private_scenario_icon.svg');
    width: 16px;
    height: 16px;
    position: absolute;
    left: 43px;
}

.active-aside-button{
    background: var(--secondary-container) !important;
}

.creating-party-main-section{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 645px;
    max-height: 577px;
}

.search-bar {
  display: flex;
  align-items: center;
  width: 575px;
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
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

.game-field{
    width: 584px;
    display: flex;
    align-items: center;
    border: 2px solid var(--outline-variant);
    border-radius: 12px;
    padding: 14px;
    background: var(--background);
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
    width: 628px;
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
    margin-top: 30px;
    width: 348px;
    height: 430px;
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
}

.game-buttons a{
    padding: 10px 16px;
}

</style>