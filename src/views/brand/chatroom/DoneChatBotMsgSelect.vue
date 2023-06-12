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
        <div class="empty-emulator" v-if="radiochk">
          <p>브랜드 소식을 선택해주세요.</p>
        </div>
        <!-- 간편챗봇 컴포넌트 완성되면 연결해야함 임시로 피드에뮬레이터 컴포넌트 사용함 -->
        <feedEmulator
          v-if="!radiochk"
          :brandInfoData="brandInfoData"
          :feedInfoData="form"
          :showBrandHeader="true"
        />
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
import feedEmulator from '@/views/brand/feed/components/feedEmulator.vue'
import PagingCmp from '@/components/common/PagingCmp.vue'

export default {
  components: {
    ButtonCmp,
    feedEmulator,
    PagingCmp
  },
  data() {
    return {
      isAllChecked: false,
      radiochk: [],
      chatbotMsgList: [
        {
          name: '상담 직원 연결',
          id: 'ARMs5STz7Akth2L',
          type: '카드형'
        },
        {
          name: '나에게 맞는 상품 찾기',
          id: 'ARMbv6mWh020A4t',
          type: '이미지형'
        },
        {
          name: '나에게 맞는 상품 찾기',
          id: 'ARMbv6mWh020A4t',
          type: '이미지형'
        },
        {
          name: '나에게 맞는 상품 찾기',
          id: 'ARMbv6mWh020A4t',
          type: '이미지형'
        },
        {
          name: '나에게 맞는 상품 찾기',
          id: 'ARMbv6mWh020A4t',
          type: '카드형'
        },
        {
          name: '나에게 맞는 상품 찾기',
          id: 'ARMbv6mWh020A4t',
          type: '이미지형'
        },
        {
          name: '나에게 맞는 상품 찾기',
          id: 'ARMbv6mWh020A4t',
          type: '카드형'
        },
        {
          name: '나에게 맞는 상품 찾기',
          id: 'ARMbv6mWh020A4t',
          type: '말풍선형'
        },
        {
          name: '상담 직원 연결',
          id: 'ARMbv6mWh020A4t',
          type: '말풍선형'
        },
        {
          name: '상담 직원 연결',
          id: 'ARMbv6mWh020A4t',
          type: '이미지형'
        }
      ],
      brandInfoData: {
        name: '네스프레소',
        profileImgFileUrl: 'dummy/brand_logo.png'
      },
      form: {
        type: 'gallery',
        feedDate: '4월 19일 오후 3:00',
        feedTitle: 'SK 텔레콤의 스마트한 제안​',
        feedContent: 'SK텔레콤을 다양하게 만나보세요! #SKT Insight · SK텔레콤 네이버 포스트 스크랩 · SK텔레콤 페이스북 #Facebook · SK텔레콤 유튜브 #YouTube ​레콤 네이버 포스트 스크랩 · SK텔레콤 페이스북 #Facebook · SK텔레콤 유튜브 #YouTube ​레콤 네이버 포스트 스크랩 · SK텔레콤 페이스북 #Facebook · SK텔레콤 유튜브 #YouTube',
        imgFiles: ['dummy/feed_image_02.png']
      }
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
