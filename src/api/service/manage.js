import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

export function retrieveManageList(brandId) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/operation`,
      method: 'get',
      meta: { useErrorMessage: false }
    })
  }

  return new Promise((resolve, reject) => {
    let res = {
      code: '20000000',
      desc: null,
      reult: {}
    }
    resolve(res)
  })
}

export function retrieveHistoryList(brandId, params) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/operation/history`,
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }

  return new Promise((resolve, reject) => {
    let res = {
      code: '20000000',
      desc: null,
      reult: {}
    }
    resolve(res)
  })
}

export function retrieveManageTargetList(brandId, params) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/operation/manager`,
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }

  return new Promise((resolve, reject) => {
    let res = {
      code: '20000000',
      desc: null,
      reult: {}
    }
    resolve(res)
  })
}

export function createManagerAuth(brandId, data) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/operation/manager`,
      method: 'post',
      data: data,
      meta: { useErrorMessage: false }
    })
  }

  return new Promise((resolve, reject) => {
    let res = {
      code: '20000000',
      desc: null,
      reult: {}
    }
    resolve(res)
  })
}

export function deleteManageAuth(brandId, userId) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/operation/${userId}`,
      method: 'delete',
      meta: { useErrorMessage: false }
    })
  }

  return new Promise((resolve, reject) => {
    let res = {
      code: '20000000',
      desc: null,
      reult: {}
    }
    resolve(res)
  })
}

export function retrieveDelegationTargetList(brandId, params) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/operation/delegation`,
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }

  return new Promise((resolve, reject) => {
    let res = {
      code: '20000000',
      desc: null,
      reult: {}
    }
    resolve(res)
  })
}

export function createManagerDelegation(brandId, data) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/operation/delegation`,
      method: 'post',
      data: data,
      meta: { useErrorMessage: false }
    })
  }

  return new Promise((resolve, reject) => {
    let res = {
      code: '20000000',
      desc: null,
      reult: {}
    }
    resolve(res)
  })
}

export function chechHasDesertedBrand() {
  if (isUseAPI()) {
    return request({
      url: '/brand/destered',
      method: 'get',
      meta: { useErrorMessage: false }
    })
  }

  return new Promise((resolve, reject) => {
    let res = {
      code: '20000000',
      desc: null,
      reult: {}
    }
    resolve(res)
  })
}
