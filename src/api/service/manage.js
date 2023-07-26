import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

export function retrieveManageList(corpId, params) {
  if (isUseAPI()) {
    return request({
      url: `/corp/${corpId}/operation`,
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }

  return new Promise((resolve, reject) => {
    let res = {
      code: '20000000',
      desc: null,
      reult: {}
    }
    resolve(res)
  })
}

export function retrieveHistoryList(corpId, params) {
  if (isUseAPI()) {
    return request({
      url: `/corp/${corpId}/operation/history`,
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }

  return new Promise((resolve, reject) => {
    let res = {
      code: '20000000',
      desc: null,
      reult: {}
    }
    resolve(res)
  })
}

export function retrieveManageTargetList(corpId, params) {
  if (isUseAPI()) {
    return request({
      url: `/corp/${corpId}/operation/manager`,
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }

  return new Promise((resolve, reject) => {
    let res = {
      code: '20000000',
      desc: null,
      reult: {}
    }
    resolve(res)
  })
}

export function retrieveBrandManageTargetList(brandId, params) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/operation/manager`,
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }

  return new Promise((resolve, reject) => {
    let res = {
      code: '20000000',
      desc: null,
      reult: {}
    }
    resolve(res)
  })
}


export function retrieveMyCorpBrandList(corpId) {
  if (isUseAPI()) {
    return request({
      url: `/corp/${corpId}/brand/list`,
      method: 'get',
      meta: { useErrorMessage: false }
    })
  }

  return new Promise((resolve, reject) => {
    let res = {
      code: '20000000',
      desc: null,
      reult: {}
    }
    resolve(res)
  })
}

export function createManagerAuth(brandId, data) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/operation/manager`,
      method: 'post',
      data: data,
      meta: { useErrorMessage: false }
    })
  }

  return new Promise((resolve, reject) => {
    let res = {
      code: '20000000',
      desc: null,
      reult: {}
    }
    resolve(res)
  })
}

export function deleteManageAuth(brandId, userId) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/operation/${userId}`,
      method: 'delete',
      meta: { useErrorMessage: false }
    })
  }

  return new Promise((resolve, reject) => {
    let res = {
      code: '20000000',
      desc: null,
      reult: {}
    }
    resolve(res)
  })
}

export function retrieveDelegationTargetList(brandId, params) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/operation/delegation`,
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }

  return new Promise((resolve, reject) => {
    let res = {
      code: '20000000',
      desc: null,
      reult: {}
    }
    resolve(res)
  })
}

export function createManagerDelegation(brandId, data) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/operation/delegation`,
      method: 'post',
      data: data,
      meta: { useErrorMessage: false }
    })
  }

  return new Promise((resolve, reject) => {
    let res = {
      code: '20000000',
      desc: null,
      reult: {}
    }
    resolve(res)
  })
}

export function chechHasDesertedBrand() {
  if (isUseAPI()) {
    return request({
      url: '/brand/destered',
      method: 'get',
      meta: { useErrorMessage: false }
    })
  }

  return new Promise((resolve, reject) => {
    let res = {
      code: '20000000',
      desc: null,
      reult: {}
    }
    resolve(res)
  })
}

export function retrieveChatbotByAgencyList(corpId, params) {
  if (isUseAPI()) {
    return request({
      url: `/corp/${corpId}/agency/chatbot`,
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }

  return new Promise((resolve, reject) => {
    let res = {
      code: '20000000',
      desc: null,
      reult: {}
    }
    resolve(res)
  })
}

/* 신규 회원 초대 메일 발송 */
export function sendInviteEmail(corpId, data) {
  if (isUseAPI()) {
    return request({
      url: `/corp/${corpId}/invite/sendmail`,
      method: 'post',
      data: data,
      meta: { useErrorMessage: false }
    })
  }

  return new Promise((resolve, reject) => {
    let res = {
      code: '20000000',
      desc: null,
      reult: {}
    }
    resolve(res)
  })
}

export function retrieveBrandManageList(brandId, params) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/operation`,
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }

  return new Promise((resolve, reject) => {
    let res = {
      code: '20000000',
      desc: null,
      reult: {}
    }
    resolve(res)
  })
}

export function brandOperationAuthorityApproval(brandId, params) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: `/brand/${brandId}/operation/authority/approval`,
      method: 'get',
      params: params,
      // 에러 메시지를 출력하는 옵션 - useErrorMessage, false로 정의하면 에러가 나와도 출력되지 않는다. default는 true
      meta: { useErrorMessage: false }
    })
  }
}

export function operationAuthorityApproval(corpId, params) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: `/corp/${corpId}/operation/authority/approval`,
      method: 'get',
      params: params,
      // 에러 메시지를 출력하는 옵션 - useErrorMessage, false로 정의하면 에러가 나와도 출력되지 않는다. default는 true
      meta: { useErrorMessage: false }
    })
  }
}
