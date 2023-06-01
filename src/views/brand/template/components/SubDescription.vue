<template>
  <div class="desc-area sub">
    <p class="subtitle" v-if="compInfo.subTitle">{{ compInfo.subTitle }}</p>
    <div class="description" v-if="compInfo.type == 'title'">
      <dl v-for="(item, i) in compInfo.description" :key="i">
        <dt class="desc-title">{{ item.title }}</dt>
        <dd class="desc-text" v-html="item.desc"></dd>
      </dl>
    </div>
    <div class="description" v-if="compInfo.type == 'thum'">
      <div class="item" v-for="(item, j) in compInfo.description" :key="j">
        <span class="desc-thum" :style="{backgroundImage: `url(${require('@/assets/images/' + item.thumSrc)})`}">
        </span>
        <span class="desc-text" v-html="item.desc"></span>
      </div>
    </div>
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
