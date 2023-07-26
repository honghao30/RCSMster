<template>
  <div class="breadcrumb"
    v-if="Showbreadcrumb"
  >
    <div class="inner">
      <ul class="breadcrumb-list">
        <li><router-link to="/">HOME</router-link></li>
        <li>{{title}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      Showbreadcrumb: true
    }
  },
  mounted() {
    this.title = this.$router.currentRoute.meta.tittle
    this.breadcrumbInfo = this.$router.currentRoute.meta.breadcrumb
    if (this.breadcrumbInfo === false) {
      this.Showbreadcrumb = false
    }
  }
}
</script>

<style>

</style>
