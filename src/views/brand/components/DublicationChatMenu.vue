<template>
  <div
    class="modal__content--inner zipcode__modal dublicate-chatroom"
  >
    <div class="modal__content--header">
      <p class="modal-title">대화방 메뉴복사</p>
    </div>
    <!-- case01.기존 회원 운영권한 초대 팝업 -->
    <div class="modal__content--body">
      <div class="top-notice--gray gray-btn">
        <ul>
           <li>- 대화방 메뉴를 등록할 대화방을 선택해주세요.</li>
           <li>- 대화방 메뉴 정보가 자동으로 입력됩니다.</li>
        </ul>
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
      </div>
      <div class="table__wrap notice-table">
        <table class="table table-list">
          <colgroup>
            <col width="56px">
            <col>
            <col width="232">
            <col width="232">
            <col width="">
          </colgroup>
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col"><span>대화방명</span></th>
              <th scope="col"><span>발신번호/회신번호</span></th>
              <th scope="col"><span>챗붓 ID</span></th>
              <th scope="col"><span>대화방 메뉴 사용</span></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(item, i) in chatroomList" :key="i"
            >
              <td>
                <span class="radio">
                  <input type="radio" :id="`item${i+1}`" name="chatroom" :value="`item${i+1}`" v-model="checkList">
                  <label :for="`item${i+1}`"></label>
                </span>
              </td>
              <td>
                {{ item.chatTitle }}
              </td>
              <td>
                {{ item.phoneNUm }}
              </td>
              <td>
                {{ item.chatID }}
              </td>
              <td>
                {{ item.status }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="modal__content--footer">
      <div class="button__wrap">
        <ButtonCmp
          type="btn-blue-line"
          @click="$emit('closeModal')"
        >닫기</ButtonCmp>
        <ButtonCmp
          type="btn-blue"
          @click="$emit('closeModal')"
          :disabled="this.checkList.length < 1"
        >대화방 메뉴 복사</ButtonCmp>
      </div>
    </div>
    <PagingCmp />
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import PagingCmp from '@/components/common/PagingCmp.vue'
import chatroomList from '@/views/brand/chatroom/chatRoomDb.js'

export default {
  components: {
    ButtonCmp,
    Dropdown,
    PagingCmp
  },
  data() {
    return {
      isAllChecked: false,
      checkList: [],
      chatroomList,
      isBtnDisabled: true,
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
      dropdownOptions: [
        {
          label: '이름',
          value: 'name'
        },
        {
          label: '이메일',
          value: 'mail'
        }
      ],
      inviteData: [
        {
          name: '김**',
          mail: 'abcde@studio.com'
        },
        {
          name: '최**',
          mail: 'Fghhii123@studio.com'
        },
        {
          name: '오**',
          mail: 'KLMN00@studio.com'
        },
        {
          name: '장**',
          mail: 'momo@studio.com'
        },
        {
          name: '김**',
          mail: 'ingingMM@studio.com'
        },
        {
          name: '김**',
          mail: 'opQrsT@studio.com'
        },
        {
          name: '홍**',
          mail: 'hohyeonghojae@studio.com'
        }
      ]
    }
  },
  methods: {
    checkAll() {
      if (!this.isAllChecked) {
        this.checkList = []
        for (let j = 0; j < this.inviteData.length; j++) {
          let num = j + 1
          this.checkList.push(`item${num}`)
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

<style>
</style>
