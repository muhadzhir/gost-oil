import {jwtDecode} from "jwt-decode";
import {User, UserRole} from "@/types.ts";
import {computed} from "vue";

export const getUser = (): User | undefined => {
  const token = localStorage.getItem('token') as any
  if (!token) return
  const user = jwtDecode(token) as User
  return user
}
const isUserExist = (): boolean => {
  return Boolean(getUser())
}
const isOperator = computed((): boolean => {
  return Boolean(getUserProperty<UserRole>('role') === 'OPERATOR')
})

const isClient = computed((): boolean => {
  return Boolean(getUserProperty<UserRole>('role') === 'CLIENT')
})
export const getUserProperty = <T>(key: keyof User): T | undefined => {
  const user = getUser()
  if (!user) return
  return user[key] as T
}

export const  useTokenMixin = () => {
  return {
    isUserExist,
    isOperator,
    isClient,
    getUser,
    getUserProperty
  }
}
