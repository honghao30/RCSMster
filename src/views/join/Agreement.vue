<template>
  <div class="rcs_container">
    <article id="content" class="content">
      <div class="top_title_area">
        <h2 class="h2_title">기업담당자 가입신청</h2>
        <span class="h2_desc">
          RCS 서비스를 이용하여 새로운 고객 커뮤니케이션 전략을
          <br>구축하고 싶은 사업자는 기업회원으로 가입해 주십시오.
        </span>
      </div>
      <section class="sec_form">
        <div class="title_area left">
          <h3 class="h3_title line">약관동의</h3>
        </div>
        <div class="agree_wrap all">
          <div class="check_wrap">
            <span class="custom_checkbox type2">
              <input type="checkbox" id="checkAll" @click="selectAll" v-model="allSelected">
              <label for="checkAll">기업회원 가입신청 약관에 모두 동의 합니다.</label>
            </span>
          </div>
        </div>
        <div class="agree_wrap mar_t20">
          <div class="check_wrap">
            <span class="custom_checkbox type2">
              <input
                type="checkbox"
                id="checkbox01"
                @click="selectCheck"
                v-model="checkedAgreement1"
                ref="checkedAgreement1"
              >
              <label for="checkbox01">서비스 이용약관 (필수)</label>
            </span>
          </div>
          <div class="box_agree">
            <div class="inner_agree">
              <ul class="desc_list mar_t25">
                <li>{{this.tosCtn1}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="agree_wrap mar_t60">
          <div class="check_wrap">
            <span class="custom_checkbox type2">
              <input
                type="checkbox"
                id="checkbox02"
                @click="selectCheck"
                ref="checkedAgreement2"
                v-model="checkedAgreement2"
              >
              <label for="checkbox02">개인정보 수집 및 이용 동의 (필수)</label>
            </span>
          </div>
          <div class="box_agree">
            <div class="inner_agree">
              <ul class="desc_list mar_t25">
                <li>{{this.tosCtn2}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="agree_wrap mar_t60">
          <div class="check_wrap">
            <span class="custom_checkbox type2">
              <input
                type="checkbox"
                id="checkbox03"
                ref="checkedAgreement3"
                @click="selectCheck"
                v-model="checkedAgreement3"
              >
              <label for="checkbox03">개인정보 제3자 제공 안내 (필수)</label>
            </span>
          </div>
          <div class="box_agree">
            <div class="inner_agree">
              <ul class="desc_list mar_t25">
                <li>{{this.tosCtn3}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="agree_wrap mar_t60">
          <div class="check_wrap">
            <span class="custom_checkbox type2">
              <input
                type="checkbox"
                id="checkbox04"
                ref="checkedAgreement4"
                @click="selectCheck"
                v-model="checkedAgreement4"
              >
              <label for="checkbox04">신청 위임 동의 (필수)</label>
            </span>
          </div>
          <div class="box_agree">
            <div class="inner_agree">
              <ul class="desc_list mar_t25">
                <li>{{this.tosCtn4}}</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="agree_wrap mar_t60">
          <div class="check_wrap">
            <span class="custom_checkbox type2">
              <input
                type="checkbox"
                id="checkbox05"
                @click="selectCheck"
                v-model="checkedAgreement5"
              >
              <label for="checkbox05">마케팅이용 동의 (선택)</label>
            </span>
          </div>
          <div class="box_agree">
            <div class="inner_agree">
              <ul class="desc_list mar_t25">
                <li>{{this.tosCtn5}}</li>
              </ul>
            </div>
          </div>
        </div>
        <button class="btn big bd_black" @click="validationCheck">
          <span>비밀번호 재설정</span>
        </button>
      </section>
    </article>
  </div>
</template>

<script>
import { getAgreementList } from '@/api/common/agreement'

export default {
  data() {
    return {
      agreements: [],
      tosItemCd: '',
      tosCtn1: this.tosCtn1,
      tosCtn2: this.tosCtn2,
      tosCtn3: this.tosCtn3,
      tosCtn4: this.tosCtn4,
      tosCtn5: this.tosCtn5,
      seq: '',
      mndtryYn: '',
      allSelected: false, // 전체 이용약관 체크
      checkedAgreement1: false, // 서비스 이용약관(필수) 체크
      checkedAgreement2: false, // 개인정보 수집 및 이용 동의(필수) 체크
      checkedAgreement3: false, // 개인정도 제3자 제공 안내(필수) 체크
      checkedAgreement4: false, // 신청 위임 동의(필수) 체크
      checkedAgreement5: false // 마케팅이용 동의(선택) 체크
    }
  },
  created() {
    // 공지 리스트
    getAgreementList()
      .then(res => {
        this.tosCtn1 = res.result[0].tosCtn
        this.tosCtn2 = res.result[1].tosCtn
        this.tosCtn3 = res.result[2].tosCtn
        this.tosCtn4 = res.result[3].tosCtn
        this.tosCtn5 = res.result[4].tosCtn
      })
      .catch(error => {
        this.$alertMsg(error.message, '알림', '확인')
      })
  },
  mounted() {
    // DOM에 해당 .vue가 들어가게 되면 실행 되는 곳
    // onload 상태와 동일하다. DOM 이후에 조작할 경우 이곳에서 수행
  },
  computed: {
    // 값이 자주 변경됨에 따라, 관련되어 데이터 혹은 view가 바뀌어야 할 경우 사용
    // method를 바로 연결하면 tic 단위로 계속 실행되기 때문에, 값이 변경할 때만 수행되고,
    // cache로 남는 computed를 활용하는 것이 성능에 좋음
  },
  methods: {
    selectAll() {
      // 전체 동의 선택 했을 경우 모든 checkbox 체크
      // 전체 동의 선택 해제 했을 경우 모든 checkbox 해제
      if (this.allSelected === false) {
        this.checkedAgreement1 = true // 서비스 이용약관(필수) 체크
        this.checkedAgreement2 = true // 개인정보 수집 및 이용 동의(필수) 체크
        this.checkedAgreement3 = true // 개인정보 제3자 제공 안내(필수) 체크
        this.checkedAgreement4 = true // 신청 위임 동의(필수) 체크
        this.checkedAgreement5 = true // 마케팅이용 동의(선택) 체크
      } else if (this.allSelected === true) {
        this.checkedAgreement1 = false // 서비스 이용약관(필수) 해제
        this.checkedAgreement2 = false // 개인정보 수집 및 이용 동의(필수) 해제
        this.checkedAgreement3 = false // 개인정보 제3자 제공 안내(필수) 해제
        this.checkedAgreement4 = false // 신청 위임 동의(필수) 해제
        this.checkedAgreement5 = false // 마케팅이용 동의(선택) 해제
      }
    },
    validationCheck() {
      if (this.checkedAgreement1 === false) {
        this.$alertMsg('서비스 이용약관(필수)에 동의 해주세요.', '알람')
        this.$refs.checkedAgreement1.focus()
        return false
      } else if (this.checkedAgreement2 === false) {
        this.$alertMsg(
          '개인정보 수집 및 이용 동의(필수)에 동의 해주세요.',
          '알람'
        )
        this.$refs.checkedAgreement2.focus()
      } else if (this.checkedAgreement3 === false) {
        this.$alertMsg(
          '개인정보 제3자 제공 안내(필수)에 동의 해주세요.',
          '알람'
        )
        this.$refs.checkedAgreement3.focus()
        return false
      } else if (this.checkedAgreement4 === false) {
        this.$alertMsg('신청 위임 동의(필수)에 동의 해주세요.', '알람')
        this.$refs.checkedAgreement4.focus()
        return false
      }
    },
    selectCheck() {
      // 약관동의 checkbox 해제할 경우 전체 동의 checkbox 해제
      this.allSelected = false
    }
  }
}
</script>
