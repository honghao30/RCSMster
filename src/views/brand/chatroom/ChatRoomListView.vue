<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <div class="chatroom-modify__title">
          <div class="chatroom-modify__title-use">
            <span class="flag-progress done">사용</span>
            <PageTitle pagetitle="SYSTEM STUDIOS 대화방" />
          </div>
        </div>
        <div class="top-progress-area">
          <span class="flag-progress done">승인완료</span>
          <span class="flag-progress">미사용</span>
          <span class="flag-progress">임시저장</span>
          <span class="flag-progress">승인대기</span>
          <span class="flag-progress ing">검수중</span>
          <span class="flag-progress reject">반려</span>
          <p class="date">최종변경 : 2023. 04. 11</p>
          <p class="reject-text">반려사유 : 위법/부적절성 메시지 </p>
        </div>
        <div class="chatroom__wrap view-box">
          <div class="chatroom-registration">
            <form  ref="form" :model="form">
              <div class="table__wrap">
                <table class="table table-bodyonly form-table">
                  <colgroup>
                    <col width="196px"/>
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row"><span class="form-item__label">대화방 명</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <span class="text">SYSTEM STUDIOS</span>
                              <ButtonCmp
                                type="btn-line"
                                size="small"
                                @click="chatroomCopy"
                              >대화방 복사</ButtonCmp>
                              <span class="flag-progress">승인필요</span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><span class="form-item__label">발신번호</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <span class="text">010-5151-5151</span>
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
                              <span class="text">010-5151-5151</span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><span class="form-item__label">통신서비스<br>가입증명원</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <a class="text" href="" download>통신서비스가입증명원.pdf</a>
                              <span class="flag-progress">승인필요</span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><span class="form-item__label">대행사 연결</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <span class="text">사용</span>
                            </div>
                            <!-- 대행사 연결 : 사용 시 inner__input-box 사용 -->
                            <div class="inner__input">
                              <div class="inner__input-box">
                                <span class="form-item__label">연결 대행사</span>
                                <div class="inner__input-item">
                                  <ul class="input">
                                    <li>비즈뿌리오</li>
                                    <li>https://chatbot.com/autolink/001</li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                            <!-- //대행사 연결 : 사용 시 inner__input-box 사용 -->
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><span class="form-item__label">검색허용</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <span class="text">사용</span>
                            </div>
                            <!-- 검색허용 : 사용 시 inner__input 사용 -->
                            <div class="inner__input">
                              <div class="inner__input-box">
                                <span class="form-item__label">소개글</span>
                                <div class="inner__input-item">
                                  <p class="input">모던함과 세련된 터치가 돋보이는 SYSTEM STUDIOS</p>
                                </div>
                              </div>
                            </div>
                            <!-- //검색허용 : 사용 시 inner__input 사용 -->
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><span class="form-item__label">메시지 입력</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <span class="text">입력 가능</span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><span class="form-item__label">대표번호<br>문자수신 서비스</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <span class="text">미사용</span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><span class="form-item__label">RCS 사용여부</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <span class="text">사용</span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><span class="form-item__label">안심마크</span></th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <span class="text">사용</span>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </form>
          </div>
          <div class="chatroom-emulator sticky">
            <ChatEmulator :chatInfoData="chatInfoData"/>
          </div>
        </div>
        <!-- 임시저장,승인대기,검수중 top-notice--gray 사용 -->
        <div class="top-notice--gray">
          <ul>
            <li>
              <span class="flag-progress reject">삭제 D-7</span>
              2023.04.11 삭제 예정
            </li>
            <li>- 임시저장 상태에서는 30일 이후 자동 삭제 처리 됩니다.</li>
            <li>- 승인심사는 48시간 이내이며, 내부 사정상 지연될 수 있습니다.</li>
          </ul>
        </div>
        <div class="button__wrap flex-end">
          <ButtonCmp
              type="btn-line"
          >대화방 메뉴 작성</ButtonCmp>
          <ButtonCmp
              type="btn-blue"
          >수정</ButtonCmp>
        </div>
      </div>
    </div>
    <!-- 모달 -->
    <ModalView
      v-if="isModalViewed"
      @closeModal="isModalViewed = false"
    >
      <ConfirmMsg
        @closeModal="isModalViewed = false"
        v-if="isModalChatRoomCopy"
      >
        <div class="msg" slot="msg">
          대화방명, 챗봇 ID, 이용통신증명원 제외<br>대화방 정보가 자동으로 입력됩니다.
        </div>
        <div class="button__wrap" slot="button">
          <ButtonCmp
            type="btn-line"
            @click="closeMsg"
          >
            닫기
          </ButtonCmp>
          <ButtonCmp
            type="btn-blue"
            @click="closeMsg"
          >
          대화방 복사
          </ButtonCmp>
        </div>
      </ConfirmMsg>
    </ModalView>
    <!-- //모달 -->
  </div>
</template>

<script>

import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ChatEmulator from '@/views/brand/components/ChatEmulator.vue'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/brand/create/components/ConfirmMsg.vue'

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
      isModalChatRoomCopy: false,
      chatInfoData: {
        chatRoomName: 'TOMMY JEANS 외 69건',
        allowMsg: 'Y',
        saftyMark: 'Y'
      }
    }
  },
  methods: {
    closeMsg () {
      this.isModalViewed = false
      this.isModalChatRoomCopy = false
    },
    chatroomCopy () {
      this.isModalViewed = true
      this.isModalChatRoomCopy = true
    }
  }
}
</script>
