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
import HashIcon from './components/atoms/HashIcon.vue'
import LockIcon from './components/atoms/LockIcon.vue'
import PlusIcon from './components/atoms/PlusIcon.vue'
import ArrowBottomIcon from './components/atoms/ArrowBottomIcon.vue'
import ArrowRightIcon from './components/atoms/ArrowRightIcon.vue'
import UserIcon from './components/atoms/UserIcon.vue'
import ServiceTitle from './components/atoms/ServiceTitle.vue'

app.component('form-label', FormLabel)
app.component('form-text', FormText)
app.component('happy-icon', HappyIcon)
app.component('sign-in-button', SignInButton)
app.component('sign-in-text', SignInText)
app.component('account-create-button', AccountCreateButton)
app.component('user-information', UserInformation)
app.component('hash-icon', HashIcon)
app.component('lock-icon', LockIcon)
app.component('plus-icon', PlusIcon)
app.component('arrow-bottom-icon', ArrowBottomIcon)
app.component('arrow-right-icon', ArrowRightIcon)
app.component('user-icon', UserIcon)
app.component('service-title', ServiceTitle)

// molecules
import AppTitle from './components/molecules/AppTitle.vue'
import ChatHeader from './components/molecules/ChatHeader.vue'
import AddMember from './components/molecules/AddMember.vue'
import ChannelMenu from './components/molecules/ChannelMenu.vue'
import UserEntryCount  from './components/molecules/UserEntryCount.vue'

app.component('app-title', AppTitle)
app.component('chat-header', ChatHeader)
app.component('add-member', AddMember)
app.component('channel-menu', ChannelMenu)
app.component('user-entry-count', UserEntryCount)

// organisms
import SideMenu from './components/organisms/SideMenu.vue'
import ShowChannelName  from './components/organisms/ShowChannelName.vue'
app.component('side-menu', SideMenu)
app.component('show-channel-name', ShowChannelName)

// pages
import Chat from './components/pages/Chat.vue'
import AccountCreate from './components/pages/AccountCreate.vue'

app.component('chat', Chat)
app.component('account-create', AccountCreate)

app.mount('#app')