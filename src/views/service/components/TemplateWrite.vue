<template>
  <div class="rcs_emul_form_wrap">
    <a href="javascript:void(0);" class="tmplt_gd_link btn_temp_info" @click="openGuidePopup">
      <span>템플릿 작성 안내</span>
    </a>
    <template-guide-popup v-if="view.visibleGuidePopup" :visible.sync="view.visibleGuidePopup"></template-guide-popup>
    <div class="rcs_emul_form_cont bd_no">
      <div>
        <div class="rcs_item_bundle">
          <strong class="rcs_tit_bundle p-l0">
            템플릿 ID
            <span class="require">*</span>
          </strong>
          <div class="rcs_cont_bundle">
            <span class="custom_input">
              <input type="text" ref="tplId" v-model="formData.tplId" @keyup="handleKyeEventTplId" @keydown="handleKeydownTplId" maxlength="40" :disabled="!isNewbie">
            </span>
            <!-- <span v-if="this.formData.modify" class="custom_input">
              <input type="text" ref="tplId" v-model="formData.tplId" @keyup="handleKyeEventTplId" @keydown="handleKeydownTplId" maxlength="40" :disabled="!isNewbie">
            </span>
            <span v-else class="custom_input">
              <input type="text" ref="tplId" v-model="formData.tplId1" @keyup="handleKyeEventTplId" @keydown="handleKeydownTplId" maxlength="40" disabled>
              <input type="text" ref="tplId2" v-model="formData.tplId2" maxlength="40" :disabled="!isNewbie">
            </span> -->
          </div>
        </div>
        <div class="rcs_item_bundle">
          <!-- <strong class="rcs_tit_bundle">
            템플릿 속성
            <span class="require">*</span>
          </strong> -->
          <!-- <div class="rcs_cont_bundle">
            <span class="custom_radio checked">
              <input type="radio" id="tempAttr01" v-model="formData.cardType" value="D" @click="changeCardType" ref="cardTypeD">
              <label for="tempAttr01">
                <span>서술(description)</span>
              </label>
            </span>
            <span class="custom_radio checked">
              <input type="radio" id="tempAttr02" v-model="formData.cardType" value="C" @click="changeCardType" ref="cardTypeC">
              <label for="tempAttr02">
                <span>스타일(cell)</span>
              </label>
            </span>
          </div>
        </div> -->
          <strong class="rcs_tit_bundle p-l0">
            템플릿 속성
            <span class="require">*</span>
          </strong>
          <div class="rcs_cont_bundle">
            <div class="rcs_cont_template_type">
              <span class="theme">{{ formData.cardThemeNm }}</span><span class="line02"></span>
              <span class="type">{{ formData.cardTypeNm }}</span>
            </div>
            <!-- <span class="custom_radio checked">
              <input type="radio" id="tempAttr01" v-model="formData.cardType" value="D" @click="changeCardType" ref="cardTypeD">
              <label for="tempAttr01">
                <span>서술(description)</span>
              </label>
            </span>
            <span class="custom_radio checked">
              <input type="radio" id="tempAttr02" v-model="formData.cardType" value="C" @click="changeCardType" ref="cardTypeC">
              <label for="tempAttr02">
                <span>스타일(cell)</span>
              </label>
            </span> -->
            <!-- 템플릿 속성 변경버튼 -->
            <!-- <div v-if="!this.formData.modify" class="rcs_cont_template_type_reselect" @click="changeTplThemeType()"><button type="button">변경</button></div> -->
            <!-- <div v-if="!this.formData.modify" style="margin-left: 50px;" @click="changeTplThemeType()"> 변경하기 </div> -->
          </div>
        </div>
        <!-- <div class="rcs_item_bundle">
          <strong class="rcs_tit_bundle">
            템플릿 속성
            <span class="require">*</span>
          </strong>
          <div class="rcs_cont_bundle">{{formData.cardTypeNmAlt1}}</div>
        </div> -->
        <!-- 타이틀 자유형일때 유형 선택 삭제 -->
        <div v-if="formData.cardTheme !== 'TA'" class="rcs_item_bundle">
          <strong class="rcs_tit_bundle p-l0">
            유형
            <span class="require">*</span>
          </strong>
          <div class="rcs_cont_bundle">
            <span class="custom_select">
              <select ref="tplBizSrv" v-model="formData.tplBizSrv" @change="changeTplBizSrv">
                <option value v-if="formData.tplBizSrv == ''">선택하시면 템플릿명 및 내용 입력이 가능합니다</option>
                <option v-for="(code, index) in view.tplBizSrvList" :key="`templateType_${index}`" :value="code.code">
                  {{ code.codeNm }}
                </option>
              </select>
            </span>
          </div>
        </div>
        <div class="rcs_item_bundle">
          <strong class="rcs_tit_bundle p-l0">
            템플릿 명
            <span class="require">*</span>
          </strong>
          <div class="rcs_cont_bundle">
            <span class="custom_input">
              <input
                v-if="formData.cardTheme !== 'TA'" type="text" id="tplNm"
                ref="tplNm" placeholder="템플릿명을 입력해 주세요." v-model="formData.tplNm" maxlength="30"
                :readonly="formData.tplBizSrv == '' && formData.cardTheme !== 'TA'" @input="calcText()"
                autocomplete="off"
              >
              <input
                v-else type="text" id="tplNm" ref="tplNm" placeholder="템플릿명을 입력해 주세요."
                v-model="formData.tplNm" maxlength="30" @input="calcText()"
                autocomplete="off"
              >
            </span>
            <span class="text_desc mar_l12">({{ tplNmLength }}/30자)</span>
          </div>
        </div>
      </div>
      <!-- 타이틀 자유형일 때 제목 입력하는 부분 start -->
      <message-base-ta-title
        ref="messageBaseTaTitle" v-if="formData.cardTheme === 'TA'"
        :jsonData.sync="jsonData" :inputTitle01.sync="formData.inputTitle01"
        :inputTitle02.sync="formData.inputTitle02" :ctn="templateCtn"
        :tplFormParams.sync="tplFormParams" :templateData="templateData"
        :computedJsonData.sync ="computedJsonData"
      >
      </message-base-ta-title>
      <!-- <div v-if="formData.cardTheme === 'TA'" class="rcs_item_bundle">
        <strong class="rcs_tit_bundle">제목<span class="require">*</span></strong>
        <div class="rcs_cont_bundle">
          <ul class="rcs_editor_list full_width">
            <li>
              <div class="box_radio_area">
                <span class="custom_radio single wide">
                  <input
                    v-model="taTitleInputType"
                    type="radio" name="radioType03" id="type01" value="wide"
                    :checked="taTitleInputType"
                    @click="changeRowType"
                  >
                  <label for="type02"></label>
                </span>
                <span class="custom_radio single double">
                  <input
                    v-model="taTitleInputType"
                    type="radio" name="radioType03" id="type02" value="double"
                    :checked="taTitleInputType"
                    @click="changeRowType"
                  >
                  <label for="type02"></label>
                </span>
              </div>
              <div class="box_input_area">
                <span class="custom_textarea">
                  <textarea
                    placeholder="text입력"
                    id="inputTitle01" ref="inputTitle01" v-model="formData.inputTitle01"
                  ></textarea>
                </span>
                <span v-if="taTitleInputType === 'double'" class="custom_textarea">
                  <textarea
                    placeholder="text입력"
                    id="inputTitle02" ref="inputTitle02" v-model="formData.inputTitle02"
                  ></textarea>
                </span>
              </div>
            </li>
          </ul>
        </div>
      </div> -->
      <!-- 타이틀 자유형일 때 제목 입력하는 부분  end-->
      <div class="rcs_item_bundle">
        <strong class="rcs_tit_bundle v_top p-l0">
          본문
          <span class="require">*</span>
        </strong>
        <message-base-description
          ref="messageBaseDescription" v-if="formData.cardType === 'D'"
          :jsonData.sync="jsonData" :inputText.sync="formData.inputText"
          :ctn="templateCtn" :readonly="formData.tplBizSrv == '' && formData.cardTheme !== 'TA'">
        </message-base-description>
        <message-base-cell ref="messageBaseCell" v-if="formData.cardType === 'C'"
        :jsonData.sync="jsonData" :tplBizSrv="formData.tplBizSrv" :cardTheme="formData.cardTheme" :orgnfmtstr="orgnfmtstr"
        :ctn="templateCtn" :inputCellText.sync="formData.inputCellText"></message-base-cell>
      </div>
      <message-base-suggestion ref="messageBaseSuggestion" :jsonData.sync="jsonData" :ctn="templateCtn" :cardTheme="formData.cardTheme"></message-base-suggestion>
      <div>
        <div class="rcs_item_bundle" v-if="formData.regDt">
          <strong class="rcs_tit_bundle p-l0">등록일</strong>
          <div class="rcs_cont_bundle">{{ formData.regDt }} / {{ formData.regUserNm }}</div>
        </div>
        <div class="rcs_item_bundle" v-if="isWaiting">
          <strong class="rcs_tit_bundle p-l0">승인요청일</strong>
          <div class="rcs_cont_bundle">{{ formData.aprvDt }} / {{ formData.aprvUserNm }}</div>
        </div>
        <!--  -->
        <div class="rcs_item_bundle" v-if="isWaiting">
          <strong class="rcs_tit_bundle p-l0">승인결과</strong>
        </div>
        <div class="rcs_item_bundle" v-if="isWaiting">
          <strong class="rcs_tit_bundle p-l0">{{ formData.aprvRetNm }}</strong>
          <div class="rcs_cont_bundle">
            {{ formData.aprvDt }}<span class="mar_l20">{{ formData.aprvRetDescr }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 2019.09.19 체크 라벨 상단 여백 .mar_t20 으로 수정 -->
    <span class="custom_checkbox mar_t20">
      <input type="checkbox" id="agree01" ref="agreYn" v-model="agreYn" true-value="Y" false-value="N">
      <label for="agree01">정보성 메시지만 보낼 수 있으며, 광고 등 정책에 위배되는 메시지 발송 시 템플릿 사용이 중지될 수 있음을 동의합니다.</label>
    </span>
    <!-- <div class="title_area" v-if="isWaiting">
      <h3 class="h3_title">승인결과</h3>
    </div>
    <div class="rcs_emul_form_cont" v-if="isWaiting">
      <div class="rcs_item_bundle">
        <strong class="rcs_tit_bundle">{{ formData.aprvRetNm }}</strong>
        <div class="rcs_cont_bundle">
          {{ formData.aprvDt }}
          <span class="mar_l20">{{ formData.aprvRetDescr }}</span>
        </div>
      </div>
    </div> -->
    <!-- 2019.09.19 버튼 색상  bd_blue(목록, 삭제), blue(저장), black(승인요청) 으로 수정 -->
    <div class="btn_wrap mar_t40 center full_width temWrite btn_flex first">
      <a href="javascript:void(0);" class="btn mid bd_blue" @click="goBack">이전</a>
      <a href="javascript:void(0);" class="btn mid bd_blue" v-if="!isNewbie && !isModRejected" @click="deleteTemplate">삭제</a> <!-- && !isAprved -->
      <a href="javascript:void(0);" class="btn mid bd_blue" v-if="isNewbie || isSaved" @click="openSaveConfirmPopup">임시저장</a>
      <a href="javascript:void(0);" class="btn mid bd_blue" v-if="canRollback" @click="cancleApplyTemplate">수정내용 삭제</a>
      <a href="javascript:void(0);" class="btn mid blue" :class="btn.aprv" v-if="isNewbie || isSaved || isRejected || isModRejected" @click="applyTemplate">승인요청</a>
      <a href="javascript:void(0);" class="btn mid blue" v-if="isAprved" @click="applyTemplate">승인요청</a>
    </div>
    <apply-confirm-popup
      v-if="view.visibleSavePopup"
      :visible.sync="view.visibleSavePopup"
      msg="임시저장은 작성하신 정보가 저장만 되는 기능입니다.<br>승인요청을 하셔야 심사 후 템플릿을 이용하실 수 있습니다."
      :saveBtnNm="saveBtnNm"
      @save="saveData"
      @apply="applyTemplate"
    />
  </div>
</template>

<script>
import MessageBaseDescription from '@/views/service/components/MessageBaseDescription'
import MessageBaseCell from '@/views/service/components/MessageBaseCell'
import MessageBaseSuggestion from '@/views/service/components/MessageBaseSuggestion'
import MessageBaseTaTitle from '@/views/service/components/MessageBaseTaTitle'
import TemplateGuidePopup from '@/views/service/components/TemplateGuidePopup'
import ApplyConfirmPopup from '@/components/popupSet/ApplyConfirmPopup'
import {
  retrieveMessageBaseForm,
  saveMessageBase,
  updateTemplateDetail,
  cancleApplyTemplate,
  deleteTemplate,
  retrieveTplBizSrvCode
} from '@/api/service/template'
import messageBaseFormUtils from '@/components/messageTemplate/js/MessageBaseFormUtils'

export default {
  name: 'TemplateWrite',
  props: {
    isNewbie: {
      type: Boolean,
      required: true
    },
    asisData: {
      type: Object
    },
    templateData: {
      type: Object,
      required: true
    },
    json: {
      type: Object,
      required: true
    },
    inputText: {
      type: String
    },
    inputTitle01: {
      type: String
    },
    inputTitle02: {
      type: String
    },
    computedJsonData: {
      type: Object
    }
  },
  components: {
    MessageBaseDescription,
    MessageBaseCell,
    MessageBaseSuggestion,
    TemplateGuidePopup,
    ApplyConfirmPopup,
    // CreateTemplateUnitChangePopup,
    MessageBaseTaTitle
  },
  data() {
    return {
      userCd: '',
      brandId: '',
      formData: {
        inputText: '',
        inputCellText: '',
        inputTitle01: '',
        inputTitle02: ''
      },
      btnStr: {},
      jsonData: {},
      orgnfmtstr: null, // 오리지날 fmtStr
      templateCtn: {},
      view: {
        visibleGuidePopup: false,
        tplBizSrvList: [],
        visibleSavePopup: false,
        tplIdPrefix: ''
      },
      templatePolicy: null,
      btn: {
        aprv: 'black'
      },
      agreYn: 'N',
      createTemplateUnitChangePopupVisible: false,
      strRegx: '',
      strArry: '',
      taTitleInputType: 'double',
      tplNmLength: 0,
      tplFormParams: [],
      saveBtnNm: ''
    }
  },
  computed: {
    // tplNmLength() {
    //   return this.formData.tplNm ? this.formData.tplNm.length : 0
    // },
    isWaiting() {
      return this.formData && (this.formData.status === 'APRV_NEW' || this.formData.status === 'APRV_MOD' || this.formData.status === 'DELETED') && (this.formData.aprvRet === 'REJECTED' || this.formData.aprvRet === 'WAITING')
    },
    isRejected() {
      const bool = this.formData && this.formData.activeYn === 'N' && this.formData.status === 'DELETED' && this.formData.aprvRet === 'REJECTED'
      if (bool) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.btn.aprv = 'blue'
      }
      return bool
    },
    isModRejected() {
      const bool = this.formData && this.formData.activeYn === 'Y' && this.formData.status === 'DELETED' && this.formData.aprvRet === 'REJECTED'
      if (bool) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.btn.aprv = 'black'
      }
      return bool
    },
    isSaved() {
      const bool = this.formData.aprvRet === 'SAVED'
      if (bool) {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.btn.aprv = 'black'
      }
      return bool
    },
    isAprved() {
      return this.formData.masterAprvRet === 'OK' && this.formData.aprvRet === 'OK'
    },
    canRollback() {
      return this.formData.masterAprvRet === 'OK' && this.formData.aprvRet === 'REJECTED' && this.formData.status === 'DELETED'
    }
    // tplId 2개로 나눠 놓은거 다시 합쳐야 함.
  },
  watch: {
    templateData: {
      immediate: true,
      handler(templateData, checked) {
        // console.log(_.differenceWith(templateData, checked))
        if (!checked) {
          // 왜 여기가 두 번 호출되는거지?
          this.formData = templateData
          this.view.tplIdPrefix = templateData.tplId.split('-')[0] + '-'
          if (!this.isNewbie) {
            this.retrieveMessageBaseFormByTplFormId()
          }
        }
      }
    },
    'formData.inputTitle01'(value) {
      // this.formData.inputTitle01 = value
      // this.strRegx = messageBaseFormUtils.getStrRegx(value)
      // this.strArry = messageBaseFormUtils.getVerification(value)
      this.$emit('update:inputTitle01', value)
    },
    'formData.inputTitle02'(value) {
      // this.formData.inputTitle02 = value
      // this.strRegx = messageBaseFormUtils.getStrRegx(value)
      // this.strArry = messageBaseFormUtils.getVerification(value)
      this.$emit('update:inputTitle02', value)
    },
    'formData.inputText'(v) {
    },
    'formData.inputCellText'(v) {
    }
  },
  created() {
    this.init()
    this.jsonData = this.json
    this.userCd = this.$store.state.user.userCd
    this.brandId = this.$store.getters.getBrandId
  },
  mounted() {
    if (this.formData.cardType === '') {
      this.changeTplThemeType()
    }
    if (this.formData.cardTheme === 'TA' && !this.templateData.aprvRet) {
      // this.formData.tplBizSrv = 'TA001'
      this.retrieveMessageBaseForm()
    }
    // json ok
  },
  methods: {
    init() {
      this.retrieveTplBizSrvCode()
    },
    retrieveTplBizSrvCode() {
      // 유형 목록 조회
      let params = {
        cardType: this.formData.cardType
      }
      retrieveTplBizSrvCode(params, this.formData.brandId)
        .then(res => {
          // 유형 목록 중 타이틀 자유형 제외
          if (this.formData.cardTheme === 'LE') {
            this.view.tplBizSrvList = res.result.filter(c => c.theme === 'LEGACY')
          } else if (this.formData.cardTheme === 'TA') {
            this.view.tplBizSrvList = res.result.filter(c => c.theme === 'THEME')
          } else {
            this.view.tplBizSrvList = res.result
          }
        })
    },
    changeCardType(e) {
      // 변경 확인 후 데이터 변경되어야 함
      let newVal = e.target.value
      let oldVal = this.formData.cardType
      if (newVal !== oldVal) {
        e.preventDefault()
        this.$confirmMsg('입력한 데이터가 초기화 됩니다. 템플릿 속성을 변경하시겠습니까?')
          .then(() => {
            // if (newVal === 'C') {
            //   this.$alertMsg('RCS Biz Center에서 제공하고 있는 스타일 템플릿은 해당 상품에 대한 이통3사의 약관 및 정책 검토로 추가 승인이 보류됨을 안내 드리오니 이용에 참조하시기 바랍니다.<br>서비스에 불편을 드려 죄송합니다.')
            // }
            this.formData.cardType = this
              .view.cardType = newVal
            this.fmtStrData = {}
            this.templateCtn = {}
            // this.retrieveMessageBaseForm()

            // 템플릿 명 초기화
            if (this.isNewbie) {
              this.formData.tplNm = ''
            }

            // IE11 에서 체크 상태가 노출되지 않는 오류 발생하여 추가
            this.$refs['cardType' + newVal].checked = true
            this.$refs['cardType' + oldVal].checked = false

            // 카드 타입 변경 시 유형 목록 조회
            this.retrieveTplBizSrvCode()
            this.formData.tplBizSrv = ''
          })
          .catch(() => {
            this.$refs['cardType' + oldVal].checked = true
            this.$refs['cardType' + newVal].checked = false
          })
          .finally(() => {
            this.formData.inputText = ''
            this.formData.inputTitle01 = ''
            this.formData.inputTitle02 = ''
            this.jsonData = {}
            this.$emit('update:json', this.jsonData)
          })
      }
    },
    changeTplBizSrv() {
      // 유형 변경 시
      this.retrieveMessageBaseForm()
    },
    retrieveMessageBaseForm() {
      // 템플릿 속성, 유형 변경 시 양식 조회
      if (jglib.isEmpty(this.formData.tplBizSrv)) {
        return false
      }
      let params = {
        cardSpec: this.formData.cardSpec,
        cardType: this.formData.cardType,
        tplBizSrv: this.formData.tplBizSrv
      }
      retrieveMessageBaseForm(this.formData.brandId, params)
        .then(res => {
          this.formData.tplFormId = res.result.info.tplFormId
          this.templateCtn = res.result.ctn
          this.btnStr = res.result.info.btnStr
          this.tplFormParams = res.result.params

          let fmt = JSON.parse(res.result.info.fmtStr)
          this.orgnfmtstr = _.cloneDeep(typeof fmt === 'string' ? JSON.parse(fmt) : fmt)
          // 양식 데이터와 템플릿 데이터를 조합
          let fmtStrData = messageBaseFormUtils.convertMessageBaseFormFmtStrToObj(res.result.info.fmtStr)

          if (this.formData.cardType === 'C') {
            if (this.formData.cardTheme === 'TA') {
              fmtStrData = messageBaseFormUtils.reformOpenrichcardCell(fmtStrData, this.formData.cardTheme)
            } else {
              fmtStrData = messageBaseFormUtils.reformOpenrichcardCell(fmtStrData, this.formData.cardTheme)
            }
          }
          this.jsonData = fmtStrData
          this.$emit('update:json', fmtStrData)
        })
        .catch(err => {
          console.log(err)
          this.$alert('등록된 양식이 없습니다.').then(() => {
            this.goList()
          })
        }
        )
    },
    retrieveMessageBaseFormByTplFormId() {
      let params = {
        cardSpec: this.formData.cardSpec,
        cardType: this.formData.cardType,
        tplBizSrv: this.formData.tplBizSrv
      }
      retrieveMessageBaseForm(this.formData.brandId, params)
        .then(res => {
          this.templateCtn = res.result.ctn
          let fmt = JSON.parse(res.result.info.fmtStr)
          this.orgnfmtstr = _.cloneDeep(typeof fmt === 'string' ? JSON.parse(fmt) : fmt)
          this.btnStr = res.result.info.btnStr
          // let themeFmtStrData = JSON.parse(res.result.info.fmtStr)
          // ==========================
          // if (this.formData.cardType === 'C') {
          //   let fmtStrData = messageBaseFormUtils.convertMessageBaseFormFmtStrToObj(res.result.info.fmtStr)
          //   fmtStrData = messageBaseFormUtils.reformOpenrichcardCell(fmtStrData)

          //   // 승인완료 상태이거나 한 번이라도 승인요청한 상태인지 체크
          //   // 위 두가지의 경우 입력하지 않은 셀은 모두 삭제한 상태이므로 셀을 다시 추가시켜준다.
          //   if (this.formData.masterAprvRet === 'OK') {
          //     // 승인완료 된 상태
          //     fmtStrData = messageBaseFormUtils.addCellMessageBaseFormToFormattedString(fmtStrData, this.jsonData)
          //   } else {
          //     if (this.jsonData.RCSMessage.openrichcardMessage.layout.children.find(c => c.widget === 'LinearLayout').children.length !==
          //       this.orgnfmtstr.RCSMessage.openrichcardMessage.layout.children.find(c => c.widget === 'LinearLayout').children.length) {
          //       // 한 번이라도 승인요청한 상태
          //       fmtStrData = messageBaseFormUtils.addCellMessageBaseFormToFormattedString(fmtStrData, this.jsonData)
          //     } else {
          //       fmtStrData = this.jsonData
          //     }
          //   }

          // ==========================
          if (this.formData.cardType === 'C' && this.formData.cardTheme === 'TA') {
            let fmtStrData = messageBaseFormUtils.convertMessageBaseFormFmtStrToObj(res.result.info.fmtStr)
            fmtStrData = messageBaseFormUtils.reformOpenrichcardCell(fmtStrData, this.formData.cardTheme)
            // 승인완료 상태이거나 한 번이라도 승인요청한 상태인지 체크
            // 위 두가지의 경우 입력하지 않은 셀은 모두 삭제한 상태이므로 셀을 다시 추가시켜준다.
            if (this.formData.masterAprvRet === 'OK') {
              // 승인완료 된 상태
              fmtStrData = messageBaseFormUtils.addCellMessageBaseFormToFormattedString(fmtStrData, this.jsonData, this.formData.cardTheme)
            } else {
              if (this.jsonData.RCSMessage.openrichcardMessage.layout.children[0].children[2].children.length !==
                this.orgnfmtstr.RCSMessage.openrichcardMessage.layout.children[0].children[2].children.length) {
                // 한 번이라도 승인요청한 상태
                fmtStrData = messageBaseFormUtils.addCellMessageBaseFormToFormattedString(fmtStrData, this.jsonData, this.formData.cardTheme)
              } else {
                fmtStrData = this.jsonData
              }
            }
            this.jsonData = fmtStrData
            this.$emit('update:json', fmtStrData)
          } else if (this.formData.cardType === 'C' && this.formData.cardTheme !== 'TA') {
            let fmtStrData = messageBaseFormUtils.convertMessageBaseFormFmtStrToObj(res.result.info.fmtStr)
            fmtStrData = messageBaseFormUtils.reformOpenrichcardCell(fmtStrData, this.formData.cardTheme)
            // 승인완료 상태이거나 한 번이라도 승인요청한 상태인지 체크
            // 위 두가지의 경우 입력하지 않은 셀은 모두 삭제한 상태이므로 셀을 다시 추가시켜준다.
            if (this.formData.masterAprvRet === 'OK') {
              // 승인완료 된 상태
              fmtStrData = messageBaseFormUtils.addCellMessageBaseFormToFormattedString(fmtStrData, this.jsonData)
            } else {
              if (this.jsonData.RCSMessage.openrichcardMessage.layout.children.find(c => c.widget === 'LinearLayout').children.length !==
                this.orgnfmtstr.RCSMessage.openrichcardMessage.layout.children.find(c => c.widget === 'LinearLayout').children.length) {
                // 한 번이라도 승인요청한 상태
                fmtStrData = messageBaseFormUtils.addCellMessageBaseFormToFormattedString(fmtStrData, this.jsonData)
              } else {
                fmtStrData = this.jsonData
              }
            }
            this.jsonData = fmtStrData
            this.$emit('update:json', fmtStrData)
          }
        })
        .catch()
    },
    goList() {
      let router = {
        name: 'TemplateList',
        params: { brandId: this.formData.brandId }
      }
      this.$router.push(router)
    },
    goBack() {
      let msg = `작성중인 내용을 취소하고 템플릿 ${this.isNewbie ? '선택' : '목록'}화면으로 이동합니다.`
      this.$confirmMsg(msg).then(() => {
        let router = {
          name: this.isNewbie ? 'CreateTemplateUnitSelectTheme' : 'TemplateList',
          params: { brandId: this.formData.brandId }
        }
        this.$router.push(router)
      })
    },
    deleteTemplate() {
      this.$confirmMsg('템플릿을 삭제하시겠습니까?').then(() => {
        let data = {
          oldTplId: this.formData.oldTplId
        }
        deleteTemplate(this.formData.brandId, data)
          .then(() => {
            this.goList()
          })
          .catch(err => {
            this.$alertMsg(err.desc)
          })
      })
    },
    cancleApplyTemplate() {
      this.$confirmMsg('요청하셨던 템플릿 수정 승인요청을 취소하시겠습니까?<br/>확인 선택 시 수정 하셨던 내용은 삭제됩니다.')
        .then(() => {
          cancleApplyTemplate(this.templateData.brandId, this.templateData.tplId)
            .then(() => {
              this.$alertMsg('저장되었습니다.').then(() => {
                this.$router.go()
              })
            })
            .catch(err => {
              this.$alertMsg(err.desc)
            })
        })
    },
    saveData() {
      if (this.isNewbie) {
        this.addTemplate()
      } else {
        this.saveTemplate()
      }
    },
    addTemplate() {
      let _json = _.cloneDeep(this.jsonData)
      this.$refs.messageBaseSuggestion.voidReformSuggestionForRequest(_json)
      if (this.formData.cardTheme === 'TA') {
        let tempFmtStr = _json
        let tempBtnStr = JSON.parse(this.btnStr)
        // title1 값이 있으면 치환
        if (this.formData.inputTitle01.length !== 0 || this.formData.inputTitle01 !== undefined) {
          tempFmtStr.RCSMessage.openrichcardMessage.layout.children[0].children[0].children[0].text = this.formData.inputTitle01
        }
        // title2 값이 있으면 치환
        if (this.formData.inputTitle02.length !== 0 || this.formData.inputTitle02 !== undefined) {
          tempFmtStr.RCSMessage.openrichcardMessage.layout.children[0].children[0].children[1].text = this.formData.inputTitle02
        }
        let btnSize = tempFmtStr.RCSMessage.openrichcardMessage.suggestions.length
        tempBtnStr.children[0].visibility = 'gone'
        tempBtnStr.children[1].visibility = 'gone'
        for (let i = 0; i < btnSize; i++) {
          // 버튼스트링 치환
          tempBtnStr.children[i].click = tempFmtStr.RCSMessage.openrichcardMessage.suggestions[i]
          // displayText 치환
          tempBtnStr.children[i].text = tempFmtStr.RCSMessage.openrichcardMessage.suggestions[i].action.displayText
          // visible 처리
          tempBtnStr.children[i].visibility = 'visible'
        }
        tempFmtStr.RCSMessage.openrichcardMessage.layout.children[0].children[3] = tempBtnStr
        // suggestions 삭제
        delete tempFmtStr.RCSMessage.openrichcardMessage.suggestions
        _json = tempFmtStr
      }
      this.formData.fmtStr = JSON.stringify(_json)
      this.formData['aprvRet'] = 'SAVED'
      if (this.$store.state.user.userType === 'AGENCY') {
        this.formData['agencyId'] = this.$store.state.user.corpId
      }
      this.formData.params = this.getParam()
      this.formData.fmtStr = this.formData.fmtStr.split('{{title1}}').join(this.formData.inputTitle01)
      if (this.templateData.inputTitle02 !== 'N') {
        this.formData.fmtStr = this.formData.fmtStr.split('{{title2}}').join(this.formData.inputTitle02)
      } else {
        this.formData.fmtStr = this.formData.fmtStr.split('{{title2}}').join(' ')
      }
      saveMessageBase(this.formData.brandId, this.formData)
        .then(res => {
          this.$alertMsg('저장되었습니다.').then(() => {
            this.goList()
          })
        })
        .catch(err => {
          this.$alertMsg(err.desc)
        })
    },
    saveTemplate() {
      let _json = _.cloneDeep(this.jsonData)
      this.$refs.messageBaseSuggestion.voidReformSuggestionForRequest(_json)
      // 타이틀 자유형일 때
      if (this.formData.cardTheme === 'TA') {
        let tempFmtStr = _json
        let tempBtnStr = JSON.parse(this.btnStr)
        // title1 값이 있으면 치환
        if (this.formData.inputTitle01.length !== 0 || this.formData.inputTitle01 !== undefined) {
          tempFmtStr.RCSMessage.openrichcardMessage.layout.children[0].children[0].children[0].text = this.formData.inputTitle01
        }
        // title2 값이 있으면 치환
        if (this.formData.inputTitle02.length !== 0 || this.formData.inputTitle02 !== undefined) {
          tempFmtStr.RCSMessage.openrichcardMessage.layout.children[0].children[0].children[1].text = this.formData.inputTitle02
        }
        let btnSize = tempFmtStr.RCSMessage.openrichcardMessage.suggestions.length
        tempBtnStr.children[0].visibility = 'gone'
        tempBtnStr.children[1].visibility = 'gone'
        for (let i = 0; i < btnSize; i++) {
          // 버튼스트링 치환
          tempBtnStr.children[i].click = tempFmtStr.RCSMessage.openrichcardMessage.suggestions[i]
          // displayText 치환
          tempBtnStr.children[i].text = tempFmtStr.RCSMessage.openrichcardMessage.suggestions[i].action.displayText
          // visible 처리
          tempBtnStr.children[i].visibility = 'visible'
        }
        tempFmtStr.RCSMessage.openrichcardMessage.layout.children[0].children[3] = tempBtnStr
        // suggestions 삭제
        delete tempFmtStr.RCSMessage.openrichcardMessage.suggestions
        _json = tempFmtStr
      }
      this.formData.fmtStr = JSON.stringify(_json)

      this.formData['aprvRet'] = 'SAVED'
      this.formData.params = this.getParam()
      updateTemplateDetail(this.formData.brandId, this.formData)
        .then(() => {
          this.$alertMsg('저장되었습니다.').then(() => {
            this.goList()
          })
        })
        .catch(err => {
          this.$alertMsg(err.desc)
        })
    },
    applyTemplate() {
      if (!this.validateTemplate('apply')) {
        return false
      }

      if (this.formData.cardType === 'C' && this.formData.masterAprvRet === 'OK' && this.formData.aprvRet === 'OK' && this.asisData) {
        let _json = _.cloneDeep(this.jsonData)
        messageBaseFormUtils.voidRemoveWidgetPolicy(_json)
        this.$refs.messageBaseCell.voidRemoveNotUsedTextview(_json)
        this.$refs.messageBaseSuggestion.voidReformSuggestionForRequest(_json)
        if (_.isEqual(this.asisData, _json)) {
          this.$alertMsg('기존 정보와 동일합니다. 수정 후 요청해주세요.')
          return false
        }
      }

      let message = '운영자 승인이 완료되면 템플릿을 발송할 수 있습니다.<br/>승인요청 하시겠습니까?'
      // if (this.formData.masterAprvRet === 'OK') {
      //   message = '템플릿을 수정하시기 전에 기존 템플릿에 맞춘 발송 내역이 존재하는지 꼭 확인 관리하시기 바랍니다.<br/>(기존 발송과 형식이 맞지 않을 경우 오류가 발생할 수 있습니다.)'
      // }
      this.$confirmMsg(message).then(() => {
        // 클론 데이터 생성
        let _json = _.cloneDeep(this.jsonData)
        // 버튼 화면 관리 목적으로 넣은 type 삭제
        this.$refs.messageBaseSuggestion.voidReformSuggestionForRequest(_json)

        // cell인 경우 사용하지 않는 Row 삭제
        if (this.formData.cardType === 'C') {
          this.$refs.messageBaseCell.voidRemoveNotUsedTextview(_json)
        }

        if (this.formData.cardTheme === 'TA' && this.formData.cardType === 'C') {
          // 승인요청 하기 전 WidgetPolicy 를 삭제 title widget 과 cell widget 삭제
          messageBaseFormUtils.tatitlevoidRemoveWidgetPolicy(_json)
          messageBaseFormUtils.tavoidRemoveWidgetPolicy(_json)
        } else {
          messageBaseFormUtils.voidRemoveWidgetPolicy(_json)
        }

        // 파라미터 정보 저장
        this.formData.params = this.getParam()
        // 타이틀 자유형일 때
        if (this.formData.cardTheme === 'TA') {
          let tempFmtStr = _json
          let tempBtnStr = JSON.parse(this.btnStr)
          // title1 값이 있으면 치환
          if (this.formData.inputTitle01.length !== 0 || this.formData.inputTitle01 !== undefined) {
            tempFmtStr.RCSMessage.openrichcardMessage.layout.children[0].children[0].children[0].text = this.formData.inputTitle01
          }
          // title2 값이 있으면 치환
          if (this.formData.inputTitle02.length !== 0 || this.formData.inputTitle02 !== undefined) {
            tempFmtStr.RCSMessage.openrichcardMessage.layout.children[0].children[0].children[1].text = this.formData.inputTitle02
          }
          let btnSize = tempFmtStr.RCSMessage.openrichcardMessage.suggestions.length
          tempBtnStr.children[0].visibility = 'gone'
          tempBtnStr.children[1].visibility = 'gone'
          for (let i = 0; i < btnSize; i++) {
            // 버튼스트링 치환
            tempBtnStr.children[i].click = tempFmtStr.RCSMessage.openrichcardMessage.suggestions[i]
            // displayText 치환
            tempBtnStr.children[i].text = tempFmtStr.RCSMessage.openrichcardMessage.suggestions[i].action.displayText
            // visible 처리
            tempBtnStr.children[i].visibility = 'visible'
          }
          tempFmtStr.RCSMessage.openrichcardMessage.layout.children[0].children[3] = tempBtnStr
          // suggestions 삭제
          delete tempFmtStr.RCSMessage.openrichcardMessage.suggestions
          _json = tempFmtStr
        }
        this.formData.fmtStr = JSON.stringify(_json)
        this.formData['aprvRet'] = 'WAITING'

        if (this.isNewbie) {
          if (this.$store.state.user.userType === 'AGENCY') {
            // 등록자가 대행사인 경우 아이디 입력
            this.formData['agencyId'] = this.$store.state.user.corpId
          }
          saveMessageBase(this.formData.brandId, this.formData)
            .then(() => {
              this.$alertMsg('승인 요청되었습니다.').then(() => {
                this.goList()
              })
            })
            .catch(err => {
              this.$alertMsg(err.desc)
            })
        } else {
          updateTemplateDetail(this.formData.brandId, this.formData)
            .then(res => {
              this.$alertMsg('승인 요청되었습니다.').then(() => {
                this.goList()
              })
            })
            .catch(err => {
              this.$alertMsg(err.desc)
            })
        }
      })
    },
    getParam() {
      let params = []
      if (this.formData.cardType === 'C') {
        if (this.formData.cardTheme === 'TA') {
          // 타이틀 자유형 셀일 때 파람에 타이틀 추가
          let tempparams = this.$refs.messageBaseCell.getParamInfo()
          // 타이틀 자유형 셀 일 경우 title의 param을 배열 가장 앞에 추가. 뒤에 놓으면 중복체크해서 사라짐.
          let titleParamCheck = this.$refs.messageBaseTaTitle.getParamInfo()
          if (tempparams !== undefined && titleParamCheck !== undefined) {
            tempparams.unshift(this.$refs.messageBaseTaTitle.getParamInfo()[0])
          }
          params = tempparams
          for (let obj of params) {
            if (obj.paramNm.toUpperCase() === 'DESCRIPTION') {
              return 'description'
            }
          }
        } else {
          // 타이틀 선택형 셀일 때
          params = this.$refs.messageBaseCell.getParamInfo()
          for (let obj of params) {
            if (obj.paramNm.toUpperCase() === 'DESCRIPTION') {
              return 'description'
            }
          }
        }
      } else {
        if (this.formData.cardTheme === 'TA') {
          let tempparams = this.$refs.messageBaseDescription.getParamInfo()
          // 타이틀 자유형 서술일 때 타이틀 추가
          let titleParamCheck = this.$refs.messageBaseTaTitle.getParamInfo()
          if (tempparams !== undefined && titleParamCheck !== undefined) {
            tempparams.push(this.$refs.messageBaseTaTitle.getParamInfo()[0])
          }
          params = tempparams
        } else {
          // 타이틀 선택형 서술일때
          params = this.$refs.messageBaseDescription.getParamInfo()
        }
      }

      // description 변수 사용 할 수 없음
      const suggestions = messageBaseFormUtils.getParamsFromSuggestion(this.jsonData)
      for (let obj of suggestions) {
        if (obj.paramNm.toUpperCase() === 'DESCRIPTION') {
          return 'description'
        }
      }
      params = params.concat(suggestions)

      // 중복되는 변수가 있음
      // 중복되는 변수를 삭제하기 때문에 타이틀2도 날아감...
      const uniqParams = _.uniqBy(params, (o) => o.paramNm.toUpperCase())
      // if (params.length != uniqParams.length) {
      //   return "unique"
      // }

      // for (let i = 0; i < Object.keys(params).length; i++) {
      //   params = jglib.uniqBy(params, 'paramNm')
      // }
      return uniqParams
    },
    // template data validation
    validateTemplate(validTyep) {
      if (jglib.isEmpty(this.formData.tplId) || this.formData.tplId.length < 16) {
        this.$alertMsg('템플릿 ID를 입력해 주세요.').then(() => {
          this.$refs.tplId.focus()
        })
        return false
      }

      if (jglib.isEmpty(this.formData.tplBizSrv) && this.formData.cardTheme !== 'TA') {
        this.$alertMsg('유형을 선택해 주세요.').then(() => {
          this.$refs.tplBizSrv.focus()
        })
        return false
      }

      if (jglib.isEmpty(this.formData.tplNm)) {
        this.$alertMsg('템플릿명을 입력해 주세요.').then(() => {
          this.$refs.tplNm.focus()
        })
        return false
      }
      // 타이틀 자유형일 때 타이틀 유효성 검사!
      if (this.formData.cardTheme === 'TA') {
        if (!this.$refs.messageBaseTaTitle.validateData()) {
          return false
        }
      }
      if (this.formData.cardTheme === 'TA' && this.formData.cardType === 'D') {
        if (!this.$refs.messageBaseDescription.validateData()) {
          return false
        }
      } else if (this.formData.cardTheme === 'TA' && this.formData.cardType === 'C') {
        if (!this.$refs.messageBaseCell.validateData()) {
          return false
        }
      }
      // BP_TPL_CTN.MAX_DESCR_SIZE에 잔여글자수를 표기하기 위해 계산. FORM_CTN의 MAX_DESCR_SIZE에서 이 값을 빼준다.
      let contentSize = 90
      if (this.formData.cardType === 'D') {
        if (!this.$refs.messageBaseDescription.validateData()) {
          return false
        }
        contentSize = this.$refs.messageBaseDescription.getFixedLength()
        contentSize = 0 // 서술형은 잔여글자수가 항상 90
      } else if (this.formData.cardType === 'C') {
        if (!this.$refs.messageBaseCell.validateData()) {
          return false
        }
        contentSize = this.$refs.messageBaseCell.getFixedLength()
      }
      this.formData.contentSize = contentSize

      // 버튼 validation
      if (!this.$refs.messageBaseSuggestion.validateData()) {
        return false
      }

      if (!this.$refs.messageBaseSuggestion.validateTempSave()) {
        return false
      }

      // 파라미터 정보 확인
      const param = this.getParam()
      if (typeof param === 'string') {
        if (param === 'description') {
          this.$alertMsg(`'description'은 변수명으로 사용이 불가합니다.`)
          return false
        }
        if (param === 'unique') {
          this.$alertMsg('중복되는 변수명이 있습니다.')
          return false
        }
      }

      if (!this.agreYn || this.agreYn === 'N') {
        this.$alertMsg('필수 동의를 확인해 주세요.').then(() => {
          this.$refs.agreYn.focus()
        })
        return false
      }
      return true
    },
    // 팝업 --------------------------------------------------------
    openSaveConfirmPopup() {
      // 저장
      this.saveBtnNm = this.isNewbie ? '임시저장' : '확인'
      if (!this.validateTemplate('save')) {
        return false
      }
      this.view.visibleSavePopup = true
    },
    openGuidePopup() {
      this.view.visibleGuidePopup = true
    },
    // 템플릿 키 이벤트 ---------------------------------------------
    handleKyeEventTplId(e) {
      let value = e.target.value
      if (!value.startsWith(this.view.tplIdPrefix)) {
        e.target.value = this.view.tplIdPrefix
        return false
      }
      let values = e.target.value.split('-')
      values[1] = values[1].replace(/[^a-zA-Z|0-9]/g, '')
      e.target.value = values.join('-')
    },
    handleKeydownTplId(e) {
      let key = e.which ? e.which : event.keyCode
      let actionkeyList = [8, 9, 37, 38, 39, 40, 46]
      if (e.target.value.length < 15) {
        event.returnValue = false
        e.preventDefault()
      } else if (
        !(key >= 65 && key <= 90) &&
        !(!e.shiftKey && key >= 48 && key <= 57) &&
        !(key >= 96 && key <= 105) &&
        actionkeyList.indexOf(key) === -1 &&
        !e.ctrlKey
      ) {
        event.returnValue = false
        e.preventDefault()
      }
    },
    changeTplThemeType() {
      this.$router.push({
        name: 'CreateTemplateUnitSelectTheme',
        params: { brandId: this.formData.brandId }
      })
    },
    tplThemeTypeFromPopup (data) {
      this.tplThemeType = data
      this.tplThemeType.cardType = this.tplThemeType.cardType.slice(-1)
      const cardTheme = this.tplThemeType.cardTheme
      const cardType = this.tplThemeType.cardType
      // const cardTheme = this.$store.getters.getCreateTpl.theme
      // const cardType = this.$store.getters.getCreateTpl.type
      if (cardTheme === undefined || cardType === undefined) {
        this.formData.cardTheme = ''
        this.formData.cardType = ''
        this.formData.cardThemeNm = ''
        this.formData.cardTypeNm = ''
      } else {
        this.formData.cardTheme = cardTheme
        this.formData.cardType = cardType
        this.formData.cardThemeNm = cardTheme === 'LE' ? '타이틀 선택형' : '타이틀 자유형'
        this.formData.cardTypeNm = cardType === 'D' ? '서술형(description)' : '스타일(cell)'
      }
      // 테마 변경했을때 유형 초기화
      if (this.formData.cardTheme === 'LE') {
        this.formData.tplBizSrv = ''
      } else if (this.formData.cardTheme === 'TA') {
        this.formData.tplBizSrv = 'TA001'
      }
      if (this.formData.cardTheme === 'TA') {
        this.retrieveMessageBaseForm()
      }
      // let newVal = e.target.value
      let oldVal = this.formData.cardType
      // e.preventDefault()
      this.formData.cardType = this.view.cardType = oldVal
      this.fmtStrData = {}
      this.templateCtn = {}
      if (this.isNewbie) {
        this.formData.tplNm = ''
      }
      // 카드 타입 변경 시 유형 목록 조회
      this.retrieveTplBizSrvCode()
      this.formData.tplBizSrv = ''
      this.formData.inputText = ''
      this.formData.inputTitle01 = ''
      this.formData.inputTitle02 = ''
      this.jsonData = {}
      this.$emit('update:json', this.jsonData)
    },
    calcText() {
      this.tplNmLength = document.getElementById('tplNm').value
      this.calcLength(this.tplNmLength)
    },
    calcLength(text) {
      this.tplNmLength = text.split(/{{.*?}}/).join('').length
    }
  }
}
</script>
