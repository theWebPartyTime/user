<template>
    <section class="phone-container">
        <div class="camera-imitation"><img src="@/assets/camera.svg" alt=""></div>
        <slot></slot>
    </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'PhoneContainer',
    data(){
        return{
        }
    }

})
</script>

<style>
.camera-imitation{
    margin: 18px auto;
}

.phone-container{
    height: 86vh;
    width: 412px;
    display: flex;
    flex-direction: column;
    border-top: 8px solid var(--primary);
    border-left: 8px solid var(--primary);
    border-right: 8px solid var(--primary);
    background: var(--background);
    border-top-right-radius: 18px;
    border-top-left-radius: 18px;
    overflow: hidden;
    position: relative;
}

.camera-imitation img{
    width: 24px;
    height: 24px;
}
</style>