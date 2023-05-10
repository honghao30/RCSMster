<template>
  <div class="login login-help">
    <div class="login-title__wrap--top">
      <PageTitle pagetitle="비밀번호 찾기" />
    </div>
    <div class="tab__wrap">
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
            <span>비밀번호 재설정</span>
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
          <p class="guide-text error" v-if="idErrorMsg">아이디를 입력해주세요.</p>
        </div>
        <div class="form-item">
          <span class="form-item__label">이름</span>
          <div class="form-item__content">
            <span class="input"><input  ref="userName" type="text" class="input" placeholder="이름을 입력해주세요."  v-model="form.name"></span>
          </div>
          <p class="guide-text error" v-if="nameErrorMsg">이름을 입력해주세요.</p>
        </div>
        <div class="form-item">
          <span class="form-item__label">휴대폰</span>
          <div class="form-item__content">
            <span class="input"><input ref="phone" type="text" class="input" placeholder="‘-’없이 숫자만 입력해주세요."  v-model="form.phone"></span>
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
            <span class="input"><input ref="number" type="text" class="input" placeholder="‘-’없이 숫자만 입력해주세요."  v-model="form.number"></span>
            <span class="time" ref="time">{{ TimerStr }}</span>
          </div>
          <p class="guide-text error" v-if="numberErrorMsg">인증번호를 입력해주세요.</p>
        </div>
      </div>
      <div class="button__wrap">
        <ButtonCmp
          type="btn-blue btn-help"
          @click="onSubmit"
        >비밀번호 재설정</ButtonCmp>
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
import ConfirmMsg from '@/views/publish/join/ConfirmMsg.vue'

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
      if (this.form.id === '') {
        this.idErrorMsg = true
        this.$refs.userId.focus()
        return
      }
      if (this.form.name === '') {
        this.nameErrorMsg = true
        this.$refs.userName.focus()
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
        // return
      }
      this.$router.push('./PwChange')
    },
    start() {
      if (this.form.phone === '') {
        this.phoneErrorMsg = true
        this.$refs.phone.focus()
        this.isModalViewed = true
        this.errorMessage = true
        return
      }
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
    }
  }
}
</script>
