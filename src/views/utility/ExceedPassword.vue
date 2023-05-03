<template>
  <div class="rcs_container">
    <article id="content" class="content">
      <div class="box_form_area">
        <div class="top_title_area">
          <h2 class="h2_title">비밀번호 변경 안내</h2>
          <span class="h2_desc">안전한 사용을 위해 새 비밀번호를 설정해 주세요.</span>
        </div>
        <span class="h3_desc">
          현재 회원님께서는
          <em class="text_green">90일동안 동일한 비밀번호를 사용</em>하고 있습니다.
          <br>비밀번호를 변경해 주세요.
        </span>
        <table class="tbl_row_type">
          <caption>
            <strong>90일경과 비밀번호 변경</strong>
            <p>현재 비밀번호, 새 비밀번호, 새 비밀번호 확인</p>
          </caption>
          <colgroup>
            <col style="width:174px">
            <col style="width:auto">
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">현재 비밀번호</th>
              <td>
                <span class="custom_input full_width">
                  <input
                    type="password"
                    placeholder="현재 비밀번호를 입력해주세요."
                    ref="userPwd"
                    v-model="userPwd"
                    @keypress.enter="updatePassword"
                  >
                </span>
              </td>
            </tr>
            <tr>
              <th scope="row">새 비밀번호</th>
              <td>
                <span class="custom_input full_width">
                  <input
                    type="password"
                    placeholder="변경할 비밀번호를 입력해주세요."
                    ref="userNewPwd"
                    v-model="userNewPwd"
                    @keypress.enter="updatePassword"
                  >
                </span>
              </td>
            </tr>
            <tr>
              <th scope="row">새 비밀번호 확인</th>
              <td>
                <span class="custom_input full_width">
                  <input
                    type="password"
                    placeholder="비밀번호를 한번 더 입력해주세요."
                    ref="userNewPwdConfirm"
                    v-model="userNewPwdConfirm"
                    @keypress.enter="updatePassword"
                  >
                </span>
              </td>
            </tr>
          </tbody>
        </table>
        <p class="text_error">{{ errorMessage }}</p>
        <div class="btn_wrap center mar_t40">
          <a href="javascript:void(0);" class="btn big bd_blue" @click="updateExpiredDt">
            <span>다음에 변경</span>
          </a>
          <a href="javascript:void(0);" class="btn big blue" @click="updatePassword">
            <span>확인</span>
          </a>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { updatePassword, updatePasswordExpiredDt } from '@/api/utility/password'
import store from '@/store'

export default {
  name: 'ExceedPassword',
  data() {
    return {
      userPwd: '',
      userNewPwd: '',
      userNewPwdConfirm: '',
      errorMessage: ''
    }
  },
  created() {},
  mounted() {},
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

      updatePassword(data)
        .then(res => {
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
        })
        .catch(res => {
          this.errorMessage = res.desc
          this.$refs.userPwd.focus()
        })
    },
    validationPassword() {
      if (jglib.isEmpty(this.userPwd)) {
        this.errorMessage = '현재 비밀번호를 입력해주세요.'
        this.$refs.userPwd.focus()
        return false
      }

      if (jglib.isEmpty(this.userNewPwd)) {
        this.errorMessage = '새 비밀번호를 입력해주세요'
        this.$refs.userNewPwd.focus()
        return false
      }

      if (jglib.isEmpty(this.userNewPwdConfirm)) {
        this.errorMessage = '새 비밀번호 확인을 입력해주세요.'
        this.$refs.userNewPwdConfirm.focus()
        return false
      }

      if (!jglib.isPw(this.userNewPwd)) {
        this.errorMessage =
          '비밀번호는 영문, 숫자, 특수문자 중 2가지 이상을 조합하여 10자리 이상 또는 3가지 이상을 조합하여 8자리 이상으로 설정해 주세요.'
        return false
      }

      if (this.userNewPwd !== this.userNewPwdConfirm) {
        this.errorMessage = '입력한 비밀번호화 일치하지 않습니다.'
        this.$refs.userNewPwdConfirm.focus()
        return false
      }
      return true
    },
    updateExpiredDt() {
      updatePasswordExpiredDt()
        .then(res => {
          this.$router.push('/service/dashboard')
        })
        .catch(err => {
          this.$alertMsg(err.desc)
        })
      this.$router.push('/service/dashboard')
    }
  }
}
</script>
