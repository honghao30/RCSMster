<template>
  <div v-if="viewMode">
    <div v-if="info.list.length > 0">
      <div class="rcs_item_bundle">
      <strong class="rcs_tit_bundle p-l0">
        상세
      </strong>
        <div class="rcs_cont_bundle rcs_cont_detail_repeat">
          <div v-for="(item, idx) in info.list" :key="idx" style="width: 670px;">
            <div class="detail_num">
              상세 {{ idx + 1 }}
            </div>
            <div class="rcs_cont_detail_wrap" v-if="showSubTitle">
              <div class="rcs_cont_detail_tit">
                제목
              </div>
              <div class="rcs_cont_detail_cont">
                <span class="custom_input w590" v-html="prettyNewlineAndBlank(item.subTitle)"></span>
              </div>
            </div>
            <div class="rcs_cont_detail_wrap" v-if="showSubImage">
              <div class="rcs_cont_detail_tit">
                이미지
              </div>
              <div class="rcs_cont_detail_cont">
                <span class="custom_input w590">{{ item.fileName || '-' }}</span>
              </div>
            </div>
            <!-- 미노출처리 -->
            <div class="rcs_cont_detail_wrap" v-if="showSubUrl">
              <div class="rcs_cont_detail_tit">
                URL 연결
              </div>
              <div class="rcs_cont_detail_cont">
                <span class="custom_input w590">{{ item.subMediaUrl || '-' }}</span>
              </div>
            </div>
            <div class="rcs_cont_detail_wrap" v-if="showSubDesc">
              <div class="rcs_cont_detail_tit">
                내용
              </div>
              <div class="rcs_cont_detail_cont">
                <span class="custom_input w590" v-html="prettyNewlineAndBlank(item.subDesc)"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="rcs_item_bundle">
      <strong class="rcs_tit_bundle p-l0">
        상세
      </strong>
      <div class="rcs_cont_bundle rcs_cont_detail_repeat">
        <div v-for="(item, idx) in info.list" :key="idx">
          <div class="detail_num">
            상세 {{ idx + 1 }}
            <span v-if="idx < info.minCnt" class="require">*</span>
          </div>
          <div class="rcs_cont_detail_wrap" v-if="showSubTitle">
            <div class="rcs_cont_detail_tit">
              제목
            </div>
            <div class="rcs_cont_detail_cont">
              <span class="custom_input w590">
                <input class="p_byte" placeholder="제목을 입력해주세요" style="resize: none" :ref="`subTitle${idx}`" v-model="item.subTitle" @input="e => item.subTitle = e.target.value">
                <span class="input_byte">
                  (<span :style="calcLength(item.subTitle) > maxSubTitLength ? 'color: red;' : ''">{{ calcLength(item.subTitle) }}</span>/{{ maxSubTitLength }}자)
                </span>
              </span>
            </div>
          </div>
          <div class="rcs_cont_detail_wrap" v-if="showSubImage">
            <div class="rcs_cont_detail_tit">
              이미지
            </div>
            <div class="rcs_cont_detail_cont">
              <span class="custom_image w590">
                <el-upload :ref="`subMedia${idx}`" action :on-change="(file) => onFileChange(idx, file)" :on-remove="(file) => onFileRemove(idx)" :auto-upload="false" :accept="acceptType" class="i_block">
                  <span class="custom_image_input readonly w490">
                    <a class="textover">{{ getFileName(idx) }}</a>
                  </span>
                  <el-button v-if="item.fileSrc || item.subMedia" size="small" type="primary" class="btn sml bd_black" @click.stop="onFileRemove(idx)">삭제</el-button>
                  <el-button v-else size="small" type="primary" class="btn sml bd_black">첨부</el-button>
                  <p class="custom_input_etc">권장 사이즈: 300px X 300px ㅣ 지원 파일 : gif, jpeg, jpg, png, bmp ㅣ 메시지 내 이미지 용량 총합 1MB</p>
                </el-upload>
              </span>
            </div>
          </div>
          <!-- 미노출 처리 -->
          <div class="rcs_cont_detail_wrap" v-if="showSubUrl">
            <div class="rcs_cont_detail_tit">
              URL 연결
            </div>
            <div class="rcs_cont_detail_cont">
              <span class="custom_input w590">
                <input :ref="`subMediaUrl${idx}`" class="p_byte" type="text" placeholder="http://www.rcsbizcenter.com 형식으로 입력" v-model.trim="item.subMediaUrl" @keydown="e => { if (e.keyCode === 32) e.preventDefault() }" @input="e => item.subMediaUrl = e.target.value" maxlength="100">
                <span class="input_byte">({{ item.subMediaUrl.length }}/100자)</span>
              </span>
            </div>
          </div>
          <div class="rcs_cont_detail_wrap" v-if="showSubDesc">
            <div class="rcs_cont_detail_tit">
              내용
            </div>
            <div class="rcs_cont_detail_cont">
              <span class="custom_input  w590">
                <textarea class="p_byte" :placeholder="`본문을 입력해 주세요.\n예시 : 안녕하세요 \{\{이름\}\}님. RCS Biz Center입니다.`" style="resize: none"
                  :ref="`subDesc${idx}`" v-model="item.subDesc" @input="e => item.subDesc = e.target.value"></textarea>
                <span class="input_byte textarea">
                  (<span :style="calcLength(item.subDesc) > maxSubDescLength ? 'color: red;' : ''">{{ calcLength(item.subDesc) }}</span>/{{ maxSubDescLength }}자)
                </span>
              </span>
              <div class="detail_add" v-if="showAddBtn(idx)" @click="addDetailElement"> 상세 추가</div>
            </div>
          </div>
          <!-- 삭제 버튼 -->
          <div class="rcs_cont_detail_delete" v-if="showRemoveBtn(idx)" @click="removeDetailElement(idx)">제거</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MessageBaseFormUtils from '@/components/messageTemplate/js/MessageBaseFormUtils'
import imgTplUtils from '@/components/imageTemplate/js/imageTemplateUtils'
import comlib from '@/components/messageTemplate/js/common'
export default {
  name: 'detail',
  props: {
    info: {
      type: Object,
      default: null
    },
    disableData: {
      type: String,
      default: null
    },
    paramInfo: {
      type: Array,
      default: null
    },
    ctnInfo: {
      type: Object,
      defualt: null
    },
    viewMode: {
      type: Boolean,
      default: false
    },
    modify: {
      type: Boolean
    }
  },
  data() {
    return {
      originImageArr: new Array(3)
    }
  },
  computed: {
    showSubTitle() { return !this.disableData.includes('subTitle') },
    showSubImage() { return !this.disableData.includes('subImage') },
    showSubUrl() { return !this.disableData.includes('subMediaUrl') },
    showSubDesc() { return !this.disableData.includes('subDesc') },
    maxSubTitLength() { return this.getMaxLength('subTitle1') },
    maxSubDescLength() { return this.getMaxLength('subDesc1') },
    totFileSize() { return this.$store.getters.getTotalFileSize },
    getFileName() {
      return (idx) => {
        if (!comlib.isEmpty(this.info.list[idx].fileName)) return this.info.list[idx].fileName
        else return '업로드할 이미지를 선택해주세요'
      }
    },
    acceptType() {
      let fileTypes = imgTplUtils.getAcceptFileType()
      return fileTypes.map(x => { return `.${x}` }).join(',')
    }
  },
  created() {},
  methods: {
    showAddBtn(idx) {
      // 최대 개수를 초과하지 않고, 마지막 요소에 추가
      let cnt = this.info.list.length
      return ((idx + 1) === cnt && cnt < this.info.maxCnt)
    },
    showRemoveBtn(idx) {
      return this.info.minCnt < (idx + 1) && !this.viewMode
    },
    addDetailElement() {
      this.info.list.push({ subTitle: '', subMedia: '', subMediaUrl: '', subDesc: '', fileSrc: '', fileType: '', fileName: '', fileUrl: '' })
    },
    removeDetailElement(idx) {
      this.info.list.splice(idx, 1)
    },
    crop(idx) {
      let MAX_WIDTH = 300 // 300px 고정
      let MAX_HEIGHT = 300 // 300px 고정
      let ORIGIN_WIDTH = this.originImageArr[idx].naturalWidth
      let ORIGIN_HEIGHT = this.originImageArr[idx].naturalHeight
      // crop
      let canvas = document.createElement('canvas')
      canvas.width = MAX_WIDTH
      canvas.height = MAX_HEIGHT
      let ctx = canvas.getContext('2d')

      let hRatio = canvas.height / ORIGIN_HEIGHT
      let wRatio = canvas.width / ORIGIN_WIDTH
      let zoomRatio = Math.max(hRatio, wRatio)
      let stX = (canvas.width - (ORIGIN_WIDTH * zoomRatio)) / 2
      let stY = (canvas.height - (ORIGIN_HEIGHT * zoomRatio)) / 2
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(this.originImageArr[idx], 0, 0, ORIGIN_WIDTH, ORIGIN_HEIGHT, stX, stY, ORIGIN_WIDTH * zoomRatio, ORIGIN_HEIGHT * zoomRatio)
      let type = imgTplUtils.getImageType(this.originImageArr[idx].src)
      let dataurl = canvas.toDataURL(type)
      let img = imgTplUtils.convertCanvasToFile(dataurl, type)
      console.info(`# detail[${idx}] - crop: ${img.size} byte`)
      if (this.ctnInfo.maxMediaSize < this.totFileSize + img.size) {
        this.$alertMsg('자동 리사이즈된 메시지 내 이미지 용량의 합계가 1MB를 초과하였습니다.<br>원본 이미지의 용량 조정 후 등록해 주세요.').then(() => {
          this.originImageArr.splice(idx, 1) // 원본이미지 제거
          this.info.list[idx].fileName = ''
        })
      } else {
        this.info.list[idx].fileSrc = dataurl
        this.info.list[idx].fileType = type
        this.info.list[idx].fileSize = img.size
        imgTplUtils.updateFileSize('add', img.size)

        let updateList = [...this.info.list]
        updateList.splice(idx, 1, this.info.list[idx]) // 현재 index에 위치한 요소를 제거 후, 추가(fileSrc 감지 위헤)
        this.info.list = updateList
      }
    },
    onFileChange(idx, file) {
      let reader = new FileReader()
      let fileRaw = file.raw
      let isValidImg = jglib.checkFileData(fileRaw, imgTplUtils.getAcceptFileType(), 1)
      if (isValidImg.code === 'errorExt' || isValidImg.code === 'errorSize') {
        this.$alertMsg(isValidImg.message).then(() => {
          this.$refs[`subMedia${idx}`][0].$el.children[0].focus()
        })
      } else {
        if (this.info.list[idx].fileName !== '') {
          // 이미 등록되어 있는 파일이 있음
          imgTplUtils.updateFileSize('sub', this.info.list[idx].fileSize)
        }
        reader.readAsDataURL(fileRaw)
        reader.onload = (e) => {
          this.info.list[idx].fileName = file.name
          this.originImageArr[idx] = new Image()
          this.originImageArr[idx].src = e.target.result
          this.originImageArr[idx].onload = () => {
            this.crop(idx)
          }
        }
      }
    },
    onFileRemove(idx) {
      // 파일 제거시 데이터 초기화
      this.originImageArr[idx] = null
      this.info.list[idx].fileSrc = ''
      this.info.list[idx].fileName = ''
      imgTplUtils.updateFileSize('sub', this.info.list[idx].fileSize) // this.$store.dispatch('setTotalFileSize', subFileSize)
      this.info.list[idx].fileSize = 0
      if (this.modify && !comlib.isEmpty(this.info.list[idx].subMedia)) {
        this.info.list[idx].fileUrl = ''
        this.info.list[idx].subMedia = ''
      }
    },
    validateData(isSave = false) {
      for (let idx = 0; idx <= this.info.list.length - 1; idx++) {
        let item = this.info.list[idx]
        if (this.viewMode) {
          if (this.showSubTitle) {
            if (jglib.isEmpty(item.subTitle)) {
              this.$alertMsg(`상세 ${idx + 1} 제목의 내용을 입력해 주세요.`)
              return false
            }
          }
          if (this.showSubImage) {
            if (jglib.isEmpty(item.fileSrc) && jglib.isEmpty(item.subMedia)) {
              this.$alertMsg(`상세 ${idx + 1} 이미지를 첨부해주세요.`)
              return false
            }
          }
          if (this.showSubDesc) {
            if (jglib.isEmpty(item.subDesc)) {
              this.$alertMsg(`상세 ${idx + 1} 본문의 내용을 입력해 주세요.`)
              return false
            }
          }
        } else {
          // 제목
          if (this.showSubTitle) {
            if (!isSave && jglib.isEmpty(item.subTitle)) {
              this.$alertMsg('상세 제목의 내용을 입력해 주세요.').then(() => {
                this.$refs[`subTitle${idx}`][0].focus()
              })
              return false
            }
            if (item.subTitle.length > 0) {
              if (!MessageBaseFormUtils.checkVarialbeString(item.subTitle)) {
                this.$alertMsg('변수명은 20자 이내의 한글, 영문, 숫자, \'_\'만 가능합니다.(특수문자, 공란, 줄바꿈, 사용 불가)').then(() => {
                  this.$refs[`subTitle${idx}`][0].focus()
                })
                return false
              }
              if (!MessageBaseFormUtils.checkDescriptionVariable(item.subTitle)) {
                this.$alertMsg(`'description'은 변수명으로 사용이 불가합니다'`).then(() => {
                  this.$refs[`subTitle${idx}`][0].focus()
                })
                return false
              }
              if (MessageBaseFormUtils.checkContentEmpty(item.subTitle)) {
                this.$alertMsg('변수만 입력할 수 없습니다. 변수와 문장을 입력해 주세요.').then(() => {
                  this.$refs[`subTitle${idx}`][0].focus()
                })
                return false
              }
              let maxLen = MessageBaseFormUtils.checkVarialbeStrings(item.subTitle).length > 0 ? this.maxSubTitLength - 1 : this.maxSubTitLength
              if (this.calcLength(item.subTitle) > maxLen) {
                this.$alertMsg(`메시지 내용은 고정부 메시지와 변수명에 들어가는 메시지를 합쳐서 총 ${this.maxSubTitLength}자 이내로 작성해주세요. (${this.maxSubTitLength}자 초과시 전송 불가)`).then(() => {
                  this.$refs[`subTitle${idx}`][0].focus()
                })
                return false
              }
            }
          }
          // 이미지
          if (this.showSubImage) {
            if (!isSave && jglib.isEmpty(item.fileSrc) && jglib.isEmpty(item.subMedia)) {
              this.$alertMsg('상세 이미지를 첨부해주세요.').then(() => {
                this.$refs[`subMedia${idx}`][0].$el.children[0].focus()
              })
              return false
            }
          }
          if (this.showSubUrl) {
            if (item.subMediaUrl.length > 0) {
              if (item.subMediaUrl.indexOf('http://') !== 0 && item.subMediaUrl.indexOf('https://') !== 0) {
                this.$alertMsg('올바른 URL 형식이 아닙니다.').then(() => {
                  this.$refs[`subMediaUrl${idx}`][0].focus()
                })
                return false
              }
              let res = MessageBaseFormUtils.checkIsUrlValid(item.subMediaUrl)
              if (res) {
                this.$alertMsg(res.msg).then(() => {
                  this.$refs[`subMediaUrl${idx}`][0].focus()
                })
                return false
              }
            }
          }
          // 본문
          if (this.showSubDesc) {
            if (!isSave && jglib.isEmpty(item.subDesc)) {
              this.$alertMsg('상세 본문의 내용을 입력해 주세요.').then(() => {
                this.$refs[`subDesc${idx}`][0].focus()
              })
              return false
            }
            if (item.subDesc.length > 0) {
              if (!MessageBaseFormUtils.checkVarialbeString(item.subDesc)) {
                this.$alertMsg('변수명은 20자 이내의 한글, 영문, 숫자, \'_\'만 가능합니다.(특수문자, 공란, 줄바꿈, 사용 불가)').then(() => {
                  this.$refs[`subDesc${idx}`][0].focus()
                })
                return false
              }
              if (!MessageBaseFormUtils.checkDescriptionVariable(item.subDesc)) {
                this.$alertMsg(`'description'은 변수명으로 사용이 불가합니다'`).then(() => {
                  this.$refs[`subDesc${idx}`][0].focus()
                })
                return false
              }
              if (MessageBaseFormUtils.checkContentEmpty(item.subDesc)) {
                this.$alertMsg('변수만 입력할 수 없습니다. 변수와 문장을 입력해 주세요.').then(() => {
                  this.$refs[`subDesc${idx}`][0].focus()
                })
                return false
              }
              let maxLen = MessageBaseFormUtils.checkVarialbeStrings(item.subDesc).length > 0 ? this.maxSubDescLength - 1 : this.maxSubDescLength
              if (this.calcLength(item.subDesc) > maxLen) {
                this.$alertMsg(`메시지 내용은 고정부 메시지와 변수명에 들어가는 메시지를 합쳐서 총 ${this.maxSubDescLength}자 이내로 작성해주세요. (${this.maxSubDescLength}자 초과시 전송 불가)`).then(() => {
                  this.$refs[`subDesc${idx}`][0].focus()
                })
                return false
              }
            }
          }
        }
      }
      return true
    },
    /** 변수부를 제외한 length 리턴 */
    calcLength(str) {
      return str.split(/{{.*?}}/).join('').length
    },
    prettyNewlineAndBlank(value) {
      if (comlib.isEmpty(value)) return '-'
      else return value.trim().replaceAll('\n', '<br/>').replaceAll(' ', '&nbsp;')
    },
    getMaxLength(type) {
      let param = this.paramInfo.find(param => param.paramNm === type)
      return param ? param.strSize : 0
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
