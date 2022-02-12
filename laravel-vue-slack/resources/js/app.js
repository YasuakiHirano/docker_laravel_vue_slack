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
import AccountCreateButton from './components/atoms/AccountCreateButton.vue'
import UserInformation from './components/atoms/UserInformation.vue'

app.component('form-label', FormLabel)
app.component('form-text', FormText)
app.component('happy-icon', HappyIcon)
app.component('sign-in-button', SignInButton)
app.component('sign-in-text', SignInText)
app.component('account-create-button', AccountCreateButton)
app.component('user-information', UserInformation)

// molecules
import AppTitle from './components/molecules/AppTitle.vue'
import ChatHeader from './components/molecules/ChatHeader.vue'

app.component('app-title', AppTitle)
app.component('chat-header', ChatHeader)

// pages
import Chat from './components/pages/Chat.vue'
import AccountCreate from './components/pages/AccountCreate.vue'

app.component('chat', Chat)
app.component('account-create', AccountCreate)

app.mount('#app')