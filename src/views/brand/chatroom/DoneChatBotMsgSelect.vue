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
        <!-- 기획서 v1.0 수정 (v-if/ v-else 수정) -->
        <div class="empty-emulator" v-if="radiochk.length === 0">
          <p>브랜드 소식을 선택해주세요.</p>
        </div>
        <!-- 간편챗봇 컴포넌트 완성되면 연결해야함 임시로 피드에뮬레이터 컴포넌트 사용함 -->
        <ChatEmulator
          v-else
          :chatInfoData="chatInfoData"
          :chatMsgData ="chatMsgData"
        />
        <!-- // 기획서 v1.0 수정 (v-if, v-else 수정) -->
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
import ChatEmulator from '@/views/brand/components/ChatEmulator.vue'
import PagingCmp from '@/components/common/PagingCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'

export default {
  components: {
    ButtonCmp,
    ChatEmulator,
    PagingCmp,
    Dropdown
  },
  data() {
    return {
      isAllChecked: false,
      radiochk: [],
      // 기획서 v1.0 수정(이미지형 -> 캐로셀형 으로 문구수정)
      chatbotMsgList: [
        {
          name: '상담 직원 연결',
          id: 'ARMs5STz7Akth2L',
          type: '카드형'
        },
        {
          name: '나에게 맞는 상품 찾기',
          id: 'ARMbv6mWh020A4t',
          type: '캐로셀형'
        },
        {
          name: '나에게 맞는 상품 찾기',
          id: 'ARMbv6mWh020A4t',
          type: '캐로셀형'
        },
        {
          name: '나에게 맞는 상품 찾기',
          id: 'ARMbv6mWh020A4t',
          type: '캐로셀형'
        },
        {
          name: '나에게 맞는 상품 찾기',
          id: 'ARMbv6mWh020A4t',
          type: '카드형'
        },
        {
          name: '나에게 맞는 상품 찾기',
          id: 'ARMbv6mWh020A4t',
          type: '캐로셀형'
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
          type: '캐로셀형'
        }
      ],
      sortOptions: [
        {
          label: '최신순',
          value: 'latest'
        },
        {
          label: '이름순',
          value: 'name'
        }
      ],
      chatInfoData: {
        chatRoomName: '네스프레소',
        allowMsg: 'N',
        saftyMark: 'Y',
        hideInputFooter: true,
        // 기획서 v1.0 수정 (chatType 삭제)
        mode: 'registration' // 기획서 v1.0 수정
      },
      chatMsgData: {
        chatType: 'card',
        // 기획서 v1.0 수정 (imgSize, chatCardTitle, chatCardContent 삭제)
        chipButtons: [{
          btnName: '🎀 상담직원연결 👋​'
        },
        {
          btnName: '🍉나에게 맞​는 상품은?🍓​'
        }],
        // 기획서 v1.0 수정 (msgData -> msgCardData 수정)
        msgCardData: [{
          index: 1,
          imgSize: 'medium', // 기획서 v1.0 수정
          imgFile: 'dummy/template_image_02.png', // 기획서 v1.0 수정(이미지 수정)
          title: 'SYSTEM STUDIOS',
          cardContent: '5만원 이상 첫 구매 후 응모 시 L Point <br>3천 P 지급합니다.',
          btnUse: 'Y',
          // 기획서 v1.0 수정 (btnDirection 삭제)
          buttons: [{
            btnName: '주소찾기'
          }]
        }]
      }
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
