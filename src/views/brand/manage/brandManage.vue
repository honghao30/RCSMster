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
              <Dropdown :options="manageDropdownOptions" v-model='manageList.formData.size' @change='manageDropdownOptionsChange' placeholder="10개씩">
              </Dropdown>
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
                <tr v-for="(item, i) in manageList.list" :key="i">
                  <td>{{ item.authority }}</td>
                  <td>{{ item.agencyNm }}</td>
                  <td class="info-right">
                    <span class="user">{{ item.mgrUserNm }}({{ item.mgrUserId }})</span>
                    <span>{{ item.email }}</span>
                    <span>/</span>
                    <span>{{ item.mblNum }}</span>
                  </td>
                  <td>
                    <div class="button__wrap" v-if="item.admYn === 'N'">
                      <ButtonCmp
                        type="btn-line small"
                        @click="deleteManage(item)"
                      >삭제</ButtonCmp>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <PagingCmp :total='manageList.totalcount' :current-page='manageList.formData.page' :page-size='manageList.formData.size' @change='manageListChangePage'  />
        </div>
        <!-- 운영권한 승인 신청 내역 -->
        <PageTitleH3 titleh3="운영권한 승인 신청 내역" />
        <!-- 테이블 상단 컨트롤 영역 공통 -->
        <div class="top-ctrl-area">
          <div class="left-area">
            <Dropdown :options="authReqDropdownOptions" v-model='authReqList.formData.size' @change='authReqDropdownOptionsChange' placeholder="10개씩">
            </Dropdown>
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
                <tr v-for="(item, i) in authReqList.list" :key="i">
                  <td class="info-right">
                    <span class="user">{{ item.userNm }}({{ item.mgrUserId }})</span>
                    <span>{{ item.mblNum }}</span>
                    <span>/</span>
                    <span>{{ item.email }}</span>
                  </td>
                  <td class="application-date">
                    <span>{{ item.reqDt }}</span>
                  </td>
                  <td>
                    <div class="button__wrap">
                      <ButtonCmp
                        type="btn-line small"
                        @click="rejectModal(item)"
                      >반려</ButtonCmp>
                      <ButtonCmp
                        type="btn-blue small"
                        @click='onAprv(item)'
                      >승인</ButtonCmp>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        <PagingCmp :total='authReqList.totalcount' :current-page='authReqList.formData.page' :page-size='authReqList.formData.size' @change='authReqListChangePage'  />
      </div>
    </div>
    <!-- 모달영역 -->
    <ModalView
    v-if="isModalViewed"
    @closeModal="isModalViewed = false"
    >
      <!-- 운영권한 신청 반려 버튼 클릭 시 -->
      <BrandAuthorityReject
        @closeModal="closeMsg()"
        @rejectFinish="rejectFinishModal"
        v-if="isModalReject"
        :rejectInfo='rejectInfo'
        modalsize="dashboard_modal"
      >
      </BrandAuthorityReject>
      <!-- // 운영권한 신청 반려 버튼 클릭 시 -->
      <!-- 브랜드 운영권한 초대 팝업 -->
      <BrandAuthorityInvite
        @closeModal="closeMsg()"
        @newMemberInvite="newMemberInviteModal"
        v-if="isBrandAuthorityInvite"
        :paramCorpId='corpId'
        :paramBrandId='brandId'
        modalsize="dashboard_modal"
      >
      </BrandAuthorityInvite>
      <!-- 브랜드 운영권한 초대 팝업 -->
      <!-- 브랜드 운영권한 초대 팝업 > 신규 회원 초대 -->
      <BrandAuthorityNewInvite
        @closeModal="closeMsg()"
        v-if="isNewMemberInvite"
        modalsize="dashboard_modal"
        :paramCorpId='corpId'
      >
      </BrandAuthorityNewInvite>
      <!-- 브랜드 운영권한 초대 팝업 > 신규 회원 초대 -->
      <!-- 모달 영역 : 대행사 운영권한 부여 모달 영역 -->
      <BrandAuthority
        v-else-if="authorityCont"
        @closeModal="closeMsg()"
      >
      </BrandAuthority>
      <!-- // 모달 영역 : 대행사 운영권한 부여 모달 영역 -->
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
        @closeModal="closeMsg()"
        v-if="isAgencyChatRoomRemove"
        modalsize="dashboard_modal"
        :manageItem='manageItem'
        @authRemove='authRemove'
        :param-corp-id='corpId'
      >
      </AgencyRemove>
      <!-- // 대행사 삭제 확인 Alert 유형 1 > 해당 대행사로 등록된 대화방이 있는 경우 대화방 삭제 안내 팝업 출력 -->
      <!-- 운영권한 신청 반려 버튼 클릭 시 > 반려 버튼 -->
      <ConfirmMsg
        @closeModal="closeMsg()"
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
  </div>
</template>

<script>

import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import ModalView from '@/components/common/ModalView.vue'
import BrandAuthority from '@/views/brand/create/components/BrandAuthority.vue'
import { retrieveBrandManageList, brandOperationAuthorityApproval, deleteManageAuth } from '@/api/service/manage'
import uiCommon from '@/components/js/uiCommon'
import ConfirmMsg from '@/views/dashboard/components/ConfirmMsg.vue'
import AgencyRemove from '@/views/dashboard/components/AgencyRemove.vue'
import BrandAuthorityReject from '@/views/dashboard/components/BrandAuthorityReject.vue'
import BrandAuthorityInvite from '@/views/dashboard/components/BrandAuthorityInvite.vue'
import BrandAuthorityNewInvite from '@/views/dashboard/components/BrandAuthorityNewInvite.vue'
import { mapGetters } from 'vuex'
import PagingCmp from '@/components/common/PagingCmp.vue'
import { operationAuthorityApproval } from '@/api/service/corp'

export default {
  components: {
    PagingCmp,
    BrandAuthorityNewInvite,
    BrandAuthorityInvite,
    BrandAuthorityReject,
    AgencyRemove,
    ConfirmMsg,
    PageTitle,
    ButtonCmp,
    PageTitleH3,
    BrandLnb,
    Dropdown,
    ModalView,
    BrandAuthority
  },
  data() {
    return {
      brandId: '',
      isModalViewed: false,
      inviteCont: false,
      authorityCont: false,
      isDirectRemove: false,
      directRemoveTxt: '',
      isAgencyChatRoomRemove: false,
      isModalReject: false,
      isRejectFinish: false,
      isBrandAuthorityInvite: false,
      isNewMemberInvite: false,
      rejectInfo: {},
      dropdownOperationManageBrand: [],
      dropdownRequsetManageBrand: [],
      manageDropdownOptions: [
        { codeNm: '10개씩', code: '10' },
        { codeNm: '20개씩', code: '20' },
        { codeNm: '30개씩', code: '30' }
      ],
      authReqDropdownOptions: [
        { codeNm: '10개씩', code: '10' },
        { codeNm: '20개씩', code: '20' },
        { codeNm: '30개씩', code: '30' }
      ],
      manageList: {
        list: [],
        formData: {
          page: 1,
          size: '10'
        },
        totalcount: 0
      },
      authReqList: {
        list: [],
        formData: {
          page: 1,
          size: '10'
        },
        totalcount: 0
      },
      manageItem: {}
    }
  },
  watch: {
  },
  computed: {
    ...mapGetters({
      corpId: 'corpId'
    })
  },
  created() {
    this.brandId = this.$router.currentRoute.params.brandId
  },
  mounted() {
    this.manageList.formData.brandId = this.$router.currentRoute.params.brandId
    this.retrieveManageList()
    this.brandOperationAuthorityApproval()
  },
  methods: {
    // 운영 권한 관리 리스트 조회
    retrieveManageList() {
      retrieveBrandManageList(this.brandId, this.manageList.formData).then(res => {
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
    brandOperationAuthorityApproval() {
      brandOperationAuthorityApproval(this.brandId, this.authReqList.formData).then(res => {
        this.authReqList.list = res.result.list
        this.authReqList.totalcount = res.result.totalSize
        if (this.dropdownRequsetManageBrand.length === 0) {
          this.dropdownRequsetManageBrand = uiCommon.getDropDownCodes(res.result.list, 'brandNm', 'brandId', true)
        }
      }).catch(err => {
        this.$alertMsg(err.desc)
      })
    },
    closeModal () {
      this.isModalViewed = false
    },
    brandInvite() {
      this.isModalViewed = true
      this.isBrandAuthorityInvite = true
    },
    brandAuthority() {
      this.isModalViewed = true
      this.authorityCont = true
      this.inviteCont = false
    },
    manageDropdownOptionsChange() {
      this.retrieveManageList()
    },
    authReqDropdownOptionsChange() {
      this.brandOperationAuthorityApproval()
    },
    manageListChangePage (page) {
      this.manageList.formData.page = page
      this.retrieveManageList()
    },
    authReqListChangePage (page) {
      this.authReqList.formData.page = page
      this.operationAuthorityApproval()
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
    rejectFinishModal () {
      this.isModalViewed = true
      this.isRejectFinish = true
      this.isModalReject = false
    },
    authRemove() {
      deleteManageAuth(this.brandId, this.manageItem.mgrUserId).then(() => {
        this.mngInit()
      }).catch(err => {
        this.$alertMsg(err.desc)
      })
    },
    newMemberInviteModal () {
      this.isModalViewed = true
      this.isNewMemberInvite = true
      this.isBrandAuthorityInvite = false
    },
    rejectModal (item) {
      this.rejectInfo = {
        brandId: item.brandId,
        brandNm: item.brandNm,
        userNm: item.userNm,
        mgrUserId: item.mgrUserId
      }
      this.isModalViewed = true
      this.isModalReject = true
      this.isRejectFinish = false
    },
    closeMsg () {
      this.isModalViewed = false
      this.isDirectRemove = false
      this.isAgencyChatRoomRemove = false
      this.isModalReject = false
      this.isRejectFinish = false
      this.inviteCont = false
      this.authorityCont = false
      this.isBrandAuthorityInvite = false
      this.isNewMemberInvite = false
    },
    // 브랜드 권한 신청 승인
    onAprv (item) {
      this.$confirmMsg('승인 하시겠습니까?').then(() => {
        let aprvData = {
          brandId: item.brandId,
          mgrUserId: item.mgrUserId,
          aprvYn: 'Y'
        }
        operationAuthorityApproval(aprvData).then(() => {
          this.$alertMsg('운영권한 신청을 승인하였습니다.').then(() => {
            // this.$emit('update:visible', false)
            // this.$emit('reject', true)
            this.getAuthReqBrandList()
          })
        }).catch(e => {
          this.$alertMsg(e.desc)
        })
      })
    }
  }
}
</script>
