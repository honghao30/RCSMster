<template>
  <!-- 템플릿 신규 -->
  <div class="rcs_container service_wrap">
    <article id="content" class="content">
      <div class="box_breadcrumb">
        <breadcrumb :depth1MenuId="'M0200'" :depth2MenuId="'M0201'" :depth3MenuId="'템플릿 관리'"/>
      </div>
      <brand-top active="template" :brandId="brandId"></brand-top>
      <div class="dashboard_wrap">
        <section class="section">
          <div class="title_area" :class=" bullet_list ? 'mar_b20 inline pad_b20 br_bottom' : 'mar_b20 inline pad_b20 br_bottom'">
            <!-- <h3 class="h3_title mar_l400" v-html="procTitle"/> -->
            <h3 class="h3_title" v-html="procTitle"/>
            <div v-html="procDesc"/>
          </div>
          <div class="rcs_bundle_wrap">
            <template-write
              v-if="modify || (ready && isWriteMode)"
              :isNewbie="isNewbie"
              :templateData.sync="templateData"
              :json.sync="fmtStrData"
              :asisData="asisData"
              :computedJsonData.sync="computedJsonData"
            ></template-write>
            <template-view
              v-if="!modify && !isWriteMode" :templateData.sync="templateData"
              :brandId="brandId" :modify.sync="modify"
              @getAgdTplData='getAgdTplData'
            ></template-view>
            <!-- <div class="rcs_emul_form_wrap">
              <a href="javascript:void(0);" class="btn_link btn_temp_info" @click="openGuidePopup">
                <span>템플릿 작성 안내</span>
              </a>
              <template-guide-popup v-if="view.visibleGuidePopup" :visible.sync="view.visibleGuidePopup"></template-guide-popup>
              <div class="rcs_emul_form_cont">
                <div class="rcs_item_bundle">
                  <strong class="rcs_tit_bundle">
                    템플릿 ID
                    <span class="require">*</span>
                  </strong>
                  <div class="rcs_cont_bundle">
                    <span class="custom_input">
                      <input type="text" ref="tplId" v-model="formData.tplId" @keyup="handleKyeEventTplId" @keydown="handleKeydownTplId" maxlength="40">
                    </span>
                  </div>
                </div>
                <div class="rcs_item_bundle">
                  <strong class="rcs_tit_bundle">
                    템플릿 속성
                    <span class="require">*</span>
                  </strong>
                  <div class="rcs_cont_bundle">
                    <span class="custom_radio checked">
                      <input type="radio" id="tempAttr01" v-model="view.cardType" value="D" @click="changeCardType" ref="cardTypeD">
                      <label for="tempAttr01">
                        <span>서술(description)</span>
                      </label>
                    </span>
                    <span class="custom_radio checked">
                      <input type="radio" id="tempAttr02" v-model="view.cardType" value="C" @click="changeCardType" ref="cardTypeC">
                      <label for="tempAttr02">
                        <span>스타일(cell)</span>
                      </label>
                    </span>
                  </div>
                </div>
                <div class="rcs_item_bundle">
                  <strong class="rcs_tit_bundle">
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
                  <strong class="rcs_tit_bundle">
                    템플릿명
                    <span class="require">*</span>
                  </strong>
                  <div class="rcs_cont_bundle">
                    <span class="custom_input">
                      <input type="text" ref="tplNm" placeholder="템플릿명을 입력해 주세요." v-model="formData.tplNm" maxlength="30" :readonly="formData.tplBizSrv == ''">
                    </span>
                    <span class="text_desc mar_l12">({{ formData.tplNm.length }}/30자)</span>
                  </div>
                </div>
                <div class="rcs_item_bundle">
                  <strong class="rcs_tit_bundle v_top">
                    내용
                    <span class="require">*</span>
                  </strong>
                  <message-base-description ref="messageBaseDescription" v-if="formData.cardType === 'D'"  :jsonData.sync="fmtStrData" :inputText.sync="formData.inputText" :readonly="formData.tplBizSrv == ''"/>
                  <message-base-cell ref="messageBaseCell" v-if="formData.cardType === 'C'" :tplBizSrv="formData.tplBizSrv" :jsonData.sync="fmtStrData" :orgnfmtstr="orgnfmtstr"/>
                </div>
                <message-base-suggestion ref="messageBaseSuggestion" :jsonData.sync="fmtStrData" :ctn="templateCtn"/>
              </div>
              <span class="custom_checkbox mar_t20">
                <input type="checkbox" id="agree01" ref="agreYn" v-model="formData.agreYn" true-value="Y" false-value="N">
                <label
                  for="agree01"
                >정보성 메시지만 보낼 수 있으며, 광고 등 정책에 위배되는 메시지 발송 시 템플릿 사용이 중지될 수 있음을 동의합니다.</label>
              </span>
              <div class="btn_wrap mar_t40 center full_width">
                <a href="javascript:void(0);" class="btn mid bd_blue" @click="cancel">취소</a>
                <a href="javascript:void(0);" class="btn mid blue" @click="openSaveConfirmPopup">저장</a>
                <a href="javascript:void(0);" class="btn mid black" @click="apply">승인요청</a>
              </div>
            </div> -->
            <!-- 스크롤시 고정-->
            <template-emulator :cardType="templateData.cardType" :jsonData="computedJsonData"
              :cardTheme="templateData.cardTheme"
            ></template-emulator>
          </div>
        </section>
      </div>
    </article>
  </div>
</template>

<script>
import BrandTop from '@/views/service/components/BrandTop'
import TemplateEmulator from '@/views/service/components/TemplateEmulator'
import TemplateWrite from '@/views/service/components/TemplateWrite'
import TemplateView from '@/views/service/components/TemplateView'
import { retrieveTemplateId, retrieveTemplateDetail } from '@/api/service/template'
import Breadcrumb from '@/components/global/Breadcrumb'
import messageBaseFormUtils from '@/components/messageTemplate/js/MessageBaseFormUtils'
// import { MessageBox } from 'element-ui'

export default {
  name: 'CreateTemplateUnit',
  components: {
    BrandTop,
    TemplateEmulator,
    TemplateWrite,
    TemplateView,
    Breadcrumb
  },
  data() {
    return {
      ready: false,
      isNewbie: false,
      bullet_list: true, // 타이틀 클래스
      modify: false, // 승인템플릿 수정
      brandId: '',
      tplId: '',
      asisData: null,
      fmtStrData: {},
      templateData: {
        agreYn: 'N',
        brandId: '',
        cardSpec: 'openrichcard',
        cardTheme: '', // 템플릿 테마 추가
        cardType: 'D', // 템플릿 속성
        fmtStr: '',
        inputText: '',
        inputTitle01: '',
        inputTitle02: '',
        tplBizSrv: '', // 템플릿 유형
        tplFormId: '',
        tplId: '', // 템플릿Id
        tplNm: '',
        title02List: []
      },
      procTitle: null,
      procDesc: null
      /*
      orgnfmtstr: null, // 오리지날 fmtStr
      fmtStrData: {},
      templateCtn: {}, // 컨텐츠 정보 (버튼 개수 등)
      view: {
        tplBizSrvList: [],
        cardType: 'D',
        visibleGuidePopup: false,
        visibleSavePopup: false,
        tplIdPrefix: ''
      } */
    }
  },
  computed: {
    isWriteMode() {
      return this.isNewbie || this.templateData.aprvRet === 'SAVED' || this.templateData.aprvRet === 'REJECTED'
    },
    computedJsonData() {
      let jsonData = this.fmtStrData
      if (this.templateData.cardType === 'D' && this.templateData.cardTheme !== 'TA') {
        let inputText = this.templateData.inputText.replace(/(?:\r\n|\t|\n)/g, '<br/>')
        inputText = inputText.replace(/["\\]/g, '\\$&')
        let jsonDataStr = JSON.stringify(this.fmtStrData)
        jsonDataStr = jsonDataStr.split('{{description}}').join(inputText)

        jsonData = JSON.parse(jsonDataStr)
      } else if (this.templateData.cardType === 'C' && this.templateData.cardTheme !== 'TA') {
        let inputText = this.templateData.inputText.replace(/(?:\r\n|\t|\n)/g, '<br/>')
        inputText = inputText.replace(/["\\]/g, '\\$&')
        let jsonDataStr = JSON.stringify(this.fmtStrData)
        jsonDataStr = jsonDataStr.split('{{description}}').join(inputText)
        jsonData = JSON.parse(jsonDataStr)
      } else if (this.templateData.cardType === 'D' && this.templateData.cardTheme === 'TA') {
        let inputText = this.templateData.inputText.replace(/(?:\r\n|\t|\n)/g, '<br/>')
        inputText = inputText.replace(/["\\]/g, '\\$&')
        let inputTitle01 = ''
        if (this.templateData.inputTitle01 !== undefined) {
          inputTitle01 = this.templateData.inputTitle01.replace(/(?:\r\n|\t|\n)/g, '<br/>')
          inputTitle01 = inputTitle01.replace(/["\\]/g, '\\$&')
        }
        let inputTitle02 = ''
        if (this.templateData.inputTitle02 !== '' && this.templateData.inputTitle02 !== undefined) {
          inputTitle02 = this.templateData.inputTitle02.replace(/(?:\r\n|\t|\n)/g, '<br/>')
          inputTitle02 = inputTitle02.replace(/["\\]/g, '\\$&')
        }
        if (this.templateData.aprvRet === 'SAVED') {
          jsonData.RCSMessage.openrichcardMessage.layout.children[0].children[0].children[0].text = inputTitle01
          jsonData.RCSMessage.openrichcardMessage.layout.children[0].children[0].children[1].text = inputTitle02
          let jsonDataStr = JSON.stringify(jsonData)
          jsonDataStr = jsonDataStr.split('{{description}}').join(inputText)
          jsonData = JSON.parse(jsonDataStr)
        } else {
          let jsonDataStr = JSON.stringify(this.fmtStrData)
          jsonDataStr = jsonDataStr.split('{{description}}').join(inputText)
          jsonDataStr = jsonDataStr.split('{{title1}}').join(inputTitle01)
          if (this.templateData.inputTitle02 !== 'N') {
            jsonDataStr = jsonDataStr.split('{{title2}}').join(inputTitle02)
          } else if (this.templateData.inputTitle02 === 'N') {
            jsonDataStr = jsonDataStr.split('N').join(' ')
          } else {
            jsonDataStr = jsonDataStr.split('{{title2}}').join(' ')
          }
          jsonData = JSON.parse(jsonDataStr)
        }
      } else if (this.templateData.cardType === 'C' && this.templateData.cardTheme === 'TA') {
        let inputTitle01 = ''
        if (this.templateData.inputTitle01 !== undefined) {
          inputTitle01 = this.templateData.inputTitle01.replace(/(?:\r\n|\t|\n)/g, '<br/>')
          inputTitle01 = inputTitle01.replace(/["\\]/g, '\\$&')
        }
        let inputTitle02 = ''
        if (this.templateData.inputTitle02 !== 'N' && this.templateData.inputTitle02 !== undefined) {
          inputTitle02 = this.templateData.inputTitle02.replace(/(?:\r\n|\t|\n)/g, '<br/>')
          inputTitle02 = inputTitle02.replace(/["\\]/g, '\\$&')
        }
        if (this.templateData.aprvRet === 'SAVED') {
          jsonData.RCSMessage.openrichcardMessage.layout.children[0].children[0].children[0].text = inputTitle01
          jsonData.RCSMessage.openrichcardMessage.layout.children[0].children[0].children[1].text = inputTitle02
          let jsonDataStr = JSON.stringify(jsonData)
          jsonData = JSON.parse(jsonDataStr)
        } else {
          let jsonDataStr = JSON.stringify(this.fmtStrData)
          jsonDataStr = jsonDataStr.split('{{title1}}').join(inputTitle01)
          if (this.templateData.inputTitle02 !== 'N') {
            jsonDataStr = jsonDataStr.split('{{title2}}').join(inputTitle02)
          } else if (this.templateData.inputTitle02 === 'N') {
            jsonDataStr = jsonDataStr.split('N').join(' ')
          } else {
            jsonDataStr = jsonDataStr.split('{{title2}}').join(' ')
          }
          jsonData = JSON.parse(jsonDataStr)
        }
        let jsonDataStr = JSON.stringify(this.fmtStrData)
        jsonDataStr = jsonDataStr.split('{{title1}}').join(inputTitle01)
        jsonDataStr = jsonDataStr.split('{{title2}}').join(inputTitle02)
        jsonData = JSON.parse(jsonDataStr)
      }
      return jsonData
    }
  },
  watch: {
    modify() {
      if (this.modify === true) {
        this.procTitle = '승인완료(수정)'
      }
    },
    templateData (v) {
    },
    fmtStrData (v) {
    }
  },
  created() {
    // params로 tplid 안넘어옴(개별 등록 할때), tplId는 (상세보기 할때 필요)
    if (this.$route.params.brandId) {
      this.brandId = this.$route.params.brandId
      this.tplId = this.$route.params.tplId
    } else {
      this.brandId = this.$store.getters.getBrandId
      this.tplId = this.$route.params.tplId
    }
    const cardTheme = this.$store.getters.getCreateTpl.theme
    const cardType = this.$store.getters.getCreateTpl.type
    // if (cardTheme === undefined || cardType === undefined) {
    //   MessageBox.alert('템플릿 변경하기를 누르세요')
    // }
    // const cardTheme = this.$route.params.tplThemeType.theme
    // const cardType = this.$route.params.tplThemeType.type
    if (cardTheme === undefined || cardType === undefined) {
      this.templateData.cardTheme = ''
      this.templateData.cardType = ''
      this.templateData.cardThemeNm = ''
      this.templateData.cardTypeNm = ''
    } else {
      this.templateData.cardTheme = cardTheme
      this.templateData.cardType = cardType
      this.templateData.cardThemeNm = cardTheme === 'LE' ? '타이틀 선택형' : '타이틀 자유형'
      this.templateData.cardTypeNm = cardType === 'D' ? '서술형(description)' : '스타일(cell)'
    }
    // 타이틀 자유형의 경우에는 유형 선택이 없기 때문에 TA001로 유형을 넣어 준다.
    if (cardTheme === 'TA') {
      this.templateData.tplBizSrv = 'TA001'
    }
    if (this.tplId) {
      this.getTemplateInfo()
    } else {
      this.setTempalteId()
    }
    // this.init()
  },
  mounted() {},
  beforeRouteLeave (to, from, next) {
    this.$store.commit('SET_CREATE_TPL', this.templateData)
    next()
  },
  methods: {
    getTemplateInfo() {
      retrieveTemplateDetail(this.brandId, this.tplId)
        .then(res => {
          if (!res.result.inputText) {
            res.result['inputText'] = ''
          }
          let result = res.result
          this.asisData = _.cloneDeep(JSON.parse(result.fmtStr))
          let fmtStrData = messageBaseFormUtils.reformSuggestionForView(JSON.parse(result.fmtStr))
          result.fmtStr = JSON.stringify(fmtStrData)
          this.templateData = result
          if (result.tplBizCate === 'TA') {
            let inputTitleArr = fmtStrData.RCSMessage.openrichcardMessage.layout.children[0].children.filter(c => c.widget === 'LinearLayout')[0]
            this.templateData.inputTitle01 = inputTitleArr.children[0].text
            if (inputTitleArr.children[1]) {
              this.templateData.inputTitle02 = inputTitleArr.children[1].text
            }
            if (!inputTitleArr.children[1]) {
              this.$alertMsg('잘못된 형식의 JSON 데이터 입니다.')
            }
          }
          // 상세보기에서 타이틀 선택형, 타이틀 자유형 값 판단.
          this.templateData.cardTheme = result.tplBizCate
          this.templateData.cardThemeNm = result.tplBizCate === 'TA' ? '타이틀 자유형' : '타이틀 선택형'
          this.templateData.cardType = result.cardType
          this.templateData.cardTypeNm = result.cardType === 'D' ? '서술형(description)' : '스타일(cell)'
          this.fmtStrData = fmtStrData
        })
        .catch(err => {
          this.$alertMsg('잘못된 형식의 JSON 데이터 입니다.').then(() => {
            if (err.code === '60000021') {
              this.$router.push({
                name: 'TemplateList',
                params: { brandId: this.brandId }
              })
            }
          })
        })
        .finally(() => {
          this.ready = true
          this.currentProcess()
        })
    },
    setTempalteId() {
      retrieveTemplateId(this.brandId)
        .then(res => {
          this.templateData.brandId = this.brandId
          this.templateData.tplId = res.result.tplId
        })
        .catch(err => {
          this.$alertMsg(err.desc)
        })
        .finally(() => {
          this.ready = true
          this.isNewbie = true
          this.currentProcess()
        })
    },
    currentProcess() {
      if (this.isNewbie) {
        this.procTitle = '템플릿 작성'
        this.procDesc = '<ul class="bullet_list fs18"><li>템플릿은 승인 완료 후 사용 및 발송이 가능합니다.</li><li>승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지체될 수 있습니다.</li></ul>'
      } else {
        this.bullet_list = false
        this.procDesc = '<div><ul class="bullet_list fs18"><li>승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지체될 수 있습니다.</li></ul></div>'
        if (this.templateData.aprvRet === 'INSPECTED') {
          this.procTitle = '처리중'
        } else if (this.templateData.aprvRet === 'OK') {
          this.procTitle = '승인완료'
          this.procDesc = null
        } else if (this.templateData.aprvRet === 'REJECTED') {
          if (this.templateData.activeYn === 'Y') {
            this.procTitle = '반려(수정)'
          } else {
            this.procTitle = '반려'
          }
        } else {
          if (this.templateData.aprvRet === 'SAVED') {
            this.bullet_list = true
            this.procTitle = '임시저장'
            this.procDesc = '<ul class="bullet_list fs18"><li>템플릿은 승인 완료 후 사용 및 발송이 가능합니다.</li><li>승인 심사는 영업일 기준 48시간 이내이며 내부 사정상 지체될 수 있습니다.</li></ul>'
          } else if (this.templateData.status === 'DEL_WAIT') {
            this.procTitle = '처리중(삭제)'
            this.procDesc = null
          } else {
            if (this.templateData.status === 'APRV_NEW') {
              this.procTitle = '신규승인대기'
            } else if (this.templateData.status === 'APRV_MOD') {
              this.procTitle = '수정승인대기'
            }
          }
        }
      }
    },
    // 상세보기 > 수정하기 했을때 템플릿 데이터를 받아 오고 templateWrite로 보내준다.
    getAgdTplData(data) {
      this.templateData = data
      // this.templateData.cardTheme = data.cardTheme
      // this.templateData.cardThemeNm = data.cardTheme === 'LE' ? '타이틀 선택형' : '타이틀 자유형'
      // this.templateData.cardType = data.cardType
      // this.templateData.cardTypeNm = data.cardType === 'D' ? '서술형(description)' : '스타일(cell)'
    }
    /*
    init() {
      // 콤보 - 유형
      // retrieveCommonCode('TPL_BIZ_SRV').then(res => {
      //   this.view.tplBizSrvList = res.result
      // })
      // TODO: 콤보 - 버튼 조회
      // retrieveCommonCode('TEMPLATE_TYPE').then(res => {
      //   this.view.tplBizSrvList = res.result
      // })
      this.retrieveTplBizSrvCode()
      this.retrieveTemplateId()
    },
    retrieveTemplateId() {
      retrieveTemplateId(this.formData.brandId)
        .then(res => {
          this.formData.tplId = res.result.tplId
          this.view.tplIdPrefix = this.formData.tplId.split('-')[0] + '-'
        })
        .catch(err => {
          this.$alertMsg(err.desc)
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
            this.formData.cardType = this.view.cardType = newVal
            this.fmtStrData = {}
            this.templateCtn = {}
            // this.retrieveMessageBaseForm()

            // 템플릿 명 초기화
            this.formData.tplNm = ''

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
          })
      }
    },
    retrieveTplBizSrvCode() {
      // 유형 목록 조회
      let params = {
        cardType: this.formData.cardType
      }
      retrieveTplBizSrvCode(params, this.formData.brandId).then(res => {
        this.view.tplBizSrvList = res.result
      })
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
          this.templateCtn = res.result.ctn
          this.formData.tplFormId = res.result.info.tplFormId
          this.formData.fmtStr = res.result.info.fmtStr
          let fmt = JSON.parse(res.result.info.fmtStr)
          let fmtStrData = typeof fmt === 'string' ? JSON.parse(fmt) : fmt
          this.orgnfmtstr = _.cloneDeep(fmtStrData)

          // suggestion 위치 변경으로 인하여 기존에 정의된 양식에 suggestions 이 없는 경우 발생하여 추가함
          if (!fmtStrData.RCSMessage.openrichcardMessage.suggestions) {
            fmtStrData.RCSMessage.openrichcardMessage.suggestions = []
          }

          // 차라리 하드코딩을 하자.
          // Cell 타입인 경우 text 초기화 및 visibility 변경
          if (this.formData.cardType === 'C') {
            fmtStrData = messageBaseFormUtils.reformOpenrichcardCell(fmtStrData)
          }

          this.fmtStrData = fmtStrData
        })
        .catch(err => {
          this.$alertMsg(err.desc)
        })
    },
    // 저장관련 ------------------------------------------------------------------
    cancel() {
      this.$confirmMsg('템플릿 등록을 취소 하시겠습니까?')
        .then(() => {
          this.$router.push({
            name: 'TemplateList',
            params: { brandId: this.formData.brandId }
          })
        })
        .catch(() => {})
    },
    getParam() {
      let params = []
      if (this.formData.cardType === 'C') {
        params = this.$refs.messageBaseCell.getParamInfo()
        for (let obj of params) {
          if (obj.paramNm.toUpperCase() === 'DESCRIPTION') {
            return 'description'
          }
        }
      } else {
        params = this.$refs.messageBaseDescription.getParamInfo()
      }

      // description 변수 사용 할 수 없음
      const suggestions = messageBaseFormUtils.getParamsFromSuggestion(this.fmtStrData)
      for (let obj of suggestions) {
        if (obj.paramNm.toUpperCase() === 'DESCRIPTION') {
          return 'description'
        }
      }
      params = params.concat(suggestions)

      // 중복되는 변수가 있음
      const uniqParams = _.uniqBy(params, (o) => o.paramNm.toUpperCase())
      // if (params.length != uniqParams.length) {
      //   return "unique"
      // }
      return uniqParams
    },
    saveData() {
      // 버튼 화면 관리 목적으로 넣은 type 삭제
      this.$refs.messageBaseSuggestion.reformSuggestionForRequest()

      this.formData.fmtStr = JSON.stringify(this.fmtStrData)
      this.formData['aprvRet'] = 'SAVED'

      if (this.$store.state.user.userType === 'AGENCY') {
        this.formData['agencyId'] = this.$store.state.user.corpId
      }

      this.formData.params = this.getParam()

      saveMessageBase(this.formData.brandId, this.formData)
        .then(res => {
          this.$alertMsg('저장되었습니다').then(() => {
            this.$router.push({
              name: 'TemplateList',
              params: { brandId: this.formData.brandId }
            })
          })
        })
        .catch(err => {
          this.$alertMsg(err.desc)
        })
    },
    validateData(validType) {
      if (
        jglib.isEmpty(this.formData.tplId) ||
        this.formData.tplId.length < 16
      ) {
        this.$alertMsg('템플릿 ID를 입력해 주세요.').then(() => {
          this.$refs.tplId.focus()
        })
        return false
      }

      if (jglib.isEmpty(this.formData.cardType)) {
        this.$alertMsg('템플릿 속성을 선택해 주세요.').then(() => {
          this.$refs.cardType.focus()
        })
        return false
      }

      if (jglib.isEmpty(this.formData.tplBizSrv)) {
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

      // 내용 validation
      if (this.formData.cardType === 'D') {
        if (!this.$refs.messageBaseDescription.validateData()) {
          return false
        }
      } else if (this.formData.cardType === 'C') {
        if (!this.$refs.messageBaseCell.validateData()) {
          return false
        }
      }

      // 버튼 validation
      if (!this.$refs.messageBaseSuggestion.validateData()) {
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

      if (!this.formData.agreYn || this.formData.agreYn === 'N') {
        this.$alertMsg('필수 동의를 확인해 주세요.').then(() => {
          this.$refs.agreYn.focus()
        })
        return false
      }

      return true
    },
    apply() {
      if (!this.validateData('apply')) {
        return false
      }

      this.$confirmMsg(
        '운영자 승인이 완료되면 템플릿을 발송할 수 있습니다.<br/>승인요청 하시겠습니까?'
      )
        .then(() => {
          // 버튼 화면 관리 목적으로 넣은 type 삭제
          this.$refs.messageBaseSuggestion.reformSuggestionForRequest()

          // cell인 경우 사용하지 않는 Row 삭제
          if (this.formData.cardType === 'C') {
            this.$refs.messageBaseCell.removeNotUsedTextview()
          }

          // 승인요청 하기 전 WidgetPolicy 를 삭제
          this.fmtStrData = messageBaseFormUtils.removeWidgetPolicy(
            this.fmtStrData
          )

          // 파라미터 정보 저장
          this.formData.params = this.getParam()

          this.formData.fmtStr = JSON.stringify(this.fmtStrData)
          this.formData['aprvRet'] = 'WAITING'

          saveMessageBase(this.formData.brandId, this.formData)
            .then(res => {
              this.$alertMsg('저장되었습니다').then(() => {
                this.$router.push({
                  name: 'TemplateList',
                  params: { brandId: this.formData.brandId }
                })
              })
            })
            .catch(err => {
              this.$alertMsg(err.desc)
            })
        })
        .catch(() => {})
    },
    // 팝업 --------------------------------------------------------
    openSaveConfirmPopup() {
      if (!this.validateData('save')) {
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
    } */
  }
}
</script>
