<template>
  <div class="rcs_container service_wrap">
    <article id="content" class="content">
      <div class="box_breadcrumb">
        <breadcrumb :depth1MenuId="'M0200'" :depth2MenuId="'M0201'" :depth3MenuId="'양방향 대화방'"/>
      </div>
      <brand-top active="twowayChat" :brandId="brandId"></brand-top>
      <div class="contents_wrap">
        <section v-if="ready" class="section mar_b0">
          <div class="sec_header">
            <div class="cont_flex_bundle mar_b30">
              <div class="title_area">
                <h3 class="h3_title">양방향 대화방</h3>
              </div>
            </div>
            <div class="cont_flex_bundle">
              <ul class="bullet_list fs18 mar_b30 col_8">
                <li>단말 사용자의 요청에 대해 기업에서 실시간으로 응답할 수 있는 대화방입니다.</li>
                <li>양방향 대화방을 사용하기 위해서는 대행사가 사전에 계약되어야 합니다.</li>
              </ul>
              <div class="btn_wrap right relative mar_b30 col_4">
                <a href="javascript:void(0);" class="btn sml bd_black type2" @click="addTwoWayChatbot('a2p')">기존 대화방 사용</a>
                <a href="javascript:void(0);" class="btn sml bd_black type2" @click="addTwoWayChatbot('chat')">신규 대화방 생성</a>
                <a href="javascript:void(0);" class="dv2023_extrabtn" @click="showTwowayRegistrationPopup = true">양방향 대화방 등록절차 안내</a>
              </div>
            </div>
            <!-- 검색 영역 -->
            <div v-if="hasTwowayChatbot" class="box_search_area mar_b30">
              <div class="cont_flex_bundle">
                <span class="custom_select mid col_3">
                  <select v-model="searchParam.searchKey">
                    <option value>유형 전체</option>
                    <option value="a2p">발신번호</option>
                    <option value="chat">챗봇ID</option>
                    <option value="SUB_NUM">회신번호</option>
                  </select>
                </span>
                <span class="custom_select mid col_3">
                  <select v-model="searchParam.aprvStatus">
                    <option value>상태 전체</option>
                    <option v-for="item in statusList" :value="item.code" :key="item.code">{{item.codeNm}}</option>
                  </select>
                </span>
                <div class="filter_bundle col_8">
                  <span class="custom_input mid mar_l12 col_11 search">
                    <input type="text" placeholder="검색어 입력" @keypress.enter="findSearch" v-model="searchParam.searchValue">
                  </span>
                  <a href="javascript:void(0);" class="btn mid gray col_1" @click="findSearch"><span>검색</span></a>
                </div>
              </div>
            </div>
          </div>
          <template v-if="hasTwowayChatbot">
            <!-- 결과 영역 -->
            <div class="search_result">
              <div class="cont_flex_bundle">
                <div class="total_area eft col_6">
                  <span class="total_count">
                    총 <strong class="count">{{ totalCount }}</strong> 건
                  </span>
                  <span class="custom_select sml">
                      <select v-model="searchParam.size" @change="changeSize">
                        <option value="20">20개</option>
                        <option value="50">50개</option>
                        <option value="100">100개</option>
                      </select>
                  </span>
                </div>
                <div class="btn_wrap right col_6">
                  <span class="group dv2023_exhibitbtn">
                    <a href="javascript:void(0);" style="width:100px" :style="disableDisplayBtnStyle" class="btn sml type2" :class="disableDisplayBtnClass" @click="updateDisplay('exhibit')"><span>전시</span></a>
                    <a href="javascript:void(0);" style="width:100px" :style="disableDisplayBtnStyle" class="btn sml type2" :class="disableDisplayBtnClass" @click="updateDisplay('nonExhibit')"><span>비전시</span></a>
                    <a href="javascript:void(0);" style="width:100px" :style="disableBtnStyle" class="btn sml type2" :class="disableBtnClass" @click="remove"><span>삭제</span></a>
                    <a href="javascript:void(0);" style="width:120px" :style="disableConvertBtnStyle" class="btn sml type2" :class="disableConvertBtnClass" @click="convertOneway"><span>단방향 전환</span></a>
                  </span>
                </div>
              </div>
              <div class="box_scroll mar_t20">
                <div class="tbl_sorting_wrap dv2023_chat-view">
                  <el-table :data="twowayChatbotList" empty-text="검색 결과가 없습니다." @sort-change="handleSortChange" style="width: 100%" :class="{'el-table--enable-row-transition': twowayChatbotList.length >= 100}">
                    <el-table-column width="52">
                      <template slot="header">
                        <el-checkbox ref="chk_all" :disabled="checkableList.length < 0 || isOnewayAgency" @change="checkAll"></el-checkbox>
                      </template>
                      <template slot-scope="scope">
                        <el-checkbox :ref="'chk_' + scope.row.chatbotId" :disabled="scope.row.disable" @change="checkItem($event, scope.row.chatbotId)"></el-checkbox>
                      </template>
                    </el-table-column>
                    <el-table-column prop="modDt" label="등록일(수정일)" width="172" sortable="custom">
                      <template slot-scope="scope">
                        <span>{{ !scope.row.modDt ? scope.row.regDt : scope.row.modDt }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="subTitle" label="대화방명" width="auto" sortable="custom">
                      <template slot-scope="scope">
                        <a href="javascript:void(0)" class="btn_text" :title="scope.row.subTitle" @click="goDetail(scope.row.chatbotId, scope.row.service)">{{ scope.row.subTitle }}</a>
                      </template>
                    </el-table-column>
                    <el-table-column prop="chatbotId" label="발신번호/챗봇ID" width="232">
                      <template slot-scope="scope">
                        <span>
                          <a href="javascript:void(0)" class="btn_text" @click="goDetail(scope.row.chatbotId, scope.row.service)">{{ scope.row.chatbotId }}</a>
                        </span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="subNum" label="회신번호" width="160">
                      <template slot-scope="scope">
                        <span>{{ scope.row.subNum || '-' }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="psMenuYn" label="대화방 메뉴" width="128">
                      <template slot-scope="scope">
                        <span>{{ scope.row.psMenuYn === 'Y' ? '사용' : '미사용' }}</span>
                      </template>
                    </el-table-column>
                    <!-- 한번도 승인을 받지않은 데이터의 경우, 전시 상태는 '-'로 표기한다. -->
                    <el-table-column prop="display" label="전시상태" width="128">
                      <template slot-scope="scope">
                        <span>{{ scope.row.activeYn === 'N' ? '-' : (scope.row.display.substring(1, 2) === '0' ? '비전시' : '전시') }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="regUserNm" label="등록자" width="128"></el-table-column>
                    <el-table-column prop="aprvRet" label="상태" width="100">
                      <template slot-scope="scope">
                        <span class="status" :class="{ 'accept': scope.row.aprvRet === 'OK', 'refusal': scope.row.aprvRet === 'REJECTED', 'saved': scope.row.aprvRet === 'SAVED' }">
                          {{ getDisplayAprvNm2(scope.row) }}
                        </span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="dv2023_twoway-reg-wrap">
              <TwowayRegistrationInfo @openAgencyInfoPopup="showAgencyInfoPopup = true"></TwowayRegistrationInfo>
            </div>
          </template>
            <Pagination v-if="totalCount > 0 && hasTwowayChatbot" :total="totalCount" :current-page.sync="searchParam.page" :pageSize="searchParam.size" @change="changePage"/>
        </section>
      </div>
      <!-- 양방향 대화방 등록 절차 안내 팝업 -->
      <TwowayRegistrationInfoPopup v-if="showTwowayRegistrationPopup" :visible.sync="showTwowayRegistrationPopup" :showAgencyInfoPopup.sync="showAgencyInfoPopup"></TwowayRegistrationInfoPopup>
      <!-- 대행사 안내  -->
      <AgencyInfoPopup v-if="showAgencyInfoPopup" :visible.sync="showAgencyInfoPopup"></AgencyInfoPopup>
      <!-- 비밀번호 입력창 -->
      <user-password-auth-popup v-if="showUserAuthPopup" :visible.sync="showUserAuthPopup" @success="verifySuccessForRemove"></user-password-auth-popup>
      <!-- 삭제, 비전시: 회신번호로 설정된 번호의 경우 알림  / 전시: 회신번호가 비전시 상태인 경우 알림 -->
      <ChatbotSubNumResultPopup v-if="showSubNumResultPopup" :visible.sync="showSubNumResultPopup" :type="subNumPopupType" :data="subNumList" @success="callbackBySubNumResultPopup"></ChatbotSubNumResultPopup>
      <!-- 기존 대화방 -> 양방향 대화방 선택 -->
      <chatbot-list-popup v-if="showChatbotListPopup"
        title="기존 대화방 사용" desc="등록된 발신번호를 기반으로 양방향 대화방 등록이 가능하며, RCS, 일반문자(SMS/MMS/LMS) 수신이 가능합니다."
        type="oneway"
        :visible.sync="showChatbotListPopup"
        :brandId="brandId"
        @selectChatbot="goRegister">
      </chatbot-list-popup>
    </article>
  </div>
</template>

<script>
import BrandTop from '@/views/service/components/BrandTop'
import Breadcrumb from '@/components/global/Breadcrumb'
import Pagination from '@/components/Pagination'
import AgencyInfoPopup from '@/views/service/components/chatbot/AgencyInfoPopup'
import ChatbotListPopup from '@/views/service/components/chatbot/ChatbotListPopup'
import UserPasswordAuthPopup from '@/views/service/components/chatbot/UserPasswordAuthPopup'
import ChatbotSubNumResultPopup from '@/views/service/components/chatbot/ChatbotSubNumResultPopup'
import TwowayRegistrationInfo from '@/views/service/components/chatbot/TwowayRegistrationInfo'
import TwowayRegistrationInfoPopup from '@/views/service/components/chatbot/TwowayRegistrationInfoPopup'
import { getDisplayAprvNm2 } from '@/utils/string'
import { retrieveCommonCode } from '@/api/common/code'
import { isAvailableRegisterTwoway, getTwowayChatbotList, updateChatbotInfo, deleteChatbots, getActiveA2pChatbotCnt, getActiveAndDisplayA2pChatbotCnt, filteringSubNumChatbots } from '@/api/service/chatbot'
export default {
  name: 'TwowayChatbotList',
  components: {
    BrandTop,
    Breadcrumb,
    Pagination,
    AgencyInfoPopup,
    ChatbotListPopup,
    UserPasswordAuthPopup,
    ChatbotSubNumResultPopup,
    TwowayRegistrationInfo,
    TwowayRegistrationInfoPopup
  },
  data() {
    return {
      ready: false,
      hasTwowayChatbot: false, // 양방향 대화방 존재 유무
      statusList: [],
      totalCount: 0,
      originSearchParam: null,
      searchParam: {
        group: 'TwowayChatbotList',
        service: '',
        aprvStatus: '',
        searchKey: '', // 유형 필터(a2p, chat, SUB_NUM)
        searchValue: '',
        orderKey: 'REG_DT',
        orderValue: 'DESC',
        size: 20,
        page: 1,
        isTwoWay: 'Y'
      },
      brandId: '',
      twowayChatbotList: [],
      checkedList: [], // 선택된 양방향 대화방 목록
      isAvailableRegister: false, // 양방향 대화방을 등록할 수 있는 상태인지?(기업: 양방향 대행사 있음, 대행사: 양방향 서비스 제공함)
      showTwowayRegistrationPopup: false, // 양방향 대화방 등록 절차 팝업 show 여부
      showChatbotListPopup: false, // 양방향 대화방 팝업 show 여부
      showAgencyInfoPopup: false, // 양방향 대행사 청약 안내 팝업 show 여부
      showUserAuthPopup: false, // 사용자 비밀번호 입력창 show
      /** (삭제 or 비전시 작업시) */
      subNumPopupType: '', // 삭제 or 비전시 작업 타입 - 문구 변경을 위해 사용
      callbackFnNm: '', // 회신번호 체크후 수행할 function 명 지정
      callbackFnParam: '', // 회신번호 체크후 수행할 function의 파라미터
      showSubNumResultPopup: false // 발신번호가 다른 양방향 대화방의 회신번호로 지정되어 있는 경우 팝업 show 여부
    }
  },
  computed: {
    userType() { return window.localStorage.getItem('userType') },
    isOnewayAgency() { return this.userType === 'AGENCY' && !window.localStorage.getItem('rcsSvc').includes('chat') }, // 단방향 서비스 제공 대행사인지?
    hasChecked() { return this.checkedList.length > 0 }, // 체크된 항목이 있는지?
    hasActiveChecked() { return this.checkedList.filter(x => x.aprvRet === 'OK').length > 0 }, // 체크된 항목중 승인완료 데이터가 있는지?
    hasAvailableConvertChecked() { return this.checkedList.filter(x => x.aprvRet === 'OK' && x.service === 'a2p').length > 0 }, // 체크된 항목중 단방향 전환이 가능한 데이터가 있는지 -> 발신번호 기반이며 승인완료
    isCheckedAll() { return this.checkableList.length === this.checkedList.length },
    checkableList() { return this.twowayChatbotList.filter(x => x.disable === false) }, // 선택 가능한 요소의 목록
    checkedActiveA2pList() { return this.checkedList.filter(x => x.aprvRet === 'OK' && x.service === 'a2p') }, // 사용자가 선택한 목록중 '승인완료' 상태의 발신번호 기반 양방향 대화방 목록
    /** 버튼 관련 class, style - 현재 선택된 데이터가 해당 액션이 가능한지에 따라, disable 처리여부를 결정하기 위함 */
    disableBtnClass() { return !this.hasChecked || this.isOnewayAgency ? 'bd_gray disabled' : '' }, // 버튼 disable class
    disableBtnStyle() { return !this.hasChecked || this.isOnewayAgency ? 'cursor: not-allowed' : '' }, // 버튼 disable style
    disableDisplayBtnClass() { return !this.hasActiveChecked || this.isOnewayAgency ? 'bd_gray disabled' : '' }, // 전시,비전시 버튼 disable class
    disableDisplayBtnStyle() { return !this.hasActiveChecked || this.isOnewayAgency ? 'cursor: not-allowed' : '' }, // 버튼 disable style
    disableConvertBtnClass() { return !this.hasAvailableConvertChecked || this.isOnewayAgency ? 'bd_gray disabled' : '' },
    disableConvertBtnStyle() { return !this.hasAvailableConvertChecked || this.isOnewayAgency ? 'cursor: not-allowed' : '' }
  },
  watch: {
    // 체크된 항목에 따라 최상단 체크박스 스타일 변경 -> 값 직접 조작하여 props 에러 발생함(현재는 방법없음)
    checkedList() {
      this.$nextTick(() => {
        let target = this.$refs.chk_all
        if (this.hasChecked) {
          target.model = this.isCheckedAll
        } else {
          target.model = false
        }
      })
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'TwowayChatbotUnit' || to.name === 'TwowayChatbotDetail') {
      this.$store.dispatch('setChatbotInfo', { backComponent: from.name, chatbotId: to.params.chatbotId, svcType: to.params.svcType })
    }
    next()
  },
  async created () {
    this.brandId = this.$route.params.brandId
    // (검색필터) 상태 목록
    retrieveCommonCode('CHATBOT_APRV_RET_FRT1').then(res => {
      this.statusList = res.result
    })
    // 양방향 대화방 목록 접근시 등록이 가능한 상태인지 확인
    let result = await isAvailableRegisterTwoway(this.brandId)
    this.isAvailableRegister = result.available
    if (!this.isAvailableRegister) {
      if (this.userType === 'CORP') this.showAgencyInfoPopup = true
      else this.$alertMsg('양방향 대화방 서비스를 제공하지 않는 대행사 입니다.<br>양방향 대화방 등록이 불가 합니다.')
    }
  },
  mounted() {
    this.searchParam = this.$store.getters['searchcondition/getSearchCondition'](this.searchParam) // 검색필터값 가져옴
    this.updateOriginSearchParam()
    this.getList()
  },
  methods: {
    getDisplayAprvNm2,
    /** 양방향 대화방 목록 */
    getList() {
      this.$store.dispatch('searchcondition/searchAndGo', { searchParam: this.searchParam })
      getTwowayChatbotList(this.brandId, this.originSearchParam).then(res => {
        this.hasTwowayChatbot = res.result.exist
        if (res.result.exist) {
          this.totalCount = res.result.totalSize
          this.twowayChatbotList = res.result.list.map(x => {
            let isActive = (x.aprvRet === 'OK' && x.status === 'ACTIVE')
            let isSaved = x.aprvRet === 'SAVED'
            let isRejected = x.aprvRet === 'REJECTED' && x.status === 'DELETED'
            // 체크박스 disable 조건 set > 승인완료 or 반려된 대화방ID 기반 챗봇
            let disabledCondition = !(isActive || isRejected || isSaved) || this.isOnewayAgency
            return { ...x, disable: disabledCondition }
          })
          this.checkClear()
        }
        this.ready = true
      }).catch((err) => {
        this.$alertMsg(err.desc).then(() => {})
      })
    },
    findSearch() {
      this.updatePageData(1)
      this.updateOriginSearchParam()
      this.getList()
    },
    changePage(page) {
      this.updatePageData(page)
      this.getList()
    },
    /** 리스트 사이즈 변경 */
    changeSize() {
      this.updatePageData(1)
      this.originSearchParam.size = this.searchParam.size
      this.getList()
    },
    /** 체크박스 선택(전체) */
    checkAll(checked) {
      if (checked) {
        if (!this.hasChecked) { // 체크된 항목이 없었으면, 전체 선택
          this.checkableList.forEach(item => this.checkItem(true, item.chatbotId))
        } else { // 체크된 항목이 있었으면 체크되지 않은 항목들 추가 선택
          let remainCheckList = this.checkableList.filter(item => {
            if (!this.checkedList.find(x => x.chatbotId === item.chatbotId)) return item
          })
          remainCheckList.forEach(x => this.checkItem(true, x.chatbotId))
        }
      } else {
        if (this.isCheckedAll) {
          // 전체 선택 해제
          for (let item of this.checkableList) {
            this.checkItem(false, item.chatbotId)
          }
        }
      }
    },
    /** 체크박스 선택(단일) */
    checkItem(checked, value) {
      let item = this.checkableList.find(x => x.chatbotId === value) // 대상 발신번호 정보
      if (checked) {
        this.$refs[`chk_${value}`].model = true // 체크박스 스타일 변경(선택)
        this.checkedList.push(item)
      } else {
        this.$refs[`chk_${value}`].model = false // 체크박스 스타일 변경(선택해제)
        this.checkedList.splice(this.checkedList.indexOf(item), 1)
      }
    },
    /** 채크박스 초기화 */
    checkClear() {
      this.checkedList.forEach(x => { this.$refs[`chk_${x.chatbotId}`].model = false })
      this.checkedList = []
    },
    // 회신번호 알림 팝업에서 '확인' 클릭시 callback 함수 수행
    callbackBySubNumResultPopup() {
      this[this.callbackFnNm](this.callbackFnParam)
    },
    /** 전시/비전시 상태 업데이트 */
    updateDisplay(type) {
      if (this.hasActiveChecked && !this.isOnewayAgency) {
        let msg
        if (type === 'exhibit') msg = '선택한 양방향 대화방을 전시 처리 하시겠습니까?'
        else msg = '확인 버튼을 누르실 경우,<br>해당 양방향 대화방이 비전시 처리되며,<br>비전시 상태가 30일 이상 유지될 경우 자동으로 삭제됩니다.<br><br>비전시 하시겠습니까?'
        this.$confirmMsg(msg).then(async () => {
          // 1. 선택항목 중 실제 업데이트 대상이 되는 챗봇만 거른다.
          //    => 승인완료 데이터이고(aprvRet === 'OK'), 현재 요청하는 상태와 반대의 전시상태인 경우(ex. 전시 요청시 -> 선택된 항목중 비전시 상태의 데이터만 업데이트 대상이 됨)
          let targets = this.checkedList.filter(x => x.aprvRet === 'OK' && x.display.substring(1, 2) === (type === 'exhibit' ? '0' : '1'))
          if (targets.length < 1) this.$alertMsg('수정할 대상이 없습니다.')
          else {
            this.targetChatbots = targets.map(x => x.chatbotId)
            if (type === 'exhibit') {
              this.updateChatbotsDisplay('exhibit')
            } else { // 비전시 처리일 경우: 전시 상태의 발신번호 기반 대화방이 있는 경우 회신번호 여부를 체크
              let targetA2pList = this.checkedActiveA2pList.filter(x => x.display.substring(1, 2) === '1') // 전시 상태의 발신번호 기반 대화방
              if (targetA2pList.length > 0) {
                let displayCnt = await getActiveAndDisplayA2pChatbotCnt(this.brandId)
                if (displayCnt === this.checkedActiveA2pList.length) {
                  this.$confirmMsg('발신번호는 1개 이상 전시 상태로 있어야 합니다.<br>해당 발신번호를 비전시 할 경우<br>브랜드도 함께 비전시 처리됩니다.<br><br>함께 비전시 하시겠습니까?<br><br>(비전시 상태로 30일 유지 시 브랜드와 함께 자동 삭제됩니다.)').then(() => {
                    this.checkChatbotIsSubNum('updateChatbotsDisplay', 'nonExhibit') // 회신번호 체크
                  })
                } else this.checkChatbotIsSubNum('updateChatbotsDisplay', 'nonExhibit') // 회신번호 체크
              } else {
                this.updateChatbotsDisplay('nonExhibit')
              }
            }
          }
        })
      }
    },
    /** 삭제 요청 */
    async remove() {
      if (this.hasChecked && !this.isOnewayAgency) {
        // 사용자가 삭제하려는 대상 중 발신번호 기반의 양방향 대화방이 있다면
        if (this.checkedActiveA2pList.length > 0) {
          // 발신번호 기반의 양방향 대화방을 삭제시 -> 삭제 가능여부를 체크(마지막으로 남은 사용가능한 발신번호인지?, 다른 대화방의 회신번호로 사용되는 번호인지?)
          let activeSendNumCnt = await getActiveA2pChatbotCnt(this.brandId)
          if (activeSendNumCnt === this.checkedActiveA2pList.length) {
            // (check: alert문구) 브랜드 삭제 로직이 추가되는 경우는 삭제 가능 및 문구 변경 필요
            // (3월중)-> '발신번호는 1개 이상 등록되어 있어야 합니다.<br>선택한 발신번호를 삭제하면 브랜드도 함께 삭제됩니다.<br>발신번호를 삭제하시겠습니까?
            this.$alertMsg('발신번호는 1개 이상 등록되어 있어야 합니다.<br>전체 삭제할 수 없습니다.')
          } else {
            if (this.checkedList.length > 1) this.showUserAuthPopup = true // 비밀번호 입력 팝업 show
            else this.$confirmMsg('선택한 양방향대화방을 삭제 하시겠습니까?').then(() => { this.checkChatbotIsSubNum('deleteChatbots', 'delete') }) // 회신번호 여부 체크
          }
        } else {
          if (this.checkedList.length > 1) this.showUserAuthPopup = true // 비밀번호 입력 팝업 show
          else {
            this.$confirmMsg('선택한 양방향대화방을 삭제 하시겠습니까?').then(() => {
              this.deleteChatbots()
            })
          }
        }
      }
    },
    /** 양방향대화방 대량 삭제시 비밀번호 인증 결과 */
    verifySuccessForRemove() {
      this.showUserAuthPopup = false
      // 삭제 대상중 발신번호 기반 대화방이 있는 경우는 회신번호 여부를 체크한다.
      if (this.checkedActiveA2pList.length > 0) this.checkChatbotIsSubNum('deleteChatbots', 'delete')
      else this.deleteChatbots()
    },
    /** 발신번호가 다른 대화방의 회신번호로 지정되었는지 확인 */
    async checkChatbotIsSubNum(callbackFnNm, subNumPopupType) {
      this.subNumPopupType = subNumPopupType
      this.callbackFnNm = callbackFnNm // 회신번호 체크 이후 수행할 callback 함수 이름을 지정
      let chatbotIds
      if (subNumPopupType === 'nonExhibit') { // 비전시
        this.callbackFnParam = 'nonExhibit'
        chatbotIds = this.checkedList.filter(x => x.aprvRet === 'OK').map(x => x.chatbotId).join(',') // 대상이 되는 데이터: 승인완료
      } else { // 삭제
        chatbotIds = this.checkedList.map(x => x.chatbotId).join(',')
      }
      let res = await filteringSubNumChatbots(this.brandId, { chatbotIds: chatbotIds })
      if (res.length > 0) { // 회신번호로 사용되는 번호가 있는 경우
        if (this.checkedList.length > 1) { // 복수 선택시
          this.subNumList = res
          this.showSubNumResultPopup = true // 회신번호로 사용되는 번호가 존재한다면 팝업 show
        } else { // 단건 선택시
          let cnt = Object.values(res[0])
          let msg
          if (subNumPopupType === 'nonExhibit') { // 비전시 - 마지막번호 X & 회신번호 O & 단건
            msg = '<br>함께 비전시 하시겠습니까?<br><br>(비전시 상태로 30일 유지 시 자동 삭제됩니다.)'
          } else { // 삭제 시
            msg = '확인 버튼을 누르실 경우,<br>해당 양방향 대화방도 함께 삭제됩니다.<br><br>삭제 하시겠습니까?'
          }
          this.$confirmMsg('선택한 발신번호는' + cnt + '개의 양방향 대화방의<br>회신번호로 지정되어 있습니다.<br>' + msg).then(() => {
            this[this.callbackFnNm](this.callbackFnParam)
          })
        }
      } else {
        // 체크된 번호가 회신번호로 사용되지 않는다면, 이어서 작업을 진행함
        this[this.callbackFnNm](this.callbackFnParam)
      }
    },
    /** 전시/비전시 처리 요청 */
    updateChatbotsDisplay(type) {
      let data = { display: type === 'exhibit' ? '1' : '0', chatbotIds: this.targetChatbots, twoWayType: 'chat' }
      updateChatbotInfo(this.brandId, data).then(res => {
        this.$alertMsg(`선택한 양방향 대화방이 ${type === 'exhibit' ? '전시' : '비전시'} 처리 되었습니다.`).then(() => this.getList())
      }).catch((err) => {
        this.$alertMsg(err.desc).then(() => {})
      })
    },
    /** 삭제 요청 */
    deleteChatbots() {
      let chatbotIds = this.checkedList.map(x => x.chatbotId)
      let data = { chatbotIds: chatbotIds, twoWayType: 'chat' }
      deleteChatbots(this.brandId, data).then(res => {
        if (res.code === '20000000') this.getList()
      }).catch((err) => {
        this.$alertMsg(err.desc).then(() => {})
      })
    },
    /** 단방향 대화방으로 전환 */
    convertOneway() {
      // 단방향 대화방으로 전환 가능한 데이터들이 선택되었는지
      if (this.hasAvailableConvertChecked && !this.isOnewayAgency) {
        this.$confirmMsg('선택하신 양방향 대화방을 단방향 대화방으로 전환하시겠습니까?<br>전환된 발신번호는 발신번호 관리에서 확인 가능 합니다.').then(() => {
          let chatbotIds = this.checkedList.filter(x => (x.aprvRet === 'OK' || (x.aprvRet === 'REJECTED' && x.status === 'DELETED')) && x.service === 'a2p').map(x => x.chatbotId)
          if (chatbotIds.length < 1) this.$alertMsg('단방향으로 전환할 대상이 없습니다.')
          else {
            let data = { chatbotIds: chatbotIds, type: 'a2pSingle' }
            updateChatbotInfo(this.brandId, data).then(res => {
              if (res.code === '20000000') this.getList()
            }).catch((err) => {
              this.$alertMsg(err.desc).then(() => {})
            })
          }
        })
      }
    },
    /** 양방향 대화방 등록화면 이동(기존 발신번호 or 챗봇 ID) */
    async addTwoWayChatbot(type) {
      if (!this.isAvailableRegister) {
        if (this.userType === 'CORP') this.showAgencyInfoPopup = true
        else this.$alertMsg('양방향 대화방 서비스를 제공하지 않는 대행사 입니다.<br>양방향 대화방 등록이 불가 합니다.')
      } else {
        if (type === 'a2p') this.showChatbotListPopup = true // 단방향 대화방 팝업 오픈
        else this.goRegister()
      }
    },
    /** 양방향 대화방 작성 화면 이동 */
    goRegister(chatbot = null) {
      this.$router.push({ name: 'TwowayChatbotUnit', params: { brandId: this.brandId, chatbotId: !chatbot ? '' : chatbot.mdn, svcType: !chatbot ? 'chat' : 'a2p' } })
    },
    /** 양방향 대화방 상세정보 화면 이동 */
    goDetail(chatbotId, svcType) {
      this.$router.push({ name: 'TwowayChatbotDetail', params: { brandId: this.brandId, chatbotId: chatbotId, svcType: svcType } })
    },
    /** 페이지 정보 변경 */
    updatePageData(page) {
      this.searchParam.page = page
      this.originSearchParam.page = page
    },
    /** 기 검색조건 저장(update) */
    updateOriginSearchParam() {
      this.originSearchParam = _.cloneDeep(this.searchParam)
    },
    handleSortChange(sort) {
      this.originSearchParam.orderKey = jglib.convertCamelcaseToSnakecase(sort.prop)
      this.originSearchParam.orderValue = sort.order === 'ascending' ? 'ASC' : 'DESC'
      this.getList()
    }
  }
}
</script>
