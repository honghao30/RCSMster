<template>
  <div class="inner">
    <PageTitle pagetitle="공지사항" />
    <div class="table__wrap notice-table content-table">
        <table class="table table-list">
          <colgroup>
            <col width="10%">
            <col>
            <col width="16%">
          </colgroup>
          <thead>
            <tr>
              <th scope="col" colspan="2">
                <p class="title">RCS Biz Center 검수기 승인 안내 제3회 전국동시조합장선거 후보자 브랜드 등록 안내 수정 국동시조합장선거 후보자 브랜드 등록 안내 RCS Biz Center 검수기 승인 안내 제3회 전국동시조합장선거 후보자 브랜드 등록 안내</p>
              </th>
              <th scope="col">
                <p class="date">2023.04.25</p>
              </th>
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
            <tr>
              <td class="no-data" colspan="3">
                <p>검색 결과가 없습니다.</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'

export default {
  name: 'NoticeView',
  data() {
    return {
      category: ['전체', '이벤트', '시스템', '정책', '서식', '업데이트 노트'],
      activeTabIndex: 0,
      newTabIndex: 1,
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
          title: '발신번호 삭제 및 전시모드 정책 변경 등 공지 드립니다.',
          date: '2023.04.25',
          primary: true,
          new: false,
          attach: false
        }
      ]
    }
  },
  components: {
    PageTitle
  },
  computed: {
    checkBoardLength() {
      return this.noticeData.length < 0 ? false : true;
    }
  }
}
</script>

<style>

</style>
