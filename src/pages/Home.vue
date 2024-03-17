<template>
  <div>
  <button @click="goToLocationPage(1)">Заправка 1</button>
  <button @click="goToLocationPage(2)">Заправка 2</button>
  <button @click="goToLocationPage(3)">Заправка 3</button>
  </div>
</template>
<script lang="ts" setup>
import router from '@/router'
  const goToLocationPage = (number: number) => {
    router.push({ name: 'Location', params: { number }})
  }
</script>
