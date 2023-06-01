<template>
  <div class="desc-area">
    <p class="subtitle" v-if="compInfo.subTitle">{{ compInfo.subTitle }}</p>
    <div class="description">
      <p v-html="compInfo.description"></p>
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

<style>

</style>
