import RouterSection from '@/Layout/components/RouterSection.vue'

export default {
  path: '/brand/:brandId',
  name: 'psmenu',
  component: RouterSection,
  children: [
    {
      path: 'psmenu',
      name: 'ChatRoomMenuList',
      component: () => import('@/views/brand/chatroom/ChatRoomMenuList'),
      meta: {
        breadcrumb: false,
        loginRequired: true
      }
    },
    {
      path: ':chatbotId/psmenu',
      name: 'ChatRoomMenuView',
      component: () => import('@/views/brand/chatroom/ChatRoomMenuView'),
      meta: {
        breadcrumb: false,
        loginRequired: true
      }
    },
    {
      path: ':chatbotId/psmenu/write',
      name: 'ChatRoomMenuWrite',
      component: () => import('@/views/brand/chatroom/ChatRoomMenuViewWrite.vue'),
      meta: {
        breadcrumb: false,
        loginRequired: true
      }
    }
  ]
}
