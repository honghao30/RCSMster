<!-- 0620: 모든 페이지 '비밀번호 재설정' -> '비밀번호 찾기' 로 수정  -->
<template>
  <div class="login login-help">
    <div class="login-title__wrap--top">
      <PageTitle pagetitle="아이디 / 비밀번호 찾기" /> <!-- 기획서 v1.0 수정(문구 수정) -->
    </div>
    <div class="tab__wrap only-border"> <!-- 기획서 v1.0 수정(only-border 이중클래스 추가) -->
      <ul class="tab-list">
        <li class="tab-item">
          <router-link
            to="/IdFind"
          >
            <span>아이디 찾기</span>
          </router-link>
        </li>
        <li class="tab-item active">
            <router-link
              to="IdFind"
            >
            <span>비밀번호 찾기</span>
          </router-link>
        </li>
      </ul>
    </div>
    <form  ref="form" :model="form">
      <div class="form-list">
        <div class="form-item">
          <span class="form-item__label">아이디</span>
          <div class="form-item__content">
            <span class="input"><input ref="userId" type="text" class="input" placeholder="아이디를 입력해주세요." v-model="form.id"></span>
          </div>
          <p class="guide-text error" v-if="idErrorMsg">{{idErrorMsgTxt}}</p>
        </div>
        <div class="form-item">
          <span class="form-item__label">이름</span>
          <div class="form-item__content">
            <span class="input"><input  ref="userName" type="text" class="input" placeholder="이름을 입력해주세요."  v-model="form.name"></span>
          </div>
          <p class="guide-text error" v-if="nameErrorMsg">{{nameErrorMsgTxt}}</p>
        </div>
        <div class="form-item">
          <span class="form-item__label">휴대폰번호</span> <!-- 기획서 v1.0 수정 (문구 수정) -->
          <div class="form-item__content">
            <span class="input"><input ref="phone" type="text" class="input" @keydown="keydownOnlyNum" @keyup="keyupOnlyNum" placeholder="‘-’없이 숫자만 입력해주세요."  v-model="form.phone"></span>
            <ButtonCmp
              type="btn-default-line"
              @click="certificationNumRequest"
            >
            인증번호 요청
            </ButtonCmp>
          </div>
          <p class="guide-text error" v-if="phoneErrorMsg">{{phoneErrorMsgTxt}}</p>
        </div>
        <div class="form-item">
          <span class="form-item__label">인증번호</span>
          <div class="form-item__content">
            <span class="input"><input ref="number" maxlength="6" type="text" class="input" placeholder="인증번호 입력" :disabled="disabledInput"  v-model="form.number"
              @keydown="keydownOnlyNum" @keyup="keyupOnlyNum" @keyup.enter="resetPassword"></span>
            <span class="time" ref="time">{{ TimerStr }}</span>
          </div>
          <p class="guide-text error" v-if="numberErrorMsg">{{numberErrorMsgTxt}}</p>
        </div>
      </div>
      <div class="button__wrap">
        <ButtonCmp
          type="btn-blue btn-help"
          @click="resetPassword"
        >비밀번호 찾기</ButtonCmp>
      </div>
  </form>
    <!-- 메시지 모달 -->
    <ModalView
      v-if="isModalViewed" @closeModal="isModalViewed = false"
    >
      <ConfirmMsg
        v-if="errorMessage"
        @closeModal="isModalViewed = false"
      >
        <div class="msg" slot="msg">
          입력한 정보와 일치하는 계정이<br>없습니다
        </div>
        <div class="button__wrap" slot="button">
          <ButtonCmp
            type="btn-blue-line"
            @click="closeMsg"
          >닫기
          </ButtonCmp>
          <ButtonCmp
          type="btn-blue"
          @click="moveIdFind"
          >
            아이디 찾기
          </ButtonCmp>
        </div>
      </ConfirmMsg>
      <!-- 확인 메시지 -->
      <ConfirmMsg
        v-else
        @closeModal="isModalViewed = false"
      >
        <div class="msg" slot="msg">
          인증번호가 발송되었습니다.
        </div>
        <div class="button__wrap" slot="button">
          <ButtonCmp
            type="btn-blue"
            @click="closeMsg"
          >
            확인
          </ButtonCmp>
        </div>
      </ConfirmMsg>
    </ModalView>
    <!-- //메시지 모달 -->
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/join/components/ConfirmMsg.vue'
import { retrievePassword } from '@/api/join/password'
import { compareCertificationNumber, getCertificationNumber } from '@/api/common/code'
export default {
  components: {
    PageTitle,
    ButtonCmp,
    ModalView,
    ConfirmMsg
  },
  data() {
    return {
      form: {
        id: '',
        name: '',
        phone: '',
        number: ''
      },
      idErrorMsg: false,
      nameErrorMsg: false,
      phoneErrorMsg: false,
      numberErrorMsg: false,
      isModalViewed: false,
      errorMessage: false,
      Timer: null,
      TimeCounter: 180,
      TimerStr: '03:00',
      disabledInput: true,
      endTimerFlag: false,
      seq: ''
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
  methods: {
    certificationNumRequest() {
      if (this.validationRequest()) {
        let params = {
          __type: 'resetpw',
          userId: this.form.id,
          mblNum: this.form.phone,
          userNm: this.form.name
        }
        getCertificationNumber(params)
          .then(resolve => {
            this.start()
            this.seq = resolve.result.seq
            // this.errorMsg = '인증번호를 발송했습니다.'
            this.isModalViewed = true // 인증번호 발송알림 팝업
            this.disabledInput = false // 인증번호 인풋 비활성화
            this.numberErrorMsg = false // 인증번호 유효성 가이드 문구 활성화
            this.form.number = '' // 인증번호 인풋 바인딩
            this.$refs.number.focus()
          })
          .catch(reject => {
            if (reject.code === '64510') {
              this.numberErrorMsgTxt = reject.desc
              this.numberErrorMsg = true
            } else {
              this.errorMsg = '휴대폰번호를 정확히 입력해주세요.'
              if (reject.desc) {
                this.errorMsg = reject.desc
              }
            }
            this.disabledInput = true
          })
      } else {
        // console.log('인증번호 유효성 실패')
      }
    },
    resetPassword() {
      if (this.validationPassword()) {
        let reqData = {
          mblNum: this.form.phone,
          userNm: this.form.name,
          authStr: this.form.number
        }
        // 인증번호 검증
        compareCertificationNumber(reqData)
          .then(resolve => {
            if (resolve.code === '20000000') {
              let reqObj = {
                userId: this.form.id,
                mblNum: this.form.phone,
                userNm: this.form.name
              }
              retrievePassword(reqObj)
                .then(resolve => {
                  if (resolve.code === '20000000') {
                    this.$router.push({
                      name: 'PwReset',
                      params: {
                        userId: this.form.id,
                        mblNum: this.form.phone,
                        userNm: this.form.name,
                        seq: this.seq
                      }
                    })
                  } else {
                    this.$alertMsg(resolve.message)
                  }
                  this.disabledInput = true
                })
                .catch(reject => {
                  if (reject.code === '64441') {
                    this.phoneErrorMsgTxt = '가입된 아이디와 휴대폰번호가 일치하지 않습니다. 다시 확인해주세요.'
                    this.disabledInput = true
                  } else if (reject.code === '64440') {
                    this.$alertMsg('입력하신 정보와 일치하는 계정이 없습니다.')
                    this.disabledInput = true
                  }
                })
            }
          })
          .catch(reject => {
            if (reject.code === '64444') {
              reject.desc = '인증에 실패했습니다. 인증번호를 확인해 주세요.'
            }
            this.errorMsg = reject.desc
            this.disabledInput = false
          })
      }
    },
    validationRequest() {
      if (jglib.isEmpty(this.form.id)) {
        this.idErrorMsgTxt = '아이디를 입력해주세요.'
        this.idErrorMsg = true
        this.$refs.userId.focus()
        return false
      }
      this.idErrorMsg = false
      if (jglib.isEmpty(this.form.name)) {
        this.nameErrorMsgTxt = '이름을 입력해주세요.'
        this.nameErrorMsg = true
        this.$refs.userName.focus()
        return false
      } else if (jglib.onlyText(this.form.name)) {
        this.nameErrorMsgTxt = '이름을 정확히 입력해주세요.'
        this.nameErrorMsg = true
        this.$refs.userName.focus()
        return false
      }
      this.nameErrorMsg = false
      if (jglib.isEmpty(this.form.phone)) {
        this.phoneErrorMsgTxt = '휴대폰번호를 입력해주세요.'
        this.phoneErrorMsg = true
        this.$refs.phone.focus()
        return false
      } else if (this.form.phone.length !== 10 && this.form.phone.length !== 11) {
        this.phoneErrorMsgTxt = '휴대폰번호를 정확히 입력해주세요.'
        this.phoneErrorMsg = true
        this.$refs.phone.focus()
        return false
      } else if (jglib.isPhoneNumber(this.form.phone) === false) {
        this.phoneErrorMsgTxt = '휴대폰번호를 정확히 입력해주세요.'
        this.phoneErrorMsg = true
        this.$refs.form.phone.focus()
        return false
      }
      this.phoneErrorMsg = false
      return true
    },
    // 아이디찾기버튼 유효성검사
    validationPassword() {
      if (!this.validationRequest()) {
        return false
      }
      if (jglib.isEmpty(this.form.number)) {
        this.numberErrorMsgTxt = '인증번호를 입력해주세요.'
        this.numberErrorMsg = true
        this.$refs.number.focus()
        return false
      } else if (this.form.number.length !== 6) {
        this.numberErrorMsgTxt = '인증번호를 다시 확인해주세요.'
        this.numberErrorMsg = true
        this.$refs.number.focus()
        return false
      } else if (this.endTimerFlag) {
        this.numberErrorMsgTxt = '인증 유효시간이 지났습니다.'
        this.numberErrorMsg = true
        return false
      }
      this.numberErrorMsgTxt = ''
      this.numberErrorMsg = false
      return true
    },
    start() {
      if (this.form.phone === '') {
        this.phoneErrorMsg = true
        this.$refs.phone.focus()
        this.isModalViewed = true
        this.errorMessage = true
        return
      }
      this.endTimerFlag = false
      this.isModalViewed = true
      this.errorMessage = false
      this.$refs.time.classList.add('active')
      // 1초에 한번씩 start 호출
      this.TimeCounter = 180
      var interval = setInterval(() => {
        this.TimeCounter-- // 1초씩 감소
        this.TimerStr = this.prettyTime()
        if (this.TimeCounter <= 0) this.timerStop(interval)
      }, 1000)
      return interval
    },
    timerStop: function(Timer) {
      clearInterval(Timer)
      this.TimeCounter = 0
      this.endTimerFlag = true
    },
    prettyTime: function() {
      // 시간 형식으로 변환 리턴
      let time = this.TimeCounter / 60
      let minutes = parseInt(time)
      let secondes = Math.round((time - minutes) * 60)
      return (
        minutes.toString().padStart(2, '0') +
        ':' +
        secondes.toString().padStart(2, '0')
      )
    },
    closeMsg () {
      this.isModalViewed = false
    },
    moveIdFind () {
      this.$router.push('./IdFind')
      document.documentElement.style.overflow = 'auto'
    },
    keydownOnlyNum(e) {
      return jglib.keydownOnlyNum(e)
    },
    keyupOnlyNum(e) {
      jglib.keyupOnlyNum(e)
    }
  }
}
</script>
