<template>
    <div class="pq-default-section">
        <h2 class="pq-section-title">Ожидайте запуска комнаты</h2>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'PartyQueryDefault',
    data(){
        return{
        }
    }
})
</script>

<style>
.pq-default-section{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 86vh;
}

.pq-default-section .pq-section-title{
    font-size: 40px;
    text-align: center;
    color: var(--primary);
    margin: 0;
}
</style>