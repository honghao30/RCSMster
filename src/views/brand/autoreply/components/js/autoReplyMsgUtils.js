import actionData from '@/components/js/openrichcardDefaultRefData'

let buttonInfo = {
  action: {
    displayText: '',
    postback: { data: '' },
    urlAction: {
      openUrl: {
        url: ''
      }
    }
  },
  btnName: '',
  btnEvent: 'open_url',
  btnOtherEvent: ''
}
let buttonEventOptions = [
  { codeNm: '간편챗봇 연결', code: 'auto_reply' },
  { codeNm: '챗봇 연결', code: 'basic_reply' },
  { codeNm: '브랜드 소식 연결', code: 'feed_url' },
  { codeNm: '복사하기', code: 'copy_to_clipboard' },
  { codeNm: '다른 대화방 연결', code: 'chatroom' },
  { codeNm: '지도 보여주기(좌표)', code: 'show_location' },
  { codeNm: '지도 보여주기(쿼리)', code: 'search_locations' },
  { codeNm: '위치 공유하기', code: 'request_location_push' },
  { codeNm: '캘린더 등록', code: 'create_calendar_event' }
]
let cardData = {
  buttonUseYn: 'N',
  cardNo: 1,
  description: '',
  fileName: '',
  fileRaw: '',
  fileUrl: '',
  isActive: true,
  media: '',
  title: '',
  buttonLen: '',
  suggestions: [JSON.parse(JSON.stringify(buttonInfo))],
  isImgError: {
    isShow: false,
    txt: ''
  },
  isTitleError: {
    isShow: false,
    txt: ''
  },
  isContentsError: {
    isShow: false,
    txt: ''
  }
}
const autoReplyMsgUtils = {
  buttonEventOptions: JSON.parse(JSON.stringify(buttonEventOptions)),
  cardData: JSON.parse(JSON.stringify(cardData)),
  form: {
    brandId: '',
    name: '',
    imgSize: 'medium', // medium, full
    tplId: '',
    tplNm: '',
    copyAllowedYn: false,
    chatType: '',
    maxMediaSize: '1048576',
    cardData: [JSON.parse(JSON.stringify(cardData))],
    chatCardTitle: 'N',
    chatCardContent: 'N',
    chipSuggestions: [JSON.parse(JSON.stringify(buttonInfo))],
    chipBtnUse: 'N',
    chipBtnLen: ''
  },
  cardButtonInfo: JSON.parse(JSON.stringify(buttonInfo)),
  validateBtnDataCheck(obj, cardIndex, btnIndex) {
    // let value = ''
    let btnEvent = ''
    let target = ''
    if (obj.btnEvent === 'other') {
      btnEvent = obj.btnOtherEvent
    } else {
      btnEvent = obj.btnEvent
    }
    // 버튼 값 체크
    target = `btnName_${cardIndex}_${btnIndex}`
    if (jglib.isEmpty(obj.btnName)) {
      return { result: false, target: target, reason: 'empty' }
    }
    if (btnEvent === 'auto_reply') {
      target = `auto_reply_id_${cardIndex}_${btnIndex}`
      if (jglib.isEmpty(obj.reply.autoReplyMsgId)) {
        return { result: false, target: target, reason: 'empty' }
      }
    }
    if (btnEvent === 'feed_url') {
      target = `feed_url_${cardIndex}_${btnIndex}`
      if (jglib.isEmpty(obj.action.urlAction.openUrl.url)) {
        return { result: false, target: target, reason: 'empty' }
      }
    }
    if (btnEvent === 'copy_to_clipboard') {
      target = `copy_${cardIndex}_${btnIndex}`
      if (jglib.isEmpty(obj.action.clipboardAction.copyToClipboard.text)) {
        return { result: false, target: target, reason: 'empty' }
      }
    }
    if (btnEvent === 'chatroom') {
      target = `chatroom_number_${cardIndex}_${btnIndex}`
      if (jglib.isEmpty(obj.action.composeAction.composeTextMessage.phoneNumber)) {
        return { result: false, target: target, reason: 'empty' }
      }
      if (isNaN(obj.action.composeAction.composeTextMessage.phoneNumber)) {
        return { result: false, target: target, reason: 'phoneNumber' }
      }
      target = `chatroom_text_${cardIndex}_${btnIndex}`
      if (jglib.isEmpty(obj.action.composeAction.composeTextMessage.text)) {
        return { result: false, target: target, reason: 'empty' }
      }
    }
    if (btnEvent === 'show_location') {
      target = `latitude_${cardIndex}_${btnIndex}`
      if (jglib.isEmpty(obj.action.mapAction.showLocation.location.latitude)) {
        return { result: false, target: target, reason: 'empty' }
      }
      if (!/^([0-9]*)[.]?([0-9]*)?$/.test(obj.action.mapAction.showLocation.location.latitude)) {
        return { result: false, target: target, reason: 'float' }
      }
      target = `longitude_${cardIndex}_${btnIndex}`
      if (jglib.isEmpty(obj.action.mapAction.showLocation.location.longitude)) {
        return { result: false, target: target, reason: 'empty' }
      }
      if (!/^([0-9]*)[.]?([0-9]*)?$/.test(obj.action.mapAction.showLocation.location.longitude)) {
        return { result: false, target: target, reason: 'float' }
      }
      target = `label_${cardIndex}_${btnIndex}`
      if (jglib.isEmpty(obj.action.mapAction.showLocation.location.label)) {
        return { result: false, target: target, reason: 'empty' }
      }
      target = `fallbackUrl_${cardIndex}_${btnIndex}`
      if (jglib.isEmpty(obj.action.mapAction.showLocation.fallbackUrl)) {
        return { result: false, target: target, reason: 'empty' }
      }
      if (obj.action.mapAction.showLocation.fallbackUrl.indexOf('http://') !== 0 && obj.action.mapAction.showLocation.fallbackUrl.indexOf('https://') !== 0) {
        return { result: false, target: target, reason: 'url' }
      }
    }
    if (btnEvent === 'search_locations') {
      target = `query_${cardIndex}_${btnIndex}`
      if (jglib.isEmpty(obj.action.mapAction.showLocation.location.query)) {
        return { result: false, target: target, reason: 'empty' }
      }
      target = `fallbackUrl_${cardIndex}_${btnIndex}`
      if (jglib.isEmpty(obj.action.mapAction.showLocation.fallbackUrl)) {
        return { result: false, target: target, reason: 'empty' }
      }
      if (obj.action.mapAction.showLocation.fallbackUrl.indexOf('http://') !== 0 && obj.action.mapAction.showLocation.fallbackUrl.indexOf('https://') !== 0) {
        return { result: false, target: target, reason: 'url' }
      }
    }
    if (btnEvent === 'create_calendar_event') {
      target = `calendar_title_${cardIndex}_${btnIndex}`
      if (jglib.isEmpty(obj.action.calendarAction.createCalendarEvent.title)) {
        return { result: false, target: target, reason: 'empty' }
      }
      target = `calendar_content_${cardIndex}_${btnIndex}`
      if (jglib.isEmpty(obj.action.calendarAction.createCalendarEvent.description)) {
        return { result: false, target: target, reason: 'empty' }
      }
    }
    if (btnEvent === 'open_url') {
      target = `open_url_${cardIndex}_${btnIndex}`
      if (jglib.isEmpty(obj.action.urlAction.openUrl.url)) {
        return { result: false, target: target, reason: 'empty' }
      }
      if (obj.action.urlAction.openUrl.url.indexOf('http://') !== 0 && obj.action.urlAction.openUrl.url.indexOf('https://') !== 0) {
        return { result: false, target: target, reason: 'url' }
      }
    }
    if (btnEvent === 'dial_phone_number') {
      target = `phone_number_${cardIndex}_${btnIndex}`
      if (jglib.isEmpty(obj.action.dialerAction.dialPhoneNumber.phoneNumber)) {
        return { result: false, target: target, reason: 'empty' }
      }
      target = `phone_number_${cardIndex}_${btnIndex}`
      if (isNaN(obj.action.dialerAction.dialPhoneNumber.phoneNumber)) {
        return { result: false, target: target, reason: 'phoneNumber' }
      }
    }
    return { result: true, target: '', reason: '' }
  },
  validateInit(obj, $refs) {
    // 간편 챗봇 명
    $refs['chatbot_name'].style.border = '1px solid #dddddd'
    // 카드 데이터 체크
    let cardData = obj.cardData
    let target = ''

    if (obj.chatType === 'chatBubble') {
      target = `cardData_0_content`
      $refs[target].style.border = '1px solid #dddddd'
    } else if (obj.chatType === 'card') {
      target = `cardData_0_file`
      $refs[target].style.border = '1px solid #dddddd'
      target = `cardData_0_title`
      $refs[target].style.border = '1px solid #dddddd'
      target = `cardData_0_content`
      $refs[target].style.border = '1px solid #dddddd'
    } else if (obj.chatType === 'slider') {
      for (let key in cardData) {
        if (!cardData[key].isActive) {
          continue
        }
        target = `cardData_${key}_file`
        $refs[target][0].style.border = '1px solid #dddddd'
        if (obj.chatCardTitle === 'Y') {
          target = `cardData_${key}_title`
          $refs[target][0].style.border = '1px solid #dddddd'
        }
        if (obj.chatCardContent === 'Y') {
          target = `cardData_${key}_content`
          $refs[target][0].style.border = '1px solid #dddddd'
        }
      }
    }
  },
  validateBtnInit(obj, cardIndex, btnIndex, $refs, btnEvent) {
    // 버튼 명
    $refs[`btnName_${cardIndex}_${btnIndex}`].style.border = '1px solid #dddddd'
    // 간편챗봇
    if (btnEvent === 'auto_reply') {
      $refs[`auto_reply_id_${cardIndex}_${btnIndex}`].style.border = '1px solid #dddddd'
      $refs[`auto_reply_id_${cardIndex}_${btnIndex}_error`].style.display = 'none'
    }
    // 다른 대화방 연결
    if (btnEvent === 'chatroom') {
      $refs[`chatroom_number_${cardIndex}_${btnIndex}`].style.border = '1px solid #dddddd'
      $refs[`chatroom_number_${cardIndex}_${btnIndex}_error`].style.display = 'none'
      $refs[`chatroom_text_${cardIndex}_${btnIndex}`].style.border = '1px solid #dddddd'
      $refs[`chatroom_text_${cardIndex}_${btnIndex}_error`].style.display = 'none'
    }
    // 외부 브라우져
    if (btnEvent === 'open_url') {
      $refs[`open_url_${cardIndex}_${btnIndex}`].style.border = '1px solid #dddddd'
      $refs[`open_url_${cardIndex}_${btnIndex}_error`].style.display = 'none'
    }
    // 전화 연결
    if (btnEvent === 'dial_phone_number') {
      $refs[`phone_number_${cardIndex}_${btnIndex}`].style.border = '1px solid #dddddd'
      $refs[`phone_number_${cardIndex}_${btnIndex}_error`].style.display = 'none'
    }
    // 지도 좌표
    if (btnEvent === 'show_location') {
      $refs[`latitude_${cardIndex}_${btnIndex}`].style.border = '1px solid #dddddd'
      $refs[`latitude_${cardIndex}_${btnIndex}_error`].style.display = 'none'
      $refs[`longitude_${cardIndex}_${btnIndex}`].style.border = '1px solid #dddddd'
      $refs[`longitude_${cardIndex}_${btnIndex}_error`].style.display = 'none'
      $refs[`label_${cardIndex}_${btnIndex}`].style.border = '1px solid #dddddd'
      $refs[`label_${cardIndex}_${btnIndex}_error`].style.display = 'none'
      $refs[`fallbackUrl_${cardIndex}_${btnIndex}`].style.border = '1px solid #dddddd'
      $refs[`fallbackUrl_${cardIndex}_${btnIndex}_error`].style.display = 'none'
    }
    // 지도 쿼리
    if (btnEvent === 'search_locations') {
      $refs[`query_${cardIndex}_${btnIndex}`].style.border = '1px solid #dddddd'
      $refs[`query_${cardIndex}_${btnIndex}_error`].style.display = 'none'
      $refs[`fallbackUrl_${cardIndex}_${btnIndex}`].style.border = '1px solid #dddddd'
      $refs[`fallbackUrl_${cardIndex}_${btnIndex}_error`].style.display = 'none'
    }
    // 브랜드 소식
    if (btnEvent === 'feed_url') {
      $refs[`feed_url_${cardIndex}_${btnIndex}`].style.border = '1px solid #dddddd'
      $refs[`feed_url_${cardIndex}_${btnIndex}_error`].style.display = 'none'
    }
    // 캘린더
    if (btnEvent === 'create_calendar_event') {
      // $refs[`calendar_dateRange_${cardIndex}_${btnIndex}`].style.border = '1px solid #dddddd'
      // $refs[`calendar_dateRange_${cardIndex}_${btnIndex}_error`].style.display = 'none'
      $refs[`calendar_title_${cardIndex}_${btnIndex}`].style.border = '1px solid #dddddd'
      $refs[`calendar_title_${cardIndex}_${btnIndex}_error`].style.display = 'none'
      $refs[`calendar_content_${cardIndex}_${btnIndex}`].style.border = '1px solid #dddddd'
      $refs[`calendar_content_${cardIndex}_${btnIndex}_error`].style.display = 'none'
    }
    if (btnEvent === 'copy_to_clipboard') {
      $refs[`copy_${cardIndex}_${btnIndex}`].style.border = '1px solid #dddddd'
      $refs[`copy_${cardIndex}_${btnIndex}_erroe`].style.display = 'none'
    }
  },
  isJsonString(str) {
    try {
      let val = '{' + str + '}'
      let json = JSON.parse(val)
      return (typeof json === 'object')
    } catch (e) {
      console.error(e)
      return false
    }
  }
}

export default autoReplyMsgUtils
