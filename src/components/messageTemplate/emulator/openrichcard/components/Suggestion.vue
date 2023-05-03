<template>
  <div class="template-openrichcard-suggestion btn_wrap" :class="cardTheme === 'LE' ? 'white' : ''">
    <div class='btn'>{{ displayText }}</div>
  </div>
</template>

<script>
import comlib from '../../../js/common'
export default {
  name: 'Suggestion',
  components: {},
  props: {
    suggestionData: {
      type: Object,
      default() {
        return {}
      }
    },
    cardTheme: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {
    visible() {
      return (
        comlib.isEmpty(this.suggestionData) ||
        this.suggestionData.visibility !== 'gone'
      )
    },
    displayText() {
      if (
        comlib.isEmpty(this.suggestionData) ||
        comlib.isEmpty(this.suggestionData.action.displayText)
      ) {
        return '버튼'
      }

      return this.suggestionData.action.displayText
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="less">
</style>
