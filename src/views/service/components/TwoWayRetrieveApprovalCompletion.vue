<template>
  <section class="section mar_b0">
    <section class="sec_form">
      <!-- 발신번호 승인 완료 -->
      <div class="title_area mar_b20">
        <h3 class="h3_title">{{approvaInfoData.aprvRetNm}}</h3>
      </div>
      <div class="title_area mar_b20">
        <h4 class="h4_title fs20">※ 양방향 대화방 기본 정보</h4>
      </div>
      <table class="tbl_row_type">
        <caption>
          <strong>대화방 관리</strong>
          <p>승인완료(수정)</p>
        </caption>
        <colgroup>
          <col style="width:210px">
          <col style="width:auto">
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">대화방 유형</th>
            <td>{{approvaInfoData.serviceNm}}</td>
          </tr>
          <tr>
            <th scope="row">대화방 명</th>
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
            <th scope="row">대화방 ID</th>
            <td>{{approvaInfoData.chatbotId}}</td>
          </tr>
          <tr>
            <th scope="row" v-if="twoWayType === 'a2p'">
              발신번호/회신번호
              <span class="positionRelative">
                <button class="icon_info">툴팁</button>
                <span class="message">
                  <strong>발신번호/회신번호</strong><br>
                  단방향 대화방에 등록된 번호를 기반으로 양방향 대화방
                  등록이 가능 합니다.<br> 발신번호는 양방향 대화방별로
                  1개씩 선택 가능하며 발신번호 중복은 불가합니다.
                </span>
              </span>
            </th>
            <td v-if="twoWayType === 'a2p'">{{approvaInfoData.mdn}}</td>
            <th scope="row" v-if="twoWayType === 'chat'">
              회신번호
              <span class="positionRelative">
                <button class="icon_info">툴팁</button>
                <span class="message">
                  <strong>회신번호</strong><br>대화방에서 수신을 위한 번호지정이며,<br>단방향 대화방에 등록된 번호 중에 선택 가능 합니다.
                </span>
              </span>
            </th>
            <td v-if="twoWayType === 'chat'">
              <span class="custom_input"><input type="text" placeholder="번호 선택" v-model.trim="mdn" ref="mdn" maxlength="12" readonly></span>
              <a href="javascript:void(0);" class="btn sml bd_black" @click="callingNumberPopup"><span>번호선택</span></a>
            </td>
          </tr>
          <tr>
            <th scope="row">대행사 <span class="require">*</span></th>
            <td v-if="isAgency && this.$store.state.user.corpInfo.rcsCorpYn !== 'Y'">
              <span class="custom_input">
                <input type="text" placeholder="" v-model.trim="relayAgNm" ref="relayAgNm">
              </span>
              <a href="javascript:void(0);" class="btn sml bd_black" @click="callingChatBotPopup">
                <span>중계사 선택</span>
              </a>
            </td>
            <td v-else>
              <span class="custom_select min">
                <select @change="showWebhookUrl($event)" v-model="agencyId">
                  <option value>선택</option>
                  <option v-for="agency in chatAgnecyList" v-bind:key="agency.agencyId" v-bind:value="agency.agencyId" v-bind:url="agency.webhookUrl" v-bind:relayAgId="agency.relayAgId">{{agency.agencyNm}}</option>
                </select>
              </span>
            </td>
          </tr>
          <tr>
          <tr>
            <th scope="row">챗봇응답 URL <span class="require">*</span></th>
            <td>{{ webhookUrl }}</td>
          </tr>
          <tr>
            <th scope="row">
              메시지 입력
              <span class="positionRelative">
                <button class="icon_info">툴팁</button>
                <span class="message">
                  <strong>메시지 입력</strong><br>양방향 대화방에서 고객이 직접 메시지를 입력할<br/>수 있는 기능 입니다. 고객은 정해진 형식없이 모든<br/>메시지를 입력할 수 있습니다.
                </span>
              </span>
            </th>
            <td>
              <span class="custom_radio min">
                <input type="radio" name="RadioMessage" id="RadioMessage01_1" value="Y" v-model="inputFieldYn">
                <label for="RadioMessage01_1">입력 가능</label>
              </span>
              <span class="custom_radio min">
                <input type="radio" name="RadioMessage" id="RadioMessage01_2" value="N" v-model="inputFieldYn">
                <label for="RadioMessage01_2">입력 불가능</label>
              </span>
            </td>
          </tr>
          <tr>
            <th scope="row">등록일</th>
            <td>{{approvaInfoData.regDt}} / {{approvaInfoData.regUserNm}}</td>
          </tr>
          <tr>
            <th scope="row">승인요청일</th>
            <td>{{approvaInfoData.aprvReqDt}} / {{approvaInfoData.aprvReqUserNm}}</td>
          </tr>
          <tr>
            <th scope="row">승인완료일</th>
            <td>{{approvaInfoData.aprvDt}}</td>
          </tr>
        </tbody>
      </table>
      <div class="info_desc">
        <strong>수정 요청</strong> : 양방향 대화방 기본 정보에 대한 수정만 가능합니다.
      </div>
      <div class="btn_wrap center mar_t40">
        <a href="javascript:void(0);" class="btn mid blue" @click="saveApproval"><span>수정요청</span></a>
      </div>
      <div class="title_area mar_t60 mar_b20 inline">
        <h4 class="h4_title fs20">※ 대화방 메뉴 정보</h4>
        <span class="h4_desc fs16 mar_l12">대화방 메뉴를 설정할 수 있습니다.&nbsp; 대화방 메뉴 등록/변경 시 단말 내 대화방 실제 반영은 최대 10분 정도 소요될 수 있습니다.</span>
        <!--
        <span class="h4_desc fs16 mar_l12">대화방 메뉴는 승인완료 후 사용할 수 있습니다.</span>
        <span class="h4_desc fs16 mar_l12">임시저장된 대화방 메뉴가 있습니다. 승인 완료 후 사용 가능 합니다.</span>
        -->
      </div>
      <table class="tbl_row_type">
          <caption>
            <strong>대화방 관리</strong>
            <p>승인완료</p>
          </caption>
          <colgroup>
            <col style="width:180px">
            <col style="width:auto">
          </colgroup>
          <tbody>
            <tr>
              <th scope="row">
               대화방 메뉴
                <span class="positionRelative">
                  <button class="icon_info">툴팁</button>
                  <span class="message">
                    <strong>대화방 메뉴</strong><br/>양방향 대화방에서 고객이 문의할 수 있는 메뉴를<br/>등록하는 기능 입니다. 고객은 정해진 대화방 메뉴<br/>에서 선택하여 문의할 수 있습니다.
                  </span>
                </span>
              </th>
              <td>
                <span class="custom_radio min">
                  <input type="radio" name="Radio" v-model="psMenuYn" id="Radio01_1" value="Y">
                  <label for="Radio01_1">사용</label>
                </span>
                <span class="custom_radio min">
                  <input type="radio" name="Radio" v-model="psMenuYn" id="Radio01_2" value="N">
                  <label for="Radio01_2">미사용</label>
                </span>
              </td>
            </tr>
          </tbody>
      </table>
      <persistent-menu v-if="psMenuYn === 'Y'" ref="persistentMenu" @menuData="saveMenuData" :inputFieldYn=inputFieldYn :isModify="true"></persistent-menu>
      <div class="btn_wrap center mar_t40">
        <a href="javascript:void(0);" class="btn mid bd_blue" @click="goCallingTwoWayManagement">
          <span>목록</span>
        </a>
        <a href="javascript:void(0);" class="btn mid black" @click="arpprovApply">
          <span>승인요청</span>
        </a>
        <a href="javascript:void(0);" class="btn mid blue" @click="saveData" v-if="psMenuStatus !== 'OK'">
          <span>저장</span>
        </a>
      </div>
      <TwoWay-CallingNumber-Popup
        v-if="visible"
        :visible.sync="visible"
        :brandId="this.brandId"
        :twoWayType="this.twoWayType"
        @mdn="changeMdn"
      />
      <TwoWay-CallingChatBot-Popup
        v-if="visibleChatBotPop"
        :visibleChatBotPop.sync="visibleChatBotPop"
        :brandId="this.brandId"
        :corpId="this.$store.state.user.corpInfo.corpId"
        :isUpdate="this.isUpdate"
        :twoWayType="this.twoWayType"
        @relayAgId="changeRelayAgId"
        @relayAgNm="changeRelayAgNm"
        @relayWebhookUrl="changeRelayWebhookUrl"
      />
    </section>
  </section>
</template>

<script>
import {
  updateCallingTwoWayManagement, updateTwoWayPersistentMenu
} from '@/api/service/callingTwoWayManagement'
import TwoWayCallingNumberPopup from '@/views/service/components/TwoWayCallingNumberPopup'
import TwoWayCallingChatBotPopup from '@/views/service/components/TwoWayCallingChatBotPopup'
import { getBrandChatAgencyInfo } from '@/api/service/approvalBrand'
import PersistentMenu from '@/views/service/components/PersistentMenu'
export default {
  name: 'RetrieveTwoWayApprovalCompletion',
  data() {
    return {
      subTitle: '', // 발신번호명
      rcsReply: '1',
      chatbotId: '', // chatbot번호
      regCertiFileList: [],
      inputFieldYn: '',
      twoWayType: '',
      mdn: '',
      visible: false,
      visibleChatBotPop: false,
      chatAgnecyList: [],
      agencyId: '',
      agencyNm: '',
      relayAgId: '',
      relayAgNm: '',
      relayWebhookUrl: '',
      webhookUrl: '',
      psMenuYn: 'N',
      arpvStatus: '',
      psMenuStatus: '',
      isUpdate: 'Y'
    }
  },
  props: {
    approvaInfoData: {
      type: Object
    }
  },
  components: {
    TwoWayCallingNumberPopup,
    TwoWayCallingChatBotPopup,
    PersistentMenu
  },
  created() {
    this.brandId = this.$route.params.brandId
    this.getChatAgnecyList()
    // 발신번호명, chatbot번호, 대표번호여부
    this.subTitle = this.approvaInfoData.subTitle
    this.chatbotId = this.approvaInfoData.chatbotId
    this.defMdnYn = this.approvaInfoData.defMdnYn
    this.brandId = this.approvaInfoData.brandId
    this.rcsReply = this.approvaInfoData.rcsReply
    this.inputFieldYn = this.approvaInfoData.inputFieldYn
    this.twoWayType = this.approvaInfoData.service
    this.mdn = this.approvaInfoData.mdn
    this.agencyId = this.approvaInfoData.agencyId
    this.agencyNm = this.approvaInfoData.agencyNm
    this.relayAgId = this.approvaInfoData.botAgencyId
    this.relayAgNm = this.approvaInfoData.botAgencyNm
    this.webhookUrl = this.approvaInfoData.webhook
    this.psMenuYn = this.approvaInfoData.psMenuYn
    this.psMenuStatus = this.approvaInfoData.psMenuStatus
    // 대행사이면서 중계사인경우
    // if (this.$store.state.user.corpInfo.rcsCorpYn === 'Y') {
    //   this.agencyId = this.$store.state.user.corpInfo.corpId
    //   this.relayAgId = this.$store.state.user.corpInfo.corpId
    //   this.webhookUrl = this.$store.state.user.corpInfo.webHookUrl
    // }
  },
  mounted() {},
  computed: {
    isCorp() {
      return this.$store.state.user.userType === 'CORP'
    },
    isAgency() {
      return this.$store.state.user.userType === 'AGENCY'
    }
  },
  methods: {
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
    callingNumberPopup() {
      this.visible = true
    },
    callingChatBotPopup() {
      this.visibleChatBotPop = true
    },
    changeMdn(changeMdn) {
      this.mdn = changeMdn
    },
    // 대행사가 중계사를 선택하는 경우
    changeRelayAgId(changeAgencyId, changeRelayAgId) {
      this.agencyId = changeAgencyId // 대행사: 선택한 대행사
      this.relayAgId = changeRelayAgId // 중계사: 선택한 중계사
      // console.log('agencyId : ' + this.agencyId)
      // console.log('relayAgId : ' + this.relayAgId)
    },
    changeRelayWebhookUrl(changeRelayWebhookUrl) {
      this.webhookUrl = changeRelayWebhookUrl // webhookUrl: 선택한 중계사
      this.relayWebhookUrl = changeRelayWebhookUrl
      // console.log('webhookUrl : ' + this.webhookUrl)
      // console.log('relayWebhookUrl : ' + this.relayWebhookUrl)
    },
    changeRelayAgNm(changeRelayAgNm) {
      this.relayAgNm = changeRelayAgNm
    },
    // 저장 API 호출
    saveApproval() {
      if (!this.validationSearch()) {
        return false
      }
      this.$confirmMsg('양방향 대화방 내용을 수정하시겠습니까?', '타이틀', '확인', '취소')
        .then(res => {
          let data = {
            subTitle: this.subTitle,
            rcsReply: this.rcsReply,
            chatbotId: this.chatbotId,
            action: 'OK_MOD',
            mdn: this.mdn,
            agencyId: this.agencyId,
            webhook: this.webhookUrl,
            botAgencyId: this.relayAgId,
            inputFieldYn: this.inputFieldYn
          }
          updateCallingTwoWayManagement(data, this.brandId)
            .then(res => {
              if (res.code === '20000000') {
                this.$router.go(0)
              } else {
                this.$alertMsg('자동응답 청약 확인에 실패 하였습니다. 선택한 중계사를 통해 자동응답 청약 여부를 확인해 주시기 바랍니다.')
              }
            })
            .catch(res => {
              this.$alertMsg(res.desc)
            })
        })
        .catch(res => {})
    },
    // 저장 시 validation 확인
    validationSearch() {
      if (jglib.isEmpty(this.subTitle)) {
        this.$alertMsg('발신번호명을 입력해주세요.')
        this.$refs.subTitle.focus()
        return false
      }
      return true
    },
    // 양방향관리 리스트 목록으로 이동
    goCallingTwoWayManagement() {
      this.$router.push({
        name: this.approvaInfoData.fromTwoWay === 'Y' ? 'CallingTwoWayManagement' : 'CallingNumberManagement',
        params: { brandId: this.brandId }
      })
    },
    // 저장
    saveData() {
      this.arpvStatus = 'SAVED'
      if (this.psMenuYn === 'Y') {
        this.$refs.persistentMenu.menuData()
      } else {
        this.pesistentMenuNotUse()
      }
    },
    // 승인요청
    arpprovApply() {
      this.arpvStatus = 'APRV_MOD'
      if (this.psMenuYn === 'Y') {
        this.$refs.persistentMenu.menuData()
      } else {
        this.pesistentMenuNotUse()
      }
    },
    saveMenuData(saveMenuData) {
      let msg
      if (this.arpvStatus === 'SAVED') {
        msg = '입력하신 대화방 메뉴 내용이 저장됩니다.<br>대화방 메뉴는 승인완료 후 사용 가능합니다.'
      } else if (this.arpvStatus === 'APRV_MOD') {
        msg = '입력한 내용으로 승인요청하시겠습니까? <br>대화방 메뉴 등록/변경 시 단말 내 대화방 실제 반영은 최대 10분 정도 소요될 수 있습니다.'
      }
      this.$confirmMsg(
        msg,
        '타이틀',
        '확인',
        '취소'
      )
        .then(res => {
          let data = {
            action: this.arpvStatus,
            chatbotId: this.chatbotId,
            psMenuYn: this.psMenuYn,
            psMenuStatus: this.psMenuStatus,
            persistentMenu: saveMenuData
          }
          updateTwoWayPersistentMenu(data, this.brandId)
            .then(res => {
              if (res.code === '20000000') {
                if (this.arpvStatus === 'SAVED') {
                  this.$router.go(0)
                } else {
                  this.$router.push({
                    name: 'CallingTwoWayManagement',
                    params: { brandId: this.brandId }
                  })
                }
              } else {
                this.$alertMsg('자동응답 청약 확인에 실패 하였습니다. 선택한 중계사를 통해 자동응답 청약 여부를 확인해 주시기 바랍니다.')
              }
            })
            .catch(res => {
              this.$alertMsg(res.desc)
            })
        })
        .catch(res => {})
    },
    pesistentMenuNotUse() {
      this.$confirmMsg('대화방 메뉴 사용을 변경하시겠습니까? <br> "미사용" 으로 변경 시 입력된 대화방 메뉴는 모두 삭제 됩니다.',
        '타이틀',
        '확인',
        '취소'
      )
        .then(res => {
          let data = {
            action: this.arpvStatus,
            chatbotId: this.chatbotId,
            brandId: this.brandId,
            psMenuYn: this.psMenuYn
          }
          updateTwoWayPersistentMenu(data, this.brandId)
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
        }).catch(res => {})
    }
  }
}
</script>
