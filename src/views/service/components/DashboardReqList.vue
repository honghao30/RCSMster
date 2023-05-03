<template>
  <div class="contents_wrap dashboard_wrap">
    <section class="section mar_b0">
      <div class="sec_header">
        <div class="title_area flex left" style="align-items: flex-end;">
          <h3 class="h3_title">브랜드 운영권한 신청 내역</h3>
          <span class="h3_desc">
            <em class="my_brand">{{this.operAuthInfoData.operAuthCnt}}건</em>신청하였습니다.
          </span>
        </div>
      </div>
      <div class="sec_body">
        <div class="box_scroll">
          <table class="tbl_col_type type2">
            <caption>
              <strong>브랜드 운영권한 신청 내역</strong>
              <p>브랜드, 신청일, 승인 담당자, 담당자 연락처, 승인 결과</p>
            </caption>
            <colgroup>
              <col style="width:350px;">
              <col style="width:155px;">
              <col style="width:120px;">
              <col style="width:260px;">
              <col style="width:auto;">
            </colgroup>
            <thead class="pad_50">
              <tr>
                <th scope="col">브랜드</th>
                <th scope="col">신청일</th>
                <th scope="col">승인 담당자</th>
                <th scope="col">담당자 연락처</th>
                <th scope="col">승인 결과</th>
              </tr>
            </thead>
            <tbody class="pad_50">
              <tr v-if="this.operAuthInfoData.operAuthList.length === 0">
                <td colspan="6" class="no_data">브랜드 운영권한 신청 내역이 없습니다.</td>
              </tr>
              <tr v-else v-for="(item, index) in this.operAuthInfoData.operAuthList" :key="index">
                <td class="brand">{{item.name}}</td>
                <td>{{item.aprvReqDt}}</td>
                <td>{{item.userNm}}</td>
                <td>{{addHyphenTelNum(item.mblNum)}}</td>
                <td>
                  <p v-if ="item.aprvRet !== 'SAVED'">
                    {{item.aprvDt}}
                    {{item.aprvRetNm}} <span v-if = "item.aprvRet === 'REJECTED'">({{item.aprvRetDescr}}) </span>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <pagination
          :total="operAuthInfoData.totalSize"
          :pageSize="operAuthInfoData.size"
          @change="changePage"
          :current-page.sync="operAuthInfoData.page"
          v-if="operAuthInfoData.totalSize > 5"
        />
      </div>
    </section>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import {
  brandOperationAuthority,
  brandOperationAuthorityCnt
} from '@/api/service/service'
import { addHyphenTelNum } from '@/utils/textUtil'

export default {
  components: {
    Pagination
  },
  data() {
    return {
      operAuthInfoData: {
        page: 1,
        size: 5,
        totalSize: '',
        operAuthList: [],
        operAuthCnt: ''
      }
    }
  },
  created() {
    brandOperationAuthorityCnt().then(res => {
      this.operAuthInfoData.operAuthCnt = res.result.operAuthCnt
    })
    // 브랜드 운영권한 신청 내역 API 호출
    let reqObj = {
      page: this.operAuthInfoData.page,
      size: this.operAuthInfoData.size
    }
    brandOperationAuthority(reqObj).then(res => {
      this.operAuthInfoData.operAuthList = res.result.operAuthList
      this.operAuthInfoData.totalSize = res.result.totalSize
    })
  },
  methods: {
    addHyphenTelNum,
    changePage(page) {
      // 브랜드 운영권한 신청 내역 API 호출
      let reqObj = {
        page: page,
        size: this.operAuthInfoData.size
      }
      brandOperationAuthority(reqObj).then(res => {
        this.operAuthInfoData.operAuthList = res.result.operAuthList
        this.operAuthInfoData.totalSize = res.result.totalSize
      })
    }
  }
}
</script>
