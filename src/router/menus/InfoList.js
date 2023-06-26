// 통계
import MsgStatList from '@/views/brand/stat/MsgStatList'
import ChartAll from '@/views/brand/stat/ChartAll'
import MsgStatListView from '@/views/brand/stat/MsgStatListView'
import ChatRoomMenuStat from '@/views/brand/stat/ChatRoomMenuStat'
import BrandFeedStat from '@/views/brand/stat/BrandFeedStat'
import BrandFeedStatView from '@/views/brand/stat/BrandFeedStatView'

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
  },
  {
    path: '/ChatRoomMenuStat',
    component: ChatRoomMenuStat,
    meta: {
      tittle: '대화방 메뉴 통계',
      breadcrumb: false
    }
  },
  {
    path: '/BrandFeedStat',
    component: BrandFeedStat,
    meta: {
      tittle: '브랜드 소식 통계',
      breadcrumb: false
    }
  },
  {
    path: '/BrandFeedStatView',
    component: BrandFeedStatView,
    meta: {
      tittle: '브랜드 소식 통계 상세',
      breadcrumb: false
    }
  }
]
