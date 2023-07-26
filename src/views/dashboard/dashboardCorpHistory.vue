<template>
  <!-- 운영 히스토리 : 마스터/매니저/대행사 운영 권한 별 노출 항목 다름(노출 Case 정의 참고) -->
  <div class="dashboard__wrap">
    <div class="dashboard__wrap--inner">
      <div class="dashBoard-main__content manage_history">
        <!-- 운영권한 관리 영역 -->
        <div class="board-main__box--roun-type">
          <PageTitleH3 titleh3="운영권한 관리" />
          <div class="top-ctrl-area">
            <div class="left-area">
              <Dropdown searchable :options="dropdownManageBrandHistory" v-if='initTotal > 10' v-model='corpHistoryData.formData.brandId' @change='changeBrand' placeholder="브랜드명" class="large-dropdown">
              </Dropdown>
              <div class="totalnum-box"><span class="totalnum">{{ corpHistoryData.totalCount }}</span>건</div>
            </div>
            <div class="right-area">
              <Dropdown :options="dropdownManageBrandType" v-if='initTotal > 10' v-model='corpHistoryData.formData.workType' @change='changeWorktype' placeholder="유형">
              </Dropdown>
              <Dropdown :options="dropdownManageBrandStatus" v-if='initTotal > 10' v-model='corpHistoryData.formData.histType' @change='changeHisttype' placeholder="상태">
              </Dropdown>
            </div>
          </div>
          <div class="table__wrap">
            <table class="table table-list">
              <thead>
                <tr>
                  <th scope="col" width="173px"><span>업데이트일</span></th>
                  <th scope="col" width="253px"><span>브랜드</span></th>
                  <th scope="col" width="133px"><span>유형</span></th>
                  <th scope="col" width="319px"><span>내용</span></th>
                  <th scope="col" width="233px"><span>상태</span></th>
                  <th scope="col" width="173px"><span>담당자</span></th>
                  <th scope="col" width="92px"><span>수정방식</span></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,i) in corpHistoryData.list" :key="i">
                  <td>
                    <span class="data-update">{{ item.updateDt }}</span>
                  </td>
                  <td class="l-align">
                    <div class="data-side">
                      <span class="data-brand-ing" v-if="item.isBrandActive">운영중</span>
                      <span class="data-brand">{{ item.brandNm }}</span>
                    </div>
                  </td>
                  <td>
                    <span class="data-type">{{ item.workTypeNm }}</span>
                  </td>
                  <td class="l-align">
                    <div class="data-flex">
                      <span class="data-content" v-if='item.histType === "INVITE"'>
                        <span>{{ item.modCtn.replace(',', '</br>') }}</span>
                      </span>
                      <span class="data-content" v-else>
                        <span>{{ item.modCtn }}</span>
                      </span>
                    </div>
                  </td>
                  <td class="l-align">
                    <div class="data-flex">
                      <span>{{ item.histTypeNm }}</span>
                      <span class="data-status-reason">{{ item.statusReason }}</span>
                    </div>
                  </td>
                  <td>
                    <div class="data-flex">
                      <span class="data-manager">{{ item.userId }}</span>
                      <span class="data-angency">{{ item.agencyNm }}</span>
                    </div>
                  </td>
                  <td>
                    <span class="data-modify">{{ item.chType }}</span>
                  </td>
                </tr>
                <!-- 검색결과 없을 때 -->
                <tr v-if='corpHistoryData.totalCount === 0'>
                  <td colspan="7">
                    <div class="result-none">
                      <p>검색결과가 없습니다.</p>
                    </div>
                  </td>
                </tr>
                <!-- // 검색결과 없을 때 -->
              </tbody>
            </table>
          </div>
          <PagingCmp :total='corpHistoryData.totalCount' :current-page='corpHistoryData.formData.page' :page-size='corpHistoryData.formData.size' @change='changeHistPage' />
        </div>
        <!-- // 운영권한 관리 영역 -->
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from '@/components/common/Dropdown.vue'
import PagingCmp from '@/components/common/PagingCmp.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import { retrieveCorpHistList, retrieveCorpHistBrandOptions } from '@/api/service/corp'
import uiCommon from '@/components/js/uiCommon'
export default {
  components: {
    Dropdown,
    PagingCmp,
    PageTitleH3
  },
  data() {
    return {
      initTotal: 0,
      userType: '',
      corpAdmYn: '',
      dropdownManageBrandHistory: [],
      dropdownManageBrandType: [
        {
          codeNm: '내 계정',
          code: 'PRIV'
        },
        {
          codeNm: '기업정보',
          code: 'CORP'
        },
        {
          codeNm: '브랜드',
          code: 'BRAND'
        },
        {
          codeNm: '운영자',
          code: 'MEMBER'
        }
      ],
      dropdownManageBrandStatus: [],
      corpHistoryData: {
        formData: {
          userType: '',
          corpAdmYn: '',
          workType: '',
          histType: '',
          corpId: this.corpId,
          page: 1,
          size: 10,
          brandId: ''
        },
        totalCount: 0,
        list: []
      }
    }
  },
  computed: {
    corpId () {
      return this.$router.currentRoute.params.corpId
    }
  },
  created() {
    this.corpAdmYn = this.$router.currentRoute.params.corpAdmYn
    this.userType = this.$router.currentRoute.params.userType
  },
  mounted() {
    this.getCorpHistList()
    this.getCorpHistBrandOptions()
  },
  methods: {
    getCorpHistList () {
      this.corpHistoryData.formData.corpAdmYn = this.corpAdmYn
      this.corpHistoryData.formData.userType = this.userType
      retrieveCorpHistList(this.corpId, this.corpHistoryData.formData).then((res) => {
        this.corpHistoryData.list = res.result.list
        this.corpHistoryData.totalCount = res.result.totalSize
        if (this.initTotal === 0) {
          this.initTotal = res.result.totalSize
        }
      }).catch(e => {
        this.$alertMsg(e.desc)
      })
    },
    changeHistPage(page) {
      this.corpHistoryData.formData.page = page
      this.getCorpHistList()
    },
    getCorpHistBrandOptions () {
      retrieveCorpHistBrandOptions(this.corpId, this.corpHistoryData.formData).then((res) => {
        this.dropdownManageBrandHistory = uiCommon.getDropDownCodes(res.result.list, 'brandNm', 'brandId', true)
      })
    },
    changeBrand() {
      this.getCorpHistList()
    },
    changeWorktype(type) {
      let arr = []
      switch (type) {
        case 'PRIV' :
          arr = [
            { typeNm: '가입', typeId: 'JOIN' },
            { typeNm: '수정', typeId: 'MOD' },
            { typeNm: '탈퇴', typeId: 'LEAVED' }
          ]
          this.dropdownManageBrandStatus = uiCommon.getDropDownCodes(arr, 'typeNm', 'typeId', true)
          break
        case 'BRAND' :
          arr = [
            { typeNm: '임시저장', typeId: 'SAVED' },
            { typeNm: '등록', typeId: 'REG' },
            { typeNm: '수정', typeId: 'MOD' },
            { typeNm: '삭제', typeId: 'DEL' }
          ]
          this.dropdownManageBrandStatus = uiCommon.getDropDownCodes(arr, 'typeNm', 'typeId', true)
          break
        case 'CORP' :
          arr = [
            { typeNm: '등록', typeId: 'REG' },
            { typeNm: '수정', typeId: 'MOD' },
            { typeNm: '삭제', typeId: 'DEL' }
          ]
          this.dropdownManageBrandStatus = uiCommon.getDropDownCodes(arr, 'typeNm', 'typeId', true)
          break
        case 'MEMBER' :
          arr = [
            { typeNm: '가입', typeId: 'JOIN' },
            { typeNm: '수정', typeId: 'MOD' },
            { typeNm: '초대', typeId: 'INVITE' },
            { typeNm: '탈퇴', typeId: 'LEAVED' }
          ]
          this.dropdownManageBrandStatus = uiCommon.getDropDownCodes(arr, 'typeNm', 'typeId', true)
          break
      }
    },
    changeHisttype() {
      this.getCorpHistList()
    }
  }
}
</script>

<style>

</style>
