import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

export function getNoticeList(params) {
  if (isUseAPI()) {
    return request({
      url: 'cs/notice',
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }
}

export function getDetailList(params) {
  if (isUseAPI()) {
    return request({
      url: `cs/notice/${params}`,
      method: 'get',
      meta: { useErrorMessage: false }
    })
  }
}

export function getPopupNotice() {
  if (isUseAPI()) {
    return request({
      url: `cs/notice/popup`,
      method: 'get',
      meta: { useErrorMessage: false }
    })
  }
}
