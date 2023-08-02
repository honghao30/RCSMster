<template>
  <div class="template-cmp-table simple">
    <div class="table-cmp-title" v-if="titAndDescInfo.useTitle == 'Y'">
      <span v-if="titAndDescInfo.title">{{ titAndDescInfo.title }}</span>
      <span v-else>제목을 입력해주세요.</span>
    </div>
    <ul class="description">
      <li v-for="(item, i) in bodyInfo.list" :key="i">
        <div class="item-label">
          <span v-if="item.subTitle.text" v-html="item.subTitle.text"></span>
          <span v-else>내용 입력</span>
        </div>
        <div class="item-data">
          <span v-if="item.subDesc.text" v-html="item.subDesc.text"></span>
          <span v-else>내용 입력</span>
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
