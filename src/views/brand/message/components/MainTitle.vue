<template>
  <div v-if="viewMode">
    <div class="main-title">
      <div class="title"
      >
        <span class="logo" :style="{'background-image': `url(${data.logoSrc})`}"></span>
        <p v-html="data.mainTitle"></p>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="main-title">
      <div class="title"
      >
        <span class="logo" :style="{'background-image': `url(${data.logoSrc})`}"></span>
        <p v-if="data.mainTitle">{{ data.mainTitle }}</p>
        <p v-else>타이틀을 입력해주세요</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default: null
    },
    viewMode: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
