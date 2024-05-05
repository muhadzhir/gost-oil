import {getOilRusName} from "@/utils";
import {OilStation} from "@/types.ts";
import { useTokenMixin } from "@/mixins/token.ts";

const {  getUserProperty } = useTokenMixin()
export const useOilStationMixin = () => {
  const getOilRusNameByUser = () => {
    const oilStation =  getUserProperty<OilStation>('oilStation')
    return oilStation ? getOilRusName(oilStation): 'Не определена'
  }

  return {
    getOilRusNameByUser
  }
}
