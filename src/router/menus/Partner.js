// 파트너사 소개
import partnerInfo from '@/views/partner/partnerInfo'
// 기술지원
import TechnicalSupport from '@/views/partner/TechnicalSupport'

export default [
  // 파트너사 소개
  {
    path: '/partnerInfo',
    component: partnerInfo,
    meta: {
      tittle: '파트너사 소개',
      respons: true
    }
  },
  // 기술지원
  {
    path: '/TechnicalSupport',
    component: TechnicalSupport,
    meta: {
      tittle: '기술지원',
      respons: true
    }
  }
]
