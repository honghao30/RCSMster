<template>
  <div id="wrap" :class="isMobile ? 'mobile_wrap' : ''">
    <Header v-if="visibleHeader"></Header>
    <router-view></router-view>
    <Footer></Footer>
    <div class="loading_layer" v-if="visibleLoading">
      <div class="loader"></div>
    </div>
    <deserted-brand v-if="hasDesertedBrand"></deserted-brand>
  </div>
</template>

<script>
// import store from '@/store'
// import _ from 'lodash'
import axios from 'axios'
import envs from '@/envs'
import store from '@/store'
import request from '@/utils/request'
import Header from '@/Layout/components/Header'
import Footer from '@/Layout/components/Footer'
import { getToken } from '@/utils/token'
import { setTimeout, clearTimeout } from 'timers'
import DesertedBrand from '@/Layout/components/DesertedBrand'
// import localStore from '@/utils/localStore'

// API 연동을 위한 모듈들을 window 스코프에 등록
window.request = request
window.axios = axios

export default {
  name: 'LayoutPC',
  components: {
    Header,
    Footer,
    DesertedBrand
  },
  data() {
    return {
      tokenExpiredTimeout: undefined, // 로그인 타임아웃
      isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    }
  },
  watch: {
    // 선택한 메뉴에 따라 좌측 사이드 바의 상태도 변경 되어야 한다.
    $route(to) {
      // 메뉴 정보를 확인하고, 확인 간 자신의 메뉴의 1depth 정보를 추출하고, 이를 적용해야 함
    },
    '$store.state.user.lastRequestDate'(value) {
      this.resetTokenExpiredTimeout()
    }
  },
  computed: {
    // System name 적용하는 부분
    systemName() {
      return envs.name
    },
    visibleLoading() {
      return this.$store.state.ui.visibleLoading
    },
    visibleHeader() {
      return (
        this.$route.meta.headerView === undefined || this.$route.meta.headerView
      )
    },
    hasDesertedBrand() {
      if (this.$route.params && this.$route.params.from === 'miricanvas') { // 미리캔버스 이동시에는 대행사 팝업 출력하지 않는다.
        return false
      } if (this.$store.state.user.accessToken !== undefined && this.$store.state.user.accessToken !== '' && this.$store.state.user.chkDesertedBrand) {
        return true
      } else {
        return false
      }
    }
  },
  created() {},
  mounted() {},
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
  }
}
</script>

<style lang="less">
// main CSS를 여기에만 import 하면 상세 화면에서는 모두 적용됩니다.
@import '../../assets/main.less';

@tailwind base;
@tailwind components;
@tailwind utilities;
</style>
