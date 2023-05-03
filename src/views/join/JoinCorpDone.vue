<template>
  <div class="rcs_container">
    <article id="content" class="content">
      <div class="complete_wrap">
        <div class="box_complete_area">
          <div class="title_area rcs_icon icon_complete type2">
            <h2 class="h2_title">가입 완료</h2>
            <span class="h2_desc">
              로그인 하여 브랜드 부관리자 권한을 신청해 주세요.
              <br>권한을 받은 브랜드의 정보 조회와 발신번호, 템플릿을 관리할 수 있습니다.
            </span>
          </div>
          <div class="btn_wrap center mar_t60">
            <a class="btn mid blue" @click="goLogin">
              <span>로그인</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'JoinCorpDone',
  data() {
    return {}
  },
  methods: {
    goLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style>
</style>
