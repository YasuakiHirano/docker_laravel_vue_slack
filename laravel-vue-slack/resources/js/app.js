require('./bootstrap');

import { createApp } from 'vue'
import Chat from './components/pages/Chat.vue'
import router from './router'

const app = createApp({})
app.use(router)
app.component('chat', Chat)
app.mount('#app')