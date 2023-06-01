<template>
  <div class="brand-aside sticky">
    <div class="preview__wrap">
      <div class="preview__image">
        <img src="@/assets/images/dummy/brand_image.png" alt="">
      </div>
      <div class="quick-buttons">
        <a role="button"><i class="icon-tel"></i></a>
        <a role="button"><i class="icon-chat"></i></a>
        <a role="button"><i class="icon-order"></i></a>
        <a role="button"><i class="icon-store"></i></a>
      </div>
      <div class="brand-title">
        <span class="logo">
          <img src="@/assets/images/dummy/brand_logo.png" alt="">
        </span>
        <div class="brand-desc">
          <h4>{{ brand.name }}</h4>
          <p class="brand__text">{{ brand.text }}</p>
        </div>
      </div>
      <div class="brand-detail">
        <TabCmp tabClass="brand-quick__tab" :activeIndex="1">
          <TabItem title="소식">
            <div class="brand-detail_guide">
              <h4>영업시간 안내</h4>
              <p>월~금 : 10:30 ~ 20:00 <br />
                주말 및 공휴일은 휴무입니다.</p>
            </div>
            <ul class="brand-detail_button">
              <li><a role="button"><i class="icon-tel"></i><span>전화하기</span></a></li>
              <li><a role="button"><i class="icon-web"></i><span>웹사이트</span></a></li>
              <li><a role="button"><i class="icon-reservation"></i><span>예약하기</span></a></li>
              <li><a role="button"><i class="icon-chat"></i><span>상담채팅 시작하기</span></a></li>
            </ul>
          </TabItem>
          <TabItem title="정보">
            <dl class="tel">
              <dt>전화번호</dt>
              <dd>{{ form.tel }}</dd>
            </dl>
            <dl class="web">
              <dt>웹사이트</dt>
              <dd>{{ form.url }}</dd>
            </dl>
            <dl class="email">
              <dt>이메일</dt>
              <dd>{{ form.email }}</dd>
            </dl>
            <dl class="address">
              <dt>주소</dt>
              <dd>{{ form.address }}</dd>
            </dl>
          </TabItem>
        </TabCmp>
      </div>
    </div>
  </div>
</template>

<script>

import TabItem from '@/components/common/TabItem.vue'
import TabCmp from '@/components/common/TabCmp.vue'

export default {
  components: {
    TabCmp,
    TabItem
  },
  props: {
    data: Array
  },
  data () {
    return {
      form: {
        quickButton: ['chat', 'call', 'info', 'web'],
        url: 'http://www.nespresso.com',
        email: 'contactus@nespresso.com',
        tel: '080-734-1111',
        address: '서울시 서대문구 충정로70 웨스트게이트타워 16층',
        moreInfoURL: '',
        orderURL: '',
        buyURL: '',
        ticketURL: '',
        storeURL: ''
      },
      brand: {
        name: '네스프레소',
        text: '최상의 품질을 가진 환경에 긍정적인 영향을 줄수있는 커피브랜드 기업'
      }
    }
  }
}
</script>

<style>

</style>
