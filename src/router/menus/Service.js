// RCS 특장점
import Feature from '@/views/service/Feature'
// 이용 가이드
import UseGuide from '@/views/service/UseGuide'

export default [
  // RCS 특장점
  {
    path: '/Feature',
    component: Feature,
    meta: {
      tittle: 'RCS 특장점',
      respons: true
    }
  },
  // 이용 가이드
  {
    path: '/UseGuide',
    component: UseGuide,
    meta: {
      tittle: '이용 가이드',
      respons: true
    }
  }
]
