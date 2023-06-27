<template>
  <div class="dashBoard-main__content">
    <!-- 가입 승인 배너 -->
    <!-- 가입 승인 요청 -->
    <div class="approval-statu__box document-not">
      <strong>가입 승인 진행중(서류 미제출)</strong>
      <p>사업자등록증을 제출하지 않았습니다. 사업자등록증을 제출해주세요.</p>
    </div>
    <!-- 가입 승인 요청 -->
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
    <!-- 가입 승인 반려 -->
    <div class="approval-statu__box approval-done">
      <strong>가입 승인 완료</strong>
      <p>RBC의 모든 기능을 자유롭게 이용하실 수 있습니다.</p>
    </div>
    <!-- // 가입 승인 배너 -->
    <!-- 내가 운영중인 브랜드 영역 -->
    <div class="board-main__box--roun-type brand-ing">
      <div class="top-ctrl-area">
        <div class="left-area">
          <PageTitleH3 titleh3="내가 운영중인 브랜드" totalCount="982"/>
        </div>
        <div class="right-area">
          <div class="search-area">
            <Dropdown searchable :options="dropdownOptions" placeholder="브랜드명">
            </Dropdown>
          </div>
        </div>
      </div>
      <div class="table__wrap brand-ing-table">
        <table class="table table-list">
          <colgroup>
              <col width="58%">
              <col>
              <col>
              <col>
            </colgroup>
          <thead>
            <tr>
              <th scope="col"><span>브랜드 명</span></th>
              <th scope="col"><span>대화방</span></th>
              <th scope="col"><span>템플릿</span></th>
              <th scope="col"><span>대행사</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,i) in brandData" :key="i">
              <td>
                <div class="brandname">
                  <div class="brand">
                    <div class="brand__mark" role="bookmark">
                      <input type="checkbox" :id="`bookmark${i}`" :checked="item.mark" >
                      <label class="brand__mark__core" :for="`bookmark${i}`"></label>
                    </div>
                    <div class="brand__logo">
                      <img :src="item.brandLogo" alt="">
                    </div>
                    <span class="brand__title"><router-link to="">{{ item.title }}</router-link></span>
                  </div>
                </div>
              </td>
              <td>
                <span class="data-chat">{{ item.chatData }}</span>
              </td>
              <td>
                <span class="data-template">{{ item.templateData }}</span>
              </td>
              <td>
                <span class="data-agency">{{ item.agencyData }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <PagingCmp />
    </div>
    <!-- // 내가 운영중인 브랜드 영역 -->
    <!-- 내 브랜드를 개설하세요 영역 -->
    <div class="board-main__box--roun-type brand-make-box">
      <PageTitleH3 titleh3="내 브랜드를 개설하세요"/>
      <div class="des">
        <p>고객과 RCS 메시지를 이용해 커뮤니케이션하려면 브랜드를 개설하셔야 합니다.</p>
        <p>우선 통신서비스 가입증명원을 미리 준비해주세요.</p>
      </div>
      <div class="step-total">
        <div class="step-each">
          <p class="step-num">STEP 1</p>
          <p class="step_title">기본 정보 입력</p>
          <div class="step_des">
            <p>프로필 이미지, 브랜드 소개를 이용해 고객에게 브랜드 이미지를 전달할 수 있어요.</p>
          </div>
        </div>
        <div class="step-each">
          <p class="step-num">STEP 2</p>
          <p class="step_title">퀵 버튼 설정</p>
          <div class="step_des">
            <p>전화하기, 웹사이트 연결 등 고객이 쉽게 접근할 수 있는 퀵 버튼을 활용해 보세요.</p>
          </div>
        </div>
        <div class="step-each">
          <p class="step-num">STEP 3</p>
          <p class="step_title">브랜드 홈 탭 설정</p>
          <div class="step_des">
            <p>브랜드에 대한 소식과 정보 중 고객에게 우선적으로 보일 탭을 직접 선택하세요.</p>
          </div>
        </div>
      </div>
    </div>
    <!-- // 내 브랜드를 개설하세요 영역 -->
    <!-- 브랜드 개설 배너 -->
    <div class="brand-banner__box">
      <strong>브랜드를 만들고 고객과 연결될 수 있는<br/>RBC의 다양한 기능을 사용하세요.</strong>
      <!-- 230616 [a태그 + router-link태그] →  [router-link태그] 수정 -->
      <router-link to="" class="btn btn-blue">브랜드 개설하기</router-link>
    </div>
    <!-- // 브랜드 개설 배너 -->
    <div class="board-main__box--roun-type mybrand-box">
      <div class="top-ctrl-area">
        <div class="left-area">
          <PageTitleH3 titleh3="내가 운영할 수 있는 브랜드" totalCount="982"/>
        </div>
        <div class="right-area">
          <div class="search-area">
            <Dropdown searchable :options="dropdownOptions" placeholder="브랜드명">
            </Dropdown>
          </div>
        </div>
      </div>
      <div class="table__wrap">
        <table class="table table-list">
          <thead>
            <tr>
              <th scope="col" width="50%"><span>브랜드 명</span></th>
              <th scope="col" width="12.5%"><span>대화방</span></th>
              <th scope="col" width="12.5%"><span>템플릿</span></th>
              <th scope="col" width="12.5%"><span>대행사</span></th>
              <th scope="col" width="12.5%"><span>운영권한</span></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,i) in myBrandData" :key="i">
              <td>
                <div class="brandname mybrandname">
                  <div class="brand">
                    <div class="brand__logo">
                      <img :src="item.brandLogo" alt="">
                    </div>
                    <span class="brand__title"><router-link to="">{{ item.title }}</router-link></span>
                  </div>
                </div>
              </td>
              <td>
                <span class="data-chat">{{ item.chatData }}</span>
              </td>
              <td>
                <span class="data-template">{{ item.templateData }}</span>
              </td>
              <td>
                <span class="data-agency">{{ item.agencyData }}</span>
              </td>
              <td>
                <ButtonCmp
                  v-if="item.authority"
                  type="btn-blue"
                  size="small"
                >
                권한신청
                </ButtonCmp>
                <span class="flag-progress" v-if="!item.authority">승인대기</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <PagingCmp />
    </div>
    <!-- // 페이지 게이션 -->
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import PagingCmp from '@/components/common/PagingCmp.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'

export default {
  components: {
    ButtonCmp,
    Dropdown,
    PagingCmp,
    PageTitleH3
  },
  data() {
    return {
      dropdownOptions: [
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
          chatData: 999,
          templateData: 654,
          agencyData: 0
        },
        {
          mark: true,
          brandLogo: require('../../../assets/images/dummy/brand_logo_2.png'),
          title: 'CX hub',
          chatData: 275,
          templateData: 999,
          agencyData: 3
        },
        {
          mark: false,
          brandLogo: require('../../../assets/images/dummy/brand_logo_3.png'),
          title: 'SYSTEM HOMME',
          chatData: 102,
          templateData: 87,
          agencyData: 2
        },
        {
          mark: false,
          brandLogo: require('../../../assets/images/dummy/brand_logo_3.png'),
          title: 'SYSTEM STUDIO HOUSE',
          chatData: 714,
          templateData: 69,
          agencyData: 1
        },
        {
          mark: false,
          brandLogo: require('../../../assets/images/dummy/brand_logo_4.png'),
          title: '롯데홈쇼핑',
          chatData: 999,
          templateData: 999,
          agencyData: 5
        }
      ],
      myBrandData: [
        {
          brandLogo: require('../../../assets/images/dummy/brand_logo_1.png'),
          title: 'LANVIN COLLECTION',
          chatData: 872,
          templateData: 654,
          agencyData: 0,
          authority: false
        },
        {
          brandLogo: require('../../../assets/images/dummy/brand_logo_2.png'),
          title: '더캐시미어',
          chatData: 275,
          templateData: 106,
          agencyData: 3,
          authority: true
        },
        {
          brandLogo: require('../../../assets/images/dummy/brand_logo_3.png'),
          title: '타미힐피거',
          chatData: 872,
          templateData: 654,
          agencyData: 0,
          authority: true
        },
        {
          brandLogo: require('../../../assets/images/dummy/brand_logo_3.png'),
          title: 'TOMMY JEANS',
          chatData: 87,
          templateData: 29,
          agencyData: 2,
          authority: true
        },
        {
          brandLogo: require('../../../assets/images/dummy/brand_logo_4.png'),
          title: '클럽모나코​',
          chatData: 127,
          templateData: 106,
          agencyData: 3,
          authority: true
        }
      ]
    }
  }
}
</script>

<style>

</style>
