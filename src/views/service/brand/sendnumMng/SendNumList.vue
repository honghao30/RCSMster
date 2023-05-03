<template>
  <div class="rcs_container service_wrap">
    <article id="content" class="content">
      <div class="box_breadcrumb">
        <breadcrumb :depth1MenuId="'M0200'" :depth2MenuId="'M0201'" :depth3MenuId="'발신번호 관리'"/>
      </div>
      <brand-top active="sendnumMng" :brandId="brandId"></brand-top>
      <div class="contents_wrap">
        <section class="section mar_b0">
          <div class="sec_header">
            <div class="cont_flex_bundle mar_b30">
              <div class="title_area">
                <h3 class="h3_title">발신번호 목록</h3>
              </div>
            </div>
            <div class="cont_flex_bundle">
              <ul class="bullet_list fs18 mar_b30 col_9">
                <li>발신번호 추가 시 기본적으로 단방향 대화방이 생성되며, 필요에 따라 양방향으로 전환하여 사용하실 수 있습니다.</li>
                <li>단방향 대화방은 개인 고객에게 문자 발송만 가능하며, 양방향 대화방은 개인 고객과 챗봇 등을 이용한 대화가 가능합니다.</li>
              </ul>
              <div class="btn_wrap right mar_b30 col_3">
                <a href="javascript:void(0);" class="btn sml bd_black type2" @click="addOnewayChatbot">발신번호 추가</a>
              </div>
            </div>
            <!-- 검색 영역 -->
            <div class="box_search_area mar_b30">
              <div class="cont_flex_bundle">
                <span class="custom_select mid col_3">
                  <select v-model="searchParam.isTwoWay">
                    <option value>속성 전체</option>
                    <option value="N">단방향</option>
                    <option value="Y">양방향</option>
                  </select>
                </span>
                <span class="custom_select mid col_3">
                  <select v-model="searchParam.aprvStatus">
                    <option value>상태 전체</option>
                    <option v-for="item in statusList" :value="item.code" :key="item.code">{{ item.codeNm }}</option>
                  </select>
                </span>
                <div class="filter_bundle col_6">
                  <span class="custom_input mid mar_l12 col_11 search">
                    <form autocomplete="off">
                      <input type="text" placeholder="검색어 입력" @keypress.enter="findSearch" v-model="searchParam.searchValue">
                    </form>
                  </span>
                  <a href="javascript:void(0);" class="btn mid gray col_1" @click="findSearch"><span>검색</span></a>
                </div>
              </div>
            </div>
          </div>
          <!-- 목록 -->
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
                </span>
              </div>
            </div>
            <div class="box_scroll mar_t20">
              <div class="tbl_sorting_wrap dv2023_chat-view">
                <el-table :data="sendNumList" empty-text="검색 결과가 없습니다." @sort-change="handleSortChange" style="width: 100%" :class="{'el-table--enable-row-transition': sendNumList.length >= 100}">
                  <el-table-column width="52">
                    <template slot="header">
                      <el-checkbox ref="chk_all" :disabled="checkableList.length < 0" @change="checkAll"></el-checkbox>
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
                      <a href="javascript:void(0)" class="btn_text" :title="scope.row.subTitle" @click="goDetail(scope.row.chatbotId, scope.row.twowayYn)">{{ scope.row.subTitle }}</a>
                    </template>
                  </el-table-column>
                  <el-table-column prop="chatbotId" label="발신번호" width="160">
                    <template slot-scope="scope">
                      <span>
                        <a href="javascript:void(0)" class="btn_text" @click="goDetail(scope.row.chatbotId, scope.row.twowayYn)">
                          {{ (scope.row.massRemainedCnt + scope.row.massRejectedCnt - 1) > 0 ? `${scope.row.chatbotId}외 ${(scope.row.massRemainedCnt + scope.row.massRejectedCnt) - 1} 건` : scope.row.chatbotId }}
                        </a>
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="twowayYn" label="속성" width="100">
                    <template slot-scope="scope">
                      <span>{{ scope.row.twowayYn === 'N' ? '단방향' : '양방향' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="inputFieldYn" label="메시지 입력란" width="128">
                    <template slot-scope="scope">
                      <span>{{ scope.row.inputFieldYn === 'Y' ? '사용' : '미사용' }}</span>
                    </template>
                  </el-table-column>
                  <!-- 한번도 승인을 받지않은 데이터의 경우, 전시 상태는 '-'로 표기한다. -->
                  <el-table-column prop="display" label="전시상태" width="128">
                    <template slot-scope="scope">
                      <span>{{ scope.row.activeYn === 'N' ? '-' : (scope.row.display.substring(1, 2) === '0' ? '비전시' : '전시') }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="regUserNm" label="등록자" width="148"></el-table-column>
                  <el-table-column prop="aprvRet" label="상태" width="128">
                    <template slot-scope="scope">
                      <span class="status" :class="{ 'accept': scope.row.aprvRet === 'OK', 'refusal': scope.row.aprvRet === 'REJECTED', 'saved': scope.row.aprvRet === 'SAVED' }">
                        {{ getDisplayAprvNm2(scope.row) }}
                      </span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <Pagination v-if="totalCount > 0" :total="totalCount" :current-page.sync="searchParam.page" :pageSize="searchParam.size" @change="changePage"/>
          </div>
        </section>
      </div>
      <!-- 비밀번호 입력창 -->
      <user-password-auth-popup v-if="showUserAuthPopup" :visible.sync="showUserAuthPopup" @success="verifySuccessForRemove"></user-password-auth-popup>
      <!-- 삭제, 비전시: 회신번호로 설정된 번호의 경우 알림 -->
      <ChatbotSubNumResultPopup v-if="showSubNumResultPopup" :visible.sync="showSubNumResultPopup" :type="subNumPopupType" :data="subNumList" @success="callbackBySubNumResultPopup"></ChatbotSubNumResultPopup>
    </article>
  </div>
</template>

<script>
import BrandTop from '@/views/service/components/BrandTop'
import Breadcrumb from '@/components/global/Breadcrumb'
import Pagination from '@/components/Pagination'
import UserPasswordAuthPopup from '@/views/service/components/chatbot/UserPasswordAuthPopup'
import ChatbotSubNumResultPopup from '@/views/service/components/chatbot/ChatbotSubNumResultPopup'
import { getDisplayAprvNm2 } from '@/utils/string'
import { retrieveCommonCode } from '@/api/common/code'
import { getChatbotList, updateChatbotInfo, deleteChatbots, getActiveA2pChatbotCnt, getActiveAndDisplayA2pChatbotCnt, filteringSubNumChatbots } from '@/api/service/chatbot'

export default {
  name: 'SendNumList',
  components: {
    BrandTop,
    Breadcrumb,
    Pagination,
    UserPasswordAuthPopup,
    ChatbotSubNumResultPopup
  },
  data() {
    return {
      statusList: [], // (검색필터) 상태목록
      totalCount: 0, // 총 데이터 건수(페이지당 x)
      // (검색) 실제 검색시 사용하는 파라미터
      // -> 검색 이후 사용자가 searchParam 값만 바꾼후, '검색'액션하지 않고, 페이지 이동시 현재 입력된 데이터 기준으로 검색되는 현상 방지하기 위해 사용
      originSearchParam: null,
      // (검색) 현재 사용자가 세팅한 파라미터
      searchParam: {
        group: 'SendNumList',
        isTwoWay: '', // 양방향 대화방 여부
        aprvStatus: '', // 상태
        searchKey: '',
        searchValue: '', // 검색어
        orderKey: 'REG_DT',
        orderValue: 'DESC',
        size: 20,
        page: 1
      },
      brandId: '',
      sendNumList: [], // 발신번호 기반 대화방 목록
      checkedList: [], // 선택된 발신번호 목록
      subNumList: [],
      showUserAuthPopup: false, // 사용자 비밀번호 입력창 show
      targetChatbots: [], // 전시/비전시/삭제시 사용되는 파라미터
      /** (삭제 or 비전시 작업시) */
      subNumPopupType: '', // 삭제,비전시 작업 타입 - 문구 변경을 위해 사용
      callbackFnNm: '', // 회신번호 체크후 수행할 function 명 지정
      callbackFnParam: '', // 회신번호 체크후 수행할 function의 파라미터
      showSubNumResultPopup: false // 발신번호가 다른 양방향 대화방의 회신번호로 지정되어 있는 경우 팝업 show 여부
    }
  },
  computed: {
    hasChecked() { return this.checkedList.length > 0 }, // 체크된 항목이 있는지?
    hasActiveChecked() { return this.checkedActiveList.length > 0 }, // 체크된 항목중 승인완료 상태의 데이터 있는지?
    isCheckedAll() { return this.checkableList.length === this.checkedList.length },
    isOnewayAgency() { return window.localStorage.getItem('userType') === 'AGENCY' && !window.localStorage.getItem('rcsSvc').includes('chat') }, // 단방향 대행사인지?
    checkableList() { return this.sendNumList.filter(x => x.disable === false) }, // 선택 가능한 요소의 목록
    checkedActiveList() { return this.checkedList.filter(x => x.aprvRet === 'OK') }, // 사용자가 선택한 발신번호 목록중 '승인완료' 상태의 데이터만 필터링
    disableBtnClass() { return !this.hasChecked ? 'bd_gray disabled' : '' }, // 버튼 disable class
    disableBtnStyle() { return !this.hasChecked ? 'cursor: not-allowed' : '' }, // 버튼 disable style
    disableDisplayBtnClass() { return !this.hasActiveChecked ? 'bd_gray disabled' : '' }, // 전시,비전시 버튼 disable class
    disableDisplayBtnStyle() { return !this.hasActiveChecked ? 'cursor: not-allowed' : '' } // 전시,비전시 버튼 disable style
  },
  watch: {
    // 체크된 항목에 따라 최상단 체크박스 스타일 변경 -> 값 직접 조작하여 props 에러 발생함(현재는 방법없음)
    checkedList() {
      let target = this.$refs.chk_all
      if (this.hasChecked) {
        target.model = this.isCheckedAll
      } else {
        target.model = false
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'TwowayChatbotUnit') {
      this.$store.dispatch('setChatbotInfo', { backComponent: from.name, chatbotId: to.params.chatbotId, svcType: to.params.svcType })
    }
    next()
  },
  created () {
    this.brandId = this.$route.params.brandId
    // (검색필터) 상태 목록
    retrieveCommonCode('CHATBOT_APRV_RET_FRT1').then(res => {
      this.statusList = res.result
    })
  },
  mounted() {
    this.searchParam = this.$store.getters['searchcondition/getSearchCondition'](this.searchParam) // 검색필터값 가져옴
    this.updateOriginSearchParam()
    this.getList() // 목록 조회
  },
  methods: {
    getDisplayAprvNm2,
    /** 목록 가져오기 */
    getList() {
      this.$store.dispatch('searchcondition/searchAndGo', { searchParam: this.searchParam })
      getChatbotList(this.brandId, this.originSearchParam).then((res) => {
        this.totalCount = res.result.totalSize
        // 체크 불가능한 경우 set
        this.sendNumList = res.result.list.map(x => {
          let isActive = x.aprvRet === 'OK' && x.status === 'ACTIVE'
          let isSaved = x.aprvRet === 'SAVED'
          let isRejected = x.aprvRet === 'REJECTED'
          let disabledCondition
          if (this.isOnewayAgency) {
            disabledCondition = ((!isActive && !isSaved && !isRejected) || x.twowayYn === 'Y') // 저장,반려,승인완료가 아니거나 양방향대화방이면
          } else {
            disabledCondition = (!isActive && !isSaved && !isRejected) // 저장,반려,승인완료가 아닌 상태
          }
          return { ...x, disable: disabledCondition }
        })
        this.checkClear()
        // this.getActiveList()
      }).catch((err) => {
        this.$alertMsg(err.desc).then(() => {})
      })
    },
    /** 검색 */
    findSearch() {
      this.updatePageData(1)
      this.updateOriginSearchParam()
      this.getList()
    },
    /** 페이지 변경 */
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
    /** 체크박스 선택(전채) */
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
    /** 체크박스 초기화 */
    checkClear() {
      this.checkedList.forEach(x => { this.$refs[`chk_${x.chatbotId}`].model = false })
      this.checkedList = []
    },
    // 회신번호 알림 팝업에서 '확인' 클릭시 callback 함수 수행
    callbackBySubNumResultPopup() {
      this[this.callbackFnNm](this.callbackFnParam)
    },
    /** 전시/비전시 상태 업데이트 */
    async updateDisplay(type) {
      if (this.hasActiveChecked) {
        // 1. 현재 '승인완료' &'전시'상태인 발신번호의 개수를 가져온다.
        let displayCnt = await getActiveAndDisplayA2pChatbotCnt(this.brandId)
        let msg
        if (type === 'exhibit') msg = '선택한 발신번호를 전시 처리 하시겠습니까?'
        else msg = '확인 버튼을 누르실 경우,<br>해당 발신번호가 비전시 처리되며,<br>비전시 상태가 30일 이상 유지될 경우 자동으로 삭제됩니다.<br><br>비전시 하시겠습니까?'
        this.$confirmMsg(msg).then(() => {
          // 2. 선택항목 중 실제 업데이트 대상이 되는 챗봇만 거른다.
          //    => 승인완료 데이터이고,(aprvRet === 'OK'), 현재 요청하는 상태와 반대의 전시상태인 경우(ex. 전시 요청시 -> 선택된 항목중 비전시 상태의 데이터만 업데이트 대상이 됨)
          this.targetChatbots = this.checkedList.filter(x => x.aprvRet === 'OK' && (x.display.substring(1, 2) === (type === 'exhibit' ? '0' : '1'))).map(x => x.chatbotId)
          if (this.targetChatbots.length < 1) this.$alertMsg('수정할 대상이 없습니다.')
          else {
            if (type === 'exhibit') this.updateChatbotsDisplay('exhibit') // 3-1. 전시처리
            else { // 3-2. 비전시처리
              // 비전시 대상항목과 현재 승인완료 데이터 중 전시된 전체 목록의 수가 같으면 alert
              if (displayCnt === this.checkedActiveList.length) {
                this.$confirmMsg('발신번호는 1개 이상 전시 상태로 있어야 합니다.<br>해당 발신번호를 비전시 할 경우<br>브랜드도 함께 비전시 처리됩니다.<br><br>함께 비전시 하시겠습니까?<br><br>(비전시 상태로 30일 유지 시 브랜드와 함께 자동 삭제됩니다.)').then(() => {
                  this.checkChatbotIsSubNum('updateChatbotsDisplay', 'nonExhibit') // 회신번호 체크
                })
              } else this.checkChatbotIsSubNum('updateChatbotsDisplay', 'nonExhibit') // 회신번호 체크
            }
          }
        })
      }
    },
    /**
     * 삭제
     */
    async remove() {
      // 1. 선택된 대상 존재여부 확인
      if (this.hasChecked) {
        // 2. 승인완료 상태의 발신번호 개수 get
        let activeSendNumCnt = await getActiveA2pChatbotCnt(this.brandId)
        // 3. 사용자가 선택한 번호중 승인완료 상태의 발신번호 개수와 전체 승인완료 상태의 발신번호 건수가 같은 경우
        if (activeSendNumCnt === this.checkedActiveList.length) {
          // (check: alert문구) 브랜드 삭제 로직이 추가되는 경우는 삭제 가능 및 문구 변경 필요
          // (3월중)-> '발신번호는 1개 이상 등록되어 있어야 합니다.<br>선택한 발신번호를 삭제하면 브랜드도 함께 삭제됩니다.<br>발신번호를 삭제하시겠습니까?
          this.$alertMsg('발신번호는 1개 이상 등록되어 있어야 합니다.<br>전체 삭제할 수 없습니다.')
        } else {
          this.targetChatbots = this.checkedList.map(x => x.chatbotId)
          if (this.targetChatbots.length > 1) { // 다수 삭제시: 비밀번호 확인 팝업 show
            this.showUserAuthPopup = true
          } else { // 한건 삭제시: 회신번호 여부 체크
            this.$confirmMsg('발신번호를 삭제하시겠습니까?').then(() => {
              this.checkChatbotIsSubNum('deleteChatbots', 'delete')
            })
          }
        }
      }
    },
    /** 발신번호 대량 삭제시 비밀번호 인증 결과 */
    verifySuccessForRemove() {
      this.showUserAuthPopup = false
      this.checkChatbotIsSubNum('deleteChatbots', 'delete')
    },
    /** 발신번호가 다른 대화방의 회신번호로 지정되었는지 확인 */
    async checkChatbotIsSubNum(callbackFnNm, subNumPopupType) {
      this.subNumPopupType = subNumPopupType
      this.callbackFnNm = callbackFnNm // 회신번호 체크 이후 수행할 callback 함수 이름을 지정
      let chatbotIds
      if (subNumPopupType === 'nonExhibit') {
        this.callbackFnParam = 'nonExhibit' // 비전시
        chatbotIds = this.checkedList.filter(x => x.aprvRet === 'OK').map(x => x.chatbotId).join(',') // 대상이 되는 데이터: 승인완료
      } else {
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
          if (subNumPopupType === 'nonExhibit') { // 비전시 시
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
      let data = { display: type === 'exhibit' ? '1' : '0', chatbotIds: this.targetChatbots }
      updateChatbotInfo(this.brandId, data).then(res => {
        this.$alertMsg(`선택한 발신번호가 ${type === 'exhibit' ? '전시' : '비전시'} 처리 되었습니다.`).then(() => this.getList())
      }).catch((err) => {
        this.$alertMsg(err.desc).then(() => {})
      })
    },
    /** 삭제 요청 */
    deleteChatbots() {
      let data = { chatbotIds: this.targetChatbots }
      deleteChatbots(this.brandId, data).then(res => {
        if (res.code === '20000000') {
          this.$alertMsg('선택한 발신번호가 삭제 처리 되었습니다.').then(() => this.getList())
        }
      }).catch((err) => {
        this.$alertMsg(err.desc).then(() => {})
      })
    },
    /** 발신번호 > 추가 */
    addOnewayChatbot() {
      this.$router.push({ name: 'OnewayChatbotUnit', params: { brandId: this.brandId } })
    },
    /** 발신번호 > 상세 */
    goDetail(chatbotId, twowayYn) {
      this.$router.push({
        name: twowayYn === 'N' ? 'OnewayChatbotDetail' : 'TwowayChatbotDetail',
        params: { brandId: this.brandId, chatbotId: chatbotId }
      })
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
    /** 정렬 */
    handleSortChange(sort) {
      this.originSearchParam.orderKey = jglib.convertCamelcaseToSnakecase(sort.prop)
      this.originSearchParam.orderValue = sort.order === 'ascending' ? 'ASC' : 'DESC'
      this.getList()
    }
  }
}
</script>
