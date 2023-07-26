// 브랜드 개설
import BrandCreateStep01 from '@/views/brand/create/BrandCreateStep01'
import BrandCreateStep02 from '@/views/brand/create/BrandCreateStep02'
import BrandCreateStep03 from '@/views/brand/create/BrandCreateStep03'
import BrandCreateStep04 from '@/views/brand/create/BrandCreateStep04'

// 브랜드 홈
import BrandHome from '@/views/brand/BrandHome'
import BrandEditHome from '@/views/brand/BrandEditHome'

// 브랜드 수정
import BrandEditStep01 from '@/views/brand/manage/BrandEditStep01'
import BrandEditStep02 from '@/views/brand/manage/BrandEditStep02'
import BrandEditStep03 from '@/views/brand/manage/BrandEditStep03'
import BrandOperationManage from '@/views/brand/manage/BrandOperationManage'
import SafetyMarkManage from '@/views/brand/manage/SafetyMarkManage'
import OperationHistory from '@/views/brand/manage/OperationHistory'

// 브랜드 소식
import FeedRegistrationBasic from '@/views/brand/feed/FeedRegistrationBasic'
import FeedRegistration from '@/views/brand/feed/FeedRegistration'

export default [
  // 브랜드 개설
  {
    path: '/brandcreatestep01',
    component: BrandCreateStep01,
    meta: {
      tittle: '브랜드 개설 > 기본정보 입력',
      breadcrumb: false
    }
  },
  {
    path: '/brandcreatestep02',
    component: BrandCreateStep02,
    meta: {
      tittle: '브랜드 개설 > 퀵버튼 설정',
      breadcrumb: false
    }
  },
  {
    path: '/brandcreatestep03',
    component: BrandCreateStep03,
    meta: {
      tittle: '브랜드 개설 > 브랜드 홈 탭 설정',
      breadcrumb: false
    }
  },
  {
    path: '/brandcreatestep04',
    component: BrandCreateStep04,
    meta: {
      tittle: '브랜드 개설 > 브랜드 개설 완료',
      breadcrumb: false
    }
  },
  {
    path: '/brand',
    component: BrandHome,
    meta: {
      tittle: '브랜드 홈',
      breadcrumb: false
    }
  },
  // 브랜드 수정
  {
    path: '/brandeditstep01',
    component: BrandEditStep01,
    meta: {
      tittle: '브랜드 홈 수정 > 기본정보',
      breadcrumb: false
    }
  },
  {
    path: '/brandeditstep02',
    component: BrandEditStep02,
    meta: {
      tittle: '브랜드 홈 수정 > 퀵버튼',
      breadcrumb: false
    }
  },
  {
    path: '/brandeditstep03',
    component: BrandEditStep03,
    meta: {
      tittle: '브랜드 홈 수정 > 브랜드 홈 탭 설정',
      breadcrumb: false
    }
  },
  {
    path: '/brandedithome',
    component: BrandEditHome,
    meta: {
      tittle: '브랜드 홈',
      breadcrumb: false
    }
  },
  {
    path: '/BrandOperationManage',
    component: BrandOperationManage,
    meta: {
      tittle: '브랜드 운영관리',
      breadcrumb: false
    }
  },
  {
    path: '/SafetyMarkManage',
    component: SafetyMarkManage,
    meta: {
      tittle: '안심마크 관리',
      breadcrumb: false
    }
  },
  {
    path: '/operationhistory',
    component: OperationHistory,
    meta: {
      tittle: '작업 히스토리',
      breadcrumb: false
    }
  },
  // 브랜드 소식
  {
    path: '/FeedRegistrationBasic',
    component: FeedRegistrationBasic,
    meta: {
      tittle: '브랜드 소식',
      breadcrumb: false
    }
  },
  {
    path: '/FeedRegistration',
    component: FeedRegistration,
    meta: {
      tittle: '브랜드 소식',
      breadcrumb: false
    }
  }
]
