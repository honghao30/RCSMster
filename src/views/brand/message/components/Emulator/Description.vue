<template>
  <div class="template-cmp-description">
    <p class="title" v-if="info.titleUseY === 'Y'">{{ info.title }}</p>
    <p class="sub-title" v-if="info.subTitleUseY === 'Y'">{{ info.subTitle }}</p>
    <div class="content">
      <span v-if="!info.content">내용을 입력하세요.</span>
      <span v-else>{{ info.content }}</span>
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
