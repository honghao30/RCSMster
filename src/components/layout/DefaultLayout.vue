<template>
  <div class="wrap">
    <DefaultHeader />
    <div class="contents" id="contents" role="main">
        <BreadCrumb />
        <router-view />
    </div>
    <DefaultFooter />
  </div>
</template>

<script>
import DefaultHeader from './DefaultHeader.vue'
import DefaultFooter from './DefaultFooter.vue'
import BreadCrumb from './BreadCrumb.vue'
export default {
    name: 'DefaultLayout',
    components: {
      DefaultHeader,
      DefaultFooter,
      BreadCrumb
    }
}
</script>

<style>

</style>