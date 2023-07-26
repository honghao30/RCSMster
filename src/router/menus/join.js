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

export default [
  // 로그인
  {
    name: 'login',
    path: '/login',
    component: LoginPage,
    meta: {
      tittle: '로그인',
      respons: true
    }
  },
  {
    path: '/IdFind',
    component: IdFind,
    meta: {
      tittle: '아이디 찾기',
      respons: true
    }
  },
  {
    name: 'pwFind',
    path: '/pwFind',
    component: pwFind,
    meta: {
      tittle: '비밀번호 찾기',
      respons: true
    }
  },
  {
    name: 'IdResult',
    path: '/IdResult',
    component: IdResult,
    meta: {
      tittle: '아이디찾기결과',
      respons: true
    }
  },
  {
    name: 'PwReset',
    path: '/PwReset',
    component: PwReset,
    meta: {
      tittle: '비밀번호 리셋하기',
      respons: true
    }
  },
  {
    name: 'PwChange',
    path: '/PwChange',
    component: PwChange,
    meta: {
      tittle: '비밀번호 변경하기',
      respons: true
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
      tittle: '비지니스 정보 입력'
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
  }
]
