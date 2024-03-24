<template>
  <div class="form" >
    <el-form
        ref="formRef"
        label-position="top"
        require-asterisk-position="right"
        :model="client"
        class="relative"
    >
      <span class="form-title" > Заполните данные </span>
      <Input
        :input-value="client.name"
        :rules="rules(clientConfig.find(({field}) => field === 'name')!)"
        class="form-input"
        placeholder="Имя"
        field-name="name"
        @updateField="(val: string) => handlerChangeInput('name', val)"
      />
      <Input
        :input-value="client.phone"
        :rules="rules(clientConfig.find(({field}) => field === 'phone')!)"
        placeholder="Телефон"
        class="form-input"
        field-name="phone"
        @updateField="(val: string) => handlerChangeInput('phone', val)"

      />
      <Input
        :input-value="client.currentPayment"
        :rules="rules(clientConfig.find(({field}) => field === 'currentPayment')!)"
        class="form-input"
        placeholder="Сумма"
        field-name="currentPayment"
        @updateField="(val: string) => handlerChangeInput('currentPayment', val)"
      />
      <el-button class="form-button" type="success" size="large" @click="handlerSubmit(formRef)">Ввод</el-button>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import {FormeRequestData, FormItemConfig} from "@/types.ts"
import { ClientModel } from '@/models/ClientModel.ts'
import Input from '@/components/forms/Input.vue'
import {client, setNumbers} from "@/store/clientsStore.ts";
import type { FormInstance } from 'element-plus'
import router from "@/router.ts";

const emits = defineEmits<{
  (e: 'submitted', requestData: FormeRequestData): void
}>()

const formRef = ref<FormInstance>()

const clientConfig: FormItemConfig<ClientModel>[] = [
  {
    field: 'name',
    required: () => true
  },
  {
    field: 'phone',
    required: () => true
  },
  {
    field: 'currentPayment',
    required: () => true
  }
]
const rules = (config: FormItemConfig<ClientModel>) => {
  const rules = []
  if (config.required) {
    const required = config.required(client.value)
    rules.push({
      required,
      trigger: 'change',
      message: `обязательно`
    })
  }
  return rules
}
const addClientNumbers = () => {
  const numsCount = Math.floor(client.value.currentPayment/1000)
  const firstNumber = Math.floor(Math.random() * 5000)
  const nums = []
  for (let i = 0; i < numsCount; i++) {
    nums.push(firstNumber + i)
  }
  setNumbers(nums)
  router.push({ name: 'AddNumbersSuccess' })
}
const handlerChangeInput = (field: keyof ClientModel, val: string) => {
  client.value[field] = val
}
const handlerSubmit = (formInstance: FormInstance) => {
  if (!formInstance) return
  formInstance.validate((valid) => {
    if (valid) {
      addClientNumbers()
    } else {
      return false
    }
  })
}
</script>
<style lang="scss">
  .form{
    padding-top: 20px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    &-title {
      display: block;
      color: white;
      font-size: 40px;
      text-align: center;
    }
    max-width: 500px;
    margin: 0 auto;
    &-button {
      font-size: 30px;
    }
  }
</style>
