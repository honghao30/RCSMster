<template>
  <div class="template-cmp-title" :class="[{'styled': info.titleType === 'styleTitle'}, {'simple' : info.titleType === 'simple'}]">
    <div class="title">
      <i class="icon-type" v-if="info.titleType !== 'styleTitle'">
        <img :src="`${info.titleIcon}`" alt="">
      </i>
      <span v-if="info.title">{{ info.title }}</span>
      <span v-else>제목을 입력하세요.</span>
    </div>
    <span class="constName"
      v-if="info.subVarTitle"
    >{{ info.subVarTitle }}</span>
    <i class="icon-title" v-if="info.titleType === 'styleTitle' && info.titleIcon">
      <img :src="`${info.titleIcon}`" alt="">
    </i>
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
