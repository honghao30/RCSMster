import Vue from 'vue'
import Router from 'vue-router'

import store from '@/store'

// login 검증을 위함
import { getToken } from '@/utils/token'

import NotFound from '@/views/errors/404.vue'
// import ServerError from '@/views/errors/500.vue'

// 파일 링크
// 가이드
import PubGuides from '@/views/guide'
import RullGuide from '@/views/guide/page/RullGuide'
import PubList from '@/views/guide/page/PubList'
import UiGuides from '@/views/guide/page/UiGuide'

// 로그인
import LoginPage from '@/views/join/LoginPage'
import IdFind from '@/views/join/IdFind'
import pwFind from '@/views/join/pwFind'
import IdResult from '@/views/join/IdResult'
import PwReset from '@/views/join/PwReset'
import PwChange from '@/views/join/PwChange'
import SignUp from '@/views/join/SignUp'

// 가입
import JoinStep01 from '@/views/join/JoinStep01'
import JoinStep02 from '@/views/join/JoinStep02'
import JoinStep03 from '@/views/join/JoinStep03'
import JoinStep04 from '@/views/join/JoinStep04'
import AgencyJoinStep01 from '@/views/join/AgencyJoinStep01'
import AgencyJoinStep02 from '@/views/join/AgencyJoinStep02'
import AgencyJoinStep03 from '@/views/join/AgencyJoinStep03'
import AgencyJoinStep04 from '@/views/join/AgencyJoinStep04'

// 고객센터
import NoticeView from '@/views/cs/Notice'
import NoticeContent from '@/views/cs/NoticeContent'
import FAQ from '@/views/cs/FAQ'
import OnlineInquire from '@/views/cs/OnlineInquire'
import RequireList from '@/views/cs/RequireList'

// 마이페이지
import MyInfo from '@/views/mypage/MyInfo'
import MyInfoAgency from '@/views/mypage/MyInfoAgency'
import CorpInfo from '@/views/mypage/CorpInfo'
import CorpInfoEdit from '@/views/mypage/CorpInfoEdit'
import Withdrawal from '@/views/mypage/Withdrawal'

// 대시보드
import DashBoard from '@/views/dashboard/dashboard'
// 알림
import Notification from '@/views/notification/Notification'

// 브랜드 개설
import BrandCreateStep01 from '@/views/brand/create/BrandCreateStep01'
import BrandCreateStep02 from '@/views/brand/create/BrandCreateStep02'
import BrandCreateStep03 from '@/views/brand/create/BrandCreateStep03'
import BrandCreateStep04 from '@/views/brand/create/BrandCreateStep04'

// 브랜드 홈
import BrandHome from '@/views/brand/BrandHome'
import BrandEditHome from '@/views/brand/BrandEditHome'

// 브랜드 수정
import BrandEditStep01 from '@/views/brand/manage/BrandEditStep01'
import BrandEditStep02 from '@/views/brand/manage/BrandEditStep02'
import BrandEditStep03 from '@/views/brand/manage/BrandEditStep03'
import BrandOperationManage from '@/views/brand/manage/BrandOperationManage'
import SafetyMarkManage from '@/views/brand/manage/SafetyMarkManage'
import OperationHistory from '@/views/brand/manage/OperationHistory'

// 대화방
import ChatRoomList from '@/views/brand/chatroom/ChatRoomList'
import ChatRoomRegistration from '@/views/brand/chatroom/ChatRoomRegistration'
import ChatRoomRegistrationComplete from '@/views/brand/chatroom/ChatRoomRegistrationComplete'
import ChatRoomLargeRegistrationComplete from '@/views/brand/chatroom/ChatRoomLargeRegistrationComplete'
import ChatRoomModified from '@/views/brand/chatroom/ChatRoomModified'
import ChatRoomLargeModified from '@/views/brand/chatroom/ChatRoomLargeModified'
import ChatRoomListView from '@/views/brand/chatroom/ChatRoomListView'
import ChatRoomListLargeView from '@/views/brand/chatroom/ChatRoomListLargeView'

// 브랜드 소식
import FeedRegistrationBasic from '@/views/brand/feed/FeedRegistrationBasic'
import FeedRegistration from '@/views/brand/feed/FeedRegistration'

// 브랜드 대시보드
import BrandDashboard from '@/views/brand/dashboard/BrandDashboard'

// 템플릿
import Template from '@/views/brand/template/Template'

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
        headerView: false
      }
    },
    // 퍼블 가이드
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
      path: '/noticecontent',
      component: NoticeContent,
      meta: {
        tittle: '공지사항 상세'
      }
    },
    {
      path: '/faq',
      component: FAQ,
      meta: {
        tittle: 'FAQ'
      }
    },
    {
      path: '/OnlineInquire',
      component: OnlineInquire,
      meta: {
        tittle: '온라인 문의'
      }
    },
    {
      path: '/RequireList',
      component: RequireList,
      meta: {
        tittle: '온라인 문의 목록'
      }
    },
    // 마이 페이지
    {
      path: '/myinfo',
      component: MyInfo,
      meta: {
        tittle: '개인정보 관리'
      }
    },
    {
      path: '/myinfoagency',
      component: MyInfoAgency,
      meta: {
        tittle: '기업정보 관리'
      }
    },
    {
      path: '/corpinfo',
      component: CorpInfo,
      meta: {
        tittle: '기업정보 관리'
      }
    },
    {
      path: '/corpinfo-edit',
      component: CorpInfoEdit,
      meta: {
        tittle: '기업정보 관리'
      }
    },
    {
      path: '/withdrawal',
      component: Withdrawal,
      meta: {
        tittle: '회원 탈퇴'
      }
    },
    // 대시보드
    {
      path: '/DashBoard',
      component: DashBoard,
      meta: {
        tittle: '대시보드',
        breadcrumb: false
      }
    },
    // 알림
    {
      path: '/notification',
      component: Notification,
      meta: {
        tittle: '알림'
      }
    },
    // 브랜드 개설
    {
      path: '/brandcreatestep01',
      component: BrandCreateStep01,
      meta: {
        tittle: '브랜드 개설 > 기본정보 입력',
        breadcrumb: false
      }
    },
    {
      path: '/brandcreatestep02',
      component: BrandCreateStep02,
      meta: {
        tittle: '브랜드 개설 > 퀵버튼 설정',
        breadcrumb: false
      }
    },
    {
      path: '/brandcreatestep03',
      component: BrandCreateStep03,
      meta: {
        tittle: '브랜드 개설 > 브랜드 홈 탭 설정',
        breadcrumb: false
      }
    },
    {
      path: '/brandcreatestep04',
      component: BrandCreateStep04,
      meta: {
        tittle: '브랜드 개설 > 브랜드 개설 완료',
        breadcrumb: false
      }
    },
    {
      path: '/brand',
      component: BrandHome,
      meta: {
        tittle: '브랜드 홈',
        breadcrumb: false
      }
    },
    // 브랜드 수정
    {
      path: '/brandeditstep01',
      component: BrandEditStep01,
      meta: {
        tittle: '브랜드 홈 수정 > 기본정보',
        breadcrumb: false
      }
    },
    {
      path: '/brandeditstep02',
      component: BrandEditStep02,
      meta: {
        tittle: '브랜드 홈 수정 > 퀵버튼',
        breadcrumb: false
      }
    },
    {
      path: '/brandeditstep03',
      component: BrandEditStep03,
      meta: {
        tittle: '브랜드 홈 수정 > 브랜드 홈 탭 설정',
        breadcrumb: false
      }
    },
    {
      path: '/brandedithome',
      component: BrandEditHome,
      meta: {
        tittle: '브랜드 홈',
        breadcrumb: false
      }
    },
    {
      path: '/BrandOperationManage',
      component: BrandOperationManage,
      meta: {
        tittle: '브랜드 운영관리',
        breadcrumb: false
      }
    },
    {
      path: '/SafetyMarkManage',
      component: SafetyMarkManage,
      meta: {
        tittle: '안심마크 관리',
        breadcrumb: false
      }
    },
    {
      path: '/operationhistory',
      component: OperationHistory,
      meta: {
        tittle: '작업 히스토리',
        breadcrumb: false
      }
    },
    {
      path: '/FeedRegistrationBasic',
      component: FeedRegistrationBasic,
      meta: {
        tittle: '브랜드 소식',
        breadcrumb: false
      }
    },
    {
      path: '/FeedRegistration',
      component: FeedRegistration,
      meta: {
        tittle: '브랜드 소식',
        breadcrumb: false
      }
    },
    // 대화방
    {
      path: '/ChatRoomRegistration',
      component: ChatRoomRegistration,
      meta: {
        tittle: '대화방 등록',
        breadcrumb: false
      }
    },
    {
      path: '/ChatRoomRegistrationComplete',
      component: ChatRoomRegistrationComplete,
      meta: {
        tittle: '대화방 등록 완료',
        breadcrumb: false
      }
    },
    {
      path: '/ChatRoomLargeRegistrationComplete',
      component: ChatRoomLargeRegistrationComplete,
      meta: {
        tittle: '대화방 대량 등록 완료',
        breadcrumb: false
      }
    },
    {
      path: '/ChatRoomList',
      component: ChatRoomList,
      meta: {
        tittle: '대화방 목록',
        breadcrumb: false
      }
    },
    {
      path: '/ChatRoomModified',
      component: ChatRoomModified,
      meta: {
        tittle: '대화방 수정',
        breadcrumb: false
      }
    },
    {
      path: '/ChatRoomLargeModified',
      component: ChatRoomLargeModified,
      meta: {
        tittle: '대화방 대량 수정',
        breadcrumb: false
      }
    },
    {
      path: '/ChatRoomListView',
      component: ChatRoomListView,
      meta: {
        tittle: '대화방 목록 개별등록 상세',
        breadcrumb: false
      }
    },
    {
      path: '/ChatRoomListLargeView',
      component: ChatRoomListLargeView,
      meta: {
        tittle: '대화방 목록 대량등록 상세',
        breadcrumb: false
      }
    },
    // 브랜드 대시보드
    {
      path: '/BrandDashboard',
      component: BrandDashboard,
      meta: {
        tittle: '브랜드 대시보드',
        breadcrumb: false
      }
    },
    // 템플릿
    {
      path: '/template',
      component: Template,
      meta: {
        tittle: '템플릿',
        breadcrumb: false
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
