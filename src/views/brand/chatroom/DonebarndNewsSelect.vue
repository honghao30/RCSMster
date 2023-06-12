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
                <col width="25%">
              </colgroup>
              <thead>
                <tr>
                  <th scope="col" colspan="2"><span>브랜드 소식 명</span></th>
                  <th scope="col"><span>소식 ID</span></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in barndNewsList" :key="i">
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
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="empty-emulator" v-if="radiochk.length === 0">
          <p>브랜드 소식을 선택해주세요.</p>
        </div>
        <feedEmulator
          v-else
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
        <!-- 브랜드 소식 연결 버튼 클릭 시 브랜드 소식 명 출력 및 연결 처리 -->
        <ButtonCmp
          type="btn-blue"
          @click="$emit('closeModal')"
          :disabled="radiochk.length === 0"
        >브랜드 소식 연결</ButtonCmp>
        <!-- //브랜드 소식 연결 버튼 클릭 시 브랜드 소식 명 출력 및 연결 처리 -->
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
      barndNewsList: [
        {
          name: 'SK 텔레콤의 스마트한 제안',
          id: '12223313'
        },
        {
          name: '미리 만나는 프리미엄 페스타',
          id: '12223314'
        },
        {
          name: '2주간 즐기는 프리미엄 회원 특별혜택!',
          id: '12223315'
        },
        {
          name: '요가하는 선생님',
          id: '12223316'
        },
        {
          name: '멋진 오늘의 건축물 역사와 현대가 함께 흐르는 공간',
          id: '12223317'
        },
        {
          name: '아이들 나라 보고 레고랜드 놀러가요',
          id: '12223318'
        },
        {
          name: '메시지 허브로 문자, RCS, 알림톡까지 한번에 이용하세요',
          id: '12223319'
        },
        {
          name: '뉴스레터 구독 시 기프티콘 증정​',
          id: '12223412'
        },
        {
          name: '아이들 나라 보고 레고랜드 놀러가요​',
          id: '12223413'
        },
        {
          name: '요가하는 선생님​',
          id: '12223414'
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
        imgFiles: ['dummy/feed_image_02.png', 'dummy/feed_image_02.png']
      }
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
