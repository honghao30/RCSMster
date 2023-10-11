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
          <h3>브랜드 개설</h3>
          <p class="description">기업 담당자는 기업 대시보드 우측 상단에 위치한 브랜드 개설 버튼을 통해 브랜드를 개설할 수 있습니다.<br/>
            브랜드 정보 입력, 퀵 버튼 설정, 브랜드 홈 탭 설정을 하면 브랜드 개설 신청이 완료됩니다.</p>
        </div>
        <div class="guide__item">
          <div class="subtitle-wrap">
            <h4>1. 기본 정보 입력</h4>
          </div>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/guide_ScreenGuide03_01.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_ScreenGuide03_01_mo.png" alt="" class="only-mo">
          </div>
        </div>
        <div class="guide__item">
          <div class="subtitle-wrap">
            <h4>2. 퀵 버튼 설정</h4>
          </div>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/guide_ScreenGuide03_02.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_ScreenGuide03_02_mo.png" alt="" class="only-mo">
          </div>
        </div>
        <div class="guide__item">
          <div class="subtitle-wrap">
            <h4>3. 브랜드 홈 탭 설정</h4>
          </div>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/guide_ScreenGuide03_03.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_ScreenGuide03_03_mo.png" alt="" class="only-mo">
          </div>
        </div>
        <div class="guide__item">
          <div class="subtitle-wrap">
            <h4>4. 내 브랜드 관리</h4>
          </div>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/guide_ScreenGuide03_04.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_ScreenGuide03_04_mo.png" alt="" class="only-mo">
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
