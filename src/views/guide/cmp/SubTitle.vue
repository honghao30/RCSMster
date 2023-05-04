<template>
  <h2 class="guidepage">
    {{ pagetitle }}
  </h2>
</template>

<script>
export default {
    props: {
        pagetitle: String
    }
}
</script>

<style lang="scss">
.guidepage {
    border-bottom:1px solid #ddd;
    padding: 5px 0 10px;
    font-size: 28px;
    font-weight: 500;
}
</style>