import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

export function getFaqList(params) {
  if (isUseAPI()) {
    return request({
      url: 'cs/faq',
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }
}

export function getCateFaqList(params) {
  if (isUseAPI()) {
    return request({
      url: 'cs/faq',
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }
}
