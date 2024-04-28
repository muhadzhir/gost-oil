import {jwtDecode} from "jwt-decode";
import {User} from "@/types.ts";

export const getUser = (): User => {
  const token = localStorage.getItem('token') as any
  const user = jwtDecode(token) as User
  return user
}
export const getUserProperty = <T>(key: keyof User): T => {
  const user = getUser()
  return user[key] as T
}

export const  useTokenMixin = () => {
  return {
    getUser,
    getUserProperty
  }
}
