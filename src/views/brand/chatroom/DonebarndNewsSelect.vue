<template>
  <div
    class="modal__content--inner zipcode__modal select_menu"
  >
    <div class="modal__content--header">
      <p class="modal-title">브랜드 소식 연결</p>
    </div>
    <div class="modal__content--body">
      <div class="search__wrap">
        <div class="search-result__wrap">
          <div class="top-ctrl-area">
            <div class="left-area">
              <div class="search-area">
                <span class="input search">
                  <input type="text" placeholder="검색어를 입력하세요." v-model="searchParam.keyword" @keypress.enter="search" />
                </span>
              </div>
            </div>
          </div>
          <div class="table__wrap">
            <table class="table table-list" v-if="isLoad">
              <colgroup>
                <col width="10%">
                <col width="">
                <col width="25%">
              </colgroup>
              <thead>
                <tr>
                  <th scope="col" colspan="2"><span>브랜드 소식 명</span></th>
                  <th scope="col"><span>소식 ID</span></th>
                </tr>
              </thead>
              <tbody v-if="feedList.length > 0">
                <tr v-for="(feed, idx) in feedList" :key="idx" @click="selectFeed(feed.feedId)">
                  <td>
                    <span class="radiobox">
                      <input type="radio" :id="`radio_${idx}`" :checked="feed.feedId == selectedFeedId" />
                      <label :for="`radio_${idx}`"></label>
                    </span>
                  </td>
                  <td class="l-align">
                    <span>{{ feed.title }}</span>
                  </td>
                  <td>
                    <span>{{ feed.feedId }}</span>
                  </td>
                </tr>
              </tbody>
              <tbody v-else>
                <tr>
                  <td colspan="3">검색결과가 없습니다.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
<!--        <div class="empty-emulator" v-if="radiochk.length === 0">-->
<!--          <p>브랜드 소식을 선택해주세요.</p>-->
<!--        </div>-->
<!--        <feedEmulator-->
<!--          v-else-->
<!--          :brandInfoData="brandInfoData"-->
<!--          :feedInfoData="form"-->
<!--          :showBrandHeader="true"-->
<!--        />-->
      </div>
    </div>
    <div class="modal__content--footer">
      <PagingCmp :total="totalCount" :pageSize="searchParam.limit" :current-page.sync="searchParam.page" @change="changePage" />
      <div class="button__wrap">
        <ButtonCmp
          type="btn-blue-line"
          @click="closePopup"
        >닫기</ButtonCmp>
        <!-- 브랜드 소식 연결 버튼 클릭 시 브랜드 소식 명 출력 및 연결 처리 -->
        <ButtonCmp
          type="btn-blue"
          @click="confirm"
          :disabled="validation"
        >브랜드 소식 연결</ButtonCmp>
        <!-- //브랜드 소식 연결 버튼 클릭 시 브랜드 소식 명 출력 및 연결 처리 -->
      </div>
    </div>
  </div>
</template>

<script>

import PagingCmp from '@/components/common/PagingCmp.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import { getFeedList, feedDetail } from '@/api/feed/feed'

export default {
  components: {
    ButtonCmp,
    PagingCmp
  },
  props: {
    brandId: { type: String }
  },
  data() {
    return {
      isLoad: false,
      totalCount: 0,
      searchParam: {
        searchType: 'title',
        keyword: '',
        page: 1,
        offset: 0,
        limit: 10
      },
      feedList: [],
      feedData: {},
      feedTemplate: {},
      selectedFeedId: ''
    }
  },
  computed: {
    validation() {
      if (jglib.isEmpty(this.selectedFeedId)) {
        return true
      }
      return false
    }
  },
  created() {
    this.getFeedList()
  },
  methods: {
    getFeedList() {
      this.totalCount = 0
      this.feedList = []
      this.isLoad = true
      this.searchParam.brandId = this.brandId
      getFeedList(this.searchParam).then(res => {
        if (res.code === '20000000') {
          this.totalCount = res.pagination.total
          this.feedList = res.result.feedList
          this.isLoad = true
        }
      }).catch(() => {})
    },
    search() {
      this.updatePageData(1)
      this.getFeedList()
    },
    selectFeed(feedId) {
      this.selectedFeedId = feedId
      feedDetail(this.brandId, feedId)
        .then(res => {
          this.feedData = {
            feedId: res.result.feedId,
            feedUrl: res.result.feedUrl
          }
        })
    },
    changePage(page) {
      this.updatePageData(page)
      this.searchParam.offset = (page - 1) * this.searchParam.limit // 시작 row(0부터)
      this.getFeedList()
    },
    updatePageData(page) {
      this.searchParam.page = page
    },
    confirm() {
      this.$emit('selectFeed', { feedId: this.feedData.feedId, feedUrl: this.feedData.feedUrl })
      this.$emit('closeModal')
    },
    closePopup() {
      this.$emit('closeModal')
    }
  }
}
</script>

<style>
</style>
