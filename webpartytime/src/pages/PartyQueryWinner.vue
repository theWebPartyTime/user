<template>
    <NavPanel>
        <span class="page-header">Угадай число</span>
    </NavPanel>
    <section class="pq-winner-section">
        <p class="pq-section-text">{{ description }}</p>
        <div class="winner-info">
            <img src="@/assets/avatar_nav.svg" alt="" class="winner-avatar">
            <span class="pq-section-title">{{ username }}</span>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavPanel from '@/components/layout/NavPanel.vue';

export default defineComponent({
    name: 'PartyQueryWinner',
    data(){
        return{
            description: "Это для вывода пользовательского контента. Это для вывода пользовательского контента. Это для вывода пользовательского контента",
            username: "Пользователь 5"
        }
    },
    components: {
        NavPanel
    }
})
</script>

<style>
.pq-winner-section{
    display: flex;
    height: 86vh;
    width: 100%;
    align-items: center;
    gap: 60px;
    padding: 0px 150px;
}

.pq-winner-section .pq-section-text{
    font-size: 36px;
    text-align: right;
}

.pq-winner-section .pq-section-title{
    font-size: 36px;
    text-align: center;
}
.pq-winner-section .winner-info{
    width: auto;
    display: flex;
    flex-direction: column;
    gap: 34px;
    padding: 0px 90px;
    text-align: center;
}
.pq-winner-section .winner-avatar{
    height: 295px;
    aspect-ratio: 1;
}
</style>