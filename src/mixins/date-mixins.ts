import dayjs from 'dayjs'
import 'dayjs/locale/ru'
dayjs.locale('ru')

type DateType = Date | string
const getDateFormat = (time: DateType, format = 'DD.MM.YYYY') => {
  return dayjs(time).format(format)
}
const getDateTimeFormat = (
  time: DateType,
  format = 'DD.MM.YYYY HH:mm'
) => {
  return dayjs(time).format(format)
}
export const useDateMixin = () => {
  return { getDateFormat, getDateTimeFormat }
}
