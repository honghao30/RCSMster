<template>
  <div
    class="modal__content--inner"
    :class="modalsize"
  >
    <div class="modal__content--header">
      <p class="modal-title">브랜드 운영권한 신청</p>
    </div>
    <div class="modal__content--body">
      <div class="search-result__wrap">
        <div class="top-ctrl-area">
          <div class="left-area">
            <div class="dropdown-search__wrap">
              <Dropdown :options='searchOptions' v-model='operAuthReqList.formData.searchKey' />
              <div class="search-area">
                <span class="input search-box">
                  <input type="text" placeholder="검색어를 입력하세요." v-model='operAuthReqList.formData.searchValue' @keyup.enter='search' />
                  <ButtonCmp
                    type="btn-only-icon"
                    iconname='icon-search'
                    @click='search'
                  >
                  </ButtonCmp>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div class="table__wrap">
          <table class="table table-list">
            <colgroup>
              <col width="10%" />
              <col />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th scope="col">
                  <span class="checkbox">
                    <input type="checkbox" id="all" @change="brandAllCheck"/>
                    <label for="all"></label>
                  </span>
                </th>
                <th scope="col"><span>업체명</span></th>
                <th scope="col"><span>브랜드명</span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,i) in operAuthReqList.list" :key="i">
                <td>
                  <span class="checkbox">
                    <input type="checkbox" :id="`item${i+1}`" :value="item.brandId" v-model="item.brandCheck" >
                    <label :for="`item${i+1}`"></label>
                  </span>
                </td>
                <td  class="l-align"><span>{{ item.corpNm }}</span></td>
                <td class="l-align"><span>{{ item.brandNm }}</span></td>
              </tr>
              <!-- // 브랜드 선택 전 -->
              <!-- 검색결과 없을 때 -->
              <tr v-if='operAuthReqList.totalCount == 0'>
                <td colspan="3">
                  <div class="result-none">
                    <p>검색결과가 없습니다.</p>
                  </div>
                </td>
              </tr>
              <!-- // 검색결과 없을 때 -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <PagingCmp :page-size='operAuthReqList.formData.size' :current-page='operAuthReqList.formData.page' :total='operAuthReqList.totalCount' @change='manageListChange' />
    <div class="modal__content--footer">
      <div class="button__wrap">
        <ButtonCmp
          type="btn-blue-line"
          @click="$emit('closeModal')"
        >닫기</ButtonCmp>
        <ButtonCmp
          type="btn-blue"
          @click="operAuthReq()"
          :disabled="isBrandCheck"
        >신청</ButtonCmp>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import PagingCmp from '@/components/common/PagingCmp.vue'
import uiCommon from '@/components/js/uiCommon'
import { mapGetters } from 'vuex'
import {
  operationAuthorityPop,
  brandOperationAuthorityReq
} from '@/api/service/service'

export default {
  components: {
    ButtonCmp,
    Dropdown,
    PagingCmp
  },
  props: {
    modalsize: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      operAuthReqList: {
        list: [{ brandCheck:false }],
        formData: {
          searchKey: 'brandNm',
          searchValue: '',
          corpId: '',
          page: 1,
          size: 10
        },
        totalCount: 0
      },
      brandChkCnt: 0,
      searchWord: '',
      checkBrands: [],
      searchOptions: [
        { codeNm: '업체명', code: 'corpNm' },
        { codeNm: '브랜드명', code: 'brandNm' }
      ]
    }
  },
  created() {
    // 브랜드 운영권한 신청 리스트 조회
    this.operAuthReqList.formData.userType = this.userType
    if (this.userType === 'CORP') {
      this.operAuthReqList.formData.corpId = this.corpId
    }
    this.search()
  },
  computed: {
    ...mapGetters({
      userType: 'userType',
      corpId: 'corpId'
    }),
    allCheckedFlag() {
      return (
        this.brandChkCnt > 0 && this.brandChkCnt === this.operAuthReqList.list.length
      )
    },
    isBrandCheck() {
      for (let item in this.operAuthReqList.list) {
        if (this.operAuthReqList.list[item].brandCheck === true) {
          return false
        }
      }
      return true
    }
  },
  methods: {
    brandAllCheck(e) {
      for (let item in this.operAuthReqList.list) {
        this.operAuthReqList.list[item].brandCheck = e.target.checked
      }
    },
    manageListChange(page) {
      this.operAuthReqList.formData.page = page
      this.search()
    },
    /* 신청 보내기 */
    operAuthReq () {
      let selectList = _.uniqBy(this.operAuthReqList.list.filter(item => item.brandCheck), (o) => o.brandId)
      if (selectList.length === 0) {
        this.$alertMsg('선택 된 브랜드가 없습니다.')
      } else {
        let formData = new FormData()
        let reqData = { brandList: [] }
        selectList.forEach(item => {
          reqData.brandList.push({
            brandId: item.brandId
          })
        })
        formData.append('data', JSON.stringify(reqData))
        this.$confirmMsg('선택한 브랜드의 운영권한을 신청 하시겠습니까?<br>브랜드 담당자에게 신청자의 이름과 이메일 주소가 공개 됩니다.')
          .then(res => {
            brandOperationAuthorityReq(formData).then(res => {
              this.$emit('closeModal')
              this.$alertMsg('신청 되었습니다.')
            })
          })
          .catch(e => {})
      }
    },
    checkAll() {
      if (!this.isAllChecked) {
        this.checkList = []
        for (let j = 0; j < this.chatRoomList.length; j++) {
          let num = j + 1
          if (!this.chatRoomList[j].disabled) {
            this.checkList.push(`item${num}`)
          }
        }
        this.isAllChecked = true
      } else { // 선택해제
        this.checkList = []
        this.isAllChecked = false
      }
    },
    search() {
      // 브랜드 운영권한 신청 리스트 조회
      operationAuthorityPop(this.operAuthReqList.formData).then(res => {
        this.operAuthReqList.list = res.result.list.map(item => {
          item.brandCheck = false
          return item
        })
        this.operAuthReqList.totalCount = res.result.totalSize
      })
    }
  }
}
</script>

<style>
</style>
