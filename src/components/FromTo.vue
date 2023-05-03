<template>
  <div v-if="from === 'statMessage'" class="cont_bundle">
    <div class="cont_flex_bundle date_checkbox">
      <span class="custom_input icon_right" style="width: 185px;">
        <div class="date_picker">
          <el-date-picker v-model="searchParam.bgn" type="date" placeholder="시작일" format="yyyy-MM-dd" value-format="yyyyMMdd" @change="changeDate('start')" :picker-options="datePickerStDtOptions" popper-class="arrowmover"/>
        </div>
      </span>
      <span class="bar">-</span>
      <span class="custom_input icon_right" style="width: 185px;">
        <div class="date_picker">
          <el-date-picker ref="endCal" v-model="searchParam.end" type="date" placeholder="종료일" format="yyyy-MM-dd" value-format="yyyyMMdd" @change="changeDate('end')" :picker-options="datePickerEdDtOptions" popper-class="arrowmover"/>
        </div>
      </span>
      <span v-if="descr" class="custom_checkbox nowrap" style="width: 460px; margin-top:-4px; line-height:150%">{{ descr }}</span>
    </div>
  </div>
  <div v-else class="cont_bundle">
    <div class="cont_flex_bundle date_checkbox">
      <span class="custom_input icon_right" style="width: 185px;">
        <div class="date_picker">
          <el-date-picker v-model="searchParam.bgn" type="date" placeholder="시작일" format="yyyy-MM-dd" value-format="yyyyMMdd" @change="changeDate('start')" :picker-options="datePickerStDtOptions" popper-class="arrowmover"/>
        </div>
      </span>
      <span class="bar">-</span>
      <span class="custom_input icon_right" style="width: 185px;">
        <div class="date_picker">
          <el-date-picker ref="endCal" v-model="searchParam.end" type="date" placeholder="종료일" format="yyyy-MM-dd" value-format="yyyyMMdd" @change="changeDate('end')" :picker-options="datePickerEdDtOptions" popper-class="arrowmover"/>
        </div>
      </span>
      <span v-if="descr" class="custom_checkbox nowrap" style="width: 460px;">{{ descr }}</span>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    from: { type: String, default: '' },
    descr: { type: String },
    searchParam: {
      type: Object,
      default: () => {
        return {
          bgn: moment().add(-6, 'days').format('YYYYMMDD'), // 시작일
          end: moment().format('YYYYMMDD') // 종료일
        }
      }
    },
    periodCondition: {
      type: Object,
      default: () => {
        return {
          disablePastDays: null, // 특정 시점 이전 선택 불가
          temp: 'day',
          type: 'day', // 일타입('day'), 월타입('month')
          srchYmdSt: moment().add(-6, 'days').format('YYYYMMDD'), // 기본으로 지정할 시작일
          srchYmdEd: moment().format('YYYYMMDD'), // 기본으로 지정할 종료일
          srchYmSt: moment().add(-2, 'months').format('YYYYMM'), // 기본으로 지정할 시작월
          srchYmEd: moment().format('YYYYMM') // 기본으로 지정할 종료월
        }
      }
    }
  },
  data() {
    return {
      type: 'day',
      datePickerStDtOptions: {
        disabledDate: this.disabledStDate
      },
      datePickerEdDtOptions: {
        disabledDate: this.disabledEdDate
      },
      today: moment().format('YYYYMMDD'),
      thisMonth: moment().format('YYYYMM')
    }
  },
  methods: {
    changeDate(day) {
      if (day === 'start') {
        if (this.type === 'day') this.periodCondition.srchYmdSt = this.searchParam.bgn
        else this.periodCondition.srchYmSt = this.searchParam.bgn
        this.$refs.endCal.focus()
      } else {
        if (this.type === 'day') this.periodCondition.srchYmdEd = this.searchParam.end
        else this.periodCondition.srchYmEd = this.searchParam.end
      }
      this.setMaxPeriodDate()
    },
    changeType(type) {
      this.periodCondition.temp = type
      if (type === 'day') {
        this.searchParam.bgn = this.periodCondition.srchYmdSt
        this.searchParam.end = this.periodCondition.srchYmdEd
      } else {
        this.searchParam.bgn = this.periodCondition.srchYmSt
        this.searchParam.end = this.periodCondition.srchYmEd
      }
    },
    disabledStDate(date) {
      // date: disable 될 날짜 (선택날짜 아님)
      if (this.type === 'day') {
        date = moment(String(date)).format('YYYYMMDD')
        return date > this.today || date < this.periodCondition.disablePastDays
      } else {
        date = moment(String(date)).format('YYYYMM')
        return date > this.thisMonth
      }
    },
    disabledEdDate(date) {
      // date: disable 될 날짜 (선택날짜 아님)
      if (this.type === 'day') {
        date = moment(String(date)).format('YYYYMMDD')
        return date > this.getMaxPeriodDate() || date < this.searchParam.bgn
      } else {
        date = moment(String(date)).format('YYYYMM')
        return date > this.getMaxPeriodDate() || date < this.searchParam.bgn
      }
    },
    getMaxPeriodDate() {
      if (this.type === 'day') {
        const maxPeriodDate = moment(String(this.searchParam.bgn)).add(1, 'months').add(-1, 'days').format('YYYYMMDD')
        return this.today > maxPeriodDate ? maxPeriodDate : this.today
      } else {
        const maxPeriodDate = moment(String(this.searchParam.bgn + '01')).add(1, 'months').format('YYYYMM')
        return this.thisMonth > maxPeriodDate ? maxPeriodDate : this.thisMonth
      }
    },
    setMaxPeriodDate() {
      // 최대 일자 초과 시 날짜 설정
      const maxPeriodDate = this.getMaxPeriodDate()
      if (this.type === 'day') {
        if (moment(String(this.searchParam.end)).format('YYYYMMDD') > maxPeriodDate) {
          // 시작 날짜가 최대 선택 가능 날짜 보다 큰 경우
          this.periodCondition.srchYmdEd = maxPeriodDate
          this.searchParam.end = maxPeriodDate
        } else if (moment(String(this.searchParam.bgn)).format('YYYYMMDD') > moment(String(this.searchParam.end)).format('YYYYMMDD')) {
          // 시작 날짜가 종료 날짜보다 큰 경우
          this.periodCondition.srchYmdEd = this.periodCondition.srchYmdSt
          this.searchParam.end = this.periodCondition.srchYmdSt
        }
      } else {
        if (moment(String(this.searchParam.end)).format('YYYYMM') > maxPeriodDate) {
          // 시작 월이 최대 선택 가능 월 보다 큰 경우
          this.periodCondition.srchYmEd = maxPeriodDate
          this.searchParam.end = maxPeriodDate
        } else if (moment(String(this.searchParam.bgn)).format('YYYYMM') > moment(String(this.searchParam.end)).format('YYYYMM')) {
          // 시작 월이 종료 월 보다 큰 경우
          this.periodCondition.srchYmEd = this.periodCondition.srchYmSt
          this.searchParam.end = this.periodCondition.srchYmSt
        }
      }
    }
  }
}
</script>
