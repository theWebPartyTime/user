<template>
    <a class="variant-button">
        <slot></slot>
    </a>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'VariantButton',
    data(){
        return{
        }
    }

})
</script>

<style>
.variant-button{
    color: var(--on-surface-variant);
    padding: 16px 54px;
    background: var(--background);
    border: 1px solid var(--outline-variant);
    border-radius: var(--button-border-radius);
    cursor: pointer;
    font-weight: 500;
    text-decoration: none;
    display: inline-block;
    transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}
.variant-button:hover {
    transform: scale(101%, 101%);
}
</style>