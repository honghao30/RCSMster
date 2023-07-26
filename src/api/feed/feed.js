import requestFeed from '@/utils/requestFeed'
import { isUseAPI } from '@/utils/check'

// 브랜드 목록
export function brandList(reqObj) {
  if (isUseAPI()) {
    return requestFeed({
      url: '/brand',
      method: 'get',
      meta: { useErrorMessage: false }
    })
  }
}

// 대시보드 소식 현황
export function feedStatus(reqObj) {
  if (isUseAPI()) {
    return requestFeed({
      url: '/dashboard/reg',
      method: 'get',
      meta: { useErrorMessage: false }
    })
  }
}

// 대시보드 최근 개시
export function newFeed(reqObj) {
  if (isUseAPI()) {
    return requestFeed({
      url: '/dashboard/newfeed',
      method: 'get',
      meta: { useErrorMessage: false }
    })
  }
}

// 대시보드 고객 반응 현황
export function custReactStatus(reqObj) {
  if (isUseAPI()) {
    return requestFeed({
      url: '/dashboard/cust',
      method: 'get',
      meta: { useErrorMessage: false }
    })
  }
}

// 소식목록
export function getFeedList(reqObj) {
  if (isUseAPI()) {
    return requestFeed({
      url: '/brand/feed',
      method: 'get',
      params: reqObj,
      meta: { useErrorMessage: false }
    })
  }
}

// 소식상세
export function feedDetail(brandId, feedId) {
  if (isUseAPI()) {
    return requestFeed({
      url: `/brand/${brandId}/feed/${feedId}`,
      method: 'get',
      meta: { useErrorMessage: false }
    })
  }
}

// 소식상세 / 소식변경이력
export function feedUpdateHistory(brandId, feedId) {
  if (isUseAPI()) {
    return requestFeed({
      url: `/brand/${brandId}/feed/${feedId}/hist`,
      method: 'get',
      meta: { useErrorMessage: false }
    })
  }
}

// 소식수정
export function feedUpdate(brandId, feedId, reqObj) {
  if (isUseAPI()) {
    return requestFeed({
      url: `/brand/${brandId}/feed/${feedId}`,
      headers: { 'Content-Type': 'application/json' },
      method: 'put',
      data: reqObj,
      meta: { useErrorMessage: false }
    })
  }
}

// 소식 고정소식 여부 확인
export function feedPinCheck(brandId) {
  if (isUseAPI()) {
    return requestFeed({
      url: `/brand/${brandId}/pin`,
      method: 'get',
      meta: { useErrorMessage: false }
    })
  }
}

// 소식삭제
export function feedRemove(brandId, feedId) {
  if (isUseAPI()) {
    return requestFeed({
      url: `/brand/${brandId}/feed/${feedId}`,
      headers: { 'Content-Type': 'application/json' },
      method: 'delete',
      meta: { useErrorMessage: false }
    })
  }
}

// 소식등록 / 등록된 소식 건수
export function getFeedCnt(brandId) {
  if (isUseAPI()) {
    return requestFeed({
      url: `/brand/${brandId}/feedcnt`,
      method: 'get',
      meta: { useErrorMessage: false }
    })
  }
}

// 소식등록 / 브랜드 승인 가능 여부
export function getBrandStatus(brandId) {
  if (isUseAPI()) {
    return requestFeed({
      url: `/brand/${brandId}/aprv`,
      method: 'get',
      meta: { useErrorMessage: false }
    })
  }
}

// 소식등록 / share 타입 URL 입력시
export function getOgTagInfo(url) {
  if (isUseAPI()) {
    return requestFeed({
      url: '/metaTag/' + encodeURIComponent(url),
      method: 'get',
      meta: { useErrorMessage: false }
    })
  }
}
// 소식등록 / 이미지 파일 업로드
export function fileUpload(brandId, reqObj) {
  if (isUseAPI()) {
    return requestFeed({
      url: `/brand/${brandId}/feed/file`,
      method: 'post',
      data: reqObj,
      meta: { useErrorMessage: false }
    })
  }
}
// 소식등록
export function createFeed(brandId, reqObj) {
  if (isUseAPI()) {
    return requestFeed({
      url: `/brand/${brandId}/feed`,
      method: 'post',
      headers: { 'Content-Type': 'multipart/form-data' },
      // headers: { 'Content-Type': 'application/json' },
      data: reqObj,
      meta: { useErrorMessage: false }
    })
  }
}

// 소식통계목록 메인
export function statMain(reqObj) {
  if (isUseAPI()) {
    return requestFeed({
      url: '/brand/feed/stat/main',
      method: 'get',
      params: reqObj,
      meta: { useErrorMessage: false }
    })
  }
}

// 소식통계목록 상세
export function statFeed(reqObj) {
  if (isUseAPI()) {
    return requestFeed({
      url: '/brand/feed/stat/feed',
      method: 'get',
      params: reqObj,
      meta: { useErrorMessage: false }
    })
  }
}

// 소식통계목록 슬라이드상세
export function statSlide(reqObj) {
  if (isUseAPI()) {
    return requestFeed({
      url: '/brand/feed/stat/slide',
      method: 'get',
      params: reqObj,
      meta: { useErrorMessage: false }
    })
  }
}

// 소식통계목록 메인
export function statInit(reqObj) {
  if (isUseAPI()) {
    return requestFeed({
      url: '/brand/feed/stat/init',
      method: 'get',
      params: reqObj,
      meta: { useErrorMessage: false }
    })
  }
}

// 소식등록 / 브랜드 승인 가능 여부
export function getAlimpan(brandId) {
  if (isUseAPI()) {
    return requestFeed({
      url: `/brand/${brandId}/init`,
      method: 'get',
      meta: { useErrorMessage: false }
    })
  }
}

export function editAlimpan(brandId, data) {
  if (isUseAPI()) {
    return requestFeed({
      url: `/brand/${brandId}/init`,
      headers: { 'Content-Type': 'application/json' },
      method: 'put',
      data: data,
      meta: { useErrorMessage: false }
    })
  }
}

export function updateDisplayFeed(brandId, feedId, params) {
  if (isUseAPI()) {
    return requestFeed({
      url: `/brand/${brandId}/feed/${feedId}/displayFeed`,
      headers: { 'Content-Type': 'application/json' },
      method: 'put',
      data: params,
      meta: { useErrorMessage: false }
    })
  }
}
