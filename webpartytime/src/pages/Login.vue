<template>
    <div class="login">

        <div class="logo-onboarding">
            <span class="logo-web">WEB</span>
            <span class="logo-party">PARTY</span>
            <span class="logo-time">TIME</span>
        </div>

        <PhoneContainer class="phone-section">
            <div class="login-progress-bar">
                <div class="secondary-bar active-bar"></div>
                <div class="main-bar"></div>
            </div>
            <section class="hero-section">
                <div class="section-header">
                    <h1>ВХОД</h1>
                </div>
                <form class="login-form">
                    <div class="user-email">
                        <input type="email" id="user-email" placeholder="Электронная почта">
                    </div>
                    <div class="user-password">
                        <input type="password" id="user-password" placeholder="Пароль">
                    </div>
                </form>
                <PrimaryButton class="start-button">
                    <router-link to="/">
                        Начать
                    </router-link>
                </PrimaryButton>
            </section>
        </PhoneContainer>

    </div>
</template>

<script lang="ts">
import PhoneContainer from '@/components/layout/PhoneContainer.vue';
import PrimaryButton from '@/components/ui/PrimaryButton.vue';
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'Login',
    data(){
        return{

        }
    },
    components: {
        PhoneContainer,
        PrimaryButton
    }
})
</script>

<style>
.login{
    margin: 120px 132px 0px 132px;
    display: flex;
    justify-content: center;
    flex-direction: row;    
    gap: 191px;
}
.login .hero-section{
    display: flex;
    
}
.login .hero-section{
    height: 70vh;
    padding: 50px 33px 35px 33px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}

.login .section-header{
    text-align: center;
    color: var(--primary);
    font-weight: 800;
}

.login .section-header h1{
    margin: 0;
    font-weight: 800;
    font-size: 33px;
}

.start-button a{
    color: var(--on-primary);
    text-decoration: none;
}

.login-progress-bar{
    margin: 0px 21px;
    display: flex;
    gap: 4px;
}

.login-progress-bar .secondary-bar{
    width: 80%;
}

.login-progress-bar .main-bar {
    position: relative;
    width: 20%;
    height: 8px;
    border-radius: 24px;
    background: var(--secondary-container);
}

.login-progress-bar .main-bar::after{
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

.login-progress-bar .active-bar{
    height: 0px;
    border-radius: 24px;
    border: 4px solid var(--primary);
}
.login-form{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
}
.login-form input{
    height: 50px;
    width: 257px;
    padding: 12px 16px 12px 42px;
    font-size: 14px;
    border: var(--border);
    border-radius: var(--input-border-radius);
}

.login-form input::placeholder{
    color: var(--on-surface-variant);
}
.login-form .user-email, .user-password{
    position: relative;
}

.login-form .user-email::before{
    content: "";
    position: absolute;
    top: 55%;
    left: 12px;
    transform: translateY(-50%);
    background-image: url('../assets/email_icon.svg');
    background-size: contain;
    background-repeat: no-repeat;
    height: 20px;
    width: 20px;
    display: inline-block;
}

.login-form .user-password::before{
    content: "";
    position: absolute;
    top: 50%;
    left: 18px;
    transform: translateY(-50%);
    background-image: url('../assets/password_icon.svg');
    background-size: contain;
    background-repeat: no-repeat;
    height: 14px;
    width: 11px;
    display: inline-block;
}

</style>