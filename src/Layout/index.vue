<template>
  <div class="wrap"
    :class="{ isfixed: isHeaderFix}"
  >
    <HeaderCmp
      :class="{ isfixed: isHeaderFix}"
    />
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
import HeaderCmp from '@/Layout/components/DefaultHeader'
import FooterCmp from '@/Layout/components/DefaultFooter'
// import BreadCrumb from '@/Layout/components/BreadCrumb'
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
      isHeaderFix: false,
      scrollY: null
    }
  },
  watch: {
    '$store.state.user.lastRequestDate'(value) {
      this.resetTokenExpiredTimeout()
    },
    scrollY(newValue) {
      if (newValue > 110 && this.$route.path !== '/Feature') {
        this.isHeaderFix = true
      } else {
        this.isHeaderFix = false
      }
      this.scrollPosition = window.scrollY
    }
  },
  computed: {
    respons () {
      return this.$route.meta.respons === true
    }
  },
  mounted () {
    window.addEventListener('scroll', () => {
      this.scrollY = Math.round(window.scrollY)
    })
    console.log(this.$route.path)
  },
  methods: {
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/index.scss'
</style>
