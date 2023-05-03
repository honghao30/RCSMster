<template>
  <!-- 우편번호 찾기 -->
  <address-custom-popup
    :visible="visible"
    :noBtn="view.noBtnText"
    :yesBtn="view.yesBtnText"
    :zIndex="500"
    :visibleScroll="view.visibleScroll"
    :page="page"
    :isVisibleDescription="isVisibleDescription"
    :visibleDetails="view.visibleDetails"
    @changePage="changePage"
    @close="closePopup"
    kind="custom"
    title="우편번호 찾기"
    boxPY="pb-5"
    ref="addressRef"
  >
    <template v-slot:header>
      <div class="search_wrap mar_t30 mar_b30" v-if="view.visibleSearch">
        <div class="cont_flex_bundle">
          <span class="custom_input full_width">
            <input type="text" placeholder="도로명 또는 건물명(아파트)을 입력해주세요" ref="addressNm" v-model.trim="addressNm" @keypress.enter="search">
          </span>
          <a href="javascript:void(0);" class="btn sml gray" @click="search">
            <span>검색</span>
          </a>
        </div>
      </div>
    </template>
    <div class="search_result" v-if="!view.visibleDetails">
      <p class="total" v-if="view.visibleTotalcount">총<span class="count text_blue" style="display: inline;">{{ page.totalcount | prettyNumber }}</span>건이 검색되었습니다.</p>
      <div class="search_guide" v-if="isVisibleDescription" :class="{'line': view.visibleTotalcount}">
        <p class="text_guide">도로명 주소와 건물번호를 함께 입력하시면 빠르게 결과를 확인하실 수 있습니다.</p>
        <ul class="bullet_list fs16">
          <li>도로명 + 건물번호 (예: 송파대로 570)</li>
          <li>도로명(예 : 강남대로, 중앙1로, 낙산1길)</li>
          <li>건물명, 아파트명 (예: 반포자이아파트)</li>
        </ul>
      </div>
      <!-- 리스트 -->
      <ul class="address_list" v-if="!isVisibleDescription">
        <li v-for="(row, index) in list" :key="`list-${index}`">
          <a href="javascript:void(0);" @click="selectAddr(row)">
            <div class="address">
              <p>
                <strong class="title">도로명</strong>
                <span>{{ row.doroAddressNm }}</span>
              </p>
              <p>
                <strong class="title">지번</strong>
                <span>{{ row.jibunAddressNm }}</span>
              </p>
            </div>
            <div class="zipcode">{{ row.zipCode }}</div>
          </a>
        </li>
      </ul>
      <!-- 리스트 페이징
      <pagination v-if="!isVisibleDescription" :total="page.totalcount" :current-page.sync="page.currentPage" :pageSize="page.size" rangeMax="5" @change="changePage" class="type2"></pagination>
      -->
    </div>
    <!-- 상세주소 입력 -->
    <div class="search_result" v-if="view.visibleDetails">
      <table class="tbl_row_type">
        <caption>
          <strong>우편번호 찾기</strong>
          <p>우편번호, 도로명/지번 주소</p>
        </caption>
        <colgroup>
          <col style="width:120px;">
          <col style="width:auto;">
        </colgroup>
        <tbody>
          <tr>
            <th scope="row">우편번호</th>
            <td>{{ selectedAddr.zipCode }}</td>
          </tr>
          <tr>
            <th scope="row" class="br_b0">도로명</th>
            <td class="br_b0"><p>{{ selectedAddr.doroAddressNm }}</p></td>
          </tr>
          <tr>
            <th scope="row">지번</th>
            <td><p>{{ selectedAddr.jibunAddressNm }}</p></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="search_wrap mar_t30" v-if="view.visibleDetails">
      <span class="custom_input full_width" style="width: 100%">
        <input type="text" placeholder="상세주소를 입력해 주세요." v-model.trim="selectedAddr.detail" @keyup.enter="finish" maxlength="60">
      </span>
    </div>
  </address-custom-popup>
</template>

<script>
import AddressCustomPopup from './AddressCustomPopup'
// import Pagination from '@/components/Pagination'
import { retrieveAddress } from '@/api/common/code'
export default {
  name: 'AddressPopup',
  components: {
    AddressCustomPopup
    // Pagination
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      view: {
        visibleSearch: true,
        visibleTotalcount: false,
        visibleDetails: false,
        noBtnText: '',
        yesBtnText: '',
        visibleScroll: false
      },
      addressNm: '',
      list: [],
      page: {
        totalcount: 0,
        currentPage: 1,
        size: 7
      },
      selectedAddr: {
        doroAddressNm: '',
        jibunAddressNm: '',
        zipCode: '',
        detail: ''
      }
    }
  },
  computed: {
    isVisibleDescription() {
      return parseInt(this.page.totalcount) === 0
    }
  },
  created() {
    this.toggleButton(true)
  },
  mounted() {},
  watch: {
    'view.visibleDetails'(value) {
      if (value) {
        this.setVisibleScroll(false)
      }
    },
    isVisibleDescription(value) {
      if (!value) {
        this.$nextTick(() => {
          this.setVisibleScroll(true)
        })
      }
    }
  },
  methods: {
    search() {
      // validate
      if (jglib.isEmpty(this.addressNm)) {
        this.$alertMsg('도로명 또는 건물명(아파트)을 입력해주세요').then(() => {
          this.$refs.addressNm.focus()
        })
        return false
      }
      this.view.visibleDetails = false
      this.page.currentPage = 1
      this.retrieveAddress()
    },
    retrieveAddress() {
      let params = {
        page: this.page.currentPage,
        size: this.page.size,
        addressNm: this.addressNm
      }
      retrieveAddress(params)
        .then(res => {
          const errorMessage = res.result.errorMessage
          if (errorMessage) {
            this.$alertMsg(errorMessage)
            this.page.totalcount = 0
            this.view.visibleTotalcount = false
            return
          }
          this.list = res.result.addressList
          this.page.totalcount = res.result.totalSize

          this.view.visibleTotalcount = true
          if (this.page.totalcount === 0) {
            this.view.visibleDescription = true
          } else {
            this.view.visibleDescription = false
          }
        })
        .catch(err => {
          console.error('[search]', err)
          this.$alertMsg(err.desc)
        })
    },
    selectAddr(addr) {
      Object.assign(this.selectedAddr, addr)
      this.view.visibleSearch = false
      this.view.visibleDetails = true
      this.toggleButton(false)
    },
    toggleButton(isClose) {
      if (isClose) {
        // 닫기 버튼
        this.view.noBtnText = '닫기'
        this.view.yesBtnText = ''
      } else {
        // 확인
        this.view.noBtnText = ''
        this.view.yesBtnText = '확인'
      }
    },
    closePopup(res) {
      if (this.view.visibleDetails && jglib.isEmpty(this.selectedAddr.detail)) {
        this.$alertMsg('상세주소를 입력해 주세요.')
      } else {
        if (res.ok) {
          let data = {
            zipNo: this.selectedAddr.zipCode,
            roadFullAddr: this.selectedAddr.doroAddressNm,
            detail: this.selectedAddr.detail
          }
          this.$emit('getData', data)
        }
        this.$emit('update:visible', false)
      }
    },
    changePage(page) {
      this.page.currentPage = page
      this.retrieveAddress()
    },
    setVisibleScroll(flag) {
      this.view.visibleScroll = flag
    },
    finish() {
      this.$refs.addressRef.handleWrapperClick('custom', 'yes')
    }
  }
}
</script>
