<template>
  <div class="form-item__content chip-btn__reg">
    <div class="form-item-row is-emoji">
      <!-- 버튼명 입력 영역 -->
      <div class="input-item input-limit w--full" >
        <div class="input">
          <input type="text" class="input" maxlength="17"
            ref="nameBtn"
            :disabled="btnLen > 1 && !isEdit"
            placeholder="사용자에게 보여지는 버튼이름을 입력해주세요." v-model="buttonInfo.displayText"
          >
          <div class="input-limit__text">
            <Emoji @input="onSelectEmoji($event, 'nameBtn')"/>
            <p>{{ (buttonInfo.displayText)?buttonInfo.displayText.length:'0' }}/17자</p>
          </div>
        </div>
      </div>
      <!-- // 버튼명 입력 영역 -->
      <!-- 버튼 액션 선택 영역 -->
      <div class="input-item w--full">
        <Dropdown :options="buttonEventOptions" ref="selectBtn" placeholder="선택" v-model="buttonInfo.type" @change='btnChange'
        :disabled="btnLen > 1 && !isEdit"
        />
      </div>
      <p class="guide-text error" v-if='isSelectBtnError.txt'>{{ isSelectBtnError.txt }}</p>
      <!-- // 버튼 액션 선택 영역 -->
    </div>
    <!-- 간편 챗봇 액션 영역 -->
    <div class="form-item-row" v-if="buttonInfo.type === 'auto_reply'">
      <div class="input-item w--full" >
        <span class="input">
          <input type="text" ref='auto_reply_input' placeholder="연결할 간편챗봇 메시지를 선택하세요." v-model="buttonInfo.reply.autoReplyMsgId" disabled/>
        </span>
        <ButtonCmp
          type="btn-default-line"
          @click="ChatBotModal"
          >간편챗봇 선택
        </ButtonCmp>
      </div>
<!--      <p class="guide-text error" v-if='buttonInfo.reply.isAutoReplyMsgIdError.autoReplyMsgId'>{{ buttonInfo.reply.isAutoReplyMsgIdError.autoReplyMsgId }}</p>-->
    </div>
    <!-- // 간편 챗봇 액션 영역 -->
    <!-- 챗봇 연결 액션 영역 -->
    <div class="form-item-row" v-if="buttonInfo.type == 'basic_reply'">
      <div class="input-item w--full" >
<!--        <span class="input">
          <input type="text" placeholder="http://api.import.kr/application/json" v-model="buttonInfo.reply" disabled/>
        </span>-->
      </div>
    </div>
    <!-- // 챗봇 연결 액션 영역 -->
    <!-- 전화 연결 액션 영역 -->
    <div class="form-item-row" v-if="buttonInfo.type == 'dial_phone_number'">
      <div class="input-item input-limit">
        <div class="input">
          <input type="text" ref='dial_phone_number_input' placeholder="-없이 번호만 입력해주세요." v-model='buttonInfo.action.dialerAction.dialPhoneNumber.phoneNumber' maxlength="40"/>
          <p class="input-limit__text">
            {{ buttonInfo.action.dialerAction.dialPhoneNumber.phoneNumber.length }}/40자
          </p>
          <p class="guide-text error" v-if='buttonInfo.action.isDialerActionError.phoneNumber'>{{ buttonInfo.action.isDialerActionError.phoneNumber }}</p>
        </div>
      </div>
    </div>
    <!-- // 전화 연결 액션 영역 -->
    <!-- 브랜드 소식 연결 액션 영역 -->
    <div class="form-item-row" v-if="buttonInfo.type == 'feed_url'">
      <div class="input-item w--full" >
        <span class="input">
          <input type="text" ref='feed_url_input' placeholder="http://brandnews/pages/viewpage.action?pag" v-model="buttonInfo.action.urlAction.openUrl.url" disabled/>
        </span>
        <ButtonCmp
          type="btn-default-line"
          @click='BrandFeedModal'
          >브랜드 소식 선택
        </ButtonCmp>
      </div>
      <p class="guide-text error" v-if='buttonInfo.action.isUrlActionError.url'>{{ buttonInfo.action.isUrlActionError.url }}</p>
    </div>
    <!-- // 브랜드 소식 연결 액션 영역 -->
    <!-- 복사 하기 액션 영역 -->
    <div class="form-item-row" v-if="buttonInfo.type == 'copy_to_clipboard'">
      <div class="input-item  w--full" >
        <div class="textarea">
          <textarea maxlength="200" placeholder="복사할 내용을 입력해주세요."  v-model="buttonInfo.action.clipboardAction.copyToClipboard.text"
          ref="copy_to_clipboard_text"
          ></textarea>
          <div class="textarea-limit__text">
            <Emoji @input="onSelectEmoji($event, 'copy_to_clipboard_input')"/>
            <p>
              {{ buttonInfo.action.clipboardAction.copyToClipboard.text.length }}/200자
            </p>
          </div>
        </div>
      </div>
      <p class="guide-text error" v-if='buttonInfo.action.isClipboardActionError.text'>{{ buttonInfo.action.isClipboardActionError.text }}</p>
    </div>
    <!-- // 복사 하기 액션 영역 -->
    <!-- 다른 대화방 연결 액션 영역 -->
    <div class="form-item-row" v-if="buttonInfo.type == 'chatroom'">
      <div class="input-item input-limit" >
        <div class="input">
          <input type="text" ref='chatroom_input' placeholder="-없이 번호만 입력해주세요." v-model="buttonInfo.action.composeAction.composeTextMessage.phoneNumber" maxlength="40"/>
          <p class="input-limit__text">
            {{ buttonInfo.action.composeAction.composeTextMessage.phoneNumber.length }}/40자
          </p>
        </div>
      </div>
      <p class="guide-text error" v-if='buttonInfo.action.isComposeActionError.phoneNumber'>{{ buttonInfo.action.isComposeActionError.phoneNumber }}</p>
      <div class="input-item w--full" >
        <div class="textarea">
          <textarea maxlength="100" placeholder="문자메시지 내용을 입력해주세요." v-model="buttonInfo.action.composeAction.composeTextMessage.text"
          ref="chatroom_text"
          ></textarea>
          <div class="textarea-limit__text">
            <Emoji @input="onSelectEmoji($event, 'chatroom_text')"/>
            <p>
              {{ buttonInfo.action.composeAction.composeTextMessage.text }}/100자
            </p>
          </div>
        </div>
      </div>
      <p class="guide-text error" v-if='buttonInfo.action.isComposeActionError.text'>{{ buttonInfo.action.isComposeActionError.text }}</p>
    </div>
    <!-- // 다른 대화방 연결 액션 영역 -->
    <!-- 외부 브라우저 연결 액션 영역 -->
    <div class="form-item-row" v-if="buttonInfo.type == 'open_url'">
      <div class="input-item input-limit">
        <div class="input">
          <input type="text" ref='open_url_input' placeholder="http:// 형식으로 입력해주세요." v-model="buttonInfo.action.urlAction.openUrl.url" maxlength="100"/>
          <p class="input-limit__text">
            {{ buttonInfo.action.urlAction.openUrl.url.length }}/100자
          </p>
          <p class="guide-text error" v-if='buttonInfo.action.isUrlActionError.url'>{{ buttonInfo.action.isUrlActionError.url }}</p>
        </div>
      </div>
    </div>
    <!-- // 외부 브라우저 연결 액션 영역 -->
    <!-- 내부 브라우저 연결 액션 영역 -->
    <div class="form-item-row" v-if="buttonInfo.type == 'local_url'">
      <div class="input-item input-limit">
        <div class="input">
          <input type="text" ref='local_url_input' placeholder="http:// 형식으로 입력해주세요." v-model="buttonInfo.action.localBrowserAction.openUrl.url" maxlength="100"/>
          <p class="input-limit__text">
            {{ buttonInfo.action.localBrowserAction.openUrl.url.length }}/100자
          </p>
        </div>
      </div>
      <p class="guide-text error" v-if='buttonInfo.action.isLocalBrowserActionError.url'>{{ buttonInfo.action.isLocalBrowserActionError.url }}</p>
      <div class="input-item">
        <span class="item-label">보기 방식</span>
        <span class="radiobox">
          <input type="radio" name="viewMode" id="fullView" :value="false" v-model="buttonInfo.action.localBrowserAction.openUrl.isHalfView" />
          <label for="fullView"><span class="radiobox__text">Full view</span></label>
        </span>
        <span class="radiobox">
          <input type="radio" name="viewMode" id="HalfView" :value="true" v-model="buttonInfo.action.localBrowserAction.openUrl.isHalfView"
          />
          <label for="HalfView"><span class="radiobox__text">Half view</span></label>
        </span>
      </div>
      <div class="input-item w--full" >
        <div class="textarea">
          <textarea maxlength="1000" style="height: 230px"
          v-model="buttonInfo.action.localBrowserAction.openUrl.postParameter"
          placeholder='인앱브라우저에서 URL 호출 시 POST방식으로 파라미터를 전달하고자 할 경우, 파라미터 개수만큼 아래 형식으로 구분하여 작성하세요. (URL 상의 웹페이지는 content-type:application/x-www-form-urlencoded로 설정하시면 됩니다.)
<작성예시>
"name":"value", "alge":30,"isBoolean":true' ref='local_url_text'></textarea>
          <div class="textarea-limit__text">
            <p>
              {{ buttonInfo.action.localBrowserAction.openUrl.postParameter.length }}/1000자
            </p>
          </div>
        </div>
      </div>
      <p class="guide-text error" v-if='buttonInfo.action.isLocalBrowserActionError.postParameter'>{{ buttonInfo.action.isLocalBrowserActionError.postParameter }}</p>
    </div>
    <!-- // 내부 브라우저 연결 액션 영역 -->
    <!-- 좌표 지도 연결 액션 영역 -->
    <div class="form-item-row" v-if="buttonInfo.type === 'show_location' || buttonInfo.type === 'search_locations'">
      <div class="input-item input-limit" v-if="buttonInfo.type === 'show_location'">
        <div class="input">
          <input type="text" ref='show_location_input0' placeholder="위도를 입력해주세요." v-model="buttonInfo.action.mapAction.showLocation.location.latitude" maxlength="40"/>
          <p class="input-limit__text">
            {{ buttonInfo.action.mapAction.showLocation.location.latitude.length }}/40자
          </p>
          <p class="guide-text error" v-if='buttonInfo.action.isMapActionError.latitude'>{{ buttonInfo.action.isMapActionError.latitude }}</p>
        </div>
      </div>
      <div class="input-item input-limit" v-if="buttonInfo.type === 'show_location'">
        <div class="input">
          <input type="text" ref='show_location_input1' placeholder="경도를 입력해주세요." v-model="buttonInfo.action.mapAction.showLocation.location.longitude" maxlength="40"/>
          <p class="input-limit__text">
            {{ buttonInfo.action.mapAction.showLocation.location.longitude.length }}/40자
          </p>
          <p class="guide-text error" v-if='buttonInfo.action.isMapActionError.longitude'>{{ buttonInfo.action.isMapActionError.longitude }}</p>
        </div>
      </div>
      <!-- 좌표용 위치 입력 -->
      <div class="input-item input-limit" v-if="buttonInfo.type === 'show_location'">
        <div class="input">
          <input type="text" ref='show_location_input2' placeholder="위치를 입력해주세요." v-model="buttonInfo.action.mapAction.showLocation.location.label" maxlength="100"/>
          <p class="input-limit__text">
            {{ buttonInfo.action.mapAction.showLocation.location.label.length }}/100자
          </p>
          <p class="guide-text error" v-if='buttonInfo.action.isMapActionError.label'>{{ buttonInfo.action.isMapActionError.label }}</p>
        </div>
      </div>
      <!-- 쿼리용 위치 입력 -->
      <div class="input-item input-limit" v-if="buttonInfo.type === 'search_locations'">
        <div class="input">
          <input type="text" ref='search_locations_input0' placeholder="위치를 입력해주세요." v-model="buttonInfo.action.mapAction.showLocation.location.query" maxlength="100"/>
          <p class="input-limit__text">
            {{ buttonInfo.action.mapAction.showLocation.location.query.length }}/100자
          </p>
          <p class="guide-text error" v-if='buttonInfo.action.isMapActionError.query'>{{ buttonInfo.action.mapAction.query }}</p>
        </div>
      </div>
      <div class="input-item input-limit">
        <div class="input">
          <input type="text" ref='locations0' placeholder="Fallback URL을 입력 http:// 형식으로 입력해주세요." v-model="buttonInfo.action.mapAction.showLocation.fallbackUrl" maxlength="100"/>
          <p class="input-limit__text">
            {{ buttonInfo.action.mapAction.showLocation.fallbackUrl.length }}/100자
          </p>
          <p class="guide-text error" v-if='buttonInfo.action.isMapActionError.fallbackUrl'>{{ buttonInfo.action.isMapActionError.fallbackUrl }}</p>
        </div>
      </div>
    </div>
    <!-- // 좌표 지도 연결 액션 영역 -->
    <!-- 캘린더 액션 영역 -->
    <div class="form-item-row" v-if="buttonInfo.type === 'create_calendar_event'">
      <div class="input-item w--full" ref='create_calendar_event_input0'>
        <el-date-picker
          v-model="buttonInfo.action.calendarAction.datePicker"
          type="daterange"
          range-separator="~"
          format="yyyy.MM.dd"
          value-format="yyyyMMdd"
          class="w--full"
        />
      </div>
      <p class="guide-text error" v-if='buttonInfo.action.isCalendarActionError.datePicker'>{{ buttonInfo.action.isCalendarActionError.datePicker }}</p>
      <div class="input-item input-limit">
        <div class="input">
          <input type="text" ref='create_calendar_event_input1' placeholder="제목을 입력해주세요." v-model="buttonInfo.action.calendarAction.createCalendarEvent.title" maxlength="40"/>
          <p class="input-limit__text">
            {{ buttonInfo.action.calendarAction.createCalendarEvent.title.length }}/40자
          </p>
          <p class="guide-text error" v-if='buttonInfo.action.isCalendarActionError.title'>{{ buttonInfo.action.isCalendarActionError.title }}</p>
        </div>
      </div>
      <div class="input-item w--full" >
        <div class="textarea">
          <textarea maxlength="500" placeholder="내용을 입력해주세요."
          ref='create_calendar_event_text'
          v-model="buttonInfo.action.calendarAction.createCalendarEvent.description"></textarea>
          <div class="textarea-limit__text">
            <Emoji @input="onSelectEmoji($event, 'create_calendar_event_text')"/>
            <p>
              {{ buttonInfo.action.calendarAction.createCalendarEvent.description.length }}/500자
            </p>
          </div>
          <p class="guide-text error" v-if='buttonInfo.action.isCalendarActionError.description'>{{ buttonInfo.action.isCalendarActionError.description }}</p>
        </div>
      </div>
    </div>
    <!-- 캘린더 액션 영역 -->
    <div class="form-item-row">
      <ButtonCmp
        type="btn-default-line"
        @click="addBtn"
        :disabled="btnLen > 1"
        v-if="!this.isEdit"
        >추가
      </ButtonCmp>
      <ButtonCmp
          type="btn-default-line"
          @click="saveBtnInfo"
          v-if="this.isEdit"
        >수정
      </ButtonCmp>
    </div>
    <div class="form-item-row" v-if="btnLen">
      <ul class="button-reg-list">
        <template v-for="(btn, j) in buttons">
          <li
            @click="editBtnInfo(j)"
            :key="j"
            :class="{'active': activeBtnIndex == j}"
          >
            <span class="button-name">{{ btn.displayText }}</span>
            <a role="button" class="btn-del" @click="removeBtn(j)"><span class="blind" >삭제</span></a>
          </li>
        </template>
      </ul>
    </div>
    <ModalView
      v-if="isModalViewed"
      @closeModal="isModalViewed = false"
    >
      <ChatbotConnect
        v-if="isChatBotConnect"
        @closeModal="isModalViewed = false, isChatBotConnect = false"
        @chooseAutoReplyMsg='chooseAutoReplyMsg'
      >
      </ChatbotConnect>
      <BrandNewsConnect
        v-if='isBrandNewsConnect'
        @closeModal="isModalViewed = false, isBrandNewsConnect = false"
        @chooseBrandNews='chooseBrandNews'
      >
      </BrandNewsConnect>
    </ModalView>
  </div>
</template>

<script>
import Dropdown from '@/components/common/Dropdown.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Emoji from '@/components/common/Emoji.vue'
import 'emoji-picker-element'
import { mapGetters } from 'vuex'
import actionData from '@/components/js/openrichcardDefaultRefData'
import ChatbotConnect from '@/views/brand/autoreply/components/ChatbotConnect.vue'
import BrandNewsConnect from '@/views/brand/autoreply/components/BrandNewsConnect.vue'
import ModalView from '@/components/common/ModalView.vue'
import autoReplyMsgUtils from '@/views/brand/autoreply/components/js/autoReplyMsgUtils'

export default {
  components: {
    ModalView,
    ChatbotConnect,
    BrandNewsConnect,
    Dropdown,
    ButtonCmp,
    Emoji
  },
  data () {
    return {
      isEdit: false,
      activeBtnIndex: undefined,
      buttonInfo: {
        displayText: ''
      },
      buttonEventOptions: [
        { codeNm: '간편챗봇 연결', code: 'auto_reply' },
        { codeNm: '챗봇 연결', code: 'basic_reply' },
        { codeNm: '전화걸기', code: 'dial_phone_number' },
        { codeNm: '브랜드 소식 연결', code: 'feed_url' },
        { codeNm: '복사하기', code: 'copy_to_clipboard' },
        { codeNm: '다른 대화방 연결', code: 'chatroom' },
        { codeNm: 'URL(외부 브라우저)', code: 'open_url' },
        { codeNm: 'URL(내부 브라우저)', code: 'local_url' },
        { codeNm: '지도 보여주기(좌표)', code: 'show_location' },
        { codeNm: '지도 보여주기(쿼리)', code: 'search_locations' },
        { codeNm: '사용자 위치 공유하기', code: 'request_location_push' },
        { codeNm: '캘린더 등록하기', code: 'create_calendar_event' }
      ],
      isModalViewed: false,
      isChatBotConnect: false,
      isBrandNewsConnect: false,
      isNameBtnError: {
        isShow: false,
        txt: ''
      },
      isSelectBtnError: {
        isShow: false,
        txt: ''
      }
    }
  },
  computed: {
    ...mapGetters('autoReply', {
      buttons: 'getChipSuggestions'
    }),
    btnLen() {
      return this.buttons.length
    }
  },
  created() {
    let btn = this.buttons[0]
    if (btn) {
      this.buttonInfo = JSON.parse(JSON.stringify(btn))
      this.isEdit = true
      this.activeBtnIndex = 0
    } else {
      for (const key in actionData['suggestions']) {
        this.buttonInfo.action = actionData['suggestions'][key]
      }
      this.isEdit = false
    }
    // this.buttonInfo = Object.assign({}, btn)
  },
  methods: {
    btnChange(code) {
      let displayText = this.buttonInfo.displayText
      if (code.indexOf('reply') > -1) {
        this.buttonInfo = {}
        this.buttonInfo = {
          reply: {
            displayText: '',
            autoReplyMsgId: '',
            postback: {
              data: ''
            },
            isAutoReplyMsgIdError: {
              isShow: false,
              autoReplyMsgId: ''
            }
          },
          type: code,
          displayText
        }
      } else {
        this.buttonInfo = {}
        this.buttonInfo = { action: actionData['suggestions'][code], type: code, displayText }
      }
    },
    resetButtonData() {
      let btn = {
        action: {
          displayText: '',
          postback: { data: '' }
        }
      }
      this.buttonInfo = btn
    },
    addBtn() {
      // 유효성 체크
      if (!this.actionCheck()) return false
      // let btn = JSON.parse(JSON.stringify(this.buttonInfo))
      let btn = Object.assign({}, this.buttonInfo)
      for (const key in actionData['suggestions'][btn.type]) {
        if (key.indexOf('Error') > -1) {
          btn.action[key] = actionData['suggestions'][btn.type][key]
          break
        }
      }
      this.buttons.push(btn)
      this.resetButtonData()
      this.isEdit = false
    },
    editBtnInfo (index) {
      this.activeBtnIndex = index
      let btn = this.buttons[index]
      this.buttonInfo = JSON.parse(JSON.stringify(btn))
      // this.buttonInfo = Object.assign({}, btn)
      this.isEdit = true
    },
    saveBtnInfo() {
      // 유효성 체크
      if (!this.actionCheck()) return false
      // let btn = JSON.parse(JSON.stringify(this.buttonInfo))
      let btn = Object.assign({}, this.buttonInfo)
      // this.buttons[this.activeBtnIndex] = btn
      this.buttons[this.activeBtnIndex].displayText = btn.displayText
      if (btn.type.indexOf('reply') > -1) {
        this.buttons[this.activeBtnIndex].reply = {}
        for (let key in btn.reply) {
          if (key === 'autoReplyMsgId' || key === 'displayText' || key === 'postback') {
            this.buttons[this.activeBtnIndex].reply[key] = btn.reply[key]
          }
        }
      } else {
        this.buttons[this.activeBtnIndex].action = {}
        for (let key in btn.action) {
          if (key !== 'displayText' && key !== 'postback') {
            this.buttons[this.activeBtnIndex].action[key] = btn.action[key]
          }
        }
      }
      this.buttons[this.activeBtnIndex].type = btn.type
      // this.setChipBtnData(this.activeBtnIndex, btn)
      // this.$emit('updateChipBtn', { btn: JSON.parse(JSON.stringify(btn)), idx: this.activeBtnIndex })
      this.resetButtonData()
      this.isEdit = false
      this.activeBtnIndex = undefined
    },
    removeBtn(index) {
      this.buttons.splice(index, 1)
      this.resetButtonData()
      this.isEdit = false
      this.activeBtnIndex = undefined
    },
    onSelectEmoji(e, target) {
      let emoji = e
      let refName = target
      this.$refs[refName].value += emoji
    },
    validateData() {
      // 칩 버튼 개수 만큼 루프
      for (let i = 0; i < this.buttons.length; i++) {
        // let targets = this.getCheckTargetOfSuggestions(buttons[i])
        // if (!autoReplyMsgUtils.validateDataCheck(this.buttons[i], this.$refs)) {
        //   return false
        // }
      }
      return true
    },
    actionCheck() {
      this.$refs['nameBtn'].style.border = '1px solid #DDDDDD'
      this.$refs['selectBtn'].style.border = 'border: 1px solid #DDDDDD'
      if (jglib.isEmpty(this.buttonInfo.displayText)) {
        // this.isNameBtnError.txt = '버튼명을 입력해 주세요.'
        this.$refs['nameBtn'].style.border = '1px solid red'
        this.$refs['nameBtn'].focus()
        return false
      }
      // this.isNameBtnError.txt = ''
      // 버튼 기능 체크
      if (jglib.isEmpty(this.buttonInfo.type)) {
        // this.isSelectBtnError.txt = '버튼 유형을 선택해주세요.'
        this.$refs['selectBtn'].style.border = 'border: 1px solid red'
        this.$refs['selectBtn'].focus()
        return false
      }
      // autoReplyMsgUtils.validateInit(this.buttonInfo, this.$refs)
      // if (!autoReplyMsgUtils.validateDataCheck(this.buttonInfo, this.$refs)) {
      //   return false
      // }
      return true
    },
    ChatBotModal() {
      this.isModalViewed = true
      this.isChatBotConnect = true
    },
    BrandFeedModal() {
      this.isModalViewed = true
      this.isBrandNewsConnect = true
    },
    chooseAutoReplyMsg(msg) {
      this.buttonInfo.reply.autoReplyMsgId = msg.armId
    },
    chooseBrandNews(msg) {
      this.buttonInfo.action.urlAction.openUrl.url = msg.feedUrl
    }
  }
}
</script>

<style>

</style>
