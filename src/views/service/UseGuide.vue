<template>
  <div class="guide_bg">
    <div class="guide__inner">
      <div class="guide-lnb__wrap" v-if="OnlyPcNav">
        <GuideLnb :menuData="guideLnbList" />
      </div>
      <div class="user-guide__wrap">
      <!-- 모바일 네비 -->
      <div class="user-guide__mo-nav--wrap">
          <div class="user-guide-nav"
            :class="{isActive: this.openGuidNav == true}"
          >
            <button type="button" ref="guideTriger" @click="movePage($event)">{{ this.$route.meta.tittle }}</button>
            <div class="guide-lnb__wrap" v-if="openGuidNav">
              <GuideLnb :menuData="guideLnbList"  :allOpen="true" @subItemClick="handleSubItemClick"  />
            </div>
          </div>
      </div>
      <!-- // 모바일 네비 -->
        <div class="guide-page__title-big">
          <h3>RBC 이용 가이드</h3>
          <p class="guide-page__title-gray">RCS Biz Center를 똑똑하게 이용하는 법<br>이용가이드로 확인해보세요!</p>
        </div>
        <div class="guide-img__wrap">
          <img src="@/assets/images/guide/guide_main.png" alt="" class="only-pc">
          <img src="@/assets/images/guide/guide_main_mo.png" alt="" class="only-mo">
        </div>
        <h4 class="btn-tit">RCS Biz Center 어디까지 활용할 수 있나요?</h4>
        <router-link to="/CompanyMsg" class="box-gray-line link-box">
          <div class="btn-left">
            <i class="guide-icon"><img src="@/assets/images/icon/icon_guide_message.png" alt=""></i>
            <p class="btn-text">RCS 기업 메시지</p>
          </div>
          <div class="btn-right">
            <p>자세히보기</p>
          </div>
        </router-link>
        <router-link to="/KeyFeatures" class="box-gray-line link-box">
          <div class="btn-left">
            <i class="guide-icon"><img src="@/assets/images/icon/icon_guide_key_feature.png" alt=""></i>
            <p class="btn-text">RCS 주요 기능</p>
          </div>
          <div class="btn-right">
            <p>자세히보기</p>
          </div>
        </router-link>
        <router-link to="/GuideAccount" class="box-gray-line link-box">
          <div class="btn-left">
            <i class="guide-icon"><img src="@/assets/images/icon/icon_guide_user_account.png" alt=""></i>
            <p class="btn-text">계정</p>
          </div>
          <div class="btn-right">
            <p>자세히보기</p>
          </div>
        </router-link>
        <router-link to="/GuideBrand" class="box-gray-line link-box">
          <div class="btn-left">
            <i class="guide-icon"><img src="@/assets/images/icon/icon_guide_brand.png" alt=""></i>
            <p class="btn-text">브랜드</p>
          </div>
          <div class="btn-right">
            <p>자세히보기</p>
          </div>
        </router-link>
        <router-link to="/Chatbot" class="box-gray-line link-box">
          <div class="btn-left">
            <i class="guide-icon"><img src="@/assets/images/icon/icon_guide_chat.png" alt=""></i>
            <p class="btn-text">대화방</p>
          </div>
          <div class="btn-right">
            <p>자세히보기</p>
          </div>
        </router-link>
        <router-link to="" class="box-gray-line link-box">
          <div class="btn-left">
            <i class="guide-icon"><img src="@/assets/images/icon/icon_guide_browser.png" alt=""></i>
            <p class="btn-text">화면 가이드</p>
          </div>
          <div class="btn-right">
            <p>자세히보기</p>
          </div>
        </router-link>
      </div>
      <div class="guide-side__wrap">
        <GuideSide />
      </div>
    </div>
  </div>
</template>

<script>
import GuideLnb from '@/views/service/components/AccMenu.vue'
import GuideSide from '@/views/service/components/GuideSide.vue'
import guideLnbList from '@/views/service/components/guideLnb.js'

export default {
  components: {
    GuideLnb,
    GuideSide
  },
  data() {
    return {
      guideLnbList,
      openGuidNav: false,
      isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768,
      isMobileSize: 768,
      OnlyPcNav: false
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  mounted () {
    if (!this.isMobileSize) {
      this.OnlyPcNav = true
    }
    window.addEventListener('resize', this.handleResize)
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    movePage () {
      console.log('movePage')
      this.openGuidNav = !this.openGuidNav
    },
    handleSubItemClick(subLabel, j) {
      this.$refs.guideTriger.innerText = subLabel
      this.openGuidNav = !this.openGuidNav
    },
    handleResize() {
      this.isMobileSize = window.innerWidth < 768
      this.OnlyPcNav = !this.isMobileSize
      if (!this.isMobileSize) {
        this.openGuidNav = false
      }
    }
  }
}
</script>
