<template>
  <div class="button-area"
    :class="{ column : data.direction === 'column'}"
  >
    <button
      class="btn"
      v-for="(btn, i) in data.buttons" :key="i"
    >
    {{ btn }}
    </button>
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
