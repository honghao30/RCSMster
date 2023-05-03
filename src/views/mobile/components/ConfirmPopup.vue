<template>
  <div v-if="visible" id="modal" class="modal-overlay" style="display: flex;">
    <div class="modal-window alertTY01">
      <div class="messages">
        <p class="title" v-html="title"></p>
        <p class="desc" v-html="desc"></p>
      </div>
      <div class="btns">
        <a href="javascript:void(0)" @click="close">취소</a>
        <a href="javascript:void(0)" @click="confirm">수정 제안하기</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmPopup',
  props: {
    visible: { type: Boolean, default: false },
    title: { type: String, defulat: '' },
    desc: { type: String, default: '' }
  },
  methods: {
    confirm() {
      this.$emit('confirm')
      this.$emit('update:visible', false)
    },
    close() {
      this.$emit('update:visible', false)
    }
  }
}
</script>
