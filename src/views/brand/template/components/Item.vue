<template>
  <div class="item-area">
    <div class="desc-area" :class="{'reverse' : compInfo.reverse }">
      <p class="text-main" v-if="compInfo.mainText">{{ compInfo.mainText }}</p>
      <p class="text-sub">{{ compInfo.subText }}</p>
    </div>
    <span class="thum" :style="{backgroundImage: `url(${require('@/assets/images/' + compInfo.thumSrc)})`}">
    </span>
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
