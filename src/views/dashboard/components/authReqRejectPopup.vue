<template>
  <ModalView
    v-if="isModalViewed" @closeModal="isModalViewed = false"
  >
    <!-- // 반려 처리 -->
    <ConfirmMsg
      @closeModal="isModalViewed = false"
      modalsize="Modalmax480"
      v-if="isModalViewed"
    >
      <div slot="msg">
        <div class="msg">
          <div>
            반려 처리
          </div>
          <div>
            <ul>
              <li>신청자 :<span>{{this.rejectInfo.userNm}}({{this.rejectInfo.mgrUserId}})</span></li>
              <li>브랜드 :<span>{{this.rejectInfo.brandNm}}</span></li>
            </ul>
          </div>
          <div class="custom_textarea">
            <textarea placeholder="반려 사유를 입력해주세요.(100자 이내)" ref="writeRejectReason" style="height:86px" v-model="aprvRetDescr" maxlength="100"></textarea>
          </div>
        </div>
      </div>
      <div class="button__wrap" slot="button">
        <ButtonCmp
          type="btn-blue-line"
          @click="closeMsg"
        >닫기
        </ButtonCmp>
        <ButtonCmp
          type="btn-blue"
          :disabled="!isDisabled"
          @click="reject()"
        >
          반려
        </ButtonCmp>
      </div>
    </ConfirmMsg>
  </ModalView>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import { operationAuthorityApproval } from '@/api/service/corp'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/join/components/ConfirmMsg.vue'

export default {
  components: {
    ConfirmMsg,
    ModalView,
    ButtonCmp
  },
  props: {
    rejectInfo: {
      type: Object,
      required: true
    },
    visible: {
      type: Boolean
    }
  },
  data() {
    return {
      isModalViewed: true,
      isDisabled: true,
      aprvRetDescr: ''
    }
  },
  created() {},
  mounted() {},
  computed: {
  },
  methods: {
    reject() {
      let rejectData = {
        brandId: this.rejectInfo.brandId,
        mgrUserId: this.rejectInfo.mgrUserId,
        aprvRetDescr: this.aprvRetDescr,
        aprvYn: 'N'
      }
      operationAuthorityApproval(rejectData).then(() => {
        this.$alertMsg('운영권한 신청을 거절하였습니다.').then(() => {
          this.$emit('update:visible', false)
          this.$emit('reject', true)
        })
      })
    },
    closeMsg () {
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style>

</style>
