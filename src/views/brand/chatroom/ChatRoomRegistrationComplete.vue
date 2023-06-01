<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <div class="registration__complete">
          <h4>대화방 등록 완료</h4>
          <p>대화방 등록이 완료되었습니다.</p>
          <p>관리자의 승인 이전에도 대화방 메뉴를 등록해<br>고객의 요청에 실시간으로 응답할 수 있습니다.</p>
        </div>
        <div class="button__wrap">
          <router-link
            to=""
            class="btn btn-line"
          >대시보드 이동</router-link>
          <router-link
            to=""
            class="btn btn-blue"
          >대화방 메뉴 등록하기</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import BrandLnb from '@/views/brand/components/BrandLnb.vue'

export default {
  components: {
    BrandLnb
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>
