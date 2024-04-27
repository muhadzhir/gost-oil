<template>
  <div>
    <MazTable size="sm" :headers="['#', 'Номер', 'Сумма', 'Время' ]">
      <MazTableRow v-for="(ticket, i) in tickets">
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
        @close="handlleClose"
    >
      <div class="operator-dialog-field">
        Телефон {{ currentPhone }}
      </div>
      <MazInputNumber
          v-model="sum"
          placeholder="Сумма"
          :max="10000"
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
  import {onMounted, ref} from "vue"
  import {OilStation, TableRow, Ticket} from "@/types.ts";
  import { useSocket } from "@/mixins/socket-connect.ts";
  import { fetchAddTicket, fetchTicketsByOilStation } from "@/api/api.ts";
  import { getDateTimeFormat } from "@/mixins/date-mixins.ts";
  import { showNotification } from "@/components/notifications.ts";
  import { useTokenMixin} from "@/mixins/token.ts";

  const { getUserProperty } = useTokenMixin()
  const {socket} = useSocket()
  const dialogVisible = ref(false)
  const setDialogVisible = (isVisible: boolean) => {
    dialogVisible.value = isVisible
  }
  const currentPhone = ref('')

  const sum = ref<number>(1000)
  const setSum = (sumValue: number) => {
    sum.value = sumValue
  }
  const resetSum = () => {
    setSum(1000)
  }
  const tickets = ref<TableRow[]>([])
  const ticketConfig = {
    phone: {
      value: (val: string) => val
    },
    sum: {
      value: (val: string) => val
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
    if (sum.value < 1000) {
      showNotification('Сумма должна быть не меньше 1000руб')
      return
    }
    const oilStation = getUserProperty<OilStation>('oilStation')
    const {numbers} = await fetchAddTicket({
      phone: currentPhone.value,
      sum: +sum.value,
      oilStation
    })
    socket.emit('addParticipant', { numbers, oilStation })
    setDialogVisible(false)
    await updateTicketsByStation()
  }
  const handlleClose = () => {
    socket.emit('addParticipantReject', {oilStation: getUserProperty('oilStation')})
    resetSum()
  }
  const updateTicketsByStation = async () => {
    const oilTickets = await fetchTicketsByOilStation(getUserProperty<OilStation>('oilStation'))
    tickets.value = oilTickets.map((ticket: Ticket) => {
      const cells = Object.entries(ticket).filter(([key]) => key in ticketConfig).map(([key, value]) => ({ value: ticketConfig[key]!.value(value)}))
      return {
        cells
      }
    })

  }
  onMounted(async () => {
    startWebSocketConnect()
    updateTicketsByStation()
  })
</script>
<style lang="scss">
  .operator-dialog {
    &-field {
      font-size: 20px;
      margin-bottom: 20px;
    }
  }
  .m-table {
    color: black;
    padding: 20px;
  }
</style>
