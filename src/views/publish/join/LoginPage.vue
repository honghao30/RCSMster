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
            <span class="input"><input type="text" class="input" placeholder="아이디를 입력해주세요." v-model="form.id"></span>
          </div>
          <p class="form-item__error" v-if="idErrorMsg">아이디를 입력해주세요.</p>
        </div>
        <div class="form-item">
          <span class="form-item__label">비밀번호</span>
          <div class="form-item__content">
            <ButtonCmp
              type="btn-only-icon"
              iconname="icon-eye"
              @click="toggleShow"
            ><span class="irtext">비밀번호 보이기</span></ButtonCmp>
            <span class="input"><input  v-if="showPassword" type="text" class="input" placeholder="비밀번호를 입력해주세요."  v-model="form.pw">
              <input v-else type="password" class="input" placeholder="비밀번호를 입력해주세요."  v-model="form.pw">
            </span>
          </div>
          <p class="form-item__error" v-if="pwErrorMsg">비밀번호를 입력해주세요.</p>
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
        <router-link to="/pwFind">비밀번호 찾기</router-link>
      </div>
    </div>
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
        id: '',
        pw: ''
      },
      idErrorMsg: false,
      pwErrorMsg: false,
      showPassword: false
    }
  },
  methods: {
    onSubmit () {
      if (this.form.id === '') {
        this.idErrorMsg = true
        return
      }

      if (this.form.pw === '') {
        this.pwErrorMsg = true
        return
      }
      alert('로그인 되었습니다.')
    },
    toggleShow () {
      this.showPassword = !this.showPassword
    }
  }
}
</script>
