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
            <a role="button" v-if="this.brandInfoStep2.quickButton.includes('tel')"><i class="icon-tel"></i></a>
            <a role="button" v-if="this.brandInfoStep2.quickButton.includes('chat')"><i class="icon-chat"></i></a>
            <a role="button" v-if="this.brandInfoStep2.quickButton.includes('web')"><i class="icon-web"></i></a>
            <a role="button" v-if="this.brandInfoStep2.quickButton.includes('order')"><i class="icon-order"></i></a>
            <a role="button" v-if="this.brandInfoStep2.quickButton.includes('buy')"><i class="icon-buy"></i></a>
            <a role="button" v-if="this.brandInfoStep2.quickButton.includes('ticket')"><i class="icon-ticket"></i></a>
            <a role="button" v-if="this.brandInfoStep2.quickButton.includes('store')"><i class="icon-store"></i></a>
            <a role="button" v-if="this.brandInfoStep2.quickButton.includes('More info')"><i class="icon-info"></i></a>
          </div>
          <div class="brand-title">
            <span class="logo">
              <img src="@/assets/images/dummy/brand_logo.png" alt="">
            </span>
            <div class="brand-desc">
              <h4>{{ this.brandInfo.brandName }}</h4>
              <p class="brand__text">{{ this.brandInfo.brandDescription }}</p>
            </div>
          </div>
          <div class="brand-detail">
            <TabCmp tabClass="brand-quick__tab">
              <TabItem title="소식">
                <dl class="tel" v-if="this.brandInfoStep3.noticeInfo.includes('call')">
                  <dt>전화하기</dt>
                  <dd>{{ this.brandInfo.tel }}</dd>
                </dl>
                <dl class="web" v-if="this.brandInfoStep3.noticeInfo.includes('website')">
                  <dt>웹사이트</dt>
                  <dd>{{ this.brandInfoStep3.website }}</dd>
                </dl>
                <dl class="tel" v-if="this.brandInfoStep3.noticeInfo.includes('reservation')">
                  <dt>예약하기</dt>
                  <dd>{{ this.brandInfoStep3.reservation }}</dd>
                </dl>
                <dl class="web"  v-if="this.brandInfoStep3.noticeInfo.includes('appdownload')">
                  <dt>앱 다운로드</dt>
                  <dd>{{ this.brandInfoStep3.appdownload }}</dd>
                </dl>
                <dl class="email" v-if="this.brandInfoStep3.noticeInfo.includes('chat')">
                  <dt>상담채팅 시작하기</dt>
                  <dd>{{ this.brandInfoStep3.chat }}</dd>
                </dl>
              </TabItem>
              <TabItem title="정보">
                <dl class="tel">
                  <dt>전화번호</dt>
                  <dd>{{ this.brandInfo.tel }}</dd>
                </dl>
                <dl class="web">
                  <dt>웹사이트</dt>
                  <dd>{{ this.brandInfo.url }}</dd>
                </dl>
                <dl class="email">
                  <dt>이메일</dt>
                  <dd>{{ this.brandInfo.email }}</dd>
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
      stepTitle: ['기본 정보 입력', '퀵 버튼 설정', '브랜드 홈 탭 설정', '브랜드 개설 완료'],
      brandInfo: JSON.parse(localStorage.getItem('brand')) || '',
      brandInfoStep2: JSON.parse(localStorage.getItem('brandStep')) || '',
      brandInfoStep3: JSON.parse(localStorage.getItem('brandStep3')) || ''
    }
  },
  methods: {
    goLogin () {
      // this.$router.push('./login')
    }
  }
}
</script>
