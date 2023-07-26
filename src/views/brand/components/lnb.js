const brandLnbList = [
  {
    'label': '브랜드 대시보드',
    'to': ''
  },
  {
    'label': '대화방',
    'to': '',
    'children': [
      {
        'label': '대화방 등록',
        'to': ''
      },
      {
        'label': '대화방 목록',
        'to': ''
      }
    ]
  },
  {
    'label': '메시지',
    'to': '',
    'children': [
      {
        'label': '템플릿 등록',
        'to': ''
      },
      {
        'label': '템플릿 목록',
        'to': { name: 'layoutList', params: { brandId: this.$router.currentRoute.params.brandId } }
      },
      {
        'label': '레이아웃 등록',
        'to': ''
      },
      {
        'label': '레이아웃 목록',
        'to': ''
      }
    ]
  },
  {
    'label': '챗봇',
    'to': '',
    'children': [
      {
        'label': '간편챗봇 메시지 등록',
        'to': ''
      },
      {
        'label': '간편챗봇 메시지 목록',
        'to': ''
      }
    ]
  },
  {
    'label': '대화방 메뉴',
    'to': '',
    'children': [
      {
        'label': '대화방 메뉴 등록',
        'to': ''
      },
      {
        'label': '대화방 메뉴 목록',
        'to': ''
      }
    ]
  },
  {
    'label': '브랜드 소식',
    'to': '',
    'children': [
      {
        'label': '브랜드 기본 소식 등록',
        'to': ''
      },
      {
        'label': '브랜드 소식 등록',
        'to': ''
      }
    ]
  },
  {
    'label': '통계',
    'to': '',
    'children': [
      {
        'label': '메시지 통계',
        'to': ''
      },
      {
        'label': '대화방 메뉴 통계',
        'to': ''
      },
      {
        'label': '브랜드 소식 통계',
        'to': ''
      }
    ]
  },
  {
    'label': '내 브랜드 관리',
    'to': '',
    'children': [
      {
        'label': '브랜드 홈 수정',
        'to': ''
      },
      {
        'label': '브랜드 운영 관리',
        'to': { name: 'brandManage', params: { brandId: this.$router.currentRoute.params.brandId } }
      },
      {
        'label': '안심마크 관리',
        'to': ''
      },
      {
        'label': '작업 히스토리',
        'to': ''
      }
    ]
  }
]

export default brandLnbList
