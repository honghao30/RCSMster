import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'

// login 검증을 위함
import { getToken } from '@/utils/token'

// 개발 router import
import main from './modules/main'
import brand from './modules/brand'
import chatbot from './modules/chatbot'
import corp from './modules/corp'
import template from './modules/template'
import layout from './modules/layout'
import autoreplymsg from './modules/autoreplymsg'
import feed from './modules/feed'
import utility from './modules/utility'
import psmenu from './modules/psmenu'
import cs from './modules/cs'

import NotFound from '@/views/errors/404.vue'
// import ServerError from '@/views/errors/500.vue'

// 파일 링크
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

Vue.use(Router)

/**
 * name 작성 시 유념 사항
 * 1. name은 고유 값이어야 합니다.
 * 2. router 내 name과 .vue 내부의 name은 동일해야 합니다.
 */

let router = new Router({
  mode: 'history',
  routes: [
    main,
    brand,
    chatbot,
    corp,
    autoreplymsg,
    feed,
    utility,
    psmenu,
    cs,
    template,
    layout,
    {
      path: '*',
      component: NotFound,
      meta: {
        headerView: false
      }
    },
    ...PubGuides, // 퍼블 가이드
    ...Join, // 로그인,가입
    ...CsList, // 고객센터, 알림
    ...MypageList, // 마이페이지
    ...BrandList, // 브랜드 개설, 홈, 수정,브랜드 소식
    ...ChatroomList, // 대화방, 대화방 메뉴
    ...DashBoard, // 대시보드(기업,브랜드,선거)
    ...ChatMsgList, // 챗붓,템플릿
    ...InfoList, // 통계,
    ...Partner // 파트너사 소개, 기술지원
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
