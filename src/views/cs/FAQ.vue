<template>
  <div class="inner notice notice-faq">
    <PageTitle pagetitle="FAQ" />
    <TabCategory :allTabUseYn="true" :category="faqCateList" :activeTab="bbsCategoryType" @click="selectedBbsCategoryType" />
    <div class="search-table mo-full-type">
      <div class="dropdown-search__wrap">
        <div class="search-area">
          <span class="input search-box">
            <input type="text" placeholder="검색어를 입력해 주세요." v-model="searchParam.keyword" @keypress.enter="findFaq"/>
            <ButtonCmp
              type="btn-only-icon"
              iconname='icon-search'
              @click="findFaq"
            >
            </ButtonCmp>
          </span>
        </div>
      </div>
      <p class="list-number" v-show="FaqListShow">
        총 <span>{{ this.faqListNum }}</span>건
      </p>
    </div>
    <accordion>
        <accordion-item
          v-for="(item, index) in allFaqList" :key="index"
        >
          <template slot="accordion-title">
            <span class="accordion-cate">
              Q
            </span>
            <p class="accordion-title__title" v-html="item.subject"></p>
          </template>
          <template slot="accordion-content">
            <span class="accordion-cate">
              A
            </span>
            <!-- <p v-html="item.ctn"></p> -->
            <vue-editor v-model="item.ctn" :editorOptions="editorOptions" disabled></vue-editor>
          </template>
        </accordion-item>
    </accordion>
    <PagingCmp v-show="FaqListShow" :total="this.faqListNum" :current-page.sync="searchParam.page" @change="changePage" />
    <!-- 검색 결과 없을 시 div 띄워주시면 됩니다 -->
    <div class="notice__search-no-data" v-show="!FaqListShow">
      <p>검색 결과가 없습니다.</p>
    </div>
    <div class="notice-faq__inquire">
      <p>원하시는 답변을 찾지 못하셨나요? <br/> 온라인 문의를 남겨주세요.</p>
      <div class="button__wrap">
        <ButtonCmp
          type="btn-blue"
          @click="goOnlineQna"
        >
          문의하기
        </ButtonCmp>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import TabCategory from '@/components/common/TabCategory'
import Accordion from './components/accordion'
import AccordionItem from './components/accordion-item'
import PagingCmp from '@/components/common/PagingCmp.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import { retrieveCommonCode } from '@/api/common/code'
import { getFaqList } from '@/api/cs/faq'

export default {
  components: {
    PageTitle,
    TabCategory,
    Accordion,
    AccordionItem,
    PagingCmp,
    ButtonCmp
  },
  data() {
    return {
      searchParam: {
        faqCate: '',
        group: 'FaqList',
        keyword: '',
        page: 1,
        size: 10
      },
      faqCateList: [],
      bbsCategoryType: '',
      allFaqList: [],
      faqListNum: 0,
      FaqListShow: true,
      editorOptions: {
        modules: {
          toolbar: false
        }
      }
    }
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
  mounted() {
    this.searchParam = this.$store.getters['searchcondition/getSearchCondition'](this.searchParam)
    if (this.searchParam.faqCate) {
      this.bbsCategoryType = this.searchParam.faqCate
    }
    this.ready = true
    // 콤보 코드 목록 조회
    retrieveCommonCode('FAQ_CATE').then(res => {
      this.faqCateList = res.result
    })
    this.search()
      .then(res => {
        this.faqListNum = res.result.totalSize
      })
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('searchcondition/searchAndGo', { searchParam: this.searchParam })
    next()
  },
  methods: {
    selectedBbsCategoryType(index, item) {
      this.$store.commit('searchcondition/allClearSearchCondition')
      this.bbsCategoryType = (item == null ? 'ALL' : item.code)
    },
    goCategoryFaqList() {
      this.bbsCategoryType = ''
    },
    notFaqList() {
      this.bbsCategoryType = ''
    },
    resetCategory() {
      this.searchParam.faqCate = this.bbsCategoryType === 'ALL' ? '' : this.bbsCategoryType
      this.searchParam.page = 1
      this.searchParam.keyword = ''
      this.search()
        .then(res => {
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
          if (res.result.totalSize === '0') {
            this.FaqListShow = false
            this.notFaqList()
          } else {
            this.faqListNum = res.result.totalSize
            this.goCategoryFaqList()
          }
        })
    },
    changePage(page) {
      this.searchParam.page = page
      this.searchParam.faqCate = this.bbsCategoryType === 'ALL' ? '' : this.bbsCategoryType
      this.search()
        .then(res => {
          if (res.result.totalSize === '0') {
            this.FaqListShow = false
            this.notFaqList()
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
        path = '/cs/qna/list'
      }
      this.$router.push(path)
    }
  }
}
</script>

<style>

</style>
