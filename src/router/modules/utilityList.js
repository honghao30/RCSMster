import RouterSection from '@/Layout/components/RouterSection'
import MyInfo from '@/views/utility/MyInfo'
import SubagencyInfo from '@/views/utility/SubagencyInfo'
import CorpInfo from '@/views/utility/CorpInfo'
import ChangePassword from '@/views/utility/ChangePassword'
import ExceedPassword from '@/views/utility/ExceedPassword'

export default {
  path: '/utility',
  name: 'utility',
  component: RouterSection,
  children: [
    {
      path: 'my-info',
      name: 'MyInfo',
      component: MyInfo,
      meta: { loginRequired: true }
    },
    {
      path: 'subagency-info',
      name: 'SubagencyInfo',
      component: SubagencyInfo,
      meta: { loginRequired: true }
    },
    {
      path: 'company-info',
      name: 'CorpInfo',
      component: CorpInfo,
      meta: { loginRequired: true }
    },
    {
      path: 'password',
      name: 'ChangePassword',
      component: ChangePassword,
      meta: { loginRequired: true }
    },
    {
      path: 'exceed/password',
      name: 'ExceedPassword',
      component: ExceedPassword,
      meta: { loginRequired: true }
    }
  ]
}
