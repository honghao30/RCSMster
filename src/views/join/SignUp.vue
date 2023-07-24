<template>
  <div class="signup">
    <div class="signup-title__wrap--top">
      <PageTitle pagetitle="회원가입" />
      <p>회원가입 유형을 선택해주세요</p>
    </div>
    <div class="signup__wrap">
      <div class="signup-item">
        <div class="signup-item__tit">
          <p>서비스를 이용하고 있는<br/><span>기업인가요?</span></p> <!-- 기획서 v1.0 수정(문구 수정 + span 태그 위치 변경) -->
        </div>
        <div class="signup-item__des">
          <p>브랜드개설 및 관리가 가능하며<br/>담당자를 초대하여 등록이 가능합니다</p>
          <!-- 기획서 v1.0 수정(감싸는 btn 컴포넌트 삭제 + 클래스 추가 + 문구수정) -->
          <div class="button__wrap">
            <router-link to="/JoinStep01" class="btn btn-blue btn-person">운영자 가입</router-link>
          </div>
          <!-- // 기획서 v1.0 수정(감싸는 btn 컴포넌트 삭제 + 클래스 추가 + 문구수정) -->
        </div>
      </div>
      <div class="signup-item">
        <div class="signup-item__tit">
          <p>여러 서비스를 관리하고 있는<br/><span>대행사인가요?</span></p> <!-- 기획서 v1.0 수정(문구 수정 + span 태그 위치 변경) -->
        </div>
        <div class="signup-item__des">
          <p>관리자에게 운영권한을 받아 관리가 가능하며<br/>여러 회사의 서비스 운영이 가능합니다</p>
          <!-- 기획서 v1.0 수정(감싸는 btn 컴포넌트 삭제 + 클래스 추가 + 문구수정) -->
          <div class="button__wrap">
            <router-link to="/AgencyJoinStep01" class="btn btn-blue btn-people">대행사 가입</router-link>
          </div>
          <!-- // 기획서 v1.0 수정(감싸는 btn 컴포넌트 삭제 + 클래스 추가 + 문구수정) -->
        </div>
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
    }
  },
  methods: {
  }
}
</script>
