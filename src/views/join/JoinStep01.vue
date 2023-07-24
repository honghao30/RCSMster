<template>
  <div class="join">
    <PageTitle pagetitle="운영자 가입" /> <!-- 기획서 v1.0 수정 (문구 수정) -->
    <StepList :stepActiveIndex="1" :stepTitle="stepTitle" />
    <!-- 기획서 v1.0 수정 (top-notice--gray 클래스 삭제) -->
    <form  ref="form" :model="form">
      <div class="agree__wrap">
        <h3 class="agree__title">약관동의</h3>
        <div class="agree__item">
          <div class="checkbox">
            <input type="checkbox" id="chkAll"
              v-model="allSelected"
              @click="selectAll"
            />
            <label for="chkAll"><span class="checkbox__text chkAll">운영자 가입 약관에 모두 확인, 동의합니다.</span></label> <!-- 기획서 v1.0 수정 (문구 수정) -->
          </div>
          <div class="checkbox">
            <input type="checkbox"
              id="service"
              v-model="checkedAgreement1"
              ref="checkedAgreement1"
              @click="selectCheck"
            />
            <label for="service"><span class="checkbox__text">서비스 이용약관 (필수)</span></label>
          </div>
          <div class="agree__box">
            <div class="terms">
              <div class="inner_agree" v-html="tosCtn1"></div>
            </div>
          </div>
        </div>
        <div class="agree__item">
          <div class="checkbox">
            <input type="checkbox"
              id="delegate"
              v-model="checkedAgreement2"
              ref="checkedAgreement2"
              @click="selectCheck"
            />
            <label for="delegate"><span class="checkbox__text">신청 위임 동의 (필수)</span></label>
          </div>
          <div class="agree__box">
            <div class="terms">
              <div class="inner_agree" v-html="tosCtn4"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="button__wrap space-between">
        <ButtonCmp
          type="btn-line"
        >취소</ButtonCmp>
        <ButtonCmp
          type="btn-blue"
          @click="nextStep"
        >다음</ButtonCmp>
      </div>
    </form>
    <!-- 기획서 v1.0 수정 (p.25 회원가입 진입 전 Alert MSG 노출) -->
    <ModalView
      v-if="isModalViewed" @closeModal="isModalViewed = false"
    >
      <LicenseReadyMsg @closeModal="isModalViewed = false" />
    </ModalView>
    <!-- // 기획서 v1.0 수정 (p.25 회원가입 진입 전 Alert MSG 노출) -->
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import StepList from '@/components/common/StepList.vue'
import { getAgreementList } from '@/api/common/agreement'
import ModalView from '@/components/common/ModalView.vue'
import LicenseReadyMsg from '@/views/join/LicenseReadyMsg.vue' // 기획서 v1.0 수정

export default {
  components: {
    PageTitle,
    ButtonCmp,
    StepList,
    ModalView,
    LicenseReadyMsg // 기획서 v1.0 수정
  },
  data() {
    return {
      allSelected: false,
      checkedAgreement1: false,
      checkedAgreement2: false,
      agreements: [],
      tosItemCd: '',
      tosCtn1: this.tosCtn1,
      tosCtn4: this.tosCtn4,
      stepTitle: ['약관동의', '비지니스 정보 입력', '회원정보 입력', '가입 신청 완료'], //  기획서 v1.0 수정 (문구 수정)
      isModalViewed: false,
      isLicense: false
    }
  },
  created() {
    getAgreementList()
      .then(res => {
        this.tosItemList = []
        res.result.map(item => {
          let setValue = {
            tosItemCd: item.tosItemCd,
            seq: item.seq
          }
          this.tosItemList.push(setValue)
        })
        res.result.forEach(tosItem => {
          if (tosItem.tosItemCd === 'S1') {
            // 서비스 이용약관
            this.tosCtn1 = tosItem.tosCtn
          } else if (tosItem.tosItemCd === 'A1') {
            // 신청 위임 동의
            this.tosCtn4 = tosItem.tosCtn
          }
        })
      })
      .catch(() => {
        // console.log('error', error)
        // 코드가 적용되지 않아 오류 발생 - 임시로 막아둠
        // this.$alertMsg(error.message, '알림', '확인')
      })
  },
  methods: {
    selectAll() {
      if (this.allSelected === false) {
        this.checkedAgreement1 = true
        this.checkedAgreement2 = true
      } else if (this.allSelected === true) {
        this.checkedAgreement1 = false
        this.checkedAgreement2 = false
      }
    },
    nextStep () {
      if (this.checkedAgreement1 === false) {
        this.$alertMsg('서비스 이용약관(필수)에 동의 해주세요.')
        this.$refs.checkedAgreement1.focus()
        return false
      } else if (this.checkedAgreement2 === false) {
        this.$alertMsg('신청 위임 동의(필수)에 동의 해주세요.')
        this.$refs.checkedAgreement2.focus()
      } else {
        this.$router.push('./JoinStep02')
      }
    },
    selectCheck() {
      this.allSelected = false
    },
    prac() {
      this.isModalViewed = true
      this.isLicense = true
    }
  }
}
</script>
