import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

export function getApprovalBrand(params) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: '/brand/' + params.brandId,
      method: 'get',
      params: params,
      // 에러 메시지를 출력하는 옵션 - useErrorMessage, false로 정의하면 에러가 나와도 출력되지 않는다. default는 true
      meta: { useErrorMessage: false }
    })
  }
}

export function getBrandChatAgencyInfo(params) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: `brand/${params.brandId}/agency`,
      method: 'get',
      params: params,
      // 에러 메시지를 출력하는 옵션 - useErrorMessage, false로 정의하면 에러가 나와도 출력되지 않는다. default는 true
      meta: { useErrorMessage: false }
    })
  }
}

export function deleteApprovalBrand(reqData) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: '/brand/chatbot',
      method: 'DELETE',
      data: reqData,
      // 에러 메시지를 출력하는 옵션 - useErrorMessage, false로 정의하면 에러가 나와도 출력되지 않는다. default는 true
      meta: { useErrorMessage: false }
    })
  }
}

export function applyBrand(reqData) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: '/brand/chatbot',
      method: 'put',
      data: reqData,
      // 에러 메시지를 출력하는 옵션 - useErrorMessage, false로 정의하면 에러가 나와도 출력되지 않는다. default는 true
      meta: { useErrorMessage: false }
    })
  }
}

export function getCorpId(params) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: '/user?corpId=' + params.corpId,
      method: 'get',
      data: params,
      // 에러 메시지를 출력하는 옵션 - useErrorMessage, false로 정의하면 에러가 나와도 출력되지 않는다. default는 true
      meta: { useErrorMessage: false }
    })
  }
}

export function getCertificationNum(NumData) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: 'common/authsms?mblNum=' + NumData.mblNum,
      method: 'get',
      data: NumData,
      // 에러 메시지를 출력하는 옵션 - useErrorMessage, false로 정의하면 에러가 나와도 출력되지 않는다. default는 true
      meta: { useErrorMessage: false }
    })
  }
}

export function getCheckBrandDelete(params) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: `brand/check/${params.brandId}`,
      method: 'get',
      // params: params,
      // 에러 메시지를 출력하는 옵션 - useErrorMessage, false로 정의하면 에러가 나와도 출력되지 않는다. default는 true
      meta: { useErrorMessage: false }
    })
  }
}

export function retrieveMdnList(reqData) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: '/brand/chatbot/pop',
      method: 'get',
      params: reqData,
      // 에러 메시지를 출력하는 옵션 - useErrorMessage, false로 정의하면 에러가 나와도 출력되지 않는다. default는 true
      meta: { useErrorMessage: false }
    })
  }
}

export function setModifyMdn(reqData) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: 'brand/chatbot/pop',
      method: 'put',
      data: reqData,
      // 에러 메시지를 출력하는 옵션 - useErrorMessage, false로 정의하면 에러가 나와도 출력되지 않는다. default는 true
      meta: { useErrorMessage: false }
    })
  }
}

export function retrieveChatBotList(reqData) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: `/brand/chat/agency/pop/${reqData.brandId}`,
      method: 'get',
      params: reqData,
      // 에러 메시지를 출력하는 옵션 - useErrorMessage, false로 정의하면 에러가 나와도 출력되지 않는다. default는 true
      meta: { useErrorMessage: false }
    })
  }
}

export function setModifyChatBot(reqData) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: 'brand/agencychat/pop',
      method: 'put',
      data: reqData,
      // 에러 메시지를 출력하는 옵션 - useErrorMessage, false로 정의하면 에러가 나와도 출력되지 않는다. default는 true
      meta: { useErrorMessage: false }
    })
  }
}

export function getAllAprved(corpId) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: `corp/${corpId}/aprved`,
      method: 'get',
      // 에러 메시지를 출력하는 옵션 - useErrorMessage, false로 정의하면 에러가 나와도 출력되지 않는다. default는 true
      meta: { useErrorMessage: false }
    })
  }
}

export function getMasterBrand(params) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: '/brand/master/' + params.brandId,
      method: 'get',
      params: params,
      // 에러 메시지를 출력하는 옵션 - useErrorMessage, false로 정의하면 에러가 나와도 출력되지 않는다. default는 true
      meta: { useErrorMessage: false }
    })
  }
}

export function isCreatedBrandMaaP(params) {
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: '/brand/createdMaap/' + params.brandId,
      method: 'get',
      params: params,
      // 에러 메시지를 출력하는 옵션 - useErrorMessage, false로 정의하면 에러가 나와도 출력되지 않는다. default는 true
      meta: { useErrorMessage: false }
    })
  }
}
