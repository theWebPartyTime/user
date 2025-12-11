<template>
    <div v-html="svg" class="avatar-nav"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { minidenticon } from "minidenticons";

export default defineComponent({
    name: 'Identicon',
    data(){
        return{
            svg: minidenticon(this.username)
        }
    },
    props: {
        username: {
            type: String,
            required: true
        }
    },
    watch: {
        username: {
            async handler(newUsername) {
                this.svg = minidenticon(newUsername)
            }
        }
    }
})
</script>
