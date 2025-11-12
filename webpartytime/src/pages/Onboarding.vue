<template>
    <div class="onboarding">

        <div class="logo-onboarding">
            <span class="logo-web">WEB</span>
            <span class="logo-party">PARTY</span>
            <span class="logo-time">TIME</span>
        </div>
    
        <PhoneContainer class="phone-section">
            <div class="onboarding-progress-bar">
                <div class="main-bar active-bar"></div>
                <div class="secondary-bar"></div>
            </div>
            <section class="hero-section">
                <div class="section-header">
                    <h1>Твои онлайн посиделки</h1>
                </div>
                <PrimaryButton class="continue-button">
                    <router-link to="/auth/register">
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
import PrimaryButton from '@/components/ui/PrimaryButton.vue';
import PhoneContainer from '@/components/layout/PhoneContainer.vue';

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
    paint-order: stroke fill;          
}

.logo-onboarding .logo-web, .logo-time{
    font-size: 120px;   
    color: var(--primary);
}

.logo-time{
    text-align: end;
}

.onboarding .hero-section{
    padding: 50px 33px 35px 33px;
    display: flex;
    flex-direction: column;
    gap: 71px;
    align-items: center;
}

.onboarding .section-header{
    text-align: center;
    color: var(--primary);
    font-weight: 800;
}

.onboarding .section-header h1{
    margin: 0;
    font-weight: 800;
    font-size: 35px;
}

.onboarding .continue-button{
    padding: 16px;
}

.onboarding .continue-button img{
    width: 64px;
}

.onboarding .onboarding-progress-bar{
    margin: 0px 21px;
    display: flex;
    gap: 4px;
}

.onboarding .onboarding-progress-bar .main-bar{
    width: 15%;
}

.onboarding-progress-bar .secondary-bar{
    position: relative;
    width: 85%;
    height: 8px;
    border-radius: 24px;
    background: var(--secondary-container);
}

.onboarding-progress-bar .secondary-bar::after{
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

.onboarding-progress-bar .active-bar{
    height: 0px;
    border-radius: 24px;
    border: 4px solid var(--primary);
}

.onboarding .section-footer{
    display: flex;
    flex-direction: column;
    gap: 20px
}

.onboarding .section-footer a{
    text-decoration: none;
    font-size: 19px;
    color: var(--light-primary);
    font-weight: 800;
}

</style>