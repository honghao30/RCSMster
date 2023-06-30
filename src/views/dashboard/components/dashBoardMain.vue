<template>
  <div class="dashBoard-main__content">
    <!-- 가입 승인 배너(마스터, 매니저, 대행사) -->
    <!-- 가입 승인 진행중(서류 미제출) -->
    <div class="approval-statu__box document-not">
      <strong>가입 승인 진행중(서류 미제출)</strong>
      <p>사업자등록증을 제출하지 않았습니다. 사업자등록증을 제출해주세요.</p>
    </div>
    <!-- 가입 승인 진행중 -->
    <div class="approval-statu__box approval-ing">
      <strong>가입 승인 진행중</strong>
      <p>가입 승인 완료 전에도 RBC의 기능을 이용하실 수 있으나, 일부기능은 승인 완료 후 정상적으로 사용하실 수 있습니다.</p>
    </div>
    <!-- 가입 승인 반려 -->
    <div class="approval-statu__box approval-reject">
      <strong>가입 승인 반려</strong>
      <p class="reject-reason">반려 사유 : 인터넷 광고 금지 메시지</p>
      <p>반려 사유를 확인하고 수정해 주세요. 3일 안에 다시 신청하지 않으면 지금까지 등록한 모든 데이터가 삭제됩니다.</p>
    </div>
    <!-- 가입 승인 완료 -->
    <div class="approval-statu__box approval-done">
      <strong>가입 승인 완료</strong>
      <p>RBC의 모든 기능을 자유롭게 이용하실 수 있습니다.</p>
    </div>
    <!-- // 가입 승인 배너(마스터, 매니저, 대행사) -->
    <!-- 등록된 브랜드가 있는 경우(마스터, 매니저) : 내가 운영중인 브랜드 영역 -->
    <!-- 내가 운영중인 브랜드 -->
    <div class="board-main__box mymain-box">
      <PageTitleH3 titleh3="내가 운영중인 브랜드" totalCount="982" :DropDataSearchable="MyBrandOptions" />
      <brandListCmp>
        <template  slot="col">
          <col>
        </template>
        <template  slot="tbody">
          <tr v-for="(item,i) in brandData" :key="i">
            <td>
              <div class="first-row">
                <div class="row-left">
                  <div class="brandname">
                    <div class="brand">
                      <div class="brand__mark" role="bookmark">
                        <input type="checkbox" :id="`bookmark${i}`" :checked="item.mark" >
                        <label class="brand__mark__core" :for="`bookmark${i}`"></label>
                      </div>
                      <div class="brand__logo">
                        <img :src="item.brandLogo" alt="">
                      </div>
                      <span class="brand__title link"><router-link to="">{{ item.title }}</router-link></span>
                    </div>
                  </div>
                  <div class="status">
                    <span class="flag-progress"
                      :class="getstatus(item.status)"
                    >{{ item.status }}
                    </span>
                  </div>
                </div>
                <div class="row-right">
                  <div class="row-box">
                    <div class="row-data">
                      <span class="data-chat underline" v-if="item.chatData >= 999">999+</span>
                      <span class="data-chat" :class="{'underline': item.chatData > 0 }" v-else><router-link to="">{{ item.chatData }}</router-link></span>
                    </div>
                    <div class="row-data-tit">
                      <span>대화방</span>
                    </div>
                  </div>
                  <div class="row-box">
                    <div class="row-data">
                      <span class="data-template underline" v-if="item.message >= 999">999+</span>
                      <span class="data-template" :class="{'underline': item.message > 0 }" v-else><router-link to="">{{ item.message }}</router-link></span>
                    </div>
                    <div class="row-data-tit">
                      <span>템플릿</span>
                    </div>
                  </div>
                  <div class="row-box">
                    <div class="row-data">
                      <span class="data-agency underline" v-if="item.agencyData >= 999">999+</span>
                      <span class="data-agency" :class="{'underline': item.agencyData > 0 }" v-else><router-link to="">{{ item.agencyData }}</router-link></span>
                    </div>
                    <div class="row-data-tit">
                      <span>대행사</span>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </template>
      </brandListCmp>
      <PagingCmp />
      <!-- // 내가 운영중인 브랜드 -->
    </div>
    <!-- // 내가 운영중인 브랜드 -->
    <!-- // 등록된 브랜드가 있는 경우(마스터, 매니저) : 내가 운영중인 브랜드 영역 -->
    <!-- 등록된 브랜드가 없는 경우(마스터, 매니저) : 내 브랜드를 개설하세요 영역 -->
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
    <!-- // 등록된 브랜드가 없는 경우(마스터, 매니저) : 내 브랜드를 개설하세요 영역 -->
    <!-- 등록된 브랜드가 있는 경우(대행사) : 내가 운영중인 브랜드 영역 -->
    <div class="board-main__box--roun-type agency-brand">
      <PageTitleH3 titleh3="운영중인 브랜드" />
      <div class="top-ctrl-area">
        <div class="left-area num-area">
          <p class="company-ing">기업 <span>999</span>개</p>
          <p class="company-ing">브랜드 <span>999</span>개</p>
        </div>
        <div class="right-area">
          <Dropdown searchable :options="dropdownOptions" placeholder="기업명">
          </Dropdown>
          <Dropdown searchable :options="BarndOptions" placeholder="브랜드명">
          </Dropdown>
        </div>
      </div>
      <div class="table__wrap">
        <table class="table table-list">
          <thead>
            <tr>
              <th scope="col" width="25%"><span>기업 명</span></th>
              <th scope="col" width="12.5%"><span>안심마크</span></th>
              <th scope="col" width="25%"><span>브랜드 명</span></th>
              <th scope="col" width="12.5%"><span>대화방</span></th>
              <th scope="col" width="12.5%"><span>템플릿</span></th>
              <th scope="col" width="12.5%"><span>메시지 발송</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,i) in agencyBrandData" :key="i">
              <td>
                <div class="brandname mybrandname">
                  <div class="brand">
                    <div class="brand__mark" role="bookmark">
                      <input type="checkbox" :id="`bookmark${i}`" :checked="item.mark" >
                      <label class="brand__mark__core" :for="`bookmark${i}`"></label>
                    </div>
                    <span class="brand__title link"><router-link to="">{{ item.companyName }}</router-link></span>
                  </div>
                </div>
              </td>
              <td>
                <span class="data-safety">{{ item.safetyMark }}</span>
              </td>
              <td class="l-align">
                <span class="data-brandname underline">{{ item.brandName }}</span>
              </td>
              <td>
                <span class="data-chat underline" v-if="item.chatData >= 999">999+</span>
                <span class="data-chat" :class="{'underline': item.chatData > 0 }" v-else>{{ item.chatData }}</span>
              </td>
              <td>
                <span class="data-template underline" v-if="item.message >= 999">999+</span>
                <span class="data-template" :class="{'underline': item.message > 0 }" v-else>{{ item.message }}</span>
              </td>
              <td>
                <span class="data-send">{{ item.messageSend }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <PagingCmp />
    </div>
    <!-- // 등록된 브랜드가 있는 경우(대행사) : 내가 운영중인 브랜드 영역 -->
    <!-- 등록된 브랜드가 없는 경우(대행사) -->
    <div class="board-main__box--roun-type agency-brand">
      <div class="agency-brand_none">
        <h3>현재 개설된 브랜드의 운영권한이 필요하세요?</h3>
        <p>브랜드에게 대행사 권한을 신청합니다.<br>권한이 부여되면 RCS메시지 발송이 가능합니다.</p>
        <div class="button__wrap side-box-bottom">
          <ButtonCmp
            type="btn-blue"
          >
          대행사 운영권한 신청
          </ButtonCmp>
        </div>
      </div>
    </div>
    <!-- // 등록된 브랜드가 있는 경우(대행사) -->
    <!-- 브랜드 개설 배너(마스터, 매니저, 대행사) -->
    <div class="brand-banner__box">
      <div class="brand-banner__txt">
      <h3>고객과 연결될 수 있는 RBC의 다양한 기능을 이용하세요.</h3>
      <p>브랜드를 만들어 다양한 레이아웃과 컨텐츠를 생성, 기업과 고객 간 원활한 연결로 손쉽게 브랜드 정보를 공유합니다.</p>
      <!-- 230616 [a태그 + router-link태그] →  [router-link태그] 수정 -->
      <router-link to="/BrandCreateStep01" class="brand-banner__link">브랜드 개설하기</router-link>
      </div>
      <div class="brand-banner__img">
        <img src="@/assets/images/icon/icon_banner_brand.png" alt="">
      </div>
    </div>
    <!-- // 브랜드 개설 배너(마스터, 매니저, 대행사) -->
    <!-- 내가 운영할 수 있는 브랜드 영역 -->
    <div class="board-main__box mymain-box cando-box">
      <PageTitleH3 titleh3="내가 운영할 수 있는 브랜드" totalCount="982" :DropDataSearchable="MyBrandCanDoOptions" />
      <brandListCmp>
        <template  slot="col">
          <col>
        </template>
        <template  slot="tbody">
          <tr v-for="(item,i) in canBrandData" :key="i">
            <td>
              <div class="first-row">
                <div class="row-left">
                  <div class="brandname">
                    <div class="brand">
                      <div class="brand__logo">
                        <img :src="item.brandLogo" alt="">
                      </div>
                      <span class="brand__title link"><router-link to="">{{ item.title }}</router-link></span>
                    </div>
                  </div>
                  <div class="manage-authority">
                    <!-- 권한신청 버튼 > 운영권한 신청 팝업 출력 -->
                    <ButtonCmp
                      v-if="item.authority"
                      type="btn-blue-line"
                      size="small"
                      @click="authorityModal"
                    >
                    권한신청
                    </ButtonCmp>
                    <span class="flag-progress" v-if="!item.authority">승인대기</span>
                  </div>
                </div>
                <div class="row-right">
                  <div class="row-box">
                    <div class="row-data">
                      <span class="data-chat underline" v-if="item.chatData >= 999">999+</span>
                      <span class="data-chat" :class="{'underline': item.chatData > 0 }" v-else><router-link to="">{{ item.chatData }}</router-link></span>
                    </div>
                    <div class="row-data-tit">
                      <span>대화방</span>
                    </div>
                  </div>
                  <div class="row-box">
                    <div class="row-data">
                      <span class="data-template underline" v-if="item.message >= 999">999+</span>
                      <span class="data-template" :class="{'underline': item.message > 0 }" v-else><router-link to="">{{ item.message }}</router-link></span>
                    </div>
                    <div class="row-data-tit">
                      <span>템플릿</span>
                    </div>
                  </div>
                  <div class="row-box">
                    <div class="row-data">
                      <span class="data-agency underline" v-if="item.agencyData >= 999">999+</span>
                      <span class="data-agency" :class="{'underline': item.agencyData > 0 }" v-else><router-link to="">{{ item.agencyData }}</router-link></span>
                    </div>
                    <div class="row-data-tit">
                      <span>대행사</span>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </template>
      </brandListCmp>
      <PagingCmp />
    </div>
    <!-- // 내가 운영할 수 있는 브랜드 영역 -->
    <!-- 모달 -->
    <ModalView
      v-if="isModalViewed"
      @closeModal="isModalViewed = false"
    >
      <!-- 운영권한 신청 팝업 출력 -->
      <ConfirmMsg
        @closeModal="isModalViewed = false, isAuthority = false"
        v-if="isAuthority"
        modalsize="dashboard_small_modal"
      >
        <div class="msg" slot="msg">
          <p>LANVIN COLLECTION의<br>
            브랜드 운영권한을 신청 하시겠습니까?<br>
            브랜드 담당자에게 신청자의 이름과<br>
            이메일 주소가 공개됩니다.
            </p>
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
            신청
          </ButtonCmp>
        </div>
      </ConfirmMsg>
      <!-- // 운영권한 신청 팝업 출력 -->
    </ModalView>
    <!-- // 모달 -->
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import PagingCmp from '@/components/common/PagingCmp.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import brandListCmp from '@/views/dashboard/components/brandListCmp.vue'
import ModalView from '@/components/common/ModalView.vue'
import ConfirmMsg from '@/views/dashboard/components/ConfirmMsg.vue'

export default {
  components: {
    ButtonCmp,
    Dropdown,
    PagingCmp,
    PageTitleH3,
    brandListCmp,
    ModalView,
    ConfirmMsg
  },
  data() {
    return {
      MyBrandOptions: [
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
      dropdownOptions: [
        {
          label: '기업 명 1',
          value: '01'
        },
        {
          label: '기업 명 2',
          value: '02'
        },
        {
          label: '기업 명 3',
          value: '03'
        },
        {
          label: '기업 명 4',
          value: '04'
        }
      ],
      BarndOptions: [
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
      MyBrandCanDoOptions: [
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
      brandData: [
        {
          mark: true,
          brandLogo: require('../../../assets/images/dummy/brand_logo_1.png'),
          title: '더피프티원더피프티원더피프티원더피프티원...',
          status: '승인 완료',
          chatData: 0,
          message: 654,
          agencyData: 0
        },
        {
          mark: true,
          brandLogo: require('../../../assets/images/dummy/brand_logo_2.png'),
          title: 'CX hub',
          status: '승인 요청',
          chatData: 275,
          message: 999,
          agencyData: 3
        },
        {
          mark: false,
          brandLogo: require('../../../assets/images/dummy/brand_logo_3.png'),
          title: 'SYSTEM HOMME',
          status: '진행중',
          chatData: 102,
          message: 87,
          agencyData: 2
        },
        {
          mark: false,
          brandLogo: require('../../../assets/images/dummy/brand_logo_3.png'),
          title: 'SYSTEM STUDIO HOUSE',
          status: '반려',
          chatData: 714,
          message: 69,
          agencyData: 1
        },
        {
          mark: false,
          brandLogo: require('../../../assets/images/dummy/brand_logo_4.png'),
          title: '롯데홈쇼핑',
          status: '임시저장',
          chatData: 999,
          message: 999,
          agencyData: 5
        }
      ],
      canBrandData: [
        {
          brandLogo: require('../../../assets/images/dummy/brand_logo_1.png'),
          title: 'LANVIN COLLECTION',
          authority: false,
          chatData: 872,
          message: 654,
          agencyData: 0
        },
        {
          brandLogo: require('../../../assets/images/dummy/brand_logo_2.png'),
          title: '더캐시미어',
          authority: true,
          chatData: 275,
          message: 106,
          agencyData: 3
        },
        {
          brandLogo: require('../../../assets/images/dummy/brand_logo_3.png'),
          title: '타미힐피거',
          authority: true,
          chatData: 872,
          message: 654,
          agencyData: 0
        },
        {
          brandLogo: require('../../../assets/images/dummy/brand_logo_3.png'),
          title: 'TOMMY JEANS',
          authority: true,
          chatData: 87,
          message: 29,
          agencyData: 2
        },
        {
          brandLogo: require('../../../assets/images/dummy/brand_logo_4.png'),
          title: '클럽모나코​',
          authority: true,
          chatData: 127,
          message: 106,
          agencyData: 3
        }
      ],
      agencyBrandData: [
        {
          mark: true,
          companyName: '더피프티원',
          safetyMark: '사용',
          brandName: '더피프티원',
          chatData: 999,
          message: 654,
          messageSend: '발송불가'
        },
        {
          mark: true,
          companyName: '더피프티원',
          safetyMark: '사용',
          brandName: '더피프티원',
          chatData: 999,
          message: 654,
          messageSend: '발송불가'
        },
        {
          mark: true,
          companyName: '더피프티원',
          safetyMark: '사용',
          brandName: '더피프티원',
          chatData: 800,
          message: 654,
          messageSend: '발송불가'
        },
        {
          mark: true,
          companyName: '더피프티원',
          safetyMark: '사용',
          brandName: '더피프티원',
          chatData: 600,
          message: 654,
          messageSend: '발송불가'
        },
        {
          mark: true,
          companyName: '더피프티원',
          safetyMark: '사용',
          brandName: '더피프티원',
          chatData: 4,
          message: 654,
          messageSend: '발송불가'
        },
        {
          mark: true,
          companyName: '더피프티원',
          safetyMark: '사용',
          brandName: '더피프티원',
          chatData: 0,
          message: 654,
          messageSend: '발송불가'
        },
        {
          mark: true,
          companyName: '더피프티원',
          safetyMark: '사용',
          brandName: '더피프티원',
          chatData: 10,
          message: 654,
          messageSend: '발송불가'
        }
      ],
      isModalViewed: false,
      isAuthority: false
    }
  },
  methods: {
    getstatus (status) {
      switch (status) {
        case '승인 요청':
          return 'ing'
        case '진행중':
          return 'weit'
        case '임시저장':
          return 'weit'
        case '삭제 처리중':
          return 'weit'
        case '반려':
          return 'return'
        case '승인 완료':
          return 'done'
        default:
          return ''
      }
    },
    closeMsg () {
      this.isModalViewed = false
      this.isAuthority = false
    },
    authorityModal () {
      this.isModalViewed = true
      this.isAuthority = true
    }
  }
}
</script>

<style>

</style>
