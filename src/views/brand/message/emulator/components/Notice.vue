<template>
  <div class="notice-area">
    <span v-if="!titAndDescInfo.description">내용을 입력하세요.</span>
    <p class="notice-text" v-html="titAndDescInfo.description"></p>
  </div>
</template>

<script>
export default {
  props: {
    compoInputObj: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      titAndDescInfo : this.compoInputObj[0],
    }
  }
}
</script>

<style>

</style>
