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
          <router-link to="/chatbotRegistration" class="btn btn-blue">간편챗봇 메시지 등록</router-link>
        </div>
        <div class="top-ctrl-area">
          <div class="left-area">
            <div class="dropdown-search__wrap">
              <Dropdown :options="TitleOptions"/>
              <div class="search-area">
                <span class="input search-box">
                  <input type="text" placeholder="검색어를 입력하세요."/>
                  <ButtonCmp
                    type="btn-only-icon"
                    iconname='icon-search'
                  >
                  </ButtonCmp>
                </span>
              </div>
            </div>
          </div>
          <div class="right-area">
            <Dropdown :options="SortOptions"/>
            <Dropdown :options="NumberOptions" />
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
              <col width="14%">
            </colgroup>
            <thead>
              <tr>
                <th scope="col"><span>간편챗봇 메시지 이름</span></th>
                <th scope="col"><span>간편챗봇 메시지 ID</span></th>
                <th scope="col"><span>유형</span></th>
                <th scope="col"><span>카드 개수</span></th>
                <th scope="col"><span>상태</span></th>
                <th scope="col"><span>최종 수정일</span></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, i) in chatbotList" :key="i"
              >
                <td>
                  <div class="chat_title__wrap">
                    <div class="chat_title">
                      <router-link to="/chatbotView">{{ item.chatbotName }}</router-link>
                    </div>
                  </div>
                </td>
                <td>
                  {{ item.chatID }}
                </td>
                <td>
                  {{ item.chatType }}
                </td>
                <td>
                  {{ item.cardNum }}
                </td>
                <td>
                  {{ item.status }}
                </td>
                <td>
                  {{ item.date }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 등록된 대화방이 없을 경우 / top-ctrl-area 영역 같이 삭제 -->
        <!-- <div class="chatroom-none">
          <ul>
            <li>등록된 챗봇이 없습니다.</li>
            <li>챗봇을 등록하셔야 RBC의 다양한 기능을 사용할 수 있습니다.</li>
          </ul>
        </div> -->
        <PagingCmp />
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
      chatbotList: [
        {
          chatbotName: '회원가입 안내',
          chatID: 'SKDJSK3434',
          chatType: '말풍선',
          cardNum: '1개',
          status: '임시저장',
          date: '2023.08.26'
        },
        {
          chatbotName: '예약시스템',
          chatID: 'SKDJSK3434',
          chatType: '카드',
          cardNum: '2개',
          status: '저장',
          date: '2023.08.26'
        },
        {
          chatbotName: '간편챗봇 테스트 001',
          chatID: 'SKDJSK3434',
          chatType: '카드',
          cardNum: '2개',
          status: '저장',
          date: '2023.08.26'
        },
        {
          chatbotName: '회원가입 안내',
          chatID: 'SKDJSK3434',
          chatType: '말풍선',
          cardNum: '1개',
          status: '임시저장',
          date: '2023.08.26'
        },
        {
          chatbotName: '회원가입 안내',
          chatID: 'SKDJSK3434',
          chatType: '카드',
          cardNum: '4개',
          status: '임시저장',
          date: '2023.08.26'
        },
        {
          chatbotName: '회원가입 안내',
          chatID: 'SKDJSK3434',
          chatType: '말풍선',
          cardNum: '1개',
          status: '임시저장',
          date: '2023.08.26'
        },
        {
          chatbotName: '회원가입 안내',
          chatID: 'SKDJSK3434',
          chatType: '말풍선',
          cardNum: '1개',
          status: '임시저장',
          date: '2023.08.26'
        }
      ],
      TitleOptions: [
        {
          label: '전체',
          value: 'all'
        },
        {
          label: '간편챗봇 메시지 이름',
          value: 'chatbotName'
        },
        {
          label: '간편챗봇 메시지 ID',
          value: 'chatbotId'
        }
      ],
      SortOptions: [
        {
          label: '최신순',
          codeNm: 'newest'
        },
        {
          label: '이름순',
          codeNm: 'name'
        }
      ],
      NumberOptions: [
        {
          label: '10개씩',
          codeNm: '10'
        },
        {
          label: '20개씩',
          value: '20'
        },
        {
          label: '30개씩',
          value: '30'
        }
      ]
    }
  },
  methods: {
  }
}
</script>
