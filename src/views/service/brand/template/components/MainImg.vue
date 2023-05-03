<template>
  <!-- 조회 -->
  <div v-if="viewMode">
    <div class="rcs_item_bundle">
      <strong class="rcs_tit_bundle p-l0">메인 이미지</strong>
      <div class="rcs_cont_bundle">
        <span class="custom_input w670">{{ getfileName() }}</span>
      </div>
    </div>
    <div class="rcs_item_bundle rcs_item_mainImg">
      <strong class="rcs_tit_bundle p-l0">URL연결</strong>
      <div class="rcs_cont_bundle">{{ info.mediaUrl || '-' }}</div>
    </div>
  </div>
  <!-- 작성 -->
  <div v-else>
    <div class="rcs_item_bundle rcs_item_mainImg" style="border-bottom: none;">
      <strong class="rcs_tit_bundle p-l0">
        메인 이미지
        <span class="require">*</span>
      </strong>
      <div class="rcs_cont_bundle">
        <span class="custom_image" style="position: relative;">
          <el-upload ref="media" action :on-change="onFileChange" :on-remove="onFileRemove" :auto-upload="false" :accept="acceptType" class="i_block">
            <span class="custom_image_input readonly" style="width: 400px;">
              <a class="textover">{{ getfileName() }}</a>
            </span>
            <el-button v-if="originImage || info.media" size="small" type="primary" class="btn sml bd_black" @click.stop="onFileRemove">삭제</el-button>
            <el-button v-else size="small" type="primary" class="btn sml bd_black">첨부</el-button>
          </el-upload>
          <div class="custom_input_etc">권장 사이즈: {{ cropInfo.width }}px X {{ cropInfo.height }}px | 지원 파일: gif, jpeg, jpg, png, bmp | 메시지 내 이미지 용량 총합 1MB</div>
          <div class="miri_event_bloon" @click="clickMiriCanvas"></div>
        </span>
      </div>
    </div>
    <!-- 메인이미지 url -->
    <div class="rcs_item_bundle rcs_item_mainImg">
      <strong class="rcs_tit_bundle p-l0">
        URL연결
      </strong>
      <div class="rcs_cont_bundle">
        <span class="custom_input w670">
          <input type="text" ref="mediaUrl" v-model.trim="info.mediaUrl" @keydown="e => { if (e.keyCode === 32) e.preventDefault() }" placeholder="http://" class="p_byte" maxlength="100">
          <span class="input_byte">({{ info.mediaUrl.length }}/100자)</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import imgTplUtils from '@/components/imageTemplate/js/imageTemplateUtils'
import comlib from '@/components/messageTemplate/js/common'
import MessageBaseFormUtils from '@/components/messageTemplate/js/MessageBaseFormUtils'
export default {
  name: 'MainImg',
  props: {
    info: {
      type: Object,
      default: null
    },
    viewMode: {
      type: Boolean,
      default: false
    },
    ctnInfo: {
      type: Object,
      default: null
    },
    modify: {
      type: Boolean
    }
  },
  data () {
    return {
      originImage: null, // 원본이미지 정보
      cropInfo: null
    }
  },
  computed: {
    totFileSize() { return this.$store.getters.getTotalFileSize },
    acceptType() {
      let fileTypes = imgTplUtils.getAcceptFileType()
      return fileTypes.map(x => { return `.${x}` }).join(',')
    },
    getfileName() {
      return () => {
        if (!comlib.isEmpty(this.info.fileName)) return this.info.fileName
        else return this.viewMode ? '-' : '업로드할 이미지를 선택해 주세요'
      }
    }
  },
  watch: {
    ctnInfo() {
      this.cropInfo = { width: this.ctnInfo.imgResWidth, height: this.ctnInfo.imgResHeight }
      if (this.originImage) {
        this.crop()
      }
    }
  },
  created() {
    if (!this.viewMode) {
      this.cropInfo = { width: this.ctnInfo.imgResWidth, height: this.ctnInfo.imgResHeight }
    }
  },
  mounted() {},
  methods: {
    onFileRemove() {
      this.originImage = null
      this.info.fileSrc = ''
      this.info.fileName = ''
      this.info.fileType = ''
      this.info.previewSrc = ''
      if (this.modify) {
        this.info.media = ''
      }
      imgTplUtils.updateFileSize('sub', this.info.fileSize)
      this.info.fileSize = 0
    },
    onFileChange(file) {
      let reader = new FileReader()
      // 사이즈, 타입 체크
      let isValidImg = jglib.checkFileData(file.raw, imgTplUtils.getAcceptFileType(), 1)
      if (isValidImg.code === 'errorExt' || isValidImg.code === 'errorSize') {
        this.$alertMsg(isValidImg.message).then(() => {
          this.$refs.media.$el.children[0].focus()
        })
      } else {
        if (this.info.fileName !== '') {
          // 이미 등록된 이미지가 있는 경우: 기존 fileSize를 빼준다
          imgTplUtils.updateFileSize('sub', this.info.fileSize)
        }
        reader.readAsDataURL(file.raw)
        reader.onload = (e) => {
          this.info.fileName = file.name
          this.originImage = new Image()
          this.originImage.src = e.target.result
          this.originImage.onload = () => {
            this.crop()
          }
        }
      }
    },
    /** 이미지 사이즈 조절 및 crop */
    crop() {
      let MAX_WIDTH = this.cropInfo.width
      let MAX_HEIGHT = this.cropInfo.height
      let ORIGIN_WIDTH = this.originImage.naturalWidth
      let ORIGIN_HEIGHT = this.originImage.naturalHeight

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
      ctx.drawImage(this.originImage, 0, 0, ORIGIN_WIDTH, ORIGIN_HEIGHT, stX, stY, ORIGIN_WIDTH * zoomRatio, ORIGIN_HEIGHT * zoomRatio)
      let type = imgTplUtils.getImageType(this.originImage.src)
      let dataUrl = canvas.toDataURL(type)
      let img = imgTplUtils.convertCanvasToFile(dataUrl, type)
      // crop된 이후 사이즈 체크 하여 alert
      console.info(`# main - crop: ${img.size} byte`)
      if (this.ctnInfo.maxMediaSize < this.totFileSize + img.size) {
        this.$alertMsg('자동 리사이즈된 메시지 내 이미지 용량의 합계가 1MB를 초과하였습니다.<br>원본 이미지의 용량 조정 후 등록해 주세요.').then(() => {
          this.originImage = null
          this.info.fileName = ''
        })
      } else {
        this.info.fileSrc = dataUrl
        this.info.previewSrc = dataUrl
        this.info.fileType = type
        this.info.fileSize = img.size // crop 이후 파일 사이즈
        imgTplUtils.updateFileSize('add', img.size)
      }
    },
    validateData(isSave = false) {
      if (this.viewMode) {
        if (jglib.isEmpty(this.info.fileSrc) && jglib.isEmpty(this.info.media)) {
          this.$alertMsg('메인이미지를 첨부해 주세요.')
          return false
        }
        return true
      } else {
        if (!isSave) {
          if (!this.modify) { // 승인요청
            if (jglib.isEmpty(this.info.fileSrc)) {
              this.$alertMsg('메인이미지를 첨부해 주세요.').then(() => {
                this.$refs.media.$el.children[0].focus()
              })
              return false
            }
          } else {
            if (jglib.isEmpty(this.info.fileSrc) && jglib.isEmpty(this.info.media)) {
              this.$alertMsg('메인이미지를 첨부해 주세요.').then(() => {
                this.$refs.media.$el.children[0].focus()
              })
              return false
            }
          }
        }
        if (this.info.mediaUrl.length > 0) {
          if (this.info.mediaUrl.indexOf('http://') !== 0 && this.info.mediaUrl.indexOf('https://') !== 0) {
            this.$alertMsg('올바른 URL 형식이 아닙니다.').then(() => {
              this.$refs.mediaUrl.focus()
            })
            return false
          }
          // url 형식 체크
          let result = MessageBaseFormUtils.checkIsUrlValid(this.info.mediaUrl)
          if (result) {
            this.$alertMsg(result.msg).then(() => {
              this.$refs.mediaUrl.focus()
            })
            return false
          }
        }
        return true
      }
    },
    clickMiriCanvas() {
      this.$router.push({ name: 'miricanvas' })
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
