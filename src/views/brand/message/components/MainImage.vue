<template>
  <div class="image-area">
    <span class="image">
      <img :src="data.imgUrl"/>
    </span>
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

<style lang="scss">

</style>
