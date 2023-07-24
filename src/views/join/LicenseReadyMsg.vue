<template>
  <div
    class="modal__content--inner small-message__modal"
  >
    <div class="modal__content--body">
      <div class="msg">
        원활한 운영자 가입신청을 위해서<br>기업의 사업자등록증 사본을 준비해주세요.
      </div>
    </div>
  <div class="modal__content--footer">
      <div class="button__wrap">
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
  },
  data() {
    return {}
  }
}
</script>

<style>

</style>
