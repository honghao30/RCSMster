<template>
  <div class="side__item">
    <ButtonCmp
      type="btn-blue-line"
      class="item-btn"
    >RBC 이용 가이드 다운로드</ButtonCmp>
    <div class="side__banner">
      <div class="banner__info">
        <div class="text__warp">
          <p class="side-title">RCS 발송 규격과<br/>API 연동 정보를 알고 싶으신가요?</p>
        </div>
        <div class="btn__warp">
          <router-link to="" class="side-btn">기술지원 보러가기</router-link>
          <i class="next"></i>
        </div>
      </div>
    </div>
    <div class="side__banner btn-banner">
      <div class="text__warp">
        <p class="side-title">다양한 RCS 기업 메시지</p>
        <p class="side-text">종류별로 베스트 샘플을 모아보았습니다.<br/>확인해 보시겠어요?</p>
      </div>
      <div class="btn__warp">
        <ButtonCmp
          type="btn-blue-line"
          size="medium"
        >메시지 샘플 보기</ButtonCmp>
      </div>
    </div>
    <div class="side__banner">
      <div class="banner__info">
        <div class="text__warp">
          <p class="side-title">양방향 대행사<br/>필요하지 않으세요?</p>
          <p class="side-text">고객과 더 가깝게 소통할 수 있어요.</p>
        </div>
        <div class="btn__warp">
          <router-link to="" class="side-btn">양방향 대행사 보러가기</router-link>
          <i class="next"></i>
        </div>
      </div>
      <div class="side-img"></div>
    </div>
  </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'

export default {
  components: {
    ButtonCmp
  }
}
</script>
