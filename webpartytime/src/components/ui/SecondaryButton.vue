<template>
    <a class="secondary-button">
        <slot></slot>
    </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'SecondaryButton',
    data(){
        return{
        }
    }

})
</script>

<style>
.secondary-button{
    color: var(--on-primary-container);
    padding: 16px 24px 16px 54px;
    background: var(--primary-container);
    border-radius: var(--button-border-radius);
    cursor: pointer;
    font-weight: 500;
    text-decoration: none;
    display: inline-block;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    font-size: 16px;
}
.secondary-button:hover {
    transform: scale(101%, 101%);
}
</style>