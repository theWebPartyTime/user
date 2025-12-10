import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import router from './routes/router'   

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

import { useUserStore } from './stores/userStore'
const userStore = useUserStore()
userStore.loadFromLocalStorage()
app.use(router)                 
app.mount('#app')

