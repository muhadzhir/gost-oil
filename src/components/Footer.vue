<template>
  <div class="footer">
    <div class="footer-title">{{ oilStationName }}</div>
  </div>
</template>
<script setup lang="ts">

import {oilStationRussName, initOilStation} from "@/store/oilStationStore.ts";
import { computed } from "vue";
import {onMounted} from "vue";
const oilStationName = computed(() => `Заправка: ${oilStationRussName.value ?? 'Не определена'}`)
onMounted(() => {
  initOilStation()
})
</script>
<style lang="scss" scoped>
  .footer {
    text-align: center;
    &-title {
      font-size: 40px;
    }
  }
</style>
