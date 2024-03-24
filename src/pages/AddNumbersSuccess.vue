<template>
  <div class="wrapper">
    <span class="title" >Поздравляем, {{ client.name }}</span>
    <span class="subtitle"> Вы участвуете в конкурсе от Gost Oil, Ваши номерки: </span>
    <div class="numbers">
      <el-button
        v-for="num in numbers"
        class="number"
        type="success"
        size="large"
      >
        {{ num }}
      </el-button>
    </div>
    <el-button
        type="primary"
        size="large"
        @click="handlerDoneBtn"
    >
      Завершить
    </el-button>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from "vue"
import {numbers, client} from "@/store/clientsStore.ts"
import router from "@/router.ts"

const handlerDoneBtn = () => {
  goToLocationPage(2)
}
const goToLocationPage = (number: number) => {
  router.push({ name: 'Location', params: { number }})
}
onMounted(() => {
  if (!numbers.value.length) {
    goToLocationPage(2)
  }
})
</script>
<style lang="scss" scoped>
  .wrapper {
    padding-top: 20px;
    text-align: center;
  }
  .title {
    margin-bottom: 20px;
    display: block;
    font-size: 34px;
  }
  .subtitle {
    display: block;
    font-size: 24px;
    margin-bottom: 20px;
  }
  .numbers {
    .el-button {
      width: 150px;
      margin: 10px;
      font-size: 20px;
    }
    padding-bottom: 20px;
  }
</style>
