<template>
  <div
    class="modal__content--inner"
    :class="modalsize"
  >
    <div class="modal__content--header">
      <p class="modal-title">브랜드 운영권한 초대</p>
    </div>
    <div class="modal__content--body">
      <div class="top-notice--center invite-brand">
        <p>초대 브랜드</p>
        <Dropdown :options="dropdownBarndInviteOptions" placeholder="브랜드를 선택하세요." />
      </div>
      <div class="search-result__wrap">
        <div class="top-ctrl-area">
          <div class="left-area">
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
                    <input type="checkbox" id="all" @change="checkAll"/>
                    <label for="all"></label>
                  </span>
                </th>
                <th scope="col"><span>이름</span></th>
                <th scope="col"><span>이메일</span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,i) in barndInviteData" :key="i">
                <td>
                  <span class="checkbox">
                    <input type="checkbox" :id="`item${i+1}`" :value="`item${i+1}`" v-model="checkList" :disabled="item.disabled">
                    <label :for="`item${i+1}`"></label>
                  </span>
                </td>
                <td  class="l-align"><span>{{ item.name }}</span></td>
                <td class="l-align"><span>{{ item.mail }}</span></td>
              </tr>
              <!-- 브랜드 선택 전 -->
              <tr>
                <td colspan="3">
                  <div class="result-none">
                    <p>브랜드를 선택해주세요.</p>
                  </div>
                </td>
              </tr>
              <!-- // 브랜드 선택 전 -->
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
          :disabled="this.checkList.length < 1"
        >신청</ButtonCmp>
      </div>
      <div class="new-invite-box">
        <p>찾는 회원이 없다면 이메일로 회원을 초대하세요.</p>
        <ButtonCmp
          type="btn-blue"
          @click="$emit('newMemberInvite')"
        >신규 회원 초대</ButtonCmp>
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
      checkList: [],
      dropdownBarndInviteOptions: [
        {
          label: 'SYSTEM STUDIOS',
          value: '01'
        },
        {
          label: 'LANVIN COLLECTION',
          value: '02'
        },
        {
          label: '더캐시미어',
          value: '03'
        },
        {
          label: '클럽모나코​',
          value: '04'
        }
      ],
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
      barndInviteData: [
        {
          name: '김*미',
          mail: 'abcde@studio.com'
        },
        {
          name: '최*라',
          mail: 'Fghij123@studio.com'
        },
        {
          name: '오*동',
          mail: 'KLMN00@studio.com'
        },
        {
          name: '홍*동',
          mail: 'hohyeonghojea@stuio.com'
        },
        {
          name: '사*라',
          mail: 'sarasara1234@stuio.com'
        }
      ]
    }
  },
  methods: {
    checkAll() {
      if (!this.isAllChecked) {
        this.checkList = []
        for (let j = 0; j < this.barndInviteData.length; j++) {
          let num = j + 1
          if (!this.barndInviteData[j].disabled) {
            this.checkList.push(`item${num}`)
          }
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
