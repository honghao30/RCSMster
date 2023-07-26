<template>
  <div class="login login-help">
    <div class="login-title__wrap--top">
      <PageTitle pagetitle="아이디 / 비밀번호 찾기" /> <!-- 기획서 v1.0 수정(문구 수정) -->
    </div>
    <div class="tab__wrap only-border"> <!-- 기획서 v1.0 수정(only-border 이중클래스 추가) -->
      <ul class="tab-list">
        <li class="tab-item active">
            <router-link
              to="#"
            >
            <span>아이디 찾기</span>
          </router-link>
        </li>
        <li class="tab-item">
            <router-link
              to="/pwFind"
            >
            <span>비밀번호 찾기</span>
          </router-link>
        </li>
        </ul>
    </div>
    <form  ref="form" :model="form">
      <div class="form-list">
          <div class="form-item">
            <span class="form-item__label">사업자등록번호</span>
            <div class="form-item__content">
              <span class="input"><input ref="certificate" type="text" placeholder="‘-’없이 10자리 숫자만 입력해주세요." v-model="form.certificate"></span>
            </div>
            <p class="guide-text error" v-if="certificateErrorMsg">{{certificateErrorMsgTxt}}</p>
          </div>
          <div class="form-item">
            <span class="form-item__label">이름</span>
            <div class="form-item__content">
              <span class="input"><input ref="name" type="text" placeholder="이름을 입력해주세요."  v-model="form.name"></span>
            </div>
            <p class="guide-text error" v-if="nameErrorMsg">{{nameErrorMsgTxt}}</p>
          </div>
          <div class="form-item">
            <span class="form-item__label">휴대폰번호</span> <!-- 기획서 v1.0 수정 (문구 수정) -->
            <div class="form-item__content">
              <span class="input"><input ref="phone" type="text" placeholder="‘-’없이 숫자만 입력해주세요."  v-model="form.phone"></span>
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
              <span class="input"><input ref="number" type="text" placeholder="" :disabled="disabledInput"  v-model="form.number"></span>
              <span class="time" ref="time">{{ TimerStr }}</span>
            </div>
            <p class="guide-text error" v-if="numberErrorMsg">{{numberErrorMsgTxt}}</p>
          </div>
      </div>
      <div class="button__wrap">
        <ButtonCmp
          type="btn-blue btn-help"
          @click="findId"
        >아이디 찾기</ButtonCmp>
      </div>
  </form>
    <!-- 메시지 모달 -->
    <ModalView
      v-if="isModalViewed" @closeModal="isModalViewed = false"
    >
      <ConfirmMsg
        @closeModal="isModalViewed = false"
      >
        <div class="msg" slot="msg">
          인증번호가 발송되었습니다.
        </div>
        <div class="button__wrap" slot="button">
          <ButtonCmp
            type="btn-blue"
            @click="closeMsge"
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
import { getCertificationNumber } from '@/api/common/code'
import { searchId, authSms } from '@/api/join/FindId'

export default {
  components: {
    PageTitle,
    ButtonCmp,
    ModalView,
    ConfirmMsg
  },
  data() {
    return {
      category: ['아이디 찾기', '비밀번호 찾기'],
      activeTabIndex: 0,
      form: {
        certificate: '',
        name: '',
        phone: '',
        number: ''
      },
      certificateErrorMsg: false,
      nameErrorMsg: false,
      phoneErrorMsg: false,
      numberErrorMsg: false,
      numberErrorMsgTxt: '',
      isModalViewed: false,
      Timer: null,
      TimeCounter: 180,
      TimerStr: '03:00',
      errorMsg: '',
      disabledInput: true,
      certificateErrorMsgTxt: '',
      nameErrorMsgTxt: '',
      phoneErrorMsgTxt: '',
      endTimerFlag: false
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
          __type: 'findid',
          regiNum: this.form.certificate,
          userNm: this.form.name,
          mblNum: this.form.phone
        }
        getCertificationNumber(params)
          .then(resolve => {
            this.start()
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
    findId() {
      if (this.validationSearch()) {
        let authsmsparams = {
          mblNum: this.form.phone,
          authStr: this.form.number
        }
        authSms(authsmsparams)
          .then(resolve => {
            if (resolve.code === '20000000') {
              let params = {
                userNm: this.form.name,
                corpRegiNum: this.form.certificate,
                mblNum: this.form.phone,
                authStr: this.form.number
              }
              searchId(params).then(resolve => {
                if (resolve.code === '20000000') {
                  if (!jglib.isEmpty(resolve.result)) {
                    this.numberErrorMsg = false
                    this.$router.push({
                      name: 'IdResult',
                      params: { userNm: resolve.result }
                    })
                  } else {
                    this.numberErrorMsg = true
                    this.numberErrorMsgTxt = '입력하신 정보와 일치하는 계정이 없습니다.'
                  }
                }
              })
            } else {
              this.numberErrorMsgTxt = '인증번호를 다시 확인해주세요.'
              this.numberErrorMsg = true
            }
          })
          .catch(reject => {
            this.numberErrorMsgTxt = '인증번호를 다시 확인해주세요.'
            this.numberErrorMsg = true
          })
      } else {
        // console.log('아이디찾기 유효성 실패')
      }
    },
    // 인증번호요청버튼 유효성검사
    validationRequest() {
      if (jglib.isEmpty(this.form.certificate)) {
        this.certificateErrorMsgTxt = '사업자등록번호를 입력해주세요.'
        this.certificateErrorMsg = true
        this.$refs.certificate.focus()
        return false
      } else if (this.form.certificate.length !== 10) {
        this.certificateErrorMsgTxt = '10자리 숫자만 입력해 주세요.'
        this.certificateErrorMsg = true
        this.$refs.certificate.focus()
        return false
      }
      this.certificateErrorMsg = false
      if (jglib.isEmpty(this.form.name)) {
        this.nameErrorMsgTxt = '이름을 입력해주세요.'
        this.nameErrorMsg = true
        this.$refs.name.focus()
        return false
      } else if (jglib.onlyText(this.form.name)) {
        this.nameErrorMsgTxt = '이름을 정확히 입력해주세요.'
        this.nameErrorMsg = true
        this.$refs.name.focus()
        return false
      }
      this.nameErrorMsg = false
      if (jglib.isEmpty(this.form.phone)) {
        this.phoneErrorMsgTxt = '휴대폰번호를 정확히 입력해주세요.'
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
    validationSearch() {
      if (!this.validationRequest()) {
        return false
      };
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
        return
      }
      this.endTimerFlag = false
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
      this.disabledInput = true
      this.form.number = ''
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
    closeMsge () {
      this.isModalViewed = false
    },

    keydownOnlyNum(e) {
      return jglib.keydownOnlyNum(e)
    },
    keyupOnlyNum(e) {
      jglib.keyupOnlyNum(e)
    },
    stopTimer() {
      this.$refs.timer.stop()
    },
    goPassword() {
      this.$router.push('/join/password')
    }
  }
}
</script>
