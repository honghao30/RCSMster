<template>
  <div class="login login-result">
    <div class="login-title__wrap--top">
      <PageTitle pagetitle="아이디 찾기" />
    </div>
    <div class="tab__wrap">
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
        <h3>thefiftyone</h3>
        <!-- // 찾은 아이디 불러오기 -->

      </div>
      <div class="button__wrap">
        <ButtonCmp
          type="btn-blue"
        ><router-link to="/LoginPage">로그인</router-link></ButtonCmp>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
export default {
  components: {
    PageTitle,
    ButtonCmp
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>
