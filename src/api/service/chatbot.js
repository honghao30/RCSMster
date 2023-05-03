import request from '@/utils/request'
import { isUseAPI } from '@/utils/check'

/** 발신번호 관리 > 목록 */
export function getChatbotList(brandId, params) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/chatbot`,
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }
}
/** 발신번호 관리 > 상세 */
export function getChatbotDetail(brandId, params) {
  if (isUseAPI()) {
    return request({
      url: `brand/${brandId}/chatbot/${params.chatbotId}`,
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }
}
/** 발신번호 관리 > 상세 - 통신가입증명원 다운로드 */
export function downloadRegCertiFile(brandId, chatbotId) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/chatbot/${chatbotId}/download`,
      method: 'get',
      responseType: 'blob',
      meta: { forBlob: true }
    })
  }
}
/** 발신번호 관리 > 대량등록 반려건 다운로드 */
export function downloadRejectMassReg(brandId, massRegSeq) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/chatbot/download/${massRegSeq}`,
      method: 'get',
      responseType: 'blob',
      meta: { forBlob: true }
    })
  }
}
/** 발신번호 관리 > 발신번호 중복체크 */
export function isDuplicateMdn(brandId, params) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/chatbot/duplicate`,
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }
}
/** 발신번호 관리 > 개별 발신번호 신규 등록(임시저장, 승인요청) */
export function addOnewayChatbot(brandId, data) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/chatbot`,
      method: 'post',
      data: data,
      meta: { userErrorMessage: false }
    })
  }
}
/** 발신번호 관리 > 개별 발신번호 수정(기등록된 데이터 임시저장, 승인요청) */
export function updateOnewayChatbot(brandId, chatbotId, data) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/chatbot/${chatbotId}`,
      method: 'put',
      data: data,
      meta: { useErrorMessage: false }
    })
  }
}
/** 발신번호 관리 > 대량 발신번호 신규 등록(승인요청) */
export function addMassOnewayChatbot(brandId, data) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/chatbot/upload`,
      method: 'post',
      data: data,
      meta: { userErrorMessage: false }
    })
  }
}
/** 발신번호 관리 > 전시, 비전시 & 양방향 대화방 > 다수 단방향 전환 */
export function updateChatbotInfo(brandId, data) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/chatbot`,
      method: 'put',
      data: data,
      meta: { useErrorMessage: false }
    })
  }
}
/** 발신번호 관리 > 삭제 전 회신번호 여부 체크  */
export function isSubNumChatbots(brandId, param) {
  if (isUseAPI()) {
    return request({
      url: `brand/${brandId}/chatbot/hasTwoway`,
      method: 'get',
      params: param,
      meta: { useErrorMessage: false }
    })
  }
}
/** 발신번호 관리,양방향대화방 목록 > (체크항목) 삭제 */
// > 삭제 불가: 회신번호로 지정된 번호, 상태(승인완료/수정승인반려/저장/미승인반려)
export function deleteChatbots(brandId, data) {
  if (isUseAPI()) {
    return request({
      url: `brand/${brandId}/chatbot`,
      method: 'delete',
      data: data,
      meta: { useErrorMessage: false }
    })
  }
}
/** 발신번호 관리 > 개별 삭제 */
export function deleteChatbot(brandId, data) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/chatbot/${data.chatbotId}`,
      method: 'delete',
      data: data,
      meta: { useErrorMessage: false }
    })
  }
}
/** 발신번호 관리 > 대량등록건 삭제 */
export function deleteMassChatbot(brandId, data) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/chatbot/mass/${data.massRegSeq}`,
      method: 'delete',
      data: data,
      meta: { useErrorMessage: false }
    })
  }
}
/** 발신번호/양방향 대화방 > 승인요청 취소 */
export function applyCancelChatbot(brandId, chatbotId) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/chatbot/${chatbotId}/cancel`,
      method: 'put',
      meta: { useErrorMessage: false }
    })
  }
}

/** 양방향 대화방 > 목록 */
export function getTwowayChatbotList(brandId, params) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/twoway`,
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }
}
/** 양방향 대화방 > 상세 */
export function getTwowayChatbotDetail(brandId, params) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/twoway/${params.chatbotId}`,
      method: 'get',
      params: params,
      meta: { userErrorMessage: false }
    })
  }
}
/** 양방향 대화방 > 챗봇ID 중복체크 */
export function isDuplicateChatbotId(brandId, params) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/twoway/duplicate`,
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }
}
/** 양방향 대화방 > 승인요청,저장(신규: 챗봇ID기반 양방향 대화방) */
export function addTwowayChatbot(brandId, data) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/twoway`,
      method: 'post',
      data: data,
      meta: { useErrorMessage: false }
    })
  }
}
/** 양방향 대화방 > 수정(발신번호 기반 대화방 생성) */
export function updateTwowayChatbot(brandId, data) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/twoway/${data.chatbotId}`,
      method: 'put',
      data: data,
      meta: { useErrorMessage: false }
    })
  }
}
/** 양방향 대화방 > 랜덤 botID 생성 */
export function getRandomChatbotId(brandId, params) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/twoway/id`,
      method: 'get',
      meta: { useErrorMessage: false }
    })
  }
}
/** 양방향 대화방 > 단방향 대화방 목록 조회 */
export function getOnewayChatbotList(brandId, params) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/chatbot/mdnpop`,
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }
}

/** 양방향 대화방 > 개별 단방향 전환 */
export function convertChatbotOneway(brandId, data) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/twoway/${data.chatbotId}`,
      method: 'delete',
      data: data,
      meta: { useErrorMessage: false }
    })
  }
}
/** 양방향 대화방 > 브랜드의 챗봇 대행사 목록 */
export function getBrandChatAgencyInfo(brandId, params) {
  if (isUseAPI()) {
    return request({
      url: `brand/${brandId}/agency`,
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }
}
/** 양방향 대화방 > 대행사의 중계사 목록 */
export function getMappingAgencyInfo(brandId, params) {
  if (isUseAPI()) {
    return request({
      url: `/brand/chat/agency/pop/${brandId}`,
      method: 'get',
      params: params,
      meta: { useErrorMessage: false }
    })
  }
}
/** 넘겨준 번호의 전시 상태를 리턴해준다. */
export function getSubNumDisplayStatus(brandId, param) {
  if (isUseAPI()) {
    return request({
      url: `/brand/${brandId}/chatbot/display`,
      method: 'get',
      params: param,
      meta: { useErrorMessage: false }
    })
  }
}
/** 사용자 타입, 상태에 따라 양방향 대화방 등록 가능 여부 리턴  */
export function isAvailableRegisterTwoway(brandId) {
  return new Promise(async (resolve, reject) => {
    let userType = localStorage.getItem('userType')
    let available = false
    let rcsSvc = ''
    if (userType === 'CORP') { // 기업: 양방향 서비스를 제공하는 대행사가 있는지 확인
      let res = await getBrandChatAgencyInfo(brandId, { isTwoWay: 'Y' })
      available = res.result.length > 0
    } else { // 대행사: 제공 서비스가 양방향
      rcsSvc = localStorage.getItem('rcsSvc')
      available = rcsSvc.indexOf('chat') > -1
    }
    return resolve({ available: available, userType: userType, rcsSvc: rcsSvc })
  })
}
/** 승인완료 상태의 발신번호 목록 */
function getActiveA2pChatbots (brandId) {
  let searchParam = { aprvStatus: 'OK', isTwoWay: '', searchKey: '', searchValue: '', orderKey: 'REG_DT', orderValue: 'DESC', size: 99999, page: 1 }
  return new Promise(async (resolve, reject) => {
    let res = await getChatbotList(brandId, searchParam)
    if (res.code === '20000000') {
      return resolve(res)
    } else resolve(null)
  })
}
/** 승인완료 상태의 발신번호 카운트 */
export async function getActiveA2pChatbotCnt(brandId) {
  let res = await getActiveA2pChatbots(brandId)
  if (res.code === '20000000') return Promise.resolve(Number(res.result.totalSize))
  else return Promise.resolve(false)
}
/** 승인완료 + 전시 상태의 발신번호 카운트 */
export async function getActiveAndDisplayA2pChatbotCnt(brandId) {
  let res = await getActiveA2pChatbots(brandId)
  let displayList = res.result.list.filter(x => x.display.substring(1, 2) === '1')
  if (res.code === '20000000') return Promise.resolve(displayList.length)
  else return Promise.resolve(0)
}
/** 회신번호 여부를 체크 후, 회신번호로 쓰이는 번호와 연관된 챗봇개수를 리턴한다. */
export async function filteringSubNumChatbots(brandId, param) {
  return new Promise(async (resolve, reject) => {
    let res = await isSubNumChatbots(brandId, param)
    if (res.code === '20000000') {
      let result = []
      if (res.result.length > 0) {
        for (let i = 0; i < res.result.length; i++) {
          let target = res.result[i]
          let chatbotId = Object.keys(target)
          let value = res.result[i][chatbotId[0]]
          if (value > 0) { // 회신번호로 지정된 발신번호의 경우
            result.push(target)
          }
        }
      }
      return resolve(result)
    } else {
      return resolve([])
    }
  })
}
// 대화방 초기 데이터
const chatbotData = {
  aprvRet: '',
  status: '',
  activeYn: '',
  chatbotId: '',
  subTitle: '', // 대화방 명
  display: '01', // default: 검색미허용(0), 전시(1) => 01
  inputFieldYn: 'Y', // 메시지 입력란 사용 여부(default: 사용)
  fileName: '' // 통신서비스 가입증명원 - 파일명
}
// * 단방향 대화방 초기 데이터
export function getOnewayInitialData() {
  let data = {
    mdn: '',
    twowayYn: 'N',
    massYn: 'N', // 대량등록 여부
    rcsReply: 1 // 대표발신번호 문자서비스 사용 여부 (1:미사용/0:사용)
  }
  return { ...chatbotData, ...data }
}
// * 양방향 대화방 초기 데이터
export function getTwowayInitialData(svcType) {
  let data = {
    twowayYn: 'Y',
    subNum: '', // 발신번호/회신번호
    service: svcType, // 생성기반(a2p / chat)
    agencyNm: '', // 대행사명
    agencyId: '', // 대행사 아이디
    botAgencyId: '',
    webhook: '' // 챗봇응답 URL
  }
  return { ...chatbotData, ...data }
}
