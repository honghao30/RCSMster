<template>
  <!-- 조회 -->
  <div v-if="viewMode">
    <div class="rcs_item_bundle rcs_item_title">
      <strong class="rcs_tit_bundle p-l0">제목</strong>
      <div class="rcs_cont_bundle">
        <span class="custom_input w670" v-html="getTitleVal(info.title)"></span>
      </div>
    </div>
    <div v-if="showDesciption" class="rcs_item_bundle rcs_item_desc">
      <strong class="rcs_tit_bundle p-l0">본문</strong>
      <div class="rcs_cont_bundle">
        <span class="custom_input w670" v-html="getDescriptionVal(info.description)"></span>
      </div>
    </div>
  </div>
  <!-- 작성 -->
  <div v-else>
    <div class="rcs_item_bundle rcs_item_title">
      <strong class="rcs_tit_bundle p-l0">제목</strong>
      <div class="rcs_cont_bundle">
        <a href="javascript:void(0);" class="tmplt_gd_link btn_temp_info" @click="openVariableGuidePopup" style="width: auto;">
          <span>이미지 템플릿 변수 작성 안내</span>
        </a>
        <!-- 이미지 템플릿 변수 작성 안내 팝업-->
        <image-template-variable-guide-popup v-if="showVariableGuidePopup" :visible.sync="showVariableGuidePopup"></image-template-variable-guide-popup>
        <span class="using_stat">
          <input v-model="info.useTitle" type="radio" name="useTit" id="useTit1" :value="true" checked>
          <label for="useTit1" class="btn sml" :class="{ 'bd_black check': info.useTitle }">사용</label>
          <input v-model="info.useTitle" type="radio" name="useTit" id="useTit2" :value="false">
          <label for="useTit2" class="btn sml" :class="{ 'bd_black check': !info.useTitle }">미사용</label>
        </span>
        <span class="custom_input w670">
          <textarea class="p_byte" type="text" :placeholder="`제목을 입력해 주세요. 예시 : 안녕하세요 \{\{이름\}\}`" rows="2" style="resize: none"
            ref="title" v-model="info.title" @input="changeInputValue($event, 'title')" :disabled="!info.useTitle"></textarea>
          <span class="input_byte textarea">
            (<span :style="titleLength > maxTitLength ? 'color: red;' : ''">{{ titleLength }}</span>/{{ maxTitLength }}자)
          </span>
        </span>
      </div>
    </div>
    <div class="rcs_item_bundle rcs_item_desc" v-if="showDesciption">
      <strong class="rcs_tit_bundle p-l0">
        본문
        <span v-if="!showSelectDescription" class="require">*</span>
      </strong>
      <div class="rcs_cont_bundle" :class="themeType.theme === 'SNS' && themeType.type === 'S' ? 'no_border' : ''">
        <div v-if="showSelectDescription">
          <span class="using_stat">
            <input v-model="info.useDescription" type="radio" name="useDesc" id="useDesc1" :value="true" checked>
            <label for="useDesc1" class="btn sml" :class="{ 'bd_black check': info.useDescription }">사용</label>
            <input v-model="info.useDescription" type="radio" name="useDesc" id="useDesc2" :value="false">
            <label for="useDesc2" class="btn sml" :class="{ 'bd_black check': !info.useDescription }">미사용</label>
          </span>
        </div>
        <span class="custom_input w670">
          <textarea class="p_byte" type="text" :placeholder="'본문을 입력해 주세요. 예시 : 안녕하세요 '+'{'+'{이름}'+'}'+ '님. RCS Biz Center입니다.'" rows="2" style="resize: none"
            ref="description" v-model="info.description" @input="changeInputValue($event, 'description')" :disabled="!info.useDescription"></textarea>
          <span class="input_byte textarea">
            (<span :style=" descriptionLength > maxDescLength ? 'color: red;' : '' ">{{ descriptionLength }}</span><span>/{{ maxDescLength }}자)</span>
          </span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import ImageTemplateVariableGuidePopup from '@/views/service/brand/template/ImageTemplateVariableGuidePopup'
import MessageBaseFormUtils from '@/components/messageTemplate/js/MessageBaseFormUtils'
import comlib from '@/components/messageTemplate/js/common'
export default {
  name: 'TitAndDesc',
  components: {
    ImageTemplateVariableGuidePopup
  },
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
    viewMode: {
      type: Boolean,
      default: false
    },
    modify: {
      type: Boolean
    }
  },
  data () {
    return {
      themeType: {},
      titleLength: 0, // (변수부 제외) 제목 길이
      descriptionLength: 0, // (변수부 제외) 본문 길이
      showVariableGuidePopup: false
    }
  },
  computed: {
    showDesciption() { return !this.disableData.includes('description') }, // 본문 사용여부
    showSelectDescription() { return !this.disableData.includes('useSelectDescription') }, // 본문 미사용/사용 항목 사용 여부
    maxTitLength() { return this.getMaxLength('title') },
    maxDescLength() { return this.getMaxLength('description') }
  },
  watch: {
    'info.useTitle'() {
      if (!this.info.useTitle) {
        this.info.title = ''
        this.titleLength = 0
      }
    },
    'info.useDescription'() {
      if (!this.info.useDescription) {
        this.info.description = ''
        this.descriptionLength = 0
      }
    },
    modify() {
      // 수정 화면으로 전황시 init 호출
      this.init()
    }
  },
  created() {
    this.init()
  },
  mounted() {
    this.themeType = JSON.parse(localStorage.getItem('themeTypeInfo')) || { theme: '', type: '' }
  },
  methods: {
    init() {
      if (!this.showDesciption) { // 본문 항목 자체를 사용하지 않는경우
        this.info.useDescription = false
      } else {
        if (!this.viewMode) {
          this.calcLength('description', this.info.description)
          this.calcLength('title', this.info.title)
          if (this.modify && !this.showSelectDescription) this.info.useDescription = true
        }
      }
    },
    changeInputValue(e, type) {
      let text = e.target.value
      this.info[type] = text
      this.calcLength(type, text)
    },
    calcLength(type, text) {
      this.$data[`${type}Length`] = text.split(/{{.*?}}/).join('').length
    },
    validateData(isSave = false) {
      if (this.viewMode) {
        if (!this.showSelectDescription && this.showDesciption) { // 본문 선택여부를 사용하지 않음 === 본문 필수
          if (jglib.isEmpty(this.info.description)) {
            this.$alertMsg('본문의 내용을 입력해 주세요.')
            return false
          }
        }
        return true
      } else {
        if (this.info.useTitle) {
          if (!isSave && jglib.isEmpty(this.info.title)) {
            this.$alertMsg('제목의 내용을 입력해 주세요.').then(() => {
              this.$refs.title.focus()
            })
            return false
          }
          if (this.info.title.length > 0) {
            if (!MessageBaseFormUtils.checkVarialbeString(this.info.title)) {
              this.$alertMsg('변수명은 20자 이내의 한글, 영문, 숫자, \'_\'만 가능합니다.(특수문자, 공란, 줄바꿈 사용 불가)').then(() => {
                this.$refs.title.focus()
              })
              return false
            }
            if (!MessageBaseFormUtils.checkDescriptionVariable(this.info.title)) {
              this.$alertMsg(`'description'은 변수명으로 사용이 불가합니다.`).then(() => {
                this.$refs.title.focus()
              })
              return false
            }
            // 본문 - 변수만 입력한 경우 체크
            if (MessageBaseFormUtils.checkContentEmpty(this.info.title)) {
              this.$alertMsg('변수만 입력할 수 없습니다. 변수와 문장을 입력해 주세요.').then(() => {
                this.$refs.title.focus()
              })
              return false
            }
            // 변수부가 몇개라도 입력되면 - 1 해야함
            let maxLen = MessageBaseFormUtils.checkVarialbeStrings(this.info.title).length > 0 ? this.maxTitLength - 1 : this.maxTitLength
            if (this.titleLength > maxLen) {
              this.$alertMsg(`메시지 내용은 고정부 메시지와 변수명에 들어가는 메시지를 합쳐서 총 ${this.maxTitLength}자 이내로 작성해주세요. (${this.maxTitLength}자 초과시 전송 불가)`).then(() => {
                this.$refs.title.focus()
              })
              return false
            }
          }
        }
        if (this.info.useDescription) {
          if (!isSave && jglib.isEmpty(this.info.description)) {
            this.$alertMsg('본문의 내용을 입력해 주세요.').then(() => {
              this.$refs.description.focus()
            })
            return false
          }
          if (this.info.description.length > 0) {
            if (!MessageBaseFormUtils.checkVarialbeString(this.info.description)) {
              this.$alertMsg('변수명은 20자 이내의 한글, 영문, 숫자, \'_\'만 가능합니다.(특수문자, 공란, 줄바꿈 사용 불가)').then(() => {
                this.$refs.description.focus()
              })
              return false
            }
            if (!MessageBaseFormUtils.checkDescriptionVariable(this.info.description)) {
              this.$alertMsg(`'description'은 변수명으로 사용이 불가합니다'`).then(() => {
                this.$refs.description.focus()
              })
              return false
            }
            // 본문 - 변수만 입력한 경우 체크
            if (MessageBaseFormUtils.checkContentEmpty(this.info.description)) {
              this.$alertMsg('변수만 입력할 수 없습니다. 변수와 문장을 입력해 주세요.').then(() => {
                this.$refs.description.focus()
              })
              return false
            }
            let maxLen = MessageBaseFormUtils.checkVarialbeStrings(this.info.description).length > 0 ? this.maxDescLength - 1 : this.maxDescLength
            if (this.descriptionLength > maxLen) {
              this.$alertMsg(`메시지 내용은 고정부 메시지와 변수명에 들어가는 메시지를 합쳐서 총 ${this.maxDescLength}자 이내로 작성해주세요. (${this.maxDescLength}자 초과시 전송 불가)`).then(() => {
                this.$refs.description.focus()
              })
              return false
            }
          }
        }
        return true
      }
    },
    openVariableGuidePopup() {
      this.showVariableGuidePopup = true
    },
    getTitleVal(str) {
      let title = this.prettyNewlineAndBlank(str)
      if (title !== '') return title
      else return '미사용'
    },
    getDescriptionVal(str) {
      let desc = this.prettyNewlineAndBlank(str)
      if (desc !== '') return desc
      else {
        if (this.showDesciption && !this.showSelectDescription) return '-' // 본문이 필수인 경우
        else return '미사용'
      }
    },
    prettyNewlineAndBlank(value) {
      if (comlib.isEmpty(value)) return ''
      else return value.trim().replaceAll('\n', '<br/>').replaceAll(' ', '&nbsp;')
    },
    getMaxLength(type) {
      let param = this.paramInfo.find(param => param.paramNm === type)
      return param ? param.strSize : 0
    }
  }
}
</script>

<style>

</style>
