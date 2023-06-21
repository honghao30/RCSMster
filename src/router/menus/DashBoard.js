// 대시보드
import DashBoard from '@/views/dashboard/dashboard'
// 브랜드 대시보드
import BrandDashboard from '@/views/brand/dashboard/BrandDashboard'

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
  }
]
