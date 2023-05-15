<template>
  <div class="breadcrumb"
    v-if="Showbreadcrumb"
  >
    <div class="inner">
      <ul class="breadcrumb-list">
        <li><router-link to="/">HOME</router-link></li>
        <li>회원가입</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      Showbreadcrumb: true
    }
  },
  mounted() {
    this.breadcrumbInfo = this.$router.currentRoute.meta.breadcrumb
    if (this.breadcrumbInfo === false) {
      this.Showbreadcrumb = false
    }
  },
  methods() {
  }
}
</script>

<style>

</style>
