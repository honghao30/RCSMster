import RouterSection from '@/Layout/components/RouterSection.vue'

export default {
  path: '/brand/:brandId',
  name: 'psmenu',
  component: RouterSection,
  children: [
    {
      path: 'psmenu',
      name: 'ChatRoomMenuList',
      component: () => import('@/views/brand/psmenu/ChatRoomMenuList.vue'),
      meta: {
        breadcrumb: false,
        loginRequired: true
      }
    },
    {
      path: ':chatbotId/psmenu',
      name: 'ChatRoomMenuView',
      component: () => import('@/views/brand/psmenu/ChatRoomMenuView.vue'),
      meta: {
        breadcrumb: false,
        loginRequired: true
      }
    },
    {
      path: 'psmenu/write',
      name: 'ChatRoomMenuWrite',
      component: () => import('@/views/brand/psmenu/ChatRoomMenuViewWrite.vue'),
      meta: {
        breadcrumb: false,
        loginRequired: true
      }
    },
    {
      path: ':chatbotId/psmenu/:copy',
      name: 'ChatRoomMenuCopy',
      component: () => import('@/views/brand/psmenu/ChatRoomMenuViewWrite.vue'),
      meta: {
        breadcrumb: false,
        loginRequired: true
      }
    },
    {
      path: ':chatbotId/psmenu/edit',
      name: 'ChatRoomMenuEdit',
      component: () => import('@/views/brand/psmenu/ChatRoomMenuViewWrite.vue'),
      meta: {
        breadcrumb: false,
        loginRequired: true
      }
    }
  ]
}
