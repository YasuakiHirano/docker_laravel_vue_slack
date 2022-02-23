<template>
  <div class="main">
    <chat-header class="header" userName="テストユーザー" />
    <side-menu
      class="side-menu"
      :channelId="1"
      @event:addMember="showAddMember = true"
      @event:addChannel="showAddChannel = true"
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
          <div v-for="(message, index) in messages" :key="message.id" :ref="chatMessages">
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
              :isThreadCount="message.isThreadCount"
              @event:threadMessage="threadMessage"
              @event:updateAreaReaction="updateAreaReaction(index)"
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
    <!----チャンネル追加---->
    <add-channel-modal
      ref="addChannelModal"
      :showModal="showAddChannel"
      @event:modalClose="showAddChannel = false"
      @event:modalAction="addChannel"
      @event:updateAddChannelName="updateAddChannelName"
      @event:updateAddChannelDescription="updateAddChannelDescription"
      @event:updateAddChannelIsPrivate="updateAddChannelIsPrivate" />
    <add-channel-success-modal
      :showModal="showAddChannelSuccess"
      @event:modalAction="showAddChannelSuccess = false" />
    <!----リアクション用の絵文字ピッカー---->
    <emoji-picker
      class="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center"
      @event:selectEmoji="reactionEmoji"
      :isShow="isShowCenterEmojiPicker" />
    <!----スレッド---->
    <thread-modal
      ref="threadModal"
      :showModal="isShowThread"
      :message="threadMessageParam"
      :channelId="selectChannel"
      :channelUsers="channelUsers"
      :userId="userId"
      :userName="userName"
      @event:reactionMessage="reactionMessage"
      @event:modalClose="isShowThread = false"
    />
  </div>
</template>
<script>
import { ref, onMounted, onBeforeUpdate } from 'vue'
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
    const addChannelModal = ref(null)
    const showAddChannel = ref(false)
    const showAddChannelSuccess = ref(false)
    const threadModal = ref(null)
    const isShowThread = ref(false)
    const threadMessageParam = ref([])
    const isShowCenterEmojiPicker = ref(false)
    const selectMessageId = ref(0)
    let isUpdateEditReaction = false
    let selectChatMessageKey = 0
    const chatMessageItems = ref([])

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

    onBeforeUpdate(() => {
      chatMessageItems.value = []
    })

    onMounted(() => {
    })

    messages.value = [{
      'id': 1,
      'imagePath': 'image/user_image_1.png',
      'date': '2021年10月20日',
      'postUserName': 'taro',
      'postTime': '12:00',
      'content': '1番目のメッセージです！',
      'isThreadCount': 3,
    },
    {
      'id': 2,
      'imagePath': 'image/user_image_2.png',
      'date': '',
      'postUserName': 'jiro',
      'postTime': '12:00',
      'content': '2番目のメッセージです！',
      'isThreadCount': 1,
    },
    {
      'id': 3,
      'imagePath': 'image/user_image_3.png',
      'date': '2021年10月21日',
      'postUserName': 'hanako',
      'postTime': '12:00',
      'content': '3番目のメッセージです！',
    },
    {
      'id': 4,
      'imagePath': 'image/user_image_1.png',
      'date': '2021年11月16日',
      'postUserName': 'taro',
      'postTime': '12:00',
      'content': '4番目のメッセージです！',
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

    /**
     * チャンネル追加モーダルからのチャンネル作成処理
     */
    const addChannel = async () => {
      showAddChannel.value = false

      // チャンネルを作成する
      // TODO: チャンネルを作成するAPIを実行する

      // 入力した内容のクリア
      addChannelModal.value.channelName.text = ''
      addChannelModal.value.channelDescription.text = ''
      addChannelModal.value.channelIsPrivate.check = ''

      showAddChannelSuccess.value = true
    }

    /**
     * チャンネル追加モーダルの名前を変数に反映する
     * @param {string} text
     */
    const updateAddChannelName = (text) => {
      addChannelName.value = text.value
    }

    /**
     * チャンネル追加モーダルの説明を変数に反映する
     * @param {string} text
     */
    const updateAddChannelDescription = (text) => {
      addChannelDescription.value = text.value
    }

    /**
     * チャンネル追加モーダルのプライベート設定を変数に反映する
     * @param {boolean} text
     */
    const updateAddChannelIsPrivate = (value) => {
      addChannelIsPrivate.value = value
    }

    /**
     * リアクションボタンを押された時の処理
     * @param {int} messageId リアクションをつけるメッセージID
     */
    const reactionMessage = (messageId) => {
      isShowCenterEmojiPicker.value = true
      selectMessageId.value = messageId
    }

    /**
     * スレッドボタンを押された時の処理
     * @param {int} messageId スレッドを開くメッセージID
     */
    const threadMessage = async (messageId) => {
      const message = messages.value.filter(function (message) { return message.id == messageId } )
      threadMessageParam.value = message[0]
      isShowThread.value = true

      // TODO: スレッドのメッセージをAPIで取得して渡す
      // threadModal.value.threadMessages
      threadModal.value.threadMessages = []

      if (messageId == 1) {
        threadModal.value.threadMessages = [{
          'id': 1,
          'imagePath': 'image/user_image_4.png',
          'date': '2021年10月20日',
          'postUserName': 'saburo',
          'postTime': '12:00',
          'content': '1番目のスレッドメッセージです！',
          },
          {
          'id': 2,
          'imagePath': 'image/user_image_5.png',
          'date': '',
          'postUserName': 'hanako',
          'postTime': '12:00',
          'content': '2番目のスレッドメッセージです！',
          },
          {
          'id': 3,
          'imagePath': 'image/user_image_6.png',
          'date': '',
          'postUserName': 'jiro',
          'postTime': '12:00',
          'content': '3番目のスレッドメッセージです！',
        }]
      } else if(messageId == 2) {
        threadModal.value.threadMessages = [{
          'id': 1,
          'imagePath': 'image/user_image_1.png',
          'date': '2021年10月20日',
          'postUserName': 'taro',
          'postTime': '12:00',
          'content': 'スレッドのメッセージです！',
          }]
      }

      threadModal.value.parentMessageId = message[0].id
    }

    /**
     * リアクション用絵文字ピッカーで絵文字が選択された時
     */
    const reactionEmoji = async (emoji) => {
      if (isUpdateEditReaction) {
        // メッセージ編集の場合は編集モードのテキストエリアに表示
        chatMessageItems.value[selectChatMessageKey].querySelector("textarea").value += emoji.native
        chatMessageItems.value[selectChatMessageKey].querySelector("textarea").dispatchEvent(new Event('input'))

        isUpdateEditReaction = false
        isShowCenterEmojiPicker.value = false
      } else {
        // メッセージに対してのリアクションの場合は追加または更新する
        // TODO:APIでリアクションを作成する処理
        isShowCenterEmojiPicker.value = false
      }
    }

    /**
     * メッセージ一覧のメッセージ編集でリアクションがクリックされた時
     */
    const updateAreaReaction = (index) => {
      selectChatMessageKey = index
      isUpdateEditReaction = true
      isShowCenterEmojiPicker.value = true
    }

    /**
     * メッセージ一覧のテキストエリアを配列に設定する
     * @param {HTMLElement} el
     */
    const chatMessages = (el) => {
      if (el) {
        chatMessageItems.value.push(el)
      }
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
      addChannelModal,
      showAddChannel,
      showAddChannelSuccess,
      addChannel,
      updateAddChannelName,
      updateAddChannelDescription,
      updateAddChannelIsPrivate,
      threadModal,
      isShowThread,
      threadMessageParam,
      reactionMessage,
      threadMessage,
      isShowCenterEmojiPicker,
      selectMessageId,
      reactionEmoji,
      updateAreaReaction,
      chatMessages
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