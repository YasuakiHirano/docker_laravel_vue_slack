<template>
  <div :class="{'': messageOnly, 'border border-b-0' : !messageOnly }">
    <show-date v-if="date !== ''">{{ date }}</show-date>
    <div :class="['group', 'p-5', 'pr-0', 'pt-0', 'flex', 'pt-1', 'pb-1', 'mt-1', 'relative', {'hover:bg-gray-100': !messageOnly}]">
      <message-area-icons
        :show="!messageOnly"
        :messageId="messageId"
        :channelId="channelId"
        :isMyMessage="isMyMessage"
        :showThreadIcon="showThreadIcon"
        @event:reactionMessage="reactionMessage"
        @event:threadMessage="threadMessage"
        @event:deleteMessage="deleteMessage"
        @event:editMessage="editMessage"
      />
      <div class="w-12">
        <chat-user-image :image="imagePath" />
      </div>
      <div class="ml-2 w-full">
        <div><chat-user-name>{{ postUserName }}</chat-user-name><chat-user-date>{{ postTime }}</chat-user-date></div>
        <div class="whitespace-pre-wrap break-all" v-show="!isEditMode">{{ content }}</div>
        <chat-input-area
          ref="chatInputArea"
          v-show="isEditMode"
          :messageId="messageId"
          :content="content"
          :isUpdate="true"
          :isMention="false"
          @event:clickCancelIcon="isEditMode = false"
          @event:updateMessage="updateMessage"
          @event:clickReactionIcon="$emit('event:updateAreaReaction')"
          :isCancel="true" />
        <div class="flex flex-wrap w-full mt-1">
          <div v-for="reaction in reactions" :key="reaction.id" class="mt-1">
            <reaction-circle :number="reaction.number" :icon="reaction.icon" class="mr-1 cursor-pointer" @click="updateReaction(reaction)" />
          </div>
        </div>
        <div v-show="isThreadCount" class="text-sm mt-2 mb-2 text-blue-500 cursor-pointer">
          <div @click="threadMessage(messageId)">{{ isThreadCount }}件の返信</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'

export default({
  props: ['channelId', 'messageId', 'date', 'imagePath', 'postUserName', 'postTime', 'content', 'isMyMessage', 'showThreadIcon', 'isThreadCount', 'messageOnly', 'reactions'],
  setup(props, context) {
    const isEditMode = ref(false)
    const chatInputArea = ref(null)

    /**
     * メッセージのリアクションボタンを押したときにemitする
     * @param {int} messageId メッセージID
     */
    const reactionMessage = async (messageId) => {
      console.log('click reactionMessage!! messageId:' + messageId)
      context.emit('event:reactionMessage', messageId)
    }

    /**
     * メッセージのスレッドボタンを押したときにemitする
     * @param {int} messageId メッセージID
     */
    const threadMessage = async (messageId) => {
      console.log('click threadMessage!! messageId:' + messageId)
      context.emit('event:threadMessage', messageId)
    }

    /**
     * メッセージの編集ボタンを押したときの処理
     */
    const editMessage = () => {
      console.log('click editMessage!!')
      isEditMode.value = true
    }

    /*
     * メッセージの削除ボタンを押したときにemitする
     * @param {int} messageId メッセージID
     * @param {int} channelId チャンネルID
     */
    const deleteMessage = async (messageId, channelId) => {
      console.log('click deleteMessage!! messageId:' + messageId + ' channelId:' + channelId)
      // TODO: ここでメッセージの削除APIを実行
    }

    /**
     * メッセージの編集後に更新する処理
     * @param {int} messageId メッセージID
     * @param {string} content 編集内容
     */
    const updateMessage = async (messageId, content) => {
      // TODO: ここでメッセージを更新するAPIを実行する
      isEditMode.value = false
    }

    /**
     * メッセージのリアクションがクリックされたとき
     * @param {int} reactionId リアクションID
     */
    const updateReaction = async (reaction) => {
      //TODO: ここでリアクションのカウントアップをするAPIを実行する
      reaction.number++;
    }

    return {
      isEditMode,
      reactionMessage,
      threadMessage,
      deleteMessage,
      editMessage,
      chatInputArea,
      updateMessage,
      updateReaction,
    }
  }
});
</script>