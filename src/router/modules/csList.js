import RouterSection from '@/Layout/components/RouterSection'
// import Faq from '@/views/cs/Faq'
// import Notice from '@/views/cs/Notice'
// import NoticeDetailfrom from '@/views/cs/NoticeDetail'
// import OnlineQnaForm from '@/views/cs/OnlineQnaForm'
// import OnlineQnaList from '@/views/cs/OnlineQnaList'
// import OnlineQnaDetail from '@/views/cs/OnlineQnaDetail'

export default {
  path: '/cs',
  name: 'cs',
  component: RouterSection,
  children: [
    {
      path: 'faq',
      name: 'faq',
      // component: Faq
      component: () => import(/* webpackChunkName: "cs" */ '@/views/cs/Faq')
    },
    {
      path: 'notice',
      name: 'Notice',
      // component: Notice
      // components: {
      //   keep: Notice
      // }
      component: () => import(/* webpackChunkName: "cs" */ '@/views/cs/Notice')
    },
    {
      path: 'notice/:no',
      name: 'NoticeDetail',
      // component: NoticeDetailfrom
      component: () => import(/* webpackChunkName: "cs" */ '@/views/cs/NoticeDetail')
    },
    {
      path: 'qna/form',
      name: 'onlineqnaform',
      component: () => import(/* webpackChunkName: "cs" */ '@/views/cs/OnlineQnaForm'),
      props: true
    },
    {
      path: 'qna',
      name: 'onlineqnaList',
      component: () => import(/* webpackChunkName: "cs" */ '@/views/cs/OnlineQnaList')
    },
    {
      path: 'qna/:seq',
      name: 'onlineqnadetail',
      // component: OnlineQnaDetail
      component: () => import(/* webpackChunkName: "cs" */ '@/views/cs/OnlineQnaDetail')
    }
  ]
}
