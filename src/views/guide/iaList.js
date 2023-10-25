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
    'pubData': 'v1 07-20',
    'isPublished': true,
    'comments': ['공통적으로 임의의 값을 입력시 다음 페이지로 넘어감.', '0613: 버튼 여섯 번 클릭 시 비밀번호 변경 모달 창 켜짐', '회원 공통: 기획서 버전 : 2023RBC_UIUX개편_화면설계서_회원_v0.4_20230605']
  },
  {
    'depth2': '아이디 찾기',
    'screenId': 'R-Mem-ID-Reg-01',
    'status': ['0512: 개발 공유'],
    'link': '/IdFind',
    'pubData': 'v1 07-20',
    'isPublished': true
  },
  {
    'depth3': '아이디 찾기 결과',
    'screenId': 'R-Mem-ID-View-01',
    'status': ['0512: 개발 공유'],
    'link': '/IdResult',
    'pubData': 'v1 07-20',
    'isPublished': true
  },
  {
    'depth2': '비밀번호 찾기',
    'screenId': 'R-Mem-Pass-Reg-01',
    'status': ['0512: 개발 공유'],
    'link': '/pwFind',
    'pubData': 'v1 07-20',
    'isPublished': true
  },
  {
    'depth3': '비밀번호 변경',
    'screenId': '',
    'status': ['0512: 개발 공유'],
    'link': '/PwReset',
    'pubData': 'v1 07-20',
    'isPublished': true
  },
  {
    'depth3': '비밀번호 찾기',
    'screenId': '',
    'status': ['0512: 개발 공유'],
    'link': '/PwChange',
    'pubData': 'v1 07-20',
    'isPublished': true
  },
  {
    'depth1': '회원가입',
    'depth2': '회원가입 유형선택',
    'screenId': '',
    'status': ['0512: 개발 공유'],
    'link': '/SignUp',
    'pubData': 'v1 07-20',
    'isPublished': true
  },
  // 기업 담당자 회원가입
  {
    'depth2': '기업담당자 회원가입',
    'depth3': '약관동의',
    'screenId': 'R-Mem-Join-Reg-01',
    'status': ['0512: 개발 공유'],
    'link': '/joinStep01',
    'pubData': 'v1 07-20',
    'isPublished': true,
    'comments': ['공통적으로 임의의 값을 입력시 다음 페이지로 넘어감.']
  },
  {
    'depth3': '비지니스 정보 입력',
    'screenId': 'R-Mem-Join-Reg-02',
    'status': ['0512: 개발 공유'],
    'link': '/joinStep02',
    'pubData': 'v1 07-20',
    'isPublished': true,
    'comments': ['사업자등록번호 123 입력시 기압중인 단계 확인 가능.']
  },
  {
    'depth3': '회원정보 입력',
    'screenId': 'R-Mem-Join-Reg-03',
    'status': ['0512: 개발 공유'],
    'link': '/joinStep03',
    'pubData': 'v1 07-20',
    'isPublished': true,
    'comments': ['휴대폰 번호 1 입력시 심사 중, 123 입력시 인증번호 받기']
  },
  {
    'depth3': '완료',
    'screenId': 'R-Mem-Join-Reg-04',
    'status': ['0512: 개발 공유'],
    'link': '/joinStep04',
    'pubData': 'v1 07-20',
    'isPublished': true,
    'comments': ['단순 문구만 다른 케이스라, 요청시 지원 예정','0613: 회원가입 완료시 상황에 따른 화면 추가. 각 상황 앞에 주석 달아두었습니다.']
  },
  // 대행사 회원가입
  {
    'depth2': '대행사 회원가입',
    'depth3': '약관동의',
    'screenId': 'R-Mem-Join-Reg-05',
    'status': ['0512: 개발 공유'],
    'link': '/AgencyJoinStep01',
    'pubData': 'v1 07-20',
    'isPublished': true
  },
  {
    'depth3': '대행사정보 입력',
    'screenId': 'R-Mem-Join-Reg-06',
    'status': ['0512: 개발 공유'],
    'link': '/AgencyJoinStep02',
    'pubData': 'v1 07-20',
    'isPublished': true
  },
  {
    'depth3': '회원정보 입력',
    'screenId': 'R-Mem-Join-Reg-07',
    'status': ['0512: 개발 공유'],
    'link': '/AgencyJoinStep03',
    'pubData': 'v1 07-20',
    'isPublished': true
  },
  {
    'depth3': '완료',
    'screenId': 'R-Mem-Join-Reg-08',
    'status': ['0512: 개발 공유'],
    'link': '/AgencyJoinStep04',
    'pubData': 'v1 07-20',
    'isPublished': true,
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
    'pubData': 'v1 07-20',
    'isPublished': true,
    'comments': ['0620: 추가 된 페이지 매니저,마스터_개인정보 관리 (기존 MyInfo.vue -> MyInfoEdit.vue)', 'view 페이지와 edit 분리로 인해 파일명 변경']
  },
  {
    'depth3': '수정',
    'screenId': 'R-Mem-My-Reg-01',
    'status': ['0512: 개발 공유', '0620: 파일명 변경 MyInfo = > MyInfoEdit', '0621: 개발 2차 공유'],
    'link': '/myinfoedit',
    'pubData': 'v1 07-20',
    'isPublished': true,
    'comments': ['0620: 파일 명 변경 된 페이지 (기존 파일 명:MyInfo.vue ) - 매니저,마스터_개인정보 관리 편집']
  },
  {
    'depth2': '대행사_개인정보 관리',
    'depth3': '상세',
    'screenId': 'R-Mem-My-Mod-02',
    'status': ['0620: 신규 추가', '0621: 개발 공유'],
    'link': '/agencymyinfo',
    'pubData': 'v1 07-20',
    'isPublished': true,
    'comments': ['0620: 추가 된 페이지 - 대행사_개인정보 관리']
  },
  {
    'depth3': '수정',
    'screenId': 'R-Mem-My-Reg-02',
    'status': ['0620: 파일명 변경 MyInfoAgency > agencymyinfoedit', '0621: 개발 공유'],
    'link': '/agencymyinfoedit',
    'pubData': 'v1 07-20',
    'isPublished': true,
    'comments': ['0620: 파일 명 변경 된 페이지 (기존 파일 명:MyInfoAgency.vue ) - 대행사_개인정보 관리 편집']
  },
  {
    'depth2': '마스터_비지니스 정보 관리',
    'depth3': '상세',
    'screenId': '',
    'status': ['0620: 신규 추가', '0621: 개발 공유'],
    'link': '/corpinfo',
    'pubData': 'v1 07-20',
    'isPublished': true,
    'comments': ['0620: 추가 된 페이지 매니저,마스터_비지니스 정보 관리 (기존 CorpInfo.vue -> AgencyCorpInfoEdit.vue)', '0620: 모든 페이지 "기업 정보" -> "비지니스 정보" 로 수정']
  },
  {
    'depth3': '수정',
    'screenId': '',
    'status': [''],
    'link': '/corpinfoedit',
    'pubData': 'v1 07-20',
    'isPublished': true,
    'comments': ['0620: 기존 파일 명 사용 - 매니저,마스터_비지니스 정보 관리 편집']
  },
  {
    'depth2': '대행사_비지니스 정보 관리',
    'depth3': '상세',
    'screenId': '',
    'status': ['0620: 신규 추가', '0621: 개발 공유'],
    'link': '/agencycorpinfo',
    'pubData': 'v1 07-20',
    'isPublished': true,
    'comments': ['0620: 추가 된 페이지 - 대행사_비지니스 정보 관리', '0628: 선거용 배너 추가']
  },
  {
    'depth3': '수정',
    'screenId': '',
    'status': [''],
    'link': '/agencycorpinfoedit',
    'pubData': 'v1 07-20',
    'isPublished': true,
    'comments': ['0620: 파일 명 변경 된 페이지 (기존 파일 명:CorpInfo.vue ) - 대행사_비지니스 정보 관리 편집']
  },
  {
    'depth2': '회원탈퇴',
    'screenId': 'R-Mem-My-Mod-03',
    'status': ['0512: 개발 공유'],
    'link': '/withdrawal',
    'pubData': 'v1 07-20',
    'isPublished': true,
    'comments': ['']
  },
  // 고객센터
  {
    'depth1': '고객센터',
    'depth2': '공지사항',
    'depth3': '목록',
    'screenId': 'R-Cust-Noti-List-01',
    'status': ['0512: 개발 공유'],
    'link': '/notice',
    'pubData': 'v1 07-20',
    'isPublished': true,
    'comments': ['고객센터 기획서 버전: 2023RBC_UIUX개편_화면설계서_HOME(고객센터)_v0.5_20230526_피드백 대기중']
  },
  {
    'depth3': '공지사항 상세',
    'screenId': 'R-Cust-Noti-View-01',
    'status': ['0512: 개발 공유'],
    'link': '/noticecontent',
    'pubData': 'v1 07-20',
    'isPublished': true
  },
  {
    'depth2': 'FAQ',
    'screenId': 'R-Cust-Faq-List-01',
    'status': ['0512: 개발 공유'],
    'link': '/faq',
    'pubData': 'v1 07-20',
    'isPublished': true
  },
  {
    'depth2': '온라인 문의',
    'depth3': '작성',
    'screenId': 'R-Cust-Inqur-Reg-01',
    'status': ['0512: 개발 공유'],
    'link': '/OnlineInquire',
    'pubData': 'v1 07-20',
    'isPublished': true,
    'comments': ['0613: <온라인 접수> 와 <로그인> 모달 창 추가']
  },
  {
    'depth3': '목록',
    'screenId': 'R-Cust-Inqur-List-01',
    'status': ['0512: 개발 공유'],
    'link': '/RequireList',
    'pubData': 'v1 07-20',
    'isPublished': true
  },
  // 알림
  {
    'depth1': '공통',
    'depth2': '알림',
    'screenId': 'R-Util-Alam-List-01',
    'status': ['0518: 개발 공유'],
    'link': '/notification',
    'isPublished': true
  },
  // 메인
  {
    'depth1': '메인',
    'link': '',
    'pubData': 'v1 08-04'
  },
  {
    'depth1': '파트너사',
    'screenId': '',
    'link': '/partnerInfo',
    'pubData': 'v1 07-28',
    'isPublished': true
  },
  {
    'depth1': '기술지원',
    'screenId': '',
    'link': '/TechnicalSupport',
    'pubData': 'v1 07-28',
    'isPublished': true
  },
  {
    'depth1': '개인정보처리방침',
    'pubData': 'v1 08-04'
  },
  {
    'depth1': '이용약관',
    'pubData': 'v1 08-04'
  }
]
const dashboardList = [
  // 기업 대시보드
  {
    'depth1': '기업',
    'depth2': '기업대시보드(전체목록)',
    'screenId': 'R-Comp-Dash-View-01',
    'status': ['0524: 기획 공유', '0526: 개발 공유', '0630: 2차 공유'],
    'link': '/DashBoard',
    'pubData': 'v1 07-13',
    'isPublished': true,
    'comments': ['참고기획서 버전: 2023RBC_UIUX개편_화면설계서_기업대시보드_v0.9_20230623']
  },
  {
    'depth2': '운영 히스토리',
    'screenId': '',
    'status': ['0630: 기획,개발 공유'],
    'link': '/ManageHistory',
    'pubData': 'v1 07-13',
    'isPublished': true,
    'comments': ['참고기획서 버전: 2023RBC_UIUX개편_화면설계서_기업대시보드_v0.9_20230623']
  },
  {
    'depth2': '전체브랜드 운영관리',
    'screenId': '',
    'status': ['0630: 기획,개발 공유'],
    'link': '/dashboardOperationManage',
    'pubData': 'v1 07-13',
    'isPublished': true,
    'comments': ['참고기획서 버전: 2023RBC_UIUX개편_화면설계서_기업대시보드_v0.9_20230623']
  },
  // 브랜드 관리
  {
    'depth3': '내 브랜드 관리',
    'depth4': '브랜드 홈수정',
    'depth5': '기본정보',
    'screenId': 'R-Brand-Invi-View-01',
    'status': ['0524: 기획 공유', '0526: 개발 공유'],
    'link': '/brandeditstep01',
    'pubData': 'v1 07-26',
    'isPublished': true,
    'comments': ['2023RBC_UIUX개편_화면설계서_내 브랜드 관리_v0.8_20230621(SK피드백)']
  },
  {
    'depth5': '퀵버튼',
    'screenId': 'R-Brand-Invi-View-01',
    'status': ['0524: 기획 공유', '0526: 개발 공유'],
    'link': '/brandeditstep02',
    'pubData': 'v1 07-26',
    'isPublished': true
  },
  {
    'depth5': '브랜드 홈 탭 설정',
    'screenId': 'R-Brand-Invi-View-01',
    'status': ['0524: 기획 공유', '0526: 개발 공유'],
    'link': '/brandeditstep03',
    'pubData': 'v1 07-26',
    'isPublished': true
  },
  {
    'depth4': '안심마크 관리',
    'screenId': 'R-Brand-Mgt-Mod-04',
    'status': ['0524: 기획 공유', '0526: 개발 공유'],
    'link': '/SafetyMarkManage',
    'pubData': 'v1 07-26',
    'isPublished': true
  },
  // 대화방
  {
    'depth3': '대화방',
    'depth4': '대화방 목록',
    'screenId': 'R-Brand-Room-List-01',
    'status': ['0601: 기획 공유', '0612: 개발 공유'],
    'link': '/ChatRoomList',
    'pubData': 'v1 07-13',
    'isPublished': true,
    'comments': ['기획서 버전: 2023RBC_UIUX개편_화면설계서_대화방_v0.7_20230526']
  },
  {
    'depth4': '대화방 등록',
    'screenId': 'R-Brand-Room-Reg-01',
    'status': ['0601: 기획 공유', '0612: 개발 공유'],
    'link': '/ChatRoomRegistration',
    'pubData': 'v1 07-13',
    'isPublished': true,
    'comments': ['주석 : <!-- 입력된 데이터가 있는 상태에서 개별/대량 등록 변경 시 --> 표시함', '양방향 대행사 연결 : 디자인은 현재 라디오박스 / 기획서는 체크박스여서    기획서대로 작업한 상황', '개별등록  탭 → 승인요청 버튼 → 승인요청 alert창 → 닫기 버튼 클릭 시 기획서 p.30(대량등록 결과 알림 팝업) 나오도록 작업함']
  },
  {
    'depth5': '대화방 등록 완료(개별)',
    'screenId': 'R-Brand-Room-Reg-02',
    'status': ['0601: 기획 공유', '0612: 개발 공유'],
    'link': '/ChatRoomRegistrationComplete',
    'pubData': 'v1 07-13',
    'isPublished': true
  },
  {
    'depth5': '대화방 등록 완료(대량)',
    'screenId': 'R-Brand-Room-Reg-04',
    'status': ['0601: 기획 공유', '0612: 개발 공유'],
    'link': '/ChatRoomLargeRegistrationComplete',
    'pubData': 'v1 07-13',
    'isPublished': true,
    'comments': ['개별등록과 대량등록 하나의 버튼을 공유하는듯 한데, 퍼블에서 승인요청 크릭후 뜨는 팝업에서 아니요를 클릭하면 대량등록 완료 페이지로 이동.']
  },
  {
    'depth5': '대화방 수정',
    'screenId': 'R-Brand-Room-Reg-02',
    'status': ['0602: 기획 공유', '0612: 개발 공유'],
    'link': '/ChatRoomModified',
    'pubData': 'v1 07-13',
    'isPublished': true
  },
  {
    'depth5': '대화방 수정(대량)',
    'screenId': 'R-Brand-Room-Reg-02',
    'status': ['0602: 기획 공유', '0612: 개발 공유'],
    'link': '/ChatRoomLargeModified',
    'pubData': 'v1 07-13',
    'isPublished': true
  },
  {
    'depth5': '대화방 상세',
    'screenId': 'R-Brand-Room-View-01',
    'status': ['0602: 기획 공유', '0612: 개발 공유'],
    'link': '/ChatRoomListView',
    'pubData': 'v1 07-13',
    'isPublished': true
  },
  {
    'depth5': '대화방 상세(대량)',
    'screenId': 'R-Brand-Room-View-01',
    'status': ['0602: 기획 공유', '0612: 개발 공유'],
    'link': '/ChatRoomListLargeView',
    'pubData': 'v1 07-13',
    'isPublished': true
  },
  // 대화방 메뉴
  {
    'depth3': '대화방 메뉴',
    'depth4': '대화방 메뉴 목록',
    'screenId': 'R-Brand-Menu-List-01',
    'status': ['0612: 기획 공유', '0613: 개발 공유'],
    'link': '/ChatRoomMenuList',
    'pubData': 'v1 07-18',
    'isPublished': true,
    'comments': ['참조 기획서 : 2023RBC_UIUX개편_화면설계서_대화방메뉴_v0.6_20230605']
  },
  {
    'depth6': '대화방 메뉴 상세',
    'screenId': 'R-Brand-Menu-View-01',
    'status': ['0612: 기획 공유', '0613: 개발 공유'],
    'link': '/ChatRoomMenuView',
    'pubData': 'v1 07-18',
    'isPublished': true,
    'comments': ['참조 기획서 : 2023RBC_UIUX개편_화면설계서_대화방메뉴_v0.6_20230605']
  },
  {
    'depth6': '대화방 메뉴 등록',
    'screenId': 'R-Brand-Menu-Reg-02',
    'status': ['0613: 기획 공유', '0613: 개발 공유'],
    'link': '/ChatRoomMenuAdd',
    'pubData': 'v1 07-18',
    'isPublished': true,
    'comments': ['참조 기획서 : 2023RBC_UIUX개편_화면설계서_대화방메뉴_v0.6_20230605']
  },
  {
    'depth6': '대화방 메뉴 수정',
    'screenId': 'R-Brand-Menu-Reg-02',
    'status': ['0613: 기획 공유', '0613: 개발 공유'],
    'link': '/ChatRoomMenuViewModified',
    'pubData': 'v1 07-18',
    'isPublished': true,
    'comments': ['참조 기획서 : 2023RBC_UIUX개편_화면설계서_대화방메뉴_v0.6_20230605']
  },
  // 브랜드 홈
  {
    'depth1': '브랜드 홈',
    'screenId': 'R-Brand-Open-Reg-01',
    'status': ['0524: 기획 공유', '0526: 개발 공유'],
    'link': '/brand',
    'pubData': 'v1 07-26',
    'isPublished': true,
    'comments': ['참조 기획서 : 2023RBC_UIUX개편_화면설계서_대화방메뉴_v0.6_20230605']
  },
  {
    'depth1': '브랜드 홈 수정',
    'screenId': '',
    'status': ['0524: 기획 공유', '0526: 개발 공유'],
    'link': '/BrandEditHome',
    'pubData': 'v1 07-26',
    'isPublished': true,
    'comments': ['참조 기획서 : 2023RBC_UIUX개편_화면설계서_대화방메뉴_v0.6_20230605']
  },
  {
    'depth3': '브랜드 운영관리',
    'screenId': 'R-Brand-Mgt-List-01',
    'status': ['0524: 기획 공유', '0526: 개발 공유'],
    'link': '/BrandOperationManage',
    'pubData': 'v1 07-26',
    'isPublished': true
  },
  {
    'depth1': '기업 히스토리',
    'screenId': 'R-Comp-Mgt-List-01',
    'status': ['0524: 기획 공유', '0526: 개발 공유'],
    'link': '/operationhistory',
    'pubData': 'v1 07-26',
    'isPublished': true
  },
  // 브랜드 소식
  {
    'depth3': '브랜드 소식',
    'depth4': '브랜드 기본 소식 등록',
    'screenId': 'R-Brand-News-Reg-01',
    'status': ['0607: 기획 공유', '0616: 개발 공유'],
    'link': '/FeedRegistrationBasic',
    'pubData': 'v1 07-11',
    'isPublished': true,
    'comments': ['기획서 : 2023RBC_UIUX개편_화면설계서_브랜드 소식_v0.6_20230615']
  },
  {
    'depth4': '브랜드 소식 등록',
    'screenId': 'R-Brand-News-Reg-02',
    'status': ['0607: 기획 공유', '0616: 개발 공유'],
    'link': '/FeedRegistration',
    'pubData': 'v1 07-11',
    'isPublished': true,
    'comments': ['버튼 영역 추가 수정 가능성 있음.']
  },
  // 챗붓
  {
    'depth3': '양방향',
    // 'depth4': '챗봇 연결',
    'depth5': '목록',
    'screenId': 'R-Brand-Chat-List-02',
    'status': ['0621: 기획 공유'],
    'link': '/ChatbotList',
    'pubData': 'v1 07-13',
    'isPublished': true,
    'comments': ['2023RBC_UIUX개편_화면설계서_브랜드_챗봇_v0.8_20230621_수정중']
  },
  {
    'depth5': '상세',
    'screenId': 'R-Brand-Menu-View-01',
    'status': ['0621: 기획 공유'],
    'link': '/ChatbotView',
    'pubData': 'v1 07-13',
    'isPublished': true
  },
  {
    'depth5': '등록',
    'screenId': 'R-Brand-Chat-Reg-02',
    'status': ['0621: 기획 공유'],
    'link': '/ChatbotRegistration',
    'pubData': 'v1 07-13',
    'isPublished': true
  },
  // 통계
  {
    'depth3': '통계',
    'depth4': '메시지 통계',
    'depth5': '목록',
    'screenId': 'R-Brand-Stat-List-01',
    'status': ['0622: 기획 공유'],
    'link': '/MsgStatList',
    'pubData': 'v1 07-24',
    'isPublished': true,
    'comments': ['고객 피드백에 따른 통계 칼라 변경 예정.']
  },
  {
    'depth5': '상세',
    'screenId': 'R-Brand-Stat-View-01',
    'status': ['0622: 기획 공유'],
    'link': '/MsgStatListView',
    'pubData': 'v1 07-24',
    'isPublished': true
  },
  {
    'depth4': '대화방 메뉴 통계',
    'depth5': '목록',
    'screenId': 'R-Brand-Stat-List-02',
    'status': ['0622: 기획 공유'],
    'link': '/ChatRoomMenuStat',
    'pubData': 'v1 07-24',
    'isPublished': true
  },
  {
    'depth4': '브랜드 소식 통계',
    'depth5': '목록',
    'screenId': 'R-Brand-Stat-List-03',
    'status': ['0622: 기획 공유'],
    'link': '/BrandFeedStat',
    'pubData': 'v1 07-24',
    'isPublished': true
  },
  {
    'depth5': '상세',
    'screenId': 'R-Brand-Stat-View-03',
    'status': ['0622: 기획 공유'],
    'link': '/BrandFeedStatView',
    'pubData': 'v1 07-24',
    'isPublished': true
  },
  // 브랜드 개설
  {
    'depth1': '브랜드 개설',
    'depth2': '기본 정보 입력',
    'screenId': 'R-Brand-Open-Reg-01',
    'status': ['0524: 기획 공유', '0526: 개발 공유'],
    'link': '/brandcreatestep01',
    'pubData': 'v1 07-26',
    'isPublished': true,
    'comments': ['참고 기획서: 2023RBC_UIUX개편_화면설계서_브랜드개설_v0.9_20230627']
  },
  {
    'depth2': '퀵 버튼 설정',
    'screenId': 'R-Brand-Open-Reg-02',
    'status': ['0524: 기획 공유', '0526: 개발 공유'],
    'link': '/brandcreatestep02',
    'pubData': 'v1 07-26',
    'isPublished': true,
    'comments': ['참고 기획서: 2023RBC_UIUX개편_화면설계서_브랜드개설_v0.9_20230627']
  },
  {
    'depth2': '브랜드 홈 탭 설정',
    'screenId': 'R-Brand-Open-Reg-03',
    'status': ['0524: 기획 공유', '0526: 개발 공유'],
    'link': '/brandcreatestep03',
    'pubData': 'v1 07-26',
    'isPublished': true,
    'comments': ['참고 기획서: 2023RBC_UIUX개편_화면설계서_브랜드개설_v0.9_20230627']
  },
  {
    'depth2': '브랜드 개설 완료',
    'screenId': 'R-Brand-Open-Reg-04',
    'status': ['0524: 기획 공유', '0526: 개발 공유'],
    'link': '/brandcreatestep04',
    'pubData': 'v1 07-26',
    'isPublished': true,
    'comments': ['참고 기획서: 2023RBC_UIUX개편_화면설계서_브랜드개설_v0.9_20230627']
  },
  // 메시지
  {
    'depth3': '메시지',
    'depth4': '템플릿 목록',
    'screenId': '',
    'status': ['0710: 기획 공유', '0710: 개발 공유'],
    'link': '/TemplateList',
    'pubData': 'v1 07-10',
    'isPublished': true,
    'comments': ['참고 기획서: 2023RBC_UIUX개편_화면설계서_메시지_v0.8_20230630']
  },
  {
    'depth4': '템플릿 목록',
    'screenId': '',
    'link': '/TemplateMsgList',
    'pubData': 'v1 07-21',
    'isPublished': true,
    'comments': ['']
  },
  {
    'depth4': '템플릿 등록 - 텍스트',
    'screenId': '',
    'status': [],
    'link': '/TemplateRegistration',
    'pubData': 'v1 07-10',
    'isPublished': true,
    'comments': ['참고 기획서: 2023RBC_UIUX개편_화면설계서_메시지_v0.92_20230712', '/TemplateRegistration?name=Creater&type=text1 숫자 1~6']
  },
  {
    'depth4': '템플릿 등록 - LMS',
    'screenId': '',
    'status': [],
    'link': '/TemplateRegistrationLMS',
    'pubData': 'v1 07-10',
    'isPublished': true,
    'comments': ['참고 기획서: 2023RBC_UIUX개편_화면설계서_메시지_v0.92_20230712', '/TemplateRegistrationLMS?name=CreaterLMS&type=lms1 숫자 1~6']
  },
  {
    'depth4': '템플릿 등록 - LMS',
    'screenId': '',
    'status': [],
    'link': '/TemplateRegistrationImage',
    'pubData': 'v1 07-10',
    'isPublished': true,
    'comments': ['참고 기획서: 2023RBC_UIUX개편_화면설계서_메시지_v0.92_20230712', '/TemplateRegistrationImage?name=CreaterImg&type=image1 숫자 1~6']
  },
  {
    'depth4': '레이아웃 목록',
    'screenId': '',
    'status': ['0710: 기획 공유', '0710: 개발 공유'],
    'link': '/LayoutList',
    'pubData': 'v1 07-10',
    'isPublished': true,
    'comments': ['참고 기획서: 2023RBC_UIUX개편_화면설계서_메시지_v0.8_20230630']
  },
  {
    'depth4': '레이아웃 등록',
    'screenId': '',
    'status': [''],
    'link': '/LayoutRegistration',
    'pubData': 'v1 07-21',
    'isPublished': true,
    'comments': ['']
  },
  // 브랜드 대시보드
  {
    'depth2': '브랜드 대시보드',
    'depth3': '홈',
    'screenId': '',
    'status': ['0630: 기획 공유', '0630: 개발 공유'],
    'link': '/BrandDashboard',
    'pubData': 'v1 07-31',
    'isPublished': true,
    'comments': ['참고기획서 버전: 2023RBC_UIUX개편_화면설계서_브랜드대시보드_v0.6_20230623']
  },
  // 선거 대시보드
  {
    'depth1': '선거',
    'depth2': '선거대시보드',
    'depth3': '홈',
    'screenId': '',
    'status': ['0628: 기획 공유', '0628: 개발 공유'],
    'link': '/ElectionDashboard',
    'pubData': 'v1 07-24',
    'isPublished': true,
    'comments': ['참고기획서 버전: 2023RBC_UIUX개편_화면설계서_선거_v0.7_20230623']
  },
  {
    'depth3': '운영중인 브랜드',
    'screenId': '',
    'status': ['0628: 기획 공유', '0628: 개발 공유'],
    'link': '/OperatingBrandList',
    'pubData': 'v1 07-24',
    'isPublished': true,
    'comments': ['참고기획서 버전: 2023RBC_UIUX개편_화면설계서_선거_v0.7_20230623']
  },
  {
    'depth3': '대화방 개설',
    'screenId': '',
    'status': ['0628: 기획 공유', '0628: 개발 공유'],
    'link': '/ChatroomOpen',
    'pubData': 'v1 07-24',
    'isPublished': true,
    'comments': ['참고기획서 버전: 2023RBC_UIUX개편_화면설계서_선거_v0.7_20230623']
  }
]

export { guideList, homeList, dashboardList }
