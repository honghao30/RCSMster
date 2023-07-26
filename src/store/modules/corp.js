import { getCorpInfo } from '@/api/service/corp'

export default {
  state: {
    corpInfo: {}
  },
  getters: {},
  mutations: {
    SET_CORP_INFO: (state, data) => {
      state.corpInfo = data
    },
    GET_CORP_INFO: (state) => {
      return state.corpInfo
    }
  },
  actions: {
    getCorpInfo({ commit, state }, params) {
      let corpId = params.corpId
      return new Promise((resolve, reject) => {
        getCorpInfo({ corpId: corpId }).then(res => {
          let corp = res.result
          commit('SET_CORP_INFO')
          resolve(corp)
        })
      })
    }
  }
}
