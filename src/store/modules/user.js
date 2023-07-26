import {
  loginByPassword,
  authsms,
  selectAgencyMbl,
  authsmsconfirm,
  getUserInfoByToken,
  getCorpInfoByUserInfo,
  getAgencyInfoByUserInfo
} from '@/api/common/login'
import {
  setToken,
  removeToken,
  setRefreshToken,
  removeRefreshToken,
  getToken,
  getRefreshToken
} from '@/utils/token'

export default {
  state: {
    userId: '',
    userName: '',
    accessToken: '',
    refreshToken: '',
    userType: '',
    corpId: '',
    corpAdmYn: '',
    subAgencyList: [],
    corpInfo: {},
    lastRequestDate: '',
    userCd: '',
    subAgencyYn: 'N',
    chkDesertedBrand: false,
    forAuth: {
      userId: '',
      userNm: '',
      mblNum: '',
      userType: ''
    }
  },
  getters: {
    getUserForAuth: state => state.forAuth,
    userType: state => state.userType,
    corpInfo: state => state.corpInfo,
    userName: state => state.userName,
    userId: state => state.userId,
    corpId: state => state.corpId,
    corpAdmYn: state => state.corpAdmYn
  },
  mutations: {
    SET_USER_FOR_AUTHSMS: (state, userInfo) => {
      state.forAuth.userId = userInfo.userId
      state.forAuth.userNm = userInfo.userNm
      state.forAuth.mblNum = userInfo.mblNum
      state.forAuth.userType = userInfo.userType
    },
    SET_USER_ID: (state, userId) => {
      state.userId = userId
      if (window.localStorage.getItem('userId')) {
        window.localStorage.removeItem('userId')
      }
      window.localStorage.setItem('userId', userId)
    },
    SET_USER_NAME: (state, userName) => {
      state.userName = userName
    },
    SET_TOKEN: (state, token) => {
      state.accessToken = token
    },
    SET_REFRESH_TOKEN: (state, token) => {
      state.refreshToken = token
    },
    SET_USER_TYPE: (state, userType) => {
      state.userType = userType
      if (window.localStorage.getItem('userType')) {
        window.localStorage.removeItem('userType')
      }
      window.localStorage.setItem('userType', userType)
    },
    SET_CORP_ID: (state, corpId) => {
      state.corpId = corpId
    },
    SET_CORP_ADM_YN: (state, corpAdmYn) => {
      state.corpAdmYn = corpAdmYn
    },
    SET_CORP_INFO: (state, corpInfo) => {
      state.corpInfo = corpInfo
      if (corpInfo.userType === 'AGENCY') {
        if (window.localStorage.getItem('rcsSvc')) window.localStorage.removeItem('rcsSvc')
        window.localStorage.setItem('rcsSvc', corpInfo.rcsSvc || '')
        window.localStorage.setItem('rcsCorpYn', corpInfo.rcsCorpYn || '') // 중계사 여부
        if (corpInfo.rcsCorpYn === 'Y') {
          let rcsCorpData = {
            agencyNm: corpInfo.name,
            agencyId: corpInfo.corpId,
            relayAgId: corpInfo.corpId,
            webhook: corpInfo.webHookUrl
          }
          if (window.localStorage.getItem('rcsCorpData')) window.localStorage.removeItem('rcsCorpData')
          window.localStorage.setItem('rcsCorpData', JSON.stringify(rcsCorpData))
        } else {
          window.localStorage.setItem('corpId', corpInfo.corpId)
        }
      }
    },
    SET_LAST_REQUEST_DATE: (state, lastRequestDate) => {
      state.lastRequestDate = lastRequestDate
    },
    SET_USER_CD: (state, userCd) => {
      state.userCd = userCd
    },
    SET_CHECK_DESERTED_BRAND: (state, chk) => {
      state.chkDesertedBrand = chk
    },
    SET_SUBAGENCY_YN: (state, subAgencyYn) => {
      state.subAgencyYn = subAgencyYn
    }
  },
  actions: {
    updateUserForAuthSms(context, data) {
      context.commit('SET_USER_FOR_AUTHSMS', data)
    },
    LoginByPassword({ commit, dispatch }, userInfo) {
      // API를 통해 입력 받은 ID/Password 정보를 입력한다.
      return new Promise((resolve, reject) => {
        loginByPassword(userInfo.userId, userInfo.userPassword)
          .then(response => {
            resolve(response)
            /* if (response.result.userType == "AGENCY") {
              commit('SET_CHECK_DESERTED_BRAND', true)
              commit('SET_TOKEN', response.result.accessToken)
              commit('SET_REFRESH_TOKEN', response.result.refreshToken)
              setToken(response.result.accessToken)
              setRefreshToken(response.result.refreshToken)
              dispatch('SetUserInfo').then(userResponse => {
                resolve(userResponse)
              })
              .catch(userErr => {
                reject(userErr)
              })
            } else {
              resolve(response)
            } */
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    Authsms({ commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        authsms(data)
          .then(response => {
            resolve(response)
          })
      })
    },
    SelectAgencyMbl({ commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        selectAgencyMbl(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    AuthsmsConfirm({ commit, dispatch }, data) {
      // API를 통해 입력 받은 ID/Password 정보를 입력한다.
      return new Promise((resolve, reject) => {
        authsmsconfirm(data)
          .then(response => {
            commit('SET_CHECK_DESERTED_BRAND', true)
            commit('SET_TOKEN', response.result.accessToken)
            commit('SET_REFRESH_TOKEN', response.result.refreshToken)
            setToken(response.result.accessToken)
            setRefreshToken(response.result.refreshToken)
            dispatch('SetUserInfo')
              .then(userResponse => {
                resolve(userResponse)
              })
              .catch(userErr => {
                reject(userErr)
              })
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    SetUserInfo({ commit, dispatch }) {
      // API를 통해 세션정보로 User 정보를 가져와 store에 반영
      return new Promise((resolve, reject) => {
        getUserInfoByToken()
          .then(response => {
            // 차단된 사용자
            if (response.result.status === 'DISABLED') {
              let res = {
                status: 'DISABLED'
              }
              dispatch('Logout')
              reject(res)
              return false
            }
            let result = response.result
            commit('SET_USER_ID', result.userId)
            commit('SET_USER_NAME', result.userNm)
            commit('SET_USER_TYPE', result.userType)
            commit('SET_CORP_ID', result.corpId)
            commit('SET_CORP_ADM_YN', result.corpAdmYn)
            commit('SET_SUBAGENCY_YN', result.subAgencyYn)
            commit('SET_TOKEN', getToken())
            commit('SET_REFRESH_TOKEN', getRefreshToken())

            if (result.userType === 'CORP') {
              if (result.corpAdmYn === 'Y') {
                commit('SET_USER_CD', 'CORPY')
              } else {
                commit('SET_USER_CD', 'CORPN')
              }
            } else {
              commit('SET_USER_CD', 'AGENCY')
            }

            dispatch('SetCorpInfo')
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    SetCorpInfo({ commit, state }) {
      if (state.corpId !== null && state.corpId !== undefined && state.corpId !== '') {
        if (state.userType === 'CORP') {
          getCorpInfoByUserInfo(state.corpId).then(response => {
            commit('SET_CORP_INFO', response.result)
          })
        } else {
          getAgencyInfoByUserInfo(state.corpId).then(response => {
            commit('SET_CORP_INFO', response.result)
          })
        }
      }
    },
    SetAccessToken({ commit }, token) {
      return new Promise((resolve, reject) => {
        commit('SET_TOKEN', token)
        setToken(token)
      })
    },
    SetRefreshToken({ commit }, token) {
      return new Promise((resolve, reject) => {
        commit('SET_REFRESH_TOKEN', token)
        setRefreshToken(token)
      })
    },
    Logout({ dispatch }) {
      return new Promise((resolve, reject) => {
        // logout()
        dispatch('ClearSession')
        resolve()
      })
    },
    ClearSession({ commit }) {
      commit('SET_USER_ID', '')
      commit('SET_USER_NAME', '')
      commit('SET_TOKEN', '')
      commit('SET_REFRESH_TOKEN', '')
      commit('SET_LAST_REQUEST_DATE', '')
      commit('SET_USER_CD', '')
      removeToken()
      removeRefreshToken()
      // 로그아웃시 storage의 정보 제거
      window.localStorage.removeItem('userType')
      window.localStorage.removeItem('userId')
      window.localStorage.removeItem('corpId')
      window.localStorage.removeItem('curBrandNm')
      window.localStorage.removeItem('brandMgrId')
      window.localStorage.removeItem('rcsSvc')
      window.localStorage.removeItem('rcsCorpYn')
      window.localStorage.removeItem('rcsCorpData')
    },
    getUserInfo({ commit, dispatch, state }) {
      return new Promise((resolve, reject) => {
        if (jglib.isEmpty(state.userId)) {
          // 없으면 조회해서 리턴한다.
          dispatch('SetUserInfo')
            .then(() => {
              let userInfo = {
                userId: state.userId,
                userName: state.userName,
                userType: state.userType,
                corpId: state.corpId,
                corpAdmYn: state.corpAdmYn,
                subAgencyList: state.subAgencyList
              }
              resolve(userInfo)
            })
            .catch(() => {
              console.error('Error in get UserInfo')
              dispatch('ClearSession')
              reject(new Error('Error in get UserInfo'))
            })
        } else {
          // 있으면 바로 리턴한다.
          let userInfo = {
            userId: state.userId,
            userName: state.userName,
            userType: state.userType,
            corpId: state.corpId,
            corpAdmYn: state.corpAdmYn,
            subAgencyList: state.subAgencyList
          }
          resolve(userInfo)
        }
      })
    },
    SetLastRequestDate({ commit, state }) {
      commit('SET_LAST_REQUEST_DATE', window.dayjs().format('YYYY-MM-DD HH:mm:ss'))
    },
    SetCheckDesertedBrand({ commit }) {
      commit('SET_CHECK_DESERTED_BRAND', false)
    }
  }
}
