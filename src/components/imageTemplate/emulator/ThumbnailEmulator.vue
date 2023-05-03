<template>
  <div class="rcs_emulator_wrap open_brand">
    <div class="inner_emul_image">
      <strong class="blind">미리보기</strong>
      <div class="emulator_area">
        <div class="emulator_cont">
          <div class="emulator_view_image">
            <div>
              <!-- 메인 이미지-->
              <div class="img_wide">
                <img v-if="imageSrc != ''" :src="imageSrc">
                <img v-else src="@/assets/images/common/320_199.jpg">
              </div>
              <div class="img_textwrap">
                <!-- 제목/본문 -->
                <div v-if="titAndDesc.useTitle" class="img_title" v-html="getStrVal(titAndDesc.title, '제목')"></div>
                <div v-if="titAndDesc.useDescription" class="img_contents" v-html="getStrVal(titAndDesc.description, '본문 내용')"></div>
                <!-- 상세 영역 -->
                <!-- 1) 썸네일형:세로 -->
                <div v-if="isVertical" class="thum_vertical_wrap">
                  <div v-for="(item, idx) in detail.list" :key="idx" class="thum_vertical">
                    <div class="thum_img">
                      <img v-if="item.fileSrc || item.fileUrl" :src="subImageSrc(idx)"> <!-- getSubImageSrc(idx) -->
                      <img v-else src="@/assets/images/tmplt/image_sample_thumnail_small.jpg">
                    </div>
                    <div class="thum_text" v-html="getStrVal(item.subDesc, `상세 ${idx + 1} 내용`)"></div>
                  </div>
                </div>
                <!-- 2) 썸네일형:가로 -->
                <div v-else class="thum_horizontal_wrap">
                  <div class="thum_horizontal">
                    <div v-for="(item, idx) in detail.list" :key="idx" class="thum_img">
                      <img v-if="item.fileSrc || item.fileUrl" :src="subImageSrc(idx)">
                      <img v-else src="@/assets/images/tmplt/image_sample_thumnail_small.jpg">
                    </div>
                  </div>
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
  name: 'ThumbnailEmulator',
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
    useButton() { return this.buttons.btnList.length > 0 },
    imageSrc() {
      return !comlib.isEmpty(this.mainImg.previewSrc) ? this.mainImg.previewSrc : ''
    },
    subImageSrc() {
      return (idx) => {
        let item = this.detail.list[idx]
        return !comlib.isEmpty(item.fileSrc) ? item.fileSrc : (!comlib.isEmpty(item.fileUrl) ? item.fileUrl : '')
      }
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
