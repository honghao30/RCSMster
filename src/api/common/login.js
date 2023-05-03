import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

export function loginByPassword(userId, password) {
  if (isUseAPI()) {
    return request({
      url: '/login',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: {
        userId: userId,
        userPwd: password
      },
      // 에러 메시지를 출력하는 옵션 - useErrorMessage, false로 정의하면 에러가 나와도 출력되지 않는다. default는 true
      meta: { useErrorMessage: false }
    })
  }
}

export function selectAgencyMbl(data) {
  if (isUseAPI()) {
    return request({
      url: '/selectAgencyMbl',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: data,
      // 에러 메시지를 출력하는 옵션 - useErrorMessage, false로 정의하면 에러가 나와도 출력되지 않는다. default는 true
      meta: { useErrorMessage: false }
    })
  }
}

export function authsms(data) {
  if (isUseAPI()) {
    return request({
      url: '/authsms',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: data,
      // 에러 메시지를 출력하는 옵션 - useErrorMessage, false로 정의하면 에러가 나와도 출력되지 않는다. default는 true
      meta: { useErrorMessage: false }
    })
  }
}

export function authsmsconfirm(data) {
  if (isUseAPI()) {
    return request({
      url: '/authsmsconfirm',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: data,
      // 에러 메시지를 출력하는 옵션 - useErrorMessage, false로 정의하면 에러가 나와도 출력되지 않는다. default는 true
      meta: { useErrorMessage: false }
    })
  }
}

export function loginByPassword2222(userId, password) {
  if (isUseAPI()) {
    return request({
      url: '/tokens',
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: {
        userId: userId,
        userPwd: password
      },
      // 에러 메시지를 출력하는 옵션 - useErrorMessage, false로 정의하면 에러가 나와도 출력되지 않는다. default는 true
      meta: { useErrorMessage: false }
    })
  }
}

// login 이후 세션 정보를 통하여 유저 정보를 가져오기
// 이 때 90일 초과 여부도 가져온다.
export function getUserInfoByToken() {
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: '/user',
      method: 'get'
    })
  }
}

export function getCorpInfoByUserInfo(corpId) {
  if (isUseAPI()) {
    return request({
      url: `/corp/${corpId}`,
      method: 'get'
    })
  }
}

export function getAgencyInfoByUserInfo(agencyId) {
  if (isUseAPI()) {
    return request({
      url: `/agency/${agencyId}`,
      method: 'get'
    })
  }
}

export function logout() {
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: '/login/sessionout',
      method: 'get'
    })
  }
}

export function loginHist(data) {
  if (isUseAPI()) {
    return request({
      url: '/loginHist',
      method: 'get',
      params: data,
      // 에러 메시지를 출력하는 옵션 - useErrorMessage, false로 정의하면 에러가 나와도 출력되지 않는다. default는 true
      meta: { useErrorMessage: false }
    })
  }
}
