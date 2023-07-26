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
          >{{ option.codeNm }}</li>
          <li :class="{'active': filterOption.myNews}" @click='updateMyNews(filterOption.myNews)'>내가 등록한 소식</li>
        </ul>
      </div>
      <div class="filter-row">
        <span class="filter-row__title">유형</span>
        <ul class="scope-list">
          <li v-for="(option, l) in typeOption" :key="l"
          @click="getfilterOption(option, filterOption.type)"
          :class="{'active': option.isSelected}"
          >{{ option.codeNm }}</li>
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
            @change='dateChange($event)'
          />
          <Dropdown :options="rangeOption" v-model="filterOption.rangeOpt" placeholder="기간" @change="changeRange"/>
        </div>
        <div class="dropdown-search__wrap">
          <Dropdown :options=serchCategoryOption v-model="filterOption.searchKey" placeholder="선택" />
          <div class="search-area">
            <span class="input search-box">
              <input type="text" v-model='filterOption.searchValue' @keyup.enter='searchFeed' placeholder="검색어를 입력하세요."/>
              <ButtonCmp
                type="btn-only-icon"
                iconname='icon-search'
                @click='searchFeed'
              >
              </ButtonCmp>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="feed-view__list">
      <p class="feed-view__total">총 <strong>{{ feedTotal }}</strong>건</p>
      <feedViewItem v-for="( feed, m ) in feedViewData" :feedData="feed.feedItem" :key="m" @mod='mod' :noData='noData' :noResult='noResult' />
    </div>
  </div>
<!-- // 피드 리스트 -->
</template>

<script>
import feedViewItem from '@/views/brand/feed/components/feedViewItem.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import { getFeedList } from '@/api/feed/feed'
import { mapGetters } from 'vuex'
import moment from 'moment'
import feedObj from '@/views/brand/feed/components/feedObj'

export default {
  components: {
    feedViewItem,
    Dropdown,
    ButtonCmp
  },
  data() {
    return {
      noResult: false,
      noData: false,
      selDateRange: '',
      filterOption: {
        dateRange: [],
        rangeOpt: '3m',
        status: [],
        type: [],
        searchKey: 'feedTitle',
        searchValue: '',
        myNews: false
      },
      statusOption: [
        { codeNm: '게시', code: 'publish', isSelected: false },
        { codeNm: '예약', code: 'reservation', isSelected: false },
        { codeNm: '숨김(URL)', code: 'internet', isSelected: false },
        { codeNm: '미게시', code: 'hide', isSelected: false },
        { codeNm: '고정소식', code: 'fix', isSelected: false }
      ],
      typeOption: [
        { codeNm: '갤러리', code: 'gallery', isSelected: false },
        { codeNm: '쉐어링', code: 'share', isSelected: false },
        { codeNm: '슬라이드', code: 'slide', isSelected: false }
      ],
      rangeOption: [
        { codeNm: '오늘', code: 'today' },
        { codeNm: '1주일', code: '1w' },
        { codeNm: '1개월', code: '1m' },
        { codeNm: '3개월', code: '3m' }
      ],
      serchCategoryOption: [
        { codeNm: '소식제목', code: 'feedTitle' },
        { codeNm: '소식 ID', code: 'feedId' }
      ],
      feedViewData: [],
      oriFeedViewData: [],
      feedTotal: 0
    }
  },
  created() {
    let today = new Date()
    let year = today.getFullYear()
    let month = ('0' + (today.getMonth() + 1)).slice(-2)
    let day = ('0' + today.getDate()).slice(-2)
    let dateString = year + month + day
    let changeDate = today.getTime() - (90 * 24 * 60 * 60 * 1000)
    today.setTime(changeDate)
    let changeYear = today.getFullYear()
    let changeMonth = ('0' + (today.getMonth() + 1)).slice(-2)
    let changeday = ('0' + today.getDate()).slice(-2)
    let changeDateString = changeYear + changeMonth + changeday
    this.filterOption.dateRange = [changeDateString, dateString]
    // this.$refs.datePicker.value = [changeDateString, dateString]
    this.getFeedList()
  },
  computed: {
    ...mapGetters({
      userId: 'userId'
    }),
    brandId () {
      return this.$router.currentRoute.params.brandId
    }
  },
  methods: {
    searchFeed () {
      // this.feedViewData = JSON.parse(JSON.stringify(this.oriFeedViewData))
      let opt = this.filterOption
      this.feedViewData = this.oriFeedViewData.filter((feed) => {
        // 내가 등록한 소식
        if (opt.myNews) {
          if (this.userId === feed.updateId) {
            return true
          } else {
            return false
          }
        } else {
          return true
        }
      }).filter((feed) => {
        // 상태
        if (opt.status.length > 0) {
          if (opt.status.indexOf(feed.publishType) > -1) {
            return true
          } else {
            return false
          }
        } else {
          return true
        }
      }).filter((feed) => {
        // 타입
        if (opt.type.length > 0) {
          if (opt.type.indexOf(feed.type) > -1) {
            return true
          } else {
            return false
          }
        } else {
          return true
        }
      }).filter((feed) => {
        // 일자
        let updateDate = moment.utc(feed.updateDate, feedObj.formatStr).toDate()
        let startDate = moment.utc(opt.dateRange[0], 'YYYYMMDD').toDate()
        let endDate = moment.utc(opt.dateRange[1] + '235959', 'YYYYMMDDhhmmss').toDate()
        if (startDate.getTime() <= updateDate.getTime() &&
          endDate.getTime() >= updateDate.getTime()) {
          return true
        } else {
          return false
        }
      }).filter((feed) => {
        // 인풋 필터
        let value = opt.searchValue.trim()
        if (opt.searchKey === 'feedTitle') {
          if (value !== '') {
            if (feed.title.indexOf(value) > -1) {
              return true
            } else {
              return false
            }
          } else {
            return true
          }
        } else {
          if (value !== '') {
            if (feed.feedId.indexOf(value) > -1) {
              return true
            } else {
              return false
            }
          } else {
            return true
          }
        }
      }).sort((a, b) => {
        let aDate = moment.utc(a.updateDate, feedObj.formatStr).toDate()
        let bDate = moment.utc(b.updateDate, feedObj.formatStr).toDate()
        if (a.pinYn === 'Y' || b.pinYn === 'Y') {
          return 1
        } else {
          return (bDate.getTime() - aDate.getTime())
        }
      })
      this.noResult = this.feedViewData.length === 0
    },
    getFeedList() {
      getFeedList({ brandId: this.brandId }).then((res) => {
        this.feedViewData = res.result.feedList.map(item => {
          let formatTime = moment.utc(item.updateDate).format(feedObj.formatStr)
          item.updateDate = formatTime
          item.feedItem.updateDate = formatTime
          if (item.feedItem.type === 'slide') {
            item.feedItem.typeNm = '슬라이드'
          } else if (item.feedItem.type === 'gallery') {
            item.feedItem.typeNm = '갤러리'
          } else if (item.feedItem.type === 'share') {
            item.feedItem.typeNm = '쉐어'
          }
          if (item.publishType === 'publish') {
            item.feedItem.statusNm = '게시'
          } else if (item.publishType === 'reservation') {
            item.feedItem.statusNm = '예약'
          } else if (item.publishType === 'hide') {
            item.feedItem.statusNm = '비공개'
          } else if (item.publishType === 'save') {
            item.feedItem.statusNm = '저장'
          } else if (item.publishType === 'internet') {
            item.feedItem.statusNm = '숨김 게시'
          }
          if (item.feedItem.status === 'save') {
            item.feedItem.statusNm = '미게시'
          }
          // else if (item.feedItem.status === 'delete') {
          //   item.feedItem.statusNm = '삭제'
          // }

          item.feedItem.userNm = item.userNm
          // 갤러리형 쉐어형 버튼 있을시 세팅(에뮬레이터용)
          if (item.feedItem.buttons !== undefined) {
            item.feedItem.buttons.map((btn) => {
              btn.btnName = btn.title
              btn.btnType = btn.type
            })
          }
          // 슬라이드형 버튼 세팅
          if (item.feedItem.slide !== undefined) {
            item.feedItem.slide.forEach((silde) => {
              if (silde.buttons !== undefined) {
                silde.buttons.map((btn) => {
                  btn.btnName = btn.title
                  btn.btnType = btn.type
                })
              }
            })
          }
          return item
        }).sort((a, b) => {
          let aDate = moment.utc(a.updateDate, feedObj.formatStr).toDate()
          let bDate = moment.utc(b.updateDate, feedObj.formatStr).toDate()
          if (a.pinYn === 'Y' || b.pinYn === 'Y') {
            return -1
          } else {
            return (bDate.getTime() - aDate.getTime())
          }
        })
        this.oriFeedViewData = JSON.parse(JSON.stringify(this.feedViewData))
        this.feedTotal = this.feedViewData.length
        if (this.feedViewData.length === 0) {
          this.noData = true
        }
      })
    },
    // 필터 활성화
    getfilterOption(option, targetKey) {
      if (!option.isSelected) {
        targetKey.push(option.code)
        option.isSelected = true
      } else {
        let i = 0
        while (i < targetKey.length) {
          if (targetKey[i] === option.code) {
            targetKey.splice(i, 1)
          } else {
            i++
          }
        }
        option.isSelected = false
      }
    },
    changeRange() {
      let filterOpt = JSON.parse(JSON.stringify(this.filterOption))
      let today = new Date()
      let year = today.getFullYear()
      let month = ('0' + (today.getMonth() + 1)).slice(-2)
      let day = ('0' + today.getDate()).slice(-2)
      let dateString = year + month + day
      filterOpt.dateRange[1] = dateString
      if (filterOpt.rangeOpt === 'today') {
        filterOpt.dateRange[0] = dateString
        // this.$refs.datePicker.value = [dateString, dateString]
      } else if (filterOpt.rangeOpt === '1w') {
        let changeDate = today.getTime() - (7 * 24 * 60 * 60 * 1000)
        today.setTime(changeDate)
        let changeYear = today.getFullYear()
        let changeMonth = ('0' + (today.getMonth() + 1)).slice(-2)
        let changeday = ('0' + today.getDate()).slice(-2)
        let changeDateString = changeYear + changeMonth + changeday
        filterOpt.dateRange[0] = changeDateString
        // this.$refs.datePicker.value = [changeDateString, dateString]
      } else if (filterOpt.rangeOpt === '1m') {
        let changeDate = today.getTime() - (30 * 24 * 60 * 60 * 1000)
        today.setTime(changeDate)
        let changeYear = today.getFullYear()
        let changeMonth = ('0' + (today.getMonth() + 1)).slice(-2)
        let changeday = ('0' + today.getDate()).slice(-2)
        let changeDateString = changeYear + changeMonth + changeday
        filterOpt.dateRange[0] = changeDateString
        // this.$refs.datePicker.value = [changeDateString, dateString]
      } else if (filterOpt.rangeOpt === '3m') {
        let changeDate = today.getTime() - (90 * 24 * 60 * 60 * 1000)
        today.setTime(changeDate)
        let changeYear = today.getFullYear()
        let changeMonth = ('0' + (today.getMonth() + 1)).slice(-2)
        let changeday = ('0' + today.getDate()).slice(-2)
        let changeDateString = changeYear + changeMonth + changeday
        filterOpt.dateRange[0] = changeDateString
        // this.$refs.datePicker.value = [changeDateString, dateString]
      }
      this.filterOption = filterOpt
    },
    changeCal() {
      this.selDateRange = ''
    },
    dateChange(e) {
    },
    updateMyNews(myNews) {
      if (myNews) {
        this.filterOption.myNews = false
      } else {
        this.filterOption.myNews = true
      }
    },
    mod(item) {
      this.$emit('mod', item)
    },
    initFeedForm() {
      this.$parent.initFeedForm()
    }
  }
}
</script>

<style>

</style>
