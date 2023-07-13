<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <!-- 기획서 v1.0 수정(chatroom-modify__title,chatroom-modify__title-use 클래스 삭제 후 공통컴포넌트 사용 / switch, top-progress-area 클래스 삭제) -->
        <PageTitle pagetitle="SYSTEM STUDIOS 대화방 수정" progress="승인완료" />
        <!-- // 기획서 v1.0 수정(chatroom-modify__title,chatroom-modify__title-use 클래스 삭제 후 공통컴포넌트 사용/ switch, top-progress-area 클래스 삭제) -->
        <div class="chatroom__wrap view-box">
          <div class="chatroom-registration">
            <!-- 기획서 v1.0 수정 (form 태그 삭제)-->
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
                            <!-- 기획서 v1.0 수정 (버튼 노출 상태 : 승인대기, 처리중, 승인완료 선택 시, 해당 대화방 정보가 입력된 상태의 대화방 등록 페이지로 이동) -->
                            <ButtonCmp
                              type="btn-line"
                              size="small"
                              @click="chatroomCopy"
                            >대화방 복사</ButtonCmp>
                            <!-- 기획서 v1.0 수정(flag-progress 클래스 삭제) -->
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <!-- 기획서 v1.0 수정(대화방 유형 : th 추가 및 챗봇ID 삭제 + bd-bg 클래스 추가) -->
                  <tr>
                    <th scope="row" class="bd-bg"><span class="form-item__label">대화방 유형</span></th>
                    <td class="bd-bg">
                      <div class="form-item__content">
                        <div class="form-item-row">
                          <div class="inner__input only-txt">
                            <div class="inner__input-box">
                              <span class="form-item__label chattype">발신번호</span>
                              <div class="inner__input-item">
                                <div class="inner__input-btn">
                                  <span class="input">
                                    010-5151-5151
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <!-- // 기획서 v1.0 수정(대화방 유형 : th 추가 및 챗봇ID 삭제 + bd-bg 클래스 추가) -->
                  <!-- 기획서 v1.0 수정(대표번호 문자수신 서비스 위치 변경) -->
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
                  <!-- // 기획서 v1.0 수정(대표번호 문자수신 서비스 위치 변경) -->
                  <!-- 기획서 v1.0 수정(통신서비스 가입증명원 위치 변경 + flag-progress 클래스 삭제 + bd-bg 클래스 추가) -->
                  <tr>
                      <th scope="row" class="bd-bg"><span class="form-item__label">통신서비스<br>가입증명원</span></th>
                      <td class="bd-bg">
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="input-item">
                              <a class="text" href="" download>통신서비스가입증명원.pdf</a>
                            </div>
                          </div>
                        </div>
                      </td>
                  </tr>
                  <!-- // 기획서 v1.0 수정(통신서비스 가입증명원 위치 변경 + flag-progress 클래스 삭제 + bd-bg 클래스 추가) -->
                  <!-- 기획서 v1.0 수정(문구 수정) -->
                  <tr>
                    <th scope="row"><span class="form-item__label">양방향 대행사 연결</span></th>
                    <td>
                      <div class="form-item__content">
                        <div class="form-item-row">
                          <div class="input-item">
                            <span class="text">연결</span>
                            <span class="text">연결되어 있지 않습니다.</span>
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
                  <!-- // 기획서 v1.0 수정(문구 수정) -->
                  <!-- 기획서 v1.0 수정(검색허용 삭제) -->
                  <!-- 기획서 v1.0 수정(bd-bg 클래스 추가 + 문구수정) -->
                  <tr>
                    <th scope="row" class="bd-bg"><span class="form-item__label">메시지 입력란</span></th>
                    <td class="bd-bg">
                      <div class="form-item__content">
                        <div class="form-item-row">
                          <div class="input-item">
                            <span class="text">사용</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <!-- // 기획서 v1.0 수정(bd-bg 클래스 추가 + 문구수정) -->
                  <!-- 기획서 v1.0 수정(RCS 사용여부 삭제) -->
                  <!-- 기획서 v1.0 수정(안심마크 클래스 추가) -->
                  <tr>
                    <th scope="row" class="safety-bg"><span class="form-item__label">안심마크</span></th>
                    <td class="safety-bg">
                      <div class="form-item__content">
                        <div class="form-item-row">
                          <div class="input-item">
                            <span class="text">사용</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <!-- // 기획서 v1.0 수정(안심마크 클래스 추가) -->
                </tbody>
              </table>
            </div>
          </div>
          <div class="chatroom-emulator sticky">
            <ChatEmulator :chatInfoData="chatInfoData"/>
          </div>
        </div>
        <!-- 기획서 v1.0 수정 (반려 추가) -->
        <!-- 임시저장,승인대기,검수중,반려 top-notice--gray 사용 -->
        <div class="top-notice--gray">
          <ul>
            <li>
              <span class="flag-progress reject">삭제 D-7</span>
              2023.04.11 삭제 예정
            </li>
            <li>- 임시저장 상태에서는 30일 이후 자동 삭제 처리 됩니다.</li>
            <li>- 승인심사는 48시간 이내이며, 내부 사정상 지연될 수 있습니다.</li>
            <li class="chat-reject-reason">- 반려 사유 : 위법/부적절성 메시지</li>
          </ul>
        </div>
        <!-- // 기획서 v1.0 수정 (반려 추가) -->
        <!-- 기획서 v1.0 수정 -->
        <div class="button__wrap flex-end">
          <router-link to="/ChatRoomMenuAdd" class="btn btn-line">대화방 메뉴 등록</router-link>
          <!-- 기획서 v1.0 수정 (추가된 내용에 대한 설명입니다. / 검수중 인 경우 : 버튼 미존재 -->
          <router-link to="/ChatRoomModified" class="btn btn-blue">수정</router-link>
          <!-- 기획서 v1.0 수정 (승인대기 인 경우에 사용됨 / 버튼명 수정될 예정임) -->
          <ButtonCmp
            type="btn-blue"
            @click="isCancelRequestModal"
          >
          승인요청 취소
          </ButtonCmp>
        </div>
        <!-- // 기획서 v1.0 수정 -->
      </div>
    </div>
    <!-- 모달 -->
    <ModalView
      v-if="isModalViewed"
      @closeModal="isModalViewed = false"
    >
      <ConfirmMsg
        @closeModal="isModalViewed = false, isModalChatRoomCopy=false"
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
      <!-- 기획서 v1.0 수정(승인대기 인 경우 : 승인요청 취소 버튼 클릭 시) -->
      <ConfirmMsg
        @closeModal="isModalViewed = false, isCancelRequest=false"
        v-if="isCancelRequest"
      >
        <div class="msg" slot="msg">
          대화방 승인요청을 취소 하시겠습니까?
        </div>
        <div class="button__wrap" slot="button">
          <!-- 기획서 v1.0 수정(추가된 내용에 대한 설명입니다. / 닫기 버튼 선택 시, Alert 종료 및 현재 상태 유지) -->
          <ButtonCmp
            type="btn-line"
            @click="closeMsg"
          >
            닫기
          </ButtonCmp>
          <!-- 기획서 v1.0 수정(추가된 내용에 대한 설명입니다. / 승인요청 취소 버튼 선택 시 해당 대화방 임시저장 상태로 변경) -->
          <ButtonCmp
            type="btn-blue"
            @click="closeMsg"
          >
          승인요청 취소
          </ButtonCmp>
        </div>
      </ConfirmMsg>
      <!-- // 기획서 v1.0 수정(승인대기 인 경우 : 승인요청 취소 버튼 클릭 시) -->
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
      isCancelRequest: false,
      chatInfoData: {
        chatRoomName: '네스프레소',
        allowMsg: 'Y',
        saftyMark: 'Y'
      }
    }
  },
  methods: {
    closeMsg () {
      this.isModalViewed = false
      this.isModalChatRoomCopy = false
      this.isCancelRequest = false
    },
    chatroomCopy () {
      this.isModalViewed = true
      this.isModalChatRoomCopy = true
    },
    isCancelRequestModal () {
      this.isModalViewed = true
      this.isCancelRequest = true
    }
  }
}
</script>
