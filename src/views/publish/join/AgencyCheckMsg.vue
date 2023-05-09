<template>
  <div
    class="modal__content--inner small-message__modal"
  >
    <div class="modal__content--body">
      <div class="msg">
        중계사 시스템에 메시지에 대한 청약 및 대행사<br> webhook url 정보를 등록하셨나요?
      </div>
    </div>
  <div class="modal__content--footer">
      <div class="button__wrap">
        <ButtonCmp
        type="btn-blue-line"
        @click="$emit('closeModal')"
        >닫기</ButtonCmp>
        <ButtonCmp
        type="btn-blue"
        @click="$emit('closeModal')"
        >확인</ButtonCmp>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
export default {
  components: {
    ButtonCmp
  },
  props: {
    status: String
  },
  data() {
    return {}
  }
}
</script>

<style>

</style>
