<template>
  <div class="template-richcard-titleview" :style="cssType1">
    <h4 class="title" :style="cssType2" v-html="componentData"></h4>
  </div>
</template>

<script>
export default {
  name: 'TitleView',
  props: {
    componentData: {
      type: String,
      default: ''
    },
    cssType: {
      type: String,
      default: null
    }
  },
  components: {},
  data() {
    return {}
  },
  computed: {
    cssType1() {
      if (this.cssType === 'CR') {
        return { padding: '20px 20px 0 10px' }
      } else if (this.cssType === 'CS') {
        return { padding: '20px 20px 0 7px' }
      } else return {}
    },
    cssType2() {
      if (this.cssType === 'CS') {
        return {
          height: 'auto',
          'max-height': '100px',
          'white-space': 'pre-wrap'
        }
      } else {
        return {}
      }
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style>
</style>
