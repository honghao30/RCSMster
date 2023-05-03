<template>
  <div id="app">
    <!--
    <layout-mobile v-if="isMobile"/>
    <layout-pc v-else/>
    -->
    <!-- <error-confirm/> -->
  </div>
</template>

<script>
// import envs from './envs'
// import router from '@/router'
// import localStore from '@/utils/localStore'
import store from '@/store'
import { getToken } from '@/utils/token'
// import ErrorConfirm from '@/components/global/ErrorConfirm'
// import _ from 'lodash'

// 차후 템플릿이 추가 구성하면, 이곳에서 분기하게 구성
// let LayoutPc = ''
// LayoutPc = () => import('@/Layout/PC')

// let LayoutMobile = ''
// LayoutMobile = () => import('@/Layout/Mobile')

export default {
  name: 'App',
  components: {
    // LayoutPc,
    // LayoutMobile
    // ErrorConfirm
  },
  data() {
    return {}
  },
  computed: {
    isMobile() {
      return this.$route.path.startsWith('/mobile')
    }
  },
  created() {
    // 로그인한 사용자의 User Info 조회
    let token = getToken()
    if (token) {
      store.dispatch('SetUserInfo').then(() => {})
    }
  }
}
</script>

<style lang="less">
</style>
