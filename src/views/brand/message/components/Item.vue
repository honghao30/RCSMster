<template>
  <div class="item-area">
    <div class="desc-area" :class="{'reverse': data.reverse}">
      <p class="text-main" v-html="data.mainText"></p>
      <p class="text-sub" v-html="data.subText"></p>
    </div>
    <span class="thum">
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
