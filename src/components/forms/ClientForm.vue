<template>
  <div class="client">
    <div v-if="isUserExist()"  class="client-form">
      <MazFullscreenLoader v-if="ticketInProgress">
        <p>
          Обрабатывается...
        </p>
        <MazBtn @click="handlerTicketCancel">Отменить</MazBtn>
      </MazFullscreenLoader>
      <div v-if="!ticketInProgress">
        <el-form ref="formRef" label-position="top" require-asterisk-position="right" :disabled="loading" :model="client"
                 class="relative">
          <span class="client-title"> Заполните данные </span>
          <Input
              :input-value="client.phone"
              mask="+7 (###)-###-##-##"
              :rules="rules(clientConfig.find(({ field }) => field === 'phone')!)"
              placeholder="Телефон" class="client-input" field-name="phone"
              @updateField="(val: any) => handlerChangeInput('phone', val)"
              @keyup.enter="handlerSubmit(formRef)"
          />
          <input field-name="test" input-value="test" style="display: none" />
          <MazBtn class="client-button" :loading="loading" color="success" size="xl" @click="handlerSubmit(formRef)">
            Подтвердить
          </MazBtn>
        </el-form>
      </div>
    </div>
    <div v-else style="font-size: 40px">
      Нужно подключить заправку
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {FormeRequestData, FormItemConfig, OilStation} from "@/types.ts"
import { ClientModel } from '@/models/ClientModel.ts'
import Input from '@/components/forms/Input.vue'
import {client} from "@/store/clientsStore.ts"
import type { FormInstance } from 'element-plus'
import { useSocket } from "@/mixins/socket-connect.ts";
import { initOilStation, currentOilStation} from "@/store/oilStationStore.ts";
import { useTokenMixin } from "@/mixins/token.ts";
import { setNumbers } from "@/store/clientsStore.ts";
import router from "@/router.ts";

const {socket} = useSocket()
const { isUserExist } = useTokenMixin()
const ticketInProgress = ref(false)

const setTicketInProgress = (inProgress: boolean) => {
  ticketInProgress.value = inProgress
}
const handlerTicketCancel = () => {
  socket.emit('addParticipantReject', {oilStation: currentOilStation.value})
}
const emits = defineEmits<{
  (e: 'submitted', requestData: FormeRequestData): void
}>()

const formRef = ref<FormInstance>()
const loading = ref(false)
const clientConfig: FormItemConfig<ClientModel>[] = [
  {
    field: 'phone',
    required: () => true,
    validateRule: (
        __: unknown,
        _: unknown,
        value: string,
        cb: Function
    ) => {
      if (value.length < 18) {
        cb(
            new Error(
                `Телефон заполнен не до конца`
            )
        )
      }
      cb()
    }
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
  if (config.validateRule) {
    rules.push({
      validator: config.validateRule.bind(this, client.value),
      trigger: 'change'
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
  formInstance.validate(async (valid) => {
    if (valid) {
      handlerSuccess()
    } else {
      return false
    }
  })
}
const handlerSuccess = () => {
  socket.emit('newTicket', { phone: client.value.phone, oilStation: currentOilStation.value})
  setTicketInProgress(true)
}
const connectSocket = () => {
  socket.on('addParticipant', (data: { oilStation: OilStation, numbers: number[]}) => {
    if (currentOilStation.value === data.oilStation) {
      setNumbers(data.numbers)
      router.push({ name: 'AddNumbersSuccess' })
    }
  });
  socket.on('addParticipantReject', (data: { oilStation: OilStation }) => {
    if (currentOilStation.value === data.oilStation) {
      setTicketInProgress(false)
    }
  });
}

onMounted(() => {
  initOilStation()
  connectSocket()

})
</script>

<style lang="scss">
.client {
  padding: 20px 150px 0 150px;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
  & .m-btn {
    height: 45px;
  }
  & .el-form-item__error {
    margin-top: 5px;
    margin-bottom: 10px;
    font-size: 20px;
    color: orange;
  }



  &-title {
    display: block;
    color: white;
    font-size: 40px;
    text-align: center;
    margin-bottom: 20px;
  }
  &-subtitle {
    display: block;
    font-size: 24px;
    text-align: center;
    margin-bottom: 10px;
  }

  &-button {
    width: 100%;
    margin-top: 18px;
    padding-top: 10px !important;
  }

  & .el-form {
    width: 100%;
    padding: 0 20px;
  }
}
</style>