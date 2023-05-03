<template>
  <div class="rcs_container service_wrap">
    <article id="content" class="content">
      <!-- 대시보드 > 운영중인 브랜드가 없는경우(기업 관리자) -->
      <no-brand-admin v-if="this.userInfo.userType === 'CORP' && this.userInfo.corpAdmYn === 'Y' && this.corpInfo.brandOperYn === 'N'" :corpInfoData="this.corpInfo"/>
      <!-- 대시보드 > 운영중인 브랜드가 없는경우(기업 담당자) -->
      <no-brand-manager v-else-if="this.userInfo.userType === 'CORP' && this.userInfo.corpAdmYn === 'N' && this.corpInfo.brandOperYn === 'N'" :corpInfoData="this.corpInfo"/>
      <!-- 대시보드 > 운영중인 브랜드가 없는경우(대행사) -->
      <no-brand-agency v-else-if="this.userInfo.userType === 'AGENCY' && this.corpInfo.brandOperYn === 'N'" :corpInfoData="this.corpInfo"/>

      <!-- 대시보드 > 기업정보 > 운영중인 브랜드가 있는경우, userType, corpAdmYn 넘겨서 구분 -->
      <dashboard-corp-info v-if="this.corpInfo.brandOperYn === 'Y'" :userInfoData="this.userInfo" :corpInfoData="this.corpInfo"/>
      <!-- 대시보드 > 진행중인 승인 내역 > 운영중인 브랜드가 있는경우, userType, corpAdmYn 넘겨서 구분 -->
      <dashboard-apply-list v-if="this.corpInfo.brandOperYn === 'Y'" :userInfoData="this.userInfo"/>
      <!-- 대시보드 > 브랜드 운영 현황 > 운영중인 브랜드가 있는경우, userType, corpAdmYn 넘겨서 구분 -->
      <dashboard-status-list v-if="this.corpInfo.brandOperYn === 'Y'" :userInfoData="this.userInfo"/>

      <!-- 대시보드 > 브랜드 운영권한 승인 요청 내역 > 운영중인 브랜드가 있는경우, 기업관리자만 해당 리스트 출력 -->
      <!-- 19.11.12 요청 - 내역이 0건인 경우 비노출 -->
      <dashboard-auth-req-list v-if="this.userInfo.userType === 'CORP' && this.userInfo.corpAdmYn === 'Y' && this.corpInfo.brandOperYn === 'Y' && authReqListFlag"/>
      <!-- 대시보드 > 브랜드 운영권한 신청 내역 > 운영중인 브랜드가 있는경우, userType, corpAdmYn 넘겨서 구분 -->
      <!-- 19.11.12 요청 - 내역이 0건인 경우 비노출 -->
      <dashboard-req-list v-if="this.corpInfo.brandOperYn === 'Y' && reqListFlag"/>
    </article>
  </div>
</template>

<script>
// 스크립트를 정의하는 부분
// 개발자 작업 영역
import NoBrandAdmin from '@/views/service/components/NoBrandAdmin'
import NoBrandManager from '@/views/service/components/NoBrandManager'
import NoBrandAgency from '@/views/service/components/NoBrandAgency'
import DashboardCorpInfo from '@/views/service/components/DashboardCorpInfo'
import DashboardApplyList from '@/views/service/components/DashboardApplyList'
import DashboardStatusList from '@/views/service/components/DashboardStatusList'
import DashboardAuthReqList from '@/views/service/components/DashboardAuthReqList'
import DashboardReqList from '@/views/service/components/DashboardReqList'

import store from '@/store'
import {
  getUserInfo,
  brandOperationAuthorityApprovalCnt,
  brandOperationAuthorityCnt
} from '@/api/service/service'

// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
export default {
  // .vue 내부에서 사용되는 model
  // model 기반으로 vue는 동작된다.
  components: {
    NoBrandAdmin,
    NoBrandManager,
    NoBrandAgency,
    DashboardCorpInfo,
    DashboardApplyList,
    DashboardStatusList,
    DashboardAuthReqList,
    DashboardReqList
  },

  data() {
    return {
      userInfo: {
        userType: '',
        corpId: '',
        corpAdmYn: ''
      },
      corpInfo: {
        name: '', // 기업명
        corpId: '', // 기업ID
        aprvReqDt: '', // 등록일
        brandOperYn: '', // 브랜드 개설 여부
        reqCorpAdmYn: '', // 관리자 신청 여부(담당자)
        status: '',
        aprvStatus: ''
      },
      authReqListCheck: false,
      reqListCheck: false
    }
  },
  created() {
    // DOM이 만들어 지기 전 실행 되는 곳
    // Data를 사전에 준비할 경우 사용된다.
    store.dispatch('getUserInfo').then(userInfo => {
      this.userInfo.userType = userInfo.userType
      this.userInfo.corpId = userInfo.corpId
      this.userInfo.corpAdmYn = userInfo.corpAdmYn
      this.getUserInfo()
      // 브랜드 운영권한 승인 요청 내역 카운트 API 호출
      brandOperationAuthorityApprovalCnt().then(res => {
        this.authReqListCheck = res.result.approvalCnt > 0
      })
      // 브랜드 운영권한 신청 내역 카운트 API 호출
      brandOperationAuthorityCnt().then(res => {
        this.reqListCheck = res.result.operAuthCnt > 0
      })
    })
  },
  mounted() {
    // DOM에 해당 .vue가 들어가게 되면 실행 되는 곳
    // onload 상태와 동일하다. DOM 이후에 조작할 경우 이곳에서 수행
  },
  computed: {
    // 값이 자주 변경됨에 따라, 관련되어 데이터 혹은 view가 바뀌어야 할 경우 사용
    // method를 바로 연결하면 tic 단위로 계속 실행되기 때문에, 값이 변경할 때만 수행되고,
    // cache로 남는 computed를 활용하는 것이 성능에 좋음
    authReqListFlag() {
      return this.authReqListCheck
    },
    reqListFlag() {
      return this.reqListCheck
    }
  },
  methods: {
    getUserInfo() {
      let reqData = {
        userType: this.userInfo.userType,
        corpId: this.userInfo.corpId
      }
      getUserInfo(reqData).then(res => {
        this.corpInfo.name = res.result.name
        this.corpInfo.corpId = res.result.corpId
        this.corpInfo.aprvReqDt = res.result.aprvReqDt
          ? res.result.aprvReqDt
          : ' '
        this.corpInfo.brandOperYn = res.result.brandOperYn
        this.corpInfo.reqCorpAdmYn = res.result.reqCorpAdmYn
        this.corpInfo.status = res.result.status
        this.corpInfo.aprvStatus = res.result.aprvStatus
      })
    }
  }
}
</script>
