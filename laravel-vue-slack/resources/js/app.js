require('./bootstrap');

import { createApp } from 'vue'
import router from './router'

const app = createApp({})
app.use(router)

// atoms
import FormLabel from './components/atoms/FormLabel.vue'
import FormText from './components/atoms/FormText.vue'
import HappyIcon from './components/atoms/HappyIcon.vue'
import SignInButton from './components/atoms/SignInButton.vue'
import SignInText from './components/atoms/SignInText.vue'

app.component('form-label', FormLabel)
app.component('form-text', FormText)
app.component('happy-icon', HappyIcon)
app.component('sign-in-button', SignInButton)
app.component('sign-in-text', SignInText)

// molecules
import AppTitle from './components/molecules/AppTitle.vue'
app.component('app-title', AppTitle)

// pages
import Chat from './components/pages/Chat.vue'

app.component('chat', Chat)
app.mount('#app')