<template>
  <div class="operator">
    <MazTable size="sm" :headers="['#', 'Номер', 'Телефон', 'Заправка', 'Время' ]">
      <MazTableRow v-for="(ticket, i) in tableRows">
        <MazTableCell >
          {{ i + 1 }}
        </MazTableCell>
        <MazTableCell v-for="cell in ticket.cells">
          {{ cell.value }}
        </MazTableCell>

      </MazTableRow>
      <template #no-results-text>
        Нет данных
      </template>
    </MazTable>
    <MazDialog
        v-model="dialogVisible"
        :no-close="true"
        :persistent="true"
        class="operator-dialog"
        title="Новая заявка"
        @close="handleClose"
    >
      <div class="operator-dialog-field">
        Телефон {{ currentPhone }}
      </div>
      <MazInputNumber
          v-model="numbersCount"
          placeholder="Сумма"
          :max="10"
          :min="1"
          :step="1"
          color="secondary"
          style="min-width: 200px"
      />
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
  import { onMounted, ref} from "vue"
  import {OilStation, TableRow, ParticipantNumber} from "@/types.ts";
  import { useSocket } from "@/mixins/socket-connect.ts";
  import { fetchAddTicket, fetchAllNumbers } from "@/api/api.ts";
  import { getDateTimeFormat } from "@/mixins/date-mixins.ts";
  import { showNotification } from "@/components/notifications.ts";
  import { useTokenMixin} from "@/mixins/token.ts";
  import { useBaseMixin } from "@/mixins/base-mixin.ts";
  import {getOilRusName} from "@/utils";
  const { loading, setLoading } = useBaseMixin()
  const { getUserProperty } = useTokenMixin()
  const {socket} = useSocket()
  const dialogVisible = ref(false)
  const setDialogVisible = (isVisible: boolean) => {
    dialogVisible.value = isVisible
  }
  const currentPhone = ref('')

  const numbersCount = ref<number>(1)
  const setSum = (count: number) => {
    numbersCount.value = count
  }
  const resetSum = () => {
    setSum(1)
  }
  const tableRows = ref<TableRow[]>([])
  const rowConfig = {
    id: {
      value: (val: string) => val
    },
    phone: {
      value: (val: string) => val
    },
    numbersCount: {
      value: (val: string) => val
    },
    oilStation: {
      value: (val: OilStation) => getOilRusName(val)
    },
    createdAt: {
      value: (val: string) => getDateTimeFormat(val)
    },
  }


  const startWebSocketConnect = () => {
    socket.on('newTicketClient', ({phone, oilStation }: { phone: string, oilStation: OilStation}) => {
      if(getUserProperty<OilStation>('oilStation') === oilStation) {
        currentPhone.value = phone
        setDialogVisible(true)
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
    const oilStation = getUserProperty<OilStation>('oilStation')!
    const {numbers} = await fetchAddTicket({
      phone: currentPhone.value,
      numbersCount: +numbersCount.value,
      oilStation
    })
    socket.emit('addParticipant', { numbers, oilStation })
    setDialogVisible(false)
    await getNumbers()
    setLoading(false)
  }

  const handleClose = () => {
    socket.emit('addParticipantReject', {oilStation: getUserProperty('oilStation')})
    resetSum()
  }
  const getNumbers = async () => {
    const numbers = await fetchAllNumbers()
    tableRows.value = numbers.map((num: ParticipantNumber) => {
      const cells = Object.entries(num).filter(([key]) => key in rowConfig).map(([key, value]) => {
        const row = rowConfig as any
        const ticketKey = row[key] as any
        return { value: ticketKey!.value(value) as any}
      })
      return {
        cells
      }
    })

  }
  onMounted(async () => {
    startWebSocketConnect()
    getNumbers()
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
