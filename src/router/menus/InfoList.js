// 통계
import MsgStatList from '@/views/brand/stat/MsgStatList'
import ChartAll from '@/views/brand/stat/ChartAll'
import MsgStatListView from '@/views/brand/stat/MsgStatListView'

export default [
  // 통계
  {
    path: '/MsgStatList',
    component: MsgStatList,
    meta: {
      tittle: '메시지 통계',
      breadcrumb: false
    }
  },
  {
    path: '/ChartAll',
    component: ChartAll,
    meta: {
      tittle: '챠트 모음',
      breadcrumb: false
    }
  },
  {
    path: '/MsgStatListView',
    component: MsgStatListView,
    meta: {
      tittle: '메시지 통계 상세',
      breadcrumb: false
    }
  }
]
