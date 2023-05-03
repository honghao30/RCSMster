<template>
  <div class="rcs_emul_form_wrap">
    <GuideForPdf btnName="대화방 명 가이드" popupName="ChatbotSubTitleGuide"></GuideForPdf>
    <div class="rcs_emul_form_cont dv2023_formspace bd_no dv2023_radiolength">
      <!-- 등록방법: 신규 등록시에만 선택 가능 -->
      <div v-if="isNew" class="dv2023_segmentwidth">
        <div class="rcs_item_bundle dv2023_addunderline">
          <strong class="rcs_tit_bundle p-l0">
            등록방법 <span class="require">*</span>
          </strong>
          <div class="rcs_cont_bundle">
            <span class="custom_radio checked">
              <input type="radio" id="massReg_N" name="type" value="N" v-model="wrtChatbotData.massYn" @click="onClickmassYn($event)"/>
              <label for="massReg_N"><span>개별 등록</span></label>
            </span>
            <span class="custom_radio checked">
              <input type="radio" id="massReg_Y" name="type" value="Y" v-model="wrtChatbotData.massYn" @click="onClickmassYn($event)"/>
              <label for="massReg_Y"><span>대량 등록</span></label>
            </span>
          </div>
        </div>
      </div>
      <!-- case 1) 개별 등록 -->
      <div v-if="!isMassReg">
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
            발신번호 <span class="require">*</span>
          </strong>
          <div class="rcs_cont_bundle dv2023_positionbutton">
            <span v-if="isNew" class="custom_input">
              <input v-model.trim="wrtChatbotData.mdn" ref="mdn" @input="e => wrtChatbotData.mdn = e.target.value" @change="mdnDupCheckFlag = false" maxlength="12" type="text" placeholder="발신번호를 '-'없이 입력해 주세요." class="input_text">
              <a href="javascript:void(0);" class="btn sml" :class="mdnDupCheckFlag ? 'bd_gray' : 'bd_black'" @click="checkDuplicate"><span>중복체크</span></a>
            </span>
            <span v-else>{{ wrtChatbotData.mdn }}</span>
          </div>
        </div>
        <div class="rcs_item_bundle">
          <strong class="rcs_tit_bundle p-l0">
            메시지 입력란 <span class="require">*</span>
          </strong>
          <div class="rcs_cont_bundle">
            <span class="custom_radio checked">
              <input type="radio" id="inputField_Y" name="inputFieldYn" value="Y" v-model="wrtChatbotData.inputFieldYn"/>
              <label for="inputField_Y"><span>입력 가능</span></label>
            </span>
            <!-- MO(대표번호 문자수신 서비스) '사용'을 선택한 경우, 메시지 입력란은 무조건 사용 처리되며, 입력 불가능으로 변경이 불가하다. -->
            <span class="custom_radio checked">
              <input type="radio" id="inputField_N" name="inputFieldYn" value="N" v-model="wrtChatbotData.inputFieldYn" :disabled="wrtChatbotData.rcsReply === '0'"/>
              <label for="inputField_N" :style="wrtChatbotData.rcsReply === '0' ? 'cursor: not-allowed' : ''"><span>입력 불가능</span></label>
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
            <span class="custom_radio checked">
              <input type="radio" id="display_Y" name="displayYn" value="1" v-model="displayYn"/>
              <label for="display_Y"><span>전시</span></label>
            </span>
            <span class="custom_radio checked">
              <input type="radio" id="display_N" name="displayYn" value="0" v-model="displayYn"/>
              <label for="display_N"><span>비전시</span></label>
            </span>
          </div>
        </div>
        <div class="rcs_item_bundle dv2023_radiolengthspacer">
          <strong class="rcs_tit_bundle p-l0">
            대표번호<br>문자수신서비스 <span class="require">*</span>
            <span class="relative">
              <button class="icon_info"></button>
              <span class="message">
                대표번호 문자수신 서비스는 휴대폰 메시지 함에서 기업의 대표번호로 문자를 보낼 경우 해당 메시지를 기업의 서버에서 수신할 수 있도록 제공하는 대표번호 부가 서비스입니다.
              </span>
            </span>
          </strong>
          <div class="rcs_cont_bundle">
            <span class="custom_radio checked">
              <input type="radio" id="rcsReply_1" name="rcsReply" value="1" v-model="wrtChatbotData.rcsReply" @click="toggleRcsReply('1')">
              <label for="rcsReply_1"><span>미사용</span></label>
            </span>
            <span class="custom_radio checked">
              <input type="radio" id="rcsReply_0" name="rcsReply" value="0" v-model="wrtChatbotData.rcsReply" @click="toggleRcsReply('0')">
              <label for="rcsReply_0"><span>사용</span></label>
            </span>
            <div class="mar_t10">
              ※ 대표번호문자수신서비스(SMS MO)를 사전에 신청하신 발신번호만 “사용”으로 선택해 주세요.<br>
              ※ “사용” 선택 시 RCS에서 제공중인 버튼클릭 등의 고객반응통계는 확인할 수 없습니다.
            </div>
          </div>
        </div>
        <div class="rcs_item_bundle">
          <strong class="rcs_tit_bundle p-l0">
            통신서비스<br>가입증명원 <span class="require">*</span>
          </strong>
          <div v-if="!isActive" class="rcs_cont_bundle">
            <span class="box_add_file">
              <el-upload ref="refCertiFile" :on-change="onChangeRegCertiFile" :auto-upload="false" action accept="jpg,jpeg,png,pdf,tiff,zip" class="i_block">
                <span class="custom_image_input readonly">
                  <a class="textover">{{ regCertiFileNm || '업로드할 파일을 선택해 주세요.'}}</a>
                </span>
                <el-button v-if="!wrtChatbotData.fileName" size="small" type="primary" class="btn sml bd_black">첨부</el-button>
                <el-button v-else size="small" type="primary" class="btn sml bd_black" @click.stop="removeRegCertiFile">삭제</el-button>
              </el-upload>
              <div class="custom_input_etc">
                ※ 지원파일: .jpg, .png, .tiff, .pdf, .zip (최대 20MB)
              </div>
            </span>
            <div class="mar_t10">
              - 통신서비스 가입증명원을 제출하시면 서류 심사 후 등록이 가능합니다.<br>
              - 입력한 발신번호와 통신서비스 가입증멍원의 전화번호가 동일해야만 발신번호가 등록됩니다.<br>
              <span class="text_red">** 파일이 여러개인 경우, zip 파일로 압축하여 등록해 주세요.</span>
            </div>
          </div>
          <div v-else class="rcs_cont_bundle">
            <span>
              <a href="javascript:void(0)" class="underline" @click="downloadRegCertiFile">{{ chatbotData.fileName }}</a>
            </span>
          </div>
        </div>
      </div>
      <!-- case 2) 대량 등록 -->
      <div v-else>
        <div v-if="isWrite" class="rcs_item_bundle">
          <strong class="rcs_tit_bundle p-l0">
            대화방 명 <span class="require">*</span>
          </strong>
          <div class="rcs_cont_bundle">
            <span class="custom_input w670">
              {{ (wrtChatbotData.massRemainedCnt + wrtChatbotData.massRejectedCnt) - 1 > 0 ? `${wrtChatbotData.chatbotId}외 ${ (wrtChatbotData.massRemainedCnt + wrtChatbotData.massRejectedCnt) - 1} 건` : wrtChatbotData.subTitle }}
            </span>
          </div>
        </div>
        <div class="rcs_item_bundle dv2023_paddingtop5">
          <strong class="rcs_tit_bundle p-l0">
            엑셀 등록 <span class="require">*</span>
          </strong>
          <div class="rcs_cont_bundle">
            <span class="box_add_file">
              <el-upload ref="massFile" :on-change="onChangeMassFile" :auto-upload="false" action accept="xls,xlsx" class="i_block">
                <span class="custom_image_input readonly">
                  <a class="textover">{{ massFileNm || '업로드 할 파일을 선택해 주세요.' }}</a>
                </span>
                <el-button v-if="!wrtChatbotData.massFileNm" size="small" type="primary" class="btn sml bd_black">첨부</el-button>
                <el-button v-else size="small" type="primary" class="btn sml bd_black" @click.stop="removeMassFile">삭제</el-button>
              </el-upload>
              <div class="custom_input_etc dv2023_sampleinput">
                ※ 파일형식: .xls, .xlsx (최대 5MB)
                <a href="javascript:void(0);" class="btn_link mar_l12" @click="downloadSampleFile">
                  <span>샘플파일 다운로드</span>
                </a>
              </div>
            </span>
          </div>
        </div>
        <div class="rcs_item_bundle">
          <strong class="rcs_tit_bundle p-l0">
            통신서비스<br>가입증명원 <span class="require">*</span>
          </strong>
          <div class="rcs_cont_bundle">
            <span class="box_add_file">
              <el-upload ref="regCertiMassFile" :on-change="onChangeRegCertiFile" :auto-upload="false" action accept="jpg,jpeg,png,pdf,tiff,zip" class="i_block">
                <span class="custom_image_input readonly">
                  <a class="textover">{{ regCertiFileNm || '업로드 할 파일을 선택해 주세요.'}}</a>
                </span>
                <el-button v-if="!regCertiFileNm" size="small" type="primary" class="btn sml bd_black">첨부</el-button>
                <el-button v-else size="small" type="primary" class="btn sml bd_black" @click.stop="removeRegCertiFile">삭제</el-button>
              </el-upload>
              <div class="custom_input_etc">
                ※ 지원파일: .jpg, .png, .tiff, .pdf, .zip (최대 70MB)
              </div>
            </span>
            <div class="mar_t10">
              - 통신서비스 가입증명원을 제출하시면 서류 심사 후 등록이 가능합니다.<br>
              - 입력한 발신번호와 통신서비스 가입증멍원의 전화번호가 동일해야만 발신번호가 등록됩니다.<br>
              <span class="text_red">** 파일이 여러개인 경우, zip 파일로 압축하여 등록해 주세요.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 버튼 영역 -->
    <div class="btn_wrap dv2023_btnspace mar_t40 full_width temWrite btn_flex first">
      <a href="javascript:void(0);" class="btn mid bd_blue" @click="goBack"><span>이전</span></a>
      <a href="javascript:void(0);" class="btn mid bd_blue" v-if="!isNew" @click="remove">삭제</a>
      <a href="javascript:void(0);" class="btn mid bd_blue" v-if="!isMassReg && (isNew || isSaved)" @click="save">임시저장</a>
      <a href="javascript:void(0);" class="btn mid blue" @click="apply">승인요청</a>
    </div>
    <!-- 대량등록 실패시 팝업 -->
    <MassChatbotErrorPopup v-if="showUploadResultPopup" :uploadResult="uploadResult" @goList="goList"></MassChatbotErrorPopup>
  </div>
</template>

<script>
import GuideForPdf from '@/views/service/components/GuideForPdf'
import MassChatbotErrorPopup from '@/views/service/components/chatbot/MassChatbotErrorPopup'
import { downloadFileDirect } from '@/api/common/code'
import { isDuplicateMdn, addOnewayChatbot, updateOnewayChatbot, addMassOnewayChatbot, deleteChatbot, deleteMassChatbot, downloadRegCertiFile, getActiveA2pChatbotCnt, getActiveAndDisplayA2pChatbotCnt, isSubNumChatbots } from '@/api/service/chatbot'
export default {
  name: 'OnewayChatbotWrite',
  components: {
    GuideForPdf,
    MassChatbotErrorPopup
  },
  props: {
    isNew: { type: Boolean, default: true }, // 신규 등록 여부
    isWrite: { type: Boolean, default: false }, // 수정모드?
    chatbotData: { type: Object, default: null }, // 원본 데이터
    wrtChatbotData: { type: Object, default: null } // 사용자 작성 데이터
  },
  data() {
    return {
      brandId: '',
      displayYn: '1', // 전시/비전시 여부
      mdnDupCheckFlag: false, // 발신번호 중복체크 여부
      showUploadResultPopup: false,
      uploadResult: null,
      regCertiFile: null, // 통신서비스 가입증명원
      massFile: null, // (대량)엑셀파일
      regCertiFileNm: '', // 통신서비스 가입증명원 파일명
      massFileNm: '' // (대량)엑셀파일명
    }
  },
  computed: {
    isSaved() { return this.chatbotData.aprvRet === 'SAVED' }, // 임시저장 여부
    isRejected() { return this.chatbotData.aprvRet === 'REJECTED' }, // 반려
    isActive() { return this.chatbotData.aprvRet === 'OK' }, // 승인완료
    isAfterActive() { return this.chatbotData.activeYn === 'Y' }, // 승인 이후의 데이터인지?
    isMassReg() { // 대량등록 여부
      if (this.isWrite) return (this.wrtChatbotData.massRemainedCnt + this.wrtChatbotData.massRejectedCnt) > 0
      else return this.wrtChatbotData.massYn === 'Y'
    }
  },
  watch: {
    'wrtChatbotData.mdn'() { // 발신번호 입력란 숫자만 입력가능
      this.wrtChatbotData.mdn = this.wrtChatbotData.mdn.replace(/[^0-9]/g, '')
    },
    displayYn() {
      this.wrtChatbotData.display = this.displayYn === '1' ? '01' : '00'
    }
  },
  created() {
    this.brandId = this.$route.params.brandId
    if (!this.isNew) {
      this.regCertiFileNm = this.isMassReg ? this.wrtChatbotData.massRegFileName : this.wrtChatbotData.fileName
    }
  },
  mounted() {
    if (this.isNew) this.mdnDupCheckFlag = false
    else this.mdnDupCheckFlag = true
    if (this.isNew) this.displayYn = '1'
    else {
      if (this.isActive) this.displayYn = this.wrtChatbotData.display.substring(1, 2) // 승인 완료된 상태인 경우, 사용작의 전시/비전시 값을 set
      else this.displayYn = '1' // 그 외 수정의 경우는 항상 전시(1)
    }
  },
  methods: {
    initFormData() {
      for (let prop in this.wrtChatbotData) {
        if (prop !== 'massYn') this.wrtChatbotData[prop] = this.chatbotData[prop] // 등록방법을 제외한 나머지 값을 초기화 시킨다
      }
      this.removeRegCertiFile()
      this.removeMassFile()
    },
    /** 대표번호 문자수신 서비스  */
    toggleRcsReply(val) {
      if (val === '0') { // 사용 체크시
        this.$alertMsg('\'사용\'선택 시 RCS에서 제공 중인 버튼 클릭 등의<br>고객 반응 통계는 확인하실 수 없습니다.').then(() => {
          this.wrtChatbotData.inputFieldYn = 'Y' // 메시지 입력란이 '미사용'인 경우 -> '사용'으로 변경
        })
      }
    },
    /** 등록방법 변경 전 체크 */
    onClickmassYn(e) {
      let chgValue = e.target.value
      let isUserWrite = false
      if (chgValue === 'N') { // 개별등록으로 변경하는 경우 -> 등록된 대량등록, 통신가입증명원 파일이 있는지
        if (!jglib.isEmpty(this.regCertiFile) || !jglib.isEmpty(this.massFile)) isUserWrite = true
        else isUserWrite = false
      } else { // 대량등록으로 변경하는 경우 -> 초기 데이터와 사용자 데이터 비교
        if (this.isChangeValue(this.chatbotData, this.wrtChatbotData)) isUserWrite = true
        else isUserWrite = false
      }
      // 변경된 데이터가 있는 상태에서, 등록방법을 변경하는 경우에만 alert이 출력되도록
      if (isUserWrite && this.wrtChatbotData.massYn !== chgValue) {
        e.target.checked = false
        this.$confirmMsg('발신번호 등록을 취소 하시겠습니까?').then(() => {
          this.wrtChatbotData.massYn = chgValue
          document.getElementById(`massReg_${chgValue}`).checked = true
          this.initFormData() // 데이터 초기화
        }).catch(() => {
          document.getElementById(`massReg_${this.wrtChatbotData.massYn}`).checked = true
        })
      }
    },
    /** 변경된 데이터가 있는지 확인 */
    isChangeValue(obj, target) {
      let result = false
      for (let prop in obj) {
        if (target.hasOwnProperty(prop)) {
          if (String(obj[prop]) !== String(target[prop])) result = true
        }
      }
      return result
    },
    /** 통신가입증명원 파일 */
    onChangeRegCertiFile(file) {
      let maxSize = this.isMassReg ? 70 : 20
      let fileCheck = jglib.checkFileData(file.raw, ['jpg', 'jpeg', 'png', 'pdf', 'tiff', 'zip'], maxSize)
      if (fileCheck.code === 'errorSize' || fileCheck.code === 'errorExt') this.$alertMsg(fileCheck.message)
      else {
        this.regCertiFile = file.raw
        this.wrtChatbotData.fileName = file.name
        this.regCertiFileNm = file.name
      }
    },
    /** (대량) 엑셀 파일 */
    onChangeMassFile(file) {
      let fileCheck = jglib.checkFileData(file.raw, ['xls', 'xlsx'], 5)
      if (fileCheck.code === 'errorSize' || fileCheck.code === 'errorExt') this.$alertMsg(fileCheck.message)
      else {
        this.massFile = file.raw
        this.wrtChatbotData.massFileNm = file.name
        this.massFileNm = file.name
      }
    },
    /** 통신서비스 가입증명원 파일 삭제 */
    removeRegCertiFile() {
      this.regCertiFile = null
      this.wrtChatbotData.fileName = ''
      this.regCertiFileNm = ''
    },
    /** (대량) 엑셀파일 삭제 */
    removeMassFile() {
      this.massFile = null
      this.wrtChatbotData.massFileNm = ''
      this.massFileNm = ''
    },
    /** (대량) 샘플파일 다운로드 */
    downloadSampleFile() {
      let params = { fileName: '발신번호_대량등록_샘플.xlsx', fileNo: 0 }
      downloadFileDirect(params).then(() => {
        // success ... nothing to do
      }).catch(() => {
        this.$alertMsg('파일 다운로드 시 오류가 발생했습니다.')
      })
    },
    /** 통신가입 증명원 다운로드 */
    downloadRegCertiFile() {
      downloadRegCertiFile(this.brandId, this.chatbotData.chatbotId).then(res => {
        // 1. binary 데이터 -> blob로 변환
        const blob = new Blob([res.data], { type: res.headers['content-type'] })
        // 2. blob로 객체 URL을 생성
        const url = window.URL.createObjectURL(blob)
        const cd = res.headers['content-disposition']
        const index = cd.indexOf("filename*=UTF-8''") + "filename*=UTF-8''".length
        const filename = decodeURIComponent(cd.substring(index, cd.length))
        // 3. blob 객체 URL을 설정할 링크 생성
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
      })
    },
    /** 발신번호 중복 체크 */
    checkDuplicate() {
      if (jglib.isEmpty(this.wrtChatbotData.mdn)) {
        this.$alertMsg('발신번호를 입력해 주세요.').then(this.$refs.mdn.focus())
      } else {
        let params = { mdn: this.wrtChatbotData.mdn }
        isDuplicateMdn(this.brandId, params).then(res => {
          if (res.code === '20000000') {
            this.$alertMsg('사용가능한 발신번호 입니다.')
            this.mdnDupCheckFlag = true
          }
        }).catch((err) => {
          this.mdnDupCheckFlag = false
          this.$alertMsg(err.desc).then(() => { })
        })
      }
    },
    /** 데이터 검증 */
    async validation(isSave) {
      if (this.isMassReg) { // 대량등록 validation
        // 1. 대량등록 엑셀 파일
        if (jglib.isEmpty(this.massFile)) {
          this.$alertMsg('엑셀파일을 등록해 주세요.').then(this.$refs.massFile.$el.children[0].focus())
          return Promise.resolve(false)
        }
        // 2. 대량등록 통신가입증명원
        if (jglib.isEmpty(this.regCertiFile) && jglib.isEmpty(this.wrtChatbotData.fileName)) {
          this.$alertMsg('통신서비스 가입증명원 파일을 업로드해 주세요.').then(this.$refs.regCertiMassFile.$el.children[0].focus())
          return Promise.resolve(false)
        }
      } else { // 개별등록 validation
        // 1. 대화방명
        if (jglib.isEmpty(this.wrtChatbotData.subTitle)) {
          this.$alertMsg('대화방 명을 입력해 주세요.').then(this.$refs.subTitle.focus())
          return Promise.resolve(false)
        }
        // 2. 발신번호
        if (jglib.isEmpty(this.wrtChatbotData.mdn)) {
          this.$alertMsg('발신번호를 입력해 주세요.').then(this.$refs.mdn.focus())
          return Promise.resolve(false)
        }
        // 3. 발신번호: 중복체크
        if (!this.mdnDupCheckFlag) {
          this.$alertMsg('발신번호 중복체크를 진행해 주세요.').then(this.$refs.mdn.focus())
          return Promise.resolve(false)
        }
        // 4. 통신서비스 가입 증명원 업로드 여부(승인요청시 체크)
        if (!isSave && (jglib.isEmpty(this.regCertiFile) && jglib.isEmpty(this.wrtChatbotData.fileName))) {
          this.$alertMsg('통신서비스 가입증명원 파일을 업로드해 주세요.').then(this.$refs.refCertiFile.$el.children[0].focus())
          return Promise.resolve(false)
        }
        // 5. 승인완료 데이터의 경우 비전시로 변경한 경우
        if (!this.isNew && !isSave) {
          let originDisplay = this.chatbotData.display.substring(1, 2)
          let uptDisplay = this.wrtChatbotData.display.substring(1, 2)
          if ((originDisplay !== uptDisplay) && uptDisplay === '0') {
            let displayListCnt = await getActiveAndDisplayA2pChatbotCnt(this.brandId) // 승인완료 + 전시 상태 발신번호 목록
            let useSubNumCnt = await this.getSubNumChatbotCnt()
            if (displayListCnt > 1) { // 마지막 (승인완료 + 전시 상태의) 번호는 아님
              if (useSubNumCnt > 0) { // 마지막번호 X & 회신번호 O
                if (await this.$confirmMsg('선택한 발신번호는' + useSubNumCnt + '개의 양방향 대화방의<br>회신번호로 지정되어 있습니다.<br><br>함께 비전시 하시겠습니까?<br><br>(비전시 상태로 30일 유지 시 자동 삭제됩니다.)').then(() => { return true }).catch(() => { return false })) {
                  return Promise.resolve(true)
                } else return Promise.resolve(false)
              } else { // 마지막번호 X & 회신번호 X
                if (await this.$confirmMsg('확인 버튼을 누르실 경우,<br>해당 발신번호가 비전시 처리되며,<br>비전시 상태가 30일 이상 유지될 경우 자동으로 삭제됩니다.<br><br>비전시 하시겠습니까?').then(() => { return true }).catch(() => { return false })) {
                  return Promise.resolve(true)
                } else return Promise.resolve(false)
              }
            } else { // 마지막 (승인완료 + 전시) 번호의 경우
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
      return Promise.resolve(true)
    },
    /** 임시저장 */
    async save() {
      if (await this.validation(true)) {
        let data = this.getParameters('SAVED')
        let formData = new FormData()
        formData.append('data', JSON.stringify(data))
        formData.append('rcsCertiFile', !jglib.isEmpty(this.regCertiFile) ? this.regCertiFile : null)
        if (this.isNew) {
          addOnewayChatbot(this.brandId, formData).then(res => {
            if (res.code === '20000000') {
              this.$alertMsg('임시저장 되었습니다.').then(this.goList())
            }
          }).catch((err) => {
            this.$alertMsg(err.desc).then(() => {})
          })
        } else {
          updateOnewayChatbot(this.brandId, this.chatbotData.chatbotId, formData).then(res => {
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
        let msg = ''
        let action = ''
        if (this.isMassReg) {
          msg = '운영자 승인이 완료되면 발신번호를 사용할 수 있습니다.<br>발신번호를 등록 하시겠습니까?'
          action = 'APRV_NEW'
        } else {
          if (this.isNew) { // 신규
            msg = '운영자 승인이 완료되면 발신번호를 사용할 수 있습니다.<br>발신번호를 등록 하시겠습니까?'
            action = 'APRV_NEW'
          } else { // 기존 데이터 수정
            if (this.isSaved || !this.isAfterActive) { // 저장 or 미승인건
              action = 'APRV_NEW'
              msg = '운영자 승인이 완료되면 발신번호를 사용할 수 있습니다.<br>발신번호를 등록 하시겠습니까?'
            } else {
              let isModSubTitle = false
              let changeSubTitle = this.chatbotData.subTitle !== this.wrtChatbotData.subTitle
              if (this.isRejected) { // 반려
                if (this.isAfterActive) { // 기승인 반려건
                  if (changeSubTitle && this.chatbotData.mstSubTitle === this.wrtChatbotData.subTitle) {
                    isModSubTitle = false // 현재 화면에서 대화방명은 수정되었지만, 기존 승인된 데이터의 대화방명과 동일한 경우 -> 비승인수정
                  } else isModSubTitle = true
                } else isModSubTitle = changeSubTitle // 신규 반려건
              } else isModSubTitle = changeSubTitle // 그 외 상태
              action = 'APRV_MOD'
              if (isModSubTitle) msg = '운영자 승인이 완료되면 발신번호를 사용할 수 있습니다.<br>발신번호를 수정 하시겠습니까?' // 수정시 대화방명이 변경된 경우
              else msg = '확인 버튼을 누르면 변경하신 정보가 바로 반영됩니다.<br>승인 요청 하시겠습니까?'
            }
          }
        }
        this.$confirmMsg(msg).then(() => {
          if (!this.isMassReg) {
            let data = this.getParameters(action)
            let formData = new FormData()
            formData.append('data', JSON.stringify(data))
            if (!jglib.isEmpty(this.regCertiFile)) formData.append('rcsCertiFile', this.regCertiFile)
            if (this.isNew) { // 신규: post
              addOnewayChatbot(this.brandId, formData).then(res => {
                if (res.code === '20000000') this.goList()
              }).catch((err) => {
                this.$alertMsg(err.desc).then(() => {})
              })
            } else { // 기존 데이터 update: put
              updateOnewayChatbot(this.brandId, this.chatbotData.chatbotId, formData).then(res => {
                if (res.code === '20000000') this.goList()
              }).catch((err) => {
                this.$alertMsg(err.desc).then(() => {})
              })
            }
          } else { // 발신번호 대량등록
            let formData = new FormData()
            if (!this.isNew) formData.append('massRegSeq', this.chatbotData.massRegSeq)
            formData.append('rcsCertiFile', this.regCertiFile)
            formData.append('excelFile', this.massFile)
            addMassOnewayChatbot(this.brandId, formData).then((res) => {
              this.uploadResult = res
              this.showUploadResultPopup = true
            }).catch((err) => {
              this.$alertMsg(err.desc).then(() => {})
            })
          }
        })
      }
    },
    getParameters(action) {
      return {
        display: '0'.concat(this.displayYn),
        subTitle: this.wrtChatbotData.subTitle, // 대화방명
        mdn: this.wrtChatbotData.mdn, // 발신번호
        inputFieldYn: this.wrtChatbotData.inputFieldYn, // 메시지 입력란 입력가능 여부
        rcsReply: String(this.wrtChatbotData.rcsReply), // 대표번호 문자수신서비스 사용 여부
        action: action
      }
    },
    /** 삭제 */
    async remove() {
      if (this.isMassReg) {
        this.$confirmMsg(`총 <span style="color: red;">${this.wrtChatbotData.massRejectedCnt}</span>개의 발신번호를 삭제하시겠습니까?`).then(() => {
          let data = { massRegSeq: this.wrtChatbotData.massRegSeq }
          deleteMassChatbot(this.brandId, data).then(res => {
            if (res.code === '20000000') this.goList()
          }).catch((err) => {
            this.$alertMsg(err.desc).then(() => {})
          })
        })
      } else {
        if (this.isActive) { // 승인완료 상태의 발신번호를 삭제하는 경우
          let activeSendNumCnt = await getActiveA2pChatbotCnt(this.brandId)
          if (activeSendNumCnt > 1) {
            this.$confirmMsg('발신번호를 삭제 하시겠습니까?').then(async () => {
              let useSubNumCnt = await this.getSubNumChatbotCnt()
              if (useSubNumCnt > 0) { // 회신번호로 사용되는 번호인지 확인
                this.$confirmMsg('선택한 발신번호는 ' + useSubNumCnt + '개의 양방향 대화방의<br>회신번호로 지정되어 있습니다.<br>확인 버튼을 누르실 경우,<br>해당 양방향 대화방도 함께 삭제됩니다.<br><br>삭제 하시겠습니까?').then(() => {
                  this.deleteChatbot()
                })
              } else {
                this.deleteChatbot()
              }
            })
          } else { // 마지막 승인완료 발신번호
            this.$alertMsg('발신번호는 1개 이상 등록되어 있어야 합니다.<br>삭제할 수 없습니다.')
          }
        } else { // 승인완료 외의 상태 -> 바로 삭제
          this.$confirmMsg('발신번호를 삭제 하시겠습니까?').then(() => { this.deleteChatbot() })
        }
      }
    },
    /** 삭제 요청 */
    deleteChatbot() {
      let data = { chatbotId: this.wrtChatbotData.mdn }
      deleteChatbot(this.brandId, data).then(res => {
        if (res.code === '20000000') this.goList()
      }).catch((err) => {
        this.$alertMsg(err.desc).then(() => {})
      })
    },
    /** 회신번호 여부 체크 */
    async getSubNumChatbotCnt() {
      let res = await isSubNumChatbots(this.brandId, { chatbotIds: this.wrtChatbotData.mdn })
      if (res.code === '20000000') {
        let data = Object.values(res.result[0])
        return Promise.resolve(data[0])
      }
    },
    goBack() {
      if (!_.isEqual(this.chatbotData, this.wrtChatbotData)) {
        this.$confirmMsg('입력중인 정보가 있습니다.<br>취소하고 목록으로 이동 하시겠습니까?').then(() => { this.goList() })
      } else this.goList()
    },
    goList() {
      this.$router.push({ name: 'SendNumList', params: { brandId: this.brandId } })
    }
  }
}
</script>
<style scoped>
.textover {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
