<template>
  <div
    class="modal__content--inner brand-reject"
    :class="modalsize"
  >
    <div class="modal__content--header">
      <p class="modal-title">브랜드 운영권한 신청 반려</p>
    </div>
    <div class="modal__content--body">
      <div class="top-notice--center">
        <h5>SYSTEM STUDIO</h5>
        <p>신청자 : <span>김솔솔(solsol51)</span></p>
      </div>
      <div class="input-item input-limit">
        <div class="textarea">
          <textarea maxlength="100" placeholder="반려 사유를 입력해주세요." v-model="form.textarea"></textarea>
          <div class="textarea-limit__text">
            <p>
              {{ form.textarea.length }}/100자
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="button__wrap">
      <ButtonCmp
        type="btn-line"
        @click="$emit('closeModal')"
      >
        닫기
      </ButtonCmp>
      <ButtonCmp
        type="btn-blue"
        :disabled="form.textarea.length === 0"
        @click="$emit('rejectFinish')"
      >
        반려
      </ButtonCmp>
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
