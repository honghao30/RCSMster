<template>
  <article id="content" class="content">
    <div class="top_title_area">
      <h2 class="h2_title">기업정보 관리</h2>
      <span class="h2_desc">기업정보는 온라인 문의로 변경 요청해 주세요.</span>
    </div>
    <section class="sec_form" v-if="isStatusWating || isStatusInspected || isStatusRejected">
      <table class="tbl_row_type">
        <caption>
          <strong>승인상태</strong>
          <p>승인상태, 사유</p>
        </caption>
        <colgroup>
          <col style="width:215px">
          <col style="width:auto">
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">승인상태</th>
            <td>
              {{ corpData.aprvRetNm }}
              <span
                class="text_desc"
                v-if="isStatusRejected"
              >({{ corpData.aprvDt }})</span>
            </td>
          </tr>
          <tr v-if="isStatusRejected">
            <th scope="row">사유</th>
            <td>{{ corpData.aprvRetDesc}}</td>
          </tr>
        </tbody>
      </table>
    </section>
    <section class="sec_form">
      <table class="tbl_row_type">
        <caption>
          <strong>기업정보</strong>
          <p>사업자등록번호, 업체명, 사업자등록증, 업태, 종목, 주소, 수신서버 URL, API Client IP, 제공서비스, 특수부가통신 사업장등록증</p>
        </caption>
        <colgroup>
          <col style="width:200px">
          <col style="width:470px">
          <col style="width:200px">
          <col style="width:auto">
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">사업자등록번호</th>
            <td>{{ corpData.agencyRegiNum | prettyCorpRegiNum }}</td>
            <th scope="row">업체명</th>
            <td>{{ corpData.name }}</td>
          </tr>
          <tr>
            <th scope="row">사업자등록증</th>
            <td colspan="3">{{ corpData.certiFileName }}</td>
          </tr>
          <tr>
            <th scope="row">업태</th>
            <td>{{ corpData.bizCond }}</td>
            <th scope="row">종목</th>
            <td>{{ corpData.bizCate }}</td>
          </tr>
          <tr>
            <th scope="row">주소</th>
            <td colspan="3">
              {{ corpData.addrRegnNo }}
              <br>
              {{ corpData.addrMngNo }} {{ corpData.addrDtl }}
            </td>
          </tr>
          <tr>
            <th scope="row">수신서버 URL</th>
            <td colspan="3">
              <span v-if="isViewMode">{{ corpData.recvUrl }}</span>
              <span v-if="!isViewMode" class="custom_input full_width">
                <input type="text" ref="recvUrl" v-model.trim="formData.recvUrl">
              </span>
            </td>
          </tr>
          <!-- <tr>
            <th scope="row">
              API Client IP
              <span class="require">*</span>
            </th>
            <td colspan="3">
              <span v-if="isViewMode">{{ corpData.sendHost }}</span>
              <span v-if="!isViewMode" class="custom_input full_width">
                <input type="text" ref="sendHost" v-model="formData.sendHost" maxlength="15">
              </span>
            </td>
          </tr> -->
          <tr>
            <th scope="row">
              제공서비스
              <span class="require">*</span>
            </th>
            <td colspan="3">
              <span class="custom_checkbox">
                <input type="checkbox" v-model="checked.a2p" ref="a2p" name="Checkbox" id="Checkbox01_1" @change="changeService">
                <label for="Checkbox01_1">단방향 대화방</label>
              </span>
              <span class="custom_checkbox">
                <input type="checkbox" v-model="checked.chat" ref="chat" name="Checkbox" id="Checkbox01_2" :disabled="disableChabot" @change="changeService">
                <label for="Checkbox01_2">양방향 대화방</label>
              </span>
            </td>
          </tr>
          <tr class="verticalMiddle" v-if="this.checked.chat === true">
            <th scope="row">
              양방향 대화방<br>중계사 여부
              <span class="require">*</span>
            </th>
            <td>
              <span class="custom_radio fs16">
                <input type="radio" v-model="formData.rcsCorpYn" value='Y' name="Radio" id="Radio01_1" ref="rcsCorpYn" :disabled="disableChabot" @change="changeRelay">
                <label for="Radio01_1">중계사임</label>
              </span>
              <span class="custom_radio fs16">
                <input type="radio" v-model="formData.rcsCorpYn" value='N' name="Radio" id="Radio01_2" :disabled="disableChabot" @change="changeRelay">
                <label for="Radio01_2">중계사 아님</label>
              </span>
              <div class="input_chatbot_bundle" v-if="formData.rcsCorpYn !== 'N'">
                <label for="Radio01_2_2">양방향 대화방 수신 URL</label>
                <span class="custom_input">
                  <input type="text" id="Radio01_2_2" ref="webHookUrl" v-model.trim="formData.webHookUrl" :disabled="disable || disableChabot">
                </span>
              </div>
            </td>
            <th scope="row">양방향 대화방 중계사</th>
            <td v-if="formData.rcsCorpYn !== 'N' && disable === false">
              {{formData.name}}
            </td>
            <td v-if="formData.rcsCorpYn !== 'N' && disable === true">
            </td>
            <td v-if="formData.rcsCorpYn === 'N'">
              <span v-if="formData.relayAgInfo.length > 0" class="text_value">선택 중계사 <span class="text_blue">{{formData.relayAgInfo.length}}</span>개</span>
              <el-button type="text" class="el-button btn sml bd_black el-button--primary el-button--small"
               :disabled="disable"
               @click="openRelayPopup">중계사 선택</el-button>
              <relay-popup v-if="visibleRelayPopup"
               :relayAgInfo="formData.relayAgInfo"
               :relayAgModify.sync="relayAgModify"
               :relayAgRegister="relayAgRegister"
               :visible.sync="visibleRelayPopup"
               :agencyCorpRegNum.sync="formData.agencyRegiNum"
               :reqUserId.sync="reqUserId"
               @getData="getRelayAgInfo"></relay-popup>
            </td>
          </tr>
          <tr>
            <th scope="row">
              특수부가통신
              <br>사업자등록증
            </th>
            <td colspan="3">{{ corpData.rcsCertiFileName }}</td>
          </tr>
        </tbody>
      </table>
    </section>
    <div class="btn_wrap center mar_t40">
      <a href="javascript:void(0);" class="btn mid bd_blue" @click="goMyInfo">
        <span>취소</span>
      </a>
      <a href="javascript:void(0);" class="btn mid blue" @click="updateCorpData">
        <span>저장</span>
      </a>
    </div>
  </article>
</template>

<script>
import { updateAgencyInfo } from '@/api/utility/utility'
import { downloadFileByFileId } from '@/api/common/code'
import RelayPopup from '@/components/relay'
export default {
  name: 'CorpInfoAgency',
  components: {
    RelayPopup
  },
  props: {
    corpData: {
      type: Object
    },
    aprvRet: {
      type: String
    }
  },
  data() {
    return {
      formData: {
        corpId: '',
        name: '',
        bizCond: '',
        bizCate: '',
        certiFileId: '',
        rcsCertiFileId: '',
        addrRegnNo: '',
        addrMngNo: '',
        addrDtl: '',
        aprvRet: '',
        aprvRetDescr: '',
        agencyRegiNum: '',
        agencyCerti: '',
        gwCorpYn: '',
        recvUrl: '',
        sendHost: '',
        rcsSvc: '',
        rcsCorpYn: '',
        webHookUrl: '',
        relayAgInfo: []
      },
      rcsSvc: {
        a2p: 'a2p',
        chat: 'chat',
        both: 'a2p,chat',
        blank: ''
      },
      checked: {
        a2p: true,
        chat: false
      },
      reqUserId: '',
      visibleRelayPopup: false,
      relayAgRegister: false,
      relayAgModify: false,
      disable: false,
      disableChabot: true
    }
  },
  computed: {
    isStatusOk() {
      return this.formData.aprvRet === 'OK'
    },
    isStatusWating() {
      return this.formData.aprvRet === 'WAITING'
    },
    isStatusRejected() {
      return this.formData.aprvRet === 'REJECTED'
    },
    isStatusInspected() {
      return this.formData.aprvRet === 'INSPECTED'
    },
    isViewMode() {
      // return (
      //   this.formData.aprvRet === 'WATING' ||
      //   this.formData.aprvRet === 'INSPECTED'
      // ) // 대기 || 검수완료
      return false
    }
  },
  watch: {
    corpData() {
      this.init()
    }
  },
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    init() {
      this.formData = this.corpData

      if (this.formData.rcsSvc === this.rcsSvc.a2p) {
        this.disable = true
        this.disableChabot = false
      }

      if (this.formData.rcsCorpYn !== 'N') {
        this.relayAgRegister = true
        this.relayAgModify = false
      } else if (this.formData.rcsCorpYn === 'N') {
        this.relayAgRegister = false
        this.relayAgModify = true
      }

      if (this.formData.rcsSvc === this.rcsSvc.a2p) {
        this.checked.a2p = true
        this.checked.chat = false
      } else if (this.formData.rcsSvc === this.rcsSvc.chat) {
        this.checked.a2p = false
        this.checked.chat = true
      } else if (this.formData.rcsSvc === this.rcsSvc.both) {
        this.checked.a2p = true
        this.checked.chat = true
      }
    },
    updateCorpData() {
      if (!this.validateCorpData()) {
        return false
      }

      if (this.checked.a2p === true && this.checked.chat === false) {
        // 제공 서비스 a2p일 경우 중계사 선택 NULL 설정
        this.formData.rcsCorpYn = null
      }

      if (this.formData.rcsCorpYn === 'Y') {
        // 중계사의 경우 대행 중계사 초기화
        this.formData.relayAgInfo = []
      } else {
        // 중계사 아님의 경우 WebHookURL 공란으로 설정
        this.formData.webHookUrl = null
      }

      this.$confirmMsg('변경하신 정보로 저장하시겠습니까?')
        .then(() => {
          let params = {
            agencyId: this.formData.corpId,
            recvUrl: this.formData.recvUrl,
            sendHost: this.formData.sendHost,
            rcsSvc: this.formData.rcsSvc,
            rcsCorpYn: this.formData.rcsCorpYn,
            webHookUrl: this.formData.webHookUrl,
            relayAgInfo: this.formData.relayAgInfo
          }
          updateAgencyInfo(this.formData.corpId, params)
            .then(res => {
              this.$alertMsg('저장 되었습니다.')
                .then(() => {
                  this.$emit('refresh')
                })
            })
            .catch(err => {
              this.$alertMsg(err.desc)
            })
        })
        .catch(() => {})
    },
    validateCorpData() {
      if (!jglib.isEmpty(this.formData.recvUrl) && !jglib.isUrl(this.formData.recvUrl)) {
        // this.$alertMsg('수신서버 URL을 입력하세요.').then(() => {
        //   this.$refs.recvUrl.focus()
        // })
        this.$alertMsg('올바른 URL 형식이 아닙니다.').then(() => {
          this.$refs.recvUrl.focus()
        })
        return false
      }
      if (jglib.isEmpty(this.formData.webHookUrl) && this.formData.rcsCorpYn === 'Y' && this.checked.chat === true) {
        this.$alertMsg('양방향 중계 URL 정보를 입력해 주세요.').then(res => {
          this.$refs.webHookUrl.focus()
        })
        return false
      }
      if (!jglib.isUrl(this.formData.webHookUrl) && this.formData.rcsCorpYn === 'Y' && this.checked.chat === true) {
        this.$alertMsg('올바른 URL 형식이 아닙니다.').then(res => {
          this.$refs.webHookUrl.focus()
        })
        return false
      }
      if (jglib.isEmpty(this.formData.rcsSvc)) {
        this.$alertMsg('제공서비스를 선택 해 주세요.')
        return
      }
      if (this.formData.relayAgInfo.length < 1 && this.formData.rcsCorpYn === 'N' && this.checked.chat === true) {
        this.$alertMsg('중계사를 선택해 주세요.')
        return false
      }
      if (jglib.isEmpty(this.formData.rcsCorpYn) && this.checked.chat === true) {
        this.$alertMsg('중계사 여부를 선택해 주세요.').then(res => {
          this.$refs.rcsCorpYn.focus()
        })
        return false
      }
      // if (
      //   jglib.isEmpty(this.formData.sendHost) ||
      //   !jglib.isIpAddress(this.formData.sendHost)
      // ) {
      //   this.$alertMsg('API Client IP를 입력하세요.').then(() => {
      //     this.$refs.sendHost.focus()
      //   })
      //   return false
      // }
      return true
    },
    getCertiFile() {
      let params = {
        fileId: this.formData.certiFileId,
        fileNo: this.formData.certiFileNo
      }
      downloadFileByFileId(params)
        .then(res => {})
        .catch(err => {
          this.$alertMsg(err.desc)
        })
    },
    getRcsCertiFile() {
      let params = {
        fileId: this.formData.rcsCertiFileId,
        fileNo: this.formData.rcsCertiFileNo
      }
      downloadFileByFileId(params)
        .then(res => {})
        .catch(err => {
          this.$alertMsg(err.desc)
        })
    },
    goMyInfo() {
      this.$confirmMsg('기업정보 변경을 취소하시겠습니까?<br/>수정 전 정보로 복구됩니다.')
        .then(() => {
          // this.$router.push('/utility/my-info')
          this.$emit('refresh')
        })
        .catch(() => {})
    },
    openRelayPopup() {
      this.visibleRelayPopup = true
    },
    getRelayAgInfo(selectRelay) {
      this.formData.relayAgInfo = selectRelay
    },
    changeService() {
      if (this.checked.a2p === true && this.checked.chat === false) {
        this.formData.rcsSvc = this.rcsSvc.a2p
        this.formData.webHookUrl = null
      } else if (this.checked.a2p === false && this.checked.chat === true) {
        this.formData.rcsSvc = this.rcsSvc.chat
      } else if (this.checked.a2p === true && this.checked.chat === true) {
        this.formData.rcsSvc = this.rcsSvc.both
      } else {
        this.formData.rcsSvc = this.rcsSvc.blank
      }
    },
    changeRelay() {
      if (this.formData.rcsCorpYn === 'Y') {
        this.disable = true
        // 중계사의 경우 대행 중계사 초기화
        this.formData.relayAgInfo = []
        this.$confirmMsg(
          `양방향 메시지의 중계사로 지정할 경우,
        대행사가 중계사로 지정한 브랜드의 모든 양방향 메시지 및 자동응답메시지
        (사용자가 질의한 내용에 대해 RBC에 미리 지정된 메시지가 자동 발송되는 서비스)의
        트래픽은 모두 중계사에게 과금되오니,
        중계사는 대행사가 중계사로 지정했을 경우 해당 대행사가
        양방향 메시지 청약 및 기업고객 양방향 메시지 과금을 대행한다는
        것에 대한 동의 절차를 받는 기능을 구현해야 합니다.
        <br><br>
        중계사 시스템에 양방향 메시지에 대한 청약 및 대행사 webhook url 정보 등록을 위한 기능을 구현하셨나요?`,
          '',
          '확인',
          '닫기'
        ).then(() => {
          this.disable = false
        })
      } else if (this.formData.rcsCorpYn === 'N') {
        this.disable = true
        // 중계사 아님의 경우 WebHookURL 공란으로 설정
        this.formData.webHookUrl = null
        this.$confirmMsg(
          `중계사 선택 전에 반드시 대행사는 선택하고자 하는 중계사에 청약이 완료되어야 하며,
        양방향 메시지를 수신하기 위한 webhook url 정보를 해당 중계사의 시스템에 등록해야 합니다.
        <br><br>
        지정하고자 하는 중계사에 양방향 메시지에 대한 청약 및 webhook url 정보 등록을 완료하셨나요?`,
          '',
          '확인',
          '닫기'
        ).then(() => {
          this.disable = false
        })
      }
    }
  }
}
</script>

<style>
</style>
