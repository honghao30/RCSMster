import { mergeDeep } from './merge'

export function getScrollOption(option) {
  if (!option) option = {}

  let defaultOps = {
    // 템플릿선택 스크롤 옵셥
    vuescroll: {
      mode: 'native', // default : native
      sizeStrategy: 'percent', // default : percent
      detectResize: true // DOM 크기 감지 여부
    },
    rail: {
      opacity: 0, // default : 0
      size: '6px', // 가로크기, default : 6px
      specifyBorderRadius: false, // default : false
      gutterOfEnds: '2px', // X축, Y축 양 끝에서의 거리, default : 2px
      gutterOfSide: '2px', // 컨테이너 측면으로부터 거리, default : 2px
      keepShow: false // 레일을 계속 보여줄지 여부, default : false
    },
    bar: {
      onlyShowBarOnScroll: true, // 스크롤하는 동안 막대 만 표시, default : true
      keepShow: true, // 계속 보여줄지 여부, default : false
      background: '#656a76', // @subColor_05
      opacity: 0.3,
      hoverStyle: false,
      specifyBorderRadius: false, // 막내의 테두리 반경, default : false(string으로 지정)
      minSize: 0, // bar의 최소 크기 0~1, default : 0
      size: '5px', // default : 6px
      disable: false // bar 사용안함, default : false
    },
    // 스크롤 좌우 버튼
    scrollButton: {
      enable: false // 사용 가능 여부 default : false
    },
    scrollPanel: {
      // 기본은 세로 스크롤만 가능
      scrollingY: true, // 스크롤 할 것인지 여부, default : true
      scrollingX: false // 스크롤 할 것인지 여부, default : true
    }
  }

  return mergeDeep(defaultOps, option)
}
