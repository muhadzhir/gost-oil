import {FormItemConfig, OilStation} from "@/types.ts";
import {ClientModel} from "@/models/ClientModel.ts";
import {client} from "@/store/clientsStore.ts";

export const getOilRusName = (oilStation: OilStation) => {
  const oilStationMap: Record<OilStation, string> = {
    ZARECHNY: 'Заречный',
    SHOSEINAYA: 'Шоссейная',
    GUTYAKULOVA: 'Гутякулова'
  }
  return oilStationMap[oilStation]
}
export const rules = (config: FormItemConfig<ClientModel>) => {
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
export const createLinkFile = (file: ArrayBuffer, name = 'attachment') => {
  const url = window.URL.createObjectURL(
    new Blob([file], { type: 'application/octet-stream' })
  )
  downloadFile(url, name)
}
export const downloadFile = (url: string, nameFile = 'attachment') => {
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', nameFile)
  document.body.append(link)
  link.click()
  link.remove()
}
