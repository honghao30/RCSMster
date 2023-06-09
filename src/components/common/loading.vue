<template>
  <div class="loading">
    <div class="loading-inner"
      :style="{ 'width': size + 'px', 'height': size + 'px' }"
    >
      <div class="loading-icon"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: String
  }
}
</script>
