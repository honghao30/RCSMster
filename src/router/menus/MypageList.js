// 마이페이지
import MyInfo from '@/views/mypage/MyInfo'
import MyInfoEdit from '@/views/mypage/MyInfoEdit'
import AgencyMyInfo from '@/views/mypage/AgencyMyInfo'
import AgencyMyInfoEdit from '@/views/mypage/AgencyMyInfoEdit'
import CorpInfo from '@/views/mypage/CorpInfo'
import CorpInfoEdit from '@/views/mypage/CorpInfoEdit'
import AgencyCorpInfo from '@/views/mypage/AgencyCorpInfo'
import AgencyCorpInfoEdit from '@/views/mypage/AgencyCorpInfoEdit'
import Withdrawal from '@/views/mypage/Withdrawal'

export default [
  // 마이 페이지
  {
    path: '/myinfo',
    component: MyInfo,
    meta: {
      tittle: '개인정보 관리'
    }
  },
  {
    path: '/myinfoedit',
    component: MyInfoEdit,
    meta: {
      tittle: '개인정보 관리'
    }
  },
  {
    path: '/agencymyinfo',
    component: AgencyMyInfo,
    meta: {
      tittle: '개인정보 관리'
    }
  },
  {
    path: '/agencymyinfoedit',
    component: AgencyMyInfoEdit,
    meta: {
      tittle: '개인정보 관리'
    }
  },
  {
    path: '/corpinfo',
    component: CorpInfo,
    meta: {
      tittle: '비지니스 정보 관리'
    }
  },
  {
    path: '/corpinfoedit',
    component: CorpInfoEdit,
    meta: {
      tittle: '비지니스 정보 관리'
    }
  },
  {
    path: '/agencycorpinfo',
    component: AgencyCorpInfo,
    meta: {
      tittle: '비지니스 정보 관리'
    }
  },
  {
    path: '/agencycorpinfoedit',
    component: AgencyCorpInfoEdit,
    meta: {
      tittle: '비지니스 정보 관리'
    }
  },
  {
    path: '/withdrawal',
    component: Withdrawal,
    meta: {
      tittle: '회원 탈퇴'
    }
  }
]
