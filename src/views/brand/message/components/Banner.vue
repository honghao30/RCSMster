<template>
  <div class="banner-area">
      <span class="banner"
      >
      <!-- <img :src="require('@/assets/images/' + compInfo.imageSrc)" alt=""> -->
    </span>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss">

</style>
