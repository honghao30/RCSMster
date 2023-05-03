<template>
  <div class="rcs_container service_wrap">
    <article id="content" class="content">
      <div class="box_breadcrumb">
        <breadcrumb :depth1MenuId="'M0200'" :depth2MenuId="'M0201'" :depth3MenuId="'양방향 관리'"/>
      </div>
      <!-- 브랜드 상단 -->
      <brand-top active="twoway" :brandId="brandId"></brand-top>
      <div class="contents_wrap callerid_wrap">
        <div class="title_area mar_b30">
          <h3 class="h3_title">양방향 대화방 관리</h3>
        </div>
        <div class="box_search_area mar_b30">
          <div class="cont_flex_bundle">
            <span class="custom_select mid col_3">
              <select v-model="searchParam.aprvStatus">
                <option value>전체 상태</option>
                <option
                  v-for="item in statusList"
                  :value="item.code"
                  :key="item.code"
                >{{item.codeNm}}</option>
              </select>
            </span>
            <span class="custom_select mid col_3">
              <select v-model="searchParam.serviceKind">
                <option value>전체 유형</option>
                <option
                  v-for="item in serviceList"
                  :value="item.code"
                  :key="item.code"
                >{{item.codeNmAlt1}}</option>
              </select>
            </span>
            <span class="custom_select mid col_3">
              <select v-model="searchParam.searchKey">
                <option value="SUB_TITLE">대화방 명</option>
                <option value="MDN">발신번호</option>
                <option value="CHATBOT_ID">대화방ID</option>
                <option value="REG_USER_NAME">등록자</option>
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
        <div class="search_result">
          <div class="cont_flex_bundle">
            <div class="total_area eft col_6">
              <span class="total_count">
                총
                <strong class="count">{{this.totalCount}}</strong> 건
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
              <span class="group" v-if="existChatService">
                <a href="javascript:void(0);" style="width:100px" class="btn sml bd_gray type2" @click="exhibit"><span>전시</span></a>
                <a href="javascript:void(0);" style="width:100px" class="btn sml bd_gray type2" @click="nonExhibit"><span>비전시</span></a>
              </span>
              <span class="group">
                <a href="javascript:void(0);" class="btn sml bd_black type2" @click="goTwoWayRegistration">
                  <span>양방향 대화방 등록</span>
                </a>
              </span>
            </div>
          </div>
          <div class="box_scroll mar_t20">
            <div class="tbl_sorting_wrap tbl_plr0">
              <el-table
                :data="callingTwoWayManagementList"
                style="width: 100%"
                :empty-text="emptyText"
                @sort-change="handleSortChange"
                @selection-change="selectAll()">
                <el-table-column type="selection" width="50" v-if="existChatService">
                  <template slot-scope="scope">
                    <el-checkbox :disabled="scope.row.aprvRet !== 'OK'?scope.row.disable=true:scope.row.disable=false"
                     v-model="scope.row.checked"></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column prop="no" label="번호" width="70" v-if="existChatService" :formatter="convertToNumber"></el-table-column>
                <el-table-column prop="serviceNm" label="유형" width="85" v-if="existChatService"></el-table-column>
                <el-table-column prop="no" label="번호" width="95" v-if="!existChatService" :formatter="convertToNumber"></el-table-column>
                <el-table-column prop="serviceNm" label="유형" width="110" v-if="!existChatService"></el-table-column>
                <el-table-column prop="subTitle" align="left" label="대화방 명" width="160">
                  <template slot-scope="scope">
                    <router-link
                      :to="{name:'TwoWayRetrieveApprovalStat', params:{chatbotId:scope.row.chatbotId, brandId:scope.row.brandId}}"
                      class="btn_text"
                    >{{scope.row.subTitle}}</router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="chatbotId" label="발신번호/대화방 ID" width="110"></el-table-column>
                <el-table-column prop="dispNm" label="전시상태" width="115"></el-table-column>
                <el-table-column prop="inputFieldYn" label="메시지 입력" width="85"></el-table-column>
                <el-table-column prop="psMenuYn" label="대화방 메뉴" width="80"></el-table-column>
                <el-table-column prop="autoReplyMsgYn" label="자동 응답" width="70"></el-table-column>
                <el-table-column prop="regUserNm" label="등록자" width="95"></el-table-column>
                <el-table-column prop="regDt" label="등록일" sortable="custom" width="115"></el-table-column>
                <el-table-column prop="aprvRet" label="상태" width="125">
                  <template slot-scope="scope">
                    <span
                      class="status"
                      :class="{
                        'accept': scope.row.aprvRet === 'OK',
                        'refusal': scope.row.aprvRet === 'REJECTED',
                        'saved': scope.row.aprvRet === 'SAVED'
                      }"
                    >{{ getDisplayAprvNm2(scope.row) }}</span>
                    <!-- <span
                      class="status accept"
                      v-if="scope.row.aprvRet === 'OK'"
                    >{{scope.row.aprvRetNm}}</span>
                    <span
                      class="status"
                      v-if="scope.row.aprvRet === 'WAITING' || scope.row.aprvRet === 'INSPECTED' || scope.row.aprvRet === 'INSPECTING'"
                    >{{scope.row.aprvRetNm}}</span>
                    <span
                      class="status refusal"
                      v-if="scope.row.aprvRet === 'REJECTED'"
                    >{{scope.row.aprvRetNm}}</span>
                    <span
                      class="status saved"
                      v-if="scope.row.aprvRet === 'SAVED'"
                    >{{scope.row.aprvRetNm}}</span> -->
                  </template>
                </el-table-column>
                <el-table-column prop="aprvDt" label="승인일" sortable="custom" width="120" :formatter="formatterBlank"></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
      <Pagination
        :total="totalCount"
        @change="changePage"
        :current-page.sync="searchParam.page"
        :pageSize="searchParam.size"
        v-if="totalCount > 0"
      />
    </article>
  </div>
</template>

<script>
import BrandTop from '@/views/service/components/BrandTop'
import { retrieveCommonCode } from '@/api/common/code'
import {
  getCallingTwoWayManagementList,
  setCallingTwowayManagementList
} from '@/api/service/callingTwoWayManagement'
import Pagination from '@/components/Pagination'
import Breadcrumb from '@/components/global/Breadcrumb'
import { getDisplayAprvNm2 } from '@/utils/string'

export default {
  name: 'CallingTwoWayManagement',
  data() {
    return {
      searchParam: {
        group: 'CallingTwoWayManagement',
        aprvStatus: '',
        serviceKind: '',
        searchKey: 'SUB_TITLE',
        searchValue: '',
        orderKey: 'REG_DT',
        orderValue: 'ASC',
        size: 20,
        page: 1,
        isTwoWay: 'Y'
      },
      originSearchParam: null,
      brandId: '',
      callingTwoWayManagementList: [],
      statusList: [],
      serviceList: [],
      totalCount: 0,
      userCd: '',
      totalFullCount: 0,
      allSelected: false
    }
  },
  computed: {
    checkedList() {
      return this.callingTwoWayManagementList.filter(
        row => row.checked === true
      )
    },
    userType() {
      return this.$store.state.user.userType
    },
    emptyText() {
      let txt = ''
      if (this.totalFullCount === 0) {
        txt = '등록된 양방향 대화방이 없습니다.'
      } else {
        txt = '검색 결과가 없습니다.'
      }
      return txt
    },
    existChatService() {
      // AGENCY이면서 제공서비스가 chat이 없는 경우 버튼처리
      let rcsSvcInfo = this.$store.state.user.corpInfo.rcsSvc
      if (this.$store.state.user.userType === 'AGENCY' && !jglib.isEmpty(rcsSvcInfo) && rcsSvcInfo.indexOf('chat') === -1) {
        return false
      } else {
        return true
      }
    }
  },
  watch: {},
  components: {
    Pagination,
    BrandTop,
    Breadcrumb
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('searchcondition/searchAndGo', { searchParam: this.searchParam })
    next()
  },
  created() {
    retrieveCommonCode('CHATBOT_APRV_RET_FRT1').then(res => {
      this.statusList = res.result
    })
    retrieveCommonCode('CHATBOT_TYPE').then(res => {
      this.serviceList = res.result
    })
    this.userCd = this.$store.state.user.userCd
    this.brandId = this.$route.params.brandId
  },
  mounted() {
    this.searchParam = this.$store.getters['searchcondition/getSearchCondition'](this.searchParam)
    this.updateOriginSearchParam()
    this.getList()
  },
  methods: {
    getDisplayAprvNm2,
    convertToNumber(row, column, cellValue, index) {
      return parseInt(cellValue)
    },
    findSearch() {
      this.updatePageData(1)
      this.updateOriginSearchParam()
      this.getList()
    },
    getList() {
      this.$store.dispatch('searchcondition/searchAndGo', { searchParam: this.searchParam })
      getCallingTwoWayManagementList(this.originSearchParam, this.brandId)
        .then(res => {
          this.totalCount = Number(res.result.totalSize)
          this.totalFullCount = Number(res.result.totalFullCount)
          let list = res.result.list
          list.forEach(row => {
            row['checked'] = false
            row['disable'] = false
          })
          this.callingTwoWayManagementList = list
        })
        .catch(res => {
          this.$alertMsg(res.desc)
        })
    },
    exhibit() {
      if (!this.validationCheck()) {
        return false
      }
      this.$confirmMsg('선택하신 번호를 모두 전시 처리하시겠습니까?', '타이틀', '확인', '취소')
        .then(res => {
          let nonExhibitList = []
          this.checkedList.forEach(row => {
            if (row.display === '00') {
              nonExhibitList.push(row.chatbotId)
            }
          })
          let data = {
            display: '01',
            chatbotIds: nonExhibitList
          }
          setCallingTwowayManagementList(data, this.brandId)
            .then(res => {
              if (res.code === '20000000') {
                this.getList()
              }
            })
            .catch(res => {
              this.$alertMsg(res.desc)
            })
        })
        .catch(res => {})
    },
    nonExhibit() {
      if (!this.validationCheck()) {
        return false
      }
      this.$confirmMsg('선택하신 번호를 모두 비전시 처리하시겠습니까?', '타이틀', '확인', '취소')
        .then(res => {
          let nonExhibitList = []
          this.checkedList.forEach(row => {
            if (row.display === '01') {
              nonExhibitList.push(row.chatbotId)
            }
          })
          let data = {
            display: '00',
            chatbotIds: nonExhibitList
          }
          setCallingTwowayManagementList(data, this.brandId)
            .then(res => {
              if (res.code === '20000000') {
                this.getList()
              }
            })
            .catch(res => {
              this.$alertMsg(res.desc)
            })
        })
        .catch(res => {})
    },
    validationCheck() {
      if (this.checkedList.length === 0) {
        this.$alertMsg('목록을 선택해주세요')
        return false
      }
      return true
    },
    goIndividualRegistration() {
      this.$router.push({
        name: 'IndividualRegistration',
        params: { brandId: this.brandId }
      })
    },
    goQuantityRegistration() {
      this.$router.push({
        name: 'QuantityRegistration',
        params: { brandId: this.brandId }
      })
    },
    changePage(page) {
      this.updatePageData(page)
      this.getList()
    },
    changeSize() {
      this.originSearchParam.size = this.searchParam.size
      this.updatePageData(1)
      this.getList()
    },
    handleSortChange(sort) {
      this.originSearchParam.orderKey = jglib.convertCamelcaseToSnakecase(sort.prop)
      this.originSearchParam.orderValue = sort.order === 'ascending' ? 'DESC' : 'ASC'
      this.getList()
    },
    formatterBlank(row, column, cellValue, index) {
      return jglib.isEmpty(cellValue) ? '-' : cellValue
    },
    goTwoWayRegistration() {
      this.$router.push({
        name: 'TwoWayRegistration',
        params: { brandId: this.brandId }
      })
    },
    selectAll() {
      if (this.allSelected) {
        this.allSelected = false
        this.callingTwoWayManagementList.forEach((data) => {
          if (!data.disable) {
            data.checked = this.allSelected
          }
        })
      } else {
        this.allSelected = true
        this.callingTwoWayManagementList.forEach((data) => {
          if (!data.disable) {
            data.checked = this.allSelected
          }
        })
      }
    },
    updatePageData(page) {
      this.searchParam.page = page
      this.originSearchParam.page = page
    },
    updateOriginSearchParam () {
      this.originSearchParam = JSON.parse(JSON.stringify(this.searchParam))
    }
  }
}
</script>
