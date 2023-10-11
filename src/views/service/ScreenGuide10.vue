<template>
  <div class="guide_bg">
    <div class="guide__inner">
      <div class="guide-lnb__wrap" v-if="OnlyPcNav">
        <GuideLnb :menuData="guideLnbList" />
      </div>
      <div class="user-guide__wrap screenguide__wrap">
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
        <div class="guide-page__title">
          <h3>통계</h3>
          <p class="description">기업 담당자와 대행사는 브랜드의 RCS메시지 통계자료를 확인할 수 있습니다.<br/>
            RBC에서 제공하는 통계를 활용하여 브랜드가 더 성장할 수 있도록 전략을 세울 수 있습니다.</p>
        </div>
        <div class="guide__item">
          <div class="subtitle-wrap">
            <h4>1. 메시지 통계</h4>
          </div>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/guide_ScreenGuide10_01.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_ScreenGuide10_01_mo.png" alt="" class="only-mo">
          </div>
        </div>
        <div class="guide__item">
          <div class="subtitle-wrap">
            <h4>2. 대화방 메뉴 통계</h4>
          </div>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/guide_ScreenGuide10_02.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_ScreenGuide10_02_mo.png" alt="" class="only-mo">
          </div>
        </div>
        <div class="guide__item">
          <div class="subtitle-wrap">
            <h4>3. 브랜드 소식 통계</h4>
          </div>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/guide_ScreenGuide10_03.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_ScreenGuide10_03_mo.png" alt="" class="only-mo">
          </div>
        </div>
      </div>
    </div>
  </div>
  </template>

<script>
import GuideLnb from '@/views/service/components/AccMenu.vue'
import guideLnbList from '@/views/service/components/guideLnb.js'

export default {
  components: {
    GuideLnb
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
