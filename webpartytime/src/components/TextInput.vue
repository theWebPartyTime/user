<template>
    <h1>{{ title }}</h1>
    <p>{{ description }}</p>
    <input type="text" v-model="input" />
    <input type="button" v-on:click="emitInput" value="Отправить" />
</template>

<script lang="ts">
import { defineComponent, ref, type Ref } from 'vue'

export default defineComponent({
    name: 'TextInput',
    data(){
        return{
            input: ref('') as Ref<string>
        }
    },
    props: {
        title: String,
        description: String,
    },
    emits: ['input-sent'],
    methods: {
        emitInput() {
            this.$emit('input-sent', this.input)
        },
    }
})
</script>
