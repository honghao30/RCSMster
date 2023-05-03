<template>
  <div class="rbc_emul_form_wrap">
    <!-- depth1 -->
    <div class="rbc_emul_form_cont">
      <template v-if="!isNewbie">
        <div class="rbc_item_bundle">
          <strong class="rbc_tit_bundle">상태</strong>
          <div class="rbc_cont_bundle">{{autoReplyData.aprvRetNm}}</div>
        </div>
        <div class="rbc_item_bundle">
          <strong class="rbc_tit_bundle">자동응답 ID</strong>
          <div class="rbc_cont_bundle">{{autoReplyData.armId}}</div>
        </div>
      </template>
      <div class="rbc_item_bundle">
        <strong class="rbc_tit_bundle">자동응답 명 <span v-if="isNewbie" class="require">*</span></strong>
        <div v-if="!viewMode" class="rbc_cont_bundle">
          <div class="length_area">
            <span class="custom_input">
              <input type="text" ref="name" placeholder="자동응답 명을 입력해 주세요." @input="e => autoReplyData.name = e.target.value" v-model="autoReplyData.name" maxlength="30" />
            </span>
            <span class="length">(<em>{{ countDisplayTextLength(autoReplyData.name) }}</em>/30)</span>
          </div>
        </div>
        <div v-else class="rbc_cont_bundle">{{autoReplyData.name}}</div>
      </div>
      <div class="rbc_item_bundle">
        <strong class="rbc_tit_bundle">템플릿 <span v-if="isNewbie" class="require">*</span></strong>
        <div v-if="isNewbie" class="rbc_cont_bundle">
          <div class="length_area">
            <span class="custom_input min">
              <input type="text" v-model="autoReplyData.tplNm" readonly />
            </span>
            <a href="javascript:void(0);" ref="tplId" class="btn sml bd_black" @click="isSearchTmpl = true">
              <span>템플릿 선택</span>
            </a>
          </div>
          <!-- 2021.09.27 RBC고도화수정1 -->
          <p v-if="autoReplyData.tplId" class="info_desc2">{{dispGuide}}</p>
          <!-- // 2021.09.27 RBC고도화수정1 -->
        </div>
        <div v-else class="rbc_cont_bundle">{{autoReplyData.tplNm}}</div>
        <!-- depth2_area  -->
        <div class="depth2_area" v-if="templateInfo.maxCardCnt >= 1 && templateInfo.maxTitleSize > 0">
          <!-- tab -->
          <div class="tab_area mar_b10" v-if="templateInfo.maxCardCnt >= 2">
            <ul>
              <li v-for="idx in templateInfo.maxCardCnt + 1" :key="`btnCard_${idx-1}`" :class="{ 'active': idx - 1 === slideIndex }">
                <a :style="idx - 1 === slideIndex ? '' : 'background-image: none; padding-left: 15px'"  href="javascript:void(0);" v-if="idx <= templateInfo.maxCardCnt" @click="selectCardTab(idx)">카드{{idx}}</a>
              </li>
            </ul>
          </div>
          <!-- //tab -->
          <!-- 카드 -->
          <div v-for="idx in templateInfo.maxCardCnt + 1" :key="`card_${idx-1}`" v-show="idx - 1 === slideIndex" class="rbc_emul_form_cont bg_height">
            <div v-if="idx <= templateInfo.maxCardCnt" :ref="'fileName'+idx" class="rbc_item_bundle">
              <strong class="rbc_tit_bundle">내용 <span v-if="isNewbie && !isCarousel" class="require">*</span></strong>
              <div class="rbc_cont_bundle col2">
                <strong class="tit_area">- 제목</strong>
                <div class="length_area">
                  <span class="custom_input">
                    <input type="text" :ref="'title'+idx" @input="e => autoReplyData.cardData[idx-1].title = e.target.value" v-model="autoReplyData.cardData[idx-1].title" :maxlength="templateInfo.maxTitleSize" :disabled="viewMode">
                  </span>
                  <span v-if="!viewMode" class="length">(<em>{{countDisplayTextLength(autoReplyData.cardData[idx-1].title)}}</em>/{{templateInfo.maxTitleSize}})</span>
                </div>
              </div>
              <div class="rbc_cont_bundle col2">
                <strong class="tit_area">- 내용</strong>
                <div class="length_area">
                  <span class="custom_textarea">
                    <textarea :ref="'description'+idx" @input="e => autoReplyData.cardData[idx-1].description = e.target.value" v-model="autoReplyData.cardData[idx-1].description" :maxlength="countDescriptionRemainingLength()" :disabled="viewMode"></textarea>
                  </span>
                  <span v-if="!viewMode" class="length">(<em>{{countDescriptionLength()}}</em>/{{templateInfo.maxDescrSize}})</span>
                </div>
              </div>
              <div v-if="templateInfo.maxMediaSize > 0" class="rbc_cont_bundle col2">
                <strong class="tit_area">- 이미지</strong>
                <div v-if="viewMode" class="length_area text_area pad_l85">
                  {{autoReplyData.cardData[idx-1].fileName}}
                </div>
                <div v-else class="length_area">
                  <div class="box_add_file">
                    <el-upload ref action :on-change="onFileChange" :auto-upload="false" class="i_block">
                      <el-button size="small" type="primary" class="btn sml bd_black">이미지 선택</el-button>
                    </el-upload>
                    <span v-show="!autoReplyData.cardData[idx-1].fileName" class="text_desc add_file">권장사이즈 : {{templateInfo.imgResWidth}}px X {{templateInfo.imgResHeight}}px / 파일형식 : jpg, png({{calculDisplayMaxFileSize(templateInfo.maxMediaSize)}}MB/총합)</span> <!-- 2021.08.02 RBC고도화수정2 -->
                    <span v-show="autoReplyData.cardData[idx-1].fileName" class="text_desc add_file">
                      {{autoReplyData.cardData[idx-1].fileName}}
                      <a href="javascript:void(0);" @click="removeFileInfo" class="btn_delete"><span>삭제</span></a>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <auto-reply-button-suggestion :ref="'autoReplyButtonSuggestion'+idx" :templateInfo.sync="templateInfo" :jsonCardData.sync="autoReplyData.cardData[idx-1]"
                :isNewbie="isNewbie" :isModify="isModify" v-if="idx <= templateInfo.maxCardCnt"/>
          </div>
        </div>
      </div>
      <!-- 탬플릿 선택 전 -->
      <div v-if="templateInfo.tplId === undefined" class="rbc_item_bundle line2">
        <strong class="rbc_tit_bundle">내용 <span v-if="isNewbie" class="require">*</span></strong>
        <div class="rbc_cont_bundle">
          <div class="content_text_info">
            <p class="h4_title">
              자동응답 템플릿을 선택하면 내용 입력이 가능 합니다.
            </p>
          </div>
        </div>
      </div>
      <!-- SMS standard 탬플릿 선택 -->
      <div v-if="templateInfo.maxCardCnt < 2 && templateInfo.maxTitleSize == 0 && templateInfo.maxMediaSize == 0" class="rbc_item_bundle">
        <strong class="rbc_tit_bundle">내용 <span v-if="isNewbie" class="require">*</span></strong>
        <div class="rbc_cont_bundle">
          <div class="length_area">
            <span class="custom_textarea">
              <textarea :ref="'description1'" v-model="autoReplyData.cardData[0].description" :maxlength="templateInfo.cardBodySize"></textarea>
            </span>
            <span class="length">(<em>{{countDisplayTextLength(autoReplyData.cardData[0].description)}}</em>/{{templateInfo.cardBodySize}})</span>
          </div>
        </div>
      </div>
      <auto-reply-chip-list-suggestion ref="autoReplyChipListSuggestion" :templateInfo.sync="templateInfo" :autoReplyData.sync="autoReplyData"
          :isNewbie="isNewbie" :isModify="isModify"/>
      <div class="rbc_item_bundle line2">
        <strong class="rbc_tit_bundle">메시지 복사</strong>
        <div v-if="!viewMode" class="rbc_cont_bundle">
          <span class="custom_radio min">
            <input type="radio" name="copyAllowedYn" id="copyAllowedYes" v-model="autoReplyData.copyAllowedYn" value="Y" :disabled="templateInfo.tplId === undefined">
            <label for="copyAllowedYes">가능</label>
          </span>
          <span class="custom_radio min">
            <input type="radio" name="copyAllowedYn" id="copyAllowedNo" v-model="autoReplyData.copyAllowedYn" value="N" :disabled="templateInfo.tplId === undefined">
            <label for="copyAllowedNo">불가능</label>
          </span>
        </div>
        <div v-else class="rbc_cont_bundle">{{labelCopyAllowed}}</div>
      </div>
      <div v-if="!isNewbie" class="rbc_item_bundle line">
        <strong class="rbc_tit_bundle">등록일</strong>
        <div class="rbc_cont_bundle"> {{autoReplyData.dpRegDt}} / {{autoReplyData.regUserNm}}</div>
      </div>
    </div>
    <div class="btn_wrap center mar_t40">
      <a href="javascript:void(0);" v-if="!viewMode" @click="doCancel" class="btn mid bd_blue"><span>취소</span></a>
      <a href="javascript:void(0);" v-if="viewMode" @click="goList" class="btn mid bd_blue"><span>목록</span></a>
      <a href="javascript:void(0);" v-if="!isNewbie && !waiting" @click="doRemove" class="btn mid blue"><span>삭제</span></a>
      <a href="javascript:void(0);" v-if="viewMode && !waiting" @click="goModify" class="btn mid black"><span>수정</span></a>
      <a href="javascript:void(0);" v-if="isNewbie || (isModify && autoReplyData.aprvRet === 'SAVED')" @click="doSave" class="btn mid blue"><span>저장</span></a>
      <a href="javascript:void(0);" v-if="!viewMode" @click="doRegist" class="btn mid black"><span>등록</span></a>
    </div>

    <auto-reply-template-popup v-if="isSearchTmpl" :visible.sync="isSearchTmpl" @templateInfo="selectTemplate"/>

  </div>
</template>

<script>

import AutoReplyTemplatePopup from '@/views/service/components/AutoReplyTemplatePopup'
import AutoReplyButtonSuggestion from '@/views/service/components/AutoReplyButtonSuggestion'
import AutoReplyChipListSuggestion from '@/views/service/components/AutoReplyChipListSuggestion'

import { createAutoReply, saveAutoReply,
  reformSuggestionForRequest, removeAutoReply } from '@/api/service/autoReply'

export default {
  name: 'AutoReplyWrite',
  props: {
    isNewbie: {
      type: Boolean,
      required: true
    },
    isModify: {
      type: Boolean,
      required: true
    },
    autoReplyInfo: {
      type: Object,
      required: true
    },
    templateContentInfo: {
      type: Object
    },
    currCardIdx: {
      type: Number,
      default: 0
    }
  },
  components: {
    AutoReplyTemplatePopup,
    AutoReplyButtonSuggestion,
    AutoReplyChipListSuggestion
  },
  data() {
    return {
      autoReplyData: {},
      isSearchTmpl: false,
      templateInfo: {},
      slideIndex: 0,
      remainImageSize: null
    }
  },
  computed: {
    viewMode() {
      return !this.isNewbie && !this.isModify
    },
    waiting() {
      return this.autoReplyData.aprvRet === 'WAITING' || this.autoReplyData.aprvRet === 'INSPECTED'
    },
    isOnlyStandalone() {
      return this.templateInfo.cardType === 'SAS' || this.templateInfo.cardType === 'SAL'
    },
    isStandaloneMedia() {
      return this.templateInfo.cardType === 'SM'
    },
    isCarousel() {
      return this.templateInfo.cardType === 'CR' || this.templateInfo.cardType === 'CS'
    },
    labelCopyAllowed() {
      return this.autoReplyData.copyAllowedYn === 'Y' ? '가능' : '불가능'
    },
    dispGuide() {
      let guide
      if (this.templateInfo.cardType === 'SAS') guide = '- 내용은 필수 입력 입니다.'
      else if (this.templateInfo.cardType === 'SAL') guide = '- 내용은 필수, 제목은 선택 입력 입니다.'
      else if (this.templateInfo.cardType === 'SM') guide = '- 이미지는 필수, 제목과 내용은 선택 입력 입니다.'
      else if (this.templateInfo.cardType === 'CR' || this.templateInfo.cardType === 'CS') guide = '- 이미지, 제목, 내용은 모두 선택 입력 입니다. 단, 모든 항목이 입력이 없는 경우, 버튼은 필수 입력 입니다.'
      return guide
    }
  },
  watch: {
    currCardIdx(n, o) {
      this.selectCardTab(n + 1)
    }
  },
  created() {
    this.autoReplyData = this.autoReplyInfo
    this.templateInfo = this.templateContentInfo
  },
  mounted() {
  },
  methods: {
    selectTemplate(templateInfo) {
      this.templateInfo = templateInfo
      this.autoReplyData.tplId = templateInfo.tplId
      this.autoReplyData.tplNm = templateInfo.tplNm

      this.autoReplyData.cardData = []
      for (let index = 0; index < templateInfo.maxCardCnt; index++) {
        let unit = {
          title: '',
          description: '',
          fileName: '',
          fileRaw: '',
          suggestions: []
        }

        this.autoReplyData.cardData.push(unit)
        this.slideIndex = 0
        this.autoReplyData.chipSuggestions = []
        this.$emit('update:currCardIdx', this.slideIndex)
      }
      this.$emit('update:templateContentInfo', this.templateInfo)
    },
    selectCardTab(idx) {
      this.slideIndex = idx - 1
      this.$emit('update:currCardIdx', this.slideIndex)
    },
    countDisplayTextLength(value) {
      return value ? value.length : 0
    },
    countDescriptionLength() {
      return this.autoReplyData.cardData.reduce((a, b) => {
        return a + b.description.length
      }, 0)
    },
    countDescriptionRemainingLength() {
      // 현재 카드의 maxlength 계산: 현재 카드를 제외하고 나머지 카드 내용에 입력된 길이만큼 차감시킨다.
      return this.templateInfo.maxDescrSize - this.autoReplyData.cardData.reduce((a, b, i) => {
        return a + (this.slideIndex !== i ? b.description.length : 0)
      }, 0)
    },
    calculDisplayMaxFileSize(value) {
      return value / (1024 * 1024)
    },
    onFileChange(file) {
      let fileRaw = file.raw
      if (this.remainImageSize === null) {
        this.remainImageSize = this.templateInfo.maxMediaSize
        this.remainImageSize = 1 * 1024 * 1024
      }
      let maxFileSize = this.calculDisplayMaxFileSize(this.templateInfo.maxMediaSize)

      let uploadCheck = jglib.checkFileData(fileRaw, ['jpg', 'jpeg', 'png'], maxFileSize)
      if (uploadCheck.code === 'errorExt') {
        this.$alertMsg(uploadCheck.message)
      } else if (uploadCheck.code === 'errorSize') {
        this.$alertMsg(uploadCheck.message)
      } else {
        const checkRemainImageSize = this.remainImageSize - fileRaw.size
        if (checkRemainImageSize < 0) {
          this.$alertMsg('여러 자동응답카드에 사용된 이미지의 총합이 1MB를 초과하여 자동응답을 등록할 수 없습니다.')
          return
        }
        this.remainImageSize = checkRemainImageSize
        this.autoReplyData.cardData[this.slideIndex].fileRaw = fileRaw
        this.autoReplyData.cardData[this.slideIndex].fileName = fileRaw.name
        this.autoReplyData.cardData[this.slideIndex].fileUrl = ''
        this.autoReplyData.cardData[this.slideIndex].fileSize = fileRaw.size
      }
    },
    removeFileInfo() {
      let fileNm = this.autoReplyData.cardData[this.slideIndex].fileName
      return this.$confirmMsg(`${fileNm} 파일을 삭제 하시겠습니까?`)
        .then(res => {
          this.autoReplyData.cardData[this.slideIndex].fileRaw = ''
          this.autoReplyData.cardData[this.slideIndex].fileName = ''
          this.autoReplyData.cardData[this.slideIndex].fileUrl = ''
          this.autoReplyData.cardData[this.slideIndex].imageData = ''

          this.remainImageSize = this.remainImageSize + this.autoReplyData.cardData[this.slideIndex].fileSize
          this.autoReplyData.cardData[this.slideIndex].fileSize = 0

          delete this.autoReplyData.cardData[this.slideIndex].media

          this.$forceUpdate()
        }).catch(e => {})
    },
    goList() {
      let router = {
        name: 'AutoReplyListOld',
        params: { brandId: this.autoReplyData.brandId }
      }
      this.$router.push(router)
    },
    goModify() {
      this.$emit('update:isModify', true)
    },
    doCancel() {
      this.$confirmMsg('작업을 취소하시겠습니까?')
        .then(res => {
          this.goList()
        }).catch(e => {})
    },
    doRemove() {
      this.$confirmMsg('자동응답을 삭제하시겠습니까?', null, null, '닫기')
        .then(res => {
          removeAutoReply(this.autoReplyData.brandId, this.autoReplyData.armId).then(res => {
            this.goList()
          }).catch(err => {
            this.$alertMsg(err.desc)
          })
        }).catch(e => {})
    },
    doSave() {
      if (!this.validateTempSave()) {
        return false
      }

      this.$confirmMsg('입력하신 내용이 저장 됩니다.<br>등록완료하셔야 사용이 가능합니다.')
        .then(res => {
          if (this.isNewbie) {
            this.autoReplyData.status = 'APRV_NEW'
            this.autoReplyData.aprvRet = 'SAVED'

            let formData = this.getSubmitData()

            createAutoReply(this.autoReplyData.brandId, formData).then(res => {
              // this.goList()
              // this.$router.go()

              let armId = res.result
              let brandId = this.autoReplyData.brandId
              let router = {
                name: 'AutoReplyInfo',
                params: { brandId: brandId, armId: armId }
              }
              this.$router.push(router)
            }).catch(err => {
              this.$alertMsg(err.desc)
            })
          } else {
            this.autoReplyData.status = 'APRV_NEW'
            this.autoReplyData.aprvRet = 'SAVED'

            let formData = this.getSubmitData()

            saveAutoReply(this.autoReplyData.brandId, formData).then(res => {
              // this.goList()
              this.$router.go()
            }).catch(err => {
              this.$alertMsg(err.desc)
            })
          }
        }).catch(e => {})
    },
    doRegist() {
      if (!this.validateAutoRely()) {
        return false
      }
      this.$confirmMsg('자동응답을 등록하시겠습니까?', null, null, '닫기')
        .then(res => {
          if (jglib.isEmpty(this.autoReplyData.status) || this.autoReplyData.status === 'APRV_NEW') {
            this.autoReplyData.status = 'APRV_NEW'
            this.autoReplyData.aprvRet = 'WAITING'
          } else {
            this.autoReplyData.status = 'APRV_MOD'
            this.autoReplyData.aprvRet = 'WAITING'
          }

          let formData = this.getSubmitData()
          if (this.isNewbie) {
            createAutoReply(this.autoReplyData.brandId, formData).then(res => {
              this.goList()
            }).catch(err => {
              this.$alertMsg(err.desc)
            })
          } else {
            saveAutoReply(this.autoReplyData.brandId, formData).then(res => {
              this.goList()
            }).catch(err => {
              this.$alertMsg(err.desc)
            })
          }
        }).catch(e => {})
    },
    getSubmitData() {
      let body = {}
      let buttons = []

      let _cardData = _.cloneDeep(this.autoReplyData.cardData)
      if (_cardData) {
        for (let idx in _cardData) {
          let disIdx = parseInt(idx) + 1
          if (this.isCarousel) {
            body['title' + disIdx] = _cardData[idx].title
            body['description' + disIdx] = _cardData[idx].description
            body['media' + disIdx] = _cardData[idx].media
          } else {
            if (this.templateInfo.cardType !== 'SAS') body['title'] = _cardData[idx].title // 기본 말풍선은 title 항목이 없음
            body['description'] = _cardData[idx].description
            if (this.isStandaloneMedia) body['media'] = _cardData[idx].media
          }

          if (this.templateInfo.btnUseYn === 'Y' && !jglib.isEmpty(_cardData[idx].suggestions) && _cardData[idx].suggestions.length > 0) {
            // 버튼 화면 관리 목적으로 넣은 type 삭제
            reformSuggestionForRequest(_cardData[idx].suggestions)

            let suggestions = { suggestions: _cardData[idx].suggestions }
            buttons.push(suggestions)
          } else {
            buttons.push({})
          }
        }
      }

      // console.log('########################### body : ' + JSON.stringify(body))
      // console.log('########################### buttons : ' + JSON.stringify(buttons))

      let chipList = []
      let _chipSuggestions = this.autoReplyData.chipSuggestions
      if (!jglib.isEmpty(_chipSuggestions) && _chipSuggestions.length > 0) {
        // 버튼 화면 관리 목적으로 넣은 type 삭제
        reformSuggestionForRequest(_chipSuggestions)
        chipList = _chipSuggestions
      }

      // console.log('################# ', JSON.stringify(this.autoReplyData))
      let formData = new FormData()
      let reqData = {
        armId: this.autoReplyData.armId,
        brandId: this.autoReplyData.brandId,
        name: this.autoReplyData.name,
        tplId: this.autoReplyData.tplId,
        copyAllowedYn: this.autoReplyData.copyAllowedYn,
        status: this.autoReplyData.status,
        aprvRet: this.autoReplyData.aprvRet,
        body: JSON.stringify(body)
      }
      if (!this.isEmptyButtons(buttons)) reqData['buttons'] = JSON.stringify(buttons)
      if (!jglib.isEmpty(chipList)) reqData['chipList'] = JSON.stringify(chipList)

      formData.append('data', JSON.stringify(reqData))

      if (this.autoReplyData.cardData && this.autoReplyData.cardData.length > 0) {
        for (let index in this.autoReplyData.cardData) {
          let cardData = this.autoReplyData.cardData[index]
          if (this.isCarousel) {
            let fileIdx = parseInt(index) + 1
            formData.append('file' + fileIdx, cardData.fileRaw)
          } else {
            formData.append('file', cardData.fileRaw)
          }
        }
      }
      return formData
    },
    validateAutoRely() {
      if (jglib.isEmpty(this.autoReplyData.name)) {
        this.$alertMsg('자동응답명을 입력해 주세요.').then(() => {
          this.$refs.name.focus()
        })
        return false
      }

      if (jglib.isEmpty(this.autoReplyData.tplId)) {
        this.$alertMsg('템플릿을 선택해 주세요.').then(() => {
          this.$refs.tplId.focus()
        })
        return false
      }
      // console.log('this.templateInfo.maxCardCnt', this.templateInfo.maxCardCnt)
      for (let idx = 0; idx < this.templateInfo.maxCardCnt; idx++) {
        // Standalone 일 경우 description 필수 체크
        if (this.isOnlyStandalone && jglib.isEmpty(this.autoReplyData.cardData[idx].description)) {
          this.selectCardTab(idx + 1)

          this.$alertMsg('내용을 입력해 주세요.').then(() => {
            // console.log('description'+(idx+1), this.$refs['description'+(idx+1)], this.$refs['description'+(idx+1)][0])
            if (this.$refs['description' + (idx + 1)][0]) this.$refs['description' + (idx + 1)][0].focus()
            else this.$refs['description' + (idx + 1)].focus()
          })
          return false
        }

        // Standalone Media 인 경우 이미지 필수 체크
        if (this.templateInfo.maxMediaSize > 0 && this.isStandaloneMedia && jglib.isEmpty(this.autoReplyData.cardData[idx].fileName)) {
          this.selectCardTab(idx + 1)

          this.$alertMsg('이미지를 선택해 주세요.').then(() => {
            this.$refs['fileName' + (idx + 1)][0].scrollIntoView()
          })
          return false
        }

        // Carousel 인 경우 title/description/image 모두 없을 경우 필수 체크
        if (this.isCheckButton(this.autoReplyData.cardData[idx])) {
          this.selectCardTab(idx + 1)
          this.$alertMsg('버튼을 선택해 주세요.').then(() => {
            this.$refs['autoReplyButtonSuggestion' + (idx + 1)][0].focusCountSuggestion()
          })
          return false
        }

        if (this.$refs['autoReplyButtonSuggestion' + (idx + 1)] && !this.$refs['autoReplyButtonSuggestion' + (idx + 1)][0].validateData()) {
          this.selectCardTab(idx + 1)
          return false
        }
      }

      if (!this.$refs.autoReplyChipListSuggestion.validateData()) {
        return false
      }

      return true
    },
    validateTempSave() {
      if (jglib.isEmpty(this.autoReplyData.name)) {
        this.$alertMsg('자동응답명을 입력해 주세요.').then(() => {
          this.$refs.name.focus()
        })
        return false
      }

      if (this.templateInfo.tplId === undefined) {
        this.$alertMsg('템플릿 선택 후 저장 가능 합니다.')
        return false
      }

      for (let idx = 0; idx < this.templateInfo.maxCardCnt; idx++) {
        if (this.$refs['autoReplyButtonSuggestion' + (idx + 1)] && !this.$refs['autoReplyButtonSuggestion' + (idx + 1)][0].validateTempSave()) {
          this.selectCardTab(idx + 1)
          return false
        }
      }

      if (!this.$refs.autoReplyChipListSuggestion.validateTempSave()) {
        return false
      }

      return true
    },
    isCheckButton(cardData) {
      // Carousel 인 경우 title/description/image 모두 없을 경우 버튼 필수 체크
      return this.isCarousel && jglib.isEmpty(cardData.title) && jglib.isEmpty(cardData.description) && jglib.isEmpty(cardData.fileName) &&
            cardData.suggestions.length === 0
    },
    isEmptyButtons(buttons) {
      if (jglib.isEmpty(buttons)) return true

      for (let idx in buttons) {
        if (!jglib.isEmpty(buttons[idx])) return false
      }
      return true
    }
  }
}
</script>
