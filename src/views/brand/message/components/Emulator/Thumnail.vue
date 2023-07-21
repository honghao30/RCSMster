<template>
  <div class="template-cmp-thumnail">
    <span class="thum"
      v-for="(thum, i) in info" :key="i">
      <img :src="thum.imgFile" alt="">
    </span>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Array,
      default: null
    }
  }
}
</script>

<style>

</style>
