import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

export function retrievePassword(reqObj) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: 'joining/pwd',
      method: 'get',
      params: reqObj,
      meta: {}
    })
  }
}

/** 사용자 password 체크 */
export function checkPassword(data) {
  if (isUseAPI()) {
    return request({
      url: 'user/chkpwd',
      method: 'get',
      params: data,
      meta: {}
    })
  }
}
