<template>
  <div class="login login-pwreset">
    <div class="login-title__wrap--top">
      <PageTitle pagetitle="비밀번호 변경" />
      <p>안전한 사용을 위해 새 비밀번호를 <span class="m-block">입력해주세요</span></p>
    </div>
    <form  ref="form" :model="form">
      <div class="form-list">
        <div class="form-item">
          <span class="form-item__label">새 비밀번호</span>
          <div class="form-item__content">
            <ButtonCmp
              type="btn-only-icon"
              :iconname=iconName
              @click="toggleShow"
            ><span class="irtext">비밀번호 보이기</span></ButtonCmp>
            <span class="input">
              <input ref="usrpwid" v-if="showPassword" type="text" class="input" placeholder="변경할 비밀번호를 입력해주세요."  v-model="userPwd">
              <input ref="usrpw" v-else type="password" class="input" placeholder="변경할 비밀번호를 입력해주세요."  v-model="userPwd">
            </span>
          </div>
          <p class="guide-text error" v-if="pwErrorMsg">{{pwErrorMsgTxt}}</p>
          <p class="guide-text validation">영문, 숫자, 특수문자 중 2개 이상 사용 (2개 조합 시 10자리 이상 / 3개 조합 시 8자리 이상)</p>
          <p class="guide-text error">연속적인 숫자 또는 문자 사용 불가 (예 : 1234, abcd)</p>
          <p class="guide-text validation">아이디, 핸드폰 번호와 동일한 숫자 또는 문자 사용 불가</p>
          <p class="guide-text error">최근 사용한 비밀번호 3개 사용 불가</p>
        </div>
        <div class="form-item">
          <span class="form-item__label">새 비밀번호 확인</span>
          <div class="form-item__content">
            <ButtonCmp
              type="btn-only-icon"
              :iconname=iconChangeName
              @click="toggleShowCheck"
            ><span class="irtext">비밀번호 보이기</span></ButtonCmp>
            <span class="input"><input ref="usrpwcheckid" v-if="showPasswordCheck" type="text" class="input" placeholder="한번 더 입력해주세요."  v-model="userNewPwdConfirm">
              <input ref="usrpwcheck" v-else type="password" class="input" placeholder="한번 더 입력해주세요."  v-model="userNewPwdConfirm">
            </span>
          </div>
          <p class="guide-text error" v-if="pwcheckErrorMsg">{{pwcheckErrorMsgTxt}}</p>
        </div>
      </div>
      <div class="button__wrap">
        <!-- 기획서 v1.0 수정 (type 수정) -->
        <ButtonCmp
          type="btn-line"
          @click='$router.push({ name: "login" })'
        >취소</ButtonCmp>
        <ButtonCmp
          type="btn-blue"
          @click="updateNewPassword"
        >비밀번호 변경</ButtonCmp>
      </div>
    </form>
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import { updateNewPassword } from '@/api/join/resetPassword'
import router from '@/router'

export default {
  components: {
    PageTitle,
    ButtonCmp
  },
  data() {
    return {
      userPwd: '',
      userNewPwdConfirm: '',
      pwErrorMsg: false,
      pwcheckErrorMsg: false,
      pwErrorMsgTxt: '',
      pwcheckErrorMsgTxt: '',
      showPassword: false,
      showPasswordCheck: false,
      iconName: 'icon-eye',
      iconChangeName: 'icon-eye'
    }
  },
  mounted() {
    if (!this.$route.params.userId) {
      this.$router.push('/pwFind')
    }
  },
  methods: {
    router() {
      return router
    },
    updateNewPassword() {
      // 유효성 검증
      if (!this.validationPassword()) {
        return false
      }

      let reqObj = {
        userId: this.$route.params.userId,
        userNm: this.$route.params.userNm,
        mblNum: this.$route.params.mblNum,
        userPwd: this.userPwd,
        seq: this.$route.params.seq
      }

      updateNewPassword(reqObj)
        .then(res => {
          if (res.code === '20000000') {
            this.$alertMsg('비밀번호가 변경되었습니다.').then(() => {
              this.$router.push('./login')
            })
          }
        })
        .catch(res => {
          this.$alertMsg(res.desc)
        })
    },
    validationPassword() {
      if (jglib.isEmpty(this.userPwd)) {
        this.pwErrorMsg = true
        this.pwErrorMsgTxt = '변경할 비밀번호를 입력해주세요.'
        this.showPassword ? this.$refs.usrpwid.focus() : this.$refs.usrpw.focus()
        return false
      } else {
        this.pwErrorMsg = false
        this.pwErrorMsgTxt = ''
      }

      if (jglib.isEmpty(this.userNewPwdConfirm)) {
        this.pwcheckErrorMsg = true
        this.pwcheckErrorMsgTxt = '비밀번호를 한번 더 입력해주세요.'
        this.showPasswordCheck ? this.$refs.usrpwcheckid.focus() : this.$refs.usrpwcheck.focus()
        return false
      } else {
        this.pwcheckErrorMsg = false
        this.pwcheckErrorMsgTxt = ''
      }

      let routerParams = {
        userId: this.$route.params.userId,
        mblNum: this.$route.params.mblNum
      }
      let pwCheck = jglib.isVaildationPw(
        this.userPwd,
        routerParams.userId,
        routerParams.mblNum
      )
      if (pwCheck.code !== 'success') {
        this.pwErrorMsg = true
        this.pwErrorMsgTxt = pwCheck.message
        this.showPassword ? this.$refs.usrpwid.focus() : this.$refs.usrpw.focus()
        return false
      } else {
        this.pwErrorMsg = false
        this.pwErrorMsgTxt = ''
      }

      if (!jglib.isPw(this.userPwd) === !jglib.isEmpty(this.userPwd)) {
        this.pwErrorMsg = true
        this.pwErrorMsgTxt = '비밀번호는 영문, 숫자, 특수문자 중 2가지 이상을 조합하여 10자리 이상 또는 3가지 이상을 조합하여 8자리 이상으로 설정해 주세요.'
        this.showPassword ? this.$refs.usrpwid.focus() : this.$refs.usrpw.focus()
        return false
      } else {
        this.pwErrorMsg = false
        this.pwErrorMsgTxt = ''
      }

      if (this.userPwd !== this.userNewPwdConfirm) {
        this.pwcheckErrorMsg = true
        this.pwcheckErrorMsgTxt = '입력한 비밀번호와 일치하지 않습니다.'
        this.showPasswordCheck ? this.$refs.usrpwcheckid.focus() : this.$refs.usrpwcheck.focus()
        return false
      } else {
        this.pwcheckErrorMsg = false
        this.pwcheckErrorMsgTxt = ''
      }
      return true
    },
    toggleShow () {
      if (this.showPassword) {
        this.iconName = 'icon-eye'
      } else {
        this.iconName = 'icon-eye blue'
      }
      this.showPassword = !this.showPassword
    },
    toggleShowCheck () {
      if (this.showPasswordCheck) {
        this.iconChangeName = 'icon-eye'
      } else {
        this.iconChangeName = 'icon-eye blue'
      }
      this.showPasswordCheck = !this.showPasswordCheck
    }
  }
}
</script>
