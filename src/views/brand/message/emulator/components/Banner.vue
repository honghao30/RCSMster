<template>
  <div class="banner-area">
      <span class="banner"
      >
      <img :src="mainImgInfo.fileSrc" />
    </span>
  </div>
</template>

<script>
export default {
  props: {
    compoInputObj: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      mainImgInfo : this.compoInputObj[0],
    }
  }
}
</script>

<style lang="scss">

</style>
