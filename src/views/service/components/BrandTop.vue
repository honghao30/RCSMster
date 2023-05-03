<template>
  <div>
    <div class="top_business_area">
      <div class="inner">
        <strong class="title">{{ name }}</strong>
        <div class="desc_area">
          <span>관리자 <strong>{{ mgrUserNm }}</strong></span>
          <span v-if="contractList && contractList.length > 0" class="tit_tooltip_area">
            <span class="btn_info">대행사 <strong>{{ agency }}</strong></span>
            <div class="box_tooltip" v-if="contractList && contractList.length > 1">
              <template>
                <div v-for="(str, index) in contractList" :key="index">
                  {{str.agencyNm}}({{str.agencyId}})
                </div>
              </template>
            </div>
          </span>
          <span v-else>대행사 등록이 필요합니다.</span>
        </div>
      </div>
    </div>
    <div class="cate_wrap">
      <ul class="cate_nav">
        <li v-for="(tab, index) in tabs"
            :key="`brandTab_${index}`"
            :class="[
              { 'active': active === tab.id },
              { 'active': (active === 'twowayChat' || active === 'psMenu' || active === 'autoReply') && index === 2 },
              { 'active': (active === 'statMessage' || active === 'statPersistentMenu') && index === 5 },
              { 'hasDep2': 'chat' === tab.id || 'twowayMng' === tab.id || 'stat' === tab.id }]"
        >
          <a href="javascript:void(0);" @click="goBrandTab(tab)">{{ tab.tabName }}</a>
          <!-- 추후 제거 필요 -->
          <div class="dep2" v-if="'chat' === tab.id" :style="(active === 'sendnum' || active === 'twoway') ? '' : ''">
            <a href="javascript:void(0);" v-for="(subTab, subIndex) in tab.subMenu" :key="`brandTab_${subIndex}`" @click="goBrandTab(subTab)" :class="{'active': active === subTab.id}">{{ subTab.tabName }}</a>
          </div>
          <!-- 임시 스타일 적용 -->
          <div class="dep2" v-if="'twowayMng' === tab.id" :style="(active === 'twowayChat' || active === 'psMenu' || active === 'autoReply') ? '' : ''" style="width: 400px">
            <a href="javascript:void(0);" v-for="(subTab, subIndex) in tab.subMenu" :key="`brandTab_${subIndex}`" @click="goBrandTab(subTab)" :class="{'active': active === subTab.id}">{{ subTab.tabName }}</a>
          </div>
          <div class="dep2" v-else-if="'stat' === tab.id" :style="(active === 'statMessage' || active === 'statPersistentMenu') ? '' : ''">
            <a href="javascript:void(0);" v-for="(subTab, subIndex) in tab.subMenu" :key="`brandTab_${subIndex}`" @click="goBrandTab(subTab)" :class="{'active': active === subTab.id}">{{ subTab.tabName }}</a>
          </div>
          <div class="box_tooltip" v-if="disabledTab && active !== tab.id">
            <p>브랜드 개설완료 후 진입이 가능합니다.</p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import store from '@/store'

export default {
  name: 'BrandTop',
  props: {
    active: {
      // 현재 탭
      type: String,
      default: 'brand'
    },
    brandId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      name: '',
      mgrUserNm: '',
      mgrUserId: '',
      agency: '',
      status: '',
      aprvRet: '',
      aprvHistYn: '',
      activeYn: '',
      contractList: [],
      // (check?)
      tabList: [
        { id: 'brand', tabName: '브랜드 관리', routerName: 'brand/detail' },
        { id: 'sendnumMng', tabName: '발신번호 관리', routerName: 'SendNumList' },
        {
          id: 'twowayMng',
          tabName: '양방향 대화방 관리',
          routerName: 'TwowayChatbotList',
          subMenu: [
            { id: 'twowayChat', tabName: '양방향 대화방', routerName: 'TwowayChatbotList' }, // id값 임시 => 나중에 twoway로 변경필요
            { id: 'psMenu', tabName: '대화방 메뉴', routerName: 'PersistentMenuList' },
            { id: 'autoReply', tabName: '자동 응답 메시지', routerName: 'AutoReplyList' } // id값 임시 => 나중에 autoReply로 변경필요
          ]
        },
        { id: 'template', tabName: '템플릿 관리', routerName: 'TemplateList' },
        { id: 'mng', tabName: '운영 관리', routerName: 'ManageList' },
        {
          id: 'stat',
          tabName: '고객 반응 통계',
          routerName: 'StatMessage',
          subMenu: [
            { id: 'statMessage', tabName: '메시지', routerName: 'StatMessage' },
            { id: 'statPersistentMenu', tabName: '대화방 메뉴', routerName: 'StatPersistentMenu' }
          ]
        }
      ]
    }
  },
  computed: {
    tabs() {
      let tabs = []
      this.tabList.forEach(o => {
        if (o.id === 'mng') {
          if (this.$store.state.user.userId === this.mgrUserId && this.$store.state.user.userType === 'CORP') {
            tabs.push(o)
          }
        } else {
          tabs.push(o)
        }
      })
      return tabs
    },
    disabledTab() {
      return this.activeYn === 'N'
    },
    refresh() {
      return this.active === 'brand'
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getApprovalBrand()
    },
    getApprovalBrand() {
      store.dispatch('GetBrand', { brandId: this.brandId }).then(res => {
        this.name = res.name
        this.mgrUserNm = res.mgrUserNm
        this.mgrUserId = res.mgrUserId
        this.agency = res.agencyNm
        this.status = res.status
        this.aprvRet = res.aprvRet
        this.aprvHistYn = res.aprvHistYn || 'N'
        this.activeYn = res.activeYn
        this.contractList = res.contractList

        if (this.contractList && this.contractList.length > 0) {
          const agencyInfo = this.contractList[0]
          this.agency = `${agencyInfo.agencyNm}(${agencyInfo.agencyId})`
          if (this.$store.state.user.userType !== `AGENCY`) {
            this.agency = `${this.agency}${this.contractList.length > 1 ? ' 외' : ''}`
          }
        }

        if (res.activeYn === 'N') {
          this.$router.push({
            name: 'brand/detail',
            params: { brandId: this.brandId }
          })
        }
      })
    },
    goBrandTab(tab) {
      this.$store.commit('searchcondition/allClearSearchCondition') // 탭 변경 시 검색조건을 모두 초기화 한다.
      if (!this.disabledTab) {
        this.$router
          .push({
            name: tab.routerName,
            params: { brandId: this.brandId }
          })
          .catch(() => {})
      }
    }
  }
}
</script>

<style>
</style>
