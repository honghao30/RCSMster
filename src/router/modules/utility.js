import RouterSection from '@/Layout/components/RouterSection.vue'

export default {
  path: '/utility',
  name: 'utility',
  component: RouterSection,
  children: [
    {
      path: 'my-info',
      name: 'MyInfo',
      component: () => import('@/views/mypage/my-info.vue'),
      meta: { loginRequired: true }
    },
    {
      path: 'company-info',
      name: 'CorpInfo',
      component: () => import('@/views/mypage/corp-info.vue'),
      meta: { loginRequired: true }
    },
    {
      path: 'subagency-info',
      name: 'SubagencyInfo',
      component: () => import('@/views/mypage/components/utility/SubagencyInfo.vue'),
      meta: { loginRequired: true }
    },
    {
      path: 'withdrawal',
      name: 'Withdrawal',
      component: () => import('@/views/mypage/with-drawal.vue'),
      meta: { loginRequired: true }
    },
    {
      path: 'apply-master',
      name: 'MasterAuthApply',
      component: () => import('@/views/mypage/MasterAuthApply.vue'),
      meta: { loginRequired: true }
    },
    {
      path: 'logout',
      name: 'Logout',
      component: () => import('@/views/mypage/components/utility/Logout.vue'),
      meta: { loginRequired: true }
    },
    {
      path: 'join',
      name: 'signUp',
      component: () => import('@/views/join/SignUp.vue'),
      meta: {
        tittle: '회원가입'
      }
    },
    {
      path: 'join/corp',
      name: 'joinCorp',
      component: () => import('@/views/join/JoinCorp.vue'),
      meta: {
        tittle: '운영자 가입'
      }
    },
    {
      path: 'join/agency',
      name: 'joinAgency',
      component: () => import('@/views/join/JoinAgency.vue'),
      meta: {
        tittle: '대행사 가입'
      }
    },
    {
      path: 'join/corp/:token',
      component: () => import('@/views/join/InviteJoinCorp.vue'),
      meta: {
        tittle: '운영자 가입'
      }
    }
  ]
}
