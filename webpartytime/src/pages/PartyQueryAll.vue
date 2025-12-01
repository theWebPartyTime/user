<template>
    <NavPanel>
        <span class="page-header">Угадай число</span>
    </NavPanel>
    <section class="pq-all-section" >
        <div class="user-cards" v-for="participant in participants">
            <div class="user-card">
                <div class="user-info">
                    <img src="@/assets/avatar_nav.svg" alt="" class="user-avatar">
                    <p class="user-name">{{ participant.username }}</p>
                </div>
                <p class="user-content">{{ participant.userContent }}</p>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavPanel from '@/components/layout/NavPanel.vue';
export default defineComponent({
    name: 'PartyQueryAll',
    data(){
        return{
            participants: [
                {   
                    id: 0,
                    username: "Пользователь 5",
                    userContent: "Это для вывода пользовательского контента"
                },
                {   
                    id: 1,
                    username: "Пользователь 5",
                    userContent: "Это для вывода пользовательского контента"
                },
                {   
                    id: 2,
                    username: "Пользователь 5",
                    userContent: "Это для вывода пользовательского контента"
                },
                {   
                    id: 3,
                    username: "Пользователь 5",
                    userContent: "Это для вывода пользовательского контента"
                },
                {   
                    id: 4,
                    username: "Пользователь 5",
                    userContent: "Это для вывода пользовательского контента"
                },
                {   
                    id: 5,
                    username: "Пользователь 5",
                    userContent: "Это для вывода пользовательского контента"
                },
                {   
                    id: 6,
                    username: "Пользователь 5",
                    userContent: "Это для вывода пользовательского контента"
                }
                ,{   
                    id: 7,
                    username: "Пользователь 5",
                    userContent: "Это для вывода пользовательского контента"
                }
            ]
        }
    },
    components: {
        NavPanel
    }
})
</script>

<style>
.pq-section-title{
    font-size: 40px;
    color: var(--primary);
    font-weight: 800;
}

.pq-section-text{
    font-size: 32px;
    color: var(--primary);
    font-weight: 800;
}

.pq-all-section {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 1fr);
  gap: 20px;
  height: 86vh;
  width: 100%;
  padding: 20px 40px;
  align-items: center;
}

.pq-all-section .user-card{
    margin: 0px 15px;
    border: 5px solid var(--primary);
    border-radius: 16px;
    padding: 15px 25px;
}

.pq-all-section .user-card .user-info{
    display: flex;
    justify-content: start;
    gap: 20px;
    border-bottom: var(--border-variant);
    margin-bottom: 15px;
}

.pq-all-section .user-card .user-info .user-avatar{
    width: 46px;
    aspect-ratio: 1;
}

.pq-all-section .user-card .user-info .user-name{
    font-size: 20px;
    color: var(--primary);
    font-weight: 700;
}

.pq-all-section .user-card .user-content{
    font-size: 20px;
    color: var(--primary);
    font-weight: 700;
    margin: 0;
}
</style>