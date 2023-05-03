import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

export function retireveTemplateList(brandId, params) {
  if (isUseAPI) {
    return request({
      url: `/brand/${brandId}/template`,
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }

  return new Promise((resolve, reject) => {
    let res = {
      code: '20000000',
      desc: null,
      result: []
    }
    resolve(res)
  })
}

export function retrieveTemplateId(brandId, parmas) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/template/id`,
      method: 'get',
      params: parmas,
      meta: { useErrorMessage: false }
    })
  }

  return new Promise((resolve, reject) => {
    let res = {
      code: '20000000',
      desc: null,
      result: []
    }
    resolve(res)
  })
}

export function retrieveMessageBaseForm(brandId, params) {
  if (isUseAPI()) {
    // TODO: URL 필요
    return request({
      url: `/brand/${brandId}/template/formatstr`,
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }
}

export function saveMessageBase(brandId, data) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/template`,
      method: 'post',
      data: data,
      meta: { useErrorMessage: false }
    })
  }

  return new Promise((resolve, reject) => {
    let res = {
      code: '20000000',
      desc: null,
      result: {}
    }
    resolve(res)
  })
}

// 템플릿 등록 V2
export function saveMessageBaseV2(brandId, data) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/v2/template`,
      method: 'post',
      data: data,
      meta: { useErrorMessage: false }
    })
  }

  return new Promise((resolve, reject) => {
    let res = {
      code: '20000000',
      desc: null,
      result: {}
    }
    resolve(res)
  })
}
// 템플릿 수정 V2
export function updateTemplateDetailV2(brandId, data) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/v2/template`,
      method: 'put',
      data: data,
      meta: { useErrorMessage: false }
    })
  }

  return new Promise((resolve, reject) => {
    let res = {
      code: '20000000',
      desc: null,
      result: {}
    }
    resolve(res)
  })
}

export function retrieveTemplateDetail(brandId, tplId) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/template/${tplId}`,
      method: 'get',
      meta: { useErrorMessage: false }
    })
  }

  return new Promise((resolve, reject) => {
    let res = {
      code: '20000000',
      desc: null,
      result: {}
    }
    resolve(res)
  })
}

export function updateTemplateDetail(brandId, data) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/template`,
      method: 'put',
      data: data,
      meta: { useErrorMessage: false }
    })
  }

  return new Promise((resolve, reject) => {
    let res = {
      code: '20000000',
      desc: null,
      result: {}
    }
    resolve(res)
  })
}

export function deleteTemplate(brandId, data) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/template`,
      method: 'delete',
      data: data,
      meta: { useErrorMessage: false }
    })
  }

  return new Promise((resolve, reject) => {
    let res = {
      code: '20000000',
      desc: null,
      result: {}
    }
    resolve(res)
  })
}

export function saveTemplateBulk(brandId, data) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/template/upload`,
      method: 'post',
      data: data,
      meta: { useErrorMessage: false }
    })
  }

  return new Promise((resolve, reject) => {
    let res = {
      code: '20000000',
      desc: null,
      result: {}
    }
    resolve(res)
  })
}

export function retrieveTplBizSrvCode(params, brandId) {
  return request({
    url: `/brand/${brandId}/template/code`,
    method: 'get',
    params: params
  })
}

export function cancleApplyTemplate(brandId, tplId) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/template/${tplId}/cancel`,
      method: 'put',
      meta: { useErrorMessage: false }
    })
  }

  return new Promise((resolve, reject) => {
    let res = {
      code: '20000000',
      desc: null,
      result: {}
    }
    resolve(res)
  })
}

export function checkThemeFreeTpl(brandId) {
  return request({
    url: `/brand/${brandId}/template/free`,
    method: 'get'
  })
}

export function createThemeFreeTpl(brandId, data) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/template/free`,
      method: 'post',
      data: data,
      meta: { useErrorMessage: false }
    })
  }
  return new Promise((resolve, reject) => {
    let res = {
      code: '20000000',
      desc: null,
      result: {}
    }
    resolve(res)
  })
}
