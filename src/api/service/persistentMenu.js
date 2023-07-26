import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

/** 대화방 메뉴 > 목록(검색) */
export function getPersistentList(brandId, params) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/psmenu`,
      method: 'get',
      params: params,
      meta: { userErrorMessage: false }
    })
  }
}
/** 대화방 메뉴 > 등록/수정 */
export function updatePersistentMenu(brandId, data) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/${data.chatbotId}/psmenu/`,
      method: 'post',
      data: data,
      meta: { userErrorMessage: false }
    })
  }
}
/** 대화방 메뉴 > 삭제  */
export function deletePersistentMenu(brandId, data) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/${data.chatbotId}/psmenu`,
      method: 'delete',
      data: data,
      meta: { userErrorMessage: false }
    })
  }
}
/** 대화방 메뉴 > 상세 조회 */
export function getPersistentDetail(brandId, params) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/${params.chatbotId}/psmenu/`,
      method: 'get',
      params: params,
      meta: { userErrorMessage: false }
    })
  }
}
/** 대화방 메뉴 기본 형태 */
const defMenu = {
  ordNo: 1, // 메뉴 순번
  title: '', // 대화방메뉴 명
  type: '', // 응답유형
  postbackId: '',
  armId: '', // 자동응답 메시지 id(기 등록 자동응답 메시지 선택시)
  armIdName: '', // 자동응답 메시지 명(기 등록 자동응답 메시지 선택시)
  dialPhoneNumber: { phoneNumber: '' }, // 전화걸기
  basic: { openUrl: { url: '' } },
  feed: { openUrl: { url: '' } },
  isLoadAutoReply: '' // 자동응답 선택(Y:선택/N:직접입력)
}
export function getMenuObj(opt) {
  let menu = _.cloneDeep(defMenu)
  if (opt.useSubMenu) {
    menu.selectedSubMenuIdx = 0
    menu.subMenu = []
    menu.subMenu.push(_.cloneDeep(defMenu))
  }
  return menu
}
/** 대화방 메뉴 > 초기 데이터 */
export function initialPersistentMenu() {
  let menus = []
  let menu = getMenuObj({ useSubMenu: true })
  menus.push(menu)
  return menus
}
// 넘어온 상위/하위 메뉴로 메뉴 정보를 만들어서 넘겨준다.
export function parsePersistentMenu(topList, subList) {
  let menus = []
  topList.forEach(top => {
    let actionToJson = !jglib.isEmpty(top.action) ? JSON.parse(top.action) : ''
    // 기본 데이터 set
    let menu = _.cloneDeep(defMenu)
    menu.ordNo = top.ordNo.substring(0, 1)
    menu.title = top.title
    menu.postbackId = top.postbackId
    menu.subMenu = []
    menu.selectedSubMenuIdx = 0
    // 대화방 메뉴의 응답유형에 따라 데이터 set
    if (top.type === 'reply') { // 챗봇응답 or 자동응답 선택
      if (jglib.isEmpty(top.armId)) menu.type = 'basic_reply'
      else {
        menu.type = 'auto_reply'
        menu.armId = top.armId
        menu.armIdName = top.armIdName
        menu.isLoadAutoReply = 'Y' // 상세 데이터 불러올경우, 자동응답메시지가 있으면 '선택'에 체크되도록
      }
    } else if (top.type === 'action') { // 버튼 액션
      if (top.actType === 'dialerAction') {
        menu.type = 'dial_phone_number'
        menu.dialPhoneNumber.phoneNumber = actionToJson.dialerAction.dialPhoneNumber.phoneNumber // 전화걸기
      } else if (top.actType === 'urlAction') {
        menu.type = 'basic_url_action'
        menu.basic.openUrl.url = actionToJson.urlAction.openUrl.url
      }
    } else if (top.type === 'feed') {
      if (top.actType === 'urlAction') {
        menu.type = 'feed_url_action'
        menu.feed.openUrl.url = actionToJson.urlAction.openUrl.url
      }
    } else { // 하위메뉴
      menu.type = 'sub_menu'
      let targetSubList = subList.filter(sub => sub.upPostbackId === top.postbackId) // 현재 메뉴의 하위 메뉴로 들어가있는 메뉴의 목록
      targetSubList.forEach(sub => {
        let subActionToJson = !jglib.isEmpty(sub.action) ? JSON.parse(sub.action) : ''
        let subMenu = _.cloneDeep(defMenu)
        subMenu.title = sub.title
        if (sub.type === 'reply') {
          if (jglib.isEmpty(sub.armId)) subMenu.type = 'basic_reply'
          else {
            subMenu.type = 'auto_reply'
            subMenu.armId = sub.armId
            subMenu.armIdName = sub.armIdName
            subMenu.isLoadAutoReply = 'Y' // 상세 데이터 불러올경우, 자동응답메시지가 있으면 '선택'에 체크되도록
          }
        } else {
          if (sub.actType === 'dialerAction') {
            subMenu.type = 'dial_phone_number'
            subMenu.dialPhoneNumber.phoneNumber = subActionToJson.dialerAction.dialPhoneNumber.phoneNumber
          }
        }
        menu.subMenu.push(subMenu)
      })
    }
    menus.push(menu)
  })
  return menus
}
