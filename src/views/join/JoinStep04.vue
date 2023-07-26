<template>
  <div class="join">
    <PageTitle pagetitle="운영자 회원가입" />
    <StepList :stepActiveIndex="4" :stepTitle="stepTitle" />
      <!-- 최초인 경우_사업자등록증 제출 -->
      <div class="join-compt__wrap">
        <h3 class="title">가입 신청 완료</h3> <!-- 기획서 v1.0 수정 (문구 수정) -->
        <p class="text">가입 신청이 완료되었습니다.
        <br />관리자의 승인 전까지 RBC의 기능을 임시로 이용할 수 있으며 승인 완료 시 정상 등록됩니다.</p> <!-- 기획서 v1.0 수정 (문구 수정) -->
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
        <h3 class="title">가입 신청 완료</h3> <!-- 기획서 v1.0 수정 (문구 수정) -->
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
        <h3 class="title">가입 신청 완료</h3> <!-- 기획서 v1.0 수정 (문구 수정) -->
        <p class="text">가입 신청이 완료되었습니다.
        <br />다양한 RBC 기능을 이용하여 브랜드를 관리할 수 있습니다.</p> <!-- 기획서 v1.0 수정 (문구 수정) -->
        <!-- 기획서 v1.0 수정 (top-notice--gray 클래스 삭제) -->
      </div>
      <div class="button__wrap">
        <ButtonCmp
        type="btn-blue-line"
        >HOME</ButtonCmp>
        <!-- 기획서 v1.0 수정 (서비스 소개 > 로그인으로 변경 / @click 변경) -->
        <ButtonCmp
        type="btn-blue"
        @click="goLogin"
        >로그인</ButtonCmp>
        <!-- // 기획서 v1.0 수정 (서비스 소개 > 로그인으로 변경 / @click 변경) -->
      </div>
      <!-- 기획서 v1.0 수정 ( 운영자 가입 이메일초대 경우, 운영자 가입 불가 안내) -->
      <div class="join-compt__wrap">
        <h3 class="title">운영자 가입 불가 안내</h3>
        <h4 class="text-big">운영자 가입을 할 수 없습니다.</h4>
        <p class="text">관리자에게 이메일 발송을 다시 요청하거나
        <br />1:1문의를 남겨주세요.</p>
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
      <!-- // 기획서 v1.0 수정 ( 운영자 가입 이메일초대 경우, 운영자 가입 불가 안내) -->
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
      stepTitle: ['약관동의', '비지니스 정보 입력', '회원정보 입력', '가입 신청 완료'] //  기획서 v1.0 수정 (문구 수정)
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
