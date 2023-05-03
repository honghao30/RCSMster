export default {
  state: {
    chatbot: {}
  },
  getters: {
    getChatbot: state => state.chatbot
  },
  mutations: {
    /** 챗봇 등록시 데이터 저장 */
    SET_CHATBOT(state, data) {
      if (window.localStorage.getItem('chatbot')) {
        window.localStorage.removeItem('chatbot')
      }
      state.chatbot = data // state 값 변경
      window.localStorage.setItem('chatbot', JSON.stringify(data)) // localstorage 변경
    }
  },
  actions: {
    setChatbotInfo: (context, data) => {
      context.commit('SET_CHATBOT', data)
    }
  }
}
