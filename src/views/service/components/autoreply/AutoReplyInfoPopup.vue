<template>
  <div class="rcs_container rbc_wrap">
    <div class="layer auto active">
      <div class="layer_cont dv2023_chat-list" style="margin-left:0; width:1060px;">
        <div class="layer_head">
          <div>
            <div class="title_wrap mar_b20">
              <span class="h4_title bold">자동응답 메시지 불러오기</span>
              <span class="h4_desc bold">등록된 자동응답 메시지를 기반으로 대화방 메뉴에 등록이 가능합니다.</span>
            </div>
            <!-- 검색영역 -->
            <div class="search_wrap">
              <div class="cont_flex_bundle mar_b30">
                <span class="custom_input">
                  <input type="text" placeholder="검색어를 입력해주세요." v-model="searchParam.inputValue" @keypress.enter="search">
                </span>
                <a href="javascript:void(0);" @click="search" class="btn sml gray"><span>검색</span></a>
              </div>
            </div>
          </div>
        </div>
        <div class="layer_body">
          <div class="layer_scroll scrollRow10">
            <div class="search_result">
              <table class="tbl_col_type" v-if="isLoad">
                <colgroup>
                  <col style="width:55px">
                  <col style="width:180px">
                  <col style="width:190px;">
                  <col style="width:191px">
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">자동응답 ID</th>
                    <th scope="col">자동응답 메시지 명</th>
                    <th scope="col">상품명</th>
                  </tr>
                </thead>
                <tbody v-if="autoReplyList.length > 0">
                  <tr v-for="(autoReply, idx) in autoReplyList" :key="idx" @click="selectAutoReply(autoReply.armId)">
                    <td>
                      <span class="custom_radio">
                        <input type="radio" :id="`radio_${idx}`" :checked="autoReply.armId == selectedArmId" @click="selectAutoReply(autoReply.armId)"/>
                        <label :for="`radio_${idx}`"></label>
                      </span>
                    </td>
                    <td>{{ autoReply.armId }}</td>
                    <td>{{ autoReply.name }}</td>
                    <td>{{ autoReply.tplNm }}</td>
                  </tr>
                </tbody>
                <tbody v-else>
                  <tr>
                    <td colspan="4">검색결과가 없습니다.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <Pagination v-if="totalCount > 0" :total="totalCount" :current-page.sync="searchParam.page" :pageSize="searchParam.size" @change="changePage"/>
          </div>
          <!-- 에뮬레이터 -->
          <ChatbotEmulator
            type="autoReply"
            :isShowDefMsg="false"
            :chatbot="defChatbot"
            :autoReply="autoReplyData"
            autoReplyMode="view"
            :autoReplyTemplate="autoReplyTemplate"/>
        </div>
        <div>
          <a href="javascript:void(0)" class="btn sml bd_black" @click="closePopup">취소</a>
          <a href="javascript:void(0)" class="btn sml black" @click="confirm">확인</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ChatbotEmulator from '@/views/service/components/chatbot/ChatbotEmulator'
import Pagination from '@/components/Pagination'
import { retireveAutoReplyList, retireveAutoReplyInfo, reformSuggestForView } from '@/api/service/autoReply'
export default {
  name: 'AutoReplyInfoPopup',
  components: {
    Pagination,
    ChatbotEmulator
  },
  props: {
    brandId: { type: String },
    armId: { type: String, default: '' }
  },
  data() {
    return {
      isLoad: false,
      totalCount: 0,
      originSearchParam: null,
      searchParam: {
        aprvRet: 'OK',
        inputValue: '',
        orderKey: 'MOD_DT ',
        orderValue: 'ASC',
        size: 7,
        page: 1
      },
      autoReplyList: null,
      autoReplyData: null,
      autoReplyTemplate: null,
      selectedArmId: '',
      defChatbot: { display: '01', subTitle: '', twowayYn: 'N', inputFieldYn: 'Y' } // 에뮬레이터 css 깨짐 현상으로 인한 임시 데이터
    }
  },
  created() {
    this.updateOriginSearchParam()
    this.getAutoReplyList()
  },
  methods: {
    getAutoReplyList() {
      retireveAutoReplyList(this.brandId, this.originSearchParam).then(res => {
        if (res.code === '20000000') {
          this.totalCount = res.result.totalSize
          this.autoReplyList = res.result.autoReplyList
          this.isLoad = true
        }
      }).catch(() => {})
    },
    search() {
      this.updatePageData(1)
      this.updateOriginSearchParam()
      this.getAutoReplyList()
    },
    selectAutoReply(armId) {
      this.selectedArmId = armId
      retireveAutoReplyInfo(this.brandId, armId).then(res => {
        this.autoReplyData = reformSuggestForView(this.brandId, res.result.autoReply, res.result.templateContent)
        this.autoReplyTemplate = res.result.templateContent
      })
    },
    changePage(page) {
      this.updatePageData(page)
      this.getAutoReplyList()
    },
    updatePageData(page) {
      this.searchParam.page = page
      this.originSearchParam.page = page
    },
    updateOriginSearchParam() {
      this.originSearchParam = _.cloneDeep(this.searchParam)
    },
    confirm() {
      if (jglib.isEmpty(this.selectedArmId)) this.$alertMsg('자동응답 메시지가 선택되지 않았습니다.')
      else {
        this.$emit('selectAutoReply', { armId: this.autoReplyData.armId, name: this.autoReplyData.name, type: 'select' })
        this.$emit('update:visible', false)
      }
    },
    closePopup() {
      this.$emit('close', { type: 'select' })
      this.$emit('update:visible', false)
    }
  }
}
</script>
