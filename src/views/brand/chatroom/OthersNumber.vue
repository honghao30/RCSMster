<template>
  <div
    class="modal__content--inner zipcode__modal select_phone"
  >
    <div class="modal__content--header">
      <p class="modal-title">타인 소유의 발신번호인 경우</p>
    </div>
    <!-- case01.기존 회원 운영권한 초대 팝업 -->
    <div class="modal__content--body">
      <div class="top-notice">
        <p>- 발신번호 통신서비스 가입증명원에 명시된 소유자의 이름이 다른 경우, 추가적인 서류 증빙이 필요합니다.</p>
        <p>- 타인 명의 발신번호로 대화방 등록 시, 발신번호 소유주의 위탁서 및 발신번호 소유 인증 자료 (아래 표)를 함께 등록하시면 됩니다.</p>
        <p>- 발신번호 위탁서는 <router-link to="#">공지사항 / 서식</router-link> 에서 다운로드 가능합니다.</p>
      </div>
      <div class="search-result__wrap">
        <div class="table__wrap">
          <table class="table table-list">
            <colgroup>
              <col width="20%">
              <col width="20%">
              <col width="20%">
              <col width="20%">
              <col width="20%">
            </colgroup>
            <thead>
              <tr>
                <th rowspan="2" colspan="2"></th>
                <th colspan="3">타인 소유의 발신번호인 경우</th>
              </tr>
              <tr>
                <th>개인</th>
                <th>개인사업자</th>
                <th>법인사업자</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td colspan="2">RCS 발신번호 위탁서</td>
                <td>O</td>
                <td>O</td>
                <td>O</td>
              </tr>
              <tr>
                <td rowspan="4">발신번호<br>소유주</td>
                <td>신분증 사본</td>
                <td>O</td>
                <td>O</td>
                <td></td>
              </tr>
              <tr>
                <td>개인인감증명서</td>
                <td>O</td>
                <td>O</td>
                <td></td>
              </tr>
              <tr>
                <td>사업자등록증</td>
                <td></td>
                <td>O</td>
                <td>O</td>
              </tr>
              <tr>
                <td>법인인감증명서</td>
                <td></td>
                <td></td>
                <td>O</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="modal__content--footer">
      <div class="button__wrap">
        <ButtonCmp
          type="btn-blue"
          @click="$emit('closeModal')"
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
    return {}
  },
  methods: {
  }
}
</script>

<style>
</style>
