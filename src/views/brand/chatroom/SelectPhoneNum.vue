<template>
  <div
    class="modal__content--inner zipcode__modal select_phone"
  >
    <div class="modal__content--header">
      <p class="modal-title">회신번호 선택</p>
    </div>
    <!-- case01.기존 회원 운영권한 초대 팝업 -->
    <div class="modal__content--body">
      <!-- 기획서 v1.0 수정(문구 삭제 및 수정) -->
      <div class="top-notice--gray">
        <p>- 비전시 상태인 대화방에서 사용중인 발신번호는 선택하실 수 없습니다.</p>
      </div>
      <div class="search-result__wrap">
        <div class="top-ctrl-area">
          <div class="search-area fit-width">
            <span class="input search-box">
              <input type="text" placeholder="검색어를 입력하세요."/>
              <ButtonCmp
                type="btn-only-icon"
                iconname='icon-search'
              >
              </ButtonCmp>
            </span>
          </div>
          <!-- 기획서 v1.0 수정(right-area 클래스 삭제) -->
        </div>
        <div class="table__wrap">
          <table class="table table-list">
            <colgroup>
              <col width="10%">
              <col width="">
            </colgroup>
            <thead>
              <tr>
                <th scope="col" colspan="2"><span>발신번호</span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in 10" :key="i">
                <td>
                  <span class="radiobox">
                    <input type="radio" :id="`item${i+1}`" :value="`item${i+1}`" v-model="radiochk">
                    <label :for="`item${i+1}`"></label>
                  </span>
                </td>
                <td class="l-align">
                  <span>02-3455-255{{ item }}</span>
                </td>
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="modal__content--footer">
      <!-- 기획서 v1.0 수정(PagingCmp 컴포넌트 추가) -->
      <PagingCmp />
      <div class="button__wrap">
        <ButtonCmp
          type="btn-blue-line"
          @click="$emit('closeModal')"
        >닫기</ButtonCmp>
        <!-- 검색결과 있을때 disabled 삭제 -->
        <ButtonCmp
          type="btn-blue"
          @click="$emit('closeModal')"
          :disabled="this.radiochk.length < 1"
        >확인</ButtonCmp>
      </div>
    </div>
    <!-- // 검색 결과 없을 시 화면 주석 -->
    <!-- <div class="bottom-new--invite">
      찾는 회원이 없다면 이메일로 회원을 초대하세요
      <div class="button__wrap">
        <ButtonCmp
          type="btn-blue"
        >신규 회원 초대</ButtonCmp>
      </div>
    </div> -->
    <!-- case02.신규 회원 운영권한 초대 팝업 -->
    <!-- <div class="modal__content--body">
      <div class="search-result__wrap">
        <div class="top-notice--gray">
          <p>-초대하실 분 이메일로 링크를 보내 초대합니다.</p>
          <p>-초대 링크를 통해 가입해야 운영권한이 부여됩니다.</p>
        </div>
        <div class="table__wrap new-invite">
          <table class="table table-bodyonly">
            <colgroup>
              <col>
              <col>
            </colgroup>
            <tbody>
              <tr>
                <th scope="row">초대 브랜드</th>
                <td>SYSTEM STUDIOS</td>
              </tr>
              <tr class="new-mail">
                <th scope="row">이메일</th>
                <td>
                  <div class="new-email-del">
                    <span class="input">
                      <input type="text" placeholder="이메일을 입력해주세요." />
                    </span>
                    <ButtonCmp
                      type="btn-default-line"
                    >삭제</ButtonCmp>
                  </div>
                  <ButtonCmp
                    type="btn-blue-line"
                  >추가</ButtonCmp>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
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
          :disabled="this.checkList.length < 1"
        >초대</ButtonCmp>
      </div>
    </div> -->
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import PagingCmp from '@/components/common/PagingCmp.vue'

export default {
  components: {
    ButtonCmp,
    PagingCmp
  },
  data() {
    return {
      isAllChecked: false,
      radiochk: [],
      isBtnDisabled: true,
      dropdownOptions: [
        {
          label: '이름',
          value: 'name'
        },
        {
          label: '이메일',
          value: 'mail'
        }
      ],
      inviteData: [
        {
          name: '김**',
          mail: 'abcde@studio.com'
        },
        {
          name: '최**',
          mail: 'Fghhii123@studio.com'
        },
        {
          name: '오**',
          mail: 'KLMN00@studio.com'
        },
        {
          name: '장**',
          mail: 'momo@studio.com'
        },
        {
          name: '김**',
          mail: 'ingingMM@studio.com'
        },
        {
          name: '김**',
          mail: 'opQrsT@studio.com'
        },
        {
          name: '홍**',
          mail: 'hohyeonghojae@studio.com'
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
