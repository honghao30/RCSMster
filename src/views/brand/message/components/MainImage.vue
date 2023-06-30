<template>
  <div class="image-area">
    <span class="image">
      <img :src="info.imgUrl"/>
    </span>
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

<style lang="scss">

</style>
