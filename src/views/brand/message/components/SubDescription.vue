<template>
  <div class="desc-area sub">
    <p class="subtitle" v-if="info.subTitle">{{ info.subTitle }}</p>
    <div class="description" v-if="info.type == 'title'">
      <dl v-for="(item, i) in info.description" :key="i">
        <dt class="desc-title">{{ item.title }}</dt>
        <dd class="desc-text" v-html="item.desc"></dd>
      </dl>
    </div>
    <div class="description" v-if="info.type == 'thum'">
      <div class="item" v-for="(item, j) in info.description" :key="j">
        <span class="desc-thum" :style="{'background-image': `url(${item.thumSrc})`}">
        </span>
        <span class="desc-text" v-html="item.desc"></span>
      </div>
    </div>
    <div class="description history" v-if="info.type == 'history'">
      <dl v-for="(item, i) in info.description" :key="i">
        <dt class="desc-title">{{ item.title }}</dt>
        <dd class="desc-text" v-html="item.desc"></dd>
      </dl>
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
