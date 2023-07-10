<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="템플릿 메시지 목록" />
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
            <Dropdown :options="templateOptions" v-model="templateOption"/>
            <Dropdown :options="statusOptions" v-model="statusOption"/>
          </div>
        </div>
        <div class="table__wrap chatroom__table">
          <table class="table table-list">
            <colgroup>
              <col width="15%"/>
              <col width="15%"/>
              <col width="15%"/>
              <col />
              <col width="15%"/>
              <col width="15%"/>
            </colgroup>
            <thead>
              <tr>
                <th scope="col"><span>템플릿 ID</span></th>
                <th scope="col"><span>템플릿 유형</span></th>
                <th scope="col"><span>템플릿 이름</span></th>
                <th scope="col"><span>제목</span></th>
                <th scope="col"><span>최종 수정일</span></th>
                <th scope="col"><span>상태</span></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, i) in templateList" :key="i"
              >
                <td>
                  {{ item.id }}
                </td>
                <td>
                  {{ item.type }}
                </td>
                <td>
                  {{ item.name }}
                </td>
                <td>
                  <router-link to="">{{ item.title }}</router-link>
                </td>
                <td>
                  {{ item.date }}
                </td>
                <td>
                  <span :class="{'reject' : item.status === '반려'}">
                    {{ item.status }}
                  </span>
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
      templateOptions: [
        {
          label: '전체',
          value: 'all'
        },
        {
          label: '텍스트 템플릿',
          value: 'textTemplate'
        },
        {
          label: 'LMS 템플릿',
          value: 'LMSTemplate'
        },
        {
          label: '이미지 템플릿',
          value: 'imageTemplate'
        }
      ],
      statusOptions: [
        {
          label: '전체',
          value: 'all'
        },
        {
          label: '임시저장',
          value: 'draft'
        },
        {
          label: '승인 대기',
          value: 'waiting'
        },
        {
          label: '승인 완료',
          value: 'approval'
        },
        {
          label: '반려',
          value: 'reject'
        }
      ],
      templateList: [{
        'id': 'ADS232SDS',
        'type': '이미지 템플릿',
        'name': '타이틀 선택형1',
        'title': '카드가입안내',
        'date': '2022.10.02',
        'status': '승인대기'
      },
      {
        'id': 'ADS232SDS',
        'type': '텍스트 템플릿',
        'name': '타이틀 자유형1',
        'title': '신상품 소개',
        'date': '2022.10.02',
        'status': '승인완료'
      },
      {
        'id': 'ADS232SDS',
        'type': 'LMS 템플릿',
        'name': '장문형',
        'title': '프로모션(우러간)',
        'date': '2022.10.02',
        'status': '반려'
      },
      {
        'id': 'ADS232SDS',
        'type': '이미지 템플릿',
        'name': '이미지 강조형',
        'title': '카드가입안내',
        'date': '2022.10.02',
        'status': '승인대기'
      },
      {
        'id': 'ADS232SDS',
        'type': '텍스트 템플릿',
        'name': '타이틀 자유형1',
        'title': '신상품 소개',
        'date': '2022.10.02',
        'status': '승인대기'
      },
      {
        'id': 'ADS232SDS',
        'type': '텍스트 템플릿',
        'name': '아이콘 강조형1',
        'title': '프리 템플릿(자동생성)',
        'date': '2022.10.02',
        'status': '임시저장'
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
