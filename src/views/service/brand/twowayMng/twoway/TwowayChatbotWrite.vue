<template>
  <div class="rcs_emul_form_wrap">
    <div class="rcs_emul_form_cont dv2023_formspace bd_no">
      <div class="dv2023_radiolength">
        <div class="rcs_item_bundle">
          <strong class="rcs_tit_bundle p-l0">
            대화방 명 <span class="require">*</span>
          </strong>
          <div class="rcs_cont_bundle">
            <span class="custom_input w670">
              <input v-model.trim="wrtChatbotData.subTitle" ref="subTitle" @input="e => wrtChatbotData.subTitle = e.target.value" maxlength="20" type="text" placeholder="대화방 명을 입력해 주세요.">
              <p class="dv2023_limitcount">(<span>{{ wrtChatbotData.subTitle.length }}</span>/20)</p>
            </span>
          </div>
        </div>
        <div class="rcs_item_bundle">
          <strong class="rcs_tit_bundle p-l0">
            {{ isA2pChatbot ? '발신번호/회신번호' : '회신번호' }} <span class="require">*</span>
          </strong>
          <div class="rcs_cont_bundle dv2023_positionbutton">
            <span v-if="!isA2pChatbot && (isWrite || isNew)" class="custom_input">
              <!-- 번호 선택해서 바인딩 된 값: 사용자 입력 불가 -->
              <input type="text" v-model="wrtChatbotData.subNum" disabled/>
              <a href="javascript:void(0)" ref="subNum" class="btn sml bd_black" @click="openSubNumPopup">번호선택</a>
            </span>
            <span v-else>
              <!-- 발신번호 기반의 대화방을 수정하는 경우, 발신번호는 변경 불가함 -->
              {{ wrtChatbotData.subNum }}
            </span>
          </div>
        </div>
        <div class="rcs_item_bundle">
          <strong class="rcs_tit_bundle p-l0">
            챗봇 ID <span class="require">*</span>
            <span class="relative">
              <button class="icon_info"></button>
              <!-- 발신번호 기반 양방향 대화방-->
              <span v-if="isA2pChatbot" class="message">발신번호를 챗봇ID로 사용하여 양방향 대화방 기능을 이용할 수 있으며,<br/>동일한 대화방에 일반 문자(SMS/LMS/MMS)도 함께 보여집니다.</span>
              <!-- 챗봇ID기반 양방향 대화방 -->
              <span v-else class="message">챗봇ID가 발신번호가 아닐 경우 일반 문자(SMS/LMS/MMS)는 수신할 수 없으며, RCS 문자만 수발신 가능합니다.</span>
            </span>
          </strong>
          <div class="rcs_cont_bundle dv2023_positionbutton">
            <span v-if="!isA2pChatbot && !isWrite" class="custom_input dv2023_btngrey">
              <input v-model.trim="wrtChatbotData.chatbotId" ref="chatbotId" @keyup="handleKeyChatbotId" @keydown="handleKeyChatbotId"
                :disabled="isA2pChatbot || wrtChatbotData.subNum === ''" maxlength="15" type="text" placeholder="회신번호 선택 시 자동으로 생성됩니다.">
              <a ref="dupcheck" v-if="!isA2pChatbot" @click.stop="checkDuplicate" href="javascript:void(0)" class="btn sml"
                :class="(!isA2pChatbot && wrtChatbotData.chatbotId === '') || chatbotIdDupCheckFlag ? 'bd_gray' : 'bd_black' " :disabled="chatbotIdDupCheckFlag">중복체크</a>
            </span>
            <span v-else>
              {{ chatbotData.chatbotId }}
            </span>
          </div>
        </div>
        <div class="rcs_item_bundle">
          <strong class="rcs_tit_bundle p-l0">
            메시지 입력란 <span class="require">*</span>
          </strong>
          <div class="rcs_cont_bundle">
            <span class="w670">
              <span class="custom_radio checked dv2023_radiolength3">
                <input type="radio" id="inputField_Y" name="inputFieldYn" value="Y" v-model="wrtChatbotData.inputFieldYn"/>
                <label for="inputField_Y"><span>입력 가능</span></label>
              </span>
              <span class="custom_radio checked dv2023_radiolength3">
                <input type="radio" id="inputField_N" name="inputFieldYn" value="N" v-model="wrtChatbotData.inputFieldYn"/>
                <label for="inputField_N"><span>입력 불가능</span></label>
              </span>
            </span>
          </div>
        </div>
        <div v-if="isActive" class="rcs_item_bundle">
          <strong class="rcs_tit_bundle p-l0">
            전시 <span class="require">*</span>
            <span class="relative">
              <button class="icon_info"></button>
              <span class="message">
                대화방을 비전시로 설정하면 고객은 메시지 앱에서 대화방 정보를<br/>볼 수 없습니다.
              </span>
            </span>
          </strong>
          <div class="rcs_cont_bundle">
            <span class="w670">
              <span class="custom_radio checked dv2023_radiolength3">
                <input type="radio" id="display_Y" name="displayYn" value="1" v-model="displayYn" @click="toggleDisplayYn('1')"/>
                <label for="display_Y"><span>전시</span></label>
              </span>
              <span class="custom_radio checked dv2023_radiolength3">
                <input type="radio" id="display_N" name="displayYn" value="0" v-model="displayYn" @click="toggleDisplayYn('0')"/>
                <label for="display_N"><span>비전시</span></label>
              </span>
            </span>
          </div>
        </div>
      </div>
      <div class="dv2023_segmentwidth dv2023_mtn10">
        <div class="rcs_item_bundle dv2023_infopop dv2023_addoverline">
          <strong class="rcs_tit_bundle p-l0">
            대행사 <span class="require">*</span>
            <span class="relative">
              <button class="icon_info"></button>
              <span class="message">
                양방향 서비스를 이용하기 위해서는 기존 브랜드 설정 시 등록한 대행사와 다르게<br>양방향을 지원하는 대행사로 별도 지정해야 합니다.
              </span>
            </span>
          </strong>
          <!-- 대행사 -->
          <div v-if="isAgency" class="rcs_cont_bundle">
            <span v-if="isRcsCorpAgency" class="w670">{{ wrtChatbotData.agencyNm }}</span>
            <span v-else class="custom_select dv2023_selectwidth">
              <select @change="onChangeAgency" ref="agency" v-model="wrtChatbotData.botAgencyId">
                <option value>선택</option>
                <option v-for="(agency, idx) in agencyList" :key="idx" :value="agency.relayAgId" :agencyId="agency.agencyId" :relayAgId="agency.relayAgId" :webhook="agency.webhookUrl">{{ agency.agencyNm }}</option>
              </select>
            </span>
          </div>
          <div v-else class="rcs_cont_bundle">
            <span class="custom_select dv2023_selectwidth">
              <select @change="onChangeAgency" ref="agency" v-model="wrtChatbotData.agencyId">
                <option value>선택</option>
                <option v-for="(agency, idx) in agencyList" :key="idx" :value="agency.agencyId" :agencyId="agency.agencyId" :relayAgId="agency.relayAgId" :webhook="agency.webhookUrl">{{ agency.agencyNm }}</option>
              </select>
            </span>
          </div>
        </div>
        <div class="rcs_item_bundle dv2023_addunderline">
          <strong class="rcs_tit_bundle p-l0">
            챗봇 응답용 URL
          </strong>
          <div class="rcs_cont_bundle">
            <span class="custom_input w670">
              <input v-model="wrtChatbotData.webhook" disabled type="text"/>
            </span>
          </div>
        </div>
        <div class="rcs_item_bundle dv2023_infopop dv2023_mt5">
          <strong class="rcs_tit_bundle p-l0">
            검색 허용
            <span class="relative">
              <button class="icon_info"></button>
              <span class="message">
                메시지 앱에서 브랜드를 검색할 수 있는 기능입니다.
              </span>
            </span>
          </strong>
          <div class="rcs_cont_bundle">
            <span class="custom_checkbox w670">
              <input type="checkbox" id="searchYN" v-model="searchYn" @click="toggleSearchYn($event)"/>
              <label for="searchYN">허용</label>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 버튼 영역 -->
    <div class="btn_wrap dv2023_btnspace mar_t40 full_width temWrite btn_flex first">
      <a href="javascript:void(0);" class="btn mid bd_blue" @click="goBack"><span>이전</span></a>
      <a href="javascript:void(0);" class="btn mid bd_blue" v-if="!isNew" @click="remove">삭제</a>
      <a href="javascript:void(0);" class="btn mid bd_blue" v-if="showSavedBtn" @click="save">임시저장</a>
      <a href="javascript:void(0);" class="btn mid bd_blue" v-if="isA2pChatbot && isActive" @click="convertOneway">단방향 전환</a>
      <a href="javascript:void(0);" class="btn mid blue" @click="apply">승인요청</a>
    </div>
    <!-- 발신번호/회신번호 선택 팝업 -->
    <ChatbotSubNumPopup  v-if="visible" :visible.sync="visible" :brandId="brandId" :chatbotType="wrtChatbotData.service" @selectedMdn="selectedMdn"/>
  </div>
</template>

<script>
import { getRandomChatbotId, isDuplicateChatbotId, getBrandChatAgencyInfo, getMappingAgencyInfo, addTwowayChatbot, updateTwowayChatbot, deleteChatbots, convertChatbotOneway, isSubNumChatbots, getActiveA2pChatbotCnt, getActiveAndDisplayA2pChatbotCnt } from '@/api/service/chatbot'
import ChatbotSubNumPopup from '@/views/service/components/chatbot/ChatbotSubNumPopup'
export default {
  name: 'TwowayChatbotWrite',
  components: {
    ChatbotSubNumPopup
  },
  props: {
    isNew: { type: Boolean, default: true },
    isWrite: { type: Boolean },
    chatbotData: { type: Object, default: null },
    wrtChatbotData: { type: Object, default: null }
  },
  data() {
    return {
      brandId: '',
      twowayPrefix: 'bot-',
      visible: false,
      searchYn: false, // 검색허용 여부
      displayYn: '1', // 전시/비전시 여부
      chatbotIdDupCheckFlag: false, // 챗봇아이디 중복체크 여부
      agencyList: [] // 대행사 목록
    }
  },
  computed: {
    isAgency() { return window.localStorage.getItem('userType') === 'AGENCY' },
    isRcsCorpAgency() { return window.localStorage.getItem('rcsCorpYn') === 'Y' }, // 중계사 여부
    isA2pChatbot() { return this.chatbotData.service === 'a2p' }, // 발신번호 기반 대화방 여부
    isActive() { return this.chatbotData.aprvRet === 'OK' },
    isAfterActive() { return this.chatbotData.activeYn === 'Y' }, // 승인 이후의 데이터인지?
    isSaved() { return this.chatbotData.aprvRet === 'SAVED' },
    isRejected() { return this.chatbotData.aprvRet === 'REJECTED' && this.chatbotData.status === 'DELETED' },
    showSavedBtn() {
      // 임시저장 버튼은 챗봇ID기반 대화방 생성시 노출 + 임시저장 상태의 데이터일 경우만 노출한다
      return (this.isNew && !this.isWrite) || this.isSaved
    },
    writeType() {
      if (this.isNew) {
        if (this.isWrite) return 'convert' // 기존 대화방을 양방향 대화방으로 전환하는 경우
        else return 'add' // 신규 챗봇ID 기반 대화방 생성
      } else return 'mod' // 양방향 대화방 수정
    }
  },
  created() {
    this.brandId = this.$route.params.brandId
    this.searchYn = this.wrtChatbotData.display.substring(0, 1) === '1'
    if (this.isNew) { // 신규 등록의 경우 항상 '전시'
      this.displayYn = '1'
    } else { // 신규가 아닌경우 - 상태값에 따라 전시/비전시 여부를 구분한다.
      if (this.isActive) this.displayYn = this.wrtChatbotData.display.substring(1, 2) // 승인완료: 사용자의 전시,비전시 데이터를 보여준다
      else this.displayYn = '1' // 그 외: 항상 전시
    }
  },
  mounted() {
    if (!this.isNew) this.chatbotIdDupCheckFlag = true
    this.setAgencyInfo()
  },
  methods: {
    /** 회원 유형, 제공 서비스에 따라 선택가능한 대행사 정보 set */
    setAgencyInfo() {
      if (!this.isAgency) {
        this.getBrandChatAgencyList() // 기업: 해당 브랜드에 지정된 양방향 대행사 목록을 set
      } else { // 대행사
        if (this.isRcsCorpAgency) { // 중계사인 대행사 임: 현재 대행사의 정보를 넣어줌
          let data = JSON.parse(window.localStorage.getItem('rcsCorpData'))
          this.wrtChatbotData.agencyNm = data.agencyNm // 대행사 명
          this.wrtChatbotData.agencyId = data.agencyId // 대행사 아이디(=중계사 아이디)
          this.wrtChatbotData.botAgencyId = data.relayAgId // 중계사 아이디
          this.wrtChatbotData.botAgencyNm = data.agencyNm
          this.wrtChatbotData.webhook = data.webhook // 중계사의 WEBHOOK_URL
        } else { // 중계사가 아닌 대행사: 해당 대행사의 중계사 목록을 가져옴
          this.getMappingAgencyList()
        }
      }
    },
    /** 대행사 목록
     *  - 기업: 해당 브랜드에서 양방향 서비스가 가능한 대행사의 목록
     *  - 중계사가 아닌 대행사
     *    > 최초 등록시: 현재 대행사의 중계사('기업정보 관리 > 양방향 대화방 중계사'에서 선택한 중계사)
     *    > 수정시: 현재 대행사의 중계사 + 브랜드 운영권한이 있는 양방향 서비스 대행사!(대행사의 중계사 아님)
     *      (why?) 대행사 사용자 관점에서 다른 대행사의 중계사는 알 수 없기 때문에 , 대행사 정보만!
     */
    // (기업)
    getBrandChatAgencyList() {
      let params = { isTwoWay: 'Y' }
      getBrandChatAgencyInfo(this.brandId, params).then(res => {
        this.agencyList = res.result
      }).catch((err) => {
        this.$alertMsg(err.desc).then(() => {})
      })
    },
    // (대행사)
    getMappingAgencyList() {
      let corpId = window.localStorage.getItem('corpId')
      let isUpdate = this.isNew ? 'N' : 'Y'
      let params = { isTwoWay: 'Y', corpId: corpId, isUpdate: isUpdate }
      getMappingAgencyInfo(this.brandId, params).then(res => {
        this.agencyList = res.result
      }).catch((err) => {
        this.$alertMsg(err.desc).then(() => {})
      })
    },
    /** 대행사 변경 */
    onChangeAgency(e) {
      let selected = e.target.selectedOptions[0]
      this.wrtChatbotData.webhook = selected.getAttribute('webhook') // 선택한 대행사의 WEBHOOK_URL
      this.wrtChatbotData.agencyId = selected.getAttribute('agencyId') // 선택한 대행사 ID
      this.wrtChatbotData.botAgencyId = selected.getAttribute('relayAgId') // 선택된 대행사가 중계사가 아니면 중계사의 agencyID / 중계사인 경우는 agencyId와 동일
    },
    /** 발신번호/회신번호 선택 팝업 오픈 */
    openSubNumPopup() {
      this.visible = true
    },
    /** 발신번호/회신번호 선택(변경) */
    selectedMdn(mdn) {
      this.wrtChatbotData.subNum = mdn
      if (this.isNew) {
        // 발신번호 기반 양방향 대화방의 경우 챗봇ID 를 선택한 번호로 set
        if (this.isA2pChatbot) this.wrtChatbotData.chatbotId = mdn
        else {
          // 챗봇ID 기반 양방향 대화방의 경우, 선택된 번호가 없었을 경우, 최초 챗봇 ID 생성해줌
          if (this.chatbotData.service === 'chat' && this.wrtChatbotData.chatbotId === '') {
            getRandomChatbotId(this.brandId).then(res => {
              if (res.code === '20000000') {
                this.wrtChatbotData.chatbotId = `${this.twowayPrefix}${res.result}`
                this.chatbotIdDupCheckFlag = true
              }
            }).catch((err) => {
              this.$alertMsg(err.desc).then(() => {})
            })
          }
        }
      }
    },
    /** 챗봇아이디 중복 체크: 삭제건은 제외하고 체크된다. */
    checkDuplicate() {
      if (!this.chatbotIdDupCheckFlag) {
        let chatbotId = this.removedPrefixChabotId(this.chatbotId)
        let params = { chatbotId }
        isDuplicateChatbotId(this.brandId, params).then(res => {
          if (res.code === '20000000') {
            this.$alertMsg('사용가능한 챗봇ID 입니다.')
            this.chatbotIdDupCheckFlag = true
          }
        }).catch((err) => {
          this.chatbotIdDupCheckFlag = false
          this.$alertMsg(err.desc).then(() => {})
        })
      }
    },
    toggleSearchYn(e) {
      let useSearch = e.target.checked
      if (!this.isRejected && useSearch && this.displayYn === '0') { // 검색허용으로 데이터를 바꾸는 경우
        this.$confirmMsg('검색 허용은 전시 상태에서만 가능합니다.<br>전시 상태로 변경하고, 검색을 허용하시겠습니까?').then(() => {
          this.searchYn = true
          this.displayYn = '1'
        }).catch(() => { this.searchYn = false })
      } else {
        this.searchYn = useSearch
      }
    },
    toggleDisplayYn(val) {
      if (this.searchYn && val === '0') {
        this.$confirmMsg('비전시 상태로 변경시 검색 허용은 사용할 수 없습니다.<br>비전시 처리 하시겠습니까?').then(() => {
          this.displayYn = '0'
          this.searchYn = false
        }).catch(() => { this.displayYn = '1' })
      } else {
        this.displayYn = val
      }
    },
    /** 챗봇 ID 입력시 처리(prefix, 중복체크 여부) */
    handleKeyChatbotId(e) {
      if ((e.keyCode === 8 || e.keyCode === 46) && e.target.value === this.twowayPrefix) {
        e.stopPropagation()
        e.preventDefault()
        return false
      } else if (!e.target.value.startsWith(this.twowayPrefix)) {
        e.target.value = this.chatbotId = this.twowayPrefix
        return false
      }
      let values = e.target.value.substring(this.twowayPrefix.length)
      e.target.value = this.twowayPrefix + values.toLowerCase().replace(/[^a-z0-9-_]/g, '')
      // 수정시 이전 챗봇ID와 동일하면 중복체크 ok
      this.chatbotIdDupCheckFlag = this.chatbotData.chatbotId === this.wrtChatbotData.chatbotId
    },
    removedPrefixChabotId() {
      return this.wrtChatbotData.chatbotId.split(this.twowayPrefix)[1]
    },
    /** 회신번호로 사용중인 양방향 대화방 개수 리턴 */
    async getSubNumChatbotCnt() {
      let res = await isSubNumChatbots(this.brandId, { chatbotIds: this.chatbotData.chatbotId })
      if (res.code === '20000000') {
        let data = Object.values(res.result[0])
        return Promise.resolve(data[0])
      }
    },
    goBack() {
      if (!_.isEqual(this.chatbotData, this.wrtChatbotData)) {
        this.$confirmMsg('입력중인 정보가 있습니다.<br>취소하고 목록으로 이동 하시겠습니까?').then(() => this.$emit('goBack'))
      } else this.$emit('goBack')
    },
    goList() {
      this.$router.push({ name: 'TwowayChatbotList', params: { brandId: this.brandId } })
    },
    /** 삭제 */
    async remove() {
      if (!this.isNew) {
        if (this.isA2pChatbot) { // 발신번호 기반
          let activeSendNumCnt = await getActiveA2pChatbotCnt(this.brandId) // 승인완료 발신번호 건 수
          if (this.isActive) { // 승인완료 상태
            if (activeSendNumCnt > 1) { // 마지막 번호 아님
              this.$confirmMsg('양방향 대화방을 삭제 하시겠습니까?').then(async () => {
                let useSubNumCnt = await this.getSubNumChatbotCnt()
                if (useSubNumCnt > 0) { // 회신번호로 사용중인 번호임
                  this.$confirmMsg('선택한 발신번호는 ' + useSubNumCnt + '개의 양방향 대화방의<br>회신번호로 지정되어 있습니다.<br>확인 버튼을 누르실 경우,<br>해당 양방향 대화방도 함께 삭제됩니다.<br><br>삭제 하시겠습니까?').then(() => {
                    this.deleteChatbot()
                  })
                }
              })
            } else { // 마지막 승인완료 발신번호
              this.$alertMsg('발신번호는 1개 이상 등록되어 있어야 합니다.<br>삭제할 수 없습니다.')
            }
          } else { // 승인완료 외의 상태 -> 바로 삭제
            this.$confirmMsg('양방향 대화방을 삭제 하시겠습니까?<br>(발신번호 기반의 양방향 대화방 삭제 시 해당 발신번호도 삭제됩니다.)').then(() => { this.deleteChatbot() })
          }
        } else { // 챗봇ID 기반 -> 바로 삭제
          this.$confirmMsg('양방향 대화방을 삭제 하시겠습니까?').then(() => this.deleteChatbot())
        }
      }
    },
    /** 삭제 요청 */
    deleteChatbot() {
      let data = { chatbotIds: [this.chatbotData.chatbotId], twoWayType: 'chat' }
      deleteChatbots(this.brandId, data).then(res => {
        if (res.code === '20000000') this.goList()
      }).catch((err) => {
        this.$alertMsg(err.desc).then(() => {})
      })
    },
    /** 데이터 검증 */
    async validation(isSave) {
      // 1. 대화방명
      if (jglib.isEmpty(this.wrtChatbotData.subTitle)) {
        this.$alertMsg('대화방 명을 입력해 주세요.').then(this.$refs.subTitle.focus())
        return Promise.resolve(false)
      }
      // (* 챗봇 ID기반 양방향 대화방 생성의 경우)
      if (this.wrtChatbotData.service === 'chat') {
        // 2. 회신번호 선택
        if (jglib.isEmpty(this.wrtChatbotData.subNum)) {
          this.$alertMsg('회신번호를 선택해 주세요.').then(this.$refs.subNum.focus())
          return Promise.resolve(false)
        }
        // 3. 챗봇ID, 신규 등록일 경우
        if (this.writeType === 'add') {
          let chatbotId = this.removedPrefixChabotId(this.wrtChatbotData.chatbotId)
          if (jglib.isEmpty(chatbotId)) {
            this.$alertMsg('챗봇 ID를 입력해 주세요.').then(this.$refs.chatbotId.focus())
            return Promise.resolve(false)
          }
          // 4. 챗봇ID-중복체크
          if (!this.chatbotIdDupCheckFlag) {
            this.$alertMsg('챗봇ID 중복체크를 진행해 주세요.').then(this.$refs.dupcheck.focus())
            return Promise.resolve(false)
          }
        }
      } else { // 발신번호 기반 양방향 대화방: 비전시로 변경하는 경우
        if (!isSave) {
          let originDisplay = this.chatbotData.display.substring(1, 2)
          if ((originDisplay !== this.displayYn) && this.displayYn === '0') {
            let displayListCnt = await getActiveAndDisplayA2pChatbotCnt(this.brandId) // (승인완료 + 전시) 상태 발신번호 목록
            let useSubNumCnt = await this.getSubNumChatbotCnt()
            if (displayListCnt > 1) { // 마지막 번호가 아닌 경우(승인완료 & 전시 상태인 마지막 번호가 아님)
              if (useSubNumCnt > 0) { // 마지막번호 X & 회신번호 O
                if (await this.$confirmMsg('선택한 발신번호는 ' + useSubNumCnt + '개의 양방향 대화방의<br>회신번호로 지정되어 있습니다.<br><br>함께 비전시 하시겠습니까?<br><br>(비전시 상태로 30일 유지 시 자동 삭제됩니다.').then(() => { return true }).catch(() => { return false })) {
                  return Promise.resolve(true)
                } else return Promise.resolve(false)
              } else { // 마지막번호 X & 회신번호 X
                if (await this.$confirmMsg('확인 버튼을 누르실 경우,<br>해당 양방향 대화방이 비전시 처리되며,<br>비전시 상태가 30일 이상 유지될 경우 자동으로 삭제됩니다.<br><br>비전시 하시겠습니까?').then(() => { return true }).catch(() => { return false })) {
                  return Promise.resolve(true)
                } else return Promise.resolve(false)
              }
            } else { // 마지막 번호인 경우(승인완료 & 전시 상태인 마지막 번호)
              if (useSubNumCnt > 0) { // 마지막번호 O & 회신번호 O
                if (await this.$confirmMsg('발신번호는 1개 이상 전시 상태로 있어야 하며,<br>선택한 발신번호는 ' + useSubNumCnt + '개의 양방향 대화방의<br>회신번호로 지정되어 있습니다.<br>해당 발신번호를 비전시 할 경우 양방향 대화방과, 브랜드도 함께 비전시 처리됩니다.<br><br>함께 비전시 하시겠습니까?<br><br>(비전시 상태로 30일 유지 시 브랜드와<br>함께 자동 삭제됩니다.').then(() => { return true }).catch(() => { return false })) {
                  return Promise.resolve(true)
                } else return Promise.resolve(false)
              } else { // 마지막번호 O & 회신번호 X
                if (await this.$confirmMsg('발신번호는 1개 이상 전시 상태로 있어야 합니다.<br>해당 발신번호를 비전시 할 경우<br>브랜드도 함께 비전시 처리됩니다.<br><br>함께 비전시 하시겠습니까?<br><br>(비전시 상태로 30일 유지 시 브랜드와 함께 자동 삭제됩니다.)').then(() => { return true }).catch(() => { return false })) {
                  return Promise.resolve(true)
                } else return Promise.resolve(false)
              }
            }
          }
        }
      }
      // 5. 대행사
      if (!isSave && jglib.isEmpty(this.wrtChatbotData.agencyId)) {
        this.$alertMsg('대행사를 선택해 주세요.').then(this.$refs.agency.focus())
        return Promise.resolve(false)
      }
      return Promise.resolve(true)
    },
    /** 임시저장 */
    async save() {
      // * 필수항목: 대화방명, 발신번호(챗봇ID)(중복체크 까지)
      if (await this.validation(true)) {
        let data = this.getParameters('SAVED')
        if (this.isWrite) { // 기존 데이터 업데이트
          updateTwowayChatbot(this.brandId, data).then(res => {
            if (res.code === '20000000') {
              this.$alertMsg('임시저장 되었습니다.').then(this.goList())
            }
          }).catch((err) => {
            this.$alertMsg(err.desc).then(() => {})
          })
        } else { // 신규 등록
          addTwowayChatbot(this.brandId, data).then(res => {
            if (res.code === '20000000') {
              this.$alertMsg('임시저장 되었습니다.').then(this.goList())
            }
          }).catch((err) => {
            this.$alertMsg(err.desc).then(() => {})
          })
        }
      }
    },
    /** 승인요청 */
    async apply() {
      if (await this.validation(false)) {
        let msg = '운영자 승인이 완료되면 양방향 대화방을 사용할 수 있습니다.<br>양방향 대화방을 등록 하시겠습니까?'
        let action
        let isModSubTitle = false
        let changeSubTitle = this.chatbotData.subTitle !== this.wrtChatbotData.subTitle
        // 1. 데이터 상태에 따라 대화방명 변경 여부를 set
        if (this.isRejected) { // 반려
          if (this.isAfterActive) { // 기승인 반려
            if (changeSubTitle && this.chatbotData.mstSubTitle === this.wrtChatbotData.subTitle) {
              isModSubTitle = false // 현재 화면에서 대화방명은 수정되었지만, 기존 승인된 데이터의 대화방명과 동일한 경우 -> 비승인수정
            } else isModSubTitle = true
          } else isModSubTitle = changeSubTitle // 신규 반려: 대화방명이 수정되었는지만 확인
        } else isModSubTitle = changeSubTitle // 그 외(신규작성, 저장, 승인완료)
        // 2. 수정 타입에 따라 메시지와 액션을 set
        if (this.writeType === 'convert') { // 기존 대화방 양방향 전환
          action = 'APRV_MOD'
          if (!isModSubTitle) msg = '확인 버튼을 누르면 변경하신 정보가 바로 반영 됩니다.<br>승인 요청 하시겠습니까?'
        } else if (this.writeType === 'add') { // 신규 등록
          action = 'APRV_NEW'
        } else { // 수정
          if (this.isSaved || !this.isAfterActive) { // 저장 or 미승인건
            action = 'APRV_NEW'
          } else {
            action = 'APRV_MOD'
            if (!isModSubTitle) msg = '확인 버튼을 누르면 변경하신 정보가 바로 반영 됩니다.<br>승인 요청 하시겠습니까?'
          }
        }
        // api call
        if (this.writeType === 'add') { // POST
          this.$confirmMsg(msg).then(() => {
            let data = this.getParameters(action)
            addTwowayChatbot(this.brandId, data).then(res => {
              if (res.code === '20000000') this.goList()
            }).catch((err) => {
              this.$alertMsg(err.desc).then(() => {})
            })
          })
        } else { // PUT
          this.$confirmMsg(msg).then(() => {
            let data = this.getParameters(action)
            updateTwowayChatbot(this.brandId, data).then(res => {
              if (res.code === '20000000') this.goList()
            }).catch((err) => {
              this.$alertMsg(err.desc).then(() => {})
            })
          })
        }
      }
    },
    getParameters(action) {
      return {
        chatbotId: this.wrtChatbotData.chatbotId, // 쳇봇ID
        subTitle: this.wrtChatbotData.subTitle, // 대화방명
        mdn: this.wrtChatbotData.subNum, // 회신번호
        rcsReply: '1', // 대표번호 문자수신서비스(미사용)
        action: action,
        display: (this.searchYn ? '1' : '0').concat(this.displayYn), // 검색허용 + 전시/비전시
        inputFieldYn: this.wrtChatbotData.inputFieldYn, // 메시지 입력란 사용 여부
        twoWayType: this.wrtChatbotData.service, // 'a2p' or 'chat'
        agencyId: this.wrtChatbotData.agencyId,
        botAgencyId: this.wrtChatbotData.botAgencyId, // 대행사의 대표 중계사 아이디 or 해당 중계사 아이디
        relayAgId: this.wrtChatbotData.botAgencyId, // 대행사의 대표 중계사 아이디 or 해당 중계사 아이디
        webhookUrl: this.wrtChatbotData.webhook
      }
    },
    /** 발신번호로 전환 */
    convertOneway() {
      if (this.isA2pChatbot) {
        this.$confirmMsg('단방향 대화방으로 전환하시겠습니까?<br>전환된 발신번호는 발신번호 관리에서 확인 가능 합니다.').then(() => {
          let data = { action: 'OK_MOD', chatbotId: this.chatbotData.chatbotId, twoWayType: 'a2p' }
          convertChatbotOneway(this.brandId, data).then(res => {
            if (res.code === '20000000') this.goList()
          }).catch((err) => {
            this.$alertMsg(err.desc).then(() => {})
          })
        })
      } else {
        this.$alertMsg('챗봇ID 또는 신규 대화방으로<br>생성된 양방향 대화방은<br>발신번호로 전환할 수 없습니다.')
      }
    }
  }
}
</script>
