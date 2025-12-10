<template>
    <nav class="nav-panel">
        <div class="logo-online">
            <img src="@/assets/logo_nav.svg" alt="logo" class="logo-nav">
            <slot></slot>
        </div>
        <div class="profile">
            <img src="@/assets/update_icon.svg" alt="" @click="userInfo.generateUsername()">
            <input type="text" v-model="usernameInput" maxlength="10" id="organizer_name" name="organizer_name"/>
            <minidenticon-svg :username="usernameInput" class="avatar-nav" @click="openProfileModule"></minidenticon-svg>

            <SecondaryButton class="profile-module" :class="{visible: openedModule}">Выйти</SecondaryButton>
        </div>
        

    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import VariantButton from '@/components/ui/VariantButton.vue';
import SecondaryButton from '@/components/ui/SecondaryButton.vue';
import useUserStore from '../../stores/userStore'
import { mapState, mapActions } from 'pinia'

export default defineComponent({
    name: 'NavPanel',
    data(){
        return{
            openedModule: false as Boolean,
            userInfo: '' as any
        }
    },
    methods:{
        openProfileModule(){
            this.openedModule = !this.openedModule
        },
        ...mapActions(useUserStore, ['generateUsername', 'setUsername'])
    },
    components: {
        VariantButton,
        SecondaryButton
    },
    computed: {
        // 1. Получаем username из store как обычное computed свойство
        ...mapState(useUserStore, ['username']),
        
        // 2. Создаем вычисляемое свойство с геттером и сеттером
        usernameInput: {
        // Геттер: возвращает значение из store
        get(): string {
            return this.username || '' // Если null, возвращаем пустую строку
        },
        // Сеттер: вызывается при изменении значения в input
        set(value: string) {
            // Здесь мы вызываем action из store
            this.setUsername(value)
        }
        }
    },
    mounted() {
        const store = useUserStore()
        this.userInfo = store
        console.log(store.username)
        // Дополнительные действия, если нужно
    }
})
</script>

<style>
.nav-panel{
    height: 14vh;
    width: 100%;
    padding: 23px 36px 15px 45px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: var(--background);
    position: relative;
}

.logo-online{
    display: flex;
    gap: 45px;
    align-items: center;
}

.nav-panel .logo-nav{
    width: 46px;
    aspect-ratio: 1;
}

.nav-panel .avatar-nav{
    display: block;
    width: 50px;
    height: 50px;
    background: var(--primary-container);
    border-radius: 50%;
    cursor: pointer;
}


.nav-panel .page-header{
    font-size: 45px;
    color: var(--primary);
    font-weight: 700;
}

.profile{
    display: flex;
    position: relative;
    justify-content: end;
    gap: 15px;
}

.profile img{
    cursor: pointer;
}

.profile input{
    margin: 8px 0px;
    width: 40%;
    font-size: 16px;
    font-weight: 700;
    color: var(--on-surface-variant);
    text-align: center;
    border: var(--border-variant);
    border-radius: 8px;
}

.profile-module{
    position: absolute;
    top: 120%;
    right: 10px;
    z-index: 1000;
    display: none;
    padding: 10px 20px;
}

.profile-module a{
    text-align: center;
    padding: 12px;
    width: auto;
}

.visible{
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
}
</style>