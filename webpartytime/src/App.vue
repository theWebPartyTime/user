<template>
  <router-view />
</template>

<script lang="ts">
import './style.css';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Montserrat:wght@100..900&display=swap');

*{
  font-family: 'Inter';
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
  height: 100vh;
  overflow: hidden;

}
</style>
/