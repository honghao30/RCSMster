<template>
  <div class="rcs_container service_wrap">
    <article id="content" class="content">
      <div class="box_breadcrumb">
        <breadcrumb :depth1MenuId="'M0200'" :depth2MenuId="'M0201'" :depth3MenuId="'자동응답 관리'"/>
      </div>
      <!-- 브랜드 상단 -->
      <brand-top active="autoReply" :brandId="brandId"></brand-top>
      <div class="contents_wrap callerid_wrap">
        <div class="box_search_area mar_b30">
          <div class="cont_flex_bundle">
            <span class="custom_select mid col_3">
              <select v-model="formData.aprvRet">
                <option value>상태 전체</option>
                <option value="OK">등록완료</option>
                <option value="SAVED">저장</option>
                <option value="WAITING">처리중</option>
              </select>
            </span>
            <span class="custom_select mid col_3">
              <select v-model="formData.inputType">
                <option value="name">자동응답 명</option>
                <option value="armId">자동응답 ID</option>
              </select>
            </span>
            <!-- 2021.09.27 RBC고도화수정2 -->
            <span class="custom_input mid col_11 search_btn">
              <input type="text" placeholder="검색어 입력" v-model="formData.inputValue" @keypress.enter="search">
              <a href="javascript:void(0);" class="btn sml" @click="search"><span>검색</span></a>
            </span>
          </div>
        </div>
        <div class="search_result">
          <div class="cont_flex_bundle">
            <div class="total_area eft col_6">
              <span class="total_count">
                총
                <strong class="count">{{ totalcount }}</strong> 건
              </span>
              <span class="custom_select sml">
                <select v-model="formData.size" @change="changeSize">
                  <option value="20">20개</option>
                  <option value="50">50개</option>
                  <option value="100">100개</option>
                </select>
              </span>
            </div>
            <div class="btn_wrap right col_6">
              <span class="group">
                <a href="javascript:void(0);" class="btn sml bd_black type2" @click="goAutoReplyUnit">
                  <span>자동응답 등록</span>
                </a>
              </span>
            </div>
          </div>
          <div class="box_scroll mar_t20">
            <!-- 2021.09.27 RBC고도화수정1 -->
            <div class="tbl_sorting_wrap relative">
              <el-table :data="authReplyList" style="width: 100%" :empty-text="emptyText" @sort-change="handleSortChange">
                <el-table-column prop="no" label="번호" width="85" :formatter="convertToNumber"></el-table-column>
                <el-table-column prop="armId" label="자동응답  ID" width="210"></el-table-column>
                <el-table-column prop="name" align="left" label="자동응답 명" width="335">
                  <template slot-scope="scope">
                    <router-link
                      :to="{name: 'AutoReplyInfo',params: { brandId: brandId, armId: scope.row.armId }}"
                    >
                      <span class="underline">{{scope.row.name}}</span>
                    </router-link>
                  </template>
                </el-table-column>
                <el-table-column prop="tplNm" align="left" label="상품명" width="210"></el-table-column>
                <el-table-column prop="regUserNm" label="등록자" width="140"></el-table-column>
                <el-table-column prop="modDt" label="등록일"  sortable="custom" width="145" :formatter="formatterDateAndBlank"></el-table-column>
                <el-table-column prop="aprvRetNm" label="상태" width="155">
                  <template slot-scope="scope">
                    <template v-if="scope.row.aprvRet === 'OK'">
                      <a href="javascript:void(0);" class="status accept" @click="showTwowayPopup(scope.row)">{{scope.row.aprvRetNm}}</a>
                    </template>
                    <template v-else><span class="status">{{scope.row.aprvRetNm}}</span></template>
                  </template>
                </el-table-column>
              </el-table>
              <!-- 2021.09.27 RBC고도화수정3 -->
              <div class="pos_rType01">
                <button class="icon_info">회신번호</button>
                <span class="message pos_r">
                  등록완료된 자동응답은 대화방 메뉴를 바로 선택하여 지정할 수 있습니다.<br>
                  * ‘<span class="text_blue">등록완료</span>’를 클릭하여 선택해 주세요.
                </span>
              </div>
              <!-- // 2021.09.27 RBC고도화수정3 -->
            </div>
          </div>
          <pagination v-if="authReplyList.length > 0" :total="totalcount" @change="changePage" :current-page.sync="formData.page" :pageSize="formData.size"/>
        </div>
      </div>
    </article>

    <twoway-search-popup v-if="isShowTwowayPopup"
      :brandId="brandId"
      :visible.sync="isShowTwowayPopup"
    />
  </div>
</template>

<script>
import Breadcrumb from '@/components/global/Breadcrumb'
import BrandTop from '@/views/service/components/BrandTop'
import Pagination from '@/components/Pagination'
import TwowaySearchPopup from '@/views/service/components/TwowaySearchPopup'
import { retireveAutoReplyList } from '@/api/service/autoReply'

export default {
  name: 'AutoReplyListOld',
  data() {
    return {
      brandId: '',
      userCd: '',
      formData: {
        aprvRet: '',
        inputType: 'name',
        inputValue: '',
        orderKey: 'MOD_DT ',
        orderValue: 'ASC',
        page: 1,
        size: 20
      },
      originFormData: null,
      authReplyList: [],
      totalcount: 0,
      totalFullCount: 0,
      isShowTwowayPopup: false
    }
  },
  components: {
    Breadcrumb,
    BrandTop,
    Pagination,
    TwowaySearchPopup
  },
  computed: {
    emptyText() {
      let txt = ''
      if (this.totalFullCount === '0') {
        txt = '등록된 자동응답이 없습니다.'
      } else {
        txt = '검색 결과가 없습니다.'
      }
      return txt
    }
  },
  beforeRouteLeave (to, from, next) {
    this.$store.dispatch('searchcondition/searchAndGo', { searchParam: this.formData })
    next()
  },
  created() {
    this.userCd = this.$store.state.user.userCd
    this.brandId = this.$route.params.brandId
  },
  mounted() {
    this.formData = this.$store.getters['searchcondition/getSearchCondition'](this.formData)
    this.updateOriginFormData()
    this.retireveAutoReplyList()
  },
  methods: {
    init() {
      this.retireveAutoReplyList()
    },
    search() {
      this.updatePageData(1)
      this.updateOriginFormData()
      this.retireveAutoReplyList()
    },
    changePage(page) {
      this.updatePageData(page)
      this.retireveAutoReplyList()
    },
    changeSize() {
      this.originFormData.size = this.formData.size
      this.updatePageData(1)
      this.retireveAutoReplyList()
    },
    formatterDateAndBlank(row, column, cellValue, index) {
      return jglib.isEmpty(cellValue) ? '-' : jglib.convertDateFormat(cellValue, 'YYYY-MM-DD')
    },
    handleSortChange(sort) {
      this.originFormData.orderKey = jglib.convertCamelcaseToSnakecase(sort.prop)
      this.originFormData.orderValue = sort.order === 'ascending' ? 'ASC' : 'DESC'
      this.retireveAutoReplyList()
    },
    retireveAutoReplyList() {
      this.$store.dispatch('searchcondition/searchAndGo', { searchParam: this.formData })
      retireveAutoReplyList(this.brandId, this.originFormData)
        .then(res => {
          this.authReplyList = res.result.autoReplyList
          this.totalcount = res.result.totalSize
          this.totalFullCount = res.result.totalFullCount
        })
        .catch(err => {
          this.$alertMsg(err.desc)
        })
    },
    convertToNumber(row, column, cellValue, index) {
      return parseInt(cellValue)
    },
    goAutoReplyUnit() {
      this.$router.push({
        name: 'CreateAutoReplyUnit',
        params: { brandId: this.brandId }
      })
    },
    goDetail(row) {
      let router = {
        name: 'AutoReplyInfo',
        params: { brandId: this.brandId, armId: row.armId }
      }
      this.$router.push(router)
    },
    showTwowayPopup(row) {
      this.isShowTwowayPopup = true
    },
    updatePageData(page) {
      this.formData.page = page
      this.originFormData.page = page
    },
    updateOriginFormData() {
      this.originFormData = JSON.parse(JSON.stringify(this.formData))
    }
  }
}
</script>
