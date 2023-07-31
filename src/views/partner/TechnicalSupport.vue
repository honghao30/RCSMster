<template>
  <div class="technical__wrap">
    <PageTitle pagetitle="기술지원" />
    <div class="technical__intro">
      <PageTitleH3 titleh3="API 기술지원"/>
      <div class="top-notice--gray">
        <p>- RCS 서비스를 이용하는 기업과 대행사에게는 RCS 서비스 운영에 필요한 기능을 Open API로 제공하고 있습니다.</p>
        <p>- 이를 이용하여 브랜드/발신번호/양방향 대화방/템플릿/자동응답 정보 조회는 물론 발신번호, <br class="only-mo">템플릿에 대한 승인 요청 기능 등을 사용자가 원하는 형태로 구현하실 수 있습니다.</p>
      </div>
    </div>
    <div class="technical__top">
      <PageTitleH3 titleh3="API 목록"/>
      <div class="technical-list">
        <dl>
          <dt>Token</dt>
          <dd>Access Token 발급 요청</dd>
        </dl>
        <dl>
          <dt>Corporation</dt>
          <dd>기업관리자 ID별 관리 권한이 있는 브랜드 목록 조회</dd>
        </dl>
        <dl>
          <dt>Agency</dt>
          <dd>기업관리자 ID별 관리 권한이 있는 브랜드 목록 조회</dd>
        </dl>
        <dl>
          <dt>Messagebase</dt>
          <dd>템플릿 목록 및 상세 정보 조회와 관리<br class="only-mo">(등록/수정/삭제)</dd>
        </dl>
        <dl>
          <dt>Chatbot</dt>
          <dd>브랜드에 등록된 발신번호, 양방향 대화방 목록 조회와 관리(등록/수정/삭제)</dd>
        </dl>
        <dl>
          <dt>Feed</dt>
          <dd>브랜드에 등록된 소식 조회와 관리(등록/수정/삭제)</dd>
        </dl>
      </div>
      <ul class="technical-list-notice">
        <li>&middot; Open API 사용을 위한 API 인증Key는 가입신청 승인 시 발급됩니다. (기업관리자/대행사 계정인 경우)</li>
        <!-- 텍스트 버튼 선택 시, 개인정보 관리 페이지로 이동 -->
        <li>&middot; API Key는 <router-link to="/myinfo" class="list-link">개인정보 관리</router-link>에서 확인 및 재발급 가능합니다.</li>
        <!-- 텍스트 버튼 선택 시, 온라인 문의 등록 페이지로 이동 -->
        <li>&middot; 직접 재발급이 어려운 경우 관리자에게 <router-link to="/OnlineInquire" class="list-link">문의</router-link>해주세요.</li>
        <!-- 텍스트 버튼 선택 시, 공지사항 목록 페이지로 이동 -->
        <li>&middot; Open API 변경 사항은 <router-link to="/notice" class="list-link">공지사항</router-link>에서 확인하실 수 있습니다.</li>
      </ul>
    </div>
    <div class="technical__middle">
      <!-- 01. RCS Biz Center Open API 바로가기 -->
      <div class="technical__link">
        <div class="link-des">
          <h4>RCS Biz Center Open API 바로가기</h4>
          <div class="chrome">
            <img src="@/assets/images/technical/chrome_logo.png" alt="">
            <p>크롬 브라우저를 이용하세요.</p>
          </div>
        </div>
        <!-- 선택 시, 새창으로 연결 -->
        <div class="link-box">
          <a href="https://app.swaggerhub.com/apis-docs/MaaP_KR/RCS_Biz_Center/1.1.9" target="_blank">
            <img src="@/assets/images/icon/icon_link_move.png" alt="" class="only-pc">
            <img src="@/assets/images/icon/icon_link_move_mo.png" alt="" class="only-mo">
            <span class="blind">RCS Biz Center Open API 바로가기</span>
          </a>
        </div>
      </div>
      <!-- 02. 브랜드 소식 Open API 바로가기 -->
      <div class="technical__link">
        <div class="link-des">
          <h4>브랜드 소식 Open API 바로가기</h4>
          <div class="chrome">
            <img src="@/assets/images/technical/chrome_logo.png" alt="">
            <p>크롬 브라우저를 이용하세요.</p>
          </div>
        </div>
        <!-- 선택 시, 새창으로 연결 -->
        <div class="link-box">
          <a href="https://app.swaggerhub.com/apis-docs/MaaP_KR/RCS_Biz_Center_Brand_Feed/1.0.0" target="_blank">
            <img src="@/assets/images/icon/icon_link_move.png" alt="" class="only-pc">
            <img src="@/assets/images/icon/icon_link_move_mo.png" alt="" class="only-mo">
            <span class="blind">브랜드 소식 Open API 바로가기</span>
          </a>
        </div>
      </div>
    </div>
    <div class="technical__bottom">
      <PageTitleH3 titleh3="레이아웃 만들기"/>
      <div class="top-notice--gray">
        <p>- 자유로운 메시지 유형 제작을 위해 메시지 레이아웃 만들기를 제공합니다.</p>
        <p>- 컴포넌트를 활용하여 원하는 형태의 메시지 레이아웃을 제작할 수 있습니다.</p>
      </div>
      <div class="technical__step">
        <div class="each-step one">
          <div class="bg-shape">
            <div class="bg-shape-circle">
              <div class="each-step-tit">
                <p class="step-num">1</p>
                <p class="step-txt">컴포넌트<br class="only-pc"> 조합</p>
              </div>
            </div>
            <div class="bg-shape-line"></div>
            <div class="bg-shape-arrow only-pc"></div>
          </div>
          <div class="each-step-des">
            <p>대상 상품 : SMS,LMS,MMS<br class="only-pc"> 상품을 선택하고<br class="only-mo"> 원하는 형태로<br class="only-pc"> 컴포넌트를 조합합니다.</p>
          </div>
        </div>
        <div class="each-step two">
          <div class="bg-shape">
            <div class="bg-shape-circle">
              <div class="each-step-tit">
                <p class="step-num">2</p>
                <p class="step-txt">템플릿명<br class="only-pc"> 작성</p>
              </div>
            </div>
            <div class="bg-shape-line"></div>
            <div class="bg-shape-arrow"></div>
          </div>
          <div class="each-step-des">
            <p>제작한 메시지 레이아웃의<br class="only-pc"> json 코드를<br class="only-mo"> 복사할 수 있습니다.</p>
          </div>
        </div>
        <div class="each-step three">
          <div class="bg-shape">
            <div class="bg-shape-circle">
              <div class="each-step-tit">
                <p class="step-num">3</p>
                <p class="step-txt">레이아웃<br class="only-pc"> 제작 완료</p>
              </div>
            </div>
            <div class="bg-shape-line"></div>
            <div class="bg-shape-arrow"></div>
          </div>
          <div class="each-step-des">
            <p>저장된 레이아웃은 승인없이<br> 사용이 가능합니다.</p>
          </div>
        </div>
      </div>
      <div class="button__wrap only-pc">
        <!-- 선택 시, 레이아웃 만들기 페이지로 이동 -->
        <router-link to="/LayoutRegistration" class="btn btn-blue">레이아웃 만들기 바로가기</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'

export default {
  components: {
    PageTitle,
    PageTitleH3
  },
  data() {
    return {
    }
  }
}

</script>
