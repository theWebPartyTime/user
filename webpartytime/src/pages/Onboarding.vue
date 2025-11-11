<template>
    <div class="onboarding">

        <div class="logo-onboarding">
            <span class="logo-web">WEB</span>
            <span class="logo-party">PARTY</span>
            <span class="logo-time">TIME</span>
        </div>
    
        <PhoneContainer class="phone-section">
            <div class="progress-bar">
                <div class="main-bar active-bar"></div>
                <div class="secondary-bar"></div>
            </div>
            <section class="hero-section">
                <div class="section-header">
                    <h1>Твои посиделки онлайн</h1>
                </div>
                <PrimaryButton>
                    <router-link to="/auth/login">
                        <img src="@/assets/arrow.png" alt="arrow">
                    </router-link>
                </PrimaryButton>
                <div class="section-footer">
                    <router-link to="/auth/login">
                        <span>У меня уже есть аккаунт</span>
                    </router-link>
                    <router-link to="/counter">
                        <span>Продолжить без регистрации</span>
                    </router-link>
                </div>
            </section>
        </PhoneContainer>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PrimaryButton from '../components/ui/PrimaryButton.vue';
import PhoneContainer from '../components/layout/PhoneContainer.vue';

export default defineComponent({
    name: 'Onboarding',
    data(){
        return{

        }
    },
    components: {
        PrimaryButton,
        PhoneContainer
    }

})
</script>

<style>
.onboarding{
    margin: 150px 132px;
    display: flex;
    justify-content: center;
    flex-direction: row;    
    gap: 191px;
}

.logo-onboarding{
    width: 482px;
    height: 540px;
    display: flex;
    flex-direction: column;
    font-weight: 800;
    gap: 5px;
}

.logo-onboarding .logo-party{
    font-size: 150px;
    text-align: center;
    color: var(--on-primary);
    -webkit-text-stroke: 5px var(--primary); /* Для WebKit браузеров */
    text-stroke: 5px var(--primary);
    paint-order: stroke fill;          
}

.logo-onboarding .logo-web, .logo-time{
    font-size: 120px;   
    color: var(--primary);
}

.logo-time{
    text-align: end;
}

.phone-section{
    width: 412px;
    height: 842px;
}

.progress-bar{
    margin: 0px 21px;
    display: flex;
    gap: 4px;
}

.main-bar{
    width: 290px;
}

.secondary-bar{
    width: 68px;
    height: 8px;
    border-radius: 24px;
    background: var(--secondary-container);
}

.secondary-bar::after{
    content: ".";
    position: relative;
    top: -16.5px;
    color: var(--primary);
    font-size: 23px;
    right: -60px;
    font-weight: 900;
}

.active-bar{
    height: 0px;
    border-radius: 24px;
    border: 4px solid var(--primary);
}

</style>