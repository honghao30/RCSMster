<template>
  <div class="full_width">
    <!-- 작성 -->
    <div class="rcs_item_bundle rcs_item_btns" v-if="!viewMode">
      <strong class="rcs_tit_bundle p-l0">
        버튼
        <span class="require">*</span>
      </strong>
      <!-- 버튼개수 선택란 -->
      <div class="rcs_cont_bundle rcs_cont_detail_repeat">
        <span class="using_stat">
            <div v-for="idx in maxBtnCnt + 1" :key="`suggestion-${idx}`" class="btn sml stat_btn" :class="{ 'check': view.countSuggestion === idx - 1 }" :style="maxBtnCnt === 0 ? 'margin-left: 0px;' : ''" @click="view.countSuggestion = idx - 1">{{ idx-1 | prettyBtnName }}</div>
        </span>
        <div v-for="(sugg, index) in suggestions" :key="`suggestion_${index}`" class="rcs_cont_detail_wrap">
          <div class="rcs_cont_detail_tit">
            <span class="dash">-</span> 버튼{{ index + 1 }}
          </div>
          <div class="rcs_cont_detail_cont">
            <div class="using_stat noneinput" :tabindex="index" :ref="`action_${index}_select`">
              <span @click="changeActionByRadio(index, 'open_url')"  class="btn sml stat_btn" :class="{ 'check': hasAction(index, 'urlAction') }">URL연결</span>
              <span @click="changeActionByRadio(index, 'dial_phone_number')" class="btn sml stat_btn" :class="{ 'check': hasAction(index, 'dialerAction') }">전화하기</span>
              <span @click="changeActionByRadio(index, 'etc')" class="btn sml stat_btn" :class="{ 'check': !hasAction(index, 'urlAction') && !hasAction(index, 'dialerAction') }">기타</span>
              <span class="custom_select">
                <select v-model="actionSelType[index]" @change="changeActionBySelect(index, $event)" :disabled="sugg.action.hasOwnProperty('urlAction') || sugg.action.hasOwnProperty('dialerAction')">
                  <option value="etc">선택해 주세요</option>
                  <option value="copy_to_clipboard">복사하기</option>
                  <option value="show_location">지도보여주기(좌표)</option>
                  <option value="search_locations">지도보여주기(쿼리)</option>
                  <option value="request_location_push">현재위치공유</option>
                  <option value="create_calendar_event">캘린더등록</option>
                  <option value="compose_text_message">메시지작성</option>
                </select>
              </span>
            </div>
            <!-- 버튼 명 -->
            <div class="custom_input w590 mar_b10">
              <!-- @input="changeInput($event, index, 'action.displayText')" -->
              <input class="p_byte" :ref="`action_${index}_displayText`" @input="syncProperties($event, ['suggestions', index, 'action', 'displayText'])" v-model="sugg.action.displayText" type="text" placeholder="버튼명을 입력해주세요" :maxlength="maxDisplayTextLen"/>
              <span class="input_byte">({{ sugg.action.displayText.length }}/{{ maxDisplayTextLen }}자)</span>
            </div>
            <!-- 1) URL 연결 -->
            <span v-if="hasAction(index, 'urlAction')">
              <div class="custom_input w590 mar_b10">
                <input class="p_byte" :ref="`action_${index}_url`" v-model.trim="sugg.action.urlAction.openUrl.url" @keydown="notAllowSpace($event)" type="text" placeholder="http://www.rcsbizcenter.com 형식으로 입력" maxlength="100"/>
                <!-- @input="changeInput($event, index, 'action.urlAction.openUrl.url')" -->
                <span class="input_byte">({{ sugg.action.urlAction.openUrl.url.length }}/100자)</span>
              </div>
            </span>
            <!-- 2) 전화하기 -->
            <span v-if="hasAction(index, 'dialerAction')">
              <div class="custom_input w590 mar_b10">
                <input class="p_byte" :ref="`action_${index}_phoneNumber`" v-model.trim="sugg.action.dialerAction.dialPhoneNumber.phoneNumber" @keydown="notAllowSpace($event)" type="text" placeholder="전화번호 입력" maxlength="40"/>
                <!--  @input="changeInput($event, index, 'action.dialerAction.dialPhoneNumber.phoneNumber')" -->
                <span class="input_byte">({{ sugg.action.dialerAction.dialPhoneNumber.phoneNumber.length }}/40자)</span>
              </div>
            </span>
            <!-- 3) 복사하기 -->
            <span v-if="actionSelType[index] === 'copy_to_clipboard'">
              <div class="custom_input w590 mar_b10">
                <!-- @input="changeInput($event, index, 'action.clipboardAction.copyToClipboard.text')" -->
                <input class="p_byte" :ref="`action_${index}_text`" v-model="sugg.action.clipboardAction.copyToClipboard.text" type="text" placeholder="복사할 값 입력" maxlength="200"/>
                <span class="input_byte">({{ sugg.action.clipboardAction.copyToClipboard.text.length }}/200자)</span>
              </div>
            </span>
            <!-- 4) 지도 보여주기(좌표)-->
            <span v-if="actionSelType[index] === 'show_location'">
              <div class="custom_input w590 mar_b10">
                <input class="p_byte" :ref="`action_${index}_latitude`" v-model.trim="sugg.action.mapAction.showLocation.location.latitude" @keydown="notAllowSpace($event)" type="text" placeholder="위도입력" maxlength="40"/>
                <span class="input_byte">({{ calcNumberLength(sugg.action.mapAction.showLocation.location.latitude) }}/40자)</span>
              </div>
              <div class="custom_input w590 mar_b10">
                <input class="p_byte" :ref="`action_${index}_longitude`" v-model.trim="sugg.action.mapAction.showLocation.location.longitude" @keydown="notAllowSpace($event)" type="text" placeholder="경도입력" maxlength="40"/>
                <span class="input_byte">({{ calcNumberLength(sugg.action.mapAction.showLocation.location.longitude) }}/40자)</span>
              </div>
              <div class="custom_input w590 mar_b10">
                <input class="p_byte" :ref="`action_${index}_label`" v-model="sugg.action.mapAction.showLocation.location.label" type="text" placeholder="위치이름" maxlength="100"/>
                <span class="input_byte">({{ sugg.action.mapAction.showLocation.location.label.length }}/100자)</span>
              </div>
              <div class="custom_input w590 mar_b10">
                <input class="p_byte" :ref="`action_${index}_fallbackUrl`" v-model.trim="sugg.action.mapAction.showLocation.fallbackUrl" @keydown="notAllowSpace($event)" type="text" placeholder="http://www.rcsbizcenter.com 형식으로 입력" maxlength="100"/>
                <span class="input_byte">({{ sugg.action.mapAction.showLocation.fallbackUrl.length }}/100자)</span>
              </div>
            </span>
            <!-- 5) 지도 보여주기(쿼리) -->
            <span v-if="actionSelType[index] === 'search_locations'">
              <div class="custom_input w590 mar_b10" >
                <input class="p_byte" :ref="`action_${index}_query`" v-model="sugg.action.mapAction.showLocation.location.query" type="text" placeholder="위치이름" maxlength="100"/>
                <span class="input_byte">({{ sugg.action.mapAction.showLocation.location.query.length }}/100자)</span>
              </div>
              <div class="custom_input w590 mar_b10" >
                <input class="p_byte" :ref="`action_${index}_fallbackUrl`" v-model.trim="sugg.action.mapAction.showLocation.fallbackUrl" @keydown="notAllowSpace($event)" type="text" placeholder="http://www.rcsbizcenter.com 형식으로 입력" maxlength="100"/>
                <span class="input_byte">({{ sugg.action.mapAction.showLocation.fallbackUrl.length }}/100자)</span>
              </div>
            </span>
            <!-- 6) 현재 위치 공유 .. -->
            <span v-if="actionSelType[index] === 'request_location_push'">
              <div class="custom_input w590 mar_b10">
                <input type="text" disabled="true">
              </div>
            </span>
            <!-- 7) 캘린더 등록 -->
            <span v-if="actionSelType[index] === 'create_calendar_event'">
              <div class="custom_input w590 mar_b10">
                <span>
                  <div class="cont_flex_bundle" :class="sugg.action.calendarAction.createCalendarEvent.useVariable ? 'direct_date' : 'date_checkbox mar_b10'">
                    <!-- 캘린더 - 직접 입력 -->
                    <template v-if="sugg.action.calendarAction.createCalendarEvent.useVariable">
                      <span class="custom_input mar_b10 mar_r10">
                        <input type="text" :ref="`action_${index}_startTime`" v-model.trim="sugg.action.calendarAction.createCalendarEvent.startTime" @keydown="notAllowSpace($event)" placeholder="시작일">
                      </span>
                      <span class="custom_input mar_b10">
                        <input type="text" :ref="`action_${index}_endTime`" v-model.trim="sugg.action.calendarAction.createCalendarEvent.endTime" @keydown="notAllowSpace($event)" placeholder="종료일">
                      </span>
                    </template>
                    <template v-else>
                      <span class="custom_input icon_date">
                        <div class="date_picker">
                          <el-date-picker :ref="`action_${index}_startTime`" v-model="sugg.action.calendarAction.createCalendarEvent.startTime" type="date" placeholder="시작일" confirm-text="확인"
                            :confirm="true" :show-second="false" :minute-step="5" :second-step="5" value-format="yyyy-MM-dd"
                            @confirm="cfm(index, sugg.action.calendarAction.createCalendarEvent)"/>
                        </div>
                      </span>
                      <span class="custom_input icon_date">
                        <div class="date_picker">
                          <el-date-picker :ref="`action_${index}_endTime`" v-model="sugg.action.calendarAction.createCalendarEvent.endTime" type="date" placeholder="종료일" confirm-text="확인"
                            :confirm="true" :show-second="false" :minute-step="5" :second-step="5" value-format="yyyy-MM-dd"
                            @confirm="cfm(index, sugg.action.calendarAction.createCalendarEvent)"/>
                        </div>
                      </span>
                    </template>
                    <span class="custom_checkbox">
                      <input type="checkbox" :id="`action_${index}_useVariable`" v-model="sugg.action.calendarAction.createCalendarEvent.useVariable" @change="clearTime(sugg.action.calendarAction.createCalendarEvent)">
                      <label :for="`action_${index}_useVariable`">변수</label>
                      </span>
                    </div>
                  <!-- 캘린더 -->
                  <div class="custom_input w590 mar_b10">
                    <!-- @input="changeInput($event, index, 'action.calendarAction.createCalendarEvent.title')" -->
                    <input class="p_byte" :ref="`action_${index}_title`" v-model="sugg.action.calendarAction.createCalendarEvent.title" type="text" placeholder="제목 입력" maxlength="100"/>
                    <span class="input_byte">({{ sugg.action.calendarAction.createCalendarEvent.title.length }}/100자)</span>
                  </div>
                  <div class="custom_input w590 mar_b10">
                    <!-- @input="changeInput($event, index, 'action.calendarAction.createCalendarEvent.description')" -->
                    <input class="p_byte" :ref="`action_${index}_description`" v-model="sugg.action.calendarAction.createCalendarEvent.description" type="text" placeholder="내용 입력" maxlength="500"/>
                    <span class="input_byte">({{ sugg.action.calendarAction.createCalendarEvent.description.length }}/500자)</span>
                  </div>
                </span>
              </div>
            </span>
            <!-- 8) 메시지 작성 -->
            <span v-if="actionSelType[index] === 'compose_text_message'">
              <div class="custom_input w590 mar_b10">
                <!-- @input="changeInput($event, index, 'action.composeAction.composeTextMessage.phoneNumber')" -->
                <input class="p_byte" :ref="`action_${index}_phoneNumber`" v-model.trim="sugg.action.composeAction.composeTextMessage.phoneNumber" @keydown="notAllowSpace($event)" type="text" placeholder="전화번호 입력" maxlength="40"/>
                <span class="input_byte">({{ sugg.action.composeAction.composeTextMessage.phoneNumber.length }}/40자)</span>
              </div>
              <div class="custom_input w590 mar_b10">
                <!-- @input="changeInput($event, index, 'action.composeAction.composeTextMessage.text')" -->
                <input class="p_byte" :ref="`action_${index}_text`" v-model="sugg.action.composeAction.composeTextMessage.text" type="text" placeholder="문자메시지 내용 입력" maxlength="100"/>
                <span class="input_byte">({{ sugg.action.composeAction.composeTextMessage.text.length }}/100자)</span>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 조회 -->
    <div v-else-if="suggestions.length > 0" class="rcs_item_bundle rcs_item_btns br_b1">
      <strong class="rcs_tit_bundle p-l0">버튼</strong>
      <div class="rcs_cont_bundle">
        <div class="rcs_cont_detail_repeat">
          <span class="mar_t-10 mar_b5">{{ suggestions.length }} 개</span>
          <div v-for="(sugg, index) in suggestions" :key="index" class="rcs_cont_detail_wrap">
            <div class="rcs_cont_detail_tit">
              <span class="dash">-</span> 버튼 {{ index + 1}}
            </div>
            <div class="rcs_cont_detail_cont">
              <!-- 액션명 -->
              <div class="custom_input mar_b10">
                <button>{{ getButtonActionName(sugg) }}</button>
              </div>
              <!-- 버튼명 -->
              <div class="custom_input mar_b10">
                <input class="p_byte" v-model="sugg.action.displayText" :disabled="true" />
              </div>
              <!-- 각 액션 별 데이터 출력 -->
              <!-- 1) url 연결 -->
              <div v-if="getButtonAction(sugg) === 'urlAction'" class="custom_input mar_b10">
                <input class="p_byte" v-model="sugg.action.urlAction.openUrl.url" :disabled="true">
              </div>
              <!-- 2) 전화걸기 -->
              <div v-if="getButtonAction(sugg) === 'dialerAction'" class="custom_input mar_b10">
                <input class="p_byte" v-model="sugg.action.dialerAction.dialPhoneNumber.phoneNumber" :disabled="true">
              </div>
              <!-- 3) 복사하기 -->
              <div v-if="getButtonAction(sugg) === 'copy_to_clipboard'" class="custom_input mar_b10">
                <input class="p_byte" v-model="sugg.action.clipboardAction.copyToClipboard.text" :disabled="true">
              </div>
              <!-- 4) 지도 보여주기(좌표) -->
              <div v-if="getButtonAction(sugg) === 'show_location'" class="custom_input mar_b10">
                <input class="p_byte mar_b10" v-model="sugg.action.mapAction.showLocation.location.latitude" :disabled="true">
                <input class="p_byte mar_b10" v-model="sugg.action.mapAction.showLocation.location.longitude" :disabled="true">
                <input class="p_byte mar_b10" v-model="sugg.action.mapAction.showLocation.location.label" :disabled="true">
                <input class="p_byte" v-model="sugg.action.mapAction.showLocation.fallbackUrl" :disabled="true">
              </div>
              <!-- 5) 지도 보여주기(쿼리) -->
              <div v-if="getButtonAction(sugg) === 'search_locations'" class="custom_input mar_b10">
                <input class="p_byte mar_b10" v-model="sugg.action.mapAction.showLocation.location.query" :disabled="true">
                <input class="p_byte" v-model="sugg.action.mapAction.showLocation.fallbackUrl" :disabled="true">
              </div>
              <!-- 6) 현재위치 공유 -->
              <div v-if="getButtonAction(sugg) === 'request_location_push'" class="custom_input mar_b10">
                <!-- nothing: 데이터 입력값 없음 -->
              </div>
              <!-- 7) 캘린더 -->
              <div v-if="getButtonAction(sugg) === 'create_calendar_event'" class="custom_input mar_b10">
                <div class="cont_flex_bundle">
                  <template v-if="sugg.action.calendarAction.createCalendarEvent.useVariable">
                    <span class="custom_input icon_date mar_b10">
                      <input type="text"  v-model.trim="sugg.action.calendarAction.createCalendarEvent.startTime" :disabled="true" placeholder="시작일">
                    </span>
                    <span class="custom_input icon_date mar_b10">
                      <input type="text" v-model.trim="sugg.action.calendarAction.createCalendarEvent.endTime" :disabled="true" placeholder="종료일">
                    </span>
                  </template>
                  <template v-else>
                    <span class="custom_input icon_date mar_b10">
                      <div class="date_picker">
                        <el-date-picker value-format="yyyy-MM-dd" v-model="sugg.action.calendarAction.createCalendarEvent.startTime" type="date" :disabled="true" placeholder="시작일" />
                      </div>
                    </span>
                    <span class="custom_input icon_date mar_b10">
                      <div class="date_picker">
                        <el-date-picker value-format="yyyy-MM-dd" v-model="sugg.action.calendarAction.createCalendarEvent.endTime" type="date" :disabled="true" placeholder="종료일" />
                      </div>
                    </span>
                  </template>
                  <span class="custom_checkbox mar_b10">
                    <input type="checkbox" :id="`action_${index}_useVariable`" v-model="sugg.action.calendarAction.createCalendarEvent.useVariable" :disabled="true">
                    <label :for="`action_${index}_useVariable`">변수</label>
                  </span>
                </div>
                <input class="p_byte mar_b10" v-model="sugg.action.calendarAction.createCalendarEvent.title" :disabled="true">
                <input class="p_byte" v-model="sugg.action.calendarAction.createCalendarEvent.description" :disabled="true">
              </div>
              <!-- 8) 메시지 보내기 -->
              <div v-if="getButtonAction(sugg) === 'compose_text_message'" class="custom_input mar_b10">
                <input class="p_byte mar_b10" v-model="sugg.action.composeAction.composeTextMessage.phoneNumber" :disabled="true">
                <input class="p_byte" v-model="sugg.action.composeAction.composeTextMessage.text" :disabled="true">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import defaultRefData from '@/components/messageTemplate/js/openrichcardDefaultRefData'
import messageBaseFormUtils from '@/components/messageTemplate/js/MessageBaseFormUtils'
// import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/ko'

export default {
  name: 'MessageBaseSuggestion',
  props: {
    jsonData: {
      type: Object
    },
    viewMode: {
      type: Boolean,
      default: false
    },
    ctn: {
      type: Object,
      default() {
        return {
          btnTxtSize: '',
          btnUseYn: '',
          imgResHeight: '',
          imgResWidth: '',
          lineCnt: '',
          maxBtnCnt: '',
          maxCardCnt: '',
          maxDescrSize: '',
          maxMediaSize: '',
          maxTitleSize: '',
          tplFormId: ''
        }
      }
    },
    cardTheme: {
      type: String
    }
  },
  data() {
    return {
      utcSplitor: ':00',
      calOpenS: false,
      calOpenE: false,
      view: {
        countSuggestion: 0, // 사용할 버튼 수
        buttonTypeList: []
      }
    }
  },
  filters: {
    prettyBtnName(value) {
      if (value === 0) {
        return '미사용'
      } else {
        return value + '개'
      }
    }
  },
  computed: {
    suggestions() {
      if (jglib.isEmpty(this.jsonData) || jglib.isEmpty(this.jsonData.RCSMessage)) {
        return []
      }
      const RCSMessage = this.jsonData.RCSMessage || this.jsonData.RCSMessage
      return RCSMessage.openrichcardMessage.suggestions
    },
    maxBtnCnt() {
      return jglib.isEmpty(this.ctn.maxBtnCnt) ? 0 : parseInt(this.ctn.maxBtnCnt)
    },
    maxDisplayTextLen() {
      // 타이틀 자유형의 경우 버튼명은 16자 까지 입력가능
      return this.cardTheme === 'TA' ? 16 : 17
    },
    hasAction() {
      return (idx, action) => {
        return this.suggestions[idx].action.hasOwnProperty(action)
      }
    },
    actionSelType() {
      let arr = []
      this.suggestions.forEach(btn => {
        let data = this.getButtonActionData(btn)
        if (data.action === 'urlAction' || data.action === 'dialerAction' || data.action === '') arr.push('etc')
        else arr.push(data.action)
      })
      return arr
    }
  },
  watch: {
    jsonData() {
      this.init()
    },
    'view.countSuggestion'() {
      this.changeCountSuggestion()
    }
  },
  created() {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (jglib.isEmpty(this.jsonData) || jglib.isEmpty(this.jsonData.RCSMessage) || jglib.isEmpty(this.jsonData.RCSMessage.openrichcardMessage.suggestions)) {
        this.view.countSuggestion = 0
      } else {
        this.removeEmptySuggestion()
        this.view.countSuggestion = this.suggestions.length

        // 캘린더 값이 있으면 TimeZone에 맞게 변경해준다.
        const suggestions = this.jsonData.RCSMessage.openrichcardMessage.suggestions
        if (suggestions) {
          suggestions.forEach(sugg => {
            if (sugg.action.calendarAction && sugg.action.calendarAction.createCalendarEvent) {
              // 변수 사용 값을 추가하고 json 복사
              sugg.action.calendarAction.createCalendarEvent.useVariable = false
              sugg.action.calendarAction.createCalendarEvent = _.cloneDeep(sugg.action.calendarAction.createCalendarEvent)

              const cal = sugg.action.calendarAction.createCalendarEvent
              // eslint-disable-next-line no-unneeded-ternary
              cal.useVariable = cal.startTime.indexOf('{{') > -1 ? true : false
              if (!cal.useVariable) {
                if (cal.startTime) {
                  cal.startTime = this.getParsedTime(cal.startTime, false)
                }
                if (cal.endTime) {
                  cal.endTime = this.getParsedTime(cal.endTime, false)
                }
              }
            }
          })
        }
      }
    },
    changeCountSuggestion() {
      if (this.suggestions.length < this.view.countSuggestion) {
        let diff = this.view.countSuggestion - this.suggestions.length
        for (let i = 0; i < diff; i++) {
          let defData = JSON.parse(JSON.stringify(defaultRefData['suggestions']['default']))
          let actionDefData = JSON.parse(JSON.stringify(defaultRefData['suggestions']['open_url'])) // 개수 변경시: 초기 'URL연결' 선택
          let data = Object.assign(defData.action, actionDefData)

          defData.action = data
          defData.action.postback.data = this.getPostbackData('open_url')
          this.suggestions.push(defData)
        }
      } else {
        let diff = this.suggestions.length - this.view.countSuggestion
        for (let i = 0; i < diff; i++) {
          this.suggestions.pop()
        }
      }
    },
    removeEmptySuggestion() {
      for (let i = this.suggestions.length - 1; i >= 0; i--) {
        if (jglib.isEmpty(this.suggestions[i])) {
          return this.suggestions.splice(this.suggestions[i], 1)
        }
      }
    },
    getButtonAction(btn) {
      return this.getButtonActionData(btn).action
    },
    getButtonActionName(btn) {
      return this.getButtonActionData(btn).actionNm
    },
    getButtonActionData(obj) {
      // 넘어온 obj에서 property 존재여부로 액션 데이터를 리턴한다.
      let action = ''
      let actionNm = ''
      if (obj.action.hasOwnProperty('urlAction')) {
        action = 'urlAction'
        actionNm = 'URL 연결'
      } else if (obj.action.hasOwnProperty('dialerAction')) {
        action = 'dialerAction'
        actionNm = '전화걸기'
      } else if (obj.action.hasOwnProperty('clipboardAction')) {
        action = 'copy_to_clipboard'
        actionNm = '복사하기'
      } else if (obj.action.hasOwnProperty('calendarAction')) {
        action = 'create_calendar_event'
        actionNm = '캘린더'
      } else if (obj.action.hasOwnProperty('composeAction')) {
        action = 'compose_text_message'
        actionNm = '메시지보내기'
      } else if (obj.action.hasOwnProperty('mapAction')) {
        if (obj.action.mapAction.hasOwnProperty('requestLocationPush')) { // 현재위치공유
          action = 'request_location_push'
          actionNm = '현재 위치공유'
        } else if (obj.action.mapAction.showLocation.location.hasOwnProperty('query')) {
          action = 'search_locations'
          actionNm = '지도 보여주기(쿼리)'
        } else {
          action = 'show_location'
          actionNm = '지도 보여주기(좌표)'
        }
      }
      return { action: action, actionNm: actionNm }
    },
    validateData() {
      for (let i = 0; i < this.suggestions.length; i++) {
        const sugg = this.suggestions[i]
        if (jglib.isEmpty(sugg.action.postback.data)) {
          this.$alertMsg('버튼 종류를 선택해 주세요.')
          return false
        } else if (jglib.isEmpty(sugg.action.displayText)) {
          this.$refs[`action_${i}_displayText`][0].focus()
          this.$alertMsg('버튼명을 입력해 주세요.')
          return false
        } else if (messageBaseFormUtils.isContainParamKey(sugg.action.displayText)) { // 변수 사용 여부 체크
          this.$alertMsg('버튼명에는 변수를 사용할 수 없습니다.').then(() => {
            this.$refs[`action_${i}_displayText`][0].focus()
          })
          return false
        }
      }

      const vlidSugg = this.validateSuggestion()
      if (vlidSugg != null) {
        if (vlidSugg === 'error') {
          this.$alertMsg('버튼 내용을 입력해 주세요.')
        } else {
          let alert = ''
          if (vlidSugg.reason === 'empty') {
            alert = '버튼 내용을 입력해 주세요.'
          } else if (vlidSugg.reason === 'variable') {
            alert = '변수명은 20자 이내의 한글, 영문, 숫자, 언더바만 가능합니다.(특수문자, 공란, 줄바꿈 사용 불가)'
          } else if (vlidSugg.reason === 'variable only') {
            alert = '변수 사용 시 변수만 입력 가능합니다.'
          } else if (vlidSugg.reason === 'url') {
            alert = '올바른 URL 형식이 아닙니다.'
          } else if (vlidSugg.reason === 'period') {
            alert = '종료날짜는 시작날짜 이후이어야 합니다.'
          } else if (vlidSugg.reason === 'postParameter') {
            alert = '파라미터는 POST 형태로 입력되어야 합니다.'
          } else if (vlidSugg.reason === 'no variable') {
            alert = '파라미터는 변수를 사용할 수 없습니다.'
          } else if (vlidSugg.reason === 'port') {
            alert = '유효하지 않은 포트 입니다.'
          } else if (vlidSugg.reason === 'domain') {
            alert = '유효하지 않은 도메인 입니다.'
          } else if (vlidSugg.reason === 'domain variable') {
            alert = '도메인에는 변수 사용이 불가합니다.'
          } else if (vlidSugg.reason === 'description variable') {
            alert = '\'description\'은 변수명으로 사용이 불가합니다.'
          }
          this.$alertMsg(alert).then(res => { this.$refs[vlidSugg.focus][0].focus() }).catch(res => {})
          return false
        }
      }
      return true
    },
    /** 버튼 액션 변경 - URL연결, 전화하기, 기타 중에 선택시 동작 */
    changeActionByRadio(idx, type) {
      this.handleChangeAction(idx, type)
    },
    /** 버튼 액션 변경 - 기타:select 변경시 동작 */
    changeActionBySelect(idx, e) {
      this.handleChangeAction(idx, e.target.value)
    },
    /** 버튼 액션 변경: 액션에 맞는 데이터 형태를 새로 넣어준다 */
    handleChangeAction(index, type) {
      if (type) {
        let jsonData = defaultRefData['suggestions'][type] || {}
        let defData = jsonData !== {} ? JSON.parse(JSON.stringify(jsonData)) : {}
        let postbackData = type === 'etc' ? '' : this.getPostbackData(type)

        let action = {
          displayText: this.suggestions[index].action.displayText,
          postback: {
            data: postbackData
          }
        }
        if (type === 'create_calendar_event') defData.calendarAction.createCalendarEvent.useVariable = false
        this.suggestions[index].action = Object.assign(defData, action)
        this.suggestions[index].type = type
      } else {
        this.suggestions[index].type = undefined
        this.suggestions[index].action = {
          displayText: this.suggestions[index].action.displayText,
          postback: {
            data: ''
          }
        }
      }
    },
    getPostbackData(type) {
      return 'set_by_chatbot_' + type
    },
    countDisplayTextLength(value) {
      return value ? value.length : 0
    },
    isNotEmpty(sugg) {
      return !jglib.isEmpty(sugg)
    },
    validateSuggestion() {
      let focus = null
      let suggestions = this.jsonData.RCSMessage.openrichcardMessage.suggestions
      for (let i = 0; i < suggestions.length; i++) {
        let targets = messageBaseFormUtils.getCheckTargetOfSuggestions(suggestions[i])
        for (const key of Object.keys(targets)) {
          let target = targets[key]
          if (typeof target === 'string') {
            // 단독 attribute인 경우
            focus = `action_${i}_${key}`
            if (jglib.isEmpty(target) && key !== 'postParameter') { // postParameter 는 필수가 아님
              return { focus: focus, reason: 'empty' }
            } else if (!messageBaseFormUtils.checkVarialbeString(target)) {
              return { focus: focus, reason: 'variable' }
            } else if (!messageBaseFormUtils.checkDescriptionVariable(target)) {
              return { focus: focus, reason: 'description variable' }
            }
            // url 형식 체크
            let isUrl = (key === 'url' || key === 'fallbackUrl')
            if (isUrl) {
              if (target.indexOf('http://') !== 0 && target.indexOf('https://') !== 0) {
                return { focus: focus, reason: 'url' }
              }
              let result = messageBaseFormUtils.checkIsUrlValid(target)
              if (result) {
                return { focus: focus, reason: result.reason }
              }
            }
            // eslint-disable-next-line no-mixed-operators
            if (targets.useVariable && (key === 'startTime' || key === 'endTime')) {
              if (!messageBaseFormUtils.getIsOnlyParam(target)) {
                return { focus: focus, reason: 'variable only' }
              }
            } else if (!targets.useVariable && this.isNotAfter(targets)) {
              return { focus: `action_${i}_endTime`, reason: 'period' }
            }
            // postParameter 형식 체크
            if (key === 'postParameter' && !jglib.isEmpty(target)) {
              if (!this.isJsonString(target)) {
                return { focus: focus, reason: 'postParameter' }
              }
              if (messageBaseFormUtils.isContainParamKey(target)) {
                return { focus: focus, reason: 'no variable' }
              }
            }
          } else if (typeof target === 'boolean') {
            // 타입이 boolean인 경우 체크하지 않음  ex) isHalfView
          } else {
            // 자식 요소가 있는 attribute인 경우 ex) location.latitude, location.longitude, .....
            if (target) {
              for (const t of Object.keys(target)) {
                focus = `action_${i}_${t}`
                if (jglib.isEmpty(target[t].trim())) {
                  return { focus: focus, reason: 'empty' }
                } else if (!messageBaseFormUtils.checkVarialbeString(target[t])) {
                  return { focus: focus, reason: 'variable' }
                } else if (!messageBaseFormUtils.checkDescriptionVariable(target[t])) {
                  return { focus: focus, reason: 'description variable' }
                }
                // url 형식 체크
                let isUrl = (t === 'url' || t === 'fallbackUrl')
                if (isUrl) {
                  if (target[t].indexOf('http://') !== 0 && target[t].indexOf('https://') !== 0) {
                    return { focus: focus, reason: 'url' }
                  }
                  let result = messageBaseFormUtils.checkIsUrlValid(target)
                  if (result) {
                    return { focus: focus, reason: result.reason }
                  }
                }
              }
            } else {
              // 캘린더의 값이 공백일 시 target가 null이 되는 케이스가 있음.
              if (key === 'useVariable') {
              } else {
                return 'error'
              }
            }
          }
        }
      }
      return null
    },
    isNotAfter(o) {
      return !o.useVariable && o.startTime && o.endTime && !moment(o.endTime).isAfter(o.startTime)
    },
    cfm(index, o) {
      if (this.isNotAfter(o)) {
        this.$alertMsg('종료날짜는 시작날짜 이후이어야 합니다.').then(res => { this.$refs[`action_${index}_endTime`][0].focus() }).catch(res => {})
      }
    },
    clearTime(o) {
      o.startTime = null
      o.endTime = null
    },
    voidReformSuggestionForRequest(json) {
      let suggestions = json.RCSMessage.openrichcardMessage.suggestions
      suggestions.forEach(sugg => {
        // 캘린더 값이 있으면 TimeZone에 맞게 변경해준다.
        if (sugg.action.calendarAction && sugg.action.calendarAction.createCalendarEvent) {
          const cal = sugg.action.calendarAction.createCalendarEvent
          if (!cal.useVariable) {
            if (cal.startTime) {
              cal.startTime = this.getParsedTime(cal.startTime, true)
            }
            if (cal.endTime) {
              cal.endTime = this.getParsedTime(cal.endTime, true)
            }
          }
          delete cal.useVariable
        }
        // 체크 용도의 type 삭제
        delete sugg.type
      })
    },
    // 임시 저장인 경우에도 postParameter 형태는 체크 되어야 함
    validateTempSave() {
      let suggestions = this.jsonData.RCSMessage.openrichcardMessage.suggestions
      for (let i = 0; i < suggestions.length; i++) {
        let targets = messageBaseFormUtils.getCheckTargetOfSuggestions(suggestions[i])
        for (const key of Object.keys(targets)) {
          let target = targets[key]
          if (typeof target === 'string') {
            let focus = `action_${i}_${key}`
            // postParameter 형식 체크
            if (key === 'postParameter' && !jglib.isEmpty(target)) {
              if (!this.isJsonString(target)) {
                this.$alertMsg('파라미터는 POST 형태로 입력되어야 합니다.').then(() => {
                  if (this.$refs[focus][0]) this.$refs[focus][0].focus()
                  else this.$refs[focus].focus()
                })
                return false
              }
            }
          }
        }
      }
      return true
    },
    getParsedTime(time, isRequest) {
      if (isRequest) {
        // Date 형식을 UTC 형태로 치환 EX) Thu May 06 2021 05:00:00 GMT+0900 (대한민국 표준시) >>> 2021-05-06T05:00:00+09:00
        // 이후 MaaP형식에 따라 분을 제거한다.
        let utc = moment.utc(time).utcOffset(9 * 60).format()
        return utc.substring(0, utc.lastIndexOf(this.utcSplitor))
      }
      return moment(time + this.utcSplitor).toDate()
    },
    isJsonString(str) {
      try {
        let val = '{' + str + '}'
        let json = JSON.parse(val)
        return (typeof json === 'object')
      } catch (e) {
        return false
      }
    },
    /** space 입력 불가 */
    notAllowSpace(e) {
      if (e.keyCode === 32) e.preventDefault()
    },
    calcNumberLength(val) {
      if (typeof val === 'number') return String(val).length
      else return val.length
    },
    syncProperties(e, properties) {
      let firstProperty = properties.shift()
      let lastProperty = properties.pop()

      let obj = this[firstProperty]
      properties.forEach(property => {
        obj = obj[property]
      })

      obj[lastProperty] = e.target.value
    }
  }
}
</script>
