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
      <div class="brand-aside sticky">
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
          <div class="quick-buttons">
            <a role="button" v-if="form.quickButton.includes('tel')"><i class="icon-tel"></i></a>
            <a role="button" v-if="form.quickButton.includes('chat')"><i class="icon-chat"></i></a>
            <a role="button" v-if="form.quickButton.includes('web')"><i class="icon-web"></i></a>
            <a role="button" v-if="form.quickButton.includes('order')"><i class="icon-order"></i></a>
            <a role="button" v-if="form.quickButton.includes('buy')"><i class="icon-buy"></i></a>
            <a role="button" v-if="form.quickButton.includes('ticket')"><i class="icon-ticket"></i></a>
            <a role="button" v-if="form.quickButton.includes('store')"><i class="icon-store"></i></a>
            <a role="button" v-if="form.quickButton.includes('More info')"><i class="icon-info"></i></a>
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
            <TabCmp tabClass="brand-quick__tab">
              <TabItem title="소식">
                <div>소식 디자인 없음</div>
              </TabItem>
              <TabItem title="정보">
                <dl class="tel">
                  <dt>전화번호</dt>
                  <dd>010-2223-5858</dd>
                </dl>
                <dl class="web">
                  <dt>웹사이트</dt>
                  <dd>www.the-51.com</dd>
                </dl>
                <dl class="email">
                  <dt>이메일</dt>
                  <dd>abcd@abcde.com</dd>
                </dl>
              </TabItem>
            </TabCmp>
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
import TabItem from '@/components/common/TabItem.vue'
import TabCmp from '@/components/common/TabCmp.vue'

export default {
  components: {
    PageTitle,
    StepList,
    ButtonCmp,
    TabCmp,
    TabItem
  },
  data() {
    return {
      form: {
        quickButton: ['tel', 'web']
      },
      stepTitle: ['기본 정보 입력', '퀵 버튼 설정', '브랜드 홈 탭 설정', '브랜드 개설 완료'],
    }
  },
  methods: {
    goLogin () {
      // this.$router.push('./login')
    }
  }
}
</script>
