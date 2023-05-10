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
        <router-link to="/pwFind">비밀번호 재설정</router-link>
      </div>
    </div>
    <!-- 메시지 모달 -->
    <ModalView
      v-if="isModalViewed" @closeModal="isModalViewed = false"
    >
      <ConfirmMsg
        @closeModal="isModalViewed = false"
      >
        <div class="msg" slot="msg">
          5회 이상 아이디 또는 비밀번호를 잘못<br />
          입력했습니다. 비밀번호를 다시 설정해주세요.
        </div>
        <div class="button__wrap" slot="button">
          <ButtonCmp
             type="btn-blue-line"
             @click="closeMsge"
          >
            닫기
          </ButtonCmp>
          <ButtonCmp
             type="btn-blue"
             @click="moveChage"
          >
            비밀번호 변경
          </ButtonCmp>
        </div>
      </ConfirmMsg>
    </ModalView>
    <!-- //메시지 모달 -->
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/publish/join/ConfirmMsg.vue'
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
        pw: ''
      },
      idErrorMsg: false,
      pwErrorMsg: false,
      showPassword: false,
      isModalViewed: false,
      iconName: 'icon-eye'
    }
  },
  watch: {
    isModalViewed () {
      if (this.isModalViewed) {
        document.documentElement.style.overflow = 'hidden'
        return
      }
      document.documentElement.style.overflow = 'auto'
    }
  },
  methods: {
    onSubmit () {
      if (this.form.id === '') {
        this.idErrorMsg = true
        this.$refs.usrid.focus()
        this.isModalViewed = true
        return
      }
      if (this.form.pw === '') {
        this.pwErrorMsg = true
        this.$refs.usrpw.focus()
        return
      }
      alert('로그인 되었습니다.')
    },
    toggleShow () {
      if (this.showPassword) {
        this.iconName = 'icon-eye'
      } else {
        this.iconName = 'icon-eye blue'
      }
      this.showPassword = !this.showPassword
    },
    moveChage () {
      this.$router.push('./pwFind')
      document.documentElement.style.overflow = 'auto'
    },
    closeMsge () {
      this.isModalViewed = false
    }
  }
}
</script>
