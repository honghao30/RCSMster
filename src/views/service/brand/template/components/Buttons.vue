<template>
  <!-- 조회 -->
  <div v-if="viewMode">
    <div v-if="btnCnt > 0">
      <div class="rcs_item_bundle rcs_item_btns br_b1">
        <strong class="rcs_tit_bundle p-l0">버튼</strong>
        <div class="rcs_cont_bundle">
          <div class="rcs_cont_detail_repeat">
            <span class="mar_t-10 mar_b5">{{ btnCnt }} 개</span>
            <div v-for="(btn, idx) in info.btnList" :key="idx" class="rcs_cont_detail_wrap">
              <div class="rcs_cont_detail_tit">
                <span class="dash">-</span> 버튼 {{ idx + 1}}
              </div>
              <div class="rcs_cont_detail_cont">
                <div class="custom_input mar_b10">
                  <button>{{ getButtonActionName(btn) }}</button>
                </div>
                <div class="custom_input mar_b10">
                  <input class="p_byte" v-model="btn.action.displayText" :disabled="true" />
                </div>
                <!-- 1) url 연결 -->
                <div v-if="getButtonAction(btn) === 'urlAction'" class="custom_input mar_b10">
                  <input class="p_byte" v-model="btn.action.urlAction.openUrl.url" :disabled="true">
                </div>
                <!-- 2) 전화걸기 -->
                <div v-if="getButtonAction(btn) === 'dialerAction'" class="custom_input mar_b10">
                  <input class="p_byte" v-model="btn.action.dialerAction.dialPhoneNumber.phoneNumber" :disabled="true">
                </div>
                <!-- 3) 복사하기 -->
                <div v-if="getButtonAction(btn) === 'copy_to_clipboard'" class="custom_input mar_b10">
                  <input class="p_byte" v-model="btn.action.clipboardAction.copyToClipboard.text" :disabled="true">
                </div>
                <!-- 4) 지도 보여주기(좌표) -->
                <div v-if="getButtonAction(btn) === 'show_location'" class="custom_input mar_b10">
                  <input class="p_byte mar_b10" v-model="btn.action.mapAction.showLocation.location.latitude" :disabled="true">
                  <input class="p_byte mar_b10" v-model="btn.action.mapAction.showLocation.location.longitude" :disabled="true">
                  <input class="p_byte mar_b10" v-model="btn.action.mapAction.showLocation.location.label" :disabled="true">
                  <input class="p_byte" v-model="btn.action.mapAction.showLocation.fallbackUrl" :disabled="true">
                </div>
                <!-- 5) 지도 보여주기(쿼리) -->
                <div v-if="getButtonAction(btn) === 'search_locations'" class="custom_input mar_b10">
                  <input class="p_byte mar_b10" v-model="btn.action.mapAction.showLocation.location.query" :disabled="true">
                  <input class="p_byte" v-model="btn.action.mapAction.showLocation.fallbackUrl" :disabled="true">
                </div>
                <!-- 6) 현재위치 공유 -->
                <div v-if="getButtonAction(btn) === 'request_location_push'" class="custom_input mar_b10">
                  <!-- nothing: 데이터 입력값 없음 -->
                </div>
                <!-- 7) 캘린더 -->
                <div v-if="getButtonAction(btn) === 'create_calendar_event'" class="custom_input mar_b10">
                  <div class="cont_flex_bundle">
                    <template v-if="btn.action.calendarAction.createCalendarEvent.useVariable">
                      <span class="custom_input icon_date mar_b10">
                        <input type="text"  v-model.trim="btn.action.calendarAction.createCalendarEvent.startTime" :disabled="true" placeholder="시작일">
                      </span>
                      <span class="custom_input icon_date mar_b10">
                        <input type="text" v-model.trim="btn.action.calendarAction.createCalendarEvent.endTime" :disabled="true" placeholder="종료일">
                      </span>
                    </template>
                    <template v-else>
                      <span class="custom_input icon_date mar_b10">
                        <div class="date_picker">
                          <el-date-picker value-format="yyyy-MM-dd" v-model="btn.action.calendarAction.createCalendarEvent.startTime" type="date" :disabled="true" placeholder="시작일" />
                        </div>
                      </span>
                      <span class="custom_input icon_date mar_b10">
                        <div class="date_picker">
                          <el-date-picker value-format="yyyy-MM-dd" v-model="btn.action.calendarAction.createCalendarEvent.endTime" type="date" :disabled="true" placeholder="종료일" />
                        </div>
                      </span>
                    </template>
                    <span class="custom_checkbox mar_b10">
                      <input type="checkbox" :id="`action_${idx}_useVariable`" v-model="btn.action.calendarAction.createCalendarEvent.useVariable" :disabled="true">
                      <label :for="`action_${idx}_useVariable`">변수</label>
                    </span>
                  </div>

                  <input class="p_byte mar_b10" v-model="btn.action.calendarAction.createCalendarEvent.title" :disabled="true">
                  <input class="p_byte" v-model="btn.action.calendarAction.createCalendarEvent.description" :disabled="true">
                </div>
                <!-- 8) 메시지 보내기 -->
                <div v-if="getButtonAction(btn) === 'compose_text_message'" class="custom_input mar_b10">
                  <input class="p_byte mar_b10" v-model="btn.action.composeAction.composeTextMessage.phoneNumber" :disabled="true">
                  <input class="p_byte" v-model="btn.action.composeAction.composeTextMessage.text" :disabled="true">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- 작성 -->
  <div v-else>
    <div class="rcs_item_bundle rcs_item_btns">
      <strong class="rcs_tit_bundle p-l0">
        버튼
        <span class="require">*</span>
      </strong>
      <div class="rcs_cont_bundle rcs_cont_detail_repeat">
        <span class="using_stat" > <!-- 버튼 미사용시 인라인으로 border-bottom: 1p solid #e2e8f0 추가 부탁드려요 -->
          <div class="btn sml stat_btn" :class="{ 'check': btnCnt === 0 }" @click="changeCount(0)">미사용</div>
          <div class="btn sml stat_btn" :class="{ 'check': btnCnt === 1 }" @click="changeCount(1)">1개</div>
          <div class="btn sml stat_btn" :class="{ 'check': btnCnt === 2 }" @click="changeCount(2)">2개</div>
        </span>
        <div v-for="(btn, idx) in info.btnList" :key="idx" class="rcs_cont_detail_wrap">
          <div class="rcs_cont_detail_tit">
           <span class="dash">-</span> 버튼{{ idx + 1 }}
          </div>
          <div class="rcs_cont_detail_cont">
            <div class="using_stat noneinput" :tabindex="idx" :ref="`action_${idx}_select`">
              <span @click="changeActionByRadio(idx, 'open_url')"  class="btn sml stat_btn" :class="{ 'check': hasAction(idx, 'urlAction') }">URL연결</span>
              <span @click="changeActionByRadio(idx, 'dial_phone_number')" class="btn sml stat_btn" :class="{ 'check': hasAction(idx, 'dialerAction') }">전화하기</span>
              <span @click="changeActionByRadio(idx, 'etc')" class="btn sml stat_btn" :class="{ 'check': !hasAction(idx, 'urlAction') && !hasAction(idx, 'dialerAction') }">기타</span>
              <span class="custom_select">
                <select v-model="actionSelType[idx]" @change="changeActionBySelect(idx, $event)" :disabled="btn.action.hasOwnProperty('urlAction') || btn.action.hasOwnProperty('dialerAction')">
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
              <input class="p_byte" :ref="`action_${idx}_displayText`" v-model="btn.action.displayText" @input="changeInput($event, idx, 'action.displayText')" type="text" placeholder="버튼명을 입력해주세요" :maxlength="getMaxLength(`btnName${idx + 1}`)"/>
              <span class="input_byte">({{ btn.action.displayText.length }}/16자)</span>
            </div>
            <!-- 버튼액션별 입력창 -->
            <!-- 1) URL 연결 -->
            <span v-if="hasAction(idx, 'urlAction')">
              <div class="custom_input w590 mar_b10">
                <input class="p_byte" :ref="`action_${idx}_url`" v-model.trim="btn.action.urlAction.openUrl.url" @keydown="notAllowSpace($event)" @input="changeInput($event, idx, 'action.urlAction.openUrl.url')" type="text" placeholder="http://www.rcsbizcenter.com 형식으로 입력" maxlength="100"/>
                <span class="input_byte">({{ btn.action.urlAction.openUrl.url.length }}/100자)</span>
              </div>
            </span>
            <!-- 2) 전화하기 -->
            <span v-if="hasAction(idx, 'dialerAction')">
              <div class="custom_input w590 mar_b10">
                <input class="p_byte" :ref="`action_${idx}_phoneNumber`" v-model.trim="btn.action.dialerAction.dialPhoneNumber.phoneNumber" @keydown="notAllowSpace($event)" @input="changeInput($event, idx, 'action.dialerAction.dialPhoneNumber.phoneNumber')" type="text" placeholder="전화번호 입력" maxlength="40"/>
                <span class="input_byte">({{ btn.action.dialerAction.dialPhoneNumber.phoneNumber.length }}/40자)</span>
              </div>
            </span>
            <!-- 3) 복사하기 -->
            <span v-if="actionSelType[idx] === 'copy_to_clipboard'">
              <div class="custom_input w590 mar_b10">
                <input class="p_byte" :ref="`action_${idx}_text`" v-model="btn.action.clipboardAction.copyToClipboard.text" @input="changeInput($event, idx, 'action.clipboardAction.copyToClipboard.text')" type="text" placeholder="복사할 값 입력" maxlength="200"/>
                <span class="input_byte">({{ btn.action.clipboardAction.copyToClipboard.text.length }}/200자)</span>
              </div>
            </span>
            <!-- 4) 지도 보여주기(좌표)-->
            <span v-if="actionSelType[idx] === 'show_location'">
              <div class="custom_input w590 mar_b10">
                <input class="p_byte" :ref="`action_${idx}_latitude`" v-model.trim="btn.action.mapAction.showLocation.location.latitude" @keydown="notAllowSpace($event)" type="text" placeholder="위도입력" maxlength="40"/>
                <span class="input_byte">({{ calcNumberLength(btn.action.mapAction.showLocation.location.latitude) }}/40자)</span>
              </div>
              <div class="custom_input w590 mar_b10">
                <input class="p_byte" :ref="`action_${idx}_longitude`" v-model.trim="btn.action.mapAction.showLocation.location.longitude" @keydown="notAllowSpace($event)" type="text" placeholder="경도입력" maxlength="40"/>
                <span class="input_byte">({{ calcNumberLength(btn.action.mapAction.showLocation.location.longitude) }}/40자)</span>
              </div>
              <div class="custom_input w590 mar_b10">
                <input class="p_byte" :ref="`action_${idx}_label`" v-model="btn.action.mapAction.showLocation.location.label" type="text" placeholder="위치이름" maxlength="100"/>
                <span class="input_byte">({{ btn.action.mapAction.showLocation.location.label.length }}/100자)</span>
              </div>
              <div class="custom_input w590 mar_b10">
                <input class="p_byte" :ref="`action_${idx}_fallbackUrl`" v-model.trim="btn.action.mapAction.showLocation.fallbackUrl" @keydown="notAllowSpace($event)" type="text" placeholder="http://www.rcsbizcenter.com 형식으로 입력" maxlength="100"/>
                <span class="input_byte">({{ btn.action.mapAction.showLocation.fallbackUrl.length }}/100자)</span>
              </div>
            </span>
            <!-- 5) 지도 보여주기(쿼리) -->
            <span v-if="actionSelType[idx] === 'search_locations'">
              <div class="custom_input w590 mar_b10" >
                <input class="p_byte" :ref="`action_${idx}_query`" v-model="btn.action.mapAction.showLocation.location.query" type="text" placeholder="위치이름" maxlength="100"/>
                <span class="input_byte">({{ btn.action.mapAction.showLocation.location.query.length }}/100자)</span>
              </div>
              <div class="custom_input w590 mar_b10" >
                <input class="p_byte" :ref="`action_${idx}_fallbackUrl`" v-model.trim="btn.action.mapAction.showLocation.fallbackUrl" @keydown="notAllowSpace($event)" type="text" placeholder="http://www.rcsbizcenter.com 형식으로 입력" maxlength="100"/>
                <span class="input_byte">({{ btn.action.mapAction.showLocation.fallbackUrl.length }}/100자)</span>
              </div>
            </span>
            <!-- 6) 현재 위치 공유 .. -->
            <span v-if="actionSelType[idx] === 'request_location_push'">
              <div class="custom_input w590 mar_b10">
                <input type="text" disabled="true">
              </div>
            </span>
            <!-- 7) 캘린더 등록 -->
            <span v-if="actionSelType[idx] === 'create_calendar_event'">
              <div class="custom_input w590 mar_b10">
                <span>
                  <div class="cont_flex_bundle" :class="btn.action.calendarAction.createCalendarEvent.useVariable ? 'direct_date' : 'date_checkbox mar_b10'">
                    <!-- 캘린더 - 직접 입력 -->
                    <template v-if="btn.action.calendarAction.createCalendarEvent.useVariable">
                      <span class="custom_input mar_b10 mar_r10">
                        <input type="text" :ref="`action_${idx}_startTime`" v-model.trim="btn.action.calendarAction.createCalendarEvent.startTime" @keydown="notAllowSpace($event)" placeholder="시작일">
                      </span>
                      <span class="custom_input mar_b10">
                        <input type="text" :ref="`action_${idx}_endTime`" v-model.trim="btn.action.calendarAction.createCalendarEvent.endTime" @keydown="notAllowSpace($event)" placeholder="종료일">
                      </span>
                    </template>
                    <template v-else>
                      <span class="custom_input icon_date">
                        <div class="date_picker">
                          <el-date-picker :ref="`action_${idx}_startTime`" v-model="btn.action.calendarAction.createCalendarEvent.startTime" type="date" placeholder="시작일" confirm-text="확인"
                            :confirm="true" :show-second="false" :minute-step="5" :second-step="5" value-format="yyyy-MM-dd"
                            @confirm="cfm(idx, btn.action.calendarAction.createCalendarEvent)"/>
                        </div>
                      </span>
                      <span class="custom_input icon_date">
                        <div class="date_picker">
                          <el-date-picker :ref="`action_${idx}_endTime`" v-model="btn.action.calendarAction.createCalendarEvent.endTime" type="date" placeholder="종료일" confirm-text="확인"
                            :confirm="true" :show-second="false" :minute-step="5" :second-step="5" value-format="yyyy-MM-dd"
                            @confirm="cfm(idx, btn.action.calendarAction.createCalendarEvent)"/>
                        </div>
                      </span>
                    </template>
                    <span class="custom_checkbox">
                      <input type="checkbox" :id="`action_${idx}_useVariable`" v-model="btn.action.calendarAction.createCalendarEvent.useVariable" @change="clearTime(btn.action.calendarAction.createCalendarEvent)">
                      <label :for="`action_${idx}_useVariable`">변수</label>
                      </span>
                    </div>
                  <!-- 캘린더 -->
                  <div class="custom_input w590 mar_b10">
                    <input class="p_byte" :ref="`action_${idx}_title`" v-model="btn.action.calendarAction.createCalendarEvent.title" @input="changeInput($event, idx, 'action.calendarAction.createCalendarEvent.title')" type="text" placeholder="제목 입력" maxlength="100"/>
                    <span class="input_byte">({{ btn.action.calendarAction.createCalendarEvent.title.length }}/100자)</span>
                  </div>
                  <div class="custom_input w590 mar_b10">
                    <input class="p_byte" :ref="`action_${idx}_description`" v-model="btn.action.calendarAction.createCalendarEvent.description" @input="changeInput($event, idx, 'action.calendarAction.createCalendarEvent.description')" type="text" placeholder="내용 입력" maxlength="100"/>
                    <span class="input_byte">({{ btn.action.calendarAction.createCalendarEvent.description.length }}/100자)</span>
                  </div>
                </span>
              </div>
            </span>
            <!-- 8) 메시지 작성 -->
            <span v-if="actionSelType[idx] === 'compose_text_message'">
              <div class="custom_input w590 mar_b10">
                <input class="p_byte" :ref="`action_${idx}_phoneNumber`" v-model.trim="btn.action.composeAction.composeTextMessage.phoneNumber" @keydown="notAllowSpace($event)" @input="changeInput($event, idx, 'action.composeAction.composeTextMessage.phoneNumber')" type="text" placeholder="전화번호 입력" maxlength="40"/>
                <span class="input_byte">({{ btn.action.composeAction.composeTextMessage.phoneNumber.length }}/40자)</span>
              </div>
              <div class="custom_input w590 mar_b10">
                <input class="p_byte" :ref="`action_${idx}_text`" v-model="btn.action.composeAction.composeTextMessage.text" @input="changeInput($event, idx, 'action.composeAction.composeTextMessage.text')" type="text" placeholder="문자메시지 내용 입력" maxlength="100"/>
                <span class="input_byte">({{ btn.action.composeAction.composeTextMessage.text.length }}/100자)</span>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import refData from '@/components/imageTemplate/js/imageTemplateDefaultRefData'
import MessageBaseFormUtils from '@/components/messageTemplate/js/MessageBaseFormUtils'
export default {
  name: 'Buttons',
  props: {
    info: {
      type: Object,
      default: null
    },
    paramInfo: {
      type: Array,
      default: null
    },
    viewMode: {
      type: Boolean,
      default: false
    },
    isNewbie: {
      type: Boolean
    }
  },
  data () {
    return {}
  },
  computed: {
    actionSelType() { // 버튼 > 기타 액션 데이터
      let arr = []
      this.info.btnList.forEach(btn => {
        let data = this.getButtonActionData(btn)
        if (data.action === 'urlAction' || data.action === 'dialerAction' || data.action === '') arr.push('etc')
        else arr.push(data.action)
      })
      return arr
    },
    btnCnt() {
      return this.info.btnList.length
    },
    hasAction() {
      return (idx, action) => {
        return this.info.btnList[idx].action.hasOwnProperty(action)
      }
    }
  },
  watch: {},
  created() {
    if (this.isNewbie) this.changeCount(1)
  },
  methods: {
    /** 버튼 액션 변경 - URL연결, 전화하기, 기타 중에 선택시 동작 */
    changeActionByRadio(idx, type) {
      this.changeAction(idx, type)
    },
    /** 버튼 액션 변경 - 기타:select 변경시 동작 */
    changeActionBySelect(idx, e) {
      this.changeAction(idx, e.target.value)
    },
    /** 버튼 액션 변경: 액션에 맞는 데이터 형태를 새로 넣어준다 */
    changeAction(idx, type) {
      let jsonData = refData['buttons'][type] || {}
      let defData = jsonData !== {} ? JSON.parse(JSON.stringify(jsonData)) : {}
      let postbackData = type === 'etc' ? '' : this.getPostbackData(type)
      let action = {
        displayText: this.info.btnList[idx].action.displayText,
        postback: {
          data: postbackData
        }
      }
      if (type === 'create_calendar_event') defData.calendarAction.createCalendarEvent.useVariable = false
      this.info.btnList[idx].action = Object.assign(defData, action)
    },
    getPostbackData(type) {
      return 'set_by_chatbot_' + type
    },
    getButtonActionName(btn) {
      return this.getButtonActionData(btn).actionNm
    },
    getButtonAction(btn) {
      return this.getButtonActionData(btn).action
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
    /** 버튼 개수 변경 */
    changeCount(chgCnt) {
      let curCnt = this.info.btnList.length // 현재 개수
      if (chgCnt === 0) {
        this.info.btnList.splice(0, curCnt) // 미사용: 등록된 요소 모두 제거
      } else {
        let diff = chgCnt - curCnt
        if (diff > 0) {
          for (let i = curCnt > 0 ? curCnt - 1 : 0; i < diff; i++) {
            let defData = JSON.parse(JSON.stringify(refData['buttons']['default']))
            let actionDefData = JSON.parse(JSON.stringify(refData['buttons']['open_url']))
            let data = Object.assign(defData.action, actionDefData)

            defData.action = data
            defData.action.postback.data = this.getPostbackData('open_url')
            this.info.btnList.push(defData)
          }
        } else {
          this.info.btnList.splice(curCnt - 1, 1)
        }
      }
    },
    isNotAfter(o) {
      return !o.useVariable && o.startTime && o.endTime && !moment(o.endTime).isAfter(o.startTime)
    },
    cfm(idx, o) {
      if (this.isNotAfter(o)) {
        this.$alertMsg('종료날짜는 시작날짜 이후이어야 합니다.').then(res => { this.$refs[`action_${idx}_endTime`][0].focus() }).catch(res => {})
      }
    },
    clearTime(o) {
      o.startTime = ''
      o.endTime = ''
    },
    changeInput(e, idx, properties) {
      let target = this.$props.info.btnList[idx]
      let propertyArr = properties.split('.')
      let targetProperty = propertyArr.pop()
      propertyArr.forEach(p => {
        target = target[p]
      })
      target[targetProperty] = e.target.value
    },
    notAllowSpace(e) {
      if (e.keyCode === 32) e.preventDefault()
    },
    validateData() {
      for (let idx = 0; idx < this.info.btnList.length; idx++) {
        let item = this.info.btnList[idx]
        // 버튼 액션
        if (jglib.isEmpty(item.action.postback.data)) {
          this.$alertMsg('버튼 종류를 선택해 주세요.').then(() => {
            this.$refs[`action_${idx}_select`][0].tabindex = idx
            this.$refs[`action_${idx}_select`][0].focus()
          })
          return false
        }
        // 버튼명
        if (jglib.isEmpty(item.action.displayText)) {
          this.$alertMsg('버튼명을 입력해 주세요.').then(() => {
            this.$refs[`action_${idx}_displayText`][0].focus()
          })
          return false
        } else if (MessageBaseFormUtils.isContainParamKey(item.action.displayText)) { // 변수 사용 여부 체크
          this.$alertMsg('버튼명에는 변수를 사용할 수 없습니다.').then(() => {
            this.$refs[`action_${idx}_displayText`][0].focus()
          })
          return false
        }

        let result = this.validateButtonData(idx, item)
        if (result) {
          let msg = ''
          if (result === 'error') msg = '버튼 내용을 입력해 주세요.'
          else {
            switch (result.reason) {
              case 'url': msg = '올바른 URL 형식이 아닙니다.'; break
              case 'empty': msg = '버튼 정보를 입력해 주세요.'; break
              case 'period': msg = '종료날짜는 시작날짜 이후이어야 합니다.'; break
              case 'port': msg = '유효하지 않은 포트 입니다.'; break
              case 'domain': msg = '유효하지 않은 도메인 입니다.'; break
              case 'variable': msg = '변수명은 20자 이내의 한글, 영문, 숫자, \'_\'만 가능합니다.(특수문자, 공란, 줄바꿈 사용 불가)'; break
              case 'domain variable': msg = '도메인에는 변수 사용이 불가합니다.'; break
              case 'description variable': msg = '\'description\'은 변수명으로 사용이 불가합니다.'; break
              // case 'no variable': msg = '파라미터는 변수를 사용할 수 없습니다.'; break
              case 'variable only': msg = '변수 사용 시 변수만 입력 가능합니다.'; break
              // case 'not number': msg = '숫자값만 입력 가능합니다.'; break
            }
          }
          this.$alertMsg(msg).then(() => {
            if (result.focus) result.focus[0].focus()
          })
          return false
        }
      }
      return true
    },
    /** 버튼 상세데이터 체크 */
    validateButtonData(idx, item) {
      let focus = null
      let targets = MessageBaseFormUtils.getCheckTargetOfSuggestions(item)
      for (const key of Object.keys(targets)) {
        let target = targets[key]
        if (typeof target === 'string') {
          focus = this.$refs[`action_${idx}_${key}`]
          if (jglib.isEmpty(target)) { // (?) postParameter 는 필수가 아님 () (&& key !== 'postParameter')
            return { focus: focus, reason: 'empty' }
          }
          if (!MessageBaseFormUtils.checkVarialbeString(target)) {
            return { focus: focus, reason: 'variable' }
          }
          if (!MessageBaseFormUtils.checkDescriptionVariable(target)) {
            return { focus: focus, reason: 'description variable' }
          }
          // URL 형식
          if ((key === 'url' || key === 'fallbackUrl') && target.length > 0) {
            if (target.indexOf('http://') !== 0 && target.indexOf('https://') !== 0) {
              return { focus: focus, reason: 'url' }
            }
            let result = MessageBaseFormUtils.checkIsUrlValid(target)
            if (result) {
              return { focus: focus, reason: result.reason }
            }
          }
          // 캘린더 변수, 범위 체크
          if (targets.useVariable && (key === 'startTime' || key === 'endTime')) {
            if (!MessageBaseFormUtils.getIsOnlyParam(target)) {
              return { focus: focus, reason: 'variable only' }
            }
          } else if (!targets.useVariable && this.isNotAfter(targets)) {
            return { focus: this.$refs[`action_${idx}_endTime`], reason: 'period' }
          }
        } else if (typeof target === 'boolean') {
          // nothing...
        } else {
          if (target) {
            for (const t of Object.keys(target)) {
              focus = this.$refs[`action_${idx}_${t}`]
              let data = typeof target[t] !== 'string' ? String(target[t]) : target[t]
              if (jglib.isEmpty(data.trim())) {
                return { focus: focus, reason: 'empty' }
              } else {
                if (!MessageBaseFormUtils.checkVarialbeString(data)) {
                  return { focus: focus, reason: 'variable' }
                }
                if (!MessageBaseFormUtils.checkDescriptionVariable(data)) {
                  return { focus: focus, reason: 'description variable' }
                }
              }
              // if (t === 'latitude' || t === 'longitude') { // 경도, 위도 체크
              //   if (isNaN(data)) {
              //     return { focus: focus, reason: 'not number' }
              //   }
              // }
              if (t === 'url' || t === 'fallbackUrl') {
                if (data.indexOf('http://') !== 0 && data.indexOf('https://') !== 0) {
                  return { focus: focus, reason: 'url' }
                }
                let result = MessageBaseFormUtils.checkIsUrlValid(target)
                if (result) {
                  return { focus: focus, reason: result.reason }
                }
              }
            }
          } else {
            if (key === 'useVariable') {
              // nothing..
            } else return 'error'
          }
        }
      }
      return null
    },
    getMaxLength(type) {
      let param = this.paramInfo.find(param => param.paramNm === type)
      return param ? param.strSize : 0
    },
    calcNumberLength(val) {
      if (typeof val === 'number') return String(val).length
      else return val.length
    }
  }
}
</script>

<style>
  /* 버튼 액션 영역 focusing outline 제거 */
  div:focus { outline: none; }
</style>
