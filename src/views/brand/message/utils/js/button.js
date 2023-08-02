import refData from '@/views/brand/message/utils/imageTemplateDefaultRefData'
import moment from 'moment'

let button = {
  
  // /**
  //  * 버튼에 입력 가능 키 가져오기.
  //  */ 
  getInputButtonKeys(idx, key, length){
    let curCnt = length 
    //console.log(key === '');
    if(key === '' && curCnt > 0){
      key = 'open_url'
    }

    let buttonInputOption = []

    if(curCnt >= idx){
      buttonInputOption.push('displayText')
      if(key === 'open_url'){
        buttonInputOption.push('url')
      }else if(key === 'dial_phone_number'){
        buttonInputOption.push('phoneNumber')
      }else if(key === 'copy_to_clipboard'){
        buttonInputOption.push('text')
      }else if(key === 'show_location'){
        buttonInputOption.push('latitude')
        buttonInputOption.push('longitude')
        buttonInputOption.push('label')
        buttonInputOption.push('fallbackUrl')
      }else if(key === 'search_locations'){
        buttonInputOption.push('query')
        buttonInputOption.push('fallbackUrl')
      }else if(key === 'request_location_push'){
        buttonInputOption.push('text')
      }else if(key === 'create_calendar_event'){
        buttonInputOption.push('startTime')
        buttonInputOption.push('endTime')
        buttonInputOption.push('useVariable')
        buttonInputOption.push('title')
        buttonInputOption.push('description')
      }else if(key === 'compose_text_message'){
        buttonInputOption.push('phoneNumber') 
        buttonInputOption.push('text')
      }
      return buttonInputOption
    }else{
      alert('입력 가능한 버튼이 없습니다.')
      return false
    }
  },

  insertButtonValueByKey(index,btnType,key,value,buttonsInfo){
    let btnCtn = 'open_url'
    if(btnType != ''){
      btnCtn = btnType
    }
    return this.setButtonValue(index,btnCtn,key,value,buttonsInfo)
  },

  setButtonValue(index,btnCtn,key,value,buttonsInfo){
    if(key === 'displayText'){
        buttonsInfo.btnList[index].action.displayText = value
      }

      if(btnCtn === 'open_url'){
        if(key === 'url'){
          buttonsInfo.btnList[index].action.urlAction.openUrl.url = value
        }
      }else if(btnCtn === 'dial_phone_number'){
        if(key === 'phoneNumber'){
          buttonsInfo.btnList[index].action.dialerAction.dialPhoneNumber.phoneNumber = value
        }
      }else if(btnCtn === 'copy_to_clipboard'){
        if(key === 'text'){
          buttonsInfo.btnList[index].action.clipboardAction.copyToClipboard.text = value
        }
      }else if(btnCtn === 'show_location'){
        
        if(key === 'latitude'){
          buttonsInfo.btnList[index].action.mapAction.showLocation.location.latitude = value
        }
        if(key === 'longitude'){
          buttonsInfo.btnList[index].action.mapAction.showLocation.location.longitude = value
        }
        if(key === 'label'){
          buttonsInfo.btnList[index].action.mapAction.showLocation.location.label = value
        }
        if(key === 'fallbackUrl'){
          buttonsInfo.btnList[index].action.mapAction.showLocation.fallbackUrl = value
        }
      }else if(btnCtn === 'search_locations'){
        if(key === 'query'){
          buttonsInfo.btnList[index].action.mapAction.showLocation.location.query = value
        }
        if(key === 'fallbackUrl'){
          buttonsInfo.btnList[index].action.mapAction.showLocation.fallbackUrl = value
        }
      }else if(btnCtn === 'request_location_push'){
        //this.buttonInputOption1.push('text')
      }else if(btnCtn === 'create_calendar_event'){
        if(key === 'startTime'){
          buttonsInfo.btnList[index].action.calendarAction.createCalendarEvent.startTime = value
        }
        if(key === 'endTime'){
          buttonsInfo.btnList[index].action.calendarAction.createCalendarEvent.endTime = value
        }
        if(key === 'useVariable'){
          buttonsInfo.btnList[index].action.calendarAction.createCalendarEvent.useVariable = value
        }
        if(key === 'title'){
          buttonsInfo.btnList[index].action.calendarAction.createCalendarEvent.title = value
        }
        if(key === 'description'){
          buttonsInfo.btnList[index].action.calendarAction.createCalendarEvent.description = value
        }
      }else if(btnCtn === 'compose_text_message'){
        if(key === 'phoneNumber'){
          buttonsInfo.btnList[index].action.composeAction.composeTextMessage.phoneNumber = value
        }
        if(key === 'text'){
          buttonsInfo.btnList[index].action.composeAction.composeTextMessage.text = value
        }
      }

      return buttonsInfo
  },

  /** 버튼 개수 변경 */
  changeCount(chgCnt , buttonsInfo) {
    let curCnt = buttonsInfo.btnList.length // 현재 개수
    if (chgCnt === 0) {
      buttonsInfo.btnList.splice(0, curCnt) // 미사용: 등록된 요소 모두 제거
    } else if(chgCnt === curCnt){
      alert('현재 버튼 갯수와 바꾸려는 갯수가 같습니다.')
      return false
    } else {
      let diff = chgCnt - curCnt
      if (diff > 0) {
        for (let i = curCnt > 0 ? curCnt - 1 : 0; i < diff; i++) {
          let defData = JSON.parse(JSON.stringify(refData['buttons']['default']))
          let actionDefData = JSON.parse(JSON.stringify(refData['buttons']['open_url']))
          let data = Object.assign(defData.action, actionDefData)

          defData.action = data
          defData.action.postback.data = this.getPostbackData('open_url')
          buttonsInfo.btnList.push(defData)
        }
      } else {
        buttonsInfo.btnList.splice(curCnt - 1, 1)
      }
    }
    return buttonsInfo
    //console.log(buttonsInfo);
  },

  getPostbackData(type) {
    return 'set_by_chatbot_' + type
  },

  /** 버튼 액션 변경: 액션에 맞는 데이터 형태를 새로 넣어준다 */
  changeAction(idx, type , buttonsInfo) {
    console.log('버튼 바뀜 전', buttonsInfo)
    if(buttonsInfo.btnList.length == 0){
      alert('버튼 데이터가 없습니다.')
      return false
    }
    let jsonData = refData['buttons'][type] || {}
    let defData = jsonData !== {} ? JSON.parse(JSON.stringify(jsonData)) : {}
    let postbackData = type === 'etc' ? '' : this.getPostbackData(type)
    let action = {
      displayText: buttonsInfo.btnList[idx].action.displayText,
      postback: {
        data: postbackData
      }
    }
    if (type === 'create_calendar_event') defData.calendarAction.createCalendarEvent.useVariable = false
    buttonsInfo.btnList[idx].action = Object.assign(defData, action)
    
    //console.log('버튼 바뀜?', this.buttonsInfo)
    return buttonsInfo
  },
  getButtonParam(buttonsInfo) {
    buttonsInfo.btnList.forEach(btn => {
      // if (btn.action.hasOwnProperty('calendarAction')) {
        if(Object.prototype.hasOwnProperty.call(btn.action, "calendarAction")){
        // 캘린더 버튼인 경우 start, endtime을 변경
        let target = btn.action.calendarAction.createCalendarEvent
        if (!target.useVariable) {
          target.startTime = moment.utc(target.startTime).utcOffset(9 * 60).format()
          target.endTime = moment.utc(target.endTime).utcOffset(9 * 60).format()
        }
      }
    })
    return buttonsInfo.btnList
  },
}

export default button
