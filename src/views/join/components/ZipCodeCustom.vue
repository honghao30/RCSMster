<template>
  <div class="modal__content--inner zipcode__modal">
    <div class="zipcode-step1" v-if="view.visibleSearch">
      <div class="modal__content--header">
        <p class="modal-title">우편번호 찾기</p>
      </div>
      <div class="modal__content--body">
        <div class="top-search__wrap">
          <div class="search-area">
            <span class="input">
              <input type="text" placeholder="도로명 또는 건물명(아파트)을 입력해주세요." ref="addressNm" v-model.trim="addressNm" @keypress.enter="search"/>
            </span>
            <ButtonCmp type="btn-search" @click="search">검색</ButtonCmp>
          </div>
          <p class="guide-text error" v-if="error.addressSearch">{{ error.addressSearch }}</p>
          <!-- // validate check error -->
          <!-- <p class="guide-text error" >도로명 또는 건물명(아파트)을 입력해주세요.</p>
          <p class="guide-text error">최소 두 글자 이상 입력해주세요.</p>
          <p class="guide-text error">문자와 숫자를 같이 입력해주세요.</p>
          <p class="guide-text error">특수문자, 숫자만으로는 검색이 어렵습니다.</p> -->
        </div>
        <div class="search-result__wrap" v-if="view.visibleTotalcount">
          <div class="top-ctrl-area">
            <p class="total">총 <strong>{{ page.totalcount | prettyNumber }}</strong>건이 검색되었습니다.</p>
            <div class="ctrl">
              <div class="pager">
                <span class="num">{{ page.currentPage | prettyNumber }}/{{ Math.floor(page.totalcount / page.size) + 1 | prettyNumber }}</span>
                <a role="button" class="btn-prev" @click="prevPage">
                  <span class="blind">이전으로</span>
                </a>
                <a role="button" class="btn-next" @click="nextPage">
                  <span class="blind">다음으로</span>
                </a>
              </div>
            </div>
          </div>
          <div class="table__wrap">
            <table class="table table-list">
              <colgroup>
                <col>
                <col width="92px">
              </colgroup>
              <thead>
                <tr>
                  <th scope="col"><span>주소</span></th>
                  <th scope="col"><span>우편번호</span></th>
                </tr>
              </thead>
              <tbody>
                <template v-if="page.totalcount > 0">
                  <tr v-for="(row, index) in list" :key="`list-${index}`" @click="selectAddr(row)">
                    <td>
                      <div class="addr">
                        <p class="road">{{ row.doroAddressNm }}</p>
                        <p class="place">{{ row.jibunAddressNm }}</p>
                      </div>
                    </td>
                    <td><span class="zipcode">{{ row.zipCode }}</span></td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <td colspan="2">
                        <div class="result-none">
                          <p>검색결과가 없습니다.</p>
                        </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </div>
        </div>
        <div class="guide-box" v-if="isVisibleDescription">
          <p class="main-text">도로명 주소와 건물번호를 함께 입력하면 빠르게 찾을 수 있습니다.</p>
          <ul>
            <li>&middot; 도로명 + 건물번호 <span class="sm">예) 송파대로 570</span></li>
            <li>&middot; 도로명 <span class="sm">예) 강남대로, 중앙1로, 낙산1길</span></li>
            <li>&middot; 건물명, 아파트명 <span class="sm">예) 반포자이아파트</span></li>
          </ul>
        </div>
      </div>
      <div class="modal__content--footer">
        <div class="button__wrap">
          <ButtonCmp type="btn-blue" @click="$emit('closeModal')">닫기</ButtonCmp>
        </div>
      </div>
    </div>
    <div class="zipcode-step2" v-if="view.visibleDetails">
      <div class="modal__content--header">
        <p class="modal-title">상세 주소 입력</p>
      </div>
      <div class="modal__content--body">
        <div class="detail-addr__wrap">
          <dl class="detail-addr__list">
            <dt>우편번호</dt>
            <dd>{{ selectedAddr.zipCode }}</dd>
            <dt>도로명</dt>
            <dd>{{ selectedAddr.doroAddressNm }}</dd>
            <dt>지번</dt>
            <dd>{{ selectedAddr.jibunAddressNm }}</dd>
          </dl>
          <div class="detail-addr__input">
            <span class="item-label">상세주소</span>
            <div class="input">
              <input type="text" placeholder="상세주소를 입력해주세요." v-model.trim="selectedAddr.detail" @keyup.enter="closePopup" maxlength="60"/>
            </div>
          </div>
        </div>
      </div>
      <div class="modal__content--footer">
        <div class="button__wrap">
          <ButtonCmp type="btn-blue-line" @click="$emit('closeModal')">닫기</ButtonCmp>
          <ButtonCmp type="btn-blue" :disabled="isVisibleSaveButton" @click="closePopup">저장</ButtonCmp>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import { retrieveAddress } from '@/api/common/code'

export default {
  components: {
    ButtonCmp
  },
  data() {
    return {
      view: {
        visibleSearch: true,
        visibleTotalcount: false,
        visibleDetails: false,
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
      },
      error: {
        addressSearch: '',
        addressDetail: ''
      }
    }
  },
  computed: {
    isVisibleDescription() {
      return parseInt(this.page.totalcount) === 0
    },
    isVisibleSaveButton() {
      return jglib.isEmpty(this.selectedAddr.detail)
    }
  },
  methods: {
    search() {
      // validate
      if (jglib.isEmpty(this.addressNm)) {
        this.error.addressSearch = '도로명 또는 건물명(아파트)을 입력해주세요'
        this.$refs.addressNm.focus()
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
    },
    prevPage() {
      if (this.page.currentPage > 1) {
        this.page.currentPage--
        this.retrieveAddress()
      }
    },
    nextPage() {
      if (this.page.currentPage < Math.floor(this.page.totalcount / this.page.size) + 1) {
        this.page.currentPage++
        this.retrieveAddress()
      }
    },
    closePopup() {
      if (this.view.visibleDetails && jglib.isEmpty(this.selectedAddr.detail)) {
        this.error.addressDetail = '상세주소를 입력해 주세요.'
      } else {
        let data = {
          zipNo: this.selectedAddr.zipCode,
          roadFullAddr: this.selectedAddr.doroAddressNm,
          detail: this.selectedAddr.detail
        }

        this.$emit('closeModal', data)
      }
    }
  }
}
</script>

<style>
</style>
