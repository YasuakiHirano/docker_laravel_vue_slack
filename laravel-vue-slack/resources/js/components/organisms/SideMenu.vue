<template>
  <div>
    <service-title />
    <add-member @click="$emit('event:addMember')" />
    <channel-menu
      class="pl-3"
      @event:toggleChannel="toggleShowList"
      @event:addChannel="$emit('event:addChannel')" />
    <div v-if="isShowList">
      <div v-for="channel in channels" :key="channel.name" class="m-auto w-9/12 text-white text-opacity-70">
        <div :class="'w-full flex p-1 cursor-pointer ' + (channel.id === channelId ? 'bg-indigo-900 rounded-lg' : '')" @click="selectChannel(channel.id)">
          <div v-if="channel.is_public"><hash-icon class="mt-1 mr-2 w-4 h-4" /></div>
          <div v-else><lock-icon class="mt-1 mr-2 w-4 h-4" /></div>
          <div class="w-13 truncate">{{ channel.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  props: ['channelId'],
  setup(props, context) {
    const channels = ref([])
    const isShowList = ref(false)

    /**
     * チャンネル一覧の表示/非表示切り替え
     * @param {boolean} toggle
     */
    const toggleShowList = (toggle) => {
      isShowList.value = toggle
    }

    /**
     * チャンネルを選択したときにemitする
     * @param {boolean} channelId 選択したチャンネルのID
     */
    const selectChannel = (channelId) => {
      context.emit('event:selectChannel', channelId)
    }

    onMounted(() => {
      channels.value = [{ 
        'id': 1,
        'name': 'general'
      }];
    });

    return {
      isShowList,
      toggleShowList,
      channels,
      selectChannel
    }
  },
}
</script>