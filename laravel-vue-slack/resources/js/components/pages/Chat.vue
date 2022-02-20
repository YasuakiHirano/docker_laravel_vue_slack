<template>
  <div class="main">
    <chat-header class="header" userName="テストユーザー" />
    <side-menu class="side-menu" :channelId="1" />
    <div class="message-area">
      <show-channel-name
        :count="userCount"
      >
        <div class="flex">
          <div v-if="isChannelPublic"><hash-icon class="mt-1 w-5 h-5"></hash-icon></div>
          <div v-else><lock-icon class="mt-1 w-5 h-5"></lock-icon></div>
          <div class="mr-1">{{ channelName }}</div>
        </div>
      </show-channel-name>
      <div class="w-full overflow-y-scroll">
        <transition-group name="list" tag="div">
          <div v-for="(message, index) in messages" :key="message.id">
            <chat-message
              class="mt-5 w-full"
              :channelId="1"
              :messageId="message.id"
              :date="message.date"
              :imagePath="message.imagePath"
              :postUserName="message.postUserName"
              :postTime="message.postTime"
              :content="message.content"
              :isMyMessage="userName === message.postUserName"
              :showThreadIcon="true"
            />
          </div>
        </transition-group>
      </div>
      <chat-input-area
        ref="chatInputArea"
        @event:clickMentionIcon="isShowMentionMember = true"
        @event:clickReactionIcon="isShowEmojiPicker = true"
        @event:deleteMentionUser="deleteMentionUser"
        :userId="userId"
        :channelId="selectChannel"
        :channelName="channelName"
        :isMention="true"
        class="mt-2" />
    </div>
    <mention-member-modal
      ref="mentionMemberModal"
      :showModal="isShowMentionMember"
      :channelUsers="channelUsers"
      @event:modalClose="isShowMentionMember = false"
      @event:mentionUsers="selectMentionUsers"
    />
    <div
      class="absolute w-full h-full"
      @click="isShowEmojiPicker = false"
      v-show="isShowEmojiPicker">
    </div>
    <!---絵文字入力用の絵文字ピッカー--->
    <emoji-picker
      class="absolute bottom-20 right-4"
      @event:selectEmoji="inputEmoji"
      :isShow="isShowEmojiPicker"
    />
  </div>
</template>
<script>
import { ref, onMounted } from 'vue'
export default {
  setup() {
    const channelName = ref('general')
    const isChannelPublic = ref(false)
    const userCount = ref(0)
    const messages = ref([])
    const chatInputArea = ref(null)
    const selectChannel = ref(1)
    const userId = ref(0)
    const isShowEmojiPicker = ref(false)
    const isShowMentionMember = ref(false)
    const mentionMemberModal = ref(null)
    const channelUsers = ref([])
    channelUsers.value = [{
      'id': 1,
      'imagePath': 'image/user_image_1.png',
      'name': 'taro',
    },
    {
      'id': 2,
      'imagePath': 'image/user_image_2.png',
      'name': 'jiro',
    },
    {
      'id': 3,
      'imagePath': 'image/user_image_3.png',
      'name': 'hanako',
    }]

    const userName = ref('')
    userName.value = 'taro'

    onMounted(() => {
      // chatInputArea.value.mentionUserArea.mentionUsers = ['taro', 'jiro']
    })

    messages.value = [{
      'id': 1,
      'imagePath': 'image/user_image_1.png',
      'date': '2021年10月20日',
      'postUserName': 'taro',
      'postTime': '12:00',
      'content': '1番目のメッセージです！',
    },
    {
      'id': 2,
      'imagePath': 'image/user_image_2.png',
      'date': '',
      'postUserName': 'jiro',
      'postTime': '12:00',
      'content': '2番目のメッセージです！',
    },
    {
      'id': 3,
      'imagePath': 'image/user_image_3.png',
      'date': '2021年10月21日',
      'postUserName': 'hanako',
      'postTime': '12:00',
      'content': '3番目のメッセージです！',
    }]

    /**
     * メンションの削除ボタンが押された時の処理
     * @param {string} mentionUser メンションユーザー名
     */
    const deleteMentionUser = (mentionUser) => {
      chatInputArea.value.mentionUserArea.mentionUsers = chatInputArea.value.mentionUserArea.mentionUsers.filter((user) => { return user !== mentionUser })
      mentionMemberModal.value.selectUsers = mentionMemberModal.value.selectUsers.filter((user) => { return user !== mentionUser })
    }

    /**
     * メンションするユーザーを選択された時の処理
     * @param {array} mentionUsers
     */
    const selectMentionUsers = (mentionUsers) => {
      chatInputArea.value.mentionUserArea.mentionUsers = mentionUsers
      isShowMentionMember.value = false
    }

    /**
     * テキストエリアの絵文字ピッカーで絵文字の選択時処理
     * @param {object} emoji 絵文字オブジェクト
     */
    const inputEmoji = (emoji) => {
      if (chatInputArea.value.chatTextArea.text === undefined || chatInputArea.value.chatTextArea.text === null) {
        chatInputArea.value.chatTextArea.text = ''
      }

      chatInputArea.value.chatTextArea.text += emoji.native
      chatInputArea.value.isDisableSendMessage()
      isShowEmojiPicker.value = false
    }

    return {
      channelName,
      isChannelPublic,
      userCount,
      messages,
      userName,
      chatInputArea,
      selectChannel,
      userId,
      isShowEmojiPicker,
      isShowMentionMember,
      deleteMentionUser,
      channelUsers,
      selectMentionUsers,
      mentionMemberModal,
      inputEmoji,
    }
  }
}
</script>
<style scoped>
.main {
  display: grid;
  grid-template-columns: minmax(210px, 20%) 1fr;
  grid-auto-rows: 30px calc(100vh - 30px);
  min-height: 100vh;
  margin: 0;
}
.header {
  grid-row: 1;
  grid-column: 1 / span 2;
  background-color:#350d36;
}
.side-menu {
  grid-row: 2;
  grid-column: 1;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color:#3F0E40;
}
.message-area {
  grid-row: 2;
  grid-column: 2;
  overflow-y: hidden;
  overflow-x: hidden;

  display: grid;
  grid-auto-rows: 50px 1fr 100px;
}
@media screen and (max-width: 500px) {
  .main {
    grid-template-columns: 1fr;
  }
  .side-menu {
    display: none;
  }
  .message-area {
    grid-column: 1;
  }
}
.list-enter-active,
.list-leave-active {
  transition: opacity 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
}
</style>