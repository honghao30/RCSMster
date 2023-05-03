<template>
  <div>
    <div class="rcs_container service_wrap">
      <article id="content" class="content">
        <div class="box_breadcrumb">
          <breadcrumb :depth1MenuId="'M0200'" :depth2MenuId="'M0201'" :depth3MenuId="'발신번호 관리'"/>
        </div>
        <brand-top active="sendnumMng" :brandId="brandId"></brand-top>
        <div class="dashboard_wrap">
          <section class="section">
            <div class="title_area mar_b20 inline pad_b20 br_bottom">
              <h3 class="h3_title" v-html="procTitle" />
              <div v-html="procDesc"/>
            </div>
            <div v-if="ready" class="rcs_bundle_wrap new-emu_sticky dv2023_chatbot">
              <!-- 에뮬레이터 -->
              <ChatbotEmulator type="oneway" :isShowDefMsg="true" :brandId="brandId" :chatbot="wrtChatbotData"/>
              <!-- 작성 -->
              <OnewayChatbotWrite v-if="isNew || isWrite"
                :isNew="isNew"
                :isWrite="isWrite"
                :chatbotData="chatbotData"
                :wrtChatbotData.sync="wrtChatbotData"/>
              <!-- 조회 -->
              <OnewayChatbotView v-else
                :isWrite.sync="isWrite"
                :chatbotData="chatbotData"/>
            </div>
          </section>
        </div>
      </article>
    </div>
  </div>
</template>

<script>

import Breadcrumb from '@/components/global/Breadcrumb'
import BrandTop from '@/views/service/components/BrandTop'
import ChatbotEmulator from '@/views/service/components/chatbot/ChatbotEmulator'
import OnewayChatbotWrite from '@/views/service/brand/sendnumMng/OnewayChatbotWrite'
import OnewayChatbotView from '@/views/service/brand/sendnumMng/OnewayChatbotView'
import { getOnewayInitialData, getChatbotDetail } from '@/api/service/chatbot'
export default {
  name: 'OnewayChatbotUnit',
  components: {
    BrandTop,
    Breadcrumb,
    OnewayChatbotWrite,
    OnewayChatbotView,
    ChatbotEmulator
  },
  props: {
    brandId: { type: String },
    chatbotId: { type: String }
  },
  data() {
    return {
      ready: false, // 데이터 로드 상태?
      isNew: false, // 신규 등록여부
      isWrite: false, // 수정 모드?
      procTitle: '',
      procDesc: '',
      chatbotData: null, // 상세 챗봇 데이터(원본)
      wrtChatbotData: null // 작성 챗봇 데이터(에뮬레이터, 사용자 수정시)
    }
  },
  watch: {
    isWrite() {
      if (this.isWrite) {
        this.procTitle = '수정(편집)'
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'TwowayChatbotUnit') {
      this.$store.dispatch('setChatbotInfo', { backComponent: from.name, chatbotId: to.params.chatbotId, svcType: to.params.svcType })
    }
    next()
  },
  created() {
    this.isNew = !this.chatbotId
    if (!this.isNew) this.getChatbotDetail(this.chatbotId)
    else this.getInitData()
  },
  methods: {
    getInitData() {
      let initData = getOnewayInitialData()
      this.chatbotData = _.cloneDeep(initData)
      this.wrtChatbotData = _.cloneDeep(initData)
      this.setTitleAndDesc()
    },
    getChatbotDetail(chatbotId) {
      let params = { chatbotId: chatbotId }
      getChatbotDetail(this.brandId, params).then(res => {
        this.chatbotData = JSON.parse(JSON.stringify(res.result))
        this.wrtChatbotData = JSON.parse(JSON.stringify(res.result))
        this.setTitleAndDesc()
      }).catch((err) => {
        this.$alertMsg(err.desc).then(() => {})
      })
    },
    setTitleAndDesc() {
      if (this.isNew) {
        this.procTitle = '발신번호 추가'
        this.procDesc = '<div><ul class="bullet_list fs18"><li>승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지체될 수 있습니다.</li></ul></div>'
      } else {
        let aprvRet = this.chatbotData.aprvRet
        let status = this.chatbotData.status
        let activeYn = this.chatbotData.activeYn
        switch (aprvRet) {
          case 'SAVED':
            this.procTitle = '발신번호 임시저장'
            this.procDesc = '<div><ul class="bullet_list fs18"><li>임시저장 발신번호는 승인 완료 되기 전까지 사용할 수 없습니다.</li></ul></div>'
            break
          case 'WAITING':
            this.procTitle = status === 'DEL_WAIT' ? '처리중(삭제)' : status === 'APRV_NEW' ? '신규 승인대기' : '수정 승인대기'
            this.procDesc = ''
            break
          case 'INSPECTING':
            this.procTitle = status === 'APRV_NEW' ? '신규 승인대기' : '수정 승인대기'
            this.procDesc = ''
            break
          case 'INSPECTED':
            this.procTitle = '처리중'
            this.procDesc = ''
            break
          case 'OK':
            this.procTitle = '승인완료'
            this.procDesc = ''
            break
          case 'REJECTED':
            this.procTitle = activeYn === 'N' ? '반려' : '반려(수정)'
            this.procDesc = ''
            break
        }
      }
      this.ready = true
    }
  }
}
</script>
