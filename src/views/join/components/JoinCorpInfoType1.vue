<template>
  <!-- 가입신청 중 회원정보입력 -->
  <div>
    <table class="tbl_row_type">
      <caption>
        <strong>기업정보</strong>
        <p>사업자등록번호, 업체명, 사업자등록증, 업태, 종목, 주소</p>
      </caption>
      <colgroup>
        <col style="width:200px">
        <col style="width:470px">
        <col style="width:200px">
        <col style="width:auto">
      </colgroup>
      <tbody>
        <tr>
          <th scope="row">
            사업자등록번호
            <span class="require">*</span>
          </th>
          <td>{{ formData.corpRegiNum | prettyCorpRegNum }}</td>
          <th scope="row">
            업체명
            <span class="require">*</span>
          </th>
          <td>
            <span class="custom_input full_width">
              <input type="text" placeholder ref="name" v-model.trim="formData.name" maxlength="40" @change="convertMultiWhitespace($event, 'name')">
            </span>
          </td>
        </tr>
        <tr>
          <th scope="row">
            사업자등록증
            <span class="require">*</span>
          </th>
          <td colspan="3">
            <div class="box_add_file inline">
              <el-upload action :auto-upload="false" :on-change="handleChangeRegFile" ref="corpRegFileUpload" class="i_block">
                <a href="javascript:void(0);" size="small" type="primary" class="btn sml bd_black">파일선택</a>
              </el-upload>
              <span class="text_desc add_file" v-if="!isUploadedRegFile">파일형식 : jpg, png, pdf, tiff (최대 5MB)</span>
              <span class="text_desc add_file" v-if="isUploadedRegFile" style="max-width: 600px">
                {{ uploadedRegFileName }}
                <a href="javascript:void(0);" class="btn_delete" @click="deleteUploadedRegFile" >
                  <span>삭제</span>
                </a>
              </span>
              <div class="tooltip_area tooltip_auto_area">
                <span class="btn_info">비영리법인/국가기관 가입안내</span>
                <div class="box_tooltip">
                  <p class="title">비영리법인/국가기관 가입안내</p>
                  <ul class="bullet_list">
                    <li>사업자등록증 : 고유번호증 서류로 제출</li>
                    <li>업태 : '기관/단체' 로 입력</li>
                    <li>종목 : '비영리, 공공/행정, 정치/사회, 복지, 종교, &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;모임, 기관/단체 일반' 중 해당 항목 입력</li>
                  </ul>
                </div>
              </div>
            </div>
            <p class="text_error" style="font-weight: bold;">
              * 사업자등록증 이외 사업자등록증명 또는 고유번호증으로 대체 가능합니다.
            </p>
          </td>
        </tr>
        <tr>
          <th scope="row">
            업태
            <span class="require">*</span>
          </th>
          <td>
            <span class="custom_input full_width">
              <input type="text" placeholder ref="bizCond" v-model.trim="formData.bizCond" maxlength="21" @change="convertMultiWhitespace($event, 'bizCond')">
            </span>
          </td>
          <th scope="row">
            종목
            <span class="require">*</span>
          </th>
          <td>
            <span class="custom_input full_width">
              <input type="text" placeholder ref="bizCate" v-model.trim="formData.bizCate" maxlength="21" @keydown="convertMultiWhitespace($event, 'bizCate')">
            </span>
          </td>
        </tr>
        <tr>
          <th scope="row">
            주소
            <span class="require">*</span>
          </th>
          <td colspan="3">
            <div class="address_search_area">
              <div class="input_search_bundle">
                <span class="custom_input">
                  <!-- TODO: 주소찾기 연동 시 readonly -->
                  <input type="text" ref="addrRegnNo" v-model="formData.addrRegnNo" maxlength="5" :readonly="true">
                </span>
                <a href="javascript:void(0);" class="btn sml bd_black" refs="btnFindAddress" @click="openAddressPopup">우편번호</a>
                <address-popup v-if="visibleAddressPopup" :visible.sync="visibleAddressPopup" @getData="getAddress"></address-popup>
              </div>
              <div class="input_address_bundle">
                <span class="custom_input">
                  <!-- TODO: 주소찾기 연동 시 readonly -->
                  <input type="text" placeholder ref="addrMngNo" v-model="formData.addrMngNo" :readonly="true">
                </span>
                <span class="custom_input">
                  <!-- TODO: 주소찾기 연동 시 readonly -->
                  <input type="text" placeholder ref="addrDtl" v-model="formData.addrDtl" :readonly="true">
                </span>
              </div>
            </div>
          </td>
        </tr>
        <tr v-if="!isCorp">
          <th scope="row">수신서버 URL</th>
          <td colspan="3">
            <span class="custom_input full_width">
              <input type="text" placeholder ref="recvUrl" v-model.trim="formData.recvUrl" autocomplete="new-password">
            </span>
          </td>
        </tr>
        <tr v-if="!isCorp">
          <th scope="row">API Client IP</th>
          <td colspan="3" class="field_area">
            <!-- <span class="custom_input full_width">
              <input type="text" placeholder ref="sendHost" v-model="formData.sendHost">
            </span> -->
            <allow-ip ref="allowipR"></allow-ip>
          </td>
        </tr>
        <tr v-if="!isCorp">
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
              <input type="checkbox" v-model="checked.chat" ref="chat" name="Checkbox" id="Checkbox01_2" @change="changeService">
              <label for="Checkbox01_2">양방향 대화방</label>
            </span>
          </td>
        </tr>
        <tr class="verticalMiddle" v-if="!isCorp && this.checked.chat === true">
           <th scope="row">
              양방향 대화방<br>중계사 여부
             <span class="require">*</span></th>
           <td>
             <span class="custom_radio fs16">
               <input type="radio" v-model="formData.rcsCorpYn" value='Y' name="Radio" id="Radio01_1" ref="rcsCorpYn" @change="changeRelay">
               <label for="Radio01_1">중계사임</label>
             </span>
             <span class="custom_radio fs16">
               <input type="radio" v-model="formData.rcsCorpYn" value='N' name="Radio" id="Radio01_2" @change="changeRelay">
               <label for="Radio01_2">중계사 아님</label>
             </span>
             <div class="input_chatbot_bundle" v-if="formData.rcsCorpYn !== 'N'">
                <label for="Radio01_2_2">양방향 대화방 수신 URL</label>
               <span class="custom_input">
                 <input type="text" id="Radio01_2_2" ref="webHookUrl" v-model.trim="formData.webHookUrl" :disabled=disable>
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
            <el-button type="text" ref="openRelayPopup" class="el-button btn sml bd_black el-button--primary el-button--small"
             :disabled=disable
             @click="openRelayPopup">중계사 선택</el-button>
            <relay-popup v-if="visibleRelayPopup"
             :relayAgInfo.sync="formData.relayAgInfo"
             :visible.sync="visibleRelayPopup"
             :relayAgRegister.sync="relayAgRegister"
             :agencyCorpRegNum.sync="corpData.corpRegiNum"
             @getData="getRelayAgInfo">
             </relay-popup>
          </td>
        </tr>
        <tr v-if="!isCorp">
          <th scope="row">
            특수부가통신
            <br>사업자등록증
            <span class="require">*</span>
          </th>
          <td colspan="3">
            <div class="box_add_file">
              <el-upload action :auto-upload="false" :on-change="handleChangeRcsCertiFile" ref="rcsCertiFileUpload" class="i_block">
                <a href="javascript:void(0);" size="small" type="primary" class="btn sml bd_black">파일선택</a>
              </el-upload>
              <span v-if="!isUploadedRcsCertiFile" class="text_desc add_file">파일형식 : jpg, png, pdf, tiff (최대 5MB)</span>
              <span v-if="isUploadedRcsCertiFile" class="text_desc add_file">
                {{ uploadedRcsCertifiFileName }}
                <a href="javascript:void(0);" class="btn_delete" @click="deleteUploadedRcsCertiFile">
                  <span>삭제</span>
                </a>
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AddressPopup from '@/components/address'
import RelayPopup from '@/components/relay'
import AllowIp from '@/views/service/components/AllowIp'

export default {
  name: 'JoinCorpInfoType1',
  components: {
    AddressPopup,
    RelayPopup,
    AllowIp
  },
  props: {
    corpData: {
      type: Object
    },
    userType: {
      type: String,
      default() {
        return 'CORP'
      }
    }
  },
  data() {
    return {
      formData: {
        corpRegiNum: '',
        name: '',
        bizCond: '',
        bizCate: '',
        addrRegnNo: '',
        addrMngNo: '',
        addrDtl: '',
        recvUrl: '',
        rcsSvc: 'a2p',
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
      corpRegFile: {},
      rcsCertiFile: {},
      visibleAddressPopup: false,
      visibleRelayPopup: false,
      relayAgRegister: false,
      disable: true
    }
  },
  filters: {
    prettyCorpRegNum(value) {
      return value.length > 0 ? jglib.corpRegiNumConverter(value) : ''
    }
  },
  created() {
    this.init()
  },
  mounted() {},
  computed: {
    isCorp() {
      return this.userType === 'CORP'
    },
    isUploadedRegFile() {
      return !jglib.isEmpty(this.corpRegFile)
    },
    uploadedRegFileName() {
      return jglib.isEmpty(this.corpRegFile) ? '' : this.corpRegFile.name
    },
    isUploadedRcsCertiFile() {
      return !jglib.isEmpty(this.rcsCertiFile)
    },
    uploadedRcsCertifiFileName() {
      return jglib.isEmpty(this.rcsCertiFile) ? '' : this.rcsCertiFile.name
    }
  },
  watch: {
    corpData: {
      deep: true,
      handler() {
        this.init()
      }
    }
  },
  methods: {
    init() {
      this.formData.corpRegiNum = this.corpData.corpRegiNum
    },
    handleChangeRegFile(file, fileList) {
      let checkResult = jglib.checkFileData(file.raw, ['jpg', 'png', 'pdf', 'tiff'], 5)
      if (checkResult.code !== 'ok') {
        fileList.pop(file)
        this.$alertMsg(checkResult.message)
      } else {
        this.corpRegFile = file
      }
    },
    handleChangeRcsCertiFile(file, fileList) {
      let checkResult = jglib.checkFileData(file.raw, ['jpg', 'png', 'pdf', 'tiff'], 5)
      if (checkResult.code !== 'ok') {
        fileList.pop(file)
        this.$alertMsg(checkResult.message)
      } else {
        this.rcsCertiFile = file
      }
    },
    deleteUploadedRegFile() {
      this.corpRegFile = {}
    },
    deleteUploadedRcsCertiFile() {
      this.rcsCertiFile = {}
    },
    getCorpData() {
      // if (!this.validateCorpData()) {
      //   return false
      // }

      let corpData = _.clone(this.formData)

      if (this.isCorp) {
        // 기업의 경우 formData에서 내용 뺌
        delete corpData['recvUrl']
        delete corpData['sendHost']
      }

      let result = {
        corpData: this.formData,
        corpRegFile: this.corpRegFile.raw
      }

      if (!this.isCorp) {
        // 대행사의 경우 부가사업자등록증 파일 추가
        result['rcsCertiFile'] = this.rcsCertiFile.raw
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

      if (this.$refs.allowipR) {
        try {
          result.corpData.addAllowIpList = this.$refs.allowipR.getAllowIp()
        } catch (e) {
          this.$alertMsg(e)
          return false
        }
      }

      return result
    },
    validateCorpData() {
      if (jglib.isEmpty(this.formData.name)) {
        this.$alertMsg('업체명을 입력해 주세요.').then(res => {
          this.$refs.name.focus()
        })
        return false
      }

      if (jglib.isEmpty(this.corpRegFile)) {
        this.$alertMsg('사업자등록증을 업로드해 주세요.').then(res => {
          this.$refs.corpRegFileUpload.$el.children[0].focus()
        })
        return false
      }

      if (jglib.isEmpty(this.formData.bizCond)) {
        this.$alertMsg('업태를 입력해 주세요.').then(res => {
          this.$refs.bizCond.focus()
        })
        return false
      }

      if (jglib.isEmpty(this.formData.bizCate)) {
        this.$alertMsg('종목을 입력해 주세요.').then(res => {
          this.$refs.bizCate.focus()
        })
        return false
      }

      if (jglib.isEmpty(this.formData.addrRegnNo)) {
        this.$alertMsg('주소를 입력해 주세요.').then(res => {
          this.$refs.addrRegnNo.focus()
        })
        return false
      }

      if (jglib.isEmpty(this.formData.rcsSvc)) {
        this.$alertMsg('제공서비스를 선택해 주세요.').then(res => {
          this.$refs.a2p.focus()
        })
        return false
      }

      if (!this.isCorp) {
        // 대행사인 경우
        if (!jglib.isEmpty(this.formData.recvUrl) && !jglib.isUrl(this.formData.recvUrl)) {
          // this.$alertMsg('수신서버URL을 입력해 주세요').then(res => {
          //   this.$refs.recvUrl.focus()
          // })
          this.$alertMsg('올바른 URL 형식이 아닙니다.').then(res => {
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
        //   this.$alertMsg('발신서버IP를 입력해 주세요').then(res => {
        //     this.$refs.sendHost.focus()
        //   })
        //   return false
        // }

        if (jglib.isEmpty(this.rcsCertiFile)) {
          this.$alertMsg('특수부가통신 사업자등록증을 업로드해 주세요.').then(
            res => {
              this.$refs.rcsCertiFileUpload.$el.children[0].focus()
            }
          )
          return false
        }
      }
      return true
    },
    openAddressPopup() {
      this.visibleAddressPopup = true
    },
    getAddress(address) {
      this.formData.addrRegnNo = address.zipNo
      this.formData.addrMngNo = address.roadFullAddr
      this.formData.addrDtl = address.detail
    },
    openRelayPopup() {
      this.visibleRelayPopup = true
      this.relayAgRegister = true
    },
    getRelayAgInfo(selectRelay) {
      this.formData.relayAgInfo = selectRelay
    },
    changeService() {
      if (this.checked.a2p === true && this.checked.chat === false) {
        this.formData.rcsSvc = this.rcsSvc.a2p
        this.formData.relayAgInfo = []
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
    },
    convertMultiWhitespace(e, target) {
      this.$data.formData[target] = e.target.value.replace(/ +/g, ' ').trim()
    }
  }
}
</script>

<style>
</style>
