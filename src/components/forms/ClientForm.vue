<template>
  <div class="client">
    <div v-if="isClient"  class="client-form">
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
          <MazCheckbox
              v-model="personalDataConsent"
              :value="personalDataConsent"
              class="check-numbers-privacy"
              :class="{'client-form-privacy_danger': warningVisible}"
              @change="handlerChangePersonal"
          >
            Согласен с обработкой персональных данных
          </MazCheckbox>
          <MazBtn class="client-button" :loading="loading" color="success" size="xl" @click="handlerSubmit(formRef)">
            Подтвердить
          </MazBtn>
        </el-form>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
import {ref, onMounted, computed} from 'vue'
import {FormeRequestData, OilStation} from "@/types.ts"
import { ClientModel } from '@/models/ClientModel.ts'
import Input from '@/components/forms/Input.vue'
import {client} from "@/store/clientsStore.ts"
import type { FormInstance } from 'element-plus'
import { useSocket } from "@/mixins/socket-connect.ts";
import { initOilStation, currentOilStation} from "@/store/oilStationStore.ts";
import { useTokenMixin } from "@/mixins/token.ts";
import { rules } from '@/utils'
import { clientConfig } from "@/fields/client-fields.ts";
import { setNumbers } from "@/store/clientsStore.ts";
import router from "@/router.ts";

const {socket} = useSocket()
const { isClient } = useTokenMixin()
const ticketInProgress = ref(false)
const personalDataConsent = ref(true)

const formSubmitted = ref(false)
const setFormSubmitted = (_formSubmitted: boolean) => {
  formSubmitted.value = _formSubmitted
}

const warningVisible = computed(() => !personalDataConsent.value && formSubmitted.value)

const setTicketInProgress = (inProgress: boolean) => {
  ticketInProgress.value = inProgress
}

const emits = defineEmits<{
  (e: 'submitted', requestData: FormeRequestData): void
}>()

const formRef = ref<FormInstance>()
const loading = ref(false)

const handlerTicketCancel = () => {
  socket.emit('addParticipantReject', {oilStation: currentOilStation.value})
}
const handlerChangePersonal = () => {
  setFormSubmitted(false)
}
const handlerChangeInput = (field: keyof ClientModel, val: string) => {
  //@ts-ignore
  client.value[field] = val
}

const handlerSubmit = (formInstance: FormInstance | undefined) => {
  setFormSubmitted(true)
  if (!formInstance || !personalDataConsent.value) return
  formInstance.validate(async (valid) => {
    if (valid) {
      handlerSuccess()
    }
  })
  setFormSubmitted(false)
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
    console.log('addParticipantReject')
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
  &-form {
    &-privacy {
      margin-bottom: 10px;
      font-size: 14px ;
      &_danger {
        color: #FF4545;
      }
    }
  }
  overflow: hidden;
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
  &-input {
     font-size: 40px;
  }
}
</style>