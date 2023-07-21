<template>
  <div class="template-cmp-image">
    <div class="image" :class="{'square' : info.imgType === 'square'}">
      <img :src="info.imgFile" />
    </div>
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
