<template>
  <div class="rcs_container service_wrap">
    <article id="content" class="content">
      <!-- 양방향 대화방 신규 등록 -->
      <div class="box_breadcrumb">
        <breadcrumb :depth1MenuId="'M0200'" :depth2MenuId="'M0201'" :depth3MenuId="'발신번호 관리'"/>
      </div>
      <brand-top active="twoway" :brandId="brandId"></brand-top>
      <div class="contents_wrap">
        <section class="sec_form">
          <div class="title_area mar_b10">
            <h3 class="h3_title">양방향 대화방 등록</h3>
          </div>
          <table class="tbl_row_type">
            <caption>
              <strong>양방향 대화방 등록</strong>
              <p>대화방 유형, 대화방명, 대행사 등록</p>
            </caption>
            <colgroup>
              <col style="width:220px">
              <col style="width:auto">
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">대화방 유형 <span class="require">*</span></th>
                <td>
                  <span class="custom_radio min">
                    <input type="radio" v-model="twoWayType" @change='clearInput' value="a2p" name="Radio" id="Radio01_1" checked>
                    <label for="Radio01_1">발신번호</label>
                  </span>
                  <span class="custom_radio min">
                    <input type="radio" v-model="twoWayType" @change='clearInput' value="chat" name="Radio" id="Radio01_2">
                    <label for="Radio01_2">대화방ID</label>
                  </span>
                </td>
              </tr>
              <tr v-if="twoWayType === 'a2p'">
                <th scope="row">
                  발신번호/회신번호 <span class="require">*</span>
                  <span class="positionRelative">
                    <button class="icon_info">툴팁</button>
                    <span class="message">
                      <strong>발신번호/회신번호</strong><br>
                      단방향 대화방에 등록된 발신번호를 기반으로 양방향 대화방 등록이 가능합니다.<br> 발신번호는 양방향 대화방별로 1개씩 선택 가능하며 발신번호 중복은 불가합니다.
                    </span>
                  </span>
                </th>
                <td>
                  <span class="custom_input">
                    <input type="text" class="input_text" placeholder="번호 선택" v-model.trim="mdn" ref="mdn" maxlength="12" readonly>
                  </span>
                  <a href="javascript:void(0);" class="btn sml bd_black" @click="callingNumberPopup"><span>번호선택</span></a>
                </td>
              </tr>
              <tr>
                <th scope="row">대화방 명 <span class="require">*</span></th>
                <td>
                  <div class="length_area">
                    <span style="width:90%" class="custom_input">
                      <input type="text" ref="subTitle" @input="e => subTitle = e.target.value" v-model.trim="subTitle" maxlength="20" placeholder="대화방 메시지 발송 시 고객에게 표시되는 이름으로 신중하게 작성해 주세요.">
                    </span>
                    <span class="length" v-if="subTitle.length === 0">(0/20자)</span>
                    <span class="length" v-if="subTitle.length !== 0">({{ subTitle.length }}/20자)</span>
                  </div>
                </td>
              </tr>
              <tr v-if="twoWayType === 'chat'">
                <th scope="row">대화방 ID <span class="require">*</span></th>
                <td>
                  <div class="length_area">
                    <span style="width:40%" class="custom_input">
                      <input type="text" maxlength="15" v-model.trim="chatbotId" @keyup="keyupChatbotId" @keydown="keyupChatbotId" @change="overlapAgain" ref="chatbotId" placeholder="대화방ID를 직접 입력해 주세요.">
                    </span>
                    <a href="javascript:void(0);" class="btn sml bd_black" @click="overlapCheck"><span>중복체크</span></a>
                    <span class="length">({{ chatbotId.length }}/15자)</span>
                  </div>
                  <div style="padding-top: 7px;color: #999;">※ 대화방 ID는 'bot-'을 제외하고 최대 11자 까지 작성할 수 있습니다.</div>
                  <div style="padding-top: 7px;color: #999;">※ 알파벳(소문자), 숫자, 대시(-), 언더바(_)만 입력 할 수 있습니다.</div>
                </td>
              </tr>
              <tr v-if="twoWayType === 'chat'">
                <th scope="row">
                  회신번호 <span class="require">*</span>
                  <span class="positionRelative">
                    <button class="icon_info">툴팁</button>
                    <span class="message">
                      <strong>회신번호</strong><br>
                      대화방에서 수신을 위한 번호지정이며,<br> 단방향 대화방에 등록된 번호 중에 선택 가능 합니다.
                    </span>
                  </span>
                </th>
                <td>
                  <span class="custom_input">
                    <input type="text" class="input_text" placeholder="번호 선택" v-model.trim="mdn" ref="mdn" maxlength="12" readonly>
                  </span>
                  <a href="javascript:void(0);" class="btn sml bd_black" @click="callingNumberPopup"><span>번호선택</span></a>
                </td>
              </tr>
              <tr v-if="isAgency">
                <th scope="row">대행사 <span class="require">*</span></th>
                <td v-if="this.$store.state.user.corpInfo.rcsCorpYn !== 'Y'">
                  <span class="custom_input">
                    <input type="text" placeholder="" v-model.trim="relayAgNm" ref="relayAgNm">
                  </span>
                  <a href="javascript:void(0);" class="btn sml bd_black" @click="callingChatBotPopup"><span>중계사 선택</span></a>
                </td>
                <td v-else>{{ this.$store.state.user.corpInfo.name }}</td>
              </tr>
              <tr v-else>
                <th scope="row">대행사 <span class="require">*</span></th>
                <td>
                  <span class="custom_select min">
                    <select @change="showWebhookUrl($event)" v-model="agencyId">
                      <option value>선택</option>
                      <option v-for="agency in chatAgnecyList" v-bind:key="agency.agencyId" v-bind:value="agency.agencyId" v-bind:url="agency.webhookUrl" v-bind:relayAgId="agency.relayAgId">{{agency.agencyNm}}</option>
                    </select>
                  </span>
                </td>
              </tr>
              <tr v-if="isAgency">
                <th scope="row">챗봇응답 URL <span class="require">*</span></th>
                <td v-if="this.$store.state.user.corpInfo.rcsCorpYn !== 'Y'">{{ webhookUrl }}</td>
                <td v-else>{{ this.$store.state.user.corpInfo.webHookUrl }}</td>
              </tr>
              <tr v-else>
                <th scope="row">챗봇응답 URL <span class="require">*</span></th>
                <td>{{ webhookUrl }}</td>
              </tr>
              <tr>
                <th scope="row">
                  메시지 입력
                  <span class="positionRelative">
                    <button class="icon_info">툴팁</button>
                    <span class="message">
                      <strong>메시지 입력</strong><br>
                      양방향 대화방에서 고객이 직접 메시지를 입력할 수 있는 기능 입니다. 고객은 정해진 형식없이 모든 메시지를 입력할 수 있습니다.
                    </span>
                  </span>
                </th>
                <td>
                  <span class="custom_radio min">
                    <input type="radio" v-model="inputFieldYn" value="Y" name="Radio2" id="Radio02_1" checked>
                    <label for="Radio02_1">입력가능</label>
                  </span>
                  <span class="custom_radio min">
                    <input type="radio" v-model="inputFieldYn" value="N" name="Radio2" id="Radio02_2">
                    <label for="Radio02_2">입력 불가능</label>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="btn_wrap center mar_t40">
            <a href="javascript:void(0);" class="btn mid bd_blue" @click="cancelApply"><span>목록</span></a>
            <a href="javascript:void(0);" class="btn mid black" @click="arpprovApply"><span>승인요청</span></a>
          </div>
          <TwoWay-CallingNumber-Popup
            v-if="visible"
            :visible.sync="visible"
            :brandId="this.brandId"
            :twoWayType="this.twoWayType"
            @mdn="changeMdn"
            @selectedSubTitle="selectedSubTitle"
          />
          <TwoWay-CallingChatBot-Popup
            v-if="visibleChatBotPop"
            :visibleChatBotPop.sync="visibleChatBotPop"
            :brandId="this.brandId"
            :corpId="this.$store.state.user.corpInfo.corpId"
            :twoWayType="this.twoWayType"
            @relayAgId="changeRelayAgId"
            @relayAgNm="changeRelayAgNm"
            @relayWebhookUrl="changeRelayWebhookUrl"
          />
          <div tabindex="0" class="layer active" v-if="visibleAlert">
            <div tabindex="0" class="layer_cont">
              <div class="layer_body">
                <div class="center mar_t10 mar_b40 lh_24"> <!-- 2021.08.02 RBC고도화수정1 -->
                  등록된 대행사 중 양방향 대화방 서비스가 가능한 대행사가 없습니다.<br>
                  양방향 대화방 등록이 불가 합니다.
                </div>
              </div>
              <div class="layer_foot">
                <div class="btn_wrap mar_t30"> <a href="javascript:void(0);" class="btn sml black" @click="goList"><span>확인</span></a></div>
              </div>
            </div>
          </div>
          <div tabindex="0" class="layer active" v-if="visibleAlertAgency">
            <div tabindex="0" class="layer_cont">
              <div class="layer_body">
                <div class="center mar_t10 mar_b40 lh_24"> <!-- 2021.08.02 RBC고도화수정1 -->
                  양방향 대화방 서비스를 제공하지 않는 대행사 입니다.<br>
                  양방향 대화방 등록이 불가 합니다.
                </div>
              </div>
              <div class="layer_foot">
                <div class="btn_wrap mar_t30"> <a href="javascript:void(0);" class="btn sml black" @click="goList"><span>확인</span></a></div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </article>
  </div>
</template>

<script>
import BrandTop from '@/views/service/components/BrandTop'
import { selectTwowayId, updateOverlap, updateTwoWayChatBot } from '@/api/service/callingTwoWayManagement'
import Breadcrumb from '@/components/global/Breadcrumb'
import TwoWayCallingNumberPopup from '@/views/service/components/TwoWayCallingNumberPopup'
import TwoWayCallingChatBotPopup from '@/views/service/components/TwoWayCallingChatBotPopup'
import { getBrandChatAgencyInfo } from '@/api/service/approvalBrand'
export default {
  name: 'IndividualRegistration',
  components: {
    BrandTop,
    Breadcrumb,
    TwoWayCallingNumberPopup,
    TwoWayCallingChatBotPopup
  },
  props: {
    approvaInfoData: {
      type: Object
    }
  },
  data() {
    return {
      subTitle: '',
      brandId: '',
      mdn: '',
      rcsReply: '1',
      overlapCheckFlag: false,
      regCertiFileName: '',
      aprvRet: '',
      regCertiFileYn: false,
      regCertiFileListDelYn: 'N',
      visible: false,
      visibleChatBotPop: false,
      visibleAlert: false,
      visibleAlertAgency: false,
      regCertiFile: [],
      regCertiFileList: [],
      msg: `저장은 작성하신 정보가 저장만 되는 기능입니다.<br>승인요청을 하셔야 심사 후 발신번호를 이용하실 수 있습니다.`,
      chatAgnecyList: [],
      agencyId: '',
      webhookUrl: '',
      twoWayType: 'a2p',
      inputFieldYn: 'Y',
      chatbotId: '',
      relayAgId: '',
      relayAgNm: '',
      relayWebhookUrl: '',
      twowayPrefix: 'bot-'
    }
  },
  created() {
    this.brandId = this.$route.params.brandId
    this.getChatAgnecyList()
    // AGENCY이면서 제공서비스가 chat이 없는 경우 등록 불가
    if (this.isAgency) {
      let rcsSvcInfo = this.$store.state.user.corpInfo.rcsSvc
      if (!jglib.isEmpty(rcsSvcInfo) && rcsSvcInfo.indexOf('chat') === -1) {
        this.visibleAlertAgency = true
      }
    }
    // 대행사이면서 중계사인경우
    if (this.$store.state.user.corpInfo.rcsCorpYn === 'Y') {
      this.agencyId = this.$store.state.user.corpInfo.corpId
      this.relayAgId = this.$store.state.user.corpInfo.corpId
      this.webhookUrl = this.$store.state.user.corpInfo.webHookUrl
    }
  },
  mounted() {},
  watch: {
    '$store.state.user.userType'(newVal, oldVal) {
      if (newVal && jglib.isEmpty(oldVal)) {
        this.init()
      }
    },
    mdn() {
      this.mdn = this.mdn.replace(/[^0-9]/g, '')
    }
  },
  computed: {
    isCorp() {
      return this.$store.state.user.userType === 'CORP'
    },
    isAgency() {
      return this.$store.state.user.userType === 'AGENCY'
    }
  },
  methods: {
    clearInput() {
      this.mdn = ''
      this.subTitle = ''
      this.chatbotId = ''
      this.inputFieldYn = 'Y'
      // 대행사이면서 중계사인 경우(=초기값이 셋팅되어있음)가 아닐때만 클리어
      if (this.$store.state.user.corpInfo.rcsCorpYn !== 'Y') {
        this.webhookUrl = ''
        this.relayAgId = ''
        this.relayAgNm = ''
        this.agencyId = ''
        // this.inputFieldYn = 'Y'
      }
      if (this.twoWayType === 'chat') {
        selectTwowayId(this.brandId).then((res) => {
          this.chatbotId = this.twowayPrefix + res.result
          this.overlapCheckFlag = true
        })
      }
    },
    showWebhookUrl(event) {
      let getUrl = event.target.selectedOptions[0].getAttribute('url')
      this.webhookUrl = getUrl
      let getRelayAgId = event.target.selectedOptions[0].getAttribute('relayAgId')
      this.relayAgId = getRelayAgId
    },
    getChatAgnecyList() {
      let reqData = {
        brandId: this.brandId,
        isTwoWay: 'Y'
      }
      // 브랜드 챗봇 대행사 정보 조회
      getBrandChatAgencyInfo(reqData).then(res => {
        if (res.result.length === 0) {
          this.visibleAlert = true
        } else {
          this.chatAgnecyList = res.result
        }
      })
    },
    goList() {
      this.$router
        .push({
          name: 'CallingTwoWayManagement',
          params: { brandId: this.brandId }
        })
    },
    overlapAgain() {
      this.overlapCheckFlag = false
    },
    removedPrefixChabotId() {
      return this.chatbotId.split(this.twowayPrefix)[1]
    },
    // 대화방ID 중복 체크
    overlapCheck() {
      if (!this.validationOverlap()) {
        return false
      }
      let chatbotId = this.removedPrefixChabotId()
      let params = {
        chatbotId
      }
      updateOverlap(params, this.brandId)
        .then(res => {
          if (res.code === '20000000') {
            this.$alertMsg('사용 가능한 대화방ID 입니다.', '확인')
            this.overlapCheckFlag = true
          }
        })
        .catch(err => {
          if (err.code === '60000730') {
            this.$alertMsg('삭제 했던 대화방ID는 다시 등록할 수 없습니다.', '확인')
          } else if (err.code === '60000731') {
            this.$alertMsg('이미 사용중인 대화방ID 입니다.', '확인')
          } else {
            this.$alertMsg(err.desc, '확인')
          }
          this.overlapCheckFlag = false
        })
    },

    // 승인요청
    arpprovApply() {
      if (!this.validationSearch()) {
        return false
      }

      if (!this.overlapCheckFlag && this.twoWayType === 'chat') {
        this.$alertMsg('대화방ID 중복체크를 진행 해 주세요.')
        this.$refs.chatbotId.focus()
        return false
      }

      let chatbotId = this.removedPrefixChabotId()
      this.$confirmMsg('입력한 내용으로 승인 요청 하시겠습니까?', '타이틀', '확인', '취소')
        .then(res => {
          let data = {
            chatbotId: chatbotId,
            subTitle: this.subTitle,
            mdn: this.mdn,
            rcsReply: this.rcsReply,
            action: 'APRV_NEW',
            agencyId: this.agencyId,
            webhookUrl: this.webhookUrl,
            twoWayType: this.twoWayType,
            relayAgId: this.relayAgId,
            inputFieldYn: this.inputFieldYn
          }
          updateTwoWayChatBot(data, this.brandId)
            .then(res => {
              if (res.code === '20000000') {
                this.$router.push({
                  name: 'CallingTwoWayManagement',
                  params: { brandId: this.brandId }
                })
              }
            })
            .catch(res => {
              this.$alertMsg(res.desc)
            })
          // updateIndividualRegistration(formData, data, this.brandId)
          //   .then(res => {
          //     if (res.code === '20000000') {
          //       this.$router.push({
          //         name: 'CallingNumberManagement',
          //         params: { brandId: this.brandId }
          //       })
          //     }
          //   })
          //   .catch(res => {
          //     this.$alertMsg(res.desc)
          //   })
        })
        .catch(res => {})
    },
    checkValidPrefix() {
      if (this.twoWayType === 'chat' && !this.chatbotId.startsWith(this.twowayPrefix)) {
        this.$alertMsg('잘못된 대화방 아이디 입니다.', '확인')
        return false
      }
      return true
    },
    // 승인요청 시 validation 확인
    validationSearch() {
      if (!this.checkValidPrefix()) {
        return false
      } else if (jglib.isEmpty(this.subTitle)) {
        this.$alertMsg('대화방 명을 입력해 주세요.')
        this.$refs.subTitle.focus()
        return false
      } else if (jglib.isEmpty(this.mdn) && this.twoWayType === 'a2p') {
        this.$alertMsg('발신번호/회신번호를 입력해 주세요.')
        this.$refs.mdn.focus()
        return false
      } else if (jglib.isEmpty(this.mdn) && this.twoWayType === 'chat') {
        this.$alertMsg('회신번호를 입력해 주세요.')
        this.$refs.mdn.focus()
        return false
      } else if (jglib.isEmpty(this.agencyId) && this.isCorp) {
        this.$alertMsg('대행사를 선택해 주세요.')
        return false
      } else if (jglib.isEmpty(this.relayAgId) && this.isAgency && this.$store.state.user.corpInfo.rcsCorpYn !== 'Y') {
        this.$alertMsg('대행사를 선택해 주세요.')
        return false
      }
      return true
    },

    // 발신번호 중복체크 시 validation 확인 / alphanumeric, 하이픈, 언더바 허용
    validationOverlap() {
      if (!this.checkValidPrefix()) {
        return false
      }
      let chatbotId = this.removedPrefixChabotId()
      if (jglib.isEmpty(chatbotId)) {
        this.$alertMsg('대화방 ID를 입력해 주세요.')
        this.$refs.chatbotId.focus()
        return false
      }
      return true
    },
    keyupChatbotId(e) {
      if ((e.keyCode === 8 || e.keyCode === 46) && e.target.value === this.twowayPrefix) {
        e.stopPropagation()
        e.preventDefault()
        return false
      } else if (!e.target.value.startsWith(this.twowayPrefix)) {
        e.target.value = this.chatbotId = this.twowayPrefix // e.target.value 하나만 반영했을 때 붙여넣기 시 글자수 카운트가 맞지않는 경우가 있음
        return false
      }
      let values = e.target.value.substring(this.twowayPrefix.length)
      e.target.value = this.twowayPrefix + values.toLowerCase().replace(/[^a-z0-9-_]/g, '')
    },
    // 취소 버튼
    cancelApply() {
      this.$confirmMsg('양방향 대화방 등록을 취소하시겠습니까?', '타이틀', '확인', '취소')
        .then(res => {
          this.$router
            .push({
              name: 'CallingTwoWayManagement',
              params: { brandId: this.brandId }
            })
            .catch(res => {
              this.$alertMsg(res.desc)
            })
        })
        .catch(res => {})
    },
    // 발신번호관리 리스트 화면으로 이동
    goCallingNumberManagement() {
      this.$router.push({
        name: 'CallingTwoWayManagement',
        params: { brandId: this.brandId }
      })
    },
    callingNumberPopup() {
      this.visible = true
    },
    callingChatBotPopup() {
      this.visibleChatBotPop = true
    },
    changeMdn(changeMdn) {
      this.mdn = changeMdn
    },
    selectedSubTitle(selectedSubTitle) {
      if (this.twoWayType === 'a2p') {
        this.subTitle = selectedSubTitle
      }
    },
    // 대행사가 중계사를 선택하는 경우
    changeRelayAgId(changeAgencyId, changeRelayAgId) {
      // this.agencyId = this.$store.state.user.corpInfo.corpId // 대행사: 현재 로그인한 대행사
      this.agencyId = changeAgencyId
      this.relayAgId = changeRelayAgId // 중계사: 선택한 중계사
    },
    changeRelayWebhookUrl(changeRelayWebhookUrl) {
      this.webhookUrl = changeRelayWebhookUrl // webhookUrl: 선택한 중계사
      this.relayWebhookUrl = changeRelayWebhookUrl
    },
    changeRelayAgNm(changeRelayAgNm) {
      this.relayAgNm = changeRelayAgNm
    }
  }
}
</script>
