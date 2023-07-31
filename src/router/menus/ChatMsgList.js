
// 챗봇
import ChatbotList from '@/views/brand/autoreply/autoReplyMsgList.vue'
import ChatbotRegistration from '@/views/brand/autoreply/autoReplyMsgReg.vue'
import ChatbotModified from '@/views/brand/chatbot/ChatbotModified'
import ChatbotView from '@/views/brand/autoreply/autoReplyMsgDetail.vue'
// 템플릿
import TemplateList from '@/views/brand/message/template/TemplateList'
import TemplateMsgList from '@/views/brand/message/template/TemplateMsgList'
import TemplateRegistration from '@/views/brand/message/template/TemplateRegistration'
import TemplateView from '@/views/brand/message/template/TemplateView'

// 레이아웃
import LayoutRegistration from '@/views/brand/message/layout/LayoutRegistration'
import LayoutList from '@/views/brand/message/layout/LayoutList'
import LayoutView from '@/views/brand/message/layout/LayoutView'
export default [
  // 챗봇
  {
    path: '/ChatbotList',
    component: ChatbotList,
    meta: {
      tittle: '간편챗봇',
      breadcrumb: false
    }
  },
  {
    path: '/ChatbotRegistration',
    component: ChatbotRegistration,
    meta: {
      tittle: '간편챗봇 등록',
      breadcrumb: false
    }
  },
  {
    path: '/ChatbotModified',
    component: ChatbotModified,
    meta: {
      tittle: '간편챗봇',
      breadcrumb: false
    }
  },
  {
    path: '/ChatbotView',
    component: ChatbotView,
    meta: {
      tittle: '간편챗봇 상세',
      breadcrumb: false
    }
  },
  // 템플릿
  {
    path: '/TemplateList',
    component: TemplateList,
    meta: {
      tittle: '템플릿 메시지 등록',
      breadcrumb: false
    },
    props: true
  },
  {
    path: '/TemplateMsgList',
    component: TemplateMsgList,
    meta: {
      tittle: '템플릿 메시지 목록',
      breadcrumb: false
    },
    props: true
  },
  {
    path: '/TemplateView',
    component: TemplateView,
    meta: {
      tittle: '템플릿 메시지',
      breadcrumb: false
    },
    props: true
  },
  {
    path: '/TemplateRegistration',
    component: TemplateRegistration,
    name: 'Creater',
    meta: {
      tittle: '템플릿 작성',
      breadcrumb: false
    },
    props: true
  },
  {
    path: '/LayoutRegistration',
    component: LayoutRegistration,
    meta: {
      tittle: '레이아웃',
      breadcrumb: false
    },
    props: true
  },
  {
    path: '/LayoutList',
    component: LayoutList,
    meta: {
      tittle: '레이아웃 목록',
      breadcrumb: false
    },
    props: true
  },
  {
    path: '/LayoutView',
    component: LayoutView,
    meta: {
      tittle: '레이아웃',
      breadcrumb: false
    },
    props: true
  }
]
