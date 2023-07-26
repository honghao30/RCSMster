import { getApprovalBrand } from '@/api/service/approvalBrand'

const defaultTplColor = '#FFFFFF'

export default {
  namespaced: true,
  state: {
    brandDetail: {},
    defaultTplColor: defaultTplColor,
    fileInfo: {
      bgImgFile: null,
      profileImgFile: null,
      defaultImg: []
    }
  },
  getters: {
    getBrandDetail: state => state.brandDetail,
    getBrandFile: state => state.fileInfo,
    getDefaultTplColor: state => state.defaultTplColor,
  },
  mutations: {
    SET_BRAND_DETAIL: (state, data) => {
      state.brandDetail = data
    },
    SET_BRAND_FILE: (state, data) => {
      state.fileInfo = data
    },
    SET_BRAND_DEFAUL_IMG: (state, data) => {
      state.fileInfo.defaultImg = data
    },
    SET_ADDRESS: (state, addr) => {
      state.brandDetail.zipCode = addr.zipCode
      state.brandDetail.roadAddress = addr.roadAddress
      state.brandDetail.detailAddress = addr.detailAddress
    },
    SET_IMGFILE: (state, fileInfo) => {
      const file = fileInfo.file
      const reader = new FileReader()
      if (fileInfo.type === 'bg') {
        state.brandDetail.bgImgFileNm = file.name
        state.brandDetail.bgImgFileId = null
        reader.onload = e => {
          state.brandDetail.bgImgFileUrl = e.target.result
        }
        reader.readAsDataURL(file)
        state.fileInfo.bgImgFile = file;
      } else if (fileInfo.type === 'profile') {
        state.brandDetail.profileImgFileNm = file.name
        state.brandDetail.profileImgFileId = null
        reader.onload = e => {
          state.brandDetail.profileImgFileUrl = e.target.result
        }
        reader.readAsDataURL(file)
        state.fileInfo.profileImgFile = file
      } else if (fileInfo.type === 'certification') {
        state.brandDetail.certificationFileNm = file.name
        state.brandDetail.certificationFileId = null
        reader.onload = e => {
          state.brandDetail.certificationFileUrl = e.target.result
        }
        reader.readAsDataURL(file)
      } else if (fileInfo.type === 'identity') {
        state.brandDetail.identityFileNm = file.name
        state.brandDetail.identityFileId = null
        reader.onload = e => {
          state.brandDetail.identityFileUrl = e.target.result
        }
        reader.readAsDataURL(file)
      } else if (fileInfo.type === 'agentWarrant') {
        state.brandDetail.agentWarrantFileNm = file.name
        state.brandDetail.agentWarrantFileId = null
        reader.onload = e => {
          state.brandDetail.agentWarrantFileUrl = e.target.result
        }
        reader.readAsDataURL(file)
      }
    },
    SET_DEF_IMGFILE: (state, defImgInfo) => {
      if (defImgInfo.type === 'bg') {
        state.brandDetail.bgImgFileNm = null
        state.brandDetail.bgImgFileId = defImgInfo.id
        state.brandDetail.bgImgFileUrl = defImgInfo.url
      } else if (defImgInfo.type === 'profile') {
        state.brandDetail.profileImgFileNm = null
        state.brandDetail.profileImgFileId = defImgInfo.id
        state.brandDetail.profileImgFileUrl = defImgInfo.url
      }
    },
    SET_BRAND_ID: (state, data) => {
      state.brandDetail.brandId = data
    },
    SET_MENUS: (state, data) => {
      state.brandDetail.menus = data
    },
    APPEND_MENU_ITEM: (state, menu) => {
      const menus = state.brandDetail.menus
      if (menus) {
        const idx = menus.indexOf(menus.find((item) => { return item.buttonType === menu.menuValue }))
        if (idx === -1) {
          menus.push({
            buttonType: menu.menuValue,
            weblink: menu.link !== undefined && !jglib.isEmpty(menu.link) ? menu.link : null
          })
        }
      }
    },
    REMOVE_MENU_ITEM: (state, menuValue) => {
      const menus = state.brandDetail.menus
      if (menus) {
        const idx = menus.indexOf(menus.find((item) => { return item.buttonType === menuValue }))
        if (idx !== -1) {
          menus.splice(idx, 1)
        }
      }
    },
    SET_TEMPLATE_COLOR: (state, tplColor) => {
      state.brandDetail.templateColor = tplColor
    },
    SET_CATEGORY_INFO: (state, data) => {
      if (data.target === 'main') {
        state.brandDetail.categoryId = data.catId
        state.brandDetail.categoryName = data.catNm
      } else if (data.target === 'sub') {
        state.brandDetail.subCategoryId = data.catId
        state.brandDetail.subCategoryName = data.catNm
      }
    },
    SET_ALIMPAN_INFO: (state, params) => {
      state.brandDetail.alimpanTitle = params.title
      state.brandDetail.alimpanContent = params.content
    }
  },
  actions: {
    setEmptyBrand: (context) => {
      const defaultBrandInfo = {
        brandId: '',
        name: '',
        menus: [],
        description: '',
        tel: '',
        categoryId: '',
        subCategoryId: '',
        categoryOpt: '',
        zipCode: '',
        roadAddress: '',
        detailAddress: '',
        email: '',
        webSiteUrl: '',
        initTab: 'FEED',
        bgImgFileNm: '',
        bgImgFileId: null,
        bgImgFileUrl: null,
        profileImgFileNm: '',
        profileImgFileId: null,
        profileImgFileUrl: null,
        categoryName: '',
        subCategoryName: '',
        templateColor: defaultTplColor,
        tplColorUseYn: 'Y',
        // 선거
        // 본인 인증
        certificationFileNm: '',
        certificationFileId: null,
        certificationFileUrl: null,
        certificationType: 'phone',
        // 신분 증명
        identityFileNm: '',
        identityFileId: null,
        identityFileUrl: null,
        // 대행사 위임증명
        agentWarrantFileNm: '',
        agentWarrantFileId: null,
        agentWarrantFileUrl: null,
        phone: '',
        certificationFile: '',
        Identity: '',
        agentWarrant: '',
        // 알림판
        alimpanUseYn: 'Y',
        alimpanTitle: '',
        alimpanContent: ''
      }
      const emptyFileInfo = {
        bgImgFile: null,
        profileImgFile: null,
        defaultImg: []
      }
      context.commit('SET_BRAND_DETAIL', defaultBrandInfo)
      context.commit('SET_BRAND_FILE', emptyFileInfo)
    },
    fetchApprovalBrand: (context, params) => {
      return getApprovalBrand(params).then(response => {
        const fileObj = {
          bgImgFileNm: '',
          bgImgFileId: '',
          bgImgFileUrl: '',
          profileImgFileNm: '',
          profileImgFileId: '',
          profileImgFileUrl: ''
        }
        const brandDetail = { ...response.result, ...fileObj }

        if (brandDetail.mediaUrl) {
          brandDetail.mediaUrl.forEach(f => {
            let type = f.typeName
            if (type === 'background') {
              brandDetail.bgImgFileNm = f.fileName
              brandDetail.bgImgFileId = f.fileId
              brandDetail.bgImgFileUrl = f.url
            } else {
              brandDetail.profileImgFileNm = f.fileName
              brandDetail.profileImgFileId = f.fileId
              brandDetail.profileImgFileUrl = f.url
            }
          })
        }
        if (brandDetail.templateColor === undefined) {
          brandDetail['templateColor'] = null
        }
        if (!jglib.isEmpty(brandDetail.templateColor)) {
          brandDetail['tplColorUseYn'] = 'Y'
        } else {
          brandDetail['tplColorUseYn'] = 'N'
        }
        if (!jglib.isEmpty(brandDetail.alimpanTitle) && !jglib.isEmpty(brandDetail.alimpanContent)) {
          brandDetail['alimpanUseYn'] = 'Y'
        } else {
          brandDetail['alimpanUseYn'] = 'N'
        }
        context.commit('SET_BRAND_DETAIL', brandDetail)
      })
    },
    setAddress: (context, params) => {
      context.commit('SET_ADDRESS', params)
    },
    setImgFile: (context, params) => {
      context.commit('SET_IMGFILE', params)
    },
    setDefaultImg: (context, params) => {
      context.commit('SET_DEF_IMGFILE', params)
    },
    setBrandId: (context, params) => {
      context.commit('SET_BRAND_ID', params)
    },
    setMenus: (context, params) => {
      context.commit('SET_MENUS', params)
    },
    appendMenuItem: (context, menu) => {
      context.commit('APPEND_MENU_ITEM', menu)
    },
    removeMenuItem: (context, menuValue) => {
      context.commit('REMOVE_MENU_ITEM', menuValue)
    },
    setBrandDefaultImg: (context, params) => {
      context.commit('SET_BRAND_DEFAUL_IMG', params)
    },
    setTemplateColor: (context, params) => {
      context.commit('SET_TEMPLATE_COLOR', params)
    },
    setCategoryInfo: (context, params) => {
      context.commit('SET_CATEGORY_INFO', params)
    },
    setAlimpanInfo: (context, params) => {
      context.commit('SET_ALIMPAN_INFO', params)
    }
  }
}
