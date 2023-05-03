<template>
  <div class="template-openrichcard-hrview" v-show="visible"></div>
</template>

<script>
import comlib from '../../../js/common'
export default {
  name: 'HrView',
  components: {},
  props: {
    componentData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    visible() {
      // console.log('hr에서 visible')
      // console.log(this.componentData.visibility)
      return (
        comlib.isEmpty(this.componentData) ||
        this.componentData.visibility !== 'gone'
      )
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
