<template>
  <div class="contents_wrap dashboard_wrap">
    <section class="section">
      <div class="sec_header">
        <div class="cont_flex_bundle bottom">
          <div class="title_area flex col_6" v-if="this.userInfoData.userType === 'CORP'">
            <h3 class="h3_title">브랜드 운영 현황</h3>
            <span class="h3_desc" style="padding-top:7px;">
              <em class="my_brand">총 {{this.operInfoData.operCnt}}개</em> 브랜드를 운영하고 있습니다.
            </span>
          </div>
          <div class="col_6" v-if="this.userInfoData.userType === 'AGENCY'">
            <div class="title_area inline">
              <h3 class="h3_title">브랜드 운영 현황</h3>
              <span class="h3_desc">
                <em class="my_brand">총 {{this.operInfoData.corpCnt}}개</em> 기업,
                <em class="my_brand">총 {{this.operInfoData.operCnt}}개</em> 브랜드를 운영하고 있습니다.
              </span>
            </div>
            <div class="select_area mar_t20">
              <span class="custom_select">
                <select v-model="searchParam.inputType">
                  <option value="CORP">기업명</option>
                  <option value="BRAND">브랜드명</option>
                </select>
              </span>
              <span class="custom_input col_7">
                <input type="text" v-model="searchParam.inputValue" placeholder="검색어를 입력하세요." @keypress.enter="search">
              </span>
              <a href="javascript:void(0);" class="btn sml gray" @click="search"><span>검색</span></a>
            </div>
          </div>
          <div class="btn_wrap right col_6">
            <a v-if="this.userInfoData.userType === 'CORP' && this.userInfoData.corpAdmYn === 'Y'" href="javascript:void(0);" class="btn sml bd_black type2" @click="createBrand">브랜드 개설하기</a>
            <a href="javascript:void(0);" class="btn sml bd_black type2" @click="applyPopup">브랜드 운영권한 신청</a>
            <a href="javascript:void(0);" class="btn sml bd_black type2" @click="commTplView">공통 템플릿 보기</a>
            <comm-tpl-view-popup v-if="commTplViewVisible" :commTplViewVisible.sync="commTplViewVisible"/>
            <brand-oper-auth-apply-popup v-if="visible" :visible.sync="visible" @addBrandAuth="refresh"/>
          </div>
        </div>
      </div>
      <div class="sec_body">
        <div class="box_scroll" v-if="this.userInfoData.userType === 'CORP'">
          <table class="tbl_col_type type2">
            <caption>
              <strong>브랜드 운영 현황</strong>
              <p>브랜드명, 승인일, 발신번호, 템플릿, 권한</p>
            </caption>
            <colgroup>
              <col style="width:*">
              <col style="width:190px;">
              <col style="width:145px;">
              <col style="width:145px;">
              <col style="width:100px;">
              <col style="width:100px;">
              <col style="width:140px;">
            </colgroup>
            <thead class="pad_50">
              <tr>
                <th scope="col">브랜드명</th>
                <th scope="col">승인일</th>
                <th scope="col">발신번호</th>
                <th scope="col">양방향 대화방</th>
                <th scope="col">템플릿</th>
                <th scope="col">자동응답</th>
                <th scope="col">권한</th>
              </tr>
            </thead>
            <tbody class="pad_50">
              <tr v-if="this.operInfoData.operList.length === 0">
                <td colspan="7" class="no_data">브랜드 운영 현황 내역이 없습니다.</td>
              </tr>
              <tr v-else v-for="(item, index) in this.operInfoData.operList" :key="index">
                <td>
                  <div class="img_brand">
                    <span class="img_area"><img :src="item.profileImgFileUrl" alt="이미지"></span>
                    <a href="javascript:void(0);" class="btn_text" @click="retriveBrand(item.brandId)">{{item.name}}</a>
                  </div>
                </td>
                <td>{{item.aprvDt}}</td>
                <td><a href="javascript:void(0);" class="btn_underline" @click="retriveChatbot(item.brandId)">{{item.chatbotCnt}}</a></td>
                <td><a href="javascript:void(0);" class="btn_underline" @click="retriveTwowayChatbot(item.brandId)">{{item.chatbotTwowayCnt}}</a></td>
                <td><a href="javascript:void(0);" class="btn_underline" @click="retriveTpl(item.brandId)">{{item.tplCnt}}</a></td>
                <td><a href="javascript:void(0);" class="btn_underline" @click="retriveAutoReply(item.brandId)">{{item.autoReplyCnt}}</a></td>
                <td>{{item.admAuthNm}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="box_scroll" v-if="this.userInfoData.userType === 'AGENCY'">
          <table class="tbl_col_type type2">
            <caption>
              <strong>브랜드 운영 현황</strong>
              <p>브랜드명, 승인일, 발신번호, 양방향 대화방, 템플릿, 자동응답, 기업명, 위임일</p>
            </caption>
            <colgroup>
              <col style="width:*">
              <col style="width:190px;">
              <col style="width:145px;">
              <col style="width:145px;">
              <col style="width:100px;">
              <col style="width:100px;">
              <col style="width:100px;">
              <col style="width:140px;">
            </colgroup>
            <thead class="pad_50">
              <tr>
                <th scope="col">브랜드명</th>
                <th scope="col">승인일</th>
                <th scope="col">발신번호</th>
                <th scope="col">양방향 대화방</th>
                <th scope="col">템플릿</th>
                <th scope="col">자동응답</th>
                <th scope="col">기업명</th>
                <th scope="col">위임일</th>
              </tr>
            </thead>
            <tbody class="pad_50">
              <tr v-if="this.operInfoData.operList.length === 0">
                <td colspan="8" class="no_data">브랜드 운영 현황 내역이 없습니다.</td>
              </tr>
              <tr v-for="(item, index) in this.operInfoData.operList" :key="index">
                <td>
                  <div class="img_brand">
                    <span class="img_area"><img :src="item.profileImgFileUrl" alt="이미지"></span>
                    <a href="javascript:void(0);" class="btn_text" @click="retriveBrand(item.brandId)">{{item.name}}</a>
                  </div>
                </td>
                <td>{{item.aprvRegDt}}</td>
                <td><a href="javascript:void(0);" class="btn_underline" @click="retriveChatbot(item.brandId)">{{item.chatbotCnt}}</a></td>
                <td><a href="javascript:void(0);" class="btn_underline" @click="retriveTwowayChatbot(item.brandId)">{{item.chatbotTwowayCnt}}</a></td>
                <td><a href="javascript:void(0);" class="btn_underline" @click="retriveTpl(item.brandId)">{{item.tplCnt}}</a></td>
                <td><a href="javascript:void(0);" class="btn_underline" @click="retriveAutoReply(item.brandId)">{{item.autoReplyCnt}}</a></td>
                <td>{{item.corpNm}}</td>
                <td>{{item.authorizeDt}}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <pagination v-if="operInfoData.totalSize > 5" :total="operInfoData.totalSize" :pageSize="searchParam.size" @change="changePage" :current-page.sync="searchParam.page"/>
      </div>
    </section>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import BrandOperAuthApplyPopup from '@/views/service/components/BrandOperAuthApplyPopup'
import CommTplViewPopup from '@/views/service/components/CommTplViewPopup'

import { getImageUrl } from '@/api/common/code'
import { brandOperation, brandOperationCnt } from '@/api/service/service'

export default {
  components: {
    Pagination,
    BrandOperAuthApplyPopup,
    CommTplViewPopup
  },
  props: {
    userInfoData: {
      type: Object
    }
  },
  data() {
    return {
      searchParam: {
        page: 1,
        size: 5,
        inputType: 'CORP',
        inputValue: ''
      },
      originSearchParam: null,
      operInfoData: {
        totalSize: '',
        operList: [],
        corpCnt: '',
        operCnt: ''
      },
      visible: false,
      commTplViewVisible: false
    }
  },
  created() {
    this.updateOriginSearchParam()
  },
  mounted() {
    // 브랜드 운영 현황 카운트 API 호출
    brandOperationCnt().then(res => {
      this.operInfoData.corpCnt = res.result.corpCnt
      this.operInfoData.operCnt = res.result.operCnt
    })
    // 목록 get
    brandOperation(this.originSearchParam).then(res => {
      this.operInfoData.totalSize = res.result.totalSize
      this.operInfoData.operList = res.result.operList
    })
  },
  computed: {},
  methods: {
    refresh() {
      this.$router.go()
    },
    changePage(page) {
      this.updatePageData(page)
      // 브랜드 운영 현황 API 호출
      brandOperation(this.originSearchParam).then(res => {
        this.operInfoData.totalSize = res.result.totalSize
        this.operInfoData.operList = res.result.operList
      })
    },
    retriveBrand(brandId) {
      this.$router.push({ name: 'brand/detail', params: { brandId: brandId } })
    },
    retriveChatbot(brandId) {
      this.$router.push({ name: 'SendNumList', params: { brandId: brandId } })
    },
    retriveTwowayChatbot(brandId) {
      this.$router.push({ name: 'TwowayChatbotList', params: { brandId: brandId } })
    },
    retriveTpl(brandId) {
      this.$router.push({ name: 'TemplateList', params: { brandId: brandId } })
    },
    retriveAutoReply(brandId) {
      this.$router.push({ name: 'AutoReplyList', params: { brandId: brandId } })
    },
    createBrand() {
      this.$router.push('/service/brand/open')
    },
    applyPopup() {
      this.visible = true
    },
    commTplView() {
      this.commTplViewVisible = true
    },
    search() {
      this.updatePageData(1)
      this.updateOriginSearchParam()
      this.getList()
    },
    getList() {
      // 브랜드 운영 현황 API 호출
      brandOperation(this.originSearchParam).then(res => {
        this.operInfoData.totalSize = res.result.totalSize
        this.operInfoData.operList = res.result.operList

        // 리스트 프로필 이미지 셋팅
        this.operInfoData.operList.forEach((item, index) => {
          let getImgUrlReqData = {
            fileId: item.profileImgFileId,
            fileNo: item.profileImgFileNo
          }
          getImageUrl(getImgUrlReqData).then(res => {
            this.operInfoData.operList[index].profileImgFileUrl =
              res.downloadUrl
          })
        })
      })
    },
    updatePageData(page) {
      this.searchParam.page = page
      this.originSearchParam.page = page
    },
    updateOriginSearchParam() {
      this.originSearchParam = _.cloneDeep(this.searchParam)
    }
  }
}
</script>
