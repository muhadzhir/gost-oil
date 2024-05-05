<template>
  <div class="footer">
    <div class="footer-title">{{ oilStationName }}</div>
  </div>
</template>
<script setup lang="ts">

import {useOilStationMixin} from "@/mixins/oil-station-mixins.ts";
import {computed} from "vue";

const { getOilRusNameByUser } = useOilStationMixin()
const oilStationName = computed(() => {
  const rusOilStation = getOilRusNameByUser()
  return rusOilStation ? `Заправка: ${rusOilStation}` : ''
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