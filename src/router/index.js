import Vue from 'vue'
import Router from 'vue-router'
import NotFound from '@/views/errors/404.vue'
import ServerError from '@/views/errors/500.vue'
// import Login from '@/Layout/components/Login'
// import AuthNum from '@/Layout/components/AuthNum'
// import AuthNumAgency from '@/Layout/components/AuthNumAgency'
// import Logout from '@/Layout/components/Logout'
import Main from '@/views/Main'
import RouterSection from '@/Layout/components/RouterSection'
import store from '@/store'

// login 검증을 위함
import { getToken } from '@/utils/token'

// 내부 router들 정의
import mobileList from './modules/mobileList'
import introList from './modules/introList'
import serviceList from './modules/serviceList'
import csList from './modules/csList'
import utilityList from './modules/utilityList'
import joinList from './modules/joinList'
import termsList from './modules/termsList'
import feedList from './modules/feedList'

Vue.use(Router)

/**
 * name 작성 시 유념 사항
 * 1. name은 고유 값이어야 합니다.
 * 2. router 내 name과 .vue 내부의 name은 동일해야 합니다.
 */

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: RouterSection,
      redirect: { name: 'main' },
      children: [
        {
          path: 'main',
          name: 'main',
          component: Main,
          meta: {}
        },
        {
          path: 'login',
          name: 'login',
          // component: Login,
          component: () => import(/* webpackChunkName: "login" */ '@/Layout/components/Login'),
          meta: {
            asideView: false,
            tagView: false,
            headerView: true,
            footerView: true
          },
          props: true
        },
        {
          path: 'authNum',
          name: 'authNum',
          // component: AuthNum,
          component: () => import(/* webpackChunkName: "login" */ '@/Layout/components/AuthNum'),
          meta: {},
          props: true
        },
        {
          path: 'authNumAgency',
          name: 'authNumAgency',
          // component: AuthNumAgency,
          component: () => import(/* webpackChunkName: "login" */ '@/Layout/components/AuthNumAgency'),
          meta: {},
          props: true
        },
        {
          path: 'logout',
          name: 'logout',
          // component: Logout,
          component: () => import(/* webpackChunkName: "login" */ '@/Layout/components/Logout'),
          meta: {}
        },
        {
          path: 'server-error',
          name: 'ServerError',
          component: ServerError,
          meta: {
            headerView: false
          }
        },
        // (check) 테스트 완료 후 제거필요: 테스트용 페이지
        {
          path: 'test',
          name: 'test',
          component: () => import(/* webpackChunkName: "test" */ '@/Layout/components/Test'),
          meta: {}
        }
      ]
    },
    mobileList,
    introList,
    serviceList,
    csList,
    utilityList,
    joinList,
    termsList,
    feedList,
    {
      path: 'not-found',
      name: 'NotFound',
      component: NotFound,
      meta: {
        headerView: false
      }
    },
    {
      path: '*',
      component: NotFound,
      meta: {
        headerView: false
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
