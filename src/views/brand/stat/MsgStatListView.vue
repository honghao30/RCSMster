<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap stat__wrap">
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
            v-model="resultBarLine"
            :chType="resultBarLine.chType"
            :chart-options="resultBarLine.ChartOptions"
            :chart-data="resultBarLine.ChartData"
            :chart-id="resultBarLine.chartId"
            :dataset-id-key="resultBarLine.datasetIdKey"
            :width="1063"
            :height="391"
          />
        </div>
        <ul class="stat-result">
          <li>총 발송 성공 건수<span class="stat-result-num">{{sumSendSuccess.toLocaleString()}}</span></li>
          <li>총 읽음 확인율<span class="stat-result-num">{{readCheckRate}}%</span></li>
          <li>총 클릭률<span class="stat-result-num">{{customerClickRate}}%</span></li>
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
                  <td :rowspan="dateDetailRowspan(item)">{{item.date}}</td>
                  <td :rowspan="dateDetailRowspan(item)">{{item.sendSuccess.toLocaleString()}}</td>
                  <td :rowspan="dateDetailRowspan(item)">{{item.readCheckNum.toLocaleString()}}</td>
                  <td>{{item.customerBtn}}</td>
                  <td>{{item.customerAction}}</td>
                  <td>{{item.customerClick.toLocaleString()}}</td>
                </tr>
                <template v-if="item.addItems && item.addItems.length > 0">
                  <tr v-for="(addItem, addIndex) in item.addItems" :key="addIndex">
                  <td>{{addItem.customerBtn}}</td>
                  <td>{{addItem.customerAction}}</td>
                  <td>{{addItem.customerClick.toLocaleString()}}</td>
                </tr>
                </template>
              </template>
              <!-- 기획서 적용(v0.5) / 디자인 미적용 -->
              <tr class="date-detail-result">
                <td rowspan="2">소계</td>
                <td rowspan="2">{{sumSendSuccess.toLocaleString()}}</td>
                <td>{{sumReadCheckNum.toLocaleString()}}</td>
                <td rowspan="2"></td>
                <td rowspan="2"></td>
                <td>{{sumCustomerClick.toLocaleString()}}</td>
              </tr>
              <tr class="date-detail-result">
                <td>(읽음확인율 {{readCheckRate}}%)</td>
                <td>(클릭률 {{customerClickRate}}%)</td>
              </tr>
              <!-- // 기획서 적용(v0.5) / 디자인 미적용 -->
            </tbody>
          </table>
        </div>
        <PagingCmp />
        <!-- 기획서 적용(v0.5) / 디자인 미적용 / Case3까지 존재함 -->
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
        <!-- // 기획서 적용(v0.5) / 디자인 미적용 / Case3까지 존재함  -->
        <div class="button__wrap flex-end data-btn">
          <!-- 상세 데이터 다운로드 : 검색결과 없을 경우 disabled 클래스 추가 -->
          <a href="" download class="btn btn-blue">상세 데이터 다운로드</a>
        </div>
        <PageTitleH3 titleh3="고객분석" />
        <div class="analysis">
          <h5>성별/ 연령별 통계</h5>
          <div class="customer-type">
            <div class="two-box">
              <div class="two-box__inner">
                <statList
                  v-model="sendBar"
                  :chType="sendBar.chType"
                  :chart-options="sendBar.ChartOptions"
                  :chart-data="sendBar.ChartData"
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
                  :chart-options="successBar.ChartOptions"
                  :chart-data="successBar.ChartData"
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
                  :chart-options="readBarLine.ChartOptions"
                  :chart-data="readBarLine.ChartData"
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
                  :chart-options="btnBarLine.ChartOptions"
                  :chart-data="btnBarLine.ChartData"
                  :chart-id="btnBarLine.chartId"
                  :dataset-id-key="btnBarLine.datasetIdKey"
                  :width="503"
                  :height="272"
                  />
              </div>
            </div>
          </div>
        </div>
        <div class="analysis">
          <h5>지역별 통계</h5>
          <div class="customer-type">
            <div class="two-box">
              <div class="two-box__inner">
                <img src="@/assets/images/dummy/stat_map_01.png" alt="">
              </div>
              <div class="two-box__inner">
                <img src="@/assets/images/dummy/stat_map_02.png" alt="">
              </div>
            </div>
          </div>
        </div>
        <div class="analysis">
          <h5>발송고객 / 클릭고객 분석</h5>
          <p>이번 발송대상 고객과 반응한 고객의 특성을 알 수 있습니다.</p>
          <div class="customer-type">
            <div class="two-box">
              <div class="two-box__inner">
                <statList
                  v-model="sendCustomerDh"
                  :chType="sendCustomerDh.chType"
                  :chart-options="sendCustomerDh.ChartOptions"
                  :chart-data="sendCustomerDh.ChartData"
                  :chart-id="sendCustomerDh.chartId"
                  :dataset-id-key="sendCustomerDh.datasetIdKey"
                  :width="503"
                  :height="454"
                  />
              </div>
              <div class="two-box__inner">
                <statList
                  v-model="clickCustomerDh"
                  :chType="clickCustomerDh.chType"
                  :chart-options="clickCustomerDh.ChartOptions"
                  :chart-data="clickCustomerDh.ChartData"
                  :chart-id="clickCustomerDh.chartId"
                  :dataset-id-key="clickCustomerDh.datasetIdKey"
                  :width="503"
                  :height="454"
                  />
              </div>
            </div>
          </div>
        </div>
        <div class="analysis">
          <h5>산업 전반 대비</h5>
          <p>이번 캠페인을 최근 1개월 간 12개 산업의 평균치와 비교해 볼 수 있습니다.</p>
          <div class="customer-type">
            <div class="one-box">
              <div class="one-box__inner">
                <statList
                  v-model="readCheckIndustryBar"
                  :chType="readCheckIndustryBar.chType"
                  :chart-options="readCheckIndustryBar.ChartOptions"
                  :chart-data="readCheckIndustryBar.ChartData"
                  :chart-id="readCheckIndustryBar.chartId"
                  :dataset-id-key="readCheckIndustryBar.datasetIdKey"
                  :width="1067"
                  :height="308"
                  />
              </div>
              <div class="one-box__inner">
                <statList
                  v-model="clickIndustryBar"
                  :chType="clickIndustryBar.chType"
                  :chart-options="clickIndustryBar.ChartOptions"
                  :chart-data="clickIndustryBar.ChartData"
                  :chart-id="clickIndustryBar.chartId"
                  :dataset-id-key="clickIndustryBar.datasetIdKey"
                  :width="1067"
                  :height="308"
                  />
              </div>
            </div>
          </div>
        </div>
        <div class="button__wrap flex-end data-btn">
          <!-- 상세 데이터 다운로드 : 검색결과 없을 경우 disabled 클래스 추가 -->
          <a href="" download class="btn btn-blue disabled">상세 데이터 다운로드</a>
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
import StatList from '@/views/brand/stat/components/StatList.vue'
import AccumulatedResults from '@/views/brand/stat/AccumulatedResults.js'
import customerSendNum from '@/views/brand/stat/customerSendNum.js'
import customerSendSuccess from '@/views/brand/stat/customerSendSuccess.js'
import customerRead from '@/views/brand/stat/customerRead.js'
import customerBtn from '@/views/brand/stat/customerBtn.js'
import sendCustomer from '@/views/brand/stat/sendCustomer.js'
import clickCustomer from '@/views/brand/stat/clickCustomer.js'
import readCheckIndustry from '@/views/brand/stat/readCheckIndustry.js'
import clickIndustry from '@/views/brand/stat/clickIndustry.js'

export default {
  components: {
    PageTitle,
    BrandLnb,
    PageTitleH3,
    PagingCmp,
    StatList
  },
  props: {
  },
  data() {
    return {
      resultBarLine: {
        chType: 'b-chart',
        chartId: 'bar-stacked-chart',
        datasetIdKey: 'label',
        ChartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
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
              suggestedMin: 0,
              suggestedMax: 700,
              position: 'left',
              textAlign: 'left',
              title: {
                display: false,
                text: '건수'
              },
              ticks: {
                color: '#000',
                font: {
                  size: 12
                },
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
                color: '#000',
                font: {
                  size: 12
                },
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
        ChartData: AccumulatedResults
      },
      sendBar: {
        chType: 'b-chart',
        chartId: 'bar-chart1',
        datasetIdKey: 'label',
        ChartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
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
              suggestedMin: 0,
              suggestedMax: 100,
              position: 'left',
              textAlign: 'left',
              title: {
                display: false,
                text: '발송 건수'
              },
              ticks: {
                color: '#999',
                font: {
                  size: 12
                },
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
              position: 'top',
              labels: {
                usePointStyle: true,
                boxWidth: 12,
                font: {
                  size: 12
                }
              }
            },
            title: {
              display: true,
              text: '발송 건수',
              position: 'top',
              font: {
                size: 16
              },
              color: '#000'
            }
          }
        },
        ChartData: customerSendNum
      },
      successBar: {
        chType: 'b-chart',
        chartId: 'bar-chart2',
        datasetIdKey: 'label',
        ChartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
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
              suggestedMin: 0,
              suggestedMax: 100,
              position: 'left',
              textAlign: 'left',
              title: {
                display: false,
                text: '발송 성공률'
              },
              ticks: {
                color: '#999',
                font: {
                  size: 12
                },
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
              position: 'top',
              labels: {
                usePointStyle: true,
                boxWidth: 12,
                font: {
                  size: 12
                }
              }
            },
            title: {
              display: true,
              text: '발송 성공률',
              position: 'top',
              font: {
                size: 16
              },
              color: '#000'
            }
          }
        },
        ChartData: customerSendSuccess
      },
      readBarLine: {
        chType: 'bl-chart',
        chartId: 'bar-line-chart2',
        datasetIdKey: 'label',
        ChartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
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
              suggestedMin: 0,
              suggestedMax: 100,
              position: 'left',
              textAlign: 'left',
              title: {
                display: false,
                text: 'RCS 읽음 확인율'
              },
              ticks: {
                color: '#999',
                font: {
                  size: 12
                },
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
              position: 'top',
              labels: {
                usePointStyle: true,
                boxWidth: 12,
                font: {
                  size: 12
                }
              }
            },
            title: {
              display: true,
              text: 'RCS 읽음 확인율',
              position: 'top',
              font: {
                size: 16
              },
              color: '#000'
            }
          }
        },
        ChartData: customerRead
      },
      btnBarLine: {
        chType: 'bl-chart',
        chartId: 'bar-line-chart3',
        datasetIdKey: 'label',
        ChartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
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
              suggestedMin: 0,
              suggestedMax: 100,
              position: 'left',
              textAlign: 'left',
              title: {
                display: false,
                text: 'RCS 버튼 반응률'
              },
              ticks: {
                color: '#999',
                font: {
                  size: 12
                },
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
              position: 'top',
              labels: {
                usePointStyle: true,
                boxWidth: 12,
                font: {
                  size: 12
                }
              }
            },
            title: {
              display: true,
              text: 'RCS 버튼 반응률',
              position: 'top',
              font: {
                size: 16
              },
              color: '#000'
            }
          }
        },
        ChartData: customerBtn
      },
      sendCustomerDh: {
        chType: 'dh-chart',
        chartId: 'doughnut-chart',
        datasetIdKey: 'label',
        ChartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                usePointStyle: true,
                boxWidth: 12,
                pointStyle: 'circle',
                font: {
                  size: 12
                }
              }
            },
            title: {
              display: true,
              text: '발송고객 SEG TOP 5',
              position: 'top',
              font: {
                size: 16
              },
              color: '#000'
            },
            elements: {
              arc: {
                borderWidth: 1
              }
            }
          }
        },
        ChartData: sendCustomer
      },
      clickCustomerDh: {
        chType: 'dh-chart',
        chartId: 'doughnut-chart2',
        datasetIdKey: 'label',
        ChartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
              labels: {
                usePointStyle: true,
                boxWidth: 12,
                pointStyle: 'circle',
                font: {
                  size: 12
                }
              }
            },
            title: {
              display: true,
              text: '클릭고객 SEG TOP 5',
              position: 'top',
              font: {
                size: 16
              },
              color: '#000'
            },
            elements: {
              arc: {
                borderWidth: 1
              }
            }
          }
        },
        ChartData: clickCustomer
      },
      readCheckIndustryBar: {
        chType: 'b-chart',
        chartId: 'bar-chart3',
        datasetIdKey: 'label',
        ChartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
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
              suggestedMin: 0,
              suggestedMax: 100,
              position: 'left',
              textAlign: 'left',
              title: {
                display: false,
                text: '읽음 확인율'
              },
              ticks: {
                color: '#999',
                font: {
                  size: 12
                },
                stepSize: 50,
                callback: function(value) {
                  return value + '%'
                }
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: true,
              text: '읽음 확인율',
              position: 'top',
              font: {
                size: 16
              },
              color: '#000'
            }
          }
        },
        ChartData: readCheckIndustry
      },
      clickIndustryBar: {
        chType: 'b-chart',
        chartId: 'bar-chart4',
        datasetIdKey: 'label',
        ChartOptions: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
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
              suggestedMin: 0,
              suggestedMax: 5,
              position: 'left',
              textAlign: 'left',
              title: {
                display: false,
                text: '클릭률'
              },
              ticks: {
                color: '#999',
                font: {
                  size: 12
                },
                stepSize: 1,
                callback: function(value) {
                  return value + '%'
                }
              }
            }
          },
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: true,
              text: '클릭률',
              position: 'top',
              font: {
                size: 16
              },
              color: '#000'
            }
          }
        },
        ChartData: clickIndustry
      },
      dateDetailStat: [
        {
          date: '2023.03.01',
          sendSuccess: 123342343,
          readCheckNum: 123342343,
          customerBtn: '자세히 보기',
          customerAction: '(카드1) 버튼1 : 전화걸기',
          customerClick: 65000,
          addItems: [
            {
              customerBtn: '고객센터 연결하기',
              customerAction: '(카드2) 버튼1 : URL연결',
              customerClick: 54320
            }
          ]
        },
        {
          date: '2023.03.01',
          sendSuccess: 123342343,
          readCheckNum: 20152023,
          customerBtn: '자세히 보기',
          customerAction: '(카드1) 버튼1 : 전화걸기',
          customerClick: 65000,
          addItems: [
            {
              customerBtn: '고객센터 연결하기',
              customerAction: '(카드2) 버튼1 : URL연결',
              customerClick: 54320
            }
          ]
        },
        {
          date: '2023.03.01',
          sendSuccess: 324151121,
          readCheckNum: 24651522,
          customerBtn: '자세히 보기',
          customerAction: '(카드1) 버튼1 : 전화걸기',
          customerClick: 65000,
          addItems: [
            {
              customerBtn: '고객센터 연결하기',
              customerAction: '(카드2) 버튼1 : URL연결',
              customerClick: 54320
            }
          ]
        },
        {
          date: '2023.03.13',
          sendSuccess: 65565212,
          readCheckNum: 561512,
          customerBtn: '고객센터 연결하기',
          customerAction: '(카드1) 버튼1 : 전화걸기',
          customerClick: 65000,
          addItems: [
            {
              customerBtn: '고객센터 연결하기',
              customerAction: '(카드2) 버튼1 : URL연결',
              customerClick: 54320
            }
          ]
        }
      ]
    }
  },
  methods: {
    dateDetailRowspan(item) {
      return item.addItems ? item.addItems.length + 1 : 1
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
      let cc = this.dateDetailStat.reduce((sum, item) => sum + parseInt(item.customerClick), 0)
      let ccAdd = this.dateDetailStat.reduce((sum, item) => {
        if (item.addItems && item.addItems.length > 0) {
          return sum + item.addItems.reduce((addSum, addItem) => addSum + parseInt(addItem.customerClick), 0)
        }
        return sum
      }, 0)
      console.log(`cc는`, cc)
      console.log(`ccAdd는`, ccAdd)
      return cc + ccAdd
    },
    // 읽음 확인율 (소수점 첫번째 자리 절사, 반올림 확인필요 )
    readCheckRate () {
      let rcr = (this.sumReadCheckNum / this.sumSendSuccess) * 100
      return rcr.toFixed(1)
    },
    // 클릭률 (소수점 첫번째 자리 절사, 반올림 확인필요 )
    customerClickRate () {
      let ccr = (this.sumCustomerClick / this.sumSendSuccess) * 100
      return ccr.toFixed(1)
    }
  }
}
</script>
