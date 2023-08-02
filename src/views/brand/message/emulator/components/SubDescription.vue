<template>
  <div class="template-cmp-description">
    <p class="title" v-if="info.title">{{ info.title }}</p>
    <ul class="sub-description">
      <li v-for="(item, i) in info.content" :key="i">
        <div class="thum">
          <img :src="item.imgFile" alt="">
        </div>
        <div class="item-text">
          <span v-if="item.itemData" v-html="item.itemData"></span>
          <span v-else>내용을 입력하세요.</span>
        </div>
      </li>
    </ul>
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
