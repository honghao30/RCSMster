<template>
  <div class="rcs_container">
    <article id="content" class="content">
      <div class="top_title_area">
        <h2 class="h2_title">비밀번호 변경</h2>
        <span class="h2_desc">새로운 비밀번호로 변경해주세요.</span>
      </div>
      <table class="tbl_row_type">
        <caption>
          <strong>비밀번호 변경</strong>
          <p>현재 비밀번호, 새 비밀번호, 새 비밀번호 확인</p>
        </caption>
        <colgroup>
          <col style="width:190px">
          <col style="width:auto">
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">
              현재 비밀번호
              <span class="require">*</span>
            </th>
            <td>
              <span class="custom_input">
                <input
                  type="password"
                  placeholder="현재 비밀번호를 입력해주세요."
                  style="width:300px"
                  ref="userPwd"
                  v-model="userPwd"
                  @keypress.enter="updatePassword"
                >
              </span>
            </td>
          </tr>
          <tr>
            <th scope="row">
              새 비밀번호
              <span class="require">*</span>
            </th>
            <td>
              <span class="custom_input">
                <input
                  type="password"
                  placeholder="변경할 비밀번호를 입력해주세요."
                  style="width:300px"
                  ref="userNewPwd"
                  v-model="userNewPwd"
                  @keypress.enter="updatePassword"
                  @keydown="notAllowWhitespace">
              </span>
              <span class="text_desc">
                영문, 숫자, 특수문자 중 2가지 이상 조합하여 10자리 이상, 3가지
                이상 조합하여 8자리 이상
              </span>
            </td>
          </tr>
          <tr>
            <th scope="row">
              새 비밀번호 확인
              <span class="require">*</span>
            </th>
            <td>
              <span class="custom_input">
                <input
                  type="password"
                  placeholder="비밀번호를 한번 더 입력해주세요."
                  style="width:300px"
                  ref="userNewPwdConfirm"
                  v-model="userNewPwdConfirm"
                  @keypress.enter="updatePassword"
                  @keydown="notAllowWhitespace">
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="btn_wrap center mar_t60">
        <button class="btn mid bd_black" @click="goMyInfo">
          <span>취소</span>
        </button>
        <button class="btn mid black" @click="updatePassword">
          <span>저장</span>
        </button>
      </div>
    </article>
  </div>
</template>

<script>
import { updatePassword } from '@/api/utility/password'
import store from '@/store'
export default {
  name: 'ChangePassword',
  data() {
    return {
      userPwd: '',
      userNewPwd: '',
      userNewPwdConfirm: ''
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
        .catch(error => {
          this.$alertMsg(error.desc, '알림', '확인').then(res => {
            this.$refs.userPwd.focus()
          })
        })
    },
    validationPassword() {
      if (jglib.isEmpty(this.userPwd)) {
        this.$alertMsg('현재 비밀번호를 입력해주세요.', '알림', '확인').then(
          res => {
            this.$refs.userPwd.focus()
          }
        )
        return false
      }

      if (jglib.isEmpty(this.userNewPwd)) {
        this.$alertMsg('새 비밀번호를 입력해주세요.', '알림', '확인').then(
          res => {
            this.$refs.userNewPwd.focus()
          }
        )
        return false
      }

      if (jglib.isEmpty(this.userNewPwdConfirm)) {
        this.$alertMsg('새 비밀번호 확인을 입력해주세요.', '알림', '확인').then(
          res => {
            this.$refs.userNewPwdConfirm.focus()
          }
        )
        return false
      }

      if (!jglib.isPw(this.userNewPwd)) {
        let msg =
          '비밀번호는 영문, 숫자, 특수문자 중 2가지 이상을 조합하여 10자리 이상 또는 3가지 이상을 조합하여 8자리 이상으로 설정해 주세요.'
        this.$alertMsg(msg, '알림', '확인').then(res => {
          this.$refs.userNewPwd.focus()
        })
        return false
      }

      if (this.userNewPwd !== this.userNewPwdConfirm) {
        this.$alertMsg(
          '입력한 비밀번호화 일치하지 않습니다.',
          '알림',
          '확인'
        ).then(res => {
          this.$refs.userNewPwdConfirm.focus()
        })
        return false
      }
      return true
    },
    notAllowWhitespace(e) {
      return jglib.notAllowWhitespace(e)
    },
    goMyInfo() {
      this.$router.push('/utility/my-info')
    }
  }
}
</script>
