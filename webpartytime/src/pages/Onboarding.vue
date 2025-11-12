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
                    <h1>Твои онлайн посиделки</h1>
                </div>
                <PrimaryButton class="continue-button">
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
    margin: 120px 132px 0px 132px;
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

.hero-section{
    padding: 37px;
    display: flex;
    flex-direction: column;
    gap: 71px;
    align-items: center;
}

.section-header{
    text-align: center;
    font-size: 19px;
    color: var(--primary);
    font-weight: 800;
}

.section-header h1{
    margin: 0;
}

.continue-button{
    padding: 16px;
}

.continue-button img{
    width: 64px;
}

.progress-bar{
    margin: 0px 21px;
    display: flex;
    gap: 4px;
}

.main-bar{
    width: 36px;
}

.secondary-bar{
    position: relative;
    width: 322px;
    height: 8px;
    border-radius: 24px;
    background: var(--secondary-container);
}

.secondary-bar::after{
    content: "";
    position: absolute;
    top: 50%;
    right: 3px;
    background: var(--primary);
    transform: translateY(-50%);
    width: 4px;
    height: 4px;
    border-radius: 50%;
}

.active-bar{
    height: 0px;
    border-radius: 24px;
    border: 4px solid var(--primary);
}

.section-footer{
    display: flex;
    flex-direction: column;
    gap: 20px
}

.section-footer a{
    text-decoration: none;
    font-size: 16px;
    color: var(--light-primary);
    font-weight: 800;
}

</style>