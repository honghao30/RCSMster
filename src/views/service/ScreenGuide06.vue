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
          <h3>메시지(템플릿)</h3>
          <p class="description">기업 담당자와 대행사는 고객에게 RCS에서 제공하는 다양한 유형의 템플릿을 작성하여 발송할 수 있습니다.</p>
        </div>
        <div class="guide__item">
          <div class="subtitle-wrap">
            <h4>1. 템플릿 등록 </h4>
          </div>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/guide_ScreenGuide06_01.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_ScreenGuide06_01_mo.png" alt="" class="only-mo">
          </div>
        </div>
        <div class="guide__item">
          <div class="subtitle-wrap">
            <h4>2. 템플릿 작성</h4>
          </div>
          <div class="subtitle-wrap">
            <h5>2. 1. 텍스트 템플릿(7종)</h5>
            <p class="description">간단한 내용과 아이콘, 버튼을 활용하여 간결한 내용을 전달하고 싶을 때 유용하게 사용할 수 있습니다. (최대 100자까지 텍스트를 작성할 수 있습니다.)<br/>
              *아이템 강조형 - 서술, 아이템 강조형 - 스타일은 신규 템플릿입니다. </p>
          </div>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/guide_ScreenGuide06_02.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_ScreenGuide06_02_mo.png" alt="" class="only-mo">
          </div>
          <div class="subtitle-wrap">
            <h5>2. 2. LMS 템플릿(4종)</h5>
            <p class="description">텍스트 템플릿보다 더 많은 내용을 전달하고 싶을 때 유용한 신규 템플릿입니다. (최대 1,300자까지 텍스트를 작성할 수 있습니다.)<br/>
              *LMS 템플릿 4종은 신규 템플릿입니다.<br/>
              *LMS 템플릿 중 서술형과 문단형은 움직이는 아이콘을 사용할 수 있습니다.</p>
          </div>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/guide_ScreenGuide06_03.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_ScreenGuide06_03_mo.png" alt="" class="only-mo">
          </div>
          <div class="subtitle-wrap">
            <h5>2. 3. 이미지 템플릿(8종)</h5>
            <p class="description">텍스트와 아이콘, 버튼뿐 아니라 이미지도 함께 사용하여 내용을 풍부하게 구성할 때 유용하게 사용할 수 있습니다. (최대 500자까지 텍스트를 작성할 수 있습니다.)<br/>
              *이미지 템플릿 신규, 이미지 템플릿 캐러셀은 신규 템플릿입니다.</p>
          </div>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/guide_ScreenGuide06_04.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_ScreenGuide06_04_mo.png" alt="" class="only-mo">
          </div>
        </div>
        <div class="guide-page__title">
          <h3>메시지(레이아웃)</h3>
        </div>
        <div class="guide__item">
          <div class="subtitle-wrap">
            <h4>1. 레이아웃(대행사)</h4>
          </div>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/guide_ScreenGuide06_05.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_ScreenGuide06_05_mo.png" alt="" class="only-mo">
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
