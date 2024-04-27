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
import {numbers, client, resetClient} from "@/store/clientsStore.ts"
import router from "@/router.ts"

const handlerDoneBtn = () => {
  goToLocationPage()
}
const goToLocationPage = () => {
  resetClient()
  router.push({ name: 'Client'})
}
const goToForm = () => {
  if (!numbers.value.length) {
    goToLocationPage()
  }
  setTimeout(() => {
    goToLocationPage()
  }, 10000)
}
onMounted(() => {
  goToForm()
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
