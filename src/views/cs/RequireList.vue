<template>
  <div class="inner notice require-list">
    <PageTitle pagetitle="온라인 문의" />
    <div class="button__wrap">
      <ButtonCmp
        type="btn-blue"
        @click="goQnaForm"
      >
        문의하기
      </ButtonCmp>
    </div>
    <div class="table__wrap">
      <table class="table table-list">
        <colgroup>
          <col width="112px">
          <col />
          <col width="233px">
        </colgroup>
        <thead>
          <tr>
            <th scope="col"><span>상태</span></th>
            <th scope="col"><span>제목</span></th>
            <th scope="col"><span>등록일</span></th>
          </tr>
        </thead>
      </table>
    </div>
    <accordion>
        <accordion-item
          v-for="(item, index) in qnaList" :key="index"
        >
          <template slot="accordion-title">
            <span class="accordion-cate">
              <span class="require-list__complete" v-if="item.ansYn === '답변완료'" v-html="item.ansYn"></span>
              <span class="require-list__wait" v-if="item.ansYn === '답변대기'" v-html="item.ansYn"></span>
            </span>
            <span class="accordion-title__title" v-html="item.subject"></span>
            <p class="require-list__date">{{ item.regDt| prettyDate('YYYY-MM-DD') }}</p>
          </template>
          <template slot="accordion-content">
            <div class="accordion-question">
              <div>
                <span class="accordion-cate">
                  Q
                </span>
                <span class="require-list__question-keyword" v-html="item.subject"></span>
                <p class="require-list__question">{{ item.regDt| prettyDate('YYYY-MM-DD') }}</p>
              </div>
            </div>
            <div class="accordion-answer">
              <div>
                <span class="accordion-cate">
                  A
                </span>
                <p class="require-list__answer" v-html="item.ctn"></p>
                <span class="require-list__answer-date">{{ item.ansDt| prettyDate('YYYY-MM-DD') }}</span>
              </div>
            </div>
          </template>
        </accordion-item>
    </accordion>
    <PagingCmp :total="this.totalSize" :current-page.sync="searchParam.page" @change="changePage" />
    <!-- 0619: 중복 노출으로 인한 수정 -->
    <!-- <PagingCmp /> -->
    <div class="notice__search-no-data" v-show="!qnaListFlag">
      <p>문의하신 내역이 없습니다.</p>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import Accordion from './components/accordion'
import AccordionItem from './components/accordion-item'
import PagingCmp from '@/components/common/PagingCmp.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import { getQnaList } from '@/api/cs/onlineqna'
import store from '@/store'

export default {
  components: {
    PageTitle,
    Accordion,
    AccordionItem,
    PagingCmp,
    ButtonCmp
  },
  data() {
    return {
      searchParam: {
        group: 'onlineqnalist',
        page: 1,
        size: 10
      },
      qnaList: [],
      totalSize: 0,
      qnaListFlag: true
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('searchcondition/searchAndGo', { searchParam: this.searchParam })
    next()
  },
  mounted() {
    this.searchParam = this.$store.getters['searchcondition/getSearchCondition'](this.searchParam)
    store
      .dispatch('getUserInfo')
      .then(userInfo => {
        this.init()
      })
      .catch(res => {
        this.$router.push('/cs/qna')
      })
  },
  methods: {
    init() {
      if (jglib.isEmpty(this.$store.state.user.userId)) {
        this.$router.push('/cs/qna')
      } else {
        this.search()
      }
    },
    goQnaForm() {
      this.$router.push('/cs/qna')
    },
    changePage(page) {
      this.searchParam.page = page
      this.search()
    },
    search() {
      this.$store.dispatch('searchcondition/searchAndGo', { searchParam: this.searchParam })
      getQnaList(this.searchParam)
        .then(res => {
          this.totalSize = res.result.totalSize
          this.qnaList = res.result.consultationList
          if (this.totalSize === '0') {
            this.qnaListFlag = false
          } else {
            this.qnaListFlag = true
          }
        })
        .catch(res => {
          this.qnaListFlag = false
        })
    }
  }
}
</script>

<style>

</style>
