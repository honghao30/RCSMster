// 대화방
import ChatRoomList from '@/views/brand/chatroom/ChatRoomList'
import ChatRoomRegistration from '@/views/brand/chatroom/ChatRoomRegistration'
import ChatRoomRegistrationComplete from '@/views/brand/chatroom/ChatRoomRegistrationComplete'
import ChatRoomLargeRegistrationComplete from '@/views/brand/chatroom/ChatRoomLargeRegistrationComplete'
import ChatRoomModified from '@/views/brand/chatroom/ChatRoomModified'
import ChatRoomLargeModified from '@/views/brand/chatroom/ChatRoomLargeModified'
import ChatRoomListView from '@/views/brand/chatroom/ChatRoomListView'
import ChatRoomListLargeView from '@/views/brand/chatroom/ChatRoomListLargeView'

// 대화방 메뉴
import ChatRoomMenuAdd from '@/views/brand/chatroom/ChatRoomMenuAdd'
import ChatRoomMenuList from '@/views/brand/chatroom/ChatRoomMenuList'
import ChatRoomMenuView from '@/views/brand/chatroom/ChatRoomMenuView'
import ChatRoomMenuViewModified from '@/views/brand/chatroom/ChatRoomMenuViewModified'

export default [
  // 대화방
  {
    path: '/ChatRoomRegistration',
    component: ChatRoomRegistration,
    meta: {
      tittle: '대화방 등록',
      breadcrumb: false
    }
  },
  {
    path: '/ChatRoomRegistrationComplete',
    component: ChatRoomRegistrationComplete,
    meta: {
      tittle: '대화방 등록 완료',
      breadcrumb: false
    }
  },
  {
    path: '/ChatRoomLargeRegistrationComplete',
    component: ChatRoomLargeRegistrationComplete,
    meta: {
      tittle: '대화방 대량 등록 완료',
      breadcrumb: false
    }
  },
  {
    path: '/ChatRoomList',
    component: ChatRoomList,
    meta: {
      tittle: '대화방 목록',
      breadcrumb: false
    }
  },
  {
    path: '/ChatRoomModified',
    component: ChatRoomModified,
    meta: {
      tittle: '대화방 수정',
      breadcrumb: false
    }
  },
  {
    path: '/ChatRoomLargeModified',
    component: ChatRoomLargeModified,
    meta: {
      tittle: '대화방 대량 수정',
      breadcrumb: false
    }
  },
  {
    path: '/ChatRoomListView',
    component: ChatRoomListView,
    meta: {
      tittle: '대화방 목록 개별등록 상세',
      breadcrumb: false
    }
  },
  {
    path: '/ChatRoomListLargeView',
    component: ChatRoomListLargeView,
    meta: {
      tittle: '대화방 목록 대량등록 상세',
      breadcrumb: false
    }
  },
  // 대화방 메뉴
  {
    path: '/ChatRoomMenuAdd',
    component: ChatRoomMenuAdd,
    meta: {
      tittle: '대화방 메뉴 등록',
      breadcrumb: false
    }
  },
  {
    path: '/ChatRoomMenuList',
    component: ChatRoomMenuList,
    meta: {
      tittle: '대화방 메뉴 목록',
      breadcrumb: false
    }
  },
  {
    path: '/ChatRoomMenuView',
    component: ChatRoomMenuView,
    meta: {
      tittle: '대화방 메뉴 상세',
      breadcrumb: false
    }
  },
  {
    path: '/ChatRoomMenuViewModified',
    component: ChatRoomMenuViewModified,
    meta: {
      tittle: '대화방 메뉴 수정',
      breadcrumb: false
    }
  }
]
