<template>
  <div class="rcs_emul_form_wrap">
  <!-- <div :class="{ 'rcs_emul_form_wrap' : !isImport }"> -->
  <!-- <div :class="{ isImport: 'rcs_emul_form_wrap' }"> -->
    <div class="rcs_emul_form_cont dv2023_formspace bd_no dv2023_ar-write">
      <!-- group 1 -->
      <div>
        <div class="rcs_item_bundle">
          <strong class="rcs_tit_bundle p-l0">
            자동응답 메시지 명 <span class="require">*</span>
          </strong>
          <div class="rcs_cont_bundle">
            <span class="custom_input w670">
              <input ref="name" v-model.trim="wrtAutoReply.name" @input="e => wrtAutoReply.name = e.target.value" maxlength="30" type="text" placeholder="자동응답 메시지 명을 입력해 주세요." class="paddingright64">
              <p class="dv2023_limitcount">(<span>{{ countDisplayTextLength(wrtAutoReply.name) }}</span>/30)</p>
            </span>
          </div>
        </div>
        <div class="rcs_item_bundle">
          <strong class="rcs_tit_bundle p-l0">
            템플릿 <span class="require">*</span>
          </strong>
          <div class="rcs_cont_bundle">
            <span v-if="isNew" class="custom_input ar-write-menu_templatebtn">
              <input disabled :value="wrtAutoReply.tplNm || ''"/>
              <a ref="tplId" href="javascript:void(0);" class="btn sml bd_black margintop12" @click="showTemplatePopup = true"><span>템플릿 선택</span></a>
              <p v-if="wrtAutoReply.tplId" class="info_desc2">{{ dispGuide }}</p>
            </span>
            <!-- 수정시 템플릿 변경 불가 -->
            <span v-else>{{ wrtAutoReply.tplNm }}</span>
          </div>
        </div>
      </div>
      <!-- group 2: 선택한 템플릿에 따라 구성이 달라진다. -->
      <div v-if="!templateInfo">
        <div class="rcs_item_bundle">
          <strong class="rcs_tit_bundle p-l0">
            내용 <span class="require">*</span>
          </strong>
          <div class="rcs_cont_bundle">
            <span class="w670">
              자동응답 템플릿을 선택하면 내용 입력이 가능합니다.
            </span>
          </div>
        </div>
      </div>
      <template v-else>
        <!-- 카드 선택 탭 -->
        <div v-if="templateInfo.maxCardCnt > 1">
          <div class="rcs_item_bundle">
            <strong class="rcs_tit_bundle p-l0"></strong>
            <div class="rcs_cont_bundle">
              <span class="custom_input w670">
                <ul>
                  <li v-for="idx in templateInfo.maxCardCnt" :key="`btnCard_${idx}`" @click="selectCardTab(idx - 1)" style="display: inline-block; margin-right: 10px">
                    <a href="javascript:void(0)" class="btn sml" :class="autoReplySelectedCardIdx === (idx - 1) ? 'black' : 'bd_black'">카드 {{ idx }}</a>
                  </li>
                </ul>
              </span>
            </div>
          </div>
        </div>
        <!-- 카드 데이터 -->
        <div v-for="(card, idx) in templateInfo.maxCardCnt" :key="`card_${idx}`" v-show="autoReplySelectedCardIdx === idx">
          <div class="rcs_item_bundle" v-if="templateInfo.maxMediaSize > 0" tabindex="0" :ref="`fileName${idx}`">
            <strong class="rcs_tit_bundle p-l0">
              이미지<span class="require"></span>
            </strong>
            <div class="length_area rcs_cont_bundle">
              <div class="box_add_file">
                <el-upload  ref action :on-change="onFileChange" :auto-upload="false" class="i_block">
                  <span class="custom_image_input readonly">
                    <a class="textover" v-if="wrtAutoReply.cardData[idx].fileName === ''">업로드 할 파일을 선택해 주세요.</a>
                    <a class="textover" v-else>{{ wrtAutoReply.cardData[idx].fileName }}</a>
                  </span>
                  <el-button v-if="!wrtAutoReply.cardData[idx].fileName" size="small" type="primary" class="btn sml bd_black">첨부</el-button>
                  <el-button v-else size="small" type="primary" class="btn sml bd_black" @click.stop="removeFileInfo(idx)">삭제</el-button>
                </el-upload>
                <span class="text_desc add_file">※ 권장사이즈 : {{ templateInfo.imgResWidth }}px X {{ templateInfo.imgResHeight }}px / 지원파일 : gif, jpeg, png, bmp / 메시지내 이미지 용량 총합 1MB</span>
              </div>
            </div>
          </div>
          <div class="rcs_item_bundle" v-if="templateInfo.maxTitleSize > 0">
            <strong class="rcs_tit_bundle p-l0">
              제목<span class="require"></span>
            </strong>
            <div class="rcs_cont_bundle">
              <span class="custom_input w670">
                <input type="text" v-model="wrtAutoReply.cardData[idx].title" @input="e => wrtAutoReply.cardData[idx].title = e.target.value" placeholder="제목을 입력해주세요." maxlength="30"/>
                <p class="dv2023_limitcount">(<span>{{ countDisplayTextLength(wrtAutoReply.cardData[idx].title) }}</span>/30)</p>
              </span>
            </div>
          </div>
          <div class="rcs_item_bundle">
            <strong class="rcs_tit_bundle p-l0">
              본문<span class="require"></span>
            </strong>
            <div class="rcs_cont_bundle">
              <span class="custom_input custom_textarea dv2023_hascount w670">
                <textarea :ref="`description${idx}`" v-model="wrtAutoReply.cardData[idx].description" @input="e => wrtAutoReply.cardData[idx].description = e.target.value" placeholder="본문을 입력해주세요." :maxlength="countDescMaxLength()"/>
                <p class="dv2023_limitcount">(<span>{{ totalCardDescriptionLength }}</span>/{{ templateInfo.maxDescrSize }})</p>
              </span>
            </div>
          </div>
          <!-- 버튼 -->
          <auto-reply-button-suggestion
            v-if="templateInfo.btnUseYn === 'Y'"
            :btnKey="idx"
            :ref="`button${idx}`"
            :templateInfo="templateInfo"
            :jsonCardData="wrtAutoReply.cardData[idx]"
            :buttonUseYn="wrtAutoReply.cardData[idx].buttonUseYn"
            :isNewbie="isNew" :isModify="isWrite"
            @changeUseYn="changeUseYn"/>
        </div>
      </template>
      <!-- group 3 -->
      <div style="width: 880px;">
        <!-- 칩리스트 -->
        <div class="rcs_item_bundle">
          <auto-reply-chip-list-suggestion
            ref="chips"
            :templateInfo.sync="templateInfo"
            :autoReplyData.sync="wrtAutoReply"
            :isNewbie="isNew"
            :isModify="isWrite"/>
        </div>
        <div class="rcs_item_bundle dv2023_addoverline" style="margin-top: 20px; padding-top: 20px;">
          <strong class="rcs_tit_bundle p-l0">
            메시지 복사 <span class="require">*</span>
          </strong>
          <div class="rcs_cont_bundle">
            <span class="custom_radio checked min">
              <input type="radio" id="copyAllow_Y" name="copyAllowYn" value="Y" v-model="wrtAutoReply.copyAllowedYn"/>
              <label for="copyAllow_Y"><span>가능</span></label>
            </span>
            <span class="custom_radio checked min">
              <input type="radio" id="copyAllow_N" name="copyAllowYn" value="N" v-model="wrtAutoReply.copyAllowedYn"/>
              <label for="copyAllow_N"><span>불가능</span></label>
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- 버튼 -->
    <div v-if="!isImport" class="btn_wrap dv2023_btnspace mar_t40 full_width temWrite btn_flex first">
      <a href="javascript:void(0);" class="btn mid bd_blue" @click="goBack"><span>이전</span></a>
      <a href="javascript:void(0);" class="btn mid bd_blue" v-if="!isNew" @click="remove"><span>삭제</span></a>
      <a href="javascript:void(0);" class="btn mid bd_blue" v-if="isNew || isSaved" @click="save"><span>임시저장</span></a>
      <a href="javascript:void(0);" class="btn mid blue" @click="register"><span>등록</span></a>
    </div>
    <!-- 자동응답 템플릿 선택 팝업 -->
    <auto-reply-template-popup v-if="showTemplatePopup" :visible.sync="showTemplatePopup" :brandId="brandId" :tplId="wrtAutoReply.tplId" @templateInfo="selectTemplate"/>
  </div>
</template>

<script>
import AutoReplyTemplatePopup from '@/views/service/components/autoreply/AutoReplyTemplatePopup'
import AutoReplyButtonSuggestion from '@/views/service/components/AutoReplyButtonSuggestion'
import AutoReplyChipListSuggestion from '@/views/service/components/AutoReplyChipListSuggestion'

import { retireveTemplateList, removeAutoReply, createAutoReply, saveAutoReply, getAutoReplySubmitData } from '@/api/service/autoReply'
export default {
  name: 'AutoReplyWrite',
  components: {
    AutoReplyTemplatePopup,
    AutoReplyButtonSuggestion,
    AutoReplyChipListSuggestion
  },
  props: {
    isImport: { type: Boolean, default: false }, // 다른 화면에서 import 하여 사용하는지?
    isNew: { type: Boolean, default: true },
    isWrite: { type: Boolean, default: true },
    autoReply: { type: Object, default: null }, // 원본 데이터
    wrtAutoReply: { type: Object, default: null }, // 사용자 작성 데이터
    autoReplyTemplate: { type: Object }, // 자동응담 메시지 템플릿 정보
    autoReplySelectedCardIdx: { type: Number, default: 0 } // 선택된 카드 인덱스
  },
  data() {
    return {
      brandId: '',
      defaultTplId: 'SCwThT00', // 자동응답메시지 기본 템플릿 ID(StandAlone Media Top(tall))
      templateInfo: {}, // 템플릿 정보
      remainImageSize: 0, // 업로드 가능 파일 용량
      chipUseYn: 'N',
      showTemplatePopup: false // 템플릿 팝업
    }
  },
  computed: {
    isSaved() { return !jglib.isEmpty(this.autoReply.aprvRet) && this.autoReply.aprvRet === 'SAVED' },
    isStandalone() { return this.templateInfo.cardType === 'SAS' || this.templateInfo.cardType === 'SAL' },
    isStandaloneMedia() { return this.templateInfo.cardType === 'SM' },
    isCarousel() { return this.templateInfo.cardType === 'CR' || this.templateInfo.cardType === 'CS' },
    /** 선택된 템플릿의 가이드 문구 */
    dispGuide() {
      if (!this.templateInfo) return ''
      else {
        if (this.templateInfo.cardType === 'SAS') return '※ 내용은 필수 입력 입니다.'
        else if (this.templateInfo.cardType === 'SAL') return '※ 내용은 필수, 제목은 선택 입력 입니다.'
        else if (this.templateInfo.cardType === 'SM') return '※ 이미지는 필수, 제목과 내용은 선택 입력 입니다.'
        else if (this.templateInfo.cardType === 'CR' || this.templateInfo.cardType === 'CS') return '※ 이미지, 제목, 내용은 모두 선택 입력 입니다. 단, 모든 항목을 입력하지 않은 경우, 버튼은 필수 입력 입니다.'
        else return ''
      }
    },
    productType() {
      if (this.templateInfo.cardType === 'CR' || this.templateInfo.cardType === 'CS') return 'carousel'
      else if (this.templateInfo.cardType === 'SM') return 'standaloneMedia'
      else return 'standalone'
    },
    totalCardDescriptionLength() {
      let totalLength = 0
      this.wrtAutoReply.cardData.forEach(x => { totalLength += x.description.length })
      return totalLength
    }
  },
  async created() {
    this.brandId = this.$route.params.brandId
    if (!this.isNew) {
      this.templateInfo = this.autoReplyTemplate
      this.remainImageSize = this.autoReplyTemplate.maxMediaSize
      this.chipUseYn = this.wrtAutoReply.chipSuggestions.length > 0 ? 'Y' : 'N'
    } else {
      let params = { brandId: 'common', cardSpec: 'richcard', productCd: 'C', status: 'ACTIVE', aprvRet: 'OK', orderKey: 'MAX_CARD_CNT,MAX_MEDIA_SIZE' }
      let res = await retireveTemplateList(this.brandId, params)
      let defTemplate = res.result.find(x => x.tplId === this.defaultTplId)
      this.selectTemplate(defTemplate)
    }
  },
  methods: {
    changeUseYn(type) {
      this.wrtAutoReply.cardData[this.autoReplySelectedCardIdx].buttonUseYn = type
    },
    /** 템플릿 선택 */
    selectTemplate(template) {
      this.templateInfo = template
      this.wrtAutoReply.tplId = template.tplId
      this.wrtAutoReply.tplNm = template.tplNm

      this.remainImageSize = template.maxMediaSize
      // 각 카드 데이터를 초기화
      this.wrtAutoReply.cardData = []
      for (let index = 0; index < template.maxCardCnt; index++) {
        let unit = { title: '', description: '', fileName: '', fileRaw: '', suggestions: [], buttonUseYn: 'N' }
        this.wrtAutoReply.cardData.push(unit)
      }
      this.wrtAutoReply.chipSuggestions = [] // 칩리스트 초기화
      this.isLoad = true
      this.$emit('update:autoReplyTemplate', template)
      this.$emit('update:autoReplySelectedCardIdx', 0)
    },
    /** 선택 카드 변경 */
    selectCardTab(idx) {
      this.$emit('update:autoReplySelectedCardIdx', idx)
    },
    calculDisplayMaxFileSize(value) {
      return value / (1024 * 1024)
    },
    /** 이미지 파일변경 */
    onFileChange(file) {
      // 용량 체크
      let maxFileSize = this.calculDisplayMaxFileSize(this.templateInfo.maxMediaSize)
      // 유효한 파일인지 체크
      let uploadCheck = jglib.checkFileData(file.raw, ['jpg', 'jpeg', 'png', 'gif', 'bmp'], maxFileSize)
      if (uploadCheck.code === 'errorExt' || uploadCheck.code === 'errorSize') this.$alertMsg(uploadCheck.message)
      else {
        let remainSize = this.remainImageSize - file.raw.size
        if (remainSize < 0) {
          this.$alertMsg('이미지 용량이 초과 되었습니다.')
        } else {
          this.remainImageSize = remainSize
          this.wrtAutoReply.cardData[this.autoReplySelectedCardIdx].fileRaw = file.raw
          this.wrtAutoReply.cardData[this.autoReplySelectedCardIdx].fileName = file.raw.name
          this.wrtAutoReply.cardData[this.autoReplySelectedCardIdx].fileUrl = ''
        }
      }
    },
    /** 이미지 삭제 */
    removeFileInfo(idx) {
      this.wrtAutoReply.cardData[idx].fileRaw = null
      this.wrtAutoReply.cardData[idx].fileName = ''
      this.wrtAutoReply.cardData[idx].fileUrl = ''
    },
    /** 이전 */
    goBack() {
      this.$confirmMsg('자동응답 메시지 작성을 취소하고<br>목록으로 돌아가시겠습니까?').then(() => {
        this.goList()
      })
    },
    /** 목록으로 */
    goList() {
      this.$router.push({ name: 'AutoReplyList', params: { brandId: this.brandId } })
    },
    /** 삭제 */
    remove() {
      this.$confirmMsg('자동응답 메시지를 삭제 하시겠습니까?').then(() => {
        removeAutoReply(this.brandId, this.wrtAutoReply.armId).then(res => {
          if (res.code === '20000000') this.goList()
        }).catch((err) => {
          this.$alertMsg(err.desc).then(() => {})
        })
      })
    },
    /** 데이터 검증 */
    validation(isSave) {
      // 1. 자동응답 명
      if (jglib.isEmpty(this.wrtAutoReply.name)) {
        this.$alertMsg('자동응답 메시지 명을 입력해 주세요.').then(() => this.$refs.name.focus())
        return Promise.resolve(false)
      }
      // 2. 템플릿
      if (jglib.isEmpty(this.wrtAutoReply.tplId)) {
        this.$alertMsg('템플릿을 선택해 주세요.').then(() => this.$refs.tplId.focus())
        return Promise.resolve(false)
      }
      // * 임시저장의 경우 버튼, 칩에서 'URL연결(내부 브라우저)'가 선택된 상태에서 파라미터에 json 형태인지만을 체크한다(as-is)
      if (isSave) {
        for (let i = 0; i < this.templateInfo.maxCardCnt; i++) {
          if (this.$refs[`button${i}`] && this.wrtAutoReply.cardData[i].suggestions.length > 0) {
            if (!this.$refs[`button${i}`][0].validateTempSave()) {
              this.selectCardTab(i)
              return Promise.resolve(false)
            }
          }
        }
        if (this.wrtAutoReply.chipSuggestions.length > 0) {
          if (!this.$refs['chips'].validateTempSave()) {
            return Promise.resolve(false)
          }
        }
      } else {
        // * 상품별 필수 데이터 유무를 체크한다.
        for (let i = 0; i < this.templateInfo.maxCardCnt; i++) {
          let cardData = this.wrtAutoReply.cardData[i]
          // 1. standalone(기본 텍스트, 텍스트 카드): 본문
          if (this.isStandalone) {
            if (jglib.isEmpty(cardData.description)) {
              this.$alertMsg('내용을 입력해 주세요.').then(() => this.$refs['description0'][0].focus())
              return Promise.resolve(false)
            }
          }
          // 2. standalone media top(tall, medium): 이미지
          if (this.isStandaloneMedia) {
            if (jglib.isEmpty(cardData.fileName)) {
              this.$alertMsg('이미지를 선택해 주세요.').then(() => this.$refs['fileName0'][0].focus())
              return Promise.resolve(false)
            }
          }
          // 3. carousel: 이미지, 제목, 본문이 모두 입력되지 않은 경우 버튼이 입력되었는지 확인
          if (this.isCarousel) {
            if (jglib.isEmpty(cardData.fileName) && jglib.isEmpty(cardData.title) && jglib.isEmpty(cardData.description) && cardData.suggestions.length === 0) {
              this.selectCardTab(i)
              this.$alertMsg('버튼을 선택해 주세요.').then(() => this.$refs[`button${i}`][0].focusCountSuggestion())
              return Promise.resolve(false)
            }
          }
          // 4. 버튼 데이터 검증
          if (this.$refs[`button${i}`] && this.$refs[`button${i}`].length > 0 && !this.$refs[`button${i}`][0].validateData()) {
            this.selectCardTab(i)
            return Promise.resolve(false)
          }
          // 5. 칩 리스트 검증
          if (!this.$refs['chips'].validateData()) {
            return Promise.resolve(false)
          }
        }
      }
      return Promise.resolve(true)
    },
    /** 저장 */
    async save() {
      // * 임시저장시 필수값(자동응답명, 템플릿)
      if (await this.validation(true)) {
        this.$alertMsg('입력하신 내용이 임시저장 됩니다.<br>등록을 완료하셔야 사용이 가능합니다.').then(() => {
          this.wrtAutoReply.status = 'APRV_NEW'
          this.wrtAutoReply.aprvRet = 'SAVED'
          let data = getAutoReplySubmitData(this.brandId, this.productType, this.wrtAutoReply, this.templateInfo)
          if (this.isNew) {
            createAutoReply(this.brandId, data).then(res => {
              if (res.code === '20000000') this.goList()
            }).catch((err) => {
              this.$alertMsg(err.desc).then(() => {})
            })
          } else {
            saveAutoReply(this.brandId, data).then(res => {
              if (res.code === '20000000') this.goList()
            }).catch((err) => {
              this.$alertMsg(err.desc).then(() => {})
            })
          }
        })
      }
    },
    /** 등록 */
    async register() {
      if (await this.validation(false)) {
        this.$confirmMsg('자동응답 메시지를 등록 하시겠습니까?').then(() => {
          this.wrtAutoReply.status = this.isNew ? 'APRV_NEW' : 'APRV_MOD'
          this.wrtAutoReply.aprvRet = 'WAITING'
          let data = getAutoReplySubmitData(this.brandId, this.productType, this.wrtAutoReply, this.templateInfo)
          if (this.isNew) {
            createAutoReply(this.brandId, data).then(res => {
              if (res.code === '20000000') this.goList()
            }).catch((err) => {
              this.$alertMsg(err.desc).then(() => {})
            })
          } else {
            saveAutoReply(this.brandId, data).then(res => {
              if (res.code === '20000000') this.goList()
            }).catch((err) => {
              this.$alertMsg(err.desc).then(() => {})
            })
          }
        })
      }
    },
    countDisplayTextLength(value) {
      return value ? value.length : 0
    },
    countDescMaxLength() {
      // 현재 카드의 maxlength 계산: 현재 카드를 제외하고 나머지 카드 내용에 입력된 길이만큼 차감시킨다.
      return this.templateInfo.maxDescrSize - this.wrtAutoReply.cardData.reduce((a, b, i) => {
        return a + (this.autoReplySelectedCardIdx !== i ? b.description.length : 0)
      }, 0)
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
