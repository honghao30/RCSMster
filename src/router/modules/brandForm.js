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
    }
  ]
}
