<template>
  <div class="notice-area">
    <p class="notice-text" v-html="info.content"></p>
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
