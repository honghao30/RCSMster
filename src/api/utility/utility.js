import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

export function retrieveMyInfo(data) {
  if (isUseAPI()) {
    return request({
      url: '/joining/id/info',
      method: 'get',
      params: data,
      meta: { useErrorMessage: false }
    })
  }
}

export function updateMyInfo(data) {
  if (isUseAPI()) {
    return request({
      url: '/user/modification',
      method: 'put',
      data: data,
      meta: { useErrorMessage: false }
    })
  }
}

export function retrieveCorpInfo(params) {
  // TODO: URL 수정
  if (isUseAPI()) {
    return request({
      url: `/corp/${params.corpId}`,
      method: 'get',
      meta: { useErrorMessage: false }
    })
  }
}

export function updateCorpInfo(corpId, formData) {
  // TODO: URL 수정

  if (isUseAPI()) {
    return request({
      url: `/corp/${corpId}`,
      method: 'put',
      data: formData,
      meta: { useErrorMessage: false }
    })
  }
}

export function updateAgencyInfo(corpId, data) {
  if (isUseAPI()) {
    return request({
      url: `/agency/${corpId}`,
      method: 'put',
      data: data,
      meta: { useErrorMessage: false }
    })
  }
}

export function retrieveAgencyInfo(agencyId) {
  if (isUseAPI()) {
    return request({
      url: `/agency/${agencyId}`,
      method: 'get',
      meta: { useErrorMessage: false }
    })
  }
}

export function deleteUser(data) {
  if (isUseAPI()) {
    return request({
      url: '/user/delete',
      method: 'delete',
      data: data,
      meta: { useErrorMessage: false }
    })
  }
}

export function updateApiKey(data) {
  if (isUseAPI()) {
    return request({
      url: '/user/issueApikey',
      method: 'put',
      data: data,
      meta: { useErrorMessage: false }
    })
  }
}

export function changeCancel(data) {
  if (isUseAPI()) {
    return request({
      url: '/corp/rollBack',
      method: 'put',
      data: data,
      meta: { useErrorMessage: false }
    })
  }
}

export function getAgencyKey(data) {
  if (isUseAPI()) {
    return request({
      url: `/agency/${data.agencyId}/agencyKey`,
      method: 'get',
      meta: { useErrorMessage: false }
    })
  }
}

export function createAgencyKey(data) {
  if (isUseAPI()) {
    return request({
      url: `/agency/${data.agencyId}/agencyKey`,
      method: 'post',
      meta: { useErrorMessage: false }
    })
  }
}

export function deleteAgencyKey(data) {
  if (isUseAPI()) {
    return request({
      url: `/agency/${data.agencyId}/agencyKey/${data.agencyKey}`,
      method: 'delete',
      meta: { useErrorMessage: false }
    })
  }
}
/** 공식 대행사 목록 */
export function getAgencyList(params) {
  if (isUseAPI()) {
    return request({
      url: '/common/agency/official',
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }
}
