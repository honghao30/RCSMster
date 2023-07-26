import moment from 'moment'
import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'
import actionData from '@/components/js/openrichcardDefaultRefData'

/* 브랜드 소식 */
export function brandFeedList(brandId, params) {
  if (isUseAPI) {
    return request({
      url: `/brand/${brandId}/autoreply/brandFeed`,
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }
}

/** 자동응답 메시지 > 목록 조회 */
export function retireveAutoReplyList(brandId, params) {
  if (isUseAPI) {
    return request({
      url: `/brand/${brandId}/autoreply`,
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }
  return new Promise((resolve, reject) => {
    let res = {
      code: '20000000',
      desc: null,
      result: []
    }
    resolve(res)
  })
}
/** 자동응답 메시지 > 상세 조회 */
export function retireveAutoReplyInfo(brandId, armId) {
  if (isUseAPI) {
    return request({
      url: `/brand/${brandId}/autoreply/${armId}`,
      method: 'get',
      meta: { useErrorMessage: false }
    })
  }
  return new Promise((resolve, reject) => {
    let res = {
      code: '20000000',
      desc: null,
      result: {}
    }
    resolve(res)
  })
}
/** 자동응답 메시지 > 탬플릿 목록 조회 */
export function retireveTemplateList(brandId, params) {
  if (isUseAPI) {
    return request({
      url: `/brand/${brandId}/templatecontent`,
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }
}
/** 자동응답 메시지 > 신규 등록 */
export function createAutoReply(brandId, data) {
  if (isUseAPI) {
    return request({
      url: `/brand/${brandId}/autoreply`,
      method: 'post',
      data: data,
      meta: { useErrorMessage: false }
    })
  }
}
/** 자동응답 메시지 > 수정 */
export function saveAutoReply(brandId, armId, params) {
  if (isUseAPI) {
    return request({
      url: `/brand/${brandId}/autoreplymsg/${armId}`,
      method: 'put',
      data: params,
      meta: { useErrorMessage: false }
    })
  }
}
/** 자동응답 메시지 > 삭제 */
export function removeAutoReply(brandId, armId) {
  if (isUseAPI) {
    let params = { 'armId': armId }
    return request({
      url: `/brand/${brandId}/autoreply`,
      method: 'delete',
      data: params,
      meta: { useErrorMessage: false }
    })
  }
}

/** 등록수정시 템플릿 아이디 조회 용도 */
export function getTemplateInfo(brandId, params) {
  if (isUseAPI) {
    return request({
      url: `/brand/${brandId}/autoreply/template`,
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }
}

// 화면에서 설정된 Suggestion 정보를 서버 저장 포맷에 맞도록 변환 처리
export function reformSuggestionForRequest (suggestions) {
  const utcSplitor = ':00'
  suggestions.forEach(sugg => {
    // 버튼 타입에 맞게 세팅한다.
    let btnType = ''
    if (sugg.btnEvent === 'other') {
      btnType = sugg.btnOtherEvent
    } else {
      btnType = sugg.btnEvent
    }
    // 간편 챗봇 이랑 챗봇 연결은 action이 아니라 reply로 해야된다.
    if (btnType === 'auto_reply' || btnType === 'basic_reply') {
      // reply 인 버튼들 세팅
      // 버튼 명 입력
      sugg.reply.displayText = sugg.btnName
      delete sugg.action
    } else {
      // action 인 버튼들 세팅
      // 버튼 명 입력
      sugg.action.displayText = sugg.btnName
      // 캘린더 값이 있으면 TimeZone에 맞게 변경해준다.
      if (sugg.action.calendarAction && sugg.action.calendarAction.createCalendarEvent) {
        const cal = sugg.action.calendarAction.createCalendarEvent
        if (!cal.useVariable) {
          if (cal.startTime) {
            let utc = moment.utc(cal.startTime).utcOffset(9 * 60).format()
            cal.startTime = utc.substring(0, utc.lastIndexOf(utcSplitor))
          }
          if (cal.endTime) {
            let utc = moment.utc(cal.endTime).utcOffset(9 * 60).format()
            cal.endTime = utc.substring(0, utc.lastIndexOf(utcSplitor))
          }
        }
        delete cal.useVariable
      } else if (sugg.action.localBrowserAction && sugg.action.localBrowserAction.openUrl) {
        // postParameter 는 json 형태로 문자열로 변환되어야 함
        let postParameter = sugg.action.localBrowserAction.openUrl.postParameter
        if (postParameter) {
          try {
            let json = JSON.parse('{ ' + postParameter + '}')
            sugg.action.localBrowserAction.openUrl.postParameter = json
          } catch (e) {
            console.error(e)
          }
        }
      } else if (sugg.action.mapAction) {
        if (sugg.action.mapAction.showLocation && (sugg.action.mapAction.showLocation.location.latitude || sugg.action.mapAction.showLocation.location.longitude)) {
          // 위경도는 실수 형태로 저장되어야 함
          if (sugg.action.mapAction.showLocation.location.latitude) {
            let latitude = Number(sugg.action.mapAction.showLocation.location.latitude)
            sugg.action.mapAction.showLocation.location.latitude = latitude
          }

          if (sugg.action.mapAction.showLocation.location.longitude) {
            let longitude = Number(sugg.action.mapAction.showLocation.location.longitude)
            sugg.action.mapAction.showLocation.location.longitude = longitude
          }
        }
      }
      delete sugg.reply
    }
    // 체크 용도의 type 삭제
    delete sugg.type
    delete sugg.btnEvent
    delete sugg.btnOtherEvent
  })
}

// 서버에 저장된 정보 화면 데이터 변환 처리
export function reformSuggestForView(brandId, json, templateContent) {
  let autoReplyData = {
    brandId: brandId, // 브랜드 아이디
    armId: json.autoReplyMsgId, // 간편 챗봇 아이디
    name: json.autoReplyMsgName, // 간편 챗봇 명
    imgSize: json.imgSize, // 간편챗봇 이미지 사이즈
    tplId: json.messagebaseId, // 템플릿 아이디
    tplNm: json.tplNm, // 템플릿 명
    copyAllowedYn: json.copyAllowed, // 간편 챗봇 복사 기능 사용 여부
    status: json.status, // 상태
    statusNm: json.statusNm, // 상태
    aprvRet: json.aprvRet, // 승인 결과
    aprvRetNm: json.aprvRetNm, // 승인 결과
    regUserNm: json.regUserNm,
    modUserNm: json.modUserNm,
    dpRegDt: json.dpRegDt,
    dpModDt: json.dpModDt,
    maxMediaSize: json.maxMediaSize
  }
  // 간편 챗봇 시작
  if (json.autoReplyMsgType === 'CARD') {
    autoReplyData.chatType = 'card'
  } else if (json.autoReplyMsgType === 'SLIDER') {
    autoReplyData.chatType = 'slider'
  } else {
    autoReplyData.chatType = 'chatBubble'
  }
  autoReplyData.cardData = reformBodyAndButtonForView(json.body, json.buttons, templateContent)
  if (autoReplyData.chatType === 'card' || autoReplyData.chatType === 'slider') {
    autoReplyData.chatCardTitle = (jglib.isEmpty(autoReplyData.cardData[0].title)) ? 'N' : 'Y' // 간편챗봇 타이틀 사용 여부
    autoReplyData.chatCardContent = (jglib.isEmpty(autoReplyData.cardData[0].description)) ? 'N' : 'Y' // 간편챗봇 타이틀 사용 여부
  }
  autoReplyData.chipSuggestions = reformChipListForView(json.chipList)
  autoReplyData.chipBtnUse = (jglib.isEmpty(json.chipList)) ? 'N' : 'Y' // 응답 버튼 사용 여부
  return autoReplyData
}

// 초기 데이터
export function getAutoReplyInitalData() {
  return {
    tplId: '',
    tplNm: '',
    name: '',
    chipSuggestions: [],
    copyAllowedYn: 'Y',
    cardData: []
  }
}

// 브랜드 정보 조회
export function retireveBrandInfo(brandId) {
  if (isUseAPI) {
    return request({
      url: `/brand/${brandId}`,
      method: 'get',
      meta: { useErrorMessage: false }
    })
  }
}

// 서버의 Body 와 Buttons 정보를 화면의 card 정보에 맞도록 변환 처리
function reformBodyAndButtonForView(body, buttons, templateContent) {
  if (jglib.isEmpty(body)) return []
  let cardList = []
  let jsonButtons
  if (jglib.isEmpty(buttons) || buttons === null) {
    jsonButtons = []
  } else {
    // jsonButtons = JSON.parse(buttons)
    jsonButtons = buttons
  }
  // let jsonBody = JSON.parse(body)
  // 키 순서대로 정렬
  let jsonBody = Object.keys(body).sort().reduce(
    (newObj, key) => {
      newObj[key] = body[key]
      return newObj
    },
    {}
  )
  let cardNo = 1
  for (let key in jsonBody) {
    let cardInfo = { fileName: '', fileRaw: '' } // 이미지 관련 default 세팅
    let cardIdx
    let cardKey
    let cardVal
    if (templateContent.cardType === 'CR' || templateContent.cardType === 'CS') {
      // Carousel 인 경우
      cardIdx = key.substr(key.length - 1, 1) - 1
      cardKey = key.substr(0, key.length - 1)
      cardVal = jsonBody[key]
    } else {
      cardIdx = 0
      cardKey = key
      cardVal = jsonBody[key]
    }

    if (jglib.isEmpty(cardList[cardIdx])) {
      cardInfo.cardNo = cardNo
      cardInfo.isActive = cardIdx === 0 // 수정시 카드 선택 여부(기본 : 비활성)
      cardList.push(cardInfo)
      cardNo++
    } else {
      cardInfo = cardList[cardIdx]
    }
    cardInfo[cardKey] = cardVal
  }
  if (jsonButtons.length === 0) {
    for (let idx in cardList) {
      cardList[idx]['suggestions'] = []
      cardList[idx]['buttonUseYn'] = 'N'
      // 카드별 유효성 검증 변수 정의
      cardList[idx].isImgError = { isShow: false, txt: '' }
      cardList[idx].isTitleError = { isShow: false, txt: '' }
      cardList[idx].isContentsError = { isShow: false, txt: '' }
    }
  } else {
    for (let idx in jsonButtons) {
      let suggestions = jsonButtons[idx].suggestions
      if (!jglib.isEmpty(suggestions)) {
        for (let i = suggestions.length - 1; i >= 0; i--) {
          let sugg = suggestions[i]
          if (jglib.isEmpty(sugg)) {
            suggestions.splice(i, 1)
          } else {
            let type = getSuggestionType(sugg)
            if (type === 'open_url' || type === 'dial_phone_number') {
              suggestions[i]['btnEvent'] = type
            } else {
              suggestions[i]['btnEvent'] = 'other'
              suggestions[i]['btnOtherEvent'] = type
            }
            if (suggestions[i].action) {
              suggestions[i]['btnName'] = sugg.action['displayText']
            }
            if (suggestions[i].reply) {
              suggestions[i]['btnName'] = sugg.reply['displayText']
            }
            for (const key in actionData['suggestions'][type]) {
              if (key.indexOf('Error') > -1) {
                suggestions[i]['action'][key] = actionData['suggestions'][type][key]
              }
            }
          }
        }
        cardList[idx]['suggestions'] = suggestions
        cardList[idx]['buttonUseYn'] = 'Y'
      } else {
        cardList[idx]['suggestions'] = []
        cardList[idx]['buttonUseYn'] = 'N'
      }
      // 카드별 유효성 검증 변수 정의
      cardList[idx].isImgError = { isShow: false, txt: '' }
      cardList[idx].isTitleError = { isShow: false, txt: '' }
      cardList[idx].isContentsError = { isShow: false, txt: '' }
    }
  }

  return cardList
}

// 서버의 Body 와 Buttons 정보를 화면의 card 정보에 맞도록 변환 처리
function reformChipListForView(chipList) {
  if (jglib.isEmpty(chipList) || chipList === null) return []

  // let suggestions = JSON.parse(chipList)
  let suggestions = chipList
  if (!jglib.isEmpty(suggestions)) {
    for (let i = suggestions.length - 1; i >= 0; i--) {
      let sugg = suggestions[i]
      if (jglib.isEmpty(sugg)) {
        suggestions.splice(i, 1)
      } else {
        let type = getSuggestionType(sugg)
        if (type === 'open_url' || type === 'dial_phone_number') {
          sugg['btnEvent'] = type
        } else {
          sugg['btnEvent'] = 'other'
          sugg['btnOtherEvent'] = type
        }
        if (sugg.action) {
          sugg['btnName'] = sugg.action['displayText']
          for (const key in actionData['suggestions'][type]) {
            if (key.indexOf('Error') > -1) {
              sugg.action[key] = actionData['suggestions'][type][key]
            }
          }
        }
        if (sugg.reply) {
          sugg['btnName'] = sugg.reply['displayText']
          sugg['isAutoReplyMsgIdError'] = {
            isShow: false,
            autoReplyMsgId: ''
          }
        }
        // 캘린더는 데이트 피커에 맞춰서 배열을 만든다.
        if (sugg.action.calendarAction) {
          let start, end
          if (sugg.action.calendarAction.createCalendarEvent.startTime) {
            start = sugg.action.calendarAction.createCalendarEvent.startTime.split('T')[0].replaceAll('-', '')
          }
          if (sugg.action.calendarAction.createCalendarEvent.endTime) {
            end = sugg.action.calendarAction.createCalendarEvent.endTime.split('T')[0].replaceAll('-', '')
          }
          sugg.action.calendarAction['datePicker'] = [start, end]
        }
      }
    }
  }
  return suggestions
}

function getSuggestionType(sugg) {
  let type = ''
  if (sugg.action.clipboardAction) {
    type = 'copy_to_clipboard'
  } else if (sugg.action.urlAction) {
    type = 'open_url'
  } else if (sugg.action.localBrowserAction) {
    type = 'local_url'
    //  postParameter 변환 처리
    if (sugg.action.localBrowserAction.openUrl && sugg.action.localBrowserAction.openUrl.postParameter) {
      try {
        let postParameter = JSON.stringify(sugg.action.localBrowserAction.openUrl.postParameter)
        sugg.action.localBrowserAction.openUrl.postParameter = postParameter.replace(/\{|\}/g, '').trim()
      } catch (e) {
        console.error(e)
      }
    }
  } else if (sugg.action.dialerAction) {
    type = 'dial_phone_number'
  } else if (sugg.action.calendarAction) {
    type = 'create_calendar_event'
  } else if (sugg.action.composeAction) {
    type = 'compose_text_message'
  } else if (sugg.action.mapAction) {
    if (sugg.action.mapAction.requestLocationPush) {
      type = 'request_location_push'
    } else if (sugg.action.mapAction.showLocation.location) {
      if (sugg.action.mapAction.showLocation.location.query) {
        type = 'search_locations'
      } else {
        type = 'show_location'
      }
    }
  }
  return type
}
// 버튼 비어있는지 체크
function isEmptyButtons(buttons) {
  if (jglib.isEmpty(buttons)) return true
  for (let idx in buttons) {
    if (!jglib.isEmpty(buttons[idx])) return false
  }
  return true
}
// 자동응답 등록시 데이터 set
export function getAutoReplySubmitData(brandId, productType, armData, armTemplate) {
  let body = {}
  let buttons = []
  // 1. 카드 데이터
  let _cardData = _.cloneDeep(armData.cardData)
  if (_cardData) {
    for (let idx in _cardData) {
      let disIdx = parseInt(idx)
      if (productType === 'carousel') { // carousel 상품
        body['title' + (disIdx + 1)] = _cardData[idx].title
        body['description' + (disIdx + 1)] = _cardData[idx].description
        body['media' + (disIdx + 1)] = _cardData[idx].media
      } else if (productType === 'standalone') {
        body['title'] = _cardData[idx].title
        body['description'] = _cardData[idx].description
        body['media'] = _cardData[idx].media
      } else {
        if (armTemplate.cardType !== 'SAS') {
          // body['title'] = _cardData[idx].title // 기본 말풍선은 title 항목이 없음
        }
        body['description'] = _cardData[idx].description
      }
      // 버튼을 사용가능하고, 사용자가 추가한 버튼이 있다면
      if (armTemplate.btnUseYn === 'Y' && !jglib.isEmpty(_cardData[idx].suggestions) && _cardData[idx].suggestions.length > 0 && _cardData[idx].buttonUseYn === 'Y') {
        // 데이터 형식 set
        reformSuggestionForRequest(_cardData[idx].suggestions)
        let suggestions = { suggestions: _cardData[idx].suggestions }
        buttons.push(suggestions)
      } else {
        buttons.push({})
      }
    }
  }
  // 2.칩리스트 정보
  let chipList = []
  let _chipSuggestions = armData.chipSuggestions
  if (!jglib.isEmpty(_chipSuggestions) && _chipSuggestions.length > 0 && armData.chipBtnUse === 'Y') {
    reformSuggestionForRequest(_chipSuggestions)
    chipList = _chipSuggestions
  }

  let formData = new FormData()
  let reqData = {
    armId: armData.armId || '',
    brandId: brandId,
    name: armData.name, // 자동응답명
    tplId: armData.tplId, // 템플릿 Id
    copyAllowedYn: armData.copyAllowedYn, // 메시지 복사 가능 여부
    status: armData.status,
    aprvRet: armData.aprvRet,
    body: JSON.stringify(body)
  }
  if (!isEmptyButtons(buttons)) reqData['buttons'] = JSON.stringify(buttons)
  if (!jglib.isEmpty(chipList)) reqData['chipList'] = JSON.stringify(chipList)
  formData.append('data', JSON.stringify(reqData))

  // 3. 이미지 첨부된 경우
  if (armData.cardData && armData.cardData.length > 0) {
    for (let index in armData.cardData) {
      let cardData = armData.cardData[index]
      if (productType === 'carousel') {
        formData.append(`file${(parseInt(index) + 1)}`, cardData.fileRaw)
      } else {
        formData.append('file', cardData.fileRaw)
      }
    }
  }
  return formData
}
