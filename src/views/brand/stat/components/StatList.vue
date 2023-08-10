<template>
  <div>
    <!-- 막대 + 라인 그래프 -->
      <bar-line-chart
        v-if="chType === 'bl-chart'"
        :chart-options="ChartOptions"
        :chart-data="ChartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :width="width"
        :height="height"
        :plugins="plugins"
      />
    <!-- // 막대 + 라인 그래프 -->
    <!-- 막대 -->
    <bar-chart
      v-if="chType === 'b-chart'"
      :chart-options="ChartOptions"
      :chart-data="ChartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :width="width"
      :height="height"
      :plugins="plugins"
    />
    <!-- // 막대 -->
    <!-- 도넛 -->
    <doughnut-chart
      v-if="chType === 'dh-chart'"
      :chart-options="ChartOptions"
      :chart-data="ChartData"
      :chart-id="chartId"
      :dataset-id-key="datasetIdKey"
      :width="width"
      :height="height"
      :plugins="plugins"
    />
    <!-- // 도넛 -->
  </div>
</template>
<script>
import { Bar, Line, Doughnut } from 'vue-chartjs/legacy'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
  ArcElement
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, ArcElement)

export default {
  components: {
    BarLineChart: {
      extends: Bar,
      mixins: [Line],
      props: ['chartData', 'chartOptions', 'width', 'height'],
      mounted() {
        this.renderChart(
          this.chartData,
          this.chartOptions,
          this.width,
          this.height
        )
      }
    },
    BarChart: {
      extends: Bar,
      props: ['chartData', 'chartOptions', 'width', 'height'],
      mounted() {
        this.renderChart(
          this.chartData,
          this.chartOptions,
          this.width,
          this.height
        )
      }
    },
    DoughnutChart: {
      extends: Doughnut,
      props: ['chartData', 'chartOptions', 'width', 'height'],
      mounted() {
        this.renderChart(
          this.chartData,
          this.chartOptions,
          this.width,
          this.height
        )
      }
    }
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
    },
    ChartOptions: {
      type: Object
    },
    ChartData: {
      type: Object
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    }
  }
}
</script>
