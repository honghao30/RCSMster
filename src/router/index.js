import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'

// 파일 링크
import PubGuides from '@/views/guide'
// import RullGuide from './views/guide/page/RullGuide';
// import PubList from './views/guide/page/PubList';
// import UiGuides from './views/guide/page/UiGuide';
// import NoticeView from './views/publish/customer/Notice';
// import LoginPage from './views/publish/join/LoginPage';
// import IdFind from './views/publish/join/IdFind';
// import pwFind from './views/publish/join/pwFind';
// import JoinStep01 from './views/publish/join/JoinStep01';
// import JoinStep02 from './views/publish/join/JoinStep02';
// import JoinStep03 from './views/publish/join/JoinStep03';
// import JoinStep04 from './views/publish/join/JoinStep04';
// import AgencyJoinStep01 from './views/publish/join/AgencyJoinStep01';
// import AgencyJoinStep04 from './views/publish/join/AgencyJoinStep04';

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/PubGuides',
      component: PubGuides,
      meta: {
        layout: 'GuideLayout',
        tittle: 'RCS Biz Center 가이드'
      }
    }
  ]
})

// url을 변경할 때 마다 실행되는 interceptor
// 인증 관련 interceptor는 src/auth.js에서 정의한다.
router.beforeEach((to, from, next) => {
  if (to.meta && to.meta.loginRequired && !getToken()) {
    if (to.meta.loginRedirectName) {
      let nextRoute = { name: to.meta.loginRedirectName }
      store.dispatch('SetRoute', nextRoute)
      next(nextRoute)
      return
    } else {
      let nextRoute = {
        name: 'login',
        params: { afterRouter: to }
      }
      store.dispatch('SetRoute', nextRoute)
      next(nextRoute)
      return
    }
  }
  store.dispatch('SetRoute', to)
  next()
})
  
router.afterEach((to, from) => {
    // 라우터 이동 후 상단으로 화면 이동
    window.scrollTo(0, 0)
})

export default router