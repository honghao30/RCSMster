<template>
  <div class="dv2023_autoreply-buttons">
    <div class="rcs_item_bundle">
      <strong class="rcs_tit_bundle">버튼</strong>
      <div v-if="viewMode" class="rcs_cont_bundle">
        {{ countSuggestion > 0 ? '사용' : '미사용' }}
      </div>
      <div v-else class="rcs_cont_bundle" tabindex="0" ref="use_button_yn">
        <span class="custom_radio checked min">
          <input type="radio" :name="`isButton_${btnKey}`" :id="`isButtonYes_${btnKey}`" value="Y" :checked="buttonUseYn === 'Y'" @click="changeUseYn('Y')"/>
          <label :for="`isButtonYes_${btnKey}`"><span>사용</span></label>
        </span>
        <span class="custom_select micromin" v-if="buttonUseYn === 'Y'">
          <select ref="sel_button" v-model="countSuggestion" @change="changeCountSuggestion">
            <option v-for="idx in templateInfo.maxBtnCnt" :key="`suggBtn-${idx}`" :value="idx">
              {{ idx }}
            </option>
          </select>
        </span>
        <span class="custom_radio checked min">
          <input type="radio" :name="`isButton_${btnKey}`" :id="`isButtonNo_${btnKey}`" value="N" :checked="buttonUseYn === 'N'" @click="changeUseYn('N')"/>
          <label :for="`isButtonNo_${btnKey}`"><span>미사용</span></label>
        </span>
      </div>
    </div>
    <div v-if="countSuggestion > 0" class="rcs_item_bundle">
      <strong class="rcs_tit_bundle"></strong>
      <div class="rcs_cont_bundle">
        <!-- 버튼 -->
        <div v-for="(sugg, index) in jsonCardData.suggestions" :key="`suggestion_${index}`" class="box_table">
          <div class="box_th">
            <strong class="title">버튼 {{index + 1}}</strong>
          </div>
          <div class="box_td">
            <div class="box_btn_action_bundle">
              <div class="box_top_bundle">
                <span class="custom_select">
                  <select v-model="sugg.type" :ref="`action_${index}_type`" :id="`action_${index}`" @change="handleChangeAction($event, index)" :disabled="viewMode" required>
                    <option :value="undefined">선택하세요</option>
                    <option value="copy_to_clipboard">복사하기</option>
                    <option value="open_url">URL연결(외부 브라우저)</option>
                    <option value="local_url">URL연결(내부 브라우저)</option>
                    <option value="dial_phone_number">전화걸기</option>
                    <option value="show_location">지도보여주기(좌표)</option>
                    <option value="search_locations">지도보여주기(쿼리)</option>
                    <option value="request_location_push">현재위치공유</option>
                    <option value="create_calendar_event">캘린더등록</option>
                    <option value="compose_text_message">메시지작성</option>
                  </select>
                </span>
                <span class="custom_input">
                  <input type="text" :ref="`action_${index}_displayText`" placeholder="버튼명" v-model.trim="sugg.action.displayText" :disabled="viewMode" :maxlength="btnTextSize" @input="e => sugg.action.displayText = e.target.value">
                  <p class="dv2023_limitcount" v-if="!viewMode">(<span>{{ countDisplayTextLength(sugg.action.displayText) }}</span>/{{btnTextSize}})</p>
                </span>
              </div>
              <!-- 복사하기-->
              <div v-if="sugg.type === 'copy_to_clipboard'" class="box_bottom_bundle active">
                <span class="custom_input dv2023_countbumper">
                  <input type="text" :ref="`action_${index}_text`" placeholder="복사할 값 입력" v-model.trim="sugg.action.clipboardAction.copyToClipboard.text" :disabled="viewMode" maxlength="200" @input="e => sugg.action.clipboardAction.copyToClipboard.text = e.target.value">
                  <span class="dv2023_limitcount" v-if="!viewMode">(<span>{{countDisplayTextLength(sugg.action.clipboardAction.copyToClipboard.text) }}</span>/200)</span>
                </span>
              </div>
              <!-- URL연결(외부)-->
              <div v-if="sugg.type === 'open_url'" class="box_bottom_bundle active">
                <span class="custom_input dv2023_countbumper">
                  <input type="text" :ref="`action_${index}_url`" placeholder="http://www.rcsbizcenter.com 형식으로 입력" v-model.trim="sugg.action.urlAction.openUrl.url" :disabled="viewMode" maxlength="100" @input="e => sugg.action.urlAction.openUrl.url = e.target.value">
                  <span class="dv2023_limitcount" v-if="!viewMode">(<span>{{ countDisplayTextLength(sugg.action.urlAction.openUrl.url) }}</span>/100)</span>
                </span>
              </div>
              <!-- URL연결(내부)-->
              <div v-if="sugg.type === 'local_url'" class="box_bottom_bundle active">
                <span class="custom_input dv2023_countbumper">
                  <input type="text" :ref="`action_${index}_url`" placeholder="http://www.rcsbizcenter.com 형식으로 입력" v-model.trim="sugg.action.localBrowserAction.openUrl.url" :disabled="viewMode" maxlength="100" @input="e => sugg.action.localBrowserAction.openUrl.url = e.target.value">
                  <span class="dv2023_limitcount" v-if="!viewMode">(<span>{{ countDisplayTextLength(sugg.action.localBrowserAction.openUrl.url) }}</span>/100)</span>
                </span>
                <span class="custom_input">
                    <span style="padding-right:10px">Half View</span>
                    <span class="custom_radio checked min">
                      <input type="radio" :id="`btn_${index}_isHalfView_Y`" v-model="sugg.action.localBrowserAction.openUrl.isHalfView" value=true :disabled="viewMode">
                      <label :for="`btn_${index}_isHalfView_Y`"><span>사용</span></label>
                    </span>
                    <span class="custom_radio checked min">
                      <input type="radio" :id="`btn_${index}_isHalfView_N`" v-model="sugg.action.localBrowserAction.openUrl.isHalfView" value=false :disabled="viewMode">
                      <label :for="`btn_${index}_isHalfView_N`"><span>미사용</span></label>
                    </span>
                </span>
                <span class="custom_input dv2023_hascount custom_textarea">
                  <textarea :ref="`action_${index}_postParameter`"
                    v-model.trim="sugg.action.localBrowserAction.openUrl.postParameter" :disabled="viewMode" maxlength="1000" @input="e => sugg.action.localBrowserAction.openUrl.postParameter = e.target.value"
                    placeholder="인앱브라우저에서 URL 호출 시 POST방식으로 파라미터를 전달하고자 할 경우 파라미터 개수만큼 아래 형식으로 구분하여 작성하면 됩니다. (URL 상의 웹페이지는 content-type: application/x-www-form-urlencoded 로 설정하시면 됩니다.)
<작성예시>
“name”:”value”, “age”:30, “isBoolean”: true"
                  />
                  <p class="dv2023_limitcount" v-if="!viewMode">(<span>{{ countDisplayTextLength(sugg.action.localBrowserAction.openUrl.postParameter) }}</span>/1000)</p>
                </span>
              </div>
              <!-- 전화걸기-->
              <div v-if="sugg.type === 'dial_phone_number'" class="box_bottom_bundle active">
                <span class="custom_input dv2023_countbumper">
                  <input type="text" :ref="`action_${index}_phoneNumber`" placeholder="전화번호 입력" v-model.trim="sugg.action.dialerAction.dialPhoneNumber.phoneNumber" :disabled="viewMode" maxlength="40" @input="e => sugg.action.dialerAction.dialPhoneNumber.phoneNumber = e.target.value">
                  <span class="dv2023_limitcount" v-if="!viewMode">(<span>{{ countDisplayTextLength(sugg.action.dialerAction.dialPhoneNumber.phoneNumber) }}</span>/40)</span>
                </span>
              </div>
              <!-- 지도보여주기(좌표)-->
              <div v-if="sugg.type === 'show_location'" class="box_bottom_bundle active">
                <span class="custom_input dv2023_countbumper">
                  <input type="text" :ref="`action_${index}_latitude`" placeholder="위도입력" v-model.trim="sugg.action.mapAction.showLocation.location.latitude" :disabled="viewMode" maxlength="40" @input="e => sugg.action.mapAction.showLocation.location.latitude = e.target.value">
                  <span class="dv2023_limitcount" v-if="!viewMode">(<span>{{ countDisplayTextLength(sugg.action.mapAction.showLocation.location.latitude) }}</span>/40)</span>
                </span>
                <span class="custom_input dv2023_countbumper">
                  <input type="text" :ref="`action_${index}_longitude`" placeholder="경도입력" v-model.trim="sugg.action.mapAction.showLocation.location.longitude" :disabled="viewMode" maxlength="40" @input="e => sugg.action.mapAction.showLocation.location.longitude = e.target.value">
                  <span class="dv2023_limitcount" v-if="!viewMode">(<span>{{ countDisplayTextLength(sugg.action.mapAction.showLocation.location.longitude) }}</span>/40)</span>
                </span>
                <span class="custom_input dv2023_countbumper">
                  <input type="text" :ref="`action_${index}_label`" placeholder="위치이름" v-model.trim="sugg.action.mapAction.showLocation.location.label" :disabled="viewMode" maxlength="100" @input="e => sugg.action.mapAction.showLocation.location.label = e.target.value">
                  <span class="dv2023_limitcount" v-if="!viewMode">(<span>{{ countDisplayTextLength(sugg.action.mapAction.showLocation.location.label) }}</span>/100)</span>
                </span>
                <span class="custom_input dv2023_countbumper">
                  <input type="text" :ref="`action_${index}_fallbackUrl`" placeholder="fallback url 입력" v-model.trim="sugg.action.mapAction.showLocation.fallbackUrl" :disabled="viewMode" maxlength="100" @input="e => sugg.action.mapAction.showLocation.fallbackUrl = e.target.value">
                  <span class="dv2023_limitcount" v-if="!viewMode">(<span>{{ countDisplayTextLength(sugg.action.mapAction.showLocation.fallbackUrl) }}</span>/100)</span>
                </span>
              </div>
              <!-- 지도보여주기(쿼리)-->
              <div v-if="sugg.type === 'search_locations'" class="box_bottom_bundle active">
                <span class="custom_input dv2023_countbumper">
                  <input type="text" :ref="`action_${index}_query`" placeholder="위치이름" v-model.trim="sugg.action.mapAction.showLocation.location.query" :disabled="viewMode" maxlength="100" @input="e => sugg.action.mapAction.showLocation.location.query = e.target.value">
                  <span class="dv2023_limitcount" v-if="!viewMode">(<span>{{ countDisplayTextLength(sugg.action.mapAction.showLocation.location.query) }}</span>/100)</span>
                </span>
                <span class="custom_input dv2023_countbumper">
                  <input type="text" :ref="`action_${index}_fallbackUrl`" placeholder="fallback url 입력" v-model.trim="sugg.action.mapAction.showLocation.fallbackUrl" :disabled="viewMode" maxlength="100" @input="e => sugg.action.mapAction.showLocation.fallbackUrl = e.target.value">
                  <span class="dv2023_limitcount" v-if="!viewMode">(<span>{{ countDisplayTextLength(sugg.action.mapAction.showLocation.fallbackUrl) }}</span>/100)</span>
                </span>
              </div>
              <!-- 현재위치공유-->
              <div v-if="sugg.type === 'request_location_push'" class="box_bottom_bundle active"></div>
              <!-- 캘린더등록-->
              <div v-if="sugg.type === 'create_calendar_event'" class="box_bottom_bundle active">
                <div class="cont_flex_bundle" :class="sugg.action.calendarAction.createCalendarEvent.useVariable ? 'date_checkbox' : 'date_checkbox'">
                  <!-- 캘린더 - 직접 입력 -->
                  <template v-if="sugg.action.calendarAction.createCalendarEvent.useVariable">
                    <span class="custom_input">
                      <input type="text" :ref="`action_${index}_startTime`" v-model.trim="sugg.action.calendarAction.createCalendarEvent.startTime" :disabled="viewMode" placeholder="시작일">
                    </span>
                    <span class="custom_input">
                      <input type="text" :ref="`action_${index}_endTime`" v-model.trim="sugg.action.calendarAction.createCalendarEvent.endTime" :disabled="viewMode" placeholder="종료일">
                    </span>
                  </template>
                  <!-- 캘린더 - 달력 사용 -->
                  <template v-else>
                    <span class="custom_input icon_right">
                      <div class="date_picker">
                       <date-picker :ref="`action_${index}_startTime`" v-model="sugg.action.calendarAction.createCalendarEvent.startTime" placeholder="시작일"
                                    type="datetime" :confirm="true" confirm-text="확인" :show-second="false" :minute-step="5" :second-step="5"
                                    @confirm="cfm(index, sugg.action.calendarAction.createCalendarEvent)" :disabled="viewMode"/>
                      </div>
                    </span>
                    <span class="custom_input icon_right">
                      <div class="date_picker">
                        <date-picker :ref="`action_${index}_endTime`" v-model="sugg.action.calendarAction.createCalendarEvent.endTime" placeholder="종료일"
                                    type="datetime" :confirm="true" confirm-text="확인" :show-second="false" :minute-step="5" :second-step="5"
                                    @confirm="cfm(index, sugg.action.calendarAction.createCalendarEvent)" :disabled="viewMode"/>
                      </div>
                    </span>
                  </template>
                  <span class="custom_checkbox" style="display: none !important;">
                    <!-- 변수사용 불가 -->
                    <!-- <input type="checkbox" :id="`action_${index}_useVariable`" v-model="sugg.action.calendarAction.createCalendarEvent.useVariable" @change="clearTime(sugg.action.calendarAction.createCalendarEvent)" :disabled="viewMode">
                    <label :for="`action_${index}_useVariable`">변수</label> -->
                  </span>
                </div>
                <span class="custom_input dv2023_countbumper" :style="sugg.action.calendarAction.createCalendarEvent.useVariable ? `margin-top: 10px;` : ``">
                  <input type="text" :ref="`action_${index}_title`" placeholder="제목입력" v-model.trim="sugg.action.calendarAction.createCalendarEvent.title" :disabled="viewMode" maxlength="100" @input="e =>sugg.action.calendarAction.createCalendarEvent.title = e.target.value">
                  <span class="dv2023_limitcount" v-if="!viewMode">(<span>{{ countDisplayTextLength(sugg.action.calendarAction.createCalendarEvent.title) }}</span>/100)</span>
                </span>
                <span class="custom_input dv2023_countbumper">
                  <input type="text" :ref="`action_${index}_description`" placeholder="내용입력" v-model.trim="sugg.action.calendarAction.createCalendarEvent.description" :disabled="viewMode" maxlength="500" @input="e =>sugg.action.calendarAction.createCalendarEvent.description = e.target.value">
                  <span class="dv2023_limitcount" v-if="!viewMode">(<span>{{ countDisplayTextLength(sugg.action.calendarAction.createCalendarEvent.description) }}</span>/500)</span>
                </span>
              </div>
              <!-- 메시지작성-->
              <div v-if="sugg.type === 'compose_text_message'" class="box_bottom_bundle active">
                <span class="custom_input dv2023_countbumper">
                  <input type="text" :ref="`action_${index}_phoneNumber`" placeholder="전화번호 입력" v-model.trim="sugg.action.composeAction.composeTextMessage.phoneNumber" :disabled="viewMode" maxlength="40" @input="e =>sugg.action.composeAction.composeTextMessage.phoneNumber = e.target.value">
                  <span class="dv2023_limitcount" v-if="!viewMode">(<span>{{countDisplayTextLength(sugg.action.composeAction.composeTextMessage.phoneNumber) }}</span>/40)</span>
                </span>
                <span class="custom_input dv2023_countbumper">
                  <input type="text" :ref="`action_${index}_text`" placeholder="문자메시지 내용 입력" v-model.trim="sugg.action.composeAction.composeTextMessage.text" :disabled="viewMode" maxlength="100" @input="e =>sugg.action.composeAction.composeTextMessage.text = e.target.value">
                  <span class="dv2023_limitcount" v-if="!viewMode">(<span>{{countDisplayTextLength(sugg.action.composeAction.composeTextMessage.text) }}</span>/100)</span>
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- //버튼 -->
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import defaultRefData from '@/components/messageTemplate/js/openrichcardDefaultRefData'
import messageBaseFormUtils from '@/components/messageTemplate/js/MessageBaseFormUtils'
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'
import 'vue2-datepicker/locale/ko'

export default {
  name: 'AutoReplyButtonSuggestion',
  components: { DatePicker },
  props: {
    btnKey: { type: Number },
    templateInfo: {
      type: Object,
      default() {
        return {}
      }
    },
    jsonCardData: {
      type: Object,
      default() {
        return {
          title: '',
          description: '',
          fileNm: '',
          fileRaw: '',
          suggestions: []
        }
      }
    },
    isNewbie: { type: Boolean, required: true },
    isModify: { type: Boolean, required: true },
    buttonUseYn: { type: String, default: 'N' }
  },
  data() {
    return {
      countSuggestion: 0,
      utcSplitor: ':00'
    }
  },
  computed: {
    viewMode() {
      return !this.isNewbie && !this.isModify
    },
    btnTextSize() {
      return this.templateInfo.btnTxtSize
    }
  },
  watch: {
    templateInfo: {
      immediate: true,
      deep: true,
      handler() {
        this.countSuggestion = 0
      }
    },
    buttonUseYn(val) {
      if (val === 'Y') this.countSuggestion = 1
      else this.countSuggestion = 0
      this.changeCountSuggestion()
    }
  },
  created() {
    this.countSuggestion = 0
  },
  mounted() {
    this.init()
  },
  methods: {
    changeUseYn(type) {
      this.$emit('changeUseYn', type)
    },
    init() {
      // console.log('init')
      // this.removeEmptySuggestion()
      this.countSuggestion = jglib.isEmpty(this.jsonCardData.suggestions) ? 0 : this.jsonCardData.suggestions.length

      // 캘린더 값이 있으면 TimeZone에 맞게 변경해준다.
      if (this.jsonCardData.suggestions) {
        this.jsonCardData.suggestions.forEach((sugg) => {
          if (
            sugg.action.calendarAction &&
            sugg.action.calendarAction.createCalendarEvent
          ) {
            // 변수 사용 값을 추가하고 json 복사
            sugg.action.calendarAction.createCalendarEvent.useVariable = false
            sugg.action.calendarAction.createCalendarEvent = _.cloneDeep(
              sugg.action.calendarAction.createCalendarEvent
            )

            const cal = sugg.action.calendarAction.createCalendarEvent
            cal.useVariable = cal.startTime.indexOf('{{') > -1
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
    },
    changeCountSuggestion() {
      // console.log('changeCountSuggestion')
      if (this.jsonCardData.suggestions.length < this.countSuggestion) {
        let diff = this.countSuggestion - this.jsonCardData.suggestions.length
        for (let i = 0; i < diff; i++) {
          this.jsonCardData.suggestions.push(
            JSON.parse(JSON.stringify(defaultRefData['suggestions']['default']))
          )
        }
      } else {
        let diff = this.jsonCardData.suggestions.length - this.countSuggestion
        for (let i = 0; i < diff; i++) {
          this.jsonCardData.suggestions.pop()
        }
      }
    },
    handleChangeAction(e, index) {
      if (e.target.value) {
        let defData =
          JSON.parse(
            JSON.stringify(defaultRefData['suggestions'][e.target.value])
          ) || {}

        let action = {
          displayText: this.jsonCardData.suggestions[index].action.displayText,
          postback: {
            data: ''
          }
        }
        this.jsonCardData.suggestions[index].action = Object.assign(defData, action)
        this.jsonCardData.suggestions[index].type = e.target.value
      } else {
        this.jsonCardData.suggestions[index].type = undefined
        this.jsonCardData.suggestions[index].action = {
          displayText: this.jsonCardData.suggestions[index].action.displayText,
          postback: {
            data: ''
          }
        }
      }
    },
    countDisplayTextLength(value) {
      return value ? value.length : 0
    },
    isNotAfter(o) {
      return (
        !o.useVariable &&
        o.startTime &&
        o.endTime &&
        !moment(o.endTime).isAfter(o.startTime)
      )
    },
    cfm(index, o) {
      if (this.isNotAfter(o)) {
        this.$alertMsg('종료날짜는 시작날짜 이후이어야 합니다.')
          .then((res) => {
            this.$refs[`action_${index}_endTime`][0].focus()
          })
          .catch((res) => {})
      }
    },
    clearTime(o) {
      o.startTime = null
      o.endTime = null
    },
    validateData() {
      for (let i = 0; i < this.jsonCardData.suggestions.length; i++) {
        const sugg = this.jsonCardData.suggestions[i]
        if (jglib.isEmpty(sugg.type)) {
          this.$alertMsg('버튼 종류를 선택해 주세요.')
            .then((res) => {
              this.$refs[`action_${i}_type`][0].focus()
            })
            .catch((res) => {})
          return false
        } else if (jglib.isEmpty(sugg.action.displayText)) {
          this.$alertMsg('버튼명을 입력해 주세요.')
            .then((res) => {
              this.$refs[`action_${i}_displayText`][0].focus()
            })
            .catch((res) => {})
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
          } else if (vlidSugg.reason === 'phoneNumber') {
            alert = '전화번호는 숫자만 입력되어야 합니다.'
          } else if (vlidSugg.reason === 'float') {
            alert = '위도 / 경도는 실수 형태로 입력되어야 합니다.'
          }
          this.$alertMsg(alert).then(res => { this.$refs[vlidSugg.focus][0].focus() }).catch(res => {})
          return false
        }
      }
      return true
    },
    validateSuggestion() {
      let focus = null
      let suggestions = this.jsonCardData.suggestions
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
            }
            // url 형식 체크
            let isUrl = (key === 'url' || key === 'fallbackUrl')
            if (isUrl) {
              if (target.indexOf('http://') !== 0 && target.indexOf('https://') !== 0) {
                return { focus: focus, reason: 'url' }
              }
            }
            if ((targets.useVariable && key === 'startTime') || key === 'endTime') {
              if (!messageBaseFormUtils.getIsOnlyParam(target)) {
                return { focus: focus, reason: 'variable only' }
              }
            } else if (!targets.useVariable && this.isNotAfter(targets)) {
              return { focus: `action_${i}_endTime`, reason: 'period' }
            }
            // postParameter 형식 체크
            if (key === 'postParameter') {
              if (jglib.isEmpty(target)) {
                delete targets[key]
              } else if (!jglib.isEmpty(target) && !this.isJsonString(target)) {
                return { focus: focus, reason: 'postParameter' }
              }
            }
            // 전화번호 체크
            if (key === 'phoneNumber' && isNaN(target)) {
              return { focus: focus, reason: 'phoneNumber' }
            }
          } else if (typeof target === 'boolean') {
            // 타입이 boolean인 경우 체크하지 않음  ex) isHalfView
          } else {
            // 자식 요소가 있는 attribute인 경우 ex) location.latitude, location.longitude, .....
            if (target) {
              for (const t of Object.keys(target)) {
                focus = `action_${i}_${t}`
                if (t !== 'latitude' && t !== 'longitude') {
                  // 위도, 경도는 실수형으로 처리 됨
                  if (jglib.isEmpty(target[t].trim())) {
                    return { focus: focus, reason: 'empty' }
                  } else if (!messageBaseFormUtils.checkVarialbeString(target[t])) {
                    return { focus: focus, reason: 'variable' }
                  }

                  // url 형식 체크
                  let isUrl = (t === 'url' || t === 'fallbackUrl')
                  if (isUrl) {
                    if (target[t].indexOf('http://') !== 0 && target[t].indexOf('https://') !== 0) {
                      return { focus: focus, reason: 'url' }
                    }
                  }
                } else {
                  if (jglib.isEmpty(target[t])) {
                    return { focus: focus, reason: 'empty' }
                  }

                  // 위도. 경도 형식 체크
                  let isFloat = (t === 'latitude' || t === 'longitude')
                  if (isFloat) {
                    if (!/^([0-9]*)[.]?([0-9]*)?$/.test(target[t])) {
                      return { focus: focus, reason: 'float' }
                    }
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
    // 임시 저장인 경우에도 postParameter 형태는 체크 되어야 함
    validateTempSave() {
      let suggestions = this.jsonCardData.suggestions
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
        // console.error(e)
        return false
      }
    },
    focusCountSuggestion() {
      if (this.buttonUseYn === 'N') this.$refs['use_button_yn'].focus()
      else this.$refs['sel_button'].focus()
    }
  }
}
</script>

<style>
.dv2023_autoreply-buttons {
  border-top: 1px solid #d9d9d9;
  padding-top: 20px;
  margin-top: 20px;
}
/* .dv2023_autoreply-buttons .custom_select.micromin {
  width: 100px;
  padding-right: 12px;
  border-right: 1px solid #d9d9d9;
}
.dv2023_autoreply-buttons .custom_select.micromin select {
  min-width: 100px;
} */
</style>
