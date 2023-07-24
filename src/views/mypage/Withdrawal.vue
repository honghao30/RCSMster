<template>
  <div class="join">
    <PageTitle pagetitle="회원탈퇴" />
    <!-- 기획서 v1.0 수정 - 텍스트 수정 -->
    <div class="withdrawal__wrap">
      <div class="text">
        <p>회원탈퇴 전에 아래의 유의사항을 다시 한번 읽어주세요.</p>
      </div>
      <div class="guide-list">
        <!-- 브랜드 오너 -->
        <p>&middot; 회원탈퇴 후, 동일 아이디로 재 가입이 불가합니다.</p>
        <p>&middot; 재 가입시, 이전의 회원 정보와 서비스 정보는 복구되지 않습니다.</p>
        <p>&middot; 브랜드의 오너인 경우, 다른 운영자에게 권한 위임을 하거나 브랜드 삭제 후, 탈퇴할 수 있습니다.</p>
        <p>&middot; 유일한 비즈니스 계정의 운영자인 경우, 탈퇴와 함께 비즈니스 계정도 함께 삭제됩니다.</p>
        <!-- 그 외의 경우 -->
        <p>&middot; 회원탈퇴 후, 동일 아이디로 재 가입이 불가합니다.</p>
        <p>&middot; 재 가입시, 이전의 회원 정보와 서비스 정보는 복구되지 않습니다.</p>
      </div>
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
        type="btn-line"
      >취소</ButtonCmp>
      <ButtonCmp
        type="btn-blue"
        :disabled="!isDisabled"
        @click="memberLeave"
      >회원탈퇴</ButtonCmp>
    </div>
    <!-- 0620: 디자인 1차 수정 - 모달 루트 추가 -->
    <!-- 모달 창 -->
    <ModalView
      v-if="isModalViewed" @closeModal="isModalViewed = false"
    >
      <!-- 0620: 디자인 1차 수정 v-if 추가 -->
      <ConfirmMsg
        @closeModal="isModalViewed = false"
        v-if="withdrawalModal1"
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
              type="btn-line"
              @click="closeMsg"
            >아니요
            </ButtonCmp>
            <!-- 0620: @click 명 변경 -->
            <ButtonCmp
            type="btn-blue"
            @click="nextMsg"
            >
              예
            </ButtonCmp>
        </div>
      </ConfirmMsg>
      <!-- 0620: 디자인 1차 수정 - 모달 추가 -->
      <ConfirmMsg
        @closeModal="isModalViewed = false"
        v-if="withdrawalModal2"
      >
        <div slot="msg">
          <div class="msg">
            탈퇴 처리가 완료되었습니다.<br>
            서비스를 이용해 주셔서 감사합니다.
          </div>
        </div>
        <div class="button__wrap" slot="button">
          <ButtonCmp
              type="btn-blue"
              @click="closeMsg"
            >닫기
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
import ConfirmMsg from '@/views/join/components/ConfirmMsg.vue'
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
      isModalViewed: false,
      withdrawalModal1: false,
      withdrawalModal2: false
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
      this.withdrawalModal1 = true
      this.withdrawalModal2 = false
    },
    closeMsg () {
      this.isModalViewed = false
      this.withdrawalModal1 = false
      this.withdrawalModal2 = false
    },
    nextMsg() {
      this.withdrawalModal1 = false
      this.withdrawalModal2 = true
    }
  }
}
</script>
