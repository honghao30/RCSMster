<template>
  <div class='rcs_cont_bundle input_field_area width_resize'>
    <div class='content_text_info'>
      <h4 class='h4_title' v-html='msg'></h4>
    </div>
    <div class='input_field_list_tit full_width'>
      <span style="width: 70px">배열</span>
      <span style="width: 500px">텍스트</span>
      <span style="width: 45px">라인</span>
    </div>
    <ul class='rcs_editor_list full_width'>
      <li v-for='(row, index) in visibleLinearLayouts' :key='`row_${index}`'>
        <div class='box_radio_area'>
          <span class='custom_radio single wide'>
            <input type='radio' :name='`rowType_${index}`' :id='`type01_${index}`' :checked='getRowTypeChecked(row)' @change='changeRowType($event, row, index)' value='wide'>
            <label :for='`type01_${index}`'></label>
          </span>
          <span class='custom_radio single double'>
            <input type='radio' :name='`rowType_${index}`' :id='`type02_${index}`' :checked='!getRowTypeChecked(row)' @change='changeRowType($event, row, index)' value='double'>
            <label :for='`type02_${index}`'></label>
          </span>
        </div>
        <div class='box_input_area align_i_top'>
          <message-base-cell-input :index='`textview_${index}_0`' :ref='`ref_${index}_0`' :tplBizSrv='tplBizSrv' :cardTheme='cardTheme' :cellData.sync='row.children[0]'></message-base-cell-input>
          <message-base-cell-input :index='`textview_${index}_1`' :ref='`ref_${index}_1`' :tplBizSrv='tplBizSrv' :cardTheme='cardTheme' :cellData.sync='row.children[1]' v-if='getCellVisible(row.children[1])'></message-base-cell-input>
        </div>
        <!-- <span class='custom_checkbox' v-if='index < 9'>
          <input type='checkbox' :id='`line_${index}`' :checked='getLineChecked(row)' @change='changeLine($event, row)'>
          <label :for='`line_${index}`'>라인</label>
        </span> -->
        <span class='custom_checkbox' v-if='index < 9'>
          <input type='checkbox' :id='`line_${index}`' :checked='getLineChecked(row)' @change='changeLine($event, row)'>
          <label :for='`line_${index}`'></label>
        </span>
        <!-- 삭제 버튼 - -->
        <a v-if="index > 0" href='javascript:void(0);' class='btn_squre minus' :id='`line_${index}`' @click='delCell($event, index)'></a>
      </li>
      <li>
        (<span :style="fixedLength > ctn.maxDescrSize ? 'color:red' : ''">{{fixedLength}}</span>/{{ctn.maxDescrSize || 90}}자)
        <!-- <a href='javascript:void(0);' class='btn gray sml btn_add' v-if='visibleAddCellButton' @click='addCell'>Cell 추가</a> -->
        <a href='javascript:void(0);' class='btn_squre plus mar_r18' v-if='visibleAddCellButton' @click='addCell'>Cell 추가</a>
      </li>
    </ul>
  </div>
</template>

<script>
import MessageBaseCellInput from '@/views/service/components/MessageBaseCellInput'
import defaultRefData from '@/components/messageTemplate/js/openrichcardDefaultRefData'
import messageBaseFormUtils from '@/components/messageTemplate/js/MessageBaseFormUtils'

export default {
  name: 'MessageBaseCell',
  props: {
    jsonData: {
      type: Object
    },
    orgnfmtstr: {
      type: Object
    },
    ctn: {
      type: Object
    },
    tplBizSrv: {
      type: String
    },
    cardTheme: {
      type: String
    }
  },
  components: {
    MessageBaseCellInput
  },
  data() {
    return {
      regex: /\{\{(.*?)\}\}/g,
      maxlength: 90,
      fixedLength: 0,
      variableCount: 0,
      cellClone: null,
      cellOptions: '',
      msg:
        `• 변수로 설정하고자 하는 내용을 {{ }} 표시로 작성해주세요.&nbsp;&nbsp;예) {{이름}}, {{date}}<br>
        • 변수명은 20자 이내의 한글, 영문, 숫자, ‘_’ 만 가능합니다.<br>
        • 특수문자, 공란, 줄바꿈  그리고 {{description}} 변수명 사용 불가합니다.<br>
        ※ 버튼에 들어가는 글자는 90자 제한 대상에 포함되지 않습니다.<br>
        <span class='h4_desc mar_t10'>
          메시지 내용은 고정부 메시지와 변수명에 들어가는 메시지를 합쳐서 총 90자 이내로 작성해주세요.<br>(90자 초과시 전송 불가)
        </span>`
    }
  },
  computed: {
    linearLayouts() {
      if (jglib.isEmpty(this.jsonData)) {
        return []
      }
      let RCSMessage = this.jsonData.RCSMessage
      let layout = RCSMessage.openrichcardMessage.layout
      let rootLinear
      if (this.cardTheme === 'TA') {
        let layoutFilterForTa = layout.children.filter(c => c.widget === 'LinearLayout')[0]
        let layoutFilterForTa2 = layoutFilterForTa.children.filter(c => c.widget === 'LinearLayout')
        return layoutFilterForTa2[1].children.filter(c => c.widget === 'LinearLayout')
      } else {
        rootLinear = layout.children.filter(c => c.widget === 'LinearLayout')
        return rootLinear[0].children.filter(c => c.widget === 'LinearLayout')
      }
    },
    rootLinearChildren() {
      if (jglib.isEmpty(this.jsonData)) {
        return []
      }
      let RCSMessage = this.jsonData.RCSMessage || this.jsonData.rcsMessage
      let layout = RCSMessage.openrichcardMessage.layout
      let rootLinear = layout.children.filter(c => c.widget === 'LinearLayout')
      return rootLinear[0].children
    },
    visibleLinearLayouts() {
      this.textCalcurator()
      this.getTextInput()
      return this.linearLayouts.filter(l => l.visibility !== 'gone')
    },
    visibleAddCellButton() {
      return this.visibleLinearLayouts.length < this.linearLayouts.length
    }
  },
  watch: {
    orgnfmtstr() {
      this.cellClone = this.orgnfmtstr.RCSMessage.openrichcardMessage.layout.children.find(c => c.widget === 'LinearLayout').children.filter(c => c.widget === 'LinearLayout')
    },
    jsonData: {
      deep: true,
      handler() {
        if (jglib.isEmpty(this.jsonData)) {
          this.getDefaultJsonData()
        } else {
          this.getData()
        }
      }
    }
  },
  created() {
    if (jglib.isEmpty(this.jsonData)) {
      this.getDefaultJsonData()
    } else {
      this.getData()
    }
  },
  mounted() {
  },
  methods: {
    getData() {},
    getNextView(row) {
      let index = this.rootLinearChildren.indexOf(row)
      let next = this.rootLinearChildren[index + 1]
      return next && next.widget === 'View' ? next : null
    },
    getRowTypeChecked(row) {
      if (row.children !== null && row.children !== undefined && row.children.length === 1) {
        return true
      }
      return false
    },
    getCellVisible(cell) {
      return cell
    },
    changeRowType(e, row, index) {
      // Row type을 변경
      if (e.target.value === 'wide') {
        row.children.splice(1, 1)
      } else {
        if (this.cardTheme === 'TA') {
          const children = this.cellClone[1].children[0].children[1]
          children.text = null
          children.textStyle = null
          row.children.push(_.cloneDeep(children))
        } else {
          // add right side textview
          const children = this.cellClone.length > index ? this.cellClone[index].children[1] : this.cellClone[0]
          children.text = null
          children.textStyle = null
          row.children.push(_.cloneDeep(children))
        }
      }
    },
    getLineChecked(row) {
      // 라인 체크 여부
      if (this.cardTheme === 'TA') {
        let index = this.rootLinearChildren[2].children.indexOf(row)
        let view = this.rootLinearChildren[2].children[index + 1]
        if (view && view.widget === 'View' && (view.visibility === 'visible' || view.visibility === '')) {
          return true
        }
        return false
      } else {
        let index = this.rootLinearChildren.indexOf(row)
        let view = this.rootLinearChildren[index + 1]
        if (view && view.widget === 'View' && (view.visibility === 'visible' || view.visibility === '')) {
          return true
        }
        return false
      }
    },
    changeLine(e, row) {
      if (this.cardTheme === 'TA') {
        let index = this.rootLinearChildren[2].children.indexOf(row)
        let view = this.rootLinearChildren[2].children[index + 1]
        if (view && view.widget === 'View') {
          if (e.target.checked) {
            view.visibility = 'visible'
          } else {
            view.visibility = 'gone'
          }
        }
      } else {
        let index = this.rootLinearChildren.indexOf(row)
        let view = this.rootLinearChildren[index + 1]
        if (view && view.widget === 'View') {
          if (e.target.checked) {
            view.visibility = 'visible'
          } else {
            view.visibility = 'gone'
          }
        }
      }
    },
    textCalcurator() {
      let vars = []
      let fixedLength = 0
      let variableCount = 0
      try {
        this.linearLayouts.forEach(s => {
          s.children.forEach(ss => {
            const text = ss.text
            if (text) {
              // 고정부를 계산한다. 변수를 제외한 글자수만큼 차감한다.
              fixedLength += text.split(/{{.*?}}/).join('').length
              if (text.match(this.regex)) {
                // 변수부 개수를 계산한다.
                text.match(this.regex).forEach(t => vars.push(t))
              }
            }
          })
        })
        // 중복된 변수를 제외한 개수를 차감한다.
        // variableCount = _.uniqBy(vars).length
        variableCount = vars.length

        this.fixedLength = fixedLength
        this.variableCount = variableCount
      } catch (err) {
      }
    },
    getDefaultJsonData() {
      // 화면 진입 시 기본으로 보여줌
      let refData = JSON.parse(JSON.stringify(defaultRefData))
      let linear = JSON.parse(JSON.stringify(refData['linearLayout']))
      let image = JSON.parse(JSON.stringify(refData['imageView']))

      let jsonData = refData['layout']
      linear.children.push(image)
      linear.children.push(JSON.parse(JSON.stringify(refData['linearLayout'])))
      linear.children[1].children.push(JSON.parse(JSON.stringify(refData['cell']['row'])))
      linear.children[1].children.push(JSON.parse(JSON.stringify(refData['view'])))
      linear.children[1].children.push(JSON.parse(JSON.stringify(refData['cell']['row'])))
      linear.children[1].children.push(JSON.parse(JSON.stringify(refData['view'])))
      jsonData.RCSMessage.openrichcardMessage.layout = linear
      this.$emit('update:jsonData', jsonData)
    },
    getDefaultRefData(value) {
      return defaultRefData['cell'][value]
    },
    addCell() {
      // 셀 추가
      // // 타이틀 자유형일 때 바꿔줘야 함.
      // if (this.cardTheme === 'TA') {
      //   let nextIdx = this.visibleLinearLayouts.length
      //   let nextLinearLayout = this.linearLayouts[nextIdx]
      //   nextLinearLayout.visibility = 'visible'
      // } else {
      let nextIdx = this.visibleLinearLayouts.length
      let nextLinearLayout = this.linearLayouts[nextIdx]
      nextLinearLayout.visibility = 'visible'
      // }
    },
    delCell (e, i) {
      const index = i
      let nextLinearLayout = this.linearLayouts[index]
      nextLinearLayout.visibility = 'gone'
      const target = this.linearLayouts.splice(index, 1)[0]
      for (let i = 0; i < target.children.length; i++) {
        target.children[i].text = ''
      }
      this.linearLayouts.splice(this.linearLayouts.length, 0, target)
      // jsonData 제어
      let jsonData
      if (this.cardTheme === 'TA') {
        jsonData = this.jsonData.RCSMessage.openrichcardMessage.layout.children[0].children[2]
      } else {
        jsonData = this.jsonData.RCSMessage.openrichcardMessage.layout.children[1]
      }
      // 라인도 지워야 해서 인덱스 부터 2개 splice 합니다.
      const targetJson = jsonData.children.splice(index * 2, 2)
      for (let i = 0; i < targetJson.length; i++) {
        jsonData.children.push(targetJson[i])
        if (i % 2 === 1) {
          targetJson[i].visibility = 'gone'
        }
      }
    },
    getFixedLength() {
      return this.fixedLength
    },
    validateData() {
      // 입력 검증
      let focus = null

      let alphanumeric = true
      let allEmpty = true
      let withoutVariable = true
      this.visibleLinearLayouts.forEach((row, index1) => {
        row.children.forEach((cell, index2) => {
          // 각 행별 체크
          if (!messageBaseFormUtils.checkVarialbeString(cell.text)) {
            // 변수명이 한글, 영문, 숫자, 언더바로 구성되어 있는지
            focus = `ref_${index1}_${index2}`
            alphanumeric = false
          }
          if (cell.widget.toLowerCase() === 'textview' && !jglib.isEmpty(cell.text)) {
            // 텍스트의 값이 있는 경우
            allEmpty = false
            if (withoutVariable && messageBaseFormUtils.getParamKey(cell.text) != null) {
              // 최소 한개의 변수가 존재하는지
              withoutVariable = false
            }
          }
        })
      })

      if (allEmpty) {
        // 셀 입력이 전혀 없는 경우
        this.$alertMsg('내용을 입력해 주세요.')
        this.$refs['ref_0_0'][0].setFocus()
        return false
      }

      // CSR #1275 이후 스타일 템플릿 변수 필수 조건 해제
      // if (withoutVariable) {
      //   this.$alertMsg('내용에 한 개 이상의 변수를 입력해 주세요.')
      //   this.$refs['ref_0_0'][0].setFocus()
      //   return false
      // }

      if (!alphanumeric) {
        this.$alertMsg('변수명은 20자 이내의 한글, 영문, 숫자, ‘_’ 만 가능합니다.(특수문자, 공란, 줄바꿈 사용 불가)')
        this.$refs[focus][0].setFocus()
        return false
      }

      if (this.fixedLength === 0 && this.variableCount > 0) {
        // cell 입력 영역에 변수만 있을 경우
        this.$alertMsg('변수 이외 문장을 입력해 주시기 바랍니다.')
        return false
      }

      if (this.fixedLength > this.ctn.maxDescrSize || (this.fixedLength >= this.ctn.maxDescrSize && this.variableCount > 0)) {
        // 고정부 90자 초과 혹은 고정부 90자 이상일 때 변수가 존재하는 경우
        this.$alertMsg(`메시지 내용은 고정부 메시지와 변수명에 들어가는 메시지를 합쳐서 총 ${this.ctn.maxDescrSize}자 이내로 작성해주세요. (${this.ctn.maxDescrSize}자 초과시 전송 불가)`)
        return false
      }
      return true
    },
    voidRemoveNotUsedTextview(json) {
      // 승인요청시 사용하지 않는 텍스트뷰는 제거
      let layout
      let rootLinear
      if (this.cardTheme === 'TA') {
        layout = json.RCSMessage.openrichcardMessage.layout
        // rootLinear = layout.children.filter(c => c.widget === 'LinearLayout')[0]
        let layoutForTa = layout.children.filter(c => c.widget === 'LinearLayout')[0]
        let rootLinear = layoutForTa.children.filter(c => c.widget === 'LinearLayout')[1]
        for (let i = rootLinear.children.length - 1; i >= 0; i--) {
          let element = rootLinear.children[i]
          if (element.widget === 'LinearLayout') {
            // 셀(1셀, 2셀 모두) 내용이 모두 텍스트가 없는 경우 제거
            let children = element.children
            let emptyLeft = true
            let emptyRight = true
            children.forEach((textview, index) => {
              if (textview.text.length > 0) {
                if (index === 0) {
                  emptyLeft = false
                } else {
                  emptyRight = false
                }
              }
              // style이 부여되지 않았으면 key 삭제
              if (jglib.isEmpty(textview.textStyle)) {
                delete textview.textStyle
              }
            })
            if (emptyLeft && emptyRight) {
              // 모두 빈 경우
              // console.log('셀(1셀, 2셀 모두) 내용이 모두 텍스트가 없는 경우 제거')
              rootLinear.children.splice(i, 1)
            } else if (emptyLeft) {
              // 왼쪽만 빈 경우
              rootLinear.children[i].children.splice(0, 1)
            } else if (emptyRight) {
              // 오른쪽만 빈 경우
              rootLinear.children[i].children.splice(1, 1)
            }
          } else if (element.widget === 'View' && element.visibility !== 'visible') {
            // 사용 하지 않는 라인 제거
            rootLinear.children.splice(i, 1)
          }
        }
        return layout
      } else {
        layout = json.RCSMessage.openrichcardMessage.layout
        rootLinear = layout.children.filter(c => c.widget === 'LinearLayout')[0]
        for (let i = rootLinear.children.length - 1; i >= 0; i--) {
          let element = rootLinear.children[i]
          if (element.widget === 'LinearLayout') {
            // 셀(1셀, 2셀 모두) 내용이 모두 텍스트가 없는 경우 제거
            let children = element.children
            let emptyLeft = true
            let emptyRight = true
            children.forEach((textview, index) => {
              if (textview.text.length > 0) {
                if (index === 0) {
                  emptyLeft = false
                } else {
                  emptyRight = false
                }
              }
              // style이 부여되지 않았으면 key 삭제
              if (jglib.isEmpty(textview.textStyle)) {
                delete textview.textStyle
              }
            })
            if (emptyLeft && emptyRight) {
              // 모두 빈 경우
              rootLinear.children.splice(i, 1)
            } else if (emptyLeft) {
              // 왼쪽만 빈 경우
              rootLinear.children[i].children.splice(0, 1)
            } else if (emptyRight) {
              // 오른쪽만 빈 경우
              rootLinear.children[i].children.splice(1, 1)
            }
          } else if (element.widget === 'View' && element.visibility !== 'visible') {
            // 사용 하지 않는 라인 제거
            rootLinear.children.splice(i, 1)
          }
        }
        return layout
      }
    },
    getParamInfo(type) {
      // 저장, 승인요청 시 필요한 파라미터 정보를 추출
      let params = []
      for (let i = 0; i < this.visibleLinearLayouts.length; i++) {
        let linear = this.visibleLinearLayouts[i]
        linear.children.forEach(c => {
          if (messageBaseFormUtils.isContainParamKey(c.text)) {
            let targets = messageBaseFormUtils.getParamKey(c.text)
            targets.forEach(value => {
              let param = messageBaseFormUtils.getParamObj(value, 'cell')
              params.push(param)
            })
          }
        })
      }
      return params
    },
    getTextInput() {
      let text = ''
      for (let i = 0; i < this.linearLayouts.length; i++) {
        // console.log(this.linearLayouts[i])
        let t2 = this.linearLayouts[i].children.filter(c => c.text !== null && c.text.length > 0)
        if (t2.length > 0) {
          for (let j = 0; j < t2.length; j++) {
            text += t2[j].text
          }
        }
      }
      this.$emit('update:inputCellText', text)
    }
  }
}
</script>
