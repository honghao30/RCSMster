<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap stat-msg__wrap">
        <PageTitle pagetitle="메시지 통계 상세" />
        <PageTitleH3 titleh3="기본 정보"/>
        <div class="table__wrap">
          <table class="table table-bodyonly">
            <colgroup>
              <col width="196px">
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">그룹 ID</th>
                <td>9743089AF350B7845589</td>
              </tr>
              <tr>
                <th scope="row">발신번호/챗봇 ID</th>
                <td>1544-6542</td>
              </tr>
              <tr>
                <th scope="row">메시지 유형</th>
                <td>이미지 템플릿</td>
              </tr>
            </tbody>
          </table>
        </div>
        <PageTitleH3 titleh3="누적 결과"/>
        <div class="stat-box">
          <statList
          v-model="barLine"
          :chType="barLine.chType"
          :chart-options="barLine.chartOptions"
          :chart-data="barLine.AccumulatedResults"
          :chart-id="barLine.chartId"
          :dataset-id-key="barLine.datasetIdKey"
          :width="1063"
          :height="391"
          />
        </div>
        <ul class="stat-result">
          <li>총 발송 성공 건수<span class="stat-result-num">925,125,456</span></li>
          <li>총 읽음 확인율<span class="stat-result-num">76.4%</span></li>
          <li>총 클릭률<span class="stat-result-num">95%</span></li>
        </ul>
        <PageTitleH3 titleh3="날짜별 상세" totalCount="30"/>
        <div class="table__wrap">
          <table class="table table-list">
            <colgroup>
              <col width="133px">
              <col width="183px">
              <col width="183px">
              <col width="233px">
              <col width="233px">
              <col width="162px">
            </colgroup>
            <thead>
              <tr class="date-detail">
                <th scope="col" rowspan="2">날짜</th>
                <th scope="col" rowspan="2">발송 성공 건수</th>
                <th scope="col" rowspan="2">읽음 확인 수</th>
                <th scope="col" colspan="3">고객반응</th>
              </tr>
              <tr class="date-detail">
                <th scope="col">버튼명</th>
                <th scope="col">Action 종류</th>
                <th scope="col">클릭 수</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(item, index) in dateDetailStat">
                <tr :key="index">
                  <td rowspan="2">{{item.date}}</td>
                <td rowspan="2">{{item.sendSuccess.toLocaleString()}}</td>
                <td rowspan="2">{{item.readCheckNum.toLocaleString()}}</td>
                <td>{{item.customerBtn}}</td>
                <td>{{item.customerAction}}</td>
                <td>{{item.customerClick.toLocaleString()}}</td>
                </tr>
                <tr :key="index + 'sub'">
                  <td>{{item.customerBtnTwo}}</td>
                  <td>{{item.customerActionTwo}}</td>
                  <td>{{item.customerClickTwo.toLocaleString()}}</td>
                </tr>
              </template>
              <!-- 기획서 적용(v0.5 0613) / 디자인 미적용 -->
              <tr class="date-detail-result">
                <td rowspan="2">소계</td>
                <td rowspan="2">{{sumSendSuccess.toLocaleString()}}</td>
                <td>{{sumReadCheckNum.toLocaleString()}}</td>
                <td rowspan="2"></td>
                <td rowspan="2"></td>
                <td>{{sumCustomerClick.toLocaleString()}}</td>
              </tr>
              <tr class="date-detail-result">
                <td>(읽음확인율 75.4%)</td>
                <td>(클릭률 95%)</td>
              </tr>
              <!-- // 기획서 적용(v0.5 0613) / 디자인 미적용 -->
            </tbody>
          </table>
        </div>
        <PagingCmp />
        <!-- 기획서 적용(v0.5 0613) / 디자인 미적용 / Case3까지 존재함 (3은 확인필요) -->
        <!-- 추가분석 영역 -->
        <!-- 추가분석 영역 / Case1. D+4 되기 전 -->
        <div class="stat-result add-case">
          <h3>이번 Target 고객군에 대한 추가 분석이 가능합니다.</h3>
          <ul>
            <li>추가분석(Beta)은 SK Telecom데이터 기반으로 제공되며 Group ID에 발송이 1건이고, 고객 중 SKT 발송건이 1천건 이상인 경우 확인이 가능합니다.</li>
            <li>읽음확인 및 버튼 클릭 등 반응을 보인 고객들에 대한 인구통계학적 분석 등 다양한 분석정보가 제공됩니다.</li>
            <li>추가분석 결과는 최종 발송일로부터 4일 이후에 확인이 가능합니다.</li>
          </ul>
        </div>
        <!-- 추가분석 영역 / Case2. D+4 이후 조건을 만족하지 않는 경우 -->
        <div class="stat-result add-case">
          <h3>조건에 맞지 않아 추가 분석이 불가합니다.</h3>
          <h4>고객 중 SKT 발송건이 1천건 미만이거나, 그룹ID에 여러 개의 발송건이 있습니다.</h4>
          <ul>
            <li>추가분석(Beta)은 SK Telecom데이터 기반으로 제공되며 Group ID에 발송이 1건이고, 고객 중 SKT 발송건이 1천건 이상인 경우 확인이 가능합니다.</li>
            <li>읽음확인 및 버튼 클릭 등 반응을 보인 고객들에 대한 인구통계학적 분석 등 다양한 분석정보가 제공됩니다.</li>
            <li>추가분석 결과는 최종 발송일로부터 4일 이후에 확인이 가능합니다.</li>
          </ul>
          <p>※ 예시&#41; 그룹ID에 여러 개 발송건이 있는 경우</p>
          <div class="table__wrap">
            <table class="table table-list">
              <thead>
                <tr>
                  <th scope="col">그룹 ID</th>
                  <th scope="col">발신번호/챗봇 ID</th>
                  <th scope="col">발송 성공 건수</th>
                  <th scope="col">읽음 확인 건수</th>
                  <th scope="col">읽음 확인율</th>
                  <th scope="col">반응수</th>
                  <th scope="col">반응률</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td rowspan="2">9743089AF350B7845589</td>
                  <td>1588-6542</td>
                  <td>923,342,343건</td>
                  <td>456,540,245건</td>
                  <td>76.4%</td>
                  <td>540,245건</td>
                  <td>13.8%</td>
                </tr>
                <tr>
                  <td>6100-6545</td>
                  <td>456,540,245건</td>
                  <td>6,540,245건</td>
                  <td>86.5%</td>
                  <td>40,245건</td>
                  <td>5%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- // 추가분석 영역 -->
        <!-- // 기획서 적용(v0.5 0613) / 디자인 미적용 / Case3까지 존재함 (3은 확인필요) -->
        <div class="button__wrap flex-end">
          <a href="" download class="btn btn-blue">상세 데이터 다운로드</a>
        </div>
        <PageTitleH3 titleh3="고객분석" />
        <p>성별/ 연령별 통계</p>
        <div class="customer-type">
          <div class="two-box">
            <div class="two-box__inner">
              <statList
                v-model="sendBar"
                :chType="sendBar.chType"
                :chart-options="sendBar.sendNumOptions"
                :chart-data="sendBar.customerSendNum"
                :chart-id="sendBar.chartId"
                :dataset-id-key="sendBar.datasetIdKey"
                :width="503"
                :height="272"
                />
            </div>
            <div class="two-box__inner">
              <statList
                v-model="successBar"
                :chType="successBar.chType"
                :chart-options="successBar.sendSuccessOptions"
                :chart-data="successBar.customerSendSuccess"
                :chart-id="successBar.chartId"
                :dataset-id-key="successBar.datasetIdKey"
                :width="503"
                :height="272"
                />
            </div>
          </div>
          <div class="two-box">
            <div class="two-box__inner">
              <statList
                v-model="readBarLine"
                :chType="readBarLine.chType"
                :chart-options="readBarLine.readOptions"
                :chart-data="readBarLine.customerRead"
                :chart-id="readBarLine.chartId"
                :dataset-id-key="readBarLine.datasetIdKey"
                :width="503"
                :height="272"
                />
            </div>
            <div class="two-box__inner">
              <statList
                v-model="btnBarLine"
                :chType="btnBarLine.chType"
                :chart-options="btnBarLine.sendSuccessOptions"
                :chart-data="btnBarLine.customerSendSuccess"
                :chart-id="btnBarLine.chartId"
                :dataset-id-key="btnBarLine.datasetIdKey"
                :width="503"
                :height="272"
                />
            </div>
          </div>
        </div>
        <div class="button__wrap flex-start">
          <router-link
            to="/MsgStatList"
            class="btn btn-line"
          >이전</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import PagingCmp from '@/components/common/PagingCmp.vue'
import AccumulatedResults from '@/views/brand/stat/AccumulatedResults.js'
import customerSendNum from '@/views/brand/stat/customerSendNum.js'
import customerSendSuccess from '@/views/brand/stat/customerSendSuccess.js'
import customerRead from '@/views/brand/stat/customerRead.js'
import StatList from '@/views/brand/stat/components/StatList.vue'

export default {
  components: {
    PageTitle,
    BrandLnb,
    PageTitleH3,
    PagingCmp,
    StatList
  },
  data() {
    return {
      barLine: {
        chType: 'bl-chart',
        chartId: 'bar-line-chart',
        datasetIdKey: 'label',
        chartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                display: false // 세로 그리드 라인 숨김
              }
            },
            y: {
              suggestedMin: 0,
              suggestedMax: 900,
              position: 'left',
              textAlign: 'left',
              title: {
                display: false,
                text: '건수'
              },
              ticks: {
                stepSize: 100
              }
            },
            y1: {
              suggestedMin: 0,
              suggestedMax: 90,
              position: 'right',
              textAlign: 'right',
              title: {
                display: false,
                text: '퍼센트'
              },
              ticks: {
                stepSize: 10,
                callback: function(value) {
                  return value + '%'
                }
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              labels: {
                usePointStyle: true,
                boxWidth: 12,
                position: 'top',
                font: {
                  size: 12
                }
              }
            }
          }
        },
        AccumulatedResults: AccumulatedResults
      },
      sendBar: {
        chType: 'b-chart',
        chartId: 'bar-chart',
        datasetIdKey: 'label',
        sendNumOptions: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                display: false // 세로 그리드 라인 숨김
              }
            },
            y: {
              suggestedMin: 0,
              suggestedMax: 100,
              position: 'left',
              textAlign: 'left',
              title: {
                display: false,
                text: '발송 건수'
              },
              ticks: {
                stepSize: 20,
                callback: function(value) {
                  return value + '만'
                }
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              labels: {
                usePointStyle: true,
                boxWidth: 12,
                position: 'top',
                font: {
                  size: 12
                }
              }
            },
            title: {
              display: true,
              text: '발송 건수',
              position: 'top'
            }
          }
        },
        customerSendNum: customerSendNum
      },
      successBar: {
        chType: 'b-chart',
        chartId: 'bar-chart',
        datasetIdKey: 'label',
        sendSuccessOptions: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                display: false // 세로 그리드 라인 숨김
              }
            },
            y: {
              suggestedMin: 0,
              suggestedMax: 100,
              position: 'left',
              textAlign: 'left',
              title: {
                display: false,
                text: '발송 성공률'
              },
              ticks: {
                stepSize: 20,
                callback: function(value) {
                  return value + '%'
                }
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              labels: {
                usePointStyle: true,
                boxWidth: 12,
                position: 'top',
                font: {
                  size: 12
                }
              }
            },
            title: {
              display: true,
              text: '발송 성공률',
              position: 'top'
            }
          }
        },
        customerSendSuccess: customerSendSuccess
      },
      readBarLine: {
        chType: 'bl-chart',
        chartId: 'bar-line-chart',
        datasetIdKey: 'label',
        readOptions: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              grid: {
                display: false // 세로 그리드 라인 숨김
              }
            },
            y: {
              suggestedMin: 0,
              suggestedMax: 100,
              position: 'left',
              textAlign: 'left',
              title: {
                display: false,
                text: 'RCS 읽음 확인율'
              },
              ticks: {
                stepSize: 20,
                callback: function(value) {
                  return value + '%'
                }
              }
            }
          },
          plugins: {
            legend: {
              display: true,
              labels: {
                usePointStyle: true,
                boxWidth: 12,
                position: 'top',
                font: {
                  size: 12
                }
              }
            },
            title: {
              display: true,
              text: 'RCS 읽음 확인율',
              position: 'top'
            }
          }
        },
        customerRead: customerRead
      },
      btnBarLine: {

      },
      dateDetailStat: [
        {
          date: '2023.03.01',
          sendSuccess: 123342343,
          readCheckNum: 123342343,
          customerBtn: '자세히 보기',
          customerAction: '(카드1) 버튼1 : 전화걸기',
          customerClick: 1351,
          customerBtnTwo: '고객센터 연결하기',
          customerActionTwo: '(카드2) 버튼1 : URL연결',
          customerClickTwo: 2523
        },
        {
          date: '2023.03.01',
          sendSuccess: 123342343,
          readCheckNum: 20152023,
          customerBtn: '자세히 보기',
          customerAction: '(카드1) 버튼1 : 전화걸기',
          customerClick: 2523,
          customerBtnTwo: '고객센터 연결하기',
          customerActionTwo: '(카드2) 버튼1 : URL연결',
          customerClickTwo: 1025
        },
        {
          date: '2023.03.01',
          sendSuccess: 324151121,
          readCheckNum: 24651522,
          customerBtn: '자세히 보기',
          customerAction: '(카드1) 버튼1 : 전화걸기',
          customerClick: 984,
          customerBtnTwo: '고객센터 연결하기',
          customerActionTwo: '(카드2) 버튼1 : URL연결',
          customerClickTwo: 1025
        },
        {
          date: '2023.03.13',
          sendSuccess: 65565212,
          readCheckNum: 561512,
          customerBtn: '고객센터 연결하기',
          customerAction: '(카드1) 버튼1 : 전화걸기',
          customerClick: 51235,
          customerBtnTwo: '고객센터 연결하기',
          customerActionTwo: '(카드2) 버튼1 : URL연결',
          customerClickTwo: 54320
        }
      ]
    }
  },
  computed: {
    sumSendSuccess() {
      return this.dateDetailStat.reduce((sum, item) => sum + parseInt(item.sendSuccess), 0)
    },
    sumReadCheckNum() {
      return this.dateDetailStat.reduce((sum, item) => sum + parseInt(item.readCheckNum), 0)
    },
    sumCustomerClick() {
      return this.dateDetailStat.reduce((sum, item) => sum + parseInt(item.customerClick), 0)
    }
  }
}
</script>
