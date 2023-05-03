<template>
  <div class="rcs_emul_form_step">
    <div>
      <h3 class="h3_title fs20 col_10" style="width: 83.2%; display: inline-block; vertical-align: bottom;">STEP 2. 대화방 설정(발신번호 정보 등록)</h3>
      <div class="bullet_btn_wrap btn_wrap" style="display: inline-block;">
        <GuideForPdf btnName="대화방 명 가이드" popupName="ChatbotSubTitleGuide"></GuideForPdf>
      </div>
    </div>
    <div class="title_area full_width NTlt mar_t10">사용자에게 메시지 발송 할 발신번호와 대화방 명을 등록하세요. 메시지 수신 후 대화방에서 확인 할 수 있습니다.</div>
    <div class="rcs_item_bundle mar_t20">
      <strong class="rcs_tit_bundle">대화방 명<span class="require">&nbsp;*</span></strong>
      <div class="rcs_cont_bundle">
        <span class="custom_input">
          <input type="text" ref="subTitle" @input="e => subTitle = e.target.value" v-model.trim="subTitle" maxlength="20" placeholder="문자 수신 시 발신번호 대신 표시되는 이름으로 신중하게 작성해주세요.">
        </span>
        <span class="count">({{ subTitle.length }}/20)</span>
      </div>
    </div>
    <div class="rcs_item_bundle">
      <strong class="rcs_tit_bundle">대표 발신번호<span class="require">*</span></strong>
      <div class="rcs_cont_bundle">
        <span class="custom_checkbox">
          <input type="checkbox" id="CS01" v-model="ceoSendFlag">
          <label for="CS01">전화번호와 동일</label>
        </span>
        <span class="custom_input short mar_l20">
          <input type="text" ref="tel" v-model="tel" readonly v-if="ceoSendFlag">
          <input type="text" ref="mdn" v-model="mdn" v-else maxlength="12">
        </span>
        <span class="custom_input_text">※ 휴대폰번호 등록 불가</span>
      </div>
    </div>
    <!-- <div class="title_area full_width NTlt mar_t40 mar_b10 pad_l25">해당 사항이 있는 경우에만 등록해주세요</div> -->
    <div class="rcs_item_bundle">
      <strong class="rcs_tit_bundle" style="margin-top: -8px">대표번호 문자수신<br>서비스 (SMS MO)</strong>
      <div class="rcs_cont_bundle">
        <span class="custom_checkbox">
          <input type="checkbox" id="rcsReply" true-value="0" false-value="1" v-model="rcsReply">
          <label for="rcsReply">사용중</label>
        </span>
        <div class="input_txt_area">※ 대표번호문자수신서비스(SMS MO) 를 사전에 신청하신 발신번호만 체크하세요.</div>
        <span class="info_txt_plus"><span class="info_txt_plus_icon">※</span>대표번호문자수신서비스(SMS MO) : 휴대폰 메시지함에서 기업의 대표번호로 문자를 보낼<br>경우 해당 메시지를 기업의 서버에서 수신할 수 있도록 제공하는 대표번호 부가 서비스</span>
      </div>
    </div>
    <div class="rcs_item_bundle">
      <strong class="rcs_tit_bundle">추가 발신번호</strong>
      <div class="rcs_cont_bundle" style="margin-top:2px;">
        <span class="custom_radio checked">
          <input type="radio" id="resist01" value="single" v-model="addSendFlag">
          <label for="resist01" @click="singleSend"><span>개별등록</span></label>
        </span>
        <span class="custom_radio checked">
          <input type="radio" id="resist02" value="multi" v-model="addSendFlag">
          <label for="resist02" @click="multiSend"><span>대량등록</span></label>
        </span>
        <div class="input_field_area dv2023_step2-addnum" v-if="addSendListFlag">
          <span class="text_desc mar_b12" v-if="addSendList === 0">
            추가발신번호가 있는 경우 버튼을 클릭하세요. 10개미만 등록 시 이용하세요.
            <strong>최대10개.</strong>
            <a href="javascript:void(0);" class="btn_more" @click="addSend" v-if="addSendList < 10"></a>
          </span>
          <span class="text_desc mar_b12" v-if="addSendList > 0">
            대표번호문자수신서비스를 사용하실 경우 체크박스에 체크 해주세요.
          </span>
          <div class="input_field_list_tit" v-if="addSendList > 0">
            <span style="width: 140px;">발신번호</span>
            <span style="width: 366px;">대화방 명</span>
            <span style="width: 100px;">메시지 입력란</span>
            <span style="width: 48px;">MO</span>
          </div>
          <ul>
            <li v-for="(item, index) in chatbotList" :key="index">
              <span class="custom_input">
                <input type="text" v-model.trim="item.mdn" placeholder="‘-’없이 입력" maxlength="12">
              </span>
              <span class="custom_input">
                <input type="text" v-model.trim="item.subTitle" placeholder="문자 수신 시 발신번호 대신 표시되는 이름입니다." maxlength="20">
              </span>
              <span class="custom_checkbox">
                <input type="checkbox" :id="`inputFieldYn${index}`" true-value="Y" false-value="N" v-model="item.inputFieldYn">
                <label :for="`inputFieldYn${index}`"></label>
              </span>
              <span class="custom_checkbox">
                <input type="checkbox" :id="`rcsReply${index}`" true-value="0" false-value="1" v-model="item.rcsReply">
                <label :for="`rcsReply${index}`"></label>
              </span>
              <a href="javascript:void(0);" class="btn_squre minus" @click="popSend(`${index}`)"></a>
            </li>
            <li>
              <a href="javascript:void(0);" class="btn_squre plus" @click="addSend" v-if="addSendList > 0 && addSendList < 10"></a>
            </li>
          </ul>
        </div>
        <div class="input_field_area" v-if="!addSendListFlag">
          <div class="box_add_file inline">
            <el-upload action="https://jsonplaceholder.typicode.com/posts/" :on-change="onSendFileChange" :file-list="sendFileList" :auto-upload="false" :show-file-list="false">
              <el-button type="primary" class="btn sml bd_black">파일선택</el-button>
            </el-upload>
            <a href="javascript:void(0);" class="btn_link mar_l12" v-show="!sendFileDescFlag" @click="sampleFileDown">
              <span>샘플파일 다운로드</span>
            </a>
            <span v-show="!sendFileDescFlag" class="text_desc add_file">파일형식 : xls, xlsx (최대 5MB)</span>
            <span v-show="sendFileDisplayFlag" class="text_desc add_file">
              {{ sendFileNm }}
              <a href="javascript:void(0);" class="btn_delete" @click="sendFileBeforeRemove">
                <span>삭제</span>
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="rcs_item_bundle">
      <strong class="rcs_tit_bundle">통신서비스 가입증명원<span class="require">&nbsp;*</span></strong>
      <div class="rcs_cont_bundle">
        <div class="box_add_file" style="margin-top:2px;">
          <el-upload action="https://jsonplaceholder.typicode.com/posts/" :on-change="onRegCertiFileChange" :file-list="regCertiFileList" :auto-upload="false" :show-file-list="false">
            <el-button type="primary" class="btn sml bd_black">파일선택</el-button>
          </el-upload>
          <span v-show="!regCertiFileDescFlag" class="text_desc add_file">파일형식 : jpg, png, pdf, tiff, zip (최대{{certiFileMaxSize}}MB)</span>
          <span v-show="regCertiFileDisplayFlag" class="text_desc add_file" style="display:none;">
            {{ regCertiFileNm }}
            <a href="javascript:void(0);" class="btn_delete" @click="regCertiFileBeforeRemove">
              <span>삭제</span>
            </a>
          </span>
        </div>
        <span class="info_txt_plus mar_t10"><span class="info_txt_plus_icon">※</span>모든 발신번호에 해당하는 각각의 "통신서비스 가입증명원"은 통신사에서 최근 1개월 이내 발행된 서류로 제출하세요.</span>
        <span class="info_txt_plus"><span class="info_txt_plus_icon">※</span>"발신번호 소유자"와 "가입 기업의 사업자"가 서로 다를 경우, 최근 6개월 이내 발급된 위탁 관련 서류를 제출하세요.(<a href="https://www.rcsbizcenter.com/cs/notice/6" target="_blank">https://www.rcsbizcenter.com/cs/notice/6</a>)</span>
      </div>
    </div>
  </div>
</template>

<script>
import { downloadFileDirect } from '@/api/common/code'
import GuideForPdf from '@/views/service/components/GuideForPdf'
export default {
  components: {
    GuideForPdf
  },
  props: {
    tel: {
      type: String
    },
    loadBrandInfo: {
      type: Object,
      require: false
    }
  },
  data() {
    return {
      mdn: '',
      subTitle: '',
      rcsReply: '1',
      addSendListFlag: true,
      chatbotList: [],
      ceoSendFlag: true,
      addSendFlag: 'single',

      sendFileList: [],
      sendFileNm: '',
      regCertiFileList: [],
      regCertiFileNm: ''
    }
  },
  computed: {
    // 값이 자주 변경됨에 따라, 관련되어 데이터 혹은 view가 바뀌어야 할 경우 사용
    // method를 바로 연결하면 tic 단위로 계속 실행되기 때문에, 값이 변경할 때만 수행되고,
    // cache로 남는 computed를 활용하는 것이 성능에 좋음
    sendFileDisplayFlag() {
      return !jglib.isEmpty(this.sendFileNm)
    },
    sendFileDescFlag() {
      return !jglib.isEmpty(this.sendFileNm)
    },
    regCertiFileDisplayFlag() {
      return !jglib.isEmpty(this.regCertiFileNm)
    },
    regCertiFileDescFlag() {
      return !jglib.isEmpty(this.regCertiFileNm)
    },
    addSendList() {
      return this.chatbotList.length
    },
    sendInfoData() {
      return {
        subTitle: this.subTitle,
        tel: this.ceoSendFlag ? this.tel : this.mdn
      }
    },
    certiFileMaxSize() {
      return !this.addSendListFlag ? 70 : 20
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
    loadBrandInfo: {
      // 불러오기 설정: BrandInfoSelector.vue
      deep: true,
      handler(brandInfo) {
        // 전화번호와 동일 체크 해제
        this.ceoSendFlag = false
        this.mdn = ''
        // 발신번호 명
        if (brandInfo.subTitle) {
          this.subTitle = brandInfo.subTitle
        }
        // 대표번호문자수신서비스
        if (brandInfo.rcsReply) {
          this.rcsReply = brandInfo.rcsReply
        }
        // 추가 발신번호 초기화
        this.setAddSendMode('single')
        // 통신서비스가입증명원 초기화
        this.regCertiFileRemove()
      }
    },
    chatbotList: {
      deep: true,
      handler() {
        for (let chatbot of this.chatbotList) {
          chatbot.mdn = chatbot.mdn.replace(/\D/g, '')
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
  mounted() {
    this.$emit('changeSendInfo', this.sendInfoData)
  },
  methods: {
    // .vue 내부에서 사용되는 함수를 정의한다.
    // 이벤트에 따라 실행하거나, 내부적으로 사용되는 함수들을 정의한다.
    keydownOnlyNum(e) {
      return jglib.keydownOnlyNum(e)
    },
    keyupOnlyNum(e) {
      jglib.keyupOnlyNum(e)
    },
    addSend() {
      this.chatbotList.push({ mdn: '', subTitle: '', inputFieldYn: 'Y', rcsReply: '1' })
    },
    popSend(idx) {
      this.chatbotList.splice(idx, 1)
    },
    singleSend() {
      if (this.addSendFlag !== 'single') {
        this.$confirmMsg('개별등록으로 변경하시면 개별등록 중인 데이터는 초기화 됩니다.개별등록으로 변경하시겠습니까?', '타이틀', '확인', '취소')
          .then(() => {
            this.setAddSendMode('single')
            this.regCertiFileRemove()
          })
          .catch(() => {
            this.addSendFlag = 'multi'
            this.addSendListFlag = false
          })
      }
    },
    multiSend() {
      if (this.addSendFlag !== 'multi') {
        this.$confirmMsg('대량등록으로 변경하시면 개별등록 중인 데이터는 초기화 됩니다.대량등록으로 변경하시겠습니까?', '타이틀', '확인', '취소')
          .then(() => {
            this.setAddSendMode('multi')
            this.regCertiFileRemove()
          })
          .catch(() => {
            this.addSendFlag = 'single'
            this.addSendListFlag = true
          })
      }
    },
    // 추가 발신번호 업로드 관련 함수
    onSendFileChange(file) {
      let files = file.raw
      let uploadCheck = jglib.checkFileData(files, ['xls', 'xlsx'], 5)
      if (uploadCheck.code === 'errorExt') {
        this.$alertMsg(uploadCheck.message)
      } else if (uploadCheck.code === 'errorSize') {
        this.$alertMsg(uploadCheck.message)
      } else {
        this.sendFileRemove()
        this.sendFileList.push(files)
        this.sendFileNm = file.raw.name
      }
    },
    setAddSendMode(mode) {
      if (mode === 'single') {
        this.addSendFlag = 'single'
        this.addSendListFlag = true
        this.chatbotList = []
        this.sendFileList = []
      } else if (mode === 'multi') {
        this.addSendFlag = 'multi'
        this.addSendListFlag = false
        this.chatbotList = []
        this.sendFileList = []
        this.sendFileNm = ''
      }
    },
    sendFileRemove() {
      this.sendFileList = []
      this.sendFileNm = ''
    },
    sendFileBeforeRemove() {
      this.$confirmMsg(`등록된 파일을 삭제 하시겠습니까?`)
        .then(() => {
          this.sendFileRemove()
        })
    },
    // 통신서비스 가입증명원 업로드 관련 함수
    onRegCertiFileChange(file) {
      let files = file.raw
      let uploadCheck = jglib.checkFileData(files, ['jpg', 'jpeg', 'png', 'pdf', 'tiff', 'zip'], this.certiFileMaxSize)
      if (uploadCheck.code === 'errorExt') {
        this.$alertMsg(uploadCheck.message)
      } else if (uploadCheck.code === 'errorSize') {
        this.$alertMsg(uploadCheck.message)
      } else {
        this.regCertiFileRemove()
        this.regCertiFileList.push(files)
        this.regCertiFileNm = file.raw.name
      }
    },
    regCertiFileRemove() {
      this.regCertiFileList = []
      this.regCertiFileNm = ''
    },
    regCertiFileBeforeRemove() {
      return this.$confirmMsg(`증명원 파일을 삭제 하시겠습니까?`)
        .then(() => {
          this.regCertiFileRemove()
        })
    },
    getSendInfo() {
      let sendFile
      let regCertiFile
      if (this.sendFileList.length > 0) {
        sendFile = this.sendFileList[0]
      }
      if (this.regCertiFileList.length > 0) {
        regCertiFile = this.regCertiFileList[0]
      }
      return {
        mdn: this.ceoSendFlag ? this.tel : this.mdn,
        subTitle: this.subTitle,
        rcsReply: this.rcsReply,
        chatbotList: this.chatbotList,
        massRegFile: sendFile,
        regCertiFile: regCertiFile
      }
    },
    validation() {
      if (this.ceoSendFlag) {
        if (jglib.isEmpty(this.tel)) {
          this.$alertMsg('대표발신번호를 입력해 주세요.')
          this.$refs.tel.focus()
          return false
        }
      } else {
        if (jglib.isEmpty(this.mdn)) {
          this.$alertMsg('대표발신번호를 입력해 주세요.')
          this.$refs.mdn.focus()
          return false
        }
      }
      if (jglib.isEmpty(this.subTitle)) {
        this.$alertMsg('대화방 명을 입력해 주세요.')
        this.$refs.subTitle.focus()
        return false
      }
      for (let i = 0; i < this.chatbotList.length; i++) {
        if (jglib.isEmpty(this.chatbotList[i].mdn) || jglib.isEmpty(this.chatbotList[i].subTitle)) {
          this.$alertMsg('발신번호와 대화방 명을 모두 입력하세요.')
          return false
        }
        if (this.ceoSendFlag && !jglib.isEmpty(this.tel) && this.chatbotList[i].mdn === this.tel) {
          this.$alertMsg('발신번호는 중복으로 등록 하실 수 없습니다.')
          return false
        } else if (!this.ceoSendFlag && !jglib.isEmpty(this.mdn) && this.chatbotList[i].mdn === this.mdn) {
          this.$alertMsg('발신번호는 중복으로 등록 하실 수 없습니다.')
          return false
        }
        for (let j = 0; j < this.chatbotList.length; j++) {
          if (i !== j && this.chatbotList[i].mdn === this.chatbotList[j].mdn) {
            this.$alertMsg('발신번호는 중복으로 등록 하실 수 없습니다.')
            return false
          }
        }
      }
      if (jglib.isEmpty(this.regCertiFileNm)) {
        this.$alertMsg('통신서비스 가입증명원을 업로드 해 주세요.')
        return false
      }
      this.chatbotListValidation()
      return true
    },
    chatbotListValidation() {
      for (let i = 0; i < this.chatbotList.length; i++) {
        if (jglib.isEmpty(this.chatbotList[i].mdn) && jglib.isEmpty(this.chatbotList[i].subTitle)) {
          this.chatbotList.splice(i, 1)
        }
      }
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
