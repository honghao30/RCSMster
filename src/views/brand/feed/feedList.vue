<template>
   <!-- 피드 리스트 -->
   <div class="feed-list">
    <div class="feed-list__filter">
      <div class="filter-row">
        <span class="filter-row__title">상태</span>
        <ul class="scope-list">
          <li v-for="(option, l) in statusOption" :key="l"
          @click="getfilterOption(option, filterOption.status)"
          :class="{'active': option.isSelected}"
          >{{ option.label }}</li>
        </ul>
      </div>
      <div class="filter-row">
        <span class="filter-row__title">유형</span>
        <ul class="scope-list">
          <li v-for="(option, l) in typeOption" :key="l"
          @click="getfilterOption(option, filterOption.type)"
          :class="{'active': option.isSelected}"
          >{{ option.label }}</li>
        </ul>
      </div>
      <div class="filter-row ctrl">
        <div class="date-range">
          <el-date-picker
            v-model="filterOption.dateRange"
            type="daterange"
            range-separator="~"
            format="yyyy.MM.dd"
            value-format="yyyyMMdd"
            ref="datePicker"
          />
          <Dropdown :options="rangeOption" v-model="selDateRange" @change="changeRange"/>
        </div>
        <div class="dropdown-search__wrap">
          <Dropdown :options=serchCategoryOption v-model="filterOption.searchCategory" placeholder="선택" />
          <div class="search-area">
            <span class="input search-box">
              <input type="text" placeholder="검색어를 입력하세요."/>
              <ButtonCmp
                type="btn-only-icon"
                iconname='icon-search'
              >
              </ButtonCmp>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="feed-view__list">
      <p class="feed-view__total">총 <strong>27</strong>건</p>
      <feedViewItem v-for="( feed, m ) in feedViewData" :feedData="feed" :key="m"/>
    </div>
  </div>
<!-- // 피드 리스트 -->
</template>

<script>
import feedViewItem from '@/views/brand/feed/components/feedViewItem.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
export default {
  components: {
    feedViewItem,
    Dropdown,
    ButtonCmp
  },
  props: {
    feedViewData: {
      type: Array
    }
  },
  data() {
    return {
      selDateRange: '',
      filterOption: {
        dateRange: [],
        status: [],
        type: [],
        searchCategory: '',
        searchWord: ''
      },
      statusOption: [
        {
          label: '게시',
          value: 'publish',
          isSelected: false
        },
        {
          label: '예약',
          value: 'reservation',
          isSelected: false
        },
        {
          label: '숨김(URL)',
          value: 'internet',
          isSelected: false
        },
        {
          label: '임시저장',
          value: 'temporarySave',
          isSelected: false
        },
        {
          label: '미노출',
          value: 'hidden',
          isSelected: false
        },
        {
          label: '고정소식',
          value: 'fix',
          isSelected: false
        },
        {
          label: '내가 등록한 소식',
          value: 'myNews',
          isSelected: false
        }
      ],
      typeOption: [
        {
          label: '갤러리',
          value: 'gallery',
          isSelected: false
        },
        {
          label: '쉐어링',
          value: 'sharing',
          isSelected: false
        },
        {
          label: '슬라이드',
          value: 'slideView',
          isSelected: false
        }
      ],
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
        },
        {
          label: '3개월',
          value: '3m'
        }
      ],
      serchCategoryOption: [{
        label: '소식제목',
        value: 'feedTitle'
      },
      {
        label: '소식 ID',
        value: 'feedId'
      }]
    }
  },
  created() {
    let today = new Date()
    let year = today.getFullYear()
    let month = ('0' + (today.getMonth() + 1)).slice(-2)
    let day = ('0' + today.getDate()).slice(-2)
    let dateString = year + month + day
    this.filterOption.dateRange = [ dateString, dateString ]
  },
  methods: {
    // 필터 활성화
    getfilterOption(option, targetKey) {
      if (!option.isSelected) {
        targetKey.push(option.value)
        option.isSelected = true
      } else {
        let i = 0
        while (i < targetKey.length) {
          if (targetKey[i] === option.value) {
            targetKey.splice(i, 1)
          } else {
            i++
          }
        }
        option.isSelected = false
      }
    },
    changeRange() {
      let today = new Date()
      let year = today.getFullYear()
      let month = ('0' + (today.getMonth() + 1)).slice(-2)
      let day = ('0' + today.getDate()).slice(-2)
      let dateString = year + month + day
      this.filterOption.dateRange[1] = dateString
      if (this.selDateRange === 'today') {
        this.filterOption.dateRange[0] = dateString
        this.$refs.datePicker.value = [dateString, dateString]
      } else if (this.selDateRange === '1w') {
        let changeDate = today.getTime() - (7 * 24 * 60 * 60 * 1000)
        today.setTime(changeDate)
        let changeYear = today.getFullYear()
        let changeMonth = ('0' + (today.getMonth() + 1)).slice(-2)
        let changeday = ('0' + today.getDate()).slice(-2)
        let changeDateString = changeYear + changeMonth + changeday
        this.filterOption.dateRange[0] = changeDateString
        this.$refs.datePicker.value = [changeDateString, dateString]
      } else if (this.selDateRange === '1m') {
        let changeDate = today.getTime() - (30 * 24 * 60 * 60 * 1000)
        today.setTime(changeDate)
        let changeYear = today.getFullYear()
        let changeMonth = ('0' + (today.getMonth() + 1)).slice(-2)
        let changeday = ('0' + today.getDate()).slice(-2)
        let changeDateString = changeYear + changeMonth + changeday
        this.filterOption.dateRange[0] = changeDateString
        this.$refs.datePicker.value = [changeDateString, dateString]
      } else if (this.selDateRange === '3m') {
        let changeDate = today.getTime() - (90 * 24 * 60 * 60 * 1000)
        today.setTime(changeDate)
        let changeYear = today.getFullYear()
        let changeMonth = ('0' + (today.getMonth() + 1)).slice(-2)
        let changeday = ('0' + today.getDate()).slice(-2)
        let changeDateString = changeYear + changeMonth + changeday
        this.filterOption.dateRange[0] = changeDateString
        this.$refs.datePicker.value = [changeDateString, dateString]
      }
    },
    changeCal() {
      this.selDateRange = ''
    }
  }
}
</script>

<style>

</style>
