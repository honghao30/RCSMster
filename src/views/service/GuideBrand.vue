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
          <h3>브랜드</h3>
        </div>
        <div class="guide__item" id="section01">
          <div class="subtitle-wrap">
            <h4>1. 브랜드 홈 소개</h4>
          </div>
          <div class="subtitle-wrap mt-t8 mt-b0">
            <h5 id="guide_1">1. 1. 브랜드 홈 구성</h5>
            <p class="description">브랜드 홈은 다음과 같은 항목으로 구성되어 있으며, 각 항목은 RBC에서 브랜드를 만들때 함께 등록할 수 있습니다.</p>
          </div>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/guide_brand_01.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_brand_01_mo.png" alt="" class="only-mo">
          </div>
          <div class="text-box__wrap mt-t32">
            <div class="text-box">
              <p class="title" id="guide_1_1">퀵버튼</p>
              <p class="content">브랜드와 관련된 링크를 아이콘으로 보여줍니다.</p>
            </div>
          </div>
          <div class="guide-img__wrap mt-b0">
            <img src="@/assets/images/guide/guide_brand_02.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_brand_02_mo.png" alt="" class="only-mo">
          </div>
          <hr class="hr-dot-line">
          <div class="subtitle-wrap">
            <h5 id="guide_1_2">1. 2. 브랜드 프로필 노출</h5>
            <p class="description">브랜드 프로필을 등록하면, 메시지 앱에서 다음과 같은 곳에 노출됩니다.<br>
            브랜드 프로필 이미지는 브랜드 하위의 모든 대화방에서 공통적으로 사용되며, 브랜드 명은 사용자가 앱에서 대화방 프로필을 선택<br class="only-pc">
            하였을 때, 진입되는 브랜드 홈에서 노출됩니다.</p>
          </div>
          <div class="guide-img__wrap mt-t8 mt-b0">
            <img src="@/assets/images/guide/guide_brand_03.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_brand_03_mo.png" alt="" class="only-mo">
          </div>
        </div>
        <div class="guide__item" id="section02">
          <div class="subtitle-wrap">
            <h4>2. 브랜드 구조</h4>
            <p class="description">브랜드는 하나의 프로필 이미지와 브랜드 정보를 기준으로 다수의 대화방으로 이루어져 있습니다.
            브랜드 단위로 다음과 같은 기능을 함께 사용할 수 있습니다.</p>
          </div>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/guide_brand_04.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_brand_04_mo.png" alt="" class="only-mo">
          </div>
        </div>
        <div class="guide__item" id="section03">
          <div class="subtitle-wrap">
            <h4>3. 브랜드 등록</h4>
            <p class="description">메시지 앱을 사용하는 수신자들에게 신뢰감있는 메시지를 보내고 싶다면, 브랜드 프로필 등록이 필요합니다.
            브랜드 프로필을 등록하면, 문자를 받는 고객의 대화방 정보가, 기업에서 등록한 브랜드 로고/브랜드 명 등으로 보여집니다.</p>
          </div>
          <div class="guide-img__wrap mt-b0">
            <img src="@/assets/images/guide/guide_brand_05.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_brand_05_mo.png" alt="" class="only-mo">
          </div>
          <div class="subtitle-wrap mt-b0">
            <h5 id="guide_3_1">3. 1. 브랜드 가이드</h5>
            <p class="description">브랜드 명과 브랜드 프로필을 적절히 사용할 수 있도록 브랜드 등록 시, 심사 승인 과정을 거치게 됩니다.
            브랜드 명과 브랜드 프로필을 올바르게 등록할 수 있도록 브랜드 개설 안내 가이드를 꼭 확인해주시기 바랍니다.</p>
          </div>
          <div class="btn__warp right">
            <i class="download"></i>
            <a href="" download class="side-btn black">브랜드 개설 안내.pdf</a>
          </div>
          <p class="content mt-t32">RBC는 다음과 같은 게이스에서의 브랜드 명은 온라인 문의를 해주시기 바랍니다.</p>
          <div class="gray-box__wrap">
            <div class="gray-box mt-t8 mt-b0">
              <p class="content">사업자 등록증과 브랜드 명이 다른 경우</p>
              <p class="content">개인의 이름으로 브랜드를 만드는 경우</p>
              <p class="content">기간이 정해져있는 직함을 포함하는 경우</p>
            </div>
          </div>
          <div class="btn__warp right">
            <router-link to="/OnlineInquire" class="side-btn">온라인 문의하기</router-link>
          </div>
          <p class="content mt-t32">다음과 같은 케이스로 브랜드를 만드는 경우는 별도 확인이 필요합니다.</p>
          <div class="gray-box__wrap">
            <div class="gray-box mt-t8 mt-b0">
              <p class="content">선거 후보자입니다.</p>
            </div>
          </div>
          <div class="btn__warp right">
            <router-link to="/GuideAccount#section04" class="side-btn">시즌 계정</router-link>
          </div>
        </div>
        <div class="guide__item" id="section04">
          <div class="subtitle-wrap mt-b0">
            <h4>4. 브랜드 관리</h4>
            <p class="description">브랜드의 정보 수정은 비즈니스 계정의 마스터 / 매니저 모두 가능합니다.<br>
            만약 브랜드명 / 브랜드 프로필 이미지를 수정하는 경우, 재 승인 심사 단계를 거쳐야 합니다.</p>
          </div>
          <div class="btn__warp right">
            <router-link to="/GuideBrand#guide_3_1" class="side-btn">화면 가이드 / 브랜드</router-link>
          </div>
        </div>
        <div class="guide__item" id="section05">
          <div class="subtitle-wrap mt-b0">
            <h4>5. 브랜드 운영 권한</h4>
            <p class="description">브랜드 운영을 보다 효율적으로 하기 위하여 같은 기업의 동료 혹은 대행사에게 운영 권한을 줄 수 있습니다.</p>
          </div>
          <div class="subtitle-wrap">
            <h5 id="guide_5_1">5. 1. 브랜드 운영 권한 종류</h5>
          </div>
          <div class="description-bottom__wrap">
            <dl>
              <dt>대표 운영자</dt>
              <dd>브랜드를 최초 생성한 사용자로 브랜드 삭제 가능</dd>
            </dl>
            <dl>
              <dt>운영자</dt>
              <dd>마스터 권한의 운영자로 부터 브랜드 운영권한을 받은 운영자</dd>
            </dl>
            <dl>
              <dt>대행사</dt>
              <dd>마스터 권한의 운영자로 부터 브랜드 운영권한을 받은 대행사</dd>
            </dl>
          </div>
          <hr class="hr-dot-line">
          <div class="subtitle-wrap">
            <h5 id="guide_5_2">5. 2. 브랜드 운영 권한 취득 방법</h5>
          </div>
          <div class="text-box__wrap mt-t8">
            <div class="text-box">
              <p class="title" id="guide_5_2_1">브랜드 직접 만들기</p>
              <p class="content">직접 생성한 경우, 대표 운영자로서 브랜드 관리의 최종적인 책임을 가지게 됩니다.<br>
              매니저 권한인 운영자가 브랜드를 생성하는 경우, 사업자등록증 등 소속을 증명할 증빙서류를 등록하여 마스터 권한으로 변경 후<br>
              실제 이용이 가능합니다.</p>
            </div>
            <div class="text-box">
              <p class="title" id="guide_5_2_2">동료 초대하기</p>
              <p class="content">마스터 권한인 브랜드의 운영자는 같은 기업/소속의 인원을 초대할 수 있습니다.</p>
            </div>
          </div>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/guide_brand_06.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_brand_06_mo.png" alt="" class="only-mo">
          </div>
          <ol class="guide-list__num tit-num">
            <li>
              <span class="num">1</span>
              <p><strong>RBC에 가입되어 있지 않은 동료 초대하기</strong><br>&lt;브랜드 운영 권한 초대&gt; 메뉴에서 신규 운영자의 이메일 주소와 함께 운영권한을 줄 브랜드를 선택하여 초대할 수 있습니다.<br>
                신규 운영자에게는 이메일로 초대 링크가 전송됩니다.<br>
                링크를 통하여 운영자 등록을 하게 되면, 등록과 함께 자동으로 브랜드 운영권한도 함께 설정되어 바로 이용할 수 있습니다.</p>
            </li>
            <li>
              <span class="num">2</span>
              <p><strong>RBC에 이미 가입되어 있는 동료 초대하기</strong><br>&lt;브랜드 운영 권한 초대&gt; 메뉴에서 브랜드 운영 권한을 줄 수 있습니다.</p>
            </li>
          </ol>
          <div class="text-box__wrap mt-t24">
            <div class="text-box">
              <p class="title" id="guide_5_2_3">브랜드 운영 권한 요청하기</p>
              <p class="content">동일한 기업 계정에서 다른 운영자가 관리하는 브랜드인 경우, 대시보드에서 브랜드 운영 권한을 각각 요청할 수 있습니다.<br>
              해당 브랜드의 대표 운영자가 요청 수락 시, 운영 권한을 가지게 됩니다.</p>
            </div>
            <div class="text-box">
              <p class="title" id="guide_5_2_4">(대행사) 브랜드 운영 권한 설정</p>
              <p class="content">대행사에게 운영권한을 준다는 것은 다음과 같은 역할을 대행사가 할 수 있다는 것입니다.</p>
            </div>
          </div>
          <div class="gray-box__wrap">
            <div class="gray-box mt-t16">
              <p class="content">1&#41; RBC에서 직접 브랜드를 관리할 수 있습니다.</p>
              <p class="content">2&#41; API를 통하여 브랜드를 관리할 수 있습니다.</p>
              <p class="content">3&#41; 브랜드 이름으로 RCS 메시지를 발송할 수 있습니다.</p>
            </div>
          </div>
          <p class="content">대행사가 관리할 수 있는 정보는 이곳에서 확인할 수 있습니다.</p>
          <div class="btn__warp right">
            <router-link to="/GuideAccount#section01" class="side-btn">계정별 사용 가능 메뉴</router-link>
          </div>
          <p class="content mt-t24">대행사 운영권한 설정 전에는 사전에 브랜드와 대행사 간 계약이 체결되어야 합니다.</p>
          <div class="guide-img__wrap mt-b0">
            <img src="@/assets/images/guide/guide_brand_07.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_brand_07_mo.png" alt="" class="only-mo">
          </div>
          <hr class="hr-dot-line">
          <div class="subtitle-wrap">
            <h5 id="guide_5_3">5. 3. 대표 운영자</h5>
            <p class="description">대표 운영자란, 브랜드 관리를 책임지는 운영자입니다.<br>브랜드의 대표 운영자가 될 수 있는 방법은 다음과 같습니다.</p>
          </div>
          <div class="gray-box__wrap">
            <div class="gray-box mt-b24">
              <p class="content">브랜드를 생성한 경우</p>
              <p class="content">이전 대표 운영자로부터 위임받은 경우</p>
            </div>
          </div>
          <p class="content">대행사 운영권한 설정 전에는 사전에 브랜드와 대행사 간 계약이 체결되어야 합니다.</p>
          <div class="gray-box__wrap">
            <div class="gray-box mt-t8">
              <p class="content">브랜드 삭제</p>
              <p class="content">대표 운영자 변경</p>
              <p class="content">운영 권한 해제</p>
            </div>
          </div>
          <div class="text-box__wrap mt-t8">
            <div class="text-box">
              <p class="title" id="guide_5_3_1">대표 운영자 변경</p>
              <p class="content">대표 운영자가 업무 변경 등의 사유로 브랜드 관리를 더 이상 하지 않게 되는 경우,<br>
                &lt;브랜드 운영 관리&gt; 메뉴에서 다른 운영자(마스터 권한)를 대표 운영자로 지정할 수 있습니다.</p>
            </div>
            <div class="text-box">
              <p class="title" id="guide_5_3_2">운영 권한 해제</p>
              <p class="content">브랜드의 대표 운영자는 운영자 / 대행사의 브랜드 운영 권한을 해제할 수 있습니다.<br>
              운영 권한이 해제된 운영자 혹은 대행사에게 개별적으로 안내 메시지가 전송됩니다.<br>
              해제된 운영 권한은 다시 설정할 수 있습니다.</p>
            </div>
          </div>
          <div class="guide-img__wrap mt-t24 mt-b0">
            <img src="@/assets/images/guide/guide_brand_08.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_brand_08_mo.png" alt="" class="only-mo">
          </div>
        </div>
        <div class="guide__item" id="section06">
          <div class="subtitle-wrap">
            <h4>6. 브랜드 삭제</h4>
            <p class="description">대표 운영자만 브랜드 삭제가 가능합니다.<br>브랜드 삭제는 &lt;브랜드 홈 수정&gt;화면에서 가능합니다.<br>
              대표 운영자의 휴대폰 인증 이후, 삭제 처리가 진행됩니다.<br>
              단, 실제 메시지 발송 및 API 업데이트 등이 진행 중인 케이스를 고려하여 아래에 해당하는 경우 브랜드 삭제가 불가합니다.</p>
          </div>
          <div class="subtitle-wrap mt-t16 mt-b0">
            <h5 id="guide_6_1">6. 1. 브랜드 삭제 전 확인 사항</h5>
            <div class="description-total__wrap">
              <dl class="description-total-tit">
                <dt>분류</dt>
                <dd>확인사항</dd>
              </dl>
              <dl>
                <dt>브랜드</dt>
                <dd>&lt;승인요청&gt; &lt;처리중&gt; <del>&lt;반려&gt;</del> 상태인 경우</dd>
              </dl>
              <dl>
                <dt>대화방 중<br class="only-mo"> 1개 이상</dt>
                <dd>&lt;승인요청&gt; &lt;처리중&gt; <del>&lt;반려&gt;</del> 상태인 경우</dd>
              </dl>
              <dl>
                <dt>템플릿 중<br class="only-mo"> 1개 이상</dt>
                <dd>&lt;승인요청&gt; &lt;처리중&gt; <del>&lt;반려&gt;</del> 상태인 경우</dd>
              </dl>
              <dl>
                <dt>대행사</dt>
                <dd>대행사가 1개 이상 설정되어 있는 경우, 사용자가 대행사 운영권한을 모두 해지해야함</dd>
              </dl>
              <dl>
                <dt>운영자</dt>
                <dd>본인을 제외한 마스터/매니저가 운영 권한이 있는 경우</dd>
              </dl>
            </div>
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
import GuideLnbSide from '@/views/service/components/GuideLnbSide.vue'
import GuideSide from '@/views/service/components/GuideSide.vue'
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
          'label': '1. 1. 브랜드 홈 구성',
          'to': '#guide_1',
          'anchorIndex': 0,
          'isOpen': false,
          'isSubMenu': false,
          'children': [
            {
              'label': '퀵 버튼',
              'to': '#guide_1_1',
              'anchorIndex': 0
            }
          ]
        },
        {
          'label': '1. 2. 브랜드 프로필 노출',
          'to': '#guide_1_2',
          'anchorIndex': 1
        },
        {
          'label': '3. 1. 브랜드 가이드',
          'to': '#guide_3_1',
          'anchorIndex': 2
        },
        {
          'label': '5. 1. 브랜드 운영 권한 종류',
          'to': '#guide_5_1',
          'anchorIndex': 3
        },
        {
          'label': '5. 2. 브랜드 운영 권한 취득 방법',
          'to': '#guide_5_2',
          'isOpen': false,
          'isSubMenu': false,
          'children': [
            {
              'label': '브랜드 직접 만들기',
              'to': '#guide_5_2_1',
              'anchorIndex': 0
            },
            {
              'label': '동료 초대하기',
              'to': '#guide_5_2_2',
              'anchorIndex': 1
            },
            {
              'label': '브랜드 운영 권한 요청하기',
              'to': '#guide_5_2_3',
              'anchorIndex': 2
            },
            {
              'label': '(대행사) 브랜드 운영 권한 설정',
              'to': '#guide_5_2_4',
              'anchorIndex': 3
            }
          ]
        },
        {
          'label': '5. 3. 대표 운영자',
          'to': '#guide_5_3',
          'isOpen': false,
          'isSubMenu': false,
          'children': [
            {
              'label': '대표 운영자 변경',
              'to': '#guide_5_3_1',
              'anchorIndex': 0
            },
            {
              'label': '운영 권한 해제',
              'to': '#guide_5_3_2',
              'anchorIndex': 1
            }
          ]
        },
        {
          'label': '6. 1. 브랜드 삭제 전 확인 사항',
          'to': '#guide_6_1',
          'anchorIndex': 4
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
