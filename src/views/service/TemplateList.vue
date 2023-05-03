<template>
  <div class="rcs_container service_wrap">
    <article id="content" class="content">
      <div class="box_breadcrumb">
        <breadcrumb :depth1MenuId="'M0200'" :depth2MenuId="'M0201'" :depth3MenuId="'템플릿 관리'"/>
      </div>
      <brand-top active="template" :brandId="brandId"></brand-top>
      <div class="contents_wrap callerid_wrap">
        <section class="section mar_b0">
          <div class="sec_header">
            <!-- 등록 안내 문구는 리스트에서 제외하고 등록화면에서 노출 -->
            <!-- <ul class="bullet_list fs18 mar_b30"> -->
              <!-- <li>서술(description)/스타일(cell) 템플릿은 메시지 내용에 대한 운영자 승인 완료 후에 발송할 수 있습니다.</li> -->
              <!-- <li>템플릿 작성 완료 후 [승인요청] 버튼을 클릭하면 승인대기 상태로 변경됩니다. (승인대기 중 템플릿 변경 불가)</li> -->
            <!-- </ul> -->
            <!-- as-is: 검색 조건  -->
            <!-- <div class="box_search_area mar_b30">
              <div class="cont_flex_bundle">
                <div class="filter_bundle col_4">
                  <strong class="tit_bundle">테마</strong>
                  <div class="cont_bundle">
                    <span class="custom_select full_width">
                      <select v-model="formData.tplThema" @change="selectTheme()">
                        <option value>전체</option>
                        <option v-for="code in view.tplThemaList" :key="`tplThema-${code.code}`" :value="code.code">{{code.codeNm}}</option>
                      </select>
                    </span>
                  </div>
                </div>
                <div class="filter_bundle col_4">
                  <strong class="tit_bundle">속성</strong>
                  <div class="cont_bundle">
                    <span class="custom_select full_width">
                      <select v-model="formData.cardType">
                        <option value>전체</option>
                        <option value="D">서술(description)</option>
                        <option value="C">스타일(cell)</option>
                        <option value="F">프리(free)</option>
                      </select>
                    </span>
                  </div>
                </div>
                <div class="filter_bundle col_4">
                  <strong class="tit_bundle">유형</strong>
                  <div class="cont_bundle">
                    <span class="custom_select full_width">
                      <select v-model="formData.tplBizSrv" v-if="formData.tplThema === 'LEGACY'">
                        <option value="">전체</option>
                        <option v-for="code in view.tplBizSrvLegacyList" :key="`tplBizSrv-${code.code}`" :value="code.code">{{code.codeNm}}</option>
                      </select>
                      <select v-model="formData.tplBizSrv" v-else-if="formData.tplThema === 'THEME'" disabled>
                        <option value="TA001">타이틀 자유형</option>
                        <option v-for="code in view.tplBizSrvThemeList" :key="`tplBizSrv-${code.code}`" :value="view.tplBizSrvThemeList">{{ code.codeNm }}</option>
                      </select>
                      <select v-model="formData.tplBizSrv" v-else-if="formData.tplBizSrv === 'IMGTPL'" disabled>
                        <option value="IMGTPL">-</option>
                        <option v-for="code in view.tplBizSrvThemeList" :key="`tplBizSrv-${code.code}`" :value="view.tplBizSrvThemeList">{{ code.codeNm }}</option>
                      </select>
                      <select v-model="formData.tplBizSrv" v-else>
                        <option value="">전체</option>
                        <option v-for="code in view.tplBizSrvList" :key="`tplBizSrv-${code.code}`" :value="code.code">{{code.codeNm}}</option>
                      </select>
                    </span>
                  </div>
                </div>
                <div class="filter_bundle col_4">
                  <strong class="tit_bundle">상태</strong>
                  <div class="cont_bundle">
                    <span class="custom_select full_width">
                      <select v-model="formData.aprvRet">
                        <option value>전체</option>
                        <option v-for="code in view.aprvRetList" :key="`aprvRet-${code.code}`" :value="code.code">
                          {{ code.codeNmAlt2 != null ? code.codeNmAlt2 : code.codeNm }}
                        </option>
                      </select>
                    </span>
                  </div>
                </div>
              </div>
              <div class="cont_flex_bundle mar_t20">
                <div class="filter_bundle col_4">
                  <strong class="tit_bundle">검색어</strong>
                  <div class="cont_bundle">
                    <span class="custom_select full_width">
                      <select v-model="formData.inputType">
                        <option value="tplNm">템플릿명</option>
                        <option value="tplId">템플릿 ID</option>
                        <option value="regUserNm">등록자</option>
                      </select>
                    </span>
                  </div>
                </div>
                <div class="filter_bundle col_8">
                  <span class="custom_input full_width mar_l12">
                    <input type="text" placeholder="검색어 입력" v-model="formData.inputValue" @keypress.enter="search">
                  </span>
                  <a href="javascript:void(0);" class="btn sml gray col_1" @click="search"><span>검색</span></a>
                </div>
              </div>
            </div> -->
            <!-- to-be 검색 조건 -->
            <div class="box_search_area mar_b30">
              <div class="cont_flex_bundle">
                <span class="custom_select col_3">
                  <select v-model="formData.aprvRet">
                    <option value>상태 전체</option>
                    <option v-for="code in view.aprvRetList" :key="`aprvRet-${code.code}`" :value="code.code">
                    {{ code.codeNmAlt2 != null ? code.codeNmAlt2 : code.codeNm }}
                    </option>
                  </select>
                </span>
                <span class="custom_select col_4">
                  <select v-model="formData.tplThema" @change="selectTheme()">
                    <option value>템플릿유형 전체</option>
                    <option v-for="code in view.tplThemaList" :key="`tplThema-${code.code}`" :value="code.code">{{code.codeNm}}</option>
                     </select>
                </span>
                <span class="custom_select col_3">
                  <select v-model="formData.tplBizSrv" v-if="formData.tplThema === 'LEGACY' || formData.tplThema === 'THEME'">
                    <option value="">옵션 전체</option>
                    <option v-for="(code, idx) in view.tplTexOptList" :key="idx" :value="code.code">{{code.codeNm}}</option>
                  </select>
                  <select v-model="formData.tplBizSrv" v-else-if="isImageTemplate">
                    <option value="">옵션 전체</option>
                    <option v-for="(code, idx) in view.tplImgOptList" :key="idx" :value="code.code">{{ code.codeNm }}</option>
                  </select>
                  <select v-model="formData.tplBizSrv" v-else>
                    <option value="">옵션 전체</option>
                    <option v-for="(code, idx) in view.tplOptList" :key="idx" :value="code.code">{{code.codeNm}}</option>
                  </select>
                </span>
                <div class="custom_date col_4">
                  <div class="date_picker">
                    <el-date-picker align="center" v-model="formData.searchDate" type="daterange" placeholder="등록일(수정일) 전체" format="yyyyMMdd" value-format="yyyyMMdd" :editable="false"
                      :default-value="[new Date(defCalendar.start.year, defCalendar.start.mon, 1), new Date(defCalendar.end.year, defCalendar.end.mon, 1)]"/>
                  </div>
                </div>
                <div class="filter_bundle col_6">
                  <span class="custom_input full_width mar_l12">
                    <input type="text" placeholder="검색어 입력" v-model="formData.inputValue" @keypress.enter="search">
                  </span>
                  <a href="javascript:void(0);" class="btn sml gray col_1" @click="search"><span>검색</span></a>
                </div>
              </div>
            </div>

            <div class="cont_flex_bundle">
              <div class="total_area eft col_6">
                <span class="total_count">총 <strong class="count">{{ totalcount }}</strong> 건</span>
                <span class="custom_select sml">
                  <select v-model="formData.size" @change="changeSize">
                    <option value="20">20개</option>
                    <option value="50">50개</option>
                    <option value="100">100개</option>
                  </select>
                </span>
              </div>
              <div class="btn_wrap right col_6">
                <!-- <a href="javascript:void(0);" style="width:100px" class="btn sml bd_black type2" @click="goCreateTemplateUnit">개별등록</a> -->
                <a href="javascript:void(0);" style="width:100px" class="btn sml bd_black type2" @click="goCreateTemplateUnitPopup">개별등록</a>
                <!-- <create-template-unit-popup
                  v-if="createTemplateUnitPopupVisible"
                  :createTemplateUnitPopupVisible.sync="createTemplateUnitPopupVisible"
                  :brandId.sync="brandId"
                  @tplThemeTypeToTemplateList="tplThemeTypeFromPopup"
                /> -->
                <a href="javascript:void(0);" class="btn sml bd_black type2" @click="goCreateTemplateBulk">대량등록</a>
              </div>
            </div>
          </div>
          <div class="sec_body">
            <div class="box_scroll mar_t20">
              <div class="tbl_sorting_wrap">
                <el-table :data="templateList" style="width: 100%" empty-text="검색 결과가 없습니다." @sort-change="handleSortChange" :class="{'el-table--enable-row-transition': templateList.length >= 100}">
                  <!-- <el-table-column type="index" label="번호" width="100">
                    <template v-slot:default="scope"><div v-if="scope.row.cardType !== 'F'">{{rownum(scope.$index)}}</div></template>
                  </el-table-column>-->
                  <el-table-column prop="regDt" label="등록일(수정일)" sortable="custom" width="170" :formatter="formatterDateAndBlank"/>
                  <el-table-column prop="tplNm" label="템플릿명">
                    <template v-slot:default="scope">
                        <a href="javascript:void(0);" class="btn_text" @click="goDetail(scope.row)">{{scope.row.tplNm}}</a>
                    </template>
                  </el-table-column>
                  <el-table-column label="템플릿유형" width="180">
                    <template v-slot:default="scope">
                      {{ getThemeTypeName(scope.row) }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="cardTypeNm" label="옵션" width="140">
                    <template v-slot:default="scope">
                      {{ scope.row.cardType === 'F' ? '기본(free)' : (scope.row.cardTypeNmAlt1 ? scope.row.cardTypeNmAlt1 : scope.row.cardTypeNm) }}
                    </template>
                  </el-table-column>
                  <el-table-column prop="aprvRet" label="상태" width="120">
                    <template v-slot:default="scope">
                      <span v-if="scope.row.cardType === 'F'">-</span>
                      <span v-else class="status" :class="{'accept': scope.row.aprvRet === 'OK', 'refusal': scope.row.aprvRet === 'REJECTED'}">{{ getDisplayAprvNm2(scope.row) }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="regUserNm" label="등록자" width="120" :formatter="formatterBlank"></el-table-column>
                </el-table>
              </div>
            </div>
            <pagination v-if="templateList.length > 0" :total="totalcount" @change="changePage" :current-page.sync="formData.page" :pageSize="formData.size"/>
          </div>
        </section>
      </div>
    </article>
    <!-- <create-template-unit-popup
                  v-if="createTemplateUnitPopupVisible"
                  :createTemplateUnitPopupVisible.sync="createTemplateUnitPopupVisible"
                  :brandId.sync="brandId"
                  @tplThemeTypeToTemplateList="tplThemeTypeFromPopup"
    /> -->
  </div>
</template>

<script>
import BrandTop from '@/views/service/components/BrandTop'
import Pagination from '@/components/Pagination'
import { retireveTemplateList } from '@/api/service/template'
import { retrieveCommonCode } from '@/api/common/code'
import Breadcrumb from '@/components/global/Breadcrumb'
import { getDisplayAprvNm2 } from '@/utils/string'
import imgTplUtils from '@/components/imageTemplate/js/imageTemplateUtils'

// import CreateTemplateUnitPopup from '@/views/service/components/CreateTemplateUnitPopup'
// 옵션 코드정보
const textTemplateOptions = [
  { code: 'D', codeNm: '서술(Description)' },
  { code: 'C', codeNm: '스타일(Cell)' }
  // { code: 'F', codeNm: '프리(Free)' }
]

export default {
  name: 'TemplateList',
  components: {
    BrandTop,
    Pagination,
    Breadcrumb
    // CreateTemplateUnitPopup
  },
  data() {
    return {
      group: 'TemplateList',
      brandId: '',
      userCd: '',
      formData: {
        group: 'TemplateList',
        cardType: '',
        aprvRet: '',
        tplBizSrv: '',
        inputType: 'tplNm',
        inputValue: '',
        orderKey: 'REG_DT',
        orderValue: 'DESC',
        page: 1,
        size: 20,
        tplThema: '',
        bgn: '', // 시작일
        end: '', // 종료일
        searchDate: ''
      },
      originFormData: null,
      view: {
        // tplBizSrvList: [],
        // tplBizSrvLegacyList: [],
        // tplBizSrvThemeList: [],
        tplOptList: [], // 전체 템플릿 옵션
        tplTexOptList: [], // 텍스트 템플릿 옵션
        tplImgOptList: [], // 이미지 템플릿 옵션
        aprvRetList: [],
        tplThemaList: []
      },
      templateList: [],
      totalcount: 0,
      createTemplateUnitPopupVisible: false,
      tplThemeType: {},
      defCalendar: { // (검색) 캘린더 default 날짜 지정
        start: { year: 0, mon: 0 },
        end: { year: 0, mon: 0 }
      }
    }
  },
  computed: {
    isNotSearch() {
      return this.formData.cardType === '' && this.formData.aprvRet === '' && this.formData.tplBizSrv === '' && this.formData.inputValue === ''
    },
    isImageTemplate() {
      return this.formData.tplThema === 'HIM' || this.formData.tplThema === 'HIT' || this.formData.tplThema === 'TBN' || this.formData.tplThema === 'SNS'
    }
  },
  watch: {
    'formData.searchDate': {
      deep: true,
      handler(data) {
        this.formData.bgn = data ? data[0] : null
        this.formData.end = data ? data[1] : null
      }
    }
  },
  beforeRouteLeave (to, from, next) {
    if (to.name === 'ImageTemplateDetail') {
      this.$store.dispatch('setThemeType', { theme: this.tplThemeType.theme, type: this.tplThemeType.type })
    }
    this.$store.dispatch('searchcondition/searchAndGo', { searchParam: this.formData })
    next()
  },
  created() {
    this.userCd = this.$store.state.user.userCd
    this.brandId = this.$route.params.brandId
  },
  mounted() {
    this.formData = this.$store.getters['searchcondition/getSearchCondition'](this.formData)
    this.tplThemeType = JSON.parse(localStorage.getItem('themeTypeInfo')) || {}
    this.updateOriginFormData()
    this.init()
  },
  methods: {
    getDisplayAprvNm2,
    init() {
      // (as-is 코드 정보)
      // retrieveCommonCode('TPL_BIZ_SRV', null, null, 100).then(res => {
      //   this.view.tplBizSrvList = res.result
      //   this.view.tplBizSrvThemeList = res.result.filter(i => { return i.code === 'TA001' })
      //   this.view.tplBizSrvLegacyList = res.result.filter(i => { return i.code !== 'TA001' })
      // })
      // (to-be 코드 정보: 순서대로 들어가도록 소스내에서 작업)
      this.view.tplTexOptList = textTemplateOptions
      this.view.tplImgOptList = imgTplUtils.getTypes().map(x => { return { code: x.subType, codeNm: x.typeNm, theme: x.theme } })
      this.view.tplOptList = [...this.view.tplTexOptList, ...this.view.tplImgOptList]
      retrieveCommonCode('TPL_THEME', null, null, 100).then(res => {
        this.view.tplThemaList = res.result
      })
      retrieveCommonCode('CHATBOT_APRV_RET_FRT1').then(res => {
        this.view.aprvRetList = res.result
      })
      this.retireveTemplateList()
      this.setDefaultCalendar()
    },
    search() {
      this.updatePageData(1)
      this.updateOriginFormData()
      this.retireveTemplateList()
    },
    retireveTemplateList() {
      this.$store.dispatch('searchcondition/searchAndGo', { searchParam: this.formData })
      retireveTemplateList(this.brandId, this.originFormData)
        .then(res => {
          // free가 항상 위로 올라와야 하므로 나누어 넣는다
          let templateList = res.result.templateList.filter(r => r.cardType === 'F')
          let otherList = res.result.templateList.filter(r => r.cardType !== 'F')
          this.templateList = templateList.concat(otherList)
          this.totalcount = res.result.totalSize
        })
        .catch(err => {
          this.$alertMsg(err.desc)
        })
    },
    formatterBlank(row, column, cellValue, index) {
      return jglib.isEmpty(cellValue) ? '-' : cellValue
    },
    formatterDateAndBlank(row, column, cellValue, index) {
      return jglib.isEmpty(cellValue) ? '-' : jglib.convertDateFormat(cellValue, 'YYYY-MM-DD')
    },
    changeSize() {
      this.originFormData.size = this.formData.size
      this.updatePageData(1)
      this.retireveTemplateList()
    },
    changePage(page) {
      this.updatePageData(page)
      this.retireveTemplateList()
    },
    handleSortChange(sort) {
      this.originFormData.orderKey = jglib.convertCamelcaseToSnakecase(sort.prop)
      this.originFormData.orderValue = sort.order === 'ascending' ? 'ASC' : 'DESC'
      this.retireveTemplateList()
    },
    goCreateTemplateUnit() {
      this.$router.push({
        name: 'CreateTemplateUnit',
        params: { brandId: this.brandId, tplThemeType: this.tplThemeType }
      })
    },
    goCreateTemplateBulk() {
      this.$router.push({
        name: 'CreateTemplateBulk',
        params: { brandId: this.brandId }
      })
    },
    goCreateTemplateUnitPopup() {
      this.$router.push({
        name: 'CreateTemplateUnitSelectTheme',
        params: { brandId: this.brandId }
      })
    },
    goDetail(row) {
      this.setTplThemeType(row.tplFormId)
      let routerName = imgTplUtils.isImageTemplate(this.tplThemeType.theme) ? 'ImageTemplateDetail' : 'TemplateDetail'
      let router = {
        name: routerName,
        params: { brandId: this.brandId, tplId: row.tplId }
      }
      if (row.cardType === 'F') {
        router = {
          name: 'TemplateFree',
          params: { brandId: this.brandId, tplId: row.tplId, theme: this.tplThemeType.theme }
        }
      }
      this.$router.push(router)
    },
    // tplFormId로 템플릿의 테마와 유형을 구분함
    setTplThemeType(tplFormId) {
      let theme, type
      if (tplFormId.startsWith('IT')) { // 이미지 템플릿의 경우
        theme = tplFormId.substring(2, 5)
        type = tplFormId.substring(5, 6)
      } else {
        theme = tplFormId.startsWith('TA') ? 'TA' : 'LE'
        type = tplFormId.slice(-1)
      }
      this.tplThemeType = { theme: theme, type: type }
    },
    getThemeTypeName(data) {
      const productCd = data.productCd
      if (productCd === 'I') {
        const theme = data.cardType.substring(0, 3)
        const type = data.cardType.substring(3)
        return imgTplUtils.getThemeTypeName(theme, type).themeNm
      } else if (productCd === 'T') {
        if (data.tplBizCate === 'TA') {
          return '타이틀 자유형'
        }
        return '타이틀 선택형'
      }
    },
    selectTheme() {
      if (this.isImageTemplate) {
        this.view.tplImgOptList = imgTplUtils.getTypes(this.formData.tplThema).map(x => { return { code: x.type, codeNm: x.typeNm, theme: x.theme } })
      }
      this.formData.tplBizSrv = ''
    },
    // (as-is, 테마변경시 동작)
    // selectTheme() {
    //   if (this.formData.tplThema === 'THEME') {
    //     this.formData.tplBizSrv = 'TA001'
    //   } else {
    //     this.formData.tplBizSrv = ''
    //   }
    // },
    commTplView() {
      this.createTemplateUnitPopupVisible = true
    },
    // 팝업에서 받아온 템플릿 선택 정보
    tplThemeTypeFromPopup (data) {
      this.tplThemeType = data
      // 팝업에서 받아온 type값을 잘라내는 작업
      this.tplThemeType.type = this.tplThemeType.type.slice(-1)
      // 템플릿 등록에서 변경하기 할 때 값을 불러와야 하기 때문에 store에 브랜드아이디와, 템플릿 테마, 타입을 넣어야 함.
      // SET_CREATE_TPL, SET_BRAND_ID_FOR_CREATE_TPL 로 팝업에서 등록 했고,
      // getCreateTpl, getBrandId 로 가져올수 있음
      // 팝업에서 받아온 템플릿 테마 선택 값을 템플릿 등록 페이지로 전달, 이동.
      this.$router.push({
        name: 'CreateTemplateUnit',
        params: { brandId: this.brandId, tplThemeType: this.tplThemeType }
      })
    },
    updatePageData(page) {
      this.formData.page = page
      this.originFormData.page = page
    },
    updateOriginFormData () {
      this.originFormData = _.cloneDeep(this.formData) // JSON.parse(JSON.stringify(this.formData))
    },
    setDefaultCalendar() {
      let curMon = new Date()
      const prevMon = new Date()
      prevMon.setMonth(curMon.getMonth() - 1)
      this.defCalendar.start.year = prevMon.getFullYear()
      this.defCalendar.start.mon = prevMon.getMonth()
      this.defCalendar.end.year = curMon.getFullYear()
      this.defCalendar.end.mon = curMon.getMonth()
    }
  }
}
</script>
