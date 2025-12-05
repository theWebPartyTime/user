<template>
    <NavPanel>
        <span class="page-header">Угадай число</span>
    </NavPanel>
    <section class="pq-variant-section">
        <h2 class="pq-section-title">{{ title }}</h2>
        <p class="pq-section-text">{{ question }}</p>
        <div class="variants">
            <PrimaryButton>Вариант 1</PrimaryButton>
            <PrimaryButton>Вариант 2</PrimaryButton>
            <PrimaryButton>Вариант 3    </PrimaryButton>
        </div>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NavPanel from '@/components/layout/NavPanel.vue';
import PrimaryButton from '@/components/ui/PrimaryButton.vue';
export default defineComponent({
    name: 'PartyQueryVariant',
    data(){
        return{
            title: "Заголовок запроса",
            question: "Тут вопрос викторины"
        }
    },
    components: {
        NavPanel,
        PrimaryButton
    }
})
</script>

<style>
.pq-variant-section{
    height: 86vh;
    width: 100%;
    padding: 80px 42px 0px 42px;
    text-align: center;
}
.pq-variant-section .pq-section-title{
    margin-bottom: 30px;
}
.pq-variant-section .variants{
    margin-top: 250px;
    display: flex;
    justify-content: center;
    gap: 54px;
}
.pq-variant-section .variants a{
    padding: 20px 90px;
}
</style>