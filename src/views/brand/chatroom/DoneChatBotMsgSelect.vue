<template>
  <div
    class="modal__content--inner zipcode__modal select_menu"
  >
    <div class="modal__content--header">
      <p class="modal-title">간편 챗봇 메시지 연결</p>
    </div>
    <div class="modal__content--body">
      <div class="search__wrap">
        <div class="search-result__wrap">
          <div class="top-ctrl-area">
            <div class="left-area">
              <div class="search-area">
                <span class="input search">
                  <input type="text" placeholder="검색어를 입력하세요."/>
                </span>
              </div>
            </div>
            <!-- 기획서 v1.0 수정 (right-area 추가) -->
            <div class="right-area">
              <Dropdown :options="sortOptions"
              >
              </Dropdown>
            </div>
            <!-- // 기획서 v1.0 수정 (right-area 추가) -->
          </div>
          <div class="table__wrap">
            <table class="table table-list">
              <colgroup>
                <col width="10%">
                <col width="">
                <col width="30%">
                <col width="25%">
              </colgroup>
              <thead>
                <tr>
                  <th scope="col" colspan="2"><span>간편챗봇 명</span></th>
                  <th scope="col"><span>간편챗봇 ID</span></th>
                  <th scope="col"><span>유형</span></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in chatbotMsgList" :key="i">
                  <td>
                    <span class="radiobox">
                      <input type="radio" :id="`item${i+1}`" :value="`item${i+1}`" v-model="radiochk">
                      <label :for="`item${i+1}`"></label>
                    </span>
                  </td>
                  <td class="l-align">
                    <span>{{ item.name }}</span>
                  </td>
                  <td>
                    <span>{{ item.id }}</span>
                  </td>
                  <td>
                    <span>{{ item.type }}</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
<!--        <div class="empty-emulator" v-if="radiochk">-->
<!--          <p>브랜드 소식을 선택해주세요.</p>-->
<!--        </div>-->
        <!-- 간편챗봇 컴포넌트 완성되면 연결해야함 임시로 피드에뮬레이터 컴포넌트 사용함 -->
<!--        <feedEmulator-->
<!--          v-if="!radiochk"-->
<!--          :brandInfoData="brandInfoData"-->
<!--          :feedInfoData="form"-->
<!--          :showBrandHeader="true"-->
<!--        />-->
      </div>
    </div>
    <div class="modal__content--footer">
      <PagingCmp />
      <div class="button__wrap">
        <ButtonCmp
          type="btn-blue-line"
          @click="$emit('closeModal')"
        >닫기</ButtonCmp>
        <!-- 간편챗봇 메시지 연결 버튼 클릭 시 간편챗봇 명 출력 및 연결 처리 -->
        <ButtonCmp
          type="btn-blue"
          @click="$emit('closeModal')"
          :disabled="radiochk.length === 0"
        >간편챗봇 메시지 연결</ButtonCmp>
        <!-- //간편챗봇 메시지 연결 버튼 클릭 시 간편챗봇 명 출력 및 연결 처리 -->
      </div>
    </div>
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import PagingCmp from '@/components/common/PagingCmp.vue'
import { retireveAutoReplyList, retireveAutoReplyInfo } from '@/api/service/autoReply'

export default {
  components: {
    PagingCmp,
    ButtonCmp
  },
  props: {
    brandId: { type: String },
    armId: { type: String, default: '' }
  },
  data() {
    return {
      isLoad: false,
      totalCount: 0,
      searchParam: {
        aprvRet: 'OK',
        inputValue: '',
        orderKey: 'MOD_DT ',
        orderValue: 'ASC',
        page: 1,
        offset: 0,
        limit: 10
      },
      autoReplyList: [],
      autoReplyData: {},
      autoReplyTemplate: {},
      selectedArmId: ''
    }
  },
  computed: {
    validation() {
      if (jglib.isEmpty(this.selectedArmId)) {
        return true
      }
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
