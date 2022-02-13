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
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from 'vue'
export default {
  setup() {
    const channelName = ref('general')
    const isChannelPublic = ref(false)
    const userCount = ref(0)

    return {
      channelName,
      isChannelPublic,
      userCount
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