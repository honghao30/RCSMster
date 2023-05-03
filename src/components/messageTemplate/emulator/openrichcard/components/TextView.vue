<template>
  <div class="template-openrich-textview" v-show="visible"
    :class="[componentData.textAlignment, textStyle, isWideStyle]"
    :style="{color:textColor, fontSize:textSize}">
    <p class="text" style="white-space: pre-wrap; user-select: none;" v-text="prettyNewline(componentData.text)" @mousemove.self.prevent>
    </p>
    <!-- <p v-else class="text" style="white-space: pre-wrap;" v-html="componentData.text"></p> -->
  </div>
</template>

<script>
import comlib from '../../../js/common'
export default {
  name: 'TextView',
  components: {},
  props: {
    jsonData: {
      type: Object,
      default() {
        return {}
      }
    },
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
    },
    isWide: {
      type: Boolean
    }
  },
  data() {
    return {}
  },
  computed: {
    visible() {
      return (
        comlib.isEmpty(this.componentData) || this.parentVisibility !== 'gone'
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
      // return 'text-size-' + this.componentData.textSize
      return result + 'px'
    },
    textStyle() {
      if (comlib.isEmpty(this.componentData) || comlib.isEmpty(this.componentData.textStyle)) {
        return ''
      }
      return this.componentData.textStyle.split('|').join(' ')
    },
    isWideStyle() {
      if (comlib.isEmpty(this.componentData)) {
        return ''
      }
      if (this.isWide === true) {
        return 'w100p'
      }
      return ''
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
.bold {
  font-weight: 700;
}
.text-size-18dp {
  font-size: 18px;
}
</style>
