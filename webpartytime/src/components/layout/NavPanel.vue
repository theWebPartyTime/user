<template>
    <nav class="nav-panel">
        <div class="logo-online">
            <img src="@/assets/logo_nav.svg" alt="logo" class="logo-nav">
            <slot></slot>
        </div>
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
    padding: 23px 36px 15px 45px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--background);
}

.logo-online{
    display: flex;
    gap: 34px;
    align-items: center;
}

.nav-panel .logo-nav{
    width: 46px;
    aspect-ratio: 1;
}


.nav-panel .avatar-nav{
    width: 40px;
    aspect-ratio: 1;
    justify-self: end;
}
</style>