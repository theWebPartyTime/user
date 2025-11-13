<template>
    <nav class="nav-panel">
        <img src="@/assets/logo_nav.svg" alt="logo" class="logo-nav">
        <span class="game-name">Угадай Число</span>
        <img src="@/assets/avatar_nav.svg" alt="avatar" class="avatar-nav">
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'NavPanel',
    data(){
        return{

        }
    }
})
</script>

<style>
.nav-panel{
    height: 113px;
    width: 100%;
    padding: 33px 36px 33px 45px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    background: var(--background);
}
.nav-panel .logo-nav{
    width: 46px;
    aspect-ratio: 1;
}

.nav-panel .game-name{
    color: var(--primary);
    margin-left: 50px;
    font-weight: 700;
    font-size: 45px;
}

.nav-panel .avatar-nav{
    width: 40px;
    aspect-ratio: 1;
    justify-self: end;
}
</style>