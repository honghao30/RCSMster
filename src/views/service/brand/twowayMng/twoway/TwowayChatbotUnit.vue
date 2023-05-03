<template>
  <div>
    <div class="rcs_container service_wrap">
      <article id="content" class="content">
        <div class="box_breadcrumb">
          <breadcrumb :depth1MenuId="'M0200'" :depth2MenuId="'M0201'" :depth3MenuId="'양방향 대화방 관리'"/>
        </div>
        <brand-top active="twowayChat" :brandId="brandId"></brand-top>
        <div class="dashboard_wrap">
          <section class="section">
            <div class="title_area mar_b20 inline pad_b20 br_bottom">
              <h3 class="h3_title" v-html="procTitle" />
              <div v-html="procDesc"/>
            </div>
            <div v-if="ready" class="rcs_bundle_wrap new-emu_sticky dv2023_chatbot">
              <!-- 에뮬레이터 -->
              <ChatbotEmulator type="twoway" :isShowDefMsg="true" :brandId="brandId" :chatbot="wrtChatbotData"/>
              <!-- 작성 -->
              <TwowayChatbotWrite v-if="isNew || isWrite"
                :isNew="isNew"
                :isWrite="isWrite"
                :chatbotData="chatbotData"
                :wrtChatbotData.sync="wrtChatbotData"
                @goBack="goBack"/>
              <!-- 조회 -->
              <TwowayChatbotView v-else
                :chatbotData="chatbotData"
                :isWrite.sync="isWrite"
                @goBack="goBack"/>
              <!-- @refreshData="refreshData"/> -->
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
import TwowayChatbotWrite from '@/views/service/brand/twowayMng/twoway/TwowayChatbotWrite'
import TwowayChatbotView from '@/views/service/brand/twowayMng/twoway/TwowayChatbotView'
import { getTwowayInitialData, getTwowayChatbotDetail } from '@/api/service/chatbot'
export default {
  name: 'TwowayChatbotUnit',
  components: {
    Breadcrumb,
    BrandTop,
    TwowayChatbotWrite,
    TwowayChatbotView,
    ChatbotEmulator
  },
  props: {
    brandId: { type: String },
    chatbotId: { type: String, default: '' },
    subTitle: { type: String, default: '' },
    svcType: { type: String } // 양방향 대화방 타입(발신번호(a2p) or 대화방ID(chat))
  },
  data() {
    return {
      ready: false,
      isNew: false, // 신규 대화방 등록 여부
      isWrite: false, // 수정모드 여부
      procTitle: '',
      procDesc: '',
      chatbotData: null, // 원본 데이터
      wrtChatbotData: null, // 사용자 작성 데이터
      backComponent: null, // (발신번호 관리에서도 접근가능 하기 때문에, 어디에서 왔는지 기록)
      storageData: null
    }
  },
  /**
      - 양방향 대화방 목록 > 신규대화방생성, 기존대화방사용, 상세조회: TwowayChatbotList
      - 발신번호 관리 > 양방향 대화방 > 상세조회: SendNumList
      - 발신번호 관리 > 단방향 대화방 > 상세 > '양방향 대화방 전환: OnewayChatbotDetail
    */
  beforeRouteEnter (to, from, next) {
    next((vm) => { vm.backComponent = from.name })
  },
  mounted() {
    this.storageData = JSON.parse(localStorage.getItem('chatbot')) || {}
    /** 접근 case (routerName, chatbotId 유무)
        - 양방향 대화방 목록 > 신규 대화방 생성: 'TwowayChatbotUnit' x
        - 양방향 대화방 목록 > 기존 대화방 사용: TwowayChatbotUnit o
        - 양방향 대화방 목록 > 상세 조회:        TwowayChatbotDetail o
        - 발신번호 관리 > 양방향 대화방 > 상세조회: TwowayChatbotDetail o
        - 발신번호 관리 > 단방향 대화방 > 상세 > '양방향 대화방 전환: TwowayChatbotUnit o
    */
    if (!jglib.isEmpty(this.chatbotId) || !jglib.isEmpty(this.storageData.chatbotId)) {
      if (this.$route.name === 'TwowayChatbotDetail') { // 상세 조회한 경우
        this.isNew = false
        this.isWrite = false
      } else { // 기존 대화방을 양방향 대화방으로 전환하는 경우
        this.isNew = true
        this.isWrite = true
      }
      this.getChatbotDetail()
    } else {
      // 신규 등록
      this.isNew = true
      this.isWrite = false
      this.getInitData()
    }
  },
  methods: {
    // 양방향 대화방 초기 데이터 set
    getInitData() {
      let svcType = jglib.isEmpty(this.svcType) ? this.storageData.svcType : this.svcType
      let initData = getTwowayInitialData(svcType)
      this.chatbotData = _.cloneDeep(initData)
      this.wrtChatbotData = _.cloneDeep(initData)
      this.setTitleAndDesc()
    },
    /** 상세 조회 */
    getChatbotDetail() {
      let chatbotId = jglib.isEmpty(this.chatbotId) ? this.storageData.chatbotId : this.chatbotId
      let params = { chatbotId: chatbotId }
      getTwowayChatbotDetail(this.brandId, params).then(res => {
        if (res.code === '20000000') {
          let data = null
          let svcType = jglib.isEmpty(this.svcType) ? this.storageData.svcType : this.svcType
          if (svcType === 'a2p' && this.isWrite) { // 기존 발신번호 사용하여 양방향 등록하는 경우, 양방향 대화방 데이터 포맷에 맞춰서 데이터 set
            let initData = getTwowayInitialData(svcType)
            initData.chatbotId = chatbotId
            initData.service = svcType
            initData.subNum = chatbotId
            initData.subTitle = res.result.subTitle
            initData.inputFieldYn = res.result.inputFieldYn
            data = initData
          } else data = res.result
          this.chatbotData = JSON.parse(JSON.stringify(data))
          this.wrtChatbotData = JSON.parse(JSON.stringify(data))
          this.setTitleAndDesc()
        }
      }).catch((err) => {
        this.$alertMsg(err.desc).then(() => {})
      })
    },
    goBack() {
      let param = { brandId: this.brandId }
      if (jglib.isEmpty(this.backComponent)) this.backComponent = this.storageData.backComponent
      if (this.backComponent === 'OnewayChatbotDetail') {
        param.chatbotId = !jglib.isEmpty(this.chatbotId) ? this.chatbotId : this.storageData.chatbotId
      }
      this.$router.push({ name: this.backComponent, params: param })
    },
    setTitleAndDesc() {
      if (this.isNew) {
        if (this.isWrite) {
          if (this.backComponent === 'OnewayChatbotDetail') {
            this.procTitle = '양방향 대화방으로 전환'
            this.procDesc = '<ul class="bullet_list fs18"><li>발신번호로 생성된 단방향 대화방을 양방향으로 전환합니다.</li></ul>'
          } else {
            this.procTitle = '기존 대화방 사용'
            this.procDesc = '<ul class="bullet_list fs18"><li>등록된 발신번호를 기반으로 양방향 대화방 등록이 가능하며 RCS, 일반문자(SMS/MMS/LMS) 수신이 가능합니다.</li></ul>'
          }
        } else {
          this.procTitle = '양방향 대화방 생성 '
          this.procDesc = '<div><ul class="bullet_list fs18"><li>동일한 회신번호를 사용하여 여러 개의 대화방을 만들 수 있습니다.</li><li>RCS 문자만 수신 가능합니다.</li></ul></div>'
        }
      } else {
        let aprvRet = this.chatbotData.aprvRet
        let status = this.chatbotData.status
        let activeYn = this.chatbotData.activeYn
        switch (aprvRet) {
          case 'SAVED':
            this.procTitle = '임시저장'
            this.procDesc = '<div><ul class="bullet_list fs18"><li>임시저장 발신번호는 승인완료 되기 전까지 사용할 수 없습니다.</li></ul></div>'
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
