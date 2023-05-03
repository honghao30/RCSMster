import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

export function updateNewPassword(reqObj) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: 'joining/nologinpwd',
      method: 'put',
      data: reqObj,
      meta: {}
    })
  }
}
