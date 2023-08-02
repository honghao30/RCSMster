<template>
  <div class="template-cmp-title" :class="[{'styled': titleType === 'styleTitle'}, {'simple' : titleType === 'simple'}]">
    <div class="title">
      <!-- <i class="icon-type" v-if="titleType !== 'styleTitle'">
        <img :src="`${titAndDescInfo.logoFileSrc}`" alt="">
      </i>
      <span v-if="titAndDescInfo.title">{{ titAndDescInfo.title }}</span>
      <span v-else>제목을 입력하세요.</span> -->
    </div>
    <span class="constName"
      v-if="titAndDescInfo.title2"
    >{{ titAndDescInfo.title2 }}</span>
    <i class="icon-title" v-if="titleType === 'styleTitle' && titAndDescInfo.logoFile">
      <img :src="`${titAndDescInfo.logoFileSrc}`" alt="">
    </i>
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
      titleType : 'styleTitle',
      titAndDescInfo : this.compoInputObj[0],
    }
  }
}
</script>

<style>

</style>
