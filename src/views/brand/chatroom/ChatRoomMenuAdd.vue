<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="대화방 등록" />
        <div class="chatroom__wrap">
          <div class="chatroom-registration">
            <form  ref="form" :model="form">
              <div class="table__wrap">
                <table class="table table-bodyonly form-table">
                  <colgroup>
                    <col width="196px" />
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row"><span class="form-item__label">사용여부</span>
                      </th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="switch switch-status" role="switch">
                              사용 여부
                              <input type="checkbox" id="switch" v-model="form.switch" checked>
                              <label class="switch__core" for="switch"></label>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row"><span class="form-item__label">대화방</span>
                      </th>
                      <td>
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="chatroom__select--top">
                              <Dropdown :options="dropdownOptions" @input="isChange"
                              >
                              </Dropdown>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2" class="card-box">
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="slide-card__wrap">
                              <div class="slide-card__inner">
                                <draggable
                                  v-model="form.chatMenuData"
                                  class="card-list"
                                  draggable=".card--draggable"
                                >
                                  <div
                                    v-for="(menu, j) in form.chatMenuData" :key="j"
                                    class="card-item"
                                    :class="[{'active': menu.isActive}, {'card--draggable': isMenuEdit}]"
                                    @click="menuActive(j)"
                                  >
                                    <span v-text="`카드${menu.menuIndex}`" class="card-text"></span>
                                    <a role="button" @click="removeMenu(j)" class="btn-del" v-if="isMenuEdit
                                    "><span class="blind">삭제</span></a>
                                  </div>
                                </draggable>
                                <a role="button" class="btn-add" @click="addSlide(form.chatMenuData.length)" v-if="form.chatMenuData.length < 5">+<span class="blind">추가</span></a>
                              </div>
                              <a role="button" class="btn small btn-line" @click="isMenuEdit = true" v-if="!isMenuEdit">편집</a>
                              <a role="button" class="btn small btn-blue" v-if="isMenuEdit" @click="saveMenuEdit">저장</a>
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
                                            <div class="input-item input-limit">
                                              <span class="input">
                                                <input type="text" class="input" maxlength="17"
                                                  v-model="menu.menuTitle"
                                                  :placeholder="'메뉴명을 입력해주세요'"
                                                >
                                                <span class="chat-emoticon">
                                                  <ButtonCmp
                                                    type="btn-only-icon"
                                                    @click="showSpecialCharTitle = !showSpecialCharTitle"
                                                    ><i class="icon-emoticon"></i>
                                                  </ButtonCmp>
                                                  <emoji-picker id="emojiPicker" @emoji-click="onSelectEmoji($event, 'menuTitle', j)" v-show="showSpecialCharTitle" class="light emoji-wrap"></emoji-picker>
                                                </span>
                                                <p class="input-limit__text">
                                                  {{ menu.menuTitle.length }}/17자
                                                </p>
                                              </span>
                                            </div>
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
                                            <label for="radio2"><span class="radiobox__text">홈페이지 연결</span></label>
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
                                  <tr v-if="menu.checkItem === 'web'">
                                    <th scope="row"><span class="form-item__label">URL</span></th>
                                    <td>
                                      <div class="form-item__content">
                                        <div class="form-item-row">
                                          <div class="input-item">
                                            <span class="input"><input type="text" class="input" placeholder="http://로 된 주소를 입력해주세요." v-model="menu.web"></span>
                                          </div>
                                        </div>
                                        <p class="guide-text error" v-if="webErrorMsg">http://로 된 주소를 입력해주세요.</p>
                                      </div>
                                    </td>
                                  </tr>
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
                                          >등록</ButtonCmp>
                                        </div>
                                        <p class="guide-text error" v-if="newsErrorMsg">연결할 브랜드 소식을 선택하세요.</p>
                                      </div>
                                    </td>
                                  </tr>
                                  <tr v-if="menu.checkItem === 'chatbot'">
                                    <th scope="row"><span class="form-item__label">URL</span></th>
                                    <td>
                                      <div class="form-item__content">
                                        <div class="form-item-row row-gap">
                                          <div class="input-item">
                                            <span class="input"><input type="text" class="input" placeholder="연결할 간편챗봇 메시지를 선택하세요." v-model="menu.chatbot" disabled></span>
                                          </div>
                                          <ButtonCmp
                                            type="btn-default-line"
                                            @click="chatBotSelect"
                                          >등록</ButtonCmp>
                                        </div>
                                        <!-- 연결된 대행사가 없는 경우 -->
                                        <div class="form-item-row notchat__wrap">
                                          <ul>
                                            <li>현재 연결된 양방향 대행사가 없습니다.</li>
                                            <li>대행사 연결 후 간편 챗봇 메시지를 등록할 수 있습니다.</li>
                                          </ul>
                                          <a class="notchat-des"><router-link to="">RBC의 파트너 대행사를 확인해보세요.</router-link></a>
                                        </div>
                                        <!-- //연결된 대행사가 없는 경우 -->
                                        <p class="guide-text error" v-if="chatbotErrorMsg">연결할 간편챗봇 메시지를 선택하세요.</p>
                                      </div>
                                    </td>
                                  </tr>
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
            <div class="exception-txt">
              <router-link to="">대화방 등록 가이드</router-link>
            </div>
            <ChatEmulator
            />
          </div>
        </div>
        <div class="button__wrap flex-end">
          <ButtonCmp
            type="btn-blue-line"
            @click="saveTemp"
          >임시 저장</ButtonCmp>
          <ButtonCmp
            type="btn-blue"
            :disabled = "isDisabled"
            @click="onSubmit"
          >저장</ButtonCmp>
        </div>
      </div>
    </div>
    <!-- 모달 -->
    <ModalView
      v-if="isModalViewed"
      @closeModal="isModalViewed = false"
    >
      <!-- 대화방 변경 시 alert -->
      <ConfirmMsg
      v-if="isChatRoomChange"
        @closeModal="isModalViewed = false"
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
      <!-- 메뉴 편집 버튼 삭제 시 alert -->
      <ConfirmMsg
      v-if="isRemoveSlide"
        @closeModal="isModalViewed = false"
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
      <!-- //메뉴 편집 버튼 삭제 시 alert -->
      <!-- 브랜드 소식 연결 선택 버튼 : 클릭 시 -->
      <!-- case01. 등록된 브랜드 소식이 없는 경우(아니요 클릭 시 case02로 진입함) -->
      <ConfirmMsg
      v-if="isBrandNews"
        @closeModal="isModalViewed = false"
      >
        <div class="msg" slot="msg">
          등록된 브랜드 소식이 없습니다.<br>
          등록중인 대화방 메뉴를 임시저장하고<br>
          브랜드 소식을 등록 하시겠습니까?
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
          <router-link
            to="/FeedRegistration"
            class="btn btn-blue"
          >예</router-link>
        </div>
      </ConfirmMsg>
      <!-- case02. 등록된 브랜드 소식이 있는 경우 -->
      <DonebarndNewsSelect
        @closeModal="isModalViewed = false"
        v-if="isDoneBrandNews"
      >
      </DonebarndNewsSelect>
      <!-- //브랜드 소식 연결 선택 버튼 : 클릭 시 -->
      <!-- 간편챗봇 메시지 연결 선택 버튼 : 클릭 시 -->
      <!-- case01. 등록된 간편챗봇 메시지가 없는 경우(아니요 클릭 시 case02로 진입함) -->
      <ConfirmMsg
        v-if="isChatBotConnect"
          @closeModal="isModalViewed = false"
      >
        <div class="msg" slot="msg">
          등록된 간편챗봇 메시지가 없습니다.<br>
          등록중인 대화방 메뉴를 임시저장하고<br>
          간편챗봇 메시지를 등록 하시겠습니까?
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
          <!-- 기획서 > 예 버튼 클릭 시 경로 이동에 관한 내용 없음 -->
          <router-link
            to=""
            class="btn btn-blue"
          >예</router-link>
        </div>
      </ConfirmMsg>
      <!-- case02. 등록된 간편챗봇 메시지가 있는 경우 -->
      <DoneChatBotMsgSelect
        @closeModal="isModalViewed = false"
        v-if="isDoneChatBotConnect"
      >
      </DoneChatBotMsgSelect>
      <!-- //간편챗봇 메시지 연결 선택 버튼 : 클릭 시 -->
      <!-- 임시저장 -->
      <ConfirmMsg
        @closeModal="isModalViewed = false"
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
      </ModalView>
      <!-- //모달 -->
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
    DoneChatBotMsgSelect
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
        }]
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
      selectedOption: 'chatRoomMenu01',
      menuActiveIndex: 0,
      isMenuEdit: false,
      showSpecialCharTitle: false, // 특수문자 선택창 show 여부
      telErrorMsg: false,
      webErrorMsg: false,
      newsErrorMsgErrorMsg: false,
      chatbotErrorMsg: false
    }
  },
  methods: {
    isChange(option) {
      this.isModalViewed = true
      this.isChatRoomChange = true
      if (this.selectedOption === option) {
        this.isModalViewed = false
        this.isChatRoomChange = false
      }
    },
    barndNewsSelect() {
      this.isModalViewed = true
      this.isBrandNews = true
    },
    doneBarndNewsModal() {
      this.isModalViewed = true
      this.isDoneBrandNews = true
    },
    chatBotSelect() {
      this.isModalViewed = true
      this.isChatBotConnect = true
    },
    doneChatBotModal() {
      this.isModalViewed = true
      this.isDoneChatBotConnect = true
    },
    closeMsg () {
      this.isModalViewed = false
      this.isChatRoomChange = false
      this.isRemoveSlideModal = false
    },
    saveTemp () {
      this.isModalViewed = true
      this.isModalSave = true
    },
    onSubmit () {
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
      this.isModalViewed = true
      this.isRemoveSlide = true
    },
    // 슬라이드 삭제 팝업
    DoneremoveMenu () {
      if (this.form.chatMenuData.length > 1) {
        this.isModalViewed = false
        this.isRemoveSlide = false
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
    onSelectEmoji(e, field, index) {
      let code = e.detail.unicode
      if (field === 'menuTitle') {
        this.form.chatMenuData[index].menuTitle += code
      }
    }
  }
}
</script>
