<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-dash__wrap">
        <div class="brand-dash__list">
          <BrandState :data="data"/>
        </div>
        <div class="brand-dash__content">
          <h4>RBC 비지니스 성과</h4>
          <p>지난 한 달 동안의 측정 결과 입니다.</p>
          <span>(2023.03.01~2023.03.31)</span>
          <ul>
            <li >
              <p></p>
              <span></span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import BrandState from '@/views/brand/dashboard/components/BrandState.vue'

export default {
  components: {
    BrandState,
    BrandLnb
  },
  data() {
    return {
      data: [
        {
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
        },
        {
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
        }
      ]
    }
  }
}
</script>
