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
// @import '@/assets/scss/index.scss';
@import '@/assets/scss/common/_variables.scss';
@import '@/assets/scss/common/base.scss';
// @import '@/assets/scss/components/ui/button.scss';
// @import '@/assets/scss/components/ui/form.scss';
// @import '@/assets/scss/components/ui/icon.scss';
// @import '@/assets/scss/components/ui/table.scss';
// @import '@/assets/scss/components/ui/tab.scss';
// @import '@/assets/scss/components/ui/typography.scss';
// // 메뉴별
// @import '@/assets/scss/views/layout.scss';
// @import '@/assets/scss/views/signup.scss';
// @import '@/assets/scss/views/login.scss';
// @import '@/assets/scss/views/customer.scss';
// @import '@/assets/scss/views/join.scss';
</style>
