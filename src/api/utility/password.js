import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

export function updatePassword(data) {
  if (isUseAPI()) {
    return request({
      url: '/joining/exceed/pwd',
      method: 'put',
      data: data,
      meta: { useErrorMessage: false }
    })
  }
}

export function updatePasswordExpiredDt() {
  if (isUseAPI()) {
    return request({
      url: '/joining/pwd/term',
      method: 'put',
      data: {},
      meta: { useErrorMessage: false }
    })
  }
}
