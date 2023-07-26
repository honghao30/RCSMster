import RouterSection from '@/Layout/components/RouterSection.vue'

export default {
  path: '/brand/:brandId/autoReplyMsg',
  name: 'autoreplymsg',
  component: RouterSection,
  children: [
    {
      name: 'autoreplymsglist',
      path: 'list',
      component: () => import('@/views/brand/autoreply/autoReplyMsgList.vue'),
      meta: { loginRequired: true, breadcrumb: false }
    },
    {
      name: 'autoreplymsgDetail',
      path: ':autoReplyMsgId/detail',
      component: () => import('@/views/brand/autoreply/autoReplyMsgDetail.vue'),
      meta: { loginRequired: true, breadcrumb: false }
    },
    {
      name: 'autoreplymsgMod',
      path: ':autoReplyMsgId/edit',
      component: () => import('@/views/brand/autoreply/autoReplyMsgReg.vue'),
      meta: { loginRequired: true, breadcrumb: false }
    },
    {
      name: 'autoreplymsgReg',
      path: 'create',
      component: () => import('@/views/brand/autoreply/autoReplyMsgReg.vue'),
      meta: { loginRequired: true, breadcrumb: false }
    }
  ]
}
