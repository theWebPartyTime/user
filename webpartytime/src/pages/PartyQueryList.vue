<template>
    <NavPanel>
        <span class="page-header">Угадай число</span>
    </NavPanel>
    <div class="pq-list-section">
        <h2 class="pq-section-title">{{ title }}</h2>
        <ul class="section-items">
            <li v-for="item in items" class="list-item">{{ item }}</li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavPanel from '@/components/layout/NavPanel.vue';
export default defineComponent({
    name: 'PartyQueryList',
    data(){
        return{
            title: 'Заголовок запроса',
            items: [
                'Текст пункта',
                'Текст пункта',
                'Текст пункта',
                'Текст пункта',
                'Текст пункта',
                'Текст пункта',
            ]
        }
    },
    components: {
        NavPanel
    }
})
</script>

<style>
.pq-list-section {
    height: 86vh;
    padding-top: 75px;
}

.pq-list-section .pq-section-title{
    text-align: center;
}

.pq-list-section .section-items{
    margin: 30px 100px 0px;
    
}

.pq-list-section .section-items .list-item{
    color: var(--primary);
    font-size: 32px;
    font-weight: 800;
    margin-bottom: 24px;
}

</style>