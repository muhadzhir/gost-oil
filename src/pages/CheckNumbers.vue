<template>
  <div class="form">
    <Input
        v-model="phone"
        :input-value="phone"
        mask="+7 (###)-###-##-##"
        placeholder="Телефон" class="form-input" field-name="phone"
    />
    <MazBtn @click="handlerSubmit" >Посмотреть</MazBtn>
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
  </div>
</template>
<script setup lang="ts">
import Input from "@/components/forms/Input.vue";
import {ref} from "vue";
import {fetchNumbers} from "@/api/api.ts";
const phone = ref('')
const numbers = ref<number[]>([])
const handlerSubmit = async  () => {
  const numConfig = await fetchNumbers(phone.value)
  numbers.value = numConfig.map(({id}) => id)
}
</script>
<style lang="scss">
  .form {
    padding: 20px 200px;
  }
</style>
