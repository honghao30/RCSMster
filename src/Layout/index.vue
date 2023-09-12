<template>
  <div class="wrap"
    :class="{ main: isMain}"
  >
    <HeaderCmp
      v-if="onlyBody"
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
    <FooterCmp
      v-if="onlyBody"
    />
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
      scrollY: null,
      onlyBody: true
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
    // System name 적용하는 부분
    isMain () {
      return this.$route.name === 'Main'
    },
    respons () {
      return this.$route.meta.respons === true
    }
  },
  mounted () {
    window.addEventListener('scroll', () => {
      this.scrollY = Math.round(window.scrollY)
    })
    if (this.$route.meta.headerView === false && this.$route.meta.FooterView === false) {
      this.onlyBody = false
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/index.scss'
</style>
