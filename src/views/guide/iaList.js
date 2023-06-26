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
  // 로그인 & 아이디 찾기 & 비밀번호 찾기
  {
    'depth1': '로그인',
    'screenId': 'R-Mem-Lgin-View-01',
    'status': ['0512: 개발 공유'],
    'link': '/LoginPage',
    'comments': ['공통적으로 임의의 값을 입력시 다음 페이지로 넘어감.','0613: 버튼 여섯 번 클릭 시 비밀번호 변경 모달 창 켜짐']
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
    'depth3': '비밀번호 찾기',
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
    'depth3': '비지니스 정보 입력',
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
    'comments': ['단순 문구만 다른 케이스라, 요청시 지원 예정','0613: 회원가입 완료시 상황에 따른 화면 추가. 각 상황 앞에 주석 달아두었습니다.']
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
    'link': '/AgencyJoinStep04',
    'comments': ['0613: 회원가입 완료시 상황에 따른 화면 추가. 각 상황 앞에 주석 달아두었습니다.']
  },
  // 마이 페이지
  {
    'depth1': '마이페이지',
    'depth2': '개인회원 정보 관리',
    'depth3': '상세',
    'screenId': 'R-Mem-My-Mod-01',
    'status': ['0620: 추가', '0621: 개발 공유'],
    'link': '/myinfo',
    'comments': ['0620: 추가 된 페이지 매니저,마스터_개인정보 관리 (기존 MyInfo.vue -> MyInfoEdit.vue)', 'view 페이지와 edit 분리로 인해 파일명 변경']
  },
  {
    'depth3': '수정',
    'screenId': 'R-Mem-My-Reg-01',
    'status': ['0512: 개발 공유', '0620: 파일명 변경 MyInfo = > MyInfoEdit', '0621: 개발 2차 공유'],
    'link': '/myinfoedit',
    'comments': ['0620: 파일 명 변경 된 페이지 (기존 파일 명:MyInfo.vue ) - 매니저,마스터_개인정보 관리 편집']
  },
  {
    'depth2': '대행사_개인정보 관리',
    'depth3': '상세',
    'screenId': 'R-Mem-My-Mod-02',
    'status': ['0620: 신규 추가', '0621: 개발 공유'],
    'link': '/agencymyinfo',
    'comments': ['0620: 추가 된 페이지 - 대행사_개인정보 관리']
  },
  {
    'depth3': '수정',
    'screenId': 'R-Mem-My-Reg-02',
    'status': ['0620: 파일명 변경 MyInfoAgency > agencymyinfoedit', '0621: 개발 공유'],
    'link': '/agencymyinfoedit',
    'comments': ['0620: 파일 명 변경 된 페이지 (기존 파일 명:MyInfoAgency.vue ) - 대행사_개인정보 관리 편집']
  },
  {
    'depth2': '마스터_비지니스 정보 관리',
    'depth3': '상세',
    'screenId': '',
    'status': ['0620: 신규 추가', '0621: 개발 공유'],
    'link': '/corpinfo',
    'comments': ['0620: 추가 된 페이지 매니저,마스터_비지니스 정보 관리 (기존 CorpInfo.vue -> AgencyCorpInfoEdit.vue)', '0620: 모든 페이지 "기업 정보" -> "비지니스 정보" 로 수정']
  },
  {
    'depth3': '수정',
    'screenId': '',
    'status': [''],
    'link': '/corpinfoedit',
    'comments': ['0620: 기존 파일 명 사용 - 매니저,마스터_비지니스 정보 관리 편집']
  },
  {
    'depth2': '대행사_비지니스 정보 관리',
    'depth3': '상세',
    'screenId': '',
    'status': ['0620: 신규 추가', '0621: 개발 공유'],
    'link': '/agencycorpinfo',
    'comments': ['0620: 추가 된 페이지 - 대행사_비지니스 정보 관리']
  },
  {
    'depth3': '수정',
    'screenId': '',
    'status': [''],
    'link': '/agencycorpinfoedit',
    'comments': ['0620: 파일 명 변경 된 페이지 (기존 파일 명:CorpInfo.vue ) - 대행사_비지니스 정보 관리 편집']
  },
  {
    'depth2': '회원탈퇴',
    'screenId': 'R-Mem-My-Mod-03',
    'status': ['0512: 개발 공유'],
    'link': '/withdrawal',
    'comments': ['']
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
    'link': '/OnlineInquire',
    'comments': ['0613: <온라인 접수> 와 <로그인> 모달 창 추가']
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
  // 대화방 메뉴
  {
    'depth3': '대화방 메뉴',
    'depth4': '대화방 메뉴 목록',
    'screenId': 'R-Brand-Menu-List-01',
    'status': ['0612: 기획 공유', '0613: 개발 공유'],
    'link': '/ChatRoomMenuList',
    'comments': ['참조 기획서 : 2023RBC_UIUX개편_화면설계서_대화방메뉴_v0.6_20230605']
  },
  {
    'depth6': '대화방 메뉴 상세',
    'screenId': 'R-Brand-Menu-View-01',
    'status': ['0612: 기획 공유', '0613: 개발 공유'],
    'link': '/ChatRoomMenuView',
    'comments': ['참조 기획서 : 2023RBC_UIUX개편_화면설계서_대화방메뉴_v0.6_20230605']
  },
  {
    'depth6': '대화방 메뉴 등록',
    'screenId': 'R-Brand-Menu-Reg-02',
    'status': ['0613: 기획 공유', '0613: 개발 공유'],
    'link': '/ChatRoomMenuAdd',
    'comments': ['참조 기획서 : 2023RBC_UIUX개편_화면설계서_대화방메뉴_v0.6_20230605']
  },
  {
    'depth6': '대화방 메뉴 수정',
    'screenId': 'R-Brand-Menu-Reg-02',
    'status': ['0613: 기획 공유', '0613: 개발 공유'],
    'link': '/ChatRoomMenuViewModified',
    'comments': ['참조 기획서 : 2023RBC_UIUX개편_화면설계서_대화방메뉴_v0.6_20230605']
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
  // 챗붓
  {
    'depth3': '챗붓',
    'depth4': '챗봇 연결',
    'depth5': '목록',
    'screenId': 'R-Brand-Chat-List-02',
    'status': ['0621: 기획 공유'],
    'link': '/ChatbotList'
  },
  {
    'depth5': '상세',
    'screenId': 'R-Brand-Menu-View-01',
    'status': ['0621: 기획 공유'],
    'link': '/ChatbotView'
  },
  {
    'depth5': '등록',
    'screenId': 'R-Brand-Chat-Reg-02',
    'status': ['0621: 기획 공유'],
    'link': '/ChatbotRegistration'
  },
  // 통계
  {
    'depth3': '통계',
    'depth4': '메시지 통계',
    'depth5': '목록',
    'screenId': 'R-Brand-Stat-List-01',
    'status': ['0622: 기획 공유'],
    'link': '/MsgStatList'
  },
  {
    'depth5': '상세',
    'screenId': 'R-Brand-Stat-View-01',
    'status': ['0622: 기획 공유'],
    'link': '/MsgStatListView'
  },
  {
    'depth4': '대화방 메뉴 통계',
    'depth5': '목록',
    'screenId': 'R-Brand-Stat-List-02',
    'status': ['0622: 기획 공유'],
    'link': '/ChatRoomMenuStat'
  },
  {
    'depth4': '브랜드 소식 통계',
    'depth5': '목록',
    'screenId': 'R-Brand-Stat-List-03',
    'status': ['0622: 기획 공유'],
    'link': '/BrandFeedStat'
  },
  {
    'depth5': '상세',
    'screenId': 'R-Brand-Stat-View-03',
    'status': ['0622: 기획 공유'],
    'link': '/BrandFeedStatView'
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
