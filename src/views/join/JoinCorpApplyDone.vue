<template>
  <div class="rcs_container">
    <article id="content" class="content">
      <div class="complete_wrap">
        <div class="box_complete_area">
          <div class="title_area rcs_icon icon_complete">
            <h2 class="h2_title">가입신청 완료</h2>
            <span class="h2_desc">
              운영자 심사를 거쳐 승인이 완료된 후에 서비스를 이용하실 수 있습니다.
              <br>가입 승인 결과는 신청 시 입력하신 문자(SMS)와 이메일로 발송 예정입니다.
            </span>
          </div>
          <div class="btn_wrap center mar_t60">
            <a style="width:178px" class="btn mid bd_blue" @click="goMain">
              <span>메인으로</span>
            </a>
            <a class="btn mid blue" @click="goApplyResult">
              <span>가입신청 결과 조회</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'JoinCorpApplyDone',
  methods: {
    goMain() {
      this.$router.push('/')
    },
    goApplyResult() {
      this.$router.push('/join/retriveapply')
    }
  }
}
</script>

<style>
</style>
