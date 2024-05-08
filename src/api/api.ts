import {API_GET, API_POST} from "@/api/api-helpers.ts";
import {OilStation, ParticipantNumber, Ticket, User} from "@/types.ts";

const mainUrl = `${import.meta.env.VITE_APP_API_MAIN}`
type LoginParams = {
  name: string
  password: string
}


export const getUsers = () => {
  return API_GET<User[]>(`${mainUrl}/users`)
}
export const fetchLogin = (params: LoginParams) => {
  return API_POST<{token: string} | { message: string }>(`${mainUrl}/auth/login`, params)
}

export const fetchAddTicket = (params: Ticket) => {
  return API_POST<{ ticked: Ticket, numbers: number[] }>(`${mainUrl}/tickets/add-ticket`, params)
}
export const fetchNumbers = (phone: string) => {
  return API_POST<ParticipantNumber[]>(`${mainUrl}/numbers/get-numbers`, { phone })
}
export const fetchAllNumbers = () => {
  return API_GET<ParticipantNumber[]>(`${mainUrl}/numbers/get-all-numbers`)
}
export const fetchTicketsByOilStation = (oilStation: OilStation) => {
  return API_GET<Ticket[]>(`${mainUrl}/tickets/get-tickets/${oilStation}`)
}
