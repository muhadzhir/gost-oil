<template>
  <div class="app">
    <Header />
    <router-view />
    <Footer />
  </div>

</template>


<script lang="ts" setup>
  import Header from '@/components/Header.vue'
  import Footer from "@/components/Footer.vue";
</script>
<style lang="scss">
  @import "css/index.css";
  body {
    background-color: #007Ac5;
    margin: 0;
    padding: 0;
    font-family: "Arial";
    color: white;
  }
  .app {
    height: 100vh;
    display: grid;
    grid-template-rows: 0.1fr 10fr 1fr;
  }
</style>
