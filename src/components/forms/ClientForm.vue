<template>
  <div>
    <MazFullscreenLoader v-if="ticketInProgress">
      <p>
        Обрабатывается...
      </p>
    </MazFullscreenLoader>
    <div v-if="!ticketInProgress" class="form">
      <el-form ref="formRef" label-position="top" require-asterisk-position="right" :disabled="loading" :model="client"
               class="relative">
        <span class="form-title"> Заполните данные </span>
        <Input
            :input-value="client.phone"
            mask="+7 (###)-###-##-##"
            :rules="rules(clientConfig.find(({ field }) => field === 'phone')!)"
            placeholder="Телефон" class="form-input" field-name="phone"
            @updateField="(val: any) => handlerChangeInput('phone', val)"
        />
        <MazBtn class="form-button" :loading="loading" color="success" size="xl" @click="handlerSubmit(formRef)">
          Подтвердить
        </MazBtn>
      </el-form>
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
import { useTokenMixin } from "@/mixins/token.ts";
import { setNumbers } from "@/store/clientsStore.ts";
import router from "@/router.ts";
const {socket} = useSocket()
const { getUserProperty } = useTokenMixin()
const ticketInProgress = ref(false)
const oilStation = getUserProperty<OilStation>('oilStation')
const setTicketInProgress = (inProgress: boolean) => {
  ticketInProgress.value = inProgress
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
  socket.emit('newTicket', { phone: client.value.phone, oilStation })
  setTicketInProgress(true)
}
const connectSocket = () => {
  socket.on('addParticipant', (data: { oilStation: OilStation, numbers: number[]}) => {
    if (oilStation === data.oilStation) {
      setNumbers(data.numbers)
      router.push({ name: 'AddNumbersSuccess' })
    }
  });
  socket.on('addParticipantReject', (data: { oilStation: OilStation }) => {
    console.log(data)
    if (oilStation === data.oilStation) {
      setTicketInProgress(false)
    }
  });
}

onMounted(() => {
  connectSocket()
})
</script>

<style lang="scss">
.form {
  padding: 0 200px;
  & .m-btn {
    height: 45px;
  }
  & .el-form-item__error {
    margin-top: 5px;
    margin-bottom: 10px;
    font-size: 20px;
    color: orange;
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