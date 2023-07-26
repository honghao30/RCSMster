<template>
  <div class="dashboard__wrap election__wrap">
    <div class="dashboard__wrap--inner">
        <div class="dashBoard-main__content">
            <div class="election__box">
              <span class="flag-progress ing">시즌 종료 D-7</span>
              <strong>2024년 4월 10일 제 22대 국회의원선거</strong>
              <p>선거 운동 기간 : 2023년 10월 13일~ 2024년 5월 10일</p>
            </div>
            <!-- 가입한 브랜드가 없는 경우 -->
            <div class="board-main__box--roun-type brand-make">
              <PageTitleH3 titleh3="내 브랜드를 개설하세요." />
              <div class="board-main__description">
                고객과 RCS 메시지를 이용해 커뮤니케이션하려면 브랜드를 개설하셔야 합니다.<br>
                우선 통신서비스 가입증명원을 미리 준비해주세요.
              </div>
              <ol class="brand-opened__step-list">
                <li>
                  <div class="descripttion-top">STEP 1</div>
                  <div class="main-title">기본 정보 입력</div>
                  <div class="sub-text">
                    프로필 이미지, 브랜드 소개를 이용해 고객에게 브랜드 이미지를 전달할 수 있어요.
                    <div class="tips-layer">
                        <p class="active"><span>미리 준비하면 좋아요</span></p>
                        <p><span>통신서비스 가입증명원</span></p>
                    </div>
                  </div>
                </li>
                <li>
                  <div class="descripttion-top">STEP 2</div>
                  <div class="main-title">퀵 버튼 설정</div>
                  <div class="sub-text">
                    전화하기, 웹사이트 연결 등 고객이 쉽게 접근할 수 있는 퀵 버튼을 활용해 보세요.
                  </div>
                </li>
                <li>
                  <div class="descripttion-top">STEP 3</div>
                  <div class="main-title">브랜드 홈 탭 설정</div>
                  <div class="sub-text">
                    프로필 이미지, 브랜드 소개를 이용해 고객에게 브랜드 이미지를 전달할 수 있어요.
                  </div>
                </li>
              </ol>
            </div>
            <!-- //가입한 브랜드가 없는 경우 -->
            <!-- // 가입 상태 안내 메시지 -->
            <div class="board-main__box">
              <PageTitleH3 titleh3="내가 운영중인 브랜드" :totalCount="982" :DropData="BrandList" />
              <!-- 기획서 1.0 수정 -->
              <ul class="brand-list__wrap">
                <li  v-for="(item,i) in brandData" :key="i">
                  <div class="check-fava">
                    <div class="brandname">
                      <div class="brand">
                        <div class="brand__mark" role="bookmark">
                          <input type="checkbox" :id="`bookmark${i}`" :checked="item.mark" >
                          <label class="brand__mark__core" :for="`bookmark${i}`"></label>
                        </div>
                        <div class="brand__logo"></div>
                        <span class="brand__title"><router-link to="#">{{ item.title }}</router-link></span>
                        <span class="flag-progress"
                        v-if="item.status"
                        :class="{
                          'ing': ['승인요청', '미사용', '진행중'].includes(item.status),
                          'return': item.status === '반려',
                          'done': ['승인완료', '사용'].includes(item.status)
                        }"
                        >{{ item.status }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="brand-data__box">
                      <div class="brand-data">
                        <span class="data-chat underline" v-if="item.chatData >= 999">999+</span>
                        <span class="data-chat" v-else>{{ item.chatData }}</span>
                        <div class="data-name">대화방</div>
                      </div>
                      <div class="brand-data">
                        <span class="data-chat underline" v-if="item.message >= 999">999+</span>
                        <span class="data-chat" v-else>{{ item.message }}</span>
                        <div class="data-name">메시지</div>
                      </div>
                      <div class="brand-data">
                        <span class="data-chat underline">99</span>
                        <div class="data-name">대행사</div>
                      </div>
                  </div>
                </li>
              </ul>
              <!-- //기획서 1.0 수정 -->
              <PagingCmp />
              <!-- // 내가 운영중인 브랜드 -->
              <!-- 07.20 기업대시보드와 동일하게 수정 -->
              <div class="brand-banner__box">
                <div class="brand-banner__txt">
                  <h3>고객과 연결될 수 있는 RBC의 다양한 기능을 이용하세요.</h3>
                  <p>브랜드를 만들어 다양한 레이아웃과 컨텐츠를 생성, 기업과 고객 간 원활한 연결로 손쉽게 브랜드 정보를 공유합니다.</p>
                  <!-- 230616 [a태그 + router-link태그] →  [router-link태그] 수정 -->
                  <router-link :to="{name: 'createBrand'}" class="brand-banner__link">브랜드 개설하기</router-link>
                </div>
                <div class="brand-banner__img">
                  <img src="@/assets/images/icon/icon_banner_brand.png" alt="">
                </div>
              </div>
              <!-- // 07.20 기업대시보드와 동일하게 수정 -->
              <!-- // 브랜드 배너 -->
            </div>
        </div>
        <DashBoardSide />
    </div>
  </div>
</template>

<script>
import DashBoardSide from '@/views/dashboard/components/ElectionDashBoardSide'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import brandListCmp from '@/views/dashboard/components/brandListCmp.vue'
import PagingCmp from '@/components/common/PagingCmp.vue'
export default {
  components: {
    DashBoardSide,
    PageTitleH3,
    // brandListCmp,
    PagingCmp
  },
  data() {
    return {
      brandData: [
        {
          mark: true,
          brandLogo: '',
          title: '서울 강남구 갑 무슨당 김댕댕',
          new: true,
          chatData: 999,
          message: 555,
          agencyData: 0,
          status: '승인완료'
        },
        {
          mark: true,
          brandLogo: '',
          title: '서울 강남구 갑 무슨당 김댕댕',
          new: true,
          chatData: 999,
          message: 555,
          agencyData: 0,
          status: '승인요청'
        },
        {
          mark: false,
          brandLogo: '',
          title: '서울 강남구 갑 무슨당 김댕댕',
          new: true,
          chatData: 99559,
          message: 55555,
          agencyData: 0,
          status: '반려'
        },
        {
          mark: false,
          brandLogo: '',
          title: '서울 강남구 갑 무슨당 김댕댕',
          new: true,
          chatData: 999,
          message: 555,
          agencyData: 0,
          status: '진행중'
        }
      ],
      BrandList: [
        {
          codeNm: '브랜드 리스트1',
          code: '브랜드 리스트1'
        },
        {
          codeNm: '브랜드 리스트2',
          code: '브랜드 리스트2'
        }
      ]
    }
  }
}
</script>

<style>
</style>
