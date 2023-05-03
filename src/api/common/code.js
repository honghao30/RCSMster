import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'
import axios from 'axios'
import envs from '@/envs'

export function retrieveCommonCode(refCode, refCodeId, useYn, orderAlt) {
  let reqData = {}
  if (!jglib.isEmpty(refCodeId)) {
    reqData.refCodeId = refCodeId
  }
  if (useYn) {
    reqData.useYn = useYn
  }
  if (!isNaN(parseInt(orderAlt))) {
    reqData.orderAlt = orderAlt
  }
  if (isUseAPI()) {
    return request({
      url: `/common/code/${refCode}`,
      method: 'get',
      params: reqData,
      meta: { useErrorMessage: false }
    })
  }
}

export function retrieveCorpRegiNum(params) {
  if (isUseAPI()) {
    return request({
      url: '/joining/authcorp',
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }
}

export function duplicateCheck(reqObj) {
  if (isUseAPI()) {
    return request({
      url: '/joining/duplicate',
      method: 'get',
      params: reqObj
    })
  }
}

export function getCertificationNumber(data) {
  let param = {
    mblNum: data.mblNum,
    timeStamp: new Date().getTime(),
    anonymous: data.anonymous
  }
  if (data.__type) {
    param.__type = data.__type
    param.userNm = data.userNm
    if (param.__type === 'findid') {
      param.regiNum = data.regiNum
    }
    if (param.__type === 'resetpw') {
      param.userId = data.userId
    }
    if (param.__type === 'join') {
      param.userType = data.userType
    }
  }
  if (isUseAPI()) {
    return request({
      url: '/common/authsms',
      method: 'get',
      params: param,
      // 에러 메시지를 출력하는 옵션 - useErrorMessage, false로 정의하면 에러가 나와도 출력되지 않는다. default는 true
      meta: { useErrorMessage: false }
    })
  }
}

export function compareCertificationNumber(reqData) {
  if (isUseAPI()) {
    return request({
      url: '/common/authsmsconfirm',
      method: 'GET',
      params: reqData,
      // 에러 메시지를 출력하는 옵션 - useErrorMessage, false로 정의하면 에러가 나와도 출력되지 않는다. default는 true
      meta: { useErrorMessage: false }
    })
  }
}

export function downloadFileByFileId(fileParams) {
  if (!isUseAPI()) {
    return new Promise((resolve, reject) => {
      let res = {
        code: '99999999',
        msg: 'not available in mockup'
      }
      resolve(res)
    })
  }

  return new Promise((resolve, reject) => {
    request({
      url: `/file/${fileParams.fileId}/${fileParams.fileNo}`,
      method: 'get'
    })
      .then(res => {
        let fileName = res.result.fileName
        let downloadUrl = res.result.downloadUrl
        axios({
          url: downloadUrl,
          responseType: 'blob',
          mehtod: 'get'
        })
          .then(res => {
            let blob = new Blob([res.data], {
              type: res.headers['content-type']
            })
            if (window.navigator.msSaveOrOpenBlob) {
              window.navigator.msSaveOrOpenBlob(blob, fileName)
            } else {
              let link = document.createElement('a')
              link.href = window.URL.createObjectURL(blob)
              link.target = '_self'
              if (fileName) link.download = fileName
              link.click()
            }
            resolve()
          })
          .catch(res => {
            reject(new Error('error in filedownload'))
          })
      })
      .catch(res => {
        reject(res.desc)
      })
  })
}

export function downloadFileDirect(params) {
  return new Promise((resolve, reject) => {
    let url =
      envs.buildUrl +
      '/' +
      envs.apiVersion +
      `/common/manualDownload/${params.fileNo}`
    axios({
      url: url,
      responseType: 'blob',
      mehtod: 'get'
    })
      .then(res => {
        let blob = new Blob([res.data], {
          type: res.headers['content-type']
        })
        if (window.navigator.msSaveOrOpenBlob) {
          window.navigator.msSaveOrOpenBlob(blob, params.fileName)
        } else {
          let link = document.createElement('a')
          link.href = window.URL.createObjectURL(blob)
          link.target = '_self'
          if (params.fileName) link.download = params.fileName
          link.click()
        }
        resolve()
      })
      .catch(res => {
        reject(new Error('error in filedownload'))
      })
  })
}

export function getImageUrl(reqData) {
  if (!isUseAPI()) {
    return new Promise((resolve, reject) => {
      let res = {
        code: '99999999',
        msg: 'not available in mockup'
      }
      resolve(res)
    })
  }

  return new Promise((resolve, reject) => {
    request({
      url: `/file/${reqData.fileId}/${reqData.fileNo}`,
      method: 'get'
    })
      .then(res => {
        let imgData = {
          fileName: res.result.fileName,
          downloadUrl: res.result.downloadUrl
        }
        resolve(imgData)
      })
      .catch(res => {
        reject(new Error('error in filedownload'))
      })
  })
}

export function getImageUrlEmulator(reqData) {
  if (!isUseAPI()) {
    return new Promise((resolve, reject) => {
      let res = {
        code: '99999999',
        msg: 'not available in mockup'
      }
      resolve(res)
    })
  }

  return new Promise((resolve, reject) => {
    request({
      url: `/file/${reqData.fileId}/${reqData.fileNo}`,
      method: 'get',
      meta: { invisibleLoading: true }
    })
      .then(res => {
        let imgData = {
          fileName: res.result.fileName,
          downloadUrl: res.result.downloadUrl
        }
        resolve(imgData)
      })
      .catch(res => {
        reject(new Error('error in filedownload'))
      })
  })
}

export function retrieveAddress(params) {
  if (isUseAPI()) {
    return request({
      url: '/common/address',
      method: 'get',
      params: params
    })
  }
}

export function chatbotUploadResult(brandId, reqObj) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/chatbot/upload`,
      method: 'post',
      data: reqObj,
      // 에러 메시지를 출력하는 옵션 - useErrorMessage, false로 정의하면 에러가 나와도 출력되지 않는다. default는 true
      meta: { useErrorMessage: false }
    })
  }
}

export function checkDuplicationCI(data) {
  if (isUseAPI()) {
    return request({
      url: `/joining/corp/check/ci`,
      method: 'post',
      data: data,
      meta: { useErrorMessage: false }
    })
  }
}

export function getRelayInfo(params) {
  if (isUseAPI()) {
    return request({
      url: '/agency/relay',
      method: 'get',
      params: params
    })
  }
}

export function checkRelayInfo(params) {
  if (isUseAPI()) {
    return request({
      url: '/agency/checkRelay',
      method: 'get',
      params: params
    })
  }
}

export function getBrandDefaultImages() {
  if (isUseAPI()) {
    return request({
      url: '/brand/default',
      method: 'get'
    })
  }
}

export function checkBrandDefaultImages(fileId) {
  if (isUseAPI()) {
    return request({
      url: `/brand/default/${fileId}`,
      method: 'get'
    })
  }
}
