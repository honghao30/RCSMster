<template>
  <div class="main-title">
    <div class="title"
      :class="[{'border--none' : data.borderNone }, {'justify' : data.pointText}]"
    >
      <span class="thum" v-if="!data.pointText"></span>
      <p v-html="data.title"></p>
      <span class="point" v-html="data.pointText" v-if="data.pointText"></span>
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

<style scoped>

</style>
