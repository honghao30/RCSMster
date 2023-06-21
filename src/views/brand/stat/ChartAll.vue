<template>
  <div class="chart-container">
      <div class="type_one">
        <ve-line :data="chartData"></ve-line>
      </div>
      <div class="type_two">
        <Ve-Bar :data="chartData2"></Ve-Bar>
      </div>
      <div class="type_two">
        <Ve-Histogram :data="chartData3"></Ve-Histogram>
      </div>
      <div class="type_two">
        <Ve-Pie :data="chartData3"></Ve-Pie>
      </div>
      <br>
      chart js
      <br>
      <div class="type_two">
        <Bar
          :chart-options="chartOptions"
          :chart-data="chartDataNew"
          :chart-id="chartId"
          :dataset-id-key="datasetIdKey"
        />
      </div>
  </div>
</template>

<script lang="ts">
import VeLine from 'v-charts/lib/line.common'
import VeBar from 'v-charts/lib/bar.common'
import VeHistogram from 'v-charts/lib/histogram.common'
import VePie from 'v-charts/lib/pie.common'
import { Bar } from 'vue-chartjs/legacy'

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
  components: { VeLine, VeBar, VeHistogram, VePie, Bar },
  props: {
    data: {
      type: Object
    },
    chartId: {
      type: String,
      default: 'bar-chart'
    },
    datasetIdKey: {
      type: String,
      default: 'label'
    },
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 400
    },
    cssClasses: {
      default: '',
      type: String
    },
    styles: {
      type: Object,
      default: () => {}
    },
    plugins: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      chartDataNew: {
        labels: [
          '1월',
          '2월',
          '3월',
          '4월',
          '5월',
          '6월',
          '7월',
          '8월',
          '9월',
          '10월',
          '11월',
          '12월'
        ],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#f87979',
            data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      },
      chartData: {
        columns: ['date', 'PV', 'Order', 'OrderRate'],
        rows: [
          { 'date': '1/1', 'PV': 1393, 'Order': 1093, 'OrderRate': 0.32 },
          { 'date': '1/2', 'PV': 3530, 'Order': 3230, 'OrderRate': 0.26 },
          { 'date': '1/3', 'PV': 2923, 'Order': 2623, 'OrderRate': 0.76 },
          { 'date': '1/4', 'PV': 1723, 'Order': 1423, 'OrderRate': 0.49 },
          { 'date': '1/5', 'PV': 3792, 'Order': 3492, 'OrderRate': 0.323 },
          { 'date': '1/6', 'PV': 4593, 'Order': 4293, 'OrderRate': 0.78 }
        ]
      },
      chartData2: {
        columns: ['date', 'PV', 'Order', 'OrderRate'],
        rows: [
          { 'date': '1/1', 'PV': 1393, 'Order': 1093, 'OrderRate': 0.32 },
          { 'date': '1/2', 'PV': 3530, 'Order': 3230, 'OrderRate': 0.26 },
          { 'date': '1/3', 'PV': 2923, 'Order': 2623, 'OrderRate': 0.76 },
          { 'date': '1/4', 'PV': 1723, 'Order': 1423, 'OrderRate': 0.49 },
          { 'date': '1/5', 'PV': 3792, 'Order': 3492, 'OrderRate': 0.323 },
          { 'date': '1/6', 'PV': 4593, 'Order': 4293, 'OrderRate': 0.78 }
        ]
      },
      chartData3: {
        columns: ['date', 'PV', 'Order'],
        rows: [
          { 'date': '1', 'PV': 1393, 'Order': 1000 },
          { 'date': '2', 'PV': 2000, 'Order': 1000 },
          { 'date': '3', 'PV': 3000, 'Order': 1000 },
          { 'date': '4', 'PV': 100, 'Order': 1000 },
          { 'date': '5', 'PV': 5000, 'Order': 1000 },
          { 'date': '6', 'PV': 600, 'Order': 1000 },
          { 'date': '7', 'PV': 1100, 'Order': 1000 }
        ]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chart-container {
  width: 100%;
  max-width: 1260px;
  margin: 0 auto;
  padding: 100px 0;
  display: flex;
  flex-direction: column;
  gap: 50px
}
</style>
