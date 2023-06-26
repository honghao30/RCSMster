<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap stat__wrap ch-stat">
        <PageTitle pagetitle="대화방 메뉴 통계" />
        <div class="top-notice--gray">
          <p>대화방/발신번호 별 1건 이상 사용자 선택이 일어난 경우에 대해 집계됩니다.</p>
        </div>
        <div class="top-ctrl-area">
          <div class="left-area">
            <Dropdown :options="totalOptions" placeholder="전체" />
            <Dropdown searchable :options="PhoeIdOptions" placeholder="023352286" />
            <ButtonCmp
              type="btn-default-line"
            >조회</ButtonCmp>
          </div>
        </div>
        <PageTitleH3 titleh3="최근 7일 성과"/>
        <div class="analysis">
          <div class="customer-type">
            <div class="one-box">
              <div class="one-box__inner">
                <statList
                  v-model="recentResultBar"
                  :chType="recentResultBar.chType"
                  :chart-options="recentResultBar.ChartOptions"
                  :chart-data="recentResultBar.ChartData"
                  :chart-id="recentResultBar.chartId"
                  :dataset-id-key="recentResultBar.datasetIdKey"
                  :width="1067"
                  :height="414"
                  />
              </div>
            </div>
          </div>
        </div>
        <PageTitleH3 titleh3="기간별 반응 수" totalCount="30"/>
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
            <!-- 검색 -->
            <span class="input search">
              <input ref="search" type="text" class="input" placeholder="검색어를 입력해 주세요.">
            </span>
            <!-- 검색 버튼 -->
            <ButtonCmp
              type="btn-default-line"
            >검색</ButtonCmp>
          </div>
        </div>
        <div class="table__wrap">
          <table class="table table-list">
            <colgroup>
              <col width="213px">
              <col width="183px">
              <col width="183px">
              <col width="193px">
              <col width="193px">
              <col width="162px">
            </colgroup>
            <thead>
              <tr class="date-detail">
                <th scope="col" rowspan="2">대화방 메뉴명</th>
                <th scope="col" rowspan="2">응답 유형</th>
                <th scope="col" rowspan="2">기간내 클릭 수</th>
                <th scope="col" colspan="3">고객반응</th>
              </tr>
              <tr class="date-detail">
                <th scope="col">버튼명</th>
                <th scope="col">Action 종류</th>
                <th scope="col">클릭 수</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(item, index) in responseStat">
                <tr :key="index">
                  <td :rowspan="responseRowspan(item)">{{item.menu}}</td>
                  <td :rowspan="responseRowspan(item)">{{item.responseType}}</td>
                  <td :rowspan="responseRowspan(item)">{{item.clickNum}}</td>
                  <td>{{item.responseBtn}}</td>
                  <td>{{item.responseBtnType}}</td>
                  <td>{{item.responseClick}}</td>
                </tr>
                <template v-if="item.addItems && item.addItems.length > 0">
                  <tr v-for="(addItem, addIndex) in item.addItems" :key="addIndex">
                    <td>{{addItem.responseBtn}}</td>
                    <td>{{addItem.responseBtnType}}</td>
                    <td>{{addItem.responseClick}}</td>
                  </tr>
                </template>
              </template>
              <!-- 검색결과 없을 경우 -->
              <tr>
                <td colspan="6">검색 결과가 없습니다.</td>
              </tr>
              <!-- // 검색결과 없을 경우 -->
            </tbody>
          </table>
        </div>
        <div class="button__wrap flex-end data-btn">
          <!-- 상세 데이터 다운로드 : 검색결과 없을 경우 disabled 클래스 추가 -->
          <a href="" download class="btn btn-blue">상세 데이터 다운로드</a>
        </div>
        <PagingCmp />
        <div class="top-notice--gray">
          <ul>
            <li>- 최근 1년 6개월 이내 기간 중 최대 31일까지 검색 가능합니다.</li>
            <li>- 1일 내 동일 고객의 버튼 클릭 수는 제외됩니다.</li>
          </ul>
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
import StatList from '@/views/brand/stat/components/StatList.vue'
import recentResult from '@/views/brand/stat/recentResult.js'

export default {
  components: {
    PageTitle,
    BrandLnb,
    PageTitleH3,
    Dropdown,
    ButtonCmp,
    PagingCmp,
    StatList
  },
  props: {
  },
  data() {
    return {
      dateRange: [],
      totalOptions: [
        {
          lable: '전체',
          value: 'total'
        },
        {
          lable: '발신번호',
          value: 'ph'
        },
        {
          lable: '챗봇 ID',
          value: 'chat'
        }
      ],
      PhoeIdOptions: [
        {
          lable: '023352286',
          value: 'ph01'
        },
        {
          lable: 'bot-i7ke7f30e6b',
          value: 'ch01'
        },
        {
          lable: '15885872',
          value: 'ph02'
        },
        {
          lable: 'bot-i7ke7f30e6b',
          value: 'ch02'
        }
      ],
      recentResultBar: {
        chType: 'b-chart',
        chartId: 'bar-chart',
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
              suggestedMax: 5000,
              position: 'left',
              textAlign: 'left',
              title: {
                display: false,
                text: '클릭수'
              },
              ticks: {
                color: '#999',
                font: {
                  size: 12
                },
                stepSize: 1000
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                usePointStyle: true,
                boxWidth: 12,
                font: {
                  size: 12
                }
              }
            }
          }
        },
        ChartData: recentResult
      },
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
      responseStat: [
        {
          menu: '문자수신 동의하고 6천원 받기',
          responseType: '자동응답 메시지',
          clickNum: 123342343,
          responseBtn: '(카드1) 버튼명',
          responseBtnType: '복사하기',
          responseClick: 1351,
          addItems: [
            {
              responseBtn: '(카드1) 버튼명',
              responseBtnType: '복사하기',
              responseClick: 1351
            },
            {
              responseBtn: '(카드1) 버튼명',
              responseBtnType: '복사하기',
              responseClick: 1351
            },
            {
              responseBtn: '(카드1) 버튼명',
              responseBtnType: '복사하기',
              responseClick: 1351
            }
          ]
        },
        {
          menu: '고객센터',
          responseType: '전화연결',
          clickNum: 123342343,
          responseBtn: '-',
          responseBtnType: '-',
          responseClick: '-'
        },
        {
          menu: '공지사항',
          responseType: '전화연결',
          clickNum: 957411,
          responseBtn: '-',
          responseBtnType: '-',
          responseClick: 21120,
          addItems: [
            {
              responseBtn: '(카드1) 버튼명',
              responseBtnType: '복사하기',
              responseClick: 1351
            }
          ]
        },
        {
          menu: '주문내역',
          responseType: '전화연결',
          clickNum: 5120,
          responseBtn: '-',
          responseBtnType: '-',
          responseClick: 21120,
          addItems: [
            {
              responseBtn: '(카드1) 버튼명',
              responseBtnType: '복사하기',
              responseClick: 1351
            }
          ]
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
    },
    responseRowspan(item) {
      return item.addItems ? item.addItems.length + 1 : 1
    }
  }
}
</script>
