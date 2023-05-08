<template>
  <div class="inner">
    <PageTitle pagetitle="공지사항" />
    <TabCategory :category="category" :newTabIndex="newTabIndex"/>
    <SearchTable v-if="checkBoardLength" listnumber="73" />
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
            <tr>
              <td></td>
              <td>
                <p class="no-data">검색 결과가 없습니다.</p>
              </td>
              <td>  </td>
            </tr>
          </tbody>
        </table>
      </div>
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import SearchTable from '@/components/common/SearchTable.vue'
import TabCategory from '@/components/common/TabCategory'

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
    PageTitle,
    SearchTable,
    TabCategory
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
