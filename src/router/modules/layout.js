import RouterSection from '@/Layout/components/RouterSection.vue'
export default {
  path: '/layout',
  name: 'layout',
  component: RouterSection,
  children: [
    {
      path: 'list/:brandId',
      name: 'layoutList',
      component: () => import('@/views/brand/message/layout/LayoutList'),
      meta: {
        loginRequired: true,
        title: '레이아웃 홈',
        breadcrumb: false
      }
    },
    {
      path: 'create/:brandId',
      name: 'createLayout',
      component: () => import('@/views/brand/message/layout/LayoutRegistration'),
      meta: {
        loginRequired: true,
        title: '레이아웃 홈',
        breadcrumb: false
      }
    },
    // {
    //   path: 'edit/:messagebaseFormId',
    //   name: 'editTemplate',
    //   component: () => import('@/views/brand/brand/form/form.vue'),
    //   meta: {
    //     loginRequired: true,
    //     title: '템플릿 수정',
    //     breadcrumb: false
    //   }
    // }
  ]
}
