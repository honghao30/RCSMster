<template>
  <div
    class="modal__content--inner zipcode__modal modal-invite"
  >
    <div class="modal__content--header">
      <p class="modal-title">브랜드 운영권한 초대</p>
    </div>
    <!-- case01.기존 회원 운영권한 초대 팝업 -->
    <div class="modal__content--body">
      <div class="search-result__wrap">
        <div class="top-ctrl-area">
          <div class="dropdown-search__wrap">
            <Dropdown :options="dropdownOptions"/>
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
        <!-- 기획서 v1.0 수정: 검색 영역 추가 -->
        <div class="table__wrap">
          <table class="table table-list">
            <colgroup>
              <col width="10%">
              <col width="35%">
              <col width="55%">
            </colgroup>
            <thead>
              <tr>
                <th scope="col">
                  <span class="checkbox">
                    <input type="checkbox" id="all" @change="checkAll"/>
                    <label for="all"></label>
                  </span>
                </th>
                <th scope="col"><span>이름</span></th>
                <th scope="col"><span>이메일</span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in inviteData" :key="i">
                <td>
                  <span class="checkbox">
                    <input type="checkbox" :id="`item${i+1}`" :value="`item${i+1}`" v-model="checkList">
                    <label :for="`item${i+1}`"></label>
                  </span>
                </td>
                <td>
                  <span>{{ item.name }}</span>
                </td>
                <td><span>{{ item.mail }}</span></td>
              </tr>
              <!-- 검색결과 없을 때 -->
              <tr>
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
        <PagingCmp /> <!-- 기획서 v1.0 수정: paging 추가 -->
      </div>
    </div>
    <div class="modal__content--footer">
      <div class="button__wrap">
        <ButtonCmp
          type="btn-blue-line"
          @click="$emit('closeModal')"
        >닫기</ButtonCmp>
        <!-- 검색결과 있을때 disabled 삭제 -->
        <ButtonCmp
          type="btn-blue"
          @click="$emit('closeModal')"
          :disabled="this.checkList.length < 1"
        >초대</ButtonCmp>
      </div>
       <!-- // 검색 결과 없을 시 화면 주석 -->
      <div class="bottom-new--invite">
        찾는 회원이 없다면 이메일로 회원을 초대하세요
        <div class="button__wrap">
          <ButtonCmp
            type="btn-blue"
          >신규 회원 초대</ButtonCmp>
        </div>
      </div>
    </div>

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
import Dropdown from '@/components/common/Dropdown.vue'
import PagingCmp from '@/components/common/PagingCmp.vue'

export default {
  components: {
    ButtonCmp,
    Dropdown,
    PagingCmp
  },
  data() {
    return {
      isAllChecked: false,
      checkList: [],
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
    checkAll() {
      if (!this.isAllChecked) {
        this.checkList = []
        for (let j = 0; j < this.inviteData.length; j++) {
          let num = j + 1
          this.checkList.push(`item${num}`)
        }
        this.isAllChecked = true
      } else { // 선택해제
        this.checkList = []
        this.isAllChecked = false
      }
    }
  }
}
</script>

<style>
</style>
