<template>
  <!-- 전체 브랜드 운영관리는 마스터만 접근 가능 -->
  <div class="dashboard__wrap">
    <div class="dashboard__wrap--inner">
      <div class="dashBoard-main__content manage_cont">
        <!-- 마스터 / 매니저 초대 영역 -->
        <div class="case-box">
          <div class="case-box__type">
            <div class="case-box__type-txt">
              <img src="@/assets/images/icon/icon_company_operator.png" alt=""> <!-- 기획서 v1.0 수정 (이미지 수정) -->
              <p> <!-- 기획서 v1.0 수정 (문구 수정: 마스터 → 운영자) -->
                함께 브랜드를 운영할<br/>
                <span>운영자를</span>
                초대하세요.
              </p>
            </div>
            <!-- 마스터 / 매니저 초대 > 브랜드 운영권한 초대 팝업 출력 -->
            <ButtonCmp
              type="btn-blue"
              @click="brandInvite"
            >운영자 초대</ButtonCmp> <!-- 기획서 v1.0 수정 (문구 수정: 마스터 → 운영자) -->
          </div>
        </div>
        <!-- // 마스터 / 매니저 초대 영역 -->
        <!-- 운영권한 관리 영역 -->
        <div class="board-main__box--roun-type">
          <PageTitleH3 titleh3="운영권한 관리" />
          <div class="top-ctrl-area">
            <div class="left-area">
              <Dropdown searchable :options="dropdownOperationManageBrand" placeholder="브랜드명">
              </Dropdown>
            </div>
          </div>
          <div class="table__wrap">
            <table class="table table-list">
              <thead>
                <tr>
                  <th scope="col" width="32%"><span>브랜드 명</span></th>
                  <th scope="col" width="12%"><span>유형</span></th>
                  <th scope="col" width="12%"><span>대행사 명(제공서비스)</span></th>
                  <th scope="col" width="32%"><span>사용자</span></th>
                  <th scope="col" width="12%"><span>관리</span></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,i) in operationManageBrandData" :key="i">
                  <td>
                    <div class="brandname mybrandname">
                      <div class="brand">
                        <div class="brand__logo">
                          <img :src="item.brandLogo" alt="">
                        </div>
                        <span class="brand__title link"><router-link to="">{{ item.title }}</router-link></span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span class="data-type">{{ item.type }}</span>
                  </td>
                  <td class="l-align">
                    <span class="data-service">{{ item.service }}</span>
                  </td>
                  <td class="l-align">
                    <div class="data-user">
                      <div class="data-user-name">{{ item.userName }}</div>
                      <div class="data-user-info">
                        <span>{{ item.userMail }}</span>
                        <span>&nbsp;/&nbsp;</span>
                        <span>{{ item.userPhone }}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <!-- 유형: 매니저 + 삭제버튼 > 매니저 삭제 확인 Alert 출력 -->
                    <ButtonCmp
                      v-if="item.manage && item.type === '매니저'"
                      type="btn-line"
                      size="small"
                      @click="managerRemove"
                    >
                    삭제
                    </ButtonCmp>
                    <!-- // 유형: 매니저 + 삭제버튼 > 매니저 삭제 확인 Alert 출력 -->
                    <!-- 유형: 대행사 + 삭제버튼 > 대행사 삭제 확인 Alert 출력 -->
                    <ButtonCmp
                      v-if="item.manage && item.type === '대행사'"
                      type="btn-line"
                      size="small"
                      @click="agencyRemove"
                    >
                    삭제
                    </ButtonCmp>
                    <!-- 유형: 대행사 + 삭제버튼 > 대행사 삭제 확인 Alert 출력 -->
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <PagingCmp />
        </div>
        <!-- // 운영권한 관리 영역 -->
        <!-- 운영권한 승인 신청 내역 -->
        <div class="board-main__box--roun-type">
          <PageTitleH3 titleh3="운영권한 승인 신청 내역" />
          <div class="top-ctrl-area">
            <div class="left-area">
              <Dropdown searchable :options="dropdownRequsetManageBrand" placeholder="브랜드명">
              </Dropdown>
            </div>
          </div>
          <div class="table__wrap">
            <table class="table table-list">
              <thead>
                <tr>
                  <th scope="col" width="32%"><span>브랜드 명</span></th>
                  <th scope="col" width="32%"><span>신청자</span></th>
                  <th scope="col" width="12%"><span>신청일</span></th>
                  <th scope="col" width="12%"><span>관리</span></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,i) in RequsetManageBrandData" :key="i">
                  <td>
                    <div class="brandname mybrandname">
                      <div class="brand">
                        <div class="brand__logo">
                          <img :src="item.brandLogo" alt="">
                        </div>
                        <span class="brand__title link"><router-link to="">{{ item.title }}</router-link></span>
                      </div>
                    </div>
                  </td>
                  <td class="l-align">
                    <div class="data-user">
                      <div class="data-user-name">{{ item.userName }}</div>
                      <div class="data-user-info">
                        <span>{{ item.userMail }}</span>
                        <span>&nbsp;/&nbsp;</span>
                        <span>{{ item.userPhone }}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span class="data-service">{{ item.date }}</span>
                  </td>
                  <td>
                    <div class="data-btn">
                      <!-- 반려 버튼 > 운영권한 신청 반려 팝업 출력 -->
                      <ButtonCmp
                        type="btn-line"
                        size="small"
                        @click="rejectModal"
                      >
                      반려
                      </ButtonCmp>
                      <!-- 승인 버튼 > 운영권한 승인 신청 내역 내 숨김 처리 -->
                      <ButtonCmp
                        type="btn-blue-line"
                        size="small"
                      >
                      승인
                      </ButtonCmp>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <PagingCmp />
        </div>
        <!-- // 운영권한 승인 신청 내역 -->
        <!-- 모달 -->
        <ModalView
          v-if="isModalViewed"
          @closeModal="isModalViewed = false"
        >
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
          <!-- 매니저 삭제 확인 Alert -->
          <ConfirmMsg
            @closeModal="isModalViewed = false, isManagerRemove = false"
            v-if="isManagerRemove"
            modalsize="dashboard_small_modal"
          >
          <div class="msg" slot="msg">
            <p>매니저를 삭제하시겠습니까?</p>
          </div>
          <div class="button__wrap" slot="button">
            <ButtonCmp
              type="btn-line"
              @click="closeMsg"
            >
              닫기
            </ButtonCmp>
            <!-- 삭제 버튼 > 권한 리스트에서 해당 매니저 즉시 삭제 -->
            <ButtonCmp
              type="btn-blue"
              @click="closeMsg"
            >
              삭제
            </ButtonCmp>
          </div>
          </ConfirmMsg>
          <!-- // 매니저 삭제 확인 Alert -->
          <!-- 대행사 삭제 확인 Alert -->
          <!-- 대행사 삭제 확인 Alert 유형 1 > 해당 대행사로 등록된 대화방이 있는 경우 대화방 삭제 안내 팝업 출력 -->
          <AgencyRemove
            @closeModal="isModalViewed = false, isAgencyChatRoomRemove = false"
            v-if="isAgencyChatRoomRemove"
            modalsize="dashboard_modal"
          >
          </AgencyRemove>
          <!-- // 대행사 삭제 확인 Alert 유형 1 > 해당 대행사로 등록된 대화방이 있는 경우 대화방 삭제 안내 팝업 출력 -->
          <!-- 대행사 삭제 확인 Alert 유형 2 > 해당 대행사로 등록된 대화방이 없는 경우 삭제 확인 Alert  출력 -->
          <ConfirmMsg
            @closeModal="isModalViewed = false, isAgencyRemove = false"
            v-if="isAgencyRemove"
            modalsize="dashboard_small_modal"
          >
          <div class="msg" slot="msg">
            <p>대행사를 삭제하시겠습니까?</p>
          </div>
          <div class="button__wrap" slot="button">
            <!-- 화면 구현을 위해 닫기 버튼 > 대행사 삭제 확인 Alert 유형 1 나오도록함 -->
            <ButtonCmp
              type="btn-line"
              @click="agencyChatRoomRemove"
            >
              닫기
            </ButtonCmp>
            <!-- 삭제 버튼 > 권한 리스트에서 해당 대행사 즉시 삭제 -->
            <ButtonCmp
              type="btn-blue"
              @click="closeMsg"
            >
              삭제
            </ButtonCmp>
          </div>
          </ConfirmMsg>
          <!-- // 대행사 삭제 확인 Alert 유형 2 > 해당 대행사로 등록된 대화방이 없는 경우 삭제 확인 Alert  출력 -->
          <!-- // 대행사 삭제 확인 Alert -->
          <!-- 운영권한 신청 반려 버튼 클릭 시 -->
          <BrandAuthorityReject
            @closeModal="isModalViewed = false, isModalReject = false"
            @rejectFinish="rejectFinishModal"
            v-if="isModalReject"
            modalsize="dashboard_modal"
          >
          </BrandAuthorityReject>
          <!-- // 운영권한 신청 반려 버튼 클릭 시 -->
          <!-- 운영권한 신청 반려 버튼 클릭 시 > 반려 버튼 -->
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
          <!-- // 운영권한 신청 반려 버튼 클릭 시 > 반려 버튼 -->
        </ModalView>
        <!-- // 모달-->
      </div>
    </div>
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import PagingCmp from '@/components/common/PagingCmp.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/dashboard/components/ConfirmMsg.vue'
import AgencyRemove from '@/views/dashboard/components/AgencyRemove.vue'
import BrandAuthorityReject from '@/views/dashboard/components/BrandAuthorityReject.vue'
import BrandAuthorityInvite from '@/views/dashboard/components/BrandAuthorityInvite.vue'
import BrandAuthorityNewInvite from '@/views/dashboard/components/BrandAuthorityNewInvite.vue'

export default {
  components: {
    ButtonCmp,
    Dropdown,
    PagingCmp,
    PageTitleH3,
    ModalView,
    ConfirmMsg,
    AgencyRemove,
    BrandAuthorityReject,
    BrandAuthorityInvite,
    BrandAuthorityNewInvite
  },
  data() {
    return {
      dropdownOperationManageBrand: [
        {
          label: '브랜드 명 1',
          value: '01'
        },
        {
          label: '브랜드 명 2',
          value: '02'
        },
        {
          label: '브랜드 명 3',
          value: '03'
        },
        {
          label: '브랜드 명 4',
          value: '04'
        }
      ],
      dropdownRequsetManageBrand: [
        {
          label: '브랜드 명 1',
          value: '01'
        },
        {
          label: '브랜드 명 2',
          value: '02'
        },
        {
          label: '브랜드 명 3',
          value: '03'
        },
        {
          label: '브랜드 명 4',
          value: '04'
        }
      ],
      operationManageBrandData: [
        {
          brandLogo: require('../../assets/images/dummy/brand_logo_1.png'),
          title: 'LANVIN COLLECTION',
          type: '매니저',
          service: '카카오 i 챗봇',
          userName: '김미미(abcde)',
          userMail: 'abcde@studio.com',
          userPhone: '010-1234-5678',
          manage: true
        },
        {
          brandLogo: require('../../assets/images/dummy/brand_logo_2.png'),
          title: '더캐시미어',
          type: '마스터',
          service: '비즈뿌리오',
          userName: '최라라(Fghij123)',
          userMail: 'Fghij123@studio.com',
          userPhone: '010-5151-5151',
          manage: false
        },
        {
          brandLogo: require('../../assets/images/dummy/brand_logo_3.png'),
          title: '타미힐피거',
          type: '대행사',
          service: '더피프티원',
          userName: '오동동(KLMN00)',
          userMail: 'KLMN00@studio.com',
          userPhone: '010-9876-5432',
          manage: true
        },
        {
          brandLogo: require('../../assets/images/dummy/brand_logo_3.png'),
          title: 'TOMMY JEANS',
          type: '매니저',
          service: '-',
          userName: '이봉봉(T5ONE)',
          userMail: 'T5ONE@naver.com',
          userPhone: '010-1234-5678',
          manage: true
        },
        {
          brandLogo: require('../../assets/images/dummy/brand_logo_4.png'),
          title: '클럽모나코​',
          type: '매니저',
          service: '카카오 i 챗봇',
          userName: '김솔솔(opQrsT)',
          userMail: 'opQrsT@studio.com',
          userPhone: '010-1010-0101',
          manage: true
        },
        {
          brandLogo: require('../../assets/images/dummy/brand_logo_1.png'),
          title: 'LANVIN COLLECTION',
          type: '매니저',
          service: '카카오 i 챗봇',
          userName: '김미미(abcde)',
          userMail: 'abcde@studio.com',
          userPhone: '010-1234-5678',
          manage: true
        },
        {
          brandLogo: require('../../assets/images/dummy/brand_logo_2.png'),
          title: '더캐시미어',
          type: '마스터',
          service: '비즈뿌리오',
          userName: '최라라(Fghij123)',
          userMail: 'Fghij123@studio.com',
          userPhone: '010-5151-5151',
          manage: false
        },
        {
          brandLogo: require('../../assets/images/dummy/brand_logo_3.png'),
          title: '타미힐피거',
          type: '대행사',
          service: '더피프티원',
          userName: '오동동(KLMN00)',
          userMail: 'KLMN00@studio.com',
          userPhone: '010-9876-5432',
          manage: true
        },
        {
          brandLogo: require('../../assets/images/dummy/brand_logo_3.png'),
          title: 'TOMMY JEANS',
          type: '매니저',
          service: '-',
          userName: '이봉봉(T5ONE)',
          userMail: 'T5ONE@naver.com',
          userPhone: '010-1234-5678',
          manage: true
        },
        {
          brandLogo: require('../../assets/images/dummy/brand_logo_4.png'),
          title: '클럽모나코​',
          type: '매니저',
          service: '카카오 i 챗봇',
          userName: '김솔솔(opQrsT)',
          userMail: 'opQrsT@studio.com',
          userPhone: '010-1010-0101',
          manage: true
        }
      ],
      RequsetManageBrandData: [
        {
          brandLogo: require('../../assets/images/dummy/brand_logo_1.png'),
          title: 'LANVIN COLLECTION',
          userName: '김미미(abcde)',
          userMail: 'abcde@studio.com',
          userPhone: '010-1234-5678',
          date: '2023.04.18'
        },
        {
          brandLogo: require('../../assets/images/dummy/brand_logo_2.png'),
          title: '더캐시미어',
          userName: '최라라(Fghij123)',
          userMail: 'Fghij123@studio.com',
          userPhone: '010-5151-5151',
          date: '2023.04.18'
        },
        {
          brandLogo: require('../../assets/images/dummy/brand_logo_3.png'),
          title: '타미힐피거',
          service: '더피프티원',
          userName: '오동동(KLMN00)',
          userMail: 'KLMN00@studio.com',
          userPhone: '010-9876-5432',
          date: '2023.04.18'
        },
        {
          brandLogo: require('../../assets/images/dummy/brand_logo_3.png'),
          title: 'TOMMY JEANS',
          userName: '이봉봉(T5ONE)',
          userMail: 'T5ONE@naver.com',
          userPhone: '010-1234-5678',
          date: '2023.04.18'
        },
        {
          brandLogo: require('../../assets/images/dummy/brand_logo_4.png'),
          title: '클럽모나코​',
          userName: '김솔솔(opQrsT)',
          userMail: 'opQrsT@studio.com',
          userPhone: '010-1010-0101',
          date: '2023.04.18'
        },
        {
          brandLogo: require('../../assets/images/dummy/brand_logo_1.png'),
          title: 'LANVIN COLLECTION',
          userName: '김미미(abcde)',
          userMail: 'abcde@studio.com',
          userPhone: '010-1234-5678',
          date: '2023.04.18'
        },
        {
          brandLogo: require('../../assets/images/dummy/brand_logo_2.png'),
          title: '더캐시미어',
          userName: '최라라(Fghij123)',
          userMail: 'Fghij123@studio.com',
          userPhone: '010-5151-5151',
          date: '2023.04.18'
        },
        {
          brandLogo: require('../../assets/images/dummy/brand_logo_3.png'),
          title: '타미힐피거',
          userName: '오동동(KLMN00)',
          userMail: 'KLMN00@studio.com',
          userPhone: '010-9876-5432',
          date: '2023.04.18'
        },
        {
          brandLogo: require('../../assets/images/dummy/brand_logo_3.png'),
          title: 'TOMMY JEANS',
          userName: '이봉봉(T5ONE)',
          userMail: 'T5ONE@naver.com',
          userPhone: '010-1234-5678',
          date: '2023.04.18'
        },
        {
          brandLogo: require('../../assets/images/dummy/brand_logo_4.png'),
          title: '클럽모나코​',
          userName: '김솔솔(opQrsT)',
          userMail: 'opQrsT@studio.com',
          userPhone: '010-1010-0101',
          date: '2023.04.18'
        }
      ],
      isModalViewed: false,
      isBrandAuthorityInvite: false,
      isNewMemberInvite: false,
      isManagerRemove: false,
      isAgencyRemove: false,
      isAgencyChatRoomRemove: false,
      isModalReject: false,
      isRejectFinish: false
    }
  },
  methods: {
    closeMsg () {
      this.isModalViewed = false
      this.isManagerRemove = false
      this.isAgencyRemove = false
      this.isAgencyChatRoomRemove = false
      this.isModalReject = false
      this.isRejectFinish = false
    },
    brandInvite () {
      this.isModalViewed = true
      this.isBrandAuthorityInvite = true
      this.isNewMemberInvite = false
    },
    newMemberInviteModal () {
      this.isModalViewed = true
      this.isNewMemberInvite = true
      this.isBrandAuthorityInvite = false
    },
    managerRemove () {
      this.isModalViewed = true
      this.isManagerRemove = true
    },
    agencyRemove () {
      this.isModalViewed = true
      this.isAgencyRemove = true
      this.isAgencyChatRoomRemove = false
    },
    agencyChatRoomRemove () {
      this.isModalViewed = true
      this.isAgencyChatRoomRemove = true
      this.isAgencyRemove = false
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
    }
  }
}
</script>

<style>

</style>
