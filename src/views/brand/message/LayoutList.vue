<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="레이아웃 목록" />
        <div class="top-ctrl-area">
          <div class="left-area">
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              range-separator="~"
              format="yyyy.MM.dd"
              value-format="yyyyMMdd"
              ref="datePicker"
            />
            <Dropdown :options="rangeOption" v-model="selDateRange" @change="changeRange"/>
            <div class="search-area">
              <span class="input search-box">
                <input type="text" placeholder="검색어를 입력하세요." v-model="searchWord"/>
                <ButtonCmp
                  type="btn-only-icon"
                  iconname='icon-search'
                >
                </ButtonCmp>
              </span>
            </div>
          </div>
          <div class="right-area">
            <Dropdown :options="layoutOptions" v-model="layoutOption" placeholder="레이아웃 유형"/>
          </div>
        </div>
        <div class="table__wrap chatroom__table">
          <table class="table table-list">
            <colgroup>
              <col width="15%"/>
              <col/>
              <col width="12%"/>
              <col width="12%" />
              <col width="12%"/>
              <col width="12%"/>
            </colgroup>
            <thead>
              <tr>
                <th scope="col"><span>상품</span></th>
                <th scope="col"><span>레이아웃 명</span></th>
                <th scope="col"><span>버튼 컬러</span></th>
                <th scope="col"><span>작성자</span></th>
                <th scope="col"><span>작성일</span></th>
                <th scope="col"><span>상태</span></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, i) in layoutList" :key="i"
              >
                <td>
                  {{ item.type }}
                </td>
                <td class="l-align">
                  <router-link to="">{{ item.name }}</router-link>
                </td>
                <td>
                  {{ item.btnColor }}
                </td>
                <td>
                  {{ item.writer }}
                </td>
                <td>
                  {{ item.date }}
                </td>
                <td>
                  {{ item.status }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <PagingCmp />
      </div>
    </div>
  </div>
</template>

<script>

import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import PagingCmp from '@/components/common/PagingCmp.vue'

export default {
  components: {
    PageTitle,
    BrandLnb,
    ButtonCmp,
    Dropdown,
    PagingCmp
  },
  data() {
    return {
      selDateRange: '',
      dateRange: ['', ''],
      searchWord: '',
      templateOption: '',
      statusOption: '',
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
      layoutOptions: [
        {
          label: '전체',
          value: 'all'
        },
        {
          label: 'SMS',
          value: 'SMS'
        },
        {
          label: 'LMS',
          value: 'LMS'
        },
        {
          label: 'MMS',
          value: 'MMS'
        }
      ],
      layoutList: [{
        'type': 'SMS',
        'name': '신상품소개',
        'btnColor': '-',
        'writer': '홍*동',
        'date': '2022.10.02',
        'status': '등록중'
      },
      {
        'type': 'MMS',
        'name': '카드가입안내',
        'btnColor': '#3B7CF3',
        'writer': '홍*동',
        'date': '2022.10.02',
        'status': '등록완료'
      },
      {
        'type': 'SMS',
        'name': '프로모션(월간)',
        'btnColor': '-',
        'writer': '홍*동',
        'date': '2022.10.02',
        'status': '등록중'
      },
      {
        'type': 'SMS',
        'name': '신상품소개',
        'btnColor': '-',
        'writer': '홍*동',
        'date': '2022.10.02',
        'status': '등록중'
      },
      {
        'type': 'MMS',
        'name': '카드가입안내',
        'btnColor': '#3B7CF3',
        'writer': '홍*동',
        'date': '2022.10.02',
        'status': '등록완료'
      },
      {
        'type': 'SMS',
        'name': '프로모션(월간)',
        'btnColor': '-',
        'writer': '홍*동',
        'date': '2022.10.02',
        'status': '등록중'
      }]
    }
  },
  mounted() {
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
      } else if (this.selDateRange === '3m') {
        let changeDate = today.getTime() - (90 * 24 * 60 * 60 * 1000)
        today.setTime(changeDate)
        let changeYear = today.getFullYear()
        let changeMonth = ('0' + (today.getMonth() + 1)).slice(-2)
        let changeday = ('0' + today.getDate()).slice(-2)
        let changeDateString = changeYear + changeMonth + changeday
        this.dateRange[0] = changeDateString
        this.$refs.datePicker.value = [changeDateString, dateString]
      }
    }
  }
}
</script>
