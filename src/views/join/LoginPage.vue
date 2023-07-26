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
          <p class="guide-text error" v-if="form.error.target === 'id' && form.error.msg !== ''">{{ form.error.msg }}</p>
        </div>
        <div class="form-item">
          <span class="form-item__label">비밀번호</span>
          <div class="form-item__content">
            <ButtonCmp
              type="btn-only-icon"
              :iconname=iconName
              @click="toggleShow"
            >
            <span class="irtext">비밀번호 보이기</span></ButtonCmp>
            <span class="input">
              <input ref="usrid" v-if="showPassword" type="text" class="input" placeholder="비밀번호를 입력해주세요."  v-model="form.pw">
              <input ref="usrpw" v-else type="password" class="input" placeholder="비밀번호를 입력해주세요."  v-model="form.pw">
            </span>
          </div>
          <p class="guide-text error" v-if="form.error.target === 'pw' && form.error.msg !== ''">{{ form.error.msg }}</p>
        </div>
      </div>
    </form>
    <div class="help-menu__wrap--bottom">
      <div class="autosave">
        <span class="checkbox">
          <input type="checkbox" id="check" :value="form.isIdSaved"/>
          <label for="check"><span class="checkbox__text">아이디 저장</span></label>
        </span>
      </div>
      <div class="idfind">
        <router-link to="/IdFind">아이디 찾기</router-link>
        <router-link to="/pwFind">비밀번호 찾기</router-link>
      </div>
    </div>
    <div class="button__wrap">
      <ButtonCmp
        type="btn-blue btn-login"
        @click="loginAction"
      >로그인</ButtonCmp>
    </div>
    <!-- 모달 영역 시작   -->
    <ModalView
      v-if="isModalViewed" @closeModal="isModalViewed = false"
    >
      <!-- 예외 처리 모달 -->
      <ConfirmMsg
          v-if="isErrorMsgViewed"
          @closeModal="isErrorMsgViewed = false, isModalViewed = false"
        >
        <div class="msg" slot="msg">
          {{ ErrorMsgText }}
          <!-- 5회 이상 아이디 또는 비밀번호를 잘못<br />
          입력했습니다. 비밀번호를 다시 설정해주세요. -->
        </div>
        <div class="button__wrap" slot="button">
          <ButtonCmp
             type="btn-blue-line"
             @click="isErrorMsgViewed = false, isModalViewed = false"
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
      <!-- //예외 처리 모달 -->
      <!-- 휴대폰 인증번호 모달 -->
      <ConfirmMsg
        @closeModal="isModalViewed = false, isPhoneCertViewed = false"
        modalsize="Max628"
        v-if="isPhoneCertViewed"
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
              <p class="guide-text error" v-if="form.error.target === 'certNumber' && form.error.msg !== ''">{{ form.error.msg }}</p>
            </div>
            <!-- // 기획서 v1.0 수정 (phone-cert__des 부모 클래스 추가) -->
          </div>
        </div>
        <div class="button__wrap" slot="button">
            <ButtonCmp
              type="btn-blue-line"
              @click="closeModal"
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
      <!-- // 휴대폰 인증번호 모달 -->
      <!-- 대행사 휴대폰 번호 입력 모달 -->
      <ConfirmMsg
          @closeModal="isModalViewed = false, isPhoneNumInputViewed = false"
          modalsize="Max628"
          v-if="isPhoneNumInputViewed"
        >
        <div slot="msg">
          <div class="msg">
            <div class="phone-cert__msg">
              인증번호 발송을 위해<br/>
              담당자로 등록된 휴대폰번호를 입력해주세요.
            </div> <!-- 기획서 v1.0 수정 (문구 수정) -->
            <div  class="phone-cert__number-input number-input__before"> <!-- 기획서 v1.0 수정 (number-input__before 이중클래스 추가) -->
              <span class="number-input__tit"> <!-- 기획서 v1.0 수정 (문구 수정) -->
                휴대폰 번호
              </span>
              <span class="input">
                <input ref="mblNum" type="text" placeholder="휴대폰 번호" @keyup.enter="inputMblNum()" v-model="mblNum">
                <p class="guide-text error" v-if="form.error.target === 'mblNum' && form.error.msg !== ''">{{ form.error.msg }}</p>
              </span>
            </div>
          </div>
        </div>
        <div class="button__wrap" slot="button">
            <ButtonCmp
              type="btn-blue-line"
              @click="closeModal"
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
      <!-- // 대행사 휴대폰 번호 입력 모달 -->
    </ModalView>
    <!-- 인증 번호 발송 완료 모달 -->
    <ModalView
      :class="{ topPositon : IsTopPos }"
      v-if="isSendMsgViewed" @closeModal="isSendMsgViewed = false"
    >
      <!-- // 문자 발송 -->
      <ConfirmMsg
        v-if="isSendMsgViewed"
        @closeModal="isSendMsgViewed = false"
      >
        <div class="msg" slot="msg">
          {{ sendAuthNumViewedMsg }}
        </div>
        <div class="button__wrap" slot="button">
          <ButtonCmp
             type="btn-blue"
             @click="isSendMsgViewed = false"
          >
            확인
          </ButtonCmp>
        </div>
      </ConfirmMsg>
    </ModalView>
    <!-- // 인증 번호 발송 완료 모달 -->
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/join/components/ConfirmMsg.vue'
import store from '@/store'
import { mapActions, mapGetters } from 'vuex'
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
        certNumber: '',
        isIdSaved: false,
        error: {
          target: '',
          msg: ''
        }
      },
      showPassword: false, // 비밀번호 보기 여부
      isModalViewed: false, // 전체 모달 창
      isErrorMsgViewed: false, // 예외 처리 모달
      isPhoneCertViewed: false, // 폰 인증번호 입력 모달
      isPhoneNumInputViewed: false, // 휴대폰번호 입력 모달(대행사)
      phoneNumInputViewedMsg: '', // 휴대폰 번호 입력 모달 문구
      isSendMsgViewed: false, // 인증번호 전송 완료 팝업창
      sendAuthNumViewedMsg: '', // 인증번호 모달 문구
      ErrorMsgText: '', // 로그인 에러 발생시 에러 문구
      isButtonDisabled: false,
      iconName: 'icon-eye',
      IsTopPos: true,
      interval: '',
      TimeCounter: 180,
      TimerStr: '03:00',
      count: 0,
      isMoveChage: false,
      maskNm: '',
      maskHp: '',
      mblNum: ''
    }
  },
  watch: {
    isModalViewed () {
      if (this.isModalViewed) {
        document.documentElement.style.overflow = 'hidden'
        // this.start()
        return
      }
      document.documentElement.style.overflow = 'auto'
      if (this.interval !== '') {
        this.timerStop()
      }
    }
  },
  created() {
    let savedLoginId = window.localStorage.getItem('savedLoginId')
    if (!jglib.isEmpty(savedLoginId)) {
      this.form.id = savedLoginId
      this.form.isIdSaved = true
    }
  },
  computed: {
    ...mapGetters({
      userInfo: 'getUserForAuth'
    }),
    isDisabled() {
      return this.form.certNumber.length > 0
    }
  },
  methods: {
    ...mapActions({
      loginByPassword: 'LoginByPassword',
      updateUserForAuthSms: 'updateUserForAuthSms',
      sendAuthSmsNum: 'Authsms',
      selectAgencyMbl: 'SelectAgencyMbl',
      authsmsConfirm: 'AuthsmsConfirm'
    }),
    // 로그인
    loginAction () {
      this.form.error.target = ''
      this.form.error.msg = ''
      this.isMoveChage = false
      // 아이디 비번 빈값 체크
      if (this.form.id === '') {
        this.form.error.target = 'id'
        this.form.error.msg = '아이디를 입력해주세요.'
        this.$refs.usrid.focus()
        return
      }
      if (this.form.pw === '') {
        this.form.error.target = 'pw'
        this.form.error.msg = '비밀번호를 입력해주세요.'
        this.$refs.usrpw.focus()
        return
      }
      // 로그인 요청
      this.loginByPassword({
        userId: this.form.id,
        userPassword: this.form.pw
      }).then(response => {
        // 로컬 스토리지에 아이디 저장
        if (this.form.isIdSaved) {
          window.localStorage.setItem('savedLoginId', this.form.id)
        }
        // 회원 정보 스토어에 저장(아이디, 이름, 폰번호, 회원유형)
        this.updateUserForAuthSms(response.result)
        if (response.result.userType === 'AGENCY') {
          // 대행사 유형이면 담당자 핸드폰번호 입력 모달 오픈
          this.isModalViewed = true
          this.isPhoneNumInputViewed = true
        } else {
          // 휴대폰 인증번호 입력 모달 오픈
          this.isModalViewed = true
          this.isPhoneCertViewed = true
          // 기업 회원이면 인증 번호 발송
          this.sendAuthNumber()
        }
      }).catch(reject => {
        // Login이 실패할 경우
        if (reject.code === '64472') { // 5회이상 로그인 실패
          this.isMoveChage = true
          this.isModalViewed = true
          this.isErrorMsgViewed = true
          this.ErrorMsgText = reject.desc
        } else {
          this.form.error.target = 'pw'
          this.form.error.msg = reject.desc
        }
      })
    },
    // 인증 번호 발송
    sendAuthNumber() {
      let param = { userId: this.userInfo.userId }
      if (this.userInfo.userType === 'AGENCY') {
        // param.mblNum = this.userInfo.mblNum
        param.mblNum = this.mblNum
        param.userType = this.userInfo.userType
      }
      // masking
      this.maskNm = this.userInfo.userNm.substring(0, 1) + '*' + this.userInfo.userNm.substring(2)
      this.maskHp = this.userInfo.mblNum.substring(0, 3) + '-****-' + this.userInfo.mblNum.substring(7)
      // 인증 번호 발송
      this.sendAuthSmsNum(param).then(response => {
        this.isSendMsgViewed = true // 인증 번호 발송 완료 모달 오픈
        if (response.code === '20000000') {
          this.start() // 타이머 시작
          this.sendAuthNumViewedMsg = '인증번호가 발송 되었습니다.'
        } else {
          this.sendAuthNumViewedMsg = '인증번호 받기에 실패했습니다.' + (response.message ? ' (' + response.message + ')' : '')
        }
      }).catch(e => {
        this.isSendMsgViewed = true
        this.sendAuthNumViewedMsg = e.desc
      })
    },
    // 핸드폰 번호 전송(대행사)
    inputMblNum() {
      this.form.error.target = ''
      this.form.error.msg = ''
      if (!this.mblNum) {
        this.form.error.target = 'mblNum'
        this.form.error.msg = '핸드폰 번호를 입력해 주세요.'
        this.$refs.mblNum.focus()
        return false
      }
      if (!/^(0(1(0|1|6|7|8|9)))(\d{3,4})(\d{4}$)/.test(this.mblNum)) {
        this.form.error.target = 'mblNum'
        this.form.error.msg = '올바른 휴대폰번호를 입력해주세요.'
        this.$refs.mblNum.focus()
        return false
      }
      // 핸드폰 번호 전송
      this.selectAgencyMbl({
        userId: this.userInfo.userId,
        mblNum: this.mblNum
      }).then(response => {
        // 유저 정보 세팅
        this.updateUserForAuthSms(response.result)
        this.closeModal()
        // 휴대폰 인증번호 입력 모달 오픈
        this.isModalViewed = true
        this.isPhoneCertViewed = true
        // 인증 번호 전송
        this.sendAuthNumber()
      }).catch(error => {
        if (error.code === '64433') {
          this.form.error.target = 'mblNum'
          this.form.error.msg = '등록된 휴대폰 번호가 아닙니다.'
        } else {
          this.form.error.target = 'mblNum'
          this.form.error.msg = error.desc
        }
      })
    },
    start() {
      this.isButtonDisabled = true
      // 1초에 한번씩 start 호출
      this.TimeCounter = 180
      this.interval = setInterval(() => {
        this.TimeCounter-- // 1초씩 감소
        this.TimerStr = this.prettyTime()
        if (this.TimeCounter <= 0) this.timerStop()
      }, 1000)
    },
    timerStop: function() {
      clearInterval(this.interval)
      this.TimeCounter = 0
      this.isButtonDisabled = false
      this.TimerStr = '00:00'
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
    chkAuthNum() {
      this.form.error.target = ''
      this.form.error.msg = ''
      if (!this.form.certNumber) {
        this.form.error.target = 'certNumber'
        this.form.error.msg = '인증번호를 입력해 주세요.'
        return false
      }
      let param = { userId: this.userInfo.userId, authStr: this.form.certNumber }
      if (this.userInfo.userType === 'SUBAGENCY') {
        param.mblNum = this.userInfo.mblNum
        param.userType = this.userInfo.userType
      }
      this.authsmsConfirm(param).then(response => {
        this.timerStop()
        if (response.code === '20000000') {
          if (response.result.exceed90days) {
            // 로그인한지 90일 초과
            this.$router.replace({ name: 'PwChange' })
          } else {
            // 로그인 이후 페이지는 대시보드로 고정
            this.closeModal()
            this.$router.push({ name: 'corpDashboardUrl', params: { corpId: response.result.corpId } })
          }
        }
      }).catch(error => {
        this.form.error.target = 'certNumber'
        this.form.error.msg = typeof error.desc === 'string' ? error.desc : error.desc.desc
      })
    },
    toggleShow () {
      if (this.showPassword) {
        this.iconName = 'icon-eye'
      } else {
        this.iconName = 'icon-eye blue'
      }
      this.showPassword = !this.showPassword
    },
    closeModal () {
      this.isModalViewed = false
      this.isErrorMsgViewed = false
      this.isPhoneCertViewed = false
      this.isPhoneNumInputViewed = false
      this.isSendMsgViewed = false
    },
    moveChage() {
      this.$router.push({ 'name': 'pwFind' })
    }
  }
}
</script>
