import RouterSection from '@/Layout/components/RouterSection'
import TermsUse from '@/views/terms/TermsUse'
import TermsPrivacy from '@/views/terms/TermsPrivacy'

export default {
  path: '/terms',
  name: 'terms',
  component: RouterSection,
  children: [
    {
      path: 'use',
      name: 'TermsUse',
      component: TermsUse
    },
    {
      path: 'privacy',
      name: 'TermsPrivacy',
      component: TermsPrivacy
    }
  ]
}
