<template>
  <div class="desc-area sub">
    <p class="subtitle" v-if="info.subTitle">{{ info.subTitle }}</p>
    <div class="description" v-if="info.type == 'title'">
      <dl v-for="(item, i) in info.description" :key="i">
        <dt class="desc-title" v-html="item.title "></dt>
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
