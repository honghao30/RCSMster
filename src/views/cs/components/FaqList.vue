<template>
  <div class="faq_wrap">
    <div class="tbl_top_area">
      <p class="total" v-show="FaqListShow">
        총
        <span class="count">{{ this.faqListNum }}</span> 건
      </p>
      <div class="board_search_wrap">
        <span class="custom_input">
          <input type="text" placeholder="검색어를 입력하세요." v-model="searchParam.keyword" @keypress.enter="findFaq">
        </span>
        <a href="javascript:void(0);" class="btn sml gray" @click="findFaq">
          <span>검색</span>
        </a>
      </div>
    </div>
    <ul class="faq_list">
      <li v-for="(list, index) in allFaqList" :key="`faq_${index}`" :class="{ active : active_seq === list.seq }">
        <a href="javascript:void(0);" class="box_question" @click="activate(list.seq)">
          <div class="text_area" v-html="list.subject"></div>
          <span class="btn btn_toggle"></span>
        </a>
        <div class="box_answer">
          <div class="text_area">
            <vue-editor v-model="list.ctn" :editorOptions="editorOptions" disabled></vue-editor>
<!--            <span class="icn_answer" v-html="list.ctn"></span>-->
          </div>
        </div>
      </li>
      <!-- 검색결과가 없을경우 -->
      <li class="no_data" v-show="!FaqListShow">
        <p>검색 결과가 없습니다</p>
        <div class="box_gray">
          <p>원하시는 답변을 찾지 못하셨다면 온라인 문의를 남겨주세요.</p>
          <a href="javascript:void(0);" class="btn_link" @click="goOnlineQna">
            <span>온라인 문의</span>
          </a>
        </div>
      </li>
    </ul>
    <div>
      <pagination v-show="FaqListShow" :total="this.faqListNum" :current-page.sync="searchParam.page"  @change="changePage"/>
    </div>
  </div>
</template>

<script>
import { getFaqList } from '@/api/cs/faq'
import Pagination from '@/components/Pagination'

export default {
  name: 'FaqList',

  data() {
    return {
      searchParam: {
        group: 'FaqList',
        keyword: '',
        page: 1,
        size: 10
      },
      allFaqList: [],
      changeFaqList: [],
      changeActive: '',
      active: false,
      active_seq: 0,
      faqListNum: 0,
      FaqListShow: true,
      editorOptions: {
        modules: {
          toolbar: false
        }
      }
    }
  },
  props: {
    bbsCategoryType: {
      type: String
    }
  },
  components: {
    Pagination
  },
  watch: {
    bbsCategoryType: {
      deep: true,
      handler() {
        if (this.bbsCategoryType) {
          this.resetCategory()
        }
      }
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
  methods: {
    init() {
      this.search()
        .then(res => {
          this.faqListNum = res.result.totalSize
        })
    },
    resetCategory() {
      this.searchParam.faqCate = this.bbsCategoryType === 'ALL' ? '' : this.bbsCategoryType
      this.searchParam.page = 1
      this.searchParam.keyword = ''
      this.search()
        .then(res => {
          this.active_seq = false
          if (res.result.totalSize === '0') {
            this.FaqListShow = false
          } else {
            this.faqListNum = res.result.totalSize
          }
        })
    },
    findFaq() {
      this.searchParam.faqCate = ''
      this.searchParam.page = 1
      this.search()
        .then(res => {
          this.active_seq = false
          if (res.result.totalSize === '0') {
            this.FaqListShow = false
            this.$emit('notFaqList')
          } else {
            this.faqListNum = res.result.totalSize
            this.$emit('turnCategory')
          }
        })
    },
    changePage(page) {
      this.searchParam.page = page
      this.searchParam.faqCate = this.bbsCategoryType === 'ALL' ? '' : this.bbsCategoryType
      this.search()
        .then(res => {
          this.active_seq = false
          if (res.result.totalSize === '0') {
            this.FaqListShow = false
            this.$emit('notFaqList')
          } else {
            this.faqListNum = res.result.totalSize
          }
        })
    },
    search() {
      this.$store.dispatch('searchcondition/searchAndGo', { searchParam: this.searchParam })
      return new Promise((resolve, reject) => {
        getFaqList(this.searchParam)
          .then(res => {
            this.FaqListShow = true
            this.allFaqList = res.result.faqList
            resolve(res)
          })
          .catch(() => {
            this.FaqListShow = false
          })
      })
    },
    goOnlineQna() {
      let path = '/cs/qna'
      if (jglib.isEmpty(this.$store.state.user.accessToken)) {
        path = '/cs/qna/form'
      }
      this.$router.push(path)
    },
    activate(seq) {
      if (this.active_seq === seq) {
        this.active_seq = !seq
      } else {
        this.active_seq = seq
      }
    }
  }
}
</script>
