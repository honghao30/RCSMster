<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <PageTitle pagetitle="브랜드 운영 관리" />
        <!-- 초대 및 권한 부여 박스 -->
        <div class="case__wrap">
          <div class="case-box__wrap">
            <p>함께 브랜드를 운영할 <span>마스터와 매니저를</span> 초대하세요</p>
            <div class="button__wrap">
              <ButtonCmp
                type="btn-blue"
              >마스터 / 매니저 초대</ButtonCmp>
            </div>
          </div>
          <div class="case-box__wrap">
            <p>효율적 운영을위해 대행사에게 <span>운영권한을</span> 주세요</p>
            <div class="button__wrap">
              <ButtonCmp
                type="btn-blue"
              >대행사 운영권한 부여 </ButtonCmp>
            </div>
          </div>
        </div>
        <PageTitleH3 titleh3="권한관리" />
      </div>
    </div>
  </div>
</template>

<script>

import BrandLnb from '@/views/brand/components/BrandLnb.vue'
import PageTitle from '@/components/common/PageTitle.vue'
import PageTitleH3 from '@/components/common/PageTitleH3.vue'
import ButtonCmp from '@/components/common/ButtonCmp.vue'

export default {
  components: {
    PageTitle,
    ButtonCmp,
    PageTitleH3,
    BrandLnb
  },
  data() {
    return {
    }
  },
  watch: {
  },
  computed: {
  },
  methods: {
  }
}
</script>
