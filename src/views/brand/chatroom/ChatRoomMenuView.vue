<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="SYSTEM STUDIOS 대화방 메뉴" />
        <PageTitleH3 titleh3="대화방 정보" />
        <div class="chatroom__wrap--view">
          <div class="chatroom-menu__view">
            <div class="table__wrap">
              <table class="table table-bodyonly form-table">
                <colgroup>
                  <col width="196px"/>
                  <col />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row"><span class="form-item__label">사용 여부</span></th>
                    <td>
                      <div class="form-item__content">
                        <div class="form-item-row">
                          <div class="input-item">
                            <span class="text">{{ chatroomList[0].status }}</span>
                          </div>
                        </div>
                        <!-- 기획서 v1.0 수정(사용중지 인 경우 문구 사용 / 고객센터 클릭 시 1:1문의 화면으로 이동) -->
                        <!-- <p class="not-user-msg">
                          현재 해당 대화방은 일시중지 상태입니다.<br>
                          일시중지 상태를 해제하려면 <router-link to="#">고객센터</router-link>에 문의해주세요.
                        </p> -->
                        <!-- // 기획서 v1.0 수정(사용중지 인 경우 문구 사용 / 고객센터 클릭 시 1:1문의 화면으로 이동) -->
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">대화방 명</span></th>
                    <td>
                      <div class="form-item__content">
                        <div class="form-item-row">
                          <div class="input-item">
                            <span class="text">{{ chatroomList[0].chatRoomName }}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">발신번호/회신번호</span></th>
                    <td>
                      <div class="form-item__content">
                        <div class="form-item-row">
                          <div class="input-item">
                            <span class="text">{{ chatroomList[0].phoneNUm }}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">챗봇 ID</span></th>
                    <td>
                      <div class="form-item__content">
                        <div class="form-item-row">
                          <div class="input-item">
                            <span class="text">{{ chatroomList[0].chatID }}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="chatroom-munu__h3-wrap">
              <PageTitleH3 titleh3="대화방 메뉴" />
              <!-- 기획서 v1.0 수정(대화방 메뉴 복사 팝업 삭제 / v1.0 기준 p.30에서 삭제됨) -->
              <ButtonCmp
                type="btn-line"
                size="small"
                @click="copyChatRoom"
              >
                대화방 메뉴 복사
              </ButtonCmp>
            </div>
            <div class="table__wrap">
              <table class="table table-bodyonly form-table">
                <colgroup>
                  <col width="280px"/>
                  <col />
                </colgroup>
                <tbody>
                  <tr
                    v-for="(menu, index) in chatroomList[0].list"
                    :key="index"
                  >
                    <th scope="row"><span class="form-item__label">{{ menu.label }}</span></th>
                    <td>
                      <div class="form-item__content">
                        <ul class="chatroom-menu__list">
                          <li
                            v-for="(item, index) in menu.menuDetails"
                            :key="index"
                          >
                          {{ item.title }} <br v-if="item.sevice !== ''"> {{ item.sevice }}
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="chatroom-emulator sticky">
            <ChatEmulator
              :chatInfoData="chatInfoData"
              :chatMenuList="chatMenuData"
            />
          </div>
        </div>
        <!-- 기획서 v1.0 수정 (삭제 : 모달창 추가 / type 변경 , 저장-> 수정 문구변경, 수정: btn컴포넌트 -> router-link 변경 및 링크연결) -->
        <div class="button__wrap flex-end">
          <ButtonCmp
            type="btn-line"
            @click="modalRemove"
          >삭제</ButtonCmp>
          <router-link
            to="/ChatRoomMenuViewModified"
            class="btn btn-blue"
          >수정</router-link>
          <!-- // 기획서 v1.0 수정 (삭제 : 모달창 추가 , 저장: btn컴포넌트 -> router-link 변경 및 링크연결) -->

        </div>
      </div>
    </div>
    <!-- modal  -->
    <ModalView
      v-if="isModalViewed"
      @closeModal="isModalViewed = false"
    >
    <!-- 기획서 v1.0 수정(DublicationChatMenu 삭제 : 대화방 메뉴 복사 팝업 삭제 / v1.0 기준 p.30에서 삭제됨) -->
    <!-- 기획서 v1.0 수정 (삭제 버튼 선택 시, 대화방 메뉴 삭제 Alert 출력) -->
    <ConfirmMsg
      @closeModal="isModalViewed = false, isModalRemove = false"
      v-if="isModalRemove"
    >
      <div class="msg" slot="msg">
        대화방 메뉴를 삭제하시겠습니까?
      </div>
      <div class="button__wrap" slot="button">
        <ButtonCmp
          type="btn-line"
          @click="closeMsg"
          >
            아니요
          </ButtonCmp>
        <ButtonCmp
        type="btn-blue"
        @click="closeMsg"
        >
          예
        </ButtonCmp>
      </div>
    </ConfirmMsg>
    <!-- // 기획서 v1.0 수정 (삭제 버튼 선택 시, 대화방 메뉴 삭제 Alert 출력) -->
  </ModalView>
    <!-- modal  -->
  </div>
</template>

<script>

import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ChatEmulator from '@/views/brand/components/ChatEmulator.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/brand/create/components/ConfirmMsg.vue'

export default {
  components: {
    PageTitle,
    BrandLnb,
    ButtonCmp,
    PageTitleH3,
    ModalView,
    ChatEmulator,
    ConfirmMsg
  },
  data() {
    return {
      isModalViewed: false,
      isModalRemove: false, // 기획서 v1.0 수정
      // 기획서 v1.0 수정
      chatInfoData: {
        chatRoomName: 'SYSTEM STUDIOS',
        allowMsg: 'Y',
        hideInputFooter: false,
        chipButtons: true
      },
      chatroomList: [
        {
          chatRoomName: 'SYSTEMSTUDIO',
          phoneNUm: '010-5151-5151',
          chatID: 'bot-i7ke7f30e6c',
          status: '사용',
          saftyMark: 'Y',
          allowMsg: 'N',
          list: [
            {
              label: '🎀상담직원 연결👋', // 기획서 v1.0 수정
              value: '🎀상담직원 연결👋',
              menuDetails: [
                {
                  title: '전화연결',
                  sevice: '010-5151-5151'
                }
              ]
            },
            {
              label: '🍉나에게 맞는 상품은?🍓',
              value: '🍉나에게 맞는 상품은?🍓',
              menuDetails: [
                {
                  title: '간편 챗붓 연결',
                  sevice: 'SYSTEM STUDIO 간편 챗봇 1'
                }
              ]
            },
            {
              label: '🍉23FW 미리보기🍒',
              value: '🍉23FW 미리보기🍒',
              menuDetails: [
                {
                  title: '브랜드 소식 연결',
                  sevice: ''
                },
                {
                  title: '많이 찾는 FAQ 미리보기',
                  sevice: ''
                },
                {
                  title: 'BR.13L49F42Mo.28tF0K7EuV',
                  sevice: ''
                }
              ]
            }
          ]
        }
      ],
      chatMenuData: [{
        menuIndex: '1',
        menuTitle: '🎀상담직원 연결👋'
      },
      {
        menuIndex: '2',
        menuTitle: '🍉나에게 맞는 상품은?🍓'
      },
      {
        menuIndex: '3',
        menuTitle: '🍉23FW 미리보기🍒'
      }]
    }
  },
  methods: {
    closeMsg() {
      this.isModalViewed = false
      this.isModalRemove = false
    },
    modalRemove() {
      this.isModalViewed = true
      this.isModalRemove = true
    }
  }
}
</script>
