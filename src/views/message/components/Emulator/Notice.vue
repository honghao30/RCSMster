<template>
  <div class="notice-area">
    <p class="notice-text"
    v-html="item"
    v-for="(item, i) in info.noticeText" :key="i"></p>
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

<style>

</style>
