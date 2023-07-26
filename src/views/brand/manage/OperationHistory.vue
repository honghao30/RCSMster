<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="작업 히스토리" />
        <div class="top-ctrl-area">
          <div>
            <p>총 <strong>{{ brandHistoryData.totalSize }}</strong>건</p>  <!-- 기획서 v1.0 수정 소팅 결과 소팅 건수 추가 -->
          </div>
          <div class="right-area">
            <Dropdown :options="dropdownManageBrandType" v-model='brandHistoryData.formData.workType' @change='changeWorktype' placeholder="유형" />
            <Dropdown :options="dropdownManageBrandStatus" v-model='brandHistoryData.formData.histType' @change='changeHisttype' placeholder="상태" />
          </div>
        </div>
        <div class="table__wrap notice-table">
          <table class="table table-list">
            <colgroup>
              <col width="15%">
              <col width="15%">
              <col>
              <col>
              <col width="15%">
              <col width="10%">
            </colgroup>
            <thead>
              <tr>
                <th scope="col"><span>업데이트일</span></th>
                <th scope="col"><span>유형</span></th>
                <th scope="col"><span>내용</span></th> <!-- 기획서 v1.0 수정 -->
                <th scope="col"><span>상태</span></th>
                <th scope="col"><span>담당자</span></th>
                <th scope="col"><span>수정방식</span></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, i) in brandHistoryData.list" :key="i"
              >
                <td>
                  {{ item.updateDt }}
                </td>
                <td>
                  {{ item.workTypeNm }}
                </td>
                <td>
                  {{ item.modCtn }}
                </td>
                <td>
                  {{ item.histTypeNm }}
                  <p v-if="item.statusReason" class="more-detail">{{ item.statusReason }}</p>
                </td>
                <td>
                  {{ item.userId }}
                  <p v-if="item.agencyNm" class="more-detail">{{ item.agencyNm }}</p>
                </td>
                <td>
                  {{ item.chType }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- 1차 디자인 수정 -->
        <!-- <div class="button__wrap" v-if="checkList.length > 0">
          <ButtonCmp
            type="btn-blue-line"
          >사용</ButtonCmp>
          <ButtonCmp
            type="btn-blue-line"
          >미사용</ButtonCmp>
          <ButtonCmp
            type="btn-blue-line"
          >삭제</ButtonCmp>
        </div> -->
        <PagingCmp :total='brandHistoryData.totalCount' :current-page='brandHistoryData.formData.page' :page-size='brandHistoryData.formData.size' @change='changeHistPage' />
      </div>
    </div>
  </div>
</template>

<script>

import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import PagingCmp from '@/components/common/PagingCmp.vue'
import uiCommon from '@/components/js/uiCommon'
import { retrieveBrandHistList } from '@/api/service/service'

export default {
  components: {
    PageTitle,
    BrandLnb,
    // ButtonCmp,
    Dropdown,
    PagingCmp
  },
  data() {
    return {
      initTotal: 0,
      userType: '',
      corpAdmYn: '',
      dropdownManageBrandHistory: [],
      dropdownManageBrandStatus: [],
      dropdownManageBrandType: [
        { codeNm: '대화방', code: 'CHATBOT' },
        { codeNm: '간편챗봇', code: 'AUTO_REPLY' },
        { codeNm: '템플릿', code: 'TPL' },
        { codeNm: '운영자', code: 'BRAND_OPER_AUTH_CORP' },
        { codeNm: '대행사', code: 'BRAND_OPER_AUTH_AGENCY' }
      ],
      brandHistoryData: {
        list: [],
        totalSize: 0,
        formData: {
          userType: '',
          corpAdmYn: '',
          workType: '',
          histType: '',
          page: 1,
          size: 10,
          brandId: this.brandId
        }
      }
    }
  },
  computed: {
    brandId () {
      return this.$router.currentRoute.params.brandId
    }
  },
  created() {},
  mounted() {
    this.getBrandHistList()
  },
  methods: {
    getBrandHistList () {
      retrieveBrandHistList(this.brandId, this.brandHistoryData.formData).then((res) => {
        this.brandHistoryData.list = res.result.list
        this.brandHistoryData.totalSize = res.result.totalSize
        if (this.initTotal === 0) {
          this.initTotal = res.result.totalSize
        }
      }).catch(e => {
        this.$alertMsg(e.desc)
      })
    },
    labelStatus(status) {
      if (status === 'done') {
        return 'done'
      }
      if (status === 'reject') {
        return 'reject'
      }
    },
    changeWorktype(type) {
      let arr = []
      switch (type) {
        case 'CHATBOT' :
          arr = [
            { typeNm: '임시저장', typeId: 'SAVED' },
            { typeNm: '등록', typeId: 'REG' },
            { typeNm: '수정', typeId: 'MOD' },
            { typeNm: '삭제', typeId: 'DEL' }
          ]
          this.dropdownManageBrandStatus = uiCommon.getDropDownCodes(arr, 'typeNm', 'typeId', true)
          break
        case 'AUTO_REPLY' :
          arr = [
            { typeNm: '임시저장', typeId: 'SAVED' },
            { typeNm: '등록', typeId: 'REG' },
            { typeNm: '수정', typeId: 'MOD' },
            { typeNm: '삭제', typeId: 'DEL' }
          ]
          this.dropdownManageBrandStatus = uiCommon.getDropDownCodes(arr, 'typeNm', 'typeId', true)
          break
        case 'CHATBOT_TWOWAY' :
          arr = [
            { typeNm: '등록', typeId: 'REG' },
            { typeNm: '수정', typeId: 'MOD' },
            { typeNm: '삭제', typeId: 'DEL' }
          ]
          this.dropdownManageBrandStatus = uiCommon.getDropDownCodes(arr, 'typeNm', 'typeId', true)
          break
        case 'LAYOUT' :
          arr = [
            { typeNm: '가입', typeId: 'JOIN' },
            { typeNm: '수정', typeId: 'MOD' },
            { typeNm: '초대', typeId: 'INVITE' },
            { typeNm: '탈퇴', typeId: 'LEAVED' }
          ]
          this.dropdownManageBrandStatus = uiCommon.getDropDownCodes(arr, 'typeNm', 'typeId', true)
          break
        case 'TPL' :
          arr = [
            { typeNm: '가입', typeId: 'JOIN' },
            { typeNm: '수정', typeId: 'MOD' },
            { typeNm: '초대', typeId: 'INVITE' },
            { typeNm: '탈퇴', typeId: 'LEAVED' }
          ]
          this.dropdownManageBrandStatus = uiCommon.getDropDownCodes(arr, 'typeNm', 'typeId', true)
          break
        case 'BRAND_OPER_AUTH_CORP' :
          arr = [
            { typeNm: '추가', typeId: 'MGR_ADD' },
            { typeNm: '삭제', typeId: 'MGR_DEL' },
            { typeNm: '초대', typeId: 'INVITE' }
          ]
          this.dropdownManageBrandStatus = uiCommon.getDropDownCodes(arr, 'typeNm', 'typeId', true)
          break
        case 'BRAND_OPER_AUTH_AGENCY' :
          arr = [
            { typeNm: '추가', typeId: 'AGENCY_ADD' },
            { typeNm: '삭제', typeId: 'AGENCY_DEL' }
          ]
          this.dropdownManageBrandStatus = uiCommon.getDropDownCodes(arr, 'typeNm', 'typeId', true)
          break
      }
    },
    changeHisttype() {
      this.getBrandHistList()
    },
    changeHistPage(page) {
      this.brandHistoryData.formData.page = page
      this.getBrandHistList()
    }
  }
}
</script>
