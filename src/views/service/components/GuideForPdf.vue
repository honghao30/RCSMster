<template>
  <div style="display: inline-block;" class="dv2023_guideforpdf" >
    <!-- 버튼 -->
    <a href="javascript:void(0);" @click="showPopup = true" class="btn sml bd_black type2">{{ btnName }}</a>
    <!-- 보여질 팝업 컴포넌트  -->
    <component v-if="showPopup" :is="popupName" :visible.sync="showPopup"></component>
  </div>
</template>

<script>
// pdf 변환 모듈 사용시 css 충돌로 인해 소스 별도 분리
import BrandGuide from '@/views/service/brand/brand/popup/BrandGuide'
import ChatbotSubTitleGuide from '@/views/service/brand/brand/popup/ChatbotSubTitleGuide'
export default {
  name: 'guideForPdf',
  components: {
    BrandGuide,
    ChatbotSubTitleGuide
  },
  props: {
    btnName: { // 버튼명
      type: String
    },
    popupName: { // 팝업 소스명
      type: String
    }
  },
  data() {
    return {
      showPopup: false
    }
  }
}
</script>
