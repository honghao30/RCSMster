<template>
  <div class="desc-area">
    <p class="subtitle" v-if="data.subTitle" v-html="data.subTitle"></p>
    <div class="description">
      <p v-html="data.description"></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    }
  }
}
</script>

<style>

</style>
