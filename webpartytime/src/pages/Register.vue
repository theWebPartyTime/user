<template>
    <div class="register">

        <div class="logo-onboarding">
            <span class="logo-web">WEB</span>
            <span class="logo-party">PARTY</span>
            <span class="logo-time">TIME</span>
        </div>

        <PhoneContainer class="phone-section">
            <div class="register-progress-bar">
                <div class="secondary-bar active-bar"></div>
                <div class="main-bar"></div>
            </div>
            <section class="hero-section">
                <div class="section-header">
                    <h1>РЕГИСТРАЦИЯ </h1>
                </div>
                <form class="register-form">
                    <div class="user-email">
                        <input type="email" id="user-email" placeholder="Электронная почта">
                    </div>
                    <div class="user-password">
                        <input type="password" id="user-password" placeholder="Пароль">
                    </div>
                    <div class="user-repeat-password">
                        <input type="password" id="user-repeat-password" placeholder="Повторите пароль">
                    </div>
                </form>
                <PrimaryButton class="start-button">
                    <router-link to="/guess-number">
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
.register{
    margin: 120px 132px 0px 132px;
    display: flex;
    justify-content: center;
    flex-direction: row;    
    gap: 191px;
}

.register .hero-section{
    padding: 50px 33px 35px 33px;
    display: flex;
    flex-direction: column;
    gap: 71px;
    align-items: center;
}

.register .section-header{
    text-align: center;
    color: var(--primary);
    font-weight: 800;
}

.register .section-header h1{
    margin: 0;
    font-weight: 800;
    font-size: 33px;
}

.start-button a{
    color: var(--on-primary);
    text-decoration: none;
}

.register-progress-bar{
    margin: 0px 21px;
    display: flex;
    gap: 4px;
}

.register-progress-bar .secondary-bar{
    width: 80%;
}

.register-progress-bar .main-bar {
    position: relative;
    width: 20%;
    height: 8px;
    border-radius: 24px;
    background: var(--secondary-container);
}

.register-progress-bar .main-bar::after{
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

.register-progress-bar .active-bar{
    height: 0px;
    border-radius: 24px;
    border: 4px solid var(--primary);
}

.register .hero-section{
    gap: 60px;
}
.register-form{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
}
.register-form input{
    height: 50px;
    width: 257px;
    padding: 12px 16px 12px 42px;
    font-size: 14px;
    border: var(--border);
    border-radius: var(--input-border-radius);
}

.register-form input::placeholder{
    color: var(--on-surface-variant);
}
.register-form .user-email, .user-password, .user-repeat-password{
    position: relative;
}

.register-form .user-email::before{
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

.register-form .user-password::before, .user-repeat-password::before{
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