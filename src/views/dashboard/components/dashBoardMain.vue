<template>
  <div class="dashboard__wrap election__wrap">
  <div class="dashBoard-main__content">
    <!-- 선거용 가상 계정일 경우 선거 배너 노출 영역 -->
    <div class="election__box" v-for="(item, index) in corpInfo.seasons" :key="index">
      <strong>{{ item.name }}</strong>
      <p>선거 운동 기간 : {{ item.expireDt }} ~ {{ item.expireDt }}</p>
    </div>
    <!-- // 가입 상태 안내 메시지 -->
    <!-- 가입 상태 안내 메시지 -->
    <!-- 상태에 따라 document-not,approval-ing, approval-reject, approval-done 클래스 바인딩-->
    <!-- 기획서 v1.0 수정 (p.10 참고 > 가입 승인 반려 approval-reject 경우 > 문구 수정) -->
    <div :class="[{ 'approval-statu__box': true }, { 'document-not' : getGuideMgsClass == 'document-not' }, { 'approval-ing' : getGuideMgsClass == 'approval-ing' }, { 'approval-reject' : getGuideMgsClass == 'approval-reject' }, { 'approval-done' : getGuideMgsClass == 'approval-done' }]" v-if="getIsApprovalStatus">
      <strong>{{corpInfo.corpApprovalStatusTit}}</strong>
      <p :v-if='(corpInfo.corpInfo.aprvRetDescr !== "")'>{{corpInfo.corpInfo.aprvRetDescr}}</p>
      <p>{{corpInfo.corpApprovalStatusTxt}}</p>
    </div>
    <!-- // 등록된 브랜드가 있는 경우(마스터, 매니저) : 내가 운영중인 브랜드 영역 -->
    <!-- 등록된 브랜드가 없는 경우(마스터, 매니저) : 내 브랜드를 개설하세요 영역 -->
    <div class="board-main__box--roun-type brand-make" v-if="userType === 'CORP' && myBrandTotal === 0">
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
    <!-- // 가입 상태 안내 메시지 -->
    <div class="board-main__box  mymain-box" v-if="userType === 'CORP' && myBrandTotal > 0" > <!-- mymain-box 이중클래스 추가 -->
      <!-- 0630 수정-->
      <!-- 기획서 v1.0 수정 전 (데이터 있는 부분들은 참고를 위해 삭제하지 않고 주석으로 했습니다.)-->
      <!-- <div class="page-title__wrap">
        <h3>
          내가 운영중인 브랜드<span v-if="myBrandTotal !== null">({{ myBrandTotal }})</span>
        </h3>
        <Dropdown searchable :options="myBrandDropdownOptions" v-model='myBrandsearchParam.brandId' @change='setMyBrandParams' placeholder="브랜드명" />
      </div> -->
      <!-- // 기획서 v1.0 수정 전 -->
      <!-- 기획서 v1.0 수정 후 : PageTitleH3 컴포넌트에 totalCount와 doropdown이 추가되어 사용 (PageTitleH3 컴포넌트에 DropDataSearchable 주석처리되어 있어서 구현 안되는 상황) -->
      <PageTitleH3 titleh3="내가 운영중인 브랜드" totalCount="982" :DropDataSearchable="myBrandDropdownOptions" />
      <brandListCmp>
        <template  slot="col">
          <col> <!-- 기획서 v1.0 수정 (col 4개 삭제) -->
        </template>
        <!-- 기획서 v1.0 수정 (thead 삭제) -->
        <template  slot="tbody">
          <tr v-for="(item,i) in myBrandData" :key="i">
          <!-- 기획서 v1.0 수정 -->
            <td>
              <div class="first-row"> <!-- 기획서 v1.0 수정 (first-row 태그 추가) -->
                <div class="row-left"> <!-- 기획서 v1.0 수정 (row-left 태그 추가) -->
                  <div class="brandname">
                    <div class="brand">
                      <div class="brand__mark" role="bookmark">
                        <input type="checkbox" :id="`bookmark${i}`" v-model='item.mark' @change='bookmark(item)' :checked="item.mark" >
                        <label class="brand__mark__core" :for="`bookmark${i}`"></label>
                      </div>
                      <div class="brand__logo">
                        <img :src="item.profileImgFileUrl" alt="">
                      </div>
                      <span class="brand__title link"><router-link :to='{name: "brandDashboard", params: {brandId: item.brandId}}'>{{ item.brandNm }}</router-link></span> <!-- 기획서 v1.0 수정 (이중클래스 link 추가) -->
                      <!-- 기획서 v1.0 수정 (brnad__new, brand__message 클래스 삭제) -->
                    </div>
                  </div>
                  <div class="status"> <!-- 기획서 v1.0 수정 (브랜드 상태(item.status, item.aprvRetNm) : 위치, 스타일 변경으로 인해 methods 추가) -->
                    <span class="flag-progress"
                      :class="getstatus(item.aprvRetNm)"
                    >{{ item.aprvRetNm }}</span>
                  </div>
                </div> <!-- // 기획서 v1.0 수정 (row-left 태그 추가) -->
                <div class="row-right"> <!-- 기획서 v1.0 수정 (row-right 태그 추가 및 underline으로 인해 v-if,v-else 추가 / 수정 전 각 td에 있는 내용 사용함) -->
                  <div class="row-box">
                    <div class="row-data">
                      <span class="data-chat underline" v-if="item.chatbotCnt >= 999">999+</span>
                      <span class="data-chat" :class="{'underline': item.chatbotCnt > 0 }" v-else><router-link to="">{{ item.chatbotCnt }}</router-link></span>
                    </div>
                    <div class="row-data-tit">
                      <span>대화방</span>
                    </div>
                  </div>
                  <div class="row-box">
                    <div class="row-data">
                      <span class="data-template underline" v-if="item.tplCnt >= 999">999+</span>
                      <span class="data-template" :class="{'underline': item.tplCnt > 0 }" v-else><router-link to="">{{ item.tplCnt }}</router-link></span>
                    </div>
                    <div class="row-data-tit">
                      <span>템플릿</span>
                    </div>
                  </div>
                  <div class="row-box">
                    <div class="row-data">
                      <span class="data-agency underline" v-if="item.agencyCnt >= 999">999+</span>
                      <span class="data-agency" :class="{'underline': item.agencyCnt > 0 }" v-else><router-link to="">{{ item.agencyCnt }}</router-link></span>
                    </div>
                    <div class="row-data-tit">
                      <span>대행사</span>
                    </div>
                  </div>
                </div> <!-- // 기획서 v1.0 수정 (row-right 태그 추가 및 underline으로 인해 v-if,v-else 추가 / 수정 전 각 td에 있는 내용 사용함) -->
              </div> <!-- // 기획서 v1.0 수정 (first-row 태그 추가) -->
            </td>
            <!-- // 기획서 v1.0 수정 -->
            <!-- 기획서 v1.0 수정 전 (row-right 태그 안에 있는 내용 / 데이터 있는 부분들은 참고를 위해 삭제하지 않고 주석으로 했습니다.) -->
            <!-- <td>
              <span class="data-chat">{{ item.chatbotCnt }}</span>
            </td>
            <td>
              <span class="data-template" ><router-link :to='{name: "templateList", params: {brandId: item.brandId}}'>{{ item.tplCnt }}</router-link></span>
            </td>
            <td>
              <span class="data-agency">{{ item.agencyCnt }}</span>
            </td>
            <td>
              <span class="data-agency" :class="{ isReturn: item.status === '반려' }">{{ item.aprvRetNm }}</span>
            </td> -->
            <!-- // 기획서 v1.0 수정 전 -->
          </tr>
          <tr v-if='myBrandDataCnt === 0'>
            <td colspan="6">
              <div class="result-none">
                <p>검색 결과가 없습니다.</p>
              </div>
            </td>
          </tr>
        </template>
      </brandListCmp>
      <PagingCmp :total='myBrandDataCnt' :current-page='myBrandsearchParam.page' :page-size='myBrandPageSize' @change='myBrandChangePage'  />
      <!-- // 페이지 게이션 -->
    </div>
    <!-- 등록된 브랜드가 있는 경우(대행사) : 내가 운영중인 브랜드 영역 -->
    <div class="board-main__box--roun-type agency-brand" v-if="userType === 'AGENCY' && myBrandTotal > 0">
      <PageTitleH3 titleh3="운영중인 브랜드" />
      <div class="top-ctrl-area">
        <div class="left-area num-area">
          <p class="company-ing">기업 <span>{{ corpInfo.operateCorpCnt }}</span>개</p>
          <p class="company-ing">브랜드 <span>{{ corpInfo.operateBrandCnt }}</span>개</p>
        </div>
        <div class="right-area">
          <Dropdown searchable :options="myCorpDropdownOptions" v-model='myBrandsearchParam.searchCorpId' @change='setMyBrandParams' placeholder="기업명"  />
          <Dropdown searchable :options="myBrandDropdownOptions" v-model='myBrandsearchParam.brandId' @change='setMyBrandParams' placeholder="브랜드명" />
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
          <tr v-for="(item,i) in myBrandData" :key="i">
            <td>
              <div class="brandname mybrandname">
                <div class="brand">
                  <div class="brand__mark" role="bookmark">
                    <input type="checkbox" :id="`bookmark${i}`" v-model='item.mark' @change='bookmark(item)' :checked="item.mark" >
                    <label class="brand__mark__core" :for="`bookmark${i}`"></label>
                  </div>
                  <span class="brand__title link"><router-link :to='{name: "brandDashboard", params: {brandId: item.brandId}}'>{{ item.corpNm }}</router-link></span>
                </div>
              </div>
            </td>
            <td>
              <span class="data-safety">{{ corpInfo.saftyStatus === 'SET' ? '사용':'미사용' }}</span>
            </td>
            <td class="l-align">
              <span class="data-brandname underline">{{ item.brandNm }}</span>
            </td>
            <!-- 기획서 v1.0 수정 전 (데이터 있는 부분들은 참고를 위해 삭제하지 않고 주석으로 했습니다.) -->
            <!-- <td>
              <span class="data-chat underline">{{ item.chatbotCnt }}</span>
            </td>
            <td>
              <span class="data-template underline">{{ item.tplCnt }}</span>
            </td> -->
            <!-- // 기획서 v1.0 수정 전 -->
            <!-- 기획서 v1.0 수정 후 (999개 이상일 때, 999+ 로 사용으로 인해) -->
            <td>
              <span class="data-chat underline" v-if="item.chatbotCnt >= 999">999+</span>
              <span class="data-chat underline" :class="{'underline': item.chatbotCnt > 0 }" v-else>{{ item.chatbotCnt }}</span>
            </td>
            <td>
              <span class="data-template underline" v-if="item.tplCnt >= 999">999+</span>
              <span class="data-template underline" :class="{'underline': item.tplCnt > 0 }" v-else>{{ item.tplCnt }}</span>
            </td>
            <!-- // 기획서 v1.0 수정 후 -->
            <td>
              <span class="data-send">{{ (item.messageSend)?'발송가능':'발송불가' }}</span>
            </td>
          </tr>
          <tr v-if='myBrandDataCnt === 0'>
            <td colspan="6">
              <div class="result-none">
                <p>검색 결과가 없습니다.</p>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <PagingCmp :total='myBrandDataCnt' :current-page='myBrandsearchParam.page' :page-size='myBrandPageSize' @change='myBrandChangePage'  />
    </div>
    <!-- // 등록된 브랜드가 있는 경우(대행사) : 내가 운영중인 브랜드 영역 -->
    <!-- 브랜드 개설 배너(마스터, 매니저) -->
    <div class="brand-banner__box" v-if='userType === "CORP"'>
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
    <!-- // 브랜드 개설 배너(마스터, 매니저, 대행사) -->

    <!-- 등록된 브랜드가 없는 경우(대행사) -->
    <div class="board-main__box--roun-type agency-brand" v-if="userType !== 'CORP' && !myBrandTotal">
      <div class="agency-brand_none">
        <h3>현재 개설된 브랜드의 운영권한이 필요하세요?</h3>
        <p>브랜드에게 대행사 권한을 신청합니다.<br>권한이 부여되면 RCS메시지 발송이 가능합니다.</p>
        <div class="button__wrap side-box-bottom">
          <ButtonCmp
            type="btn-blue"
            @click='openBrandAuthority'
          >
            대행사 운영권한 신청
          </ButtonCmp>
        </div>
      </div>
    </div>
    <!-- // 등록된 브랜드가 있는 경우(대행사) -->
    <!-- 내가 운영할 수 있는 브랜드 영역 -->
    <!-- 기획서 v1.0 수정 (git > 히스토리> 07.04 기업대시보드 재작업(b6c1fb3) > 07.04에 추가된 내용에서 수정했습니다.) -->
    <div class="board-main__box mymain-box cando-box" v-if="userType === 'CORP' && corpBrandTotal > 0">
      <!-- 기획서 v1.0 수정 전 (데이터 있는 부분들은 참고를 위해 삭제하지 않고 주석으로 했습니다.)-->
      <!-- <div class="page-title__wrap">
        <h3>
          내가 운영할 수 있는 브랜드<span v-if="corpBrandTotal !== null">({{ corpBrandTotal }})</span>
        </h3>
        <Dropdown searchable :options="corpBrandDropdownOptions" v-model='corpBrandsearchParam.brandId' @change='setCorpBrandParams' placeholder="브랜드명" />
      </div> -->
      <!-- // 기획서 v1.0 수정 전 -->
      <!-- 기획서 v1.0 수정 후 : PageTitleH3 컴포넌트에 totalCount와 doropdown이 추가되어 사용 (PageTitleH3 컴포넌트에 DropDataSearchable 주석처리되어 있어서 구현 안되는 상황) -->
      <PageTitleH3 titleh3="내가 운영할 수 있는 브랜드" totalCount="982" :DropDataSearchable="corpBrandDropdownOptions" />
      <brandListCmp>
        <template  slot="col">
          <col>
        </template>
        <template  slot="tbody">
          <tr v-for="(item,i) in corpBrandData" :key="i">
            <td>
              <div class="first-row">
                <div class="row-left">
                  <div class="brandname">
                    <div class="brand">
                      <div class="brand__logo">
                        <img :src="item.profileImgFileUrl" alt="">
                      </div>
                      <span class="brand__title link">{{ item.brandNm }}</span> <!-- 기획서 v1.0 수정 (이중클래스 link 추가) -->
                      <!-- 기획서 v1.0 수정 (brand__message 클래스 삭제) -->
                    </div>
                  </div>
                  <div class="manage-authority">
                    <!-- 권한신청 버튼 > 운영권한 신청 팝업 출력 -->
                    <ButtonCmp
                      v-if="! item.authority || isReject(item)"
                      type="btn-blue-line"
                      size="small"
                      @click='brandAuthority(item)'
                    >
                      권한신청
                    </ButtonCmp>
                    <span class="flag-progress" v-if="item.authority">{{ item.statusNm }}</span>
                    <span v-if="isReject(item)">{{ item.aprvRetDescr }}</span>
                  </div>
                </div>
                <div class="row-right">
                  <div class="row-box">
                    <div class="row-data">
                      <span class="data-chat underline" v-if="item.chatbotCnt >= 999">999+</span> <!-- 기획서 v1.0 수정 (999개 이상일 때, 999+ 로 사용) / git 히스토리> 07.04 기업대시보드 재작업(b6c1fb3) > 내용 중 빠진 부분 추가 -->
                      <span class="data-chat underline">{{ item.chatbotCnt }}</span>
                    </div>
                    <div class="row-data-tit">
                      <span>대화방</span>
                    </div>
                  </div>
                  <div class="row-box">
                    <div class="row-data">
                      <span class="data-template underline" v-if="item.tplCnt >= 999">999+</span> <!-- 기획서 v1.0 수정 (999개 이상일 때, 999+ 로 사용) / git 히스토리> 07.04 기업대시보드 재작업(b6c1fb3) > 내용 중 빠진 부분 추가 -->
                      <span class="data-chat underline">{{ item.tplCnt }}</span>
                    </div>
                    <div class="row-data-tit">
                      <span>템플릿</span>
                    </div>
                  </div>
                  <div class="row-box">
                    <div class="row-data">
                      <span class="data-agency underline" v-if="item.agencyCnt >= 999">999+</span> <!-- 기획서 v1.0 수정 (999개 이상일 때, 999+ 로 사용) / git 히스토리> 07.04 기업대시보드 재작업(b6c1fb3) > 내용 중 빠진 부분 추가-->
                      <span class="data-chat underline">{{ item.agencyCnt }}</span>
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
    <!-- // 기획서 v1.0 수정 (git > 히스토리> 07.04 기업대시보드 재작업(b6c1fb3) > 07.04에 추가된 내용에서 수정했습니다.) -->
    <!-- // 내가 운영할 수 있는 브랜드 영역 -->
    <!-- // 페이지 게이션 -->
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
      <brandAuthorityReq
        v-if='isBrandAuthority'
        @closeModal="isModalViewed = false, isBrandAuthority = false"
        modalsize="dashboard_modal"
      />
      <!-- // 운영권한 신청 팝업 출력 -->
    </ModalView>
    <!-- // 모달 -->
  </div>
  </div>
</template>
<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import { getMybrandList, getCorpBrandList, setFavorites, brandAuthority } from '@/api/service/corp'
import PagingCmp from '@/components/common/PagingCmp.vue'
import brandListCmp from '@/views/dashboard/components/brandListCmp.vue'
import ModalView from '@/components/common/ModalView.vue'
import uiCommon from '@/components/js/uiCommon'
import brandAuthorityReq from '@/views/dashboard/components/BrandAuthorityReq.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    brandListCmp,
    PagingCmp,
    ButtonCmp,
    Dropdown,
    PageTitleH3,
    ModalView,
    brandAuthorityReq
  },
  props: {
    corpInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isMyBrandSearch: false,
      isCorpBrandSearch: false,
      isBrandAuthority: false,
      corpId: '',
      isViewCorpApprovalStatus: false,
      myBrandsearchParam: {
        page: 1,
        limit: 5,
        offset: 0,
        corpId: '',
        searchCorpId: '',
        brandId: '',
        userId: ''
      },
      corpBrandsearchParam: {
        page: 1,
        limit: 5,
        offset: 0,
        corpId: '',
        brandId: '',
        userId: ''
      },
      myBrandTotal: 0,
      myBrandPageSize: 5,
      myBrandDropdownOptions: [],
      corpBrandTotal: 0,
      corpBrandPageSize: 5,
      corpBrandDropdownOptions: [],
      corpBrandData: [],
      myBrandData: [],
      myBrandDataCnt: 0,
      isAuthority: false,
      isModalViewed: false
    }
  },
  created() {
    this.corpId = this.$router.currentRoute.params.corpId
  },
  computed: {
    ...mapGetters({
      userType: 'userType'
    }),
    myCorpDropdownOptions () {
      return uiCommon.getDropDownCodes(this.corpInfo.dropDownCorps, 'name', 'corpId', true)
    },
    getGuideMgsClass () {
      switch (this.corpInfo.aprvRet) {
        case 'WAITING' :
          return 'document-not'
        case 'INSPECTING' :
          return 'approval-ing'
        case 'REJECTED' :
          return 'approval-reject'
        case 'OK' :
          return 'approval-done'
        default :
          return ''
      }
    },
    getIsApprovalStatus () {
      let isView = false
      if (!this.corpInfo.isViewApprovalStatus) {
        return isView
      }
      if ((this.corpInfo.aprvRet === 'OK')) {
        // 로컬 스토리지에 기업 승인 상태 배너 show 여부 조회
        if (this.getLocalStorageCorpDashboardStatus) {
          isView = false
        } else {
          isView = true
        }
        return isView
      }
      return this.corpInfo.isViewApprovalStatus
    }
  },
  mounted () {
    if (!this.getLocalStorageCorpDashboardStatus) {
      window.localStorage.getItem('isCorpDashboardStatusView', 'ok')
    }
    // 운영 중인 브랜드
    this.getMyBrandList()
    // 내기업 브랜드
    this.getCorpBrandList()
  },
  methods: {
    isReject(mgr) {
      console.log(mgr)
      return mgr.aprvRet === 'REJECTED'
    },
    getLocalStorageCorpDashboardStatus () {
      return window.localStorage.getItem('isCorpDashboardStatusView')
    },
    getMyBrandList () {
      this.myBrandsearchParam.corpId = this.corpId
      getMybrandList(this.myBrandsearchParam).then(res => {
        if (res.code === '20000000') {
          let searchList = res.result.searchList
          this.myBrandData = res.result.myBrandList
          this.myBrandTotal = parseInt(res.result.myBrandTotal)
          this.myBrandDataCnt = parseInt(res.result.count)
          // 처음 실행만
          if (this.myBrandDropdownOptions.length === 0) {
            // 10개 이상일 경우 검색 기능 페이징 기능 노출
            this.myBrandDropdownOptions = uiCommon.getDropDownCodes(searchList, 'brandNm', 'brandId', true)
            this.isMyBrandSearch = (this.myBrandDropdownOptions.length >= 10)
          }
        }
      }).catch(e => {
        this.$alertMsg(e.desc)
      })
    },
    getCorpBrandList () {
      this.corpBrandsearchParam.corpId = this.corpId
      getCorpBrandList(this.corpBrandsearchParam).then(res => {
        if (res.code === '20000000') {
          let searchList = res.result.searchList
          this.corpBrandData = res.result.corpBrandList
          this.corpBrandTotal = parseInt(res.result.corpBrandTotal)
          // 처음 실행만
          if (this.corpBrandDropdownOptions.length === 0) {
            // 10개 이상일 경우 검색 기능 페이징 기능 노출
            this.corpBrandDropdownOptions = uiCommon.getDropDownCodes(searchList, 'brandNm', 'brandId', true)
            this.isCorpBrandSearch = (this.corpBrandDropdownOptions.length >= 10)
          }
        }
      }).catch(e => {
        this.$alertMsg(e.desc)
      })
    },
    myBrandChangePage(page) {
      this.myBrandsearchParam.page = page
      this.getMyBrandList()
    },
    setMyBrandParams() {
      this.myBrandsearchParam.page = 1
      this.getMyBrandList()
    },
    corpBrandChangePage(page) {
      this.corpBrandsearchParam.page = this.corpBrandsearchParam.page = page
      this.getCorpBrandList()
    },
    setCorpBrandParams(brandId) {
      this.corpBrandsearchParam.page = 1
      this.getCorpBrandList()
    },
    bookmark(brand) {
      setFavorites({ 'corpId': this.corpId, 'brandId': brand.brandId, 'mark': brand.mark, 'userId': brand.userId }).then(res => {
        if (res.code === '20000000') {
          this.getMyBrandList()
        }
      }).catch(e => {
        this.$alertMsg(e.desc)
      })
    },
    brandAuthority(brand) {
      brand.corpId = this.corpId
      brandAuthority(brand).then(res => {
        if (res.code === '20000000') {
          this.getCorpBrandList()
        }
      }).catch(e => {
        this.$alertMsg(e.desc)
      })
    },
    openBrandAuthority() {
      this.isModalViewed = true
      this.isBrandAuthority = true
    },
    // 기획서 v1.0 수정 (브랜드 상태 화면 구현을 위해 getstatus 작업함)
    getstatus () {
      switch (this.status) {
        case '승인 요청':
          return 'request'
        case '진행중':
          return 'ing'
        case '임시저장':
          return 'ing'
        case '삭제 처리중':
          return 'ing'
        case '반려':
          return 'return'
        case '승인 완료':
          return 'done'
        default:
          return ''
      }
    }
  }
}
</script>

<style>

</style>
