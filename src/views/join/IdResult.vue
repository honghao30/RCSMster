<template>
  <div class="login login-result">
    <div class="login-title__wrap--top">
      <PageTitle pagetitle="아이디 / 비밀번호 찾기" /> <!-- 기획서 v1.0 수정(문구 수정) -->
    </div>
    <div class="tab__wrap only-border"> <!-- 기획서 v1.0 수정(only-border 이중클래스 추가) -->
      <ul class="tab-list">
        <li class="tab-item active">
            <router-link
              to="#"
            >
            <span>아이디 찾기</span>
          </router-link>
        </li>
        <li class="tab-item">
            <router-link
              to="/pwFind"
            >
            <span>비밀번호 찾기</span>
          </router-link>
        </li>
        </ul>
    </div>
    <div class="login-result__wrap">
      <div class="login-result__id">
        <p>회원님의 아이디</p>
        <!-- 찾은 아이디 불러오기 -->
        <h3>{{userNm}}</h3>
        <!-- // 찾은 아이디 불러오기 -->

      </div>
      <div class="button__wrap">
        <!-- 기획서 v1.0 수정(감싸는 btn 컴포넌트 삭제 + 클래스 추가 + 링크 변경) -->
        <router-link to="/Login" class="btn btn-blue">로그인</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
export default {
  components: {
    PageTitle
  },
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
  methods: {
    // goPassword() {
    //   this.$router.push('/join/password')
    // },
    // goLogin() {
    //   this.$router.push('/login')
    // }
  }
}
</script>
