const guideList = [
  {
    'depth1': '개요',
    'status': ['0424: 퍼블 완료'],
    'link': '/PubGuides/'
  },
  {
    'depth1': '규칙 & 설계',
    'status': ['0424: 퍼블 완료'],
    'link': '/RullGuide'
  },
  {
    'depth1': 'UI 가이드',
    'status': ['0424: 퍼블 완료'],
    'link': '/UiGuides'
  },
  {
    'depth2': 'BEM 예시',
    'status': ['0424: 퍼블 완료'],
    'link': ''
  },
  {
    'depth1': '컴포넌트',
    'depth2': 'TypoGraphy',
    'status': '',
    'link': ''
  },
  {
    'depth2': 'TABLE',
    'status': ['0424: 퍼블 완료'],
    'link': ''
  },
  {
    'depth2': '폼 요소',
    'status': ['0424: 퍼블 완료']
  },
  {
    'depth2': '탭',
    'status': ['0424: 퍼블 완료']
  },
  {
    'depth2': '버튼 & 아이콘',
    'status': ''
  },
  {
    'depth2': '모달',
    'status': ['0424: 퍼블 완료']
  },
  {
    'depth1': 'Layout',
    'status': ''
  },
  {
    'depth1': '퍼블 리스트',
    'status': ['0424: 퍼블 완료'],
    'link': '/PubList'
  }
]

const homeList = [
  // 로그인 & 아이디 찾기 & 비밀번호 재설정
  {
    'depth1': '로그인',
    'screenId': 'R-Mem-Lgin-View-01',
    'status': ['0512: 개발 공유'],
    'link': '/LoginPage',
    'comments': ['공통적으로 임의의 값을 입력시 다음 페이지로 넘어감.']
  },
  {
    'depth2': '아이디 찾기',
    'screenId': 'R-Mem-ID-Reg-01',
    'status': ['0512: 개발 공유'],
    'link': '/IdFind'
  },
  {
    'depth3': '아이디 찾기 결과',
    'screenId': 'R-Mem-ID-View-01',
    'status': ['0512: 개발 공유'],
    'link': '/IdResult'
  },
  {
    'depth2': '비밀번호 찾기',
    'screenId': 'R-Mem-Pass-Reg-01',
    'status': ['0512: 개발 공유'],
    'link': '/pwFind'
  },
  {
    'depth3': '비밀번호 변경',
    'screenId': '',
    'status': ['0512: 개발 공유'],
    'link': '/PwReset'
  },
  {
    'depth3': '비밀번호 재설정',
    'screenId': '',
    'status': ['0512: 개발 공유'],
    'link': '/PwChange'
  },
  {
    'depth1': '회원가입',
    'depth2': '회원가입 유형선택',
    'screenId': '',
    'status': ['0512: 개발 공유'],
    'link': '/SignUp'
  },
  // 기업 담당자 회원가입
  {
    'depth2': '기업담당자 회원가입',
    'depth3': '약관동의',
    'screenId': 'R-Mem-Join-Reg-01',
    'status': ['0512: 개발 공유'],
    'link': '/joinStep01',
    'comments': ['공통적으로 임의의 값을 입력시 다음 페이지로 넘어감.']
  },
  {
    'depth3': '기업정보 입력',
    'screenId': 'R-Mem-Join-Reg-02',
    'status': ['0512: 개발 공유'],
    'link': '/joinStep02',
    'comments': ['사업자등록번호 123 입력시 기압중인 단계 확인 가능.']
  },
  {
    'depth3': '회원정보 입력',
    'screenId': 'R-Mem-Join-Reg-03',
    'status': ['0512: 개발 공유'],
    'link': '/joinStep03',
    'comments': ['휴대폰 번호 1 입력시 심사 중, 123 입력시 인증번호 받기']
  },
  {
    'depth3': '완료',
    'screenId': 'R-Mem-Join-Reg-04',
    'status': ['0512: 개발 공유'],
    'link': '/joinStep04',
    'comments': ['단순 문구만 다른 케이스라, 요청시 지원 예정']
  },
  // 대행사 회원가입
  {
    'depth2': '대행사 회원가입',
    'depth3': '약관동의',
    'screenId': 'R-Mem-Join-Reg-05',
    'status': ['0512: 개발 공유'],
    'link': '/AgencyJoinStep01'
  },
  {
    'depth3': '대행사정보 입력',
    'screenId': 'R-Mem-Join-Reg-06',
    'status': ['0512: 개발 공유'],
    'link': '/AgencyJoinStep02'
  },
  {
    'depth3': '회원정보 입력',
    'screenId': 'R-Mem-Join-Reg-07',
    'status': ['0512: 개발 공유'],
    'link': '/AgencyJoinStep03'
  },
  {
    'depth3': '완료',
    'screenId': 'R-Mem-Join-Reg-08',
    'status': ['0512: 개발 공유'],
    'link': '/AgencyJoinStep04'
  },
  // 마이 페이지
  {
    'depth1': '마이페이지',
    'depth2': '개인회원 정보 관리',
    'screenId': 'R-Mem-My-Mod-01',
    'status': ['0512: 개발 공유'],
    'link': '/myinfo'
  },
  {
    'depth2': '기업 회원정보 관리',
    'screenId': 'R-Mem-My-Mod-02',
    'status': ['0512: 개발 공유'],
    'link': '/myinfoagency'
  },
  {
    'depth2': '기업 정보 관리(승인대기)',
    'screenId': '',
    'status': ['0512: 개발 공유'],
    'link': '/corpinfo'
  },
  {
    'depth2': '기업 정보 관리(승인완료후)',
    'screenId': '',
    'status': ['0512: 개발 공유'],
    'link': '/corpinfo-edit'
  },
  {
    'depth2': '회원탈퇴',
    'screenId': 'R-Mem-My-Mod-03',
    'status': ['0512: 개발 공유'],
    'link': '/withdrawal'
  },
  // 고객센터
  {
    'depth1': '고객센터',
    'depth2': '공지사항',
    'depth3': '목록',
    'screenId': 'R-Cust-Noti-List-01',
    'status': ['0512: 개발 공유'],
    'link': '/notice'
  },
  {
    'depth3': '공지사항 상세',
    'screenId': 'R-Cust-Noti-View-01',
    'status': ['0512: 개발 공유'],
    'link': '/noticecontent'
  },
  {
    'depth2': 'FAQ',
    'screenId': 'R-Cust-Faq-List-01',
    'status': ['0512: 개발 공유'],
    'link': '/faq'
  },
  {
    'depth2': '온라인 문의',
    'depth3': '작성',
    'screenId': 'R-Cust-Inqur-Reg-01',
    'status': ['0512: 개발 공유'],
    'link': '/OnlineInquire'
  },
  {
    'depth3': '목록',
    'screenId': 'R-Cust-Inqur-List-01',
    'status': ['0512: 개발 공유'],
    'link': '/RequireList'
  },
  // 알림
  {
    'depth1': '공통',
    'depth2': '알림',
    'screenId': 'R-Util-Alam-List-01',
    'status': ['0518: 개발 공유'],
    'link': '/notification'
  },
  // 메인
  {
    'depth1': '메인',
    'link': ''
  },
  {
    'depth1': '서비스 소개',
    'depth2': 'RCS 서비스 소개',
    'screenId': '',
    'link': ''
  },
  {
    'depth2': 'RCS 도입사례',
    'screenId': ''
  },
  { 
    'depth2': 'RBC 이용 안내',
    'screenId': ''
  },
  {
    'depth2': 'RBC 사용 가이드',
    'screenId': ''
  },
  {
    'depth2': '메시지 템플릿 안내',
    'screenId': ''
  },
  {
    'depth1': '파트너사 소개',
    'screenId': '',
    'link': ''
  },
  {
    'depth1': '개인정보처리방침'
  },
  {
    'depth1': '이용약관'
  },
  {
    'depth1': '관련사이트'
  }
]

const dashboardList = [
  {
    'depth1': '기업',
    'depth2': '기업대시보드',
    'screenId': 'R-Comp-Dash-View-01',
    'status': ['0524: 기획 공유', '0526: 개발 공유'],
    'link': '/DashBoard'
  },
  // 대화방
  {
    'depth3': '대화방',
    'depth4': '대화방 목록',
    'screenId': 'R-Brand-Room-List-01',
    'status': ['0601: 기획 공유', '0605: 개발 공유'],
    'link': '/ChatRoomList'
  },
  {
    'depth4': '대화방 등록',
    'screenId': 'R-Brand-Room-Reg-01',
    'status': ['0601: 기획 공유', '0605: 개발 공유'],
    'link': '/ChatRoomRegistration'
  },
  {
    'depth5': '대화방 등록 완료(개별)',
    'screenId': 'R-Brand-Room-Reg-02',
    'status': ['0601: 기획 공유', '0605: 개발 공유'],
    'link': '/ChatRoomRegistrationComplete'
  },
  {
    'depth5': '대화방 등록 완료(대량)',
    'screenId': 'R-Brand-Room-Reg-04',
    'status': ['0601: 기획 공유', '0605: 개발 공유'],
    'link': '/ChatRoomLargeRegistrationComplete',
    'comments': ['개별등록과 대량등록 하나의 버튼을 공유하는듯 한데, 퍼블에서 승인요청 크릭후 뜨는 팝업에서 아니요를 클릭하면 대량등록 완료 페이지로 이동.']
  },
  {
    'depth5': '대화방 수정',
    'screenId': 'R-Brand-Room-Reg-02',
    'status': ['0602: 기획 공유', '0605: 개발 공유'],
    'link': '/ChatRoomModified'
  },
  {
    'depth5': '대화방 수정(대량)',
    'screenId': 'R-Brand-Room-Reg-02',
    'status': ['0602: 기획 공유', '0605: 개발 공유'],
    'link': '/ChatRoomLargeModified'
  },
  {
    'depth5': '대화방 상세',
    'screenId': 'R-Brand-Room-View-01',
    'status': ['0602: 기획 공유', '0605: 개발 공유'],
    'link': '/ChatRoomListView'
  },
  {
    'depth5': '대화방 상세(대량)',
    'screenId': 'R-Brand-Room-View-01',
    'status': ['0602: 기획 공유', '0605: 개발 공유'],
    'link': '/ChatRoomListLargeView'
  },
  {
    'depth1': '브랜드 홈',
    'screenId': 'R-Brand-Open-Reg-01',
    'status': ['0524: 기획 공유', '0526: 개발 공유'],
    'link': '/brand'
  },
  {
    'depth3': '브랜드 운영관리',
    'screenId': 'R-Brand-Mgt-List-01',
    'status': ['0524: 기획 공유', '0526: 개발 공유'],
    'link': '/BrandOperationManage'
  },
  {
    'depth1': '기업 히스토리',
    'screenId': 'R-Comp-Mgt-List-01',
    'status': ['0524: 기획 공유', '0526: 개발 공유'],
    'link': '/operationhistory'
  },
  // 브랜드 소식
  {
    'depth3': '브랜드 소식',
    'depth4': '브랜드 기본 소식 등록',
    'screenId': 'R-Brand-News-Reg-01',
    'status': ['0607: 기획 공유'],
    'link': '/FeedRegistrationBasic'
  },
  {
    'depth4': '브랜드 소식 등록',
    'screenId': 'R-Brand-News-Reg-02',
    'status': ['0607: 기획 공유'],
    'link': '/FeedRegistration'
  },
  // 브랜드 개설
  {
    'depth1': '브랜드 개설',
    'depth2': '기본 정보 입력',
    'screenId': 'R-Brand-Open-Reg-01',
    'status': ['0524: 기획 공유', '0526: 개발 공유'],
    'link': '/brandcreatestep01'
  },
  {
    'depth2': '퀵 버튼 설정',
    'screenId': 'R-Brand-Open-Reg-02',
    'status': ['0524: 기획 공유', '0526: 개발 공유'],
    'link': '/brandcreatestep02'
  },
  {
    'depth2': '브랜드 홈 탭 설정',
    'screenId': 'R-Brand-Open-Reg-03',
    'status': ['0524: 기획 공유', '0526: 개발 공유'],
    'link': '/brandcreatestep03'
  },
  {
    'depth2': '브랜드 개설 완료',
    'screenId': 'R-Brand-Open-Reg-04',
    'status': ['0524: 기획 공유', '0526: 개발 공유'],
    'link': '/brandcreatestep04'
  },
  // 브랜드 관리
  {
    'depth3': '내 브랜드 관리',
    'depth4': '브랜드 홈수정',
    'depth5': '기본정보',
    'screenId': 'R-Brand-Invi-View-01',
    'status': ['0524: 기획 공유', '0526: 개발 공유'],
    'link': '/brandeditstep01'
  },
  {
    'depth5': '퀵버튼',
    'screenId': 'R-Brand-Invi-View-01',
    'status': ['0524: 기획 공유', '0526: 개발 공유'],
    'link': '/brandeditstep02'
  },
  {
    'depth5': '브랜드 홈 탭 설정',
    'screenId': 'R-Brand-Invi-View-01',
    'status': ['0524: 기획 공유', '0526: 개발 공유'],
    'link': '/brandeditstep03'
  },
  {
    'depth4': '안심마크 관리',
    'screenId': 'R-Brand-Mgt-Mod-04',
    'status': ['0524: 기획 공유', '0526: 개발 공유'],
    'link': '/SafetyMarkManage'
  }
  // 브랜드 소식
  // {
  //   'depth3': '브랜드 소식',
  //   'screenId': 'R-Comp-Mgt-List-01',
  //   'status': '완료',
  //   'link': '/feed'
  // },
]

export { guideList, homeList, dashboardList }
