<template>
  <div class="notice-area">
    <p class="notice-text" v-html="compInfo.noticeText"></p>
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
