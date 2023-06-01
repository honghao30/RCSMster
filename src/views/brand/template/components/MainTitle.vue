<template>
  <div class="main-title">
    <div class="title">
      <span class="thum" :style="{backgroundImage: `url(${require('@/assets/images/' + compInfo.thumSrc)})`}"></span>
      <p v-html="compInfo.displayText"></p>
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

<style scoped>

</style>
