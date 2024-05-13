import { createApp } from 'vue'
import router from './router'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { MaskInput } from 'vue-3-mask';
import 'maz-ui/styles'
import * as components from 'maz-ui/components'
const app = createApp(App)
Object.entries(components).forEach(([componentName, component]) => {
  app.component(componentName, component)
})
app.component('MaskInput', MaskInput)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus)
app.use(router)
app.mount('#app')