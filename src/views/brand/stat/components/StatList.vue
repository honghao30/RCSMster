<template>
  <div>
    <!-- 막대 + 라인 그래프 -->
      <bar-line-chart
        v-if="chType === 'bl-chart'"
        :chart-options="chartOptions"
        :chart-data="AccumulatedResults"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :width="1063"
        :height="391"
      />
    <!-- // 막대 + 라인 그래프 -->
    <!-- 막대 -->
      <Bar
        v-if="chType === 'b-chart'"
        :chart-options="sendNumOptions"
        :chart-data="customerSendNum"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :width="503"
        :height="272"
      />
    <!-- // 막대 -->
    <!-- 라인 -->
      <Bar
        v-if="chType === 'l-chart'"
        :chart-options="sendNumOptions"
        :chart-data="customerSendNum"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :width="503"
        :height="272"
      />
    <!-- // 라인 -->
  </div>
</template>
<script>
import { Bar, Line } from 'vue-chartjs/legacy'
import AccumulatedResults from '@/views/brand/stat/AccumulatedResults.js'
import customerSendNum from '@/views/brand/stat/customerSendNum.js'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement)

export default {
  components: {
    BarLineChart: {
      extends: Bar,
      mixins: [Line],
      props: ['chartData', 'options', 'width', 'height'],
      mounted() {
        this.renderChart(
          this.chartData,
          this.options,
          this.width,
          this.height
        )
      }
    },
    Bar
  },
  props: {
    chType: {
      type: String,
      required: true
    },
    chartId: {
      type: String,
      default: 'chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    }
  },
  data() {
    return {
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
      AccumulatedResults: AccumulatedResults,
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
    }
  }
}
</script>
