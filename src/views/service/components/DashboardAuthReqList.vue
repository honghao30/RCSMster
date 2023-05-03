<template>
  <div class="contents_wrap dashboard_wrap">
    <section class="section">
      <div class="sec_header">
        <div class="title_area inline">
          <h3 class="h3_title">브랜드 운영권한 승인 요청 내역</h3>
          <span class="h3_desc">
            <em class="my_brand">{{this.operApprovalInfoData.operApprovalCnt}}건</em>접수되었습니다.
          </span>
        </div>
      </div>
      <div class="sec_body">
        <div class="box_scroll">
          <table class="tbl_col_type type2">
            <caption>
              <strong>브랜드 운영권한 승인 요청 내역</strong>
              <p>신청자, 연락처, 이메일, 브랜드, 신청일, 승인 처리</p>
            </caption>
            <colgroup>
              <col style="width:200px;">
              <col style="width:155px;">
              <col style="width:230px;">
              <col style="width:236px;">
              <col style="width:205px;">
              <col style="width:auto;">
            </colgroup>
            <thead>
              <tr>
                <th scope="col">신청자</th>
                <th scope="col">연락처</th>
                <th scope="col">이메일</th>
                <th scope="col">브랜드</th>
                <th scope="col">신청일</th>
                <th scope="col">승인 처리</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="this.operApprovalInfoData.operApprovalList.length === 0">
                <td colspan="6" class="no_data">브랜드 운영권한 승인 요청 내역이 없습니다.</td>
              </tr>
              <tr v-else v-for="(item, index) in this.operApprovalInfoData.operApprovalList" :key="index">
                <td class="left">{{item.userNm}} ({{item.mgrUserId}})</td>
                <td class="left">{{item.mblNum}}</td>
                <td class="left">{{item.email}}</td>
                <td class="left brand">{{item.name}}</td>
                <td>{{item.reqDt}}</td>
                <td>
                  <div class="btn_wrap" v-if="item.aprvRet === 'SAVED'">
                    <a href="javascript:void(0);" class="btn sml bd_black" @click="apply(item)">승인</a>
                    <a href="javascript:void(0);" class="btn sml bd_black" @click="reject(false, item.brandId, item.name, item.userNm, item.mgrUserId)">반려</a>
                  </div>
                  <div
                    class="btn_wrap"
                    v-if="item.aprvRet === 'WAITING' || item.aprvRet === 'INSPECTED'"
                  >시스템 처리중</div>
                </td>
              </tr>
              <auth-req-reject-popup v-if="visible" :visible.sync="visible" :rejectData="rejectData" @reject="reject"/>
            </tbody>
          </table>
        </div>
        <pagination
          :total="operApprovalInfoData.totalSize"
          :pageSize="operApprovalInfoData.size"
          @change="changePage"
          :current-page.sync="operApprovalInfoData.page"
          v-if="operApprovalInfoData.totalSize > 5"
        />
      </div>
    </section>
  </div>
</template>

<script>
// 스크립트를 정의하는 부분
// 개발자 작업 영역
import Pagination from '@/components/Pagination'
import AuthReqRejectPopup from '@/views/service/components/AuthReqRejectPopup'

import {
  brandOperationAuthorityApproval,
  brandOperationAuthorityApprovalCnt,
  operationAuthorityApproval
} from '@/api/service/service'

// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
export default {
  // .vue 내부에서 사용되는 model
  // model 기반으로 vue는 동작된다.
  components: {
    Pagination,
    AuthReqRejectPopup
  },
  data() {
    return {
      operApprovalInfoData: {
        page: 1,
        size: 5,
        totalSize: '',
        operApprovalList: [],
        operApprovalCnt: ''
      },
      rejectData: {},
      visible: false
    }
  },
  created() {
    // DOM이 만들어 지기 전 실행 되는 곳
    // Data를 사전에 준비할 경우 사용된다.
    this.getAuthReqList()
  },
  mounted() {
    // DOM에 해당 .vue가 들어가게 되면 실행 되는 곳
    // onload 상태와 동일하다. DOM 이후에 조작할 경우 이곳에서 수행
  },
  computed: {
    // 값이 자주 변경됨에 따라, 관련되어 데이터 혹은 view가 바뀌어야 할 경우 사용
    // method를 바로 연결하면 tic 단위로 계속 실행되기 때문에, 값이 변경할 때만 수행되고,
    // cache로 남는 computed를 활용하는 것이 성능에 좋음
  },
  methods: {
    changePage(page) {
      this.operApprovalInfoData.page = page
      this.getAuthReqList()
    },
    apply(item) {
      let applyData = {
        brandId: item.brandId,
        mgrUserId: item.mgrUserId,
        aprvRetDescr: '',
        aprvYn: 'Y'
      }
      this.$confirmMsg('승인할까요?')
        .then(() => {
          operationAuthorityApproval(applyData).then(res => {
            if (res.result && res.result.code === '69999') {
              this.$alertMsg(item.agencyNm + ' 대행사와 RCS 서비스 사용 계약을 체결해 주십시오.\n대행사와 계약이 되지 않은 경우 RCS 메시지를 발송할 수 없습니다.')
              this.getAuthReqList()
            } else {
              this.getAuthReqList()
            }
          })
        })
        .catch(() => {
          this.getAuthReqList()
        })
    },
    reject(reloadFlag, brandId, brandNm, userNm, mgrUserId) {
      if (reloadFlag) {
        // 브랜드 운영권한 승인 요청 내역 API 호출
        this.getAuthReqList()
      } else {
        this.rejectData = {
          brandId: brandId,
          brandNm: brandNm,
          userNm: userNm,
          mgrUserId: mgrUserId
        }
        this.visible = true
      }
    },
    getAuthReqList() {
      // 브랜드 운영권한 승인 요청 내역 카운트 API 호출
      brandOperationAuthorityApprovalCnt().then(res => {
        this.operApprovalInfoData.operApprovalCnt = res.result.approvalCnt
      })
      // 브랜드 운영권한 승인 요청 내역 API 호출
      let reqObj = {
        page: this.operApprovalInfoData.page,
        size: this.operApprovalInfoData.size
      }
      brandOperationAuthorityApproval(reqObj).then(res => {
        this.operApprovalInfoData.operApprovalList = res.result.operApprList
        this.operApprovalInfoData.totalSize = res.result.totalSize
      })
    }
  }
}
</script>
