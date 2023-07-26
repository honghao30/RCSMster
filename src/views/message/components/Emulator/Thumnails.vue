<template>
  <div class="thums-area">
    <span class="thum"
      v-for="(thum, i) in data.thums"
      :key="i" :style="{'background-image': `url(${thum.thumSrc})`}">
    </span>
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
