<template>
  <div class="template-cmp-description">
    <p class="title" v-if="titAndDescInfo.useTitle == 'Y'">{{ titAndDescInfo.title }}</p>
    <ul class="sub-description">
      <li v-for="(item, i) in bodyInfo.list" :key="i">
        <div class="thum">
          <img :src="item.fileSrc" alt="">
        </div>
        <div class="item-text">
          <span v-if="item.subDesc.text" v-html="item.subDesc.text"></span>
          <span v-else>내용을 입력하세요.</span>
        </div>
      </li>
    </ul>
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
  data() {
    return {
      titAndDescInfo : this.compoInputObj[0],
      bodyInfo: this.compoInputObj[1]
      }
  },
}
</script>

<style>
</style>
