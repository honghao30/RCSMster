<template>
  <div class="rcs_container service_wrap">
    <article id="content" class="content">
      <div class="box_breadcrumb">
        <!-- menuID? -->
        <breadcrumb :depth1MenuId="'M0200'" :depth2MenuId="'M0201'" :depth3MenuId="'대화방 메뉴'"/>
      </div>
      <brand-top active="psMenu" :brandId="brandId"></brand-top>
      <div class="contents_wrap">
        <section class="section mar_b0">
          <div class="sec_header">
            <div class="cont_flex_bundle mar_b30">
              <div class="title_area">
                <h3 class="h3_title">대화방 메뉴</h3>
              </div>
            </div>
            <div class="cont_flex_bundle">
              <ul class="bullet_list fs18 mar_b30 col_8">
                <li>단말 사용자의 요청에 대해 기업에서 실시간으로 응답할 수 있는 대화방입니다.</li>
                <li>양방향 대화방을 사용하기 위해서는 대행사가 사전에 계약되어야 합니다.</li>
              </ul>
              <div class="btn_wrap right mar_b30 col_4">
                <a href="javascript:void(0);" class="btn sml bd_black type2" @click="showTwowayPopup">대화방 메뉴 등록</a>
              </div>
            </div>
            <!-- 검색 영역 -->
            <div class="box_search_area mar_b30">
              <div class="cont_flex_bundle">
                <span class="custom_select mid col_3">
                  <select v-model="searchParam.service">
                    <option value>유형 전체</option>
                    <option value="a2p">발신번호</option>
                    <option value="chat">챗봇ID</option>
                  </select>
                </span>
                <span class="custom_select mid col_3">
                  <select v-model="searchParam.psMenuYn">
                    <option value>대화방 메뉴 전체</option>
                    <option value="Y">사용</option>
                    <option value="N">미사용</option>
                  </select>
                </span>
                <span class="custom_select mid col_3">
                  <select v-model="searchParam.psMenuStatus">
                    <option value>상태 전체</option>
                    <option value="SAVED">임시저장</option>
                    <option value="OK">등록</option>
                    <option value="PAUSED">사용중지</option>
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
          <!-- 결과 영역 -->
          <div class="search_result">
            <div class="cont_flex_bundle">
              <div class="total_area eft">
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
            </div>
            <div class="box_scroll mar_t20">
              <div class="tbl_sorting_wrap dv2023_infotoast">
                <el-table :data="hasPsMenuTwowayList" empty-text="검색 결과가 없습니다." @sort-change="handleSortChange" style="width: 100%" class="dv2023_persistentlist" :class="{'el-table--enable-row-transition': hasPsMenuTwowayList.length >= 100}">
                  <el-table-column prop="regDt" label="등록일(수정일)" width="180" sortable="custom" :formatter="formatterDateAndBlank"></el-table-column>
                  <el-table-column prop="subTitle" label="대화방명" width="232" sortable="custom">
                    <template slot-scope="scope">
                      <a href="javascript:void(0)" class="btn_text" @click="goDetail(scope.row.chatbotId)">{{ scope.row.subTitle }}</a>
                    </template>
                  </el-table-column>
                  <el-table-column prop="chatbotId" label="발신번호/챗봇ID" width="220"></el-table-column>
                  <el-table-column prop="psMenuCnt" label="사용 중인 메뉴 수" width="180"></el-table-column>
                  <el-table-column prop="title" label="대화방 메뉴명" width="auto"></el-table-column>
                  <el-table-column prop="psMenuYn" label="사용여부" width="120">
                    <template slot-scope="scope">
                      <span> {{ scope.row.psMenuYn === 'Y' ? '사용' : '미사용' }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="psMenuStatus" label="상태" width="100">
                    <template slot-scope="scope">
                      <span v-if="scope.row.psMenuStatus === 'OK'" class="status accept">등록</span>
                      <span v-else-if="scope.row.psMenuStatus === 'SAVED'" class="status">임시저장</span>
                      <!-- check: 그 외 상태는? -->
                    </template>
                  </el-table-column>
                </el-table>
                <div class="pos_rType01">
                  <button class="icon_info"></button>
                  <span class="message pos_r">메뉴명에는 첫 번째 메뉴명이 노출됩니다.</span>
                </div>
              </div>
            </div>
            <Pagination v-if="totalCount > 0" :total="totalCount" :current-page.sync="searchParam.page" :pageSize="searchParam.size" @change="changePage"/>
          </div>
        </section>
      </div>
      <!-- 양방향 대화방 선택 팝업 -->
      <chatbot-list-popup  v-if="showChatbotListPopup"
        title="양방향 대화방 목록" desc="대화방 메뉴를 작성할 양방향 대화방을 선택해 주세요." type="twowayHasNoPsmenu"
        :visible.sync="showChatbotListPopup"
        :brandId="brandId"
        @selectChatbot="goRegisterPsMenu">
      </chatbot-list-popup>
      <!-- 대화방메뉴 등록 안내 팝업 -->
      <PsMenuRegistrtionInfoPopup v-if="showPsMenuRegistrationPopup" :visible.sync="showPsMenuRegistrationPopup" @goRegister="showTwowayPopup"></PsMenuRegistrtionInfoPopup>
    </article>
  </div>
</template>

<script>
import BrandTop from '@/views/service/components/BrandTop'
import Breadcrumb from '@/components/global/Breadcrumb'
import Pagination from '@/components/Pagination'
import ChatbotListPopup from '@/views/service/components/chatbot/ChatbotListPopup'
import PsMenuRegistrtionInfoPopup from '@/views/service/components/chatbot/PsMenuRegistrationInfoPopup'
import { retrieveCommonCode } from '@/api/common/code'
import { getTwowayChatbotList } from '@/api/service/chatbot' // isAvailableRegisterTwoway
import { getPersistentList } from '@/api/service/persistentMenu'
export default {
  name: 'PersistentMenuList',
  components: {
    BrandTop,
    Breadcrumb,
    Pagination,
    ChatbotListPopup,
    PsMenuRegistrtionInfoPopup
  },
  data() {
    return {
      statusList: [],
      totalCount: 0,
      originSearchParam: null,
      searchParam: {
        group: 'PersistentMenuList',
        service: '',
        psMenuYn: '',
        psMenuStatus: '',
        searchValue: '',
        orderKey: 'REG_DT',
        orderValue: 'DESC',
        size: 20,
        page: 1
      },
      brandId: '',
      hasPsMenuTwowayList: [], // 대화방 메뉴가 있는 양방향 대화방만
      showPsMenuRegistrationPopup: false, // 대화방 메뉴 등록 절차 안내 팝업 show 여부
      showChatbotListPopup: false
    }
  },
  computed: {
    isOnewayAgency() { return window.localStorage.getItem('userType') === 'AGENCY' && !window.localStorage.getItem('rcsSvc').includes('chat') } // 단방향 서비스 제공 대행사인지?
  },
  created () {
    this.brandId = this.$route.params.brandId
    retrieveCommonCode('CHATBOT_APRV_RET_FRT1').then(res => { this.statusList = res.result })
  },
  async mounted() {
    // 양방향 대화방 있는지 체크.
    // let chkTwowayAgency = await isAvailableRegisterTwoway(this.brandId)
    // !chkTwowayAgency.available ||
    let params = { aprvStatus: 'OK', isTwoWay: 'Y', searchKey: 'SUB_TITLE', searchValue: '', orderKey: 'REG_DT', orderValue: 'ASC', size: 99999, page: 1 }
    let chkTwowayChatbot = await getTwowayChatbotList(this.brandId, params)
    if (!chkTwowayChatbot.result.exist) {
      this.$alertMsg('대화방 메뉴를 등록할 수 있는 양방향 대화방이 없습니다.<br>양방향 대화방을 등록해주세요.').then(() => {
        this.$router.push({ name: 'TwowayChatbotList', params: { brandId: this.brandId } })
      })
    } else {
      this.searchParam = this.$store.getters['searchcondition/getSearchCondition'](this.searchParam) // 검색필터값 가져옴
      this.updateOriginSearchParam()
      this.getList()
    }
  },
  methods: {
    getList() {
      this.$store.dispatch('searchcondition/searchAndGo', { searchParam: this.searchParam })
      // 양방향 대화방인 대화방의 대화방메뉴 목록 출력
      getPersistentList(this.brandId, this.originSearchParam).then(res => {
        if (res.code === '20000000') {
          this.showPsMenuRegistrationPopup = !res.result.exist
          this.hasPsMenuTwowayList = res.result.list
          this.totalCount = res.result.totalSize
        }
      }).catch((err) => {
        this.$alertMsg(err.desc).then(() => {})
      })
    },
    /** 대화방 메뉴를 등록가능한, 양방향 대화방 목록 팝업 출력  */
    showTwowayPopup() {
      if (this.isOnewayAgency) {
        this.$alertMsg('양방향 대화방 서비스를 제공하지 않는 대행사 입니다.<br>대화방 메뉴 등록이 불가 합니다.')
      } else {
        // 1. 양방향 대화방 목록
        let params = { aprvStatus: 'OK', isTwoWay: 'Y', searchKey: 'SUB_TITLE', searchValue: '', orderKey: 'REG_DT', orderValue: 'ASC', size: 99999, page: 1 }
        getTwowayChatbotList(this.brandId, params).then(res => {
          if (res.code === '20000000') {
            if (res.result.list.length > 0) {
              let availableList = res.result.list.filter(x => x.psMenuCnt < 1)
              // 대화방 메뉴가 등록되어 있지 않은 양방향 대화방을 체크
              if (availableList.length > 0) { // 대화방이 있다면 양방향 대화방 목록 팝업을 출력
                this.showChatbotListPopup = true
              } else {
                this.$confirmMsg('대화방 메뉴 사용이 가능한 양방향 대화방이 없습니다.<br>이미 등록된 양방향 대화방의 대화방 메뉴를 수정하거나,<br>먼저 새로운 양방향 대화방을 생성해 주세요.', '', '양방향 대화방 생성', '취소').then(() => {
                  this.$router.push({ name: 'TwowayChatbotList', params: { brandId: this.brandId } })
                })
              }
            } else {
              this.$confirmMsg('사용중인 양방향대화방이 없습니다.<br>대화방 메뉴를 사용하기 위해서는 양방향대화방을 먼저 생성해주세요.', '', '양방향 대화방 생성', '취소').then(() => {
                this.$router.push({ name: 'TwowayChatbotList', params: { brandId: this.brandId } })
              })
            }
          }
        }).catch((err) => {
          this.$alertMsg(err.desc).then(() => {})
        })
      }
    },
    goDetail(chatbotId) {
      this.$router.push({ name: 'PersistentMenuDetail', params: { brandId: this.brandId, chatbotId: chatbotId, isNew: false } })
    },
    /** 대화방 메뉴 신규 등록 */
    goRegisterPsMenu(chatbot) {
      this.$router.push({ name: 'PersistentMenuUnit', params: { brandId: this.brandId, chatbotId: chatbot.chatbotId, isNew: true } })
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
    /** 페이지 사이즈 변경 */
    changeSize() {
      this.updatePageData(1)
      this.originSearchParam.size = this.searchParam.size
      this.getList()
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
    },
    formatterDateAndBlank(row, column, cellValue, index) {
      return jglib.isEmpty(cellValue) ? '-' : jglib.convertDateFormat(cellValue, 'YYYY-MM-DD')
    }
  }
}
</script>
