const state = {
  // 검색조건 리스트
  searchConditionList: window.localStorage.getItem('searchConditionList') !== null ? JSON.parse(window.localStorage.getItem('searchConditionList')) : []
}

const getters = {

  getSearchCondition: (state) => (data, addCompare) => {
    let storage = window.localStorage.getItem('searchConditionList') !== null ? JSON.parse(window.localStorage.getItem('searchConditionList')) : []

    // 동일한 그룹(컴포넌트)이름을 가진 검색조건을 가져온다.
    let searched = storage.filter(search => search.group === data.group)[0]
    if (searched && addCompare) {
      // addCompare: group 아이디 이외 추가로 비교할 값
      // ex) 고객관리 > 브랜드 > 특정 브랜드 > 발신번호 (발신번호 컴포넌트의 group값은 clientChatbotList)
      //     A브랜드 발신번호 페이징 이동 후 브랜드 목록으로 이동,
      //     B브랜드로 이동 후 발신번호 접근시 group의 값이 clientChatbotList로 동일하기 때문에 A브랜드 발신번호의 페이징이 적용된다.
      for (const compare of addCompare) {
        if (searched[compare] !== data[compare]) {
          // window.localStorage.setItem('searchConditionList', JSON.stringify(storage.filter(search => search.group !== data.group)))
          return data
        }
      }
    }

    if (searched) {
      return searched
    } else {
      return data
    }
  }
}

const mutations = {
  setSearchCondition: (state, data) => {
    if (data) {
      // 동일한 group이름의 항목을 삭제 후 추가한다.
      state.searchConditionList = state.searchConditionList.filter(search => search.group !== data.group)
      state.searchConditionList.push(data)
      window.localStorage.setItem('searchConditionList', JSON.stringify(state.searchConditionList))
    }
  },
  clearSearchCondition: (state, groupList) => {
    // 특정 group을 삭제한다.
    for (const group of groupList) {
      state.searchConditionList = state.searchConditionList.filter(search => search.group !== group)
    }
    window.localStorage.setItem('searchConditionList', JSON.stringify(state.searchConditionList))
  },
  allClearSearchCondition: (state) => {
    state.searchConditionList = []
    window.localStorage.setItem('searchConditionList', JSON.stringify(state.searchConditionList))
  }
}

const actions = {
  searchAndGo: ({ commit, dispatch }, data) => {
    if (data.searchParam) {
      commit('setSearchCondition', data.searchParam)
    }
    if (data.dispatch) {
      dispatch(data.dispatch, data.searchParam, { root: true })
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
