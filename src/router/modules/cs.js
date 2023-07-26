import RouterSection from '@/Layout/components/RouterSection.vue'

export default {
  path: '/cs',
  name: 'cs',
  component: RouterSection,
  children: [
    {
      path: 'notice',
      name: 'Notice',
      component: () => import('@/views/cs/Notice.vue'),
      meta: {
        tittle: '공지사항 목록',
        respons: true
      }
    },
    {
      path: 'notice/:no',
      name: 'NoticeContent',
      component: () => import('@/views/cs/NoticeContent.vue'),
      meta: {
        tittle: '공지사항 상세',
        respons: true
      }
    },
    {
      path: 'faq',
      name: 'Faq',
      component: () => import('@/views/cs/FAQ.vue'),
      meta: {
        tittle: 'FAQ',
        respons: true
      }
    },
    {
      path: 'qna',
      name: 'OnlineInquire',
      component: () => import('@/views/cs/OnlineInquire.vue'),
      meta: {
        tittle: '온라인 문의',
        respons: true
      }
    },
    {
      path: 'qna/list',
      name: 'RequireList',
      component: () => import('@/views/cs/RequireList.vue'),
      meta: {
        tittle: '온라인 문의 목록',
        respons: true
      }
    }
  ]
}
