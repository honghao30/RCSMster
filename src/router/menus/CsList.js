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
      tittle: '공지사항'
    }
  },
  {
    path: '/noticecontent',
    component: NoticeContent,
    meta: {
      tittle: '공지사항 상세'
    }
  },
  {
    path: '/faq',
    component: FAQ,
    meta: {
      tittle: 'FAQ'
    }
  },
  {
    path: '/OnlineInquire',
    component: OnlineInquire,
    meta: {
      tittle: '온라인 문의'
    }
  },
  {
    path: '/RequireList',
    component: RequireList,
    meta: {
      tittle: '온라인 문의 목록'
    }
  },
  // 알림
  {
    path: '/notification',
    component: Notification,
    meta: {
      tittle: '알림'
    }
  }
]
