<template>
  <div class="rcs_container">
    <article id="content" class="content">
      <div class="box_form_area">
        <div class="top_title_area">
          <h2 class="h2_title">비밀번호 변경</h2>
          <span class="h2_desc">안전한 사용을 위해 새 비밀번호를 설정해 주세요.</span>
        </div>
        <table class="tbl_row_type">
          <caption>
            <strong>비밀번호 변경</strong>
            <p>새 비밀번호, 새 비밀번호 확인</p>
          </caption>
          <colgroup>
            <col style="width:175px">
            <col style="width:auto">
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">새 비밀번호</th>
              <td>
                <span class="custom_input full_width">
                  <input
                    type="password"
                    ref="userPwd"
                    placeholder="변경할 비밀번호를 입력해주세요."
                    v-model="userPwd"
                    @keypress.enter="updateNewPassword"
                    @keydown="notAllowWhitespace">
                </span>
              </td>
            </tr>
            <tr>
              <th scope="row">새 비밀번호 확인</th>
              <td>
                <span class="custom_input full_width">
                  <input
                    type="password"
                    ref="userNewPwdConfirm"
                    placeholder="비밀번호를 한번 더 입력해주세요."
                    v-model="userNewPwdConfirm"
                    @keypress.enter="updateNewPassword"
                    @keydown="notAllowWhitespace">
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <p class="text_error">{{ errorMsg }}</p>
        <div class="btn_wrap center mar_t40">
          <a href="javascript:void(0);" class="btn big blue" @click="updateNewPassword">
            <span>확인</span>
          </a>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { updateNewPassword } from '@/api/join/resetPassword'

export default {
  name: 'PasswordReset',
  data() {
    return {
      userPwd: '',
      userNewPwdConfirm: '',
      errorMsg: ''
    }
  },
  created() {},
  mounted() {
    if (!this.$route.params.userId) {
      this.$router.push('/join/password')
    }
  },
  methods: {
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
              this.$router.push('/login')
            })
          }
        })
        .catch(res => {
          this.$alertMsg(res.desc)
        })
    },
    validationPassword() {
      if (jglib.isEmpty(this.userPwd)) {
        this.errorMsg = '변경할 비밀번호를 입력해주세요.'
        this.$refs.userPwd.focus()
        return false
      } else {
        this.errorMsg = ''
      }

      if (jglib.isEmpty(this.userNewPwdConfirm)) {
        this.errorMsg = '비밀번호를 한번 더 입력해주세요.'
        this.$refs.userNewPwdConfirm.focus()
        return false
      } else {
        this.errorMsg = ''
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
        this.errorMsg = pwCheck.message
        this.$refs.userPwd.focus()
        return false
      } else {
        this.errorMsg = ''
      }

      if (!jglib.isPw(this.userPwd) === !jglib.isEmpty(this.userPwd)) {
        this.errorMsg =
          '비밀번호는 영문, 숫자, 특수문자 중 2가지 이상을 조합하여 10자리 이상 또는 3가지 이상을 조합하여 8자리 이상으로 설정해 주세요.'
        this.$refs.userPwd.focus()
        return false
      } else {
        this.errorMsg = ''
      }

      if (this.userPwd !== this.userNewPwdConfirm) {
        this.errorMsg = '입력한 비밀번호와 일치하지 않습니다.'
        this.$refs.userNewPwdConfirm.focus()
        return false
      } else {
        this.errorMsg = ''
      }

      if (this.userPwd === this.userNewPwdConfirm) {
        return true
      } else {
        this.errorMsg = ''
      }
    },
    notAllowWhitespace(e) {
      return jglib.notAllowWhitespace(e)
    }
  }
}
</script>
