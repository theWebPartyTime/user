<template>
    <section class="phone-container">
        <div class="camera-imitation"><img src="@/assets/camera.png" alt=""></div>
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
    display: flex;
    flex-direction: column;
    border: 8px solid var(--primary);
    background: var(--background);
    border-radius: 18px;
}
.camera-imitation img{
    width: 24px;
    height: 24px;
}
</style>