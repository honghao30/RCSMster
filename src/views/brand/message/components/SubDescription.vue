<template>
  <div class="desc-area sub">
    <p class="subtitle" v-if="data.subTitle">{{ data.subTitle }}</p>
    <div class="description" v-if="data.type == 'title'">
      <dl v-for="(item, i) in data.description" :key="i">
        <dt class="desc-title">{{ item.title }}</dt>
        <dd class="desc-text" v-html="item.desc"></dd>
      </dl>
    </div>
    <div class="description" v-if="data.type == 'thum'">
      <div class="item" v-for="(item, j) in data.description" :key="j">
        <span class="desc-thum" :style="{'background-image': `url(${item.thumSrc})`}">
        </span>
        <span class="desc-text" v-html="item.desc"></span>
      </div>
    </div>
    <div class="description history" v-if="data.type == 'history'">
      <dl v-for="(item, i) in data.description" :key="i">
        <dt class="desc-title">{{ item.title }}</dt>
        <dd class="desc-text" v-html="item.desc"></dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null
    }
  }
}
</script>

<style>
</style>
