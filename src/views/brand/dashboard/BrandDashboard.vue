<template>
  <div class="brand__wrap brand-dash">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-dash__wrap">
        <div class="brand-dash__content">
          <div class="brand-dash__chat">
            <BrandState :data="dataChat"/>
            <ul class="brand-dash__chatbot">
              <li>
                <p>챗봇 사용<br/>대화방</p>
                <span>{{ chatItem.chatbot }}</span>
              </li>
              <li>
                <p>대화방 메뉴 사용<br/>대화방</p>
                <span>{{ chatItem.menu }}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="brand-dash__product">
          <div class="brand-dash__list">
            <BrandState :data="dataGenera"/>
          </div>
          <div class="brand-dash__list">
            <BrandState :data="dataTemplate"/>
          </div>
        </div>
        <div class="brand-dash__content">
          <div class="brand-dash__result">
            <h4>RBC 비지니스 성과</h4>
            <p>지난 한 달 동안의 측정 결과 입니다.
              <span> (2023.03.01~2023.03.31)</span>
            </p>
            <ul>
              <li>
                <p class="result-title">프로필</p>
                <p class="result-data"><span>{{ resultItem.profile }}</span>명의 사용자들에게 노출되었습니다.</p>
              </li>
              <li>
                <p class="result-title">브랜드 홈</p>
                <p class="result-data"><span>{{ resultItem.brand }}</span>명이 방문하였습니다.</p>
              </li>
              <li>
                <p class="result-title">메시지</p>
                <p class="result-data">발송한 메시지에 총 <span>{{ resultItem.message }}</span>명이 반응하였습니다.</p>
              </li>
              <li>
                <p class="result-title">간편챗봇</p>
                <p class="result-data"><span>{{ resultItem.chatbot }}</span>명의 사용자가 챗봇대화(간편챗봇)를 하였습니다.</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="brand-dash__content">
          <div class="brand-dash__template">
            <h4>
              <span class="template-brand">“커피 브랜드”</span> 에서<br />
              많이 사용하는 메시지 템플릿 <span>TOP3</span>
            </h4>
            <p>타브랜드에서도 선호하는 템플릿을 자유롭게 활용해보세요.</p>
          </div>
        </div>
        <div class="brand-dash__banner">
          <h3>챗봇 대행사 필요하지 않으세요?</h3>
          <p>고객과 더 가깝게 소통할 수 있는 챗봇을 사용해보세요.</p>
        </div>
      </div>
      <div class="brand-aside">
        <BrandEmulator :brandInfoData="form" curTab="info"/>
        <div class="side-box side-box__invite">
          <div class="side-box-top">
            <h4>대화방 만들기</h4>
            <p>대화방 메뉴와 챗봇을 등록하면 고객의 불편사항을 더 쉽게 해결할 수 있어요.</p>
          </div>
          <div class="side-box-cont">
            <ul class="invite__step">
              <li>
                <strong>1</strong>
                <a class="step-more"><router-link to="">대화방 정보 등록하기</router-link></a>
              </li>
              <li>
                <strong>2</strong>
                <a class="step-more"><router-link to="">대화방 승인 완료</router-link></a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import BrandEmulator from '@/views/brand/components/BrandEmulator.vue'
import BrandState from '@/views/brand/dashboard/components/BrandState.vue'

export default {
  components: {
    BrandLnb,
    BrandEmulator,
    BrandState
  },
  data() {
    return {
      form: {
        name: '네스프레소',
        desc: '최상의 품질을 가진 환경에 긍정적인 영향을 줄수있는 커피브랜드 기업',
        bgImgFileUrl: 'dummy/brand_image.png',
        profileImgFileUrl: 'dummy/brand_logo.png',
        quickButton: [],
        url: 'http://www.nespresso.com',
        email: 'contactus@nespresso.com',
        tel: '080-734-1111',
        moreInfoURL: '',
        orderURL: '',
        buyURL: '',
        ticketURL: '',
        storeURL: ''
      },
      brendInfo: {},
      dataChat: [{
        title: '대화방',
        number: 982,
        list: [{
          title: '저장',
          number: 912
        },
        {
          title: '대기',
          number: 72
        },
        {
          title: '반려',
          number: 24
        },
        {
          title: '반려',
          number: 652
        }]
      }],
      dataGenera: [{
        title: '일반상품',
        number: 982,
        list: [{
          title: 'SMS',
          number: 912
        },
        {
          title: 'LMS',
          number: 72
        },
        {
          title: 'MMS',
          number: 24
        }]
      }],
      dataTemplate: [{
        title: '템플릿 상품',
        number: 891,
        list: [{
          title: '이미지 템플릿',
          number: 712
        },
        {
          title: 'LMS 템플릿',
          number: 18
        }]
      }],
      chatItem: {
        chatbot: 712,
        menu: 86
      },
      resultItem: {
        profile: '1,089',
        brand: '6,213',
        message: '1,089',
        chatbot: '1,089'
      }
    }
  }
}
</script>
