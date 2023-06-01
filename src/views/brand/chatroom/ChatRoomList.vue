<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="대화방 목록" num="999" />
        <div class="top-notice--gray gray-btn">
          <ul>
            <li>- 대화방을 등록하면 고객에게 단방향 문자 발송 및 대행사 등록 후 챗봇 등을 활용한 실시간 응답이 가능합니다.</li>
            <li>- 발신번호로 생성한 대화방이 1개 이상 있는 경우, Bot ID로 대화방 등록이 가능합니다.</li>
          </ul>
          <a class="btn btn-blue"><router-link to="">대화방 등록하기</router-link></a>
        </div>
        <div class="top-ctrl-area">
          <div class="left-area">
            <Dropdown :options="TitleOptions" />
            <div class="search-area">
              <span class="input">
                <input type="text" placeholder="브랜드명을 입력하세요."/>
              </span>
              <ButtonCmp
                type="btn-search"
              >검색</ButtonCmp>
            </div>
          </div>
          <div class="right-area">
            <Dropdown :options="RcsOptions" />
            <Dropdown :options="SortOptions" />
            <Dropdown :options="NewOptions" />
            <Dropdown :options="NumberOptions" />
            <div class="pager">
              <span class="num">1/3</span>
              <a role="button" class="btn-prev" ><span class="blind">이전으로</span></a>
              <a role="button" class="btn-next" ><span class="blind">다음으로</span></a>
            </div>
          </div>
        </div>
        <div class="table__wrap chatroom__table">
          <table class="table table-list">
            <colgroup>
              <col width="5%">
              <col width="26%">
              <col width="16%">
              <col width="13%">
              <col width="10%">
              <col width="10%">
              <col width="10%">
              <col width="10%">
            </colgroup>
            <thead>
              <tr>
                <th scope="col">
                  <span class="checkbox">
                    <input type="checkbox" id="all" @change="checkAll"/>
                    <label for="all"></label>
                  </span>
                </th>
                <th scope="col"><span>대화방명</span></th>
                <th scope="col"><span>발신번호/챗봇 ID</span></th>
                <th scope="col"><span>RCS 메시지 발송</span></th>
                <th scope="col"><span>구분</span></th>
                <th scope="col"><span>대화방 메뉴</span></th>
                <th scope="col"><span>검색 허용</span></th>
                <th scope="col"><span>상태</span></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, i) in chatRoomList" :key="i"
              >
                <td>
                  <span class="checkbox">
                    <input type="checkbox" :id="`item${i+1}`" :value="`item${i+1}`" v-model="checkList" :disabled="item.disabled">
                    <label :for="`item${i+1}`"></label>
                  </span>
                </td>
                <td>
                  <div class="chat_title">
                    <span class="large" v-if="item.large">대량</span>
                    {{ item.chatTitle }}
                  </div>
                </td>
                <td>
                  {{ item.chatID }}
                </td>
                <td>
                  <span v-if="item.rcs">미사용</span>
                  <span v-if="!item.rcs">사용</span>
                </td>
                <td>
                  {{ item.chatSort }}
                </td>
                <td>
                  <span v-if="item.chatMenu">O</span>
                  <span v-if="!item.chatMenu">X</span>
                </td>
                <td>
                  <span v-if="item.chatSearch">O</span>
                  <span v-if="!item.chatSearch">X</span>
                </td>
                <td>
                  <div class="chat-status">
                    <span class="flag-progress"
                      :class="item.status"
                    >
                      {{ item.statusText }}
                    </span>
                    <span v-if="item.statusText === '임시저장'" class="temporary-date">{{ item.date }}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="button__wrap" v-if="checkList.length > 0">
          <ButtonCmp
            type="btn-line"
          >미사용</ButtonCmp>
          <ButtonCmp
            type="btn-line"
          >사용</ButtonCmp>
          <ButtonCmp
            type="btn-line"
          >삭제</ButtonCmp>
        </div>
        <!-- 등록된 대화방이 없을 경우 / top-ctrl-area 영역 같이 삭제 -->
        <div class="chatroom-none">
          <ul>
            <li>등록된 대화방이 없습니다.</li>
            <li>대화방을 등록하셔야 RBC의 다양한 기능을 사용할 수 있습니다.</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'

export default {
  components: {
    PageTitle,
    BrandLnb,
    ButtonCmp,
    Dropdown
  },
  data() {
    return {
      isAllChecked: false,
      checkList: [],
      large: false,
      disabled: false,
      chatRoomList: [
        {
          large: true,
          chatTitle: 'TOMMY JEANS 외 69건',
          chatID: '023352286 외 99개',
          chatRcs: false,
          chatSort: 'MO',
          chatMenu: true,
          chatSearch: true,
          status: 'reject',
          statusText: '반려'
        },
        {
          chatTitle: '롯데홈쇼핑',
          chatID: '023352286',
          chatRcs: true,
          chatSort: 'MO',
          chatMenu: true,
          chatSearch: true,
          status: 'done',
          statusText: '승인완료'
        },
        {
          chatTitle: 'SYSTEM HOMME',
          chatID: 'bot-i7ke7f30e6b',
          chatRcs: true,
          chatSort: '챗봇연결',
          chatMenu: true,
          chatSearch: true,
          status: 'done',
          statusText: '승인완료'
        },
        {
          chatTitle: 'LANVIN COLLECTION',
          chatID: 'bot-i7ke7f30e6b',
          chatRcs: false,
          chatSort: '',
          chatMenu: false,
          chatSearch: false,
          status: 'temporary',
          statusText: '임시저장',
          date: '삭제 D-7'
        },
        {
          chatTitle: '더 캐시미어',
          chatID: '023352286',
          chatRcs: true,
          chatSort: 'MO',
          chatMenu: true,
          chatSearch: true,
          status: 'wait',
          statusText: '승인대기'
        },
        {
          disabled: true,
          chatTitle: '타미힐피거',
          chatID: 'bot-i7ke7f30e6b',
          chatRcs: true,
          chatSort: 'MO',
          chatMenu: false,
          chatSearch: false,
          status: 'ing',
          statusText: '검수중'
        },
        {
          chatTitle: '클럽모나코',
          chatID: 'bot-i7ke7f30e6b',
          chatRcs: true,
          chatSort: '챗봇 연결',
          chatMenu: false,
          chatSearch: false,
          status: 'reject',
          statusText: '반려'
        }
      ],
      TitleOptions: [
        {
          label: '대화방 명',
          value: 'chatroom'
        },
        {
          label: '챗봇 ID',
          value: 'chatbot'
        }
      ],
      RcsOptions: [
        {
          label: '대화방 명',
          value: 'chatroom'
        },
        {
          label: '챗봇 ID',
          value: 'chatbot'
        }
      ],
      SortOptions: [
        {
          label: '사용',
          value: 'use'
        },
        {
          label: '미사용',
          value: 'notuse'
        }
      ],
      NewOptions: [
        {
          label: '최신순',
          value: 'new'
        },
        {
          label: '이름순',
          value: 'name'
        }
      ],
      NumberOptions: [
        {
          label: '10개씩',
          value: '10'
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
    checkAll() {
      if (!this.isAllChecked) {
        this.checkList = []
        for (let j = 0; j < this.chatRoomList.length; j++) {
          let num = j + 1
          if (!this.chatRoomList[j].disabled) {
            this.checkList.push(`item${num}`)
          }
        }
        this.isAllChecked = true
      } else { // 선택해제
        this.checkList = []
        this.isAllChecked = false
      }
    }
  }
}
</script>
