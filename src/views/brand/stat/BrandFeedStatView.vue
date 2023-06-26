<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap stat__wrap barnd-stat">
        <PageTitle pagetitle="브랜드 소식 상세" />
        <PageTitleH3 titleh3="브랜드 소식별 - 상세정보"/>
        <div class="brand-stat-inner">
          <div class="brand-stat-flex">
            <div class="table__wrap">
              <table class="table table-bodyonly">
                <colgroup>
                  <col width="196px">
                  <col />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">제목</th>
                    <td>SK텔레콤의 스마트한 제안</td>
                  </tr>
                  <tr>
                    <th scope="row">상태</th>
                    <td>게시중</td>
                  </tr>
                  <tr>
                    <th scope="row">유형</th>
                    <td>갤러리타입</td>
                  </tr>
                  <tr>
                    <th scope="row">소식 ID</th>
                    <td>12223313</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <PageTitleH3 titleh3="브랜드 소식별 - 고객반응"  totalCount="30"/>
            <div class="top-ctrl-area">
              <div class="left-area">
                <!-- 기간 / datepicker -->
                <el-date-picker
                  v-model="dateRange"
                  type="daterange"
                  range-separator="~"
                  format="yyyy.MM.dd"
                  value-format="yyyyMMdd"
                  ref="datePicker"
                />
                <!-- 조회기간 -->
                <Dropdown :options="rangeOption" v-model="selDateRange" @change="changeRange" class="range-box"/>
                <!-- 검색 버튼 -->
                <ButtonCmp
                  type="btn-default-line"
                >검색</ButtonCmp>
              </div>
            </div>
            <div class="table__wrap">
              <table class="table table-list">
                <colgroup>
                  <col width="123px">
                  <col width="123px">
                  <col />
                  <col/>
                  <col/>
                  <col/>
                  <col/>
                </colgroup>
                <thead>
                  <tr class="date-detail">
                    <th scope="col" rowspan="2">날짜</th>
                    <th scope="col" rowspan="2">슬라이드 번호</th>
                    <th scope="col" colspan="2">페이지 뷰</th>
                    <th scope="col" colspan="2">버튼 1 클릭 수</th>
                    <th scope="col" colspan="2">버튼 2 클릭 수</th>
                  </tr>
                  <tr class="date-detail">
                    <th scope="col">당일</th>
                    <th scope="col">누적</th>
                    <th scope="col">당일</th>
                    <th scope="col">누적</th>
                    <th scope="col">당일</th>
                    <th scope="col">누적</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in feedCustomerResponseStat" :key="index">
                    <td>{{item.date}}</td>
                    <td>{{item.slide}}</td>
                    <td>{{item.pageToday}}</td>
                    <td>{{item.pageAcc}}</td>
                    <td>{{item.btnOneToday}}</td>
                    <td>{{item.btnOneAcc}}</td>
                    <td>{{item.btnTwoToday}}</td>
                    <td>{{item.btnTwoAcc}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="button__wrap flex-end data-btn">
              <!-- 상세 데이터 다운로드 : 검색결과 없을 경우 disabled 클래스 추가 -->
              <a href="" download class="btn btn-blue">상세 데이터 다운로드</a>
            </div>
            <PagingCmp />
            <div class="button__wrap flex-start">
              <router-link
                to="/BrandFeedStat"
                class="btn btn-line"
              >이전</router-link>
            </div>
          </div>
          <!-- 에뮬레이터 -->
          <!-- 소식 유형(갤러리, 쉐어링, 슬라이드)별 미리보기 노출 상이함 -->
          <div class="brand-aside sticky">
            <feedEmulator
              :brandInfoData="brandInfoData"
              :feedInfoData="brandDes"
            />
          </div>
          <!-- // 에뮬레이터 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import PagingCmp from '@/components/common/PagingCmp.vue'
import feedEmulator from '@/views/brand/feed/components/feedEmulator.vue'

export default {
  components: {
    PageTitle,
    BrandLnb,
    PageTitleH3,
    Dropdown,
    ButtonCmp,
    PagingCmp,
    feedEmulator
  },
  props: {
  },
  data() {
    return {
      dateRange: [],
      rangeOption: [
        {
          label: '오늘',
          value: 'today'
        },
        {
          label: '1주일',
          value: '1w'
        },
        {
          label: '1개월',
          value: '1m'
        }
      ],
      feedCustomerResponseStat: [
        {
          date: '2023.03.25',
          slide: '1 of 4',
          pageToday: '200',
          pageAcc: '1,000',
          btnOneToday: '200',
          btnOneAcc: '1,000',
          btnTwoToday: '200',
          btnTwoAcc: '1,000'
        },
        {
          date: '2023.03.25',
          slide: '1 of 4',
          pageToday: '200',
          pageAcc: '1,000',
          btnOneToday: '200',
          btnOneAcc: '1,000',
          btnTwoToday: '200',
          btnTwoAcc: '1,000'
        },
        {
          date: '2023.03.25',
          slide: '1 of 4',
          pageToday: '200',
          pageAcc: '1,000',
          btnOneToday: '200',
          btnOneAcc: '1,000',
          btnTwoToday: '200',
          btnTwoAcc: '1,000'
        },
        {
          date: '2023.03.25',
          slide: '1 of 4',
          pageToday: '200',
          pageAcc: '1,000',
          btnOneToday: '200',
          btnOneAcc: '1,000',
          btnTwoToday: '200',
          btnTwoAcc: '1,000'
        }
      ],
      brandInfoData: {
        name: '네스프레소',
        profileImgFileUrl: 'dummy/brand_logo.png'
      },
      brandDes: {
        type: 'gallery',
        feedDate: '4월 19일 오후 3:00',
        feedTitle: 'SK 텔레콤의 스마트한 제안​',
        feedContent: 'SK텔레콤을 다양하게 만나보세요! #SKT Insight · SK텔레콤 네이버 포스트 스크랩 · SK텔레콤 페이스북 #Facebook · SK텔레콤 유튜브 #YouTube ​레콤 네이버 포스트 스크랩 · SK텔레콤 페이스북 #Facebook · SK텔레콤 유튜브 #YouTube ​레콤 네이버 포스트 스크랩 · SK텔레콤 페이스북 #Facebook · SK텔레콤 유튜브 #YouTube',
        imgFiles: ['dummy/feed_image_02.png', 'dummy/feed_image.png']
      }
    }
  },
  created() {
    let today = new Date()
    let year = today.getFullYear()
    let month = ('0' + (today.getMonth() + 1)).slice(-2)
    let day = ('0' + today.getDate()).slice(-2)
    let dateString = year + month + day
    this.dateRange = [ dateString, dateString ]
  },
  methods: {
    changeRange() {
      let today = new Date()
      let year = today.getFullYear()
      let month = ('0' + (today.getMonth() + 1)).slice(-2)
      let day = ('0' + today.getDate()).slice(-2)
      let dateString = year + month + day
      this.dateRange[1] = dateString
      if (this.selDateRange === 'today') {
        this.dateRange[0] = dateString
        this.$refs.datePicker.value = [dateString, dateString]
      } else if (this.selDateRange === '1w') {
        let changeDate = today.getTime() - (7 * 24 * 60 * 60 * 1000)
        today.setTime(changeDate)
        let changeYear = today.getFullYear()
        let changeMonth = ('0' + (today.getMonth() + 1)).slice(-2)
        let changeday = ('0' + today.getDate()).slice(-2)
        let changeDateString = changeYear + changeMonth + changeday
        this.dateRange[0] = changeDateString
        this.$refs.datePicker.value = [changeDateString, dateString]
      } else if (this.selDateRange === '1m') {
        let changeDate = today.getTime() - (30 * 24 * 60 * 60 * 1000)
        today.setTime(changeDate)
        let changeYear = today.getFullYear()
        let changeMonth = ('0' + (today.getMonth() + 1)).slice(-2)
        let changeday = ('0' + today.getDate()).slice(-2)
        let changeDateString = changeYear + changeMonth + changeday
        this.dateRange[0] = changeDateString
        this.$refs.datePicker.value = [changeDateString, dateString]
      }
    },
    changeCal() {
      this.selDateRange = ''
    }
  }
}
</script>
