<template>
  <div class="contents_wrap dashboard_wrap">
    <section class="section">
      <div class="sec_header">
        <div class="title_area left flex">
          <h3 class="h3_title">진행 중인 승인 내역</h3>
          <span class="h3_desc" style="padding-top:7px;">승인 완료되지 않은 신청 건을 확인하세요.(저장/반려 건은 선택 후 수정 및 승인요청이 가능합니다.)</span>
        </div>
        <div class="box_notification">
          <div class="inner" v-if="aprvRetCnt === 0">
            <span class="text_desc">승인결과 알림 없음</span>
          </div>
          <div class="inner" v-else>
            <span class="text_desc">승인결과</span>
            <a href="javascript:void(0);" @click="notificationOpen">
              알림
              <em>{{aprvRetCnt}}</em>
            </a>
          </div>
          <apply-notification-history v-if="visible" :visible.sync="visible" :corpId="$store.state.user.corpId" @resetCount="getApplyList"/>
        </div>
      </div>
      <div class="sec_body">
        <div class="top_dashboard">
          <div class="box_dashboard">
            <div class="total_count">
              <span class="text">승인대기</span>
              <span class="num">{{totWaitingCnt}}</span>
            </div>
            <div class="inner_count">
              <div class="count_list" v-if="userInfoData.userType === 'CORP' && userInfoData.corpAdmYn === 'Y'">
                <span class="text">브랜드</span>
                <span class="num">{{brandWaitingCnt}}</span>
              </div>
              <div class="count_list">
                <span class="text">발신번호</span>
                <span class="num">{{chatbotWaitingCnt}}</span>
              </div>
              <div class="count_list">
                <span class="text">양방향 대화방</span>
                <span class="num">{{chatbotTwowayWaitingCnt}}</span>
              </div>
              <div class="count_list">
                <span class="text">템플릿</span>
                <span class="num">{{tplWaitingCnt}}</span>
              </div>
            </div>
          </div>
          <div class="box_dashboard">
            <div class="total_count return">
              <span class="text">반려</span>
              <span class="num">{{totRejectedCnt}}</span>
            </div>
            <div class="inner_count">
              <div class="count_list" v-if="userInfoData.userType === 'CORP' && userInfoData.corpAdmYn === 'Y'">
                <span class="text">브랜드</span>
                <span class="num">{{brandRejectedCnt}}</span>
              </div>
              <div class="count_list">
                <span class="text">발신번호</span>
                <span class="num">{{chatbotRejectedCnt}}</span>
              </div>
              <div class="count_list">
                <span class="text">양방향 대화방</span>
                <span class="num">{{chatbotTwowayRejectedCnt}}</span>
              </div>
              <div class="count_list">
                <span class="text">템플릿</span>
                <span class="num">{{tplRejectedCnt}}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="box_search_area mar_t20">
          <div class="cont_flex_bundle">
            <span class="custom_select mid col_3">
              <select v-model="searchParam.aprvStatus">
                <option value>전체 상태</option>
                <option v-for="item in statusList" :value="item.code" :key="item.code">{{item.codeNm}}</option>
              </select>
            </span>
            <span class="custom_select mid col_3">
              <select v-model="searchParam.serviceType">
                <option value="ALL">전체 구분</option>
                <option value="BRAND">브랜드</option>
                <option value="CHATBOT">발신번호</option>
                <option value="TWOWAY">양방향 대화방</option>
                <option value="TPL">템플릿</option>
              </select>
            </span>
            <span class="custom_select mid col_6" v-if="userInfoData.userType === 'CORP'">
              <select v-model="searchParam.brandId">
                <option value>전체 브랜드</option>
                <option v-for="item in brandList" :value="item.brandId" :key="item.brandId">{{item.name}}</option>
              </select>
            </span>
            <span class="custom_select mid col_2" v-if="userInfoData.userType === 'AGENCY'">
              <select v-model="searchParam.inputType">
                <option value="CORP">기업명</option>
                <option value="BRAND">브랜드명</option>
              </select>
            </span>
            <span class="custom_input mid col_6" v-if="userInfoData.userType === 'AGENCY'">
              <input type="text" v-model="searchParam.inputValue" placeholder="검색어를 입력하세요." @keypress.enter="search">
            </span>
            <span class="custom_checkbox col_3">
              <input type="checkbox" id="checked01" v-model="searchParam.reqYn">
              <label for="checked01">내가 요청한 건만 보기</label>
            </span>
            <a href="javascript:void(0);" class="btn mid gray" @click="search">검색</a>
          </div>
        </div>
        <div class="box_scroll mar_t20">
          <div class="tbl_sorting_wrap">
            <el-table :data="approvalInfoList" :empty-text="'승인 진행 중인 내역이 없습니다.'" style="width: 100%" @sort-change="handleSortChange">
              <el-table-column prop="aprvRetNm" label="상태" :width="userInfoData.userType === 'AGENCY' ? 140 : 175">
                <template slot-scope="scope">
                  <span class="status" :class="{'refusal':scope.row.aprvRet === 'REJECTED'}">{{ getDisplayAprvNm2(scope.row) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="serviceType" label="구분" :width="userInfoData.userType === 'AGENCY' ? 106 : 125"/>
              <el-table-column prop="corpNm" label="기업명" width="auto" v-if="userInfoData.userType === 'AGENCY'"/>
              <el-table-column prop="name" label="브랜드명" width="auto"/>
              <el-table-column prop="aprvRetDescr" label="요청 상세" :width="userInfoData.userType === 'AGENCY' ? 190 : 230">
                <template slot-scope="scope">
                  <div class="center">
                    <router-link v-if="scope.row.serviceType === '브랜드'" :to="{name:'brand/detail', params:{brandId:scope.row.brandId}}" class="btn_text">
                      {{scope.row.reqDetail}}
                    </router-link>
                    <a v-if="scope.row.serviceType === '발신번호'"  href="javascript:void(0)" class="btn_text" @click="goChatbotDetail(scope.row)">{{scope.row.reqDetail}}</a>
                    <a v-if="scope.row.serviceType === '양방향 대화방'"  href="javascript:void(0)" class="btn_text" @click="goChatbotDetail(scope.row)">{{scope.row.reqDetail}}</a>
                    <span v-if="scope.row.serviceType === '템플릿'" class="btn_text" style="cursor: pointer;" @click="goTemplateDetail(scope.row)">{{scope.row.reqDetail}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="regUserNm" label="요청자" :width="userInfoData.userType === 'AGENCY' ? 108 : 158"/>
              <el-table-column prop="aprvReqDt" label="승인요청일" sortable="custom" width="178" :formatter="formatterBlank"/>
              <el-table-column prop="aprvDt" label="승인일" width="178" :formatter="formatterBlank">
                <template slot-scope="scope">
                  <span
                    v-if="scope.row.aprvRet === 'WAITING' || scope.row.aprvRet === 'INSPECTING' || scope.row.aprvRet === 'SAVED'"
                  >-</span>
                  <span v-else>{{scope.row.aprvDt}}</span>
                </template>
              </el-table-column>
            </el-table>
            <pagination :total="approvalInfoSize" :pageSize="searchParam.size" @change="changePage" :current-page.sync="searchParam.page" v-if="approvalInfoSize > 5"/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import ApplyNotificationHistory from '@/views/service/components/ApplyNotificationHistory'
import { retrieveCommonCode } from '@/api/common/code'
import { getDisplayAprvNm2 } from '@/utils/string'

import {
  approvalCnt,
  waitingCnt,
  rejectedCnt,
  approvalInfo,
  brandAllList
} from '@/api/service/service'

export default {
  components: {
    Pagination,
    ApplyNotificationHistory
  },
  props: {
    userInfoData: {
      type: Object,
      default() {
        return {}
      }
    },
    data: {
      type: String
    }
  },
  data() {
    return {
      aprvRetCnt: '',
      brandWaitingCnt: '',
      chatbotWaitingCnt: '',
      chatbotTwowayWaitingCnt: '',
      tplWaitingCnt: '',
      totalWaitingCnt: '',
      totWaitingCnt: '',
      brandRejectedCnt: '',
      chatbotRejectedCnt: '',
      chatbotTwowayRejectedCnt: '',
      tplRejectedCnt: '',
      totRejectedCnt: '',
      originSearchParam: null,
      searchParam: {
        group: 'dashboardApplyList',
        page: 1,
        size: 5,
        orderKey: 'APRV_REQ_DT',
        orderValue: 'DESC',
        aprvStatus: '',
        serviceType: 'ALL',
        brandId: '',
        inputType: 'CORP',
        inputValue: '',
        reqYn: false
      },
      approvalCntData: {
        aprvStatus: '',
        serviceType: 'ALL',
        brandId: '',
        reqYn: false
      },
      approvalInfoList: [],
      approvalInfoSize: 0,
      visible: false,
      brandList: [],
      statusList: []
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('searchcondition/searchAndGo', { searchParam: this.searchParam })
    next()
  },
  created() {
    this.getApplyList()
    // 진행 중인 승인 내역 필터 각 리스트 조회
    retrieveCommonCode('BRAND_APRV_RET_FRT1').then(res => {
      this.statusList = res.result
    })
    brandAllList().then(res => {
      this.brandList = res.result
    })
  },
  mounted() {
    this.searchParam = this.$store.getters['searchcondition/getSearchCondition'](this.searchParam)
    this.updateOriginSearchParam()
    this.getApprovalInfo()
  },
  computed: {},
  methods: {
    getDisplayAprvNm2,
    // 페이지 변경시 호출
    changePage(page) {
      // 진행 중인 승인 내역 조회
      this.updatePageData(page)
      this.getApprovalInfo()
    },
    handleSortChange(sort) {
      this.updatePageData(1)
      this.originSearchParam.orderKey = jglib.convertCamelcaseToSnakecase(sort.prop)
      this.originSearchParam.orderValue = sort.order === 'ascending' ? 'ASC' : 'DESC'
      this.getApprovalInfo()
    },
    notificationOpen() {
      this.visible = true
    },
    search() {
      this.updatePageData(1)
      this.updateOriginSearchParam()
      this.getApprovalInfo()
    },
    formatterBlank(row, column, cellValue, index) {
      return jglib.isEmpty(cellValue) ? '-' : cellValue
    },
    getApplyList() {
      // 승인결과알림 카운트
      approvalCnt().then(res => {
        this.aprvRetCnt = ''
        this.aprvRetCnt = res.result.aprvRetCnt
      })
      // 승인대기 건수 카운트
      waitingCnt(this.approvalCntData).then(res => {
        this.tplWaitingCnt = res.result.tplWaitingCnt
        this.chatbotWaitingCnt = res.result.chatbotWaitingCnt
        this.chatbotTwowayWaitingCnt = res.result.twowayWaitingCnt
        this.brandWaitingCnt = res.result.brandWaitingCnt
        this.totWaitingCnt = res.result.totWaitingCnt
      })
      // 승인반려 건수 카운트
      rejectedCnt(this.approvalCntData).then(res => {
        this.brandRejectedCnt = res.result.brandRejectedCnt
        this.chatbotRejectedCnt = res.result.chatbotRejectedCnt
        this.chatbotTwowayRejectedCnt = res.result.twowayRejectedCnt
        this.totRejectedCnt = res.result.totRejectedCnt
        this.tplRejectedCnt = res.result.tplRejectedCnt
      })
    },
    getApprovalInfo() {
      // 진행 중인 승인 내역 조회
      this.$store.dispatch('searchcondition/searchAndGo', { searchParam: this.searchParam })
      approvalInfo(this.originSearchParam).then(res => {
        this.approvalInfoList = res.result.apprInfoList
        this.approvalInfoSize = res.result.totalSize
      })
    },
    updatePageData(page) {
      this.searchParam.page = page
      this.originSearchParam.page = page
    },
    updateOriginSearchParam() {
      this.originSearchParam = JSON.parse(JSON.stringify(this.searchParam))
    },
    /** 템플릿 상세 이동 */
    goTemplateDetail(row) {
      let isImageTemplate = row.tplFormId.startsWith('IT')
      if (isImageTemplate) {
        let theme = row.tplFormId.substring(2, 5)
        let type = row.tplFormId.substring(5, 6)
        this.$store.dispatch('setThemeType', { theme: theme, type: type })
      }
      let router = { name: isImageTemplate ? 'ImageTemplateDetail' : 'TemplateDetail', params: { brandId: row.brandId, tplId: row.corpId } }
      this.$router.push(router)
    },
    /** 챗봇 상세 이동 */
    goChatbotDetail(row) {
      this.$router.push({
        name: row.serviceType === '발신번호' ? 'OnewayChatbotDetail' : 'TwowayChatbotDetail',
        params: { brandId: row.brandId, chatbotId: row.reqDetail }
      })
    }
  }
}
</script>
