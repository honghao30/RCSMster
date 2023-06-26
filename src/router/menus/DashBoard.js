// 대시보드
import DashBoard from '@/views/dashboard/dashboard'
// 브랜드 대시보드
import BrandDashboard from '@/views/brand/dashboard/BrandDashboard'

// 선거 대시보드
import ElectionDashboard from '@/views/dashboard/ElectionDashboard'
import OperatingBrandList from '@/views/dashboard/OperatingBrandList'

export default [
  // 대시보드
  {
    path: '/DashBoard',
    component: DashBoard,
    meta: {
      tittle: '대시보드',
      breadcrumb: false
    }
  },
  // 브랜드 대시보드
  {
    path: '/BrandDashboard',
    component: BrandDashboard,
    meta: {
      tittle: '브랜드 대시보드',
      breadcrumb: false
    }
  },
  // 선거 대시보드
  {
    path: '/ElectionDashboard',
    component: ElectionDashboard,
    meta: {
      tittle: '선거 대시보드',
      breadcrumb: false
    }
  },
  {
    path: '/OperatingBrandList',
    component: OperatingBrandList,
    meta: {
      tittle: '선거 대시보드 > 운영중 브랜드',
      breadcrumb: false
    }
  }
]
