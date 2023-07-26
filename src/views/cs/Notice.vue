<template>
  <div class="inner notice">
    <PageTitle pagetitle="공지사항" />
    <TabCategory :allTabUseYn="true" :category="notiCateList" :activeTab="bbsCategoryType" :newTabList="newTabList" @click="selectedBbsCategoryType" />
    <div class="search-table">
      <div class="dropdown-search__wrap">
        <Dropdown :options=dropdownOptions v-model="searchParam.keywordType"/>
        <div class="search-area">
          <span class="input search-box">
            <input type="text" placeholder="검색어를 입력해 주세요." v-model="searchParam.keyword" @keypress.enter="findNotice"/>
            <ButtonCmp
              type="btn-only-icon"
              iconname='icon-search'
              @click="findNotice"
            >
            </ButtonCmp>
          </span>
        </div>
      </div>
      <p class="list-number">
        총 <span>{{ this.noticeListNum }}</span> 건
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
          <tr v-for="(list, index) in notiYesLists" :key="`notiYes_${index}`" class="primary">
            <td class="mo-hide">
              <span class="primary__text">공지</span>
            </td>
            <td>
              <div class="l-align title">
                <span class="primary__text only-mobile">공지</span>
                <router-link :to="{ name: 'NoticeContent', params: { no: list.seq, page: searchParam.page } }" v-html="list.subject" />
                <i class="ico-attach" v-if="list.fileId"></i>
                <i class="ico-new" v-if="list.isNew"></i>
              </div>
            </td>
            <td>
              <span class="date">{{ list.modDt | prettyDate('YYYY-MM-DD') }}</span>
            </td>
          </tr>
          <tr v-for="(list, index) in notiNoLists" :key="`notiNo_${index}`" class="primary">
            <td class="mo-hide">
              <span class="num">{{ list.seq }}</span>
            </td>
            <td>
              <div class="l-align title">
                <router-link :to="{ name: 'NoticeContent', params: { no: list.seq, page: searchParam.page } }" v-html="list.subject" />
                <i class="ico-attach" v-if="list.fileId"></i>
                <i class="ico-new" v-if="list.isNew"></i>
              </div>
            </td>
            <td>
              <span class="date">{{ list.modDt | prettyDate('YYYY-MM-DD') }}</span>
            </td>
          </tr>
          <tr v-show="notiNoLists.length === 0"><!-- 검색 결과 없을 시-->
            <td colspan="3">
              <div class="notice__search-no-data">
                <p>검색 결과가 없습니다.</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <PagingCmp v-if="this.noticeListNum !== 0" :total="this.noticeListNum" :current-page.sync="searchParam.page" @change="changePage" />
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import PagingCmp from '@/components/common/PagingCmp.vue'
import TabCategory from '@/components/common/TabCategory'
import Dropdown from '@/components/common/Dropdown.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import moment from 'moment'
import { retrieveCommonCode } from '@/api/common/code'
import { getNoticeList } from '@/api/cs/notice'

export default {
  name: 'NoticeView',
  components: {
    PageTitle,
    Dropdown,
    PagingCmp,
    TabCategory,
    ButtonCmp
  },
  data() {
    return {
      searchParam: {
        notiCate: '',
        group: 'Notice',
        keywordType: 'subject',
        keyword: '',
        page: 1,
        size: 5
      },
      dropdownOptions: [
        {
          codeNm: '제목',
          code: 'subject'
        },
        {
          codeNm: '내용',
          code: 'ctn'
        }
      ],
      notiCateList: [],
      bbsCategoryType: '',
      bbsCategoryTypeIndex: -1,
      notiYesLists: [],
      notiNoLists: [],
      noticeListNum: 0,
      newTabList: []
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
    if (this.searchParam.notiCate) {
      this.bbsCategoryType = this.searchParam.notiCate
    }
    this.ready = true
    // 콤보 코드 목록 조회
    retrieveCommonCode('NOTI_CATE').then(res => {
      this.notiCateList = res.result
    })

    if (jglib.isEmpty(this.$route.params.page)) {
      this.search()
    } else {
      this.searchParam.page = this.$route.params.page
      this.search()
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('searchcondition/searchAndGo', { searchParam: this.searchParam })
    next()
  },
  methods: {
    selectedBbsCategoryType(index, item) {
      this.$store.commit('searchcondition/allClearSearchCondition')
      this.bbsCategoryTypeIndex = index
      this.bbsCategoryType = (item == null ? 'ALL' : item.code)
    },
    resetCategory() {
      this.searchParam.notiCate = this.bbsCategoryType === 'ALL' ? '' : this.bbsCategoryType
      this.searchParam.page = 1
      this.searchParam.keyword = ''
      this.search()
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
          this.newTabList = res.result.newNotiCateList
          this.notiYesLists = []
          this.notiNoLists = []
          res.result.noticeList.map(list => {
            list.isNew = moment.duration(moment().diff(moment(list.regiDt))).asDays() < 7

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

<style>

</style>
