<template>
  <div
    class="modal__content--inner zipcode__modal select_phone"
  >
    <div class="modal__content--header">
      <p class="modal-title">대화방 선택</p>
    </div>
    <div class="modal__content--body">
      <div class="search-result__wrap">
        <div class="top-ctrl-area">
          <div class="left-area">
            <div class="search-area">
              <span class="input search">
                <input type="text" placeholder="대화방명을 입력해주세요."/>
              </span>
            </div>
          </div>
        </div>
        <div class="table__wrap">
          <table class="table table-list">
            <colgroup>
              <col>
              <col width="45%">
              <col width="45%">
            </colgroup>
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">대화방명</th>
                <th scope="col"><span>발신번호/챗봇ID</span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, i) in chatList" :key="i">
                <td>
                  <span class="radiobox">
                    <input type="radio" :id="`item${i+1}`" :value="`item${i+1}`" v-model="radiochk">
                    <label :for="`item${i+1}`"></label>
                  </span>
                </td>
                <td>
                  <span>{{ item.name }}</span>
                </td>
                <td>
                  <span>{{ item.number }}</span>
                </td>
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
          type="btn-line"
          @click="$emit('closeModal')"
        >취소</ButtonCmp>
        <!-- 검색결과 있을때 disabled 삭제 -->
        <ButtonCmp
          type="btn-blue"
          @click="$emit('closeModal')"
          :disabled="this.radiochk.length < 1"
        >확인</ButtonCmp>
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
      radiochk: [],
      isBtnDisabled: true,
      chatList: [
        {
          name: '롯데홈쇼핑',
          number: '023352286'
        },
        {
          name: 'SYSTEM HOMME',
          number: 'bot-i7ke7f30e6b'
        },
        {
          name: 'LANVIN COLOCTION',
          number: '023352286'
        },
        {
          name: '더캐시미어',
          number: '023352286'
        },
        {
          name: '타미힐피거',
          number: '023352286'
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
