import axios from 'axios'
import { MessageBox } from 'element-ui'
import router from '@/router'
import store from '../store'
import envs from '@/envs'
import { getToken } from '@/utils/token'
import { refreshToken } from '@/utils/refresh'

let baseUrl = envs.buildUrl + '/' + envs.apiVersion

// axios를 셋팅
if (process.env.NODE_ENV === 'development') {
  // 개발 환경일 경우 API위치를 셋팅한 곳으로 정의한다.
  baseUrl = envs.devUrl + '/' + envs.apiVersion
}

// 기본 meta 값
function _getDefaultMeta() {
  return {
    useTokenUpdate: false, // 받아온 response에서 token 값을 가져와 재 셋팅을 할 경우 true로 셋팅한다.
    useAuth: true, // 인증 모듈을 사용한다. false가 되었을 경우 401 상태에서도 Login 화면으로 가지 않는다. (i18n과 같은 특별한 경우에서만 사용)
    apiVersion: envs.apiVersion, // API 버전을 호출 API 별로 정의 한다. 기본 값은 envs에 정의한 값으로 셋팅된다.
    useErrorMessage: true, // response 시, 에러가 날 경우 에러 메시지를 출력하는 여부를 셋팅한다. 기본은 true
    useResponseAll: false // request 실행 이후, API로 돌아오는 Obj를 Axios response 전문으로 변경되어 전달한다. 기본은 false
  }
}

const service = axios.create({
  baseURL: baseUrl,
  timeout: 30000, // timeout은 30초로 설정
  headers: { 'Cache-Control': 'no-cache' }
})

// axios의 reqeust 인터셉터 진행 부
service.interceptors.request.use(
  config => {
    // method get 인 경우 IE11에서 캐싱 문제로 인하여 추가
    if (config.method.toLowerCase() === 'get') {
      if (config.params === undefined) {
        config.params = {}
      }
      config.params['t'] = new Date().getTime()
    }

    // meta 값 기본 정의
    if (!config.meta) config.meta = {}
    Object.assign(config.meta, _getDefaultMeta())

    // 헤더 구성
    if (getToken()) {
      config.headers['Authorization'] = getToken()
      if (!jglib.isEmpty(store.state.user.userId)) {
        if (config.data === undefined) {
          config.data = {}
        }
        config.data['userId'] = store.state.user.userId
      }
      // 마지막 요청일시
      store.dispatch('SetLastRequestDate')
    }

    if (!config.meta.invisibleLoading) {
      store.dispatch('SetLoading', true)
    }
    return config
  },
  error => {
    // 에러가 날경우 진행 부분
    // console.log(error) // for debug
    Promise.reject(error)
  }
)

// axios의 response 인터셉터
service.interceptors.response.use(
  response => {
    let res = {}
    let meta = response.config.meta
    // console.log('[UI Framework api res]', response)

    res = response.data
    store.dispatch('SetSessionTimeout', false)

    if (meta.useResponseAll || meta.forBlob) {
      // Axios 전문을 원할 경우 아래의 meta 값을 셋팅해서 사용한다.
      store.dispatch('SetLoading', false)
      return response
    }
    store.dispatch('SetLoading', false)
    return res
  },
  error => {
    if (error.code === 'ECONNABORTED') {
      let rej = { code: '', desc: '시스템 처리 중 입니다. 잠시 후 확인 해 주세요.' }
      store.dispatch('SetLoading', false)
      return Promise.reject(rej)
    } else if (error.response.status === 413) {
      MessageBox.alert('비정상적 서버 접근입니다. 이전 페이지로 돌아갑니다.', '안내', { confirmButtonText: '확인' })
        .then(() => {
          router.go()
        })
      return Promise.reject(new Error(null))
    } else if (error.response.status === 502) {
      let rej = { code: '', desc: '502 Bad Gateway. 관리자에게 문의하세요.' }
      store.dispatch('SetLoading', false)
      return Promise.reject(rej)
    } else if (error.response.status === 500) {
      let rej = {
        code: error.response.data.code || '',
        desc: error.response.data.code === '69999' || error.response.data.code === '50000011' ? '서버 오류가 발생했습니다. 관리자에게 문의하세요.' : error.response.data.desc //  error.response.data
      }
      store.dispatch('SetLoading', false)
      return Promise.reject(rej)
    } else if (error.message === 'Network Error') {
      let rej = { code: '', desc: '네트워크 오류가 발생했습니다. 다시 시도해주세요.' }
      store.dispatch('SetLoading', false)
      return Promise.reject(rej)
    }

    // console.log('err', error, error.message, error.response) // for debug
    // response 부분 객체 내 meta 사용을 위한 기본 값 셋팅
    let meta = error.response.config.meta
    let msg = error.message
    // error.response가 없을 경우도 존재 - Network 문제
    if (error.response && meta.useAuth && error.response.status === 401) {
      if (error.response.data && error.response.data.code && (error.response.data.code === '61003' || error.response.data.code === '61004')) {
        // nothing to do
        // ASIS -> TOBE Exception type 값의 status 리턴이 400 -> 401로 변경 되어 code 값 까지 체크 하도록 변경 함.
      } else {
        msg = '세션이 만료되었거나, 로그인이 실패되었습니다.'
        MessageBox.alert(msg, '안내', { confirmButtonText: '확인' }).then(confirm => {
          store.dispatch('ClearSession')
          store.dispatch('SetLoading', false)
          router.push('/login')
        })
      }
    }

    if (error.response.data.code === '61003' || error.response.data.code === '61004' || error.response.data.code === '40000002' || error.response.data.code === '40000001') {
      const originalRequest = error.response.config
      const retryRequest = new Promise((resolve, reject) => {
        refreshToken()
          .then(newToken => {
            originalRequest.headers['Authorization'] = newToken
            originalRequest.url = originalRequest.url.substr(originalRequest.url.indexOf(originalRequest.baseURL) + originalRequest.baseURL.length)
            axios(originalRequest)
              .then(response => {
                store.dispatch('SetLoading', false)
                resolve(response.data)
              })
              .catch(error => {
                if (!store.state.ui.sessionTimeout && (error.response.data.code === '61004' || error.response.data.code === '40000002')) {
                  store.dispatch('SetSessionTimeout', true)
                  MessageBox.alert('세션이 만료되었거나, 로그인이 실패되었습니다.', '안내', { confirmButtonText: '확인' }).then(() => {
                    store.dispatch('ClearSession')
                    router.push('/login')
                  })
                }
                store.dispatch('SetLoading', false)
                reject(error.response.data || error)
              })
          })
          .catch(errorcode => {
            if (errorcode && (errorcode === '61004' || errorcode === '40000002')) {
              if (getToken()) {
                store.dispatch('ClearSession')
                MessageBox.alert('세션이 만료되었습니다. 로그인을 다시 진행하세요.', '안내', { confirmButtonText: '확인' }).then(() => {
                  router.push('/login')
                })
              }
            } else {
              store.dispatch('ClearSession')
              MessageBox.alert('토큰 재발급 시 오류가 발생했습니다. 다시 로그인해 주세요.', '안내', { confirmButtonText: '확인' }).then(() => {
                router.push('/login')
              })
            }
            // console.log('[failed refresh token]', error)
          })
          .finally(() => {
            store.dispatch('SetLoading', false)
          })
      })
      return retryRequest
    }
    store.dispatch('SetLoading', false)
    return Promise.reject(error.response.data)
  }
)

export default service
