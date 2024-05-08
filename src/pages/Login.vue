<template>
  <div class="login">
    <MazInput style="margin-bottom: 20px" v-model="name" label="Логин" />
    <MazInput style="margin-bottom: 10px" v-model="password" type="password" label="Пароль" />
    <MazBtn :loading="loading" @click="handlerSubmitBtn">Войти</MazBtn>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { fetchLogin } from "@/api/api.ts";
import { jwtDecode } from "jwt-decode";
import router from '@/router'
import { setOilStation } from "@/store/oilStationStore.ts";
import {showNotification} from "@/components/notifications.ts";
import {useBaseMixin} from "@/mixins/base-mixin.ts";
const { loading, setLoading } = useBaseMixin()
const name = ref('')
const password = ref('')
const handlerSubmitBtn = async () => {
  if (loading.value) return
  setLoading(true)
  const data = await fetchLogin({
    name: name.value,
    password: password.value
  })
  setLoading(false)
  if ('message' in data) {
    showNotification(data.message)
    return
  }
  const { token } = data
  const user = jwtDecode(token) as any
  localStorage.setItem('token', token)
  setOilStation(user.oilStation)
  if (user.role === 'CLIENT') {
    router.push({ name: 'Client', params: { oilStation: user.oilStation } })
  }
  if (user.role === 'OPERATOR') {
    router.push({ name: 'Operator', params: { oilStation: user.oilStation } })
  }
}
</script>
<style lang="scss" scoped>
.login {
  max-width: 1024px;
  min-width: 768px;
  gap: 10px;
  margin: 0 auto;
  padding-top: 20px;
}
</style>