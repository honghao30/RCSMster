<template>
  <div>
    <div class="top-notice--gray" v-if="isCorp">원활한 운영자 가입신청을 위해서 기업의 사업자등록증 사본을 준비해주세요.</div>
    <div class="top-notice--gray" v-else>원활한 대행사 가입신청을 위해서 기업의 사업자등록증 사본을 준비해주세요.</div>
    <form>
      <div class="agree__wrap">
        <h3 class="agree__title">약관동의</h3>
        <div class="agree__item">
          <div class="checkbox">
            <input
              type="checkbox"
              id="chkAll"
              @change="selectAll"
              v-model="allSelected"
            />
            <label for="chkAll">
              <span class="checkbox__text" v-if="isCorp">운영자 가입 약관에 모두 확인, 동의합니다.</span>
              <span class="checkbox__text" v-else>대행사 가입 약관에 모두 확인, 동의합니다.</span>
            </label>
          </div>
          <div class="checkbox">
            <input
              type="checkbox"
              id="service"
              @change="selectCheck"
              v-model="checked.checkedAgreementS1"
              ref="checkedAgreement1"
            />
            <label for="service"><span class="checkbox__text">서비스 이용약관 (필수)</span></label>
          </div>
          <div class="agree__box">
            <div class="terms" v-html="tosCtn1"></div>
          </div>
        </div>
        <div class="agree__item">
          <div class="checkbox">
            <input
              type="checkbox"
              id="delegate"
              @change="selectCheck"
              v-model="checked.checkedAgreementA1"
              ref="checkedAgreement2"
            />
            <label for="delegate"><span class="checkbox__text">신청 위임 동의 (필수)</span></label>
          </div>
          <div class="agree__box">
            <div class="terms" v-html="tosCtn4"></div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { getAgreementList } from '@/api/common/agreement'

export default {
  props: {
    userType: {
      type: String,
      default() {
        return 'CORP'
      }
    }
  },
  data() {
    return {
      tosItemList: [],
      tosItemCd: '',
      tosCtn1: this.tosCtn1,
      tosCtn4: this.tosCtn4,
      seq: '',
      mndtryYn: '',
      agreYn: '',
      allSelected: false, // 전체 이용약관 체크
      checked: {
        checkedAgreementS1: false, // 서비스 이용약관(필수) 체크
        checkedAgreementA1: false // 신청 위임 동의(필수) 체크
      }
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
  mounted() {},
  computed: {
    // 기업, 대행사에 따라 약관동의 제목 변경
    isCorp() {
      return this.userType === 'CORP'
    }
  },
  methods: {
    selectAll() {
      // 전체 동의 선택 했을 경우 모든 checkbox 체크
      // 전체 동의 선택 해제 했을 경우 모든 checkbox 해제
      if (this.allSelected === true) {
        this.checked.checkedAgreementS1 = true // 서비스 이용약관(필수) 체크
        this.checked.checkedAgreementA1 = true // 신청 위임 동의(필수) 체크
      } else if (this.allSelected === false) {
        this.checked.checkedAgreementS1 = false // 서비스 이용약관(필수) 해제
        this.checked.checkedAgreementA1 = false // 신청 위임 동의(필수) 해제
      }
      this.$emit('changeTermInfo', this.allSelected)
    },
    selectCheck() {
      // 약관동의 checkbox 해제할 경우 전체 동의 checkbox 해제
      if (this.checked.checkedAgreementS1 && this.checked.checkedAgreementA1) {
        this.allSelected = true
      } else {
        this.allSelected = false
      }
      this.$emit('changeTermInfo', this.allSelected)
    },
    getAgreementData() {
      let list = []
      this.tosItemList.forEach(opt => {
        for (let key in this.checked) {
          let tosItemCd = key.split('checkedAgreement')[1]
          if (opt.tosItemCd === tosItemCd) {
            opt.agreYn = 'N'
            if (this.checked[key]) {
              opt.agreYn = 'Y'
            }
            list.push(opt)
          }
        }
      })
      return list
    }
  }
}
</script>
<style>
</style>
