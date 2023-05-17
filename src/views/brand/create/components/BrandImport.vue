<template>
  <div
    class="modal__content--inner brand__modal zipcode__modal"
  >
    <div class="modal__content--header">
      <p class="modal-title">브랜드 불러오기</p>
    </div>
    <div class="modal__content--body">
      <div class="top-notice--gray">
        <p>- 불러오실 브랜드를 선택해주세요.</p>
        <p>- 브랜드 명, 전화번호 제외 브랜드 정보가 자동으로 입력됩니다.</p>
      </div>
      <div class="search-result__wrap">
        <div class="top-ctrl-area">
        <div class="search-area">
          <span class="input">
            <input type="text" placeholder="브랜드명을 입력하세요."/>
          </span>
          <ButtonCmp
            type="btn-search"
          >검색</ButtonCmp>
        </div>
        <div class="ctrl">
          <div class="pager">
            <span class="num">1/3</span>
            <a role="button" class="btn-prev" ><span class="blind">이전으로</span></a>
            <a role="button" class="btn-next" ><span class="blind">다음으로</span></a>
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
                <th scope="col"><span>브랜드명</span></th>
                <th scope="col"><span>승인일</span></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div class="brand-item">
                    <span class="radiobox">
                      <input type="radio" name="brand" id="brand1" v-model="brand" />
                      <label for="brand1"></label>
                    </span>
                    <span class="logo"></span>
                    <span class="brand-name">브랜드명 1</span>
                  </div>
                </td>
                <td><span class="date">2023.04.12</span></td>
              </tr>
              <!-- <tr>
                <td colspan="2">
                    <div class="result-none">
                      <p>검색결과가 없습니다.</p>
                    </div>
                </td>
              </tr> -->
            </tbody>
          </table>
        </div>
      </div>
      <div class="modal__content--footer">
        <div class="button__wrap">
          <ButtonCmp
            type="btn-blue-line"
            @click="$emit('closeModal')"
          >닫기</ButtonCmp>
          <ButtonCmp
            type="btn-blue"
            @click="$emit('closeModal')"
          >브랜드 불러오기</ButtonCmp>
        </div>
      </div>
    </div>

</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
export default {
  components: {
    ButtonCmp
  },
  data() {
    return {

    }
  },
  methods: {
  }
}
</script>

<style>
</style>
