const navMenu = [
  {
    title: '서비스 소개',
    to: '/service',
    children: [
      {
        title: 'RCS 서비스 소개',
        to: '/service'
      },
      {
        title: 'RCS 도입사례',
        to: '/service'
      },
      {
        title: 'RCS 이용 안내',
        to: '/service'
      },
      {
        title: 'RCS 사용 가이드',
        to: '/service'
      },
      {
        title: '메시지 템플릿 안내',
        to: '/service'
      }
    ]
  },
  {
    title: '파트너사',
    to: '/partners'
  },
  {
    title: '고객센터',
    to: '/notice',
    children: [
      {
        title: '온라인 문의',
        to: '/notice'
      },
      {
        title: 'FAQ',
        to: '/faq'
      },
      {
        title: '공지 사항',
        to: '/notice'
      }
    ]
  },
  {
    title: '기술지원',
    to: '/tech-support'
  }
]

export default navMenu
