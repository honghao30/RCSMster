<template>
  <div class="wrap">
    <HeaderCmp />
    <div class="contents" id="contents" role="main">
      <BreadCrumb />
      <router-view></router-view>
    </div>
    <FooterCmp />
  </div>
</template>

<script>
import HeaderCmp from '@/Layout/components/DefaultHeader'
import FooterCmp from '@/Layout/components/DefaultFooter'
import BreadCrumb from '@/Layout/components/BreadCrumb'
export default {
  name: 'DefaultLayout',
  components: {
    HeaderCmp,
    FooterCmp,
    BreadCrumb
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/index.scss'
</style>
