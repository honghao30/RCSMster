<template>
  <div>
    <div class="footer_wrap">
      <footer class="footer">
        <div class="policy_wrap">
          <a href="javascript:void(0);" @click="goPage('/terms/use')">이용약관</a>
          <a href="javascript:void(0);" @click="goPage('/cs/qna')">온라인문의</a>
          <a href="javascript:void(0);" @click="goPage('/join/agency')" v-if="loginCheck">대행사가입</a>
        </div>
        <div class="agency_wrap">
          <a href="https://www.sktelecom.com/index.html" target="_blank" class="rcs_icon icon_sk">SK</a>
          <a href="https://www.kt.com/" target="_blank" class="rcs_icon icon_kt">KT</a>
          <a href="https://www.lguplus.com" target="_blank" class="rcs_icon icon_lg">LG 유플러스</a>
        </div>
        <div class="copyright">&copy; RCS Biz Center</div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    loginCheck() {
      return jglib.isEmpty(this.$store.state.user.accessToken)
    }
  },
  methods: {
    goPage(path) {
      if (
        path === '/cs/qna' &&
        jglib.isEmpty(this.$store.state.user.accessToken)
      ) {
        path = '/cs/qna/form'
      }
      this.$router.push(path).catch(() => {
        window.scrollTo(0, 0)
      })
    }
  }
}
</script>
