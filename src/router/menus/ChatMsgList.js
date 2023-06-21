// 템플릿
import Template from '@/views/brand/template/Template'
import TemplateList from '@/views/brand/template/TemplateList'
import Creater from '@/views/brand/template/TemplateCreater'
// 챗봇
import ChatbotList from '@/views/brand/chatbot/ChatbotList'
import ChatbotRegistration from '@/views/brand/chatbot/ChatbotRegistration'
import ChatbotModified from '@/views/brand/chatbot/ChatbotModified'
import ChatbotView from '@/views/brand/chatbot/ChatbotView'

export default [
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
      tittle: '템플릿 목록',
      breadcrumb: false
    },
    props: true
  },
  {
    path: '/Creater',
    component: Creater,
    name: 'Creater',
    meta: {
      tittle: '템플릿 작성',
      breadcrumb: false
    },
    props: true
  },
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
  }
]
