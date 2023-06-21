<template>
  <div class="emoji-el" v-click-outside="onClickOutside">
    <div ref="trigger" class="emoji-trigger">
      <ButtonCmp
        type="btn-only-icon"
        iconname="icon-emoticon"
        @click="showEmoji = !showEmoji"
      >
        <span class="irtext">이모티콘</span>
      </ButtonCmp>
    </div>
    <emoji-picker id="emojiPicker"
      class="light emoji-wrap"
      v-if="showEmoji"
      @emoji-click="onSelect"
    ></emoji-picker>
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import vClickOutside from 'v-click-outside'
import 'emoji-picker-element'
export default {
  directives: {
    clickOutside: vClickOutside.directive
  },
  components: {
    ButtonCmp
  },
  props: {
    value: String
  },
  emits: [
    'update:modelValue'
  ],
  data () {
    return {
      showEmoji: false
    }
  },
  methods: {
    onClickOutside() {
      this.showEmoji = false
    },
    onSelect (e) {
      let code = e.detail.unicode
      this.$emit('input', code)
    }
  }
}
</script>

<style>

</style>
