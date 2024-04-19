<template>
  <div class="form" >
    <el-form
        ref="formRef"
        label-position="top"
        require-asterisk-position="right"
        :disabled="loading"
        :model="client"
        class="relative"
    >
      <span class="form-title" > Заполните данные </span>
      <Input
        :input-value="client.phone"
        :rules="rules(clientConfig.find(({field}) => field === 'phone')!)"
        placeholder="Телефон"
        class="form-input"
        field-name="phone"
        @updateField="(val: string) => handlerChangeInput('phone', val)"

      />
      <MazBtn
          class="form-button"
          :loading="loading"
          color="success"
          size="xl"
          @click="handlerSubmit(formRef)"
      >
        Подтвердить
      </MazBtn>
    </el-form>
  </div>
</template>
<script lang="ts" setup>
import {onMounted, ref} from 'vue'
import {FormeRequestData, FormItemConfig} from "@/types.ts"
import { ClientModel } from '@/models/ClientModel.ts'
import Input from '@/components/forms/Input.vue'
import {client, setNumbers} from "@/store/clientsStore.ts"
import type { FormInstance } from 'element-plus'
import router from "@/router.ts"
import { getUsers } from '@/api/api.ts'
const emits = defineEmits<{
  (e: 'submitted', requestData: FormeRequestData): void
}>()

const formRef = ref<FormInstance>()
const loading = ref(false)
const clientConfig: FormItemConfig<ClientModel>[] = [
  {
    field: 'phone',
    required: () => true
  }
]
const limit = 10000
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
const handlerChangeInput = (field: keyof ClientModel, val: string) => {
  //@ts-ignore
  client.value[field] = val
}

const handlerSubmit = (formInstance: FormInstance | undefined) => {
  if (!formInstance) return
  formInstance.validate( async (valid) => {
    if (valid) {
    } else {
      return false
    }
  })
}
onMounted(async () => {
  console.log(await getUsers())
})
</script>
<style lang="scss">
  .form {
    & .m-btn {
      height: 45px;
    }
    padding-top: 20px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin: 0 auto;
    &-title {
      display: block;
      color: white;
      font-size: 40px;
      text-align: center;
      margin-bottom: 20px;
    }
    &-button {
      width: 100%;
      margin-top: 18px;
    }
    & .el-form {
      width: 100%;
      padding: 0 20px;
    }
  }
</style>
