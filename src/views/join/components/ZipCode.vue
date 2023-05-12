<template>
  <div
    class="modal__content--inner zipcode__modal"
  >
    <div class="zipcode-step1">
      <div class="modal__content--header">
        <p class="modal-title">우편번호 찾기</p>
      </div>
      <div class="modal__content--body">
        <div class="top-search__wrap">
          <div class="search-area">
            <span class="input"><input type="text" placeholder="도로명 또는 건물명(아파트)을 입력해주세요." /></span>
            <ButtonCmp
              type="btn-search"
            >검색</ButtonCmp>
          </div>
          <!-- // validate check error -->
          <!-- <p class="guide-text error">도로명 또는 건물명(아파트)을 입력해주세요.</p>
          <p class="guide-text error">최소 두 글자 이상 입력해주세요.</p>
          <p class="guide-text error">문자와 숫자를 같이 입력해주세요.</p>
          <p class="guide-text error">특수문자, 숫자만으로는 검색이 어렵습니다.</p> -->
        </div>
        <div class="search-result__wrap">
          <div class="top-ctrl-area">
            <p class="total">총 <strong>1,294</strong>건이 검색되었습니다.​</p>
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
                <col width="92px">
              </colgroup>
              <thead>
                <tr>
                  <th scope="col"><span>주소</span></th>
                  <th scope="col"><span>우편번호</span></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="post in 10"
                  :key="post"
                >
                  <td>
                    <div class="addr">
                      <p class="road">서울특별시 강남구 봉은사로 지하102 (역삼동, 신논현역)</p>
                      <p class="place">서울특별시 강남구 역삼동 800 신논현역</p>
                    </div>
                  </td>
                  <td><span class="zipcode">06120</span></td>
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
        <div class="guide-box">
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
          <ButtonCmp
            type="btn-blue"
          >닫기</ButtonCmp>
        </div>
      </div>
    </div>
    <!-- <div class="zipcode-step2">
      <div class="modal__content--header">
        <p class="modal-title">상세 주소 입력</p>
      </div>
      <div class="modal__content--body">
        <div class="detail-addr__wrap">
          <dl class="detail-addr__list">
            <dt>우편번호</dt>
            <dd>06120</dd>
            <dt>도로명</dt>
            <dd>서울특별시 강남구 봉은사로 지하102 (역삼동, 신논현역)</dd>
            <dt>지번</dt>
            <dd>서울특별시 강남구 역삼동 800 신논현역</dd>
          </dl>
          <div class="detail-addr__input">
            <span class="item-label">상세주소</span>
            <div class="input">
              <input type="text" placeholder="상세주소를 입력해주세요."/>
            </div>
          </div>
        </div>
      </div>
      <div class="modal__content--footer">
        <div class="button__wrap">
          <ButtonCmp
            type="btn-blue-line"
          >닫기</ButtonCmp>
          <ButtonCmp
            type="btn-blue"
          >저장</ButtonCmp>
        </div>
      </div>
    </div> -->
  </div>

</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
export default {
  components: {
    ButtonCmp
  }
}
</script>

<style>
</style>
