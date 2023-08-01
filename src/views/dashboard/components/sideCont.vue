<template>
  <div class="dashBoard-side">
    <!-- 기업정보 -->
    <!-- 마스터 -->
    <div class="side-box side-box__info">
      <div class="side-box__info-top">
        <div class="side-box-top">
          <h4>더피프티원</h4>
          <span class="authority master">운영자</span> <!-- 기획서 v1.0 수정 - 문구 수정(마스터 -> 운영자) -->
        </div>
        <div class="side-box-middle">
          <span class="id">CO.K0803h0r0O</span>
          <span class="date">2023.03.09</span>
        </div>
      </div>
      <!-- 안심마크 사용 기업 -->
      <div class="side-box-cont" v-if="safetyMarkCompany">
        <div>RCS 메시지 상단에
          “<a
            role="button"
            class="safetymark"
            @click="safetyDesModal"
            >안심마크</a>(
            <span class="safety_icon-text">
            <span class="safety_icon"></span>
              확인된 발신번호
            </span>
            )”를
        </div>
        <div>표시하여 사칭 문자로 인한 스미싱 범죄 등에 안전함을 안내할 수 있습니다.
        </div>
      </div>
      <!-- // 안심마크 사용 기업 -->
    </div>
    <!-- // 마스터 -->
    <!-- 매니저 -->
    <div class="side-box side-box__info">
      <div class="side-box__info-top">
        <div class="side-box-top">
          <h4>더피프티원</h4>
          <span class="authority manager">매니저</span>
        </div>
        <div class="side-box-middle">
          <span class="id">CO.K0803h0r0O</span>
          <span class="date">2023.03.09</span>
        </div>
      </div>
      <!-- 안심마크 사용 기업 -->
      <div class="side-box-cont" v-if="safetyMarkCompany">
        <div>RCS 메시지 상단에
          “<a
            role="button"
            class="safetymark"
            @click="safetyDesModal"
            >안심마크</a>(
            <span class="safety_icon-text">
            <span class="safety_icon"></span>
              확인된 발신번호
            </span>
            )”를
        </div>
        <div>표시하여 사칭 문자로 인한 스미싱 범죄 등에 안전함을 안내할 수 있습니다.
        </div>
      </div>
      <!-- // 안심마크 사용 기업 -->
    </div>
    <!-- // 매니저 -->
    <!-- 대행사 -->
    <div class="side-box side-box__info">
      <div class="side-box__info-top">
        <div class="side-box-top">
          <h4>비즈뿌리오</h4>
          <span class="authority agency">대행사</span>
        </div>
        <div class="side-box-middle">
          <span class="id">CO.K0803h0r0O</span>
          <span class="date">2023.03.09</span>
        </div>
      </div>
      <div class="side-box-cont" v-if="safetyMarkCompany===false"></div>
    </div>
    <!-- // 대행사 -->
    <!-- // 기업정보 -->
    <!-- 전체 브랜드 운영 관리 (마스터, 매니저) -->
    <div class="side-btn">
      <!-- 230616 [a태그 + router-link태그] →  [router-link태그] 수정 -->
      <router-link to="/dashboardOperationManage" class="btn btn-blue-line">전체 브랜드 운영 관리</router-link>
    </div>
    <!-- // 전체 브랜드 운영 관리 (마스터, 매니저) -->
    <!-- 기획서 v1.0 수정 - 배너 추가 -->
    <!-- 가변 배너 -->
    <div class="side-box side-box__banner banner_flex">
      <div class="side-box-img">
        <div class="brand_icon">
          <img src="@/assets/images/icon/brand_icon.png" alt="">
        </div>
      </div>
      <div class="banner_side-box">
        <h3>기업과 고객 간 연결을 위한<br>
          다양한 RBC서비스를 이용하세요.</h3>
        <router-link to="" class="side-company-btn">브랜드 개설하기</router-link>
      </div>
    </div>
    <!-- // 가변 배너 -->
    <!-- //기획서 v1.0 수정 - 배너 추가 -->
    <!-- 운영권한 관리 및 신청 내역 (마스터) -->
    <div class="side-box side-box__authority">
      <div class="side-box-top">
        <h4>운영권한 승인 신청 내역 ({{authorityList.length}})</h4>
      </div>
      <div class="side-box-cont">
        <div class="authority-list" v-for="(item,i) in authorityList" :key="i">
          <ul>
            <li class="authority-list__company">{{ item.company }}</li>
            <li class="authority-list-between">
              <ul>
                <li class="authority-list__name">{{ item.name }}</li>
                <li class="authority-list__date">{{ item.date }}</li>
              </ul>
            </li>
            <li class="authority-list-center">
              <ul>
                <li class="authority-list__phone">{{ item.phone }}</li>
                <li>&nbsp;/&nbsp;</li>
                <li class="authority-list__mail">{{ item.mail }}</li>
              </ul>
            </li>
          </ul>
          <!-- 기획서 v1.0 수정(pub2Dev 기록으로 작성함) -->
          <div class="button__wrap">
            <!-- 반려 버튼 선택 시,
              1. 운영권한 승인 신청 반려 팝업 출력 → ModalView에서 작성함 주석 중 '◆' 특수문자 있는 부분입니다.( pub-hongsh : 모달창 화면 구현 O / pub2Dev : 모달창 화면 구현 X)
              2. 반려 시 운영권한 승인 신청 내역에서 해당 내역 삭제)
            -->
            <ButtonCmp
              type="btn-line"
              size="small"
              @click="rejectModal"
            >반려</ButtonCmp> <!-- 기획서 v1.0 수정 (@click="rejectModal" 추가)-->
            <!-- 승인 선택 시,
              1. 운영권한 승인 신청 내역 내 숨김 처리
              2. 운영권한 신청자의 계정권한에 따라 권한 부여
                마스터가 운영권한 신청 시 마스터 권한 부여 / 매니저가 운영권한 신청 시 매니저 권한 부여) -->
            <ButtonCmp
              type="btn-blue-line"
              size="small"
            >승인</ButtonCmp>
          </div>
          <!-- // 기획서 v1.0 수정(pub2Dev 기록으로 작성함) -->
        </div>
        <div class="authority-list-none">
          <p>운영권한 승인 신청 내역이 없습니다.</p>
        </div>
        <div class="authority-list-more">
          <a role="button" :class="{open: isOpen}" @click="toggleMore">더보기</a>
        </div>
      </div>
    </div>
    <!-- // 운영권한 관리 및 신청 내역 (마스터) -->
    <!-- 사용 가이드 -->
    <!-- 1. 멤버 초대하기 (마스터) -->
    <div class="side-box side-box__invite">
      <div class="side-box-top">
        <h4>브랜드 운영자 초대하기</h4> <!-- 기획서 v1.0 수정 - 문구 수정(마스터 -> 운영자) -->
      </div>
      <div class="side-box-cont">
        <p>함께 관리하고 운영하는 멤버를 초대하세요.</p>
        <p>아직 가입하지 않는 멤버도 초대할 수 있어요.</p>
      </div>
      <div class="button__wrap side-box-bottom">
        <!-- 전체 브랜드 운영권한 초대 팝업 출력 -->
        <ButtonCmp
          type="btn-blue-line"
          size="medium"
        >
        브랜드 운영권한 초대
        </ButtonCmp>
      </div>
    </div>
    <!-- // 1. 멤버 초대하기 (마스터) -->
    <!-- 2. 서비스 이용 가이드 (마스터, 매니저, 대행사) -->
    <div class="side-box side-box__invite">
      <div class="side-box-top">
        <h4>서비스 이용 가이드</h4>
      </div>
      <div class="side-box-cont">
        <p>RCS를 쉽고 편리하게 관리 할 수 있도록<br> 이용 가이드를 확인하세요.</p>
      </div>
      <div class="button__wrap side-box-bottom">
        <!-- HOME > 이용 가이드 페이지로 이동 -->
        <router-link to="" class="btn btn-blue-line medium">이용 가이드</router-link>
      </div>
    </div>
    <!-- // 2. 서비스 이용 가이드 (마스터, 매니저, 대행사) -->
    <!-- 3. 브랜드 즐겨찾기 (마스터, 매니저, 대행사) -->
    <div class="side-box side-box__invite">
      <div class="side-box-top">
        <h4>브랜드 즐겨찾기</h4>
      </div>
      <div class="side-box-cont">
        <p class="star_des">운영중인 브랜드를 즐겨찾기<span class="star"></span>설정하면</p>
        <p>간편하게 자주 사용하는 브랜드에 접속할 수 있어요.</p>
      </div>
    </div>
    <!-- // 3. 브랜드 즐겨찾기 (마스터, 매니저, 대행사) -->
    <!-- 4. 마스터 계정 설정 -기업회원 (매니저) -->
    <div class="side-box side-box__invite">
      <div class="side-box-top">
        <h4>운영자 계정 설정</h4> <!-- 기획서 v1.0 수정 - 문구 수정(마스터 -> 운영자) -->
        <p>승인이 완료되면 모든 기능을 사용할 수 있어요.</p>
      </div>
      <div class="side-box-cont">
        <ul class="invite__step">
          <li>
            <strong>1</strong>
            <!-- 마이페이지 > 기업정보관리 페이지로 이동  -->
            <!-- 사업자등록증 제출 : 글자 컬러 스타일(검정), 꺽쇠 없는 경우 : step-more, submit-more 클래스 삭제 -->
            <router-link to="" class="step-more submit-more">사업자등록증 제출</router-link>
          </li>
          <li>
            <strong>2</strong>
            <!-- 마스터 승격 완료 글자 컬러 스타일 변경될 시 : step-more 클래스 추가 -->
            <a>운영자 승격 완료</a> <!-- 기획서 v1.0 수정 - 문구 수정(마스터 -> 운영자) -->
          </li>
        </ul>
      </div>
    </div>
    <!-- // 4. 마스터 계정 설정 -기업회원 (매니저) -->
    <!-- 5. 브랜드 운영권한 신청 (대행사) -->
    <div class="side-box side-box__invite">
      <div class="side-box-top">
        <h4>브랜드 운영권한 신청</h4>
      </div>
      <div class="side-box-cont">
        <p>브랜드의 관리자에게 대행사 권한을 신청합니다.<br>권한이 부여되면 RCS 메시지 발송이 가능합니다.</p>
      </div>
      <div class="button__wrap side-box-bottom">
        <!--  @click="BrandAuthorityRequestModal" : ModalView에서 작성함 주석 중 '★' 특수문자 있는 부분입니다. ( pub-hongsh : 모달창 화면 구현 O / pub2Dev : 모달창 화면 구현 X) -->
        <ButtonCmp
          type="btn-blue-line"
          size=" medium"
          @click="BrandAuthorityRequestModal"
        >
        브랜드 운영권한 신청
        </ButtonCmp>
      </div>
    </div>
    <!-- // 5. 브랜드 운영권한 신청 (대행사) -->
    <!-- // 사용 가이드 -->
    <!-- 가변 배너 (마스터, 매니저) -->
    <div class="side-box side-box__banner">
      <div class="side-box-top">
        <h3>양방향 대행사<br>필요하지 않으세요?</h3>
        <p>챗봇을 사용하면 고객과 더 가깝게 소통할 수 있어요.</p>
        <router-link to="" class="side-company-btn">양방향 대행사 보러가기</router-link>
        <div class="side-box-img">
          <div class="chat_icon">
            <img src="@/assets/images/icon/icon_chatbot.png" alt="">
          </div>
        </div>
      </div>
    </div>
    <!-- // 가변 배너 (마스터, 매니저) -->
    <!-- 기업 히스토리 (마스터, 매니저, 대행사) -->
    <div class="link-area">
      <router-link to="/ManageHistory" class="arrow-link">기업 히스토리</router-link>
    </div>
    <!-- // 기업 히스토리 (마스터, 매니저, 대행사) -->
    <!-- 모달 -->
    <ModalView
      v-if="isModalViewed"
      @closeModal="isModalViewed = false"
    >
      <!-- 대행사 등록 유도 팝업 : 마스터가 운영권한이 있는 브랜드 중 대행사가 등록되지 않은 브랜드가 있는 경우 노출되는 팝업 -->
      <ConfirmMsg
        @closeModal="isModalViewed = false, isMemberInvite = false"
        v-if="isMemberInvite"
        modalsize="dashboard_small_modal"
      >
        <div class="msg" slot="msg">
          <div class="invite-question">
            <p>브랜드에 대행사를 등록하셔야만<br>
              메시지 발송이 가능합니다.<br>
              대행사를 등록 하시겠습니까?</p>
          </div>
          <div class="invite_detail">
            <p>LANVIN COLLECTION</p>
            <p>더캐시미어</p>
          </div>
        </div>
        <div class="button__wrap" slot="button">
          <ButtonCmp
            type="btn-line"
            @click="closeMsg"
          >
            닫기
          </ButtonCmp>
          <!-- 초대 버튼 > 대행사 운영권한 부여 팝업 출력 > 기획서 v.09 기준 대행사 운영권한 부여 팝업 삭제 -->
          <ButtonCmp
            type="btn-blue"
            @click="closeMsg"
          >
            초대
          </ButtonCmp>
        </div>
      </ConfirmMsg>
      <!-- // 대행사 등록 유도 팝업 : 마스터가 운영권한이 있는 브랜드 중 대행사가 등록되지 않은 브랜드가 있는 경우 노출되는 팝업 -->
      <!-- 안심마크 -->
      <ConfirmMsg
        @closeModal="isModalViewed = false, isModalSafetyDes = false"
        v-if="isModalSafetyDes"
        modalsize="dashboard_modal"
      >
        <div class="msg" slot="msg">
          <h3>안심마크 서비스란 무엇인가요?</h3>
          <!-- 기획서 v1.0 수정 - 구조 변경 및 문구 수정 -->
          <div class="safetymark_des">
            <p>안심마크는 사칭 문자 가능성이 있는 일반 문자와 쉽게 구분할 수 있도록, 기업용 RCS 메시지에서
              만 제공되는 서비스입니다. 인증마크(<span class="safety_icon"></span>)와, 안심문구(<span class="safety_icon-text">확인된 발신번호</span>)를 결합한 형태로 RCS
              메시지 카드 상단에 표시되며 실제 해당 기업에서 발송했음을 증명합니다.
            </p>
            <img src="@/assets/images/modal/dashboard_safetymark.png" alt="">
            <p>안심마크는 한국인터넷진흥원(KISA)의 허가를 받은 기업만 사용 가능하며, 해당 기업의 발신번
              호로 전송되는 RCS메시지는 기본적으로 안심마크가 붙게 됩니다. 이용을 원치 않는 경우 대화방
              별 안심마크를 설정 해제 할 수 있습니다. (RCS Biz Center > 안심마크 관리 메뉴)
            </p>
            <p>
              한국인터넷진흥원은 스미싱 사고가 자주 발생하는 금융/공공기관 등을 대상으로 사용권한을 부
              여하고 있으니, 안심마크 서비스 도입을 희망하시는 경우 한국인터넷진흥원
              (<a href="mailto:numbers@kisa.or.kr" class="safetymark_mail">numbers@kisa.or.kr</a>)으로 문의해주세요.
            </p>
          </div>
          <!-- //기획서 v1.0 수정 - 구조 변경 및 문구 수정 -->
        </div>
        <div class="button__wrap" slot="button">
          <ButtonCmp
            type="btn-line"
            @click="closeMsg"
          >
            닫기
          </ButtonCmp>
        </div>
      </ConfirmMsg>
      <!-- // 안심마크 -->
      <!-- ◆ 운영권한 신청 반려 버튼 클릭 시 -->
      <BrandAuthorityReject
        @closeModal="isModalViewed = false, isModalReject = false"
        @rejectFinish="rejectFinishModal"
        v-if="isModalReject"
        modalsize="dashboard_modal"
      >
      </BrandAuthorityReject>
      <!-- // ◆ 운영권한 신청 반려 버튼 클릭 시 -->
      <!-- ◆ 운영권한 신청 반려 버튼 클릭 시 > 반려 버튼 -->
      <ConfirmMsg
        @closeModal="isModalViewed = false, isRejectFinish = false"
        v-if="isRejectFinish"
        modalsize="dashboard_small_modal"
      >
        <div class="msg" slot="msg">
          <p>운영권한 신청이 반려되었습니다.</p>
        </div>
        <div class="button__wrap" slot="button">
          <ButtonCmp
            type="btn-line"
            @click="closeMsg"
          >
            확인
          </ButtonCmp>
        </div>
      </ConfirmMsg>
      <!-- // ◆ 운영권한 신청 반려 버튼 클릭 시 > 반려 버튼 -->
      <!-- ★ 브랜드 운영권한 신청 (대행사) > 브랜드 운영권한 신청 버튼 클릭 시 -->
      <BrandAuthorityRequest
        @closeModal="isModalViewed = false, isAuthorityRequest = false"
        v-if="isAuthorityRequest"
        modalsize="dashboard_modal"
      >
      </BrandAuthorityRequest>
      <!-- // ★ 브랜드 운영권한 신청 (대행사) > 브랜드 운영권한 신청 버튼 클릭 시 -->
    </ModalView>
    <!-- // 모달 -->
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/dashboard/components/ConfirmMsg.vue'
import BrandAuthorityRequest from '@/views/dashboard/components/BrandAuthorityRequest.vue'
import BrandAuthorityReject from '@/views/dashboard/components/BrandAuthorityReject.vue'

export default {
  components: {
    ButtonCmp,
    ModalView,
    ConfirmMsg,
    BrandAuthorityRequest,
    BrandAuthorityReject
  },
  data() {
    return {
      authorityList: [
        {
          company: 'SYSTEM STUDIOS',
          name: '김솔솔(solsol51)',
          date: '2023.04.18',
          phone: '010-1234-5678',
          mail: 'solsol@studios.com'
        },
        {
          company: 'SYSTEM HOME',
          name: '오동동(DDoh123)',
          date: '2023.04.18',
          phone: '010-1234-5678',
          mail: 'solsol@studios.com'
        },
        {
          company: '롯데홈쇼핑',
          name: '김미미(mimmim)',
          date: '2023.04.18',
          phone: '010-1234-5678',
          mail: 'solsol@studios.com'
        }
      ],
      isOpen: false,
      safetyMarkCompany: true,
      isModalViewed: false,
      isModalSafetyDes: false,
      isModalReject: false,
      isRejectFinish: false,
      isMemberInvite: false,
      isAuthorityRequest: false
    }
  },
  computed: {
  },
  methods: {
    toggleMore () {
      this.isOpen = !this.isOpen
    },
    closeMsg () {
      this.isModalViewed = false
      this.isModalSafetyDes = false
      this.isModalReject = false
      this.isRejectFinish = false
      this.isMemberInvite = false
    },
    MemberInvite () {
      this.isModalViewed = true
      this.isMemberInvite = true
    },
    safetyDesModal () {
      this.isModalViewed = true
      this.isModalSafetyDes = true
    },
    rejectModal () {
      this.isModalViewed = true
      this.isModalReject = true
      this.isRejectFinish = false
    },
    rejectFinishModal () {
      this.isModalViewed = true
      this.isRejectFinish = true
      this.isModalReject = false
    },
    BrandAuthorityRequestModal () {
      this.isModalViewed = true
      this.isAuthorityRequest = true
    }
  }
}
</script>

<style>

</style>
