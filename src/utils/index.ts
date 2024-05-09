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