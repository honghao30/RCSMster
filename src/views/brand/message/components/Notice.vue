<template>
  <div class="notice-area">
    <p class="notice-text"
    v-html="item"
    v-for="(item, i) in data.noticeText" :key="i"></p>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  }
}
</script>

<style>

</style>
