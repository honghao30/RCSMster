import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

// 인증번호확인
export function authSms(params) {
  if (isUseAPI()) {
    return request({
      url: 'common/authsmsconfirm',
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }
}

// 아이디찾기
export function searchId(params) {
  if (isUseAPI()) {
    return request({
      url: 'joining/id/',
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }
}
