<template>
  <div
    class="modal__content--inner brand-reject dashboard_modal"
    :class="modalsize"
  >
    <div class="modal__content--header">
      <p class="modal-title">브랜드 오너 권함 위임</p>
    </div>
    <div class="modal__content--body">
      <div class="top-notice--center">
        <h5>오동동(KLMN00)</h5>
        <p>KLMN00@studio.com / 010-9876-5432</p>
      </div>
    </div>
    <div class="modal__content--footer">
      <div class="button__wrap">
        <ButtonCmp
          type="btn-line"
          @click="$emit('closeModal')"
        >
          닫기
        </ButtonCmp>
        <ButtonCmp
          type="btn-blue"
          @click="$emit('closeModal')"
        >
          권한위임
        </ButtonCmp>
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
    modalsize: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form: {
        textarea: ''
      }
    }
  },
  methods: {
  }
}
</script>

<style>

</style>
