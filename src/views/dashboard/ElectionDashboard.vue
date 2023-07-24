<template>
  <div class="dashboard__wrap election__wrap">
    <div class="dashboard__wrap--inner">
        <div class="dashBoard-main__content">
            <div class="election__box">
              <strong>2024년 4월 10일 제 22대 국회의원선거</strong>
              <p>선거 운동 기간 : 2023년 10월 13일~ 2024년 5월 10일</p>
              <span class="flag-progress done">아이디 발급 완료</span>
              <div class="election__banner--innerbox">
                <p>발급된 계정으로 접속하여 기간 동안 브랜드를 생성/운영관리 할 수 있습니다.</p>
                <span class="msgbox-round"
                >
                    ID : 123456789
                </span>
              </div>
            </div>
            <div class="election__box">
              <strong>2024년 4월 10일 제 22대 국회의원선거</strong>
              <p>선거 운동 기간 : 2023년 10월 13일~ 2024년 5월 10일</p>
            </div>
            <div class="election__box type2">
              <strong>2024년 4월 10일 제 22대 국회의원선거</strong>
              <p>선거 운동 기간 : 2023년 10월 13일~ 2024년 5월 10일</p>
            </div>
            <!-- // 가입 상태 안내 메시지 -->
            <div class="board-main__box">
              <PageTitleH3 titleh3="내가 운영중인 브랜드" totalCount="982" />
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
              <PageTitleH3
                titleh3="내가 운영할 수 있는 브랜드"
                totalCount="982"
                :DropData="BrandList"
              />
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
              <!-- // 내가 운영할수 있는 브랜드 -->
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
    brandListCmp,
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
          label: '브랜드 리스트1',
          value: '브랜드 리스트1'
        },
        {
          label: '브랜드 리스트2',
          value: '브랜드 리스트2'
        }
      ]
    }
  }
}
</script>

<style>
</style>
