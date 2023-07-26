<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="대화방 메뉴 목록" :num="totalCount" />
        <!-- 등록된 대화방 없을때 -->
        <template v-if="totalCount < 1">
          <div class="chatroom-none">
            <div class="chatroom-none-txt">
              <p>등록된 대화방이 없습니다.<br />
                대화방을 등록하셔야 RBC의 다양한 기능을 사용하실 수 있습니다.</p>
            </div>
            <div class="button__wrap">
              <a class="btn btn-blue" @click="goChatBot">대화방 등록하기</a>
            </div>
          </div>
        </template>
        <!-- //등록된 대화방 있을때 -->
        <template v-else>
          <div class="top-notice--gray gray-btn">
            <ul>
              <li>- 대화방 메뉴는 사용자의 요청에 대해 기업에서 실시간으로 응답할 수 있는 대화방입니다.</li>
            </ul>
            <a class="btn btn-blue" @click="goWrite">대화방 메뉴 등록</a>
          </div>
          <div class="top-ctrl-area">
            <div class="left-area">
              <div class="dropdown-search__wrap">
                <Dropdown :options="titleOptions" @change="searchTyeChange" />
                <div class="search-area">
                <span class="input search-box">
                  <input type="text" placeholder="검색어를 입력하세요." @keypress.enter="findSearch" v-model="searchParam.searchValue" />
                  <ButtonCmp
                    type="btn-only-icon"
                    iconname='icon-search'
                    @click="findSearch"
                  >
                  </ButtonCmp>
                </span>
                </div>
              </div>
            </div>
            <div class="right-area">
              <ButtonCmp
                type="btn-line"
                size="medium"
                class="wid-auto"
              >
                대화방 메뉴 목록 엑셀 다운로드
              </ButtonCmp>
              <Dropdown :options="sortOptions" @change="handleSortChange" />
              <Dropdown :options="viewOptions" @change="changeLimit" />
            </div>
          </div>
          <div class="table__wrap notice-table">
            <table class="table table-list chatroom-menu-list__wrap">
              <colgroup>
                <col width="56px">
                <col width="232px">
                <col width="212px">
                <col width="212px">
                <col width="102px">
                <col width="308px">
              </colgroup>
              <thead>
                <tr>
                  <th scope="col">
                    <span class="checkbox">
                      <input type="checkbox" id="all" />
                      <label for="all"></label>
                    </span>
                  </th>
                  <th scope="col"><span>대화방명</span></th>
                  <th scope="col"><span>발신번호/회신번호</span></th>
                  <th scope="col"><span>챗붓 ID</span></th>
                  <th scope="col"><span>사용여부</span></th>
                  <th scope="col"><span>대화방 메뉴명</span></th> <!-- 기획서 v1.0 수정 -->
                </tr>
              </thead>
              <tbody>
              <tr
                v-for="(item, i) in hasPsMenuTwowayList" :key="i"
              >
                <td>
                  <span class="checkbox">
                    <input type="checkbox" :id="`item${i+1}`" :value="`item${i+1}`">
                    <label :for="`item${i+1}`"></label>
                  </span>
                </td>
                <td class="link">
                  <router-link :to="{ name: 'ChatRoomMenuView', params: { brandId: this.brandId, chatbotId: chatbotId } }">{{ item.chatTitle }}</router-link>
                </td>
                <td>
                  {{ item.service === 'a2p' ? item.chatbotId : item.subNum }}
                </td>
                <td>
                  {{ item.chatbotId }}
                </td>
                <td>
                  {{ item.psMenuYn  === 'Y' ? '사용' : '미사용' }}
                </td>
                <td class="chatroom-list-left">
                  <Dropdown v-if="item.menuList.length > 0" :options=item.menuList />
                </td>
                <td>대화방명</td><!-- 기획서 v1.0 수정 -->
              </tr>
              </tbody>
            </table>
          </div>
          <!-- 모달창 문구 수정 : 대화방을 삭제하시겠습니까? 기획서 v1.0 수정(문구수정) -->
<!--          <div class="button__wrap">-->
<!--            <ButtonCmp-->
<!--              type="btn-line"-->
<!--              @click="activeChatRoom"-->
<!--            >사용</ButtonCmp>-->
<!--            <ButtonCmp-->
<!--              type="btn-line"-->
<!--              @click="disableChatRoom"-->
<!--            >미사용</ButtonCmp>-->
<!--            <ButtonCmp-->
<!--              type="btn-line"-->
<!--              @click="removeConfirmMsg"-->
<!--            >삭제</ButtonCmp>-->
<!--          </div>-->
          <PagingCmp :total="totalCount" :pageSize="searchParam.limit" :current-page.sync="searchParam.page" @change="changePage" />
        </template>
      </div>
    </div>
    <!-- // 모달 영역 -->
<!--    <ModalView-->
<!--      v-if="isModalViewed" @closeModal="isModalViewed = false">-->
<!--      <ConfirmMsg-->
<!--        @closeModal="isModalViewed = false"-->
<!--      >-->
<!--        <div slot="msg">-->
<!--          <div class="msg">-->
<!--            선택한 대화방을 삭제하시겠습니까?-->
<!--          </div>-->
<!--        </div>-->
<!--        <div class="button__wrap" slot="button">-->
<!--          <ButtonCmp-->
<!--            type="btn-blue-line"-->
<!--            @click="closeMsg"-->
<!--          >아니요-->
<!--          </ButtonCmp>-->
<!--          <ButtonCmp-->
<!--          type="btn-blue"-->
<!--          @click="removeChatRoom"-->
<!--          >-->
<!--           예-->
<!--          </ButtonCmp>-->
<!--        </div>-->
<!--      </ConfirmMsg>-->
<!--    </ModalView>-->
    <!-- // 모달 뷰     -->
  </div>
</template>

<script>

import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import PagingCmp from '@/components/common/PagingCmp.vue'
import moment from 'moment'
import { getPersistentList } from '@/api/service/persistentMenu'

export default {
  components: {
    PagingCmp,
    PageTitle,
    BrandLnb,
    ButtonCmp,
    Dropdown
  },
  data() {
    return {
      titleOptions: [
        {
          codeNm: '대화방 명',
          code: 'SUB_TITLE'
        },
        {
          codeNm: '챗봇 ID',
          code: 'CHATBOT_ID'
        }
      ],
      sortOptions: [
        {
          codeNm: '최신순',
          code: 'REG_DT'
        },
        {
          codeNm: '이름순',
          code: 'TITLE'
        }
      ],
      viewOptions: [
        {
          codeNm: '10개씩',
          code: '10'
        },
        {
          codeNm: '20개씩',
          code: '20'
        },
        {
          codeNm: '30개씩',
          code: '30'
        }
      ],
      totalCount: 0,
      searchParam: {
        searchTye: 'SUB_TITLE',
        searchValue: '',
        orderKey: 'REG_DT',
        orderValue: 'DESC',
        page: 1,
        offset: 0,
        limit: 10
      },
      brandId: '',
      hasPsMenuTwowayList: []
    }
  },
  created () {
    this.brandId = this.$route.params.brandId
  },
  mounted() {
    this.searchParam = this.$store.getters['searchcondition/getSearchCondition'](this.searchParam) // 검색필터값 가져옴
    this.getList()
  },
  methods: {
    getList() {
      this.$store.dispatch('searchcondition/searchAndGo', { searchParam: this.searchParam })

      // 양방향 대화방인 대화방의 대화방메뉴 목록 출력
      getPersistentList(this.brandId, this.searchParam).then(res => {
        if (res.code === '20000000') {
          this.totalCount = res.pagination.total
          this.hasPsMenuTwowayList = res.result.list

          this.hasPsMenuTwowayList.forEach(data => {
            let menuList = []
            if (!jglib.isEmpty(data.psMenuTitleList)) {
              data.psMenuTitleList.split(',').forEach(title => {
                menuList.push({
                  code: title,
                  codeNm: title
                })
              })
            }
            data.menuList = menuList
          })
        }
      }).catch((err) => {
        this.$alertMsg(err.desc).then(() => {})
      })
    },
    searchTyeChange(code) {
      this.searchParam.searchTye = code
    },
    /** 검색 */
    findSearch() {
      this.updatePageData(1)
      this.getList()
    },
    changePage(page) {
      this.updatePageData(page)
      this.searchParam.offset = (page - 1) * this.searchParam.limit // 시작 row(0부터)
      this.getList()
    },
    changeLimit(limit) {
      this.searchParam.limit = limit
      this.initOffset()
      this.updatePageData(1)
      this.getList()
    },
    initOffset() {
      this.searchParam.offset = 0
    },
    updatePageData(page) {
      this.searchParam.page = page
    },
    /** 정렬 */
    handleSortChange(sortKey) {
      this.searchParam.orderKey = sortKey
      this.searchParam.orderValue = sortKey === 'REG_DT' ? 'DESC' : 'ASC'
      this.getList()
    },
    goDetail(chatbotId) {
      this.$router.push(
        {
          name: 'ChatRoomMenuView',
          params: {
            brandId: this.brandId,
            chatbotId: chatbotId
          }
        })
    },
    goWrite() {
      let chatbotId = ''
      let min = moment()
      this.hasPsMenuTwowayList.forEach(data => {
        if (moment(data.regDt) < min) {
          chatbotId = data.chatbotId
          min = moment(data.regDt)
        }
      })

      this.$router.push({
        name: 'ChatRoomMenuWrite',
        params: {
          brandId: this.brandId,
          chatbotId: chatbotId
        }
      })
    },
    goChatBot() {
      alert('대화방 등록 이동')
    }
  }
}
</script>
