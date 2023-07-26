import RouterSection from '@/Layout/components/RouterSection.vue'
export default {
  path: '/brand',
  name: 'brand',
  component: RouterSection,
  children: [
    {
      path: 'create',
      name: 'createBrand',
      component: () => import('@/views/brand/brand/form/form.vue'),
      meta: {
        loginRequired: true,
        tittle: '브랜드 개설 > 기본정보 입력',
        breadcrumb: false
      }
    },
    {
      path: ':brandId/edit',
      name: 'editBrand',
      component: () => import('@/views/brand/brand/form/form.vue'),
      meta: {
        loginRequired: true,
        tittle: '브랜드 수정 > 기본정보 입력',
        breadcrumb: false
      }
    },
    {
      path: ':brandId/detail',
      name: 'detailBrand',
      component: () => import('@/views/brand/brand/detail/detail.vue'),
      meta: {
        loginRequired: true,
        tittle: '브랜드 홈',
        breadcrumb: false
      }
    },
    {
      path: 'manage/:brandId',
      name: 'brandManage',
      component: () => import('@/views/brand/manage/brandManage.vue'),
      meta: {
        loginRequired: true,
        tittle: '브랜드 운영 관리',
        breadcrumb: false
      }
    },
    {
      path: 'dashboard/:brandId',
      name: 'brandDashboard',
      component: () => import('@/views/brand/dashboard/BrandDashboard.vue'),
      meta: {
        loginRequired: true,
        tittle: '브랜드 대시보드',
        breadcrumb: false
      }
    },
    {
      path: 'history/:brandId',
      name: 'brandHistory',
      component: () => import('@/views/brand/manage/OperationHistory.vue'),
      meta: {
        loginRequired: true,
        tittle: '브랜드 작업 이력',
        breadcrumb: false
      }
    },
    {
      path: 'safty/:brandId',
      name: 'saftyManage',
      component: () => import('@/views/brand/manage/SaftyManage.vue'),
      meta: {
        loginRequired: true,
        tittle: '안심 마크 관리',
        breadcrumb: false
      }
    }
  ]
}
