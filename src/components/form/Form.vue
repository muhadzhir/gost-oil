<template>
  <div>
    <MazInput
      v-model="nameInput"
      class="form-input"
      label="Имя"


    />
    <MazPhoneNumberInput
      v-model="phoneInput"
      :noExample="true"
      :noSearch="true"
      :noCountrySelector="true"
      placeholder="Телефон"
      class="form-input"
      country-locale="ru-RU"

    />
    <MazInputNumber
      v-model="priceInput"
      class="form-input"
      placeholder="Сумма"
      :min="5"
      :max="10000"
      size="md"
      :no-buttons="true"
      color="secondary"
      style="width: 200px;"
  />

  <MazBtn color="info" @click="handlerSubmit">Ввод</MazBtn>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const nameInput = ref()
const phoneInput = ref()
const priceInput = ref()

const handlerSubmit = () => {
  console.log(nameInput.value)
  console.log(phoneInput.value)
  console.log(priceInput.value)
}
</script>
<style lang="scss">
  .form{
    &-input {
      margin: 20px;
    }
  }
</style>