<template>
  <div class="desc-area table">
    <p class="subtitle" v-if="compInfo.title">{{ compInfo.title }}</p>
    <div class="description">
      <dl v-for="(item, i) in compInfo.description" :key="i">
        <dt>{{ item.tableTitle }}</dt>
        <dd>{{ item.tableText }}</dd>
      </dl>
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
