import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'

// login 검증을 위함
import { getToken } from '@/utils/token'

import NotFound from '@/views/errors/404.vue'
// import ServerError from '@/views/errors/500.vue'

// 파일 링크
import Main from './menus/Main'
import PubGuides from './menus/guide'
import Join from './menus/join'
import CsList from './menus/CsList'
import MypageList from './menus/MypageList'
import BrandList from './menus/BrandList'
import ChatroomList from './menus/ChatroomList'
import DashBoard from './menus/DashBoard'
import ChatMsgList from './menus/ChatMsgList'
import InfoList from './menus/InfoList'
import Partner from './menus/Partner'
import Service from './menus/Service'

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
      path: '*',
      component: NotFound,
      meta: {
        headerView: false,
        FooterView: false,
        respons: true
      }
    },
    ...Main, // 퍼블 가이드
    ...Join, // 로그인,가입
    ...CsList, // 고객센터, 알림
    ...MypageList, // 마이페이지
    ...BrandList, // 브랜드 개설, 홈, 수정,브랜드 소식
    ...ChatroomList, // 대화방, 대화방 메뉴
    ...DashBoard, // 대시보드(기업,브랜드,선거)
    ...ChatMsgList, // 챗붓,템플릿
    ...InfoList, // 통계,
    ...Partner, // 파트너사 소개, 기술지원
    ...Service // RCS 특장점, 이용 가이드
  ],
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash,
        behavior: 'smooth',
        offset: { x: 0, y: 100 }
      }
    }
    return { x: 0, y: 0 } // Go to the top of the page if no hash
  }
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
