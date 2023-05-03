
export function getDisplayAprvNm(data) {
  if (data.status === 'APRV_NEW' && data.aprvRet === 'INSPECTED') {
    return data.aprvRetNmAlt2
  } else if (data.status === 'APRV_MOD' && data.aprvRet === 'INSPECTED') {
    return data.aprvRetNmAlt2
  } else if (data.status === 'DEL_WAIT') {
    return data.aprvRetNmAlt2
  }
  return data.aprvRetNm
}

export function getDisplayAprvNm2(data) {
  if (data.status === 'APRV_NEW' || data.status === 'APRV_MOD') {
    if (data.aprvRet === 'SAVED') {
      return '저장'
    } else if (data.aprvRet === 'WAITING' || data.aprvRet === 'INSPECTING') {
      return '승인대기'
    } else if (data.aprvRet === 'INSPECTED') {
      return '처리중'
    }
  } else if (data.status === 'DELETED' && data.aprvRet === 'REJECTED') {
    return '반려'
  } else if (data.status === 'DEL_WAIT') {
    return '처리중(삭제)'
  }
  return data.aprvRetNm
}

export function getActionTypeDesc(actionType) {
  if (actionType === 'clipboardAction') {
    return '복사하기'
  } else if (actionType === 'urlAction') {
    return 'URL연결<br>(외부 브라우저)'
  } else if (actionType === 'localBrowserAction') {
    return 'URL연결<br>(내부 브라우저)'
  } else if (actionType === 'dialerAction') {
    return '전화걸기'
  } else if (actionType === 'mapAction') {
    return '지도보여주기'
  } else if (actionType === 'calendarAction') {
    return '캘린더 등록'
  } else if (actionType === 'composeAction') {
    return '메시지 작성'
  }
  return '기본응답'
}
