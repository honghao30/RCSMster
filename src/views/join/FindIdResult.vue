<template>
  <div class="rcs_container">
    <article id="content" class="content">
      <div class="box_form_area">
        <div class="top_title_area">
          <h2 class="h2_title">아이디 찾기 / 비밀번호 재설정</h2>
        </div>
        <div class="tab_wrap">
          <ul class="tab_nav">
            <li class="active">
              <a href="javascript:void(0);">아이디 찾기</a>
            </li>
            <li>
              <a href="javascript:void(0);" @click="goPassword">비밀번호 재설정</a>
            </li>
          </ul>
          <div class="tab_container">
            <div class="tab_content active">
              <div class="result_text">
                <span class="h3_desc">입력하신 정보와 일치하는 계정입니다.</span>
                <p class="id">{{ userNm }}</p>
              </div>
              <div class="btn_wrap center mar_t60">
                <a href="javascript:void(0);" class="btn big blue" @click="goLogin">
                  <span>로그인</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  name: 'Utility-03',
  components: {},
  data() {
    return {
      members: [],
      userNm: ''
    }
  },
  created() {
    // router로 받은 부분
    this.$route.params.userNm.forEach((data, index) => {
      this.userNm += data.userId
      if (index < this.$route.params.userNm.length - 1) {
        this.userNm += ', '
      }
    })
  },
  mounted() {},
  computed: {},
  methods: {
    goPassword() {
      this.$router.push('/join/password')
    },
    goLogin() {
      this.$router.push('/login')
    }
  }
}
</script>
