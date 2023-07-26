<template>
  <div class="login login-pwchange">
    <div class="login-title__wrap--top">
      <PageTitle pagetitle="비밀번호 변경" />
      <p>현재 90일동안 동일한 비밀번호를 사용하고 있습니다<br> 비밀번호를 변경해 주세요</p>
    </div>
    <form  ref="form" :model="form">
      <div class="form-list">
        <div class="form-item">
          <span class="form-item__label">현재 비밀번호</span>
          <div class="form-item__content">
            <ButtonCmp
              type="btn-only-icon"
              :iconname=iconCurrnetName
              @click="toggleShowCurrent"
            ><span class="irtext">비밀번호 보이기</span></ButtonCmp>
            <span class="input"><input ref="usrpwcurrentid" v-if="showPasswordCurrent" type="text" class="input" placeholder="현재 비밀번호를 입력해주세요."  v-model="userPwd">
              <input ref="usrpwcurrent" v-else type="password" class="input" placeholder="현재 비밀번호를 입력해주세요."  v-model="userPwd">
            </span>
          </div>
          <p class="guide-text error" v-if="pwCurrentErrorMsg">{{pwCurrentErrorMsgTxt}}</p>
        </div>
        <div class="form-item">
          <span class="form-item__label">새 비밀번호</span>
          <div class="form-item__content">
            <ButtonCmp
              type="btn-only-icon"
              :iconname=iconName
              @click="toggleShow"
            ><span class="irtext">비밀번호 보이기</span></ButtonCmp>
            <span class="input">
              <input ref="usrpwid" v-if="showPassword" type="text" class="input" placeholder="변경할 비밀번호를 입력해주세요."  v-model="userNewPwd">
              <input ref="usrpw" v-else type="password" class="input" placeholder="변경할 비밀번호를 입력해주세요."  v-model="userNewPwd">
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
        <ButtonCmp
          type="btn-blue-line"
          @click="updateExpiredDt"
        >나중에 변경</ButtonCmp>
        <ButtonCmp
          type="btn-blue"
          @click="updatePassword"
        >비밀번호 변경</ButtonCmp>
      </div>
    </form>
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import { updatePassword, updatePasswordExpiredDt } from '@/api/utility/password'
import store from '@/store'

export default {
  components: {
    PageTitle,
    ButtonCmp
  },
  data() {
    return {
      userPwd: '',
      userNewPwd: '',
      userNewPwdConfirm: '',
      pwCurrentErrorMsg: false,
      pwErrorMsg: false,
      pwcheckErrorMsg: false,
      pwCurrentErrorMsgTxt: '',
      pwErrorMsgTxt: '',
      pwcheckErrorMsgTxt: '',
      showPassword: false,
      showPasswordCheck: false,
      showPasswordCurrent: false,
      iconCurrnetName: 'icon-eye',
      iconName: 'icon-eye',
      iconChangeName: 'icon-eye'

    }
  },
  methods: {
    updatePassword() {
      // 유효성 검증
      if (!this.validationPassword()) {
        return false
      }
      let data = {
        userPwd: this.userPwd,
        userNewPwd: this.userNewPwd
      }
      updatePassword(data).then(res => {
        if (res.code === '20000000') {
          // 비밀번호가 변경되면 로그아웃 후 로그인 화면으로 이동한다.
          // TODO: 메시지 설계서에 없어서 임시로 노출
          this.$alertMsg(
            '비밀번호가 변경 완료 되었습니다.변경하신 비밀번호로 다시 로그인 해 주세요.',
            '알림'
          ).then(res => {
            store.dispatch('Logout').then(res => {
              this.$router.push('/login')
            })
          })
        }
      }).catch(res => {
        if (res.code === '64439') { // 현제 비번이 맞지 않음
          this.pwCurrentErrorMsg = true
          this.pwCurrentErrorMsgTxt = res.desc
          this.showPasswordCurrent ? this.$refs.usrpwcurrentid.focus() : this.$refs.usrpwcurrent.focus()
        } else {
          this.pwcheckErrorMsg = true
          this.pwcheckErrorMsgTxt = res.desc
          this.showPasswordCheck ? this.$refs.usrpwcheckid.focus() : this.$refs.usrpwcheck.focus()
        }
      })
    },
    validationPassword() {
      if (jglib.isEmpty(this.userPwd)) {
        this.pwCurrentErrorMsg = true
        this.pwCurrentErrorMsgTxt = '현재 비밀번호를 입력해주세요.'
        this.showPasswordCurrent ? this.$refs.usrpwcurrentid.focus() : this.$refs.usrpwcurrent.focus()
        return false
      } else {
        this.pwCurrentErrorMsg = false
        this.pwCurrentErrorMsgTxt = ''
      }

      if (jglib.isEmpty(this.userNewPwd)) {
        this.pwErrorMsg = true
        this.pwErrorMsgTxt = '새 비밀번호를 입력해주세요'
        this.showPassword ? this.$refs.usrpwid.focus() : this.$refs.usrpw.focus()
        return false
      } else {
        this.pwErrorMsg = false
        this.pwErrorMsgTxt = ''
      }

      if (jglib.isEmpty(this.userNewPwdConfirm)) {
        this.pwcheckErrorMsg = true
        this.pwcheckErrorMsgTxt = '새 비밀번호 확인을 입력해주세요.'
        this.showPasswordCheck ? this.$refs.usrpwcheckid.focus() : this.$refs.usrpwcheck.focus()
        return false
      } else {
        this.pwcheckErrorMsg = false
        this.pwcheckErrorMsgTxt = ''
      }

      if (!jglib.isPw(this.userNewPwd)) {
        this.pwErrorMsg = true
        this.pwErrorMsgTxt = '비밀번호는 영문, 숫자, 특수문자 중 2가지 이상을 조합하여 10자리 이상 또는 3가지 이상을 조합하여 8자리 이상으로 설정해 주세요.'
        this.showPassword ? this.$refs.usrpwid.focus() : this.$refs.usrpw.focus()
        return false
      } else {
        this.pwErrorMsg = false
        this.pwErrorMsgTxt = ''
      }

      if (this.userNewPwd !== this.userNewPwdConfirm) {
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
    updateExpiredDt() { // 다음에 변경
      updatePasswordExpiredDt().then(res => {
        this.$router.push('/service/dashboard')
      }).catch(err => {
        this.$alertMsg(err.desc)
      })
      this.$router.push('/service/dashboard')
    },
    toggleShowCurrent () {
      if (this.showPasswordCurrent) {
        this.iconCurrnetName = 'icon-eye'
      } else {
        this.iconCurrnetName = 'icon-eye blue'
      }
      this.showPasswordCurrent = !this.showPasswordCurrent
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
