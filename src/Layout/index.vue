<template>
  <div class="wrap">
    <HeaderCmp />
    <div
      class="contents"
      :class="[{ bgcontainer: ShowBgcolor }, { respons: respons }]"
      id="contents"
      role="main"
    >
      <!-- <BreadCrumb /> -->
      <router-view></router-view>
    </div>
    <FooterCmp />
  </div>
</template>

<script>
import axios from 'axios'
import envs from '@/envs'
import store from '@/store'
import request from '@/utils/request'
import HeaderCmp from '@/Layout/components/DefaultHeader'
import FooterCmp from '@/Layout/components/DefaultFooter'
// import BreadCrumb from '@/Layout/components/BreadCrumb'
import { getToken } from '@/utils/token'
import { setTimeout, clearTimeout } from 'timers'

// API 연동을 위한 모듈들을 window 스코프에 등록
window.request = request
window.axios = axios

export default {
  name: 'DefaultLayout',
  components: {
    HeaderCmp,
    FooterCmp
    // BreadCrumb
  },
  data() {
    return {
      ShowBgcolor: false,
      tokenExpiredTimeout: undefined, // 로그인 타임아웃
      isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }
  },
  watch: {
    '$store.state.user.lastRequestDate'(value) {
      this.resetTokenExpiredTimeout()
    }
  },
  computed: {
    // System name 적용하는 부분
    systemName() {
      return envs.name
    }
  },
  methods: {
    resetTokenExpiredTimeout() {
      if (this.tokenExpiredTimeout) {
        clearTimeout(this.tokenExpiredTimeout)
      }
      this.setTokenExpiredTimeout()
    },
    setTokenExpiredTimeout() {
      let lastRequestDate = this.$store.state.user.lastRequestDate
      // 로그인 되어있고 lastRequestDate가 있으면
      if (getToken() && !jglib.isEmpty(lastRequestDate)) {
        let diff =
          window.dayjs(lastRequestDate)
            .add(360, 'minute')
            .valueOf() - window.dayjs().valueOf()
        if (diff > 0) {
          this.tokenExpiredTimeout = setTimeout(() => {
            this.clearTokenExpiredTimeout()
          }, diff)
        } else {
          this.clearTokenExpiredTimeout()
        }
      }
    },
    clearTokenExpiredTimeout() {
      clearTimeout(this.tokenExpiredTimeout)
      if (!store.state.ui.sessionTimeout) {
        store.dispatch('SetSessionTimeout', true)
        this.$alertMsg('세션이 만료되었습니다. 로그인을 다시 진행하세요.').then(
          () => {
            store
              .dispatch('Logout')
              .then(() => {
                document.location.href = document.location.pathname
              })
              .catch(() => {
                document.location.href = document.location.pathname
              })
          }
        )
      }
    }
  },
  computed: {
    respons () {
      return this.$route.meta.respons === true
    }
  },
  mounted() {
    // this.breadcrumbInfo = this.$router.currentRoute.meta.breadcrumb
    // if (this.breadcrumbInfo === false) {
    //   this.ShowBgcolor = true
    // }
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/index.scss';
</style>
