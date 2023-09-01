// RCS 특장점
import Feature from '@/views/service/Feature'
// 이용 가이드
import UseGuide from '@/views/service/UseGuide'
// 기업 메시지 종류
import RcsMessageType from '@/views/service/RcsMessageType'
// 주요 기능
import KeyFeatures from '@/views/service/KeyFeatures'
// 이용 가이드 계정
import GuideAccount from '@/views/service/GuideAccount'
// 이용 가이드 브랜드
import GuideBrand from '@/views/service/GuideBrand'
// 이용 가이드 대화방
import Chatbot from '@/views/service/Chatbot'
// 서비스 이용약관
import terms from '@/views/service/terms'
// RCS 기업 메시지
import CompanyMsg from '@/views/service/CompanyMsg'

export default [
  // RCS 특장점
  {
    path: '/Feature',
    component: Feature,
    meta: {
      tittle: 'RCS 특장점',
      respons: true
    }
  },
  // 이용 가이드
  {
    path: '/UseGuide',
    component: UseGuide,
    meta: {
      tittle: '이용 가이드',
      respons: true,
      lnbIndex: 0
    }
  },
  // 주요 기능
  {
    path: '/RcsMessageType',
    component: RcsMessageType,
    meta: {
      tittle: '기업 메시지 종류',
      respons: true,
      lnbIndex: 2
    }
  },
  // 주요 기능
  {
    path: '/KeyFeatures',
    component: KeyFeatures,
    meta: {
      tittle: '주요 기능',
      respons: true,
      lnbIndex: 3
    }
  },
  // 이용 가이드 계정
  {
    path: '/GuideAccount',
    component: GuideAccount,
    meta: {
      tittle: '이용 가이드 계정',
      respons: true,
      lnbIndex: 4
    }
  },
  // 이용 가이드 브랜드
  {
    path: '/GuideBrand',
    component: GuideBrand,
    meta: {
      tittle: '이용 가이드 브랜드',
      respons: true,
      lnbIndex: 5
    }
  },
  // 이용 가이드 대화방
  {
    path: '/Chatbot',
    component: Chatbot,
    meta: {
      tittle: '이용 가이드 대화방',
      respons: true,
      lnbIndex: 7
    }
  },
  // 서비스 이용약관
  {
    path: '/terms',
    component: terms,
    meta: {
      tittle: '서비스 이용약관',
      respons: true
    }
  },
  // RCS 기업 메시지
  {
    path: '/CompanyMsg',
    component: CompanyMsg,
    meta: {
      tittle: 'RCS 기업 메시지',
      respons: true
    }
  }
]
