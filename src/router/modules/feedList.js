import RouterSection from '@/Layout/components/RouterSection'
// import FeedDashBoard from '@/views/feed/FeedDashBoard'
// import FeedList from '@/views/feed/FeedList'
// import FeedRegistration from '@/views/feed/FeedRegistration'
// import FeedDetail from '@/views/feed/FeedDetail'
// import FeedStat from '@/views/feed/FeedStat'

export default {
  path: '/feed',
  name: 'feed',
  component: RouterSection,
  children: [
    {
      path: 'dashboard',
      name: 'FeedDashboard',
      // component: FeedDashBoard,
      component: () => import(/* webpackChunkName: "feed" */ '@/views/feed/FeedDashBoard'),
      meta: { loginRequired: true }
    },
    {
      path: 'list',
      name: 'FeedList',
      // component: FeedList,
      component: () => import(/* webpackChunkName: "feed" */ '@/views/feed/FeedList'),
      meta: { loginRequired: true }
    },
    {
      path: 'reg',
      name: 'FeedRegistration',
      // component: FeedRegistration,
      component: () => import(/* webpackChunkName: "feed" */ '@/views/feed/FeedRegistration'),
      meta: { loginRequired: true }
    },
    {
      path: 'brand/:brandId/feed/:feedId',
      name: 'brand/feed',
      // component: FeedDetail,
      component: () => import(/* webpackChunkName: "feed" */ '@/views/feed/FeedDetail'),
      meta: { loginRequired: true }
    },
    {
      path: 'stat',
      name: 'FeedStat',
      // component: FeedStat,
      component: () => import(/* webpackChunkName: "feed" */ '@/views/feed/FeedStat'),
      meta: { loginRequired: true }
    }

  ]
}
