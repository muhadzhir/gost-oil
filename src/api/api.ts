import {API_GET} from "@/api/api-helpers.ts";
import {User} from "@/types.ts";

const mainUrl = `${import.meta.env.VITE_APP_API_MAIN}`

export const getUsers = () => {
  return API_GET<User[]>(`${mainUrl}/users`)
}
