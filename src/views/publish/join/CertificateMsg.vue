<template>
  <div
    class="modal__content--inner small-message__modal"
  >
    <div class="modal__content--body" v-if="status == 'done'">
      <div class="msg">
        동일한 사업자등록번호로<br> 가입된 회원계정이 있습니다.
      </div>
      <div class="msg2">
        홍*동(hkp***@the-51.com)
      </div>
    </div>

    <div class="modal__content--body" v-else-if="status == 'ing'">
      <div class="msg">
        동일한 사업자등록번호로<br> 기업당당자 회원가입을 진행하고 있습니다.
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
        >로그인</ButtonCmp>
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
