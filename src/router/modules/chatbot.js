import RouterSection from '@/Layout/components/RouterSection.vue'
export default {
  path: '/brand/:brandId/chatbot',
  name: 'chatbot',
  component: RouterSection,
  children: [
    {
      path: 'create',
      name: 'chatbotCreate',
      component: () => import(/* webpackChunkName: "join" */ '@/views/brand/chatbot/form')
    },
    {
      path: ':chatbotId/edit',
      name: 'chatbotEdit',
      component: () => import(/* webpackChunkName: "join" */ '@/views/brand/chatbot/form')
    },
    {
      path: ':chatbotId/detail',
      name: 'chatbotDetail',
      component: () => import(/* webpackChunkName: "join" */ '@/views/brand/chatbot/detail')
    },
    {
      path: ':chatbotId/regComplete',
      name: 'chatbotRegComplete',
      component: () => import(/* webpackChunkName: "join" */ '@/views/brand/chatbot/regComplete')
    },
    {
      path: 'list',
      name: 'chatbotList',
      component: () => import(/* webpackChunkName: "join" */ '@/views/brand/chatbot/list')
    },
    {
      path: ':chatbotId/massDetail',
      name: 'chatbotMassDetail',
      component: () => import(/* webpackChunkName: "join" */ '@/views/brand/chatbot/massDetail')
    },
    {
      path: 'massRegComplete',
      name: 'chatbotMassRegComplete',
      component: () => import(/* webpackChunkName: "join" */ '@/views/brand/chatbot/massRegComplete')
    }
  ]
}
