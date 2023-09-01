<template>
  <div class="guide__inner">
    <div class="guide-lnb__wrap">
      <GuideLnb :menuData="guideLnbList" />
    </div>
    <div class="guide-info__wrap">
      <div class="title__wrap">
        <h1 class="main-title">RBC 이용 가이드</h1>
        <p class="main-text gray">고객과 성공적인 커뮤니케이션, RCS Biz Center가 함께 합니다.</p>
      </div>
      <div class="button__warp">
        <router-link to="" class="button__item">
          <i class="message"></i>
          <p class="item-text">기업 계정 생성</p>
        </router-link>
        <router-link to="" class="button__item">
          <i class="message"></i>
          <p class="item-text">브랜드 등록</p>
        </router-link>
        <router-link to="" class="button__item">
          <i class="message"></i>
          <p class="item-text">RCS 기업 메시지</p>
        </router-link>
        <router-link to="" class="button__item">
          <i class="message"></i>
          <p class="item-text">주요 기능 이용하기</p>
        </router-link>
      </div>
    </div>
    <div class="guide-side__wrap">
      <GuideSide />
    </div>
  </div>
</template>

<script>
import GuideLnb from '@/views/service/components/AccMenu.vue'
import GuideSide from '@/views/service/components/GuideSide.vue'
import guideLnbList from '@/views/service/components/guideLnb.js'

export default {
  components: {
    GuideLnb,
    GuideSide
  },
  data() {
    return {
      guideLnbList
    }
  },
  methods: {
  }
}
</script>
