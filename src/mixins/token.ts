import {jwtDecode} from "jwt-decode";
import {User} from "@/types.ts";

export const getUser = (): User | undefined => {
  const token = localStorage.getItem('token') as any
  if (!token) return

  const user = jwtDecode(token) as User
  return user
}
const isUserExist = (): boolean => {
  return Boolean(getUser())
}
export const getUserProperty = <T>(key: keyof User): T | undefined => {
  const user = getUser()
  if (!user) return
  return user[key] as T
}

export const  useTokenMixin = () => {
  return {
    isUserExist,
    getUser,
    getUserProperty
  }
}
