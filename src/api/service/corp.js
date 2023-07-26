import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'
import { retrieveCommonTemplate } from '@/api/service/service'

export function getCorpInfo(params) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: '/corp/' + params.corpId,
      method: 'get',
      params: params,
      // 에러 메시지를 출력하는 옵션 - useErrorMessage, false로 정의하면 에러가 나와도 출력되지 않는다. default는 true
      meta: { useErrorMessage: false }
    })
  }
}

export function getMybrandList(params) {
  // 사용자가 운영중인 브랜드 목록 조회
  if (isUseAPI()) {
    return request({
      url: '/crop/dashboard/myBrands',
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }
}

export function getCorpBrandList(params) {
  // 기업의 브랜드 목록 조회
  if (isUseAPI()) {
    return request({
      url: '/crop/dashboard/corpBrands',
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }
}

export function getAuthReqbrandList(params) {
  // 기업의 브랜드 목록 조회
  if (isUseAPI()) {
    return request({
      url: '/crop/dashboard/authReq',
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }
}

export function operationAuthorityApproval(params) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: '/brand/dashboard/authorityApproval',
      method: 'put',
      params: params,
      // 에러 메시지를 출력하는 옵션 - useErrorMessage, false로 정의하면 에러가 나와도 출력되지 않는다. default는 true
      meta: { useErrorMessage: false }
    })
  }
}

export function setFavorites(params) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: '/crop/dashboard/brandFavorites',
      method: 'post',
      params: params,
      meta: { useErrorMessage: false }
    })
  }
}

export function brandAuthority(params) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: '/crop/dashboard/brandAuthority',
      method: 'post',
      params: params,
      meta: { useErrorMessage: false }
    })
  }
}

export function retrieveCorpHistList(corpId, params) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: `/corp/${corpId}/history`,
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }
}

export function retrieveCorpHistBrandOptions(corpId, params) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: `/corp/${corpId}/history/brandOptions`,
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }
}

