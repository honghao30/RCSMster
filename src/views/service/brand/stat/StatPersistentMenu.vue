<template>
  <div class="rcs_container service_wrap">
    <article id="content" class="content">
      <div class="box_breadcrumb">
        <breadcrumb :depth1MenuId="'M0200'" :depth2MenuId="'M0201'" :depth3MenuId="'대화방 메뉴 통계'"/>
      </div>
      <brand-top active="statPersistentMenu" :brandId="brandId"></brand-top>
      <div class="contents_wrap callerid_wrap">
        <div class="title_area mar_b30">
          <h3 class="h3_title">대화방 메뉴 통계</h3>
        </div>
        <section class="section mar_b0">
          <div class="sec_header">
            <ul class="bullet_list fs18 mar_b30">
              <li>대화방별 1건 이상 사용자선택이 일어난 경우에 대해 집계됩니다.</li>
            </ul>
            <div class="box_search_area dv2023_search-ps mar_b30">
              <div class="cont_flex_bundle">
                <div class="filter_bundle col_5">
                  <!-- <strong class="tit_bundle" style="width: 150px">발신번호/대화방ID</strong> -->
                  <div class="box_select select_40">
                    <a href="javascript:void(0);" class="btn_arrow" v-if="!searchParam.chatbotId" @click="toggleSelect('chatbot')">발신번호/대화방ID 전체</a>
                    <a href="javascript:void(0);" class="btn_arrow" v-if="searchParam.chatbotId" @click="toggleSelect('chatbot')">{{ addHyphenTelNum(searchParam.chatbotId) }}</a>
                    <div class="select_search_area" v-if="find.chatbot.flag">
                      <span class="custom_input">
                        <input type="text" placeholder="검색어를 입력하세요" v-model="find.chatbot.text" @input="find.chatbot.text=$event.target.value" @keyup="findChatbot">
                        <a href="javascript:void(0);" class="btn_search" @click="findChatbot"></a>
                      </span>
                      <ul class="select box_scrollY">
                        <li class="option" v-if="!find.chatbot.text"><a href="javascript:void(0);" @click="selectChatbot({chatbotId: ''})">전체</a></li>
                        <li class="option" v-for="(obj, index) in this.find.chatbot.list" :key="index">
                          <a href="javascript:void(0);" @click="selectChatbot(obj)">{{ addHyphenTelNum(obj.chatbotId) }}</a>
                        </li>
                        <li class="option" v-if="find.chatbot.text && find.chatbot.list.length === 0">
                          <a href="javascript:void(0);">일치하는 데이터가 없습니다.</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="filter_bundle col_6">
                  <!-- <strong class="tit_bundle">기간</strong> -->
                  <div class="cont_bundle">
                    <div class="cont_flex_bundle ">
                      <FromTo :searchParam.sync="searchParam" :periodCondition="periodCondition"></FromTo>
                    </div>
                  </div>
                  <span>- 최근 1년 6개월 이내 기간 중 최대 31일까지 검색 가능합니다.</span>
                </div>
                <div class="filter_bundle col_8">
                  <a href="javascript:void(0);" class="btn sml gray col_1" @click="search"><span>검색</span></a>
                </div>
              </div>
<!--              <div class="cont_flex_bundle mar_t20">-->
<!--                <div class="filter_bundle full_width">-->
<!--                  <strong class="tit_bundle">기간</strong>-->
<!--                  <div class="cont_bundle">-->
<!--                    <div class="cont_flex_bundle date_checkbox">-->
<!--                      <FromTo :searchParam.sync="searchParam" :periodCondition="periodCondition" descr="※ 최근 1년 6개월 이내 기간 중 최대 31일까지 검색 가능합니다."></FromTo>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                </div>-->
<!--                <div class="filter_bundle col_8">-->
<!--                  <a href="javascript:void(0);" class="btn sml gray col_1" @click="search"><span>검색</span></a>-->
<!--                </div>-->
<!--              </div>-->
            </div>
          </div>
          <!-- 리스트 -->
          <div class="sec_body">
            <div class="cont_flex_bundle">
              <div class="total_area eft col_6">
                <span class="total_count">
                  총
                  <strong class="count">{{ totalCount }}</strong> 건
                </span>
                <!-- <span class="custom_select sml">
                  <select v-model="searchParam.size" @change="changeSize">
                    <option value="20">20개</option>
                    <option value="50">50개</option>
                    <option value="100">100개</option>
                  </select>
                </span> -->
              </div>
              <div class="btn_wrap right col_6">
                <span class="group">
                  ※ 1일 내 동일 고객의 버튼 클릭 수 제외&nbsp;&nbsp;&nbsp;
                  <a href="javascript:void(0);" class="btn sml type2" :class="list.length > 0 ? 'bd_black' : 'bd_gray'" @click="downloadExcel">
                    <span>엑셀 다운로드</span>
                  </a>
                </span>
              </div>
            </div>
            <div class="box_scroll mar_t20">
              <div class="tbl_sorting_wrap">
                <el-table :data="list" empty-text="검색 결과가 없습니다." :span-method="objectSpanMethod"  @sort-change="handleSortChange" :cell-style="{padding: '0', height: '50px'}">
                  <el-table-column prop="statDate" label="날짜" width="110" sortable="custom">
                    <template v-slot:default="scope">{{ dateFormatWithDayOfWeek(scope.row.statDate, 'day') }}</template>
                  </el-table-column>
                  <el-table-column prop="chatbotId" label="발신번호/대화방ID" width="220">
                    <template v-slot:default="scope">{{ addHyphenTelNum(scope.row.chatbotId) }}</template>
                  </el-table-column>
                  <el-table-column prop="" label="대화방 메뉴명" width="250">
                    <template v-slot:default="scope">{{ scope.row.upTitle ? scope.row.upTitle : scope.row.btnDisplayText }}</template>
                  </el-table-column>
                  <el-table-column prop="" label="하위 메뉴명" width="220">
                    <template v-slot:default="scope">{{ scope.row.postbackType === 'PSM' && scope.row.upTitle ? scope.row.btnDisplayText : '-' }}</template>
                  </el-table-column>
                  <el-table-column prop="" label="응답유형" width="150">
                    <template v-slot:default="scope"><span v-html="_getActionTypeDescPSM(scope.row)"/></template>
                  </el-table-column>
                  <el-table-column prop="wholeCnt" label="클릭수" width="110">
                    <template v-slot:default="scope">{{ !scope.row.upPostbackId ? moneyFormat(scope.row.wholeCnt) : moneyFormat(scope.row.btnClickCount) }}</template>
                  </el-table-column>
                  <el-table-column label="응답 메시지 버튼">
                    <el-table-column prop="" label="버튼명" width="250">
                      <template v-slot:default="scope">{{ scope.row.postbackType === 'ARM' ? scope.row.btnDisplayText : scope.row.thirdDisplayText ? scope.row.thirdDisplayText : '-' }}</template>
                    </el-table-column>
                    <el-table-column prop="" label="버튼유형" width="180">
                      <template v-slot:default="scope"><span v-html="_getActionTypeDescARM(scope.row)"/></template>
                    </el-table-column>
                    <el-table-column prop="" label="버튼클릭수" width="123">
                      <template v-slot:default="scope">{{ scope.row.postbackType === 'ARM' ? moneyFormat(scope.row.btnClickCount) : scope.row.thirdClickCount ? scope.row.thirdClickCount : '-' }}</template>
                    </el-table-column>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <!-- <pagination v-if="list.length > 0" :total="totalCount" @change="changePage" :current-page.sync="searchParam.page" :pageSize="searchParam.size"/> -->
          </div>
        </section>
      </div>
    </article>
  </div>
</template>

<script>
import moment from 'moment'
import BrandTop from '@/views/service/components/BrandTop'
import FromTo from '@/components/FromTo'
// import Pagination from '@/components/Pagination'
import Breadcrumb from '@/components/global/Breadcrumb'
import { getStatMessageExcel, getStatMessageFilter, getStatMessageList } from '@/api/service/stat/stat'
import { addHyphenTelNum, dateFormatWithDayOfWeek, moneyFormat } from '@/utils/textUtil'
import { getActionTypeDesc } from '@/utils/string'

export default {
  name: 'StatPersistentMenu',
  components: {
    BrandTop,
    FromTo,
    // Pagination,
    Breadcrumb
  },
  data() {
    return {
      searchedParam: null,
      searchParam: {
        group: 'statPersistentMenu',
        statType: 'statPersistentMenu',
        brandId: '',
        chatbotId: '',
        postbackId: '',
        bgn: moment().add(-6, 'days').format('YYYYMMDD'),
        end: moment().format('YYYYMMDD'),
        sortColumn: null,
        sortDirection: null
        // page: 1,
        // size: 20
      },
      originSearchParam: null,
      periodCondition: {
        // 1년 6월 이전 선택 불가
        disablePastDays: moment().add(-1, 'year').add(-6, 'month').format('YYYYMMDD')
      },
      brandId: '',
      chatbotList: [],
      groupList: [],
      totalCount: 0,
      list: [],
      find: {
        chatbot: {
          flag: false,
          text: '',
          list: []
        }
      }
    }
  },
  computed: {
    userType() {
      return this.$store.state.user.userType
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('searchcondition/searchAndGo', { searchParam: this.searchParam })
    next()
  },
  created() {
    this.userCd = this.$store.state.user.userCd
    this.brandId = this.$route.params.brandId
    this.searchParam.brandId = this.$route.params.brandId
  },
  mounted() {
    this.searchParam = this.$store.getters['searchcondition/getSearchCondition'](this.searchParam)
    this.updateOriginSearchParam()
    this.init()
  },
  methods: {
    moneyFormat,
    addHyphenTelNum,
    dateFormatWithDayOfWeek,
    init() {
      getStatMessageFilter(this.searchParam)
        .then(response => {
          if (response.code === '20000000') {
            const data = response.result
            Object.keys(data).forEach(o => {
              if (o === 'chatbotList') {
                this.chatbotList = data.chatbotList
              }
              if (o === 'postbackList') {
                this.postbackList = data.postbackList
              }
            })
          }
        })
      this.dispatch()
    },
    search() {
      // this.updatePageData(1)
      this.updateOriginSearchParam()
      this.dispatch()
    },
    // changePage(page) {
    //   this.updatePageData(page)
    //   this.dispatch()
    // },
    // changeSize() {
    //   this.originSearchParam.size = this.searchParam.size
    //   this.updatePageData(1)
    //   this.dispatch()
    // },
    dispatch() {
      this.searchedParam = JSON.parse(JSON.stringify(this.searchParam))
      this.$store.dispatch('searchcondition/searchAndGo', { searchParam: this.searchParam })
      getStatMessageList(this.originSearchParam)
        .then(response => {
          if (response.code === '20000000') {
            const data = response.result
            this.totalCount = data.totalSize
            this.list = data.list
          }
        })
    },
    downloadExcel() {
      if (this.searchParam.brandId === this.searchedParam.brandId &&
          this.searchParam.postbackId === this.searchedParam.postbackId &&
          this.searchParam.chatbotId === this.searchedParam.chatbotId &&
          this.searchParam.bgn === this.searchedParam.bgn &&
          this.searchParam.end === this.searchedParam.end
      ) {
        if (this.list.length > 0) {
          getStatMessageExcel(this.searchParam)
            .then(response => {
              const url = window.URL.createObjectURL(
                new Blob([response.data], { type: response.headers['content-type'] })
              )
              const link = document.createElement('a')
              link.href = url
              link.setAttribute('download', 'RCS메시지고객반응통계-대화방메뉴.xlsx')
              document.body.appendChild(link)
              link.click()
            })
        }
      } else {
        this.$alertMsg('검색 조건 변경 시 재검색 후 다운로드 요청이 가능합니다.')
      }
    },
    getChatbotList() {
      return this.chatbotList
    },
    /**
     * 챗봇(입력 문자 필터링) 리스트
     */
    findChatbot() {
      const text = this.find.chatbot.text
      let list = this.getChatbotList()
      if (text) {
        list = list.filter(s => {
          return s.chatbotId.toUpperCase().includes(text.toUpperCase())
        })
      }
      this.find.chatbot.list = list
    },
    selectChatbot(obj) {
      this.searchParam.chatbotId = obj.chatbotId
      this.toggleSelect('chatbot')
    },
    toggleSelect(type) {
      let list = ''
      if (type === 'chatbot') list = this.getChatbotList()
      // 해당 타입의 리스트
      this.find[type].list = _.cloneDeep(list)
      // 해당 타입 검색을 열거나 닫는다.
      this.find[type].flag = !this.find[type].flag
      // 해당 타입 이외의 검색은 모두 닫는다.
      Object.keys(this.find).forEach(key => {
        if (key !== type) {
          this.find[key].flag = false
        }
      })
    },
    handleSortChange(sort) {
      this.originSearchParam.sortColumn = sort.prop
      this.originSearchParam.sortDirection = sort.order === 'ascending' ? 'ASC' : 'DESC'
      this.dispatch()
    },
    _getActionTypeDescARM(row) {
      if (row.postbackType === 'ARM') {
        return getActionTypeDesc(row.btnActionType)
      } else if (row.postbackType === 'PSM' && row.thirdDisplayText) {
        return getActionTypeDesc(row.thirdActionType)
      } else {
        return '-'
      }
    },
    _getActionTypeDescPSM(row) {
      if (row.postbackType === 'PSM') {
        if (row.menuType === 'autoreply') {
          return '자동응답'
        }
        return getActionTypeDesc(row.btnActionType)
      } else {
        return '자동응답'
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      let prv = this.list[rowIndex - 1]
      if (columnIndex === 0) {
        // 날짜 rowspan 적용, 동일한 날짜끼리 병합한다. 병합적용은 해당 값의 첫번째 값에만 매긴다.
        if (!prv || (prv && row.statDate !== prv.statDate)) {
          return {
            rowspan: this.list.filter(o => o.statDate === row.statDate).length,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
      if (columnIndex === 1) {
        // 발신번호ID rowspan 적용, 동일한 날짜, 동일한 발신번호끼리 병합한다. 병합적용은 해당 값의 첫번째 값에만 매긴다.
        if (!prv || (prv && (row.statDate !== prv.statDate || row.chatbotId !== prv.chatbotId))) {
          return {
            rowspan: this.list.filter(o => o.statDate === row.statDate && o.chatbotId === row.chatbotId).length,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
      if (columnIndex === 2) {
        if (row.upPostbackId) {
          if (!prv || (prv && (row.statDate !== prv.statDate || row.chatbotId !== prv.chatbotId || row.upPostbackId !== prv.upPostbackId))) {
            return {
              rowspan: this.list.filter(o => o.statDate === row.statDate && o.chatbotId === row.chatbotId && o.upPostbackId === row.upPostbackId).length,
              colspan: 1
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        } else {
          if (!prv || (prv && (row.statDate !== prv.statDate || row.chatbotId !== prv.chatbotId || row.postbackId !== prv.postbackId))) {
            return {
              rowspan: this.list.filter(o => o.statDate === row.statDate && o.chatbotId === row.chatbotId && o.postbackId === row.postbackId).length,
              colspan: 1
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
      }
      if (row.postbackId && (columnIndex >= 3 && columnIndex <= 5)) {
        if (!prv || (prv && (row.statDate !== prv.statDate || row.chatbotId !== prv.chatbotId || row.upPostbackId !== prv.upPostbackId || row.postbackId !== prv.postbackId))) {
          return {
            rowspan: this.list.filter(o => o.statDate === row.statDate && o.chatbotId === row.chatbotId && o.upPostbackId === row.upPostbackId && o.postbackId === row.postbackId).length,
            colspan: 1
          }
        } else {
          return {
            rowspan: 0,
            colspan: 0
          }
        }
      }
      // if (row.postbackType === 'ARM' && (columnIndex === 3 || columnIndex === 4 || columnIndex === 5)) {
      //   // 대화방 메뉴명 병합, 동일한 날짜, 동일한 발신번호, 동일한 UP_POSTBACK_ID끼리 병합한다. 병합적용은 해당 값의 첫번째 값에만 매긴다.
      //   if (!prv || (prv && (row.statDate !== prv.statDate || row.chatbotId !== prv.chatbotId || row.upPostbackId !== prv.upPostbackId))) {
      //     return {
      //       rowspan: this.list.filter(o => o.statDate === row.statDate && o.chatbotId === row.chatbotId && o.upPostbackId === row.upPostbackId).length,
      //       colspan: 1
      //     }
      //   } else {
      //     return {
      //       rowspan: 0,
      //       colspan: 0
      //     }
      //   }
      // }
    },
    // updatePageData(page) {
    //   this.searchParam.page = page
    //   this.originSearchParam.page = page
    // },
    updateOriginSearchParam() {
      this.originSearchParam = JSON.parse(JSON.stringify(this.searchParam))
    }
  }
}
</script>

<style scoped>
.el-table__header tr, .el-table__header th {
    padding: 0;
    height: 50px;
}
.dv2023_search-ps {
  padding: 40px 32px;
}
.dv2023_search-ps.box_search_area .cont_bundle {
  width: auto;
}
.dv2023_search-ps .col_5 {
  width: auto;
  padding-right: 12px;
  margin-right: 12px;
  border-right: 1px solid #d9d9d9;
}
.dv2023_search-ps .col_5 .box_select {
  width: 210px;
  min-width: 210px;
}
.dv2023_search-ps .filter_bundle.col_6 {
  position: relative;
  width: auto;
  margin-right: 24px;
}
.dv2023_search-ps .filter_bundle.col_6 > span {
  position: absolute;
  bottom: -20px;
  left: 0;
  font-size: 14px;
  color: #666;
}
</style>
