<template>
  <div
    class="modal__content--inner zipcode__modal large_result"
  >
    <div class="modal__content--header">
      <p class="modal-title">총 4개의 번호 중 <span>2개</span>의 번호가 등록되었습니다.</p>
    </div>
    <div class="modal__content--body">
      <div class="top-notice--gray">
        <ul>
          <li>&middot; 유효하지 않은 번호 : <span>0</span>개</li>
          <li>&middot; 중복된 번호 : <span>0</span>개</li>
          <li>&middot; 이미 등록된 발신번호 : <span>2</span>개</li>
          <li>&middot; 등록 가능 수량 초과 발신번호 : <span>0</span>개</li>
        </ul>
      </div>
      <p class="btn_des">확인 버튼을 선택하시면 승인 요청 결과 파일을 내려받습니다.</p>
    </div>
    <div class="modal__content--footer">
      <div class="button__wrap">
        <router-link
            to="/ChatRoomLargeRegistrationComplete"
            class="btn btn-blue"
          >확인</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
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
