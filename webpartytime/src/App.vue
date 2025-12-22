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
@font-face {
    font-family: "Desyatiy";
    font-weight: lighter;
    src: url("./font/Desyatiy\ Light.ttf");
}

@font-face {
    font-family: "Desyatiy";
    font-weight: normal;
    src: url("/font/Desyatiy\ Regular.ttf");
}

@font-face {
    font-family: "Desyatiy";
    font-weight: bold;
    src: url("/font/Desyatiy\ Bold.ttf");
}

* {
  font-family: "Desyatiy";
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  height: 100vh;
  overflow: hidden;

}

</style>
