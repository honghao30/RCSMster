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
              <Dropdown :options="dropdownBarndOptions"/>
              <div class="search-area">
                <span class="input search-box">
                  <input type="text" placeholder="검색어를 입력하세요."/>
                  <ButtonCmp
                    type="btn-only-icon"
                    iconname='icon-search'
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
              <col>
              <col>
            </colgroup>
            <thead>
              <tr>
                <th scope="col"><span>업체 명</span></th>
                <th scope="col"><span>브랜드명</span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,i) in brandAuthorityData" :key="i">
                <td class="l-align">
                  <span class="radiobox">
                    <input type="radio" :id="`item${i+1}`" :value="`item${i+1}`" v-model="radiochk">
                    <label :for="`item${i+1}`"></label>
                  </span>
                  <span>{{ item.company }}</span>
                </td>
                <td class="l-align"><span>{{ item.brand }}</span></td>
              </tr>
              <!-- 검색결과 없을 때 -->
              <tr>
                <td colspan="2">
                  <div class="result-none">
                    <p>검색결과가 없습니다.</p>
                  </div>
                </td>
              </tr>
              <!-- // 검색결과 없을 때 -->
              <!-- 신청 가능 기업 없을 때 -->
              <tr>
                <td colspan="2">
                  <div class="result-none">
                    <p>신청 가능한 브랜드가 없습니다.</p>
                  </div>
                </td>
              </tr>
              <!-- // 신청 가능 기업 없을 때 -->
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <PagingCmp />
    <div class="modal__content--footer">
      <div class="button__wrap">
        <ButtonCmp
          type="btn-blue-line"
          @click="$emit('closeModal')"
        >닫기</ButtonCmp>
        <ButtonCmp
          type="btn-blue"
          @click="$emit('closeModal')"
          :disabled="this.radiochk.length < 1"
        >신청</ButtonCmp>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import Dropdown from '@/components/common/Dropdown.vue'
import PagingCmp from '@/components/common/PagingCmp.vue'

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
      isAllChecked: false,
      radiochk: [],
      dropdownBarndOptions: [
        {
          label: '브랜드 명',
          value: 'default'
        },
        {
          label: '발신번호',
          value: 'tel'
        }
      ],
      brandAuthorityData: [
        {
          company: '㈜미디어로그',
          brand: '가나한'
        },
        {
          company: '㈜미디어로그',
          brand: '한섬'
        },
        {
          company: '㈜미디어로그',
          brand: 'CJ푸드'
        },
        {
          company: '㈜미디어로그',
          brand: '롯데정보통신'
        },
        {
          company: '㈜미디어로그',
          brand: '롯데정보통신'
        }
      ]
    }
  },
  methods: {
  }
}
</script>

<style>
</style>
