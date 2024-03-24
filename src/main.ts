import { createApp } from 'vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/dist/locale/ru'
import App from './App.vue'

import 'maz-ui/styles'
import * as components from 'maz-ui/components'
const app = createApp(App)
Object.entries(components).forEach(([componentName, component]) => {
  app.component(componentName, component)
})

app.use(ElementPlus, { locale })
app.use(router)
app.mount('#app')
