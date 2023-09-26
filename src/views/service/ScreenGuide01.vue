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
          <h3>회원가입</h3>
          <p class="description">회원가입은 가입 유형을 선택 후 약관동의, 비즈니스 정보 입력, 담당자 정보 입력 순으로 가입 절차가 진행됩니다.</p>
        </div>
        <div class="guide__item">
          <div class="subtitle-wrap">
            <h4>1. 회원가입 유형 선택</h4>
          </div>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/guide_ScreenGuide01_01.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_ScreenGuide01_01_mo.png" alt="" class="only-mo">
          </div>
        </div>
        <div class="guide__item">
          <div class="subtitle-wrap">
            <h4>2. 약관동의 후 기업/대행사 정보 입력</h4>
            <p class="description">기업 또는 대행사 회원가입 유형 선택 후 화면은 유형에 따라 다른 화면이 보입니다. 각 유형 선택 후 노출되는 화면은 유형에 따라 달라집니다.</p>
          </div>
          <div class="subtitle-wrap">
            <h5>2. 1. 비즈니스 정보 입력(기업 담당자)</h5>
          </div>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/guide_ScreenGuide01_02.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_ScreenGuide01_02_mo.png" alt="" class="only-mo">
          </div>
          <div class="subtitle-wrap">
            <h5>2. 2. 대행사 정보 입력(대행사)</h5>
          </div>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/guide_ScreenGuide01_03.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_ScreenGuide01_03_mo.png" alt="" class="only-mo">
          </div>
        </div>
        <div class="guide__item">
          <div class="subtitle-wrap">
            <h4>3. 담당자 정보 입력</h4>
            <p class="description">담당자 정보 입력은 기업과 대행사 모두 동일합니다.</p>
          </div>
          <div class="guide-img__wrap des-add-img">
            <img src="@/assets/images/guide/guide_ScreenGuide01_04.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_ScreenGuide01_04_mo.png" alt="" class="only-mo">
          </div>
        </div>
        <div class="guide__item">
          <div class="subtitle-wrap">
            <h4>4. 회원가입 신청 완료</h4>
          </div>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/guide_ScreenGuide01_05.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_ScreenGuide01_05_mo.png" alt="" class="only-mo">
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
