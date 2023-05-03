<template>
  <div class="rcs_container service_wrap">
    <article id="content" class="content">
      <div class="box_breadcrumb">
        <breadcrumb :depth1MenuId="'M0200'" :depth2MenuId="'M0201'" :depth3MenuId="'발신번호 관리'"/>
      </div>
      <!-- 브랜드 상단 -->
      <brand-top active="sendnum" :brandId="brandId"></brand-top>
      <div class="contents_wrap callerid_wrap">
        <div class="title_area mar_b30">
          <h3 class="h3_title">단방향 대화방 관리</h3>
        </div>
        <div class="box_search_area mar_b30">
          <div class="cont_flex_bundle">
            <span class="custom_select mid col_3">
              <select v-model="searchParam.aprvStatus">
                <option value>상태 전체</option>
                <option
                  v-for="item in statusList"
                  :value="item.code"
                  :key="item.code"
                >{{item.codeNm}}</option>
              </select>
            </span>
            <span class="custom_select mid col_3">
              <select v-model="searchParam.searchKey">
                <option value="MDN">발신번호</option>
                <option value="SUB_TITLE">대화방 명</option>
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
              <span class="group">
                <a href="javascript:void(0);" style="width:100px" class="btn sml bd_gray type2" @click="exhibit"><span>전시</span></a>
                <a href="javascript:void(0);" style="width:100px" class="btn sml bd_gray type2" @click="nonExhibit"><span>비전시</span></a>
              </span>
              <span class="group">
                <a href="javascript:void(0);" class="btn sml bd_black type2" @click="goIndividualRegistration"><span>개별등록</span></a>
                <a href="javascript:void(0);" class="btn sml bd_black type2" @click="goQuantityRegistration"><span>대량등록</span></a>
              </span>
            </div>
          </div>
          <div class="box_scroll mar_t20">
            <div class="tbl_sorting_wrap">
              <el-table
                :data="callingNumberManagementList"
                style="width: 100%"
                empty-text="검색 결과가 없습니다."
                @sort-change="handleSortChange"
                @selection-change="selectAll()">
                <el-table-column type="selection" width="50">
                  <template slot="header"></template>
                  <template slot-scope="scope">
                    <el-checkbox :disabled="(scope.row.aprvRet !== 'OK' || scope.row.defMdnYn === 'Y' || scope.row.twowayYn === 'Y')?scope.row.disable=true:scope.row.disable=false"
                     v-model="scope.row.checked"></el-checkbox>
                  </template>
                </el-table-column>
                <el-table-column prop="subTitle" label="대화방명" sortable="custom" width="*">
                  <template slot-scope="scope">
                    <div class="left">
                      <router-link v-if="scope.row.twowayYn === 'Y'" class="btn_text" :to="{name:'TwoWayRetrieveApprovalStat', params:{chatbotId:scope.row.chatbotId, brandId:scope.row.brandId, fromTwoWay: 'N'}}">{{scope.row.subTitle}}</router-link>
                      <router-link v-else class="btn_text" :to="{name:'RetrieveApprovalStat', params:{chatbotId:scope.row.chatbotId, brandId:scope.row.brandId}}">{{scope.row.subTitle}}</router-link>
                      <span class="label label_rep" v-if="scope.row.defMdnYn === 'Y'">대표</span>
                      <span class="label label_bot" v-if="scope.row.twowayYn === 'Y'">양방향</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="mdn" label="발신번호" width="165" align="left">
                  <template slot-scope="scope">
                    <div class="tooltip_down_area">
                      <a class="btn_down" @click="downloadFile(scope.row.brandId, scope.row.chatbotId)"></a>
                      <span class="tooltip">가입증명원 다운로드</span>
                    </div>
                    <span v-if="scope.row.massYn === 'Y'">{{scope.row.reqDetail}}</span>
                    <span v-if="scope.row.massYn === 'N'">{{scope.row.mdn}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="dispNm" label="전시상태" width="110"></el-table-column>
                <el-table-column prop="massNm" label="등록방법" width="110"></el-table-column>
                <el-table-column prop="chType" label="채널" width="80"></el-table-column>
                <el-table-column prop="regUserNm" label="등록자" width="110"></el-table-column>
                <el-table-column prop="regDt" label="요청일" sortable="custom" width="125"></el-table-column>
                <el-table-column prop="aprvRet" label="상태" width="130">
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
                <el-table-column prop="aprvDt" label="승인일" sortable="custom" width="125" :formatter="formatterBlank"></el-table-column>
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
  getCallingNumberManagementList,
  setCallingNumberManagementList,
  downloadFile
} from '@/api/service/callingNumberManagement'
import Pagination from '@/components/Pagination'
import Breadcrumb from '@/components/global/Breadcrumb'
import { getDisplayAprvNm2 } from '@/utils/string'

export default {
  name: 'CallingNumberManagement',
  data() {
    return {
      searchParam: {
        group: 'CallingNumberManagement',
        aprvStatus: '',
        searchKey: 'MDN',
        searchValue: '',
        orderKey: 'REG_DT',
        orderValue: 'DESC',
        size: 20,
        page: 1
      },
      originSearchParam: null,
      brandId: '',
      callingNumberManagementList: [],
      statusList: [],
      totalCount: 0,
      userCd: '',
      allSelected: false
    }
  },
  computed: {
    checkedList() {
      return this.callingNumberManagementList.filter(
        row => row.checked === true
      )
    },
    userType() {
      return this.$store.state.user.userType
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
    downloadFile(brandId, chatbotId) {
      downloadFile(brandId, chatbotId)
        .then(function(response) {
          const url = window.URL.createObjectURL(
            new Blob([response.data], { type: response.headers['content-type'] })
          )
          const cd = response.headers['content-disposition']
          const index = cd.indexOf("filename*=UTF-8''") + "filename*=UTF-8''".length
          const filename = decodeURIComponent(cd.substring(index, cd.length))

          const link = document.createElement('a')
          link.href = url
          link.setAttribute('download', filename)
          document.body.appendChild(link)
          link.click()
        })
        .catch(err => {
          try {
            err.desc.text()
              .then(data => {
                if (data) {
                  data = JSON.parse(data)
                  // this.$alertMsg(data.desc)
                }
                this.$alertMsg('파일이 존재하지 않아 다운로드 할 수 없습니다.')
              })
              .catch(e => {
                this.$alertMsg('파일이 존재하지 않아 다운로드 할 수 없습니다.')
              })
          } catch (e) {
            this.$alertMsg('파일이 존재하지 않아 다운로드 할 수 없습니다.')
          }
        })
    },
    findSearch() {
      this.updatePageData(1)
      this.updateOriginSearchParam()
      this.getList()
    },
    getList() {
      this.$store.dispatch('searchcondition/searchAndGo', { searchParam: this.searchParam })
      getCallingNumberManagementList(this.originSearchParam, this.brandId)
        .then(res => {
          this.totalCount = Number(res.result.totalSize)
          let list = res.result.list
          list.forEach(row => {
            row['checked'] = false
            row['disable'] = false
          })
          this.callingNumberManagementList = list
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
          setCallingNumberManagementList(data, this.brandId)
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
          let exhibitList = []
          this.checkedList.forEach(row => {
            if (row.display === '01') {
              exhibitList.push(row.chatbotId)
            }
          })
          let data = {
            display: '00',
            chatbotIds: exhibitList
          }
          setCallingNumberManagementList(data, this.brandId)
            .then(res => {
              if (res.code === '20000000') {
                this.getList()
              }
            })
            .catch(res => {
              this.$alertMsg(res.desc)
            })
            .catch(res => {})
        })
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
      this.updatePageData(1)
      this.originSearchParam.size = this.searchParam.size
      this.getList()
    },
    handleSortChange(sort) {
      this.originSearchParam.orderKey = jglib.convertCamelcaseToSnakecase(sort.prop)
      this.originSearchParam.orderValue = sort.order === 'ascending' ? 'ASC' : 'DESC'
      this.getList()
    },
    formatterBlank(row, column, cellValue, index) {
      return jglib.isEmpty(cellValue) ? '-' : cellValue
    },
    selectAll() {
      if (this.allSelected) {
        this.allSelected = false
        this.callingNumberManagementList.forEach((data) => {
          if (!data.disable) {
            data.checked = this.allSelected
          }
        })
      } else {
        this.allSelected = true
        this.callingNumberManagementList.forEach((data) => {
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
