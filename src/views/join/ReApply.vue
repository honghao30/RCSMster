<template>
  <div class="rcs_container">
    <article id="content" class="content">
      <div class="complete_wrap">
        <div class="box_complete_area">
          <div class="title_area rcs_icon icon_complete">
            <h2 class="h2_title">재신청 완료</h2>
            <span class="h2_desc">
              운영자 심사를 거쳐 승인이 완료된 후에 서비스를 이용하실 수 있습니다.
              <br>가입 승인 결과는 신청 시 입력하신 문자(SMS)와 이메일로 발송 예정입니다.
            </span>
          </div>
          <div class="btn_wrap center mar_t60">
            <a href="javascript:void(0);" class="btn mid blue" @click="goHome">
              <span>메인으로</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
// 스크립트를 정의하는 부분
// 개발자 작업 영역

// [ECMA6] export default 된 부분이 외부에서 import로 사용할 수 있게 된다.
export default {
  // .vue 내부에서 사용되는 model
  // model 기반으로 vue는 동작된다.
  data() {
    return {}
  },
  created() {
    // DOM이 만들어 지기 전 실행 되는 곳
    // Data를 사전에 준비할 경우 사용된다.
  },
  mounted() {
    // DOM에 해당 .vue가 들어가게 되면 실행 되는 곳
    // onload 상태와 동일하다. DOM 이후에 조작할 경우 이곳에서 수행
  },
  computed: {
    // 값이 자주 변경됨에 따라, 관련되어 데이터 혹은 view가 바뀌어야 할 경우 사용
    // method를 바로 연결하면 tic 단위로 계속 실행되기 때문에, 값이 변경할 때만 수행되고,
    // cache로 남는 computed를 활용하는 것이 성능에 좋음
  },
  methods: {
    // .vue 내부에서 사용되는 함수를 정의한다.
    // 이벤트에 따라 실행하거나, 내부적으로 사용되는 함수들을 정의한다.
    goHome() {
      this.$router.push('/')
    }
  }
}
</script>
