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
                        <span class="data-chat" v-else>{{ item.message }}</span>
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
              <!-- // 내가 운영중인 브랜드 -->
              <div class="brand-banner__box">
                <strong>브랜드를 만들고 고객과 연결될 수 있는<br/>RBC의 다양한 기능을 사용하세요.</strong>
                <!-- 230616 [a태그 + router-link태그] →  [router-link태그] 수정 -->
                <router-link to="" class="btn btn-blue">브랜드 개설하기</router-link>
              </div>
              <!-- // 브랜드 배너 -->
              <PageTitleH3
                titleh3="내가 운영할 수 있는 브랜드"
                totalCount="982"
                :DropData="BrandList"
              />
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
                  <th scope="col"><span>메시지</span></th>
                  <th scope="col"><span>대행사</span></th>
                </template>
                <template  slot="tbody">
                  <tr v-for="(item,i) in brandData" :key="i">
                    <td>
                        <div class="brandname">
                          <div class="brand">
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
                        <span class="data-chat" v-else>{{ item.message }}</span>
                      </td>
                      <td>
                        <span class="data-agency">{{ item.agencyData }}</span>
                      </td>
                  </tr>
                </template>
              </brandListCmp>
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
