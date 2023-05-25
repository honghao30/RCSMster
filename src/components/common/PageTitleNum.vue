<template>
  <h2 class="page-title">
    {{ pagetitle }}<span>({{num}})</span>
  </h2>
</template>

<script>
export default {
  props: {
    pagetitle: String,
    num: Number
  }
}
</script>

<style lang="scss">

</style>
