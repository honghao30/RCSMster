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
          <h3>양방향(자동응답 메시지)</h3>
          <p class="description">사전에 메시지를 작성하고, 해당 메시지를 대화방 메뉴의 응답 메시지로 설정할 수 있습니다.<br/>
            고객은 선택한 메뉴에 대해 사전에 등록한 메시지로 실시간 응대를 받을 수 있습니다.</p>
        </div>
        <div class="guide__item">
          <div class="subtitle-wrap">
            <h4>1. 말풍선</h4>
          </div>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/guide_ScreenGuide07_01.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_ScreenGuide07_01_mo.png" alt="" class="only-mo">
          </div>
        </div>
        <div class="guide__item">
          <div class="subtitle-wrap">
            <h4>2. 카드</h4>
          </div>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/guide_ScreenGuide07_02.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_ScreenGuide07_02_mo.png" alt="" class="only-mo">
          </div>
        </div>
        <div class="guide__item">
          <div class="subtitle-wrap">
            <h4>3. 슬라이드</h4>
          </div>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/guide_ScreenGuide07_03.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_ScreenGuide07_03_mo.png" alt="" class="only-mo">
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
