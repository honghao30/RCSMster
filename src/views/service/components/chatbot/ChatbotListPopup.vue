<template>
  <div class="rcs_container rbc_wrap">
    <div class="layer auto active">
      <div class="layer_cont dv2023_chat-list">
        <div class="layer_head">
          <div class="rcs_emul_form_wrap">
            <div class="title_wrap mar_b20">
              <span class="h4_title bold">{{ title }}</span>
              <span class="h4_desc bold">{{ desc }}</span>
            </div>
            <!-- 검색영역 -->
            <div class="search_wrap">
              <div class="cont_flex_bundle mar_b30">
                <span class="custom_select">
                  <select v-model="searchParam.display">
                    <option value>전체</option>
                    <option value="01">전시</option>
                    <option value="00">비전시</option>
                  </select>
                </span>
                <span class="custom_input">
                  <input type="text" placeholder="검색어를 입력해주세요." v-model="searchParam.searchValue" @keypress.enter="search">
                </span>
                <a href="javascript:void(0);" @click="search" class="btn sml gray"><span>검색</span></a>
              </div>
            </div>
          </div>
        </div>
        <div class="layer_body">
          <div class="search_result">
            <table class="tbl_col_type" v-if="isLoad">
              <colgroup>
                <col style="width:52px">
                <col style="width:208px">
                <col style="width:228px">
              </colgroup>
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">
                    {{ type === 'oneway' ? '발신번호' : '발신번호 / 챗봇ID' }}
                    <div class="btn_align">
                      <button class="btn_align_top" type="button" @click.stop="onSorting({ orderKey:  type === 'oneway' ? 'MDN' : 'CHATBOT_ID', orderValue: 'ASC' })"></button>
                      <button class="btn_align_bottom" type="button" @click.stop="onSorting({ orderKey:  type === 'oneway' ? 'MDN' : 'CHATBOT_ID', orderValue: 'DESC' })"></button>
                    </div>
                  </th>
                  <th scope="col">
                    대화방 명
                    <div class="btn_align">
                      <button class="btn_align_top" type="button" @click.stop="onSorting({ orderKey: 'SUB_TITLE', orderValue: 'ASC' })"></button>
                      <button class="btn_align_bottom" type="button" @click.stop="onSorting({ orderKey: 'SUB_TITLE', orderValue: 'DESC' })"></button>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody v-if="chatbotList.length > 0">
                <tr v-for="(chatbot, idx) in chatbotList" :key="idx" @click="chagneSelection(chatbot)">
                  <td>
                    <span v-if="type === 'oneway'" class="custom_radio">
                      <input type="radio" name="mdn" :id="`radio_${idx}`" :value="chatbot.mdn" :checked="chatbot.mdn === selectedChatbotId" @change="chagneSelection(chatbot)">
                      <label :for="`radio_${idx}`"></label>
                    </span>
                    <span v-else class="custom_radio">
                      <input type="radio" name="chatbotId" :id="`radio_${idx}`" :value="chatbot.chatbotId" :checked="chatbot.chatbotId === selectedChatbotId" @change="chagneSelection(chatbot)">
                      <label :for="`radio_${idx}`"></label>
                    </span>
                  </td>
                  <td>{{ chatbot.service === 'chat' ? chatbot.chatbotId : chatbot.mdn }} <span style="color: #999999;">{{ chatbot.display === '00' ? '[비전시]' : '' }}</span></td>
                  <td>{{ chatbot.subTitle }}</td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="3">검색결과가 없습니다.</td>
                </tr>
              </tbody>
            </table>
            <Pagination v-if="type === 'oneway' && totalCount > 0" :total="totalCount" :pageSize="searchParam.size" :currentPage.sync="searchParam.page" @change="changePage"></Pagination>
            <Pagination v-if="type.includes('twoway') && totalCount > 0" :total="totalCount" :pageSize="size" :currentPage.sync="page" @change="changeTwPage"></Pagination>
          </div>
          <!-- 에뮬레이터 -->
          <ChatbotEmulator
            :type="emulType"
            :isShowDefMsg="false"
            :brandId="brandId"
            :chatbot="chatbotData"/>
        </div>
        <div>
          <a href="javascript:void(0)" class="btn sml bd_black" @click="closePopup">취소</a>
          <a href="javascript:void(0)" class="btn sml black" @click="confirm">확인</a>
          <!-- <a href="javascript:void(0)" class="btn sml" @click="confirm" :style="selectedChatbotId !== '' ? '' : 'cursor: not-allowed'" :class="selectedChatbotId !== '' ? 'black' : 'bd_gray disabled'">확인</a> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import ChatbotEmulator from '@/views/service/components/chatbot/ChatbotEmulator'
import { getOnewayChatbotList, getTwowayChatbotList } from '@/api/service/chatbot'
import { getPersistentList } from '@/api/service/persistentMenu'
export default {
  name: 'ChatbotListPopup',
  components: {
    Pagination,
    ChatbotEmulator
  },
  props: {
    type: { type: String }, // 'oneway', 'twoway'
    visible: { type: Boolean },
    brandId: { type: String, default: '' },
    title: { type: String },
    desc: { type: String }
  },
  data() {
    return {
      isLoad: false,
      totalCount: 0,
      originSearchParam: null,
      searchParam: {
        display: '',
        searchKey: '',
        searchValue: '',
        orderKey: '',
        orderValue: 'DESC',
        size: 7,
        page: 1
      },
      /** 양방향 일 경우 */
      page: 1,
      size: 7,
      allChatbotList: [],
      chatbotList: [], // 발신번호 목록 (양방향 대화방 으로 사용되는것은 제외)
      chatbotData: {
        twowayYn: '',
        mdn: '',
        subNum: '',
        chatbotId: '',
        subTitle: '',
        service: '',
        inputFieldYn: ''
      },
      selectedChatbotId: ''
    }
  },
  computed: {
    emulType() {
      return this.type === 'oneway' ? 'oneway' : 'twoway'
    }
  },
  created() {
    this.updateOriginSearchParam()
    this.getList()
  },
  methods: {
    search() {
      this.updatePageData(1)
      this.updateOriginSearchParam()
      this.getList()
    },
    getList() {
      if (this.type === 'oneway') this.getOnewayChatbotList()
      else this.getTwowayChatbotList()
    },
    /** 단방향대화방 목록 */
    getOnewayChatbotList() {
      let params = { keyword: this.originSearchParam.searchValue, twoWayType: 'a2p', ...this.originSearchParam }
      getOnewayChatbotList(this.brandId, params).then(res => {
        if (res.code === '20000000') {
          this.chatbotList = res.result.list
          this.totalCount = res.result.totalSize
          this.isLoad = true
        }
      })
    },
    /** 양방향 대화방 */
    /*
      - 대화방 메뉴: 대화방 메뉴가 없는 양방향 대화방 전체 목록(type:'twowayHasNoPsmenu')
      - 자동응답: 대화방 메뉴가 있는 양방향 대화방 목록(type:'twowayHasPsmenu')
    */
    getTwowayChatbotList() {
      this.originSearchParam.size = 99999
      getTwowayChatbotList(this.brandId, { aprvStatus: 'OK', isTwoWay: 'Y', ...this.originSearchParam }).then(async res => {
        if (res.code === '20000000') {
          // 1. 승인완료 상태의 양방향 대화방
          let activeTwowayList = res.result.list
          // 2. 대화망 메뉴 목록
          let res2 = await getPersistentList(this.brandId, { psMenuYn: '', psMenuStatus: '', searchValue: '', orderKey: 'MOD_DT', orderValue: 'ASC', size: 99999, page: 1 })
          let psMenuChatbots = res2.result.list.map(x => x.chatbotId) // * 대화방을 가지고 있는 양방향 대화방의 chatbot 목록
          let hasPsMenu = this.type === 'twowayHasPsmenu'
          if (hasPsMenu) { // 대화방 메뉴가 있음
            let hasPsMenuList = activeTwowayList.filter(x => psMenuChatbots.includes(x.chatbotId))
            this.allChatbotList = hasPsMenuList
          } else { // 대화방 메뉴가 없음
            let hasNoPsMenuList = activeTwowayList.filter(x => !psMenuChatbots.includes(x.chatbotId))
            this.allChatbotList = hasNoPsMenuList
          }
          this.totalCount = this.allChatbotList.length
          this.changeTwPage(1)
          this.isLoad = true
        }
      })
    },
    /** 선택된 값 변경시 emulator에 바인딩 되는 데이터 set */
    chagneSelection(data) {
      let isTwoway = !jglib.isEmpty(data.service)
      this.selectedChatbotId = isTwoway ? data.chatbotId : data.mdn
      this.chatbotData.twowayYn = isTwoway ? 'Y' : 'N'
      this.chatbotData.chatbotId = isTwoway ? data.chatbotId : data.mdn
      this.chatbotData.mdn = data.mdn
      this.chatbotData.subNum = data.mdn
      this.chatbotData.subTitle = data.subTitle
      this.chatbotData.service = data.service || ''
      this.chatbotData.inputFieldYn = data.inputFieldYn
      this.chatbotData.rcsReply = data.rcsReply
    },
    closePopup() {
      this.$emit('update:visible', false)
    },
    confirm() {
      let msg
      if (this.type === 'oneway') msg = '번호가 선택되지 않았습니다.'
      else if (this.type === 'twowayHasNoPsmenu') msg = '대화방 또는 발신번호가 선택되지 않았습니다.'
      else msg = '양방향 대화방을 선택하세요.'
      if (jglib.isEmpty(this.selectedChatbotId)) this.$alertMsg(msg)
      else if (this.type === 'oneway' && this.chatbotData.rcsReply === '0') {
        this.$confirmMsg('선택하신 발신번호는 대표번호 문자수신서비스를 사용 중입니다. 양방향 대화방을 등록할 경우, 대표번호 문자수신 서비스는 사용할 수 없습니다.<br>양방향 대화방 등록을 계속 진행하시겠습니까?')
          .then(() => this.$emit('selectChatbot', this.chatbotData))
      } else this.$emit('selectChatbot', this.chatbotData)
    },
    onSorting({ orderValue, orderKey }) {
      if (!jglib.isEmpty(orderKey)) this.searchParam.orderKey = orderKey
      if (!jglib.isEmpty(orderValue)) this.searchParam.orderValue = orderValue
      this.search()
    },
    updatePageData(page) {
      this.searchParam.page = page
      this.originSearchParam.page = page
    },
    updateOriginSearchParam() {
      this.originSearchParam = _.cloneDeep(this.searchParam)
    },
    /** 양방향 대화방 목록의 페이지 변경 */
    changeTwPage(page) {
      let begin = (page - 1) * this.size
      let end = page * this.size
      this.chatbotList = this.allChatbotList.slice(begin, end)
    },
    /** 페이지 변경 */
    changePage(page) {
      this.updatePageData(page)
      this.getList()
    }
  }
}
</script>
