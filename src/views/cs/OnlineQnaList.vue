<template>
  <div class="rcs_container">
    <article id="content" class="content">
      <breadcrumb :depth1MenuId="'M0400'" :depth2MenuId="'M0403'"/>
      <div class="top_title_area">
        <h2 class="h2_title">온라인 문의</h2>
      </div>
      <div class="tbl_top_area">
        <div class="btn_wrap">
          <a href="javascript:void(0);" class="btn sml bd_black type2" @click="goQnaForm">
            <span>문의하기</span>
          </a>
        </div>
      </div>
      <table class="tbl_col_type">
        <caption>
          <strong>온라인문의</strong>
          <p>제목, 등록일, 상태</p>
        </caption>
        <colgroup>
          <col style="width:auto">
          <col style="width:240px">
          <col style="width:160px">
        </colgroup>
        <thead>
          <tr>
            <th>제목</th>
            <th>등록일</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          <tr v-show="!qnaListFlag">
            <td colspan="3" class="no_data">문의하신 내역이 없습니다.</td>
          </tr>
          <tr v-for="(list, seq) in qnaList" :key="`qnaList_${seq}`" v-show="qnaListFlag">
            <td class="subject">
              <a href="javascript:void(0);" class="btn_text" @click="goQnaDetail(list.seq, list.subject)" v-html="list.subject"></a>
            </td>
            <td>{{ list.regDt| prettyDate('YYYY-MM-DD') }}</td>
            <td>
              <span class="text_blue" v-if="list.ansYn === '답변완료'" v-html="list.ansYn"></span>
              <span class="text_gray" v-if="list.ansYn === '답변대기'" v-html="list.ansYn"></span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="unit_box" v-show="qnaListFlag">
        <div>
          <pagination :total="this.totalSize" :current-page.sync="searchParam.page" @change="changePage"/>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { getQnaList } from '@/api/cs/onlineqna'
import Pagination from '@/components/Pagination'
import Breadcrumb from '@/components/global/Breadcrumb'
import store from '@/store'
// 스크립트를 정의하는 부분
// 개발자 작업 영역

// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
export default {
  // .vue 내부에서 사용되는 model
  // model 기반으로 vue는 동작된다.
  name: 'onlineqnalist',
  components: {
    Pagination,
    Breadcrumb
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
      qnaListFlag: true,
      complete: true,
      wait: false
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('searchcondition/searchAndGo', { searchParam: this.searchParam })
    next()
  },
  created() {
    // DOM이 만들어 지기 전 실행 되는 곳
    // Data를 사전에 준비할 경우 사용된다.
  },
  mounted() {
    this.searchParam = this.$store.getters['searchcondition/getSearchCondition'](this.searchParam)
    store
      .dispatch('getUserInfo')
      .then(userInfo => {
        this.init()
      })
      .catch(res => {
        this.$router.push('qna/form')
      })
    // DOM에 해당 .vue가 들어가게 되면 실행 되는 곳
    // onload 상태와 동일하다. DOM 이후에 조작할 경우 이곳에서 수행
  },
  computed: {
    // 값이 자주 변경됨에 따라, 관련되어 데이터 혹은 view가 바뀌어야 할 경우 사용
    // method를 바로 연결하면 tic 단위로 계속 실행되기 때문에, 값이 변경할 때만 수행되고,
    // cache로 남는 computed를 활용하는 것이 성능에 좋음
  },
  methods: {
    // .vue 내부에서 사용되는 함수를 정의한다.
    // 이벤트에 따라 실행하거나, 내부적으로 사용되는 함수들을 정의한다.
    init() {
      if (jglib.isEmpty(this.$store.state.user.userId)) {
        this.$router.push('qna/form')
      } else {
        this.search()
      }
    },
    goQnaDetail(seq, subject) {
      this.$router.push({
        name: 'onlineqnadetail',
        params: { seq: seq, subject: subject }
      })
    },
    goQnaForm() {
      this.$router.push('qna/form')
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

<style lang="less" scoped></style>
