<template>
  <div class="rcs_container service_wrap">
    <article id="content" class="content">
      <div class="box_breadcrumb">
        <breadcrumb :depth1MenuId="'M0300'" :depth2MenuId="'M0302'"/>
      </div>
      <div class="top_business_area">
        <div class="inner">
          <strong class="title">{{corpInfo.name}}</strong>
        <div class="desc_area">
            <span>{{userInfo.corpId}}</span>
            <span>{{ corpInfo.aprvReqDt | prettyDate('YYYY-MM-DD') }}</span>
        </div>
        </div>
      </div>
      <div class="contents_wrap callerid_wrap">

        <div class="title_area mar_t50 mar_b30">
          <h3 class="h3_title">소식 목록</h3>
        </div>

        <section class="section mar_b0">
          <div class="sec_header">
            <!-- sort -->
            <div class="box_search_area mar_b30">
              <div class="cont_flex_bundle">
                <div class="filter_bundle col_3">
                  <strong class="tit_bundle">상태</strong>
                  <div class="cont_bundle">
                    <span class="custom_select full_width">
                      <select v-model="searchData.param" @change="setSearchParam">
                        <option value="">전체 상태</option>
                        <option value="publish">게시</option>
                        <option value="reservation">예약</option>
                        <option value="hide">비공개</option>
                        <option value="save">저장</option>
                        <option value="internet">숨김 게시</option> <!-- 2021.08.05 RBC고도화추가1 -->
                      </select>
                    </span>
                  </div>
                </div>
                <div class="filter_bundle col_3">
                  <strong class="tit_bundle">유형</strong>
                  <div class="cont_bundle">
                    <span class="custom_select full_width">
                      <select v-model="searchData.type">
                        <option value="">전체 유형</option>
                        <option value="gallery">Gallery</option>
                        <option value="share">Sharing</option>
                        <option value="slide">Slide View</option>
                      </select>
                    </span>
                  </div>
                </div>
                <div class="filter_bundle col_4" v-if="userInfo.userType != 'CORP'">
                  <strong class="tit_bundle">기업</strong>
                  <div class="cont_bundle">
                    <span class="custom_select full_width">
                      <select required v-model="searchData.corpId" @change="changeCorp">
                        <option value="">전체 기업</option>
                        <option v-for="item in corpList" :key="item.corpId" :value="item.corpId">{{item.corpName}}</option>
                      </select>
                    </span>
                  </div>
                </div>
                <div class="filter_bundle col_4">
                  <strong class="tit_bundle">브랜드</strong>
                  <div class="cont_bundle">
                    <span class="custom_select full_width">
                      <select v-model="searchData.brandId">
                        <option value="">전체 브랜드</option>
                        <option v-for="item in brandList" :key="item.brandId" :value="item.brandId">{{item.brandName}}</option>
                      </select>
                    </span>
                  </div>
                </div>
              </div>
              <div class="cont_flex_bundle mar_t20">
                <div class="filter_bundle full_width">
                  <strong class="tit_bundle">기간</strong>
                  <div class="cont_bundle">
                    <div class="cont_flex_bundle date_checkbox">
                      <span class="custom_input icon_right">
                        <div class="date_picker">
                          <el-date-picker
                            v-model="searchData.startDate"
                            type="date"
                            placeholder="시작일"
                            value-format="yyyyMMdd"
                            @change="changeCal"
                            popper-class="arrowmover"
                          ></el-date-picker>
                        </div>
                      </span>
                      <span class="bar">-</span>
                      <span class="custom_input icon_right">
                        <div class="date_picker">
                          <el-date-picker
                            v-model="searchData.endDate"
                            type="date"
                            placeholder="종료일"
                            value-format="yyyyMMdd"
                            @change="changeCal"
                            popper-class="arrowmover"
                          ></el-date-picker>
                        </div>
                      </span>
                      <span class="day_area">
                        <span class="custom_radio checked">
                          <input type="radio" name="template" id="template01" checked v-model="selData" value="1w" @change="changDay">
                          <label for="template01">
                            <span>1주일</span>
                          </label>
                        </span>
                        <span class="custom_radio checked">
                          <input type="radio" name="template" id="template02" checked v-model="selData" value="1m" @change="changDay">
                          <label for="template02">
                            <span>1개월</span>
                          </label>
                        </span>
                        <span class="custom_radio checked">
                          <input type="radio" name="template" id="template03" checked v-model="selData" value="3m" @change="changDay">
                          <label for="template03">
                            <span>3개월</span>
                          </label>
                        </span>
                      </span>
                      <span class="custom_checkbox nowrap">
                        <input type="checkbox" name="Checkbox" id="Checkbox01" v-model="searchData.pinYnTF">
                        <label for="Checkbox01">고정 소식만 보기</label>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="cont_flex_bundle mar_t20">
                <div class="filter_bundle col_3">
                  <strong class="tit_bundle">검색어</strong>
                  <div class="cont_bundle">
                    <span class="custom_select full_width">
                      <select v-model="searchData.searchType">
                        <option value="">선택</option>
                        <option value="title">소식 제목</option>
                        <option value="id">소식 ID</option>
                      </select>
                    </span>
                  </div>
                </div>
                <div class="filter_bundle full_width">
                  <span class="custom_input full_width mar_l12">
                    <input type="text" placeholder="검색어 입력" v-model="searchData.keyword">
                  </span>
                  <span class="custom_checkbox nowrap">
                    <input type="checkbox" name="Checkbox" id="Checkbox02" v-model="searchData.myContYnTF">
                    <label for="Checkbox02">내가 등록한 건만 보기</label>
                  </span>
                  <a href="javascript:void(0);" class="btn sml gray col_1" @click="search">
                    <span>검색</span>
                  </a>
                </div>
              </div>
            </div>
            <!-- //sort -->

            <div class="cont_flex_bundle">
              <div class="total_area eft col_6">
                <span class="total_count">
                  총
                  <strong class="count">{{totalCnt}}</strong> 건
                </span>
                <span class="custom_select sml">
                  <select v-model="searchData.limit" @change="changeLimit">
                    <option value="20">20개</option>
                    <option value="50">50개</option>
                    <option value="100">100개</option>
                  </select>
                </span>
              </div>
              <div class="btn_wrap right col_6">
                <a href="javascript:void(0);" class="btn sml bd_black type2" @click="remove()">선택 삭제</a> <!-- 2021.08.05 RBC고도화수정1 -->
                <a href="javascript:void(0);" class="btn sml bd_black type2" @click="add()">소식 작성</a>
              </div>
            </div>
          </div>

          <div class="sec_body">
            <div class="box_scroll mar_t20">
              <div class="tbl_sorting_wrap tbl_plr0">
                <el-table :data="tableData" style="width: 100%" empty-text="등록된 소식이 없습니다." @sort-change="handleSortChange" :class="{'el-table--enable-row-transition': tableData.length >= 100}">
                  <!-- 2021.08.05 RBC고도화수정3 -->
                  <el-table-column :min-width="50">
                    <template slot="header">
                      <el-checkbox ref="chk_all" @change="checkAll"></el-checkbox>
                    </template>
                    <template slot-scope="scope">
                      <el-checkbox :ref="'chk_' + scope.row.feedId" @change="checkItem($event, scope.row.feedId)"></el-checkbox>
                    </template>
                  </el-table-column>
                  <el-table-column prop="number" label="번호"  :min-width="65"></el-table-column>
                  <el-table-column v-if="userInfo.userType != 'CORP'" prop="company" label="기업" align="left"  :min-width="80"></el-table-column>
                  <el-table-column prop="brandName" label="브랜드명" align="left"  :min-width="160"></el-table-column>
                  <el-table-column prop="statusNum" label="상태"  :min-width="115">
                    <template slot-scope="scope">
                      <span  v-if="scope.row.statusNum === 0">저장</span>
                      <span  v-if="scope.row.statusNum === 1">게시</span>
                      <span  v-if="scope.row.statusNum === 2">예약</span>
                      <span  v-if="scope.row.statusNum === 3">숨김 게시</span>
                      <span  v-if="scope.row.statusNum === 4">비공개</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="newsID" label="소식 ID" align="left"  :min-width="130"></el-table-column>
                  <el-table-column prop="newsTitle" label="소식제목" align="left"  :min-width="176">
                    <template slot-scope="scope">
                      <span v-if="scope.row.pinYn === 'Y' && scope.row.statusNum === 1" class="icon_fixed02 btn_text">
                        <em class="hidden">고정</em>
                        <router-link :to="{name:'brand/feed', params:{brandId:scope.row.brandId, feedId:scope.row.feedId, searchData:searchData}}">{{scope.row.newsTitle}}</router-link>
                      </span>
                      <!-- 고정 아이콘 없는 경우 -->
                      <span v-else class="btn_text">
                        <router-link :to="{name:'brand/feed', params:{brandId:scope.row.brandId, feedId:scope.row.feedId, searchData:searchData}}">{{scope.row.newsTitle}}</router-link>
                      </span>
                    </template>
                  </el-table-column>
                  <el-table-column label="유형"  :min-width="110">
                    <template slot-scope="scope">
                      <span  v-if="scope.row.type === 'gallery'">Gallery</span>
                      <span  v-else-if="scope.row.type === 'share'">Sharing</span>
                      <span  v-else-if="scope.row.type === 'slide'">Slide View</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="writer" label="등록자"  :min-width="100"></el-table-column>
                  <el-table-column prop="date" label="최종 작업일" sortable="custom"  :min-width="145"></el-table-column>
                  <el-table-column prop="reservationDate" label="게시(예약)일" sortable="custom"  :min-width="149"></el-table-column>
                  <!-- // 2021.08.05 RBC고도화수정3 -->

                </el-table>
              </div>
            </div>

            <pagination :total="totalCnt" :pageSize="searchData.limit" @change="changePage" :current-page.sync="searchData.page"/>

          </div>
        </section>
      </div>

      <div tabindex="0" class="layer active" v-if="layerPop">
        <div tabindex="0" class="layer_cont">
          <div class="layer_body">
            <div class="layer_scroll">
              <!-- 삭제 -->
              <div class="search_result ">
                <div class="box_result_info lineHeight24 center">
                  선택된 소식을 삭제하시겠습니까?
                </div>
              </div>
            </div>
          </div>
          <div class="layer_foot">
            <div class="btn_wrap mar_t30">
              <a href="javascript:void(0);" class="btn sml bd_black type2" @click="layerCancel()">
                <span>취소</span>
              </a>
              <a href="javascript:void(0);" class="btn sml black" @click="layerOk()">
                <span>확인</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>
<script>

import Breadcrumb from '@/components/global/Breadcrumb'
import Pagination from '@/components/Pagination'
import { getUserInfo } from '@/api/service/service'
import store from '@/store'

import {
  feedList,
  brandList,
  feedRemove
} from '@/api/feed/feed'

export default {
  name: 'FeedList',
  components: {
    Breadcrumb,
    Pagination
  },
  data() {
    return {
      userInfo: {
        userType: '',
        corpId: '',
        corpAdmYn: ''
      },
      corpInfo: {
        name: '', // 기업명
        corpId: '', // 기업ID
        aprvReqDt: '', // 등록일
        brandOperYn: '', // 브랜드 개설 여부
        reqCorpAdmYn: '', // 관리자 신청 여부(담당자)
        status: '',
        aprvStatus: ''
      },
      layerPop: false,
      totalCnt: 0, // 총 건수
      brandData: '', // 브랜드 정보
      corpId: '', // 선택 기업
      corpList: [], // 기업 목록
      brandList: [], // 브랜드 목록
      selData: '', // 일자 계산
      searchData: {
        page: 1, // 요청 페이지
        offset: 0, // 시작 row(0부터)
        limit: 20, // 페이지당 건수
        param: '', //
        pubType: '', // 게시 유형(게시:publish, 예약:reservation, 숨김게시:internet)
        status: '', // 상태 (비공개:hide, 저장:save)
        type: '', // 소식 유형 (gallery, share, slide)
        brandId: '', // 브랜드 ID
        corpId: '',
        searchType: '', // 검색유형 (id, title)
        keyword: '', // 검색어
        myContYn: false, // 내가 등록한건 보기
        startDate: '', // 검색시작일 (YYYYMMDD)
        endDate: '', // 검색종료일 (YYYYMMDD)
        pinYn: false, // 고정소식만 보기
        myContYnTF: false, // 내가 등록한건 보기
        pinYnTF: false, // 고정소식만 보기
        orderKey: '', // 정렬키
        orderValue: '' // 정렬순서
      },
      originSearchData: null,
      tableData: [],
      deleteList: [],
      pinYn: 0,
      originalCorp: ''
    }
  },
  computed: {
    isCheckedAll() { return this.tableData.length === this.deleteList.length } // 전체 체크되었는지?
  },
  watch: {
    deleteList() {
      let target = this.$refs.chk_all
      if (this.deleteList.length > 0) {
        target.model = this.isCheckedAll
      } else {
        target.model = false
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('searchcondition/searchAndGo', { searchParam: this.searchData })
    next()
  },
  created() {
    store.dispatch('getUserInfo').then(userInfo => {
      this.userInfo.userType = userInfo.userType
      this.userInfo.corpId = userInfo.corpId
      this.userInfo.corpAdmYn = userInfo.corpAdmYn
      this.getUserInfo()
    })

    let today = new Date()

    let year = today.getFullYear()
    let month = ('0' + (today.getMonth() + 1)).slice(-2)
    let day = ('0' + today.getDate()).slice(-2)
    let dateString = year + month + day

    this.searchData.endDate = dateString

    let changeDate = today.getTime() - (365 * 24 * 60 * 60 * 1000)
    today.setTime(changeDate)
    let changeYear = today.getFullYear()
    let changeMonth = ('0' + (today.getMonth() + 1)).slice(-2)
    let changeday = ('0' + today.getDate()).slice(-2)

    let changeDateString = changeYear + changeMonth + changeday
    this.searchData.startDate = changeDateString

    // dashboard에서 상태 조건이 넘어온 경우 셋팅
    if (this.$route.params.status !== undefined) {
      this.searchData.param = this.$route.params.status
      this.setSearchParam()
    } else if (this.$store.getters['searchcondition/getSearchCondition'](this.searchData) !== undefined) {
      this.searchData = this.$store.getters['searchcondition/getSearchCondition'](this.searchData)
      this.originalCorp = this.searchData.corpId
    }
    this.updateOriginSearchData()
    // 브랜드 정보 가져오기
    brandList()
      .then(res => {
        if (res.code === '20000000') {
          this.brandData = res.result.corpList
          for (let i = 0; i < res.result.corpList.length; i++) {
            this.corpList.push({
              corpId: res.result.corpList[i].corpId,
              corpName: res.result.corpList[i].corpName
            })
          }

          if (this.userInfo.userType === 'CORP') {
            this.brandList = this.brandData[0].brandList
          } else {
            this.changeCorp()
          }
        } else {
          this.$alertMsg('서버와 통신중 오류가 발생하였습니다.')
        }
      })
      .catch(res => {
        if (res && res.error && res.error) {
          this.$alertMsg(res.error.message).then(() => {
            if (res.error.code === '60000703' || res.error.code === '60000704') {
              // 브랜드 운영 없음
              this.$router.push('/')
            }
          })
        } else {
          this.$alertMsg('처리중 오류가 발생하였습니다.')
        }
      })
    // 목록 조회
    this.getFeedList()
  },

  mounted() {},
  methods: {

    // 사용자 정보 조회
    getUserInfo() {
      let reqData = {
        userType: this.userInfo.userType,
        corpId: this.userInfo.corpId
      }
      getUserInfo(reqData).then(res => {
        this.corpInfo.name = res.result.name
        this.corpInfo.corpId = res.result.corpId
        this.corpInfo.aprvReqDt = res.result.aprvReqDt ? res.result.aprvReqDt : ' '
        this.corpInfo.brandOperYn = res.result.brandOperYn
        this.corpInfo.reqCorpAdmYn = res.result.reqCorpAdmYn
        this.corpInfo.status = res.result.status
        this.corpInfo.aprvStatus = res.result.aprvStatus
      })
    },
    changeCal() {
      this.selData = ''
    },
    dateFormat1(dateparam) {
      let year = dateparam.substring(0, 4)
      let month = dateparam.substring(5, 7)
      let day = dateparam.substring(8, 10)

      return year + '-' + month + '-' + day
    },
    dateFormat2(dateparam) {
      let year = dateparam.substring(0, 4)
      let month = dateparam.substring(4, 6)
      let day = dateparam.substring(6, 8)
      let hour = dateparam.substring(8, 10)
      let minute = dateparam.substring(10, 12)

      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute
    },
    handleSortChange(sort) {
      if (sort.order === null) {
        this.originSearchData.orderKey = ''
        this.originSearchData.orderValue = ''
      } else {
        this.originSearchData.orderValue = sort.order === 'ascending' ? 'ASC' : 'DESC'
      }

      if (jglib.convertCamelcaseToSnakecase(sort.prop) === 'DATE') {
        this.originSearchData.orderKey = 'MOD_DT'
      } else if (jglib.convertCamelcaseToSnakecase(sort.prop) === 'RESERVATION_DATE') {
        this.originSearchData.orderKey = 'PUB_DT'
      }

      this.getFeedList()
    },
    // 등록 버튼 클릭 시
    add() {
      this.$router.push(`/feed/reg`)
    },

    // 삭제 버튼 클릭 시
    remove() {
      if (this.deleteList.length < 1) {
        this.$alertMsg('삭제하실 소식을 선택해주세요.')
        return
      }
      if (this.pinYn > 0) {
        this.$alertMsg('고정핀 설정된 소식이 포함되어 선택되었습니다.고정핀 설정된 소식은 삭제할 수 없습니다.고정핀 해제 후 삭제해 주세요.')
        return
      }
      this.layerPop = true
    },

    // 삭제 레이어 확인 버튼 클릭 시
    layerOk() {
      for (let i = 0; i < this.deleteList.length; i++) {
        feedRemove(this.deleteList[i].brandId, this.deleteList[i].feedId).then(res => {
          if (res.code !== '20000000') {
            this.$alertMsg('서버와 통신중 오류가 발생하였습니다.')
          }

          if (i + 1 === this.deleteList.length) {
            // 목록 조회
            this.getFeedList()
          }
        })
          .catch(res => {
            this.$alertMsg('서버와 통신중 오류가 발생하였습니다.')
          })
      }
      this.layerPop = false
    },
    // 삭제 레이어 취소 버튼 클릭 시
    layerCancel() {
      this.layerPop = false
    },
    setSearchParam() {
      if (this.searchData.param.match(/^(publish|reservation|internet)$/)) {
        this.searchData.pubType = this.searchData.param
        this.searchData.status = null
      } else {
        this.searchData.pubType = null
        this.searchData.status = this.searchData.param
      }
    },
    // 기업 셀렉트 박스 변경 시
    changeCorp() {
      let brandId = this.searchData.brandId
      this.searchData.brandId = ''
      this.brandList = []
      for (let i = 0; i < this.brandData.length; i++) {
        if (this.brandData[i].corpId === this.searchData.corpId) {
          this.brandList = this.brandData[i].brandList
        }
      }
      if (this.originalCorp !== '') {
        this.searchData.brandId = brandId
        this.originalCorp = ''
      }
    },
    // 검색 조건 1주일/1개월/3개월 클릭 시
    changDay() {
      let today = new Date()
      let year = today.getFullYear()
      let month = ('0' + (today.getMonth() + 1)).slice(-2)
      let day = ('0' + today.getDate()).slice(-2)
      let dateString = year + month + day

      this.searchData.endDate = dateString

      if (this.selData === '1w') {
        let changeDate = today.getTime() - (7 * 24 * 60 * 60 * 1000)
        today.setTime(changeDate)
        let changeYear = today.getFullYear()
        let changeMonth = ('0' + (today.getMonth() + 1)).slice(-2)
        let changeday = ('0' + today.getDate()).slice(-2)

        let changeDateString = changeYear + changeMonth + changeday
        this.searchData.startDate = changeDateString
      } else if (this.selData === '1m') {
        let changeDate = today.getTime() - (30 * 24 * 60 * 60 * 1000)
        today.setTime(changeDate)
        let changeYear = today.getFullYear()
        let changeMonth = ('0' + (today.getMonth() + 1)).slice(-2)
        let changeday = ('0' + today.getDate()).slice(-2)

        let changeDateString = changeYear + changeMonth + changeday
        this.searchData.startDate = changeDateString
      } else if (this.selData === '3m') {
        let changeDate = today.getTime() - (90 * 24 * 60 * 60 * 1000)
        today.setTime(changeDate)
        let changeYear = today.getFullYear()
        let changeMonth = ('0' + (today.getMonth() + 1)).slice(-2)
        let changeday = ('0' + today.getDate()).slice(-2)

        let changeDateString = changeYear + changeMonth + changeday
        this.searchData.startDate = changeDateString
      }
    },
    // 체크박스 전체 선택
    checkAll(checked) {
      if (checked) { // 선택
        if (this.deleteList.length < 1) { // 체크된 항목이 없음
          this.tableData.forEach(x => this.checkItem(true, x.feedId))
        } else {
          let remainCheckList = this.tableData.filter(item => {
            if (!this.deleteList.find(x => x.feedId === item.feedId)) return item
          })
          remainCheckList.forEach(x => this.checkItem(true, x.feedId))
        }
      } else { // 선택해제
        if (this.isCheckedAll) {
          for (let item of this.tableData) {
            this.checkItem(false, item.feedId)
          }
        }
      }
    },
    // 체크박스 단건 선택
    checkItem(checked, value) {
      let item = this.tableData.find(x => x.feedId === value) // 대상 발신번호 정보
      if (checked) {
        // 상단 고정인 소식인 경우
        if (item.statusNum === 1 && item.pinYn === 'Y') this.pinYn++
        this.$refs[`chk_${value}`].model = true
        this.deleteList.push(item)
      } else {
        if (item.statusNum === 1 && item.pinYn === 'Y') this.pinYn--
        this.$refs[`chk_${value}`].model = false
        this.deleteList.splice(this.deleteList.indexOf(item), 1)
      }
    },
    // 삭제 체크박스 클릭 시
    // handleSelectionChange(val) {
    //   if (val.length > 0) {
    //     this.pinYn = 0
    //     for (let i = 0; i < val.length; i++) {
    //       if (val[i].pinYn === 'Y' && val[i].statusNum === 1) {
    //         this.pinYn++
    //       }
    //     }
    //   }
    //   this.deleteList = val
    // },

    // 페이지 변경시 호출
    changePage(page) {
      this.updatePageData(page)
      this.searchData.offset = (page - 1) * this.searchData.limit // 시작 row(0부터)
      this.originSearchData.offset = (page - 1) * this.originSearchData.limit // 시작 row(0부터)
      this.getFeedList()
    },
    changeLimit() {
      this.originSearchData.limit = this.searchData.limit
      this.initOffset()
      this.updatePageData(1)
      this.getFeedList()
    },
    search() {
      this.initOffset()
      this.updatePageData(1)
      this.updateOriginSearchData()
      this.getFeedList()
    },

    // 검색 및 페이지 버튼 클릭 시 목록 조회
    getFeedList() {
      // if (param !== undefined) {
      //   this.searchData.page = 1
      //   this.searchData.offset = (this.searchData.page - 1) * this.searchData.limit
      // }
      this.searchData.myContYn = this.searchData.myContYnTF ? 'Y' : ''
      this.originSearchData.myContYn = this.searchData.myContYnTF ? 'Y' : ''
      this.searchData.pinYn = this.searchData.pinYnTF ? 'Y' : ''
      this.originSearchData.pinYn = this.searchData.pinYnTF ? 'Y' : ''

      this.$store.dispatch('searchcondition/searchAndGo', { searchParam: this.searchData })
      feedList(this.originSearchData).then(res => {
        if (res.code === '20000000') {
          this.tableData = []
          this.totalCnt = res.pagination.total
          // todo전역변수 설정 필요
          let date = new Date()

          let year = date.getFullYear().toString()
          let month = date.getMonth() + 1
          month = month < 10 ? '0' + month.toString() : month.toString()
          let day = date.getDate()
          day = day < 10 ? '0' + day.toString() : day.toString()
          let hour = date.getHours()
          hour = hour < 10 ? '0' + hour.toString() : hour.toString()
          let minites = date.getMinutes()
          minites = minites < 10 ? '0' + minites.toString() : minites.toString()
          let seconds = date.getSeconds()
          seconds = seconds < 10 ? '0' + seconds.toString() : seconds.toString()
          let nowDate = year + month + day + hour + minites + seconds
          for (let i = 0; i < res.result.feedList.length; i++) {
            let statusNum = ''
            // 상태 값 설정 0:저장, 1:게시, 2:예약게시, 3:숨김, 4: 비공개
            if (res.result.feedList[i].publishType === 'publish' && res.result.feedList[i].status === 'ok') {
              statusNum = 1
            } else if (res.result.feedList[i].publishType === 'reservation' && res.result.feedList[i].status === 'ok') {
              let publishDate = res.result.feedList[i].publishDate
              if (publishDate <= nowDate) {
                statusNum = 1
              } else {
                statusNum = 2
              }
            } else if (res.result.feedList[i].publishType === 'internet' && res.result.feedList[i].status === 'ok') {
              statusNum = 3
            } else if (res.result.feedList[i].status === 'save') {
              statusNum = 0
            } else if (res.result.feedList[i].status === 'hide') {
              statusNum = 4
            }

            this.tableData.push({
              number: this.totalCnt - ((this.searchData.page - 1) * this.searchData.limit) - i,
              company: res.result.feedList[i].corpName,
              brandName: res.result.feedList[i].brandName,
              newsID: res.result.feedList[i].feedId,
              newsTitle: this.replaceHtml(res.result.feedList[i].title),
              type: res.result.feedList[i].type,
              writer: res.result.feedList[i].userNm,
              date: this.dateFormat1(res.result.feedList[i].updateDate),
              reservationDate: res.result.feedList[i].publishDate === undefined ? '' : this.dateFormat2(res.result.feedList[i].publishDate),
              feedId: res.result.feedList[i].feedId,
              brandId: res.result.feedList[i].brandId,
              pinYn: res.result.feedList[i].pinYn,
              statusNum: statusNum
            })
          }
        } else {
          this.$alertMsg('서버와 통신중 오류가 발생하였습니다.')
        }
      })
        .catch(res => {
          this.$alertMsg('처리중 오류가 발생하였습니다.')
        })
    },
    replaceHtml(str) {
      str = str.replace(/&lt;/g, '<')
      str = str.replace(/&gt;/g, '>')
      str = str.replace(/&#38;/g, '&')
      str = str.replace(/&quot;/g, '"')
      str = str.replace(/&#39;/g, '\'')
      str = str.replace(/&#40;/g, '(')
      str = str.replace(/&#41;/g, ')')
      str = str.replace(/&#35;/g, '#')

      return str
    },
    initOffset() {
      this.searchData.offset = 0
      this.originSearchData.offset = 0
    },
    updatePageData(page) {
      this.searchData.page = page
      this.originSearchData.page = page
    },
    updateOriginSearchData() {
      this.originSearchData = JSON.parse(JSON.stringify(this.searchData))
    }

  }
}
</script>
