<template>
  <div class="rcs_container rbc_wrap">
    <div class="layer auto active">
      <div class="layer_cont dv2023_auto-reply" style="margin-left:0; width:1380px; transform: translateX(-50%); top: 30px;">
        <div class="layer_head">
          <div>
            <div class="title_wrap mar_b20">
              <span class="h4_title bold">자동응답 메시지 작성하기</span>
              <span class="h4_desc bold">자동응답 메시지를 작성 후 등록이 가능합니다.</span>
            </div>
          </div>
        </div>
        <div class="layer_body new-emu_sticky">
          <ChatbotEmulator
            type="autoReply"
            :isShowDefMsg="false"
            :autoReply="wrtAutoReply"
            autoReplyMode="write"
            :autoReplyTemplate="autoReplyTemplate"
            :autoReplySelectedCardIdx.sync="autoReplySelectedCardIdx"/>
          <div class="layer_scroll scrollRow10">
            <AutoReplyWrite ref="autoreplyWrite"
              :isNew="true"
              :isImport="true"
              :wrtAutoReply.sync="wrtAutoReply"
              :autoReplyTemplate.sync="autoReplyTemplate"
              :autoReplySelectedCardIdx.sync="autoReplySelectedCardIdx"/>
          </div>
        </div>
        <div class="auto-reply-pop_botbtn">
          <a href="javascript:void(0)" class="btn sml bd_black" @click="closePopup">취소</a>
          <a href="javascript:void(0)" class="btn sml black" @click="register">등록</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChatbotEmulator from '@/views/service/components/chatbot/ChatbotEmulator'
import AutoReplyWrite from '@/views/service/brand/twowayMng/autoReply/AutoReplyWrite'
import { getAutoReplyInitalData, getAutoReplySubmitData, createAutoReply } from '@/api/service/autoReply'
export default {
  name: 'AutoReplyWritePopup',
  components: {
    ChatbotEmulator,
    AutoReplyWrite
  },
  props: {
    brandId: { type: String }
  },
  data() {
    return {
      wrtAutoReply: null, // 자동응답메시지 사용자 작성 정보
      autoReplyTemplate: null, // 자동응답메시지 상세 정보(카드 구성)
      autoReplySelectedCardIdx: 0
    }
  },
  computed: {
    productType() {
      if (this.autoReplyTemplate.cardType === 'CR' || this.autoReplyTemplate.cardType === 'CS') return 'carousel'
      else if (this.autoReplyTemplate.cardType === 'SM') return 'standaloneMedia'
      else return 'standalone'
    }
  },
  created() {
    this.getInitData()
  },
  methods: {
    getInitData() {
      this.autoReplyTemplate = {}
      let initData = getAutoReplyInitalData()
      this.wrtAutoReply = _.cloneDeep(initData)
    },
    /** 자동응답 메시지 등록  */
    async register() {
      if (await this.$refs.autoreplyWrite.validation()) {
        // 안내메시지?
        this.wrtAutoReply.status = 'APRV_NEW'
        this.wrtAutoReply.aprvRet = 'WAITING'
        let data = getAutoReplySubmitData(this.brandId, this.productType, this.wrtAutoReply, this.autoReplyTemplate)
        createAutoReply(this.brandId, data).then(res => {
          if (res.code === '20000000') {
            this.$emit('success', { armId: res.result, name: this.wrtAutoReply.name, type: 'write' })
            this.$emit('update:visible', false)
          }
        })
      }
    },
    /** 팝업 닫기 */
    closePopup() {
      this.$emit('close', { type: 'write' })
      this.$emit('update:visible', false)
    }
  }
}
</script>
