<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="브랜드 운영 관리" />
        <!-- 초대 및 권한 부여 박스 -->
        <div class="case-box">
          <div class="case-box__type">
            <div class="case-box__type-txt">
              <img src="@/assets/images/icon/icon_company_operator.png" alt="">  <!--기획서 v1.0 수정 (이미지 파일 수정) -->
              <p>
              함께 브랜드를 운영할<br/>
              <span>운영자를</span>
              초대하세요
            </p>
            </div>
            <div class="button__wrap">
              <ButtonCmp
                type="btn-blue"
                @click="brandInvite"
              >운영자 초대</ButtonCmp> <!--기획서 v1.0 수정: 텍스트 수정 -->
            </div>
          </div>
          <div class="case-box__type">
            <div class="case-box__type-txt">
              <img src="@/assets/images/icon/icon_operating authority.png" alt="">
              <p>
                효율적 운영을위해 대행사에게<br/>
                <span>운영권한을</span> 주세요
            </p>
            </div>
            <div class="button__wrap">
              <ButtonCmp
                type="btn-blue"
                @click="brandAuthority"
              >대행사 운영권한 부여</ButtonCmp>
            </div>
          </div>
        </div>
        <!-- 권한 관리 -->
        <div class="authority">
          <PageTitleH3 titleh3="운영권한 관리" /> <!-- 기획서 v1.0 수정: 텍스트 수정 -->
          <!-- 테이블 상단 컨트롤 영역 공통 -->
          <!-- <div class="top-ctrl-area">
            <div class="left-area">
              <Dropdown :options="dropdownOptions" placeholder="10개씩">
              </Dropdown>
            </div>
            <div class="right-area">
              <div class="pager">
                <span class="num">1/3</span>
                <a role="button" class="btn-prev" ><span class="blind">이전으로</span></a>
                <a role="button" class="btn-next" ><span class="blind">다음으로</span></a>
              </div>
            </div>
          </div> 기획서 v1.0 수정: 아래 paging 으로 대체 -->
          <div class="table__wrap manage-table">
            <table class="table table-list">
              <colgroup>
                <col width="92px"> <!-- 기획서 v1.0 수정 (width값 추가) -->
                <col width="232px"> <!-- 기획서 v1.0 수정 (width값 추가) -->
                <col width="648px"> <!-- 기획서 v1.0 수정 (width값 추가) -->
                <col width="152px"> <!-- 기획서 v1.0 수정 (width값 추가) -->
              </colgroup>
              <thead>
                <tr>
                  <th scope="col"><span>유형</span></th>
                  <th scope="col"><span>대행사명(제공서비스)</span></th>
                  <th scope="col"><span>사용자</span></th>
                  <th scope="col"><span>관리</span></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, i) in authorityData" :key="i">
                  <td>{{ item.type }}</td>
                  <td>{{ item.service }}</td>
                  <td class="info-right">
                    <span class="user">{{ item.user }}</span>
                    <span>{{ item.mail }}</span>
                    <span>/</span>
                    <span>{{ item.phone }}</span>
                  </td>
                  <td class="right-box"> <!-- 기획서 v1.0 수정 (right-box 클래스 추가) -->
                    <div class="button__wrap" v-if="item.manage">
                      <ButtonCmp
                        v-if="item.manage === 'delete'"
                        type="btn-line small"
                      >삭제</ButtonCmp>
                      <ButtonCmp
                        v-if="item.manage === 'mandate'"
                        type="btn-line small"
                        @click="BrandAuthorityMandate"
                      >권한 위임</ButtonCmp>
                      <!--기획서 v1.0 수정: 권한 위임 버튼 추가 -->
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <PagingCmp />  <!-- 기획서 v1.0 수정: paging 추가 -->
        </div>
        <!-- 운영권한 승인 신청 내역 -->
        <PageTitleH3 titleh3="운영권한 승인 신청 내역" />
        <!-- 테이블 상단 컨트롤 영역 공통 -->
        <!-- <div class="top-ctrl-area">
          <div class="left-area">
            <Dropdown :options="dropdownOptions" placeholder="10개씩">
            </Dropdown>
          </div>
          <div class="right-area">
            <div class="pager">
              <span class="num">1/3</span>
              <a role="button" class="btn-prev" ><span class="blind">이전으로</span></a>
              <a role="button" class="btn-next" ><span class="blind">다음으로</span></a>
            </div>
          </div>
        </div> 기획서 v1.0 수정: 아래 paging 으로 대체 -->
        <div class="table__wrap manage-table">
          <table class="table table-list">
            <colgroup>
              <col width="70%">
              <col width="10%">
              <col width="20%">
            </colgroup>
            <thead>
              <tr>
                <th scope="col" colspan="2"><span>신청자</span></th>
                <th scope="col"><span>관리</span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in applicationData" :key="i">
                <td class="info-right">
                  <span class="user">{{ item.user }}</span>
                  <span>{{ item.phone }}</span>
                  <span>/</span>
                  <span>{{ item.mail }}</span>
                </td>
                <td class="application-date">
                  <span>{{ item.date }}</span>
                </td>
                <td>
                  <!-- 기획서 v1.0 수정(type 변경) -->
                  <div class="button__wrap">
                    <ButtonCmp
                      type="btn-line small"
                    >반려</ButtonCmp> <!-- 기획서 v1.0 수정 (운영권한 신청 반려 팝업 출력 시 모달창 BrandAuthorityReject 필요하여 아래에 추가만 함, script 추가 안함)  -->
                    <ButtonCmp
                      type="btn-blue-line small"
                    >승인</ButtonCmp>
                  </div>
                  <!-- // 기획서 v1.0 수정(type 변경) -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <PagingCmp /> <!-- 기획서 v1.0 수정: paging 추가 -->
      </div>
    </div>
    <!-- 모달영역 -->
    <ModalView
    v-if="isModalViewed"
    @closeModal="isModalViewed = false"
    >
      <!-- 모달 영역 : 마스터 / 매니저 초대  -->
      <BrandInvite
        v-if="inviteCont"
        @closeModal="isModalViewed = false"
      >
      </BrandInvite>
      <!-- 모달 영역 : 대행사 운영권한 부여 모달 영역 -->
      <BrandAuthority
        v-else-if="authorityCont"
        @closeModal="isModalViewed = false"
      >
      </BrandAuthority>
      <!-- 기획서 v1.0 수정: 브랜드 오너 권한위임 팝업 추가  -->
      <!-- 모달 영역 : 브랜드 오너 권함위임 모달 영역 -->
      <BrandAuthorityMandate
        v-else-if="authorityMandate"
        @closeModal="isModalViewed = false"
      >
      </BrandAuthorityMandate>
      <!-- 기획서 v1.0 수정 (운영권한 신청 반려 팝업 출력 시 모달창 BrandAuthorityReject 필요하여 dashboardOperationManage에서 가져왔음, script 추가 안함)  -->
      <BrandAuthorityReject
        modalsize="dashboard_modal"
        @closeModal="isModalViewed = false"
      >
      </BrandAuthorityReject>
      <!-- 운영권한 신청 반려 버튼 클릭 시 > 반려 버튼 -->
      <ConfirmMsg
        modalsize="dashboard_small_modal"
        @closeModal="isModalViewed = false"
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
      <!-- // 운영권한 신청 반려 버튼 클릭 시 > 반려 버튼 -->
      <!-- // 기획서 v1.0 수정 (운영권한 신청 반려 팝업 출력 시 모달창 BrandAuthorityReject 필요하여 dashboardOperationManage에서 가져왔음, script 추가 안함)  -->
    </ModalView>
  </div>
</template>

<script>

import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import PagingCmp from '@/components/common/PagingCmp.vue'
import ModalView from '@/components/common/ModalView.vue'
import BrandInvite from '@/views/brand/create/components/BrandInvite.vue'
import BrandAuthority from '@/views/brand/create/components/BrandAuthority.vue'
import BrandAuthorityMandate from '@/views/brand/create/components/BrandAuthorityMandate.vue'
import BrandAuthorityReject from '@/views/dashboard/components/BrandAuthorityReject.vue' // 기획서 v1.0 수정(BrandAuthorityReject 추가)
import ConfirmMsg from '@/views/dashboard/components/ConfirmMsg.vue' // 기획서 v1.0 수정(ConfirmMsg 추가)

export default {
  components: {
    PageTitle,
    ButtonCmp,
    PageTitleH3,
    BrandLnb,
    Dropdown,
    PagingCmp,
    ModalView,
    BrandInvite,
    BrandAuthority,
    BrandAuthorityMandate,
    BrandAuthorityReject, // 기획서 v1.0 수정(BrandAuthorityReject 추가)
    ConfirmMsg // 기획서 v1.0 수정(ConfirmMsg 추가)
  },
  data() {
    return {
      isModalViewed: false,
      inviteCont: false,
      authorityCont: false,
      authorityMandate: false,
      dropdownOptions: [
        {
          label: '10개씩',
          value: '10'
        },
        {
          label: '20개씩',
          value: '20'
        },
        {
          label: '30개씩',
          value: '30'
        }
      ],
      authorityData: [
        {
          type: '마스터',
          service: '',
          user: '김미미(abcde)',
          mail: 'abcde@studio.com',
          phone: '010-1234-5678',
          manage: 'delete'
        },
        {
          type: '매니저',
          service: '',
          user: '최라라(Fghij123)',
          mail: 'Fghij123@studio.com',
          phone: '010-5151-5151',
          manage: 'mandate'
        },
        {
          type: '마스터',
          service: '',
          user: '오동동(KLMN00)',
          mail: 'KLMN00@studio.com',
          phone: '010-9876-5432',
          manage: ''
        },
        {
          type: '대행사',
          service: '더피프티원',
          user: '이봉봉(T5ONE)',
          mail: 'T5ONE@naver.com',
          phone: '010-1234-5678',
          manage: 'delete'
        },
        {
          type: '대행사',
          service: '네이버',
          user: '이봉봉(T5ONE)',
          mail: 'T5ONE@naver.com',
          phone: '010-1234-5678',
          manage: 'mandate'
        },
        {
          type: '대행사',
          service: '더피프티원',
          user: '이봉봉(T5ONE)',
          mail: 'T5ONE@naver.com',
          phone: '010-1234-5678',
          manage: 'delete'
        },
        {
          type: '대행사',
          service: '더피프티원',
          user: '이봉봉(T5ONE)',
          mail: 'T5ONE@naver.com',
          phone: '010-1234-5678',
          manage: 'delete'
        },
        {
          type: '마스터',
          service: '',
          user: '오동동(KLMN00)',
          mail: 'KLMN00@studio.com',
          phone: '010-9876-5432',
          manage: 'delete'
        },
        {
          type: '마스터',
          service: '',
          user: '오동동(KLMN00)',
          mail: 'KLMN00@studio.com',
          phone: '010-9876-5432',
          manage: ''
        },
        {
          type: '마스터',
          service: '',
          user: '오동동(KLMN00)',
          mail: 'KLMN00@studio.com',
          phone: '010-9876-5432',
          manage: ''
        }
      ],
      applicationData: [
        {
          user: '김솔솔(solsol51)',
          phone: '010-1234-5678',
          mail: 'abcde@studio.com',
          date: '2023.04.18'
        },
        {
          user: '오동동(KLMN00)',
          phone: '010-1234-5678',
          mail: 'dong@studios.com',
          date: '2023.04.18'
        },
        {
          user: '김미미(abcde)',
          phone: '010-1234-5678',
          mail: 'abcde@studio.com',
          date: '2023.04.18'
        },
        {
          user: '김미미(abcde)',
          phone: '010-1234-5678',
          mail: 'abcde@studio.com',
          date: '2023.04.18'
        },
        {
          user: '김미미(abcde)',
          phone: '010-1234-5678',
          mail: 'abcde@studio.com',
          date: '2023.04.18'
        }
      ]
    }
  },
  watch: {
  },
  computed: {
  },
  methods: {
    closeModal () {
      this.isModalViewed = false
    },
    brandInvite() {
      this.isModalViewed = true
      this.inviteCont = true
      this.authorityCont = false
      this.authorityMandate = false
    },
    brandAuthority() {
      this.isModalViewed = true
      this.authorityCont = true
      this.inviteCont = false
      this.authorityMandate = false
    },
    BrandAuthorityMandate() {
      this.isModalViewed = true
      this.authorityMandate = true
      this.inviteCont = false
      this.authorityCont = false
    }
  }
}
</script>
