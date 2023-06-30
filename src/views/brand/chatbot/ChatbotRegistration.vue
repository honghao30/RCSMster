<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="간편챗봇 메시지 등록" />
        <div class="chatroom__wrap">
          <div class="chatroom-registration">
            <form  ref="form" :model="form">
              <!-- 챗봇 유형 -->
              <div class="type__radio-tab">
                <ul>
                  <li>
                    <input type="radio" id="chatBubble" value="chatBubble" v-model="form.chatType" class="blind" @change="isChangeTypeCheck"/>
                    <label for="chatBubble">
                      <i class="icon-chatbubble"></i>
                      <dl>
                        <dt class="tab-title">말풍선</dt>
                        <dd class="tab-text">텍스트 중심의 간단한 메시지 작성</dd>
                      </dl>
                    </label>
                  </li>
                  <li>
                    <input type="radio" id="card" value="card" v-model="form.chatType" class="blind"  @change="isChangeTypeCheck"/>
                    <label for="card">
                      <i class="icon-card"></i>
                      <dl>
                        <dt class="tab-title">카드</dt>
                        <dd class="tab-text">이미지와 텍스트를 혼합하여 풍부한 메시지 작성</dd>
                      </dl>
                    </label>
                  </li>
                </ul>
              </div>
              <!-- // 챗봇 유형 -->
              <div class="table__wrap">
                <table class="table table-bodyonly form-table">
                  <colgroup>
                    <col width="196px">
                    <col />
                  </colgroup>
                  <tbody>
                    <!-- 간편챗봇 메시지 이름 -->
                    <tr>
                      <th scope="row"><span class="form-item__label required">간편챗봇 메시지 이름</span></th>
                      <td>
                        <div class="form-item__content is-emoji">
                          <div class="form-item-row">
                            <div class="input-item input-limit">
                              <div class="input">
                                <input type="text" class="input" maxlength="30"
                                  v-model="form.chatbotMsgName"
                                  placeholder="간편챗봇 이름을 입력해주세요."
                                  ref="chatbotName"
                                >
                                <div class="input-limit__text">
                                  <Emoji @input="onSelectEmoji($event, 'chatbotName')"/>
                                  <p>{{ form.chatbotMsgName.length }}/30자</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <p class="guide-text error">간편챗봇 메시지 이름 입력해주세요.</p>
                        </div>
                      </td>
                    </tr>
                    <!-- // 간편챗봇 메시지 이름 -->
                    <template v-if="form.chatType == 'card'">
                    <!-- 이미지 사이즈 -->
                    <tr>
                      <th scope="row"><span class="form-item__label required">이미지 사이즈</span></th>
                      <td>
                        <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="radiobox">
                                  <input type="radio" name="imgSize" id="full" value="full" v-model="form.imgSize"/>
                                  <label for="full"><span class="radiobox__text">전체 사이즈</span></label>
                                </span>
                                <span class="radiobox">
                                  <input type="radio" name="imgSize" id="medium" value="medium" v-model="form.imgSize"/>
                                  <label for="medium"><span class="radiobox__text">중간 사이즈</span></label>
                                </span>
                              </div>
                            </div>
                        </div>
                      </td>
                    </tr>
                    <!-- // 이미지 사이즈 -->
                    <!-- 타이틀 -->
                    <tr>
                      <th scope="row"><span class="form-item__label required">타이틀</span></th>
                      <td>
                        <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="radiobox">
                                  <input type="radio" name="title" id="titleN" value="N" v-model="form.chatCardTitle"
                                  :disabled="form.imgSize == 'full'"
                                  />
                                  <label for="titleN"><span class="radiobox__text">미사용</span></label>
                                </span>
                                <span class="radiobox">
                                  <input type="radio" name="title" id="titleY" value="Y" v-model="form.chatCardTitle"
                                  :disabled="form.imgSize == 'full'"
                                  />
                                  <label for="titleY"><span class="radiobox__text">사용</span></label>
                                </span>
                              </div>
                            </div>
                        </div>
                      </td>
                    </tr>
                    <!-- // 타이틀  -->
                    <!-- 내용 -->
                    <tr>
                      <th scope="row"><span class="form-item__label required">내용</span></th>
                      <td>
                        <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="radiobox">
                                  <input type="radio" name="content" id="contentN" value="N" v-model="form.chatCardContent"
                                  :disabled="form.imgSize == 'full'"
                                  />
                                  <label for="contentN"><span class="radiobox__text">미사용</span></label>
                                </span>
                                <span class="radiobox">
                                  <input type="radio" name="content" id="contentY" value="Y" v-model="form.chatCardContent"
                                  :disabled="form.imgSize == 'full'"
                                  />
                                  <label for="contentY"><span class="radiobox__text">사용</span></label>
                                </span>
                              </div>
                            </div>
                        </div>
                      </td>
                    </tr>
                    <!-- // 내용  -->
                    </template>
                    <!-- 메시지 복사 -->
                    <tr>
                      <th scope="row"><span class="form-item__label required">메시지 복사</span></th>
                      <td>
                        <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="radiobox">
                                  <input type="radio" name="copy" id="copyY" value="Y" v-model="form.copyMsg"/>
                                  <label for="copyY"><span class="radiobox__text">가능</span></label>
                                </span>
                                <span class="radiobox">
                                  <input type="radio" name="copy" id="copyN" value="N" v-model="form.copyMsg"/>
                                  <label for="copyN"><span class="radiobox__text">불가능</span></label>
                                </span>
                              </div>
                            </div>
                        </div>
                      </td>
                    </tr>
                    <!-- // 메시지 복사 -->
                    <!-- 응답버튼 -->
                    <tr>
                      <th scope="row"><span class="form-item__label">응답 버튼</span></th>
                      <td>
                        <div class="form-item__content">
                            <div class="form-item-row">
                              <div class="input-item">
                                <span class="radiobox">
                                  <input type="radio" name="chipBtnUse" id="btnUseN" value="N" v-model="form.chipBtnUse"/>
                                  <label for="btnUseN"><span class="radiobox__text">미사용</span></label>
                                </span>
                                <span class="radiobox">
                                  <input type="radio" name="chipBtnUse" id="btnUseY" value="Y" v-model="form.chipBtnUse"/>
                                  <label for="btnUseY"><span class="radiobox__text">사용</span></label>
                                </span>
                              </div>
                            </div>
                        </div>
                        <ChatChipButtonReg
                          :buttons="form.chipButtons"
                          v-if="form.chipBtnUse === 'Y'"
                          @openChatbotModal="ChatBotModal"
                        />
                      </td>
                    </tr>
                    <!-- // 응답버튼 -->
                  </tbody>
                </table>
                <!--  카드 추가, 드래그 영역 -->
                <div class="item-reg__wrap">
                  <div class="item-reg__inner">
                    <div class="item-reg__list" v-if="form.chatType == 'chatBubble'">
                      <div class="item active">
                        <span class="item-text">카드1</span>
                      </div>
                    </div>
                    <draggable
                      v-model="form.msgData"
                      class="item-reg__list"
                      draggable=".item--draggable"
                      v-else
                    >
                      <div
                        v-for="(msg, i) in form.msgData" :key="i"
                        class="item"
                        :class="[{'active': msg.isActive},]"
                        @click="cardActive(i)"
                      >
                        <span v-text="`카드${msg.index}`" class="item-text"></span>
                        <ButtonCmp
                          type="btn-only-icon"
                          ><i class="icon-copy"></i>
                        </ButtonCmp>
                        <a role="button" class="btn-del" v-if="isCardEdit"
                        @click="removeCard(i)"
                        ><span class="blind">삭제</span></a>
                      </div>
                    </draggable>
                    <a role="button" class="btn-add"
                      v-if="form.msgData.length < 6"
                      :class="{'inactive' :  form.chatType == 'chatBubble'}"
                      @click="addCard()"
                      >+<span class="blind">추가</span></a>
                  </div>
                  <div class="ctrl-btns">
                    <ButtonCmp
                        type="btn-line"
                        size="small"
                        :disabled="form.chatType == 'chatBubble' || form.msgData.length < 2"
                        v-if="!isCardEdit"
                        @click="isCardEdit = true"
                    >편집</ButtonCmp>
                    <ButtonCmp
                        type="btn-blue"
                        size="small"
                        v-if="isCardEdit"
                        @click="saveCardEdit"
                    >저장</ButtonCmp>
                  </div>
                </div>
                <!--  // 카드 추가, 드래그 영역 -->
                <!-- 말풍선 내용 영역 -->
                <template v-if="form.chatType !== 'card'">
                  <table class="table table-bodyonly form-table" :key="j" >
                    <colgroup>
                      <col width="196px">
                      <col />
                    </colgroup>
                    <tbody>
                      <tr>
                        <th scope="row"><span class="form-item__label required">내용</span></th>
                        <td>
                          <div class="form-item__content is-emoji">
                            <div class="form-item-row">
                              <div class="input-item input-limit">
                                <div class="textarea">
                                  <textarea maxlength="1300" placeholder="내용을 입력해주세요."  v-model="form.bubbleContent"
                                  ref="bubbleContent"
                                  style="height: 320px"></textarea>
                                  <div class="textarea-limit__text">
                                    <Emoji @input="onSelectEmoji($event, 'bubbleContent')"/>
                                    <p>
                                      {{ form.bubbleContent.length }}/1,300자
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <p class="guide-text error">내용을 입력해주세요.</p>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </template>
                <!-- // 말풍선 내용 영역 -->
                <!-- 카드 내용 영역 -->
                <template v-else>
                  <template v-for="(msg, j) in form.msgData">
                    <table class="table table-bodyonly form-table" v-if="msg.isActive" :key="j" >
                      <colgroup>
                        <col width="196px">
                        <col />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th scope="row"><span class="form-item__label required">이미지</span></th>
                          <td>
                            <div class="form-item__content is-emoji">
                              <div class="form-item-row">
                                <div class="input-item">
                                  <span class="input"><input type="text" class="input" v-model="msg.imgFile" disabled /></span>
                                  <input type="file" id="fileUp" class="input blind" @change="onFileChanged">
                                  <label for="fileUp" class="btn btn-default-line">파일찾기</label>
                                </div>
                              </div>
                              <p class="guide-text black">&middot; 이미지 사이즈: 900 * 1,200</p>
                              <p class="guide-text black">&middot; 파일형식: JPG, PNG, GIF, BMP(최대 1MB, 단, 동일한 파일을 등록하는 경우 크기에 합산되지 않습니다.)</p>
                            </div>
                          </td>
                        </tr>
                        <tr v-if="form.chatCardTitle == 'Y'">
                          <th scope="row"><span class="form-item__label required">타이틀</span></th>
                          <td>
                            <div class="form-item__content is-emoji">
                              <div class="form-item-row">
                                <div class="input-item input-limit">
                                  <div class="input">
                                    <input type="text" class="input" maxlength="20"
                                      v-model="msg.title"
                                      placeholder="타이틀을 입력하세요."
                                      ref="cardTitle"
                                    >
                                    <div class="input-limit__text">
                                      <Emoji @input="onSelectEmoji($event, 'cardTitle', j)" />
                                      <p>{{ msg.title.length }}/20자</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <p class="guide-text error">타이틀을 입력해주세요.</p>
                            </div>
                          </td>
                        </tr>
                        <tr v-if="form.chatCardContent == 'Y'">
                          <th scope="row"><span class="form-item__label required">내용</span></th>
                          <td>
                            <div class="form-item__content is-emoji">
                              <div class="form-item-row">
                                <div class="input-item input-limit">
                                  <div class="textarea">
                                    <textarea maxlength="1300" placeholder="내용을 입력해주세요."  v-model="msg.cardContent"
                                    style="height: 200px;"
                                    ref="cardContent"
                                    ></textarea>
                                    <div class="textarea-limit__text">
                                      <Emoji @input="onSelectEmoji($event, 'cardContent', j)" />
                                      <p>
                                        {{ msg.cardContent.length }}/1,300자
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <p class="guide-text error">내용을 입력해주세요.</p>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <th scope="row"><span class="form-item__label required">버튼</span></th>
                          <td>
                            <div class="form-item__content">
                                <div class="form-item-row">
                                  <div class="input-item">
                                    <span class="radiobox">
                                      <input type="radio" name="btn" id="btnN" value="N" v-model="msg.btnUse"
                                      />
                                      <label for="btnN"><span class="radiobox__text">미사용</span></label>
                                    </span>
                                    <span class="radiobox">
                                      <input type="radio" name="btn" id="btnY" value="Y" v-model="msg.btnUse"
                                      />
                                      <label for="btnY"><span class="radiobox__text">사용</span></label>
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div class="form-item__content" v-if="msg.btnUse === 'Y'">
                                <div class="form-item-row">
                                  <div class="input-item">
                                    <span class="radiobox">
                                      <input type="radio" name="direction" id="row" value="row" v-model="msg.btnDirection"
                                      />
                                      <label for="row"><span class="radiobox__text">좌우 배치</span></label>
                                    </span>
                                    <span class="radiobox">
                                      <input type="radio" name="direction" id="column" value="column" v-model="msg.btnDirection"
                                      />
                                      <label for="column"><span class="radiobox__text">상하 배치</span></label>
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <ChatCardButtonReg :buttons="msg.buttons" v-if="msg.btnUse === 'Y'"/>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </template>
                </template>
                <!-- // 카드 내용 영역 -->
              </div>
            </form>
          </div>
          <!-- 에뮬레이터 -->
          <div class="brand-aside">
            <ChatEmulator
              :chatInfoData="chatInfoData"
              :chatMsgData="form"
            />
          </div>
          <!-- // 에뮬레이터 -->
        </div>
        <div class="top-notice--gray">
          <p>- 간편챗봇은 담당자의 승인 없이 자유롭게 등록, 삭제 할 수 있습니다.</p>
          <p>- 단, 연결된 챗봇 메시지를 삭제하는 경우 간편챗봇이 정상적으로 작동하지 않을 수 있으므로 주의해주세요.</p>
        </div>
        <div class="button__wrap flex-end">
          <ButtonCmp
              type="btn-line"
              @click="isSaveDraft"
          >임시 저장</ButtonCmp>
          <ButtonCmp
              type="btn-blue"
              @click="onSubmit"
          >저장</ButtonCmp>
        </div>
      </div>
    </div>
    <ModalView
      v-if="isModalViewed"
      @closeModal="isModalViewed = false"
    >
      <!-- 간편챗봇 메시지 유형 변경 시 alert -->
      <ConfirmMsg
      v-if="isChatbotMsgChange"
        @closeModal="isModalViewed = false"
      >
        <div class="msg" slot="msg">
          상품유형을 변경하는 경우 입력한 메시지가 삭제됩니다.<br>
          상품유형을 변경 하시겠습니까?
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
      <!-- //간편챗봇 메시지 유형 변경 시 alert -->
      <!-- 임시 저장 alert -->
      <ConfirmMsg
      v-if="isSaveDraftMsg"
        @closeModal="isModalViewed = false"
      >
        <div class="msg" slot="msg">
          임시저장이 완료되었습니다.
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
      <!-- // 임시저장 alert -->
      <ChatbotConnect
        v-if="isChatBotConnect"
        @closeModal="isModalViewed = false, isChatBotConnect = false"
      >
      </ChatbotConnect>
    </ModalView>
  </div>
</template>

<script>
import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import ChatEmulator from '@/views/brand/components/ChatEmulator.vue'
import draggable from 'vuedraggable'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ChatCardButtonReg from '@/views/brand/chatbot/components/ChatCardButtonReg.vue'
import ChatChipButtonReg from '@/views/brand/chatbot/components/ChatChipButtonReg.vue'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/join/components/ConfirmMsg.vue'
import ChatbotConnect from '@/views/brand/chatbot/components/ChatbotConnect.vue'
import Emoji from '@/components/common/Emoji.vue'
import 'emoji-picker-element'

export default {
  components: {
    PageTitle,
    ChatEmulator,
    draggable,
    BrandLnb,
    ButtonCmp,
    ChatCardButtonReg,
    ChatChipButtonReg,
    ModalView,
    ConfirmMsg,
    ChatbotConnect,
    Emoji
  },
  data() {
    return {
      form: {
        chatType: 'chatBubble',
        chatbotMsgName: '',
        imgSize: 'full',
        chatCardTitle: 'N',
        chatCardContent: 'N',
        chipBtnUse: 'N',
        chipButtons: [],
        bubbleContent: '',
        copyMsg: 'Y',
        msgData: [{
          index: 1,
          isActive: true,
          imgFile: 'dummy/template_image.png',
          title: '',
          cardContent: '',
          btnUse: 'N',
          btnDirection: 'row',
          buttons: []
        }]
      },
      isCardEdit: false,
      chatInfoData: {
        chatType: 'chatBubble',
        chatRoomName: 'SYSTEMSTUDIO',
        saftyMark: 'Y',
        hideInputFooter: true,
        mode: 'registration'
      },
      cardActiveIndex: 0,
      isModalViewed: false,
      isChatbotMsgChange: false,
      isSaveDraftMsg: false,
      isChatBotConnect: false,
      showSpecialCharTitle: false, // 특수문자 선택창 show 여부
      showSpecialCharBubbleContent: false
    }
  },
  computed: {
    chatMsgData() {
      return this.form.msgData.filter(msg => {
        return msg.isActive === true
      })
    }
  },
  methods: {
    // 카드 추가
    addCard () {
      let msgData = {
        index: (this.form.msgData.length + 1),
        isActive: false,
        imgFile: '',
        title: '',
        cardContent: '',
        btnUse: 'N',
        btnDirection: 'row',
        buttons: [{
          btnName: '',
          btnEvent: '',
          isActive: true
        }]
      }
      if (this.form.chatType !== 'chatBubble') {
        this.form.msgData.push(msgData)
      }
    },
    // 슬라이드 삭제
    removeCard (idx) {
      if (this.form.msgData.length > 1) {
        this.form.msgData.splice(idx, 1)
      }
    },
    // 슬라이드 활성화
    cardActive (idx) {
      this.cardActiveIndex = idx
      this.form.msgData.forEach((msg, index) => {
        if (idx !== index) {
          msg.isActive = false
        } else {
          msg.isActive = true
        }
      })
    },
    // 슬라이드 편집 활성화
    saveCardEdit() {
      this.form.msgData.forEach((msg, index) => {
        if (index === 0) {
          msg.isActive = true
        } else {
          msg.isActive = false
        }
      })
      this.isCardEdit = false
    },
    // 이미지 파일 업로드
    onFileChanged (e) {
      const files = e.target.files
      const file = files[0]
      const fileName = file.name
      this.form.msgData[0].imgFile = fileName
      this.url = URL.createObjectURL(file)
    },
    isChangeTypeCheck() {
      if (this.form.chatbotMsgName) {
        this.isModalViewed = true
        this.isChatbotMsgChange = true
      }
    },
    isSaveDraft() {
      this.isModalViewed = true
      this.isSaveDraftMsg = true
    },
    closeMsg () {
      this.isModalViewed = false
      this.isChatbotMsgChange = false
      this.isSaveDraftMsg = false
    },
    ChatBotModal() {
      this.isModalViewed = true
      this.isChatBotConnect = true
    },
    onSelectEmoji(e, target, idx) {
      let emoji = e
      let refName = target
      if (idx !== undefined) {
        this.$refs[refName][0].value += emoji
      } else {
        this.$refs[refName].value += emoji
      }
    }
  }
}
</script>

<style>
</style>
