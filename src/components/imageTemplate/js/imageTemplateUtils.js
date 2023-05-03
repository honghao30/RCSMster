import store from '@/store'
/**
imgTmplInfos: 이미지템플릿 상품별 정보
  infoComponents: 이미지 템플릿 작성/조회 화면을 구성하는 컴포넌트를 순서대로 지정해놓음
    - common - 공통 템플릿 정보
    - mainImg - 메인 이미지
    - titAndDesc - 제목, 본문 정보
    - detail - 상세 정보 영역
    - button - 버튼 영역
  disableData: 이미지 템플릿 작성/조회 화면을 구성하는 컴포넌트 내에서 사용하지 않는 입력값을 지정
 */
const imgTmplInfos = [
  { theme: 'HIT', type: 'S', subType: 'HITS', themeNm: '이미지 & 타이틀 강조형', typeNm: '정방형 (1:1)', emulator: 'HighlightImageAndTitle', infoComponents: ['common', 'mainImg', 'titAndDesc', 'detail', 'buttons'], disableData: { titAndDesc: 'useSelectDescription|description', detail: 'subImage|subMediaUrl' } },
  { theme: 'HIT', type: 'V', subType: 'HITV', themeNm: '이미지 & 타이틀 강조형', typeNm: '세로형 (3:4)', emulator: 'HighlightImageAndTitle', infoComponents: ['common', 'mainImg', 'titAndDesc', 'detail', 'buttons'], disableData: { titAndDesc: 'useSelectDescription|description', detail: 'subImage|subMediaUrl' } },
  { theme: 'HIM', type: 'S', subType: 'HITS', themeNm: '이미지 강조형', typeNm: '정방형 (1:1)', emulator: 'HighlightImage', infoComponents: ['common', 'mainImg', 'titAndDesc', 'buttons'], disableData: { titAndDesc: 'useSelectDescription' } },
  { theme: 'HIM', type: 'V', subType: 'HITV', themeNm: '이미지 강조형', typeNm: '세로형 (3:4)', emulator: 'HighlightImage', infoComponents: ['common', 'mainImg', 'titAndDesc', 'buttons'], disableData: { titAndDesc: 'useSelectDescription' } },
  { theme: 'TBN', type: 'V', subType: 'TBNV', themeNm: '썸네일형', typeNm: '세로', emulator: 'Thumbnail', infoComponents: ['common', 'mainImg', 'titAndDesc', 'detail', 'buttons'], disableData: { common: 'useSelectTplType|tplType', detail: 'subTitle' } },
  { theme: 'TBN', type: 'H', subType: 'TBNH', themeNm: '썸네일형', typeNm: '가로', emulator: 'Thumbnail', infoComponents: ['common', 'mainImg', 'titAndDesc', 'detail', 'buttons'], disableData: { common: 'useSelectTplType|tplType', titAndDesc: 'useSelectDescription', detail: 'subTitle|subDesc' } },
  { theme: 'SNS', type: 'S', subType: 'SNSS', themeNm: 'SNS형', typeNm: '하단버튼', emulator: 'Sns', infoComponents: ['common', 'titAndDesc', 'mainImg', 'buttons'], disableData: { common: 'useSelectTplType|tplType', titAndDesc: 'useSelectDescription' } },
  { theme: 'SNS', type: 'H', subType: 'SNSH', themeNm: 'SNS형', typeNm: '중간버튼', emulator: 'Sns', infoComponents: ['common', 'titAndDesc', 'buttons', 'mainImg'], disableData: { common: 'useSelectTplType|tplType', titAndDesc: 'useSelectDescription' } }
]
// 업로드 가능한 파일 형식
const acceptFileType = ['gif', 'jpeg', 'jpg', 'png', 'bmp']

let imgTplUtils = {
  isImageTemplate(theme) {
    if (imgTmplInfos.find(x => x.theme === theme)) return true
    else return false
  },
  getTypes(theme = '') {
    let tmpl = []
    if (theme === '') {
      // 전체 옵션 리턴(중복 제거)
      imgTmplInfos.forEach(x => {
        if (!tmpl.find(t => t.typeNm === x.typeNm)) tmpl.push(x)
      })
    } else {
      // 지정된 theme에 해당하는 옵션만 리턴
      tmpl = imgTmplInfos.filter(x => x.theme === theme)
      tmpl.map(x => { return { type: x.type, typeNm: x.typeNm } })
    }
    return tmpl
  },
  getThemeTypeName(theme, type) {
    let tmpl = imgTmplInfos.find(x => x.theme === theme && x.type === type)
    return { themeNm: tmpl.themeNm, typeNm: tmpl.typeNm }
  },
  // 현재 템플릿 테마, 구성정보로 입력/조회 화면을 구성할 component 정보와 입력 불가한 항목을 가져온다
  getComponentInfo(theme, type) {
    let data = imgTmplInfos.find(x => x.theme === theme && x.type === type)
    return { components: data.infoComponents, disableData: data.disableData, emulator: data.emulator }
  },
  getAcceptFileType() {
    return acceptFileType
  },
  getImageType(str) {
    let startIndex = str.indexOf(':')
    let lastIndex = str.indexOf(';')
    let type = str.substring(startIndex + 1, lastIndex)
    return type
  },
  convertCanvasToFile(src, type) {
    // 1. base64 데이터 디코딩
    let decodeData = atob(src.split(',')[1])
    let array = []
    for (let i = 0; i < decodeData.length; i++) {
      array.push(decodeData.charCodeAt(i))
    }
    // 2. Blob 생성
    return new Blob([new Uint8Array(array)], { type: type })
  },
  updateFileSize(type, size) {
    let totFileSize = store.getters.getTotalFileSize
    let updateSize = type === 'add' ? Number(totFileSize) + Number(size) : Number(totFileSize) - Number(size)
    if (isNaN(updateSize)) updateSize = 0
    store.dispatch('setTotalFileSize', Number(updateSize))
  }
}

export default imgTplUtils
