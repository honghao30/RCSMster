<template>
  <div class="item-area">
    <div class="desc-area" :class="{'reverse': info.reverse}">
      <p class="text-main">
        <span v-if="info.mainText" v-html="info.mainText"></span>
        <span>아이템</span>
      </p>
      <p class="text-sub">
        <span v-if="info.subText" v-html="info.subText"></span>
        <span>텍스트 템플릿</span>
      </p>
    </div>
    <span class="thum">
    </span>
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
