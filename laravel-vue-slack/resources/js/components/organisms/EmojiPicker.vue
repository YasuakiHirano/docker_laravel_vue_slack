<template>
  <div v-show="isShow">
      <Picker :data="emojiIndex" set="twitter" @select="selectEmoji" />
  </div>
</template>
<script>
import data from 'emoji-mart-vue-fast/data/all.json'
import 'emoji-mart-vue-fast/css/emoji-mart.css'
import { Picker, EmojiIndex } from 'emoji-mart-vue-fast/src'

export default({
  props: ['isShow'],
  components: {
    Picker
  },
  setup(props, content) {
    let emojiIndex = new EmojiIndex(data)

    /**
     * 絵文字の選択後にemitする
     * @param {string} emoji 選択した絵文字
     */
    const selectEmoji = (emoji) => {
      content.emit('event:selectEmoji', emoji)
    }

    return {
      emojiIndex,
      selectEmoji,
    }
  },
})
</script>