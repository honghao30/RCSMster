<template>
  <div
    class="template-openrichcard-linearlayout"
    :class="[isHorizontal, isTypeA]"
  >
    <component
      v-for="(comp, idx) in children"
      :key="index+idx"
      :is="widget(comp.widget)"
      :index="index+idx"
      :componentData="comp"
      :class="childClass"
      :parentVisibility="componentData.visibility"
      :cardType="cardType"
      :cardTheme="cardTheme"
      :jsonData="jsonData"
      :isWide="isWide"
    ></component>
  </div>
</template>

<script>
import ImageView from './ImageView.vue'
import TextView from './TextView.vue'
import HrView from './HrView.vue'
import TitleView from './TitleView.vue'
import comlib from '../../../js/common'
export default {
  name: 'LinearLayout',
  components: {
    ImageView,
    TextView,
    HrView,
    TitleView
  },
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
    index: {
      type: String,
      default: '1'
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
    children() {
      if (
        comlib.isEmpty(this.componentData) ||
        comlib.isEmpty(this.componentData.children)
      ) {
        return []
      }
      return this.componentData.children
    },
    isWide () {
      if (this.cardType === 'C' && this.componentData.children.length === 1) {
        return true
      }
      return false
    },
    // isHorizontal() {
    //   if (
    //     comlib.isEmpty(this.componentData) ||
    //     comlib.isEmpty(this.componentData.orientation) ||
    //     this.componentData.orientation.toLowerCase() === 'vertical'
    //   ) {
    //     return false
    //   }

    //   return true
    // },
    isHorizontal() {
      if (
        comlib.isEmpty(this.componentData) ||
        comlib.isEmpty(this.componentData.orientation) ||
        this.componentData.orientation.toLowerCase() === 'vertical'
      ) {
        return false
      }

      return 'template-openrichcard-linearlayout-horizontal'
    },
    isThemeTitle() {
      if (
        comlib.isEmpty(this.componentData) ||
        comlib.isEmpty(this.componentData.orientation) ||
        this.componentData.orientation.toLowerCase() === 'vertical' ||
        this.cardTheme !== 'TA'
      ) {
        return false
      }
      return 'title'
    },
    isTypeA() {
      if (
        comlib.isEmpty(this.componentData) ||
        comlib.isEmpty(this.componentData.orientation)
      ) {
        return false
      }
      // if (this.cardTheme === 'TA' && this.cardType === 'D') {
      //   return 'typeA'
      // }
      if (this.cardTheme === 'TA') {
        return 'typeA'
      }
      return false
    },
    childClass() {
      let childClass = ''
      if (this.isHorizontal) {
        if (this.children.length > 1) {
          childClass = 'w-1/' + this.children.length
        }
      }
      return childClass
    },
    isTheme() {
      if (this.cardTheme !== 'TA') {
        return ''
      }
      return 'title'
    }
  },
  watch: {},
  created() {},
  mounted() {
  },
  methods: {
    widget(widget) {
      return widget.toLowerCase() === 'view' ? 'HrView' : widget
    }
  }
}
</script>

<style lang="less">
.test1 {
  color: pink
}
</style>
