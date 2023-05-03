import requestMobile from '@/utils/requestMobile'
import { isUseAPI } from '@/utils/check'

// 유효한 브랜드/챗봇 정보인지 확인
export function checkBrandInfo(brandId, chatbotId) {
  if (isUseAPI) {
    return requestMobile({
      url: `/bh/${brandId}/${chatbotId}/chk`,
      method: 'get',
      meta: { useErrorMessage: false }
    })
  }
}

// 브랜드 홈 정보 수정 요청
export function addVoc(brandId, chatbotId, params) {
  if (isUseAPI) {
    return requestMobile({
      url: `/bh/${brandId}/${chatbotId}/voc`,
      method: 'post',
      data: params,
      meta: { useErrorMessage: false }
    })
  }
}
