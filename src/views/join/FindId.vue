<template>
  <div class="rcs_container">
    <article id="content" class="content">
      <div class="box_form_area">
        <div class="top_title_area">
          <h2 class="h2_title">아이디 찾기 / 비밀번호 재설정</h2>
        </div>
        <div class="tab_wrap">
          <ul class="tab_nav">
            <li class="active">
              <a href="javascript:void(0);">아이디 찾기</a>
            </li>
            <li>
              <a href="javascript:void(0);" @click="goPassword">비밀번호 재설정</a>
            </li>
          </ul>
          <div class="tab_container">
            <div class="tab_content active">
              <span class="h3_desc">계정에 등록된 정보로 인증 완료 후 아이디를 찾을 수 있습니다.</span>
              <table class="tbl_row_type">
                <caption>
                  <strong>아이디 찾기</strong>
                  <p>사업자등록번호, 이름, 휴대폰번호</p>
                </caption>
                <colgroup>
                  <col style="width:164px">
                  <col style="width:auto">
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">사업자등록번호</th>
                    <td>
                      <span class="custom_input full_width">
                        <input type="text" maxlength="10" ref="corpTegiNum" v-model="corpTegiNum" @keydown="keydownOnlyNum" @keyup="keyupOnlyNum" placeholder="'-'없이 10자리 숫자만 입력">
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">이름</th>
                    <td>
                      <span class="custom_input full_width">
                        <input type="text" placeholder ref="name" v-model.trim="userNm" maxlength="200" @keydown="keydownOnlyText" @keyup="keyupUserNmOnlyTextAndWhitespace" @focusout="focusoutUserNmOnlyTextAndWhitespace">
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">휴대폰번호</th>
                    <td>
                      <div class="phoneauth_area">
                        <div class="input_phone_bundle">
                          <span class="custom_input">
                            <input type="text" maxlength="11" v-model="mblNum" @keydown="keydownOnlyNum" @keyup="keyupOnlyNum" placeholder="'-'없이 숫자만 입력" ref="mblNum">
                          </span>
                          <button @click="certificationNumRequest" class="btn sml bd_black">인증번호 요청</button>
                        </div>
                        <!-- 기본 비활성화상태이며 휴대폰 인증요청후 활성화-->
                        <div class="input_aututime_bundle">
                          <span class="custom_input">
                            <input type="text" maxlength="6" v-model="requestNum" @keydown="keydownOnlyNum" @keyup="keyupOnlyNum" :disabled="disabledInput" ref="requestNum" placeholder="인증번호 입력">
                          </span>
                          <timer ref="timer" class="time" startTime="03:00" @end="endTimer"/>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p class="text_error" v-show="errorMsg">{{ errorMsg }}</p>
              <div class="btn_wrap center mar_t40">
                <button @click="findId" class="btn big blue">아이디 찾기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { searchId, authSms } from '@/api/join/FindId'
import Timer from '@/components/Timer'
import { getCertificationNumber } from '@/api/common/code'

export default {
  components: { Timer },
  data() {
    return {
      corpTegiNum: '',
      userNm: '',
      mblNum: '',
      requestNum: '',
      userId: '',
      disabledInput: true,
      endTimerFlag: false,

      // v-show
      errorMsg: ''
    }
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    certificationNumRequest() {
      if (this.validationRequest()) {
        let params = {
          __type: 'findid',
          regiNum: this.corpTegiNum,
          userNm: this.userNm,
          mblNum: this.mblNum
        }
        getCertificationNumber(params)
          .then(resolve => {
            this.errorMsg = '인증번호를 발송했습니다.'
            this.disabledInput = false
            this.resetTimer()
            this.startTimer()
            this.requestNum = ''
            this.$refs.requestNum.focus()
          })
          .catch(reject => {
            this.errorMsg = '휴대폰번호를 정확히 입력해주세요.'
            if (reject.desc) {
              this.errorMsg = reject.desc
            }
            this.disabledInput = true
          })
      } else {
        // console.log('인증번호 유효성 실패')
      }
    },
    findId() {
      if (this.validationSearch()) {
        let authsmsparams = {
          mblNum: this.mblNum,
          authStr: this.requestNum
        }
        authSms(authsmsparams)
          .then(resolve => {
            if (resolve.code === '20000000') {
              let params = {
                userNm: this.userNm,
                corpRegiNum: this.corpTegiNum,
                mblNum: this.mblNum,
                authStr: this.requestNum
              }
              searchId(params).then(resolve => {
                if (resolve.code === '20000000') {
                  if (!jglib.isEmpty(resolve.result)) {
                    this.$router.push({
                      name: 'findidresult',
                      params: { userNm: resolve.result }
                    })
                  } else {
                    this.$alertMsg('입력하신 정보와 일치하는 계정이 없습니다.')
                  }
                }
              })
            } else {
              this.errorMsg = '인증번호를 다시 확인해주세요.'
            }
          })
          .catch(reject => {
            this.errorMsg = '인증번호를 다시 확인해주세요.'
            this.disabledInput = true
          })
      } else {
        // console.log('아이디찾기 유효성 실패')
      }
    },
    // 인증번호요청버튼 유효성검사
    validationRequest() {
      let validationFlag = true

      if (jglib.isEmpty(this.corpTegiNum)) {
        this.errorMsg = '사업자등록번호를 입력해주세요.'
        this.$refs.corpTegiNum.focus()
        validationFlag = false
      } else if (this.corpTegiNum.length !== 10) {
        this.errorMsg = '10자리 숫자만 입력해 주세요.'
        this.$refs.corpTegiNum.focus()
        validationFlag = false
      } else if (jglib.isEmpty(this.userNm)) {
        this.errorMsg = '이름을 입력해주세요.'
        this.$refs.name.focus()
        validationFlag = false
      } else if (!jglib.isUserName(this.userNm)) {
        this.errorMsg = '이름을 정확히 입력해주세요.'
        this.$refs.name.focus()
        validationFlag = false
      } else if (jglib.isEmpty(this.mblNum)) {
        this.errorMsg = '휴대폰번호를 정확히 입력해주세요.'
        this.$refs.mblNum.focus()
        validationFlag = false
      } else if (this.mblNum.length !== 10 && this.mblNum.length !== 11) {
        this.errorMsg = '휴대폰번호를 정확히 입력해주세요.'
        this.$refs.mblNum.focus()
        validationFlag = false
      } else if (jglib.isPhoneNumber(this.mblNum) === false) {
        this.errorMsg = '휴대폰번호를 정확히 입력해주세요.'
        this.$refs.mblNum.focus()
        validationFlag = false
      }

      return validationFlag
    },
    // 아이디찾기버튼 유효성검사
    validationSearch() {
      let validationFlag = true

      if (jglib.isEmpty(this.corpTegiNum)) {
        this.errorMsg = '사업자등록번호를 입력해주세요.'
        this.$refs.corpTegiNum.focus()
        validationFlag = false
      } else if (this.corpTegiNum.length !== 10) {
        this.errorMsg = '10자리 숫자만 입력해 주세요.'
        this.$refs.corpTegiNum.focus()
        validationFlag = false
      } else if (jglib.isEmpty(this.userNm)) {
        this.errorMsg = '이름을 입력해주세요.'
        this.$refs.name.focus()
        validationFlag = false
      } else if (!jglib.isUserName(this.userNm)) {
        this.errorMsg = '이름을 정확히 입력해주세요.'
        this.$refs.name.focus()
        validationFlag = false
      } else if (jglib.isEmpty(this.mblNum)) {
        this.errorMsg = '휴대폰번호를 정확히 입력해주세요.'
        this.$refs.mblNum.focus()
        validationFlag = false
      } else if (this.mblNum.length !== 10 && this.mblNum.length !== 11) {
        this.errorMsg = '휴대폰번호를 정확히 입력해주세요.'
        this.$refs.mblNum.focus()
        validationFlag = false
      } else if (jglib.isPhoneNumber(this.mblNum) === false) {
        this.errorMsg = '휴대폰번호를 정확히 입력해주세요.'
        this.$refs.mblNum.focus()
        validationFlag = false
      } else if (jglib.isEmpty(this.requestNum)) {
        this.errorMsg = '인증번호를 다시 확인해주세요.'
        this.$refs.requestNum.focus()
        validationFlag = false
      } else if (this.requestNum.length !== 6) {
        this.errorMsg = '인증번호를 다시 확인해주세요.'
        this.$refs.requestNum.focus()
        validationFlag = false
      } else if (this.endTimerFlag) {
        this.errorMsg =
          '인증 유효시간이 지났습니다. 인증번호를 다시 요청해주세요.'
        this.$refs.requestNum.focus()
        validationFlag = false
      } else {
        this.errorMsg = ''
        validationFlag = true
      }

      return validationFlag
    },
    keydownOnlyNum(e) {
      return jglib.keydownOnlyNum(e)
    },
    keyupOnlyNum(e) {
      jglib.keyupOnlyNum(e)
    },
    keydownOnlyText(e) {
      return jglib.keydownOnlyText2(e)
    },
    keyupUserNmOnlyTextAndWhitespace(e) {
      this.userNm = jglib.convertOnlyTextAndOneWhitespace(e.target.value)
    },
    focusoutUserNmOnlyTextAndWhitespace(e) {
      this.userNm = jglib.convertOnlyTextAndOneWhitespace(e.target.value).trim()
    },
    startTimer() {
      this.endTimerFlag = false
      this.$refs.timer.start()
    },
    stopTimer() {
      this.$refs.timer.stop()
    },
    resetTimer() {
      this.$refs.timer.reset()
    },
    endTimer() {
      this.endTimerFlag = true
      this.disabledInput = true
    },
    goPassword() {
      this.$router.push('/join/password')
    }
  }
}
</script>
