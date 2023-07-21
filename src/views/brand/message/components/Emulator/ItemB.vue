<template>
  <div class="template-cmp-title item">
    <div class="title">
      <div class="title-desc" v-if="info.titleDescUse === 'Y'">
        {{ info.titleDesc }}
      </div>
      <span v-if="info.title">{{info.title }}</span>
      <span v-else>제목을 입력하세요.</span>
    </div>
    <div class="item-poinst-logo"
    >
      <img :src="`${info.logoFile}`" alt="">
    </div>
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
