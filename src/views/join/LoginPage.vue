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
          <p class="guide-text error" v-if="pwChangeErrorMsg">아이디 또는 비밀번호가 맞지 않습니다. 비밀번호를 5회 이상 잘못 입력하는 경우 로그인이 제한됩니다.</p>
        </div>
      </div>
    </form>
    <div class="help-menu__wrap--bottom">
      <div class="autosave">
        <span class="checkbox">
          <input type="checkbox" id="check" value="form.check"/>
          <label for="check"><span class="checkbox__text">아이디 저장</span></label>
        </span>
      </div>
      <div class="idfind line">
        <router-link to="/IdFind">아이디 찾기</router-link>
        <router-link to="/pwFind">비밀번호 찾기</router-link>
      </div>
    </div>
    <div class="button__wrap">
      <ButtonCmp
        type="btn-blue btn-login"
        @click="onSubmit"
      >로그인</ButtonCmp>
    </div>
    <!-- 기획서 v1.0 수정 (디자인 적용을 위해 pub2Dev > LoginPage.vue에 내용 그대로 들고옴) -->
    <!-- 예외 처리 모달 -->
    <ModalView
      v-if="isErrorMsgViewed" @closeModal="isErrorMsgViewed = false"
    >
    <ConfirmMsg
        v-if="ErrorMsg"
        @closeModal="ErrorMsg = false"
      >
        <div class="msg" slot="msg">
          {{ ErrorMsgText }}
          <!-- 5회 이상 아이디 또는 비밀번호를 잘못<br />
          입력했습니다. 비밀번호를 다시 설정해주세요. -->
        </div>
        <div class="button__wrap" slot="button">
          <ButtonCmp
             type="btn-blue-line"
             @click="closeErrorMsg"
          >
            닫기
          </ButtonCmp>
          <ButtonCmp
             type="btn-blue"
             @click="moveChage"
             v-if="isMoveChage"
          >
            비밀번호 변경
          </ButtonCmp>
        </div>
      </ConfirmMsg>
    </ModalView>
    <!-- //예외 처리 모달 -->
    <!-- 메시지 모달 -->
    <ModalView
      v-if="isModalViewed" @closeModal="isModalViewed = false"
    >
      <!-- // 휴대폰 인증 -->
      <ConfirmMsg
        @closeModal="isModalViewed = false"
        modalsize="Max628"
        v-if="PhoneCertModal"
      > <!-- 기획서 v1.0 수정 (modalsize 수정) -->
        <div slot="msg">
          <div class="msg">
            <div class="phone-cert__title"> <!-- 기획서 v1.0 수정 (문구 수정) -->
              휴대폰번호 인증
            </div>
            <div class="phone-cert__msg"> <!-- 기획서 v1.0 수정 (마침표 추가) -->
              인증번호를 발송하였습니다.<br>
              수신 받은 인증번호를 입력해주세요.
            </div>
            <!-- 기획서 v1.0 수정 (phone-cert__des 부모 클래스 추가) -->
            <div class="phone-cert__des">
              <div class="phone-cert__number">{{ maskNm }} {{ maskHp }}</div>
              <div  class="phone-cert__number-input">
                <span class="input input-time"> <!-- 기획서 v1.0 수정 (input-time 이중 클래스 추가) -->
                  <input ref="number" type="text" placeholder="인증번호" @keyup.enter="chkAuthNum()" v-model="form.certNumber">
                </span>
                  <span class="time active" ref="time">{{ TimerStr }}</span>
                  <ButtonCmp
                    type="btn-blue"
                    size="medium"
                    :disabled="isButtonDisabled"
                    @click="start"
                  > <!-- 기획서 v1.0 수정 (type 수정, size 추가) -->
                    인증번호 재요청
                  </ButtonCmp>
              </div>
              <p class="guide-text error" v-if="phoneCheckTimeout">{{ phoneCheckTimeoutText }}</p>
            </div>
            <!-- // 기획서 v1.0 수정 (phone-cert__des 부모 클래스 추가) -->
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
    <!-- 핸드폰 번호 입력 모달 -->
    <ModalView
      v-if="isPhoneNumInputViewed" @closeModal="isPhoneNumInputViewed = false"
    >
    <!-- // 휴대폰 인증 -->
    <ConfirmMsg
        @closeModal="isPhoneNumInputViewed = false"
        modalsize="Max628"
        v-if="PhoneCertModal"
      >
        <div slot="msg">
          <div class="msg">
            <!-- <div class="phone-cert__title">
              휴대폰번호 인증
            </div> --> <!-- 기획서 v1.0 수정 (문구 수정) -->
            <div class="phone-cert__msg">
              인증번호 발송을 위해<br/>
              담당자로 등록된 휴대폰번호를 입력해주세요.
            </div> <!-- 기획서 v1.0 수정 (문구 수정) -->
            <div  class="phone-cert__number-input number-input__before"> <!-- 기획서 v1.0 수정 (number-input__before 이중클래스 추가) -->
              <span class="number-input__tit"> <!-- 기획서 v1.0 수정 (문구 수정) -->
                휴대폰 번호
              </span>
              <span class="input">
                <input ref="number" type="text" placeholder="휴대폰 번호" @keyup.enter="inputMblNum()" v-model="mblNum">
                <p class="guide-text error">올바른 휴대폰 번호를 입력해주세요.</p> <!-- 기획서 v1.0 수정 (에러메시지 추가) -->
              </span>
            </div>
          </div>
        </div>
        <div class="button__wrap" slot="button">
            <ButtonCmp
              type="btn-blue-line"
              @click="closePhoneNumInputMsg"
            >닫기
            </ButtonCmp>
            <ButtonCmp
              type="btn-blue"
              @click="inputMblNum"
            >
              인증
            </ButtonCmp>
        </div>
      </ConfirmMsg>
    </ModalView>
    <!-- //핸드폰 번호 입력 모달 -->

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
    <!-- // 기획서 v1.0 수정 (디자인 적용을 위해 pub2Dev > LoginPage.vue 내용 그대로 들고옴) -->
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
      pwChangeErrorMsg: false,
      showPassword: false,
      isModalViewed: false,
      pwChangeModalViewed: false,
      isSendMsgViewed: false,
      SendSmsMsg: false,
      PhoneCertModal: false,
      pwChangeModal: false,
      iconName: 'icon-eye',
      IsTopPos: true,
      Timer: null,
      TimeCounter: 180,
      TimerStr: '03:00',
      count: 0
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
      this.count++
      if (this.count > 5) {
        this.pwChangeModalViewed = true
        this.pwChangeModal = true
        this.pwChangeErrorMsg = true
      }
      if (this.form.id === '') {
        this.idErrorMsg = true
        this.$refs.usrid.focus()
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
    moveChange () {
      this.$router.push('./pwFind')
      document.documentElement.style.overflow = 'auto'
    },
    closeSmsMsg () {
      this.SendSmsMsg = false
      this.isSendMsgViewed = false
    },
    closeMsg () {
      this.isModalViewed = false
      this.pwChangeModalViewed = false
      this.PhoneCertModal = false
      this.pwChangeModal = false
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
