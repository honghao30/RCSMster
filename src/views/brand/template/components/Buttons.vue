<template>
  <div class="button-area"
    :class="{ vertical : compInfo.direction === 'vertical'}"
  >
    <button
      class="btn"
      v-for="(btn, i) in compInfo.buttons" :key="i"
    >
    {{ btn }}
    </button>
  </div>
</template>

<script>
export default {
  props: {
    compInfo: {
      type: Object,
      default: null
    }
  }
}
</script>
<style>

</style>
