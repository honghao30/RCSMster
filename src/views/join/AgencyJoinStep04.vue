<template>
  <div class="join">
    <PageTitle pagetitle="대행사 회원가입" />
    <StepList :stepActiveIndex="4" :stepTitle="stepTitle" />
    <div class="join-compt__wrap">
      <!-- 최초인 경우_사업자등록증 제출 -->
      <div class="join-compt__wrap">
        <h3 class="title">계정 등록 요청 완료</h3>
        <p class="text">신청이 완료되었습니다.
        <br />관리자의 승인 전까지 RBC의 기능을 임시로 이용할 수 있으며 승인 완료 시 정상 등록됩니다.</p>
      </div>
      <div class="button__wrap">
        <ButtonCmp
        type="btn-blue-line"
        >HOME</ButtonCmp>
        <ButtonCmp
        type="btn-blue"
        @click="goLogin"
        >로그인</ButtonCmp>
      </div>
      <!-- 최초인 경우_사업자등록증 미제출 -->
      <div class="join-compt__wrap">
        <h3 class="title">임시 계정 등록 완료</h3>
        <p class="text">사업자등록증을 제출하셔야 원활한 서비스 이용이 가능합니다.
        <br />사업자번호 점유 등 악용의 우려가 있어서 7일내 사업자등록증을 제출하지 않는 경우 등록한 모든 데이터가 자동 삭제됩니다.</p>
      </div>
      <div class="button__wrap">
        <ButtonCmp
        type="btn-blue-line"
        >HOME</ButtonCmp>
        <ButtonCmp
        type="btn-blue"
        @click="goLogin"
        >로그인</ButtonCmp>
      </div>
      <!-- 사업자등록증 미제출_동일한 사업자등록번호로 가입 완료되어 있는 경우 -->
      <div class="join-compt__wrap">
        <h3 class="title">계정 등록 요청 완료</h3>
        <p class="text">계정이 등록되었습니다.
        <br />브랜드의 관리자로 지정되어 다양한 RBC 기능을 이용할 수 있습니다.</p>
        <div class="top-notice--gray">
          <p>사업자등록증을 제출하면 다음과 같은 기능을 이용할 수 있습니다.</p>
          <ul>
            <li>&bull; 브랜드 등록 및 관리</li>
            <li>&bull; 브랜드 관리자 지정 및 업무 위임</li>
          </ul>
        </div>
      </div>
      <div class="button__wrap">
        <ButtonCmp
        type="btn-blue-line"
        >HOME</ButtonCmp>
        <ButtonCmp
        type="btn-blue"
        @click="goService"
        >서비스 소개</ButtonCmp>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import StepList from '@/components/common/StepList.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'

export default {
  components: {
    PageTitle,
    StepList,
    ButtonCmp
  },
  data() {
    return {
      stepTitle: ['약관동의', '대행사정보 입력', '회원정보 입력', '가입완료']
    }
  },
  methods: {
    goLogin () {
      this.$router.push('./login')
    },
    goService () {
      this.$router.push('./')
    }
  }
}
</script>
