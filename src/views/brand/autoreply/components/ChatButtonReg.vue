<template>
  <div>
    <div class="button-group">
      <div class="form-item__content chip-btn__reg">
        <div class="form-item-row">
          <div class="input-item select-button-type">
            <span class="radiobox">
              <input type="radio" :name="`btnEvent${prepix}`" :id="`url${prepix}`" value="open_url" checked v-model="buttonInfo.btnEvent" @change='changeBtn' />
              <label :for="`url${prepix}`"><span class="radiobox__text">URL 연결</span></label>
            </span>
            <span class="radiobox">
              <input type="radio" :name="`btnEvent${prepix}`" :id="`call${prepix}`" value="dial_phone_number" v-model="buttonInfo.btnEvent" @change='changeBtn' />
              <label :for="`call${prepix}`"><span class="radiobox__text">전화하기</span></label>
            </span>
            <span class="radiobox">
              <input type="radio" :name="`btnEvent${prepix}`" :id="`otherType${prepix}`" value="other" v-model="buttonInfo.btnEvent" @change='changeBtn' />
              <label :for="`otherType${prepix}`"><span class="radiobox__text">기타</span></label>
            </span>
            <div class="input">
              <Dropdown :options="buttonEventOptions" v-model="buttonInfo.btnOtherEvent"
                        :disabled="buttonInfo.btnEvent !== 'other' && !isEdit" placeholder='선택' @change='changeBtn'
              />
            </div>
          </div>
        </div>
        <!-- 버튼명 입력        -->
        <div class="form-item-row is-emoji">
          <div class="input-item input-limit w--full" >
            <div class="input">
              <input type="text" class="input" maxlength="17"
                     :ref="`btnName_${cardIndex}_${index}`"
                     placeholder="사용자에게 보여지는 버튼이름을 입력해주세요." v-model="buttonInfo.btnName"
                     @input='e => buttonInfo.btnName = e.target.value'
              >
              <div class="input-limit__text">
                <Emoji @input="onSelectEmoji($event, `btnName_${cardIndex}_${index}`)"/>
                <p>{{ buttonInfo.btnName.length }}/17자</p>
              </div>
            </div>
          </div>
          <p class="guide-text error" style='display: none' :ref="`btnName_${cardIndex}_${index}_error`"></p>
        </div>
        <!-- // 버튼명 입력        -->
        <!-- 간편 챗봇 영역        -->
        <div class="form-item-row" v-if="buttonInfo.btnOtherEvent == 'auto_reply' && buttonInfo.btnEvent === 'other'">
          <div class="input-item w--full" >
            <span class="input">
              <input type="text"
                     placeholder="연결할 간편챗봇 메시지를 선택하세요."
                     v-model="buttonInfo.reply.autoReplyMsgId"
                     :ref='`auto_reply_id_${cardIndex}_${index}`'
                     disabled/>
            </span>
            <ButtonCmp
              type="btn-default-line"
              @click="ChatBotModal"
            >간편챗봇 선택
            </ButtonCmp>
          </div>
          <p class="guide-text error" style='display: none' :ref='`auto_reply_id_${cardIndex}_${index}_error`'></p>
        </div>
        <!-- // 간편 챗봇 영역        -->
        <!-- 챗봇 연결 영역        -->
        <div class="form-item-row" v-if="buttonInfo.btnOtherEvent == 'basic_reply' && buttonInfo.btnEvent === 'other'">
<!--          <div class="input-item w&#45;&#45;full" >
            <span class="input">
              <input type="text" placeholder="http://api.import.kr/application/json" v-model="buttonInfo.reply" disabled/>
            </span>
          </div>-->
        </div>
        <!-- // 챗봇 연결 영역        -->
        <!-- 전화 걸기        -->
        <div class="form-item-row" v-if="buttonInfo.btnEvent == 'dial_phone_number'">
          <div class="input-item input-limit">
            <div class="input">
              <input type="text"
                     placeholder="-없이 번호만 입력해주세요."
                     v-model="buttonInfo.action.dialerAction.dialPhoneNumber.phoneNumber"
                     maxlength="40"
                     :ref='`phone_number_${cardIndex}_${index}`'
              />
              <p class="input-limit__text">
                {{ buttonInfo.action.dialerAction.dialPhoneNumber.phoneNumber.length }}/40자
              </p>
            </div>
          </div>
          <p class="guide-text error" style='display: none' :ref='`phone_number_${cardIndex}_${index}_error`'></p>
        </div>
        <!-- // 전화 걸기 영역        -->
        <!-- 브랜드 소식 연결 영역        -->
        <div class="form-item-row" v-if="buttonInfo.btnOtherEvent == 'feed_url' && buttonInfo.btnEvent === 'other'">
          <div class="input-item w--full" >
            <span class="input">
              <input type="text"
                     placeholder="http://brandnews/pages/viewpage.action?pag"
                     v-model="buttonInfo.action.urlAction.openUrl.url"
                     :ref='`feed_url_${cardIndex}_${index}`'
                     disabled
              />
            </span>
            <ButtonCmp
              type="btn-default-line"
              @click='BrandFeedModal'
            >브랜드 소식 선택
            </ButtonCmp>
          </div>
          <p class="guide-text error" style='display: none' :ref='`feed_url_${cardIndex}_${index}_error`'></p>
        </div>
        <!-- // 브랜드 소식 연결 영역        -->
        <!-- 복사 하기 영역        -->
        <div class="form-item-row" v-if="buttonInfo.btnOtherEvent == 'copy_to_clipboard' && buttonInfo.btnEvent === 'other'">
          <div class="input-item  w--full" >
            <div class="textarea">
              <textarea maxlength="200"
                        placeholder="복사할 내용을 입력해주세요."
                        v-model="buttonInfo.action.clipboardAction.copyToClipboard.text"
                        :ref="`copy_${cardIndex}_${index}`"
              ></textarea>
              <div class="textarea-limit__text">
                <Emoji @input="onSelectEmoji($event, 'copyContent')"/>
                <p>
                  {{ buttonInfo.action.clipboardAction.copyToClipboard.text.length }}/200자
                </p>
              </div>
            </div>
          </div>
          <p class="guide-text error" style='display: none' :ref="`copy_${cardIndex}_${index}_error`"></p>
        </div>
        <!-- //복사 하기 영역        -->
        <!-- 다른 대화방 연결 영역        -->
        <div class="form-item-row" v-if="buttonInfo.btnOtherEvent == 'chatroom' && buttonInfo.btnEvent === 'other'">
          <div class="input-item input-limit" >
            <div class="input">
              <input type="text"
                     placeholder="-없이 번호만 입력해주세요."
                     v-model="buttonInfo.action.composeAction.composeTextMessage.phoneNumber"
                     maxlength="40"
                     :ref="`chatroom_number_${cardIndex}_${index}`"
              />
              <p class="input-limit__text">
                {{ buttonInfo.action.composeAction.composeTextMessage.phoneNumber.length }}/40자
              </p>
            </div>
          </div>
          <p class="guide-text error" style='display: none' :ref="`chatroom_number_${cardIndex}_${index}_error`"></p>
          <div class="input-item w--full" >
            <div class="textarea">
              <textarea maxlength="100"
                        placeholder="문자메시지 내용을 입력해주세요."
                        v-model="buttonInfo.action.composeAction.composeTextMessage.text"
                        :ref="`chatroom_text_${cardIndex}_${index}`"
              ></textarea>
              <div class="textarea-limit__text">
                <Emoji @input="onSelectEmoji($event, 'msgContent')"/>
                <p>
                  {{ buttonInfo.action.composeAction.composeTextMessage.text.length }}/100자
                </p>
              </div>
            </div>
          </div>
          <p class="guide-text error" style='display: none' :ref="`chatroom_text_${cardIndex}_${index}_error`"></p>
        </div>
        <!-- // 다른 대화방 연결 영역        -->
        <!-- 외부 브라우저 연결 영역        -->
        <div class="form-item-row" v-if="buttonInfo.btnEvent == 'open_url'">
          <div class="input-item input-limit">
            <div class="input">
              <input type="text"
                     placeholder="http:// 형식으로 입력해주세요."
                     v-model="buttonInfo.action.urlAction.openUrl.url"
                     maxlength="100"
                     :ref="`open_url_${cardIndex}_${index}`"
              />
              <p class="input-limit__text">
                {{ buttonInfo.action.urlAction.openUrl.url.length }}/100자
              </p>
            </div>
          </div>
          <p class="guide-text error" style='display: none' :ref="`open_url_${cardIndex}_${index}_error`"></p>
        </div>
        <!-- // 외부 브라우저 연결 영역        -->
        <!-- 지도 연결 (좌표, 쿼리)      -->
        <div class="form-item-row" v-if="(buttonInfo.btnOtherEvent == 'show_location' || buttonInfo.btnOtherEvent == 'search_locations') && buttonInfo.btnEvent === 'other'">
          <!-- 좌표 -->
          <template v-if="buttonInfo.btnOtherEvent == 'show_location'">
            <div class="input-item input-limit">
              <div class="input">
                <input type="text"
                       placeholder="위도를 입력해주세요."
                       v-model="buttonInfo.action.mapAction.showLocation.location.latitude"
                       maxlength="40"
                       :ref="`latitude_${cardIndex}_${index}`"
                />
                <p class="input-limit__text">
                  {{ buttonInfo.action.mapAction.showLocation.location.latitude.length }}/40자
                </p>
              </div>
            </div>
            <p class="guide-text error" style='display: none' :ref="`latitude_${cardIndex}_${index}_error`"></p>
          </template>
          <template v-if="buttonInfo.btnOtherEvent == 'show_location'">
            <div class="input-item input-limit">
              <div class="input">
                <input type="text"
                       placeholder="경도를 입력해주세요."
                       v-model="buttonInfo.action.mapAction.showLocation.location.longitude"
                       maxlength="40"
                       :ref="`longitude_${cardIndex}_${index}`"
                />
                <p class="input-limit__text">
                  {{ buttonInfo.action.mapAction.showLocation.location.longitude.length }}/40자
                </p>
              </div>
            </div>
            <p class="guide-text error" style='display: none' :ref="`longitude_${cardIndex}_${index}_error`"></p>
          </template>
          <!-- 좌표용 위치 입력 -->
          <template v-if="buttonInfo.btnOtherEvent === 'show_location'">
            <div class="input-item input-limit">
              <div class="input">
                <input type="text"
                       placeholder="위치를 입력해주세요."
                       v-model="buttonInfo.action.mapAction.showLocation.location.label"
                       maxlength="100"
                       :ref="`label_${cardIndex}_${index}`"
                />
                <p class="input-limit__text">
                  {{ buttonInfo.action.mapAction.showLocation.location.label }}/100자
                </p>
              </div>
            </div>
            <p class="guide-text error" style='display: none' :ref="`label_${cardIndex}_${index}_error`"></p>
          </template>
          <!-- 쿼리용 위치 입력 -->
          <template v-if="buttonInfo.btnOtherEvent === 'search_locations'">
            <div class="input-item input-limit" >
              <div class="input">
                <input type="text"
                       placeholder="위치를 입력해주세요."
                       v-model="buttonInfo.action.mapAction.showLocation.location.query"
                       maxlength="100"
                       :ref="`query_${cardIndex}_${index}`"
                />
                <p class="input-limit__text">
                  {{ buttonInfo.action.mapAction.showLocation.location.query.length }}/100자
                </p>
              </div>
            </div>
            <p class="guide-text error" style='display: none' :ref="`query_${cardIndex}_${index}_error`"></p>
          </template>
          <div class="input-item input-limit" >
            <div class="input">
              <input type="text"
                     placeholder="Fallback URL을 입력 http:// 형식으로 입력해주세요."
                     v-model="buttonInfo.action.mapAction.showLocation.fallbackUrl"
                     maxlength="100"
                     :ref="`fallbackUrl_${cardIndex}_${index}`"
              />
              <p class="input-limit__text">
                {{ buttonInfo.action.mapAction.showLocation.fallbackUrl.length }}/100자
              </p>
            </div>
          </div>
          <p class="guide-text error" style='display: none' :ref="`fallbackUrl_${cardIndex}_${index}_error`"></p>
        </div>
        <!-- // 지도 연결 (좌표, 쿼리)      -->
        <!-- 캘린더 연결 영역 -->
        <div class="form-item-row" v-if="buttonInfo.btnOtherEvent == 'create_calendar_event' && buttonInfo.btnEvent === 'other'">
          <div class="input-item w--full" :ref='`calendar_dateRange_${cardIndex}_${index}`'>
            <el-date-picker
              v-model="dateRangeArr"
              type="daterange"
              range-separator="~"
              format="yyyy.MM.dd"
              value-format="yyyyMMdd"
              class="w--full"
              @change='changeRange'

            />
          </div>
          <div class="input-item input-limit">
            <div class="input">
              <input type="text"
                     placeholder="제목을 입력해주세요."
                     v-model="buttonInfo.action.calendarAction.createCalendarEvent.title"
                     maxlength="40"
                     :ref='`calendar_title_${cardIndex}_${index}`'
              />
              <p class="input-limit__text">
                {{ buttonInfo.action.calendarAction.createCalendarEvent.title.length }}/40자
              </p>
            </div>
          </div>
          <p class="guide-text error" style='display: none' :ref='`calendar_title_${cardIndex}_${index}_error`'></p>
          <div class="input-item w--full" >
            <div class="textarea" :ref='`calendar_content_${cardIndex}_${index}`'>
              <textarea maxlength="500" placeholder="내용을 입력해주세요."
                        v-model="buttonInfo.action.calendarAction.createCalendarEvent.description"
              ></textarea>
              <div class="textarea-limit__text">
                <Emoji @input="onSelectEmoji($event, 'calContent')"/>
                <p>
                  {{ buttonInfo.action.calendarAction.createCalendarEvent.description.length }}/500자
                </p>
              </div>
            </div>
          </div>
          <p class="guide-text error" style='display: none' :ref='`calendar_content_${cardIndex}_${index}_error`'></p>
        </div>
        <!-- 캘린더 연결 영역 -->
      </div>
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
import autoReplyMsgUtils from '@/views/brand/autoreply/components/js/autoReplyMsgUtils'
import ModalView from '@/components/common/ModalView.vue'
import ChatbotConnect from '@/views/brand/autoreply/components/ChatbotConnect.vue'
import BrandNewsConnect from '@/views/brand/autoreply/components/BrandNewsConnect.vue'
import { mapGetters } from 'vuex'
import moment from 'moment'
// import actionData from '@/components/js/openrichcardDefaultRefData'

export default {
  components: {
    Dropdown,
    ButtonCmp,
    ModalView,
    ChatbotConnect,
    BrandNewsConnect,
    Emoji
  },
  props: {
    buttonLen: {
      type: String
    },
    index: Number,
    cardIndex: {
      type: Number,
      default: 0
    },
    btnType: String,
    buttonInfo: Object
  },
  data () {
    return {
      isEdit: false,
      activeBtnIndex: undefined,
      buttonEventOptions: JSON.parse(JSON.stringify(autoReplyMsgUtils.buttonEventOptions)),
      isModalViewed: false,
      isChatBotConnect: false,
      isBrandNewsConnect: false,
      dateRangeArr: [moment.utc().format('YYYYMMDD'), moment.utc().format('YYYYMMDD')],
      button: {}
    }
  },
  computed: {
    ...mapGetters('autoReply', {
      chip: 'getChipSuggestions',
      cardData: 'getCards'
    }),
    prepix () {
      return (this.btnType === 'card') ? ('card_' + this.cardIndex + '_' + this.index) : ('chip_' + this.index)
    },
    btnEvent () {
      if (this.buttonInfo.btnEvent === 'other') {
        return this.buttonInfo.btnOtherEvent
      } else {
        return this.buttonInfo.btnEvent
      }
    }
  },
  created() {
    // 수정화면으로 왔는데 캘린더면 값셋팅 (this.button가 vuex값이기 때문에 ui-picker에 직접 바인딩 하면 값이 노출 안됨...)
    if (this.buttonInfo.btnEvent === 'other' && this.buttonInfo.btnOtherEvent === 'create_calendar_event') {
      this.dateRangeArr = JSON.parse(JSON.stringify(this.buttonInfo.action.calendarAction.datePicker))
    }
  },
  mounted() {
    // 에러 문구 영역 감추기
    // for (let key in this.$refs) {
    //   if (key.indexOf('_error') > -1) {
    //     this.$refs[key].style.display = 'none'
    //   }
    // }
  },
  methods: {
    onSelectEmoji(e, target) {
      let emoji = e
      let refName = target
      this.$refs[refName].value += emoji
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
      this.$emit('selectedAutoReply', msg, this.cardIndex, this.index, this.btnType)
    },
    chooseBrandNews(msg) {
      this.$emit('selectedFeed', msg, this.cardIndex, this.index, this.btnType)
    },
    changeBtn() {
      let code = this.btnEvent
      this.$emit('changeBtnAction', code, this.btnType, this.cardIndex, this.index)
      if (code === 'create_calendar_event') {
        this.buttonInfo.action.calendarAction.datePicker[0] = this.dateRangeArr[0]
        this.buttonInfo.action.calendarAction.datePicker[1] = this.dateRangeArr[1]
      }
    },
    changeRange(val) {
      this.buttonInfo.action.calendarAction.datePicker[0] = val[0]
      this.buttonInfo.action.calendarAction.datePicker[1] = val[1]
    },
    validateBtnInit () {
      // 유효성 영역 초기화
      autoReplyMsgUtils.validateBtnInit(this.button, this.cardIndex, this.index, this.$refs, this.btnEvent)
    },
    validateData(obj) {
      let target = obj.target
      let reason = obj.reason
      this.$refs[target].style.border = '1px solid red'
      this.$refs[target].focus()
      if (reason === 'phoneNumber') {
        this.$refs[target + '_error'].style.display = 'flex'
        this.$refs[target + '_error'].innerHTML = '전화번호는 숫자만 입력되어야 합니다.'
      } else if (reason === 'url') {
        this.$refs[target + '_error'].style.display = 'flex'
        this.$refs[target + '_error'].innerHTML = '올바른 URL 형식이 아닙니다.'
      } else if (reason === 'float') {
        this.$refs[target + '_error'].style.display = 'flex'
        this.$refs[target + '_error'].innerHTML = '위도 / 경도는 실수 형태로 입력되어야 합니다.'
      }
    },
    validationCheck(name, isAllCheck, isSave) {
      // 유효성 영역 초기화
      this.validateBtnInit()
      let target = ''
      // 버튼 명 체크
      target = `btnName_${this.cardIndex}_${this.index}`
      if ((name === target || isAllCheck) && !isSave) {
        if (jglib.isEmpty(this.buttonInfo.btnName)) {
          this.$refs[target].style.border = '1px solid red'
          this.$refs[target].focus()
          return false
        }
      }
      // 간편 챗봇 체크
      target = `auto_reply_id_${this.cardIndex}_${this.index}`
      if ((name === target || isAllCheck) && !isSave && this.btnEvent === 'auto_reply') {
        if (jglib.isEmpty(this.buttonInfo.reply.autoReplyMsgId)) {
          this.$refs[target].style.border = '1px solid red'
          this.$refs[target].focus()
          return false
        }
      }
      // 전화 걸기 체크
      target = `phone_number_${this.cardIndex}_${this.index}`
      if ((name === target || isAllCheck) && !isSave && this.btnEvent === 'dial_phone_number') {
        if (jglib.isEmpty(this.buttonInfo.action.dialerAction.dialPhoneNumber.phoneNumber)) {
          this.$refs[target].style.border = '1px solid red'
          this.$refs[target].focus()
          return false
        }
        if (isNaN(this.buttonInfo.action.dialerAction.dialPhoneNumber.phoneNumber)) {
          this.$refs[target + '_error'].style.display = 'flex'
          this.$refs[target + '_error'].innerHTML = '숫자만 입력 가능 합니다.'
          this.$refs[target].style.border = '1px solid red'
          this.$refs[target].focus()
          return false
        }
      }
      // 브랜드 소식 체크
      target = `feed_url_${this.cardIndex}_${this.index}`
      if ((name === target || isAllCheck) && !isSave && this.btnEvent === 'feed_url') {
        if (jglib.isEmpty(this.buttonInfo.action.urlAction.openUrl.url)) {
          this.$refs[target].style.border = '1px solid red'
          this.$refs[target].focus()
          return false
        }
      }
      // 복사 하기 체크
      target = `copy_${this.cardIndex}_${this.index}`
      if ((name === target || isAllCheck) && !isSave && this.btnEvent === 'copy_to_clipboard') {
        if (jglib.isEmpty(this.buttonInfo.action.clipboardAction.copyToClipboard.text)) {
          this.$refs[target].style.border = '1px solid red'
          this.$refs[target].focus()
          return false
        }
      }
      // 다른 대화방 열기 체크
      target = `chatroom_number_${this.cardIndex}_${this.index}`
      if ((name === target || isAllCheck) && !isSave && this.btnEvent === 'chatroom') {
        if (jglib.isEmpty(this.buttonInfo.action.composeAction.composeTextMessage.phoneNumber)) {
          this.$refs[target].style.border = '1px solid red'
          this.$refs[target].focus()
          return false
        }
      }
      target = `chatroom_text_${this.cardIndex}_${this.index}`
      if ((name === target || isAllCheck) && !isSave && this.btnEvent === 'chatroom') {
        if (jglib.isEmpty(this.buttonInfo.action.composeAction.composeTextMessage.text)) {
          this.$refs[target].style.border = '1px solid red'
          this.$refs[target].focus()
          return false
        }
      }
      // 외부 브라우저 체크
      target = `open_url_${this.cardIndex}_${this.index}`
      if ((name === target || isAllCheck) && !isSave && this.btnEvent === 'open_url') {
        if (jglib.isEmpty(this.buttonInfo.action.urlAction.openUrl.url)) {
          this.$refs[target].style.border = '1px solid red'
          this.$refs[target].focus()
          return false
        }
      }
      // 지도 열기 좌표
      target = `latitude_${this.cardIndex}_${this.index}`
      if ((name === target || isAllCheck) && !isSave && this.btnEvent === 'show_location') {
        if (jglib.isEmpty(this.buttonInfo.action.mapAction.showLocation.location.latitude)) {
          this.$refs[target].style.border = '1px solid red'
          this.$refs[target].focus()
          return false
        }
      }
      target = `longitude_${this.cardIndex}_${this.index}`
      if ((name === target || isAllCheck) && !isSave && this.btnEvent === 'show_location') {
        if (jglib.isEmpty(this.buttonInfo.action.mapAction.showLocation.location.longitude)) {
          this.$refs[target].style.border = '1px solid red'
          this.$refs[target].focus()
          return false
        }
      }
      target = `label_${this.cardIndex}_${this.index}`
      if ((name === target || isAllCheck) && !isSave && this.btnEvent === 'show_location') {
        if (jglib.isEmpty(this.buttonInfo.action.mapAction.showLocation.location.label)) {
          this.$refs[target].style.border = '1px solid red'
          this.$refs[target].focus()
          return false
        }
      }
      // 지도 열기 쿼리
      target = `query_${this.cardIndex}_${this.index}`
      if ((name === target || isAllCheck) && !isSave && this.btnEvent === 'search_locations') {
        if (jglib.isEmpty(this.buttonInfo.action.mapAction.showLocation.location.query)) {
          this.$refs[target].style.border = '1px solid red'
          this.$refs[target].focus()
          return false
        }
      }
      target = `fallbackUrl_${this.cardIndex}_${this.index}`
      if ((name === target || isAllCheck) && !isSave && (this.btnEvent === 'show_location' || this.btnEvent === 'search_locations')) {
        if (jglib.isEmpty(this.buttonInfo.action.mapAction.showLocation.fallbackUrl)) {
          this.$refs[target].style.border = '1px solid red'
          this.$refs[target].focus()
          return false
        }
      }
      // 캘린더 체크
      target = `calendar_title_${this.cardIndex}_${this.index}`
      if ((name === target || isAllCheck) && !isSave && this.btnEvent === 'create_calendar_event') {
        if (jglib.isEmpty(this.buttonInfo.action.calendarAction.createCalendarEvent.title)) {
          this.$refs[target].style.border = '1px solid red'
          this.$refs[target].focus()
          return false
        }
      }
      target = `calendar_content_${this.cardIndex}_${this.index}`
      if ((name === target || isAllCheck) && !isSave && this.btnEvent === 'create_calendar_event') {
        if (jglib.isEmpty(this.buttonInfo.action.calendarAction.createCalendarEvent.description)) {
          this.$refs[target].style.border = '1px solid red'
          this.$refs[target].focus()
          return false
        }
      }
      return true
    }

  }
}
</script>

<style>

</style>
