<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="간편챗봇 메시지 상세" />
        <div class="chatroom__wrap--view">
          <div class="chatroom-menu__view">
            <div class="table__wrap">
              <table class="table table-bodyonly">
                <colgroup>
                  <col width="196px"/>
                  <col />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row"><span class="form-item__label">상태</span></th>
                    <td>
                      <div class="form-item__content">
                        <span class="text">임시저장</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">유형</span></th>
                    <td>
                      <span class="text">말풍선</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">간편챗봇 이름</span></th>
                    <td>
                      <span class="text">응답메시지_챗봇_002</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">간편챗봇 ID</span></th>
                    <td>
                      <span class="text">간편챗봇 메시지 저장 후 아이디가 노출됩니다.</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">메시지 복사</span></th>
                    <td>
                      <span class="text">불가능</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="table__wrap">
              <table class="table table-bodyonly">
                <colgroup>
                  <col width="196px"/>
                  <col />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row"><span class="form-item__label">작성자</span></th>
                    <td>
                      <span class="text">홍*동</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">작성일</span></th>
                    <td>
                      <span class="text">2023.05.26 10:12</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">수정자</span></th>
                    <td>
                      <span class="text">박*동</span>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">수정일</span></th>
                    <td>
                      <span class="text">2023.07.12 15:12</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- 기획서 v1.0 수정 -- 대화방 목록 추가 -->
            <div class="table__wrap chatroom__table">
              <table class="table table-list">
                <colgroup>
                  <col width="40%">
                  <col width="30%">
                  <col width="30%">
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col"><span>대화방 명</span></th>
                    <th scope="col"><span>발신번호/챗붓 ID</span></th>
                    <th scope="col"><span>간편챗붓 메시지</span></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, i) in 10" :key="i"
                  >
                    <td>
                      <div class="chat_title__wrap">
                        <div class="chat_title">
                          <router-link to="/chatbotView" class="link">롯데 홈쇼핑 {{ item }}</router-link>
                        </div>
                      </div>
                    </td>
                    <td>
                      22555448 {{ item }}
                    </td>
                    <td>
                      연결됨 {{ item }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- // 기획서 v1.0 수정 -- 대화방 목록 추가 -->
          </div>
          <div class="chatroom-emulator sticky">
            <ChatEmulator
              :chatInfoData="chatroomList[0]"
              :chatMenuList="chatroomList[0].list"
              :chatMsgData="chatroomList[0].chatMsgData"
            />
          </div>
        </div>
        <div class="button__wrap space-between">
          <div class="left">
            <router-link
              class="btn-line btn"
              to="/chatbotList"
            >이전</router-link>
          </div>
          <div class="right">
            <ButtonCmp
                type="btn-line"
                @click="openDeleteMsg"
            >삭제</ButtonCmp>
            <ButtonCmp
                type="btn-blue"
            >수정</ButtonCmp>
          </div>
        </div>
      </div>
    </div>
    <ModalView
      v-if="isModalViewed"
      @closeModal="isModalViewed = false"
    >
      <ConfirmMsg
        v-if="isChabotDeleteMsg"
        @closeModal="isModalViewed = false"
      >
        <div class="msg" slot="msg">
          연결된 간편챗봇 연결이 모두 삭제됩니다. <br>
          간편챗봇을 삭제 하시겠습니까?
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
    </ModalView>
  </div>
</template>

<script>

import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ChatEmulator from '@/views/brand/components/ChatEmulator.vue'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/join/components/ConfirmMsg.vue'
export default {
  components: {
    PageTitle,
    BrandLnb,
    ButtonCmp,
    ChatEmulator,
    ModalView,
    ConfirmMsg
  },
  data() {
    return {
      isModalViewed: false,
      isChabotDeleteMsg: false,
      chatroomList: [
        {
          chatRoomName: 'SYSTEMSTUDIO',
          phoneNUm: '010-5151-5151',
          chatID: 'bot-i7ke7f30e6c',
          status: '사용',
          saftyMark: 'Y',
          allowMsg: 'N',
          chatMsgData: {
            chatType: 'chatBubble',
            chatbotMsgName: '대화방 명',
            bubbleContent: '[신한카드] 10번마다 캐시백 이용내역 7회 <br>* 실제 결제 횟수와 다를 수 있음​<br> 카카오뱅크 신한카드 이용횟수 확인​',
            chipButtons: [{
              btnName: '🎀 상담직원연결 👋​'
            },
            {
              btnName: '질문하기​'
            }]
          },
          list: [
            {
              label: '자주 묻는 질문✋',
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
      ]
    }
  },
  methods: {
    copyChatRoom () {
      this.isModalViewed = true
    },
    openDeleteMsg() {
      this.isModalViewed = true
      this.isChabotDeleteMsg = true
    },
    closeMsg () {
      this.isModalViewed = false
      this.isChabotDeleteMsg = false
    }
  }
}
</script>
