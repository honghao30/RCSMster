<template>
  <div class="template-openrich-textview, title"
    :class="[componentData.textAlignment, textStyle]"
    :style="{color:textColor, fontSize:textSize}">
    <p v-show="visible" class="text" :class="isWide" style="white-space: pre-wrap; user-select: none;" v-text="prettyNewline(componentData.text)" @mousemove.self.prevent>
    </p>
    <!-- <p v-else class="text" style="white-space: pre-wrap;" v-html="componentData.text"></p> -->
  </div>
</template>

<script>
import comlib from '../../../js/common'
export default {
  name: 'TitleView',
  components: {},
  props: {
    componentData: {
      type: Object,
      default() {
        return {}
      }
    },
    parentVisibility: {
      type: String,
      default: ''
    },
    cardType: {
      type: String,
      default: 'D'
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
        comlib.isEmpty(this.componentData) || this.componentData.visibility !== 'gone'
      )
    },
    textColor() {
      if (comlib.isEmpty(this.componentData) || comlib.isEmpty(this.componentData.textColor)) {
        return ''
      }
      return this.componentData.textColor
    },
    textSize() {
      if (comlib.isEmpty(this.componentData) || comlib.isEmpty(this.componentData.textSize)) {
        return ''
      }
      let result = this.componentData.textSize.replace(/[^0-9]/g, '')
      return result + 'px'
    },
    textStyle() {
      if (comlib.isEmpty(this.componentData) || comlib.isEmpty(this.componentData.textStyle)) {
        return ''
      }
      return this.componentData.textStyle.split('|').join(' ')
    },
    isWide() {
      if (comlib.isEmpty(this.componentData) || this.componentData.visibility !== 'gone') {
        return ''
      }
      return 'cellTitleWide'
    }
  },
  watch: {},
  created() {},
  mounted() {
  },
  methods: {
    prettyNewline(value) {
      if (comlib.isEmpty(value)) {
        return 'text 입력'
      }
      // return value.replace(/(?:\r\n|\t|\n)/g, '<br/>')
      return value.trim().replace(/<br\/>/g, '\n')
    }
  }
}
</script>

<style lang="less">
</style>
