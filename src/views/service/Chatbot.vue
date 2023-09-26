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
          <h3>대화방</h3>
          <p class="description">메시지 앱에서 고객들이 메시지를 받고 확인할 수 있는 것이 대화방입니다.<br>대화방 단위로 메시지를 보내고, 확인할 수 있습니다.</p>
        </div>
        <div class="guide__item" id="section01">
          <div class="subtitle-wrap">
            <h4>1. 대화방 프로필</h4>
          </div>
          <div class="guide-img__wrap mt-0">
            <img src="@/assets/images/guide/guide_chatbot_01.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_chatbot_01_mo.png" alt="" class="only-mo">
          </div>
        </div>
        <div class="guide__item" id="section02">
          <div class="subtitle-wrap">
            <h4>2. 대화방 종류</h4>
            <p class="description">메시지 앱에서 대화방은 다음과 같이 구분되며, 이용 가능한 메시지 상품이 상이합니다.</p>
          </div>
          <div class="table-box guide-chat-table">
            <table>
              <colgroup>
                <col width="18%">
                <col width="18%">
                <col width="16%">
                <col width="16%">
                <col width="16%">
                <col width="16%">
              </colgroup>
              <thead>
                <tr>
                  <th scope="col" colspan="2" rowspan="2"></th>
                  <th scope="col" colspan="4">A2P(기업 메시징)</th>
                </tr>
                <tr>
                  <th scope="col">문자<br>대화방</th>
                  <th scope="col">RCS<br>대화방</th>
                  <th scope="col">RCS MO<br>대화방</th>
                  <th scope="col">RCS 양방향<br>대화방</th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-blue">
                  <th colspan="2">RCS 등록 필요</th>
                  <td></td>
                  <td>○</td>
                  <td>○</td>
                  <td>○</td>
                </tr>
                <tr>
                  <th rowspan="6" class="top-th">메시지 상품</th>
                  <th>문자 메시지</th>
                  <td>○</td>
                  <td>○</td>
                  <td>○</td>
                  <td>○</td>
                </tr>
                <tr>
                  <th>RCS P2P 채팅+</th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <th>RCS 공통 포맷<br>(SMS/LMS/MMS)</th>
                  <td></td>
                  <td>○</td>
                  <td>○</td>
                  <td>○</td>
                </tr>
                <tr>
                  <th>RCS 정보성 템플릿</th>
                  <td></td>
                  <td>○</td>
                  <td>○</td>
                  <td>○</td>
                </tr>
                <tr>
                  <th>RCS 이미지 템플릿</th>
                  <td></td>
                  <td>○</td>
                  <td>○</td>
                  <td>○</td>
                </tr>
                <tr>
                  <th>RCS 양방향</th>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>○</td>
                </tr>
                <tr class="bg-green">
                  <th colspan="2">사용자 반응 결과 집계 (버튼)</th>
                  <td></td>
                  <td>○</td>
                  <td></td>
                  <td>○</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="gray-box__wrap">
            <div class="gray-box mt-b0">
              <p class="content"><strong class="color-blue">RCS 대화방</strong> : RBC에 등록한 가장 기본적인 대화방</p>
              <p class="content"><strong class="color-blue">RCS MO 대화방</strong>: 대표번호 문자수신 서비스(MO)를 이용중인 발신번호로 만든 RCS 대화방</p>
              <p class="content"><strong class="color-blue">RCS 양방향 대화방</strong> : RCS 양방향 메시지 / 자동응답 메시지 등을 이용할 수 있는 RCS 대화방</p>
            </div>
          </div>
          <div class="subtitle-wrap">
            <h5 id="guide_2_1">2. 1. RCS MO 대화방</h5>
            <p class="description">
              기존에 대표번호 문자수신 서비스(MO)를 이용하던 발신번호로 대화방을 만든다면, 대화방 설정에서 꼭! 대표번호 문자수신 서비스를 체크해 주셔야 합니다.
            </p>
            <p class="description">RCS MO 대화방은 아래와 같은 기능을 이용할 수 없습니다.</p>
          </div>
          <div class="gray-box__wrap">
            <div class="gray-box mt-b0">
              <p class="content">버튼 사용 통계를 받을 수 없습니다.</p>
              <p class="content">RCS 양방향 서비스를 이용할 수 없습니다.</p>
            </div>
          </div>
          <hr class="hr-dot-line">
          <div class="subtitle-wrap">
            <h5 id="guide_2_2">2. 2. RCS 양방향 대화방</h5>
          </div>
          <div class="text-box__wrap mt-t8">
            <div class="text-box">
              <p class="title" id="guide_2_2_1">양방향 대화방 설정</p>
              <p class="content">
                메시지 앱 사용자의 요청에 대해 기업에서 실시간으로 응답할 수 있는 대화방입니다.<br>
                양방향 대화방으로 설정하기 위해서는 대행사가 사전에 계약되어야 하며, RBC 대화방 등록 화면에서 양방향 대행사를 선택하면<br>
                됩니다.
              </p>
            </div>
          </div>
          <div class="guide-img__wrap">
            <img src="@/assets/images/guide/guide_chatbot_02.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_chatbot_02_mo.png" alt="" class="only-mo">
          </div>
          <div class="gray-box__wrap">
            <div class="gray-box mt-b0">
              <p class="content">RCS MO 대화방은 양방향 대화방으로 설정할 수 없습니다.</p>
              <p class="content">대표번호 문자수신 서비스(MO) 선택을 해지하셔야 설정 가능합니다.</p>
            </div>
          </div>
          <div class="btn__warp right">
            <router-link to="/partnerInfo" class="side-btn" target="_blank">양방향 대행사 보기</router-link>
          </div>
          <div class="text-box__wrap mt-t32">
            <div class="text-box">
              <p class="title" id="guide_2_2_2">양방향 대화방 특화 기능</p>
              <p class="content">대화방을 양방향 대화방으로 설정하면 RCS의 장점을 최대한 활용하실 수 있습니다.</p>
            </div>
          </div>
          <div class="gray-box__wrap">
            <div class="gray-box mt-t16">
              <p class="content">RCS 양방향 상품 발송</p>
              <p class="content">자동응답 메시지</p>
              <p class="content">대화방 메뉴에 자동응답 메시지 연결하기</p>
            </div>
          </div>
          <div class="btn__warp right multiline">
            <p><router-link to="/Chatbot#guide_2_2_1" class="side-btn">자동응답 메시지</router-link></p>
            <p><router-link to="/KeyFeatures#section03" class="side-btn">대화방 메뉴</router-link></p>
          </div>
          <div class="text-box__wrap mt-t32">
            <div class="text-box">
              <p class="title">양방향 대화방 검색</p>
              <p class="content">채팅+ 앱에서 고객이 브랜드명을 검색하여, 양방향 대화방을 찾을 수 있습니다.</p>
            </div>
          </div>
          <div class="guide-img__wrap mt-b0">
            <img src="@/assets/images/guide/guide_chatbot_03.png" alt="" class="only-pc">
            <img src="@/assets/images/guide/guide_chatbot_03_mo.png" alt="" class="only-mo">
          </div>
        </div>
        <div class="guide__item" id="section03">
          <div class="subtitle-wrap">
            <h4>3. 대화방 등록</h4>
          </div>
          <div class="subtitle-wrap mt-t8">
            <h5 id="guide_3_1">3. 1. 대화방 등록 가이드</h5>
            <p class="description">
              대화방은 발신번호 혹은 양방향 ID를 기준으로 생성할 수 있습니다.<br>
              발신번호로 대화방을 만드는 경우, 통신서비스 가입증명원이 필요합니다.</p>
          </div>
          <dl class="guide-qna__list chat-qna">
            <dt>통신서비스가입증명원이란?</dt>
            <dd class="add-answer">
                통신서비스 가입증명원(통신서비스 이용증명원)은 이용자 본인이 사용하는 전화번호를 증명하는 서류입니다.<br>
                2022년 3월 2일 전기통신사업법 84조의 2항이 개정되면서 문자발신번호에 규제가 강화되었습니다.<br>
                이에 따라 문자 메시지 발송을 위해 RCS 대화방을 만들 때 함께 제출하셔야 합니다.
                <div class="gray-box__wrap">
                  <div class="gray-box mt-b0">
                    <p class="content">대화방의 발신번호와 통신서비스가입증명원의 전화번호가 동일해야 합니다.</p>
                  </div>
                </div>
              </dd>
            <dt>통신서비스 가입증명원은 어떻게 발급받나요?</dt>
            <dd>
              <ol class="guide-list__num inner_qna">
                <li>
                    <p class="num-p"><span class="num">1</span>각 통신사의 웹사이트에서 로그인 후 증명원을 찾아 다운로드 받으세요.</p>
                    <p class="content"><span class="color-blue">SK 브로드밴드</span> : http://biz.skbroadband.com</p>
                    <p class="content"><span class="color-blue">KT</span> : kt.com / http://mybiz.kt.com</p>
                    <p class="content"><span class="color-blue">유플러스</span> : http://www.lguplus.com/biz</p>
                </li>
                <li>
                    <p class="num-p"><span class="num">2</span>각 통신사의 고객센터로 문의해 주세요.</p>
                    <p class="content"><span class="color-blue">SK 브로드밴드</span> : 1600-0108</p>
                    <p class="content"><span class="color-blue">KT</span> : 1600-0108 / 1588-0114</p>
                    <p class="content"><span class="color-blue">유플러스</span> : 1544-0001</p>
                </li>
              </ol>
            </dd>
          </dl>
          <div class="text-box__wrap mt-t32">
            <div class="text-box">
              <p class="title" id="guide_3_1_1">등록 가능한 발신번호</p>
              <p class="content">
                RCS 기업 메시지를 발송할 때 사용할 전화번호(이하 발신번호)를 사전에 등록해야 합니다.<br>
                브랜드 별 다수의 발신번호를 등록 가능하나 번호를 중복하여 사용할 수 없습니다.</p>
            </div>
          </div>
          <div class="table-box color-custom-table">
            <table>
              <caption>등록 가능한 발신번호</caption>
              <colgroup>
                <col width="40%">
                <col width="60%">
              </colgroup>
              <thead>
                <tr>
                  <th scope="col" class="pd-th10">구분</th>
                  <th scope="col" class="pd-th10">설명</th>
                </tr>
              </thead>
              <tbody class="pd-only-td">
                <tr>
                  <td class="fs13">유선 전화번호</td>
                  <td class="fs13">지역번호 포함한 전화번호 (17개 지역번호)</td>
                </tr>
                <tr>
                  <td class="fs13">전국 대표번호</td>
                  <td class="fs13">15XX, 16XX, 18XX 등 대표 번호</td>
                </tr>
                <tr>
                  <td class="fs13">공통서비스식별번호(0N0계열)</td>
                  <td class="fs13">030, 050, 070 등 번호</td>
                </tr>
                <tr>
                  <td class="fs13">특수번호</td>
                  <td class="fs13">112, 1355 등은 해당 사용자 (국가, 지방단체, 공공기관, 등)에 한하여 사용 가능</td>
                </tr>
              </tbody>
            </table>
          </div>
          <dl class="guide-qna__list box-qna">
              <dt>010 번호로 등록할 수 있나요?</dt>
              <dd>현재 RCS 기업 메시지는 010 번호를 지원하지 않습니다.</dd>
          </dl>
          <div class="text-box__wrap mt-t32">
            <div class="text-box">
              <p class="title" id="guide_3_1_2">타인 명의 발신번호</p>
              <p class="content">
                타인 명의 발신번호로 대화방 등록 시, 발신번호 소유주의 위탁서 및 발신번호 소유 인증 자료(아래 표)를 함께 등록하시면 됩니다.</p>
            </div>
          </div>
          <div class="table-box color-custom-table">
            <table>
              <caption>등록 가능한 발신번호</caption>
              <colgroup>
                <col width="14%">
                <col width="14%">
                <col width="24%">
                <col width="24%">
                <col width="24%">
              </colgroup>
              <thead>
                <tr>
                  <th scope="col" colspan="2" rowspan="2" class="pd-th10"></th>
                  <th scope="col" colspan="3" class="pd-th10">타인 소유의 발신번호인 경우</th>
                </tr>
                <tr>
                  <th scope="col" class="pd-th10">발신번호 : 개인</th>
                  <th scope="col" class="pd-th10">발신번호 : 개인사업자</th>
                  <th scope="col" class="pd-th10">발신번호 : 법인</th>
                </tr>
              </thead>
              <tbody class="pd-only-td">
                <tr>
                  <th scope="row" colspan="2" class="pd-th9">RCS 발신번호 위탁서</th>
                  <td>○</td>
                  <td>○</td>
                  <td>○</td>
                </tr>
                <tr>
                  <th rowspan="4" class="pd-th9 top-th">발신번호 소유주</th>
                  <th class="pd-th9">신분증 사본</th>
                  <td>○</td>
                  <td>○</td>
                  <td></td>
                </tr>
                <tr>
                  <th class="pd-th9">개인인감증명서</th>
                  <td>○</td>
                  <td>○</td>
                  <td></td>
                </tr>
                <tr>
                  <th class="pd-th9">사업자등록증</th>
                  <td></td>
                  <td>○</td>
                  <td>○</td>
                </tr>
                <tr>
                  <th class="pd-th9">법인인감증명서</th>
                  <td></td>
                  <td></td>
                  <td>○</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="content">발신번호 위탁서는 &#60;공지사항 / 서식&#62; 에서 다운로드 가능합니다.</p>
          <div class="btn__warp right">
            <router-link to="/notice" class="side-btn">공지사항 / 서식</router-link>
          </div>
          <div class="text-box__wrap mt-t32">
            <div class="text-box">
              <p class="title" id="guide_3_1_3">대화방 명 가이드</p>
              <p class="content">
                대화방 명은 문자 수신 시, 프로필 이미지와 함께 가장 먼저 노출됩니다.<br>
                대화방 명은 승신 심사 과정을 거친 후 반영되며, 대화방 명 심사 기준 및 권장 가이드를 확인해 주시기 바랍니다.
              </p>
            </div>
          </div>
          <div class="btn__warp right">
          <i class="download"></i>
          <a href="" download class="side-btn black">대화방명 가이드.pdf</a>
        </div>
        </div>
        <div class="guide__item" id="section04">
          <div class="subtitle-wrap">
            <h4>4. 대화방 삭제</h4>
          </div>
          <div class="subtitle-wrap mt-t16">
            <h5 id="guide_4_1">4. 1. 대화방 삭제 가이드</h5>
            <p class="description">대화방 삭제 시, 다음과 같이 처리됩니다.</p>
          </div>
          <div class="gray-box__wrap">
            <div class="gray-box">
              <p class="content">대화방 명과 프로필 이미지가 메시지 앱에서 표시되지 않습니다.</p>
              <p class="content">더 이상 RCS 기업 메시지를 발송할 수 없습니다.</p>
              <p class="content">연결된 대화방이 있는 경우, 함께 삭제됩니다. (삭제하는 대화방의 발신번호를 회신번호로 이용)</p>
              <p class="content">마지막 대화방을 삭제하는 경우, 브랜드도 함께 삭제됩니다.</p>
            </div>
          </div>
          <div class="text-box__wrap mt-t16">
            <div class="text-box">
              <p class="title" id="guide_4_1_1">대화방 삭제가 안되는 경우</p>
              <p class="content">다음과 같은 경우, 대화방 삭제를 할 수 없습니다.</p>
            </div>
          </div>
          <div class="gray-box__wrap">
            <div class="gray-box mt-t16">
              <p class="content">대화방의 상태가 &#60;승인요청&#62; &#60;검수중&#62; &#60;반려&#62; 인 경우</p>
            </div>
          </div>
          <div class="text-box__wrap mt-t16">
            <div class="text-box">
              <p class="title"  id="guide_4_1_2">자동 삭제 케이스</p>
              <p class="content">다음과 같은 경우, 대화방이 자동 삭제 됩니다.</p>
            </div>
          </div>
          <div class="gray-box__wrap">
            <div class="gray-box mt-t16 mt-b0">
              <p class="content">최초 등록 시, 반려 상태로 30일 경과 시</p>
              <p class="content">최소 등록 시, 통신서비스가입증명원 서류 미제출 30일 경과 시</p>
              <p class="content">대화방 사용 여부가 &#60;미사용&#62;인 상태로 30일 경과 시</p>
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
          'label': '2. 1. RCS MO 대화방',
          'to': '#guide_2_1',
          'anchorIndex': 0
        },
        {
          'label': '2. 2. RCS 양방향 대화방',
          'to': '#guide_2_2',
          'anchorIndex': 1,
          'isOpen': false,
          'isSubMenu': false,
          'children': [
            {
              'label': '양방향 대화방 설정',
              'to': '#guide_2_2_1',
              'anchorIndex': 0
            },
            {
              'label': '양방향 대화방 특화 기능',
              'to': '#guide_2_2_2',
              'anchorIndex': 1
            }
          ]
        },
        {
          'label': '3. 1. 대화방 등록 가이드',
          'to': '#guide_3_1',
          'anchorIndex': 2,
          'isOpen': false,
          'isSubMenu': false,
          'children': [
            {
              'label': '등록 가능한 발신번호',
              'to': '#guide_3_1_1',
              'anchorIndex': 0
            },
            {
              'label': '타인 명의 발신번호',
              'to': '#guide_3_1_2',
              'anchorIndex': 1
            },
            {
              'label': '대화방 명 가이드',
              'to': '#guide_3_1_2',
              'anchorIndex': 2
            }
          ]
        },
        {
          'label': '4. 1. 대화방 삭제 가이드',
          'to': '#guide_4_1',
          'anchorIndex': 3,
          'isOpen': false,
          'isSubMenu': false,
          'children': [
            {
              'label': '대화방 삭제가 안되는 경우',
              'to': '#guide_4_1_1',
              'anchorIndex': 0
            }
          ]
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
