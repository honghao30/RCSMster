<template>
  <div class="rcs_emulator_wrap open_brand">
    <div class="inner_emul_image">
      <strong class="blind">미리보기</strong>
      <div class="emulator_area">
        <div class="emulator_cont">
          <div class="emulator_view_image">
            <div>
              <div :class="imgClass">
                <img v-if="imageSrc != ''" :src="imageSrc">
                <img v-else src="@/assets/images/common/320_427.jpg">
              </div>
              <div class="img_textwrap">
                <div v-if="titAndDesc.useTitle" class="img_title" v-html="getStrVal(titAndDesc.title, '제목')"></div>
                <div class="img_contents twoline">
                  <table>
                    <colgroup>
                      <col class="txtam-4"><!-- 텍스트 글자 수에 따라 class txtam-1이 1~4번으로 변경 되어야함 -->
                      <col class="right">
                    </colgroup>
                    <tr v-for="(item, idx) in detail.list" :key="idx">
                      <td class="txtam-left" v-html="getStrVal(item.subTitle, '소제목')"></td>
                      <td class="txtam-right" v-html="getStrVal(item.subDesc, `상세 ${idx + 1} 내용`)"></td>
                    </tr>
                  </table>
                </div>
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
  </div>
</template>

<script>
import comlib from '@/components/messageTemplate/js/common'
export default {
  name: 'HighlightImageAndTitleEmulator',
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
      detail: null,
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
