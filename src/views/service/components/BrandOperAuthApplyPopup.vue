<template>
  <custom-popup
    :visible="visible"
    @close="closePopup"
    kind="custom"
    title="브랜드 운영권한 신청"
    yesBtn="확인"
    noBtn="닫기"
    boxPY="pb-5"
    :zIndex="500"
    class="dv2023_brand-auth"
  >
    <!-- slot 영역 : 사용자가 추가하여 사용 (content영역에 들어감) -->
    <template v-slot:header>
      <div class="search_wrap" v-if="$store.state.user.userType === 'CORP'">
        <div class="cont_flex_bundle">
          <span class="custom_select search_brand">
            <select v-model="selectSearch">
              <option value="BRAND">브랜드 명</option>
              <option value="MDN">발신번호</option>
            </select>
          </span>
          <span class="custom_input">
            <input
              type="text"
              v-model.trim="searchWord"
              placeholder="검색어를 입력하세요."
              @keypress.enter="search"
            >
          </span>
          <a href="javascript:void(0);" class="btn sml gray" @click="search">
            <span>검색</span>
          </a>
        </div>
      </div>
      <div class="search_wrap" v-else>
        <div class="cont_flex_bundle">
          <span class="custom_select search_brand">
            <select v-model="selectSearch">
              <option value="CORP">업체명</option>
              <option value="BRAND">브랜드 명</option>
            </select>
          </span>
          <span class="custom_input">
            <input
              type="text"
              v-model.trim="searchWord"
              placeholder="검색어를 입력하세요."
              @keypress.enter="search"
            >
          </span>
          <a href="javascript:void(0);" class="btn sml gray" @click="search">
            <span>검색</span>
          </a>
        </div>
      </div>
    </template>
    <div v-if="operAuthReqList.length > 0">
      <!-- 브랜드 운영 권한 신청 리스트 (기업) -->
      <div class="search_result" v-if="$store.state.user.userType === 'CORP'">
        <!-- 검색 결과-->
        <table class="tbl_col_type">
          <colgroup>
            <col style="width:45px">
            <col style="width:auto">
            <col style="width:auto">
          </colgroup>
          <thead>
            <tr>
              <th scope="col">
                <span class="custom_checkbox single">
                  <!-- <input type="checkbox" name="checkbox" id="checkAll"> -->
                  <label for="checkAll"></label>
                </span>
              </th>
              <th scope="col">브랜드명</th>
              <th scope="col">발신번호</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in operAuthReqList" :key="index">
              <td>
                <span class="custom_checkbox single">
                  <input
                    type="checkbox"
                    v-model="item.brandCheck"
                    @change="brandCheck"
                    :id="`s07_check_${item.brandId}_${item.defMdn}`"
                  >
                  <label :for="`s07_check_${item.brandId}_${item.defMdn}`"></label>
                </span>
              </td>
              <td>{{item.name}}</td>
              <td>{{item.defMdn}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 브랜드 운영권한 신청 리스트 (대행사) -->
      <div class="search_result" v-if="$store.state.user.userType === 'AGENCY'">
        <!-- 검색 결과-->
        <table class="tbl_col_type">
          <colgroup>
            <col style="width:45px">
            <col style="width:180px">
            <col style="width:auto">
          </colgroup>
          <thead>
            <tr>
              <th scope="col">
                <span class="custom_checkbox single">
                  <input
                    type="checkbox"
                    name="checkbox02"
                    id="checkAll02"
                    @click="allSelected"
                    :checked="allCheckedFlag"
                  >
                  <label for="checkAll02"></label>
                </span>
              </th>
              <th scope="col">업체명</th>
              <th scope="col">브랜드명</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in operAuthReqList" :key="index">
              <td>
                <span class="custom_checkbox single">
                  <input
                    type="checkbox"
                    v-model="item.brandCheck"
                    @change="brandCheck"
                    :id="`s07_check_${item.brandId}`"
                  >
                  <label :for="`s07_check_${item.brandId}`"></label>
                </span>
              </td>
              <td>
                <label :for="`s07_check_${item.brandId}`">{{item.corpNm}}</label>
              </td>
              <td>
                <label :for="`s07_check_${item.brandId}`">{{item.name}}</label>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <template v-slot:checkMsg>
      <div class="box_result_info center" v-if="brandChkCnt !== 0">
        <p>
          <span class="count text_blue">{{brandChkCnt}}</span>개 브랜드의 운영권한을 신청합니다.
        </p>
      </div>
      <!-- 브랜드를 선택 안한 경우-->
      <div class="box_result_info center" v-if="brandChkCnt === 0 && operAuthReqList.length > 0">
        <p class="no_select">브랜드를 선택하세요.</p>
      </div>
    </template>
    <div class="layer_body" v-if="operAuthReqList.length === 0 && searchWord.length !== 0">
      <div class="layer_scroll">
        <div class="search_result">
          <!-- 검색결과가 없는 경우-->
          <div class="box_result_info center">
            <p>검색결과가 없습니다.</p>
          </div>
        </div>
      </div>
    </div>
    <div class="layer_body" v-else-if="operAuthReqList.length === 0">
      <div class="layer_scroll">
        <div class="search_result">
          <!-- 검색결과가 없는 경우-->
          <div class="box_result_info center">
            <p>신청 가능한 브랜드가 없습니다.</p>
          </div>
        </div>
      </div>
    </div>
  </custom-popup>
</template>
<script>
import { CustomPopup } from '@/components/popupSet'

import {
  operationAuthorityPop,
  brandOperationAuthorityReq
} from '@/api/service/service'

export default {
  components: {
    CustomPopup
  },
  props: {
    visible: {
      type: Boolean
    }
  },
  data() {
    return {
      operAuthReqList: [],
      brandChkCnt: 0,
      selectSearch: 'CORP',
      searchWord: ''
    }
  },
  computed: {
    allCheckedFlag() {
      return (
        this.brandChkCnt > 0 && this.brandChkCnt === this.operAuthReqList.length
      )
    }
  },
  created() {
    // 브랜드 운영권한 신청 리스트 조회
    if (this.$store.state.user.userType === 'CORP') {
      this.selectSearch = 'BRAND'
    }
    let reqObj = {
      corpId: this.$store.state.user.corpId,
      userType: this.$store.state.user.userType
    }
    operationAuthorityPop(reqObj).then(res => {
      this.operAuthReqList = res.result.map(item => {
        item.brandCheck = false
        return item
      })
    })
  },
  methods: {
    closePopup(res) {
      if (!res.ok) {
        this.$emit('update:visible', res.ok)
      } else {
        let selectList = _.uniqBy(this.operAuthReqList.filter(item => item.brandCheck), (o) => o.brandId)
        if (selectList.length === 0) {
          // alert창이 뒤에서 나옴..
          // this.$alertMsg('선택 된 브랜드가 없습니다.')
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
                this.$emit('addBrandAuth')
                this.$emit('update:visible', false)
              })
            })
            .catch(e => {})
        }
      }
    },
    brandCheck(brandId) {
      this.brandChkCnt = _.uniqBy(this.operAuthReqList.filter(item => item.brandCheck), (o) => o.brandId).length
    },
    allSelected(e) {
      if (e.target.checked) {
        this.operAuthReqList.forEach(item => {
          item.brandCheck = true
        })
      } else {
        this.operAuthReqList.forEach(item => {
          item.brandCheck = false
        })
      }
      this.brandChkCnt = this.operAuthReqList.filter(
        item => item.brandCheck
      ).length
    },
    search() {
      // 브랜드 운영권한 신청 리스트 조회
      let reqObj = {
        corpId: this.$store.state.user.corpId,
        userType: this.$store.state.user.userType,
        brandNm: this.selectSearch === 'BRAND' ? this.searchWord : '',
        defMdn: this.selectSearch === 'MDN' && this.$store.state.user.userType === 'CORP' ? this.searchWord : '',
        corpNm: this.selectSearch === 'CORP' && this.$store.state.user.userType === 'AGENCY' ? this.searchWord : ''
      }
      this.brandChkCnt = 0
      operationAuthorityPop(reqObj).then(res => {
        this.operAuthReqList = res.result.map(item => {
          item.brandCheck = false
          return item
        })
      })
    }
  }
}
</script>

<style>
</style>
