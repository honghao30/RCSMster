<template>
  <!-- 브랜드 승인대기, 반려, 승인완료 -->
  <div class="rcs_emul_form_cont">
    <div class="rcs_item_bundle" v-show="waiting">
      <strong class="rcs_tit_bundle">대표 발신번호</strong>
      <div class="rcs_cont_bundle">{{ this.mdn }}</div>
    </div>
    <!-- 승인 이력 없는 브랜드가 반려 상태인 경우 -->
    <div class="rcs_item_bundle" v-show="!isActive && rejected">
      <strong class="rcs_tit_bundle">대표 발신번호<span class="require">*</span></strong>
      <div class="rcs_cont_bundle">
        <span class="custom_checkbox">
          <input type="checkbox" id="CS01" v-model="ceoSendFlag">
          <label for="CS01">전화번호와 동일</label>
        </span>
        <span class="custom_input short mar_l20'">
          <input v-if="ceoSendFlag" type="text" ref="tel" v-model="tel" readonly>
          <input v-else type="text" ref="mdn" v-model="mdn" maxlength="12">
        </span>
        <span class="text_desc">&nbsp;※ 휴대폰번호 등록불가</span>
      </div>
    </div>
    <!-- 최초 승인 이후 -->
    <div class="rcs_item_bundle" v-show="(isActive && rejected) || ok">
      <strong class="rcs_tit_bundle">대표 발신번호<span class="require">*</span></strong>
      <div class="rcs_cont_bundle">
        <span class="custom_input short">
          <input type="text" v-model="mdn" readonly>
        </span>
        <a href="javascript:void(0);" class="btn sml bd_black mar_l20" @click="callingNumberPopup" v-if="isActive && chatbotChangBtnFlag && this.$store.state.user.userCd !== 'AGENCY'">변경하기</a>
      </div>
    </div>
    <div class="rcs_item_bundle" v-show="waiting" v-if="statusFlag">
      <strong class="rcs_tit_bundle">대화방 명</strong>
      <div class="rcs_cont_bundle">{{ this.getApprovalBrandList.subTitle }}</div>
    </div>
    <div class="rcs_item_bundle" v-show="!isActive && rejected">
      <strong class="rcs_tit_bundle">대화방 명<span class="require">*</span></strong>
      <div class="rcs_cont_bundle">
        <span class="custom_input">
          <input type="text" ref="subTitle" placeholder="RCS 메시지 발송 시 고객에게 표시되는 이름으로 신중하게 작성 해주세요." v-model.trim="subTitle" maxlength="20">
        </span>
      </div>
    </div>
    <div class="rcs_item_bundle" v-show="!isActive">
      <strong class="rcs_tit_bundle">대표번호<br>문자수신서비스</strong>
      <div class="rcs_cont_bundle">
        <span class="custom_checkbox">
          <input type="checkbox" id="rcsReply" true-value="0" false-value="1" v-model="rcsReply" :disabled="waiting">
          <label for="rcsReply">사용</label>
        </span>
        <div class="input_txt_area" v-show="!waiting">
          대표번호문자수신서비스를 현재 사용하고 계실 경우 반드시 해당 정보를 체크해 주셔야 합니다.
          <a href="javascript:void(0);" class="btn_info"></a>
          <div class="info_txt_box">
            <span class="info_txt_con">
              ※ 대표번호문자수신서비스(MO) : 휴대폰 메시지함에서 기업의 대표번호로 문자를 보낼 경우 해당 메시지를 기업의 서버에서 수신할 수 있도록 제공하는 대표번호 부가 서비스
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 추가 발신번호 -->
    <div class="rcs_item_bundle" v-show="waiting" v-if="!isActive && statusFlag">
      <strong class="rcs_tit_bundle v_top">추가 발신번호</strong>
      <div class="rcs_cont_bundle pad_t16">
        <ul class="box_ui_field box_check_field">
          <li v-for="(list, index) in this.chatbotList" :key="`list_${index}`">
            <strong class="tit_ui_field">{{ list.chatbotId }}</strong>
            <div class="cont_ui_field">{{ list.subTitle }}</div>
            <span class="custom_checkbox checked">
              <input type="checkbox" :id="`wait_rcsReply${index}`" true-value="0" false-value="1" disabled v-model="list.rcsReply">
              <label :for="`wait_rcsReply${index}`">사용</label>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="rcs_item_bundle" v-show="!isActive && rejected">
      <strong class="rcs_tit_bundle v_top">추가 발신번호</strong>
      <div class="rcs_cont_bundle">
        <!-- 개별등록 -->
        <span class="custom_radio checked">
          <input type="radio" name="resist" id="resist01" value="each" v-model="checkedFlag">
          <label for="resist01" @click="eachRegister">
            <span>개별등록</span>
          </label>
        </span>
        <!-- 대량등록 -->
        <span class="custom_radio checked">
          <input type="radio" name="resist" id="resist02" value="large" v-model="checkedFlag">
          <label for="resist02" @click="largeRegister">
            <span>대량등록</span>
          </label>
        </span>
        <!-- 개별등록-->
        <div class="input_field_area" v-if="RegisterFlag">
          <span class="text_desc mar_b12" v-if="this.chatbotListLength === 0">
            추가발신번호가 있는 경우 버튼을 클릭하세요. 10개미만 등록 시 이용하세요.
            <strong>최대10개.</strong>
            <a href="javascript:void(0);" :class="{btn_more: ChatbotFlag}" @click="addChatbotList" v-if="this.chatbotListLength < 10"></a>
          </span>
          <span class="text_desc mar_b12" v-if="this.chatbotListLength > 0">
            대표번호문자수신서비스(MO)를 사용하실 경우 체크박스에 체크 해주세요.
          </span>
          <div class="input_field_list_tit" v-if="this.chatbotListLength > 0">
            <span>발신번호</span>
            <span>발신번호명</span>
            <span>MO</span>
          </div>
          <ul>
            <li v-for="(list, index) in this.chatbotList" :key="`list_${index}`">
              <span class="custom_input">
                <input type="text" placeholder="‘-’없이 입력" v-model.trim="list.chatbotId" maxlength="12">
              </span>
              <span class="custom_input">
                <input type="text" placeholder="발신번호 명을 입력하세요" v-model.trim="list.subTitle" maxlength="20">
              </span>
              <span class="custom_checkbox">
                <input type="checkbox" :id="`reject_rcsReply${index}`" true-value="0" false-value="1" v-model="list.rcsReply">
                <label :for="`reject_rcsReply${index}`"></label>
              </span>
              <a :class="{btn_more: ChatbotFlag}" href="javascript:void(0);" class="btn_squre minus" @click="removeChatbotList(index)"></a>
            </li>
            <li>
              <a href="javascript:void(0);" class="btn_squre plus" :class="{btn_more: ChatbotFlag}"
                  @click="addChatbotList" v-if="this.chatbotListLength > 0 && this.chatbotListLength < 10"></a>
            </li>
          </ul>
        </div>
        <!-- 대량등록 -->
        <div class="input_field_area" v-if="!RegisterFlag">
          <div class="box_add_file inline">
            <el-upload action :on-change="addlargeChatbotFile" class="i_block" :auto-upload="false" :show-file-list="false">
              <a href="javascript:void(0);" size="small" type="primary" class="btn sml bd_black">파일선택</a>
            </el-upload>
            <a href="javascript:void(0);" class="btn_link mar_l12" v-show="!massRegFileYn" @click="sampleFileDown">
              <span>샘플파일 다운로드</span>
            </a>
            <span class="text_desc add_file" v-if="!massRegFileYn">파일형식 : xls, xlsx (최대 5MB)</span>
            <!-- 파일 등록시 class add_file 추가 사업자등록증.jpg-->
            <span class="text_desc add_file" v-if="massRegFileYn">
              {{this.massRegFileName}}
              <a href="javascript:void(0);" class="btn_delete" v-if="massRegFileYn" @click="removelargeChatbotFile">
                <span>삭제</span>
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 통신서비스 가입증명원 -->
    <div class="rcs_item_bundle" v-show="waiting" v-if="statusFlag">
      <strong class="rcs_tit_bundle v_top">통신서비스 가입증명원</strong>
      <div class="rcs_cont_bundle mar_t2" v-if="this.getApprovalBrandList.regCertiFileName">
        <div>
          {{ this.getApprovalBrandList.regCertiFileName }} (
          {{ this.getApprovalBrandList.regCertiFileSize }}KB)
        </div>
      </div>
    </div>
    <div class="rcs_item_bundle" v-show="!isActive && rejected">
      <strong class="rcs_tit_bundle v_top">통신서비스 가입증명원<span class="require">*</span>
      </strong>
      <div class="rcs_cont_bundle">
        <div class="box_add_file">
          <div class="drag_files_area mar_t15">
            <!-- 파일업로드 -->
            <el-upload action :on-change="onFileregCertiFile" class="i_block" :auto-upload="false">
              <a href="javascript:void(0);" size="small" type="primary" class="btn sml bd_black">파일선택</a>
            </el-upload>
            <span class="text_desc add_file" v-if="!regCertiFileYn">파일형식 : jpg, png, pdf, tiff, zip (최대20MB)</span>
            <span class="text_desc add_file" v-if="regCertiFileYn">
              {{ this.regCertiFileName }}
              <a href="javascript:void(0);" class="btn_delete" @click="removeregCertiFile">
                <span>삭제</span>
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
    <Approval-Brand-CallingNumber-Popup
      v-if="visible"
      :visible.sync="visible"
      :brandId="this.brandIdData"
      @mdn="changeMdn"
    />
  </div>
</template>

<script>
import { getApprovalBrand } from '@/api/service/approvalBrand'
import { downloadFileDirect } from '@/api/common/code'
import ApprovalBrandCallingNumberPopup from '@/views/service/components/ApprovalBrandCallingNumberPopup'

export default {
  components: {
    ApprovalBrandCallingNumberPopup
  },
  data() {
    return {
      // 승인상태값
      isActive: false,
      waiting: false,
      ok: false,
      rejected: false,
      statusFlag: true,

      getApprovalBrandList: [],
      brandId: '',
      subTitle: '',
      ceoSendFlag: true,
      mdn: '',
      rcsReply: '1',
      chatbotListLength: 0,
      regCertiFileYn: true,
      ChatbotFlag: true,
      checkedFlag: 'each',
      RegisterFlag: true,
      chatbotList: [],
      massRegFile: [],
      massRegFileName: '',
      massRegFileYn: true,
      regCertiFile: [],
      regCertiFileName: '',
      regCertiFileIdOld: '',

      visible: false,
      chatbotChangBtnFlag: false
    }
  },
  created() {
    this.brandId = this.brandIdData
    let params = { brandId: this.brandId }

    getApprovalBrand(params).then(res => {
      this.getApprovalBrandList = res.result

      // 최초 승인 이력이 있는지 판단
      this.isActive = this.getApprovalBrandList.mstStatus === 'ACTIVE' && this.getApprovalBrandList.mstAprvRet === 'OK'

      // 승인 받은 발신번호가 복수개라면 대표 발신번호 수정 버튼 노출
      this.chatbotChangBtnFlag = this.isActive && this.getApprovalBrandList.chatbotList.filter(item => {
        return item.aprvRet === 'OK'
      }).length > 0

      if (this.getApprovalBrandList.aprvRet === 'WAITING' || this.getApprovalBrandList.aprvRet === 'INSPECTED' || this.getApprovalBrandList.aprvRet === 'INSPECTING') {
        this.waiting = true
      } else if (this.getApprovalBrandList.aprvRet === 'OK') {
        this.ok = true
      } else if (this.getApprovalBrandList.aprvRet === 'REJECTED' || this.getApprovalBrandList.aprvRet === 'SAVED') {
        this.rejected = true
      }

      if (this.getApprovalBrandList.status === 'APRV_MOD') {
        this.statusFlag = false
      }

      if (this.getApprovalBrandList.aprvRet === 'OK') {
        this.mdn = this.getApprovalBrandList.defMdn
      } else if (this.getApprovalBrandList.aprvRet !== 'OK' && this.getApprovalBrandList.tel !== this.getApprovalBrandList.defMdn) {
        this.ceoSendFlag = false
        this.mdn = this.getApprovalBrandList.defMdn
      } else if (this.getApprovalBrandList.aprvRet !== 'OK' && this.getApprovalBrandList.tel === this.getApprovalBrandList.defMdn) {
        this.ceoSendFlag = true
        this.mdn = this.getApprovalBrandList.defMdn
      }

      this.subTitle = this.getApprovalBrandList.subTitle
      this.rcsReply = this.getApprovalBrandList.rcsReply
      if (!jglib.isEmpty(this.getApprovalBrandList.chatbotList)) {
        this.chatbotList = this.getApprovalBrandList.chatbotList.filter(item => {
          return item.brandRegYn === 'Y'
        })
        this.chatbotListLength = this.chatbotList.length
      }
      if (jglib.isEmpty(this.getApprovalBrandList.massRegFileId)) {
        this.checkedFlag = 'each'
        this.RegisterFlag = true
        this.massRegFileYn = false
      } else {
        this.massRegFileName = this.getApprovalBrandList.massRegFileName
        this.checkedFlag = 'large'
        this.RegisterFlag = false
      }
      this.regCertiFileName = this.getApprovalBrandList.regCertiFileName
      this.regCertiFileIdOld = this.getApprovalBrandList.regCertiFileId
      if (jglib.isEmpty(this.getApprovalBrandList.regCertiFileName)) {
        this.regCertiFileYn = false
      }
    })
  },
  props: {
    tel: {
      type: String
    },
    brandIdData: {
      type: String
    }
  },
  watch: {
    ceoSendFlag() {},
    tel() {
      this.tel = this.tel.replace(/[^0-9]/g, '')
    },
    mdn() {
      this.mdn = this.mdn.replace(/[^0-9]/g, '')
    },
    chatbotList: {
      deep: true,
      handler() {
        if (this.RegisterFlag) {
          for (let chatbot of this.chatbotList) {
            chatbot.chatbotId = chatbot.chatbotId.replace(/[^0-9]/g, '')
          }
        }
      }
    }
  },
  mounted() {},
  computed: {},
  methods: {
    keydownOnlyNum(e) {
      return jglib.keydownOnlyNum(e)
    },
    keyupOnlyNum(e) {
      jglib.keyupOnlyNum(e)
    },
    addChatbotList() {
      if (this.chatbotListLength >= 10) {
        return
      }
      this.chatbotList.push({
        chatbotId: '',
        subTitle: '',
        rcsReply: '1'
      })
      this.chatbotListLength = this.chatbotList.length
    },
    removeChatbotList(index) {
      this.chatbotList.splice(index, 1)
      this.chatbotListLength = this.chatbotList.length
    },
    eachRegister() {
      if (this.checkedFlag !== 'each') {
        this.$confirmMsg('개별등록으로 변경하시면 개별등록 중인 데이터는 초기화 됩니다.개별등록으로 변경하시겠습니까?', '타이틀', '확인', '취소')
          .then(res => {
            // 팝업에서 '확인' 버튼 클릭 시 실행 되는 부분
            this.RegisterFlag = true
            this.chatbotList = []
            this.chatbotListLength = 0
            this.massRegFileName = ''
            this.massRegFileYn = false
          })
          .catch(res => {
            // 팝업에서 '취소' 버튼 클릭 시 실행 되는 부분
            this.checkedFlag = 'large'
            this.checkedNoFlag = false
            this.ChatbotFlag = true
          })
      }
    },
    largeRegister() {
      if (this.checkedFlag !== 'large') {
        this.$confirmMsg('대량등록으로 변경하시면 개별등록 중인 데이터는 초기화 됩니다.대량등록으로 변경하시겠습니까?', '타이틀', '확인', '취소')
          .then(res => {
            // 팝업에서 '확인' 버튼 클릭 시 실행 되는 부분
            this.ChatbotFlag = true
            this.RegisterFlag = false
            this.chatbotListLength = 0
          })
          .catch(res => {
            // 팝업에서 '취소' 버튼 클릭 시 실행 되는 부분
            this.checkedFlag = 'each'
            this.ChatbotFlag = true
          })
      }
    },
    // 대량등록
    addlargeChatbotFile(file, fileList) {
      let files = file.raw
      let uploadCheck = jglib.checkFileData(files, ['xls', 'xlsx'], 5)
      if (uploadCheck.code === 'errorExt') {
        this.$alertMsg(uploadCheck.message)
      } else if (uploadCheck.code === 'errorSize') {
        this.$alertMsg(uploadCheck.message)
      } else {
        this.doRemovelargeChatbotFile()
        this.massRegFileYn = true
        this.massRegFileName = files.name
        this.massRegFile.push(files)
      }
    },
    doRemovelargeChatbotFile() {
      this.massRegFile = []
      this.massRegFileName = ''
      this.massRegFileYn = false
    },
    removelargeChatbotFile() {
      this.$confirmMsg(`${this.massRegFileName} 파일을 삭제 하시겠습니까?`, '타이틀', '확인', '취소')
        .then(res => {
          // 팝업에서 '확인' 버튼 클릭 시 실행 되는 부분
          this.doRemovelargeChatbotFile()
        })
        .catch(res => {})
    },
    // 통신서비스 가입증명원
    onFileregCertiFile(file, fileList) {
      let files = file.raw
      let uploadCheck = jglib.checkFileData(files, ['jpg', 'jpeg', 'png', 'pdf', 'tiff', 'zip'], 20)
      if (uploadCheck.code === 'errorExt') {
        this.$alertMsg(uploadCheck.message)
      } else if (uploadCheck.code === 'errorSize') {
        this.$alertMsg(uploadCheck.message)
      } else {
        this.doRemoveregCertiFile()
        this.regCertiFileYn = true
        this.regCertiFileName = files.name
        this.regCertiFile.push(files)
      }
    },
    doRemoveregCertiFile() {
      this.regCertiFile = []
      this.regCertiFileName = ''
      this.regCertiFileYn = false
    },
    removeregCertiFile() {
      this.$confirmMsg(`${this.regCertiFileName} 파일을 삭제 하시겠습니까?`, '타이틀', '확인', '취소')
        .then(res => {
          // 팝업에서 '확인' 버튼 클릭 시 실행 되는 부분
          this.doRemoveregCertiFile()
        })
        .catch(res => {
          // 팝업에서 '취소' 버튼 클릭 시 실행 되는 부분
          this.regCertiFileYn = true
        })
    },
    validation() {
      if (this.ceoSendFlag && jglib.isEmpty(this.tel)) {
        this.$alertMsg('대표발신번호를 입력해 주세요.')
        this.$refs.tel.focus()
        return false
      }
      if (!this.ceoSendFlag && jglib.isEmpty(this.mdn)) {
        this.$alertMsg('대표발신번호를 입력해 주세요.')
        this.$refs.mdn.focus()
        return false
      }
      if (jglib.isEmpty(this.subTitle)) {
        this.$alertMsg('발신번호명을 입력해 주세요.')
        this.$refs.subTitle.focus()
        return false
      }
      if (!jglib.isEmpty(this.chatbotList)) {
        for (let i = 0; i < this.chatbotList.length; i++) {
          if (jglib.isEmpty(this.chatbotList[i].chatbotId) || jglib.isEmpty(this.chatbotList[i].subTitle)) {
            this.$alertMsg('발신번호와 발신번호명을 모두 입력하세요.')
            return false
          }
          if (this.ceoSendFlag && !this.ok && this.chatbotList[i].chatbotId === this.tel) {
            this.$alertMsg('발신번호는 중복으로 등록 하실 수 없습니다.')
            return false
          }
          if (!this.ceoSendFlag && !this.ok && this.chatbotList[i].chatbotId === this.mdn) {
            this.$alertMsg('발신번호는 중복으로 등록 하실 수 없습니다.')
            return false
          }
          for (let j = 0; j < this.chatbotList.length; j++) {
            if (i !== j && !this.ok && this.chatbotList[i].chatbotId === this.chatbotList[j].chatbotId) {
              this.$alertMsg('발신번호는 중복으로 등록 하실 수 없습니다.')
              return false
            }
          }
        }
      }
      for (let i = 0; i < this.chatbotList.length; i++) {
        if (jglib.isEmpty(this.chatbotList[i].chatbotId) && jglib.isEmpty(this.chatbotList[i].subTitle)) {
          this.chatbotList.splice(i, 1)
        }
      }
      if (this.getApprovalBrandList.aprvRet !== 'OK' && jglib.isEmpty(this.regCertiFileName)) {
        this.$alertMsg('통신서비스 가입증명원을 업로드 해 주세요.')
        return false
      }
      return true
    },
    getSendInfo() {
      let setchatbotList = []
      for (let i = 0; i < this.chatbotList.length; i++) {
        setchatbotList.push({
          mdn: this.chatbotList[i].chatbotId,
          subTitle: this.chatbotList[i].subTitle,
          rcsReply: this.chatbotList[i].rcsReply
        })
      }
      let sendInfoData = {
        mdn: this.ceoSendFlag && !this.ok ? this.tel : this.mdn,
        subTitle: this.subTitle,
        rcsReply: this.rcsReply,
        chatbotList: setchatbotList,
        massRegFile: this.massRegFile[0],
        massRegFileId: this.massRegFileName,
        regCertiFile: this.regCertiFile[0],
        regCertiFileIdOld: this.regCertiFileIdOld
      }
      return sendInfoData
    },
    callingNumberPopup() {
      this.visible = true
    },
    changeMdn(changeMdn) {
      this.mdn = changeMdn
    },
    sampleFileDown() {
      let params = {
        fileName: '발신번호_대량등록_샘플.xlsx',
        fileNo: 0
      }
      downloadFileDirect(params)
        .then(() => {})
        .catch(() => {
          this.$alertMsg('파일 다운로드 시 오류가 발생했습니다.')
        })
    }
  }
}
</script>
