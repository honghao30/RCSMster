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
            <span class="input"><input ref="usrid" v-if="showPasswordCurrent" type="text" class="input" placeholder="현재 비밀번호를 입력해주세요."  v-model="form.pwcurrent">
              <input ref="usrpwcurrent" v-else type="password" class="input" placeholder="현재 비밀번호를 입력해주세요."  v-model="form.pwcurrent">
            </span>
          </div>
          <p class="guide-text error" v-if="pwCurrentErrorMsg">현재 비밀번호를 다시 입력해주세요.</p>
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
              <input ref="usrid" v-if="showPassword" type="text" class="input" placeholder="변경할 비밀번호를 입력해주세요."  v-model="form.pw">
              <input ref="usrpw" v-else type="password" class="input" placeholder="변경할 비밀번호를 입력해주세요."  v-model="form.pw">
            </span>
          </div>
          <p class="guide-text error" v-if="pwErrorMsg">새 비밀번호을 입력해주세요.</p>
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
            <span class="input"><input ref="usrid" v-if="showPasswordCheck" type="text" class="input" placeholder="한번 더 입력해주세요."  v-model="form.pwcheck">
              <input ref="usrpwcheck" v-else type="password" class="input" placeholder="한번 더 입력해주세요."  v-model="form.pwcheck">
            </span>
          </div>
          <p class="guide-text error" v-if="pwcheckErrorMsg">새 비밀번호를 한번 더 입력해주세요.</p>
        </div>
      </div>
      <div class="button__wrap">
        <!-- 기획서 v1.0 수정 (나중에 변경 버튼 > 메인 화면으로 이동 으로 인한 태그 수정) -->
        <router-link to="#" class="btn btn-line">나중에 변경</router-link>
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
        pwcheck: '',
        pwcurrent: ''
      },
      pwCurrentErrorMsg: false,
      pwErrorMsg: false,
      pwcheckErrorMsg: false,
      showPassword: false,
      showPasswordCheck: false,
      showPasswordCurrent: false,
      iconCurrnetName: 'icon-eye',
      iconName: 'icon-eye',
      iconChangeName: 'icon-eye'

    }
  },
  methods: {
    onSubmit () {
      if (this.form.pwcurrent === '') {
        this.pwCurrentErrorMsg = true
        this.$refs.usrpwcurrent.focus()
        return
      }

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
      this.$router.push('./LoginPage')
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
