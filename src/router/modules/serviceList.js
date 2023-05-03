import RouterSection from '@/Layout/components/RouterSection'
import Dashboard from '@/views/service/Dashboard'
// import CreateBrand from '@/views/service/CreateBrand'
import CreateBrand from '@/views/service/brand/brand/create/BrandCreate'
// import ApprovalBrand from '@/views/service/ApprovalBrand'
import ApprovalBrand from '@/views/service/brand/brand/approval/BrandApproval'
import TechnicalSupport from '@/views/service/TechnicalSupport'
import CallingNumberManagement from '@/views/service/CallingNumberManagement' // (as-is)단방향 대화방 목록
import CallingTwoWayManagement from '@/views/service/CallingTwoWayManagement' // (as-is)양방향 대화방 목록
import StatMessage from '@/views/service/brand/stat/StatMessage'
import StatPersistentMenu from '@/views/service/brand/stat/StatPersistentMenu'
import IndividualRegistration from '@/views/service/IndividualRegistration' // (as-is)단방향 대화방 등록
import TwoWayRegistration from '@/views/service/TwoWayRegistration' // (as-is) 양방향 대화방 등록
import QuantityRegistration from '@/views/service/QuantityRegistration' // (as-is) 대화방 대량 등록
import TemplateList from '@/views/service/TemplateList'
import CreateTemplateUnit from '@/views/service/CreateTemplateUnit'
import CreateTemplateBulk from '@/views/service/CreateTemplateBulk'
import CreateImageTemplateUnit from '@/views/service/CreateImageTemplateUnit'
import RetrieveApprovalStat from '@/views/service/RetrieveApprovalStat'
import TwoWayRetrieveApprovalStat from '@/views/service/TwoWayRetrieveApprovalStat'
import TemplateFree from '@/views/service/TemplateFree'
import ManageList from '@/views/service/ManageList'
import AdminAuthApply from '@/views/service/AdminAuthApply'
import AutoReplyListOld from '@/views/service/AutoReplyList' // (as-is) 자동응답관리
import AutoReplyInfo from '@/views/service/AutoReplyInfo' // (as-is) 자동응답관리
import CreateTemplateUnitSelectTheme from '@/views/service/CreateTemplateUnitSelectTheme'
// import TemplateDetail from '@/views/service/TemplateDetail'

/* (new) 발신번호 관리 */
import SendNumList from '@/views/service/brand/sendnumMng/SendNumList'
import OnewayChatbotUnit from '@/views/service/brand/sendnumMng/OnewayChatbotUnit'
/* (new) 양방향 대화방 관리 > 양방향 대화방 */
import TwowayChatbotList from '@/views/service/brand/twowayMng/twoway/TwowayChatbotList'
import TwowayChatbotUnit from '@/views/service/brand/twowayMng/twoway/TwowayChatbotUnit'
/* (new) 양방향 대화방 관리 > 대화방 메뉴 */
import PersistentMenuList from '@/views/service/brand/twowayMng/psMenu/PersistentMenuList'
import PersistentMenuUnit from '@/views/service/brand/twowayMng/psMenu/PersistentMenuUnit'
/* (new) 양방향 대화방 관리 > 자동응답관리 */
import AutoReplyList from '@/views/service/brand/twowayMng/autoReply/AutoReplyList'
import AutoReplyUnit from '@/views/service/brand/twowayMng/autoReply/AutoReplyUnit'

export default {
  path: '/service',
  name: 'service',
  component: RouterSection,
  children: [
    {
      path: 'dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { loginRequired: true }
    },
    /* 기술지원 */
    {
      path: 'support',
      name: 'TechnicalSupport',
      component: TechnicalSupport,
      meta: { loginRequired: true }
    },
    /* (부관리자) 관리자 권한 신청 */
    {
      path: 'apply-adm',
      name: 'AdminAuthApply',
      component: AdminAuthApply,
      meta: { loginRequired: true }
    },
    /* 브랜드 관리 */
    {
      path: 'brand/open',
      name: 'CreateBrand',
      component: CreateBrand,
      meta: { loginRequired: true }
    },
    {
      path: 'brand/:brandId/detail',
      name: 'brand/detail',
      component: ApprovalBrand,
      meta: { loginRequired: true }
    },
    /* (to-be) 발신번호 관리 */
    {
      path: 'brand/:brandId/sendnum',
      name: 'SendNumList',
      component: SendNumList,
      meta: { loginRequired: true }
    },
    {
      path: 'brand/:brandId/sendnum/unit',
      name: 'OnewayChatbotUnit',
      component: OnewayChatbotUnit,
      meta: { loginRequired: true },
      props: true
    },
    {
      path: 'brand/:brandId/sendnum/:chatbotId',
      name: 'OnewayChatbotDetail',
      component: OnewayChatbotUnit,
      meta: { loginRequired: true },
      props: true
    },
    /* (to-be) 양방향 대화방 관리 */
    // 1) 양방향 대화방
    {
      path: 'brand/:brandId/twoway',
      name: 'TwowayChatbotList',
      component: TwowayChatbotList,
      meta: { loginRequired: true }
    },
    {
      path: 'brand/:brandId/twoway/unit',
      name: 'TwowayChatbotUnit',
      component: TwowayChatbotUnit,
      meta: { loginRequired: true },
      props: true
    },
    {
      path: 'brand/:brandId/twoway/unit/:chatbotId',
      name: 'TwowayChatbotDetail',
      component: TwowayChatbotUnit,
      meta: { loginRequired: true },
      props: true
    },
    // 2) 대화방 메뉴
    {
      path: 'brand/:brandId/psmenu',
      name: 'PersistentMenuList',
      component: PersistentMenuList,
      meta: { loginRequired: true }
    },
    {
      path: 'brand/:brandId/psmenu/unit/:chatbotId',
      name: 'PersistentMenuUnit',
      component: PersistentMenuUnit,
      meta: { loginRequired: true },
      props: true
    },
    {
      path: 'brand/:brandId/psmenu/unit/:chatbotId',
      name: 'PersistentMenuDetail',
      component: PersistentMenuUnit,
      meta: { loginRequired: true },
      props: true
    },
    // 3) 자동응담 메시지
    {
      path: 'brand/:brandId/autoreply',
      name: 'AutoReplyList',
      component: AutoReplyList,
      meta: { loginRequired: true }
    },
    {
      path: 'brand/:brandId/autoreply/unit',
      name: 'AutoReplyUnit',
      component: AutoReplyUnit,
      meta: { loginRequired: true },
      props: true
    },
    {
      path: 'brand/:brandId/autoreply/unit/:armId',
      name: 'AutoReplyDetail',
      component: AutoReplyUnit,
      meta: { loginRequired: true },
      props: true
    },
    /* 템플릿 관리 */
    {
      path: 'brand/:brandId/template',
      name: 'TemplateList',
      component: TemplateList,
      meta: { loginRequired: true }
    },
    {
      path: 'brand/:brandId/template/create',
      name: 'CreateTemplateUnitSelectTheme',
      component: CreateTemplateUnitSelectTheme,
      meta: { loginRequired: true }
    },
    {
      path: 'brand/:brandId/template/unit',
      name: 'CreateTemplateUnit',
      component: CreateTemplateUnit,
      meta: { loginRequired: true }
    },
    {
      path: 'brand/:brandId/imageTemplate/unit',
      name: 'CreateImageTemplateUnit',
      component: CreateImageTemplateUnit,
      meta: { loginRequired: true },
      props: true
    },
    {
      path: 'brand/:brandId/template/bulk',
      name: 'CreateTemplateBulk',
      component: CreateTemplateBulk,
      meta: { loginRequired: true }
    },
    {
      path: 'brand/:brandId/template/:tplId',
      name: 'TemplateDetail',
      component: CreateTemplateUnit,
      meta: { loginRequired: true },
      props: true
    },
    {
      path: 'brand/:brandId/imageTemplate/:tplId',
      name: 'ImageTemplateDetail',
      component: CreateImageTemplateUnit,
      meta: { loginRequired: true },
      props: true
    },
    {
      path: 'brand/:brandId/template/free/:tplId',
      name: 'TemplateFree',
      component: TemplateFree,
      meta: { loginRequired: true }
    },
    /* 고객 반응 통계 */
    {
      path: 'brand/:brandId/stat/statMessage',
      name: 'StatMessage',
      component: StatMessage,
      meta: { loginRequired: true }
    },
    {
      path: 'brand/:brandId/stat/statPersistentMenu',
      name: 'StatPersistentMenu',
      component: StatPersistentMenu,
      meta: { loginRequired: true }
    },
    /* 운영관리 */
    {
      path: 'brand/:brandId/mng',
      name: 'ManageList',
      component: ManageList,
      meta: { loginRequired: true }
    },
    /* (as-is) 자동응답관리 */
    {
      path: 'brand/:brandId/autoreply',
      name: 'AutoReplyListOld',
      component: AutoReplyListOld,
      meta: { loginRequired: true }
    },
    {
      path: 'brand/:brandId/autoreply/unit',
      name: 'CreateAutoReplyUnit',
      component: AutoReplyInfo,
      meta: { loginRequired: true }
    },
    {
      path: 'brand/:brandId/autoreply/:armId',
      name: 'AutoReplyInfo',
      component: AutoReplyInfo,
      meta: { loginRequired: true }
    },
    /* (as-is) 대화방 관리 */
    {
      path: 'brand/:brandId/sendnum',
      name: 'CallingNumberManagement',
      component: CallingNumberManagement,
      meta: { loginRequired: true }
    },
    {
      path: 'brand/:brandId/twoway',
      name: 'CallingTwoWayManagement',
      component: CallingTwoWayManagement,
      meta: { loginRequired: true }
    },
    {
      path: 'brand/:brandId/sendnum/unit',
      name: 'IndividualRegistration',
      component: IndividualRegistration,
      meta: { loginRequired: true }
    },
    {
      path: 'brand/:brandId/twoway/unit',
      name: 'TwoWayRegistration',
      component: TwoWayRegistration,
      meta: { loginRequired: true }
    },
    {
      path: 'brand/:brandId/sendnum/bulk',
      name: 'QuantityRegistration',
      component: QuantityRegistration,
      meta: { loginRequired: true }
    },
    {
      path: 'brand/:brandId/sendnum/unit/:chatbotId',
      name: 'RetrieveApprovalStat',
      component: RetrieveApprovalStat,
      meta: { loginRequired: true }
    },
    {
      path: 'brand/:brandId/twoway/unit/:chatbotId',
      name: 'TwoWayRetrieveApprovalStat',
      component: TwoWayRetrieveApprovalStat,
      meta: { loginRequired: true }
    }
  ]
}
