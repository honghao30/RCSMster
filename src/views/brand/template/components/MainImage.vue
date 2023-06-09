<template>
  <div class="image-area" :class="{'full' : compInfo.full}">
    <div class="image-item">
      <span class="image">
      <img :src="require('@/assets/images/'+ compInfo.imageSrc)"/>
    </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    compInfo: {
      type: Object,
      default: null
    }
  }
}
</script>

<style lang="scss">

</style>
