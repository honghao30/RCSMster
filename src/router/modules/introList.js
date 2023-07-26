import RouterSection from '@/Layout/components/RouterSection'
import Service from '@/views/intro/Service'
import ServiceUse from '@/views/intro/ServiceUse'
import MiriCanvas from '@/views/intro/MiriCanvas'

export default {
  path: '/intro',
  name: 'intro',
  component: RouterSection,
  children: [
    {
      path: 'service',
      name: 'introservice',
      component: Service
    },
    {
      path: 'serviceuse',
      name: 'serviceuse',
      component: ServiceUse
    },
    {
      path: 'miricanvas',
      name: 'miricanvas',
      component: MiriCanvas
    }
  ]
}
