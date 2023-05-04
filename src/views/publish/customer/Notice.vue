<template>
  <div class="inner">
    <PageTitle pagetitle="공지사항" />
    <div class="category-tab">
      <ul class="tab-list">
        <li
          v-for="(item, i) in category"
          :key="i"
          class="tab-item"
          :class="[{active: activeTabIndex === i}]"
        >
          <a role="button" @click="tabCtrl(i)"><span>{{ item }}</span></a>
        </li>
      </ul>
    </div>
    <SearchTable v-if="checkBoardLength" />
    <div class="table__wrap notice-table">
        <table class="table table-list">
          <colgroup>
            <col width="10%">
            <col>
            <col width="16%">
          </colgroup>
          <thead>
            <tr>
              <th scope="col">번호</th>
              <th scope="col">제목</th>
              <th scope="col">등록일</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, i) in noticeData" :key="i"
              :class="[{primary: item.primary}]"
            >
              <td>
                <span v-if="item.primary" class="primary__text">공지</span>
                <span v-if="!item.primary" class="num">{{ item.id }}</span>
              </td>
              <td>
                <div class="l-align title">
                  <router-link to=""
                  >{{ item.title }}
                  </router-link>
                  <i class="ico-attach" v-if="item.attach"></i>
                  <i class="ico-new" v-if="item.new"></i>
                </div>
              </td>
              <td>
                <span class="date">{{ item.date }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <PagingCmp />
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import SearchTable from '@/components/common/SearchTable.vue'
import PagingCmp from '@/components/common/PagingCmp.vue'

export default {
  name: 'NoticeView',
  data() {
    return {
      category: ['전체', '이벤트', '시스템', '정책'],
      activeTabIndex: 0,
      noticeData:
      [
        {
          id: 1,
          title: '[중요] RCS 메시지 발송 규격 추가 예정 안내',
          date: '2023.04.25',
          primary: true,
          new: false,
          attach: false
        },
        {
          id: 2,
          title: 'CS Biz Center X 미리캔버스 제휴 프로모션 CS Biz Center X 미리캔버스 제휴 프로모션 CS Biz Center X 미리캔버스 제휴 프로모션 CS Biz Center X 미리캔버스 제휴 프로모션',
          date: '2023.04.27',
          primary: false,
          new: true,
          attach: false
        },
        {
          id: 3,
          title: 'RCS Biz Center 제3회 전국동시조합장선거 후보자 브랜드 등록 수정',
          date: '2023.04.23',
          primary: false,
          new: false,
          attach: true
        },
        {
          id: 4,
          title: 'RCS Biz Center 제3회 전국동시조합장선거 후보자 브랜드 등록 수정 RCS Biz Center 제3회 전국동시조합장선거 후보자 브랜드 등록 수정 RCS Biz Center 제3회 전국동시조합장선거 후보자 브랜드 등록 수정s',
          date: '2023.04.23',
          primary: false,
          new: true,
          attach: true
        },
        {
          id: 5,
          title: 'RCS Biz Center 제3회 전국동시조합장선거 후보자 브랜드 등록 수정 RCS Biz Center 제3회 전국동시조합장선거 후보자 브랜드 등록 수정 RCS Biz Center 제3회 전국동시조합장선거 후보자 브랜드 등록 수정s',
          date: '2023.04.23',
          primary: false,
          new: false,
          attach: false
        },
        {
          id: 6,
          title: 'RCS Biz Center 제3회 전국동시조합장선거 후보자 브랜드 등록 수정 RCS Biz Center 제3회 전국동시조합장선거 후보자 브랜드 등록 수정 RCS Biz Center 제3회 전국동시조합장선거 후보자 브랜드 등록 수정s',
          date: '2023.04.23',
          primary: false,
          new: false,
          attach: false
        },
        {
          id: 7,
          title: 'RCS Biz Center 제3회 전국동시조합장선거 후보자 브랜드 등록 수정 RCS Biz Center 제3회 전국동시조합장선거 후보자 브랜드 등록 수정 RCS Biz Center 제3회 전국동시조합장선거 후보자 브랜드 등록 수정s',
          date: '2023.04.23',
          primary: false,
          new: false,
          attach: false
        },
        {
          id: 8,
          title: 'RCS Biz Center 제3회 전국동시조합장선거 후보자 브랜드 등록 수정 RCS Biz Center 제3회 전국동시조합장선거 후보자 브랜드 등록 수정 RCS Biz Center 제3회 전국동시조합장선거 후보자 브랜드 등록 수정s',
          date: '2023.04.23',
          primary: false,
          new: false,
          attach: false
        },
        {
          id: 9,
          title: 'RCS Biz Center 제3회 전국동시조합장선거 후보자 브랜드 등록 수정 RCS Biz Center 제3회 전국동시조합장선거 후보자 브랜드 등록 수정 RCS Biz Center 제3회 전국동시조합장선거 후보자 브랜드 등록 수정s',
          date: '2023.04.23',
          primary: false,
          new: false,
          attach: false
        },
        {
          id: 10,
          title: 'RCS Biz Center 제3회 전국동시조합장선거 후보자 브랜드 등록 수정 RCS Biz Center 제3회 전국동시조합장선거 후보자 브랜드 등록 수정 RCS Biz Center 제3회 전국동시조합장선거 후보자 브랜드 등록 수정s',
          date: '2023.04.23',
          primary: false,
          new: false,
          attach: false
        }
      ]
    }
  },
  components: {
    PageTitle,
    SearchTable,
    PagingCmp
  },
  computed: {
    checkBoardLength() {
      return this.noticeData.length < 10 ? false : true
    }
  },
  methods: {
    tabCtrl: function(num) {
      this.activeTabIndex = num
    }
  }
}
</script>

<style>

</style>
