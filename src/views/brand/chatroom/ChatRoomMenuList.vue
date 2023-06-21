<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="대화방 메뉴 목록" num="989" />
        <!-- 등록된 대화방 없을때 -->
        <div class="brand-info__wrap" v-if="chatroomList === ''">
          <div class="registration__complete">
            <p>등록된 대화방이 없습니다.<br />
            대화방을 등록하셔야 RBC의 다양한 기능을 사용하실 수 있습니다.</p>
          </div>
          <div class="button__wrap">
            <router-link
              to=""
              class="btn btn-blue"
            >대화방 등록하기</router-link>
          </div>
        </div>
        <!-- //등록된 대화방 없을때 -->
        <div class="top-notice--gray gray-btn">
          <ul>
            <li>- 대화방 메뉴는 사용자의 요청에 대해 기업에서 실시간으로 응답할 수 있는 대화방입니다.</li>
          </ul>
          <!-- 230616 [a태그 + router-link태그] →  [router-link태그] 수정 -->
          <router-link to="" class="btn btn-blue">대화방 메뉴 등록</router-link>
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
            <ButtonCmp
              type="btn-line"
              size="medium"
              class="wid-auto"
            >
              대화방 메뉴 목록 엑셀 다운로드
            </ButtonCmp>
            <Dropdown :options="SortOptions" placeholder="최신순"/>
            <Dropdown :options="ViewOptions" placeholder="10개"/>
          </div>
        </div>
        <div class="table__wrap notice-table">
          <table class="table table-list">
            <colgroup>
              <col width="56px">
              <col>
              <col width="232">
              <col width="232">
              <col width="80">
              <col>
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
                <th scope="col"><span>발신번호/회신번호</span></th>
                <th scope="col"><span>챗붓 ID</span></th>
                <th scope="col" colspan="2"><span>대화방 메뉴 사용</span></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, i) in chatroomList" :key="i"
              >
                <td>
                  <span class="checkbox">
                    <input type="checkbox" :id="`item${i+1}`" :value="`item${i+1}`" v-model="checkList">
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
                <td class="chatroom-list-left">
                  <Dropdown v-if="item.status !== '미사용'" :options=chatroomList[i].list />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="button__wrap" v-if="checkList.length > 0">
          <ButtonCmp
            type="btn-line"
            @click="activeChatRoom"
          >사용</ButtonCmp>
          <ButtonCmp
            type="btn-line"
            @click="disableChatRoom"
          >미사용</ButtonCmp>
          <ButtonCmp
            type="btn-line"
            @click="removeConfirmMsg"
          >삭제</ButtonCmp>
        </div>
        <PagingCmp />
      </div>
    </div>
    <!-- // 모달 영역 -->
    <ModalView
      v-if="isModalViewed" @closeModal="isModalViewed = false">
      <ConfirmMsg
        @closeModal="isModalViewed = false"
      >
        <div slot="msg">
          <div class="msg">
            선택한 대화방을 삭제하시겠습니까?
          </div>
        </div>
        <div class="button__wrap" slot="button">
          <ButtonCmp
            type="btn-blue-line"
            @click="closeMsg"
          >아니요
          </ButtonCmp>
          <ButtonCmp
          type="btn-blue"
          @click="removeChatRoom"
          >
           예
          </ButtonCmp>
        </div>
      </ConfirmMsg>
    </ModalView>
    <!-- // 모달 뷰     -->
  </div>
</template>

<script>

import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import PagingCmp from '@/components/common/PagingCmp.vue'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/join/components/ConfirmMsg.vue'
import chatroomList from '@/views/brand/chatroom/chatRoomDb.js'

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
      isModalViewed: false,
      checkList: [],
      chatroomList: chatroomList,
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
      ViewOptions: [
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
      ],
      SortOptions: [
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
    activeChatRoom () {
      this.checkList.forEach((checkedItem) => {
        const index = parseInt(checkedItem.slice(-1)) - 1
        this.chatroomList[index].status = '사용'
      })
      this.checkList = []
    },
    disableChatRoom () {
      this.checkList.forEach((checkedItem) => {
        const index = parseInt(checkedItem.slice(-1)) - 1
        this.chatroomList[index].status = '미사용'
      })
      this.checkList = []
    },
    closeMsg () {
      this.isModalViewed = false
    },
    removeConfirmMsg () {
      this.isModalViewed = true
    },
    removeChatRoom () {
      this.chatroomList = this.chatroomList.filter((item, i) => !this.checkList.includes(`item${i + 1}`))
      this.checkList = []
    },
    checkAll() {
      if (!this.isAllChecked) {
        this.checkList = []
        for (let j = 0; j < this.chatroomList.length; j++) {
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
