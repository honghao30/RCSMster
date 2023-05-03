<template>
  <div>
    <div class="sec_header">
      <div class="box_search_area mar_b30">
        <div class="cont_flex_bundle">
          <div class="filter_bundle col_4" v-if="this.userType === 'AGENCY'">
            <strong class="tit_bundle">기업</strong>
            <div class="cont_bundle">
              <span class="custom_select full_width">
                <select id="corpId" v-model="searchData.corpId" @change="selectedCorp">
                  <option value>전체 기업</option>
                  <option v-for="(corp, index) in corpList" :value="corp.corpId" :key="corp.corpId" :data-idx="index">{{corp.corpName}}</option>
                </select>
              </span>
            </div>
          </div>
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
          <div class="filter_bundle col_8">
            <strong class="tit_bundle pad_l30">기간 </strong>
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
                <a href="javascript:void(0);" class="btn sml gray col_1" @click="findSearch()">
                  <span>검색</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="cont_flex_bundle">
        <div class="total_area eft col_6">
          <span class="total_count">
            총 <strong class="count">{{totalCnt}}</strong> 건
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
          <!-- 대행사 -->
          <el-table :data="statList" style="width: 100%" empty-text="검색 결과가 없습니다." v-if="this.userType !== '' && this.userType === 'AGENCY'">
            <el-table-column prop="ymd" label="날짜" width="150"/>
            <el-table-column prop="corpName" label="기업" align="left" width="190"/>
            <el-table-column prop="brandName" label="브랜드" align="left" width="240"/>
            <el-table-column prop="stayTime" label="평균 체류 시간 (초)" width="200"/>
            <el-table-column prop="pageview" label="페이지 뷰">
              <el-table-column prop="pvCnt" label="당일" width="125"/>
              <el-table-column prop="pvTotCnt" label="누적" width="125"/>
            </el-table-column>
            <el-table-column prop="newsclick" label="소식 클릭 수">
              <el-table-column prop="clCnt" label="당일" width="125"/>
              <el-table-column prop="clTotCnt" label="누적" width="125"/>
            </el-table-column>
          </el-table>
          <!-- 관리자, 부관리자 -->
          <el-table :data="statList" style="width: 100%" empty-text="검색 결과가 없습니다." v-else-if="this.userType !== '' && this.userType !== 'AGENCY'">
            <el-table-column prop="ymd" label="날짜" width="150"/>
            <el-table-column prop="brandName" label="브랜드" align="left" width="250"/>
            <el-table-column prop="stayTime" label="평균 체류 시간 (초)" width="240"/>
            <el-table-column prop="pageview" label="페이지 뷰">
              <el-table-column prop="pvCnt" label="당일" width="160"/>
              <el-table-column prop="pvTotCnt" label="누적" width="160"/>
            </el-table-column>
            <el-table-column prop="newsclick" label="소식 클릭 수">
              <el-table-column prop="clCnt" label="당일" width="160"/>
              <el-table-column prop="clTotCnt" label="누적" width="160"/>
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
  statMain
} from '@/api/feed/feed'
import Pagination from '@/components/Pagination'

export default {
  name: 'FeedStatMain',
  props: {
    userType: {
      type: String
    }
  },
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
        startDate: '',
        endDate: '',
        excelYn: ''
      },
      datePickerStDtOptions: {
        disabledDate: this.disabledStDate
      },
      datePickerEdDtOptions: {
        disabledDate: this.disabledEdDate
      },

      corpList: [],
      brandList: [],
      statList: [],

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
    if (this.$route.params.searchType === 'yesterday') {
      this.searchData.endDate = moment().add(-1, 'days').format('YYYYMMDD')
      this.searchData.startDate = moment().add(-1, 'days').format('YYYYMMDD')
    } else {
      this.searchData.endDate = moment().add(-1, 'days').format('YYYYMMDD')
      let startDate = new Date(moment(this.searchData.endDate).format('YYYY-MM-DD'))
      startDate = new Date(startDate.setMonth(startDate.getMonth() - 1))
      this.searchData.startDate = startDate.getFullYear() + ('0' + (startDate.getMonth() + 1)).slice(-2) + ('0' + startDate.getDate()).slice(-2)
    }
    this.getBrandList()
  },
  mounted() {},
  methods: {
    getBrandList() {
      // 대시보드 소식 현황
      brandList()
        .then(res => {
          if (res.code === '20000000') {
            if (this.userType === 'AGENCY') {
              this.corpList = res.result.corpList
            } else {
              this.corpList = res.result.corpList
              this.brandList = res.result.corpList[0].brandList
            }
            this.getStatList()
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
    },
    getStatList() {
      if (this.searchData.startDate === null || this.searchData.startDate === '') {
        alert('시작일을 입력해주세요')
        return false
      } else if (this.searchData.endDate === null || this.searchData.endDate === '') {
        alert('종료일을 입력해주세요')
        return false
      }

      statMain(this.searchData).then(res => {
        if (res.code === '20000000') {
          let listNm = ''
          if (this.searchData.excelYn === 'Y') {
            listNm = this.excel.data
          } else {
            this.statList = []
            listNm = this.statList
            this.totalCnt = res.pagination.total
          }

          for (let i = 0; i < res.result.statList.length; i++) {
            listNm.push({
              ymd: res.result.statList[i].ymd,
              corpName: res.result.statList[i].corpName,
              brandName: res.result.statList[i].brandName,
              pvCnt: res.result.statList[i].pvCnt.toLocaleString(),
              pvTotCnt: res.result.statList[i].pvTotCnt.toLocaleString(),
              clCnt: res.result.statList[i].clCnt.toLocaleString(),
              clTotCnt: res.result.statList[i].clTotCnt.toLocaleString(),
              stayTime: res.result.statList[i].stayTime
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
      this.getStatList()
    },
    selectedCorp() {
      let idx = $('#corpId option:selected').data('idx')
      this.searchData.brandId = ''
      if (idx === undefined) {
        this.brandList = []
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
      this.getStatList()
    },
    excelDownload() {
      this.excel.data = []
      this.searchData.excelYn = 'Y'
      this.getStatList()
    },
    excelSetting() {
      this.searchData.excelYn = ''
      this.excel.header = []
      let head1Row = []
      if (this.userType === 'AGENCY') {
        head1Row = [
          {
            key: 'ymd',
            name: '날짜',
            rowspan: 2
          },
          {
            key: 'corpName',
            name: '기업',
            rowspan: 2
          },
          {
            key: 'brandName',
            name: '브랜드',
            rowspan: 2
          },
          {
            key: 'stayTime',
            name: '평균 체류 시간 (초)',
            rowspan: 2
          },
          {
            name: '페이지 뷰',
            colspan: 2,
            rowspan: 1
          },
          {
            name: '소식 클릭 수',
            colspan: 2,
            rowspan: 1
          }
        ]

        this.excel.dataOrder = [
          'ymd',
          'corpName',
          'brandName',
          'stayTime',
          'pvCnt',
          'pvTotCnt',
          'clCnt',
          'clTotCnt'
        ]
      } else {
        head1Row = [
          {
            key: 'ymd',
            name: '날짜',
            rowspan: 2
          },
          {
            key: 'brandName',
            name: '브랜드',
            rowspan: 2
          },
          {
            key: 'stayTime',
            name: '평균 체류 시간 (초)',
            rowspan: 2
          },
          {
            name: '페이지 뷰',
            colspan: 2,
            rowspan: 1
          },
          {
            name: '소식 클릭 수',
            colspan: 2,
            rowspan: 1
          }
        ]

        this.excel.dataOrder = [
          'ymd',
          'brandName',
          'stayTime',
          'pvCnt',
          'pvTotCnt',
          'clCnt',
          'clTotCnt'
        ]
      }

      let head2Row = [
        {
          key: 'pvCnt',
          name: '당일',
          colspan: 1,
          rowspan: 1
        },
        {
          key: 'pvTotCnt',
          name: '누적',
          colspan: 1,
          rowspan: 1
        },
        {
          key: 'clCnt',
          name: '당일',
          colspan: 1,
          rowspan: 1
        },
        {
          key: 'clTotCnt',
          name: '누적',
          colspan: 1,
          rowspan: 1
        }
      ]

      this.excel.header.push(head1Row)
      this.excel.header.push(head2Row)

      let options = {
        header: this.excel.header,
        dataOrder: this.excel.dataOrder
      }

      xlsx.export(this.excel.data, '소식통계.xlsx', options).then(() => {
        // console.log('success download')
      })
    }
  }
}
</script>
<style>
</style>
