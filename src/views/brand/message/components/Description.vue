<template>
  <div class="desc-area">
    <p class="subtitle" v-if="info.subTitle" v-html="info.subTitle"></p>
    <div class="description">
      <p v-if="info.description" v-html="info.description"></p>
      <p v-else>내용을 입력해주세요.</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object
    }
  }
}
</script>

<style>

</style>
