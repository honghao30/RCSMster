<template>
  <!-- 메시지 모달 -->
  <ModalView
      v-if="isModalViewed" @closeModal="isModalViewed = false"
    >
     <!-- // 휴대폰 인증 -->
     <ConfirmMsg
        @closeModal="isModalViewed = false"
        modalsize="Modalmax480"
        v-if="PhoneCertModal"
      >
        <div slot="msg">
          <div class="msg">
            <div class="phone-cert__title">
              휴대폰 인증
            </div>
            <div class="phone-cert__msg">
              인증번호를 발송하였습니다.<br>
              수신 받은 인증번호를 입력해주세요
            </div>
            <div class="phone-cert__number">{{ maskNm }} {{ maskHp }}</div>
            <div  class="phone-cert__number-input">
              <span class="input">
                <input ref="number" type="text" placeholder="인증번호"  v-model="form.certNumber">
              </span>
                <span class="time active" ref="time">{{ TimerStr }}</span>
                <ButtonCmp
                  type="btn-gray-line"
                  :disabled="isButtonDisabled"
                  @click="start"
                >
                  인증번호 재요청
                </ButtonCmp>
            </div>
            <p class="guide-text error" v-if="phoneCheckTimeout">인증 유효시간이 지났습니다.</p>
          </div>
        </div>
        <div class="button__wrap" slot="button">
            <ButtonCmp
              type="btn-blue-line"
              @click="closeMsg"
            >닫기
            </ButtonCmp>
            <ButtonCmp
              type="btn-blue"
              :disabled="!isDisabled"
              @click="chkAuthNum"
            >
              인증
            </ButtonCmp>
        </div>
      </ConfirmMsg>
    </ModalView>
    <!-- //메시지 모달 -->
</template>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'

export default {
  name: 'AuthNum',
  components: {},
  directives: {
    focus: {
      // 디렉티브 정의
      inserted: function(el) {
        el.focus()
      }
    }
  },
  props: {
    from: { type: String, default: '' }
  },
  data: function() {
    return {
      userId: '',
      userNm: '',
      mblNum: '',
      authNum: '',
      timer: null,
      timeLeft: '',
      timeout: false,
      message: ''
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'getUserForAuth'
    })
  },
  created() {
    if (this.userInfo.userId === '') {
      this.$router.replace({ name: 'login' })
    }

    const userNm = this.userInfo.userNm
    this.userNm = userNm.substring(0, 1) + '*' + userNm.substring(2)

    const mblNum = this.userInfo.mblNum
    this.mblNum = mblNum.substring(0, 3) + '-****-' + mblNum.substring(7)

    this.reqAuthNum()
  },
  methods: {
    reqAuthNum() {
      this.message = ''
      let param = { userId: this.userInfo.userId }
      if (this.userInfo.userType === 'SUBAGENCY') {
        param.mblNum = this.userInfo.mblNum
        param.userType = this.userInfo.userType
      }
      store.dispatch('Authsms', param).then(response => {
        if (response.result != null) {
          this.stopTimer()
          this.startTimer(new Date().getTime())
          this.$alertMsg('인증번호가 발송되었습니다')
        } else {
          this.message = '인증번호 받기에 실패했습니다.' + (response.message ? ' (' + response.message + ')' : '')
        }
      })
    },
    chkAuthNum() {
      this.message = ''
      if (!this.authNum) {
        this.message = '인증번호를 입력해 주세요.'
        return false
      }
      let param = { userId: this.userInfo.userId, authStr: this.authNum }
      if (this.userInfo.userType === 'SUBAGENCY') {
        param.mblNum = this.userInfo.mblNum
        param.userType = this.userInfo.userType
      }
      store.dispatch('AuthsmsConfirm', param).then(response => {
        this.stopTimer()
        this.timeLeft = ''

        if (response.result.exceed90days) {
          this.$router.replace({ name: 'ExceedPassword' })
        } else {
          if (this.from === 'miricanvas') {
            this.$router.push({ name: 'onlineqnaform', params: { from: 'miricanvas' } })
          } else {
            // 로그인 이후 페이지는 대시보드로 고정
            this.$router.replace('/service/dashboard')
          }
          // if (this.$route.params && this.$route.params.afterRouter) {
          //   this.$router.replace(this.$route.params.afterRouter.path)
          // } else {
          //   this.$router.replace('/service/dashboard')
          // }
        }
      }).catch(error => {
        this.message = typeof error.desc === 'string' ? error.desc : error.desc.desc
      })
    },
    startTimer(begin) {
      this.authNum = ''
      this.message = ''
      this.timeout = false

      this.timer = setInterval(() => {
        let now = new Date().getTime()
        let elapsed = Math.floor((now - begin) / 1000)
        let distance = 180 - elapsed
        let minutes = Math.floor((distance % (60 * 60)) / 60)
        let seconds = Math.floor(distance % 60)

        this.timeLeft = '0' + minutes + ':' + (seconds < 10 ? '0' : '') + seconds

        if (distance < 1) {
          this.stopTimer()
          this.timeLeft = ''
          this.timeout = true
        }
      }, 1000)
    },
    stopTimer() {
      clearInterval(this.timer)
    },
    goBack() {
      this.stopTimer()
      this.timeLeft = ''
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
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
