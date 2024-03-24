<template>
  <div class="home">
    <el-button @click="goToLocationPage(1)">Заправка 1</el-button>
    <el-button @click="goToLocationPage(2)">Заправка 2</el-button>
    <el-button @click="goToLocationPage(3)">Заправка 3</el-button>
  </div>
</template>
<script lang="ts" setup>
import router from '@/router'
  const goToLocationPage = (number: number) => {
    router.push({ name: 'Location', params: { number }})
  }
</script>
<style>
  .home {
    padding-top: 20px;
    display: flex;
    width: 100%;
    justify-content: space-around;
  }
</style>
