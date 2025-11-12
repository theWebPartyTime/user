<template>
    <a class="primary-button">
        <slot></slot>
    </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'PrimaryButton',
    data(){
        return{
        }
    }

})
</script>

<style>
.primary-button{
    color: var(--on-primary);
    padding: 16px 54px;
    background: var(--primary);
    border: none;
    border-radius: var(--button-border-radius);
    cursor: pointer;
    font-weight: 500;
    text-decoration: none;
    display: inline-block;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.primary-button:hover {
    transform: scale(101%, 101%);
}
</style>