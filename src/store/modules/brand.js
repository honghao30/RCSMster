import { getApprovalBrand } from '@/api/service/approvalBrand'

export default {
  state: {
    brands: [],
    brandInfo: {},
    brandMgrId: '',
    createTpl: {},
    brandId: '',
    themeType: {},
    totFileSize: 0 // (이미지 템플릿) 총 파일 사이즈
  },
  getters: {
    brandInfo: state => state.brandInfo,
    GET_BRAND_MGR_ID: state => state.brandMgrId,
    getCreateTpl: state => state.createTpl,
    getBrandId: state => state.brandId,
    getThemeTypeInfo: (state) => state.themeType,
    getTotalFileSize: (state) => state.totFileSize
  },
  mutations: {
    setBrandInfo: (state, data) => {
      state.brandInfo = data
    },
    SET_BRAND_MGR_ID(state, brandMgrId) {
      state.brandMgrId = brandMgrId
      if (window.localStorage.getItem('brandMgrId')) {
        window.localStorage.removeItem('brandMgrId')
      }
      window.localStorage.setItem('brandMgrId', brandMgrId) // localstorage 변경
    },
    SET_BRANDS(state, brands) {
      state.brands = brands
    },
    SET_BRAND(state, brand) {
      let brands = state.brands
      let index = brands.findIndex(b => b.brandId === brand.brandId)
      brands.splice(index, 1)
      brands.push(brand)
      state.brands = brands
      if (window.localStorage.getItem('curBrandNm')) {
        window.localStorage.removeItem('curBrandNm')
      }
      window.localStorage.setItem('curBrandNm', brands[0].name) // localstorage 변경
    },
    SET_CREATE_TPL(state, tpl) {
      state.createTpl.theme = tpl.theme
      state.createTpl.type = tpl.type
    },
    SET_BRAND_ID_FOR_CREATE_TPL(state, brandid) {
      state.brandId = brandid
    },
    SET_TPL_THEME_TYPE(state, data) {
      if (window.localStorage.getItem('themeTypeInfo')) {
        window.localStorage.removeItem('themeTypeInfo')
      }
      state.themeType = data // state 값 변경
      window.localStorage.setItem('themeTypeInfo', JSON.stringify(data)) // localstorage 변경
    },
    CLEAR_TPL_THEME_TYPE(state) {
      state.themeType = {}
      window.localStorage.removeItem('themeTypeInfo')
    },
    SET_TOTAL_FILE_SIZE(state, data) {
      state.totFileSize = data
      // console.info(`## set total: ${data} byte`)
    }
  },
  actions: {
    fetchApprovalBrand: (context, params) => {
      getApprovalBrand(params).then(response => {
        context.commit('setBrandInfo', response.result)
      })
    },
    GetBrand({ commit, state }, params) {
      let brandId = params.brandId
      let refresh = params.refresh
      return new Promise((resolve, reject) => {
        let brand = state.brands.filter(brand => brand.brandId === brandId)
        if (brand.length > 0 && !refresh) {
          commit('SET_BRAND_MGR_ID', brand[0].mgrUserId)
          resolve(brand[0])
        } else {
          getApprovalBrand({ brandId: brandId }).then(res => {
            let brand = {
              brandId: res.result.brandId,
              name: res.result.name,
              agencyNm: res.result.agencyNm,
              mgrUserId: res.result.mgrUserId,
              mgrUserNm: res.result.mgrUserNm,
              status: res.result.status,
              aprvRet: res.result.aprvRet,
              aprvHistYn: res.result.aprvHistYn,
              activeYn: res.result.activeYn,
              contractList: res.result.contractList
            }
            commit('SET_BRAND', brand)
            commit('SET_BRAND_MGR_ID', brand.mgrUserId)
            resolve(brand)
          })
        }
      })
    },
    setThemeType: (context, data) => {
      context.commit('SET_TPL_THEME_TYPE', data)
    },
    clearThemeType: (context) => {
      context.commit('CLEAR_TPL_THEME_TYPE')
    },
    setTotalFileSize: (context, data) => {
      context.commit('SET_TOTAL_FILE_SIZE', data)
    }
  }
}
