<template>
  <div class="brand__wrap brand-dash">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-dash__wrap">
        <BrandStep
          :stepData='BrandStepData'
        />
        <!-- // 진행 단계 -->
        <div class="brand-dash__content--bottom">
          <div class="brand-dash__content--wrap">
            <div class="brand-dash__product">
              <div class="brand-dash__list">
                <BrandState :data="dataChat"/>
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
              <div class="brand-dash__result">
                <div class="title-area">
                  <h4>추천 템플릿</h4>
                  <p>많이 사용되는 템플릿을 이용해 메시지를 보내보세요.</p>
                  <ButtonCmp
                    type="btn-blue-line"
                    size="medium"
                  >템플릿 메시지 작성</ButtonCmp>
                </div>
                <div class="template__list--wrap">
                  <div class="template-list">
                    <div class="template-item">
                      <h4 class="template-item__title">상품권/티켓형</h4>
                      <div class="template-item__box">
                        <img src="@/assets/images/message/image_template_01.png" alt="">
                      </div>
                    </div>
                    <div class="template-item">
                      <h4 class="template-item__title">이미지 강조형3</h4>
                      <div class="template-item__box">
                        <img src="@/assets/images/message/image_template_02.png" alt="">
                      </div>
                    </div>
                    <div class="template-item">
                      <h4 class="template-item__title">이미지 강조형1</h4>
                      <div class="template-item__box">
                        <img src="@/assets/images/message/image_template_03.png" alt="">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- // 브랜드 대시보드 -->
          <div class="brand-aside">
            <BrandEmulator :brandInfoData="form" curTab="info"/>
            <div class="side-box side-box__banner">
              <router-link to="">
                <img src="../../../assets/images/customer/baner_side.png" alt="">
              </router-link>
            </div>
          </div>
          <!-- // 브랜드 대시보드 사이드 -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import BrandEmulator from '@/views/brand/components/BrandEmulator.vue'
import BrandState from '@/views/brand/dashboard/components/BrandState.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'
import BrandStep from '@/views/brand/dashboard/components/BrandStep.vue'
import TemplateItem from '@/views/brand/message/components/TemplateItem.vue'
import { ImageTemplate } from '@/views/brand/message/templateSampleData.js'

export default {
  components: {
    BrandLnb,
    BrandEmulator,
    ButtonCmp,
    BrandState,
    BrandStep,
    TemplateItem
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
        state: '',
        list: [{
          title: '사용중인 대화방',
          number: 12
        },
        {
          title: 'RCS 양방향',
          number: 72
        },
        {
          title: '대화방 메뉴',
          number: ''
        }]
      }],
      dataTemplate: [{
        title: '템플릿 메시지',
        state: '승인완료',
        list: [{
          title: '텍스트 템플릿',
          number: 12
        },
        {
          title: 'LMS 템플릿',
          number: 18
        },
        {
          title: '이미지 템플릿',
          number: 0
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
      },
      // BrandStepData: {
      //   type: 'chatroom',
      //   chatRoom: 'Y'
      // },
      BrandStepData: {
        type: 'massage',
        chatBot: 'Y',
        chatMenu: 'Y',
        brandInfo: ''
      },
      ImageTemplate
    }
  }
}
</script>
