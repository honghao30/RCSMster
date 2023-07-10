<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <div class="registration__complete">
          <h4>대화방 등록 완료</h4>
          <p>대화방 등록이 완료되었습니다.</p>
          <!-- 기획서 v1.0 수정 (문구 수정) -->
          <p>RBC 승인  이후 대화방을 사용할 수 있습니다.</p>
        </div>
        <div class="button__wrap">
          <!-- 기획서 v1.0 수정 (문구 수정 + 링크연결) -->
          <router-link
            to="/BrandDashboard"
            class="btn btn-line"
          >브랜드 대시보드</router-link>
          <router-link
            to="/ChatRoomMenuAdd"
            class="btn btn-blue"
          >대화방 메뉴 등록</router-link>
          <!-- // 기획서 v1.0 수정 (문구 수정 + 링크연결) -->
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
