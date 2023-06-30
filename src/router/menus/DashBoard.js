// 대시보드
import DashBoard from '@/views/dashboard/dashboard'

// 브랜드 대시보드
import BrandDashboard from '@/views/brand/dashboard/BrandDashboard'

// 선거 대시보드
import ElectionDashboard from '@/views/dashboard/ElectionDashboard'
import OperatingBrandList from '@/views/dashboard/OperatingBrandList'
import ChatroomOpen from '@/views/brand/chatroom/ElectionChatroomOpen'

// 전체브랜드 운영관리
import dashboardOperationManage from '@/views/dashboard/dashboardOperationManage'

// 운영 히스토리
import ManageHistory from '@/views/dashboard/ManageHistory'

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
      tittle: '브랜드 대시보드 > 전체목록',
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
  },
  {
    path: '/ChatroomOpen',
    component: ChatroomOpen,
    meta: {
      tittle: '선거 대시보드 > 대화방 개설',
      breadcrumb: false
    }
  },
  // 전체브랜드 운영관리
  {
    path: '/dashboardOperationManage',
    component: dashboardOperationManage,
    meta: {
      tittle: '전체브랜드 운영관리',
      breadcrumb: false
    }
  },
  // 운영 히스토리
  {
    path: '/ManageHistory',
    component: ManageHistory,
    meta: {
      tittle: '운영 히스토리',
      breadcrumb: false
    }
  }
]
