<template>
  <div class="join">
    <PageTitle pagetitle="회원탈퇴" />
    <div class="top-notice--gray">
      <p>회원탈퇴 전에 아래의 유의사항을 다시 한번 읽어주세요.</p>
    </div>
    <div class="withdrawal-text__wrap">
      <p class="guide-text black">&middot; 회원탈퇴 후 동일 아이디로 재가입이 불가능합니다.</p>
      <p class="guide-text black">&middot; 브랜드 관리자는 권한위임 또는 브랜드 정보(승인 진행중인 발신번호, 템플릿 포함) 삭제 이후 탈퇴 가능합니다.</p>
      <p class="guide-text black">&middot; 브랜드 부관리자는 즉시 탈퇴할 수 있습니다.</p>
      <p class="guide-text black">&middot; 대행사는 관리하는 브랜드가 있는 경우 탈퇴가 불가능합니다.</p>
      <p class="guide-text black">&middot; 탈퇴 후 재가입시 신규로 가입되며 탈퇴 이전의 회원정보와 삭제한 서비스 정보는 복구되지 않습니다.</p>
      <div class="checkbox">
          <input
            ref="checkedAgreement1"
            type="checkbox" id="chkWithdrawal" value="chkWithdrawal"
            v-model="checkedAgreement1"
          />
          <label for="chkWithdrawal"><span class="checkbox__text">탈퇴 유의사항을 모두 확인하였으며, 탈퇴에 동의합니다.</span></label>
        </div>
    </div>
    <div class="button__wrap">
      <ButtonCmp
        type="btn-blue-line"
      >취소</ButtonCmp>
      <ButtonCmp
        type="btn-blue"
        :disabled="!isDisabled"
        @click="memberLeave"
      >회원탈퇴</ButtonCmp>
    </div>
    <!-- 모달 창 -->
    <ModalView
      v-if="isModalViewed" @closeModal="isModalViewed = false"
    >
      <ConfirmMsg
        @closeModal="isModalViewed = false"
      >
        <div slot="msg">
          <div class="msg">
            기업에 다른 관리자가 없습니다.<br>
            탈퇴하시면 기업정보도 모두 삭제됩니다.<br>
            탈퇴 하시겠습니까?
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
            @click="closeMsg"
            >
              예
            </ButtonCmp>
        </div>
      </ConfirmMsg>
    </ModalView>
    <!-- //모달 창 -->
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/join/ConfirmMsg.vue'
export default {
  components: {
    PageTitle,
    ButtonCmp,
    ModalView,
    ConfirmMsg
  },
  data() {
    return {
      checkedAgreement1: false,
      isModalViewed: false
    }
  },
  watch: {
    isModalViewed () {
      if (this.isModalViewed) {
        document.documentElement.style.overflow = 'hidden'
        return
      }
      document.documentElement.style.overflow = 'auto'
    }
  },
  computed: {
    isDisabled() {
      return this.checkedAgreement1 === true
    }
  },
  methods: {
    memberLeave () {
      this.isModalViewed = true
    },
    closeMsg () {
      this.isModalViewed = false
    }
  }
}
</script>
