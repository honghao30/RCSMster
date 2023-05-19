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
              <img src="@/assets/images/icon/icon_company_person.png" alt="">
              <p>
              함께 브랜드를 운영할<br/>
              <span>마스터와 매니저를</span>
              초대하세요
            </p>
            </div>
            <div class="button__wrap">
              <ButtonCmp
                type="btn-blue"
                @click="brandInvite"
              >마스터 / 매니저 초대</ButtonCmp>
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
          <PageTitleH3 titleh3="권한관리" />
          <!-- 테이블 상단 컨트롤 영역 공통 -->
          <div class="top-ctrl-area">
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
          </div>
          <div class="table__wrap manage-table">
            <table class="table table-list">
              <colgroup>
                <col>
                <col>
                <col>
                <col>
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
                  <td>
                    <div class="button__wrap" v-if="item.manage">
                      <ButtonCmp
                        type="btn-line small"
                      >삭제</ButtonCmp>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- 운영권한 승인 신청 내역 -->
        <PageTitleH3 titleh3="운영권한 승인 신청 내역" />
        <!-- 테이블 상단 컨트롤 영역 공통 -->
        <div class="top-ctrl-area">
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
        </div>
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
                    <div class="button__wrap">
                      <ButtonCmp
                        type="btn-line small"
                      >반려</ButtonCmp>
                      <ButtonCmp
                        type="btn-blue small"
                      >승인</ButtonCmp>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
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
    </ModalView>
  </div>
</template>

<script>

import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import ModalView from '@/components/common/ModalView.vue'
import BrandInvite from '@/views/brand/create/components/BrandInvite.vue'
import BrandAuthority from '@/views/brand/create/components/BrandAuthority.vue'

export default {
  components: {
    PageTitle,
    ButtonCmp,
    PageTitleH3,
    BrandLnb,
    Dropdown,
    ModalView,
    BrandInvite,
    BrandAuthority
  },
  data() {
    return {
      isModalViewed: false,
      inviteCont: false,
      authorityCont: false,
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
          manage: false
        },
        {
          type: '매니저',
          service: '',
          user: '최라라(Fghij123)',
          mail: 'Fghij123@studio.com',
          phone: '010-5151-5151',
          manage: true
        },
        {
          type: '마스터',
          service: '',
          user: '오동동(KLMN00)',
          mail: 'KLMN00@studio.com',
          phone: '010-9876-5432',
          manage: false
        },
        {
          type: '대행사',
          service: '더피프티원',
          user: '이봉봉(T5ONE)',
          mail: 'T5ONE@naver.com',
          phone: '010-1234-5678',
          manage: true
        },
        {
          type: '대행사',
          service: '네이버',
          user: '이봉봉(T5ONE)',
          mail: 'T5ONE@naver.com',
          phone: '010-1234-5678',
          manage: true
        },
        {
          type: '대행사',
          service: '더피프티원',
          user: '이봉봉(T5ONE)',
          mail: 'T5ONE@naver.com',
          phone: '010-1234-5678',
          manage: true
        },
        {
          type: '대행사',
          service: '더피프티원',
          user: '이봉봉(T5ONE)',
          mail: 'T5ONE@naver.com',
          phone: '010-1234-5678',
          manage: true
        },
        {
          type: '마스터',
          service: '',
          user: '오동동(KLMN00)',
          mail: 'KLMN00@studio.com',
          phone: '010-9876-5432',
          manage: false
        },
        {
          type: '마스터',
          service: '',
          user: '오동동(KLMN00)',
          mail: 'KLMN00@studio.com',
          phone: '010-9876-5432',
          manage: false
        },
        {
          type: '마스터',
          service: '',
          user: '오동동(KLMN00)',
          mail: 'KLMN00@studio.com',
          phone: '010-9876-5432',
          manage: false
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
    },
    brandAuthority() {
      this.isModalViewed = true
      this.authorityCont = true
      this.inviteCont = false
    }
  }
}
</script>
