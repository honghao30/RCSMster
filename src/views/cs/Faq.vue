<template>
  <div class="rcs_container">
    <article id="content" class="content">
      <breadcrumb :depth1MenuId="'M0400'" :depth2MenuId="'M0402'"/>
      <div class="top_title_area">
        <h2 class="h2_title">FAQ</h2>
      </div>
      <div class="cate_wrap">
        <ul class="cate_nav">
          <li :class="{ active: bbsCategoryType === '' || bbsCategoryType === 'ALL' }">
            <a href="javascript:void(0);" @click="selectedBbsCategoryType('ALL', -1)">전체</a>
          </li>
          <li v-for="(faqCate, index) in faqCateList" :key="index" :class="{ active: bbsCategoryType === faqCate.code && !activeall}">
            <a href="javascript:void(0);" @click="selectedBbsCategoryType(faqCate.code, index)">{{faqCate.codeNm}}</a>
          </li>
        </ul>
        <button class="btn_arrow prev" :class="{ disabled: disabledPrev }" :disabled="disabledPrev" @click="prevBbsCategoryType">
          <span>이전</span>
        </button>
        <button class="btn_arrow next" :class="{ disabled: disabledNext }" :disabled="disabledNext" @click="nextBbsCategoryType">
          <span>다음</span>
        </button>
      </div>
      <FaqList ref="FaqList" v-if="ready" :bbsCategoryType="this.bbsCategoryType" @turnCategory="goCategoryFaqList" @notFaqList="notFaqList"/>
    </article>
  </div>
</template>

<script>
import FaqList from '@/views/cs/components/FaqList'
import Breadcrumb from '@/components/global/Breadcrumb'

import { retrieveCommonCode } from '@/api/common/code'

export default {
  name: 'Faq',
  data() {
    return {
      searchParam: {
        group: 'FaqList'
      },
      ready: false,
      activeall: false,
      bbsCategoryType: '',
      bbsCategoryTypeIndex: -1,
      refresh: {},
      faqCateList: []
    }
  },
  components: {
    FaqList,
    Breadcrumb
  },
  created() {},
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
  },
  computed: {
    disabledPrev() {
      let leng = this.faqCateList.length
      if (this.bbsCategoryType === 'ALL' || this.bbsCategoryType === '' || leng + 1 < 5) {
        return true
      } else {
        return false
      }
    },
    disabledNext() {
      let leng = this.faqCateList.length
      let lastCode = leng === 0 ? '' : this.faqCateList[leng - 1].code
      if (lastCode === this.bbsCategoryType || leng + 1 < 5) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    // '$store.state.ui.route'(value) {
    //   // TODO: refresh here
    //   this.refresh = value
    //   this.bbsCategoryType = 'ALL'
    // }
  },
  methods: {
    init() {
      // 콤보 코드 목록 조회
      retrieveCommonCode('FAQ_CATE').then(res => {
        this.faqCateList = res.result
      })
    },
    selectedBbsCategoryType(bbsCategoryType, index) {
      this.$store.commit('searchcondition/allClearSearchCondition')
      this.activeall = false
      this.bbsCategoryTypeIndex = index
      this.bbsCategoryType = bbsCategoryType
    },
    goCategoryFaqList() {
      this.bbsCategoryType = ''
      this.bbsCategoryTypeIndex = -1
    },
    notFaqList() {
      this.bbsCategoryType = ''
      this.bbsCategoryTypeIndex = -1
    },
    prevBbsCategoryType() {
      this.activeall = false
      let categoryIndex = this.bbsCategoryTypeIndex - 1
      if (categoryIndex !== -1) {
        this.bbsCategoryType = this.faqCateList[categoryIndex].code
      } else if (categoryIndex === -1) {
        this.bbsCategoryType = 'ALL'
      }
      this.bbsCategoryTypeIndex = categoryIndex
    },
    nextBbsCategoryType() {
      this.activeall = false
      let categoryIndex = this.bbsCategoryTypeIndex + 1
      this.bbsCategoryType = this.faqCateList[categoryIndex].code
      this.bbsCategoryTypeIndex = categoryIndex
    }
  }
}
</script>
