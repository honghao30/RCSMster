<template>
  <div class="rcs_item_bundle"  style="border-top:1px solid #ddd; margin-top:8px;">
        <strong class="rcs_tit_bundle p-l0">제목<span class="require">*</span></strong>
        <div class="rcs_cont_bundle">
          <ul class="rcs_editor_list full_width">
            <li>
              <!-- <div v-if="this.templateData.cardType !== 'D'" class="box_radio_area"> -->
              <div class="box_radio_area">
                <span class="custom_radio single wide">
                  <input v-model="taTitleInputType" type="radio" name="radioType01" id="type01" value="wide" @click="changeRowType('wide')">
                  <label for="type01"></label>
                </span>
                <span class="custom_radio single double">
                  <input v-model="taTitleInputType" type="radio" name="radioType02" id="type02" value="double" @click="changeRowType('double')"> <!-- :disabled="this.templateData.cardType === 'D'" -->
                  <label for="type02"></label>
                </span>
              </div>
              <div class="box_input_area"><!-- :style="isDesc" -->
                <span class="custom_textarea">
                  <textarea placeholder="text입력" id="title01" ref="title01" v-model="title01" @input="calcText('title01')" :maxlength='maxTitle01'></textarea>
                </span>
                <!-- 입력 창 일때 -->
                <!-- <span v-if="taTitleInputType === 'double'" class="custom_textarea">
                  <textarea
                    placeholder="text입력"
                    id="title02" ref="title02" v-model="title02"
                    @input="calcText('title02')"
                  ></textarea>
                </span> -->
                <!-- <input type="text" class="tmplt_input_variable"  placeholder="변수 입력"> -->
                <!-- <span v-if="taTitleInputType === 'double' && this.templateData.cardType !== 'D'" class="custom_select Winput260"> -->
                <span v-if="taTitleInputType === 'double'" class="custom_select Winput260">
                  <select v-model="title02" @change="calcText('title02', $event)" :disabled="isTitle02Data" :class="title2ActiveClass">
                    <option v-if="title02 === ''" value="">변수 선택</option>
                    <option v-for='(list, index) in title02ListArray' :key='`list_${index}`' :value="list">{{list}}</option>
                    <option v-if="title02 !== ''" value="">선택 안함</option>
                  </select>
                </span>
              </div>
            </li>
          </ul>
        <div v-if="taTitleInputType === 'double'" @click="getVals(), checkTitle2()" class="tmplt_pull_btn">변수 가져오기</div> <!-- && this.templateData.cardType !== 'D' -->
        <span class="text_desc" :style="title01length > maxTitle01 ? 'color:red' : ''">({{title01length}}/{{maxTitle01}}자)</span>
        <div class="tmplt_title_description active" v-if="titleTextInfomation === 2 && this.taTitleInputType === 'double'"> <!-- ' && this.templateData.cardType !== 'D' -->
          본문에서 등록 가능한 변수를 가져왔습니다. 변수를 선택하세요.
        </div>
        <div class="tmplt_title_description active" v-else-if="titleTextInfomation === 1 && this.taTitleInputType === 'double'"> <!-- && this.templateData.cardType !== 'D' -->
          본문에서 등록 가능한 변수가 없습니다.
        </div>
        <div class="tmplt_title_description" v-else-if="titleTextInfomation === 0 && this.taTitleInputType === 'double'"> <!-- && this.templateData.cardType !== 'D' -->
          본문에 변수를 지정하신 후 '변수 가져오기' 버튼을 선택하시기 바랍니다.
        </div>
        <!-- <div class="tmplt_title_description active"
          v-if="this.taTitleInputType === 'double' && this.templateData.cardType !== 'D' && this.title02ListArray.length > 0 && this.title02Status === true && this.checkTitle2Data > 0"
        >본문에서 등록 가능한 변수를 가져왔습니다. 변수를 선택하세요.</div>
        <div class="tmplt_title_description active"
          v-else-if="this.taTitleInputType === 'double' && this.templateData.cardType !== 'D' && this.title02ListArray.length < 1 && this.title02Status === false && this.checkTitle2Data > 0"
        >본문에서 등록 가능한 변수가 없습니다.</div>
        <div class="tmplt_title_description"
          v-else-if="this.taTitleInputType === 'double' && this.templateData.cardType !== 'D' && this.title02ListArray.length < 1 && this.title02Status === false && this.checkTitle2Data < 1"
          >변수 가져오기 버튼을 누르시면 변수를 선택할 수 있습니다</div> -->
        <span class="text_desc mar_l12" style="display: none;">({{title02length}}/{{maxTitle02}}자)</span>
        <!-- <div v-for='(list, index) in title02ListArray' :key='`list_${index}`'>
          <div>{{list}}</div>
        </div> -->
        <p class="tmplt-title-line"></p>
        </div>
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
    inputTitle01: {
      type: String
    },
    inputTitle02: {
      type: String
    },
    ctn: {
      type: Object
    },
    orgnfmtstr: {
      type: Object
    },
    tplFormParams: {
      type: Array
    },
    templateData: {
      type: Object
    },
    computedJsonData: {
      type: Object
    }
  },
  components: {},
  data() {
    return {
      regex: /\{\{(.*?)\}\}/g,
      title01: '',
      title02: '',
      title01length: 0,
      title02length: 0,
      cellClone: null,
      taTitleInputType: 'double',
      maxTitleSize: 0,
      title02ListArray: [],
      title2ActiveClass: '',
      title02Status: false,
      checkTitle2Data: 0
    }
  },
  computed: {
    title01views() {
      if (this.jsonData.RCSMessage !== undefined) {
        let RCSMessage = this.jsonData.RCSMessage || this.jsonData.rcsMessage
        let layout = RCSMessage.openrichcardMessage.layout
        let linear = layout.children.filter(c => c.widget === 'LinearLayout')[0]
        if (linear.children.filter(c => c.widget === 'LinearLayout')[0] === undefined) {
          return false
        }
        return linear.children.filter(c => c.widget === 'LinearLayout')[0].children[0].text
      }
      return false
    },
    title02views() {
      if (this.jsonData.RCSMessage !== undefined) {
        let RCSMessage = this.jsonData.RCSMessage || this.jsonData.rcsMessage
        let layout = RCSMessage.openrichcardMessage.layout
        let linear = layout.children.filter(c => c.widget === 'LinearLayout')[0]
        if (linear.children.filter(c => c.widget === 'LinearLayout')[0] === undefined ||
        linear.children.filter(c => c.widget === 'LinearLayout')[0].children[1] === undefined) {
          return false
        }
        return linear.children.filter(c => c.widget === 'LinearLayout')[0].children[1].text
      }
      return false
    },
    maxTitle01() {
      if (!this.templateData.params && this.tplFormParams.length > 0) {
        let titleStrs = this.tplFormParams.filter(c => c.ctnType === 'title')
        let maxSizeTitle1 = titleStrs.filter(c => c.paramNm === 'title1')
        let maxStrTitle01 = maxSizeTitle1[0].strSize
        if (maxStrTitle01 < 1) {
          maxStrTitle01 = 8
        }
        return maxStrTitle01
      } else if (this.templateData.params && this.tplFormParams.length < 1) {
        let maxStrTitle01
        if (this.templateData.cardType === 'C') {
          maxStrTitle01 = this.templateData.params[20].strSize
        } else {
          maxStrTitle01 = this.templateData.params[1].strSize
        }
        return maxStrTitle01
      }
      return false
    },
    maxTitle02() {
      let maxStrTitle02 = this.templateData.cardType === 'C' ? -1 : 30
      if (!this.templateData.params && this.tplFormParams.length > 0) { // 신규로 등록하는 템플릿의 경우
        let title2 = this.tplFormParams.filter(c => c.paramNm === 'title2')
        if (title2.length > 0) {
          maxStrTitle02 = title2[0].strSize
        }
      } else if (this.templateData.params && this.tplFormParams.length < 1) { // 사용자가 등록한 템플릿의 경우
        maxStrTitle02 = this.templateData.cardType === 'C' ? this.templateData.params[21].strSize : this.templateData.params[2].strSize
      }
      return maxStrTitle02
    },
    isDesc() {
      if (this.templateData.cardType === 'D') {
        return 'width: 567px'
      }
      return ''
    },
    isTitle02Data: {
      get() {
        if (this.title02ListArray.length > 0) {
          return false
        }
        return true
      },
      set(val) {
        return val
      }
    },
    titleTextInfomation() {
      if (this.taTitleInputType === 'double' && this.title02ListArray.length > 0 && this.title02Status === true && this.checkTitle2Data > 0) { // && this.templateData.cardType !== 'D'
        // 변수 있을 때
        return 2
      } else if (this.taTitleInputType === 'double' && this.title02ListArray.length < 1 && this.title02Status === false && this.checkTitle2Data > 0) { // && this.templateData.cardType !== 'D'
        // 가져올 변수 없을 때
        return 1
      } else if (this.taTitleInputType === 'double' && this.title02ListArray.length < 1 && this.title02Status === false && this.checkTitle2Data < 1) { // && this.templateData.cardType !== 'D'
        // 변수 리스트에 아무것도 없을 때
        return 0
      }
      return 0
    }
  },
  watch: {
    title01(value) {
      this.title01 = value
      this.title01Json(value)
      this.calcLength(value, 1)
      this.$emit('update:inputTitle01', value)
    },
    computedJsonData() {
      this.buttonData = this.computedJsonData.RCSMessage.openrichcardMessage.suggestions
    }
  },
  created() {
    if (jglib.isEmpty(this.jsonData)) {
      this.getDefaultJsonData()
    } else {
      this.getData()
    }
    this.title01 = this.inputTitle01
    this.title02 = this.inputTitle02
    this.getData()
  },
  mounted() {
    // this.title01 = this.inputTitle01
    // this.title02 = this.inputTitle02
    // if (this.templateData.cardType === 'D') {
    //   this.taTitleInputType = 'wide'
    // }
    this.checkNumberTitle2Data()
    this.title02Check()
  },
  methods: {
    changeRowType (type) {
      this.taTitleInputType = type
      if (type === 'double') {
        this.title02 = ''
        this.jsonData.RCSMessage.openrichcardMessage.layout.children[0].children[0].children[1].text = ''
        this.jsonData.RCSMessage.openrichcardMessage.layout.children[0].children[0].children[1].visibility = 'visible'
      } else {
        this.title02 = ''
        this.jsonData.RCSMessage.openrichcardMessage.layout.children[0].children[0].children[1].text = ''
        this.jsonData.RCSMessage.openrichcardMessage.layout.children[0].children[0].children[1].visibility = 'gone'
      }
    },
    getData() {
      if (this.title01views.length > 0) {
        this.calcLength(this.inputTitle01, 1)
      }
      if (this.title02views.length > 0) {
        this.title02 = this.inputTitle02
        this.calcLength(this.title02views, 2)
      }
    },
    calcText(id, event) {
      if (id === 'title01') {
        this.title01 = document.getElementById('title01').value
        this.calcLength(this.title01, 1)
      } else {
        this.title02 = event.target.value
        this.title02Json(event.target.value)
        this.calcLength(this.title02, 2)
        this.$emit('update:inputTitle02', this.title02)
      }
    },
    calcLength(text, titleNum) {
      if (titleNum === 1) {
        this.title01length = text.length
      } else {
        this.title02length = text.length
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
    validateData() {
      this.getVals()
      if (this.title02ListArray.indexOf(this.title02) < 0 && this.taTitleInputType === 'double') { // this.templateData.cardType === 'C'
        const h = this.$createElement
        this.$msgbox({ message: h('p', null, [
          h('span', null, '제목의 변수를 확인해 주세요.'),
          h('br'),
          h('br'),
          h('span', null, '변수 사용을 원하지 않으실 경우 제목의 배열을 1열로'),
          h('br'),
          h('span', null, '변경해 주세요.')
        ])
        }).then(() => {
          this.title02 = ''
          this.title02Json('')
          this.getVals()
        })
        return false
      }
      if (jglib.isEmpty(this.title01)) {
        this.$alertMsg('제목을 입력해 주세요.').then(() => {
          this.$refs.title01.focus()
        })
        return false
      } else if (this.title01length > this.maxTitle01) {
        // title01 의 길이가 넘쳤을때.
        // this.$alertMsg(`제목1의 길이는 ${this.maxTitle01}자 이내로 작성해주세요. (${this.maxTitle01}자 초과시 전송 불가)`).then(() => {
        this.$alertMsg(`타이틀 Left 내 입력 글자수 초과(${this.maxTitle01}자)`).then(() => {
          this.$refs.title01.focus()
        })
        return false
      }
      // 타이틀1에 변수부가 입력 된 경우
      if (MessageBaseFormUtils.checkOnlyVarialbeString(this.title01)) {
        this.$alertMsg('타이틀 Left 내 변수 삽입 불가').then(() => {
          this.$refs.title01.focus()
        })
        return false
      }
      // 타이틀2에 변수 선택 안하고, double 일 경우 wide로 바꿔 주는 부분
      if (this.title02 === '' && this.taTitleInputType === 'double') {
        this.changeRowType('wide')
      }
      return true
    },
    getParamInfo() {
      // if (this.taTitleInputType !== 'wide' && this.title02 !== '') {
      if (this.title02 !== '') {
        let params = []
        let title2 = {
          paramNm: MessageBaseFormUtils.getParamName(this.title02),
          paramType: 'String',
          strSize: this.maxTitle02,
          ctnType: 'title',
          strRegx: '',
          strArry: ''
        }
        params.push(title2)
        return params
      }
    },
    title02Check () {
      if (!jglib.isEmpty(this.jsonData)) {
        if (this.jsonData.RCSMessage.openrichcardMessage.layout.children[0].children[0].children[1].visibility === 'gone') {
          this.taTitleInputType = 'wide'
          this.jsonData.RCSMessage.openrichcardMessage.layout.children[0].children[0].children[1].text = ''
          this.jsonData.RCSMessage.openrichcardMessage.layout.children[0].children[0].children[1].visibility = 'gone'
          this.title02 = ''
        }
      }
      this.getVals()
    },
    title01Json (v) {
      this.jsonData.RCSMessage.openrichcardMessage.layout.children[0].children[0].children[0].text = v
    },
    title02Json (v) {
      this.jsonData.RCSMessage.openrichcardMessage.layout.children[0].children[0].children[1].text = v
    },
    getVals () {
      if (this.templateData.cardType === 'D') {
        if (!MessageBaseFormUtils.checkVarialbeString(this.templateData.inputText)) {
          this.$alertMsg('변수명은 20자 이내의 한글, 영문, 숫자, ‘_’ 만 가능합니다.(특수문자, 공란, 줄바꿈 사용 불가)').then(() => {
          })
          return false
        }
      } else if (this.templateData.cardType === 'C') {
        if (!MessageBaseFormUtils.checkVarialbeString(this.templateData.inputCellText)) {
          this.$alertMsg('변수명은 20자 이내의 한글, 영문, 숫자, ‘_’ 만 가능합니다.(특수문자, 공란, 줄바꿈 사용 불가)').then(() => {
          })
          return false
        }
      }
      if (this.templateData.cardType === 'D') {
        let value = MessageBaseFormUtils.checkVarialbeStrings(this.templateData.inputText)
        this.title02ListArray = value
      } else if (this.templateData.cardType === 'C') {
        let value = MessageBaseFormUtils.checkVarialbeStrings(this.templateData.inputCellText)
        this.title02ListArray = value
      }
      // 저장된 템플릿을 불러올때 compute를 실행 못해서 버튼 내용에 있는 변수가 타이틀2에 들어있을 경우 오류 발생
      if (this.buttonData === null || this.buttonData === undefined) {
        this.buttonData = this.computedJsonData.RCSMessage.openrichcardMessage.suggestions
      }
      if (this.buttonData) {
        let arr1 = []
        // 반복문 돌려서 필요 없는 부분 제거 한 뒤, 스트링으로 바꿔서 배열에 추가
        for (let i = 0; i < this.buttonData.length; i++) {
          let t1 = this.buttonData[i].action
          delete t1.displayText
          delete t1.postback
          let t2 = JSON.stringify(t1)
          arr1.push(t2)
        }
        // 배열을 스트링으로 바꾼 뒤, 변수부 찾는 함수 호출.
        let t3 = arr1.toString()
        let btnValue = MessageBaseFormUtils.checkVarialbeStrings(t3)
        // 찾은 변수부를 타이틀2 리스트에 추가.
        for (let j = 0; j < btnValue.length; j++) {
          this.title02ListArray.push(btnValue[j])
        }
        // 본문과 중복된 내용을 제거.
        this.title02ListArray = [...new Set(this.title02ListArray)]
      }
      if (this.title02ListArray.length > 0) {
        this.title2ActiveClass = 'active'
        this.title02Status = true
      }
      this.checkTitle2Data += 1
      if (this.title02ListArray.length < 1) {
        this.checkTitle2Data = 0
        this.isTitle02Data = true
        this.title2ActiveClass = ''
        this.title02 = ''
        this.title02Json('')
        this.$emit('update:inputTitle02', this.title02)
      }
      // 변수 가져오기 버튼을 눌렀을 때 변수 배열안에 타이틀2에 선택된 변수가 없을 때
      if (this.title02ListArray.indexOf(this.title02) < 0) { // this.templateData.cardType === 'C'
        this.title02 = ''
        this.title02Json('')
        this.$emit('update:inputTitle02', this.title02)
      }
    },
    checkNumberTitle2Data() {
      this.checkTitle2Data = 0
    },
    checkTitle2() {
      this.getVals()
      if (this.title02ListArray.length < 1) {
        this.$alertMsg('본문에 사용된 변수 중에서 선택이 가능합니다.<br>본문에 변수를 지정하신 후 사용하시기 바랍니다.').then(() => {
        })
      }
    }
  }
}
</script>

<style>
</style>
