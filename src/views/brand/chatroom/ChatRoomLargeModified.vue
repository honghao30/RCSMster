<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <!-- 기획서 v1.0 수정(chatroom-modify__title,chatroom-modify__title-use 클래스 삭제 후 공통컴포넌트 사용 / top-progress-area 클래스 삭제) -->
        <PageTitle :pagetitle="pageTitle" progress="반려" />
        <!-- // 기획서 v1.0 수정(chatroom-modify__title,chatroom-modify__title-use 클래스 삭제 후 공통컴포넌트 사용/ top-progress-area 클래스 삭제) -->
        <!-- 기획서 v1.0 수정(editmod  이중클래스 위치 수정) -->
        <div class="chatroom__wrap editmod">
          <div class="chatroom-registration">
            <div>
              <form  ref="form" :model="form">
                <div class="table__wrap">
                  <table class="table table-bodyonly form-table">
                    <colgroup>
                      <col width="196px">
                      <col />
                    </colgroup>
                    <tbody>
                      <tr class="excel-box">
                        <th scope="row">
                          <span class="form-item__label required">대화방 명</span>
                        </th>
                        <td>
                          <div class="form-item__content exception">
                            <div class="form-item-row">
                              <div class="input-item">
                                {{ form.chatRoomName }}
                              </div>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr class="excel-box">
                        <th scope="row">
                          <span class="form-item__label required">엑셀 등록</span>
                          <ButtonCmp
                              type="btn-line"
                              size="small"
                          >샘플파일 다운로드</ButtonCmp>
                        </th>
                        <td>
                          <div class="form-item__content exception">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="input"><input type="text" class="input" :value="form.serviceDocument" disabled></span>
                                <input type="file" id="fileUp" class="input blind" @change="onFileChanged">
                                <!-- 기획서 v1.0 수정(문구 수정) -->
                                <label for="fileUp" class="btn btn-default-line medium">파일 찾기</label>
                              </div>
                            </div>
                            <p class="guide-text black">&middot; 파일형식: XLS, XLSX(최대 5MB)</p>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row">
                          <span class="form-item__label required">통신서비스<br>가입증명원</span>
                        </th>
                        <td>
                          <div class="form-item__content exception">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="input"><input type="text" class="input" :value="form.serviceDocument" disabled></span>
                                <input type="file" id="fileUp" class="input blind" @change="onFileChanged">
                                <!-- 기획서 v1.0 수정(문구 수정) -->
                                <label for="fileUp" class="btn btn-default-line medium">파일 찾기</label>
                              </div>
                              <!-- 기획서 v1.0 수정(타인 소유의 발신번호인 경우 삭제) -->
                            </div>
                            <p class="guide-text black">&middot; 통신서비스 가입증명원을 제출하시면 서류 심사 후 등록이 가능합니다.</p>
                            <p class="guide-text black">&middot; 입력한 발신번호와 통신서비스 가입증명원의 전화번호가 동일해야만 발신번호가 등록됩니다.</p>
                            <p class="guide-text black">&middot; 파일형식: JPG, PNG, TIFF, PDF, ZIP(최대 70MB)</p>
                            <p class="guide-text black">&middot; 파파일이 여러 개인 경우, zip 파일로 압축하여 등록해 주세요.</p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </form>
            </div>
          </div>
          <div class="chatroom-emulator sticky">
            <div class="exception-txt">
              <router-link to="">대화방 등록 가이드</router-link>
            </div>
            <ChatEmulator
              :chatInfoData="form"
            />
          </div>
        </div>
        <!-- 기획서 v1.0 수정(문구 수정 및 추가) -->
        <div class="top-notice--gray">
          <ul>
            <li class="chat-reject-reason">- 반려 사유 : 통신서비스가입증명원 번호와 불일치함 외 69건</li>
            <li>- 승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지연될 수 있습니다.</li>
          </ul>
        </div>
        <!-- // 기획서 v1.0 수정(문구 수정 및 추가) -->
        <div class="button__wrap flex-end">
          <ButtonCmp
              type="btn-blue-line"
              @click="btnRemove"
          >삭제</ButtonCmp>
          <ButtonCmp
              type="btn-blue-line"
              @click="saveTemp"
          >임시 저장</ButtonCmp>
          <ButtonCmp
              type="btn-blue"
          >승인 요청</ButtonCmp>
        </div>
      </div>
    </div>
    <!-- 모달  -->
    <ModalView
      v-if="isModalViewed"
      @closeModal="isModalViewed = false"
    >
      <!-- 임시저장 -->
      <ConfirmMsg
        @closeModal="isModalViewed = false"
        v-if="isModalSave"
      >
        <div class="msg" slot="msg">
          입력하신 정보가 임시저장 되었습니다.
        </div>
        <div class="button__wrap" slot="button">
          <ButtonCmp
          type="btn-blue"
          @click="closeMsg"
          >
            확인
          </ButtonCmp>
        </div>
      </ConfirmMsg>
    </ModalView>
    <!-- //모달  -->
  </div>
</template>

<script>

import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/brand/create/components/ConfirmMsg.vue'
import ChatEmulator from '@/views/brand/components/ChatEmulator.vue'

export default {
  components: {
    PageTitle,
    BrandLnb,
    ButtonCmp,
    ModalView,
    ConfirmMsg,
    ChatEmulator
  },
  data() {
    return {
      form: {
        chatRoomName: 'TOMMY JEANS 외 69건 대화방',
        chatRegistrationType: 'phone',
        serviceDocument: 'SYSTEMSTUDIO_통신서비스가입증명원.zip',
        agencyConnect: 'use',
        allowSearch: 'Y',
        searchIntro: 'SYSTEM STUDIOS 대화방 입니다.',
        allowMsg: 'Y',
        receptionSms: 'defalut',
        saftyMark: 'Y',
        switch: ''
      },
      viewMode: false,
      connectOptions: [
        {
          label: '데이터워즈​',
          value: 'ing02'
        }
      ],
      isModalViewed: false,
      isModalSave: false
    }
  },
  computed: {
    isDisabled() {
      // 버튼 활성화에 대한 예시
      return this.form.chatTitle.length <= 0
    },
    // 기획서 v1.0 수정
    pageTitle() {
      return `${this.form.chatRoomName + ' 수정'}`
    }
  },
  methods: {
    onFileChanged (e) {
      const files = e.target.files
      const fileName = files[0].name
      const file = e.target.files[0]
      this.form.serviceDocument = fileName
      this.url = URL.createObjectURL(file)
    },
    saveTemp () {
      this.isModalViewed = true
      this.isModalSave = true
    },
    closeMsg () {
      this.isModalViewed = false
      this.isModalSave = false
    },
    btnRemove () {
      alert('대화방을 삭제하시겠습니까?')
    }
  }
}
</script>
