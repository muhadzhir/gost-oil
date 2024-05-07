import {computed, ref} from "vue";
import {OilStation} from "@/types.ts";
import {getOilRusName} from "@/utils";
import {useTokenMixin} from "@/mixins/token.ts";
const { getUserProperty } = useTokenMixin()
const currentOilStation = ref<OilStation | null>(null)
const oilStationRussName = computed(() => currentOilStation.value ? getOilRusName(currentOilStation.value): null)
const setOilStation= (oilStation: OilStation) => {
  currentOilStation.value = oilStation
}

const initOilStation = () => {
  const oilStation = getUserProperty<OilStation>('oilStation')
  if (oilStation) setOilStation(oilStation)
}

export  {
  currentOilStation,
  oilStationRussName,
  setOilStation,
  initOilStation
}
