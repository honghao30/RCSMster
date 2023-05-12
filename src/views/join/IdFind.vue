<template>
  <div class="login login-help">
    <div class="login-title__wrap--top">
      <PageTitle pagetitle="아이디 찾기" />
    </div>
    <div class="tab__wrap">
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
            <span>비밀번호 재설정</span>
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
            <p class="guide-text error" v-if="certificateErrorMsg">사업자등록번호를 입력해주세요.</p>
          </div>
          <div class="form-item">
            <span class="form-item__label">이름</span>
            <div class="form-item__content">
              <span class="input"><input ref="name" type="text" placeholder="이름을 입력해주세요."  v-model="form.name"></span>
            </div>
            <p class="guide-text error" v-if="nameErrorMsg">이름을 입력해주세요.</p>
          </div>
          <div class="form-item">
            <span class="form-item__label">휴대폰</span>
            <div class="form-item__content">
              <span class="input"><input ref="phone" type="text" placeholder="‘-’없이 숫자만 입력해주세요."  v-model="form.phone"></span>
              <ButtonCmp
                type="btn-default-line"
                @click="start"
              >
              인증번호 요청
              </ButtonCmp>
            </div>
            <p class="guide-text error" v-if="phoneErrorMsg">휴대폰번호를 입력해주세요.</p>
          </div>
          <div class="form-item">
            <span class="form-item__label">인증번호</span>
            <div class="form-item__content">
              <span class="input"><input ref="number" type="text" placeholder="‘-’없이 숫자만 입력해주세요."  v-model="form.number"></span>
              <span class="time" ref="time">{{ TimerStr }}</span>
            </div>
            <p class="guide-text error" v-if="numberErrorMsg">인증번호를 입력해주세요.</p>
          </div>
      </div>
      <div class="button__wrap">
        <ButtonCmp
          type="btn-blue btn-help"
          @click="onSubmit"
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
import ConfirmMsg from '@/views/join/ConfirmMsg.vue'
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
      isModalViewed: false,
      Timer: null,
      TimeCounter: 180,
      TimerStr: '03:00'
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
    onSubmit () {
      if (this.form.certificate === '') {
        this.certificateErrorMsg = true
        this.$refs.certificate.focus()
        return
      }
      if (this.form.name === '') {
        this.nameErrorMsg = true
        this.$refs.name.focus()
        return
      }
      if (this.form.phone === '') {
        this.phoneErrorMsg = true
        this.$refs.phone.focus()
        return
      }
      if (this.form.number === '') {
        this.numberErrorMsg = true
        this.$refs.number.focus()
      }
      this.$router.push('./IdResult')
    },
    start() {
      if (this.form.phone === '') {
        this.phoneErrorMsg = true
        this.$refs.phone.focus()
        return
      }
      this.isModalViewed = true
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
    }
  }
}
</script>
