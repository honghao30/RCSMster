<template>
  <div :class="isMobile ? '' : 'main-box mx-auto p-4 xl:p-0'">
    <keep-alive>
      <router-view name="keep" :key="key"/>
    </keep-alive>
    <router-view :key="key"/>
  </div>
</template>

<script>
export default {
  name: 'RouterSection',
  computed: {
    key() {
      return this.$route.fullPath
    },
    isLocal() {
      return process.env.NODE_ENV === 'development'
    },
    isMobile() {
      return this.key.startsWith('/mobile')
    }
  }
}
</script>

<style lang="less" scoped>
.main-box {
  min-height: 500px;
}
</style>
