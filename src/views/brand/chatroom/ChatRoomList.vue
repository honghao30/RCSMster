<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <!-- 기획서 v1.0 수정(num 앞에 콜론 붙힘) -->
        <PageTitle pagetitle="대화방 목록" :num= "999" />
        <div class="top-notice--gray gray-btn">
          <ul>
            <li>- 대화방을 등록하면 고객에게 단방향 문자 발송 및 대행사 등록 후 챗봇 등을 활용한 실시간 응답이 가능합니다.</li>
            <li>- 발신번호로 생성한 대화방이 1개 이상 있는 경우, Bot ID로 대화방 등록이 가능합니다.</li>
          </ul>
          <!-- 230616 [a태그 + router-link태그] →  [router-link태그] 수정 -->
          <!-- 기획서 v1.0 수정(문구 수정 + 링크연결) -->
          <router-link to="/ChatRoomRegistration" class="btn btn-blue">대화방 등록</router-link>
        </div>
        <div class="top-ctrl-area">
          <div class="left-area">
            <!-- 기획서 v1.0 수정(추가된 내용에 대한 설명입니다. / 검색: 리스트가 10개 이하인 경우 노출 안 됨 : dropdown-search__wrap 클래스 삭제 시 안틀어짐) -->
            <div class="dropdown-search__wrap">
              <!-- 기획서 v1.0 수정(roomlist-dropdown 클래스 추가) -->
              <Dropdown :options="TitleOptions" class="w109"/>
              <!-- 230616 search-area 공통으로 인해 변경 -->
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
              <!-- // 230616 search-area 공통으로 인해 변경 -->
            </div>
            <!-- // 기획서 v1.0 수정(추가된 내용에 대한 설명입니다. / 검색: 리스트가 10개 이하인 경우 노출 안 됨 : dropdown-search__wrap 클래스 삭제 시 안틀어짐) -->
            <div class="roomlist-total-box">
              <span>총 <span class="roomlist-total-num">73</span>건</span>
            </div>
          </div>
          <!-- 기획서 v1.0 수정(placeholder 수정 + NumberOptions 삭제 + 클래스 추가) -->
          <div class="right-area">
            <Dropdown :options="RcsOptions" placeholder="사용여부"  class="w106"/>
            <Dropdown :options="SortOptions" placeholder="구분" class="w106"/>
            <Dropdown :options="NewOptions" placeholder="최신" class="w106"/>
          </div>
          <!-- // 기획서 v1.0 수정(NumberOptions 삭제) -->
        </div>
        <div class="table__wrap chatroom__table">
          <table class="table table-list">
            <colgroup>
              <!-- 기획서 v1.0 수정(col 삭제 + w값 수정) -->
              <col width="57px">
              <col width="323px">
              <col width="193px">
              <col width="133px">
              <col width="103px">
              <col width="103px">
              <col width="112px">
              <!-- // 기획서 v1.0 수정(col 삭제 + w값 수정) -->
            </colgroup>
            <thead>
              <tr>
                <th scope="col">
                  <span class="checkbox">
                    <input type="checkbox" id="all" @change="checkAll"/>
                    <label for="all"></label>
                  </span>
                </th>
                <!-- 기획서 v1.0 수정(문구 띄어쓰기) -->
                <th scope="col"><span>대화방 명</span></th>
                <th scope="col"><span>발신번호/챗봇 ID</span></th>
                <!-- 기획서 v1.0 수정(문구 수정) -->
                <th scope="col"><span>사용 여부</span></th>
                <th scope="col"><span>구분</span></th>
                <th scope="col"><span>대화방 메뉴</span></th>
                <!-- 기획서 v1.0 수정(문구 삭제 : 검색허용) -->
                <th scope="col"><span>상태</span></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, i) in chatRoomList" :key="i"
              >
                <td>
                  <span class="checkbox">
                    <!-- 기획서 v1.0 수정(disabled인 경우 : 검수중일 때 적용되도록 수정) -->
                    <input type="checkbox" :id="`item${i+1}`" :value="`item${i+1}`" v-model="checkList" :disabled="item.statusText==='검수중'">
                    <label :for="`item${i+1}`"></label>
                  </span>
                </td>
                <td>
                  <div class="chat_title__wrap">
                    <div class="chat_title">
                    <span class="large" v-if="item.large">대량</span>
                    {{ item.chatTitle }}
                    </div>
                    <!-- 기획서 v1.0 수정(chat_title-sub 클래스 삭제 및 위치 변경) -->
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
                  <!-- 기획서 v1.0 수정(flag-progress 클래스 삭제 + 수정작업 + chat_title-sub 클래스 삭제 및 위치 변경) -->
                  <div class="chat-status">
                    <span
                      :class="{'reject':item.statusText==='반려'}"
                    >
                      {{ item.statusText }}
                    </span>
                    <div class="chat_title-sub">
                        <span v-if="item.statusText === '임시저장'" class="temporary-date">{{ item.date }}</span>
                    </div>
                    </div>
                    <!-- // 기획서 v1.0 수정(flag-progress 클래스 삭제 + 수정작업 + chat_title-sub 클래스 삭제 및 위치 변경) -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 기획서 v1.0 수정(history-btn 이중클래스 추가 + 버튼 타입 btn-blue-line 으로 수정 + 삭제 클릭 시 모달창) -->
        <div class="button__wrap history-btn" v-if="checkList.length > 0">
          <!-- 대화방 미사용 : '승인완료' 상태인 경우만 미 사용 설정 가능 / 승인완료되지 않은 대화방 선택 시 버튼 비활성화 -->
          <ButtonCmp
            type="btn-blue-line"
            @click="notUseModal"
          >미사용</ButtonCmp>
          <!-- 선택 시, 사용/미사용 상태 상관 없이 체크박스 활성화된 모든 대화방 사용 처리 / RCS 메시지 발송 : 사용 처리 -->
          <ButtonCmp
            type="btn-blue-line"
          >사용</ButtonCmp>
          <!-- 선택 시, 사용/미사용 상태 상관 없이 체크박스 활성화된 모든 대화방 삭제 Alert 출력 -->
          <ButtonCmp
            type="btn-blue-line"
            @click="removeListModal"
          >삭제</ButtonCmp>
        </div>
        <!-- // 기획서 v1.0 수정(history-btn 이중클래스 추가  + 버튼 타입 btn-blue-line 으로 수정 + 삭제 클릭 시 모달창) -->
        <PagingCmp />
        <!-- 기획서 v1.0 수정(등록된 대화방이 없을 경우 : 사용 시 brand-info__wrap 클래스는 있어야함) -->
        <div class="chatroom-none">
          <PageTitle pagetitle="대화방 목록" :num= "0" />
          <div class="chatroom-none-txt">
            <h3>등록된 대화방이 없습니다.</h3>
            <p>
              대화방은 메시지앱에서 발신번호 단위로 문자가 수신되는 메시지함을 의미하며<br>
              대화방을 등록해야 RCS 메시지를 전송할 수 있습니다. 발신번호 1개당 1개의 대화방을 생성할 수 있습니다.<br>
              발신번호의 통신사실증명원 사본을 준비하신 후 대화방을 생성해주세요.<br>
              RBC의 다양한 기능을 통해 브랜드를 홍보하세요.
            </p>
            <div class="button__wrap">
              <router-link to="/ChatRoomRegistration" class="btn btn-blue">대화방 등록하기</router-link>
            </div>
          </div>
        </div>
        <!-- // 기획서 v1.0 수정(등록된 대화방이 없을 경우  수정: 사용 시 brand-info__wrap 클래스는 있어야함) -->
      </div>
    </div>
    <!-- 기획서 v1.0 수정(모달 추가 작업) -->
    <!-- 모달 -->
    <ModalView
      v-if="isModalViewed"
      @closeModal="isModalViewed = false"
    >
      <!-- 미사용 버튼 선택 시, 회신번호(챗봇 ID)대화방일 경우 / 발신번호 대화방(발신번호를 회신번호로사용하는 대화방이 없는 경우 + 사용중인 마지막 대화방 경우)-->
      <ConfirmMsg
        @closeModal="isModalViewed = false, isNotUse = false"
        v-if="isNotUse"
      >
        <div class="msg" slot="msg">
          대화방 미사용 시 해당 대화방은<br>
          비전시 처리되며, 비전시 상태가<br>
          30일 이상 유지될 경우<br>
          자동으로 삭제됩니다.
        </div>
        <div class="button__wrap" slot="button">
          <ButtonCmp
          type="btn-line"
          @click="closeMsg"
          >
            취소
          </ButtonCmp>
          <ButtonCmp
          type="btn-blue"
          @click="closeMsg"
          >
            확인
          </ButtonCmp>
        </div>
      </ConfirmMsg>
      <!-- // 미사용 버튼 선택 시, 회신번호(챗봇 ID)대화방일 경우 / 발신번호 대화방(발신번호를 회신번호로사용하는 대화방이 없는 경우 + 사용중인 마지막 대화방 경우)-->
      <!-- 삭제 버튼 선택 시, 사용/미사용 상태 상관 없이 체크박스 활성화된 모든 대화방 삭제 Alert 출력 -->
      <ConfirmMsg
        @closeModal="isModalViewed = false, isRemoveList = false"
        v-if="isRemoveList"
      >
        <div class="msg" slot="msg">
          선택한 대화방을 삭제하시겠습니까?
        </div>
        <div class="button__wrap" slot="button">
          <!-- 취소 선택 시, 체크박스 선택된 상태로 alert 종료 -->
          <ButtonCmp
          type="btn-line"
          @click="closeMsg"
          >
            취소
          </ButtonCmp>
          <!-- 삭제 선택 시, 체크박스 활성화된 대화방 삭제 처리 -->
          <ButtonCmp
          type="btn-blue"
          @click="closeMsg"
          >
            삭제
          </ButtonCmp>
        </div>
      </ConfirmMsg>
      <!-- // 삭제 버튼 선택 시, 사용/미사용 상태 상관 없이 체크박스 활성화된 모든 대화방 삭제 Alert 출력 -->
    </ModalView>
    <!-- 모달 -->
    <!-- // 기획서 v1.0 수정(모달 추가 작업) -->
  </div>
</template>

<script>

import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import PagingCmp from '@/components/common/PagingCmp.vue'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/brand/create/components/ConfirmMsg.vue'

export default {
  components: {
    PageTitle,
    BrandLnb,
    ButtonCmp,
    Dropdown,
    PagingCmp,
    ModalView,
    ConfirmMsg
  },
  data() {
    return {
      isAllChecked: false,
      checkList: [],
      large: false,
      disabled: false,
      isOpen: false,
      // 기획서 v1.0 수정(chatSearch 삭제 + chatSort: 챗봇연결에서 양방향 으로 변경 + status 삭제)
      chatRoomList: [
        {
          large: true,
          chatTitle: 'TOMMY JEANS 외 69건',
          chatID: '023352286 외 99개',
          chatRcs: false,
          chatSort: 'MO',
          chatMenu: true,
          statusText: '반려'
        },
        {
          chatTitle: '롯데홈쇼핑롯데홈쇼핑롯데홈쇼핑롯데홈쇼핑롯데홈쇼핑롯데홈쇼핑롯데홈쇼핑롯데홈쇼핑롯데홈쇼핑롯데홈쇼핑',
          chatID: '023352286',
          chatRcs: true,
          chatSort: 'MO',
          chatMenu: true,
          statusText: '승인완료'
        },
        {
          chatTitle: 'SYSTEM HOMME',
          chatID: 'bot-i7ke7f30e6b',
          chatRcs: true,
          chatSort: '양방향',
          chatMenu: true,
          statusText: '승인완료'
        },
        {
          chatTitle: 'LANVIN COLLECTION',
          chatID: 'bot-i7ke7f30e6b',
          chatRcs: false,
          chatSort: '',
          chatMenu: false,
          statusText: '임시저장',
          date: '삭제 D-7'
        },
        {
          chatTitle: '더 캐시미어',
          chatID: '023352286',
          chatRcs: true,
          chatSort: 'MO',
          chatMenu: true,
          statusText: '승인대기'
        },
        {
          disabled: true,
          chatTitle: '타미힐피거',
          chatID: 'bot-i7ke7f30e6b',
          chatRcs: true,
          chatSort: 'MO',
          chatMenu: false,
          statusText: '검수중'
        },
        {
          chatTitle: '클럽모나코',
          chatID: 'bot-i7ke7f30e6b',
          chatRcs: true,
          chatSort: '챗봇 연결',
          chatMenu: false,
          statusText: '반려'
        }
      ],
      // 기획서 v1.0 수정
      TitleOptions: [
        {
          label: '전체',
          value: 'total'
        },
        {
          label: '대화방 명',
          value: 'chatroom'
        },
        {
          label: '발신번호/챗봇 ID',
          value: 'chatbot'
        }
      ],
      // 기획서 v1.0 수정
      RcsOptions: [
        {
          label: '전체',
          value: 'total'
        },
        {
          label: '사용',
          value: 'use'
        },
        {
          label: '미사용',
          value: 'notuse'
        }
      ],
      // 기획서 v1.0 수정
      SortOptions: [
        {
          label: '전체',
          value: 'total'
        },
        {
          label: 'MO',
          value: 'mo'
        },
        {
          label: '기본',
          value: 'basic'
        },
        {
          label: '챗봇연결',
          value: 'chatconnect'
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
      // 기획서 v1.0 수정
      isModalViewed: false,
      isRemoveList: false,
      isNotUse: false
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
    },
    // 기획서 v1.0 수정
    closeMsg () {
      this.isModalViewed = false
      this.isRemoveList = false
      this.isNotUse = false
    },
    // 기획서 v1.0 수정
    removeListModal () {
      this.isModalViewed = true
      this.isRemoveList = true
    },
    notUseModal () {
      this.isModalViewed = true
      this.isNotUse = true
    }
  }
}
</script>
