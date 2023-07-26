/* eslint-disable prefer-promise-reject-errors */
import axios from 'axios'
import envs from '@/envs'
import store from '@/store'
import { getRefreshToken } from '@/utils/token'

// 인증서버 url이 다를 경우 여기를 변경한다.
let baseUrl = envs.buildUrl + '/' + envs.apiVersion
if (process.env.NODE_ENV === 'development') {
  baseUrl = envs.devUrl + '/' + envs.apiVersion
}

// Access Token 보내면 새로운 Token을 발급받는다.
// 토큰이 만료된 경우 refresh 토큰으로 새로운 Token을 발급받는다.
export function refreshToken() {
  return new Promise(function(resolve, reject) {
    let refreshToken = getRefreshToken()
    if (refreshToken === undefined || refreshToken === '') {
      reject('40000002')
    }

    let url = baseUrl + '/tokens'
    axios
      .get(url, { headers: { Authorization: refreshToken } })
      .then(response => {
        // let token = ''
        if (response.data.code === '20000000') {
          store.dispatch('SetAccessToken', response.data.result.accessToken)
          store.dispatch('SetRefreshToken', response.data.result.refreshToken)
          resolve(response.data.result.accessToken)
        } else if (response.data.code === '61004' || response.data.code === '40000002') {
          reject(response.data.code)
        }
        reject()
      })
      .catch(error => {
        const response = error.response
        if (response.data.code === '61004' || response.data.code === '40000002') {
          // console.log("refresh 토큰 만료")
          reject(response.data.code)
        }
        reject()
      })
  })
}
