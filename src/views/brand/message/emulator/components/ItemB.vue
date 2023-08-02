<template>
  <div class="template-cmp-title item">
    <div class="title">
      <div class="title-desc" v-if="titAndDescInfo.useDescription === 'Y'">
        {{ titAndDescInfo.description }}
      </div>
      <span v-if="titAndDescInfo.title">{{titAndDescInfo.title}}</span>
      <span v-else>제목을 입력하세요.</span>
    </div>
    <div class="item-poinst-logo"
    >
      <img :src="`${titAndDescInfo.logoFileSrc}`" alt="">
    </div>
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
