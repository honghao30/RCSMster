<template>
  <div class="rcs_emulator_wrap open_brand">
    <div class="inner_emul_image">
      <strong class="blind">미리보기</strong>
      <div class="emulator_area">
        <div class="emulator_cont">
          <div class="emulator_view_image">
            <div :class="imgClass">
              <img v-if="imageSrc != ''" :src="imageSrc">
                <img v-else src="@/assets/images/common/320_427.jpg">
            </div>
            <div class="img_textwrap">
              <div v-if="titAndDesc.useTitle" class="img_title" v-html="getStrVal(titAndDesc.title, '제목')"></div>
              <div class="img_contents" v-html="getStrVal(this.titAndDesc.description, '본문 내용')"></div>
              <!--버튼 -->
              <div v-if="useButton">
                <div v-for="(btn, idx) in buttons.btnList" :key="idx" class="template-openrichcard-suggestion btn_wrap_image">
                  <div class="btn" v-html="getStrVal(btn.action.displayText, '버튼명')"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import comlib from '@/components/messageTemplate/js/common'
export default {
  name: 'HighlightImageEmulator',
  props: {
    type: {
      type: String
    },
    data: {
      type: Map
    }
  },
  data () {
    return {
      common: null,
      mainImg: null,
      titAndDesc: null,
      buttons: null
    }
  },
  computed: {
    isVertical() { return this.type === 'V' },
    imgClass() { return this.isVertical ? 'img_vertical' : 'img_square' },
    useButton() { return this.buttons.btnList.length > 0 },
    imageSrc() {
      return !comlib.isEmpty(this.mainImg.previewSrc) ? this.mainImg.previewSrc : ''
    }
  },
  watch: {},
  created() {
    for (let [key, val] of this.data) {
      this.$data[key] = val
    }
  },
  methods: {
    getStrVal(str, defStr) {
      if (!comlib.isEmpty(str)) return str.replaceAll('\n', '<br/>').replaceAll(' ', '&nbsp;')
      else return defStr
    }
  }
}
</script>
