<template>
  <Header />
  <router-view />
</template>


<script lang="ts" setup>
  import Header from '@/components/Header.vue'
</script>
<style lang="scss">
  body {
    background-color: #007Ac5;
    margin: 0;
    padding: 0;
    font-family: "Arial";
    color: white;
  }
</style>
