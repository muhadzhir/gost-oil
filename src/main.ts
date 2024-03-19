import { createApp } from 'vue'
import router from './router'
import App from './App.vue'
import 'maz-ui/styles'

import * as components from 'maz-ui/components'
const app = createApp(App)
Object.entries(components).forEach(([componentName, component]) => {
  app.component(componentName, component)
})
app.use(router)
app.mount('#app')
