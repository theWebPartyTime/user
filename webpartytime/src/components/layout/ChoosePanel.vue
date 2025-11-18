<template>
    <nav class="choose-panel">
        <div class="create-party">
            <router-link to="/" :class="{'active': createActive}" >Провести вечеринку</router-link>
        </div>
        <div class="connect-to-party">
            <router-link to="/" :class="{'active': connectActive}">Подключиться к вечеринке</router-link>
        </div>
        
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'ChoosePanel',
    data(){
        return{
            createActive: true,
            connectActive: false
        }
    }
})
</script>

<style>
.choose-panel{
    display: flex;
    align-items: end;
    height: 38px;
    background: var(--background);
    border-bottom: 2px solid var(--outline-variant);
}
.choose-panel div{
    width: 50%;
    text-align: center;
    margin-bottom: 10px;
}

.choose-panel div a{
    font-weight: 500;
    text-decoration: none;
    color: var(--on-surface-variant);
    padding: 8px 0px;
}

.active{
    color: var(--primary) !important;
    border-bottom: 3px solid var(--primary);
    border-bottom-left-radius: 2px;
    border-bottom-right-radius: 2px;
}
</style>