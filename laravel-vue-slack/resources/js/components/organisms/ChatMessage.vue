<template>
  <div class="border border-b-0">
    <show-date v-if="date !== ''">{{ date }}</show-date>
    <div class="group p-5 pr-0 pt-0 flex pt-1 pb-1 mt-1 relative hover:bg-gray-100">
      <div class="w-12">
        <chat-user-image :image="imagePath" />
      </div>
      <div class="ml-2 w-full">
        <div><chat-user-name>{{ postUserName }}</chat-user-name><chat-user-date>{{ postTime }}</chat-user-date></div>
        <div class="whitespace-pre-wrap break-all">{{ content }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'

export default({
  props: ['channelId', 'messageId', 'date', 'imagePath', 'postUserName', 'postTime', 'content'],
  setup(props, context) {
  }
});
</script>