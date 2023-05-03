<template>
  <div class="rcs_container">
    <article id="content" class="content">
      <div class="box_form_area">
        <div class="login_wrap">
          <div class="box_login">
            <div class="top_title_area">
              <h2 class="h2_title">RCS Biz Center</h2>
            </div>
            <ul class="input_area">
              <li>
                <span class="custom_input big">
                  <input
                    type="text"
                    ref="userId"
                    placeholder="아이디"
                    v-model.trim="userId"
                    @keydown="resetErrorMessage"
                    @keypress.enter="signIn"
                  >
                </span>
              </li>
              <li>
                <span class="custom_input big">
                  <input
                    type="password"
                    ref="userPassword"
                    placeholder="비밀번호"
                    v-model="userPassword"
                    @keydown="resetErrorMessage"
                    @keypress.enter="signIn"
                  >
                </span>
              </li>
            </ul>
            <!-- 에러메시지 출력 -->
            <div class="message_area">
              <p class="text_error" v-show="errorMsg">{{ errorMsg }}</p>
            </div>
            <!-- -->
            <div class="btn_wrap">
              <a href="javascript:void(0);" class="btn big blue" @click="signIn">
                <span>로그인</span>
              </a>
            </div>
            <div class="link_wrap">
              <a href="javascript:void(0);" @click="goFindId">
                <span>아이디 찾기</span>
              </a>
              <a href="javascript:void(0);" @click="goResetPassword">
                <span>비밀번호 재설정</span>
              </a>
            </div>
          </div>
          <div class="box_join">
            <a href="javascript:void(0);" class="icon icon_company" @click="goJoinCorp">
              <span>기업담당자신청</span>
            </a>
            <a href="javascript:void(0);" class="icon icon_agency" @click="goJoinAgency">
              <span>대행사신청</span>
            </a>
            <a href="javascript:void(0);" class="icon icon_result" @click="goJoinResult">
              <span>신청결과조회</span>
            </a>
          </div>
        </div>
      </div>
    </article>
    <block-popup v-if="view.visibleBlockPopup"></block-popup>
  </div>
</template>

<script>
import { getToken } from '@/utils/token'
import store from '@/store'
import BlockPopup from '@/Layout/components/BlockPopup'

export default {
  components: {
    BlockPopup
  },
  props: {
    from: { type: String, default: '' }
  },
  data() {
    return {
      userId: '',
      userPassword: '',
      isLoading: false,
      errorMsg: '',
      view: {
        visibleBlockPopup: false
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    if (getToken()) {
      next('/')
      return
    }
    next()
  },
  mounted() {},
  watch: {
    // '$store.state.ui.route'(value) {
    //   this.refresh()
    // }
  },
  methods: {
    signIn() {
      if (this.userId === '') {
        this.errorMsg = '아이디를 입력해주세요.'
        this.$refs.userId.focus()
        return
      }

      if (this.userPassword === '') {
        this.errorMsg = '비밀번호를 입력해주세요.'
        this.$refs.userPassword.focus()
        return
      }

      // store에 정의한 Login을 사용한다.
      this.isLoading = true
      store
        .dispatch('LoginByPassword', {
          userId: this.userId,
          userPassword: this.userPassword
        })
        .then(response => {
          this.$store.dispatch('updateUserForAuthSms', response.result)
          if (response.result.userType === 'AGENCY') {
            this.$router.push({
              name: 'authNumAgency',
              params: { afterRouter: this.$route.params.afterRouter, from: this.from }
            })
            /* this.errorMsg = ''
            if (response.result.exceed90days) {
              this.$router.push('/utility/exceed/password')
            } else {
              if (this.$route.params && this.$route.params.afterRouter) {
                this.$router.push(this.$route.params.afterRouter.path)
              } else {
                this.$router.push('/service/dashboard')
              }
            } */
          } else {
            this.$router.push({
              name: 'authNum',
              params: { afterRouter: this.$route.params.afterRouter, from: this.from }
            })
          }
        })
        .catch(reject => {
          // Login이 실패할 경우
          if (reject.code === '60000027') {
            store.dispatch('ClearSession')
            this.view.visibleBlockPopup = true
          } else if (reject.code === '60000039') {
            this.$confirmMsg(reject.desc, '', '변경하기', '닫기')
              .then(() => {
                this.goResetPassword()
              })
              .catch(() => {})
          } else {
            this.errorMsg = reject.desc
          }
        })
        .then(() => {
          // API 성공/실패 모든 경우에서도 실행되는 로직
          this.isLoading = false
        })
    },
    refresh() {
      this.userId = ''
      this.userPassword = ''
      this.errorMsg = ''
      window.scrollTo(0, 0)
    },
    resetErrorMessage() {
      this.errorMsg = ''
    },
    goFindId() {
      this.$router.push('/join/findid')
    },
    goResetPassword() {
      this.$router.push('/join/password')
    },
    goJoinCorp() {
      this.$router.push('/join/corp')
    },
    goJoinAgency() {
      this.$router.push('/join/agency')
    },
    goJoinResult() {
      this.$router.push('/join/retriveapply')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
