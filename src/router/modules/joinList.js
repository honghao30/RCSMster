import RouterSection from '@/Layout/components/RouterSection'
// import RetriveApplyJoinDefault from '@/views/join/RetriveApplyJoinDefault'
// import EnterpriseApplyJoin from '@/views/join/EnterpriseApplyJoin'
// import AgencyApplyJoin from '@/views/join/AgencyApplyJoin'
// import FindId from '@/views/join/FindId'
// import FindIdResult from '@/views/join/FindIdResult'
// import ReApply from '@/views/join/ReApply'
// import JoinCorp from '@/views/join/JoinCorp'
// import JoinCorpDone from '@/views/join/JoinCorpDone'
// import JoinCorpApplyDone from '@/views/join/JoinCorpApplyDone'
// import JoinAgency from '@/views/join/JoinAgency'
// import Password from '@/views/join/Password'
// import ResetPassword from '@/views/join/ResetPassword'
// import Agreement from '@/views/join/Agreement'

export default {
  path: '/join',
  name: 'join',
  component: RouterSection,
  children: [
    {
      path: 'retriveapply',
      name: 'retriveapply',
      // component: RetriveApplyJoinDefault
      component: () => import(/* webpackChunkName: "join" */ '@/views/join/RetriveApplyJoinDefault')
    },
    {
      path: 'enterpriseApplyJoin',
      name: 'enterpriseApplyJoin',
      // component: EnterpriseApplyJoin
      component: () => import(/* webpackChunkName: "join" */ '@/views/join/EnterpriseApplyJoin')
    },
    {
      path: 'agencyApplyJoin',
      name: 'agencyApplyJoin',
      // component: AgencyApplyJoin
      component: () => import(/* webpackChunkName: "join" */ '@/views/join/AgencyApplyJoin')
    },
    {
      path: 'findid',
      name: 'findid',
      // component: FindId
      component: () => import(/* webpackChunkName: "join" */ '@/views/join/FindId')
    },
    {
      path: 'findidresult',
      name: 'findidresult',
      // component: FindIdResult
      component: () => import(/* webpackChunkName: "join" */ '@/views/join/FindIdResult')
    },
    {
      path: 'reapply',
      name: 'reapply',
      // component: ReApply
      component: () => import(/* webpackChunkName: "join" */ '@/views/join/ReApply')
    },
    {
      path: 'corp',
      name: 'JoinCorp',
      // component: JoinCorp
      component: () => import(/* webpackChunkName: "join" */ '@/views/join/JoinCorp')
    },
    {
      path: 'corp/done',
      name: 'JoinCorpDone',
      // component: JoinCorpDone
      component: () => import(/* webpackChunkName: "join" */ '@/views/join/JoinCorpDone')
    },
    {
      path: 'corp/apply/done',
      name: 'JoinCorpApplyDone',
      // component: JoinCorpApplyDone
      component: () => import(/* webpackChunkName: "join" */ '@/views/join/JoinCorpApplyDone')
    },
    {
      path: 'agency',
      name: 'JoinAgency',
      // component: JoinAgency
      component: () => import('@/views/join/JoinAgency')
    },
    {
      path: 'password',
      name: 'Password',
      // component: Password,
      component: () => import(/* webpackChunkName: "join" */ '@/views/join/Password'),
      props: true
    },
    {
      path: 'resetPassword',
      name: 'ResetPassword',
      // component: ResetPassword,
      component: () => import(/* webpackChunkName: "join" */ '@/views/join/ResetPassword'),
      props: true
    },
    {
      path: 'agreement',
      name: 'Agreement',
      // component: Agreement
      component: () => import(/* webpackChunkName: "join" */ '@/views/join/Agreement')
    }
  ]
}
