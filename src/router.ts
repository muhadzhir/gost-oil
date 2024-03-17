import { createRouter, createWebHistory } from 'vue-router'
import defaultRoutes from '@/routes'


const routes = [
  ...defaultRoutes
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


export default router
