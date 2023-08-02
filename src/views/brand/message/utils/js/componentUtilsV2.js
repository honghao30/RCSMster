// import store from '@/store'

// import restricts from './restricts'
import _ from 'lodash'

// import defaultComponent from './diyLayout/defaultTable'

const componentInfos = [
  {
    componentId: '',
    componentType: 'MainTitle',
    componentTypeNm: '메인타이틀',
    infoComponents: ['titAndDescInfo'],
    disableData: {}
  },
  {
    componentId: '',
    componentType: 'StyleTitleA',
    componentTypeNm: '스타일타이틀',
    infoComponents: ['titAndDescInfo'],
    disableData: {}
  },
  {
    componentId: '',
    componentType: 'MainTitleSelect',
    componentTypeNm: '타이틀선택형',
    infoComponents: ['titAndDescInfo'],
    disableData: {}
  },
  {
    componentId: '',
    componentType: 'MainTitleFree',
    componentTypeNm: '타이틀자유형',
    infoComponents: ['titAndDescInfo'],
    disableData: {}
  },
  {
    componentId: '',
    componentType: 'Description',
    componentTypeNm: '설명',
    infoComponents: ['titAndDescInfo'],
    disableData: {}
  },
  {
    componentId: '',
    componentType: 'ImageTall',
    componentTypeNm: '장형이미지',
    infoComponents: ['mainImgInfo'],
    disableData: {}
  },
  {
    componentId: '',
    componentType: 'ImageSquare',
    componentTypeNm: '정형이미지',
    infoComponents: ['mainImgInfo'],
    disableData: {}
  },
  {
    componentId: '',
    componentType: 'ImageVertical',
    componentTypeNm: '가로형이미지',
    infoComponents: ['mainImgInfo'],
    disableData: {}
  },
  {
    componentId: '',
    componentType: 'VButton',
    componentTypeNm: '가로형버튼',
    infoComponents: ['buttonsInfo'],
    disableData: {}
  },
  {
    componentId: '',
    componentType: 'HButton',
    componentTypeNm: '세로형버튼',
    infoComponents: ['buttonsInfo'],
    disableData: {}
  },
  {
    componentId: '',
    componentType: 'ItemA',
    componentTypeNm: '아이템A',
    infoComponents: ['titAndDescInfo'],
    disableData: {}
  },
  {
    componentId: '',
    componentType: 'ItemB',
    componentTypeNm: '아이템B',
    infoComponents: ['titAndDescInfo'],
    disableData: {}
  },
  {
    componentId: '',
    componentType: 'Notice',
    componentTypeNm: '공지',
    infoComponents: ['titAndDescInfo'],
    disableData: {}
  },
  {
    componentId: '',
    componentType: 'Table',
    componentTypeNm: '테이블',
    infoComponents: ['titAndDescInfo', 'bodyInfo'],
    disableData: {}
  },
  {
    componentId: '',
    componentType: 'StyleTable',
    componentTypeNm: '스타일테이블',
    infoComponents: ['titAndDescInfo', 'bodyInfo'],
    disableData: {}
  },
  {
    componentId: '',
    componentType: 'TitleDesc',
    componentTypeNm: '타이틀설명',
    infoComponents: ['titAndDescInfo', 'bodyInfo'],
    disableData: {}
  },
  {
    componentId: '',
    componentType: 'ThumbDesc',
    componentTypeNm: '이미지설명',
    infoComponents: ['titAndDescInfo', 'bodyInfo'],
    disableData: {}
  },
  {
    componentId: '',
    componentType: 'Thumbnail',
    componentTypeNm: '썸네일',
    infoComponents: ['bodyInfo'],
    disableData: {}
  },
  { componentId: '', componentType: 'Banner', componentTypeNm: '베너', infoComponents: ['mainImgInfo'], disableData: {} }
]

const mainImgInfo = {
  imgType: 'vertical',
  media: '', // maap url 정보(업로드 완료된 이미지가 있을 경우 데이터 존재)
  mediaUrl: '', // 링크정보
  fileSrc: '', // (사용자가 업로드한) 이미지 src
  fileName: '', // 파일 이름
  fileType: '', // 파일 타입
  fileSize: 0, // byte
  previewSrc: '' // (emulator - 이미지 미리보기)
}

const titAndDescInfo = {
  title: '', // 제목
  title2: '', // 타이틀 자유형일 경우 제목
  logoFile: '',
  logoFileSrc: '',
  logoType: 'basicImage',
  logoCategory: 'none',
  description: '', // 본문
  useTitle: 'Y', // 제목 사용여부
  useDescription: 'Y', // 본문 사용여부
  useLogo: 'N'
}

const bodyInfo = {
  minCnt: 1, // 최소 개수
  maxCnt: 3, // 최대 개수
  list: [] // 상세 정보 목록: { subTitle, subMedia, subMediaUrl, subDesc } + fileSrc, fileType, fileName, fileUrl, fileSize, line: false, colNum: '2'
}
// const buttonsInfo = {
//     buttonColorType: 'default',
//     btnList: [] // { action: { ...  }}
//   }

const defaultBodyObj = {
  subTitle: {
    text: '',
    textAlign: 'left',
    textBold: '',
    textColor: '#000000',
    textSize: '14'
  },
  subMedia: '',
  subMediaUrl: '',
  subDesc: {
    text: '',
    textAlign: 'left',
    textBold: '',
    textColor: '#000000',
    textSize: '14'
  },
  fileSrc: '',
  fileType: '',
  fileName: '',
  fileUrl: '',
  fileSize: 0,
  line: false,
  colNum: '2'
}

const buttonsInfo = {
  buttonColorType: 'default',
  btnList: [
    {
      id: 1,
      bgColor: '#2f77fb',
      btnEvent: 'none',
      btnEventDropdown: '',
      btnName: '',
      call: '',
      copyContent: '',
      message: {
        call: '',
        content: '',
        viewSource: ''
      },
      map: {
        latitude: '',
        longitude: '',
        location: '',
        url: '',
        query: ''
      },
      calendar: {
        date: '',
        title: '',
        content: ''
      },
      browser: {
        url: '',
        viewMode: ''
      }
    },
    {
      id: 2,
      bgColor: '#2f77fb',
      btnEvent: 'none',
      btnEventDropdown: '',
      btnName: '',
      call: '',
      copyContent: '',
      message: {
        call: '',
        content: '',
        viewSource: ''
      },
      map: {
        latitude: '',
        longitude: '',
        location: '',
        url: '',
        query: ''
      },
      calendar: {
        date: '',
        title: '',
        content: ''
      },
      browser: {
        url: '',
        viewMode: ''
      }
    }
  ]
}

// 업로드 가능한 파일 형식
// const acceptFileType = ['gif', 'jpeg', 'jpg', 'png', 'bmp']

let componentUtils = {
  // 현재 템플릿 테마, 구성정보로 입력/조회 화면을 구성할 component 정보와 입력 불가한 항목을 가져온다
  getComponentInfo(componentType) {
    console.log('구성', componentType)
    let data = componentInfos.find(x => x.componentType === componentType)
    return { components: data.infoComponents }
  },

  getComponentInfoFromFmt(param, fmt) {
    console.log(JSON.parse(fmt))
    fmt = JSON.parse(fmt)
    let infoComponents = []
    if (fmt != '') {
      // children 있는지
      if (fmt.children.length != 0) {
        if (fmt.children[0].widget == 'LinearLayout') { // title이나 thumbnail경우 LinearLayout으로 감싸져 있음
          if (fmt.children[1] != undefined && fmt.children[1].widget == 'View') {
            infoComponents.push('titAndDescInfo')
          } else {
            if (fmt.children[0].children[0].widget == 'ImageView') {
              infoComponents.push('bodyInfo')
            } else if (fmt.children[0].children[0].widget == 'Button') {
              infoComponents.push('buttonsInfo')
            }
          }
        } else if (fmt.children[0].widget == 'TextView') {
          let isBody = false
          infoComponents.push('titAndDescInfo')
          for (let i = 1; i < fmt.children.length; i++) {
            if (fmt.children[i].widget === 'LinearLayout') {
              isBody = true
            }
          }
          if (isBody) {
            infoComponents.push('bodyInfo')
          }
        } else if (fmt.children[0].widget == 'ImageView') {
          if (fmt.children[1] != undefined && fmt.children[1].widget == 'LinearLayout') {
            infoComponents.push('titAndDescInfo')
          } else {
            infoComponents.push('mainImgInfo')
          }
        } else if (fmt.children[0].widget == 'Button') {
          infoComponents.push('buttonsInfo')
        }
      }
    }
    let obj = {
      componentId: param.id,
      componentType: param.type,
      componentTypeNm: param.name,
      components: infoComponents,
      disableData: {}
    }

    console.log(infoComponents)
    let compObjData = this.initComponent(obj)
    return compObjData
  },

  initComponent(compInfo) {
    let ObjData = new Array()
    compInfo.components.forEach(infoComp => {
      let data = this.checkComponentType(infoComp)
      if (infoComp === 'bodyInfo') {
        data.list.push(_.cloneDeep(defaultBodyObj))
      }
      // if(infoComp === 'buttonsInfo'){
      //   data = button.changeCount(2, data)
      // }
      ObjData.push(data)
    })
    return ObjData
  },

  addComponentInputObj(compo) {
    let compInfo = this.getComponentInfo(compo)
    let objData = this.initComponent(compInfo)
    if (compo === 'Thumbnail') {
      objData = this.addSubDetail(compo, objData)
    } else if (compo.includes('Table') || compo === 'TitleDesc') {
      objData = this.addSubDetail(compo, objData)
    }
    return objData
  },

  addButtonConponentInputObj(compo, index) {
    let compInfo = this.getComponentInfo(compo)
    let objData = this.initComponent(compInfo)
    objData[0].btnList[0].id = (index * 2) - 1
    objData[0].btnList[1].id = (index * 2)
    return objData
  },

  checkComponentType(infoComp) {
    if (infoComp == 'mainImgInfo') {
      return _.cloneDeep(mainImgInfo)
    } else if (infoComp == 'titAndDescInfo') {
      return _.cloneDeep(titAndDescInfo)
    } else if (infoComp == 'bodyInfo') {
      return _.cloneDeep(bodyInfo)
    } else if (infoComp == 'buttonsInfo') {
      return _.cloneDeep(buttonsInfo)
    }
  },

  addSubDetail(type, detailInfo) {
    let limit = 0
    let listIndex = 0
    if (type.includes('Table')) {
      limit = 10
      listIndex = 1

      detailInfo[listIndex].minCnt = 1
      detailInfo[listIndex].maxCnt = limit
    } else if (type == 'ThumbDesc') {
      limit = 5

      detailInfo[listIndex].minCnt = 2
      detailInfo[listIndex].maxCnt = limit
    } else if (type == 'Thumbnail') {
      limit = 3

      detailInfo[listIndex].minCnt = limit
      detailInfo[listIndex].maxCnt = limit
    } else if (type == 'TitleDesc') {
      limit = 5
      listIndex = 1

      detailInfo[listIndex].minCnt = 2
      detailInfo[listIndex].maxCnt = limit
    }

    if (detailInfo[listIndex].list.length <= limit) {
      if (type == 'Thumbnail') {
        while (detailInfo[listIndex].list.length < limit) {
          detailInfo[listIndex].list.push(_.cloneDeep(defaultBodyObj))
        }
      }
      return detailInfo
    } else {
      alert('최대 갯수 이상으로 생성할 수 없습니다.')
      return false
    }
  },

  deleteSubDetail(detailInfo) {
    if (detailInfo.list.length > 2) {
      detailInfo.list.pop()
      return detailInfo
    } else {
      alert('최소 셀 갯수는 2개입니다.')
      return false
    }
  }

}

export default componentUtils
