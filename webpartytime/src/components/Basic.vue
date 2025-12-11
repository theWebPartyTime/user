<template>
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Basic',
    data(){
        return{
        }
    },
    props: {
        title: String,
        description: String
    }
})
</script>
