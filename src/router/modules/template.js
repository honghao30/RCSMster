import RouterSection from '@/Layout/components/RouterSection.vue'
export default {
  path: '/template',
  name: 'template',
  component: RouterSection,
  children: [
    {
      path: 'list/:brandId',
      name: 'templateList',
      component: () => import('@/views/brand/message/template/TemplateMsgList'),
      meta: {
        loginRequired: true,
        title: '템플릿 홈',
        breadcrumb: false
      }
    },
    {
      path: 'create/:brandId',
      name: 'createTemplate',
      component: () => import('@/views/brand/message/template/TemplateRegistration'),
      meta: {
        loginRequired: true,
        title: '템플릿 생성',
        breadcrumb: false
      }
    },
    {
      path: 'edit/:tplId',
      name: 'editTemplate',
      component: () => import('@/views/brand/message/template/TemplateRegistration'),
      meta: {
        loginRequired: true,
        title: '템플릿 수정',
        breadcrumb: false
      }
    }
  ]
}
