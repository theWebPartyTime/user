<template>
    <NavPanel>
        <span class="page-header">Угадай число</span>
    </NavPanel>
    <section class="pq-leader-section">
        <p class="pq-section-text">{{ description }}</p>
        <div class="leader-info">
            <img src="@/assets/avatar_nav.svg" alt="" class="leader-avatar">
            <span class="pq-section-title">{{ username }}</span>
            <span class="pq-section-title">Побед: 5</span>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavPanel from '@/components/layout/NavPanel.vue';

export default defineComponent({
    name: 'PartyQueryLeader',
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
.pq-leader-section{
    display: flex;
    height: 86vh;
    width: 100%;
    align-items: center;
    gap: 60px;
    padding: 0px 150px;
}

.pq-leader-section .pq-section-text{
    font-size: 36px;
    text-align: right;
}

.pq-leader-section .pq-section-title{
    font-size: 36px;
    text-align: center;
}
.pq-leader-section .leader-info{
    width: auto;
    display: flex;
    flex-direction: column;
    gap: 34px;
    padding: 0px 90px;
    text-align: center;
}
.pq-leader-section .leader-avatar{
    height: 295px;
    aspect-ratio: 1;
}
</style>