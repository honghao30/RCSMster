import moment from 'moment/moment'

let slide = {
  slideIndex: '1',
  type: 'gallery',
  slideTitle: '',
  slideDescription: '',
  isActive: true,
  title: '',
  description: '',
  media: [
    {
      fileId: '', // 파일 아이디
      file: '', // 슬라이드 이미지형 이미지 파일
      fileName: '', // 슬라이드 이미지형 이미지 명
      orderNo: 1, // 순서
      url: '' // 슬라이드 이미지형 이미지 url
    }
  ],
  share: {
    imageUrl: '', // 쉐어형 url 문자열
    snsLink: '',
    title: ''
  },
  btnUse: '0',
  buttons: [{
    btnName: '',
    btnType: '',
    url: '',
    app: {
      url: '',
      packageName: '',
      scheme: ''
    },
    chatRoom: '',
    call: '',
    isActive: true
  }]
}
let formatStr = 'YYYY년 MM월 DD일 hh:mm'
let nowStr = moment().format(formatStr)
const feedObj = {
  form: {
    feedId: '',
    switch: true,
    type: 'gallery',
    title: '',
    updateDate: nowStr,
    description: '',
    btnUse: '',
    media: [], // gallery 타입 업로드용 파일정보
    btnUseLen: '0',
    imgFiles: [],
    url: '',
    buttons: [],
    isSavedbuttonList: [],
    publishType: 'publish',
    resvDate: '',
    resvTime: '',
    pinYn: false,
    slide: [JSON.parse(JSON.stringify(slide))],
    share: {
      imageUrl: '',
      snsLink: '',
      title: ''
    }
  },
  slide: JSON.parse(JSON.stringify(slide)),
  btn: {
    btnName: '',
    btnType: 'url',
    btnOtherType: '',
    link: '',
    orderNo: '',
    btnTypeQuck: '',
    btnEvent: '',
    url: '',
    app: {
      url: '',
      packageName: '',
      scheme: ''
    },
    message: {
      call: '',
      content: ''
    },
    chatRoom: '',
    call: ''
  },
  formatStr: formatStr
}

export default feedObj
