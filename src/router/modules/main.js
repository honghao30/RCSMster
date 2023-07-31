import RouterSection from '@/Layout/components/RouterSection.vue'

export default {
  path: '/',
  name: 'main',
  component: RouterSection,
  children: [
    {
      path: '',
      name: 'root',
      component: () => import('@/views/main/Main.vue'),
      meta: {
        tittle: '메인',
        respons: true
      }
    },
    {
      path: 'main',
      name: 'Main',
      component: () => import('@/views/main/Main.vue'),
      meta: {
        tittle: '메인',
        respons: true
      }
    }
  ]
}
