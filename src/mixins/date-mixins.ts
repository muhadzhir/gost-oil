import dayjs from 'dayjs'
import 'dayjs/locale/ru'
dayjs.locale('ru')

export const getDateFormat = (time: string, format = 'YYYY.MM.DD') => {
  return dayjs(time).format(format)
}
export const getDateTimeFormat = (
  time: string,
  format = 'DD.MM.YYYY HH:mm'
) => {
  return dayjs(time).format(format)
}
