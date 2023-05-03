<template>
  <div class="rcs_container">
    <article id="content" class="content">
      <div class="box_form_area">
        <div class="top_title_area">
          <h2 class="h2_title">아이디 찾기 / 비밀번호 재설정</h2>
        </div>
        <div class="tab_wrap">
          <ul class="tab_nav">
            <li>
              <a href="javascript:void(0);" @click="goFindId">아이디 찾기</a>
            </li>
            <li class="active">
              <a href="javascript:void(0);">비밀번호 재설정</a>
            </li>
          </ul>
          <div class="tab_container">
            <div class="tab_content active">
              <span class="h3_desc">계정에 등록된 정보로 인증 완료 후 비밀번호를 재설정 합니다.</span>
              <table class="tbl_row_type">
                <caption>
                  <strong>아이디 찾기</strong>
                  <p>아이디, 이름, 휴대폰번호</p>
                </caption>
                <colgroup>
                  <col style="width:140px">
                  <col style="width:auto">
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">아이디</th>
                    <td>
                      <span class="custom_input full_width">
                        <input type="text" ref="userId" v-model.trim="userId" @keydown="notAllowWhitespace">
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">이름</th>
                    <td>
                      <span class="custom_input full_width">
                        <input type="text" class="input_text" ref="userName" v-model.trim="userName" maxlength="200" @keydown="keydownOnlyText" @keyup="keyupUserNmOnlyTextAndWhitespace" @focusout="focusoutUserNmOnlyTextAndWhitespace">
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row">휴대폰번호</th>
                    <td>
                      <div class="phoneauth_area">
                        <div class="input_phone_bundle">
                          <span class="custom_input">
                            <input type="text" class="input_text" ref="userPhoneNumber" maxlength="11" placeholder="'-'없이 숫자만 입력"
                              @keydown="keydownOnlyNum" @keyup="keyupOnlyNum" @keyup.enter="certificationRequest" @change="userPhoneNumberCheck"
                              v-model="userPhoneNumber">
                          </span>
                          <button class="btn sml bd_black" @click="certificationRequest">
                            <span>인증번호 요청</span>
                          </button>
                        </div>
                        <!-- 기본 비활성화상태이며 휴대폰 인증요청후 활성화-->
                        <div class="input_aututime_bundle">
                          <span class="custom_input">
                            <input type="text" maxlength="6" v-model="certificationNumber" :disabled="disabledInput" ref="certificationNumber"
                              @keydown="keydownOnlyNum" @keyup="keyupOnlyNum" @keyup.enter="resetPassword" placeholder="인증번호 입력">
                          </span>
                          <span class="time">
                            <timer ref="timer" startTime="03:00" @end="endTimer"/>
                          </span>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p class="text_error">{{ errorMsg }}</p>
              <div class="btn_wrap center mar_t40">
                <button class="btn big blue" @click="resetPassword">
                  <span>비밀번호 재설정</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { retrievePassword } from '@/api/join/password'
import { compareCertificationNumber, getCertificationNumber } from '@/api/common/code'
import Timer from '@/components/Timer'

export default {
  name: 'Password',
  components: {
    Timer
  },
  data() {
    return {
      userId: '',
      userName: '',
      userPhoneNumber: '',
      seq: '',
      certificationNumber: '',
      errorMsg: '',
      certificationFlag: true,
      endTimerFlag: false,
      disabledInput: true
    }
  },

  created() {},
  mounted() {},
  methods: {
    resetPassword() {
      if (this.validationPassword()) {
        let reqData = {
          mblNum: this.userPhoneNumber,
          userNm: this.userName,
          authStr: this.certificationNumber
        }
        // 인증번호 검증
        compareCertificationNumber(reqData)
          .then(resolve => {
            if (resolve.code === '20000000') {
              let reqObj = {
                userId: this.userId,
                mblNum: this.userPhoneNumber,
                userNm: this.userName
              }
              retrievePassword(reqObj)
                .then(resolve => {
                  if (resolve.code === '20000000') {
                    this.$router.push({
                      name: 'ResetPassword',
                      params: {
                        userId: this.userId,
                        userNm: this.userName,
                        mblNum: this.userPhoneNumber,
                        seq: this.seq
                      }
                    })
                  } else {
                    this.$alertMsg(resolve.message)
                  }
                  this.disabledInput = true
                })
                .catch(reject => {
                  if (reject.code === '60000009') {
                    this.$alertMsg(
                      '가입하신 아이디와 휴대폰인증 정보가 일치하지 않습니다.<br>다시 확인해 주세요.'
                    )
                    this.disabledInput = true
                  } else if (reject.code === '60000008') {
                    this.$alertMsg('입력하신 정보와 일치하는 계정이 없습니다.')
                    this.disabledInput = true
                  }
                })
            }
          })
          .catch(reject => {
            if (reject.code === '60000012') {
              reject.desc = '인증에 실패했습니다. 인증번호를 확인해 주세요.'
            }
            this.errorMsg = reject.desc
            this.disabledInput = false
          })
      }
    },

    // 비밀번호 재설정
    validationPassword() {
      let validationFlag = true
      if (jglib.isEmpty(this.userId)) {
        this.errorMsg = '아이디를 입력해주세요.'
        this.$refs.userId.focus()
        validationFlag = false
      } else if (!jglib.isUserId(this.userId)) {
        this.errorMsg = '아이디를 정확히 입력해주세요.'
        this.$refs.userId.focus()
        validationFlag = false
      } else if (jglib.isEmpty(this.userName)) {
        this.errorMsg = '이름을 입력해주세요.'
        this.$refs.userName.focus()
        validationFlag = false
      } else if (!jglib.isUserName(this.userName)) {
        this.errorMsg = '이름을 정확히 입력해주세요.'
        this.$refs.userName.focus()
        validationFlag = false
      } else if (jglib.isEmpty(this.userPhoneNumber)) {
        this.errorMsg = '휴대폰번호를 정확히 입력해주세요.'
        this.$refs.userPhoneNumber.focus()
        validationFlag = false
      } else if (!jglib.isPhoneNumber(this.userPhoneNumber)) {
        this.errorMsg = '휴대폰번호를 정확히 입력해주세요.'
        this.$refs.userPhoneNumber.focus()
        validationFlag = false
      } else if (jglib.isEmpty(this.certificationNumber)) {
        this.errorMsg = '인증번호를 입력해주세요.'
        this.$refs.certificationNumber.focus()
        validationFlag = false
      } else if (this.certificationNumber.length !== 6) {
        this.errorMsg = '인증번호를 다시 확인해주세요.'
        this.$refs.certificationNumber.focus()
        validationFlag = false
      } else if (this.endTimerFlag) {
        this.errorMsg =
          '인증 유효시간이 지났습니다. 인증번호를 다시 요청해주세요.'
        this.$refs.certificationNumber.focus()
        this.certificationNumber = ''
        validationFlag = false
      } else {
        this.errorMsg = ''
      }
      return validationFlag
    },
    // 인증번호요청 호출
    certificationRequest() {
      if (this.validationRequest()) {
        let params = {
          __type: 'resetpw',
          userId: this.userId,
          mblNum: this.userPhoneNumber,
          userNm: this.userName
        }
        getCertificationNumber(params)
          .then(resolve => {
            this.errorMsg = resolve.desc
            this.seq = resolve.result.seq
            this.disabledInput = false
            this.resetTimer()
            this.startTimer()
            this.certificationNumber = ''
            this.$refs.certificationNumber.focus()
          })
          .catch(reject => {
            this.errorMsg = reject.desc
            this.disabledInput = true
          })
      }
    },
    // 인증번호 유효 검사
    validationRequest() {
      let validationFlag = true
      this.certificationNumber = ''
      if (jglib.isEmpty(this.userId)) {
        this.errorMsg = '아이디를 입력해주세요.'
        this.$refs.userId.focus()
        validationFlag = false
      } else if (!jglib.isUserId(this.userId)) {
        this.errorMsg = '아이디를 정확히 입력해주세요.'
        this.$refs.userId.focus()
        validationFlag = false
      } else if (jglib.isEmpty(this.userName)) {
        this.errorMsg = '이름을 입력해주세요.'
        this.$refs.userName.focus()
        validationFlag = false
      } else if (!jglib.isUserName(this.userName)) {
        this.errorMsg = '이름을 정확히 입력해주세요.'
        this.$refs.userName.focus()
        validationFlag = false
      } else if (jglib.isEmpty(this.userPhoneNumber)) {
        this.errorMsg = '휴대폰번호를 정확히 입력해주세요.'
        this.$refs.userPhoneNumber.focus()
        validationFlag = false
      } else if (!jglib.isPhoneNumber(this.userPhoneNumber)) {
        this.errorMsg = '휴대폰번호를 정확히 입력해주세요.'
        this.$refs.userPhoneNumber.focus()
        validationFlag = false
      }
      return validationFlag
    },
    notAllowWhitespace(e) {
      jglib.notAllowWhitespace(e)
    },
    // 숫자만 입력
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
      this.userName = jglib.convertOnlyTextAndOneWhitespace(e.target.value)
    },
    focusoutUserNmOnlyTextAndWhitespace(e) {
      this.userName = jglib.convertOnlyTextAndOneWhitespace(e.target.value).trim()
    },
    // 핸드폰번호 '-' 입력할경우 ''로 치환
    userPhoneNumberCheck() {
      this.userPhoneNumber = this.userPhoneNumber.replace(/-/g, '')
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
      this.errorMsg =
        '인증 유효시간이 지났습니다. 인증번호를 다시 요청해주세요.'
      this.certificationNumber = ''
      this.disabledInput = true
    },
    // 아이디 페이지 이등
    goFindId() {
      this.$router.push('/join/FindId')
    }
  }
}
</script>

<style lang="less" scoped>
.test-box {
  border: 1px solid lightgreen;
}
</style>
