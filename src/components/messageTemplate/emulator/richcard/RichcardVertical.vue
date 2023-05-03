<template>
  <div class="tempate-richcard-vertical">
    <div class="template-richcard-component template-richcard-imageview">
      <img v-if="mediaUrl === ''" src="../../image/img_placeholder.png">
      <img v-else :src="mediaUrl">
    </div>
    <div class="template-richcard-component template-richcard-textview template-richcard-textview-title">{{ title }}</div>
    <div class="template-richcard-component template-richcard-textview">{{ description }}</div>
  </div>
</template>

<script>
import comlib from '../../js/common'
export default {
  name: 'RichcardVertical',
  props: {
    message: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    title() {
      if (comlib.isEmpty(this.message)) {
        return '{{title}}'
      }
      return this.message.title
    },
    description() {
      if (comlib.isEmpty(this.message)) {
        return '{{description}}'
      }
      return this.message.description
    },
    mediaUrl() {
      if (
        comlib.isEmpty(this.message) ||
        comlib.isEmpty(this.message.mediaUrl)
      ) {
        return ''
      }
      return this.message.mediaUrl
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="less" scoped>
</style>
