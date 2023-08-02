<template>
  <div class="template-cmp-description">
    <div class="title" v-if="titAndDescInfo.useTitle == 'Y'">
      <span v-if="titAndDescInfo.title">{{ titAndDescInfo.title }}</span>
      <span v-else>제목을 입력해주세요.</span>
    </div>
    <div class="content">
      <span v-if="titAndDescInfo.description">{{ titAndDescInfo.description }}</span>
      <span v-else>내용을 입력하세요.</span>
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
