<template>
  <!-- 브랜드 승인대기, 반려, 승인완료 -->
  <div class="rcs_emul_form_step">
    <div>
      <h3 class="h3_title fs20 mar_b10 " style="width: 83.2%;display: inline-block; vertical-align: bottom;">STEP 2. 대화방 설정(발신번호 정보 등록)</h3>
      <div class="bullet_btn_wrap btn_wrap mar_b10" style="display: inline-block;">
        <GuideForPdf btnName="대화방 명 가이드" popupName="ChatbotSubTitleGuide"></GuideForPdf>
      </div>
    </div>
    <div v-if="!isActive" class="title_area full_width NTlt mar_t10 mar_b10">사용자에게 메시지 발송 할 발신번호와 대화방 명을 등록하세요. 메시지 수신 후 대화방에서 확인 할 수 있습니다.</div>
    <!-- 대화방 명 -->
    <div class="rcs_item_bundle extra_bd_t pdtop10" v-if="waiting">
        <strong class="rcs_tit_bundle">대화방 명</strong>
      <div class="rcs_cont_bundle">{{ getApprovalBrandList.subTitle }}</div>
    </div>
    <div class="rcs_item_bundle extra_bd_t pdtop10" v-else-if="(isActive && rejected) || ok">
      <strong class="rcs_tit_bundle">대화방 명<span class="require">&nbsp;*</span></strong>
      <div class="rcs_cont_bundle">
        <span class="custom_input short"><input type="text" :value="subTitle" readonly></span>
        <span class="text_desc">&nbsp;※ 대화방 명 수정은 [발신번호 관리] 메뉴에서 할 수 있습니다.</span>
      </div>
    </div>
    <div class="rcs_item_bundle extra_bd_t" v-else-if="!isActive && rejected">
      <strong class="rcs_tit_bundle">대화방 명<span class="require">&nbsp;*</span></strong>
      <div class="rcs_cont_bundle">
        <span class="custom_input">
          <input type="text" ref="subTitle" placeholder="RCS 메시지 발송 시 고객에게 표시되는 이름으로 신중하게 작성 해주세요." v-model.trim="subTitle" maxlength="20">
        </span>
        <span class="count">({{ subTitle.length }}/20)</span>
      </div>
    </div>
    <div class="rcs_item_bundle" v-if="waiting">
      <strong class="rcs_tit_bundle">대표 발신번호</strong>
      <div class="rcs_cont_bundle">{{ mdn }}</div>
    </div>
    <!-- 승인 이력 없는 브랜드가 반려 상태인 경우 -->
    <div class="rcs_item_bundle" v-else-if="!isActive && rejected">
      <strong class="rcs_tit_bundle">대표 발신번호<span class="require">*</span></strong>
      <div class="rcs_cont_bundle">
        <span class="custom_checkbox">
          <input type="checkbox" id="CS01" v-model="ceoSendFlag">
          <label for="CS01">전화번호와 동일</label>
        </span>
        <span class="custom_input short mar_l20">
          <input v-if="ceoSendFlag" type="text" ref="tel" v-model="tel" readonly>
          <input v-else type="text" ref="mdn" v-model="mdn" maxlength="12">
        </span>
        <span class="custom_input_text">※ 휴대폰번호 등록불가</span>
      </div>
    </div>
    <!-- 최초 승인 이후 반려 상태인 경우 -->
    <div class="rcs_item_bundle" v-if="(isActive && rejected) || ok">
      <strong class="rcs_tit_bundle">대표 발신번호<span class="require">*</span></strong>
      <div class="rcs_cont_bundle">
        <span class="custom_input short">
          <input type="text" v-model="mdn" readonly>
        </span>
        <a href="javascript:void(0);" class="btn sml bd_black mar_l20" @click="callingNumberPopup" v-if="isActive && chatbotChangBtnFlag && this.$store.state.user.userCd !== 'AGENCY'">
          변경하기
        </a>
      </div>
    </div>
    <!-- <div class="title_area full_width NTlt mar_t40 mar_b10 pad_l25" v-if="!isActive && (waiting || rejected)">해당 사항이 있는 경우에만 등록해주세요</div> -->
    <div class="rcs_item_bundle" v-if="!isActive">
      <strong class="rcs_tit_bundle" style="margin-top: -8px">대표번호 문자수신<br>서비스 (SMS MO)</strong>
      <div class="rcs_cont_bundle">
        <span class="custom_checkbox">
          <input type="checkbox" id="rcsReply" true-value="0" false-value="1" v-model="rcsReply" :disabled="waiting">
          <label for="rcsReply">사용중</label>
        </span>
        <div class="input_txt_area" v-if="!waiting">
          <div class="input_txt_area">※ 대표번호문자수신서비스(SMS MO) 를 사전에 신청하신 발신번호만 체크하세요.</div>
          <span class="info_txt_plus"><span class="info_txt_plus_icon">※</span>대표번호문자수신서비스(SMS MO) : 휴대폰 메시지함에서 기업의 대표번호로 문자를 보낼<br>경우 해당 메시지를 기업의 서버에서 수신할 수 있도록 제공하는 대표번호 부가 서비스</span>
          <!-- <a href="javascript:void(0);" class="btn_info"></a>
          <div class="info_txt_box">
            <span class="info_txt_con">
              ※ 대표번호문자수신서비스(MO) : 휴대폰 메시지함에서 기업의 대표번호로 문자를 보낼 경우 해당 메시지를 기업의 서버에서 수신할 수 있도록 제공하는 대표번호 부가 서비스
            </span>
          </div> -->
        </div>
      </div>
    </div>
    <!-- 추가 발신번호 -->
    <div class="rcs_item_bundle" v-if="!isActive && isMod && waiting">
      <strong class="rcs_tit_bundle v_top">추가 발신번호</strong>
      <div class="rcs_cont_bundle input_field_area" style="width: min-content;">
        <div class="input_field_list_tit">
          <span style="width: 140px;">발신번호</span>
          <span style="width: 356px;">대화방 명</span>
          <span style="width: 60px; line-height: 1;">메시지<br/>입력란</span>
          <span style="width: 48px;">MO</span>
        </div>
        <ul class="box_ui_field box_check_field dv2023_step2-seenum">
          <li v-for="(list, index) in this.chatbotList" :key="`list_${index}`">
            <strong class="tit_ui_field">{{ list.chatbotId }}</strong>
            <div class="cont_ui_field">{{ list.subTitle }}</div>
            <span class="custom_checkbox checked">
              <input type="checkbox" :id="`wait_inputField${index}`" true-value="Y" false-value="N" disabled v-model="list.inputFieldYn">
              <label :for="`wait_inputField${index}`"></label>
            </span>
            <span class="custom_checkbox checked">
              <input type="checkbox" :id="`wait_rcsReply${index}`" true-value="0" false-value="1" disabled v-model="list.rcsReply">
              <label :for="`wait_rcsReply${index}`"></label>
            </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="rcs_item_bundle" v-else-if="!isActive && rejected">
      <strong class="rcs_tit_bundle">추가 발신번호</strong>
      <div class="rcs_cont_bundle" style="padding-top:6px;">
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
        <div class="input_field_area dv2023_step2-addnum" v-if="RegisterFlag">
          <span class="text_desc mar_b12" v-if="this.chatbotListLength === 0">
            추가발신번호가 있는 경우 버튼을 클릭하세요. 10개미만 등록 시 이용하세요.
            <strong>최대10개.</strong>
            <a href="javascript:void(0);" :class="{btn_more: ChatbotFlag}" @click="addChatbotList" v-if="this.chatbotListLength < 10"></a>
          </span>
          <span class="text_desc mar_b12" v-if="this.chatbotListLength > 0">
            대표번호문자수신서비스(MO)를 사용하실 경우 체크박스에 체크 해주세요.
          </span>
          <div class="input_field_list_tit" v-if="this.chatbotListLength > 0">
            <span style="width: 140px;">발신번호</span>
            <span style="width: 366px;">대화방 명</span>
            <span style="width: 100px;">메시지 입력란</span>
            <span style="width: 48px;">MO</span>
          </div>
          <ul>
            <li v-for="(list, index) in this.chatbotList" :key="`list_${index}`">
              <span class="custom_input">
                <input type="text" placeholder="‘-’없이 입력" v-model.trim="list.chatbotId" maxlength="12">
              </span>
              <span class="custom_input">
                <input type="text" placeholder="문자 수신 시 발신번호 대신 표시되는 이름입니다." v-model.trim="list.subTitle" maxlength="20">
              </span>
              <span class="custom_checkbox">
                <input type="checkbox" :id="`reject_inputField${index}`" true-value="Y" false-value="N" v-model="list.inputFieldYn">
                <label :for="`reject_inputField${index}`"></label>
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
            <el-upload action="https://jsonplaceholder.typicode.com/posts/" :on-change="addlargeChatbotFile" class="i_block" :auto-upload="false" :show-file-list="false">
              <a href="javascript:void(0);" type="primary" class="btn sml bd_black">파일선택</a>
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
    <div class="rcs_item_bundle" v-if="isMod && waiting">
      <strong class="rcs_tit_bundle">통신서비스 가입증명원</strong>
      <div class="rcs_cont_bundle mar_t2"  v-if="this.getApprovalBrandList.regCertiFileName">
        <div style="margin-top:-8px;">
          {{ this.getApprovalBrandList.regCertiFileName }} (
          {{ this.getApprovalBrandList.regCertiFileSize }}KB)
        </div>
      </div>
    </div>
    <div class="rcs_item_bundle" v-else-if="!isActive && rejected">
      <strong class="rcs_tit_bundle v_top">통신서비스 가입증명원<span class="require">*</span>
      </strong>
      <div class="rcs_cont_bundle">
        <div class="box_add_file">
          <div class="drag_files_area" style="margin-top:8px;">
            <!-- 파일업로드 -->
            <el-upload action="https://jsonplaceholder.typicode.com/posts/" :on-change="onFileregCertiFile" class="i_block" :auto-upload="false">
              <a href="javascript:void(0);" type="primary" class="btn sml bd_black">파일선택</a>
            </el-upload>
            <span class="text_desc add_file" v-if="!regCertiFileYn">파일형식 : jpg, png, pdf, tiff, zip (최대{{certiFileMaxSize}}MB)</span>
            <span class="text_desc add_file" v-if="regCertiFileYn">
              {{ this.regCertiFileName }}
              <a href="javascript:void(0);" class="btn_delete" @click="removeregCertiFile">
                <span>삭제</span>
              </a>
            </span>
          </div>
          <span class="info_txt_plus mar_t10"><span class="info_txt_plus_icon">※</span>모든 발신번호에 해당하는 각각의 "통신서비스 가입증명원"은 통신사에서 최근 1개월 이내 발행된 서류로 제출하세요.</span>
          <span class="info_txt_plus"><span class="info_txt_plus_icon">※</span>"발신번호 소유자"와 "가입 기업의 사업자"가 서로 다를 경우, 최근 6개월 이내 발급된 위탁 관련 서류를 제출하세요.(<a href="https://www.rcsbizcenter.com/cs/notice/6" target="_blank">https://www.rcsbizcenter.com/cs/notice/6</a>)</span>
        </div>
      </div>
    </div>
    <Approval-Brand-CallingNumber-Popup v-if="visible" :visible.sync="visible" :brandId="brandId" :def="mdn" @mdn="changeMdn"/>
  </div>
</template>

<script>
import { downloadFileDirect } from '@/api/common/code'
import ApprovalBrandCallingNumberPopup from '@/views/service/components/ApprovalBrandCallingNumberPopup'
import GuideForPdf from '@/views/service/components/GuideForPdf'

export default {
  components: {
    ApprovalBrandCallingNumberPopup,
    GuideForPdf
  },
  props: {
    tel: {
      type: String
    },
    brandId: {
      type: String
    },
    RESPONSE: {
      type: Object
    }
  },
  data() {
    return {
      // 승인상태값
      isActive: false,
      waiting: false,
      ok: false,
      rejected: false,
      isMod: true,

      getApprovalBrandList: [],
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
  computed: {
    sendInfoData() {
      return {
        subTitle: this.subTitle,
        tel: this.ceoSendFlag ? this.tel : this.mdn
      }
    },
    certiFileMaxSize() {
      return this.checkedFlag === 'large' ? 70 : 20
    }
  },
  watch: {
    ceoSendFlag() {},
    tel() {
      this.tel = this.tel.replace(/\D/g, '')
    },
    mdn() {
      this.mdn = this.mdn.replace(/\D/g, '')
    },
    chatbotList: {
      deep: true,
      handler() {
        if (this.RegisterFlag) {
          for (let chatbot of this.chatbotList) {
            chatbot.chatbotId = chatbot.chatbotId.replace(/\D/g, '')
          }
        }
      }
    },
    sendInfoData: {
      deep: true,
      handler(sendInfo) {
        this.$emit('changeSendInfo', sendInfo)
      }
    }
  },
  created() {
    const res = this.RESPONSE
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
      this.isMod = false
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
  },
  mounted() {
    this.$emit('changeSendInfo', this.sendInfoData)
  },
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
        rcsReply: '1',
        inputFieldYn: 'Y'
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
          .then(() => {
            // 팝업에서 '확인' 버튼 클릭 시 실행 되는 부분
            this.RegisterFlag = true
            this.chatbotList = []
            this.chatbotListLength = 0
            this.massRegFileName = ''
            this.massRegFileYn = false
            this.doRemoveregCertiFile()
          })
          .catch(() => {
            // 팝업에서 '취소' 버튼 클릭 시 실행 되는 부분
            this.checkedFlag = 'large'
            this.ChatbotFlag = true
          })
      }
    },
    largeRegister() {
      if (this.checkedFlag !== 'large') {
        this.$confirmMsg('대량등록으로 변경하시면 개별등록 중인 데이터는 초기화 됩니다.대량등록으로 변경하시겠습니까?', '타이틀', '확인', '취소')
          .then(() => {
            // 팝업에서 '확인' 버튼 클릭 시 실행 되는 부분
            this.ChatbotFlag = true
            this.RegisterFlag = false
            this.chatbotListLength = 0
            this.doRemoveregCertiFile()
          })
          .catch(() => {
            // 팝업에서 '취소' 버튼 클릭 시 실행 되는 부분
            this.checkedFlag = 'each'
            this.ChatbotFlag = true
          })
      }
    },
    // 대량등록
    addlargeChatbotFile(file) {
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
      this.$confirmMsg(`등록된 파일을 삭제 하시겠습니까?`, '타이틀', '확인', '취소')
        .then(() => {
          // 팝업에서 '확인' 버튼 클릭 시 실행 되는 부분
          this.doRemovelargeChatbotFile()
        })
    },
    // 통신서비스 가입증명원
    onFileregCertiFile(file) {
      let files = file.raw
      let uploadCheck = jglib.checkFileData(files, ['jpg', 'jpeg', 'png', 'pdf', 'tiff', 'zip'], this.certiFileMaxSize)
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
      this.$confirmMsg(`증명원 파일을 삭제 하시겠습니까?`, '타이틀', '확인', '취소')
        .then(() => {
          // 팝업에서 '확인' 버튼 클릭 시 실행 되는 부분
          this.doRemoveregCertiFile()
        })
        .catch(() => {
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
        this.$alertMsg('대화방 명을 입력해 주세요.')
        this.$refs.subTitle.focus()
        return false
      }
      if (!jglib.isEmpty(this.chatbotList)) {
        for (let i = 0; i < this.chatbotList.length; i++) {
          if (jglib.isEmpty(this.chatbotList[i].chatbotId) || jglib.isEmpty(this.chatbotList[i].subTitle)) {
            this.$alertMsg('발신번호와 대화방 명을 모두 입력하세요.')
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
          inputFieldYn: this.chatbotList[i].inputFieldYn,
          rcsReply: this.chatbotList[i].rcsReply
        })
      }
      return {
        mdn: this.ceoSendFlag && !this.ok ? this.tel : this.mdn,
        subTitle: this.subTitle,
        rcsReply: this.rcsReply,
        chatbotList: setchatbotList,
        massRegFile: this.massRegFile[0],
        massRegFileId: this.massRegFileName,
        regCertiFile: this.regCertiFile[0],
        regCertiFileIdOld: this.regCertiFileIdOld,
        additionalType: this.checkedFlag
      }
    },
    callingNumberPopup() {
      this.visible = true
    },
    changeMdn(data) {
      this.mdn = data.mdn
      this.subTitle = data.subTitle
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

<style>
.rcs_item_bundle .box_ui_field.dv2023_step2-seenum > li > strong.tit_ui_field {
  width: 140px;
}
.rcs_item_bundle .box_ui_field.dv2023_step2-seenum > li > div.cont_ui_field {
  width: 360px;
}
.dv2023_step2-seenum > li > span.custom_checkbox {
  width: 52px;
  text-align: center;
  margin-left: 0;
}
</style>
