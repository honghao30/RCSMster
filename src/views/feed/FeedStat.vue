<template>
  <div class="rcs_container service_wrap">
    <article id="content" class="content">
      <feed-corp-info :userInfoData="this.userInfo" :corpInfoData="this.corpInfo" :depth2MenuId="'M0303'"/>
      <div class="contents_wrap callerid_wrap">
        <div class="title_area mar_t50 mar_b30">
          <h3 class="h3_title">소식 통계</h3>
        </div>
        <div class="cate_wrap2 mar_b20">
          <ul class="cate_nav">
            <li :class="{ active: tabType === 'main' }">
              <a href="javascript:void(0);" @click="selectedTabType('main')">소식 메인</a>
            </li>
            <li :class="{ active: tabType === 'detail' }">
              <a href="javascript:void(0);" @click="selectedTabType('detail')">소식 상세</a>
            </li>
            <li :class="{ active: tabType === 'init' }">
              <a href="javascript:void(0);" @click="selectedTabType('init')">기본 소식</a>
            </li>
          </ul>
        </div>
        <section class="section mar_b0">
          <feed-stat-main :userType="this.userInfo.userType" v-if="tabType === 'main'"/>
          <feed-stat-detail-corp v-else-if="tabType === 'detail' && userInfo.userType !== 'AGENCY'"/>
          <feed-stat-detail-agency v-else-if="tabType === 'detail' && userInfo.userType === 'AGENCY'"/>
          <feed-stat-init :userType="this.userInfo.userType" v-if="tabType === 'init'"/>
        </section>
      </div>
    </article>
  </div>
</template>
<script>
import FeedCorpInfo from '@/views/feed/components/FeedCorpInfo'
import FeedStatMain from '@/views/feed/components/FeedStatMain'
import FeedStatDetailCorp from '@/views/feed/components/FeedStatDetailCorp'
import FeedStatDetailAgency from '@/views/feed/components/FeedStatDetailAgency'
import FeedStatInit from '@/views/feed/components/FeedStatInit'

import store from '@/store'
import { getUserInfo } from '@/api/service/service'

export default {
  name: 'FeedStat',
  components: {
    FeedCorpInfo,
    FeedStatMain,
    FeedStatDetailCorp,
    FeedStatDetailAgency,
    FeedStatInit
  },
  data() {
    return {
      userInfo: {
        userType: '',
        corpId: '',
        corpAdmYn: ''
      },
      corpInfo: {
        name: '', // 기업명
        corpId: '', // 기업ID
        aprvReqDt: '', // 등록일
        brandOperYn: '', // 브랜드 개설 여부
        reqCorpAdmYn: '', // 관리자 신청 여부(담당자)
        status: '',
        aprvStatus: ''
      },

      tabType: ''
    }
  },
  computed: {},
  watch: {},
  created() {
    store.dispatch('getUserInfo').then(userInfo => {
      this.userInfo.userType = userInfo.userType
      this.userInfo.corpId = userInfo.corpId
      this.userInfo.corpAdmYn = userInfo.corpAdmYn
      this.getUserInfo()
    })
  },
  mounted() {},
  methods: {
    getUserInfo() {
      let reqData = {
        userType: this.userInfo.userType,
        corpId: this.userInfo.corpId
      }
      getUserInfo(reqData).then(res => {
        this.corpInfo.name = res.result.name
        this.corpInfo.corpId = res.result.corpId
        this.corpInfo.aprvReqDt = res.result.aprvReqDt
          ? res.result.aprvReqDt
          : ' '
        this.corpInfo.brandOperYn = res.result.brandOperYn
        this.corpInfo.reqCorpAdmYn = res.result.reqCorpAdmYn
        this.corpInfo.status = res.result.status
        this.corpInfo.aprvStatus = res.result.aprvStatus
        this.selectedTabType('main')
      })
    },
    selectedTabType(type) {
      this.tabType = type
    }
  }
}
</script>
<style>
</style>
