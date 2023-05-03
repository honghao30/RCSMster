<template>
  <div v-if="ready" class="rcs_emul_form_wrap">
    <a href="javascript:void(0);" class="tmplt_gd_link btn_temp_info type02" @click="openGuidePopup">
      <span>템플릿 작성 안내</span>
    </a>
    <image-template-guide-popup v-if="showGuidePopup" :visible.sync="showGuidePopup"></image-template-guide-popup>
    <!-- 상품별 안내문구 추가 필요 -->
    <div class="rcs_emul_form_cont bd_no" :class="{ 'bd_no2': commonInfo.tplTheme === 'SNS' && commonInfo.tplType === 'H' }">
      <component v-for="(infoComp, idx) in infoComponents" :key="idx" :is="infoComp"
        :ref="infoComp"
        :info.sync="$data[getInfoComponent(infoComp)]"
        :disableData="getDisableData(infoComp)"
        :ctnInfo="ctnInfo" :paramInfo="paramInfo"
        :isNewbie="isNewbie" :viewMode="false" :modify="modify"
      ></component>
    </div>
    <!-- 동의여부 -->
    <span class="custom_checkbox mar_t20">
      <input type="checkbox" id="agree01" ref="agreYn" v-model="agreYn" true-value="Y" false-value="N">
      <label for="agree01" class="disblock">광고 메시지 발송 시 광고 메시지 규정 준수에 대한 모든 법적 책임은 (인증, 나이, 성별 등 포함) 기업 고객에게 있으며, 정책에 위배하는 메시지 발송 시 템플릿 사용이 중지될 수 있음을 동의합니다</label>
    </span>
    <!-- 버튼 영역 -->
    <div class="btn_wrap mar_t40 full_width temWrite btn_flex first">
      <a href="javascript:void(0);" class="btn mid bd_blue" @click="goBack"><span>이전</span></a>
      <a href="javascript:void(0);" class="btn mid bd_blue" v-if="!isNewbie || modify" @click="deleteImageTemplate">삭제</a>
      <a href="javascript:void(0);" class="btn mid bd_blue" v-if="isNewbie || isSaved" @click="openSaveConfirmPopup">임시저장</a><!-- 승인건은 임시저장 불가 -->
      <a href="javascript:void(0);" class="btn mid blue" v-if="isNewbie || modify || isSaved || isRejected || isModRejected" @click="applyImageTemplate">승인요청</a>
    </div>
    <!-- 임시저장 팝업 -->
    <apply-confirm-popup
      v-if="showSavePopup"
      :visible.sync="showSavePopup"
      :msg="savePopupMsg"
      :saveBtnNm="saveBtnNm"
      @save="saveData"
      @apply="applyImageTemplate"/>
  </div>
</template>

<script>
import Common from '@/views/service/brand/template/components/Common'
import MainImg from '@/views/service/brand/template/components/MainImg'
import TitAndDesc from '@/views/service/brand/template/components/TitAndDesc'
import Detail from '@/views/service/brand/template/components/Detail'
import Buttons from '@/views/service/brand/template/components/Buttons'
import ApplyConfirmPopup from '@/components/popupSet/ApplyConfirmPopup.vue'
import { retrieveMessageBaseForm, saveMessageBaseV2, updateTemplateDetailV2, deleteTemplate } from '@/api/service/template'
import defaultRefData from '@/components/imageTemplate/js/imageTemplateDefaultRefData'
import ImageTemplateGuidePopup from '@/views/service/brand/template/ImageTemplateGuidePopup'
import imgTplUtils from '@/components/imageTemplate/js/imageTemplateUtils'
import moment from 'moment'

export default {
  name: 'ImageTemplateWrite',
  components: {
    Common,
    MainImg,
    TitAndDesc,
    Detail,
    Buttons,
    ApplyConfirmPopup,
    ImageTemplateGuidePopup
  },
  props: {
    isNewbie: {
      type: Boolean
    },
    modify: {
      type: Boolean
    },
    infoComponents: {
      type: Array,
      default: null
    },
    disableData: {
      type: Object,
      default: null
    },
    common: {
      type: Object,
      default: null
    },
    mainImg: {
      type: Object,
      default: null
    },
    titAndDesc: {
      type: Object,
      default: null
    },
    detail: {
      type: Object,
      default: null
    },
    buttons: {
      type: Object,
      default: null
    },
    templateData: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      /** 템플릿 입력 정보 */
      commonInfo: this.common,
      mainImgInfo: this.mainImg,
      titAndDescInfo: this.titAndDesc,
      detailInfo: this.detail,
      buttonsInfo: this.buttons,
      /** 기타 */
      ready: false,
      ctnInfo: null,
      paramInfo: null, // 각 상품별 parameter 정보
      showSavePopup: false,
      showGuidePopup: false,
      isSave: false,
      savePopupMsg: '',
      saveBtnNm: '',
      agreYn: 'N'
    }
  },
  computed: {
    isAprved () { return this.templateData && this.templateData.masterAprvRet === 'OK' && this.templateData.aprvRet === 'OK' }, // 승인 완료 여부
    isSaved() { return this.templateData && this.templateData.aprvRet === 'SAVED' }, // 임시저장 상태인지?
    isRejected() { return this.templateData && this.templateData.activeYn === 'N' && this.templateData.status === 'DELETED' && this.templateData.aprvRet === 'REJECTED' }, // 반려 상태인지?
    isModRejected() { return this.templateData && this.templateData.activeYn === 'Y' && this.templateData.status === 'DELETED' && this.templateData.aprvRet === 'REJECTED' } // 수정이 반려된 상태인지?
  },
  watch: {
    // 템플릿 옵션 변경시 -> formId, 메인이미지 내 옵션 정보 업데이트 처리
    'commonInfo.tplType'() {
      this.$store.dispatch('setThemeType', { theme: this.commonInfo.tplTheme, type: this.commonInfo.tplType })
      let tplNameData = imgTplUtils.getThemeTypeName(this.commonInfo.tplTheme, this.commonInfo.tplType)
      this.commonInfo.tplTypeNm = tplNameData.typeNm
      if (this.mainImgInfo.fileSize > 0) {
        // 기존 등록된 파일 사이즈 뺀다
        imgTplUtils.updateFileSize('sub', Number(this.mainImgInfo.fileSize))
      }
      if (this.modify && this.commonInfo.isFirstOptChange) { // 수정시: 옵션 변경하는 경우 메인 이미지 초기화
        this.common.isFirstOptChange = false
        this.initMainImageData()
      } else this.mainImgInfo.previewSrc = ''
      this.retrieveMessageBaseForm()
    }
  },
  async created () {
    await this.retrieveMessageBaseForm()
  },
  mounted() {},
  beforeDestroy() {
    this.$store.dispatch('setTotalFileSize', 0)
  },
  methods: {
    async retrieveMessageBaseForm() {
      let params = {
        cardType: `${this.commonInfo.tplTheme}${this.commonInfo.tplType}`,
        tplBizSrv: '' // 이미지 템플릿은 없음
      }
      let res = await retrieveMessageBaseForm(this.commonInfo.brandId, params) // (front api - 포맷스트링 조회쿼리 임의 수정하여 테스트중 . 나중에 api도 수정되어야 함)
      if (res.status === 200) {
        this.commonInfo.tplFormId = res.result.info.tplFormId // 템플릿 form id set
        this.ctnInfo = res.result.ctn
        this.paramInfo = res.result.params
        this.ready = true
      }
    },
    /** 템플릿 작성안내 팝업 오픈 */
    openGuidePopup() {
      this.showGuidePopup = true
    },
    /** 저장 */
    async openSaveConfirmPopup() {
      this.isSave = true
      this.savePopupMsg = this.isNewbie ? '임시저장은 작성하신 정보가 임시로 저장만 되는 기능입니다.<br/>승인요청을 하셔야 심사 후 템플릿을 사용하실 수 있습니다.' : '작성하신 정보가 수정되어 저장 됩니다.<br/>승인요청을 하셔야 심사 후 템플릿을 사용하실 수 있습니다.'
      this.saveBtnNm = this.isNewbie ? '임시저장' : '확인'
      if (await this.validateImageTemplate()) {
        this.showSavePopup = true
      }
    },
    /** 메인 이미지데이터 초기화 */
    initMainImageData() {
      this.mainImgInfo.fileName = ''
      this.mainImgInfo.fileSrc = ''
      this.mainImgInfo.fileSize = 0
      this.mainImgInfo.fileType = ''
      this.mainImgInfo.media = ''
      this.mainImgInfo.previewSrc = ''
    },
    /** 이미지 템플릿 입력 데이터 유효성 검증 */
    validateImageTemplate() {
      for (let i = 0; i < this.infoComponents.length; i++) {
        let comp = this.infoComponents[i]
        if (!this.$refs[comp][0].validateData(this.isSave)) {
          return Promise.resolve(false)
        }
      }
      // 동의여부
      if (this.agreYn === 'N') {
        this.$alertMsg('필수 동의를 확인해 주세요.').then(() => {
          this.$refs.agreYn.focus()
        })
        return Promise.resolve(false)
      }
      return Promise.resolve(true)
    },
    getParam() {
      let body = []
      // 제목/본문, 메인이미지
      let paramComponents = this.infoComponents.filter(comp => comp !== 'common' && comp !== 'buttons')
      paramComponents.forEach(comp => {
        if (comp === 'detail') {
          this.detailInfo.list.forEach((sub, idx) => {
            let defData = JSON.parse(JSON.stringify(defaultRefData[comp]))
            defData.forEach(data => {
              let property = data.param
              let userValue = sub[property]
              if (property === 'subMedia' && this.isNewbie) { // 신규 등록시 subMedia*의 url 정보 없음
                userValue = ''
              }
              data.value = userValue || ''
              data.param = `${property}${idx + 1}`
              body.push(data)
            })
          })
        } else {
          let defData = JSON.parse(JSON.stringify(defaultRefData[comp]))
          defData.forEach(data => {
            let userValue = this.$refs[comp][0].info[data.param]
            if (data.param === 'media' && this.isNewbie) { // 신규 등록시 media의 url 정보 없음
              userValue = ''
            }
            data.value = userValue
            body.push(data)
          })
        }
      })
      let reqData = {
        brandId: this.commonInfo.brandId, // 브랜드 아이디
        messagebaseformId: this.commonInfo.tplFormId, // 메시지 베이스 폼 아이디
        custTmpltId: this.commonInfo.tplId.split('-')[1], // 템플릿 아이디
        tmpltName: this.commonInfo.tplNm, // 템플릿 명
        save: this.isSave ? 'Y' : 'N',
        body: body,
        buttons: [{ suggestions: this.getButtonParam() }]
      }
      return reqData
    },
    getButtonParam() {
      this.buttonsInfo.btnList.forEach(btn => {
        if (btn.action.hasOwnProperty('calendarAction')) {
          // 캘린더 버튼인 경우 start, endtime을 변경
          let target = btn.action.calendarAction.createCalendarEvent
          if (!target.useVariable) {
            target.startTime = moment.utc(target.startTime).utcOffset(9 * 60).format()
            target.endTime = moment.utc(target.endTime).utcOffset(9 * 60).format()
          }
        }
      })
      return this.buttonsInfo.btnList
    },
    /** 템플릿 신규 등록 */
    addImageTemplate() {
      let formData = new FormData()
      let data = this.getParam()
      formData.append('data', JSON.stringify(data))

      // 메인 이미지
      let media = jglib.isEmpty(this.mainImgInfo.fileSrc) ? '' : imgTplUtils.convertCanvasToFile(this.mainImgInfo.fileSrc, this.mainImgInfo.fileType)
      if (media !== '') formData.append('media', media, this.mainImgInfo.fileName)
      else formData.append('media', media)
      // 상세 이미지
      this.detailInfo.list.forEach((item, idx) => {
        let subMedia = jglib.isEmpty(item.fileSrc) ? '' : imgTplUtils.convertCanvasToFile(item.fileSrc, item.fileType)
        if (subMedia !== '') formData.append(`subMedia${idx + 1}`, subMedia, item.fileName)
        else formData.append(`subMedia${idx + 1}`, subMedia)
      })
      saveMessageBaseV2(this.commonInfo.brandId, formData).then(res => {
        let msg = this.isSave ? '저장되었습니다.' : '승인 요청되었습니다.'
        this.$alertMsg(msg).then(() => {
          this.$store.commit('searchcondition/clearSearchCondition', ['TemplateList'])
          this.goList()
        })
      }).catch(err => {
        this.$alertMsg(err.desc)
      })
    },
    /** 템플릿 수정 */
    updateImageTemplate() {
      let formData = new FormData()
      let data = this.getParam()
      formData.append('data', JSON.stringify(data))
      // 메인 이미지
      let media = jglib.isEmpty(this.mainImgInfo.fileSrc) ? '' : imgTplUtils.convertCanvasToFile(this.mainImgInfo.fileSrc, this.mainImgInfo.fileType)
      if (media !== '') formData.append('media', media, this.mainImgInfo.fileName)
      else formData.append('media', media)
      // 상세 이미지
      this.detailInfo.list.forEach((item, idx) => {
        let subMedia = jglib.isEmpty(item.fileSrc) ? '' : imgTplUtils.convertCanvasToFile(item.fileSrc, item.fileType)
        if (subMedia !== '') formData.append(`subMedia${idx + 1}`, subMedia, item.fileName)
        else formData.append(`subMedia${idx + 1}`, subMedia)
      })
      updateTemplateDetailV2(this.commonInfo.brandId, formData).then(res => {
        let msg = this.isSave ? '수정 저장되었습니다.' : '승인 요청되었습니다.'
        this.$alertMsg(msg).then(() => {
          if (this.isSave) {
            this.$store.commit('searchcondition/clearSearchCondition', ['TemplateList'])
            this.$router.go()
          } else {
            this.$store.commit('searchcondition/clearSearchCondition', ['TemplateList'])
            this.goList()
          }
        })
      }).catch(err => {
        this.$alertMsg(err.desc)
      })
    },
    /** 템플릿 삭제 */
    deleteImageTemplate() {
      this.$confirmMsg('템플릿을 삭제하시겠습니까?').then(() => {
        let data = { oldTplId: this.templateData.tplId }
        deleteTemplate(this.templateData.brandId, data).then(() => {
          this.goList()
        }).catch(err => {
          this.$alertMsg(err.desd)
        })
      })
    },
    /** 승인 요청(신규, 수정) */
    async applyImageTemplate() {
      this.isSave = false
      if (await this.validateImageTemplate()) {
        this.$confirmMsg('운영자 승인이 완료되면 템플릿을 발송할 수 있습니다.<br/>승인요청 하시겠습니까?').then(() => {
          this.saveData()
        })
      }
    },
    saveData() {
      if (this.isNewbie) this.addImageTemplate() // 신규 템플릿 등록
      else this.updateImageTemplate() // 기존 템플릿 수정 부분 저장
    },
    goList() {
      let router = {
        name: 'TemplateList',
        params: { brandId: this.commonInfo.brandId }
      }
      this.$router.push(router)
    },
    goBack() {
      let msg = `작성중인 내용을 취소하고 템플릿 ${this.isNewbie ? '선택' : '목록'}화면으로 이동합니다.`
      this.$confirm(msg).then(() => {
        let router = {
          name: this.isNewbie ? 'CreateTemplateUnitSelectTheme' : 'TemplateList',
          params: { brandId: this.commonInfo.brandId }
        }
        this.$router.push(router)
      })
    },
    getInfoComponent(comp) {
      return `${comp}Info`
    },
    getDisableData(comp) {
      return this.disableData.hasOwnProperty(comp) ? this.disableData[comp] : ''
    }
  }
}
</script>

<style>

</style>
