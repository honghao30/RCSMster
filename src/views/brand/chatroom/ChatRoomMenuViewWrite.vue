<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle :pagetitle="pageTitle" />
        <div class="chatroom__wrap">
          <div class="chatroom-registration">
            <form>
              <div class="table__wrap">
                <table class="table table-bodyonly form-table">
                  <colgroup>
                    <col width="196px" />
                    <col />
                  </colgroup>
                  <tbody>
                    <tr>
                      <th scope="row"><span class="form-item__label">사용 여부</span></th>
                      <td colspan="2">
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="switch switch-status" role="switch">
                              사용 여부
                              <input type="checkbox" id="switch" v-model="twowayChatbotData.psMenuYn" true-value="Y" false-value="N">
                              <label class="switch__core" for="switch"></label>
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
                            <div class="chatroom__select--top">
                              <Dropdown v-if="chatbotListIsReady" :options="chatbotList" :value="twowayChatbotData.chatbotId" @change="handleChatbotChange" />
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2" class="card-box">
                        <div class="form-item__content">
                          <div class="form-item-row">
                            <div class="item-reg__wrap modify-box">
                              <div class="item-reg__inner">
                                <draggable v-model="psMenuList" class="item-reg__list" draggable=".item--draggable">
                                  <div v-for="(menu, idx) in psMenuList" :key="idx" class="item" :class="[{'active': psMenuSelectedMenuIdx === idx}, {'item--draggable': isMenuEdit}]" @click="selectPsMenu(idx)">
                                    <span class="item-text">메뉴 {{ idx + 1 }}</span>
                                    <a role="button" @click="removeMenu(idx)" class="btn-del" v-if="isMenuEdit && psMenuList.length > 1">
                                      <span class="blind">삭제</span>
                                    </a>
                                  </div>
                                </draggable>
                                <a role="button" class="btn-add" v-if="psMenuList.length < 5" @click="addMenu()">+<span class="blind">추가</span></a>
                              </div>
                              <div class="ctrl-btns">
                                <ButtonCmp type="btn-line" size="small" @click="isMenuEdit = true" v-if="!isMenuEdit">편집</ButtonCmp>
                                <ButtonCmp type="btn-blue" size="small" @click="saveMenuEdit" v-if="isMenuEdit">저장</ButtonCmp>
                              </div>
                              <div class="guide-box" v-if="isMenuEdit">
                                <p class="guide-text black">&middot; 선택한 슬라이드는 드래그로 순서 변경이 가능합니다.</p>
                                <p class="guide-text black">&middot; 첫번째로 위치한 카드는 삭제 불가합니다.</p>
                              </div>
                            </div>
                            <table class="table table-bodyonly form-table chartroom-menu-add" v-if="selectedMenuIsReady">
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
                                              <span class="input">
                                                <input type="text" class="input" :maxlength="psMenuTitleMaxLen" :placeholder="'메뉴명을 입력해주세요'" :ref="`title_${psMenuSelectedMenuIdx}`" v-model.trim="selectedMenu.title" @input="e => selectedMenu.title = e.target.value">
                                                <ButtonCmp type="btn-only-icon" @click="showSpecialCharTitle = !showSpecialCharTitle"><i class="icon-emoticon" /></ButtonCmp>
                                                <emoji-picker id="emojiPicker" @emoji-click="onSelectEmoji($event)" v-show="showSpecialCharTitle" class="light emoji-wrap" />
                                                <p class="input-limit__text">{{ selectedMenu.title.length }}/17자</p>
                                              </span>
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
                                        <input type="radio" name="chatroomMenu" value="dial_phone_number" id="radio1" v-model="selectedMenu.type" @change="changeMenuType" />
                                        <label for="radio1"><span class="radiobox__text">전화 연결</span></label>
                                      </span>
                                      <span class="radiobox">
                                        <input type="radio" name="chatroomMenu" value="basic_url_action" id="radio2" v-model="selectedMenu.type" @change="changeMenuType" />
                                        <label for="radio2"><span class="radiobox__text">홈페이지 연결</span></label>
                                      </span>
                                      <span class="radiobox">
                                        <input type="radio" name="chatroomMenu" value="feed_url_action" id="radio3" v-model="selectedMenu.type" @change="changeMenuType" />
                                        <label for="radio3"><span class="radiobox__text">브랜드 소식 연결</span></label>
                                      </span>
                                      <span class="radiobox">
                                        <input type="radio" name="chatroomMenu" value="auto_reply" id="radio4" v-model="selectedMenu.type" @change="changeMenuType" />
                                        <label for="radio4"><span class="radiobox__text">간편 챗봇 메시지 연결</span></label>
                                      </span>
                                    </div>
                                  </td>
                                </tr>
                                <tr v-if="selectedMenu.type === 'dial_phone_number'">
                                  <th scope="row"><span class="form-item__label">전화 연결</span></th>
                                  <td>
                                    <div class="form-item__content">
                                      <div class="form-item-row">
                                        <div class="input-item">
                                          <span class="input">
                                            <input type="text" class="input" placeholder="‘-’없이 입력해주세요." :ref="`dialPhoneNumber_${psMenuSelectedMenuIdx}`" v-model.trim="selectedMenu.dialPhoneNumber.phoneNumber" maxlength="40">
                                          </span>
                                        </div>
                                      </div>
<!--                                      <p class="guide-text error" v-if="telErrorMsg">전화번호를 입력해주세요.</p>-->
                                    </div>
                                  </td>
                                </tr>
                                <tr v-if="selectedMenu.type === 'basic_url_action'">
                                  <th scope="row"><span class="form-item__label">URL</span></th>
                                  <td>
                                    <div class="form-item__content">
                                      <div class="form-item-row">
                                        <div class="input-item">
                                          <span class="input">
                                            <input type="text" class="input" placeholder="http://로 된 주소를 입력해주세요." :ref="`basicUrlAction_${psMenuSelectedMenuIdx}`" v-model.trim="selectedMenu.basic.openUrl.url">
                                          </span>
                                        </div>
                                      </div>
<!--                                      <p class="guide-text error" v-if="webErrorMsg">http://로 된 주소를 입력해주세요.</p>-->
                                    </div>
                                  </td>
                                </tr>
                                <tr v-if="selectedMenu.type === 'feed_url_action'">
                                  <th scope="row"><span class="form-item__label">URL</span></th>
                                  <td>
                                    <div class="form-item__content">
                                      <div class="form-item-row row-gap">
                                        <div class="input-item">
                                          <span class="input">
                                            <input type="text" class="input" placeholder="연결할 브랜드 소식을 선택하세요." disabled :ref="`feedUrlAction_${psMenuSelectedMenuIdx}`" v-model.trim="selectedMenu.feed.openUrl.url">
                                          </span>
                                        </div>
                                        <ButtonCmp type="btn-default-line" @click="toggleFeedSelectType">등록</ButtonCmp>
                                      </div>
<!--                                      <p class="guide-text error" v-if="newsErrorMsg">연결할 브랜드 소식을 선택하세요.</p>-->
                                    </div>
                                  </td>
                                </tr>
                                <tr v-if="selectedMenu.type === 'auto_reply'">
                                  <th scope="row"><span class="form-item__label">간편챗봇 메시지</span></th>
                                  <td>
                                    <div class="form-item__content">
                                      <div class="form-item-row row-gap" v-if="twowayChatbotData.agencyMgrCnt > 0 && twowayChatbotData.agencyId !== null">
                                        <div class="input-item">
                                          <span class="input">
                                            <input type="text" class="input" placeholder="연결할 간편챗봇 메시지를 선택하세요." disabled :ref="`autoReply_${psMenuSelectedMenuIdx}`" v-model="selectedMenu.armIdName">
                                          </span>
                                        </div>
                                        <ButtonCmp type="btn-default-line" @click="toggleAutoReplySelectType">등록</ButtonCmp>
                                      </div>
                                      <div class="form-item-row notchat__wrap" v-else-if="twowayChatbotData.agencyMgrCnt > 0 && twowayChatbotData.agencyId === null">
                                        <ul>
                                          <li>현재 연결된 양방향 대행사가 없습니다.</li>
                                          <li>대행사 연결 후 간편 챗봇 메시지를 등록할 수 있습니다.</li>
                                        </ul>
                                      </div>
                                      <div class="form-item-row notchat__wrap" v-else>
                                        <ul>
                                          <li>현재 연결된 양방향 대행사가 없습니다.</li>
                                          <li>대행사 연결 후 간편 챗봇 메시지를 등록할 수 있습니다.</li>
                                        </ul>
                                        <a class="notchat-des" @click="goPartners">
                                          RBC의 파트너 대행사를 확인해보세요.
                                        </a>
                                      </div>
<!--                                      <p class="guide-text error" v-if="chatbotErrorMsg">연결할 간편챗봇 메시지를 선택하세요.</p>-->
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
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
              :chatInfoData="twowayChatbotData"
              :chatMenuList='psMenuList'
            />
          </div>
        </div>
        <div class="button__wrap space-between">
          <ButtonCmp class="btn btn-line" @click="goList">취소</ButtonCmp>
          <ButtonCmp type="btn-blue" :disabled = "isDisabled" @click="updatePsMenu">저장</ButtonCmp>
        </div>
      </div>
    </div>
    <ModalView v-if="showFeedPopup || showAutoReplyPopup">
      <DonebarndNewsSelect v-if="showFeedPopup" :brandId="brandId" @selectFeed="setFeed" @closeModal="cancelFeed" />
      <DoneChatBotMsgSelect v-if="showAutoReplyPopup" :brandId="brandId" @selectAutoReply="setAutoReplyMsgIdAndName" @closeModal="cancelAutoReplyMsgIdAndName" />
    </ModalView>
  </div>
</template>

<script>

import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import ModalView from '@/components/common/ModalView.vue'
import draggable from 'vuedraggable'
import Dropdown from '@/components/common/Dropdown.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import DonebarndNewsSelect from '@/views/brand/chatroom/DonebarndNewsSelect.vue'
import DoneChatBotMsgSelect from '@/views/brand/chatroom/DoneChatBotMsgSelect.vue'
import ChatEmulator from '@/views/brand/components/ChatEmulatorCustom.vue'
import 'swiper/css/swiper.css'
import 'emoji-picker-element'
import {
  getMenuObj,
  getPersistentDetail,
  getPersistentList, initialPersistentMenu,
  parsePersistentMenu,
  updatePersistentMenu
} from '@/api/service/persistentMenu'
import { getTwowayChatbotDetail } from '@/api/service/chatbot'

export default {
  components: {
    ChatEmulator,
    DonebarndNewsSelect,
    DoneChatBotMsgSelect,
    ModalView,
    ButtonCmp,
    draggable,
    Dropdown,
    PageTitle,
    BrandLnb
  },
  data() {
    return {
      pageTitle: '',
      brandId: '',
      chatbotId: '',
      chatbotList: [],
      twowayChatbotData: {},
      psMenuList: [],
      topMenuList: [], // 상위메뉴 리스트
      subMenuList: [], // 하위메뉴 리스트
      isMenuEdit: false,
      psMenuSelectedMenuIdx: 0,
      selectedMenu: {}, // 선택된 대화방 메뉴
      psMenuTitleMaxLen: 17, // 대화방메뉴명 최대 입력가능 글자수
      showSpecialCharTitle: false, // 특수문자 선택창 show 여부
      showAutoReplyPopup: false,
      showFeedPopup: false,
      hasAutoReplyType: false
    }
  },
  computed: {
    chatbotListIsReady() {
      if (jglib.isEmpty(this.chatbotList)) {
        return false
      }
      if (jglib.isEmpty(this.twowayChatbotData)) {
        return false
      }
      return true
    },
    selectedMenuIsReady() {
      if (jglib.isEmpty(this.selectedMenu)) {
        return false
      }
      return true
    },
    isDisabled() {
      if (this.isMenuEdit) {
        return true
      }
      for (let idx = 0; idx < this.psMenuList.length; idx++) {
        let menu = this.psMenuList[idx]
        if (jglib.isEmpty(menu.title)) {
          return true
        }
        if (jglib.isEmpty(menu.type)) {
          return true
        }
        if (menu.type === 'auto_reply' && jglib.isEmpty(menu.armId)) {
          return true
        } else if (menu.type === 'dial_phone_number') {
          if (jglib.isEmpty(menu.dialPhoneNumber.phoneNumber)) {
            return true
          }
          if (isNaN(menu.dialPhoneNumber.phoneNumber)) {
            return true
          }
        } else if (menu.type === 'basic_url_action') {
          if (jglib.isEmpty(menu.basic.openUrl.url)) {
            return true
          }
          if (!jglib.isUrl(menu.basic.openUrl.url)) {
            return true
          }
        } else if (menu.type === 'feed_url_action') {
          if (jglib.isEmpty(menu.feed.openUrl.url)) {
            return true
          }
        }
      }
      return false
    }
  },
  watch: {
    psMenuList: {
      immediate: true,
      handler() {
        this.selectedMenu = this.psMenuList[this.psMenuSelectedMenuIdx]
      }
    },
    // 선택된 대화방 메뉴 변경
    psMenuSelectedMenuIdx: {
      immediate: true,
      handler(val) {
        if (val > -1) {
          this.selectedMenu = this.psMenuList[val]
        }
      }
    }
  },
  created() {
    this.brandId = this.$route.params.brandId
    this.chatbotId = this.$route.params.chatbotId
  },
  mounted() {
    this.getList()
    this.init()
  },
  methods: {
    getList() {
      // 양방향 대화방인 대화방의 대화방메뉴 목록 출력
      getPersistentList(this.brandId).then(res => {
        if (res.code === '20000000') {
          res.result.list.forEach(data => {
            this.chatbotList.push({
              code: data.chatbotId,
              codeNm: data.subTitle
            })
          })
        }
      }).catch((err) => {
        this.$alertMsg(err.desc).then(() => {})
      })
    },
    async init() {
      let twowayInfo = await getTwowayChatbotDetail(this.brandId, { chatbotId: this.chatbotId }).catch(() => {})
      if (twowayInfo.code === '20000000') {
        this.twowayChatbotData = twowayInfo.result
      }
      let psMenuInfo = await getPersistentDetail(this.brandId, { brandId: this.brandId, chatbotId: this.chatbotId }).catch(() => {})
      // 등록된 대화방 메뉴가 있음
      if (psMenuInfo.result.length > 0) {
        // upPostbackId 의 유무로 상위/하위 메뉴를 나눈다.
        this.topMenuList = psMenuInfo.result.filter(menu => jglib.isEmpty(menu.upPostbackId))
        this.subMenuList = psMenuInfo.result.filter(menu => !jglib.isEmpty(menu.upPostbackId))
        this.psMenuList = parsePersistentMenu(this.topMenuList, this.subMenuList)
        this.pageTitle = '대화방 메뉴 수정'
      } else {
        this.psMenuList = initialPersistentMenu()
        this.twowayChatbotData.psMenuYn = 'Y'
        this.pageTitle = '대화방 메뉴 등록'
      }
    },
    handleChatbotChange(chatbotId) {
      this.$confirmMsg('대화방을 변경하시면 입력중인 대화방 메뉴가 삭제됩니다. 대화방을 변경 하시겠습니까?')
        .then(() => {
          this.$router.replace({
            name: 'ChatRoomMenuWrite',
            params: {
              brandId: this.brandId,
              chatbotId: chatbotId
            }
          })
        })
    },
    /** 대화방 메뉴 클릭 */
    selectPsMenu(idx) {
      this.psMenuSelectedMenuIdx = idx
    },
    addMenu() {
      let menu = getMenuObj({ useSubMenu: false })
      this.psMenuList.push(menu)
      this.selectPsMenu(this.psMenuList.length - 1)
    },
    removeMenu(idx) {
      let nextIdx = idx === 0 ? 0 : idx - 1
      this.$confirmMsg('삭제하는 경우 해당 메뉴에 입력된 내용이 모두 삭제됩니다.<br>메뉴를 삭제 하시겠습니까?', '', '확인', '취소').then(() => {
        this.psMenuList.splice(idx, 1)
        this.selectPsMenu(nextIdx)
      })
    },
    saveMenuEdit() {
      this.isMenuEdit = false
    },
    onSelectEmoji(e) {
      let code = e.detail.unicode
      let target = this.$refs[`title_${this.psMenuSelectedMenuIdx}`]
      if (target.value.length < this.psMenuTitleMaxLen - 1) { // 이모지의 length가 2글자로 잡힘
        let titleArr = target.value.split('')
        titleArr.splice(target.selectionStart, 0, code)
        this.selectedMenu.title = titleArr.join('')
      }
      this.showSpecialCharTitle = false
    },
    changeMenuType(e) {
      let targetMenu = this.psMenuList[this.psMenuSelectedMenuIdx]

      if (e.target.value !== 'auto_reply') {
        targetMenu.armId = ''
        targetMenu.armIdName = ''
      }
    },
    toggleFeedSelectType() {
      if (this.twowayChatbotData.feedCnt > 0) {
        this.showFeedPopup = true
      } else {
        this.$confirmMsg('등록된 브랜드 소식이 없습니다.<br>브랜드 소식 > 브랜드 소식 작성 에서 콘텐츠 작성 후 브랜드 소식 연결을 사용하실 수 있습니다.<br>브랜드 소식으로 이동 하시겠습니까?', '', '예', '아니요').then(() => {
          alert('브랜드 소식으로 이동')
        })
      }
    },
    toggleAutoReplySelectType() {
      if (this.twowayChatbotData.autoReplyMsgCnt > 0) {
        this.showAutoReplyPopup = true
      } else {
        this.$confirmMsg('등록된 간편챗봇 메시지가 없습니다.<br>챗봇 > 간편챗봇 메시지에서 메시지 작성 후 간편챗봇 메시지 연결을 사용하실 수 있습니다.<br>간편챗봇 메시지로 이동 하시겠습니까?', '', '예', '아니요').then(() => {
          alert('간편챗봇으로 이동')
        })
      }
    },
    setFeed(feed) {
      this.selectedMenu.feed.openUrl.url = feed.feedUrl
    },
    cancelFeed() {
      this.showFeedPopup = false
    },
    setAutoReplyMsgIdAndName(autoReply) {
      this.selectedMenu.armId = autoReply.armId
      this.selectedMenu.armIdName = autoReply.name
    },
    cancelAutoReplyMsgIdAndName() {
      this.showAutoReplyPopup = false
    },
    getMenuData() {
      let menus = []
      for (let idx = 0; idx < this.psMenuList.length; idx++) {
        let menu = this.psMenuList[idx]
        let ordNo = (idx + 1).toString()
        switch (menu.type) {
          case 'auto_reply':
            this.hasAutoReplyType = true
            menus.push({ type: 'reply', title: menu.title, postbackId: menu.postbackId, ordNo: ordNo, autoReplyMsgId: menu.armId }); break
          case 'dial_phone_number':
            menus.push({ type: 'action', title: menu.title, postbackId: menu.postbackId, ordNo: ordNo, actionType: 'dialerAction', action: { dialerAction: { dialPhoneNumber: { phoneNumber: menu.dialPhoneNumber.phoneNumber } } } }); break
          case 'basic_url_action':
            menus.push({ type: 'action', title: menu.title, postbackId: menu.postbackId, ordNo: ordNo, actionType: 'urlAction', action: { urlAction: { openUrl: { url: menu.basic.openUrl.url } } } }); break
          case 'feed_url_action':
            menus.push({ type: 'feed', title: menu.title, postbackId: menu.postbackId, ordNo: ordNo, actionType: 'urlAction', action: { urlAction: { openUrl: { url: menu.feed.openUrl.url } } } }); break
        }
        menus[idx].actionJson = JSON.stringify(menus[idx].action)
      }
      return menus
    },
    async updatePsMenu() {
      let menu = this.getMenuData()
      let msg = this.hasAutoReplyType ? '입력하신 대화방 메뉴와 자동응답 메시지가 함께 등록 되며 승인없이 사용 가능합니다.' : '입력하신 대화방 메뉴가 등록됩니다.<br/>대화방 메뉴는 승인 없이 사용 가능합니다.'
      this.$confirmMsg(msg).then(() => {
        let data = {
          chatbotId: this.twowayChatbotData.chatbotId,
          psMenuYn: this.twowayChatbotData.psMenuYn,
          persistentMenu: {
            menu: menu
          }
        }

        updatePersistentMenu(this.brandId, data).then(res => {
          if (res.code === '20000000') {
            this.goList()
          } else {
            if (this.hasAutoReplyType) this.$alertMsg('자동응답 청약 확인에 실패 하였습니다.<br>선택한 중계사를 통해 자동응답 청약 여부를 확인해 주시기 바랍니다.')
          }
        }).catch((err) => {
          this.$alertMsg(err.desc).then(() => {})
        })
      })
    },
    goList() {
      this.$router.push({ name: 'ChatRoomMenuList', params: { brandId: this.brandId } })
    },
    goPartners() {
      alert('파트너스로 이동')
    }
  }
}
</script>
