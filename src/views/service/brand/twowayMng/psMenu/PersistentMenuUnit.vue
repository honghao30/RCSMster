<template>
  <div>
    <div class="rcs_container service_wrap">
      <article id="content" class="content">
        <div class="box_breadcrumb">
          <breadcrumb :depth1MenuId="'M0200'" :depth2MenuId="'M0201'" :depth3MenuId="'대화방 메뉴'"/>
        </div>
        <brand-top active="psMenu" :brandId="brandId"></brand-top>
        <div class="dashboard_wrap">
          <section class="section">
            <div class="title_area mar_b20 inline pad_b20 br_bottom">
              <h3 class="h3_title" v-html="procTitle" />
              <div v-html="procDesc"/>
            </div>
            <div v-if="ready" class="rcs_bundle_wrap new-emu_sticky">
              <!-- 에뮬레이터 -->
              <ChatbotEmulator
                ref="chatbotEmulator"
                type="psMenu"
                :isShowDefMsg="false"
                :brandId="brandId"
                :chatbot="twowayChatbotData"
                :psMenu="psMenuList"
                :psMenuSelectedMenuIdx.sync="psMenuSelectedMenuIdx"
                :autoReply="armData"
                autoReplyMode="view"
                :autoReplyTemplate="armTemplate"
                @updateSelectedSubMenu="updateSelectedSubMenu"/>
              <!-- 작성/수정 화면 -->
              <PersistentMenuWrite
                ref="psMenuWrite"
                :isNew="isNew"
                :twowayChatbotData="twowayChatbotData"
                :psMenuList.sync="psMenuList"
                :psMenuSelectedMenuIdx.sync="psMenuSelectedMenuIdx"
                :psMenuStatus="psMenuStatus"
                @updateAutoReplyData="setAutoReplyData"
                @updateSelectedSubMenu="updateSelectedSubMenu"/>
            </div>
          </section>
        </div>
      </article>
    </div>
  </div>
</template>
<script>
import Breadcrumb from '@/components/global/Breadcrumb'
import BrandTop from '@/views/service/components/BrandTop'
import ChatbotEmulator from '@/views/service/components/chatbot/ChatbotEmulator'
import PersistentMenuWrite from '@/views/service/brand/twowayMng/psMenu/PersistentMenuWrite'
import { getTwowayChatbotDetail } from '@/api/service/chatbot'
import { retireveAutoReplyInfo, reformSuggestForView } from '@/api/service/autoReply'
import { parsePersistentMenu, initialPersistentMenu, getPersistentDetail } from '@/api/service/persistentMenu'
export default {
  name: 'PersistentMenuUnit',
  components: {
    Breadcrumb,
    BrandTop,
    ChatbotEmulator,
    PersistentMenuWrite
  },
  props: {
    isNew: { type: Boolean, default: true },
    brandId: { type: String },
    chatbotId: { type: String }
  },
  data() {
    return {
      procTitle: '',
      procDesc: '<ul class="bullet_list fs18"><li>대화방 메뉴를 설정할 수 있습니다.</li><li>대화방 메뉴 등록/변경 시 단말 내 대화방 실제 반영은 최대 10분 정도 소요될 수 있습니다.</li></ul>',
      ready: false,
      // isNew: true,
      twowayChatbotData: null, // 양방향 대화방 정보
      psMenuList: [],
      psMenuSelectedMenuIdx: 0, // 선택된 대화방 메뉴 index
      psMenuStatus: '',
      topMenuList: [], // 상위메뉴 리스트
      subMenuList: [], // 하위메뉴 리스트
      armData: null, // 자동응담 메시지 내용
      armTemplate: null // 자동응담 메시지 템플릿
    }
  },
  watch: {
    /**  상위메뉴 선택 변경시 동작  */
    psMenuSelectedMenuIdx(idx) {
      if (idx > -1) {
        let menu = this.psMenuList[idx]
        if (menu.type === 'auto_reply') {
          this.setAutoReplyData(menu.armId)
        } else if (menu.type === 'sub_menu' && menu.subMenu[0].type === 'auto_reply') {
          this.setAutoReplyData(menu.subMenu[0].armId)
        } else {
          this.clearAutoReplyData()
        }
      }
    }
  },
  created() {
    // * 대화방 메뉴는 항상 입력가능한 상태(신규인지, 이전 대화방메뉴 수정인지에 대한 구분만 필요 -> isNew)
    this.init()
    this.procTitle = this.isNew ? '대화방 메뉴 등록' : '대화방 메뉴 수정'
  },
  methods: {
    async init() {
      let twowayInfo = await getTwowayChatbotDetail(this.brandId, { chatbotId: this.chatbotId }).catch(() => {})
      if (twowayInfo.code === '20000000') {
        this.twowayChatbotData = twowayInfo.result
      }
      // psmenu
      let psMenuInfo = await getPersistentDetail(this.brandId, { brandId: this.brandId, chatbotId: this.chatbotId }).catch(() => {})
      if (psMenuInfo.result.length > 0) { // 등록된 대화방 메뉴가 있음
        this.psMenuStatus = psMenuInfo.result[0].psMenuStatus
        // upPostbackId 의 유무로 상위/하위 메뉴를 나눈다.
        this.topMenuList = psMenuInfo.result.filter(menu => jglib.isEmpty(menu.upPostbackId))
        this.subMenuList = psMenuInfo.result.filter(menu => !jglib.isEmpty(menu.upPostbackId))
        this.psMenuList = parsePersistentMenu(this.topMenuList, this.subMenuList)
        if (this.psMenuList[0].type === 'auto_reply') {
          this.setAutoReplyData(this.psMenuList[0].armId)
        } else if (this.psMenuList[0].type === 'sub_menu' && this.psMenuList[0].subMenu[0].type === 'auto_reply') {
          this.setAutoReplyData(this.psMenuList[0].subMenu[0].armId)
        }
      } else { // 등록된 대화방 메뉴가 없음
        this.twowayChatbotData.psMenuYn = 'Y' // 대화방 사용여부 default: '사용'으로 하고 화면 출력
        this.psMenuList = initialPersistentMenu()
      }
      this.ready = true
    },
    // 자동응답메시지 정보 조회
    setAutoReplyData(armId) {
      if (!jglib.isEmpty(armId)) {
        retireveAutoReplyInfo(this.brandId, armId).then(res => {
          if (res.code === '20000000') {
            this.armData = reformSuggestForView(this.brandId, res.result.autoReply, res.result.templateContent)
            this.armTemplate = res.result.templateContent
          }
        }).catch((err) => {
          this.$alertMsg(err.desc).then(() => {})
        })
      } else {
        this.armData = null
        this.armTemplate = null
      }
    },
    // 자동응답메시지 초기화
    clearAutoReplyData() {
      this.armData = null
      this.armTemplate = null
    },
    // 하위메뉴 선택이 변경되는 경우
    updateSelectedSubMenu({ to, subIdx }) {
      let target = this.psMenuList[this.psMenuSelectedMenuIdx].subMenu[subIdx]
      if (target.type === 'auto_reply') {
        this.setAutoReplyData(target.armId)
      } else {
        this.clearAutoReplyData()
      }
      this.$refs[to].updateSelectedSubPsMenu(subIdx)
    }
  }
}
</script>
