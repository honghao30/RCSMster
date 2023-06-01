<template>
  <div class="thums-area">
    <span class="thum"
      v-for="(thum, i) in compInfo.thums"
      :key="i" :style="{backgroundImage: `url(${require('@/assets/images/' + thum.thumSrc)})`}">
    </span>
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

<style>

</style>
