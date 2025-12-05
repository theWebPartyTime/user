<template>
    <NavPanel>
        <span class="page-header">Угадай число</span>
    </NavPanel>
    <section class="pq-display-section">
        <h2 class="pq-section-title">{{ title }}</h2>
        <div class="section-main">
            <p class="pq-section-text">{{ description }}</p>
            <img src="@/assets/game_img.svg" alt="" class="pq-display-game-image">
        </div>
        
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavPanel from '@/components/layout/NavPanel.vue';
export default defineComponent({
    name: 'PartyQueryDisplay',
    data(){
        return{
            title: "Заголовок запроса",
            description: "Это текст для более подробного описания запроса. Это текст для более подробного описания запроса. Это текст для более подробного описания запроса."
        }
    },
    components: {
        NavPanel
    }
})
</script>

<style>
.pq-display-section{
    margin: 0px 42px;
}

.pq-display-section .pq-section-title{
    margin-top: 80px;
    margin-bottom: 40px;
    text-align: center;
}

.pq-display-section .section-main{
    display: flex;
    gap: 10%;
    margin: 0px 180px;
    align-items: center;
}   

.pq-display-section .pq-display-game-image{
    border-radius: 28px;
}
</style>