import { getTemplateInfo, reformSuggestForView, retireveAutoReplyInfo } from '@/api/service/autoReply'
import autoReplyMsgUtils from '@/views/brand/autoreply/components/js/autoReplyMsgUtils'

export default {
  namespaced: true,
  state: {
    brands: [],
    autoReplyData: {}
  },
  getters: {
    getAutoReplyData: state => state.autoReplyData,
    getChipSuggestions: state => state.autoReplyData.chipSuggestions,
    getCards: state => state.autoReplyData.cardData
  },
  mutations: {
    SET_AUTO_REPLY_DATA(state, autoReply) {
      state.autoReplyData = autoReply
    },
    INIT_AUTO_REPLY_DATA(state, obj) {
      state.autoReplyData = obj
    },
    SET_TEMPLATE_DATE(state, { template }) {
      state.autoReplyData.tplId = template.tplId
      state.autoReplyData.tplNm = template.tplNm
      state.autoReplyData.cardType = template.cardType
      state.autoReplyData.btnUseYn = template.btnUseYn
    },
    SET_CARD_ACTIVE(state, { idx }) {
      state.autoReplyData.cardData.forEach((msg, index) => {
        if (idx !== index) {
          msg.isActive = false
        } else {
          msg.isActive = true
        }
      })
    }
  },
  actions: {
    get_auto_reply_data ({ commit }, params) {
      return new Promise((resolve, reject) => {
        retireveAutoReplyInfo(params.brandId, params.armId).then(res => {
          // 초기화
          // commit('INIT_AUTO_REPLY_DATA', { brandId: params.brandId })
          // 에뮬레이터에서 사용 하는 상태값 세팅
          commit('SET_AUTO_REPLY_DATA', reformSuggestForView(params.brandId, res.result.autoReply, res.result.templateContent))
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    },
    init_auto_reply_msg_data ({ commit }, { brandId, chatType }) {
      // commit('SET_AUTO_REPLY_DATA', reformSuggestForView(brandId, autoReplyMsgData, {}))
      let obj = JSON.parse(JSON.stringify(autoReplyMsgUtils.form))
      obj.brandId = brandId
      obj.chatType = chatType
      if (chatType === 'slider') {
        // 슬라이드 타입일 경우 카드 한장을 더넣는다
        let cardData = JSON.parse(JSON.stringify(autoReplyMsgUtils.cardData))
        cardData.isActive = false
        cardData.cardNo = 2
        obj.cardData.push(cardData)
      }
      commit('INIT_AUTO_REPLY_DATA', obj)
    },
    get_template_data({ commit }, { autoReplyMsgData }) {
      // 서버에서 템플릿 조회
      return new Promise((resolve, reject) => {
        let params = {
          chatType: autoReplyMsgData.chatType,
          cardCnt: autoReplyMsgData.cardData.length,
          brandId: autoReplyMsgData.brandId
        }
        getTemplateInfo(params.brandId, params).then(res => {
          commit('SET_TEMPLATE_DATE', { template: res.result.info })
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    },
    set_card_active({ commit }, { idx }) {
      return new Promise((resolve) => {
        commit('SET_CARD_ACTIVE', { idx })
        resolve()
      })
    }
  }
}
