<template>
  <div>
    <div class="rcs_container service_wrap">
      <article id="content" class="content">
        <div class="box_breadcrumb">
          <breadcrumb :depth1MenuId="'M0200'" :depth2MenuId="'M0201'" :depth3MenuId="'자동응답 메시지'"/>
        </div>
        <brand-top active="autoReply" :brandId="brandId"></brand-top>
        <div class="dashboard_wrap">
          <section class="section">
            <div class="title_area mar_b20 inline pad_b20 br_bottom">
              <h3 class="h3_title" v-html="procTitle" />
              <div v-html="procDesc"/>
            </div>
            <div v-if="ready" class="rcs_bundle_wrap new-emu_sticky">
              <!-- 에뮬레이터 -->
              <ChatbotEmulator
                type="autoReply"
                :autoReplyMode="autoReplyMode"
                :autoReply="wrtAutoReply"
                :autoReplyTemplate="autoReplyTemplate"
                :autoReplySelectedCardIdx.sync="autoReplySelectedCardIdx"
                :isShowDefMsg="false"/>
              <!-- 작성/수정 화면 -->
              <AutoReplyWrite v-if="isNew || isWrite"
                :isNew="isNew" :isWrite="isWrite"
                :autoReply="autoReply"
                :wrtAutoReply.sync="wrtAutoReply"
                :autoReplyTemplate.sync="autoReplyTemplate"
                :autoReplySelectedCardIdx.sync="autoReplySelectedCardIdx"/>
              <!-- 조회 화면 -->
              <AutoReplyView v-else
                :isWrite.sync="isWrite"
                :autoReply="autoReply"
                :autoReplyTemplate="autoReplyTemplate"
                :autoReplySelectedCardIdx.sync="autoReplySelectedCardIdx"/>
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
import AutoReplyWrite from '@/views/service/brand/twowayMng/autoReply/AutoReplyWrite'
import AutoReplyView from '@/views/service/brand/twowayMng/autoReply/AutoReplyView'
import { getAutoReplyInitalData, retireveAutoReplyInfo, reformSuggestForView } from '@/api/service/autoReply'
export default {
  name: 'AutoReplyUnit',
  components: {
    Breadcrumb,
    BrandTop,
    ChatbotEmulator,
    AutoReplyWrite,
    AutoReplyView
  },
  props: {
    brandId: { type: String },
    armId: { type: String }
  },
  data() {
    return {
      ready: false,
      isNew: false,
      isWrite: false,
      procTitle: '',
      procDesc: '',
      autoReply: null, // 자동응답메시지 기본 정보
      wrtAutoReply: null, // 자동응답메시지 사용자 작성 정보
      autoReplyTemplate: null, // 자동응답메시지 상세 정보(카드 구성)
      autoReplySelectedCardIdx: 0 // 현재 선택된 자동응답메시지의 카드 index
    }
  },
  computed: {
    autoReplyMode() {
      return (this.isNew || this.isWrite) ? 'write' : 'view'
    }
  },
  watch: {
    isWrite() {
      if (this.isWrite) this.setTitleAndDesc()
    }
  },
  created() {
    this.isNew = jglib.isEmpty(this.armId)
  },
  mounted() {
    if (!this.isNew) this.getAutoReplyDetail()
    else this.getInitData()
  },
  methods: {
    /** 초기 데이터 set */
    getInitData() {
      this.autoReplyTemplate = {}
      let initData = getAutoReplyInitalData()
      this.autoReply = _.cloneDeep(initData)
      this.wrtAutoReply = _.cloneDeep(initData)
      this.setTitleAndDesc()
    },
    /** 상세 데이터 가져오기 */
    getAutoReplyDetail() {
      retireveAutoReplyInfo(this.brandId, this.armId).then(res => {
        this.autoReply = reformSuggestForView(this.brandId, res.result.autoReply, res.result.templateContent)
        this.wrtAutoReply = _.cloneDeep(this.autoReply)
        this.autoReplyTemplate = res.result.templateContent
        this.setTitleAndDesc()
      })
    },
    setTitleAndDesc() {
      if (this.isNew) this.procTitle = '자동응답 메시지 등록'
      else if (this.isWrite) this.procTitle = '자동응답 메시지 수정'
      else this.procTitle = this.autoReply.aprvRet === 'SAVED' ? '자동응답 메시지 임시저장' : '자동응답 메시지 상세'
      this.ready = true
    }
  }
}
</script>
