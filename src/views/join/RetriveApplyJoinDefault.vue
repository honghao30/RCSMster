<template>
  <div class="rcs_container">
    <article id="content" class="content">
      <div class="box_form_area">
        <div class="top_title_area">
          <h2 class="h2_title">가입신청 결과 조회</h2>
        </div>
        <div class="radio_tab_wrap">
          <span class="radio_tab">
            <input type="radio" name="radiotab" id="radiotab01" checked :class="{active : isActive}">
            <label for="radiotab01" @click="corpTab">기업담당자 신청</label>
          </span>
          <span class="radio_tab">
            <input type="radio" name="radiotab" id="radiotab02" :class="{active : isActive}">
            <label for="radiotab02" @click="agencyTab">대행사 신청</label>
          </span>
        </div>
        <span class="h3_desc">가입신청에 대한 승인 결과를 조회할 수 있습니다.</span>
        <table class="tbl_row_type">
          <caption>
            <strong>가입신청 결과 조회</strong>
            <p>이름, 휴대폰번호</p>
          </caption>
          <colgroup>
            <col style="width:135px">
            <col style="width:auto">
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">이름</th>
              <td>
                <span class="custom_input full_width">
                  <input type="text" ref="userName" placeholder v-model.trim="userName" maxlength="200" @keydown="keydownOnlyText" @keyup="keyupUserNmOnlyTextAndWhitespace" @focusout="focusoutUserNmOnlyTextAndWhitespace">
                </span>
              </td>
            </tr>
            <tr>
              <th scope="row">휴대폰번호</th>
              <td>
                <div class="phoneauth_area">
                  <div class="input_phone_bundle">
                    <span class="custom_input">
                      <input type="text" placeholder="'-'없이 숫자만 입력" ref="phoneNumber" v-model="phoneNumber" maxlength="11"
                        @change="phoneNumberCheck" @keydown="keydownOnlyNum" @keyup="keyupOnlyNum" @keyup.enter="certificationRequest">
                    </span>
                    <a href="javascript:void(0);" class="btn sml bd_black" @click="certificationRequest">
                      <span>인증번호 요청</span>
                    </a>
                  </div>
                  <!-- 기본 비활성화상태이며 휴대폰 인증요청후 활성화-->
                  <div class="input_aututime_bundle">
                    <span class="custom_input">
                      <input type="text" placeholder="인증번호 입력" disabled v-if="certificationFlag">
                      <input type="text" placeholder="인증번호 입력" ref="certificationNumber" v-model="certificationNumber" v-else
                        @keydown="keydownOnlyNum" @keyup="keyupOnlyNum" @keyup.enter="retriveResult" maxlength="6">
                    </span>
                    <span class="time">{{ resTimeData }}</span>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p class="text_error">{{ errMsg }}</p>
        <div class="btn_wrap center mar_t40">
          <a href="javascript:void(0);" class="btn big blue" @click="retriveResult">
            <span>결과조회</span>
          </a>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
// 스크립트를 정의하는 부분
// 개발자 작업 영역
import { retriveApplyJoinDefault } from '@/api/join/applyJoin'
import {
  getCertificationNumber,
  compareCertificationNumber
} from '@/api/common/code'

// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
export default {
  data() {
    return {
      userName: '',
      phoneNumber: '',
      managerFlag: '',
      errMsg: '',
      certificationNumber: '',
      isActive: true,
      certificationRequestFlag: false,
      reCertificationRequestFlag: false,
      certificationFlag: true,

      timeCounter: 180,
      resTimeData: '03:00'
    }
  },
  created() {
    // radio button default 설정
    this.managerFlag = 'CORP'
    // DOM이 만들어 지기 전 실행 되는 곳
    // Data를 사전에 준비할 경우 사용된다.
  },
  mounted() {
    // DOM에 해당 .vue가 들어가게 되면 실행 되는 곳
    // onload 상태와 동일하다. DOM 이후에 조작할 경우 이곳에서 수행
  },
  watch: {},
  computed: {
    // 값이 자주 변경됨에 따라, 관련되어 데이터 혹은 view가 바뀌어야 할 경우 사용
    // method를 바로 연결하면 tic 단위로 계속 실행되기 때문에, 값이 변경할 때만 수행되고,
    // cache로 남는 computed를 활용하는 것이 성능에 좋음
    // getBlankTitle() {
    //   return this.count > 10 ? '10 초과입니다.' : '10 이하입니다.'
    // }
  },
  methods: {
    // .vue 내부에서 사용되는 함수를 정의한다.
    // 이벤트에 따라 실행하거나, 내부적으로 사용되는 함수들을 정의한다.
    corpTab() {
      // TAB 변경시 기존 입력값 초기화
      if (!this.isActive) {
        this.phoneNumber = ''
        this.userName = ''
        this.certificationNumber = ''
        this.certificationFlag = true
        this.resTimeData = '03:00'
        this.errMsg = ''
        this.smsReset()
      }
      this.isActive = true
      this.managerFlag = 'CORP'
      setTimeout(() => {
        this.$refs.userName.focus()
      }, 500)
    },
    agencyTab() {
      // TAB 변경시 기존 입력값 초기화
      if (this.isActive) {
        this.phoneNumber = ''
        this.userName = ''
        this.certificationNumber = ''
        this.certificationFlag = true
        this.resTimeData = '03:00'
        this.errMsg = ''
        this.smsReset()
      }
      this.isActive = false
      this.managerFlag = 'AGENCY'
      setTimeout(() => {
        this.$refs.userName.focus()
      }, 500)
    },
    retriveResult() {
      // 내부 state인 data영역은 this로 접근해야 한다.
      let result = this.validation('finish')
      if (result) {
        // validation 완료시 API 호출
        let reqObj = {
          userNm: this.userName,
          mblNum: this.phoneNumber,
          aprvType: this.managerFlag
        }
        let compareReqObj = {
          mblNum: this.phoneNumber,
          userNm: this.userName,
          authStr: this.certificationNumber
        }
        compareCertificationNumber(compareReqObj)
          .then(res => {
            retriveApplyJoinDefault(reqObj)
              .then(res => {
                if (res.code === '20000000') {
                  if (res.result.aprvRet === 'OK') {
                    this.$confirmMsg('승인완료 되었습니다.<br>로그인 하시겠습니까?')
                      .then(res => {
                        this.$router.push('/login')
                      })
                      .catch(res => {})
                  } else if (this.managerFlag === 'CORP' && res.result.userType === 'CORP') {
                    this.$router.push({
                      name: 'enterpriseApplyJoin',
                      params: res
                    })
                  } else if (this.managerFlag === 'AGENCY' && res.result.userType === 'AGENCY') {
                    this.$router.push({
                      name: 'agencyApplyJoin',
                      params: res
                    })
                  } else {
                    this.$alertMsg(res.message)
                  }
                }
              })
              .catch(res => {
                if (res.code === '60000012') {
                  res.desc = '인증번호를 다시 확인해주세요.'
                }
                this.$alertMsg(res.desc)
              })
          })
          .catch(e => {
            if (e.code === '60000012') {
              this.errMsg = '인증번호를 다시 확인해주세요.'
            } else {
              this.errMsg = e.desc
            }
            this.$refs.certificationNumber.focus()
          })
      }
    },
    phoneNumberCheck(num) {
      // FIXME 숫자가 아닌 다른 문자를 입력 했을경우 Validation 처리

      // 휴대폰번호 '-' 입력했을경우 자동 replace
      this.phoneNumber = this.phoneNumber.replace(/-/g, '')
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
      this.userName = jglib.convertOnlyTextAndOneWhitespace(e.target.value)
    },
    focusoutUserNmOnlyTextAndWhitespace(e) {
      this.userName = jglib.convertOnlyTextAndOneWhitespace(e.target.value).trim()
    },
    // 인증번호 요청
    certificationRequest() {
      if (this.validation('default')) {
        let reqData = {
          __type: 'join',
          userType: this.managerFlag,
          userNm: this.userName,
          mblNum: this.phoneNumber
        }
        getCertificationNumber(reqData)
          .then(res => {
            this.certificationRequestFlag = true
            let result = this.validation('')
            if (result) {
              if (this.reCertificationRequestFlag) {
                this.smsReset()
                setTimeout(() => {
                  this.certificationNumber = ''
                  this.$refs.certificationNumber.focus()
                }, 500)
              }
              this.start()
              this.certificationFlag = false
              this.errMsg = '인증번호를 발송했습니다.'
              setTimeout(() => {
                this.$refs.certificationNumber.focus()
              }, 500)
            }
            this.reCertificationRequestFlag = true
          })
          .catch(e => {
            this.errMsg = '인증번호 발송을 실패하였습니다.'
            if (e.desc) {
              this.errMsg = e.desc
            }
          })
      }
    },
    start() {
      // 1초에 한번씩 start 호출
      this.polling = setInterval(() => {
        this.timeCounter-- // 1씩 감소
        this.resTimeData = this.prettyTime()
        if (this.timeCounter <= 0) this.timeStop()
      }, 1000)
    },
    // 시간 형식으로 변환 리턴
    prettyTime() {
      let time = this.timeCounter / 60
      let minutes = parseInt(time)
      let secondes = Math.round((time - minutes) * 60)
      return this.pad(minutes, 2) + ':' + this.pad(secondes, 2)
    },
    // 2자리수로 만들어줌 09,08...
    pad(n, width) {
      n = n + ''
      return n.length >= width
        ? n
        : new Array(width - n.length + 1).join('0') + n
    },
    timeStop() {
      clearInterval(this.polling)
    },
    // timer reset
    smsReset() {
      clearInterval(this.polling)
      this.timeCounter = 180
    },

    validation(flag) {
      // 필수값 미 입력 후 인증번호 요청 하는경우 validation 및 결과조회 시 validation
      if (flag === 'default' || flag === 'finish') {
        if (jglib.isEmpty(this.managerFlag)) {
          this.errMsg = '신청 구분을 선택 해 주세요.'
          this.$refs.managerRadio.focus()
          return
        } else {
          this.errMsg = ''
        }
        if (jglib.isEmpty(this.userName)) {
          this.errMsg = '이름을 입력 해 주세요.'
          this.$refs.userName.focus()
          return
        } else {
          this.errMsg = ''
        }
        if (!jglib.isUserName(this.userName)) {
          this.errMsg = '이름을 정확히 입력해주세요.'
          this.$refs.userName.focus()
          return
        } else {
          this.errMsg = ''
        }
        if (this.phoneNumber.length !== 11 || jglib.isEmpty(this.phoneNumber)) {
          this.errMsg = '휴대폰번호를 정확히 입력해주세요.'
          this.$refs.phoneNumber.focus()
          return
        } else {
          this.errMsg = ''
        }
      }
      // 결과조회 했을경우 validation, 인증번호 요청시에는 아래 validation 체크 X
      if (flag === 'finish') {
        if (!this.certificationRequestFlag) {
          this.errMsg = '인증번호를 요청 해 주세요.'
          return
        } else {
          this.errMsg = ''
        }
        if (
          !this.certificationFlag &&
          jglib.isEmpty(this.certificationNumber)
        ) {
          this.errMsg = '인증번호를 입력 해 주세요.'
          this.$refs.certificationNumber.focus()
          return
        } else {
          this.errMsg = ''
        }
        if (this.certificationNumber.length !== 6) {
          this.errMsg = '인증번호를 다시 확인해주세요.'
          this.$refs.certificationNumber.focus()
          return
        } else {
          this.errMsg = ''
        }
        if (this.timeCounter === 0) {
          this.errMsg = '인증 유효시간이 지났습니다. 인증번호를 다시 요청해주세요.'
          return
        } else {
          this.errMsg = ''
        }
      }
      return true
    }
  }
}
</script>
