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
                초대하세요
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
              <Dropdown searchable :options="dropdownOperationManageBrand" v-model='manageList.formData.brandId' @change='setManagementBrandId' placeholder="브랜드명">
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
                <tr v-for="(item,i) in manageList.list" :key="i">
                  <td>
                    <div class="brandname mybrandname">
                      <div class="brand">
                        <div class="brand__logo">
                          <img :src="item.brandLogo" alt="">
                        </div>
                        <span class="brand__title link"><router-link :to='{name: "detailBrand", params: {brandId: item.brandId}}'>{{ item.brandNm }}</router-link></span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span class="data-type">{{ item.authority }}</span>
                  </td>
                  <td class="l-align">
                    <span class="data-service">{{ item.agencyNm ? item.agencyNm : "-" }}</span>
                  </td>
                  <td class="l-align">
                    <div class="data-user">
                      <div class="data-user-name">{{ item.mgrUserNm }}</div>
                      <div class="data-user-info">
                        <span>{{ item.email }}</span>
                        <span>&nbsp;/&nbsp;</span>
                        <span>{{ item.mblNum }}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <!-- 유형: 매니저 + 삭제버튼 > 매니저 삭제 확인 Alert 출력 -->
                    <ButtonCmp
                      v-if="item.admYn === 'N'"
                      type="btn-line"
                      size="small"
                      @click="deleteManage(item)"
                    >
                    삭제
                    </ButtonCmp>
                    <!-- // 유형: 매니저 + 삭제버튼 > 매니저 삭제 확인 Alert 출력 -->
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <PagingCmp :total='manageList.totalcount' :current-page='manageList.formData.page' :page-size='manageList.formData.size' @change='manageListChangePage'  />
        </div>
        <!-- // 운영권한 관리 영역 -->
        <!-- 운영권한 승인 신청 내역 -->
        <div class="board-main__box--roun-type" v-if='authReqList.list.length > 0'>
          <PageTitleH3 titleh3="운영권한 승인 신청 내역" />
          <div class="top-ctrl-area">
            <div class="left-area">
              <Dropdown searchable :options="dropdownRequsetManageBrand" placeholder="브랜드명" v-model='authReqList.formData.brandId' @change='setAuthreqBrandId'>
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
                <tr v-for="(item,i) in authReqList.list" :key="i">
                  <td>
                    <div class="brandname mybrandname">
                      <div class="brand">
                        <div class="brand__logo">
                          <img :src="item.brandLogo" alt="">
                        </div>
                        <span class="brand__title link"><router-link :to='{name: "detailBrand", params: {brandId: item.brandId}}'>{{ item.brandNm }}</router-link></span>
                      </div>
                    </div>
                  </td>
                  <td class="l-align">
                    <div class="data-user">
                      <div class="data-user-name">{{ item.mgrUserNm }}</div>
                      <div class="data-user-info">
                        <span>{{ item.email }}</span>
                        <span>&nbsp;/&nbsp;</span>
                        <span>{{ item.mblNum }}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span class="data-service">{{ item.regDt }}</span>
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
          <PagingCmp :total='authReqList.totalcount' :current-page='authReqList.formData.page' :page-size='authReqList.formData.size' @change='authReqListChangePage'  />
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
          <!-- 매니저 대행사 권한 삭제 확인 Alert -->
          <ConfirmMsg
            @closeModal="isModalViewed = false, isDirectRemove = false"
            v-if="isDirectRemove"
            modalsize="dashboard_small_modal"
          >
          <div class="msg" slot="msg">
            <p>{{ directRemoveTxt }}</p>
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
              @click="authRemove"
            >
              삭제
            </ButtonCmp>
          </div>
          </ConfirmMsg>
          <!-- // 매니저 대행사 권한 삭제 확인 Alert -->
          <!-- 대행사 삭제 확인 Alert 유형 1 > 해당 대행사로 등록된 대화방이 있는 경우 대화방 삭제 안내 팝업 출력 -->
          <AgencyRemove
            @closeModal="isModalViewed = false, isAgencyChatRoomRemove = false"
            v-if="isAgencyChatRoomRemove"
            modalsize="dashboard_modal"
            :manageItem='manageItem'
            @authRemove='authRemove'
          >
          </AgencyRemove>
          <!-- // 대행사 삭제 확인 Alert 유형 1 > 해당 대행사로 등록된 대화방이 있는 경우 대화방 삭제 안내 팝업 출력 -->
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
import { getAllAprved } from '@/api/service/brand'
import { retrieveManageList, deleteManageAuth, operationAuthorityApproval } from '@/api/service/manage'
import uiCommon from '@/components/js/uiCommon'
import { mapActions } from 'vuex'

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
      isModalViewed: false,
      isBrandAuthorityInvite: false,
      isNewMemberInvite: false,
      isDirectRemove: false,
      directRemoveTxt: '',
      isAgencyChatRoomRemove: false,
      isModalReject: false,
      isRejectFinish: false,
      allAprved: 0,
      manageList: {
        // 권한관리 목록
        list: [],
        formData: {
          group: 'ManageList',
          page: 1,
          size: 10,
          orderValue: '',
          brandId: ''
        },
        totalcount: 0
      },
      authReqList: {
        // 작업이력 목록
        list: [],
        formData: {
          group: 'authReqList',
          page: 1,
          size: 10,
          orderValue: '',
          brandId: ''
        },
        totalcount: 0
      },
      corpId: '',
      manageItem: {},
      dropdownOperationManageBrand: [],
      dropdownRequsetManageBrand: []
    }
  },
  computed: {},
  created() {
    this.corpId = this.$router.currentRoute.params.corpId
  },
  mounted() {
    this.mngInit()
  },
  methods: {
    ...mapActions('searchcondition', {
      searchAndGo: 'searchAndGo'
    }),
    mngInit() {
      this.getAllAprved()
      this.retrieveManageList()
      this.operationAuthorityApproval()
    },
    // 초대할 브랜드가 있는지 체크
    getAllAprved() {
      getAllAprved(this.corpId).then(res => {
        this.allAprved = res.result
      }).catch(err => {
        this.$alertMsg(err.desc)
      })
    },
    // 운영 권한 관리 리스트 조회
    retrieveManageList() {
      this.searchAndGo({ searchParam: this.manageList.formData })
      retrieveManageList(this.corpId, this.manageList.formData).then(res => {
        this.manageList.list = res.result.list
        this.manageList.totalcount = res.result.totalSize
        if (this.dropdownOperationManageBrand.length === 0) {
          this.dropdownOperationManageBrand = uiCommon.getDropDownCodes(res.result.list, 'brandNm', 'brandId', true)
        }
      }).catch(err => {
        this.$alertMsg(err.desc)
      })
    },
    // 운영 권한 승인 신청 내역
    operationAuthorityApproval() {
      this.searchAndGo({ searchParam: this.authReqList.formData })
      operationAuthorityApproval(this.corpId, this.authReqList.formData)
        .then(res => {
          this.authReqList.list = res.result.list
          this.authReqList.totalcount = res.result.totalSize
          if (this.dropdownRequsetManageBrand.length === 0) {
            this.dropdownRequsetManageBrand = uiCommon.getDropDownCodes(res.result.list, 'brandNm', 'brandId', true)
          }
        })
        .catch(err => {
          this.$alertMsg(err.desc)
        })
    },
    setManagementBrandId (code) {
      this.manageList.formData.brandId = code
      this.retrieveManageList()
    },
    setAuthreqBrandId (code) {
      this.authReqList.formData.brandId = code
      this.operationAuthorityApproval()
    },
    manageListChangePage (page) {
      this.manageList.formData.page = page
      this.retrieveManageList()
    },
    authReqListChangePage (page) {
      this.authReqList.formData.page = page
      this.operationAuthorityApproval()
    },
    closeMsg () {
      this.isModalViewed = false
      this.isDirectRemove = false
      this.isAgencyChatRoomRemove = false
      this.isModalReject = false
      this.isRejectFinish = false
    },
    // 마스터 매니저 초대 버튼
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
    directRemove (item) {
      this.manageItem = item
      this.isModalViewed = true
      this.isDirectRemove = true
    },
    agencyRemove (item) {
      this.manageItem = item
      this.isModalViewed = true
      this.isAgencyChatRoomRemove = true
    },
    authRemove() {
      deleteManageAuth(this.brandId, this.manageItem.mgrUserId).then(() => {
        this.mngInit()
      }).catch(err => {
        this.$alertMsg(err.desc)
      })
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
    },
    // 브랜드 권한 삭제
    deleteManage(row) {
      if (row.userType === 'CORP') {
        // 매니저 권한 삭제
        this.directRemoveTxt = '매니저를 삭제하시겠습니까?'
      } else {
        // 대행사 권한 삭제
        this.directRemoveTxt = '대행사를 삭제하시겠습니까?'
        if (parseInt(row.chatbotCnt)) {
          this.agencyRemove(row)
          return true
        }
      }
      this.directRemove()
    }
  }
}
</script>

<style>

</style>
