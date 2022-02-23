<template>
  <app-modal
    :showModal="showModal"
    :showAction="true"
    :showCancel="true"
    actionText="追加"
    cancelText="キャンセル"
  >
    <template v-slot:app-icon>
      <speaker-icon class="h-5 w-5" />
    </template>
    <template v-slot:app-title>チャンネルを追加します。</template>
    <template v-slot:app-content>
      <form-label class="mb-2" forText="channel_name" showText="名前" />
      <form-text
        ref="channelName"
        class="mb-2"
        type="text"
        @event:updateText="updateAddChannelName"
        name="channel_name"
        id="channel_name"
        placeholder="チャンネル名"
      />
      <form-label class="mb-2" forText="description" showText="説明" />
      <form-text
        ref="channelDescription"
        class="mb-2"
        type="text"
        @event:updateText="updateAddChannelDescription"
        name="description"
        id="description"
        placeholder="説明"
      />
      <span>プライベート設定</span>
      <form-checkbox
        ref="channelIsPrivate"
        label="プライベートチャンネルにする"
        @event:updateCheck="updateAddChannelIsPrivate"
      />
    </template>
  </app-modal>
</template>
<script>
import { ref } from 'vue'

export default {
  props: ["showModal"],
  setup(props, context) {
    const channelName = ref(null)
    const channelDescription = ref(null)
    const channelIsPrivate = ref(null)

    /**
     * チャンネル名を更新するためのemitする
     * @param {string} text チャンネル名
     */
    const updateAddChannelName = (text) => {
      context.emit("event:updateAddChannelName", text);
    }

    /**
     * 説明を更新するためにemitする
     * @param {string} text チャンネル名
     */
    const updateAddChannelDescription = (text) => {
      context.emit("event:updateAddChannelDescription", text);
    }

    /**
     * プライベート設定を更新するためのemitする
     * @param {string} text チャンネル名
     */
    const updateAddChannelIsPrivate = (value) => {
      context.emit("event:updateAddChannelIsPrivate", value);
    }

    return {
      updateAddChannelName,
      updateAddChannelDescription,
      updateAddChannelIsPrivate,
      channelName,
      channelDescription,
      channelIsPrivate,
    }
  },
}
</script>