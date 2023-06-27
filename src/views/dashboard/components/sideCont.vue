<template>
  <div class="dashBoard-side">
    <!-- 기업정보 -->
    <div class="side-box side-box__info">
      <div class="side-box__info-top">
        <div class="side-box-top">
          <h4>더피프티원</h4>
          <span class="authority master">마스터</span>
          <span class="authority manager">매니저</span>
          <span class="authority agency">대행사</span>
        </div>
        <div class="side-box-middle">
          <span class="id">CO.K0803h0r0O</span>
          <span class="date">2023.03.09</span>
        </div>
      </div>
      <!-- 안심마크 사용 기업 -->
      <div class="side-box-cont" v-if="safetyMarkCompany">
        <p>RCS 메시지 상단에
          “<a
            role="button"
            class="safetymark"
            @click="safetyDesModal"
          >안심마크</a>(<span>확인된 발신번호</span>)”를 표시하여 사칭 문자로 인한 스미싱 범죄 등에 안전함을 안내할 수 있습니다.</p>
      </div>
      <!-- // 안심마크 사용 기업 -->
    </div>
    <!-- // 기업정보 -->
    <!-- 전체 브랜드 운영 관리 -->
    <div class="side-btn">
      <!-- 230616 [a태그 + router-link태그] →  [router-link태그] 수정 -->
      <router-link to="" class="btn btn-blue-line">전체 브랜드 운영 관리</router-link>
    </div>
    <!-- // 전체 브랜드 운영 관리 -->
    <!-- 운영권한 관리 및 신청 내역 -->
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
          <div class="button__wrap">
            <ButtonCmp
              type="btn-line"
              size="small"
              @click="rejectModal"
            >반려</ButtonCmp>
            <ButtonCmp
              type="btn-blue-line"
              size="small"
            >승인</ButtonCmp>
          </div>
        </div>
        <div class="authority-list-none">
          <p>운영권한 승인 신청 내역이 없습니다.</p>
        </div>
        <div class="authority-list-more">
          <a role="button" :class="{open: isOpen}" @click="toggleMore">더보기</a>
        </div>
      </div>
    </div>
    <!-- 사용 가이드 -->
    <!-- 1. 멤버 초대하기 -->
    <div class="side-box side-box__invite">
      <div class="side-box-top">
        <h4>멤버 초대하기</h4>
      </div>
      <div class="side-box-cont">
        <p>함께 관리하고 운영하는 멤버를 초대하세요.</p>
        <p>아직 가입하지 않는 멤버도 초대할 수 있어요.</p>
      </div>
      <div class="button__wrap side-box-bottom">
        <ButtonCmp
          type="btn-blue-line"
          size="medium"
          @click="MemberInvite"
        >
        브랜드 운영권한 초대
        </ButtonCmp>
      </div>
    </div>
    <!-- // 1. 멤버 초대하기 -->
    <!-- 2. 서비스 이용 가이드 -->
    <div class="side-box side-box__invite">
      <div class="side-box-top">
        <h4>서비스 이용 가이드</h4>
      </div>
      <div class="side-box-cont">
        <p>RCS를 쉽고 편리하게 관리 할 수 있도록 이용 가이드를 확인하세요.</p>
      </div>
      <div class="button__wrap side-box-bottom">
        <router-link to="" class="btn btn-blue-line medium">브랜드 개설</router-link>
      </div>
    </div>
    <!-- // 2. 서비스 이용 가이드 -->
    <!-- 3. 브랜드 즐겨찾기 -->
    <div class="side-box side-box__invite">
      <div class="side-box-top">
        <h4>브랜드 즐겨찾기</h4>
      </div>
      <div class="side-box-cont">
        <p class="star_des">운영중인 브랜드를 즐겨찾기<span class="star"></span>설정하면</p>
        <p>간편하게 자주 사용하는 브랜드에 접속할 수 있어요.</p>
      </div>
    </div>
    <!-- // 3. 브랜드 즐겨찾기 -->
    <!-- 4. 마스터 계정 설정(기업 회원) -->
    <div class="side-box side-box__invite">
      <div class="side-box-top">
        <h4>마스터 계정 설정</h4>
        <p>승인이 완료되면 모든 기능을 사용할 수 있어요.</p>
      </div>
      <div class="side-box-cont">
        <ul class="invite__step">
          <li>
            <strong>1</strong>
            <router-link to="" class="step-more submit-more">사업자등록증 제출</router-link>
          </li>
          <li>
            <strong>2</strong>
            <a>마스터 승격 완료</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- 4. 마스터 계정 설정(기업 회원) -->
    <!-- // 사용 가이드 -->
    <!-- 가변 배너 -->
    <div class="side-box side-box__banner">
      <div class="side-box-top">
        <h3>챗봇 대행사<br/>필요하지 않으세요?</h3>
        <a class="side-company-btn"><router-link to="">대행사 보러가기</router-link></a>
      </div>
    </div>
    <!-- 모달 -->
    <!-- 안심마크 -->
    <ModalView
      v-if="isModalViewed"
      @closeModal="isModalViewed = false"
    >
      <ConfirmMsg
        @closeModal="isModalViewed = false, isModalSafetyDes = false"
        v-if="isModalSafetyDes"
        modalsize="dashboard_modal"
      >
        <div class="msg" slot="msg">
          <h3>안심마크 서비스란 무엇인가요?</h3>
          <img src="@/assets/images/modal/dashboard_safetymark.png" alt="">
          <div class="safetymark_des">
            <p>안심마크 서비스는, 불법 메시지로 인해 피해가 많이 발생하는 금융 / 공공기관 등을 대상으로 “실제 해당 기업에서 메시지를 보냈음”을 시각적으로 확인할 수 있도록 돕는 서비스입니다.</p>
            <br>
            <p>실제 해당번호를 소유한 기업이 보내는 RCS 메시지에만 “확인된 발신번호”라는 안심마크 붙게 되어, 발신변작을 통한 스팸/스미싱 등의 불법 메시지와 쉽게 구분할 수 있습니다.</p>
            <br>
            <p>해당 서비스는 KISA(한국인터넷진흥원)에서 인증한 브랜드만 이용 가능하며, 기업에서는 대화방 단위로 안심마크의 표시 여부를 설정할 수 있습니다</p>
          </div>
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
    </ModalView>
    <!-- // 안심마크 -->
    <!-- 운영권한 신청 반려 버튼 클릭 시 -->
    <ModalView
      v-if="isModalViewed"
      @closeModal="isModalViewed = false"
    >
      <ConfirmMsg
        @closeModal="isModalViewed = false, isModalReject = false"
        v-if="isModalReject"
        modalsize="dashboard_modal"
      >
        <div class="msg" slot="msg">
          <h3>브랜드 운영권한 신청 반려</h3>
          <div class="reject_applicant">
            <h5>SYSTEM STUDIO</h5>
            <p>신청자 : <span>김솔솔(solsol51)</span></p>
          </div>
          <div class="input-item input-limit">
            <div class="textarea">
              <textarea maxlength="100" placeholder="반려 사유를 입력해주세요." v-model="form.textarea"></textarea>
              <div class="textarea-limit__text">
                <p>
                  {{ form.textarea.length }}/100자
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="button__wrap" slot="button">
          <ButtonCmp
            type="btn-line"
            @click="closeMsg"
          >
            닫기
          </ButtonCmp>
          <ButtonCmp
            type="btn-blue"
            :disabled="form.textarea.length === 0"
            @click="rejectFinish"
          >
            반려
          </ButtonCmp>
        </div>
      </ConfirmMsg>
    </ModalView>
    <!-- // 운영권한 신청 반려 버튼 클릭 시 -->
    <!-- 운영권한 신청 반려 버튼 클릭 시 > 반려 버튼 -->
    <ModalView
      v-if="isModalViewed"
      @closeModal="isModalViewed = false"
    >
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
    </ModalView>
    <!-- // 운영권한 신청 반려 버튼 클릭 시 > 반려 버튼 -->
    <!-- 사용 가이드 > 멤버 초대하기 > 브랜드 운영권한 초대 버튼 클릭 시 -->
    <ModalView
      v-if="isModalViewed"
      @closeModal="isModalViewed = false"
    >
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
            취소
          </ButtonCmp>
          <ButtonCmp
            type="btn-blue"
            @click="closeMsg"
          >
            초대
          </ButtonCmp>
        </div>
      </ConfirmMsg>
    </ModalView>
    <!-- // 사용 가이드 > 멤버 초대하기 > 브랜드 운영권한 초대 버튼 클릭 시 -->
    <!-- // 모달 -->
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/dashboard/components/ConfirmMsg.vue'

export default {
  components: {
    ButtonCmp,
    ModalView,
    ConfirmMsg
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
      form: {
        textarea: ''
      }
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
    safetyDesModal () {
      this.isModalViewed = true
      this.isModalSafetyDes = true
      this.isModalReject = false
      this.isRejectFinish = false
      this.isMemberInvite = false
    },
    rejectModal () {
      this.isModalViewed = true
      this.isModalReject = true
      this.isModalSafetyDes = false
      this.isRejectFinish = false
      this.isMemberInvite = false
    },
    rejectFinish () {
      this.isModalViewed = true
      this.isRejectFinish = true
      this.isModalReject = false
      this.isModalSafetyDes = false
      this.isMemberInvite = false
    },
    MemberInvite () {
      this.isModalViewed = true
      this.isMemberInvite = true
      this.isRejectFinish = false
      this.isModalReject = false
      this.isModalSafetyDes = false
    }
  }
}
</script>

<style>

</style>
