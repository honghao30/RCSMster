const guideList = [
  {
    'depth1': '개요',
    'status': '완료',
    'date': '2023-04-21',
    'link': '/PubGuides/'
  },
  {
    'depth1': '규칙 & 설계',
    'status': '완료',
    'date': '2023-04-21',
    'link': '/RullGuide'
  },
  {
    'depth1': 'UI 가이드',
    'status': '',
    'date': '2023-04-21',
    'link': '/UiGuides'
  },
  {
    'depth2': 'BEM 예시',
    'status': '완료',
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
    'status': '완료',
    'link': ''
  },
  {
    'depth2': '폼 요소',
    'status': '완료'
  },
  {
    'depth2': '탭',
    'status': '완료'
  },
  {
    'depth2': '버튼 & 아이콘',
    'status': ''
  },
  {
    'depth2': '모달',
    'status': '완료'
  },
  {
    'depth1': 'Layout',
    'status': ''
  },
  {
    'depth1': '퍼블 리스트',
    'status': '완료',
    'date': '2023-04-21',
    'link': '/PubList'
  }
]

const homeList = [
  // 로그인 & 아이디 찾기 & 비밀번호 재설정
  {
    'depth1': '로그인',
    'screenId': '',
    'status': '완료',
    'link': '/LoginPage',
    'comments': '공통적으로 임의의 값을 입력시 다음 페이지로 넘어감.'
  },
  {
    'depth2': '아이디 찾기',
    'screenId': '',
    'status': '완료',
    'link': '/IdFind'
  },
  {
    'depth3': '아이디 찾기 결과',
    'screenId': '',
    'status': '완료',
    'link': '/IdResult'
  },
  {
    'depth2': '비밀번호 찾기',
    'screenId': '',
    'status': '완료',
    'link': '/pwFind'
  },
  {
    'depth3': '비밀번호 변경',
    'screenId': '',
    'status': '완료',
    'link': '/PwReset'
  },
  {
    'depth3': '비밀번호 재설정',
    'screenId': '',
    'status': '완료',
    'link': '/PwChange'
  },
  {
    'depth1': '회원가입',
    'depth2': '회원가입 유형선택',
    'screenId': '',
    'status': '완료',
    'link': '/SignUp'
  },
  // 기업 담당자 회원가입
  {
    'depth2': '기업담당자 회원가입',
    'depth3': '약관동의',
    'screenId': 'G002',
    'status': '완료',
    'link': '/joinStep01',
    'comments': '공통적으로 임의의 값을 입력시 다음 페이지로 넘어감.'
  },
  {
    'depth3': '기업정보 입력',
    'screenId': '',
    'status': '완료',
    'link': '/joinStep02',
    'comments': '사업자등록번호 123 입력시 기압중인 단계 확인 가능.'
  },
  {
    'depth3': '회원정보 입력',
    'screenId': '',
    'status': '완료',
    'link': '/joinStep03',
    'comments': '휴대폰 번호 1 입력시 심사 중, 123 입력시 인증번호 받기'
  },
  {
    'depth3': '완료',
    'screenId': '',
    'status': '완료',
    'link': '/joinStep04',
    'comments': '단순 문구만 다른 케이스라, 요청시 지원 예정'
  },
  // 대행사 회원가입
  {
    'depth2': '대행사 회원가입',
    'depth3': '약관동의',
    'screenId': '',
    'status': '완료',
    'link': '/AgencyJoinStep01'
  },
  {
    'depth3': '대행사정보 입력',
    'screenId': '',
    'status': '완료',
    'link': '/AgencyJoinStep02'
  },
  {
    'depth3': '회원정보 입력',
    'screenId': '',
    'status': '완료',
    'link': '/AgencyJoinStep03'
  },
  {
    'depth3': '완료',
    'screenId': '',
    'status': '완료',
    'link': '/AgencyJoinStep04'
  },
  // 마이 페이지
  {
    'depth1': '마이페이지',
    'depth2': '개인회원 정보 관리',
    'screenId': '',
    'status': '완료',
    'link': '/myinfo'
  },
  {
    'depth2': '기업 회원정보 관리',
    'screenId': '',
    'status': '완료',
    'link': '/myinfoagency'
  },
  {
    'depth2': '기업 정보 관리(승인대기)',
    'screenId': '',
    'status': '완료',
    'link': '/corpinfo'
  },
  {
    'depth2': '기업 정보 관리(승인완료후)',
    'screenId': '',
    'status': '완료',
    'link': '/corpinfo-edit'
  },
  {
    'depth2': '회원탈퇴',
    'screenId': '',
    'status': '완료',
    'link': '/withdrawal'
  },
  // 고객센터
  {
    'depth1': '고객센터',
    'depth2': '공지사항',
    'depth3': '목록',
    'screenId': '',
    'status': '완료',
    'link': '/notice'
  },
  {
    'depth3': '공지사항 상세',
    'screenId': '',
    'status': '완료',
    'link': '/noticecontent'
  },
  {
    'depth2': 'FAQ',
    'screenId': '',
    'status': '완료',
    'link': '/faq'
  },
  {
    'depth2': '온라인 문의',
    'depth3': '작성',
    'screenId': '',
    'status': '완료',
    'link': '/OnlineInquire'
  },
  {
    'depth3': '목록',
    'screenId': '',
    'status': '완료',
    'link': '/RequireList'
  },
  // 알림
  {
    'depth1': '공통',
    'depth2': '알림',
    'screenId': '',
    'status': '완료',
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
    'depth1': '브랜드',
    'depth2': '브랜드 개설',
    'depth3': '기본 정보 입력',
    'screenId': '',
    'status': '완료',
    'link': '/brandcreatestep01'
  },
  {
    'depth3': '퀵 버튼 설정',
    'screenId': '',
    'status': '완료',
    'link': '/brandcreatestep02'
  },
  {
    'depth3': '브랜드 홈 탭 설정',
    'screenId': '',
    'status': '완료',
    'link': '/brandcreatestep03'
  },
  {
    'depth3': '브랜드 개설 완료',
    'screenId': '',
    'status': '완료',
    'link': '/brandcreatestep04'
  },
  {
    'depth2': '브랜드 대시보드',
    'screenId': ''
  },
  {
    'depth3': '대화방',
    'depth4': '등록',
    'screenId': ''
  },
  {
    'depth4': '목록',
    'screenId': 'B002_2'
  },
  {
    'depth4': '상세',
    'screenId': 'B002_21'
  },
  {
    'depth4': '수정',
    'screenId': ''
  },
  {
    'depth3': '메시지',
    'depth4': '템플릿 레이아웃',
    'depth5': '등록',
    'screenId': ''
  },
  {
    'depth5': '목록',
    'screenId': ''
  },
  {
    'depth5': '상세',
    'screenId': ''
  },
  {
    'depth5': '수정',
    'screenId': ''
  },
  {
    'depth4': '템플릿 메시지',
    'depth5': '등록',
    'screenId': ''
  },
  {
    'depth5': '목록',
    'screenId': ''
  },
  {
    'depth5': '상세',
    'screenId': ''
  },
  {
    'depth5': '수정',
    'screenId': ''
  },
  {
    'depth3': '챗봇',
    'depth4': '챗봇 연결',
    'screenId': 'B004_1'
  },
  {
    'depth4': '간편챗봇 메시지',
    'depth5': '등록',
    'screenId': 'B004_2'
  },
  {
    'depth5': '목록',
    'screenId': 'B004_3'
  },
  {
    'depth5': '상세',
    'screenId': ''
  },
  {
    'depth5': '수정',
    'screenId': ''
  },
  {
    'depth3': '대화방 메뉴',
    'depth4': '등록',
    'screenId': 'B005_1'
  },
  {
    'depth4': '목록',
    'screenId': 'B005_2'
  },
  {
    'depth4': '상세',
    'screenId': 'B005_21'
  },
  {
    'depth4': '수정',
    'screenId': 'B005_21'
  },
  {
    'depth3': '브랜드 소식',
    'depth4': '기본소식',
    'depth5': '등록',
    'screenId': 'B006_2'
  },
  {
    'depth4': '브랜드 소식',
    'depth5': '등록',
    'screenId': 'B005_2'
  },
  {
    'depth5': '수정',
    'screenId': ''
  },
  {
    'depth3': '통계',
    'depth4': '메시지 통계',
    'depth5': '목록',
    'screenId': 'B007_1'
  },
  {
    'depth5': '상세',
    'screenId': 'B007_11'
  },
  {
    'depth4': '대화방 메뉴 통계',
    'depth5': '목록',
    'screenId': 'B007_2'
  },
  {
    'depth5': '상세',
    'screenId': 'B007_21'
  },
  {
    'depth4': '브랜드 소식 통계',
    'depth5': '목록',
    'screenId': 'B007_3'
  },
  {
    'depth5': '상세',
    'screenId': 'B007_31'
  },
  {
    'depth3': '내 브랜드 관리',
    'depth4': '브랜드 홈 수정'
  },
  {
    'depth4': '대행사 관리'
  },
  {
    'depth4': '안심마크 관리'
  },
  {
    'depth4': '작업 히스토리'
  },
  {
    'depth1': '브랜드 개설',
    'depth2': '상세',
    'screenId': 'D002'
  },
  {
    'depth2': '수정',
    'screenId': ''
  },
  {
    'depth3': '[Popup] 브랜드 삭제',
    'screenId': ''
  },
  {
    'depth3': '[Popup] 브랜드 불러오기',
    'screenId': ''
  },
  {
    'depth1': '브랜드 목록',
    'screenId': ''
  },
  {
    'depth1': '브랜드 운영관리',
    'depth2': '운영 권한 초대',
    'screenId': 'D003'
  }
]

export { guideList, homeList, dashboardList }
