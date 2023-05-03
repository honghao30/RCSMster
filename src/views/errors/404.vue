<template>
  <div class="rcs_container">
    <article id="content" class="content error_page">
      <div class="error_wrap center">
        <div class="title_area rcs_icon icon_error404">
          <h2 class="h2_title">
            죄송합니다.
            <br>요청하신 페이지를 찾을 수 없습니다. (404 Error)
          </h2>
          <span class="h2_desc mar_t20">
            존재하지 않는 주소를 입력하셨거나 기술적인 문제로 일시적으로 접속되지 않았습니다.
            <br>잠시 후 다시 이용 부탁드리며 이용에 불편을 드려 사과드립니다.
          </span>
        </div>
        <div class="btn_wrap center mar_t60">
          <a href="javascript:void(0);" class="btn big bd_black" @click="back">
            <span>이전</span>
          </a>
          <a href="javascript:void(0);" class="btn big blue" @click="goMain">
            <span>메인</span>
          </a>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  methods: {
    back() {
      this.$router.go(-1)
    },
    goMain() {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="less" scoped>
.word_keep {
  word-break: keep-all;
}
</style>
