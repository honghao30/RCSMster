import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

export function getCallingTwoWayManagementList(params, brandId) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: `/brand/${brandId}/twoway`, // {brandId}
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }
}

export function getTwoWayApprovalStat(params, brandId) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: `/brand/${brandId}/twoway/` + params.chatbotId,
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }
}

export function updateCallingTwoWayManagement(data, brandId) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: `/brand/${brandId}/twoway/` + data.chatbotId, // {brandId}
      method: 'put',
      data: data,
      meta: { useErrorMessage: false }
    })
  }
}

export function updateTwoWayChatBot(data, brandId) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: `/brand/${brandId}/twoway`,
      method: 'post',
      data: data,
      meta: { useErrorMessage: false }
    })
  }
}

export function updateOverlap(params, brandId) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: `/brand/${brandId}/twoway/duplicate`,
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }
}

export function updateTwoWayPersistentMenu(data, brandId) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: `/brand/${brandId}/` + data.chatbotId + `/psmenu/`, // {brandId}
      method: 'post',
      data: data,
      meta: { useErrorMessage: false }
    })
  }
}

export function getPersistentMenu(data, brandId) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: `/brand/${brandId}/` + data.chatbotId + `/psmenu/`, // {brandId}
      method: 'get',
      params: data,
      meta: { useErrorMessage: false }
    })
  }
}

export function deleteTwoWay(data, brandId) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: `/brand/${brandId}/twoway/` + data.chatbotId, // {brandId}
      method: 'delete',
      data: data,
      meta: { useErrorMessage: false }
    })
  }
}

/** #1519.발신번호 진행시 해당 api 필요없어 제거됨(as-is 소스 제거시 이부분도 함께 제거 예정) */
export function setCallingTwowayManagementList(data, brandId) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: `/brand/${brandId}/chatbottwoway`, // {brandId}
      method: 'put',
      data: data,
      meta: { useErrorMessage: false }
    })
  }
}

export function retrieveMdnList(reqData, brandId) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: `/brand/${brandId}/chatbot/mdnpop`,
      method: 'get',
      params: reqData,
      // 에러 메시지를 출력하는 옵션 - useErrorMessage, false로 정의하면 에러가 나와도 출력되지 않는다. default는 true
      meta: { useErrorMessage: false }
    })
  }
}

export function selectTwowayId(brandId) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/twoway/id`,
      method: 'get',
      meta: { useErrorMessage: false }
    })
  }
}
