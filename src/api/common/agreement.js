import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

export function getAgreementList(data) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: 'joining/corp/tos/list?tosItemCds=S1,P1,P2,A1,M1',
      method: 'get',
      meta: {}
    })
  }
}
