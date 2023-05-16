<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <div class="brand-info__wrap">
        <PageTitle pagetitle="브랜드 개설" />
        <StepList :stepActiveIndex="4" :stepTitle="stepTitle" />
        <div class="step-compt__wrap">
          <h3 class="title">브랜드 개설 완료 </h3>
          <p class="text">브랜드 개설이 완료되었습니다. <br>관리자의 승인 이전에도 고객과의 소통을 미리 준비할 수 있습니다.<br>지금, 대화방 등록부터 시작해보세요.</p>
        </div>
        <div class="button__wrap">
          <ButtonCmp
          type="btn-line"
          >대시보드 이동</ButtonCmp>
          <ButtonCmp
          type="btn-blue"
          >대화방 등록하기</ButtonCmp>
        </div>
      </div>
      <div class="brand-aside">
        <div class="button__wrap">
          <ButtonCmp
            type="btn-blue-line"
          >브랜드 불러오기</ButtonCmp>
          <ButtonCmp
            type="btn-blue-line"
          >브랜드 가이드</ButtonCmp>
        </div>
        <div class="preview__wrap">
          <div class="preview__image">
            <img src="@/assets/images/dummy/brand_image.png" alt="">
          </div>
          <div class="contact-icons">
            <a role="button"><i class="icon-tel"></i></a>
            <a role="button"><i class="icon-chat"></i></a>
            <a role="button"><i class="icon-web"></i></a>
          </div>
          <div class="brand-title">
            <span class="logo">
              <img src="@/assets/images/dummy/brand_logo.png" alt="">
            </span>
            <div class="brand-desc">
              <h4>네스프레소</h4>
              <p class="brand__text">최상의 품질을 가진 환경에 긍정적인 영향을 줄수있는 커피브랜드 기업</p>
            </div>
          </div>
          <div class="brand-detail">
            <ul class="tab">
              <li>소식</li>
              <li class="active">정보</li>
            </ul>
            <dl class="tel">
              <dt>전화번호</dt>
              <dl>{{ form.tel }}</dl>
            </dl>
            <dl class="web">
              <dt>웹사이트</dt>
              <dl>{{ form.url }}</dl>
            </dl>
            <dl class="email">
              <dt>이메일</dt>
              <dl>contactus@nespresso.com</dl>
            </dl>
          </div>
        </div>
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
      stepTitle: ['기본 정보 입력', '퀵 버튼 설정', '브랜드 홈 탭 설정', '브랜드 개설 완료'],
      form: {
        url: 'http://www.nespresso.com',
        email: 'contactus@nespresso.com',
        tel: '080-734-1111'
      }
    }
  },
  methods: {
    goLogin () {
      // this.$router.push('./login')
    }
  }
}
</script>
