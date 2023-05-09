import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'

// 파일 링크
// 가이드
import PubGuides from '@/views/guide'
import RullGuide from '@/views/guide/page/RullGuide'
import PubList from '@/views/guide/page/PubList'
import UiGuides from '@/views/guide/page/UiGuide'

// 로그인
import LoginPage from '@/views/publish/join/LoginPage'
import IdFind from '@/views/publish/join/IdFind'
import pwFind from '@/views/publish/join/pwFind'
import IdResult from '@/views/publish/join/IdResult'
import PwReset from '@/views/publish/join/PwReset'
import PwChange from '@/views/publish/join/PwChange'
import SignUp from '@/views/publish/join/SignUp'

// 가입
import JoinStep01 from '@/views/publish/join/JoinStep01'
import JoinStep02 from '@/views/publish/join/JoinStep02'
import JoinStep03 from '@/views/publish/join/JoinStep03'
import JoinStep04 from '@/views/publish/join/JoinStep04'
import AgencyJoinStep01 from '@/views/publish/join/AgencyJoinStep01'
import AgencyJoinStep02 from '@/views/publish/join/AgencyJoinStep02'
import AgencyJoinStep03 from '@/views/publish/join/AgencyJoinStep03'
import AgencyJoinStep04 from '@/views/publish/join/AgencyJoinStep04'

// 고객센터
import NoticeView from '@/views/publish/customer/Notice'
import NoticeSearch from '@/views/publish/customer/NoticeSearch'
import NoticeContent from '@/views/publish/customer/NoticeContent'
import FAQ from '@/views/publish/customer/FAQ'

// 마이페이지
import MyInfo from '@/views/publish/mypage/MyInfo'

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
    },
    // 로그인
    {
      path: '/LoginPage',
      component: LoginPage,
      meta: {
        tittle: '로그인'
      }
    },
    {
      path: '/IdFind',
      component: IdFind,
      meta: {
        tittle: '아이디 찾기'
      }
    },
    {
      path: '/pwFind',
      component: pwFind,
      meta: {
        tittle: '비밀번호 찾기'
      }
    },
    {
      path: '/IdResult',
      component: IdResult,
      meta: {
        tittle: '아이디찾기결과'
      }
    },
    {
      path: '/PwReset',
      component: PwReset,
      meta: {
        tittle: '비밀번호 리셋하기'
      }
    },
    {
      path: '/PwChange',
      component: PwChange,
      meta: {
        tittle: '비밀번호 변경하기'
      }
    },
    // 가입
    {
      path: '/SignUp',
      component: SignUp,
      meta: {
        tittle: '회원가입 유형선택'
      }
    },
    // 기업 회원 가입
    {
      path: '/agencyjoinStep01',
      component: AgencyJoinStep01,
      meta: {
        tittle: '약관동의'
      }
    },
    {
      path: '/joinStep01',
      component: JoinStep01,
      meta: {
        tittle: '약관동의'
      }
    },
    {
      path: '/joinStep02',
      component: JoinStep02,
      meta: {
        tittle: '기업정보 입력'
      }
    },
    {
      path: '/joinStep03',
      component: JoinStep03,
      meta: {
        tittle: '회원정보 입력'
      }
    },
    {
      path: '/joinStep04',
      component: JoinStep04,
      meta: {
        tittle: '회원가입 완료'
      }
    },
    // 대행사 가입
    {
      path: '/agencyjoinStep01',
      component: AgencyJoinStep01,
      meta: {
        tittle: '약관동의'
      }
    },
    {
      path: '/agencyjoinStep02',
      component: AgencyJoinStep02,
      meta: {
        tittle: '회원가입'
      }
    },
    {
      path: '/agencyjoinStep03',
      component: AgencyJoinStep03,
      meta: {
        tittle: '회원가입'
      }
    },
    {
      path: '/agencyjoinStep04',
      component: AgencyJoinStep04,
      meta: {
        tittle: '회원가입'
      }
    },
    // 고객센터
    {
      path: '/notice',
      component: NoticeView,
      meta: {
        tittle: '공지사항'
      }
    },
    {
      path: '/noticesearch',
      component: NoticeSearch,
      meta: {
        tittle: '공지사항'
      }
    },
    {
      path: '/noticecontent',
      component: NoticeContent,
      meta: {
        tittle: '공지사항'
      }
    },
    {
      path: '/faq',
      component: FAQ,
      meta: {
        tittle: 'FAQ'
      }
    },
    // 마이 페이지
    {
      path: '/myinfo',
      component: MyInfo,
      meta: {
        tittle: '개인정보 관리'
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
