<template>
  <div class="rcs_emul_form_wrap">
    <a href="javascript:void(0);" class="tmplt_gd_link btn_temp_info type02" @click="openGuidePopup">
      <span>템플릿 작성 안내</span>
    </a>
    <image-template-guide-popup v-if="showGuidePopup" :visible.sync="showGuidePopup"></image-template-guide-popup>
    <!-- 상품별 안내문구 추가 필요 -->
    <div class="rcs_emul_form_cont bd_no">
      <component v-for="(infoComp, idx) in infoComponents" :key="idx" :is="infoComp"
        :ref="infoComp"
        :info.sync="$data[getInfoComponent(infoComp)]"
        :disableData="getDisableData(infoComp)"
        :viewMode="true"
      ></component>
      <!-- 등록일/승인요청일/승인결과/사용여부 출력란 -->
      <div>
        <div class="rcs_item_bundle">
          <strong class="rcs_tit_bundle p-l0">등록일</strong>
          <div class="rcs_cont_bundle">
            <span class="custom_input w670">{{ templateData.regDt | prettyDate('YYYY-MM-DD HH:mm') }} / {{ templateData.regUserNm }}</span>
          </div>
        </div>
        <div v-if="!isSaved" class="rcs_item_bundle">
          <strong class="rcs_tit_bundle p-l0">승인요청일</strong>
          <div class="rcs_cont_bundle">
            <!-- 저장 없이 승인요청한 경우 승인요청자 이름은 등록자 이름과 동일 -->
            <span class="custom_input w670">{{ templateData.reqAprvDt | prettyDate('YYYY-MM-DD HH:mm') }} / {{ !templateData.aprvUserNm ? templateData.regUserNm : templateData.aprvUserNm }}</span>
          </div>
        </div>
        <!-- 승인결과: 반려 -->
        <div v-if="isRejected" class="rcs_item_bundle">
          <strong class="rcs_tit_bundle p-l0">승인결과</strong>
        </div>
        <div v-if="isRejected" class="rcs_item_bundle">
          <strong class="rcs_tit_bundle p-l0">반려</strong>
          <!-- 반려 처리일시 ,사유 -->
          <div v-if="templateData.aprvDt != null" class="rcs_cont_bundle">
            <span class="custom_input w670">{{ templateData.aprvDt | prettyDate('YYYY-MM-DD HH:mm') }} {{ templateData.aprvRetDescr || '' }}</span>
          </div>
        </div>
        <!-- 승인결과: 완료 -->
        <div v-if="isAprvRetOk" class="rcs_item_bundle">
          <strong class="rcs_tit_bundle p-l0">승인완료일</strong>
          <div class="rcs_cont_bundle">
            <span class="custom_input w670">{{ templateData.aprvDt | prettyDate('YYYY-MM-DD HH:mm') }}</span>
          </div>
        </div>
        <div v-if="isAprvRetOk" class="rcs_item_bundle">
          <strong class="rcs_tit_bundle p-l0">사용여부</strong>
          <div class="rcs_cont_bundle">
            <span class="custom_input w670">{{ useStatusNm }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="btn_wrap center full_width mar_t20 btn_flex first">
        <a href="javascript:void(0);" class="btn mid bd_blue" @click="goList">이전</a>
        <a href="javascript:void(0);" class="btn mid bd_blue" v-if="isAprvRetOk || isSaved || isRejected" @click="deleteImageTemplate">삭제</a>
        <a href="javascript:void(0);" class="btn mid blue" v-if="isAprvRetOk || isSaved || isRejected" @click="doModify">수정</a>
        <a href="javascript:void(0);" class="btn mid blue" v-if="isSaved" @click="applyImageTemplate">승인요청</a>
        <a href="javascript:void(0);" class="btn mid"  v-if="canCanceling && !isSaved" @click="cancelApplyImageTemplate" :class="{ 'blue': !isInspect, 'disabled': isInspect }">승인요청 취소</a>
      </div>
  </div>
</template>

<script>
import Common from '@/views/service/brand/template/components/Common'
import MainImg from '@/views/service/brand/template/components/MainImg'
import TitAndDesc from '@/views/service/brand/template/components/TitAndDesc'
import Detail from '@/views/service/brand/template/components/Detail'
import Buttons from '@/views/service/brand/template/components/Buttons'
import imgTplUtils from '@/components/imageTemplate/js/imageTemplateUtils'
import defaultRefData from '@/components/imageTemplate/js/imageTemplateDefaultRefData'
import ImageTemplateGuidePopup from '@/views/service/brand/template/ImageTemplateGuidePopup'
import { cancleApplyTemplate, deleteTemplate, updateTemplateDetailV2 } from '@/api/service/template'

export default {
  name: 'ImageTemplateView',
  components: {
    Common,
    MainImg,
    TitAndDesc,
    Detail,
    Buttons,
    ImageTemplateGuidePopup
  },
  props: {
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
    },
    fmtStrData: {
      type: String
    },
    userParams: {
      type: Array,
      default: null
    },
    images: {
      type: Array,
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
      theme: null,
      tplType: null,
      json: null,
      mainJson: null,
      bodyJson: null,
      buttonJson: null,
      showGuidePopup: false
    }
  },
  computed: {
    isSaved() { return this.templateData.aprvRet && this.templateData.aprvRet === 'SAVED' }, // 임시저장
    isWaiting() { return this.templateData && this.templateData.aprvRet === 'WAITING' }, // (신규/수정) 승인대기
    isInspect() { return this.templateData.aprvRet === 'INSPECTED' }, // (검수완료) 처리중
    isAprvRetOk() { return this.templateData.aprvRet && this.templateData.aprvRet === 'OK' }, // 승인완료
    isRejected() { return this.templateData.activeYn === 'N' && this.templateData.status === 'DELETED' && this.templateData.aprvRet === 'REJECTED' }, // 반려
    canCanceling() { return this.templateData && this.templateData.aprvRet !== 'OK' && (this.templateData.status === 'APRV_NEW' || this.templateData.status === 'APRV_MOD') },
    useStatusNm() { return this.templateData.useStatus === 'ready' ? this.templateData.useStatusNm : '-' },
    useDescr() { return this.templateData.useDescr ? `/ ${this.templateData.useDescr}` : '' }
  },
  watch: {},
  created () {
    this.init()
  },
  mounted() {},
  methods: {
    init() {
      // console.info(' imagetempalteview ::: created')
      this.$store.dispatch('setTotalFileSize', 0)
      this.theme = this.common.tplTheme
      this.tplType = this.common.tplType
      this.json = JSON.parse(this.fmtStrData).RCSMessage.openrichcardMessage.layout.children
      // json 설정
      this.setJson()
      // 타이틀 & description
      this.setTilteAndDescription()
      // 이미지
      this.getMainImage()
      // 서브 데이터
      this.getSubData()
      // 버튼부
      this.setButton()
    },
    setJson() {
      if (this.theme === 'SNS') {
        if (this.tplType === 'H') {
          this.mainJson = this.json[1].children[0]
          this.bodyJson = null // 없음
          this.buttonJson = this.json[0].children[1].children
        } else if (this.tplType === 'S') {
          this.mainJson = this.json[0].children[1].children[0]
          this.bodyJson = null // 없음
          this.buttonJson = this.json[0].children[2].children
        }
      } else if (this.theme === 'HIM') {
        this.mainJson = this.json[0].children[0]
        this.bodyJson = null // 없음
        this.buttonJson = this.json[1].children[1].children
      } else if (this.theme === 'HIT' || this.theme === 'TBN') {
        this.mainJson = this.json[0].children[0]
        this.bodyJson = this.json[1].children[1].children
        this.buttonJson = this.json[1].children[2].children
      }
    },
    getMainImage() {
      if (this.mainJson.mediaUrl.includes('maapfile://')) {
        const file = this.getFileInfo(this.mainJson.mediaUrl)
        this.mainImg.previewSrc = file.fileUrl // 파일 url (미리보기용)
        this.mainImg.fileName = file.fileName
        this.mainImg.fileSize = Number(file.fileSize)
        this.mainImg.media = `maapfile://${file.fileId}` // maapfile 링크 정보
        imgTplUtils.updateFileSize('add', Number(file.fileSize))
      }
      this.mainImg.mediaUrl = this.mainJson.click.action.urlAction.openUrl.url
    },
    getSubData() {
      this.detail.list = []
      if (this.bodyJson) {
        this.bodyJson.forEach(obj => {
          if (!obj.hasOwnProperty('visibility') || obj.visibility === 'visible') {
            if (this.theme === 'HIT') {
              let subTitle
              let subDesc
              obj.children.forEach((child, index) => {
                if (index === 1) {
                  subDesc = this.getInputTextFromParam(child.text)
                } else {
                  subTitle = this.getInputTextFromParam(child.text)
                }
              })
              this.detail.list.push({
                subTitle,
                subDesc
              })
            } else if (this.theme === 'TBN') {
              let fileUrl = ''
              let fileName = ''
              let fileSize = 0
              let subMedia = ''
              if (this.tplType === 'V') {
                // 파일정보가 있을 경우 set
                if (obj.children[0].children[0].mediaUrl.includes('maapfile://')) {
                  let subImage = this.getFileInfo(obj.children[0].children[0].mediaUrl)
                  if (subImage) {
                    fileUrl = subImage.fileUrl
                    fileName = subImage.fileName
                    fileSize = Number(subImage.fileSize)
                    subMedia = `maapfile://${subImage.fileId}`
                    imgTplUtils.updateFileSize('add', fileSize)
                  }
                }
                // 썸네일 세로형의 경우 제목과 본문은 커플링 되어 있다.
                this.detail.list.push({
                  fileUrl: fileUrl,
                  fileName: fileName,
                  fileSize: fileSize,
                  subMedia: subMedia,
                  subMediaUrl: obj.children[0].children[0].click.action.urlAction.openUrl.url,
                  subDesc: this.getInputTextFromParam(obj.children[1].text)
                })
              } else {
                // 파일정보가 있을 경우 set
                if (obj.children[0].mediaUrl.includes('maapfile://')) {
                  let subImage = this.getFileInfo(obj.children[0].mediaUrl)
                  fileUrl = subImage.fileUrl
                  fileName = subImage.fileName
                  fileSize = Number(subImage.fileSize)
                  subMedia = `maapfile://${subImage.fileId}`
                  imgTplUtils.updateFileSize('add', fileSize)
                }
                this.detail.list.push({
                  fileUrl: fileUrl,
                  fileName: fileName,
                  fileSize: fileSize,
                  subMedia: subMedia,
                  subMediaUrl: obj.children[0].click.action.urlAction.openUrl.url
                })
              }
            }
          }
        })
      }
    },
    setTilteAndDescription() {
      try {
        this.titAndDesc.useTitle = true
        this.titAndDescInfo.title = this.userParams.filter(o => o.paramNm === 'title')[0].inputText
      } catch (e) {
        this.titAndDesc.useTitle = false
      }
      try {
        this.titAndDesc.useDescription = true
        this.titAndDescInfo.description = this.userParams.filter(o => o.paramNm === 'description')[0].inputText
      } catch (e) {
        this.titAndDesc.useDescription = false
      }
    },
    setButton() {
      this.buttons.btnList = []
      this.buttonJson.filter(o => o.visibility === 'visible').forEach(obj => {
        this.buttons.btnList.push(obj.click)
      })
    },
    getInputTextFromParam(variableWithCurly) {
      let variable = variableWithCurly.substring(variableWithCurly.indexOf('{{') + 2, variableWithCurly.indexOf('}}'))
      let param = this.userParams ? this.userParams.filter(o => o.paramNm === variable) : []
      return param.length > 0 ? param[0].inputText : ''
    },
    getFileInfo(maapFileUrl) {
      const fileId = maapFileUrl.split('maapfile://')[1]
      return this.images.filter(o => o.fileId === fileId)[0]
    },
    getParam() {
      let body = []
      let paramComponents = this.infoComponents.filter(comp => comp !== 'common' && comp !== 'buttons')
      paramComponents.forEach(comp => {
        if (comp === 'detail') {
          this.detailInfo.list.forEach((sub, idx) => {
            let defData = JSON.parse(JSON.stringify(defaultRefData[comp]))
            defData.forEach(data => {
              let property = data.param
              let userValue = sub[property]
              data.value = userValue || ''
              data.param = `${property}${idx + 1}`
              body.push(data)
            })
          })
        } else {
          let defData = JSON.parse(JSON.stringify(defaultRefData[comp]))
          defData.forEach(data => {
            let userValue = this.$refs[comp][0].info[data.param]
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
        save: 'N',
        body: body,
        buttons: [{ suggestions: this.buttonsInfo.btnList }]
      }
      return reqData
    },
    validateImageTemplate() {
      for (let i = 0; i < this.infoComponents.length; i++) {
        let comp = this.infoComponents[i]
        // 조회화면 - 승인요청은 필수값 입력 여부만 체크한다
        if (!this.$refs[comp][0].validateData()) {
          return Promise.resolve(false)
        }
      }
      return Promise.resolve(true)
    },
    /** 삭제 */
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
    /** 승인요청 */
    async applyImageTemplate() {
      if (await this.validateImageTemplate()) {
        this.$confirmMsg('운영자 승인이 완료되면 템플릿을 발송할 수 있습니다.<br/>승인요청 하시겠습니까?').then(() => {
          let formData = new FormData()
          let data = this.getParam()
          formData.append('data', JSON.stringify(data))
          updateTemplateDetailV2(this.commonInfo.brandId, formData).then(res => {
            this.$alertMsg('승인요청 되었습니다').then(() => {
              this.$router.go()
            })
          }).catch(err => {
            this.$alertMsg(err.desc)
          })
        })
      }
    },
    /** 승인요청 취소 */
    cancelApplyImageTemplate() {
      if (!this.isInspect) {
        let msg = ''
        if (this.templateData.status === 'APRV_NEW') {
          msg = '요청하셨던 템플릿 승인요청을 취소하시겠습니까?<br/>확인 선택 시 신청했던 정보는 저장 상태로 변경됩니다.'
        } else {
          msg = '요청하셨던 템플릿 수정 승인요청을 취소하시겠습니까?<br/>확인 선택 시 수정 하셨던 내용은 삭제되며, 승인완료 상태로 변경됩니다.'
        }
        this.$confirmMsg(msg).then(() => {
          cancleApplyTemplate(this.templateData.brandId, this.templateData.tplId).then((res) => {
            this.$store.commit('searchcondition/clearSearchCondition', ['TemplateList'])
            this.$alertMsg('승인요청이 취소되었습니다.').then(() => {
              this.goList()
            })
          }).catch(err => {
            this.$alertMsg(err.desc)
            this.goList()
          })
        })
      }
    },
    /** 수정 */
    doModify() {
      this.$emit('update:modify', true)
    },
    goList() {
      let router = {
        name: 'TemplateList',
        params: { brandId: this.commonInfo.brandId }
      }
      this.$router.push(router)
    },
    getInfoComponent(comp) {
      return `${comp}Info`
    },
    getDisableData(comp) {
      return this.disableData.hasOwnProperty(comp) ? this.disableData[comp] : ''
    },
    /** 템플릿 작성안내 팝업 오픈 */
    openGuidePopup() {
      this.showGuidePopup = true
    }
  }
}
</script>

<style>

</style>
