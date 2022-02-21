<template>
  <div class="main">
    <chat-header class="header" userName="テストユーザー" />
    <side-menu
      class="side-menu"
      :channelId="1"
      @event:addMember="showAddMember = true"
    />
    <div class="message-area">
      <show-channel-name
        :count="userCount"
        @event:clickCountChannel="isChannelTab = false;showChannelDetail = true;"
        @event:openChannelDetail="isChannelTab = true;showChannelDetail = true;"
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
    <!----チャンネル情報表示---->
    <channel-detail-modal
      :showModal="showChannelDetail"
      :isChannelTab="isChannelTab"
      :channelUsers="channelUsers"
      :description="channelDescription"
      :createUser="channelCreateUser"
      :isChannelPublic="isChannelPublic"
      :channelName="channelName"
      @event:deleteChannel="deleteChannel"
      @event:editChannelDescription="openDescriptionEditModal"
      @event:addChannelMember="showAddChannelMember = true"
      @event:modalAction="showChannelDetail = false" />
    <!----チャンネル説明編集---->
    <channel-description-edit-modal
      ref="channelDescriptionEditModal"
      :showModal="showEditChannelDescription"
      @event:modalAction="updateChannelDescription"
      @event:modalClose="showEditChannelDescription = false" />
    <!----チャンネルメンバー追加---->
    <channel-add-member-modal
      ref="channelAddMemberModal"
      :showModal="showAddChannelMember"
      :notChannelUsers="notChannelUsers"
      @event:addUsers="channelAddUsers"
      @event:modalClose="showAddChannelMember = false" />
    <div
      class="absolute w-full h-full"
      @click="isShowEmojiPicker = false"
      v-show="isShowEmojiPicker">
    </div>
    <!----絵文字入力用の絵文字ピッカー---->
    <emoji-picker
      class="absolute bottom-20 right-4"
      @event:selectEmoji="inputEmoji"
      :isShow="isShowEmojiPicker"
    />
    <!----メンバー招待---->
    <add-member-modal
      ref="addMemberModal"
      :showModal="showAddMember"
      @event:modalAction="sendInvitationMail"
      @event:modalClose="showAddMember = false"
      @event:updateText="updateEmail" />
    <add-member-success-modal
      :showModal="showAddMemberSuccess"
      @event:modalAction="showAddMemberSuccess = false" />
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
    const isChannelTab = ref(true)
    const showAddChannelMember = ref(false)
    const showChannelDetail = ref(false)
    const channelDescription = ref('')
    const channelCreateUser = ref('')
    const channelDescriptionEditModal = ref(null)
    const showEditChannelDescription = ref(false)
    const notChannelUsers = ref([])
    const channelAddMemberModal = ref(null)
    const showLoading = ref(true)
    const email = ref('')
    const addMemberModal = ref(null)
    const showAddMember = ref(false)
    const showAddMemberSuccess = ref(false)

    channelDescription.value = 'チャンネルの説明テスト'
    channelCreateUser.value = 'taro'
    notChannelUsers.value = [{
      'id': 2,
      'imagePath': 'image/user_image_2.png',
      'name': 'jiro',
    },
    {
      'id': 3,
      'imagePath': 'image/user_image_3.png',
      'name': 'hanako',
    }]
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

    /**
     * チャンネル詳細モーダルからのチャンネル削除
     */
    const deleteChannel = async () => {
      // チャンネルの削除
      // TODO: チャンネルを削除するAPIを実行

      showChannelDetail.value = false

      // 表示するチャンネルの変更
      // TODO: チャンネルを変更するAPIを実行
    }

    /**
     * チャンネルの説明編集モーダルを開く
     */
    const openDescriptionEditModal = () => {
      channelDescriptionEditModal.value.description = channelDescription.value
      showEditChannelDescription.value = true
    }

    /**
     * チャンネルの説明箇所を更新する
     */
    const updateChannelDescription = async () => {
      // チャンネルの説明を更新
      // TODO: チャンネルの説明を更新するAPIを実行
      channelDescription.value = channelDescriptionEditModal.value.description
      showEditChannelDescription.value = false
    }

    /**
     * チャンネルにユーザーを追加する処理
     * @param {array} addUsers チャンネルに追加するユーザーID配列
     */
    const channelAddUsers = async (addUsers) => {
      // チャンネルにユーザーを追加する
      // TODO: チャンネルのユーザーを追加するAPIを実行

      // 選択していた追加ユーザーのクリア
      channelAddMemberModal.value.selectUsers = []
      showAddChannelMember.value = false
    }

    /**
     * メンバー招待モーダルで入力されたテキストをemail変数に反映する
     * @param {string} text
     */
    const updateEmail = (text) => {
      email.value = text.value
    }

    /**
     * メンバー招待モーダルからのメール送信処理
     */
    const sendInvitationMail = async () => {
      showAddMember.value = false

      // 招待メールの送信
      // TODO:APIを使用してメールを送信する

      // 入力値のクリア
      addMemberModal.value.emailAddress.text = ''
      showAddMemberSuccess.value = true
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
      isChannelTab,
      showAddChannelMember,
      showChannelDetail,
      channelDescription,
      channelCreateUser,
      updateChannelDescription,
      channelAddUsers,
      channelDescriptionEditModal,
      showEditChannelDescription,
      notChannelUsers,
      openDescriptionEditModal,
      channelAddMemberModal,
      deleteChannel,
      email,
      addMemberModal,
      showAddMember,
      showAddMemberSuccess,
      updateEmail,
      sendInvitationMail,
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