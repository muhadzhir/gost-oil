<template>
  <div v-if="isOperator" class="operator">
    <MazTable v-model:page="page" v-model:page-size="pageSize" v-model:search-query="searchQuery"
      searchPlaceholder="Поиск" noSearchBy search sortable hoverable background-even pagination size="sm" :headers="[
        {
          label: 'Номер',
          key: 'id',
        },
        {
          label: 'Телефон',
          key: 'phone',
        },
        {
          label: 'Заправка',
          key: 'oilStation',
        },
        {
          label: 'Время',
          key: 'createdAt',
        },
      ]" :rows="tableRows">

      <template #no-results-text>
        Нет данных
      </template>
    </MazTable>
    <MazBtn style="margin-left: 20px" @click="handlerClickDownloadBtn">Скачать отчёт</MazBtn>
    <MazDialog v-model="dialogVisible" :no-close="true" :persistent="true" class="operator-dialog" title="Новая заявка"
      @close="handleClose">
      <div class="operator-dialog-field">
        Телефон {{ currentPhone }}
      </div>
      <MazInputNumber v-model="numbersCount" placeholder="Сумма" :max="10" :min="1" :step="1" color="secondary"
        style="min-width: 200px" />
      <template #footer="{ close }">
        <MazBtn style="margin-right: 10px" @click="handlerConfirm">
          Подтвердить
        </MazBtn>
        <MazBtn @click="close">
          Отменить
        </MazBtn>
      </template>
    </MazDialog>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { OilStation, ParticipantNumber } from "@/types.ts";
import { useSocket } from "@/mixins/socket-connect.ts";
import { fetchAddTicket, fetchAllNumbers, fetchDownloadNumbers } from "@/api/api.ts";
import { useDateMixin } from "@/mixins/date-mixins.ts";
import { showNotification } from "@/components/notifications.ts";
import { useBaseMixin } from "@/mixins/base-mixin.ts";
import { createLinkFile, getOilRusName } from "@/utils";
import { initOilStation, currentOilStation } from "@/store/oilStationStore.ts";
import { useTokenMixin } from "@/mixins/token.ts";

const { getDateFormat, getDateTimeFormat } = useDateMixin()
const { loading, setLoading } = useBaseMixin()
const { isOperator } = useTokenMixin()
const { socket } = useSocket()
const dialogVisible = ref(false)
const setDialogVisible = (isVisible: boolean) => {
  dialogVisible.value = isVisible
}
const currentPhone = ref('')
const setCurrentPhone = (phone: string) => {
  currentPhone.value = phone
}
const page = ref(1)
const searchQuery = ref()
const pageSize = ref(10)
const numbersCount = ref<number>(1)
const setSum = (count: number) => {
  numbersCount.value = count
}
const resetSum = () => {
  setSum(1)
}
const tableRows = ref<ParticipantNumber[]>([])

const replacePaginationToRus = () => {
  const pagination = document.querySelector('.m-table-footer-pagination-items-per-page .maz-text-sm ')
  if (pagination) pagination.innerHTML = 'Кол-во элементов на странице'
}
const startWebSocketConnect = () => {
  socket.on('newTicketClient', ({ phone, oilStation }: { phone: string, oilStation: OilStation }) => {
    if (currentOilStation.value === oilStation) {
      setCurrentPhone(phone)
      setDialogVisible(true)
    }
  });
  socket.on('addParticipantReject', (data: { oilStation: OilStation }) => {
    if (currentOilStation.value === data.oilStation) {
      setCurrentPhone('')
      setDialogVisible(false)
    }
  });
}
const handlerConfirm = async () => {
  if (numbersCount.value < 1) {
    showNotification('')
    return
  }
  if (loading.value) return
  setLoading(true)
  const { numbers } = await fetchAddTicket({
    phone: currentPhone.value,
    numbersCount: +numbersCount.value,
    oilStation: currentOilStation.value!
  })
  socket.emit('addParticipant', { numbers, oilStation: currentOilStation.value })
  setDialogVisible(false)
  await getNumbers()
  setLoading(false)
}

const handleClose = () => {
  socket.emit('addParticipantReject', { oilStation: currentOilStation.value })
  resetSum()
}
const handlerClickDownloadBtn = async () => {
  const data = await fetchDownloadNumbers()
  createLinkFile(data, `Номерки на ${getDateFormat(new Date())}.xlsx`)
}
const getNumbers = async () => {
  const numbers = await fetchAllNumbers()
  //@ts-ignore
  tableRows.value = numbers.map(num => {
    return {
      ...num,
      oilStation: getOilRusName(num.oilStation),
      createdAt: getDateTimeFormat(num.createdAt)
    }
  }).reverse()
}
onMounted(async () => {
  initOilStation()
  startWebSocketConnect()
  await getNumbers()
  replacePaginationToRus()
})
</script>
<style lang="scss">
.operator {
  &-title {
    margin-top: 20px;
    font-size: 20px;
    display: flex;
    justify-content: center;
  }

  &-dialog {
    &-field {
      font-size: 20px;
      margin-bottom: 20px;
    }
  }
}

.m-table {
  color: black;
  padding: 20px;
}
</style>
