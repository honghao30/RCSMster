<template>
  <!-- <div>
    <component :cardTheme="cardTheme" :is="messageType" :cardType="cardType" :jsonData="jsonData"></component>
  </div> -->
    <component :cardTheme="cardTheme" :is="messageType" :cardType="cardType" :jsonData="isThemeJsonData"></component>
</template>

<script>
import richcardEmulator from './richcard'
import openrichcardEmulator from './openrichcard'
import comlib from '../js/common'
export default {
  name: 'TemplateEmulator',
  components: {
    richcard: richcardEmulator,
    openrichcard: openrichcardEmulator
  },
  props: {
    jsonData: {
      type: Object,
      default() {
        return {}
      }
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
    messageType() {
      if (comlib.isEmpty(this.jsonData) || !this.jsonData || !this.jsonData.RCSMessage) {
        return ''
      }
      return this.jsonData.RCSMessage.openrichcardMessage ? 'openrichcard' : 'richcard'
    },
    isThemeJsonData() {
      if (this.jsonData.RCSMessage !== undefined) {
        if (this.jsonData.RCSMessage.openrichcardMessage !== undefined && this.cardTheme === 'TA') {
          let themeJson = this.jsonData
          // themeJson.RCSMessage.openrichcardMessage.layout.children[0].children[0].widget = 'TitleView'
          // 타이틀 자유형일 때 타이틀로 바꿔주고, 기존에 있던 라인을 안보이게 처리 해줌. css상 title에 두꺼운 라인이 들어 있기 때문!
          themeJson.RCSMessage.openrichcardMessage.layout.children[0].children[0].children[0].widget = 'TitleView'
          if (themeJson.RCSMessage.openrichcardMessage.layout.children[0].children[0].children[1]) {
            themeJson.RCSMessage.openrichcardMessage.layout.children[0].children[0].children[1].widget = 'TitleView'
          }
          themeJson.RCSMessage.openrichcardMessage.layout.children[0].children[1].visibility = 'gone'
        }
      }
      return this.jsonData
    }
  },
  watch: {
    jsonData() {
      this.init()
    }
  },
  created() {
    this.init()
  },
  mounted() {
  },
  methods: {
    init() {}
  }
}
</script>

<!-- <style lang="less">
@import './style/emulator.less';
</style> -->
