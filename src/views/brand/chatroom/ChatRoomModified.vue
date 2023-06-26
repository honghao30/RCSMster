<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <div class="chatroom-modify__title">
          <div class="chatroom-modify__title-use">
            <span class="flag-progress done">사용</span>
            <PageTitle :pagetitle="pageTitle" />
          </div>
          <div class="switch" role="switch">
            대화방 사용
            <input type="checkbox" id="switch" v-model="form.switch" checked>
            <label class="switch__core" for="switch"></label>
          </div>
        </div>
        <div class="top-progress-area">
          <!-- <span class="flag-progress">승인대기</span> -->
          <!-- <span class="flag-progress ing">처리중</span> -->
          <!-- <span class="flag-progress reject">반려</span>
          <span class="flag-progress">수정 전 데이터 보기</span>
          <span class="flag-progress ing">삭제 처리중</span> -->
          <span class="flag-progress done">승인완료</span>
          <p class="date">최종변경 : 2023. 03. 30</p>
        </div>
        <div class="chatroom__wrap">
          <div class="chatroom-registration editmod">
            <div>
              <form  ref="form" :model="form">
                <div class="table__wrap">
                  <table class="table table-bodyonly form-table">
                    <colgroup>
                        <col width="196px">
                        <col />
                    </colgroup>
                    <tbody>
                        <tr>
                        <th scope="row"><span class="form-item__label required">대화방 명</span></th>
                        <td>
                            <div class="form-item__content">
                              <div class="form-item-row">
                                  <div class="input-item input-limit">
                                    <span class="input">
                                        <input type="text" class="input" maxlength="20" placeholder="대화방 명을 입력해주세요." v-model="form.chatRoomName">
                                        <p class="input-limit__text">
                                        {{ form.chatRoomName.length }}/20자
                                        </p>
                                    </span>
                                    <ButtonCmp
                                      type="btn-line"
                                      size="small"
                                    >
                                      승인필요
                                    </ButtonCmp>
                                  </div>
                              </div>
                            </div>
                        </td>
                        </tr>
                        <tr>
                        <th scope="row"><span class="form-item__label required">대화방 유형</span></th>
                        <td>
                            <div class="form-item__content">
                            <div class="form-item-row">
                                <div class="inner__input">
                                    <div class="inner__input-box">
                                    <span class="form-item__label required chattype">발신번호</span>
                                    <div class="inner__input-item">
                                        <div class="inner__input-btn">
                                        <span class="input">
                                            010-5151-5151
                                        </span>
                                        </div>
                                    </div>
                                    </div>
                                    <!-- 발신번호 시 유효성체크 부분 없음 -->
                                </div>
                                <div class="inner__input">
                                    <div class="inner__input-box">
                                    <span class="form-item__label required chattype">챗봇 ID</span>
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
                        <tr>
                        <th scope="row">
                            <span class="form-item__label required">통신서비스<br>가입증명원</span>
                            <!-- 툴팁 -->
                            <ToolTipEl
                            direction="bottomPos"
                            elAlign="leftType"
                            width="418"
                            mode="default"
                            >
                            <template slot="tooltip-message">
                                <div class="message__innerbox"
                                >
                                <ul>
                                    <li>통신서비스 가입증명원을 제출하시면 서류 심사 후 등록이 가능합니다.</li>
                                    <li>입력한 전화번호와 통신서비스 가입증명원의 전화번호가 동일해야만 전화번호가 등록됩니다.</li>
                                    <li>파일이 여러 개인 경우, zip 파일로 압축하여 등록해 주세요.</li>
                                </ul>
                                </div>
                            </template>
                            </ToolTipEl>
                            <!-- // 툴팁 -->
                        </th>
                        <td>
                            <div class="form-item__content exception">
                              <div class="form-item-row">
                                  <div class="input-item">
                                    <span class="input"><input type="text" class="input" :value="form.serviceDocument" disabled></span>
                                    <input type="file" id="fileUp" class="input blind" @change="onFileChanged">
                                    <label for="fileUp" class="btn btn-default-line medium">파일 선택</label>
                                  </div>
                                  <ButtonCmp
                                    type="btn-line"
                                    size="small"
                                  >
                                    승인필요
                                  </ButtonCmp>
                              </div>
                            </div>
                        </td>
                        </tr>
                        <tr class="connect__wrap">
                        <th scope="row"><span class="form-item__label required">대행사 연결</span></th>
                        <td>
                            <div class="form-item__content">
                            <div class="form-item-row">
                                <div class="input-item">
                                <span class="radiobox">
                                    <input type="radio" name="agencyConnect" id="connectDefault" v-model="form.agencyConnect" value="defalut"/>
                                    <label for="connectDefault"><span class="checkbox__text">미사용</span></label>
                                </span>
                                <span class="radiobox">
                                    <input type="radio" name="agencyConnect" id="connectUse" v-model="form.agencyConnect" value="use" />
                                    <label for="connectUse"><span class="checkbox__text">사용</span></label>
                                </span>
                                </div>
                                <template v-if="form.agencyConnect === 'use'">
                                <div class="inner__input">
                                    <div class="inner__input-box">
                                    <span class="form-item__label required">연결 대행사</span>
                                    <div class="inner__input-item">
                                        <!-- 연결 대행사 有 -->
                                        <div class="inner__input-btn">
                                        <span class="input">
                                            <Dropdown :options="connectOptions" placeholder="대행사를 선택해주세요." >
                                            </Dropdown>
                                        </span>
                                        <!-- 선택 시, 파트너사 페이지 새창으로 연결(확인 필요) -->
                                        <!-- 230616 [a태그 + router-link태그] →  [router-link태그] 수정 -->
                                        <router-link to="" class="btn btn-default-line medium">챗봇 연결 가능한 대행사</router-link>
                                        </div>
                                        <span class="input"><input type="text" placeholder="" value="https://chatbot.com/autolink/001" disabled/></span>
                                        <!-- 연결 대행사 無 -->
                                        <!-- <div class="inner__input-btn">
                                        <span class="input">
                                            <input type="text" placeholder="현재 등록가능한 대행사가 없습니다." disabled/>
                                        </span>
                                        주석처리 해야함 / 선택 시, 파트너사 페이지 새창으로 연결(확인 필요)
                                        230616 [a태그 + router-link태그] →  [router-link태그] 수정
                                        <router-link to="" class="btn btn-default-line medium">챗봇 연결 가능한 대행사</router-link>
                                        </div>
                                        <span class="input connect-box"><input type="text" placeholder="" disabled/></span> -->
                                    </div>
                                    </div>
                                    <p class="guide-text black">&middot; RBC 간편챗봇 연결을 원하는 경우 [사전청약 완료] 대행사를 선택해주세요.</p>
                                </div>
                                </template>
                            </div>
                            </div>
                        </td>
                        </tr>
                        <tr class="search-allow__wrap">
                        <th scope="row"><span class="form-item__label required">검색 허용</span></th>
                        <td>
                            <div class="form-item__content">
                            <div class="form-item-row">
                                <div class="input-item">
                                <span class="radiobox">
                                    <input type="radio" name="allowSearch" id="allowSearchN" v-model="form.allowSearch" value="N"/>
                                    <label for="allowSearchN"><span class="checkbox__text">미사용</span></label>
                                </span>
                                <span class="radiobox">
                                    <input type="radio" name="allowSearch" id="allowSearchY" v-model="form.allowSearch" value="Y" />
                                    <label for="allowSearchY"><span class="checkbox__text">사용</span></label>
                                </span>
                                </div>
                                <p class="guide-text black">&middot; 메시지 앱에서 브랜드를 검색할 수 있습니다.</p>
                                <template v-if="form.allowSearch === 'Y'">
                                <div class="inner__input">
                                    <div class="inner__input-box">
                                    <span class="form-item__label">소개글</span>
                                    <div class="inner__input-item">
                                        <div class="inner__input-btn">
                                        <div class="input-item input-limit">
                                            <div class="textarea">
                                            <textarea maxlength="150" placeholder="브랜드의 슬로건이나 브랜드 특징을 나타내는 소개글을 입력해주세요." v-model="form.searchIntro"></textarea>
                                            <div class="textarea-limit__text">
                                                <p>
                                                {{ form.searchIntro.length }} /150자
                                                </p>
                                            </div>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                </template>
                            </div>
                            </div>
                        </td>
                        </tr>
                        <tr>
                        <th scope="row"><span class="form-item__label required">메시지 입력</span></th>
                        <td>
                            <div class="form-item__content">
                            <div class="form-item-row">
                                <div class="input-item">
                                <span class="radiobox">
                                    <input type="radio" name="allowMsg" id="allowMsgN" v-model="form.allowMsg" value="N"/>
                                    <label for="allowMsgN"><span class="checkbox__text">입력 불가능</span></label>
                                </span>
                                <span class="radiobox">
                                    <input type="radio" name="allowMsg" id="allowMsgY" v-model="form.allowMsg" value="Y" checked="checked"  />
                                    <label for="allowMsgY"><span class="checkbox__text">입력 가능</span></label>
                                </span>
                                </div>
                            </div>
                            <p class="guide-text black">&middot; 대화방에서 사용자가 메시지를 입력할 수 없습니다.</p>
                            </div>
                        </td>
                        </tr>
                        <tr>
                        <th scope="row"><span class="form-item__label">대표번호<br>문자수신 서비스</span>
                            <!-- 툴팁 -->
                            <ToolTipEl
                            direction="bottomPos"
                            elAlign="leftType"
                            width="418"
                            mode="default"
                            >
                            <template slot="tooltip-message">
                                <div class="message__innerbox"
                                >
                                <ul>
                                    <li>대표번호 문자수신 서비스는 휴대폰 메시지 함에서 기업의 대표번호로 문자를 보낼 경우 해당 메시지를 기업의 서버에서 수신할 수 있도록 제공하는 대표번호 부가 서비스입니다. </li>
                                </ul>
                                </div>
                            </template>
                            </ToolTipEl>
                            <!-- // 툴팁 -->
                        </th>
                        <td>
                            <div class="form-item__content">
                            <div class="form-item-row">
                                <div class="input-item">
                                <span class="radiobox">
                                    <input type="radio" name="receptionSms" id="receptionSmsN" v-model="form.receptionSms" value="defalut"/>
                                    <label for="receptionSmsN"><span class="checkbox__text">미사용</span></label>
                                </span>
                                <span class="radiobox">
                                    <input type="radio" name="receptionSms" id="receptionSmsY" v-model="form.receptionSms" value="use" />
                                    <label for="receptionSmsY"><span class="checkbox__text">사용</span></label>
                                </span>
                                </div>
                            </div>
                            <p class="guide-text black">&middot; 대화방에서 사용자가 메시지를 입력할 수 없습니다.</p>
                            </div>
                        </td>
                        </tr>
                        <tr>
                        <th scope="row"><span class="form-item__label">안심마크</span>
                            <!-- 툴팁 -->
                            <ToolTipEl
                            direction="bottomPos"
                            elAlign="leftType"
                            width="418"
                            mode="default"
                            >
                            <template slot="tooltip-message">
                                <div class="message__innerbox">
                                <strong>안심마크란 무엇인가요?</strong>
                                <ul>
                                    <li>안심마크는 스미싱과 같은 사고가 많이 발생하는 기업에 대해, 실제 해당 기업에서 문자를 보냈음을 알려주는 인증마크와 + 안심문구가 결합된 기능입니다.</li>
                                    <li>KISA의 승인을 얻은 사업자에 한해 RCS메시지를 보냈을 때 안심마크를 붙일 수 있으며, 이용을 원치 않는 경우 브랜드 관리자가 대화방 단위로 설정 해지할 수 있습니다.</li>
                                </ul>
                                </div>
                            </template>
                            </ToolTipEl>
                            <!-- // 툴팁 -->
                        </th>
                        <td>
                            <div class="form-item__content">
                            <div class="form-item-row">
                                <div class="input-item">
                                <span class="radiobox">
                                    <input type="radio" name="saftyMark" id="saftyMarkN" v-model="form.saftyMark" value="N"/>
                                    <label for="saftyMarkN"><span class="checkbox__text">미사용</span></label>
                                </span>
                                <span class="radiobox">
                                    <input type="radio" name="saftyMark" id="saftyMarkY" v-model="form.saftyMark" value="Y" />
                                    <label for="saftyMarkY"><span class="checkbox__text">사용</span></label>
                                </span>
                                </div>
                            </div>
                            <p class="guide-text black">&middot; KISA(한국인터넷진흥원)에서 안심마크 활용에 대해 인증 받았습니다.</p>
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
        <div class="top-notice--gray">
          <ul>
            <li>- 승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지연될 수 있습니다.</li>
            <li>- 등록 방법 변경 시, 입력한 데이터가 초기화됩니다.</li>
          </ul>
        </div>
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
import Dropdown from '@/components/common/Dropdown.vue'
import ToolTipEl from '@/components/common/Tooltip.vue'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/brand/create/components/ConfirmMsg.vue'
import ChatEmulator from '@/views/brand/components/ChatEmulator.vue'

export default {
  components: {
    PageTitle,
    BrandLnb,
    ButtonCmp,
    Dropdown,
    ToolTipEl,
    ModalView,
    ConfirmMsg,
    ChatEmulator
  },
  data() {
    return {
      form: {
        chatRoomName: 'SYSTEM STUDIOS',
        chatRegistrationType: 'phone',
        serviceDocument: 'SYSTEMSTUDIO_통신서비스가입증명원.zip​',
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
      return this.form.chatRoomName.length <= 0
    },
    pageTitle() {
      return `${this.form.chatRoomName + '대화방 수정'}`
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
