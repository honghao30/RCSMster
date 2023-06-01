<template>
  <div class="brand__wrap">
    <div class="brand__inner">
      <BrandLnb />
      <div class="brand-info__wrap">
        <div class="registration__complete">
          <h4>대화방 대량 등록 완료</h4>
          <p>대화방 등록이 완료되었습니다.</p>
          <p>대량으로 등록하신 경우<br>승인 완료된 대화방에만 대화방 메뉴를 등록하실 수 있습니다.</p>
        </div>
        <div class="button__wrap">
          <router-link
            to=""
            class="btn btn-blue"
          >대시보드로 이동</router-link>
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
