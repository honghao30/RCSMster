<template>
  <div class="desc-area table">
    <p class="subtitle" v-if="data.title">
      {{ data.title }}
      <span class="title-point" v-if="data.pointText">{{ data.pointText }}</span>
    </p>
    <div class="description">
      <dl v-for="(item, i) in data.description" :key="i">
        <dt v-html="item.tableTitle"></dt>
        <dd v-html="item.tableText" :class="{'em' : data.bold}"></dd>
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
