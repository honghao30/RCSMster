export default {
  state: {
    visibleLoading: false,
    sessionTimeout: false,
    route: {}
  },
  mutations: {
    SET_VISIBLE_LOADING: (state, flag) => {
      state.visibleLoading = flag
    },
    SET_SESSION_TIMEOUT: (state, flag) => {
      state.sessionTimeout = flag
    },
    SET_ROUTE: (state, route) => {
      state.route = route
    }
  },
  actions: {
    SetLoading({ commit }, flag) {
      commit('SET_VISIBLE_LOADING', flag)
    },
    SetSessionTimeout({ commit }, flag) {
      commit('SET_SESSION_TIMEOUT', flag)
    },
    SetRoute({ commit }, route) {
      commit('SET_ROUTE', route)
    }
  }
}
