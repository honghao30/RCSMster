<template>
  <div>
    <div class="title_area mar_t40 mar_b20">
      <h3 class="h3_title">접속이력</h3>
      <ul class="bullet_list fs18">
        <li v-if="historyInfoData.totalSize > 0">담당자 접속 이력입니다.</li>
        <li v-else>담당자 접속 이력이 없습니다.</li>
      </ul>
    </div>
    <table class="tbl_row_type">
        <caption>
          <strong>접속 이력</strong>
        </caption>
        <colgroup>
          <col style="width:230px">
          <col style="width:auto">
        </colgroup>
        <tbody>
          <tr v-for="history in historyInfoList" :key="history.loginDt">
            <th scope="row">{{history.loginDt}}</th>
            <td><span>{{history.userNm}}({{history.mblNum}}) 접속</span></td>
          </tr>
        </tbody>
      </table>
    <!-- <el-table v-if="historyInfoData.totalSize > 0" :data="historyInfoList" row-class-name="tbl_row_type" :header-row-style="{display: 'none'}" style="width: 100%; border-top: 1px solid #ccc; border-bottom: 1px solid #ccc;">
      <el-table-column prop="loginDt" width="300"></el-table-column>
      <el-table-column prop="loginId" align="left" width="auto">
        <template slot-scope="scope">{{scope.row.userNm}}({{scope.row.mblNum}}) 접속</template>
      </el-table-column>
    </el-table> -->
    <pagination
      :total="historyInfoData.totalSize"
      :pageSize="historyInfoData.size"
      @change="changePage"
      :current-page.sync="historyInfoData.page"
      v-if="historyInfoData.totalSize > 0"
    />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import { loginHist } from '@/api/common/login'

export default {
  components: {
    Pagination
  },
  props: {},
  data() {
    return {
      historyInfoData: {
        page: 1,
        size: 5,
        totalSize: ''
      },
      historyInfoList: []
    }
  },
  created() {
    this.getLoginHist()
  },
  mounted() {},
  computed: {},
  methods: {
    // 페이지 변경시 호출
    changePage(page) {
      // 진행 중인 승인 내역 조회 API(page, size, orderKey, orderValue, aprvStatus, serviceType, brandId, reqYn)
      this.historyInfoData.page = page
      this.getLoginHist()
    },
    getLoginHist() {
      // 승인결과알림 카운트 API
      loginHist(this.historyInfoData).then(res => {
        this.historyInfoList = []
        this.historyInfoList = res.result.historyInfoList
        this.historyInfoData.totalSize = res.result.totalSize
      })
    }
  }
}
</script>
