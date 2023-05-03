<template>
  <div>
    <div class="sec_header">
      <!-- sort -->
      <div class="box_search_area mar_b30" v-if="this.searchRadio === 'feed'">
        <div class="cont_flex_bundle">
          <div class="filter_bundle col_4">
            <strong class="tit_bundle">브랜드</strong>
            <div class="cont_bundle">
              <span class="custom_select full_width">
                <select v-model="searchData.brandId">
                  <option value>전체 브랜드</option>
                  <option v-for="brand in brandList" :value="brand.brandId" v-bind:key="brand.brandId">{{brand.brandName}}</option>
                </select>
              </span>
          </div>
        </div>
        <div class="filter_bundle col_3 tit_char3">
          <strong class="tit_bundle pad_l30">유형</strong>
          <div class="cont_bundle">
            <span class="custom_select full_width">
              <select v-model="searchData.type">
                <option value>전체 유형</option>
                <option value="gallery">Gallery</option>
                <option value="share">Sharing</option>
                <option value="slide">Slide View</option>
              </select>
            </span>
          </div>
        </div>
        <div class="filter_bundle col_4 tit_char4">
          <strong class="tit_bundle">검색 항목</strong>
            <div class="cont_bundle">
              <span class="custom_radio min">
                <input type="radio" v-model="searchRadio" value="feed" name="searchRadio" id="searchRadio1">
                <label for="searchRadio1">소식 상세</label>
              </span>
              <span class="custom_radio min">
                <input type="radio" v-model="searchRadio" value="slide" name="searchRadio" id="searchRadio2">
                <label for="searchRadio2">slide 소식 상세</label>
              </span>
            </div>
          </div>
        </div>
        <div class="cont_flex_bundle mar_t20">
          <div class="filter_bundle col_4">
            <strong class="tit_bundle">기간</strong>
            <div class="cont_bundle">
              <div class="cont_flex_bundle date_checkbox">
                <span class="custom_input icon_right">
                  <div class="date_picker">
                    <el-date-picker v-model="searchData.startDate" type="date" placeholder="시작일" value-format="yyyyMMdd" @change="changeDate('start')" :picker-options="datePickerStDtOptions" popper-class="arrowmover"/>
                  </div>
                </span>
                <span class="bar">-</span>
                <span class="custom_input icon_right">
                  <div class="date_picker">
                    <el-date-picker v-model="searchData.endDate" type="date" placeholder="종료일" value-format="yyyyMMdd" @change="changeDate('end')" :picker-options="datePickerEdDtOptions" popper-class="arrowmover"/>
                  </div>
                </span>
              </div>
            </div>
          </div>
          <div class="filter_bundle col_3 tit_char3">
            <strong class="tit_bundle">검색어</strong>
            <div class="cont_bundle">
              <span class="custom_select full_width">
                <select v-model="searchData.searchType">
                  <option value>선택</option>
                  <option value="title">소식 제목</option>
                  <option value="id">소식 ID</option>
                </select>
              </span>
            </div>
          </div>
          <div class="filter_bundle col_5">
            <span class="custom_input full_width mar_l12">
              <input type="text" v-model="searchData.keyword" placeholder="검색어 입력">
            </span>
            <a href="javascript:void(0);" class="btn sml gray col_1" @click="statSearch()">
              <span>검색</span>
            </a>
          </div>
        </div>
      </div>
      <div class="box_search_area mar_b30" v-else-if="this.searchRadio === 'slide'">
        <div class="cont_flex_bundle">
          <div class="filter_bundle col_4">
            <strong class="tit_bundle">브랜드</strong>
            <div class="cont_bundle">
              <span class="custom_select full_width">
                <select v-model="searchData.brandId">
                  <option value>전체 브랜드</option>
                  <option v-for="brand in brandList" :value="brand.brandId" :key="brand.brandId">{{brand.brandName}}</option>
                </select>
              </span>
            </div>
          </div>
          <div class="filter_bundle col_4 tit_char4">
            <strong class="tit_bundle">검색 항목</strong>
            <div class="cont_bundle">
              <span class="custom_radio min">
                <input type="radio" v-model="searchRadio" value="feed" name="searchRadio" id="searchRadio1">
                <label for="searchRadio1">소식 상세</label>
              </span>
              <span class="custom_radio min">
                <input type="radio" v-model="searchRadio" value="slide" name="searchRadio" id="searchRadio2">
                <label for="searchRadio2">slide 소식 상세</label>
              </span>
            </div>
          </div>
        </div>
        <div class="cont_flex_bundle mar_t20">
          <div class="filter_bundle col_4">
            <strong class="tit_bundle">기간</strong>
            <div class="cont_bundle">
              <div class="cont_flex_bundle date_checkbox">
                <span class="custom_input icon_right">
                  <div class="date_picker">
                    <el-date-picker v-model="searchData.startDate" type="date" placeholder="시작일" value-format="yyyyMMdd" @change="changeDate('start')" :picker-options="datePickerStDtOptions" popper-class="arrowmover"/>
                  </div>
                </span>
                <span class="bar">-</span>
                <span class="custom_input icon_right">
                  <div class="date_picker">
                    <el-date-picker v-model="searchData.endDate" type="date" placeholder="종료일" value-format="yyyyMMdd" @change="changeDate('end')" :picker-options="datePickerEdDtOptions" popper-class="arrowmover"/>
                  </div>
                </span>
              </div>
            </div>
          </div>
          <div class="filter_bundle col_3">
            <strong class="tit_bundle">검색어</strong>
            <div class="cont_bundle">
              <span class="custom_select full_width">
                <select v-model="searchData.searchType">
                  <option value>선택</option>
                  <option value="title">소식 제목</option>
                  <option value="id">소식 ID</option>
                  <option value="slide">Slide 제목</option>
                </select>
              </span>
            </div>
          </div>
          <div class="filter_bundle col_5">
            <span class="custom_input full_width mar_l12">
              <input type="text" v-model="searchData.keyword" placeholder="검색어 입력">
            </span>
            <a href="javascript:void(0);" class="btn sml gray col_1" @click="statSearch()">
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
            <select v-model="searchData.limit" @change="findSearch">
              <option value="20">20개</option>
              <option value="50">50개</option>
              <option value="100">100개</option>
            </select>
          </span>
        </div>
        <div class="btn_wrap right col_6">
          <a href="javascript:void(0);" class="btn sml bd_black type2" @click="excelDownload">파일 다운로드</a>
        </div>
      </div>
    </div>

    <div class="sec_body">
      <div class="box_scroll mar_t20">
        <div class="tbl_sorting_wrap th_multi">
          <el-table :data="statList" style="width: 100%" v-show="searchTypeCheck" empty-text="검색 결과가 없습니다.">
            <el-table-column prop="ymd" label="날짜" width="115"/>
            <el-table-column prop="brandName" label="브랜드명" align="left" width="170"/>
            <el-table-column prop="feedId" label="소식 ID" align="left" width="125"/>
            <el-table-column prop="title" label="소식제목" align="left" width="141"/>
            <el-table-column prop="type" label="유형" width="105"/>
            <el-table-column prop="pageview" label="페이지 뷰">
              <el-table-column prop="pvCnt" label="당일" width="78"/>
              <el-table-column prop="pvTotCnt" label="누적" width="78"/>
            </el-table-column>
            <el-table-column prop="buttonClick" label="버튼 클릭 수">
              <el-table-column prop="buttonClick1" label="버튼1">
                <el-table-column prop="btn1ClCnt" label="당일" width="78"/>
                <el-table-column prop="btn1ClTotCnt" label="누적" width="78"/>
              </el-table-column>
              <el-table-column prop="buttonClick2" label="버튼2">
                <el-table-column prop="btn2ClCnt" label="당일" width="78"/>
                <el-table-column prop="btn2ClTotCnt" label="누적" width="78"/>
              </el-table-column>
            </el-table-column>
            <el-table-column prop="sharingType" label="Sharing type">
              <el-table-column prop="sharingContentClick" label="Share컨텐츠 클릭수">
                <el-table-column prop="slClCnt" label="당일" width="78"/>
                <el-table-column prop="slClTotCnt" label="누적" width="78"/>
              </el-table-column>
            </el-table-column>
          </el-table>

          <el-table :data="statList" :default-sort="{prop: 'date', order: 'descending'}" style="width: 100%" v-show="!searchTypeCheck" empty-text="검색 결과가 없습니다.">
            <el-table-column prop="ymd" label="날짜" width="130"/>
            <el-table-column prop="brandName" label="브랜드명" align="left" width="185"/>
            <el-table-column prop="feedId" label="소식 ID" align="left" width="140"/>
            <el-table-column prop="feedTitle" label="소식제목" align="left" width="160"/>
            <el-table-column prop="title" label="Slide소식 제목" align="left" width="160"/>
            <el-table-column prop="slideType" label="slide 유형" width="145"/>
            <el-table-column prop="buttonClick" label="버튼 클릭 수">
              <el-table-column prop="buttonClick1" label="버튼1">
                <el-table-column prop="btn1ClCnt" label="당일" width="90"/>
                <el-table-column prop="btn1ClTotCnt" label="누적" width="90"/>
              </el-table-column>
              <el-table-column prop="buttonClick2" label="버튼2">
                <el-table-column prop="btn2ClCnt" label="당일" width="90"/>
                <el-table-column prop="btn2ClTotCnt" label="누적" width="90"/>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <pagination :total="totalCnt" :pageSize="searchData.limit" @change="changePage" :current-page.sync="page"/>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import xlsx from '@/utils/excel'

import {
  brandList,
  statFeed,
  statSlide
} from '@/api/feed/feed'
import Pagination from '@/components/Pagination'

export default {
  name: 'FeedStatMain',
  components: {
    Pagination
  },
  data() {
    return {
      totalCnt: 0,
      page: 1,
      searchData: {
        offset: 0,
        limit: 20,
        corpId: '',
        brandId: '',
        type: '',
        startDate: '',
        endDate: '',
        searchType: '',
        keyword: '',
        excelYn: ''
      },
      datePickerStDtOptions: {
        disabledDate: this.disabledStDate
      },
      datePickerEdDtOptions: {
        disabledDate: this.disabledEdDate
      },

      statList: [],
      corpList: [],
      brandList: [],
      searchRadio: 'feed',
      searchTypeCheck: true,

      excel: {
        header: [],
        dataOrder: [],
        data: []
      }
    }
  },
  computed: {},
  watch: {},
  created() {
    this.searchData.endDate = moment().add(-1, 'days').format('YYYYMMDD')
    let startDate = new Date(moment(this.searchData.endDate).format('YYYY-MM-DD'))
    startDate = new Date(startDate.setMonth(startDate.getMonth() - 1))
    this.searchData.startDate = startDate.getFullYear() + ('0' + (startDate.getMonth() + 1)).slice(-2) + ('0' + startDate.getDate()).slice(-2)
    this.getBrandList()
  },
  mounted() {},
  methods: {
    getBrandList() {
      // 대시보드 소식 현황
      brandList().then(res => {
        if (res.code === '20000000') {
          this.corpList = res.result.corpList
          this.brandList = res.result.corpList[0].brandList
          this.statSearch()
        } else {
          console.log(res)
        }
      })
    },
    getStatFeedList() {
      if (this.searchData.startDate === null || this.searchData.startDate === '') {
        alert('시작일을 입력해주세요')
        return false
      } else if (this.searchData.endDate === null || this.searchData.endDate === '') {
        alert('종료일을 입력해주세요')
        return false
      }
      statFeed(this.searchData).then(res => {
        if (res.code === '20000000') {
          let listNm = ''
          if (this.searchData.excelYn === 'Y') {
            listNm = this.excel.data
          } else {
            this.statList = []
            listNm = this.statList
            this.totalCnt = res.pagination.total
          }
          let type = ''

          for (let i = 0; i < res.result.statList.length; i++) {
            type = res.result.statList[i].type
            if (type === 'gallery') {
              type = 'Gallery'
            } else if (type === 'share') {
              type = 'Sharing'
            } else if (type === 'slide') {
              type = 'Slide View'
            }

            listNm.push({
              ymd: res.result.statList[i].ymd,
              brandName: res.result.statList[i].brandName,
              feedId: res.result.statList[i].feedId,
              title: res.result.statList[i].title,
              type: type,
              pvCnt: res.result.statList[i].pvCnt.toLocaleString(),
              pvTotCnt: res.result.statList[i].pvTotCnt.toLocaleString(),
              btn1ClCnt: res.result.statList[i].btn1ClCnt.toLocaleString(),
              btn1ClTotCnt: res.result.statList[i].btn1ClTotCnt.toLocaleString(),
              btn2ClCnt: res.result.statList[i].btn2ClCnt.toLocaleString(),
              btn2ClTotCnt: res.result.statList[i].btn2ClTotCnt.toLocaleString(),
              slClCnt: res.result.statList[i].slClCnt.toLocaleString(),
              slClTotCnt: res.result.statList[i].slClTotCnt.toLocaleString()
            })
          }
          if (this.searchData.excelYn === 'Y') {
            this.excelSetting()
          }
        } else {
          console.log(res)
        }
      })
    },
    getStatSlideList() {
      if (this.searchData.startDate === null || this.searchData.startDate === '') {
        alert('시작일을 입력해주세요')
        return false
      } else if (this.searchData.endDate === null || this.searchData.endDate === '') {
        alert('종료일을 입력해주세요')
        return false
      }
      this.searchData.type = ''
      statSlide(this.searchData).then(res => {
        if (res.code === '20000000') {
          let listNm = ''
          if (this.searchData.excelYn === 'Y') {
            listNm = this.excel.data
          } else {
            this.statList = []
            listNm = this.statList
            this.totalCnt = res.pagination.total
          }
          let type = ''

          for (let i = 0; i < res.result.statList.length; i++) {
            type = res.result.statList[i].slideType
            if (type === 'gallery') {
              type = 'Image'
            } else if (type === 'share') {
              type = 'URL'
            }

            listNm.push({
              ymd: res.result.statList[i].ymd,
              brandName: res.result.statList[i].brandName,
              feedId: res.result.statList[i].feedId,
              feedTitle: res.result.statList[i].feedTitle,
              slideType: type,
              title: res.result.statList[i].title,
              btn1ClCnt: res.result.statList[i].btn1ClCnt.toLocaleString(),
              btn1ClTotCnt: res.result.statList[i].btn1ClTotCnt.toLocaleString(),
              btn2ClCnt: res.result.statList[i].btn2ClCnt.toLocaleString(),
              btn2ClTotCnt: res.result.statList[i].btn2ClTotCnt.toLocaleString()
            })
          }
          if (this.searchData.excelYn === 'Y') {
            this.excelSetting()
          }
        } else {
          console.log(res)
        }
      })
    },
    changePage(page) {
      this.page = page
      this.searchData.offset = (page - 1) * this.searchData.limit // 시작 row(0부터)
      if (this.searchTypeCheck) {
        this.getStatFeedList()
      } else {
        this.getStatSlideList()
      }
    },
    selectedCorp() {
      let idx = $('#corpId option:selected').data('idx')
      if (idx === undefined) {
        this.brandList = []
        this.searchData.brandId = ''
      } else {
        this.brandList = this.corpList[idx].brandList
      }
    },
    disabledStDate(date) {
      // date: disable 될 날짜 (선택날짜 아님)
      date = moment(String(date)).format('YYYYMMDD')
      return date > moment().add(-1, 'days').format('YYYYMMDD') || date < moment().add(-1, 'years').format('YYYYMMDD')
    },
    disabledEdDate(date) {
      // date: disable 될 날짜 (선택날짜 아님)
      date = moment(String(date)).format('YYYYMMDD')
      return date > moment().add(-1, 'days').format('YYYYMMDD') || date < this.searchData.startDate
    },
    changeDate(type) {
      if (type === 'start') {
        if (this.searchData.endDate === null || this.searchData.startDate > this.searchData.endDate) {
          this.searchData.endDate = this.searchData.startDate
        }
        let startDate = new Date(moment(this.searchData.endDate).format('YYYY-MM-DD'))
        startDate = new Date(startDate.setMonth(startDate.getMonth() - 1))
        startDate = startDate.getFullYear() + ('0' + (startDate.getMonth() + 1)).slice(-2) + ('0' + startDate.getDate()).slice(-2)
        if (moment(this.searchData.startDate).isBefore(startDate)) {
          alert('검색 기간은 최대 1개월까지 선택 가능 합니다.')
          this.searchData.startDate = startDate
        }
      } else if (type === 'end') {
        if (this.searchData.startDate === null) {
          this.searchData.startDate = this.searchData.endDate
        }
        if (moment(this.searchData.endDate).isAfter(moment(this.searchData.startDate).add(1, 'months').format('YYYYMMDD'))) {
          alert('검색 기간은 최대 1개월까지 선택 가능 합니다.')
          this.searchData.endDate = moment(this.searchData.startDate).add(1, 'months').format('YYYYMMDD')
        }
      }
    },
    findSearch() {
      this.page = 1
      this.searchData.offset = 0
      if (this.searchTypeCheck) {
        this.getStatFeedList()
      } else {
        this.getStatSlideList()
      }
    },
    statSearch() {
      this.page = 1
      this.searchData.offset = 0
      this.searchData.limit = 20

      if (this.searchRadio === 'feed') {
        this.searchTypeCheck = true
        this.getStatFeedList()
      } else {
        this.searchTypeCheck = false
        this.getStatSlideList()
      }
    },
    excelDownload() {
      this.excel.data = []
      this.searchData.excelYn = 'Y'
      if (this.searchTypeCheck) {
        this.getStatFeedList()
      } else {
        this.getStatSlideList()
      }
    },
    excelSetting() {
      this.searchData.excelYn = ''
      this.excel.header = []
      this.excel.dataOrder = []
      let head1Row = []
      let head2Row = []
      let head3Row = []
      let title = ''

      if (this.searchTypeCheck) {
        head1Row = [
          {
            key: 'ymd',
            name: '날짜',
            rowspan: 3
          },
          {
            key: 'brandName',
            name: '브랜드',
            rowspan: 3
          },
          {
            key: 'feedId',
            name: '소식 ID',
            rowspan: 3
          },
          {
            key: 'title',
            name: '소식제목',
            rowspan: 3
          },
          {
            key: 'type',
            name: '유형',
            rowspan: 3
          },
          {
            name: '페이지 뷰',
            colspan: 2,
            rowspan: 1
          },
          {
            name: '버튼 클릭 수',
            colspan: 4,
            rowspan: 1
          },
          {
            name: 'Sharing type',
            colspan: 2,
            rowspan: 1
          }
        ]

        head2Row = [
          {
            key: 'pvCnt',
            name: '당일',
            colspan: 1,
            rowspan: 2
          },
          {
            key: 'pvTotCnt',
            name: '누적',
            colspan: 1,
            rowspan: 2
          },
          {
            name: '버튼1',
            colspan: 2,
            rowspan: 1
          },
          {
            name: '버튼2',
            colspan: 2,
            rowspan: 1
          },
          {
            name: 'Share컨텐츠 클릭수',
            colspan: 2,
            rowspan: 1
          }
        ]

        head3Row = [
          {
            key: 'btn1ClCnt',
            name: '당일',
            colspan: 1,
            rowspan: 1
          },
          {
            key: 'btn1ClTotCnt',
            name: '누적',
            colspan: 1,
            rowspan: 1
          },
          {
            key: 'btn2ClCnt',
            name: '당일',
            colspan: 1,
            rowspan: 1
          },
          {
            key: 'btn2ClTotCnt',
            name: '누적',
            colspan: 1,
            rowspan: 1
          },
          {
            key: 'slClCnt',
            name: '당일',
            colspan: 1,
            rowspan: 1
          },
          {
            key: 'slClTotCnt',
            name: '누적',
            colspan: 1,
            rowspan: 1
          }
        ]

        this.excel.dataOrder = [
          'ymd',
          'brandName',
          'feedId',
          'title',
          'type',
          'pvCnt',
          'pvTotCnt',
          'btn1ClCnt',
          'btn1ClTotCnt',
          'btn2ClCnt',
          'btn2ClTotCnt',
          'slClCnt',
          'slClTotCnt'
        ]

        title = '소식상세.xlsx'
      } else {
        head1Row = [
          {
            key: 'ymd',
            name: '날짜',
            rowspan: 3
          },
          {
            key: 'brandName',
            name: '브랜드',
            rowspan: 3
          },
          {
            key: 'feedId',
            name: '소식 ID',
            rowspan: 3
          },
          {
            key: 'feedTitle',
            name: '소식제목',
            rowspan: 3
          },
          {
            key: 'title',
            name: 'Slide 소식 제목',
            rowspan: 3
          },
          {
            key: 'slideType',
            name: 'slide 유형',
            rowspan: 3
          },
          {
            name: '버튼 클릭 수',
            colspan: 4,
            rowspan: 1
          }
        ]

        head2Row = [
          {
            name: '버튼1',
            colspan: 2,
            rowspan: 1
          },
          {
            name: '버튼2',
            colspan: 2,
            rowspan: 1
          }
        ]

        head3Row = [
          {
            key: 'btn1ClCnt',
            name: '당일',
            colspan: 1,
            rowspan: 1
          },
          {
            key: 'btn1ClTotCnt',
            name: '누적',
            colspan: 1,
            rowspan: 1
          },
          {
            key: 'btn2ClCnt',
            name: '당일',
            colspan: 1,
            rowspan: 1
          },
          {
            key: 'btn2ClTotCnt',
            name: '누적',
            colspan: 1,
            rowspan: 1
          }
        ]

        this.excel.dataOrder = [
          'ymd',
          'brandName',
          'feedId',
          'feedTitle',
          'title',
          'slideType',
          'btn1ClCnt',
          'btn1ClTotCnt',
          'btn2ClCnt',
          'btn2ClTotCnt'
        ]

        title = 'slide 소식 상세.xlsx'
      }

      this.excel.header.push(head1Row)
      this.excel.header.push(head2Row)
      this.excel.header.push(head3Row)

      let options = {
        header: this.excel.header,
        dataOrder: this.excel.dataOrder
      }

      xlsx.export(this.excel.data, title, options).then(() => {
        // console.log('success download')
      })
    }
  }
}
</script>
<style>
</style>
