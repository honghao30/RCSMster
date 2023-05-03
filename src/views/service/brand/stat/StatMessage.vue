<template>
  <div class="rcs_container service_wrap">
    <article id="content" class="content">
      <div class="box_breadcrumb">
        <breadcrumb :depth1MenuId="'M0200'" :depth2MenuId="'M0201'" :depth3MenuId="'메시지 통계'"/>
      </div>
      <brand-top active="statMessage" :brandId="brandId"></brand-top>
      <div class="contents_wrap callerid_wrap">
        <div class="title_area mar_b30">
          <h3 class="h3_title">메시지 통계</h3>
        </div>
        <section class="section mar_b0">
          <div class="sec_header">
            <ul class="bullet_list fs18 mar_b30">
              <li>
                그룹ID 를 추가한 메시지에 한해 메시지 통계를 확인 할 수 있습니다.
                  <span class="relative dv2023_infotoast">
                    <button class="icon_info"></button>
                      <span class="message">
                        그룹ID는 분석하고자 하는 메시지별로 설정하는 것을 권장합니다.<br><br>
                        예)<br>
                        FW 시즌 프로모션에 대한 메시지를<br>
                        ① FW 신상품 소개 ② 아울렛 상품 소개 로 나눠 2차례 발송하고자 함<br><br>
                        CASE 1. FW 시즌 프로모션 기간 동안 발송한 문자를 통합하여 고객 반응 통계를 확인하고자 하는 경우<br>
                        ① 과 ② 메시지에 동일한 그룹ID 설정<br><br>
                        CASE 2. FW 시즌 프로모션 기간 동안 발송한 문자 각각에 대해 고객 반응 통계를 확인하고자 하는 경우<br>
                        ① 과 ② 메시지에 각각 다른 그룹ID 설정
                      </span>
                  </span>
              </li>
              <li>동일 그룹ID 발송일 기준 3일간 (D+3) 집계됩니다. 단, 이통사별 발송 성공건수 100건 이상인 경우에 한해 집계됩니다.</li>
            </ul>
            <!-- 검색영역 -->
            <div class="box_search_area mar_b30" style="padding: 32px 28px;">
              <div class="cont_flex_bundle dv2023_search-width">
                <div class="filter_bundle">
                  <!-- <strong class="tit_bundle">그룹ID</strong> -->
                  <div class="box_select select_40">
                    <a href="javascript:void(0);" class="btn_arrow" style="color: black;" v-if="!searchParam.groupId" @click="toggleSelect('group')">그룹ID 전체</a>
                    <a href="javascript:void(0);" class="btn_arrow" style="color: black;" v-if="searchParam.groupId" @click="toggleSelect('group')">{{searchParam.groupId}}</a>
                    <div class="select_search_area" v-if="find.group.flag">
                      <span class="custom_input">
                        <input type="text" placeholder="검색어를 입력하세요" v-model="find.group.text" @input="find.group.text=$event.target.value" @keyup="findGroup">
                        <a href="javascript:void(0);" class="btn_search" @click="findGroup"></a>
                      </span>
                      <ul class="select box_scrollY">
                        <li class="option" v-if="!find.group.text"><a href="javascript:void(0);" @click="selectGroup({groupId: ''})">전체</a></li>
                        <li class="option" v-for="(obj, index) in this.find.group.list" :key="index">
                          <a href="javascript:void(0);" @click="selectGroup(obj)">{{obj.groupId}}</a>
                        </li>
                        <li class="option" v-if="find.group.text && find.group.list.length == 0">
                          <a href="javascript:void(0);">일치하는 데이터가 없습니다.</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="filter_bundle">
                  <!-- <strong class="tit_bundle" style="width: 170px; padding-left: 30px;">발신번호/대화방ID</strong> -->
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
                        <li class="option" v-if="find.chatbot.text && find.chatbot.list.length == 0">
                          <a href="javascript:void(0);">일치하는 데이터가 없습니다.</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="filter_bundle">
                  <FromTo :searchParam.sync="searchParam" :periodCondition="periodCondition" from="statMessage" descr="- 최근 1년 6개월 이내 기간 중 최대 31일까지 검색 가능합니다. - 캠페인 발송 시작일을 포함하여 조회하시기 바랍니다."></FromTo>
                </div>
                <div class="filter_bundle">
                  <a href="javascript:void(0);" class="btn sml gray col_1" @click="search"><span>검색</span></a>
                </div>
                <span class="relative">
                  <button class="icon_info" style="margin-right: -11px;">툴팁</button>
                  <span class="message">
                    예를 들어,<br/>
                    광고 캠페인의 메시지 발송을 &acute;23년 2월 1일에 한 경우,<br/>
                    기간 조회 시 2월 1일을 포함해서 조회<br/>
                    * 2월 2일부터 조회 시 발송 성공 건수가 &acute;0&acute;으로 보이게 됩니다.
                  </span>
                </span>
              </div>
              <!-- <div class="cont_flex_bundle mar_t20">
                <div class="filter_bundle full_width">
                  <strong class="tit_bundle">기간</strong>
                  <div class="cont_bundle">
                    <div class="cont_flex_bundle date_checkbox">
                      <FromTo :searchParam.sync="searchParam" :periodCondition="periodCondition" from="statMessage" descr="※ 최근 1년 6개월 이내 기간 중 최대 31일까지 검색 가능합니다."></FromTo>
                    </div>
                  </div>
                </div>
                <div class="filter_bundle col_8">
                  <a href="javascript:void(0);" class="btn sml gray col_1" @click="search"><span>검색</span></a>
                </div>
              </div> -->
              <!-- <div class="cont_flex_bundle mar_t20"></div> -->
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
                <!-- <el-table :data="unfoldList" empty-text="검색 결과가 없습니다." :span-method="objectSpanMethod" @sort-change="handleSortChange" :cell-style="{padding: '0', height: '50px'}">
                  <el-table-column prop="groupId" label="그룹ID" width="auto" sortable="custom"></el-table-column>
                  <el-table-column prop="statDate" label="날짜" width="150">
                    <template v-slot:default="scope">
                      {{ dateFormatWithDayOfWeek(scope.row.statDate, 'day') }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="chatbotId" label="발신번호/대화방ID" width="160">
                    <template v-slot:default="scope">
                      {{ addHyphenTelNum(scope.row.chatbotId) }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="deliveredCount" label="발송성공건수" width="140"></el-table-column>
                  <el-table-column prop="displayedCount" label="읽음확인수" width="140"></el-table-column>
                  <el-table-column label="버튼">
                    <el-table-column prop="btnDisplayText" label="버튼명">
                      <template v-slot:default="scope">{{ scope.row.btnDisplayText && scope.row.btnActionType ? scope.row.btnDisplayText : '-' }}</template>
                    </el-table-column>
                    <el-table-column prop="btnActionType" label="액션유형" width="">
                      <template v-slot:default="scope">
                        <span v-if="scope.row.btnDisplayText && scope.row.btnActionType" v-html="getActionTypeDesc(scope.row.btnActionType)"></span>
                        <span v-else>-</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="btnClickCount" label="클릭수" width="">
                      <template v-slot:default="scope">{{ scope.row.btnDisplayText && scope.row.btnActionType ? scope.row.btnClickCount : '-' }}</template>
                    </el-table-column>
                  </el-table-column>
                </el-table> -->
                <table class="tbl_col_type">
                  <colgroup>
                    <col>
                    <col width="150px">
                    <col width="170px">
                    <col width="140px">
                    <col width="140px">
                    <col width="190px">
                    <col width="190px">
                    <col width="140px">
                  </colgroup>
                  <thead style="background:#f5f7fa;">
                    <tr>
                      <th rowspan="2">
                        그룹 ID
                        <div class="btn_align">
                          <button class="btn_align_top" type="button" @click.stop="handleSortChange('ASC')"></button>
                          <button class="btn_align_bottom" type="button" @click.stop="handleSortChange('DESC')"></button>
                          <!-- <a href="javascript:void(0)" type="button" @click.stop="handleSortChange('ascending')" :class="sort.order === 'ascending' ? 'picksort' : ''"></a>
                          <a href="javascript:void(0)" type="button" @click.stop="handleSortChange('descending')" :class="sort.order === 'descending' ? 'picksort' : ''"></a> -->
                        </div>
                      </th>
                      <th rowspan="2">날짜</th>
                      <th rowspan="2">발신번호<br>/대화방ID</th>
                      <th rowspan="2">발송성공건수</th>
                      <th rowspan="2" style="border-right:1px solid #ddd;" >읽음확인수</th>
                      <th colspan="3">버튼</th>
                    </tr>
                    <tr>
                      <td style="border-bottom:1px solid #ddd; height: 50px; text-align: center;">버튼명</td>
                      <td style="border-bottom:1px solid #ddd; height: 50px; text-align: center;">액션유형</td>
                      <td style="border-bottom:1px solid #ddd; height: 50px; text-align: center;">클릭수</td>
                    </tr>
                  </thead>
                  <tbody v-if="show">
                    <tr v-for="(data, index) in unfoldList" :key="`${index}_table`">
                      <td style="border-right:1px solid #ddd;" v-if="data.groupIdRowSpan > 0" :rowspan="data.groupIdRowSpan">{{ data.groupId }}</td>
                      <td style="border-right:1px solid #ddd;" v-if="data.statDateRowSpan > 0" :rowspan="data.statDateRowSpan">{{ dateFormatWithDayOfWeek(data.statDate, 'day') }}</td>
                      <td style="border-right:1px solid #ddd;" v-if="data.chatbotIdRowSpan > 0" :rowspan="data.chatbotIdRowSpan">{{ addHyphenTelNum(data.chatbotId) }}</td>
                      <td style="border-right:1px solid #ddd;" v-if="data.deliveredCountRowSpan > 0" :rowspan="data.deliveredCountRowSpan">{{ moneyFormat(data.deliveredCount) }}</td>
                      <td style="border-right:1px solid #ddd;" v-if="data.displayedCountRowSpan > 0" :rowspan="data.displayedCountRowSpan">{{ moneyFormat(data.displayedCount) }}</td>
                      <td style="border-right:1px solid #ddd;" v-html="data.btnDisplayText && data.btnActionType ? data.btnDisplayText : '-'"></td>
                      <td style="border-right:1px solid #ddd;" v-html="data.btnDisplayText && data.btnActionType ? getActionTypeDesc(data.btnActionType) : '-'"></td>
                      <td>{{ data.btnActionType !== '' && data.btnActionType && data.btnDisplayText !== '' && data.btnDisplayText ? moneyFormat(data.btnClickCount) : ( data.groupId === '소계' ? moneyFormat(data.btnClickCount) : '-' )}}</td>
                    </tr>
                  </tbody>

                  <tbody v-else>
                    <tr>
                     <td colspan="8" class="stat_nodata">검색 결과가 없습니다.</td>
                    </tr>
                  </tbody>
                </table>

              </div>
            </div>
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
import Breadcrumb from '@/components/global/Breadcrumb'
import { getStatMessageExcel, getStatMessageFilter, getStatMessageList } from '@/api/service/stat/stat'
import { addHyphenTelNum, dateFormatWithDayOfWeek, moneyFormat } from '@/utils/textUtil'
import { getActionTypeDesc } from '@/utils/string'

export default {
  name: 'StatMessage',
  components: {
    BrandTop,
    FromTo,
    Breadcrumb
  },
  data() {
    return {
      searchedParam: null,
      searchParam: {
        group: 'statMessage',
        statType: 'statMessage',
        brandId: '',
        groupId: '',
        chatbotId: '',
        bgn: moment().add(-6, 'days').format('YYYYMMDD'),
        end: moment().format('YYYYMMDD'),
        sortColumn: null,
        sortDirection: 'ASC'
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
      show: false,
      unfoldList: [],
      find: {
        group: {
          flag: false,
          text: '',
          list: []
        },
        chatbot: {
          flag: false,
          text: '',
          list: []
        }
      }
    }
  },
  watch: {
    // list() {
    //   this.unfoldList = []
    //   let data = this.makeStatData()
    //   data.forEach((x, idx) => {
    //     x.forEach(item => this.unfoldList.push(item))
    //   })
    //   // this.unfoldList = this.expandData()
    // }
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
    getActionTypeDesc,
    init() {
      getStatMessageFilter(this.searchParam)
        .then(response => {
          if (response.code === '20000000') {
            const data = response.result
            Object.keys(data).forEach(o => {
              if (o === 'chatbotList') {
                this.chatbotList = data.chatbotList
              }
              if (o === 'groupList') {
                this.groupList = data.groupList
              }
            })
          }
        })
      this.dispatch()
    },
    search() {
      this.updateOriginSearchParam()
      this.dispatch()
    },
    dispatch() {
      this.show = false
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
        .finally(() => {
          if (this.list && this.list.length > 0) {
            this.unfoldList = []
            let data = this.makeStatData()
            data.forEach((x, idx) => {
              x.forEach(item => this.unfoldList.push(item))
            })
            this.show = true
          } else {
            this.show = false
          }
        })
    },
    downloadExcel() {
      if (this.searchParam.brandId === this.searchedParam.brandId &&
          this.searchParam.groupId === this.searchedParam.groupId &&
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
              link.setAttribute('download', 'RCS메시지고객반응통계-메시지통계.xlsx')
              document.body.appendChild(link)
              link.click()
            })
        }
      } else {
        this.$alertMsg('검색 조건 변경 시 재검색 후 다운로드 요청이 가능합니다.')
      }
    },
    handleSortChange(sort) {
      // 그룹아이디만 정렬 대상이므로 sortColumn은 받지 않는다
      // this.originSearchParam.sortColumn = sort.prop
      this.originSearchParam.sortDirection = sort
      this.dispatch()
    },
    /**
     * 그룹(챗봇 선택 시 필터링 된) 리스트
     */
    getGroupList() {
      if (this.searchParam.chatbotId) {
        // 발신번호ID 선택 시 그룹ID 리스트 필터링
        let list = []
        const _list = this.chatbotList.find(o => o.chatbotId === this.searchParam.chatbotId).usedGroupId
        _list.forEach(o => {
          list.push({
            groupId: o
          })
        })
        return list
      } else {
        return this.groupList
      }
    },
    /**
     * 그룹(입력 문자 필터링) 리스트
     */
    findGroup() {
      const text = this.find.group.text
      let list = this.getGroupList()
      if (text) {
        list = list.filter(s => {
          return s.groupId.toUpperCase().includes(text.toUpperCase())
        })
      }
      this.find.group.list = list
    },
    /**
     * 챗봇(그룹 선택 시 필터링 된) 리스트
     */
    getChatbotList() {
      // 그룹ID 선택 시 발신번호 ID 필터링
      if (this.searchParam.groupId) {
        let list = []
        const _list = this.groupList.find(o => o.groupId === this.searchParam.groupId).usedChatbotId
        _list.forEach(o => {
          list.push({
            chatbotId: o
          })
        })
        return list
      }
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
    selectGroup(obj) {
      this.searchParam.groupId = obj.groupId
      this.toggleSelect('group')
    },
    selectChatbot(obj) {
      this.searchParam.chatbotId = obj.chatbotId
      this.toggleSelect('chatbot')
    },
    toggleSelect(type) {
      let list = ''
      if (type === 'group') list = this.getGroupList()
      else if (type === 'chatbot') list = this.getChatbotList()
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
    /** 통계데이터 set */
    makeStatData() {
      return this.list.map(cur => {
        let detailList = cur.detailList
        // 1. 일자를 뽑아냄
        let statDateSet = new Set(detailList.map(x => x.statDate))
        let statDateAndChatbotDataList = []
        // 2. 같은 일자별로 데이터를 묶는다
        statDateSet.forEach(date => {
          let sameStatDateList = detailList.filter(v => v.statDate === date) // 현재 대상 일자에 해당하는 데이터만 추출
          let obj = {}
          let values = []
          // 3. 챗봇ID 를 뽑아냄
          let chatbots = new Set(sameStatDateList.map(x => x.chatbotId))
          // 4. 같은 챗봇ID별로 데이터를 묶는다.
          chatbots.forEach(chatbot => {
            let sameDateAndChatbot = sameStatDateList.filter(x => x.chatbotId === chatbot) // 현재 대상 챗봇ID에 해당하는 데이터만 추출
            let chatbotDataObj = {}
            chatbotDataObj[chatbot] = sameDateAndChatbot // key(챗봇ID): value(해당 데이터)
            values.push(chatbotDataObj)
          })
          obj[date] = values
          statDateAndChatbotDataList.push(obj)
        })
        // 5. 그룹 ID별 데이터 set
        let groupRows = detailList.map((t, idx) => { return { groupId: cur.groupId, groupIdRowSpan: idx === 0 ? cur.detailList.length : 0 } }) // groupRows
        let groupRowIdxForRowSpan = 0
        let groupRowIdx = 0
        // 5-1. 일자별 챗봇ID 데이터로 각 row 데이터
        statDateAndChatbotDataList.forEach((dataOfStatDate, dIdx) => {
          let statDate = Object.keys(dataOfStatDate)[0] // 일자
          let dataOfChatbotList = dataOfStatDate[statDate] // 해당 일자에 있는 챗봇ID별 데이터 목록
          let statDateRowSpan = 0 // 일자의 rowspan: 챗봇ID별 데이터 목록의 총 length임

          for (let i = 0; i < dataOfChatbotList.length; i++) {
            let list = dataOfChatbotList[i]
            let chatbotId = Object.keys(list)[0] // 챗봇ID
            let chatbotDataList = list[chatbotId] // 챗봇ID의 데이터
            statDateRowSpan += chatbotDataList.length
            for (let j = 0; j < chatbotDataList.length; j++) {
              let data = chatbotDataList[j]
              groupRows[groupRowIdx].statDate = statDate
              groupRows[groupRowIdx].chatbotId = chatbotId
              groupRows[groupRowIdx].deliveredCount = data.deliveredCount
              groupRows[groupRowIdx].displayedCount = data.displayedCount
              groupRows[groupRowIdx].btnClickCount = data.btnClickCount
              groupRows[groupRowIdx].btnActionType = data.btnActionType
              groupRows[groupRowIdx].btnDisplayText = data.btnDisplayText
              groupRows[groupRowIdx].chatbotIdRowSpan = j === 0 ? chatbotDataList.length : 0
              groupRows[groupRowIdx].deliveredCountRowSpan = j === 0 ? chatbotDataList.length : 0
              groupRows[groupRowIdx].displayedCountRowSpan = j === 0 ? chatbotDataList.length : 0
              groupRowIdx++
            }
          }
          let first = true
          for (let i = groupRowIdxForRowSpan; i < groupRowIdxForRowSpan + statDateRowSpan; i++) {
            if (first) {
              // 일자의 첫번째 데이터인 경우 statRowSpan 값을 넣어줌
              first = false
              groupRows[i].statDateRowSpan = statDateRowSpan
            } else groupRows[i].statDateRowSpan = 0
          }
          groupRowIdxForRowSpan += statDateRowSpan
        })
        // 6. 소계 set
        let deliveredCountSum = 0
        let displayedCountSum = 0
        let btnClickCountSum = 0
        groupRows.forEach(x => {
          if (x.deliveredCountRowSpan > 0) {
            deliveredCountSum += x.deliveredCount
            displayedCountSum += x.displayedCount
          }
          if (x.btnActionType !== '' && x.btnActionType && x.btnDisplayText !== '' && x.btnDisplayText) {
            btnClickCountSum += x.btnClickCount
          }
        })
        let summaryRow = {
          groupId: '소계',
          statDate: '',
          chatbotId: '',
          deliveredCount: deliveredCountSum,
          displayedCount: displayedCountSum,
          btnClickCount: btnClickCountSum,
          groupIdRowSpan: 1,
          statDateRowSpan: 1,
          chatbotIdRowSpan: 1,
          deliveredCountRowSpan: 1,
          displayedCountRowSpan: 1,
          btnActionType: '',
          btnDisplayText: ''
        }
        groupRows.push(summaryRow)
        return groupRows
      })
    },
    expandData() {
      // list내의 detailList -> groupId로 한번 묶여서 내려옴
      return this.list.reduce((a, curVal) => {
        // 1. 필요한 데이터만 뽑기
        const arr = curVal.detailList.map(item => {
          return {
            groupId: curVal.groupId,
            statDate: item.statDate,
            chatbotId: item.chatbotId,
            btnActionType: item.btnActionType,
            btnDisplayText: item.btnDisplayText,
            btnClickCount: this.moneyFormat(item.btnClickCount),
            deliveredCount: this.moneyFormat(item.deliveredCount ? item.deliveredCount : 0),
            displayedCount: this.moneyFormat(item.displayedCount),
            numOfdelivered: item.deliveredCount ? item.deliveredCount : 0,
            numOfdiesplayedCnt: item.displayedCount
          }
        })
        // 2. 소계를 위한 row를 추가
        let summaryArr = []
        arr.forEach(el => {
          let item = { groupId: el.groupId, statDate: el.statDate, chatbotId: el.chatbotId, deliveredCnt: el.numOfdelivered, displayedCnt: el.numOfdiesplayedCnt }
          if (!summaryArr.find(x => x.groupId === item.groupId && x.statDate === item.statDate && x.chatbotId === item.chatbotId && x.deliveredCnt === item.deliveredCnt && x.displayedCnt === item.displayedCnt)) {
            summaryArr.push(item)
          }
        })
        let succDeliverCnt = 0
        let readCnt = 0
        summaryArr.forEach(x => {
          succDeliverCnt += x.deliveredCnt
          readCnt += x.displayedCnt
        })
        // 그룹 ID 별 소계 row
        arr[arr.length] = { groupId: '소계', deliveredCount: this.moneyFormat(succDeliverCnt), displayedCount: this.moneyFormat(readCnt) }
        a = a.concat(arr)
        return a
      }, [])
    },
    // 통계데이터 merge
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      let prv = this.unfoldList[rowIndex - 1] // 이전 row
      // (소계 제외) groupId 기준으로 merge 하기 위해 현재 target row 의 groupID로 새로운 배열을 만들어서, 해당 배열의 데이터를 기준으로 rowspan 값을 정한다.
      let groupIdList = this.unfoldList.filter(o => o.groupId === row.groupId && o.groupId !== '소계')
      // 1) groupID
      if (columnIndex === 0) {
        let groupIdSpan = groupIdList.length > 0 ? groupIdList.length : 1
        if (!prv || (prv && row.groupId !== prv.groupId)) return { rowspan: groupIdSpan, colspan: 1 }
        else return { rowspan: 0, colspan: 0 }
      }
      // 2) 날짜
      if (columnIndex === 1) {
        let statDateSpan = groupIdList.filter(o => o.statDate === row.statDate).length
        if (!prv || (prv && row.statDate !== prv.statDate)) return { rowspan: statDateSpan > 0 ? statDateSpan : 1, colspan: 1 }
        else return { rowspan: 0, colspan: 0 }
      }
      // 3)발신번호
      if (columnIndex === 2) {
        let chatbotSpan = groupIdList.filter(o => o.statDate === row.statDate && o.chatbotId === row.chatbotId).length
        if (!prv || (prv && (row.statDate !== prv.statDate || row.chatbotId !== prv.chatbotId))) return { rowspan: chatbotSpan > 0 ? chatbotSpan : 1, colspan: 1 }
        else return { rowspan: 0, colspan: 0 }
      }
      // 4) 발송성공 건수
      if (columnIndex === 3) {
        let deliveredCntSpan = groupIdList.filter(o => o.statDate === row.statDate && o.chatbotId === row.chatbotId).length // && o.deliveredCount === row.deliveredCount
        if (!prv || (prv && (row.statDate !== prv.statDate || row.chatbotId !== prv.chatbotId))) return { rowspan: deliveredCntSpan > 0 ? deliveredCntSpan : 1, colspan: 1 }
        else return { rowspan: 0, colspan: 0 }
      }
      // 5) 읽음 확인 수
      if (columnIndex === 4) {
        let displayCntSpan = groupIdList.filter(o => o.statDate === row.statDate && o.chatbotId === row.chatbotId).length // && o.displayedCount === row.displayedCount
        if (!prv || (prv && (row.statDate !== prv.statDate || row.chatbotId !== prv.chatbotId))) return { rowspan: displayCntSpan > 0 ? displayCntSpan : 1, colspan: 1 }
        else return { rowspan: 0, colspan: 0 }
      }
    },
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
.message{
  display: none;
  position: absolute;
  top: 33px;
  left: -2px;
  border: 1px solid #ddd;
  background-color: #fff;
  color: #666;
  font-size: 14px;
  font-weight: normal;
  font-family: 'NotoSansLight';
  line-height: 140%;
  padding: 15px 20px;
  word-break: keep-all;
  width: 328px;
  z-index: 100;
}
.message:before{
  content: "";
  position: absolute;
  top: -7px;
  left: 10px;
  display: inline-block;
  background-color: #fff;
  height: 12px;
  width: 12px;
  transform: rotate(45deg);
  transform-origin: center center;
  border-top: 1px solid #ddd;
  border-left: 1px solid #ddd;
  margin: 0 -3px -3px;
}
.icon_info{
  margin-top: 3px;
}
.icon_info:hover+.message {
  display: block;
}
</style>
