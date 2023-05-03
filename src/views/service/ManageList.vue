<template>
  <div class="rcs_container service_wrap">
    <article id="content" class="content">
      <div class="box_breadcrumb">
        <breadcrumb :depth1MenuId="'M0200'" :depth2MenuId="'M0201'" :depth3MenuId="'운영 관리'"/>
      </div>
      <brand-top active="mng" :brandId="brandId"></brand-top>
      <div class="contents_wrap">
        <section class="section mar_b0">
          <div class="sec_header">
            <div class="cont_flex_bundle">
              <div class="title_area col_6">
                <h3 class="h3_title">권한관리</h3>
              </div>
              <div class="btn_wrap right col_6" v-if="allAprved != null && isBrandMgr">
                <a v-if="isAdm" href="javascript:void(0);" class="btn sml bd_black type2" @click="addAgency">대행사 권한 추가</a>
                <a v-if="isAdm" href="javascript:void(0);" class="btn sml bd_black type2" @click="addManage">부관리자 권한 추가</a>
                <manage-add-popup
                  v-if="view.visibleAddPopup"
                  :visible.sync="view.visibleAddPopup"
                  :brandId="brandId"
                  :userType="userType"
                  @addManageAuth="refresh"
                ></manage-add-popup>
              </div>
            </div>
          </div>
          <div class="sec_body">
            <div class="box_scroll mar_t20">
              <div class="tbl_sorting_wrap">
                <el-table :data="manageList.list" style="width: 100%" :class="{'el-table--enable-row-transition': manageList.list.length >= 100}">
                  <el-table-column prop="authority" label="권한" width="110"></el-table-column>
                  <el-table-column prop="agencyNm" label="대행사명(제공서비스)" width="auto">
                    <template v-slot:default="scope">
                      {{ scope.row.agencyNm }}<br>
                      {{ scope.row.rcsSvc ? (scope.row.rcsSvc.includes('chat') ? '(A2P & 양방향)' : '(A2P)') : '' }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="mgrUserNm" label="운영자" width="110">
                    <template v-slot:default="scope">{{scope.row.userType === "AGENCY" ? '-' : scope.row.mgrUserNm}}</template>
                  </el-table-column>
                  <el-table-column prop="mgrUserId" label="아이디" width="150"></el-table-column>
                  <el-table-column prop="corpTelNum" label="연락처" width="170">
                    <template v-slot:default="scope">
                      {{ scope.row.corpTelNum ? prettyMbl(null, null, scope.row.corpTelNum, null) : '' }}{{ scope.row.corpTelNum && scope.row.corpTelExt ? `(${scope.row.corpTelExt})` : '' }}</template>
                  </el-table-column>
                  <el-table-column prop="email" label="이메일" width="230"/>
                  <el-table-column prop="email" label="상태" width="140">
                    <template v-slot:default="scope">{{ getMgrStatus(scope.row.aprvRet) }}</template>
                  </el-table-column>
                  <el-table-column prop="email" label width="140" v-if="isBrandMgr">
                    <template v-slot:default="scope">
                      <div class="left">
                        <div class="cont_flex_bundle">
                          <div class="btn_wrap col_4 right">
                            <a href="javascript:void(0);" v-if="isMngYn(scope.row, true) && scope.row.aprvRet === 'OK'" @click="setAuthManage(scope.row)" class="btn sml bd_black" style="width:100px">
                              권한위임
                            </a>
                            <a href="javascript:void(0);" v-if="isMngYn(scope.row, false) && scope.row.aprvRet === 'OK'" @click="deleteManage(scope.row)" class="btn sml bd_black" style="width:100px">
                              삭제
                            </a>
                          </div>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </section>
        <section class="section mar_b0 mar_t50">
          <div class="sec_header">
            <div class="cont_flex_bundle">
              <div class="title_area col_6">
                <h3 class="h3_title">작업이력</h3>
              </div>
              <div class="select_area right col_6">
                <span class="custom_select">
                  <select v-model="historyList.formData.chType">
                    <option value>채널 전체</option>
                    <option value="PORTAL">포털</option>
                    <option value="API">API</option>
                  </select>
                </span>
              </div>
            </div>
          </div>
          <div class="sec_body">
            <div class="box_scroll mar_t20">
              <div class="tbl_sorting_wrap">
                <el-table :data="historyList.list" style="width: 100%">
                  <el-table-column type="index" label="번호" width="100">
                    <template v-slot:default="scope"><div>{{rownum(scope.$index)}}</div></template>
                  </el-table-column>
                  <el-table-column prop="chType" label="채널" width="120"></el-table-column>
                  <el-table-column prop="workTypeNm" label="구분" width="140"></el-table-column>
                  <el-table-column prop="modCtn" label="변경내역" width="540" align="left"/>
                  <el-table-column prop="regUserNm" label="작업자" width="180"></el-table-column>
                  <el-table-column prop="regDt" label="작업일시" sortable width="200"></el-table-column>
                </el-table>
              </div>
            </div>
            <pagination
              v-if="historyList.list.length > 0"
              :total="historyList.totalcount"
              @change="changeHistoryPage"
              :current-page.sync="historyList.formData.page"
            />
          </div>
        </section>
        <manage-delegation-popup
          v-if="view.visibleDelegatePopup"
          :visible.sync="view.visibleDelegatePopup"
          :options="delegationPopupOption"
          @delegateAuth="goDashboard"
        ></manage-delegation-popup>
      </div>
    </article>
  </div>
</template>
<script>
import BrandTop from '@/views/service/components/BrandTop'
import Pagination from '@/components/Pagination'
import ManageAddPopup from '@/views/service/components/ManageAddPopup'
import ManageDelegationPopup from '@/views/service/components/ManageDelegationPopup'
import Breadcrumb from '@/components/global/Breadcrumb'
import { getAllAprved } from '@/api/service/approvalBrand'
import {
  retrieveManageList,
  retrieveHistoryList,
  deleteManageAuth
} from '@/api/service/manage'
import store from '@/store'

export default {
  name: 'ManageList',
  components: {
    BrandTop,
    Pagination,
    ManageAddPopup,
    ManageDelegationPopup,
    Breadcrumb
  },
  data() {
    return {
      brandId: '',
      userType: 'CORP',
      allAprved: null,
      manageList: {
        // 권한관리 목록
        list: []
      },
      historyList: {
        // 작업이력 목록
        list: [],
        formData: {
          group: 'ManageList',
          page: 1,
          size: 10,
          chType: '',
          orderValue: ''
        },
        totalcount: 0
      },
      view: { visibleAddPopup: false, visibleDelegatePopup: false },
      delegationPopupOption: {}
    }
  },
  computed: {
    isAdm() {
      return true
    },
    isBrandMgr() {
      return window.localStorage.getItem('brandMgrId') === window.localStorage.getItem('userId')
    }
  },
  watch: {
    'historyList.formData.chType'() {
      this.retrieveHistoryList()
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('searchcondition/searchAndGo', { searchParam: this.historyList.formData })
    next()
  },
  created() {
    this.brandId = this.$route.params.brandId
  },
  mounted() {
    this.historyList.formData = this.$store.getters['searchcondition/getSearchCondition'](this.historyList.formData)
    if (this.isBrandMgr) this.init()
    else this.$alertMsg('브랜드 관리자가 아닙니다.')
  },
  methods: {
    init() {
      this.getAllAprved()
      this.retrieveManageList()
      this.retrieveHistoryList()
    },
    getAllAprved() {
      getAllAprved(this.brandId).then(res => {
        this.allAprved = res.result
      }).catch(err => {
        this.$alertMsg(err.desc)
      })
    },
    retrieveManageList() {
      retrieveManageList(this.brandId).then(res => {
        this.manageList.list = res.result
      }).catch(err => {
        this.$alertMsg(err.desc)
      })
    },
    retrieveHistoryList() {
      this.$store.dispatch('searchcondition/searchAndGo', { searchParam: this.historyList.formData })
      retrieveHistoryList(this.brandId, this.historyList.formData)
        .then(res => {
          this.historyList.list = res.result.list
          this.historyList.totalcount = res.result.totalSize
        })
        .catch(err => {
          this.$alertMsg(err.desc)
        })
    },
    changeHistoryPage(page) {
      this.historyList.formData.page = page
      this.retrieveHistoryList()
    },
    isMngYn(row, boolType) {
      if (boolType) {
        // true인 경우에는 권한위임 관련 버튼 View
        return row.admYn === 'Y'
      } else {
        // false인 경우에는 삭제 관련 버튼 View
        if (row.status === 'DEL_WAIT') {
          return false
        } else if (row.aprvRet === 'SAVED') {
          return false
        } else if (row.admYn === 'Y') {
          return false
        } else {
          return true
        }
      }
    },
    addAgency() {
      this.userType = 'AGENCY'
      this.view.visibleAddPopup = true
    },
    addManage() {
      this.userType = 'CORP'
      this.view.visibleAddPopup = true
    },
    setAuthManage(row) {
      this.delegationPopupOption = {
        brandId: this.brandId,
        mgrUserId: row.mgrUserId
      }
      this.view.visibleDelegatePopup = true
    },
    deleteManage(row) {
      if (row.chatbotCnt > 0) {
        this.$alertMsg('해당 대행사로 등록된 양방향 대화방이 있습니다.<br>양방향 대화방의 대행사 변경 후 삭제 가능 합니다.')
        return
      }
      this.$confirmMsg(`${row.authority} 권한을 삭제할까요?`)
        .then(() => {
          deleteManageAuth(this.brandId, row.mgrUserId)
            .then(() => {
              this.refresh()
            })
            .catch(err => {
              this.$alertMsg(err.desc)
            })
        })
    },
    prettyMbl(row, column, cellValue, index) {
      if (jglib.isEmpty(cellValue)) {
        return ''
      }
      return jglib.mobileNumConverter(cellValue)
    },
    refresh() {
      this.init()
      window.scrollTo(0, 0)
    },
    getMgrStatus(aprvRet) {
      return aprvRet === 'OK' ? '정상' : '시스템 처리 중'
    },
    rownum(idx) {
      let page = this.historyList.formData.page
      let psize = this.historyList.formData.size
      let total = this.historyList.totalcount

      let num = total - (psize * (page - 1) + idx)
      return num
    },
    goDashboard() {
      store.dispatch('GetBrand', { brandId: this.brandId, refresh: true }).finally(
        this.$router.push(`/service/dashboard`)
      )
    }
  }
}
</script>
