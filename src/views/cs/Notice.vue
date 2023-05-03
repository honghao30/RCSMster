<template>
  <div class="rcs_container">
    <article id="content" class="content">
      <breadcrumb :depth1MenuId="'M0400'" :depth2MenuId="'M0401'"/>
      <div class="top_title_area">
        <h2 class="h2_title">공지사항</h2>
      </div>
      <div class="tbl_top_area">
        <div class="board_search_wrap">
          <span class="custom_select">
            <select v-model="searchParam.keywordType">
              <option value="subject">제목</option>
              <option value="ctn">내용</option>
            </select>
          </span>
          <span class="custom_input">
            <input type="text" v-model="searchParam.keyword" @keypress.enter="findNotice" placeholder="검색어를 입력하세요.">
          </span>
          <button class="btn sml gray" @click="findNotice">검색</button>
        </div>
      </div>
      <table class="tbl_col_type">
        <caption>
          <strong>공지사항</strong>
          <p>번호, 제목, 첨부파일, 등록일</p>
        </caption>
        <colgroup>
          <col style="width:120px">
          <col style="width:auto">
          <col style="width:160px">
        </colgroup>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>등록일</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(list, notiYn) in notiYesLists" :key="`notiYes_${notiYn}`" v-show="noticeListShow" class="notice">
            <td>
              <span class="label_notice">공지</span>
            </td>
            <td class="subject">
              <a href="javascript:void(0);" class="btn_text bold" @click="goNoticeDetail(list.seq)" v-html="list.subject"></a>
              <div class="btn_down" v-if="list.fileId">
                <span>첨부파일 다운로드</span>
              </div>
            </td>
            <td class="date">{{ list.modDt | prettyDate('YYYY-MM-DD') }}</td>
          </tr>
          <tr v-for="(list, notiYn) in notiNoLists" :key="`notiNo_${notiYn}`" v-show="noticeListShow">
            <td>{{ list.seq }}</td>
            <td class="subject">
              <a href="javascript:void(0);" class="btn_text" @click="goNoticeDetail(list.seq)" v-html="list.subject"
              ></a>
              <div class="btn_down" v-if="list.fileId">
                <span>첨부파일 다운로드</span>
              </div>
            </td>
            <td class="date">{{ list.modDt | prettyDate('YYYY-MM-DD') }}</td>
          </tr>
          <tr v-show="notiNoLists.length === 0">
            <td colspan="4" class="no_data">검색 결과가 없습니다.</td>
          </tr>
        </tbody>
      </table>
      <div class="unit_box" v-if="this.noticeListNum !== 0">
        <div>
          <pagination :total="this.noticeListNum" :current-page.sync="searchParam.page" @change="changePage"/>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { getNoticeList } from '@/api/cs/notice'
import Pagination from '@/components/Pagination'
import Breadcrumb from '@/components/global/Breadcrumb'

export default {
  name: 'Notice',
  components: {
    Pagination,
    Breadcrumb
  },
  data() {
    return {
      searchParam: {
        group: 'Notice',
        keywordType: 'subject',
        keyword: '',
        page: 1,
        size: 10
      },
      noticeListNum: 0,
      changeYesList: [],
      changeNoList: [],
      notiYesLists: [],
      notiNoLists: [],
      allnoticeList: [],

      noticeListShow: true
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('searchcondition/searchAndGo', { searchParam: this.searchParam })
    next()
  },
  created() {},
  mounted() {
    this.searchParam = this.$store.getters['searchcondition/getSearchCondition'](this.searchParam)
    this.init()
  },
  computed: {},
  watch: {
    // '$store.state.ui.route'(value) {
    //   // TODO: refresh here
    //   this.init()
    // }
  },
  methods: {
    init() {
      if (jglib.isEmpty(this.$route.params.page)) {
        this.search()
      } else {
        this.searchParam.page = this.$route.params.page
        this.search()
      }
    },
    goNoticeDetail(seq) {
      this.$router.push({
        name: 'NoticeDetail',
        params: { no: seq, page: this.page }
      })
    },
    findNotice() {
      this.searchParam.page = 1
      this.search()
    },
    changePage(page) {
      this.searchParam.page = page
      this.search()
    },
    search() {
      this.$store.dispatch('searchcondition/searchAndGo', { searchParam: this.searchParam })
      getNoticeList(this.searchParam)
        .then(res => {
          this.notiYesLists = []
          this.notiNoLists = []
          res.result.noticeList.map(list => {
            if (list.notiYn === 'Y') {
              this.notiYesLists.push(list)
            } else {
              this.notiNoLists.push(list)
              return this.notiNoLists
            }
          })
          this.noticeListNum = res.result.totalSize
        })
        .catch(res => {})
    }
  }
}
</script>
