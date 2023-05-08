<template>
  <div class="login login-pwchange">
    <div class="login-title__wrap--top">
      <PageTitle pagetitle="비밀번호 변경" />
      <p>안전한 사용을 위해 새 비밀번호를 입력해주세요</p>
    </div>
    <form  ref="form" :model="form">
      <div class="form-list">
        <div class="form-item">
          <span class="form-item__label">새 비밀번호</span>
          <div class="form-item__content">
            <ButtonCmp
              type="btn-only-icon"
              iconname="icon-eye"
              @click="toggleShow"
            ><span class="irtext">비밀번호 보이기</span></ButtonCmp>
            <span class="input"><input ref="usrid" v-if="showPassword" type="text" class="input" placeholder="변경할 비밀번호를 입력해주세요."  v-model="form.pw">
              <input ref="usrpw" v-else type="password" class="input" placeholder="변경할 비밀번호를 입력해주세요."  v-model="form.pw">
            </span>
          </div>
          <p class="form-item__error" v-if="pwErrorMsg">비밀번호를 입력해주세요.</p>
        </div>
        <div class="form-item">
          <span class="form-item__label">새 비밀번호 확인</span>
          <div class="form-item__content">
            <ButtonCmp
              type="btn-only-icon"
              iconname="icon-eye"
              @click="toggleShowCheck"
            ><span class="irtext">비밀번호 보이기</span></ButtonCmp>
            <span class="input"><input ref="usrid" v-if="showPasswordCheck" type="text" class="input" placeholder="한번 더 입력해주세요."  v-model="form.pwcheck">
              <input ref="usrpwcheck" v-else type="password" class="input" placeholder="한번 더 입력해주세요."  v-model="form.pwcheck">
            </span>
          </div>
          <p class="form-item__error" v-if="pwcheckErrorMsg">새 비밀번호를 한번 더 입력해주세요.</p>
        </div>
      </div>
      <div class="button__wrap">
        <ButtonCmp
          type="btn-blue-line"
        >취소</ButtonCmp>
        <ButtonCmp
          type="btn-blue"
          @click="onSubmit"
        >비밀번호 변경</ButtonCmp>
      </div>
    </form>
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
export default {
  components: {
    PageTitle,
    ButtonCmp
  },
  data() {
    return {
      form: {
        pw: '',
        pwcheck: ''
      },
      pwErrorMsg: false,
      pwcheckErrorMsg: false,
      showPassword: false,
      showPasswordCheck: false
    }
  },
  methods: {
    onSubmit () {
      if (this.form.pw === '') {
        this.pwErrorMsg = true
        this.$refs.usrpw.focus()
        return
      }

      if (this.form.pwcheck === '') {
        this.pwcheckErrorMsg = true
        this.$refs.usrpwcheck.focus()
        return
      }
      alert('비밀번호 변경되었습니다.')
    },
    toggleShow () {
      this.showPassword = !this.showPassword
    },
    toggleShowCheck () {
      this.showPasswordCheck = !this.showPasswordCheck
    }
  }
}
</script>
