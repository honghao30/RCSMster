<template>
  <div class="join">
    <PageTitle pagetitle="대행사 회원가입" />
    <StepList :stepActiveIndex="1" :stepTitle="stepTitle" />
    <div class="top-notice--gray">
      원활한 기업담당자 가입신청을 위해서 기업의 사업자등록증 사본을 준비해주세요.
    </div>
    <form  ref="form" :model="form">
    <div class="agree__wrap">
      <h3 class="agree__title">약관동의</h3>
      <div class="agree__item">
        <div class="checkbox">
          <input type="checkbox" id="chkAll"
            v-model="allSelected"
            @click="selectAll"
          />
          <label for="chkAll"><span class="checkbox__text chkAll">대행사 회원가입 약관에 모두 확인, 동의합니다.</span></label>
        </div>
        <div class="checkbox">
          <input type="checkbox" id="service"
            v-model="checkedAgreement2"
            ref="checkedAgreement2"
            @click="selectCheck"
          />
          <label for="service"><span class="checkbox__text">서비스 이용약관 (필수)</span></label>
        </div>
        <div class="agree__box">
          <div class="terms">
            <p class="terms__h1">제 1 장 총 칙</p>
            <p class="terms__h2">제 1조 목적</p>
            <p class="terms__text">본 서비스 약관은 주식회사 케이티, 주식회사 에스케이텔레콤, 주식회사 엘지유플러스(이하”이동통신3사”라 한다)가 제공하는 RCS Biz Center 서비스 (이하 "서비스"라 합니다)를 이용함에 있어 필요한 서비스 이용조건 및 절차 등 기타 제반사항을 규정함을 목적으로 합니다.</p>

            <p class="terms__h2">제 2조 약관의 효력 및 변경</p>
            <p class="terms__text">① 본 약관은 서비스를 이용하고자 하는 모든 “회원”에 대하여 그 효력을 발생합니다.</p>
            <p class="terms__text">② 본 약관의 내용은 “서비스” 화면에 게시하거나 기타의 방법으로 “회원”에게 공지하고, 이에 동의한 “회원”이 “서비스”에 가입함으로써 효력이 발생합니다.</p>
          </div>
        </div>
      </div>
      <div class="agree__item">
        <div class="checkbox">
          <input type="checkbox" id="delegate"
            v-model="checkedAgreement2"
            ref="checkedAgreement2"
            @click="selectCheck"
          />
          <label for="delegate"><span class="checkbox__text">신청 위임 동의 (필수)</span></label>
        </div>
        <div class="agree__box">
          <div class="terms">
            <p class="terms__text">신청자는 기업을 대리하는 자로서 권한 부여 및 등록을 요청합니다. 또한 신청자의 업무처리로 인해 발생하는 모든 책임은 당사자에게 있음을 확인합니다.</p>
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
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import StepList from '@/components/common/StepList.vue'

export default {
  components: {
    PageTitle,
    ButtonCmp,
    StepList
  },
  data() {
    return {
      allSelected: false,
      checkedAgreement1: false,
      checkedAgreement2: false,
      stepTitle: ['약관동의', '대행사정보 입력', '회원정보 입력', '가입완료']
    }
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
        this.$refs.checkedAgreement1.focus()
        alert('서비스 이용약관(필수)')
        return false
      } else if (this.checkedAgreement2 === false) {
        this.$refs.checkedAgreement2.focus()
        alert('신청 위임 동의(필수)')
      } else {
        this.$router.push('./AgencyJoinStep02')
      }
    },
    selectCheck() {
      this.allSelected = false
    }
  }
}
</script>
