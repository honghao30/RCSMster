<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="대화방 메뉴 등록" />
        <!-- 기획서 v1.0 수정 및 추가 작업 -->
        <div class="chatroom__wrap chatroom-menu__wrap"> <!-- 기획서 v1.0 수정 (chatroom-menu__wrap 이중클래스 추가) -->
          <div class="chatroom-registration">
            <form  ref="form" :model="form">
              <div class="table__wrap menu-add-table">
                <table class="table table-bodyonly form-table">
                  <colgroup>
                    <!-- 기획서 v1.0 수정 (col 삭제) -->
                    <col />
                    <col />
                  </colgroup>
                  <tbody>
                    <!-- 기획서 v1.0 수정 (사용여부 삭제, 대화방 수정) -->
                    <tr>
                      <th scope="row" width="77px"><span class="form-item__label">대화방</span>
                      </th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="two-content">
                              <div class="chatroom__select--top">
                                <Dropdown :options="dropdownOptions" @beforeChange="isChange"
                                >
                                </Dropdown>
                                <!-- 기획서 v1.0 수정 (대화방 메뉴 복사를 통해 진입한 경우 : 대화방이 선택되지 않은 경우 노출) -->
                                <p class="guide-text error">대화방이 선택되어 있지 않습니다.</p>
                              </div>
                              <div class="switch switch-status" role="switch">
                                {{ switchStatus }}
                                <input type="checkbox" id="switch" v-model="form.switch" checked>
                                <label class="switch__core" for="switch"></label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <!-- // 기획서 v1.0 수정 (사용여부 삭제, 대화방 수정) -->
                    <tr>
                      <td colspan="2" class="card-box">
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="item-reg__wrap">
                              <div class="item-reg__inner">
                                <draggable
                                  v-model="form.chatMenuData"
                                  class="item-reg__list"
                                  draggable=".item--draggable"
                                >
                                  <div
                                    v-for="(menu, j) in form.chatMenuData" :key="j"
                                    class="item"
                                    :class="[{'active': menu.isActive}, {'item--draggable': isMenuEdit}]"
                                    @click="menuActive(j)"
                                  >
                                    <span v-text="`메뉴${menu.menuIndex}`" class="item-text"></span>
                                    <a role="button" @click="removeMenu(j)" class="btn-del" v-if="isMenuEdit
                                    "><span class="blind">삭제</span></a>
                                  </div>
                                </draggable>
                                <a role="button" class="btn-add" @click="addSlide(form.chatMenuData.length)" v-if="form.chatMenuData.length < 5">+<span class="blind"></span></a>
                              </div>
                              <div class="ctrl-btns">
                                <ButtonCmp
                                  type="btn-line"
                                  size="small"
                                  @click="isMenuEdit = true"
                                  v-if="!isMenuEdit"
                                >편집</ButtonCmp>
                                <ButtonCmp
                                  type="btn-blue"
                                  size="small"
                                  @click="saveMenuEdit"
                                  v-if="isMenuEdit"
                                >저장</ButtonCmp>
                              </div>
                              <div class="guide-box" v-if="isMenuEdit">
                                <p class="guide-text black">&middot; 선택한 슬라이드는 드래그로 순서 변경이 가능합니다.</p>
                                <p class="guide-text black">&middot; 첫번째로 위치한 카드는 삭제 불가합니다.</p>
                              </div>
                            </div>
                            <template v-for="(menu, j) in form.chatMenuData">
                              <table class="table table-bodyonly form-table chartroom-menu-add" v-if="menu.isActive" :key="j">
                                <colgroup>
                                  <col width="196px">
                                  <col />
                                </colgroup>
                                <tbody>
                                  <tr>
                                    <th scope="row"><span class="form-item__label">메뉴</span></th>
                                    <td>
                                      <div class="form-item__content">
                                        <div class="form-item__content">
                                          <div class="form-item-row">
                                            <!-- 23.06.13 input 이모션 공통으로 인해 is-emoji 클래스 추가 / .chat-emoticon 삭제 / .input-limit__text 위치수정 -->
                                            <div class="is-emoji">
                                              <div class="input-item input-limit">
                                                <div class="input">
                                                  <input type="text" class="input" maxlength="17"
                                                    v-model="menu.menuTitle"
                                                    :placeholder="'메뉴명을 입력해주세요'"
                                                    ref="menuName"
                                                  >
                                                  <div class="input-limit__text">
                                                    <Emoji @input="onSelectEmoji($event, 'menuName', j)"/>
                                                    <p>{{ menu.menuTitle.length }}/17자</p>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <!-- // 23.06.13 input 이모션 공통으로 인해 is-emoji 클래스 추가 / .chat-emoticon 삭제  / .input-limit__text 위치수정 -->
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row"><span class="form-item__label">연결항목</span></th>
                                    <td>
                                      <div class="form-item__content chatroom-menu">
                                        <span class="radiobox">
                                          <input type="radio" name="chatroomMenu" value="call" v-model="menu.checkItem" id="radio1" />
                                          <label for="radio1"><span class="radiobox__text">전화 연결</span></label>
                                        </span>
                                        <span class="radiobox">
                                          <input type="radio" name="chatroomMenu" value="web" v-model="menu.checkItem" id="radio2"  />
                                          <label for="radio2"><span class="radiobox__text">웹사이트 연결</span></label> <!-- 기획서 v1.0 수정 (문구 수정) -->
                                        </span>
                                        <span class="radiobox">
                                          <input type="radio" name="chatroomMenu" value="news" v-model="menu.checkItem" id="radio3" />
                                          <label for="radio3"><span class="radiobox__text">브랜드 소식 연결</span></label>
                                        </span>
                                        <span class="radiobox">
                                          <input type="radio" name="chatroomMenu" value="chatbot" v-model="menu.checkItem" id="radio4" />
                                          <label for="radio4"><span class="radiobox__text">간편 챗봇 메시지 연결</span></label>
                                        </span>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr v-if="menu.checkItem === 'call'">
                                    <th scope="row"><span class="form-item__label">전화 연결</span></th>
                                    <td>
                                      <div class="form-item__content">
                                        <div class="form-item-row">
                                          <div class="input-item">
                                            <span class="input"><input type="text" class="input" placeholder="‘-’없이 입력해주세요." v-model="menu.tel"></span>
                                          </div>
                                        </div>
                                        <p class="guide-text error" v-if="telErrorMsg">전화번호를 입력해주세요.</p>
                                      </div>
                                    </td>
                                  </tr>
                                  <!-- 기획서 v1.0 수정 (case01,case02 추가 및 수정) -->
                                  <tr v-if="menu.checkItem === 'web'">
                                    <th scope="row"><span class="form-item__label">웹사이트</span></th> <!--기획서 v1.0 수정(문구 수정) -->
                                    <td>
                                      <div class="form-item__content">
                                        <!-- case01. Default: 브랜드 개설 시 입력한 웹사이트 노출 -->
                                        <div class="form-item-row">
                                          <div class="input-item">
                                            <span class="input"><input type="text" class="input" placeholder="https://www-qa.rcsbizcenter.com/service/brand/BR.13L49F42Mo/psmenu/unit/bot-9467llz2olr" v-model="menu.web" disabled></span>
                                          </div>
                                        </div>
                                        <!-- // case01. Default: 브랜드 개설 시 입력한 웹사이트 노출 -->
                                        <!-- case02. 등록된 웹사이트가 없는 경우 -->
                                        <div class="form-item-row web-registration-box">
                                          <div>
                                            <p>브랜드 개설 시 입력한 웹사이트가 없습니다.<br>웹사이트를 등록해주세요.</p>
                                            <div class="exception-txt">
                                              <a @click="webRegistrationModal">웹사이트 등록</a>
                                            </div>
                                          </div>
                                        </div>
                                        <!-- // case02. 등록된 웹사이트가 없는 경우 -->
                                      </div>
                                    </td>
                                  </tr>
                                  <!-- // 기획서 v1.0 수정 (case01,case02 추가 및 수정) -->
                                  <tr v-if="menu.checkItem === 'news'">
                                    <th scope="row"><span class="form-item__label">URL</span></th>
                                    <td>
                                      <div class="form-item__content">
                                        <div class="form-item-row row-gap">
                                          <div class="input-item">
                                            <span class="input"><input type="text" class="input" placeholder="연결할 브랜드 소식을 선택하세요." v-model="menu.news" disabled></span>
                                          </div>
                                          <ButtonCmp
                                            type="btn-default-line"
                                            @click="barndNewsSelect"
                                          >브랜드 소식 선택</ButtonCmp>
                                        </div>
                                        <p class="guide-text error" v-if="newsErrorMsg">연결할 브랜드 소식을 선택하세요.</p>
                                      </div>
                                    </td>
                                  </tr>
                                  <!-- 기획서 v1.0 수정 (case 추가 및 수정) -->
                                  <!-- case01. 청약 대행사 O / 대행사 연결 O / 간편챗봇 메시지 등록 O : 양방향 대행사 사용 + chatbot-des 클래스 삭제 -->
                                  <!-- case02. 청약 대행사 O / 대행사 연결 X : 양방향 대행사 사용 + chatbot-des 클래스 필요) -->
                                  <tr v-if="menu.checkItem === 'chatbot'">
                                    <th scope="row"><span class="form-item__label">양방향 대행사</span></th> <!--기획서 v1.0 수정(문구 수정) -->
                                    <td>
                                      <div class="chatbot-agency">
                                        <div class="chatbot-des">
                                          <p>
                                            현재 연결된 양방향 대행사가 없습니다.<br>
                                            대행사 연결 후 간편챗봇 메시지를 등록할 수 있습니다.
                                          </p>
                                        </div>
                                        <Dropdown :options="chatbotOptions"
                                          >
                                        </Dropdown>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr v-if="menu.checkItem === 'chatbot'">
                                    <th scope="row"><span class="form-item__label">간편챗봇 메시지</span></th>
                                    <td>
                                      <div class="form-item__content">
                                        <div class="form-item-row row-gap">
                                          <div class="input-item">
                                            <span class="input"><input type="text" class="input" placeholder="연결할 간편챗봇 메시지를 선택하세요." v-model="menu.chatbot" disabled></span>
                                          </div>
                                          <ButtonCmp
                                            type="btn-default-line"
                                            @click="chatBotSelect"
                                          >간편챗봇 메시지</ButtonCmp> <!--기획서 v1.0 수정(문구 수정) -->
                                        </div>
                                        <!-- case03.청약 대행사 X / 대행사 연결 X : form-item-row notchat__wrap 사용 -->
                                        <div class="form-item-row notchat__wrap">
                                          <ul>
                                            <li>현재 연결된 양방향 대행사가 없습니다.</li>
                                            <li>대행사 연결 후 간편 챗봇 메시지를 등록할 수 있습니다.</li>
                                          </ul>
                                          <!-- 기획서 v1.0 수정(텍스트 링크 클릭 시 파트너사 화면으로 이동 / 파트너사 화면 미작업된 상황) -->
                                          <router-link to="" class="exception-txt">RBC의 파트너 대행사를 확인해보세요.</router-link>
                                        </div>
                                        <!-- // 기획서 v1.0 수정(청약 대행사 X / 대행사 연결 X) -->
                                        <p class="guide-text error" v-if="chatbotErrorMsg">연결할 간편챗봇 메시지를 선택하세요.</p>
                                      </div>
                                    </td>
                                  </tr>
                                  <!-- // 기획서 v1.0 수정 (case 추가 및 수정) -->
                                </tbody>
                              </table>
                            </template>
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
            <ChatEmulator
            :chatInfoData="chatInfoData"
            :chatMenuList="form.chatMenuData"
            />
          </div>
        </div>
        <!-- // 기획서 v1.0 수정 및 추가 작업 -->
        <div class="button__wrap flex-end">
          <ButtonCmp
            type="btn-blue-line"
            @click="saveTemp"
          >임시 저장</ButtonCmp>
          <ButtonCmp
            type="btn-blue"
            @click="onSubmit"
            :disabled="isDisabled"
          >저장</ButtonCmp>
        </div>
      </div>
    </div>
    <!-- 기획서 v1.0 수정 (모달) -->
    <!-- 모달 -->
    <ModalView
      v-if="isModalViewed"
      @closeModal="isModalViewed = false"
    >
      <!-- 대화방 변경 시 alert -->
      <ConfirmMsg
      v-if="isChatRoomChange"
        @closeModal="isModalViewed = false, isChatRoomChange = false"
      >
        <div class="msg" slot="msg">
          대화방을 변경하시면<br>
          입력중인 대화방 메뉴가 삭제됩니다.<br>
          대화방을 변경 하시겠습니까?
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
      <!-- //대화방 변경 시 alert -->
      <!-- 기획서 v1.0 수정(추가된 내용에 대한 설명입니다. /
      Case1) 첫번째 메뉴인 경우: 탭은 그대로 있고 입력 내용만 삭제
      Case2) 두번째~다섯번째 메뉴인 경우: 탭과 입력 내용 모두 삭제
      -->
      <!-- 메뉴 편집 버튼 삭제 시 alert -->
      <!-- 기획서 v1.0 수정 (isRemoveSlide → isRemoveMenu 로 변경) -->
      <ConfirmMsg
      v-if="isRemoveMenu"
        @closeModal="isModalViewed = false, isRemoveMenu = false"
      >
        <div class="msg" slot="msg">
          삭제하는 경우 해당 메뉴에 입력된 내용이<br>
          모두 삭제됩니다.<br>
          메뉴를 삭제 하시겠습니까?
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
          @click="DoneremoveMenu"
          >
            예
          </ButtonCmp>
        </div>
      </ConfirmMsg>
      <!-- 기획서 v1.0 수정 (isRemoveSlide → isRemoveMenu 로 변경) -->
      <!-- //메뉴 편집 버튼 삭제 시 alert -->
      <!-- // 기획서 v1.0 수정(추가된 내용에 대한 설명입니다. /
      Case1) 첫번째 메뉴인 경우: 탭은 그대로 있고 입력 내용만 삭제
      Case2) 두번째~다섯번째 메뉴인 경우: 탭과 입력 내용 모두 삭제
      -->
      <!-- 브랜드 소식 연결 선택 버튼 : 클릭 시 -->
      <!-- case01. 등록된 브랜드 소식이 없는 경우(아니요 클릭 시 case02로 진입함) -->
      <!-- 기획서 v1.0 수정(문구수정) -->
      <ConfirmMsg
        @closeModal="isModalViewed = false, isBrandNews = false"
        v-if="isBrandNews"
      >
        <div class="msg" slot="msg">
          등록된 브랜드 소식이 없습니다.<br>
          브랜드 소식 > 브랜드 소식 작성 에서 콘텐츠 작성 후<br>
          브랜드 소식 연결을 사용하실 수 있습니다.<br>
          브랜드 소식으로 이동 하시겠습니까?
        </div>
        <div class="button__wrap" slot="button">
          <!-- 원래 아니요 클릭 시 case02 페이지 구현을 위해 만듦-->
          <!-- 실제 구현 시 필요 -->
          <!-- <ButtonCmp
          type="btn-line"
          @click="closeMsg"
          >
            아니요
          </ButtonCmp> -->
          <!-- 실제 구현 시 필요 -->
          <!-- 실제 구현 시 불필요 -->
          <ButtonCmp
          type="btn-line"
          @click="doneBarndNewsModal"
          >
            아니요
          </ButtonCmp>
          <!-- // 실제 구현 시 불필요 -->
          <!-- 기획서 v1.0 수정(추가된 내용에 대한 설명입니다. /[예] 선택 시, 브랜드 소식 등록 화면으로 이동) -->
          <router-link
            to="/FeedRegistration"
            class="btn btn-blue"
          >예</router-link>
        </div>
      </ConfirmMsg>
      <!-- // 기획서 v1.0 수정(문구수정) -->
      <!-- case02. 등록된 브랜드 소식이 있는 경우 -->
      <DonebarndNewsSelect
        @closeModal="isModalViewed = false, isDoneBrandNews = false"
        v-if="isDoneBrandNews"
      >
      </DonebarndNewsSelect>
      <!-- //브랜드 소식 연결 선택 버튼 : 클릭 시 -->
      <!-- 간편챗봇 메시지 연결 선택 버튼 : 클릭 시 -->
      <!-- case01. 등록된 간편챗봇 메시지가 없는 경우(아니요 클릭 시 case02로 진입함) -->
      <!-- 기획서 v1.0 수정(문구수정 / 링크연결) -->
      <ConfirmMsg
        v-if="isChatBotConnect"
        @closeModal="isModalViewed = false, isChatBotConnect = false"
      >
        <div class="msg" slot="msg">
          등록된 간편챗봇 메시지가 없습니다.<br>
          간편챗봇 메시지 작성 후 간편챗봇 메시지<br>
          연결을 사용하실 수 있습니다.<br>
          간편챗봇 메시지 작성화면으로 이동 하시겠습니까?
        </div>
        <div class="button__wrap" slot="button">
          <!-- 원래 아니요 클릭 시 case02 페이지 구현을 위해 만듦-->
          <!-- 실제 구현 시 필요 -->
          <!-- <ButtonCmp
          type="btn-line"
          @click="closeMsg"
          >
            아니요
          </ButtonCmp> -->
          <!-- 실제 구현 시 필요 -->
          <!-- 실제 구현 시 불필요 -->
          <ButtonCmp
          type="btn-line"
          @click="doneChatBotModal"
          >
            아니요
          </ButtonCmp>
          <!-- // 실제 구현 시 불필요 -->
          <!-- 기획서 v1.0 수정(추가된 내용에 대한 설명입니다. / [예] 선택 시, 간편챗봇 메시지 등록 화면으로 이동) -->
          <router-link
            to="/ChatbotRegistration"
            class="btn btn-blue"
          >예</router-link>
        </div>
      </ConfirmMsg>
      <!-- // 기획서 v1.0 수정(문구수정 / 링크연결) -->
      <!-- case02. 등록된 간편챗봇 메시지가 있는 경우 -->
      <DoneChatBotMsgSelect
        @closeModal="isModalViewed = false, isDoneChatBotConnect = false"
        v-if="isDoneChatBotConnect"
      >
      </DoneChatBotMsgSelect>
      <!-- //간편챗봇 메시지 연결 선택 버튼 : 클릭 시 -->
      <!-- 임시저장 -->
      <ConfirmMsg
        @closeModal="isModalViewed = false, isModalSave = false"
        v-if="isModalSave"
      >
        <div class="msg" slot="msg">
          임시저장 되었습니다.
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
      <!-- //임시저장 -->
      <!-- 기획서 v1.0 수정(연결항목: 웹사이트 > 등록된 웹사이트가 없는 경우)  -->
      <ConfirmMsg
        v-if="isWebRegistration"
        @closeModal="isModalViewed = false, isWebRegistration = false"
      >
        <div class="msg" slot="msg">
          등록된 홈페이지 URL이 없습니다.<br>
          내 브랜드관리 > 브랜드 홈 탭 설정에서 웹사이트<br>
          등록 후 웹사이트 연결을 사용할 수 있습니다.<br>
          내 브랜드 관리로 이동 하시겠습니까?
        </div>
        <div class="button__wrap" slot="button">
          <ButtonCmp
          type="btn-line"
          @click="closeMsg"
          >
            아니요
          </ButtonCmp>
          <!-- [예] 선택 시, 내 브랜드 관리 화면으로 이동 -->
          <router-link to="/brandeditstep01" class="btn btn-blue">예</router-link>
        </div>
      </ConfirmMsg>
      <!-- // 기획서 v1.0 수정(연결항목: 웹사이트 > 등록된 웹사이트가 없는 경우) -->
    </ModalView>
    <!-- //모달 -->
    <!-- // 기획서 v1.0 수정 (모달) -->
  </div>
</template>

<script>

import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import draggable from 'vuedraggable'
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/brand/create/components/ConfirmMsg.vue'
import ChatEmulator from '@/views/brand/components/ChatEmulator.vue'
import DonebarndNewsSelect from '@/views/brand/chatroom/DonebarndNewsSelect.vue'
import DoneChatBotMsgSelect from '@/views/brand/chatroom/DoneChatBotMsgSelect.vue'
import Emoji from '@/components/common/Emoji.vue'
import 'swiper/css/swiper.css'
import 'emoji-picker-element'

export default {
  components: {
    PageTitle,
    draggable,
    BrandLnb,
    ButtonCmp,
    Dropdown,
    ModalView,
    ConfirmMsg,
    ChatEmulator,
    DonebarndNewsSelect,
    DoneChatBotMsgSelect,
    Emoji
  },
  data() {
    return {
      removeMenuIndex: undefined,
      form: {
        switch: true,
        chatMenuData: [{
          menuIndex: '1',
          menuTitle: '',
          isActive: true,
          checkItem: [],
          tel: '',
          web: '',
          news: '',
          chatbot: ''
        }],
        chatRoom: 'chatRoomMenu01'
      },
      dropdownOptions: [
        {
          label: 'SYSTEM STUDIOS',
          value: 'chatRoomMenu01'
        },
        {
          label: 'LANVIN COLLECTION',
          value: 'chatRoomMenu02'
        },
        {
          label: 'LANVIN COLLECTION',
          value: 'chatRoomMenu03'
        }
      ],
      isModalViewed: false,
      isChatRoomChange: false,
      isBrandNews: false,
      isDoneBrandNews: false,
      isChatBotConnect: false,
      isDoneChatBotConnect: false,
      isModalSave: false,
      menuActiveIndex: 0,
      isMenuEdit: false,
      showSpecialCharTitle: false, // 특수문자 선택창 show 여부
      telErrorMsg: false,
      webErrorMsg: false,
      newsErrorMsg: false,
      chatbotErrorMsg: false,
      isWebRegistration: false, // 기획서 v1.0 수정
      isRemoveMenu: false, // 기획서 v1.0 수정
      // 기획서 v1.0 수정
      chatInfoData: {
        chatRoomName: 'SYSTEM STUDIOS',
        allowMsg: 'Y',
        hideInputFooter: false,
        chipButtons: true,
        mode: 'registration'
      },
      // 기획서 v1.0 수정
      chatbotOptions: [
        {
          label: '카카오 I 커넥트 톡',
          value: 'chatbot01'
        },
        {
          label: '포스트 맨',
          value: 'chatbot02'
        },
        {
          label: '문자온',
          value: 'chatbot03'
        }
      ]
    }
  },
  // 기획서 v1.0 수정
  mounted() {
    this.switchStatus = this.form.switch ? '대화방 메뉴 사용' : '대화방 메뉴 미사용'
  },
  // 기획서 v1.0 수정
  computed: {
    switchStatus: {
      get() {
        return this.form.switch ? '대화방 메뉴 사용' : '대화방 메뉴 미사용'
      },
      set(value) {
        this.form.switch = value
      }
      // return this.form.switch ? '대화방 메뉴 사용' : '대화방 메뉴 미사용'
    },
    // 기획서 v1.0 수정
    isDisabled() {
      // 버튼 활성화에 대한 예시
      return this.form.chatMenuData.every(menu => menu.menuTitle.length === 0)
    }
  },
  methods: {
    isChange(option) {
      this.isModalViewed = true
      this.isChatRoomChange = true
    },
    barndNewsSelect() {
      this.isModalViewed = true
      this.isBrandNews = true
      this.isDoneChatBotConnect = false
    },
    doneBarndNewsModal() {
      this.isModalViewed = true
      this.isDoneBrandNews = true
      this.isBrandNews = false
    },
    chatBotSelect() {
      this.isModalViewed = true
      this.isDoneChatBotConnect = false
      this.isChatBotConnect = true
    },
    doneChatBotModal() {
      // this.isModalViewed = true
      this.isChatBotConnect = false
      this.isDoneChatBotConnect = true
    },
    // 기획서 v1.0 수정
    closeMsg() {
      this.isModalViewed = false
      this.isChatRoomChange = false
      this.isRemoveMenu = false // 기획서 v1.0 수정
      this.isWebRegistration = false
      this.isBrandNews = false
      this.isDoneChatBotConnect = false
      this.isDoneBrandNews = false
      this.isChatBotConnect = false
      this.isModalSave = false
    },
    saveTemp() {
      this.isModalViewed = true
      this.isModalSave = true
    },
    // 기획서 v1.0 수정
    webRegistrationModal() {
      this.isModalViewed = true
      this.isWebRegistration = true
    },
    onSubmit() {
      this.form.chatMenuData.forEach((menu) => {
        if (menu.checkItem === 'call' && !menu.tel) {
          this.telErrorMsg = true
          return
        }
        if (menu.checkItem === 'web' && !menu.web) {
          this.webErrorMsg = true
          return
        }
        if (menu.checkItem === 'news' && !menu.news) {
          this.newsErrorMsg = true
          return
        }
        if (menu.checkItem === 'chatbot' && !menu.chatbot) {
          this.chatbotErrorMsg = true
        }
      })
    },
    // 슬라이드 추가
    addSlide () {
      let chatMenuData = {
        menuIndex: (this.form.chatMenuData.length + 1),
        menuTitle: '',
        isActive: false,
        checkItem: [],
        tel: '',
        web: '',
        news: '',
        chatbot: ''
      }
      this.form.chatMenuData.push(chatMenuData)
    },
    // 슬라이드 삭제
    removeMenu (index) {
      this.removeMenuIndex = index
      if (this.form.chatMenuData.length > 1) {
        this.isModalViewed = true
        this.isRemoveMenu = true // 기획서 v1.0 수정
      } else if (this.form.chatMenuData.length === 1) {
        this.isModalViewed = false
        this.isRemoveMenu = false // 기획서 v1.0 수정
      }
    },
    // 슬라이드 삭제 팝업
    DoneremoveMenu () {
      if (this.form.chatMenuData.length > 1) {
        this.isModalViewed = false
        this.isRemoveMenu = false // 기획서 v1.0 수정
        this.form.chatMenuData.splice(this.removeMenuIndex, 1)
        this.removeMenuIndex = undefined
        this.form.chatMenuData[0].isActive = true
      }
    },
    // 슬라이드 활성화
    menuActive (idx) {
      this.menuActiveIndex = idx
      this.form.chatMenuData.forEach((menu, index) => {
        if (idx !== index) {
          menu.isActive = false
        } else {
          menu.isActive = true
        }
      })
    },
    // 슬라이드 편집 활성화
    saveMenuEdit() {
      this.form.chatMenuData.forEach((menu, index) => {
        if (index === 0) {
          menu.isActive = true
        } else {
          menu.isActive = false
        }
      })
      this.isMenuEdit = false
    },
    onSelectEmoji(e, target, idx) {
      let emoji = e
      let refName = target
      this.$refs[refName][0].value += emoji
    }
  }
}
</script>
