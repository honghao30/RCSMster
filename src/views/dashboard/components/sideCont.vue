<template>
  <div class="dashBoard-side">
    <!-- 기업정보 -->
    <div class="side-box side-box__info">
      <div class="side-box__info-top">
        <div class="side-box-top">
          <h4>{{corpInfo.name}}</h4>
          <span class="authority"
                :class="{'master': authority === '마스터', 'manager': authority === '매니저', 'agency': authority === '대행사'}"
          >{{authority}}</span>  <!-- 기획서 v1.0 수정 - 문구 수정(마스터 -> 운영자) -->
        </div>
        <div class="side-box-middle">
          <span class="id">{{corpInfo.corpId}}</span>
          <span class="date">{{corpInfo.regDt}}</span>
        </div>
      </div>
      <!-- 안심마크 사용 기업 -->
      <div class="side-box-cont" v-if="corpInfo.saftyStatus === 'SET'">
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
    <!-- router -->
    <div class="side-btn" v-if='userType === "CORP" && corpAdmYn === "Y"'>
      <!-- 230616 [a태그 + router-link태그] →  [router-link태그] 수정 -->
      <router-link class="btn btn-blue-line" v-if='corpInfo.corpId' :to="{name: 'corpManageUrl', params: {corpId: corpInfo.corpId}}">전체 브랜드 운영 관리</router-link>
    </div>
    <!-- 기획서 v1.0 수정 - 배너 추가 -->
    <!-- 가변 배너 -->
    <div class="side-box side-box__banner banner_flex" v-if='userType === "CORP"'>
      <div class="side-box-img">
        <div class="brand_icon">
          <img src="@/assets/images/icon/brand_icon.png" alt="">
        </div>
      </div>
      <div class="banner_side-box">
        <h3>기업과 고객 간 연결을 위한<br>
          다양한 RBC서비스를 이용하세요.</h3>
        <router-link :to="{name: 'createBrand'}" class="side-company-btn">브랜드 개설하기</router-link>
      </div>
    </div>
    <!-- // 가변 배너 -->
    <!-- //기획서 v1.0 수정 - 배너 추가 -->
    <!-- 운영권한 관리 및 신청 내역 -->
    <div class="side-box side-box__authority" v-if='userType === "CORP" && corpAdmYn === "Y"'>
      <div class="side-box-top">
        <h4>운영권한 승인 신청 내역 ({{authReqBrandData.length}})</h4>
      </div>
      <div class="side-box-cont">
        <div class="authority-list" v-for="(item,i) in authReqBrandData" :key="i">
          <ul>
            <li class="authority-list__company">{{ item.name }}</li>
            <li class="authority-list-between">
              <ul>
                <li class="authority-list__name">{{ item.userNm }}</li>
                <li class="authority-list__date">{{ item.reqDt }}</li>
              </ul>
            </li>
            <li class="authority-list-center">
              <ul>
                <li class="authority-list__phone">{{ item.mblNum }}</li>
                <li>&nbsp;/&nbsp;</li>
                <li class="authority-list__mail">{{ item.email }}</li>
              </ul>
            </li>
          </ul>
          <!-- 기획서 v1.0 수정 후 -->
          <div class="button__wrap">
            <!-- 반려 버튼 선택 시,
              1. 운영권한 승인 신청 반려 팝업 출력 → ModalView에서 작성함 주석 중 '◆' 특수문자 있는 부분입니다. (모달창 화면 구현 X)
              2. 반려 시 운영권한 승인 신청 내역에서 해당 내역 삭제)
            -->
            <ButtonCmp
              type="btn-line"
              size="small"
              @click='reject(false, item.brandId, item.name, item.userNm, item.mgrUserId)'
            >반려</ButtonCmp>
            <!-- 승인 선택 시,
              1. 운영권한 승인 신청 내역 내 숨김 처리
              2. 운영권한 신청자의 계정권한에 따라 권한 부여
                마스터가 운영권한 신청 시 마스터 권한 부여 / 매니저가 운영권한 신청 시 매니저 권한 부여) -->
            <ButtonCmp
              type="btn-blue-line"
              size="small"
              @click="onSubmit(item)"
            >승인</ButtonCmp> <!-- 기획서 v1.0 수정 (type 변경) -->
          </div>
          <!-- // 기획서 v1.0 수정 후 -->
        </div>
        <div class="authority-list-none" v-if='authReqBrandData.length === 0'>
          <p>운영권한 승인 신청 내역이 없습니다.</p>
        </div>
        <div class="authority-list-more" v-if='originAuthReqBrandData.length > 3'>
          <a role="button" :class="{open: isOpen}" @click="toggleMore">{{ isOpen ? '더보기' : '접기' }}</a>
        </div>
      </div>
    </div>
    <!-- 멤버 초대하기 -->
    <!-- 1. 멤버 초대하기 (마스터) -->
    <div class="side-box side-box__invite"  v-if="isShowBrandInviteGuide">
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
          @click="brandInvite"
        >
        브랜드 운영권한 초대
        </ButtonCmp>
      </div>
    </div>
    <!-- // 1. 멤버 초대하기 (마스터) -->
    <!-- 2. 서비스 이용 가이드 (마스터, 매니저, 대행사) -->
    <div class="side-box side-box__invite" v-if='isShowServiceGuide'>
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
    <div class="side-box side-box__invite" v-if='isShowFavoriteGuide'>
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
    <div class="side-box side-box__invite" v-if="isShowMasterGuide">
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
            <router-link :to="{name: 'MasterAuthApply'}" class="step-more submit-more">사업자등록증 제출</router-link>
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
    <div class="side-box side-box__invite" v-if="userType === 'AGENCY'">
      <div class="side-box-top">
        <h4>브랜드 운영권한 신청</h4>
      </div>
      <div class="side-box-cont">
        <p>브랜드의 관리자에게 대행사 권한을 신청합니다.<br>권한이 부여되면 RCS 메시지 발송이 가능합니다.</p>
      </div>
      <div class="button__wrap side-box-bottom">
        <!--  @click="BrandAuthorityRequestModal" : ModalView에서 작성함 주석 중 '★' 특수문자 있는 부분입니다. (모달창 화면 구현 X) -->
        <ButtonCmp
          type="btn-blue-line"
          size=" medium"
          @click='openBrandAuthority'
        >
        브랜드 운영권한 신청
        </ButtonCmp>
      </div>
    </div>
    <!-- // 5. 브랜드 운영권한 신청 (대행사) -->
    <!-- 가변 배너 -->
    <div class="side-box side-box__banner" v-if='userType === "CORP" && corpAdmYn === "Y"'>
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
    <!-- // 가변 배너 -->
    <!-- 기업 히스토리 (마스터, 매니저, 대행사) -->
    <div class="link-area">
      <router-link v-if='userType && corpAdmYn' :to="{name: 'corpHistory', params: {userType: userType, corpAdmYn: corpAdmYn}}" class="arrow-link">기업 히스토리</router-link>
    </div>
    <!-- 기획서 v1.0 수정 - 모달 추가 (화면구현은 안함 / script 꼬일 수 있어서 script는 작업 안함) -->
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
            @click="isModalViewed = false, isModalSafetyDes = false"
          >
            닫기
          </ButtonCmp>
        </div>
      </ConfirmMsg>
      <!-- // 안심마크 -->
      <!-- ◆ 운영권한 신청 반려 버튼 클릭 시 -->
      <BrandAuthorityReject
        @closeModal="isModalViewed = false, isModalReject = false"
        @rejectFinish="isModalReject = false, isRejectFinish = true"
        v-if="isModalReject"
        :rejectInfo='rejectInfo'
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
            @click="isModalViewed = false, isRejectFinish = false"
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
      <!-- 브랜드 운영권한 초대 팝업 -->
      <BrandAuthorityInvite
        @closeModal="isModalViewed = false, isBrandAuthorityInvite = false"
        @newMemberInvite="newMemberInviteModal"
        v-if="isBrandAuthorityInvite"
        modalsize="dashboard_modal"
      >
      </BrandAuthorityInvite>
      <!-- 브랜드 운영권한 초대 팝업 -->
      <!-- 브랜드 운영권한 초대 팝업 > 신규 회원 초대 -->
      <BrandAuthorityNewInvite
        @closeModal="isModalViewed = false, isNewMemberInvite = false"
        v-if="isNewMemberInvite"
        modalsize="dashboard_modal"
      >
      </BrandAuthorityNewInvite>
      <!-- 브랜드 운영권한 초대 팝업 > 신규 회원 초대 -->
      <!-- 브랜드 운영권한 신청 팝업 -->
      <brandAuthorityReq
        v-if='isBrandAuthority'
        @closeModal="isModalViewed = false, isBrandAuthority = false"
        modalsize="dashboard_modal"
      />
      <!-- // 브랜드 운영권한 신청 팝업 -->
    </ModalView>
    <!-- // 모달 -->
    <!-- 기획서 v1.0 수정 - 모달 추가 (화면구현은 안함 / script 꼬일 수 있어서 script는 작업 안함) -->
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import store from '@/store'
import { getAuthReqbrandList, operationAuthorityApproval } from '@/api/service/corp'
import { mapGetters } from 'vuex'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/join/components/ConfirmMsg.vue'
import BrandAuthorityReject from '@/views/dashboard/components/BrandAuthorityReject.vue'
import BrandAuthorityInvite from '@/views/dashboard/components/BrandAuthorityInvite.vue'
import BrandAuthorityNewInvite from '@/views/dashboard/components/BrandAuthorityNewInvite.vue'
import brandAuthorityReq from '@/views/dashboard/components/BrandAuthorityReq.vue'

export default {
  components: {
    brandAuthorityReq,
    BrandAuthorityNewInvite,
    BrandAuthorityInvite,
    BrandAuthorityReject,
    ConfirmMsg,
    ModalView,
    ButtonCmp
  },
  props: {
    corpInfo: {
      type: Object,
      required: true
    },
    isShowFavoriteGuide: Boolean,
    isShowBrandInviteGuide: Boolean
  },
  data() {
    return {
      corpId: '',
      authReqBrandsearchParam: {
        corpId: ''
      },
      authReqBrandData: [],
      originAuthReqBrandData: [],
      approveList: [],
      isOpen: false,
      rejectInfo: {},
      isModalViewed: false, // 모달
      isMemberInvite: false, // 브랜드 대행사 등록
      isModalSafetyDes: false, // 안심마크 안내
      isModalReject: false, // 운영권한 신청 반려
      isRejectFinish: false, // 반려 완료
      isAuthorityRequest: false, // 운영권한 신청
      isBrandAuthorityInvite: false, // 브랜드 운영 권한 초대 모달
      isNewMemberInvite: false, // 브랜드 초대 메일 보내기 모달
      isBrandAuthority: false, // 브랜드 운영 권한 신청 팝업
      test: ''
    }
  },
  created() {
    this.corpId = this.$router.currentRoute.params.corpId
  },
  computed: {
    ...mapGetters({
      corpAdmYn: 'corpAdmYn',
      userType: 'userType'
    }),
    store() {
      return store
    },
    authority() {
      if (this.$store.getters.corpAdmYn === 'Y' && this.$store.getters.userType === 'CORP') {
        return '마스터'
      } else if (this.$store.getters.corpAdmYn === 'N' && this.$store.getters.userType === 'CORP') {
        return '매니저'
      } else {
        return '대행사'
      }
    },
    // 마스터 승격 가이드 노출 여부
    isShowMasterGuide () {
      return !(this.corpInfo.status === 'ACTIVE' && this.corpInfo.aprvRet === 'OK') && this.userType === 'CORP' && this.corpAdmYn === 'N'
    },
    // 서비스 가이드 노출 여부
    isShowServiceGuide () {
      return !this.isShowFavoriteGuide && !this.isShowBrandInviteGuide && !this.isShowMasterGuide
    }
  },
  mounted() {
    this.getAuthReqBrandList()
  },
  methods: {
    safetyMarkCompany () {
      return true
    },
    getAuthReqBrandList () {
      this.authReqBrandsearchParam.corpId = this.corpId
      getAuthReqbrandList(this.authReqBrandsearchParam).then(res => {
        if (res.code === '20000000') {
          this.originAuthReqBrandData = res.result.authReqBrandList
          this.authReqBrandData = this.originAuthReqBrandData.filter((item, index) => {
            return index < 3
          })
        }
      }).catch(e => {
        this.$alertMsg(e.desc)
      })
    },
    toggleMore () {
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        this.authReqBrandData = this.originAuthReqBrandData.filter((item, index) => {
          return index < 3
        })
      } else {
        this.authReqBrandData = this.originAuthReqBrandData
      }
    },
    labelStatus(status) {
      if (status === 'done') {
        return 'done'
      }
      if (status === 'reject') {
        return 'reject'
      }
    },
    onSubmit (item) {
      let rejectData = {
        brandId: item.brandId,
        mgrUserId: item.mgrUserId,
        aprvYn: 'Y'
      }
      this.$confirm('승인 하시겠습니까').then(() => {
        operationAuthorityApproval(rejectData).then(() => {
          this.$alertMsg('운영권한 신청을 승인하였습니다.').then(() => {
            this.getAuthReqBrandList()
          })
        }).catch(e => {
          this.$alertMsg(e.desc)
        })
      })
    },
    reject(reloadFlag, brandId, brandNm, userNm, mgrUserId) {
      if (reloadFlag) {
        // 브랜드 운영권한 승인 요청 내역 API 호출
        this.getAuthReqBrandList()
      } else {
        this.rejectInfo = {
          brandId: brandId,
          brandNm: brandNm,
          userNm: userNm,
          mgrUserId: mgrUserId
        }
        this.isModalViewed = true
        this.isModalReject = true
      }
    },
    safetyDesModal() {
      this.isModalViewed = true
      this.isModalSafetyDes = true
    },
    // 브랜드 운영 권한 초대 팝업
    newMemberInviteModal () {
      this.isModalViewed = true
      this.isNewMemberInvite = true
      this.isBrandAuthorityInvite = false
    },
    // 마스터 매니저 초대 버튼
    brandInvite () {
      this.isModalViewed = true
      this.isBrandAuthorityInvite = true
      this.isNewMemberInvite = false
    },
    // 브랜드 운영권한 신청 팝업
    openBrandAuthority() {
      this.isModalViewed = true
      this.isBrandAuthority = true
    }
  }
}
</script>

<style>

</style>
