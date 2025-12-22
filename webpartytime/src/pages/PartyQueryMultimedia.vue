<template>
    <section class="pq-multimedia-section">
        <h2 class="pq-section-title">{{ title }}</h2>
        <div class="section-main">
            <p class="pq-section-text">{{ msg }}</p>
            <img src="@/assets/game_img.svg" alt="" class="pq-multimedia-game-image">
        </div>
        
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'PartyQueryMultimedia',
    data(){
        return{
        }
    },
    props: {
        title: {
            type: String as () => string,
            default: 'Заголовок запроса' 
        },
        msg: {
            type: String as () => string,
            default: 'Это текст для более подробного описания запроса. Это текст для более подробного описания запроса. Это текст для более подробного описания запроса.'
        },

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
    color: var(--primary);
}

.pq-multimedia-section .pq-section-title{
    margin: 0px 0px 40px;
    text-align: center;
    font-size: 40px;
    font-weight: 800;
}

.pq-multimedia-section .section-main{
    height: 60%;
    display: flex;
    flex-direction: row;
    gap: 10%;
    margin: 0px 140px;
    align-items: center;
}   

.pq-multimedia-section .section-main .pq-section-text{
    margin: 0;
    font-size: 32px;
    font-weight: 800;
}

.pq-multimedia-section .pq-multimedia-game-image{
    border-radius: 28px;
}
</style>