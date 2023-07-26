import RouterSection from '@/Layout/components/RouterSection.vue'

export default {
  path: '/brand/:brandId/feed',
  name: 'feed',
  component: RouterSection,
  children: [
    {
      name: 'feedReg',
      path: 'reg',
      component: () => import('@/views/brand/feed/feedReg.vue'),
      meta: { loginRequired: true, breadcrumb: false }
    },
    {
      name: 'feedInit',
      path: 'init',
      component: () => import('@/views/brand/feed/feedInit.vue'),
      meta: { loginRequired: true, breadcrumb: false }
    }
  ]
}
