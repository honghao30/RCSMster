<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <div class="brand-info__wrap">
        <PageTitle pagetitle="브랜드 개설" />
        <StepList :stepActiveIndex="4" :stepTitle="stepTitle" />
        <div class="step-compt__wrap">
          <h3 class="title">브랜드 개설 요청이 등록되어 승인 대기 중입니다.<br>승인이 완료되면 메일과 문자로 승인 결과가 전달됩니다.</h3> <!-- 기획서 v1.0 수정 (문구 수정) -->
          <p class="text">대화방을 생성하시면 메시지앱의 발신번호를 브랜드 프로필(로고) 및 브랜드명으로 표시할 수 있습니다.<br>등록할 발신번호의 통신사실증명원 사본을 준비하셨다면 대화방을 생성해주세요.</p> <!-- 기획서 v1.0 수정 (문구 수정) -->
          <p class="text-reference">※ 브랜드 개설 승인 및 대화방 생성 승인이 모두 완료되어야 단말에 정상적으로 반영됩니다.</p><!-- 기획서 v1.0 수정 (p태그 추가) -->
        </div>
        <!-- 기획서 v1.0 수정(문구 수정 / 페이지 이동으로 인해 ButtonCmp 컴포넌트 → router-link 태그 변경) -->
        <div class="button__wrap">
          <router-link
            to="/dashboard"
            class="btn btn-line"
          >기업 대시보드</router-link>
          <router-link
            to="/ChatRoomRegistration"
            class="btn btn-blue"
          >대화방 등록</router-link>
        </div>
        <!-- // 기획서 v1.0 수정(문구 수정 / 페이지 이동으로 인해 ButtonCmp 컴포넌트 → router-link 태그 변경) -->
      </div>
      <!-- 기획서 v1.0 수정(brand-aside 태그 삭제) -->
    </div>
  </div>
</template>

<script>
import PageTitle from '@/components/common/PageTitle.vue'
import StepList from '@/components/common/StepList.vue'
// 기획서 v1.0 수정(ButtonCmp, BrandEmulator 미사용으로 인해 삭제)

export default {
  components: {
    PageTitle,
    StepList
    // 기획서 v1.0 수정(ButtonCmp, BrandEmulator 미사용으로 인해 삭제)
  },
  data() {
    return {
      form: {
        quickButton: ['chat', 'call'],
        name: '네스프레소',
        desc: '최상의 품질을 가진 환경에 긍정적인 영향을 줄수있는 커피브랜드 기업',
        bgImgFileUrl: 'dummy/brand_image.png',
        profileImgFileUrl: 'dummy/brand_logo.png',
        url: 'http://www.nespresso.com',
        email: 'contactus@nespresso.com',
        tel: '080-734-1111'
      },
      stepTitle: ['기본 정보 입력', '퀵 버튼 설정', '브랜드 홈 탭 설정', '브랜드 개설 완료']
    }
  },
  methods: {
  }
}
</script>
