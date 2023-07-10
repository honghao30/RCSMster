<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <!-- 기획서 v1.0 수정(op-progress-area 클래스 삭제 후 공통컴포넌트 사용 / switch, top-progress-area 클래스 삭제) -->
        <PageTitle pagetitle="TOMMY JEANS 외 69건 대화방" progress="승인완료" />
        <!-- // 기획서 v1.0 수정(op-progress-area 클래스 삭제 후 공통컴포넌트 사용/ switch, top-progress-area 클래스 삭제) -->
        <div class="chatroom__wrap view-box">
          <div class="chatroom-registration">
            <!-- 기획서 v1.0 수정(flag-progress 클래스 삭제) -->
            <div class="table__wrap">
              <table class="table table-bodyonly form-table">
                <colgroup>
                  <col width="196px"/>
                  <col />
                </colgroup>
                <tbody>
                  <tr>
                    <!-- 기획서 v1.0 수정(문구 수정) -->
                    <th scope="row" class="bd-bg"><span class="form-item__label">대량등록 엑셀</span></th>
                    <td class="bd-bg">
                      <div class="form-item__content">
                        <div class="form-item-row">
                          <div class="input-item">
                            <span class="text">SYSTEMSTUDIO_대량등록.xlsx</span>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th scope="row"><span class="form-item__label">대화방 명</span></th>
                    <td>
                      <div class="form-item__content">
                        <div class="form-item-row">
                          <div class="input-item">
                            <span class="text">TOMMY JEANS 외 69건</span>
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
                  <!-- 기획서 v1.0 수정(통신서비스 가입증명원 위치 변경 + bd-bg 클래스 추가) -->
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
                  <!-- // 기획서 v1.0 수정(통신서비스 가입증명원 위치 변경 + bd-bg 클래스 추가) -->
                  <!-- 기획서 v1.0 수정(대행사 연결, 메시지 입력, 대표번호 문자수신 서비스, RCS 사용여부, 안심마크 삭제) -->
                </tbody>
              </table>
            </div>
          </div>
          <div class="chatroom-emulator sticky">
            <ChatEmulator :chatInfoData="chatInfoData"/>
          </div>
        </div>
        <!-- 기획서 v1.0 수정 (반려 추가) -->
        <!-- 임시저장,승인대기,검수중 top-notice--gray 사용 -->
        <div class="top-notice--gray">
          <ul>
            <li>
              <span class="flag-progress reject">삭제 D-7</span>
              2023.04.11 삭제 예정
            </li>
            <li>- 임시저장 상태에서는 30일 이후 자동 삭제 처리 됩니다.</li>
            <li>- 승인심사는 48시간 이내이며, 내부 사정상 지연될 수 있습니다.</li>
            <li class="chat-reject-reason">- 반려 사유 : 통신서비스가입증명원 번호와 불일치함 외 69건</li>
          </ul>
        </div>
        <!-- // 기획서 v1.0 수정 (반려 추가) -->
        <!-- 기획서 v1.0 수정 (링크 연결로 인한 태그변경) -->
        <div class="button__wrap flex-end">
          <!-- 기획서 v1.0 수정 (추가된 내용에 대한 설명입니다. / 검수중 인 경우 : disabled -->
          <router-link to="/ChatRoomLargeModified" class="btn btn-blue">수정</router-link>
        </div>
        <!-- // 기획서 v1.0 수정 (링크 연결로 인한 태그변경) -->
        <!-- 기획서 v1.0 수정 (승인대기 인 경우에 사용됨 / 버튼명 수정될 예정임) -->
        <div class="button__wrap flex-end">
          <ButtonCmp
            type="btn-blue"
            @click="isCancelRequestModal"
          >
          승인요청 취소
          </ButtonCmp>
        </div>
        <!-- // 기획서 v1.0 수정 (승인대기 인 경우에 사용됨 / 버튼명 수정될 예정임) -->
      </div>
    </div>
    <!-- 기획서 v1.0 수정(모달 추가) -->
    <!-- 모달 -->
    <ModalView
      v-if="isModalViewed"
      @closeModal="isModalViewed = false"
    >
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
    <!-- //기획서 v1.0 수정(모달 추가) -->
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
      chatInfoData: {
        chatRoomName: 'TOMMY JEANS 외 69건',
        allowMsg: 'N',
        saftyMark: 'Y'
      },
      isModalViewed: false,
      isCancelRequest: false
    }
  },
  methods: {
    closeMsg () {
      this.isModalViewed = false
      this.isCancelRequest = false
    },
    isCancelRequestModal () {
      this.isModalViewed = true
      this.isCancelRequest = true
    }
  }
}
</script>
