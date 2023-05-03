<template>
  <div class="rcs_container service_wrap">
    <div tabindex="0" class="layer layer_mid active">
      <div tabindex="0" class="layer_cont brand_create_guide">
        <div class="brand_create_guide_wrap">
          <div class="guide_down" style="text-align: left;">
            <span class="h4_title bold">대화방 명 가이드</span>
            <span class="h4_desc bold">- '대화방 명 안내 내려받기' 버튼을 클릭하시면 가이드를 내려받을 수 있습니다.</span>
            <a href="javascript:void(0)" class="btn sml black" @click="downloadGuide">대화방 명 안내 내려받기</a>
          </div>
          <div class="guide_scr" style="height: 600px;">
            <vue-pdf-app pdf="/ChatbotSubTitleGuide.pdf" :config="config" :pageNumber="1" pageScale="page-width" theme="light" @open="openHandler" @pages-rendered="loadComplete"></vue-pdf-app>
          </div>
          <div class="btn_wrap right full_width">
            <a href="javascript:void(0);" class="btn sml bd_black" @click="closePopup"><span>닫기</span></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '@/store'
// import VuePdfApp from 'vue-pdf-app'
import { downloadFileDirect } from '@/api/common/code'
export default {
  components: {
    // VuePdfApp
    'vue-pdf-app': () => ({
      component: new Promise((resolve) => {
        return setTimeout(() => resolve(import(/* webpackChunkName: "pdf-viewer" */ 'vue-pdf-app')), 2000)
      })
    })
  },
  data() {
    return {
      config: {
        toolbar: false
      }
    }
  },
  created() {
    store.dispatch('SetLoading', true)
  },
  methods: {
    openHandler() {
      let pages = document.getElementsByClassName('page')
      pages.forEach(page => { page.style.border = '0px' })
    },
    loadComplete() {
      store.dispatch('SetLoading', false)
    },
    closePopup() {
      this.$emit('update:visible', false)
    },
    downloadGuide() {
      let param = {
        fileName: '대화방 명 안내.pdf',
        fileNo: 6
      }
      downloadFileDirect(param)
        .then(() => {})
        .catch(() => {
          this.$alertMsg('파일 다운로드 시 오류가 발생했습니다.')
        })
    }
  }
}
</script>
<style scoped>
.guide_scr .pdf-app {
  background: #ffffff;
}

.pdf-app #loadingBar {
  display: none;
}
</style>
