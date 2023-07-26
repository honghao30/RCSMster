<template>
  <div class="dashboard__wrap">
    <div class="dashboard__wrap--inner">
        <!-- <DashBaordLnb /> -->
        <DashBoardMain :corpInfo="corpInfo" />
        <DashBoardSide :corpInfo="corpInfo" />
    </div>
  </div>
</template>

<script>
// import DashBaordLnb from '@/views/dashboard/components/lnb'
import DashBoardMain from '@/views/dashboard/components/dashBoardMain'
import DashBoardSide from '@/views/dashboard/components/sideCont'

import store from '@/store'

import {
  getCorpInfo
} from '@/api/service/service'

export default {
  components: {
    // DashBaordLnb,
    DashBoardMain,
    DashBoardSide
  },
  data() {
    return {
      userInfo: {
        userType: '',
        corpId: '',
        corpAdmYn: '',
        userId: ''
      },
      corpInfo: {
        name: '', // 기업명
        corpId: '', // 기업ID
        aprvReqDt: '', // 등록일
        brandOperYn: '', // 브랜드 개설 여부
        reqCorpAdmYn: '', // 관리자 신청 여부(담당자)
        status: '',
        aprvStatus: '',
        aprvRet: '',
        isViewApprovalStatus: false,
        aprvRetDescr: '',
        corpApprovalStatusTit: '',
        corpApprovalStatusTxt: '',
        regDt: '',
        viewKisa: false,
        seasons: [],
        operateBrandCnt: 0,
        operateCorpCnt: 0,
        dropDownCorps: []
      }
    }
  },
  created() {
    // this.userInfo.userId =
    // DOM이 만들어 지기 전 실행 되는 곳
    // Data를 사전에 준비할 경우 사용된다.
  },
  mounted() {
    // DOM에 해당 .vue가 들어가게 되면 실행 되는 곳
    // onload 상태와 동일하다. DOM 이후에 조작할 경우 이곳에서 수행
    this.getCorpInfo()
  },
  computed: {
    // 값이 자주 변경됨에 따라, 관련되어 데이터 혹은 view가 바뀌어야 할 경우 사용
    // method를 바로 연결하면 tic 단위로 계속 실행되기 때문에, 값이 변경할 때만 수행되고,
    // cache로 남는 computed를 활용하는 것이 성능에 좋음
    // authReqListFlag() {
    //   return this.authReqListCheck
    // },
    // reqListFlag() {
    //   return this.reqListCheck
    // }
  },
  methods: {
    getCorpInfo() {
      let reqData = {
        corpId: this.$router.currentRoute.params.corpId
      }
      getCorpInfo(reqData).then(res => {
        this.corpInfo.name = res.result.name
        this.corpInfo.corpId = res.result.corpId
        this.corpInfo.aprvReqDt = res.result.aprvReqDt
          ? res.result.aprvReqDt
          : ' '
        this.corpInfo.brandOperYn = res.result.brandOperYn
        this.corpInfo.reqCorpAdmYn = res.result.reqCorpAdmYn
        this.corpInfo.status = res.result.status
        this.corpInfo.aprvStatus = res.result.aprvStatus
        this.corpInfo.aprvRet = res.result.aprvRet
        this.corpInfo.isViewApprovalStatus = res.result.isViewApprovalStatus
        this.corpInfo.aprvRetDescr = res.result.aprvRetDescr
        this.corpInfo.corpApprovalStatusTit = res.result.corpApprovalStatusTit
        this.corpInfo.corpApprovalStatusTxt = res.result.corpApprovalStatusTxt
        this.corpInfo.regDt = res.result.regDt
        this.corpInfo.viewKisa = res.result.viewKisa
        this.corpInfo.seasons = res.result.seasons
        this.corpInfo.operateBrandCnt = res.result.operateBrandCnt
        this.corpInfo.operateCorpCnt = res.result.operateCorpCnt
        this.corpInfo.dropDownCorps = res.result.corps
      })
    }
  }
}
</script>

<style>
</style>
