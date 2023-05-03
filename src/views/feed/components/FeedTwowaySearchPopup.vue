<template>
  <div>
    <div v-if="isLoading && !isFirst || totalCount > 0" tabindex="0" class="layer active">
      <div tabindex="0" class="layer_cont">
        <div class="layer_head">
          <div class="title_wrap mar_b20">
            <span class="h4_desc bold">연결할 양방향 대화방을 선택하세요.</span>
          </div>
          <div class="search_wrap">
            <div class="cont_flex_bundle">
              <span class="custom_input">
                <input type="text" v-model="searchParam.searchValue" placeholder="대화방 명을 검색하세요." @keypress.enter="doSearch">
              </span>
              <a href="javascript:void(0);" @click="doSearch" class="btn sml gray">
                <span>검색</span>
              </a>
            </div>
          </div>
        </div>
        <div class="layer_body">
          <div class="layer_scroll scrollRow10">
            <div class="search_result">
              <!-- 검색 결과-->
              <table class="tbl_col_type">
                <colgroup>
                  <col style="width:45px">
                  <col style="width:180px">
                  <col style="width:auto">
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">대화방 명</th>
                    <th scope="col">발신번호/대화방 ID</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(twoway, index) in callingTwoWayManagementList" :key="index">
                    <td>
                      <span class="custom_radio single">
                        <input type="radio" name="twoway" :id="twoway.chatbotId"  :value="twoway.chatbotId" v-model="selChatbotId">
                        <label :for="twoway.chatbotId"></label>
                      </span>
                    </td>
                    <td class="left">
                      <label :for="twoway.chatbotId">{{twoway.subTitle}}</label>
                    </td>
                    <td>
                      <label :for="twoway.chatbotId">{{twoway.chatbotId}}</label>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="layer_foot">
          <div v-if="totalCount === 0" class="box_result_info center">
            <p>검색 결과가 없습니다.</p>
          </div>
          <div class="btn_wrap mar_t30">
            <a href="javascript:void(0);" @click="closePopup" class="btn sml bd_black type2">
              <span>취소</span>
            </a>
            <a href="javascript:void(0);" @click="selectedTwoway" class="btn sml black">
              <span>확인</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="isLoading && isFirst && totalCount === 0" tabindex="0" class="layer active">
      <div tabindex="0" class="layer_cont">
        <div class="layer_body">
          <div class="layer_scroll">
            <!-- 승인요청/수정승인요청 -->
            <div class="search_result">
              <div class="box_result_info lineHeight24 center">
                등록된 양방향 대화방이 없습니다.<br>
                양방향 대화방이 없는 경우, 대화방 연결을 이용할 수 없습니다.
              </div>
            </div>
          </div>
        </div>
        <div class="layer_foot">
          <div class="btn_wrap mar_t30">
            <a href="javascript:void(0);" @click="closePopup" class="btn sml black">
              <span>확인</span>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div v-else></div>
  </div>
</template>

<script>

import {
  getCallingTwoWayManagementList
} from '@/api/service/callingTwoWayManagement'

export default {
  name: 'FeedTwowaySearchPopup',
  props: {
    brandId: {
      type: String
    }
  },
  data() {
    return {
      searchParam: {
        group: 'CallingTwoWayManagement',
        aprvStatus: 'OK',
        serviceKind: '',
        searchKey: 'SUB_TITLE',
        searchValue: '',
        orderKey: 'REG_DT',
        orderValue: 'ASC',
        size: 99999,
        page: 1,
        isTwoWay: 'Y'
      },
      isLoading: false,
      isFirst: true,
      callingTwoWayManagementList: [],
      totalCount: 0,
      selChatbotId: ''
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getList()
    },
    doSearch() {
      this.isFirst = false
      this.selChatbotId = ''
      this.getList()
    },
    getList() {
      this.$store.dispatch('searchcondition/searchAndGo', { searchParam: this.searchParam })
      getCallingTwoWayManagementList(this.searchParam, this.brandId)
        .then(res => {
          this.totalCount = Number(res.result.totalSize)
          let list = res.result.list
          list.forEach(row => {
            row['checked'] = false
            row['disable'] = false
          })
          this.callingTwoWayManagementList = list
          this.isLoading = true
        })
        .catch(res => {
          this.$alertMsg(res.desc)
        })
    },
    closePopup() {
      this.$emit('update:visible', false)
    },
    selectedTwoway() {
      if (jglib.isEmpty(this.selChatbotId)) {
        this.$alertMsg('양방향 대화방을 선택하세요.')
        return false
      }
      this.$emit('selectedTwoway', this.selChatbotId)
      this.$emit('update:visible', false)
    }
  }
}
</script>
