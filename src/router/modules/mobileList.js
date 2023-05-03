import RouterSection from '@/Layout/components/RouterSection'
import BrandClaim from '@/views/mobile/brand/claim/BrandClaim'

export default {
  path: '/mobile',
  name: 'mobile',
  component: RouterSection,
  children: [
    {
      path: 'voc',
      name: 'brandClaim',
      component: BrandClaim
    }
  ]
}
