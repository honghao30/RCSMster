<template>
  <div class="inner notice">
    <PageTitle pagetitle="공지사항" />
    <TabCategory :category="category" :newTabIndex="newTabIndex"/>
    <div class="search-table">
      <div class="ctrl">
        <Dropdown :options=dropdownOptions />
        <div class="search-area">
          <span class="input search">
            <input type="text" placeholder="텍스트 영역"/>
          </span>
        </div>
        <div class="search-area">
          <span class="input-m search">
            <input type="text" placeholder="검색어 입력"/>
          </span>
        </div>
      </div>
      <p class="list-number">
        총 <span>73</span>건
      </p>
    </div>
    <div class="table__wrap notice-table">
      <table class="table table-list">
        <colgroup>
          <col width="10%">
          <col>
          <col width="16%">
        </colgroup>
        <thead>
          <tr>
            <th scope="col"><span>번호</span></th>
            <th scope="col"><span>제목</span></th>
            <th scope="col"><span>등록일</span></th>
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
          <tr><!-- 검색 결과 없을 시-->
            <td colspan="3">
              <div class="notice__search-no-data">
                <p>검색 결과가 없습니다.</p>
              </div>
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
import PagingCmp from '@/components/common/PagingCmp.vue'
import TabCategory from '@/components/common/TabCategory'
import Dropdown from '@/components/common/Dropdown.vue'

export default {
  name: 'NoticeView',
  components: {
    PageTitle,
    Dropdown,
    PagingCmp,
    TabCategory
  },
  data() {
    return {
      dropdownOptions: [
        {
          label: '전체',
          value: 'all'
        },
        {
          label: '제목',
          value: 'title'
        },
        {
          label: '내용',
          value: 'content'
        }
      ],
      category: [12, '이벤트', '시스템', '정책', '서식', '업데이트 노트'],
      activeTabIndex: 0,
      newTabIndex: [1, 2],
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
        },
        {
          id: 45,
          title: 'CS Biz Center X 미리캔버스 제휴 프로모션',
          date: '2023.04.25',
          primary: false,
          new: true,
          attach: false
        },
        {
          id: 45,
          title: '[작업] 서비스 점검 공지 (06월11일 14시~15시) [작업] 서비스 점검 공지 (06월11일 14시~15시) [작업] 서비스 점검 공지에 대한 안내 드립니다.',
          date: '2023.04.25',
          primary: false,
          new: false,
          attach: false
        },
        {
          id: 45,
          title: 'RCS Biz Center 제3회 전국동시조합장선거 후보자 브랜드 등록 수정',
          date: '2023.04.25',
          primary: false,
          new: false,
          attach: true
        },
        {
          id: 45,
          title: '[안내] 발신번호 신청 사업자와 증빙서류의 사업자가 상이한 경우 (발신번호 위탁서)',
          date: '2023.04.25',
          primary: false,
          new: false,
          attach: false
        },
        {
          id: 45,
          title: 'RCS Biz Center 검수기 승인 안내',
          date: '2023.04.25',
          primary: false,
          new: false,
          attach: false
        },
        {
          id: 45,
          title: '[RCS 활용사례] 국민은행 - 보이스피싱 예방',
          date: '2023.04.25',
          primary: false,
          new: false,
          attach: false
        },
        {
          id: 45,
          title: '3rd Party App의 RCS 문자 메시지 인식을 위한 개발 가이드',
          date: '2023.04.25',
          primary: false,
          new: false,
          attach: false
        },
        {
          id: 45,
          title: '[작업] 삼성 MaaP 작업에 따른 RCS Biz Center 서비스 차단 안내 (7월 19일 ~ 20일)',
          date: '2023.04.25',
          primary: false,
          new: false,
          attach: false
        }
      ]
    }
  }
}
</script>

<style>

</style>
