<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="간편챗봇 메시지 목록" />
        <div class="top-notice--gray gray-btn">
          <ul>
            <li>- 간편챗봇 메시지를 등록해보세요.</li>
          </ul>
          <router-link :to="{ name: 'autoreplymsgReg', params: { brandId: this.brandId } }" class="btn btn-blue">간편챗봇 메시지 등록</router-link>
        </div>
        <div class="top-ctrl-area">
          <div class="left-area">
            <div class="dropdown-search__wrap">
              <Dropdown v-model='searchParam.inputType' :options="TitleOptions"/>
              <div class="search-area">
                <span class="input search-box">
                  <input type="text" @keyup.enter='findSearch' v-model='searchParam.inputValue' placeholder="검색어를 입력하세요."/>
                  <ButtonCmp
                    @click='findSearch'
                    type="btn-only-icon"
                    iconname='icon-search'
                  >
                  </ButtonCmp>
                </span>
              </div>
            </div>
          </div>
          <div class="right-area">
            <Dropdown v-model='searchParam.orderKey' @change='findSearch' :options="SortOptions"/>
            <Dropdown v-model='searchParam.size' @change='findSearch' :options="NumberOptions" />
          </div>
        </div>
        <div class="table__wrap chatroom__table">
          <table class="table table-list">
            <colgroup>
              <col width="22%">
              <col width="22%">
              <col width="14%">
              <col width="14%">
              <col width="14%">
            </colgroup>
            <thead>
              <tr>
                <th scope="col"><span>간편챗봇 메시지 이름</span></th>
                <th scope="col"><span>간편챗봇 메시지 ID</span></th>
                <th scope="col"><span>유형</span></th>
                <th scope="col"><span>상태</span></th>
                <th scope="col"><span>최종 수정일</span></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, i) in autoReplyList" :key="i"
              >
                <td>
                  <div class="chat_title__wrap">
                    <div class="chat_title">
                      <router-link :to="{name: 'autoreplymsgDetail', params: {brandId: brandId, autoReplyMsgId: item.autoReplyMsgId}}" class="link">{{ item.autoReplyMsgName }}</router-link>
                    </div>
                  </div>
                </td>
                <td>
                  {{ item.autoReplyMsgId }}
                </td>
                <td>
                  {{ item.autoReplyMsgTypeNm }}
                </td>
                <td>
                  {{ item.aprvRetNm }}
                </td>
                <td>
                  {{ item.regDt }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <PagingCmp :total='totalCount' :current-page='searchParam.page' :page-size='searchParam.size' @change='changePage'  />
      </div>
    </div>
  </div>
</template>

<script>

import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import PagingCmp from '@/components/common/PagingCmp.vue'
import { retireveAutoReplyList } from '@/api/service/autoReply'
import moment from 'moment'

export default {
  components: {
    PageTitle,
    BrandLnb,
    ButtonCmp,
    Dropdown,
    PagingCmp
  },
  data() {
    return {
      isAllChecked: false,
      checkList: [],
      large: false,
      disabled: false,
      isOpen: false,
      brandId: '',
      originSearchParam: null,
      searchParam: {
        group: 'AutoReplyList',
        aprvRet: '',
        inputValue: '',
        inputType: '',
        orderKey: '',
        orderValue: '',
        size: '10',
        page: 1,
        offset: 1
      },
      autoReplyList: [],
      totalCount: 0,
      TitleOptions: [
        { codeNm: '전체', code: 'all' },
        { codeNm: '간편챗봇 메시지 이름', code: 'chatbotName' },
        { codeNm: '간편챗봇 메시지 ID', code: 'chatbotId' }
      ],
      SortOptions: [
        { codeNm: '최신순', code: 'newest' },
        { codeNm: '이름순', code: 'name' }
      ],
      NumberOptions: [
        { codeNm: '10개씩', code: '10' },
        { codeNm: '20개씩', code: '20' },
        { codeNm: '30개씩', code: '30' }
      ]
    }
  },
  created() {
    this.brandId = this.$router.currentRoute.params.brandId
    this.searchParam = this.$store.getters['searchcondition/getSearchCondition'](this.searchParam) // 검색필터값 가져옴
    this.updateOriginSearchParam()
  },
  mounted() {
    this.getList()
  },
  methods: {
    findSearch() {
      this.updatePageData(1)
      this.updateOriginSearchParam()
      this.getList()
    },
    updateOriginSearchParam () {
      this.originSearchParam = _.cloneDeep(this.searchParam)
    },
    getList () {
      this.$store.dispatch('searchcondition/searchAndGo', { searchParam: this.searchParam })
      retireveAutoReplyList(this.brandId, this.originSearchParam).then(res => {
        this.autoReplyList = res.result.map((arm) => {
          arm.regDt = moment.utc(arm.regDt).format('YYYY.MM.DD')
          return arm
        })
        this.totalCount = res.pagination.total
      }).catch(e => {
        this.$alertMsg(e.desc)
      })
    },
    /** 페이지 변경 */
    changePage(page) {
      console.log(page)
      this.updatePageData(page)
      this.getList()
    },
    /** 페이지 정보 변경 */
    updatePageData(page) {
      this.searchParam.page = page
      this.originSearchParam.page = page
    }
  }
}
</script>
