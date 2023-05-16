<template>
  <div class="login">
    <div class="login-title__wrap--top">
      <PageTitle pagetitle="로그인" />
      <p>Biz RCS는 기업, 기관, 인증된 단체만 <span class="m-block">이용 가능합니다.</span></p>
    </div>
    <form  ref="form" :model="form">
      <div class="form-list">
        <div class="form-item">
          <span class="form-item__label">아이디</span>
          <div class="form-item__content">
            <span class="input"><input ref="usrid" type="text" class="input" placeholder="아이디를 입력해주세요." v-model="form.id"></span>
          </div>
          <p class="guide-text error" v-if="idErrorMsg">아이디를 입력해주세요.</p>
        </div>
        <div class="form-item">
          <span class="form-item__label">비밀번호</span>
          <div class="form-item__content">
            <ButtonCmp
              type="btn-only-icon"
              :iconname=iconName
              @click="toggleShow"
            ><span class="irtext">비밀번호 보이기</span></ButtonCmp>
            <span class="input"><input ref="usrid" v-if="showPassword" type="text" class="input" placeholder="비밀번호를 입력해주세요."  v-model="form.pw">
              <input ref="usrpw" v-else type="password" class="input" placeholder="비밀번호를 입력해주세요."  v-model="form.pw">
            </span>
          </div>
          <p class="guide-text error" v-if="pwErrorMsg">비밀번호를 입력해주세요.</p>
        </div>
      </div>
      <div class="button__wrap">
        <ButtonCmp
          type="btn-blue btn-login"
          @click="onSubmit"
        >로그인</ButtonCmp>
      </div>
  </form>
    <div class="help-menu__wrap--bottom">
      <div class="autosave">
        <span class="checkbox">
          <input type="checkbox" id="check" value="form.check"/>
          <label for="check"><span class="checkbox__text">아이디 저장</span></label>
        </span>
      </div>
      <div class="idfind">
        <router-link to="/IdFind">아이디 찾기</router-link>
        <router-link to="/pwFind">비밀번호 재설정</router-link>
      </div>
    </div>
    <!-- 메시지 모달 -->
    <ModalView
      v-if="isModalViewed" @closeModal="isModalViewed = false"
    >
      <ConfirmMsg
        @closeModal="isModalViewed = false"
      >
        <div class="msg" slot="msg">
          5회 이상 아이디 또는 비밀번호를 잘못<br />
          입력했습니다. 비밀번호를 다시 설정해주세요.
        </div>
        <div class="button__wrap" slot="button">
          <ButtonCmp
             type="btn-blue-line"
             @click="closeMsge"
          >
            닫기
          </ButtonCmp>
          <ButtonCmp
             type="btn-blue"
             @click="moveChage"
          >
            비밀번호 변경
          </ButtonCmp>
        </div>
      </ConfirmMsg>
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
            <div class="phone-cert__number">홍*동 010-****-5410</div>
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
              @click="closeMsg"
            >
              인증
            </ButtonCmp>
        </div>
      </ConfirmMsg>
    </ModalView>
    <!-- //메시지 모달 -->
    <ModalView
      :class="{ topPositon : IsTopPos }"
      v-if="isSendMsgViewed" @closeModal="isSendMsgViewed = false"
    >
      <!-- // 문자 발송 -->
      <ConfirmMsg
        v-if="SendSmsMsg"
        @closeModal="isSendMsgViewed = false"
      >
        <div class="msg" slot="msg">
          인증번호가 발송 되었습니다.
        </div>
        <div class="button__wrap" slot="button">
          <ButtonCmp
             type="btn-blue"
             @click="closeSmsMsg"
          >
            확인
          </ButtonCmp>
        </div>
      </ConfirmMsg>
    </ModalView>
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/join/components/ConfirmMsg.vue'
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
        pw: '',
        certNumber: ''
      },
      idErrorMsg: false,
      pwErrorMsg: false,
      showPassword: false,
      isModalViewed: false,
      isSendMsgViewed: false,
      SendSmsMsg: false,
      PhoneCertModal: false,
      iconName: 'icon-eye',
      IsTopPos: true,
      Timer: null,
      TimeCounter: 180,
      TimerStr: '03:00'
    }
  },
  watch: {
    isModalViewed () {
      if (this.isModalViewed) {
        document.documentElement.style.overflow = 'hidden'
        this.start()
        return
      }
      document.documentElement.style.overflow = 'auto'
    }
  },
  computed: {
    isDisabled() {
      return this.form.certNumber.length > 0
    }
  },
  methods: {
    onSubmit () {
      if (this.form.id === '') {
        this.idErrorMsg = true
        this.$refs.usrid.focus()
        this.isModalViewed = true
        return
      }
      if (this.form.pw === '') {
        this.pwErrorMsg = true
        this.$refs.usrpw.focus()
        return
      }
      this.isSendMsgViewed = true
      this.SendSmsMsg = true
      this.start()
    },
    toggleShow () {
      if (this.showPassword) {
        this.iconName = 'icon-eye'
      } else {
        this.iconName = 'icon-eye blue'
      }
      this.showPassword = !this.showPassword
    },
    moveChage () {
      this.$router.push('./pwFind')
      document.documentElement.style.overflow = 'auto'
    },
    closeSmsMsg () {
      this.SendSmsMsg = false
      this.isSendMsgViewed = false
    },
    closeMsg () {
      this.isModalViewed = false
      this.PhoneCertModal = false
    },
    start() {
      this.isModalViewed = true
      this.PhoneCertModal = true
      this.isButtonDisabled = true
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
      if (this.form.certNumber === '') {
        this.phoneCheckTimeout = true
      }
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
    }
  }
}
</script>
