<template>
  <div class="template-cmp-image">
    <div class="image" :class="{'square' : imgType === 'square'}">
      <img :src="mainImgInfo.fileSrc" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    compoInputObj: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      imgType : 'tall',
      mainImgInfo : this.compoInputObj[0],
    }
  }
}
</script>
