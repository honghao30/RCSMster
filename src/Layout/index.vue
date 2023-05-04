<template>
  <div class="wrap">
    <HeaderCmp />
    <BreadCrumb />
    <router-view></router-view>
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
