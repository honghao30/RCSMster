import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

export function getCallingNumberManagementList(params, brandId) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: `/brand/${brandId}/chatbot`, // {brandId}
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }
}

export function setCallingNumberManagementList(data, brandId) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: `/brand/${brandId}/chatbot`, // {brandId}
      method: 'put',
      data: data,
      meta: { useErrorMessage: false }
    })
  }
}

export function getApprovalStat(params, brandId) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: `/brand/${brandId}/chatbot/` + params.chatbotId,
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }
}

export function deleteApproval(data, brandId) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: `/brand/${brandId}/chatbot/` + data.chatbotId,
      method: 'delete',
      data: data,
      meta: { useErrorMessage: false }
    })
  }
}

export function updateCallingNumberManagement(formData, data, brandId) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: `/brand/${brandId}/chatbot/` + data.chatbotId, // {brandId}
      method: 'put',
      data: formData,
      meta: { useErrorMessage: false }
    })
  }
}

export function updateIndividualRegistration(formData, data, brandId) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: `/brand/${brandId}/chatbot`,
      method: 'post',
      data: formData,
      meta: { useErrorMessage: false }
    })
  }
}

export function updateIndividualRegistrationSave(
  formData,
  data,
  brandId,
  chatbotId
) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: `/brand/${brandId}/chatbot/${chatbotId}`,
      method: 'put',
      data: formData,
      meta: { useErrorMessage: false }
    })
  }
}

export function updateQuantityRegistration(formData, brandId) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: `/brand/${brandId}/chatbot/upload`,
      method: 'post',
      data: formData,
      meta: { useErrorMessage: false }
    })
  }
}

export function updateOverlap(params, brandId) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: `/brand/${brandId}/chatbot/duplicate`,
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }
}

export function retrieveQuantityRegistration(brandId, massRegSeq) {
  // local 개발 환경이 아닐 경우, 무조건 서버를 조회해야 함
  if (isUseAPI()) {
    // 차후 변경될 Restful 형식에 따라 수정해야 함
    return request({
      url: `/brand/${brandId}/chatbot/upload/${massRegSeq}`,
      method: 'get',
      meta: { useErrorMessage: false }
    })
  }
}

// 파일 다운로드
export function downloadFile(brandId, chatbotId) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/chatbot/${chatbotId}/download`,
      method: 'get',
      responseType: 'blob',
      meta: { forBlob: true }
    })
  }
}
