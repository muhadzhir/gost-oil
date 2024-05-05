<template>
  <div class="login">
    <MazInput style="margin-bottom: 20px" v-model="name" label="Логин" />
    <MazInput style="margin-bottom: 10px" v-model="password" type="password" label="Пароль" />
    <MazBtn @click="handlerSubmitBtn">Войти</MazBtn>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { fetchLogin } from "@/api/api.ts";
import { jwtDecode } from "jwt-decode";
import router from '@/router'

const name = ref('')
const password = ref('')
const handlerSubmitBtn = async () => {
  const { token } = await fetchLogin({
    name: name.value,
    password: password.value
  })
  const user = jwtDecode(token) as any
  localStorage.setItem('token', token)
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