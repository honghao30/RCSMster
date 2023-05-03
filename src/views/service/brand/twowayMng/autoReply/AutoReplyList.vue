<template>
  <div class="rcs_container service_wrap">
    <article id="content" class="content">
      <div class="box_breadcrumb">
        <breadcrumb :depth1MenuId="'M0200'" :depth2MenuId="'M0201'" :depth3MenuId="'자동응답 메시지'"/>
      </div>
      <brand-top active="autoReply" :brandId="brandId"></brand-top>
      <div class="contents_wrap">
        <section class="section mar_b0">
          <div class="sec_header">
            <div class="cont_flex_bundle mar_b30">
              <div class="title_area">
                <h3 class="h3_title">자동응답 메시지</h3>
              </div>
            </div>
            <div class="cont_flex_bundle">
              <ul class="bullet_list fs18 mar_b30 col_8">
                <li>단말 사용자의 요청에 대해 기업에서 실시간으로 응답할 수 있는 대화방입니다.</li>
                <li>양방향 대화방을 사용하기 위해서는 대행사가 사전에 계약되어야 합니다.</li>
              </ul>
            </div>
          </div>
        </section>
        <!-- 검색 영역 -->
        <div class="box_search_area mar_b30">
          <div class="cont_flex_bundle">
            <span class="custom_select mid col_3">
              <select v-model="searchParam.aprvRet">
                <option value>상태 전체</option>
                <option value="OK">등록완료</option>
                <option value="SAVED">저장</option>
              </select>
            </span>
            <div class="filter_bundle col_8">
              <span class="custom_input mid mar_l12 col_11 search">
                <input type="text" placeholder="검색어 입력" @keypress.enter="findSearch" v-model="searchParam.inputValue">
              </span>
              <a href="javascript:void(0);" class="btn mid gray col_1" @click="findSearch"><span>검색</span></a>
            </div>
          </div>
        </div>
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
              <span class="group">
                <a href="javascript:void(0);" class="btn sml bd_black type2" @click="addAutoReply"><span>자동응답 등록</span></a>
              </span>
            </div>
          </div>
          <div class="box_scroll mar_t20">
            <div class="tbl_sorting_wrap relative dv2023_infotoast2">
              <el-table empty-text="검색 결과가 없습니다." :data="autoReplyList" @sort-change="handleSortChange" style="width: 100%" :class="{'el-table--enable-row-transition': autoReplyList.length >= 100}">
                <el-table-column prop="no" label="번호" width="85" :formatter="convertToNumber"></el-table-column>
                <el-table-column prop="regDt" label="등록일(수정일)" width="185" sortable="custom" :formatter="formatterDateAndBlank"></el-table-column>
                <el-table-column prop="armId" label="자동응답 ID" width=""></el-table-column>
                <el-table-column prop="name" label="자동응답 메시지 명" width="auto">
                  <template slot-scope="scope">
                    <a href="javascript:void(0)" @click="goDetail(scope.row.armId)" class="btn_text">{{ scope.row.name }}</a>
                  </template>
                </el-table-column>
                <el-table-column prop="tplNm" label="상품명" width="190"></el-table-column>
                <el-table-column prop="regUserNm" label="등록자" width="120"></el-table-column>
                <el-table-column prop="aprvRetNm" label="상태" width="155">
                  <template slot-scope="scope">
                    <a v-if="scope.row.aprvRet === 'OK' && !isOnewayAgency" href="javascript:void(0);" class="status accept" @click="showHasPwMenuTwowayPopup(scope.row)">{{scope.row.aprvRetNm}}</a>
                    <span v-else class="status" :class="{'accept': scope.row.aprvRet === 'OK'}">{{ scope.row.aprvRetNm }}</span>
                  </template>
                </el-table-column>
              </el-table>
              <div class="pos_rType01">
                <button class="icon_info">회신번호</button>
                <span class="message pos_r">
                  등록완료된 자동응답은 대화방 메뉴를 바로 선택하여 지정할 수 있습니다.<br>
                  * ‘<span class="text_blue">등록완료</span>’를 클릭하여 선택해 주세요.
                </span>
              </div>
            </div>
          </div>
          <Pagination v-if="totalCount > 0" :total="totalCount" :current-page.sync="searchParam.page" :pageSize="searchParam.size" @change="changePage"/>
        </div>
      </div>
    </article>
    <!-- 대화방 메뉴가 있는 양방향대화방 선택 팝업 -->
    <chatbot-list-popup v-if="showChatbotListPopup"
      title="양방향 대화방 목록" desc="자동응답을 사용할 양방향 대화방을 선택하세요. 선택된 대화방으로 바로 이동 하실 수 있습니다." type="twowayHasPsmenu"
      :visible.sync="showChatbotListPopup"
      :brandId="brandId"
      @selectChatbot="goRegisterAutoReply">
    </chatbot-list-popup>
  </div>
</template>

<script>
import BrandTop from '@/views/service/components/BrandTop'
import Breadcrumb from '@/components/global/Breadcrumb'
import Pagination from '@/components/Pagination'
import ChatbotListPopup from '@/views/service/components/chatbot/ChatbotListPopup'
import { getTwowayChatbotList } from '@/api/service/chatbot'
import { retireveAutoReplyList } from '@/api/service/autoReply'
export default {
  name: 'AutoReplyList',
  components: {
    BrandTop,
    Breadcrumb,
    Pagination,
    ChatbotListPopup
  },
  data() {
    return {
      totalCount: 0,
      originSearchParam: null,
      searchParam: {
        group: 'AutoReplyList',
        aprvRet: '',
        inputValue: '',
        orderKey: 'MOD_DT',
        orderValue: 'DESC',
        size: 20,
        page: 1
      },
      brandId: '',
      autoReplyList: [],
      showChatbotListPopup: false
    }
  },
  computed: {
    isOnewayAgency() { return (window.localStorage.getItem('userType') === 'AGENCY' && !window.localStorage.getItem('rcsSvc').includes('chat')) } // 단방향 서비스 제공 대행사인지?
  },
  created () {
    this.brandId = this.$route.params.brandId
  },
  mounted() {
    this.searchParam = this.$store.getters['searchcondition/getSearchCondition'](this.searchParam) // 검색필터값 가져옴
    this.updateOriginSearchParam()
    this.getList()
  },
  methods: {
    getList() {
      this.$store.dispatch('searchcondition/searchAndGo', { searchParam: this.searchParam })
      retireveAutoReplyList(this.brandId, this.originSearchParam).then(res => {
        this.autoReplyList = res.result.autoReplyList
        this.totalCount = res.result.totalSize
      })
    },
    addAutoReply() {
      this.$router.push({ name: 'AutoReplyUnit', params: { brandId: this.brandId } })
    },
    /** 자동응답 등록 */
    showHasPwMenuTwowayPopup() {
      let params = { aprvStatus: 'OK', isTwoWay: 'Y', searchKey: 'SUB_TITLE', searchValue: '', orderKey: 'REG_DT', orderValue: 'ASC', size: 99999, page: 1 }
      getTwowayChatbotList(this.brandId, params).then(res => {
        if (res.code === '20000000') {
          if (res.result.list.length > 0) {
            let hasPsMenuList = res.result.list.filter(x => x.psMenuCnt > 0) // 대화방 메뉴가 있는 양방향 목록만 추려낸다
            if (hasPsMenuList.length > 0) this.showChatbotListPopup = true // 있을 경우 -> 팝업 오픈
            else {
              this.$confirmMsg('대화방 메뉴가 등록된 양방향 대화방이 없습니다.<br>대화방 메뉴를 등록 하시겠습니까?').then(() => {
                this.$router.push({ name: 'PersistentMenuList', params: { brnadId: this.brandId } })
              })
            }
          } else { // 양방향대화방 없음: 양방향대화방 목록 화면 이동
            this.$confirmMsg('개설된 양방향 대화방이 없습니다.<br>양방향 대화방 개설을 진행 하시겠습니까?').then(() => {
              this.$router.push({ name: 'TwowayChatbotList', params: { brandId: this.brandId } })
            })
          }
        }
      }).catch((err) => {
        this.$alertMsg(err.desc).then(() => {})
      })
    },
    /** 양방향 대화방을 선택, 해당 양방향 대화방의 대화방 메뉴 상세로 이동  */
    goRegisterAutoReply(chatbot = null) {
      this.$router.push({ name: 'PersistentMenuUnit', params: { brandId: this.brandId, chatbotId: chatbot.chatbotId, isNew: false } })
    },
    goDetail(armId) {
      this.$router.push({ name: 'AutoReplyDetail', params: { brandId: this.brandId, armId: armId } })
    },
    findSearch() {
      this.updatePageData(1)
      this.updateOriginSearchParam()
      this.getList()
    },
    /** 리스트 사이즈 변경 */
    changeSize() {
      this.updatePageData(1)
      this.originSearchParam.size = this.searchParam.size
      this.getList()
    },
    /** 페이지 변경 */
    changePage(page) {
      this.updatePageData(page)
      this.getList()
    },
    /** 페이지 정보 변경 */
    updatePageData(page) {
      this.searchParam.page = page
      this.originSearchParam.page = page
    },
    updateOriginSearchParam() {
      this.originSearchParam = _.cloneDeep(this.searchParam)
    },
    handleSortChange(sort) {
      this.originSearchParam.orderKey = jglib.convertCamelcaseToSnakecase(sort.prop)
      this.originSearchParam.orderValue = sort.order === 'ascending' ? 'ASC' : 'DESC'
      this.getList()
    },
    convertToNumber(row, column, cellValue, index) {
      return parseInt(cellValue)
    },
    formatterDateAndBlank(row, column, cellValue, index) {
      return jglib.isEmpty(cellValue) ? '-' : jglib.convertDateFormat(cellValue, 'YYYY-MM-DD')
    }
  }
}
</script>
