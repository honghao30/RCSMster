import RouterSection from '@/Layout/components/RouterSection.vue'

export default {
  path: '/corp/:corpId',
  name: 'corp',
  component: RouterSection,
  children: [
    {
      name: 'corpDashboardUrl',
      path: 'dashboard',
      component: () => import('@/views/dashboard/dashboard.vue'),
      meta: { loginRequired: true, breadcrumb: false }
    },
    {
      name: 'corpManageUrl',
      path: 'brandManage',
      component: () => import('@/views/dashboard/dashboardOperationManage.vue'),
      meta: { loginRequired: true, breadcrumb: false }
    },
    {
      name: 'corpHistory',
      path: ':userType/:corpAdmYn/corpHistory',
      component: () => import('@/views/dashboard/dashboardCorpHistory.vue'),
      meta: { loginRequired: true, breadcrumb: false }
    }
  ]
}
