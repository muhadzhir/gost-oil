<template>
    <div class="check-numbers">
    <div v-if="numberFormVisible" class="check-numbers-form">
      <el-form ref="formRef" label-position="top" require-asterisk-position="right" :disabled="loading" :model="client"
               class="relative">
        <span class="check-numbers-title"> Заполните данные </span>
        <Input
            :input-value="client.phone"
            mask="+7 (###)-###-##-##"
            :rules="rules(clientConfig.find(({ field }) => field === 'phone')!)"
            placeholder="Телефон" class="check-numbers-input" field-name="phone"
            @updateField="(val: any) => handlerChangeInput('phone', val)"
            @keyup.enter="handlerSubmit(formRef)"
        />
        <div>
          <MazCheckbox
              v-model="personalDataConsent"
              :value="personalDataConsent"
              class="check-numbers-privacy"
              :class="{'check-numbers-privacy_danger': warningVisible}"
              @change="handlerChangePersonal"
          >
            Согласен с обработкой персональных данных
          </MazCheckbox>
        </div>

        <input field-name="test" input-value="test" style="display: none" />
        <MazBtn class="check-numbers-button" :loading="loading" @click="handlerSubmit(formRef)">
          Посмотреть
        </MazBtn>
      </el-form>
    </div>
    <div v-if="!numberFormVisible" class="check-numbers-list-wrapper">
      <div>
        <div class="check-numbers-title">
          По телефону ({{ client.phone }}) найдены следующие акционные номерки
        </div>
        <div v-if="numbers.length" class="check-numbers-list">
          <el-button
              v-for="num in numbers"
              class="check-numbers-item"
              type="success"
              size="large"
          >
            {{ num }}
          </el-button>
        </div>
        <div v-else>
          К выбранному телефону нет акционных номерков
        </div>
      </div>
      <MazBtn style="margin-top: 10px" @click="handlerCompleteBtnClick">
        Завершить
      </MazBtn>
    </div>
  </div>
</template>
<script setup lang="ts">
import Input from "@/components/forms/Input.vue";
import {computed, ref} from "vue";
import {fetchNumbers} from "@/api/api.ts";
import {client} from "@/store/clientsStore.ts";
import type {FormInstance} from "element-plus";
import {useBaseMixin} from "@/mixins/base-mixin.ts";
import {ClientModel} from "@/models/ClientModel.ts";
import { rules } from "@/utils";
import { clientConfig } from "@/fields/client-fields.ts";

const { loading, setLoading } = useBaseMixin()
const numbers = ref<number[]>([])
const personalDataConsent = ref(true)

const formRef = ref<FormInstance>()
const numberFormVisible = ref(true)
const setNumberFormVisible = (_numberFormVisible: boolean) => {
  numberFormVisible.value = _numberFormVisible
}

const formSubmitted = ref(false)
const setFormSubmitted = (_formSubmitted: boolean) => {
  formSubmitted.value = _formSubmitted
}
const warningVisible = computed(() => !personalDataConsent.value && formSubmitted.value)
const handlerChangePersonal = () => {
  setFormSubmitted(false)
}
const handlerCompleteBtnClick = () => {
  setNumberFormVisible(true)
}

const handlerChangeInput = (field: keyof ClientModel, val: string) => {
  //@ts-ignore
  client.value[field] = val
}
const handlerSubmit = async  (formInstance: FormInstance | undefined) => {
  if (!formInstance || loading.value) return
  setFormSubmitted(true)
  if (!personalDataConsent.value) return
  await formInstance.validate(async (valid) => {
    setLoading(true)
    if (valid) {
      await handlerSuccess(client.value.phone!)
    }
    setLoading(false)
  })

}
const handlerSuccess = async (phone: string) => {
  const numConfig = await fetchNumbers(phone)
  numbers.value = numConfig.map(({id}) => id)
  setNumberFormVisible(false)
}
</script>
<style lang="scss">
  .check-numbers {
    padding: 20px;
    &-title {
      font-size: 20px;
      display: block;
      margin-bottom: 10px;
    }
    &-list {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      gap: 4px;
      .el-button {
        margin-left: 0;
      }
    }
    &-privacy {
      margin-bottom: 10px;
      font-size: 14px ;
      &_danger {
        color: #FF4545;
      }
    }
    &-input {
      margin-bottom: 5px;
      & .el-form-item__error {
        display: block;
        margin-bottom: 10px;
        font-size: 14px;
        color: orange;
      }
    }
  }
  .footer {
    display: none;
  }
</style>
