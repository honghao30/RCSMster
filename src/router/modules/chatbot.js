import RouterSection from '@/Layout/components/RouterSection.vue'
export default {
  path: '/brand/:brandId/chatbot',
  name: 'chatbot',
  component: RouterSection,
  children: [
    {
      path: 'create',
      name: 'createChatbot',
      component: () => import(/* webpackChunkName: "join" */ '@/views/brand/autoreply/autoReplyMsgReg.vue')
    }
  ]
}
