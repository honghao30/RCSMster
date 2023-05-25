<template>
  <div
    class="modal__content--inner zipcode__modal"
  >
    <div class="modal__content--header">
      <p class="modal-title">대행사 운영권한 부여</p>
    </div>
    <div class="modal__content--body">
      <div class="search-result__wrap">
        <div class="top-ctrl-area">
          <div class="left-area">
            <div class="search-area">
              <span class="input">
                <input type="text" placeholder="검색어를 입력해 주세요."/>
              </span>
            </div>
          </div>
          <div class="right-area">
            <div class="ctrl">
              <div class="pager">
                <span class="num">1/3</span>
                <a role="button" class="btn-prev" ><span class="blind">이전으로</span></a>
                <a role="button" class="btn-next" ><span class="blind">다음으로</span></a>
              </div>
            </div>
          </div>
        </div>
        <div class="table__wrap">
          <table class="table table-list">
            <colgroup>
              <col width="10%">
              <col width="45%">
              <col width="45%">
            </colgroup>
            <thead>
              <tr>
                <th scope="col">
                  <span class="checkbox">
                    <input type="checkbox" id="all" @change="checkAll"/>
                    <label for="all"></label>
                  </span>
                </th>
                <th scope="col"><span>대행사명</span></th>
                <th scope="col"><span>대행사 ID</span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in authorityData" :key="i">
                <td>
                  <span class="checkbox">
                    <input type="checkbox" :id="`item${i+1}`" :value="`item${i+1}`" v-model="checkList">
                    <label :for="`item${i+1}`"></label>
                  </span>
                </td>
                <td>
                  <span>{{ item.name }}</span>
                </td>
                <td><span>{{ item.id }}</span></td>
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
      isAllChecked: false,
      checkList: [],
      authorityData: [
        {
          name: '더피프티원​',
          id: 'T5ONE'
        },
        {
          name: 'CX hub',
          id: 'cxhub'
        },
        {
          name: '대행사명 3',
          id: 'IDID003'
        },
        {
          name: '대행사명 4',
          id: 'IDID004'
        },
        {
          name: '대행사명 5',
          id: 'IDID005'
        },
        {
          name: '대행사명 6',
          id: 'IDID006'
        },
        {
          name: '대행사명 7',
          id: 'IDID007'
        },
        {
          name: '대행사명 8',
          id: 'IDID008'
        },
        {
          name: '대행사명 9',
          id: 'IDID009'
        },
        {
          name: '대행사명 10',
          id: 'IDID010'
        }
      ]
    }
  },
  methods: {
    checkAll() {
      if (!this.isAllChecked) {
        this.checkList = []
        for (let j = 0; j < this.authorityData.length; j++) {
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
