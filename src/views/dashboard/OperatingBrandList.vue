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
              <PageTitleH3 titleh3="내가 운영중인 브랜드" totalCount="982" :DropData="BrandList" />
              <brandListCmp>
                <template  slot="col">
                  <col width="58%">
                  <col>
                  <col>
                  <col>
                  <col>
                </template>
                <template  slot="thead">
                  <th scope="col"><span>브랜드 명</span></th>
                  <th scope="col"><span>대화방</span></th>
                  <th scope="col"><span>템플릿</span></th>
                  <th scope="col"><span>대행사</span></th>
                  <th scope="col"><span>승인상태</span></th>
                </template>
                <template  slot="tbody">
                  <tr v-for="(item,i) in brandData" :key="i">
                    <td>
                        <div class="brandname">
                          <div class="brand">
                            <div class="brand__mark" role="bookmark">
                              <input type="checkbox" :id="`bookmark${i}`" :checked="item.mark" >
                              <label class="brand__mark__core" :for="`bookmark${i}`"></label>
                            </div>
                            <div class="brand__logo"></div>
                            <span class="brand__title"><router-link to="#">{{ item.title }}</router-link></span>
                            <span class="brnad__new" v-if="item.new">NEW</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span class="data-chat underline" v-if="item.chatData >= 999">999+</span>
                        <span class="data-chat" v-else>{{ item.chatData }}</span>
                      </td>
                      <td>
                        <span class="data-template underline"  v-if="item.message >= 999">999+</span>
                        <span class="data-template" v-else>{{ item.message }}</span>
                      </td>
                      <td>
                        <span class="data-agency">{{ item.agencyData }}</span>
                      </td>
                      <td>
                        <span class="data-agency" :class="{ isReturn: item.status === '반려' }">{{ item.status }}</span>
                      </td>
                  </tr>
                </template>
              </brandListCmp>
              <PagingCmp />
              <!-- // 내가 운영중인 브랜드 -->
              <div class="brand-banner__box">
                <strong>브랜드를 만들고 고객과 연결될 수 있는<br/>RBC의 다양한 기능을 사용하세요.</strong>
                <!-- 230616 [a태그 + router-link태그] →  [router-link태그] 수정 -->
                <router-link to="" class="btn btn-blue">브랜드 개설하기</router-link>
              </div>
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
