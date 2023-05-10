<template>
  <div class="join">
    <PageTitle pagetitle="기업담당자 회원가입" />
    <StepList :stepActiveIndex="4" :stepTitle="stepTitle" />
    <div class="join-compt__wrap">
    <h3 class="title">회원가입이 완료되었습니다.</h3>
    <!-- 마스터인 경우 -->
    <p class="text">관리자의 승인 이전에도 즉시 자유롭게 콘텐츠를 등록/관리 할 수 있습니다.
    <br />지금 로그인해서 브랜드를 만들어보세요.</p>
    <!-- 매니저인 경우 -->
    <!-- <p class="text">관리자의 승인 이후 로그인하여 서비스를 이용할 수 있습니다.</p> -->
  </div>
  <div class="button__wrap">
    <ButtonCmp
    type="btn-blue-line"
    >HOME</ButtonCmp>
    <ButtonCmp
    type="btn-blue"
    >로그인</ButtonCmp>
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
      stepTitle: ['약관동의', '기업정보 입력', '회원정보 입력', '가입완료']
    }
  },
  methods: {
  }
}
</script>
