<template>
  <div class="template-richcard-descriptionview" :style="cssType1">
    <p class="text" :style="cssType2" v-html="componentData"></p>
  </div>
</template>

<script>
export default {
  name: 'DescriptionView',
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
        return { padding: '10px' }
      } else if (this.cssType === 'CS') {
        return { padding: '5px', overflow: 'hidden' }
      } else {
        return {}
      }
    },
    cssType2() {
      if (this.cssType === 'lms') {
        return { height: '400px' }
      } else if (this.cssType === 'CS') {
        return { height: '185px' }
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
