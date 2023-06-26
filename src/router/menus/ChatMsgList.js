
// 챗봇
import ChatbotList from '@/views/brand/chatbot/ChatbotList'
import ChatbotRegistration from '@/views/brand/chatbot/ChatbotRegistration'
import ChatbotModified from '@/views/brand/chatbot/ChatbotModified'
import ChatbotView from '@/views/brand/chatbot/ChatbotView'
// 템플릿
import Template from '@/views/brand/message/Template'
import TemplateList from '@/views/brand/message/TemplateList'
import TemplateMsgList from '@/views/brand/message/TemplateMsgList'
import TemplateRegistration from '@/views/brand/message/TemplateRegistration'
import TemplateView from '@/views/brand/message/TemplateView'

// 레이아웃
import LayoutRegistration from '@/views/brand/message/LayoutRegistration'
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
    path: '/template',
    component: Template,
    meta: {
      tittle: '템플릿',
      breadcrumb: false
    }
  },
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
  }
]
