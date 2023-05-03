const messageBaseFormUtils = {
  reformOpenrichcardCell(fmtStrData, cardTheme) {
    if (cardTheme === 'TA') {
      let layout = fmtStrData.RCSMessage.openrichcardMessage.layout
      let rootLinearLayout = layout.children[0].children.filter(c => c.widget === 'LinearLayout')[1]
      let newChildren = []
      for (let i = 0; i < rootLinearLayout.children.length; i++) {
        let child = rootLinearLayout.children[i]
        if (child.widget === 'LinearLayout') {
          child = this.convertTextViewOfLinearLayout(child)
        }
        if (i > 3) {
          child.visibility = 'gone'
        }
        newChildren.push(child)
      }
      rootLinearLayout.children = newChildren
      return fmtStrData
    } else {
      let layout = fmtStrData.RCSMessage.openrichcardMessage.layout
      let rootLinearLayout = layout.children.filter(c => c.widget === 'LinearLayout')[0]
      let newChildren = []
      for (let i = 0; i < rootLinearLayout.children.length; i++) {
        let child = rootLinearLayout.children[i]
        if (child.widget === 'LinearLayout') {
          child = this.convertTextViewOfLinearLayout(child)
        }
        if (i > 3) {
          child.visibility = 'gone'
        }
        newChildren.push(child)
      }
      rootLinearLayout.children = newChildren
      return fmtStrData
    }
  },
  convertTextViewOfLinearLayout(obj) {
    for (let i = 0; i < obj.children.length; i++) {
      let child = obj.children[i]
      if (child.widget === 'TextView' && child.widgetPolicy && child.widgetPolicy.allowedAttributes && child.widgetPolicy.allowedAttributes.indexOf('text') > -1) {
        child.text = ''
      }

      if (!child.textStyle) {
        child['textStyle'] = ''
      }
      obj.children[i] = child
    }
    return obj
  },
  addCellMessageBaseFormToFormattedString(formFmtStrData, fmtStrData, cardTheme) {
    if (cardTheme === 'TA') {
      // messagebaseform
      let formLayout = formFmtStrData.RCSMessage.openrichcardMessage.layout
      let formRootLinearLayoutTitle = formLayout.children[0].children.filter(c => c.widget === 'LinearLayout')[0]
      let formRootLinearLayout = formLayout.children[0].children.filter(c => c.widget === 'LinearLayout')[1]
      // saved formattedString
      let layout = fmtStrData.RCSMessage.openrichcardMessage.layout
      let rootLinearLayoutTitle = layout.children[0].children.filter(c => c.widget === 'LinearLayout')[0]
      let rootLinearLayout = layout.children[0].children.filter(c => c.widget === 'LinearLayout')[1]
      // 타이틀2 영역 저장된 데이터와 등록된 양식 데이터 비교해서 저장된 값으로 visible을 바꿔준다
      formRootLinearLayoutTitle.children[1].visibility = rootLinearLayoutTitle.children[1].visibility

      let i = 0
      formRootLinearLayout.children.forEach(c => {
        const u = rootLinearLayout.children[i]
        if (u && c.widget === u.widget) {
          i++
          if (c.widget === 'LinearLayout') {
            c.children = _.cloneDeep(u.children)
          }
          c.visibility = 'visible'
        }
      })
      formFmtStrData.RCSMessage.openrichcardMessage.suggestions = fmtStrData.RCSMessage.openrichcardMessage.suggestions
    } else {
      // messagebaseform
      let formLayout = formFmtStrData.RCSMessage.openrichcardMessage.layout
      let formRootLinearLayout = formLayout.children.filter(c => c.widget === 'LinearLayout')[0]

      // saved formattedString
      let layout = fmtStrData.RCSMessage.openrichcardMessage.layout
      let rootLinearLayout = layout.children.filter(c => c.widget === 'LinearLayout')[0]

      let i = 0
      formRootLinearLayout.children.forEach(c => {
        const u = rootLinearLayout.children[i]
        if (u && c.widget === u.widget) {
          i++
          if (c.widget === 'LinearLayout') {
            c.children = _.cloneDeep(u.children)
          }
          c.visibility = 'visible'
        }
      })
      // 마지막 라인 체크가 된 인덱스를 가져온다.
      // 해당 인덱스보다 작은 셀들은 모두 visible 시켜준다. 셀 삭제 생기면서 기능 삭제
      // let lasti = 0
      // layout.children.filter(c => c.widget === 'LinearLayout')[0].children.forEach((c, index) => {
      //   if (c.widget === 'View' && c.visibility === 'visible') {
      //     lasti = index
      //   }
      // })
      // formRootLinearLayout.children.filter(c => c.widget === 'LinearLayout').forEach((c, index) => {
      //   if (lasti > index) {
      //     c.visibility = 'visible'
      //   }
      // })
      formFmtStrData.RCSMessage.openrichcardMessage.suggestions = fmtStrData.RCSMessage.openrichcardMessage.suggestions
    }
    return formFmtStrData
  },
  convertMessageBaseFormFmtStrToObj(fmtStr) {
    let fmt = JSON.parse(fmtStr)
    let fmtStrData = typeof fmt === 'string' ? JSON.parse(fmt) : fmt
    return fmtStrData
  },
  getStrRegx(message) {
    const pattern = /[(){}[\]\\<>.+*!?$^|]/g

    let messages = message.split(/{{.*?}}/)
    let strRegx = ''
    strRegx += '^' // start
    for (let i = 0; i < messages.length; i++) {
      if (messages[i]) {
        strRegx += '(' + messages[i].replace(pattern, '\\$&') + ')'
      }
      if (i < messages.length - 1) {
        strRegx += '.+'
      }
    }
    strRegx += '$' // end
    // strRegx = strRegx.replace(/\r?\n/g, "\\n")
    return strRegx
  },
  getVerification(message) {
    // const pattern = /[\"]/g
    let messages = message.split(/{{.*?}}/)
    for (let i = 0; i < messages.length; i++) {
      // messages[i] = '"' + messages[i] + '"'
    }
    return messages.join('|¶|')
  },
  voidRemoveWidgetPolicy(json) {
    let layout = json.RCSMessage.openrichcardMessage.layout
    let rootLinearLayout = layout.children.filter(c => c.widget === 'LinearLayout')[0]
    let newChildren = []

    for (let i = 0; i < rootLinearLayout.children.length; i++) {
      let child = rootLinearLayout.children[i]

      if (child.widget === 'LinearLayout') {
        for (let j = 0; j < child.children.length; j++) {
          if (child.children[j].widgetPolicy) {
            delete child.children[j].widgetPolicy
          }
        }
      }

      if (child.widgetPolicy) {
        delete child.widgetPolicy
      }
      newChildren.push(child)
    }
    rootLinearLayout.children = newChildren
  },
  tavoidRemoveWidgetPolicy(json) {
    let layout = json.RCSMessage.openrichcardMessage.layout.children[0]
    let rootLinearLayout = layout.children.filter(c => c.widget === 'LinearLayout')[1]
    let newChildren = []

    for (let i = 0; i < rootLinearLayout.children.length; i++) {
      let child = rootLinearLayout.children[i]

      if (child.widget === 'LinearLayout') {
        for (let j = 0; j < child.children.length; j++) {
          if (child.children[j].widgetPolicy) {
            delete child.children[j].widgetPolicy
          }
        }
      }

      if (child.widgetPolicy) {
        delete child.widgetPolicy
      }
      newChildren.push(child)
    }
    rootLinearLayout.children = newChildren
  },
  tatitlevoidRemoveWidgetPolicy(json) {
    let layout = json.RCSMessage.openrichcardMessage.layout.children[0]
    let rootLinearLayout = layout.children.filter(c => c.widget === 'LinearLayout')[0]
    let newChildren = []

    for (let i = 0; i < rootLinearLayout.children.length; i++) {
      let child = rootLinearLayout.children[i]

      if (child.widget === 'LinearLayout') {
        for (let j = 0; j < child.children.length; j++) {
          if (child.children[j].widgetPolicy) {
            delete child.children[j].widgetPolicy
          }
        }
      }

      if (child.widgetPolicy) {
        delete child.widgetPolicy
      }
      newChildren.push(child)
    }
    rootLinearLayout.children = newChildren
  },
  voidResetMediaUrl(json) {
    json.RCSMessage.openrichcardMessage.layout.children.find(o => o.widget === 'ImageView').mediaUrl = null
  },
  getIsOnlyParam(value) {
    // 변수 {{}}만 있는 값인지 리턴
    return value.split(/{{.*?}}/).join('') === ''
  },
  getParamName(value) {
    // 변수 기호 {{}}를 제거한 값 리턴
    return value.split('{{').join('').split('}}').join('')
  },
  getParamKey(str) {
    return str.match(/{{.*?}}/g)
  },
  isContainParamKey(str) {
    let regx = /{{.*?}}/
    return regx.test(str)
  },
  getParamsFromSuggestion(fmtStrData) {
    let suggestions = fmtStrData.RCSMessage.openrichcardMessage.suggestions
    let params = []
    for (let i = 0; i < suggestions.length; i++) {
      let targets = this.getCheckTargetOfSuggestions(suggestions[i])
      let keys = Object.keys(targets)
      keys.forEach(key => {
        let target = targets[key]
        if (typeof target === 'string') {
          params = params.concat(
            this.getParams(target, this.getCtnTypeSuggestion(suggestions[i]))
          )
        } else {
          Object.keys(target).forEach(t => {
            params = params.concat(
              this.getParams(
                target[t],
                this.getCtnTypeSuggestion(suggestions[i])
              )
            )
          })
        }
      })
    }
    return params
  },
  getParams(target, ctnType) {
    let params = []
    let values = this.getParamKey(target)
    if (values) {
      values.forEach(value => {
        let param = this.getParamObj(value, ctnType)
        params.push(param)
      })
    }
    return params
  },
  getCheckTargetOfSuggestions(sugg) {
    let keys = Object.keys(sugg.action)
    let targets = {}
    keys.forEach(key => {
      if (key !== 'displayText' && key !== 'postback') {
        if (key === 'urlAction') {
          targets = sugg.action.urlAction.openUrl
        } else if (key === 'mapAction') {
          if (sugg.action.mapAction.showLocation) {
            targets = sugg.action.mapAction.showLocation
          }
        } else if (key === 'calendarAction') {
          targets = sugg.action.calendarAction.createCalendarEvent
        } else if (key === 'clipboardAction') {
          targets = sugg.action.clipboardAction.copyToClipboard
        } else if (key === 'composeAction') {
          targets = sugg.action.composeAction.composeTextMessage
        } else if (key === 'dialerAction') {
          targets = sugg.action.dialerAction.dialPhoneNumber
        } else if (key === 'localBrowserAction') {
          targets = sugg.action.localBrowserAction.openUrl
        }
      }
    })
    return targets
  },
  getCtnTypeSuggestion(sugg) {
    return sugg.action.urlAction ? 'url' : 'etc'
  },
  getParamObj(value, ctnType) {
    return {
      paramNm: this.getParamName(value),
      paramType: 'string',
      strSize: '-1',
      ctnType: ctnType
    }
  },
  reformSuggestionForView(fmtStr) {
    let suggestions = fmtStr.RCSMessage.openrichcardMessage.suggestions
    if (suggestions) {
      for (let i = suggestions.length - 1; i >= 0; i--) {
        let sugg = suggestions[i]
        if (jglib.isEmpty(sugg)) {
          suggestions.splice(i, 1)
        } else {
          suggestions[i]['type'] = sugg.action.postback.data.substring(
            'set_by_chatbot_'.length
          )
        }
      }
    }

    fmtStr.RCSMessage.openrichcardMessage.suggestions = suggestions
    return fmtStr
  },
  checkVarialbeString(str) {
    let messages = str.match(/\{\{(.*?)\}\}/g) // str.match(/\{\{(?=.*)[^}]+\}\}/g)
    let m = ''
    let v = ''
    if (messages) {
      for (let i = 0; i < messages.length; i++) {
        m = messages[i]
        if (m.split(/[\n\r]/g).length > 1) {
          return false
        }

        v = m.substring(2, m.length - 2)
        if (!v.match(/^[0-9a-zㄱ-힣_]+$/i)) {
          return false
        }

        if (v.length > 20) {
          return false
        }
      }
    }
    return true
  },
  checkDescriptionVariable(str) {
    let vars = str.match(/\{\{(.*?)\}\}/g)
    if (vars) {
      for (let i = 0; i < vars.length; i++) {
        if (this.getParamName(vars[i]).toUpperCase() === 'DESCRIPTION') {
          return false
        }
      }
    }
    return true
  },
  checkContentEmpty(str) {
    const variable = /\{\{(?=.*)[^}]+\}\}/gi
    const newline = /\r|\r\n|\n/gi
    const whitespace = /\s/gi
    str = str.replace(variable, '').replace(newline, '').replace(whitespace, '')
    return jglib.isEmpty(str)
  },
  checkOnlyVarialbeString(str) {
    let messages = str.match(/\{\{(.*?)\}\}/g)
    if (messages) {
      // 변수부가 있을 때
      if (messages.length > 1) {
        // 변수가 1개 이상 있을 경우
        return false
      }
    } else if (!messages) {
      // 변수부가 없는 경우
      return false
    } else if (str.length !== messages[0].length) {
      // 변수부 이외의 텍스트가 있는 경우
      return false
    }
    return true
  },
  checkVarialbeStrings(str, type) {
    let messages = str.match(/\{\{(.*?)\}\}/g)
    // 중복 제거
    messages = [...new Set(messages)]
    if (messages) {
      // 변수가 1개 이상 있을 경우
      return messages
    }
    return false
  },
  checkIsUrlValid(url) {
    let fullUrl = url.replace(/(http(s*):\/\/)/g, '')
    let domain = ''
    let uri = ''
    let idx1 = fullUrl.indexOf('/')
    let idx2 = fullUrl.indexOf('?')
    let subIdx = 0
    if (idx1 !== -1 && idx2 !== -1) subIdx = idx1 < idx2 ? idx1 : idx2
    else if (idx1 === -1 && idx2 === -1) subIdx = fullUrl.length
    else subIdx = idx1 === -1 ? idx2 : idx1

    if (subIdx !== 0) {
      domain = fullUrl.substring(0, subIdx)
      uri = fullUrl.substring(subIdx + 1, fullUrl.length)
    } else domain = fullUrl
    // 도메인 체크
    if (domain.length === 0) {
      return { reason: 'url', msg: '올바른 URL 형식이 아닙니다.' }
    } else if (domain.length > 0) {
      const ipRegExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([1-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])/
      const domainRegExp = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/

      let onlyDomain = domain
      let port = ''
      let portIdx = domain.indexOf(':')
      if (portIdx !== -1) {
        onlyDomain = domain.substring(0, portIdx)
        port = domain.substring(portIdx + 1, domain.length)
      }
      if (this.isContainParamKey(onlyDomain)) {
        return { reason: 'domain variable', msg: '도메인에는 변수 사용이 불가합니다.' }
      }
      if (!onlyDomain.match(ipRegExp) && !onlyDomain.match(domainRegExp)) {
        return { reason: 'domain', msg: '유효하지 않은 도메인 입니다.' }
      }
      if (port !== '') {
        if (isNaN(port) || !(port >= 0 && port < 65536)) {
          return { reason: 'port', msg: '유효하지 않은 포트 입니다.' }
        }
      }
    }
    // URL 체크
    if (uri.length > 0) {
      if (!this.checkVarialbeString(uri)) {
        return { reason: 'description variable', msg: '변수명은 20자 이내의 한글, 영문, 숫자, \'_\'만 가능합니다.(특수문자, 공란, 줄바꿈 사용 불가)' }
      }
      if (!this.checkDescriptionVariable(uri)) {
        return { reason: 'variable', msg: '\'description\'은 변수명으로 사용이 불가합니다.' }
      }
    }
    return null
  }
}

export default messageBaseFormUtils
