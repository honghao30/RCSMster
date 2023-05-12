<template>
  <div class="signup">
    <div class="signup-title__wrap--top">
      <PageTitle pagetitle="회원가입" />
      <p>회원가입 유형을 선택해주세요</p>
    </div>
    <div class="signup__wrap">
      <div class="signup-item">
        <div class="signup-item__tit">
          <p>서비스를 이용하고 있는<br/><span>기업 담당자</span> 인가요?</p>
        </div>
        <div class="signup-item__des">
          <p>브랜드개설 및 관리가 가능하며<br/>담당자를 초대하여 등록이 가능합니다</p>
          <div class="button__wrap">
            <ButtonCmp type="btn-blue btn-person"><router-link to="/JoinStep01">기업 담당자 회원가입</router-link></ButtonCmp>
          </div>
        </div>
      </div>
      <div class="signup-item">
        <div class="signup-item__tit">
          <p>여러 서비스를 관리하고 있는<br/><span>대행사 담당자</span> 인가요?</p>
        </div>
        <div class="signup-item__des">
          <p>관리자에게 운영권한을 받아 관리가 가능하며<br/>여러 회사의 서비스 운영이 가능합니다</p>
          <div class="button__wrap">
            <ButtonCmp type="btn-blue btn-people"><router-link to="/AgencyJoinStep01">대행사 회원가입</router-link></ButtonCmp>
          </div>
        </div>
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
