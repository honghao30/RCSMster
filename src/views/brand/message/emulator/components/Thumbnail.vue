<template>
  <div class="template-cmp-thumnail">
    <span class="thum"
      v-for="(thum, i) in bodyInfo.list" :key="i">
      <img :src="thum.fileSrc" alt="">
    </span>
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
      bodyInfo : this.compoInputObj[0],
    }
  }
}
</script>

<style>

</style>
