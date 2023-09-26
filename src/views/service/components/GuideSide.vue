<template>
  <div class="side__item">
    <ButtonCmp
      type="btn-blue-line"
      class="item-btn"
      @click="downloadGuide"
    >RBC 이용 가이드 다운로드</ButtonCmp>
    <div class="side__banner">
      <div class="banner__info">
        <div class="text__warp">
          <p class="side-title">RCS 발송 규격과<br/>API 연동 정보를 알고 싶으신가요?</p>
        </div>
        <div class="btn__warp">
          <router-link to="/TechnicalSupport" class="side-btn">기술지원 보러가기</router-link>
        </div>
      </div>
    </div>
    <div class="side__banner btn-banner">
      <div class="text__warp">
        <p class="side-title">다양한 RCS 기업 메시지</p>
        <p class="side-text">종류별로 베스트 샘플을 모아보았습니다.<br/>확인해 보시겠어요?</p>
      </div>
      <div class="btn__warp">
        <ButtonCmp
          type="btn-blue-line"
          size="medium"
          @click="guideSampleMsg"
        >메시지 샘플 보기</ButtonCmp>
      </div>
    </div>
    <div class="side__banner">
      <div class="banner__info">
        <div class="text__warp">
          <p class="side-title">양방향 대행사<br/>필요하지 않으세요?</p>
          <p class="side-text">고객과 더 가깝게 소통할 수 있어요.</p>
        </div>
        <div class="btn__warp">
          <router-link to="/partnerInfo" class="side-btn">양방향 대행사 보러가기</router-link>
        </div>
      </div>
      <div class="side-img"></div>
    </div>
    <ModalView
      v-if="isModalViewed"
      @closeModal="isModalViewed = false"
    >
      <GuideSampleMsg
        v-if="isSamlpeMsg"
        @closeModal="isModalViewed = false"
        modalsize="Max1080"
        class="only-pc"
      >
      </GuideSampleMsg>
    </ModalView>
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import { downloadFileDirect } from '@/api/common/code'
import ModalView from '@/components/common/ModalView.vue'
import GuideSampleMsg from '@/views/service/components/GuideSampleMsg.vue'

export default {
  components: {
    ButtonCmp,
    ModalView,
    GuideSampleMsg
  },
  data () {
    return {
      isModalViewed: false,
      isSamlpeMsg: false
    }
  },
  methods: {
    // TODO: 일단 대화방 가이드 연결 해두었음 실제 가이드 나오면 fileNo 와 FileName 변경
    downloadGuide() {
      let param = {
        fileName: 'RBC 이용 가이드 다운로드.pdf',
        fileNo: 6
      }
      downloadFileDirect(param)
        .then(() => { })
        .catch(() => {
          this.$alertMsg('파일 다운로드 시 오류가 발생했습니다.')
        })
    },
    guideSampleMsg () {
      this.isModalViewed = true
      this.isSamlpeMsg = true
    }
  }
}
</script>
