// 고객센터
import NoticeView from '@/views/cs/Notice'
import NoticeContent from '@/views/cs/NoticeContent'
import FAQ from '@/views/cs/FAQ'
import OnlineInquire from '@/views/cs/OnlineInquire'
import RequireList from '@/views/cs/RequireList'
// 알림
import Notification from '@/views/notification/Notification'

export default [
  // 고객센터
  {
    path: '/notice',
    component: NoticeView,
    meta: {
      tittle: '공지사항',
      respons: true
    }
  },
  {
    path: '/noticecontent',
    component: NoticeContent,
    meta: {
      tittle: '공지사항 상세',
      respons: true
    }
  },
  {
    path: '/faq',
    component: FAQ,
    meta: {
      tittle: 'FAQ',
      respons: true
    }
  },
  {
    path: '/OnlineInquire',
    component: OnlineInquire,
    meta: {
      tittle: '온라인 문의',
      respons: true
    }
  },
  {
    path: '/RequireList',
    component: RequireList,
    meta: {
      tittle: '온라인 문의 목록',
      respons: true
    }
  },
  // 알림
  {
    path: '/notification',
    component: Notification,
    meta: {
      tittle: '알림',
      respons: true
    }
  }
]
