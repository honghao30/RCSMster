import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

export function getStatMessageFilter(params) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: `/brand/${params.brandId}/postback/customerResponse/searchcondition`,
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }
}

export function getStatMessageList(params) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: `/brand/${params.brandId}/postback/customerResponse`,
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }
}

export function getStatMessageExcel(params) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: `/brand/${params.brandId}/postback/customerResponse/excel`,
      method: 'get',
      params: params,
      meta: { forBlob: true },
      responseType: 'blob'
    })
  }
}
