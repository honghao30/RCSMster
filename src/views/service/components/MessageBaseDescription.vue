<template>
  <div class="rcs_cont_bundle">
    <div class="content_text_info mar_b10 mar_t10">
      <h4 class="h4_title" v-html="msg"></h4>
    </div>
    <span class="custom_textarea">
      <textarea id="description" ref="description" :placeholder="placeholder" v-model="description" @input="calcText" :readonly="readonly"></textarea>
    </span>
    <p class="caution text_desc">(<span :style="descriptionlength > ctn.maxDescrSize ? 'color:red' : ''">{{descriptionlength}}</span>/{{ctn.maxDescrSize || 90}}자)</p>
  </div>
</template>

<script>
import defaultRefData from '@/components/messageTemplate/js/openrichcardDefaultRefData'
import MessageBaseFormUtils from '@/components/messageTemplate/js/MessageBaseFormUtils'
export default {
  name: 'MessageBaseDescription',
  props: {
    jsonData: {
      type: Object
    },
    inputText: {
      type: String
    },
    ctn: {
      type: Object
    },
    readonly: {
      type: Boolean,
      default: true
    }
  },
  components: {},
  data() {
    return {
      regex: /\{\{(.*?)\}\}/g,
      placeholder: 'Text 입력',
      description: '',
      descriptionlength: 0,
      descriptionWholelength: 0,
      variableCount: 0,
      strRegx: '',
      strArry: '',
      msg:
        `• 변수로 설정하고자 하는 내용을 {{ }} 표시로 작성해주세요.&nbsp;&nbsp;예) {{이름}}, {{date}}<br>
        • 변수명은 20자 이내의 한글, 영문, 숫자, ‘_’ 만 가능합니다.<br>
        • 특수문자, 공란, 줄바꿈  그리고 {{description}} 변수명 사용 불가합니다.<br>
        ※ 서술(description) 템플릿은 본문 내용을 변수 만으로 구성할 수 없습니다.(변수 이외 문장 필수 입력)<br>
        ※ 버튼에 들어가는 글자는 90자 제한 대상에 포함되지 않습니다.<br>
        <span class="h4_desc mar_t10">
          메시지 내용은 고정부 메시지와 변수명에 들어가는 메시지를 합쳐서 총 90자 이내로 작성해주세요.<br>(90자 초과시 전송 불가)
        </span>`
    }
  },
  computed: {
    textviews() {
      let RCSMessage = this.jsonData.RCSMessage || this.jsonData.rcsMessage
      let layout = RCSMessage.openrichcardMessage.layout
      let linear = layout.children.filter(c => c.widget === 'LinearLayout')[0]
      return linear.children.filter(c => c.widget === 'TextView')
    }
  },
  watch: {
    jsonData: {
      deep: true,
      handler() {
        if (!jglib.isEmpty(this.jsonData)) {
          this.getData()
        }
      }
    },
    inputText(value) {},
    description(value) {
      this.description = value
      this.strRegx = MessageBaseFormUtils.getStrRegx(value)
      this.strArry = MessageBaseFormUtils.getVerification(value)
      this.$emit('update:inputText', value)
    }
  },
  created() {
    if (jglib.isEmpty(this.jsonData)) {
      this.getDefaultJsonData()
    } else {
      this.getData()
    }
    this.description = this.inputText
  },
  mounted() {
  },
  methods: {
    clear() {
      this.description = ''
    },
    getData() {
      if (this.textviews.length > 0) {
        this.calcLength(this.inputText)
      }
    },
    setData() {
    },
    calcText(e) {
      // this.calcLength(e.target.value)
      this.description = document.getElementById('description').value
      this.calcLength(this.description)
    },
    calcLength(text) {
      this.descriptionlength = text.split(/{{.*?}}/).join('').length
      let vars = []
      if (text.match(this.regex)) {
        // 변수부 개수를 계산한다.
        text.match(this.regex).forEach(t => vars.push(t))
        this.variableCount = vars.length
      }
    },
    getDefaultJsonData() {
      let refData = JSON.parse(JSON.stringify(defaultRefData))
      let linear = JSON.parse(JSON.stringify(refData['linearLayout']))
      let linear2 = JSON.parse(JSON.stringify(refData['linearLayout']))
      let image = JSON.parse(JSON.stringify(refData['imageView']))
      let text = JSON.parse(JSON.stringify(refData['textView']))

      let jsonData = refData['layout']
      linear.children.push(image)
      linear2.children.push(text)
      linear.children.push(linear2)
      jsonData.RCSMessage.openrichcardMessage.layout = linear
      this.$emit('update:jsonData', jsonData)
    },
    getFixedLength() {
      return this.descriptionlength
    },
    validateData() {
      if (jglib.isEmpty(this.description)) {
        this.$alertMsg('내용을 입력해 주세요.').then(() => {
          this.$refs.description.focus()
        })
        return false
      } else if (this.descriptionlength > this.ctn.maxDescrSize || (this.descriptionlength >= this.ctn.maxDescrSize && this.variableCount > 0)) {
        // 고정부 90자 초과 혹은 고정부 90자 이상일 때 변수가 존재하는 경우
        this.$alertMsg(`메시지 내용은 고정부 메시지와 변수명에 들어가는 메시지를 합쳐서 총 ${this.ctn.maxDescrSize}자 이내로 작성해주세요. (${this.ctn.maxDescrSize}자 초과시 전송 불가)`).then(() => {
          this.$refs.description.focus()
        })
        return false
      } else if (this.descriptionWholelength > 600) {
        this.$alertMsg('메시지 내용 및 변수 포함 600자 이내로 작성해주세요.').then(() => {
          this.$refs.description.focus()
        })
        return false
      }
      if (!MessageBaseFormUtils.checkVarialbeString(this.description)) {
        this.$alertMsg('변수명은 20자 이내의 한글, 영문, 숫자, ‘_’ 만 가능합니다.(특수문자, 공란, 줄바꿈 사용 불가)').then(() => {
          this.$refs.description.focus()
        })
        return false
      }
      if (MessageBaseFormUtils.checkContentEmpty(this.description)) {
        this.$alertMsg('변수 이외 문장을 입력해 주시기 바랍니다.').then(() => {
          this.$refs.description.focus()
        })
        return false
      }
      return true
    },
    getParamInfo() {
      let params = []
      let descParam = {
        paramNm: MessageBaseFormUtils.getParamName(this.textviews[0].text),
        paramType: 'String',
        strSize: '-1',
        ctnType: 'description',
        strRegx: this.strRegx,
        strArry: this.strArry
      }
      params.push(descParam)
      return params
    }
  }
}
</script>

<style>
</style>
