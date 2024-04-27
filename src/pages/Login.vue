<template>
  <div class="login">
    <MazInput v-model="name" label="Логин" />
    <MazInput v-model="password" label="Пароль" />
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
  max-width: 768px;
  margin: 0 auto;
  display: grid;
  gap: 10px;
  padding-top: 20px;
}
</style>