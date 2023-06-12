<template>
  <div class="join">
    <PageTitle pagetitle="기업담당자 회원가입" />
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
          <label for="chkAll"><span class="checkbox__text">기업담당자 회원가입 약관에 모두 확인, 동의합니다.</span></label>
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
    <div class="button__wrap">
    <ButtonCmp
      type="btn-blue-line"
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
import { getAgreementList } from '@/api/common/agreement'

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
      agreements: [],
      tosItemCd: '',
      tosCtn1: this.tosCtn1,
      tosCtn4: this.tosCtn4,
      stepTitle: ['약관동의', '기업정보 입력', '회원정보 입력', '가입완료']
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
    }
  }
}
</script>
