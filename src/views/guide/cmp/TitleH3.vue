<template>
  <div class="wsg-guide-header">
    <h3
      class="h3-title"
    >
      {{ titleh3 }}
    </h3>
  </div>
</template>

<script>
export default {
    props: {
      titleh3: String,
    }
}
</script>

<style lang="scss">
    .h3-title {
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 10px;
    }
</style>