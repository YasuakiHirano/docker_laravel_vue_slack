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
import ShowDate from './components/atoms/ShowDate.vue'
import ChatUserImage from './components/atoms/ChatUserImage.vue'
import ChatUserName from './components/atoms/ChatUserName.vue'
import ChatUserDate from './components/atoms/ChatUserDate.vue'
import ThreadIcon from './components/atoms/ThreadIcon.vue'
import EditIcon from './components/atoms/EditIcon.vue'
import DeleteIcon from './components/atoms/DeleteIcon.vue'
import ArrowLeftIcon from './components/atoms/ArrowLeftIcon.vue'
import CancelIcon from './components/atoms/CancelIcon.vue'
import CancelBorderIcon from './components/atoms/CancelBorderIcon.vue'
import MentionBorderIcon from './components/atoms/MentionBorderIcon.vue'
import ReactionBorderIcon from './components/atoms/ReactionBorderIcon.vue'
import SendMessageBorderIcon from './components/atoms/SendMessageBorderIcon.vue'
import ChatTextArea from './components/atoms/ChatTextArea.vue'
import MentionIcon from './components/atoms/MentionIcon.vue'
import FormActionButton from './components/atoms/FormActionButton.vue'
import FormCancelButton from './components/atoms/FormCancelButton.vue'

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
app.component('show-date', ShowDate)
app.component('chat-user-image', ChatUserImage)
app.component('chat-user-name', ChatUserName)
app.component('chat-user-date', ChatUserDate)
app.component('thread-icon', ThreadIcon)
app.component('edit-icon', EditIcon)
app.component('delete-icon', DeleteIcon)
app.component('arrow-left-icon', ArrowLeftIcon)
app.component('cancel-icon', CancelIcon)
app.component('cancel-border-icon', CancelBorderIcon)
app.component('mention-border-icon', MentionBorderIcon)
app.component('reaction-border-icon', ReactionBorderIcon)
app.component('send-message-border-icon', SendMessageBorderIcon)
app.component('chat-text-area', ChatTextArea)
app.component('mention-icon', MentionIcon)
app.component('form-action-button', FormActionButton)
app.component('form-cancel-button', FormCancelButton)

// molecules
import AppTitle from './components/molecules/AppTitle.vue'
import ChatHeader from './components/molecules/ChatHeader.vue'
import AddMember from './components/molecules/AddMember.vue'
import ChannelMenu from './components/molecules/ChannelMenu.vue'
import UserEntryCount  from './components/molecules/UserEntryCount.vue'
import MessageAreaIcons  from './components/molecules/MessageAreaIcons.vue'
import TextAreaIcons  from './components/molecules/TextAreaIcons.vue'

app.component('app-title', AppTitle)
app.component('chat-header', ChatHeader)
app.component('add-member', AddMember)
app.component('channel-menu', ChannelMenu)
app.component('user-entry-count', UserEntryCount)
app.component('message-area-icons', MessageAreaIcons)
app.component('text-area-icons', TextAreaIcons)

// organisms
import SideMenu from './components/organisms/SideMenu.vue'
import ShowChannelName  from './components/organisms/ShowChannelName.vue'
import ChatMessage  from './components/organisms/ChatMessage.vue'
import MentionUserArea from './components/organisms/MentionUserArea.vue'
import ChatInputArea from './components/organisms/ChatInputArea.vue'
import AppModal from './components/organisms/AppModal.vue'
import MentionMemberModal from './components/organisms/MentionMemberModal.vue'
app.component('side-menu', SideMenu)
app.component('show-channel-name', ShowChannelName)
app.component('chat-message', ChatMessage)
app.component('mention-user-area', MentionUserArea)
app.component('chat-input-area', ChatInputArea)
app.component('app-modal', AppModal)
app.component('mention-member-modal', MentionMemberModal)

// pages
import Chat from './components/pages/Chat.vue'
import AccountCreate from './components/pages/AccountCreate.vue'

app.component('chat', Chat)
app.component('account-create', AccountCreate)

app.mount('#app')