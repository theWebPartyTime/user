<template>
    <NavPanel>
        <span class="page-header">Угадай число</span>
    </NavPanel>
    <section class="pq-multimedia-section">
        <h2 class="pq-section-title">{{ title }}</h2>
        <div class="section-main">
            <p class="pq-section-text">{{ description }}</p>
            <img src="@/assets/game_img.svg" alt="" class="pq-multimedia-game-image">
        </div>
        
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavPanel from '@/components/layout/NavPanel.vue';
export default defineComponent({
    name: 'PartyQueryMultimedia',
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
.pq-multimedia-section{
    margin: 0px 42px;
    height: 86vh;
    padding-top: 80px;
    display: flex;
    flex-direction: column;
}

.pq-multimedia-section .pq-section-title{
    margin-bottom: 40px;
    text-align: center;
}

.pq-multimedia-section .section-main{
    display: flex;
    flex-direction: row;
    gap: 10%;
    margin: 0px 180px;
    align-items: center;
}   

.pq-multimedia-section .pq-multimedia-game-image{
    border-radius: 28px;
}
</style>