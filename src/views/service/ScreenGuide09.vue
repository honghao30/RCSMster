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
          <h3>브랜드 소식</h3>
          <p class="description">기업 담당자와 대행사는 브랜드 소식을 통해 신상품, 이벤트, 공지사항 등 다양한 레이아웃으로 콘텐츠를 생성하여 홍보할 수 있습니다.</p>
        </div>
        <div class="guide__item">
          <div class="subtitle-wrap">
            <h4>1. 브랜드 소식 목록 </h4>
          </div>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/guide_ScreenGuide09_01.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_ScreenGuide09_01_mo.png" alt="" class="only-mo">
          </div>
        </div>
        <div class="guide__item">
          <div class="subtitle-wrap">
            <h4>2. 템플릿 작성</h4>
          </div>
          <div class="subtitle-wrap">
            <h5>2. 1. 갤러리 유형 등록</h5>
          </div>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/guide_ScreenGuide09_02.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_ScreenGuide09_02_mo.png" alt="" class="only-mo">
          </div>
          <div class="subtitle-wrap">
            <h5>2. 2. 쉐어링 유형 등록</h5>
          </div>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/guide_ScreenGuide09_03.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_ScreenGuide09_03_mo.png" alt="" class="only-mo">
          </div>
          <div class="subtitle-wrap">
            <h5>2. 3. 슬라이드 유형 등록</h5>
          </div>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/guide_ScreenGuide09_04.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_ScreenGuide09_04_mo.png" alt="" class="only-mo">
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
