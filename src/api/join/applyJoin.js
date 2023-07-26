import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

export function retriveApplyJoinDefault(reqObj) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: '/joining',
      method: 'get',
      params: reqObj,
      // 에러 메시지를 출력하는 옵션 - useErrorMessage, false로 정의하면 에러가 나와도 출력되지 않는다. default는 true
      meta: { useErrorMessage: false }
    })
  }
}

export function setReApplyJoinAgency(data) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: '/joining/agency',
      method: 'put',
      data: data,
      // 에러 메시지를 출력하는 옵션 - useErrorMessage, false로 정의하면 에러가 나와도 출력되지 않는다. default는 true
      meta: { useErrorMessage: false }
    })
  }
}

export function setReApplyJoinEnterprise(data) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: '/joining',
      method: 'put',
      data: data,
      // 에러 메시지를 출력하는 옵션 - useErrorMessage, false로 정의하면 에러가 나와도 출력되지 않는다. default는 true
      meta: { useErrorMessage: false }
    })
  }
}

export function applyCancel(param) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: '/joining/termination', // FIXME '/termination/{memberId}'
      method: 'delete',
      data: param,
      // 에러 메시지를 출력하는 옵션 - useErrorMessage, false로 정의하면 에러가 나와도 출력되지 않는다. default는 true
      meta: { useErrorMessage: false }
    })
  }
}

export function createJoinCorp(data) {
  if (isUseAPI()) {
    return request({
      url: '/joining/corp/member',
      method: 'post',
      data: data,
      meta: { useErrorMessage: false }
    })
  }
}

export function createJoinSeason(data) {
  if (isUseAPI()) {
    return request({
      url: '/joining/corp/season',
      method: 'post',
      data: data,
      meta: { useErrorMessage: false }
    })
  }
}

export function createJoinAgency(data) {
  if (isUseAPI()) {
    return request({
      url: '/joining/agency',
      method: 'post',
      data: data,
      meta: { useErrorMessage: false }
    })
  }
}

export function tokenCerti(data) {
  if (isUseAPI()) {
    return request({
      url: '/joining/invite/tokenCerti',
      method: 'post',
      data: data,
      meta: { useErrorMessage: false }
    })
  }
}
