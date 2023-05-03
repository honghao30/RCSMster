<template>
  <div class="rcs_container service_wrap" v-if="visibleChatBotPop">
    <div tabindex="0" class="layer active">
      <div tabindex="0" class="layer_cont">
        <div class="title_wrap mar_b20">
          <span class="h4_desc bold">사용하실 양방향 대화방 중계사를 선택해주세요.</span>
        </div>
        <div class="layer_head">
          <div class="search_wrap">
            <div class="cont_flex_bundle">
              <span class="custom_input">
                <input
                  type="text"
                  v-model="keyword"
                  @keypress.enter="search"
                  placeholder="중계사명을 검색하세요."
                >
              </span>
              <a href="javascript:void(0);" class="btn sml gray" @click="search">
                <span>검색</span>
              </a>
            </div>
          </div>
        </div>
        <div class="layer_body" v-if="chatBotList.length !== 0">
          <div class="layer_scroll scrollRow10">
            <div class="search_result">
              <!-- 검색 결과-->
              <table class="tbl_col_type">
                <colgroup>
                  <col style="width:45px">
                  <col style="width:auto">
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">양방향 대화방 중계사</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- 길어서 주석처리 -->
                  <tr v-for="(item, index) in chatBotList" :key="index">
                    <td>
                      <span class="custom_radio single">
                        <input
                          type="radio"
                          name="radio"
                          @change="selectChatBot(item.agencyId, item.relayAgId, item.agencyNm, item.webhookUrl)"
                          :id="`radio_${item.relayAgId}`"
                        >
                        <label :for="`radio_${item.relayAgId}`"></label>
                      </span>
                    </td>
                    <td>
                      <label :for="`radio_${item.relayAgId}`">{{item.agencyNm}}</label>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="layer_foot">
          <div class="box_result_info center" v-if="chatBotList.length === 0">
            <p>검색 결과가 없습니다.</p>
          </div>
          <div class="btn_wrap mar_t30">
            <a href="javascript:void(0);" class="btn sml bd_black type2" @click="cancel">
              <span>닫기</span>
            </a>
            <a href="javascript:void(0);" class="btn sml black" @click="modifyChatBot">
              <span>확인</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { retrieveChatBotList } from '@/api/service/approvalBrand'

export default {
  name: 'ApprovalBrandCallingChatBotPopup',
  data() {
    return {
      selectedRelayAgId: '',
      selectedRelayAgNm: '',
      selectedWebhookUrl: '',
      selectedAgencyId: '',
      keyword: '',
      chatBotList: [],
      rcsReply: ''
    }
  },
  props: {
    visibleChatBotPop: {
      type: Boolean
    },
    brandId: {
      type: String
    },
    twoWayType: {
      type: String
    },
    corpId: {
      type: String
    },
    isUpdate: {
      type: String
    }
  },
  created() {
    this.getChatBotList()
  },
  mounted() {},
  computed: {},
  methods: {
    getChatBotList(keyword) {
      let reqData = {
        brandId: this.brandId,
        keyword: keyword,
        isTwoWay: 'Y',
        twoWayYn: this.twoWayType === 'a2p' ? 'N' : '',
        corpId: this.corpId,
        isUpdate: this.isUpdate
      }
      retrieveChatBotList(reqData).then(res => {
        this.chatBotList = res.result
      })
    },
    search() {
      this.getChatBotList(this.keyword)
    },
    selectChatBot(agencyId, relayAgId, relayAgNm, webhookUrl) {
      this.selectedWebhookUrl = webhookUrl
      this.selectedRelayAgId = relayAgId
      this.selectedRelayAgNm = relayAgNm
      this.selectedAgencyId = agencyId
    },
    modifyChatBot() {
      if (jglib.isEmpty(this.selectedRelayAgId)) {
        this.$alertMsg('중계사를 선택해 주세요.')
        return false
      }
      this.sendChatBot()
    },
    sendChatBot() {
      this.$emit('relayAgId', this.selectedAgencyId, this.selectedRelayAgId)
      this.$emit('relayAgNm', this.selectedRelayAgNm)
      this.$emit('relayWebhookUrl', this.selectedWebhookUrl)
      this.$emit('update:visibleChatBotPop', false)
    },
    cancel() {
      this.$emit('update:visibleChatBotPop', false)
    }
  }
}
</script>

<style lang="less" scoped></style>
