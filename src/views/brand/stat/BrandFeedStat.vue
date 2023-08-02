<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap stat__wrap barnd-stat">
        <PageTitle pagetitle="브랜드 소식 통계 목록" /> <!-- 07.31 디자인 변경으로 인한 수정(문구수정) -->
        <div class="top-notice--gray">
          <p>최근 1년 6개월 이내 기간 중 최대 31일까지 검색 가능합니다.</p>
        </div>
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
            <!-- 07.31 디자인 변경으로 인한 수정(검색 버튼 삭제)-->
          </div>
        </div>
        <PageTitleH3 titleh3="브랜드 소식 고객반응 추이"/>
        <div class="analysis">
          <div class="customer-type">
            <div class="one-box">
              <div class="one-box__inner">
                <statList
                  v-model="customerResponseTrendBarLine"
                  :chType="customerResponseTrendBarLine.chType"
                  :chart-options="customerResponseTrendBarLine.ChartOptions"
                  :chart-data="customerResponseTrendBarLine.ChartData"
                  :chart-id="customerResponseTrendBarLine.chartId"
                  :dataset-id-key="customerResponseTrendBarLine.datasetIdKey"
                  :width="1067"
                  :height="362"
                  />
              </div>
            </div>
          </div>
        </div>
        <div class="button__wrap flex-end data-btn">
          <!-- 상세 데이터 다운로드 : 검색결과 없을 경우 disabled 클래스 추가 -->
          <a href="" download class="btn btn-blue">상세 데이터 다운로드</a>
        </div>
        <PageTitleH3 titleh3="브랜드 소식별" />
        <!-- 기본 소식 -->
        <div class="feed-stat__wrap">
          <div class="feed-stat-title">
              <h4>기본 소식</h4>
              <p>총 <span>2</span>건</p>
          </div>
          <div class="table__wrap">
            <table class="table table-list">
              <colgroup>
                <col width="25%">
                <col width="25%">
                <col width="25%">
                <col width="25%">
              </colgroup>
              <thead>
                <tr class="date-detail">
                  <th scope="col">소식 제목</th>
                  <th scope="col">유형</th>
                  <th scope="col">해당 기간 페이지 뷰</th>
                  <th scope="col">해당 기간 소식 클릭 수</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in basicFeedStat" :key="index">
                  <td>{{item.title}}</td>
                  <td>{{item.feedType}}</td>
                  <td>{{item.pageView}}</td>
                  <td>{{item.feedBtn}}</td>
                </tr>
                <!-- 검색결과 없을 경우 -->
                <tr class="basic-feed-none"> <!-- 07.31 디자인 변경으로 인한 수정(basic-feed-none 클래스 추가)-->
                  <td colspan="4">검색 결과가 없습니다.</td>
                </tr>
                <!-- // 검색결과 없을 경우 -->
              </tbody>
            </table>
            <PagingCmp />
          </div>
        </div>
        <!-- 일반 소식 -->
        <div class="feed-stat__wrap">
          <div class="feed-stat-title">
              <h4>일반 소식</h4>
              <p>총 <span>10</span>건</p>
            </div>
          <div class="table__wrap">
            <table class="table table-list">
              <colgroup>
                <col width="25%">
                <col width="25%">
                <col width="25%">
                <col width="25%">
              </colgroup>
              <thead>
                <tr class="date-detail">
                  <th scope="col">소식 제목</th>
                  <th scope="col">유형</th>
                  <th scope="col">해당 기간 페이지 뷰</th>
                  <th scope="col">해당 기간 소식 클릭 수</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in generalFeedStat" :key="index">
                  <td>{{item.title}}</td>
                  <td>{{item.feedType}}</td>
                  <td>{{item.pageView}}</td>
                  <td>{{item.feedBtn}}</td>
                </tr>
                <!-- 검색결과 없을 경우 -->
                <tr class="search-feed-none"> <!-- 07.31 디자인 변경으로 인한 수정(search-feed-none 클래스 추가)-->
                  <td colspan="4">검색 결과가 없습니다.</td>
                </tr>
                <!-- // 검색결과 없을 경우 -->
              </tbody>
            </table>
            <PagingCmp />
          </div>
        </div>
        <!-- 07.31 디자인 변경으로 인한 수정(top-notice--gray 클래스 삭제)-->
      </div>
    </div>
  </div>
</template>

<script>
import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import Dropdown from '@/components/common/Dropdown.vue'
// 07.31 디자인 변경으로 인한 수정으로 ButtonCmp 미사용
import PagingCmp from '@/components/common/PagingCmp.vue'
import StatList from '@/views/brand/stat/components/StatList.vue'
import customerResponseTrend from '@/views/brand/stat/customerResponseTrend.js'

export default {
  components: {
    PageTitle,
    BrandLnb,
    PageTitleH3,
    Dropdown,
    // 07.31 디자인 변경으로 인한 수정으로 ButtonCmp 미사용
    PagingCmp,
    StatList
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
      customerResponseTrendBarLine: {
        chType: 'bl-chart',
        chartId: 'bar-line-chart',
        datasetIdKey: 'label',
        ChartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              stacked: true,
              grid: {
                display: false
              },
              ticks: {
                color: '#000',
                font: {
                  size: 12
                }
              }
            },
            y: {
              stacked: true,
              suggestedMin: 0,
              suggestedMax: 300,
              position: 'left',
              textAlign: 'left',
              title: {
                display: false,
                text: '수'
              },
              ticks: {
                color: '#999',
                font: {
                  size: 12
                },
                stepSize: 100
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
              align: 'start', // 07.31 디자인 변경으로 인한 수정 (align 추가)
              labels: {
                usePointStyle: true,
                boxWidth: 12,
                pointStyle: 'circle',
                font: {
                  size: 12
                }
              }
            }
          }
        },
        ChartData: customerResponseTrend
      },
      basicFeedStat: [
        {
          title: '(기본) 공식SNS연결',
          feedType: 'Call',
          pageView: '125',
          feedBtn: '47'
        },
        {
          title: '(기본) 전화걸기',
          feedType: 'More info',
          feedBtn: '1,200'
        },
        {
          title: '(기본) 전화걸기',
          feedType: 'Web',
          feedBtn: '1,200'
        }
      ],
      generalFeedStat: [
        {
          title: '많이 사주세요',
          feedType: '갤러리타입',
          pageView: '845',
          feedBtn: '567'
        },
        {
          title: '새로 나왔어요​',
          feedType: '쉐어링타입​',
          pageView: '845',
          feedBtn: '567'
        },
        {
          title: '새로운 소식',
          feedType: '슬라이드타입',
          pageView: '845',
          feedBtn: '567'
        }
      ]
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
