<template>
  <div>
    <div class="agree_wrap all mar_t40">
      <div v-if="isAgency" class="check_wrap">
        <span class="custom_checkbox type2">
          <input
            type="checkbox"
            id="checkAll"
            name="Checkbox"
            @change="selectAll"
            userType1="CORP"
            v-model="allSelected"
          >
          <label for="checkAll">기업담당자 가입신청 약관에 모두 동의 합니다.</label>
        </span>
      </div>
    </div>
    <div v-if="isCorp" class="check_wrap">
      <span class="custom_checkbox type2">
        <input
          type="checkbox"
          id="checkAll"
          @change="selectAll"
          userTyp2="AGENCY"
          v-model="allSelected"
        >
        <label for="checkAll">대행사회원 가입신청 약관에 모두 동의 합니다.</label>
      </span>
    </div>
    <div class="agree_wrap mar_t30">
      <div class="check_wrap">
        <span class="custom_checkbox type2">
          <input
            type="checkbox"
            id="checkbox01"
            @change="selectCheck"
            v-model="checked.checkedAgreementS1"
            ref="checkedAgreementS1"
          >
          <label for="checkbox01">서비스 이용약관 (필수)</label>
        </span>
      </div>
      <div class="box_agree">
        <div class="inner_agree" v-html="tosCtn1"></div>
      </div>
    </div>
    <div class="agree_wrap mar_t30">
      <div class="check_wrap">
        <span class="custom_checkbox type2">
          <input
            type="checkbox"
            id="checkbox04"
            ref="checkedAgreementA1"
            @change="selectCheck"
            v-model="checked.checkedAgreementA1"
          >
          <label for="checkbox04">신청 위임 동의 (필수)</label>
        </span>
      </div>
      <div class="box_agree">
        <div class="inner_agree" v-html="tosCtn4"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAgreementList } from '@/api/common/agreement'

export default {
  props: {
    joinTermAgency: {
      type: String
    },
    joinTermCorp: {
      type: String
    }
  },
  data() {
    return {
      tosItemList: [],
      tosItemCd: '',
      tosCtn1: this.tosCtn1,
      tosCtn4: this.tosCtn4,
      userType: '',
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
      return this.userType1 === this.joinTermCorp
    },
    isAgency() {
      return this.userType2 === this.joinTermAgency
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
    },
    validationCheck() {
      if (this.checked.checkedAgreementS1 === false) {
        this.$alertMsg('서비스 이용약관(필수)에 동의 해주세요.', '알람')
        this.$refs.checkedAgreementS1.focus()
        return false
      } else if (this.checked.checkedAgreementA1 === false) {
        this.$alertMsg('신청 위임 동의(필수)에 동의 해주세요.', '알람')
        this.$refs.checkedAgreementA1.focus()
        return false
      }
      return true
    },
    selectCheck() {
      // 약관동의 checkbox 해제할 경우 전체 동의 checkbox 해제
      if (this.checked.checkedAgreementS1 && this.checked.checkedAgreementA1) {
        this.allSelected = true
      } else {
        this.allSelected = false
      }
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
