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
        <div class="guide-page__title">
          <h3>RBC 주요 기능</h3>
          <p class="description">더 효율적으로 브랜드가 고객과 만날 수 있도록 RBC에서 다양한 기능을 제공하고 있습니다.</p>
        </div>
        <div class="guide-img__wrap mt-t0">
          <img src="@/assets/images/guide/guide_keyfeature_01.png" alt="" class="only-pc">
          <img src="@/assets/images/guide/guide_keyfeature_01_mo.png" alt="" class="only-mo">
        </div>
        <div class="guide__item" id="section01">
          <div class="subtitle-wrap mt-t8">
            <h4>1. 브랜드 프로필</h4>
            <p class="description">
              로고, 백그라운드 이미지 설정, 소개글 등을 메시지 앱에서 지속적으로 노출할 수 있습니다.<br>
              스팸 등 신뢰하기 어려운 무기명 프로필 사이에서 브랜드 프로필로 신뢰감있는 메시지를 전달하세요.<br>
              RBC에서 얼마나 많은 사용자에게 브랜드 프로필이 노출되고 있는지 확인할 수 있습니다.</p>
          </div>
          <div class="guide-img__wrap mt-t8 mt-b0">
            <img src="@/assets/images/guide/guide_keyfeature_02.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_keyfeature_02_mo.png" alt="" class="only-mo">
          </div>
        </div>
        <div class="guide__item" id="section02">
          <div class="subtitle-wrap">
            <h4>2. 브랜드 소식</h4>
            <p class="description">
              브랜드의 신상품, 이벤트, 공지사항 등을 등록하여 브랜드 홍보가 가능 합니다.<br>
              소식의 스타일에 맞는 다양한 레이아웃으로 등록 가능 합니다.</p>
          </div>
          <div class="guide-img__wrap mt-t8 mt-b0">
            <img src="@/assets/images/guide/guide_keyfeature_03.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_keyfeature_03_mo.png" alt="" class="only-mo">
          </div>
          <div class="subtitle-wrap">
            <h5 id="guide_2_1">2. 1. 영업 정보</h5>
          </div>
          <div class="text-box__wrap">
            <div class="text-box">
              <p class="title">영업 정보</p>
              <p class="content">브랜드의 영업 시간 / 공지사항 등을 브랜드 소식 상단에 고정해보세요.<br>브랜드 홈으로 방문한 고객들이 가장 먼저 접하는 정보입니다.</p>
            </div>
          </div>
          <div class="guide-img__wrap mt-b0 mt-t24">
            <img src="@/assets/images/guide/guide_keyfeature_04.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_keyfeature_04_mo.png" alt="" class="only-mo">
          </div>
          <hr class="hr-dot-line">
          <div class="subtitle-wrap">
            <h5 id="guide_2_2">2. 2. 브랜드 소식 유형</h5>
          </div>
          <div class="guide-img__wrap mt-0">
            <img src="@/assets/images/guide/guide_keyfeature_05.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_keyfeature_05_mo.png" alt="" class="only-mo">
          </div>
          <div class="btn__warp right">
            <router-link to="/ScreenGuide10" class="side-btn">화면 가이드 / 브랜드 소식</router-link>
          </div>
          <hr class="hr-dot-line">
          <div class="subtitle-wrap">
            <h5 id="guide_2_3">2. 3. 브랜드 소식 활용</h5>
          </div>
          <div class="text-box__wrap">
            <div class="text-box">
              <p class="title">메시지에 브랜드 소식 넣기</p>
              <p class="content">메시지에서는 짧고 강렬하게! 상세한 내용은 브랜드 소식에서 확인하도록 메시지를 구성해보세요.<br>관심도 높은 고객들에게 타겟팅 메시지를 보낼 때에도 효과적입니다.</p>
            </div>
          </div>
          <div class="guide-img__wrap mt-t24 mt-b0">
            <img src="@/assets/images/guide/guide_keyfeature_06.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_keyfeature_06_mo.png" alt="" class="only-mo">
          </div>
        </div>
        <div class="guide__item" id="section03">
          <div class="subtitle-wrap">
            <h4>3. 대화방 메뉴</h4>
            <p class="description">대화방 하단에 메뉴가 노출되며, 클릭 한 번으로 원하는 정보를 얻을 수 있도록 버튼 설정이 가능합니다.<br>메뉴 선택 시 웹사이트/앱 연결, 브랜드 소식 연결, 자동응답 메시지 전송 등 다양한 기능을 실행할 수 있습니다.<br>고객들이 자주 묻는 질문과 알리고 싶은 다양한 정보를 버튼에 설정해보세요.</p>
          </div>
          <div class="gray-box__wrap">
            <div class="gray-box">
              <p class="content">최대 5개의 대화방 메뉴를 지원합니다.</p>
            </div>
          </div>
          <div class="guide-img__wrap mt-t8 mt-b0">
            <img src="@/assets/images/guide/guide_keyfeature_07.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_keyfeature_07_mo.png" alt="" class="only-mo">
          </div>
          <div class="btn__warp right">
            <router-link to="/ScreenGuide09" class="side-btn">화면 가이드 / 대화방 메뉴</router-link>
          </div>
        </div>
        <div class="guide__item" id="section04">
          <div class="subtitle-wrap">
            <h4>4. 자동응답 메시지</h4>
            <p class="description">양방향 상품을 이용할 수 있는 대화방의 경우, 자동응답 메시지를 이용할 수 있습니다.<br>사전에 메시지를 작성하고, 해당 메시지를 대화방 메뉴의 자동응답 메시지로 설정할 수 있습니다.<br>고객은 선택한 메뉴에 대해 사전에 등록한 메시지로 실시간 응대를 받을 수 있습니다.</p>
          </div>
          <p class="content">자동응답 메시지를 사용하려면, 다음과 같은 조건이 충족되어야 합니다.</p>
          <div class="gray-box__wrap mt-t16">
            <div class="gray-box mt-b0">
              <p class="content line-before-none">① 대행사와 양방향 상품계약</p>
              <p class="content line-before-none">② 대화방에 양방향 대행사 연결 설정 (링크, 양방향 대행사 연결 설정)</p>
              <p class="content line-before-none">③ 자동응답 메시지 등록 (링크, 자동응답 메시지 화면 설명)</p>
              <p class="content line-before-none">④ 대화방 메뉴 설정</p>
            </div>
          </div>
          <div class="btn__warp right">
            <router-link to="/ScreenGuide08" class="side-btn">화면 가이드 / 자동응답 메시지</router-link>
          </div>
          <div class="subtitle-wrap">
            <h5 id="guide_4_1">4.1. 칩 리스트</h5>
            <p class="description">자동응답 메시지 또는 양방향 메시지에서 사용 가능한 메시지 버튼입니다.<br>메시지 카드가 아닌 대화방 하단에 고정되는 형태로 최대 11개까지 사용 가능합니다.</p>
          </div>
          <div class="guide-img__wrap mt-0">
            <img src="@/assets/images/guide/guide_keyfeature_08.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_keyfeature_08_mo.png" alt="" class="only-mo">
          </div>
        </div>
        <div class="guide__item" id="section05">
          <div class="subtitle-wrap">
            <h4>5. 통계</h4>
          </div>
          <div class="subtitle-wrap mt-t8 mt-b0">
            <h5 id="guide_5_1">5.1. 메시지 통계</h5>
            <p class="description">
              그룹ID 를 추가한 메시지에 한해 메시지 통계를 확인 할 수 있습니다.<br>
              동일 그룹ID 발송일 기준 3일간 (D+3) 집계됩니다. 단, 이통사별 발송 성공건수 100건 이상인 경우에 한해 집계됩니다.<br>
              집계시점 차이 등으로 인해, 아래 발송 성공 건수가 대행사 기준의 결과치와 일부 차이가 있을 수 있습니다.<br>
              캠페인 발송 시작일을 포함하여 조회하셔야 발송 건수가 정확히 조회됩니다.</p>
          </div>
          <div class="guide-img__wrap mt-b0">
            <img src="@/assets/images/guide/guide_keyfeature_09.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_keyfeature_09_mo.png" alt="" class="only-mo">
          </div>
          <hr class="hr-dot-line">
          <div class="subtitle-wrap">
            <h5 id="guide_5_2">5.2. 대화방 메뉴 통계</h5>
            <p class="description">대화방 메뉴를 고객들이 얼마나 이용했는지 확인 가능합니다.</p>
          </div>
          <div class="guide-img__wrap mt-0">
            <img src="@/assets/images/guide/guide_keyfeature_10.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_keyfeature_10_mo.png" alt="" class="only-mo">
          </div>
          <hr class="hr-dot-line">
          <div class="subtitle-wrap">
            <h5 id="guide_5_3">5.3. 브랜드 소식 통계</h5>
            <p class="description">등록한 브랜드 소식이 얼마나 조회되었는지 통계 데이터를 제공합니다.</p>
          </div>
          <div class="guide-img__wrap mt-0">
            <img src="@/assets/images/guide/guide_keyfeature_11.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_keyfeature_11_mo.png" alt="" class="only-mo">
          </div>
          <div class="btn__warp right">
            <router-link to="/ScreenGuide11" class="side-btn">화면 가이드 / 통계</router-link>
          </div>
        </div>
        <div class="guide__item" id="section06">
          <div class="subtitle-wrap">
            <h4>6. 레이아웃</h4>
            <p class="description">메시지 컴포넌트를 조합하여 내 브랜드에서 가장 필요한 구성으로 RCS 메시지를 발송할 수 있습니다.</p>
          </div>
          <div class="guide-img__wrap mt-t8 mt-b0">
            <img src="@/assets/images/guide/guide_keyfeature_12.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_keyfeature_12_mo.png" alt="" class="only-mo">
          </div>
          <div class="btn__warp multiline">
            <router-link to="/ScreenGuide07" class="side-btn">화면 가이드 / 레이아웃</router-link>
            <router-link to="/RcsMessageType#guide_3_2_1" class="side-btn">컴포넌트 종류</router-link>
          </div>
        </div>
      </div>
      <div class="guide-side__wrap">
        <div class="side__item">
          <div class="side__list">
            <div class="guide-lnb__wrap">
                <GuideLnbSide :rightMenuData="brandMenu" />
              </div>
            </div>
          </div>
          <GuideSide />
        </div>
    </div>
  </div>
  </template>

<script>
import GuideLnb from '@/views/service/components/AccMenu.vue'
import GuideSide from '@/views/service/components/GuideSide.vue'
import GuideLnbSide from '@/views/service/components/GuideLnbSide.vue'
import guideLnbList from '@/views/service/components/guideLnb.js'

export default {
  components: {
    GuideLnb,
    GuideLnbSide,
    GuideSide
  },
  data() {
    return {
      guideLnbList,
      openGuidNav: false,
      isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768,
      isMobileSize: 768,
      OnlyPcNav: false,
      brandMenu: [
        {
          'label': '2. 1. 영업정보',
          'to': '#guide_2_1',
          'anchorIndex': 0
        },
        {
          'label': '2. 2. 브랜드 소식 유형',
          'to': '#guide_2_2',
          'anchorIndex': 1
        },
        {
          'label': '2. 3. 브랜드 소식 활용',
          'to': '#guide_2_3',
          'anchorIndex': 2
        },
        {
          'label': '4. 1. 칩 리스트',
          'to': '#guide_4_1',
          'anchorIndex': 3
        },
        {
          'label': '5. 1. 메시지 통계',
          'to': '#guide_5_1',
          'anchorIndex': 4
        },
        {
          'label': '5. 2. 대화방 메뉴 통계',
          'to': '#guide_5_2',
          'anchorIndex': 5
        },
        {
          'label': '5. 3. 브랜드 소식 통계',
          'to': '#guide_5_3',
          'anchorIndex': 6
        }
      ]
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
