// 가이드
import PubGuides from '@/views/guide'
import RullGuide from '@/views/guide/page/RullGuide'
import PubList from '@/views/guide/page/PubList'
import UiGuides from '@/views/guide/page/UiGuide'

export default [
  {
    path: '/PubGuides',
    component: PubGuides,
    meta: {
      layout: 'GuideLayout',
      tittle: 'RCS Biz Center 가이드'
    }
  },
  {
    path: '/RullGuide',
    component: RullGuide,
    meta: {
      layout: 'GuideLayout',
      tittle: 'RCS Biz Center 가이드'
    }
  },
  {
    path: '/PubList',
    component: PubList,
    meta: {
      layout: 'GuideLayout',
      tittle: 'RCS Biz Center 가이드'
    }
  },
  {
    path: '/UiGuides',
    component: UiGuides,
    meta: {
      layout: 'GuideLayout',
      tittle: 'RCS Biz Center 가이드'
    }
  }
]
