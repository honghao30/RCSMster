<template>
  <div class="dashBoard-side">
    <!-- 기업정보 -->
    <div class="side-box side-box__info">
      <div class="side-box__info-top">
        <div class="side-box-top">
          <h4>제22대 국회의원선거 더피프티원</h4>
          <span class="authority master">마스터</span>
          <!-- manager, agency -->
        </div>
        <div class="side-box-middle">
          <span class="id">CO.K0803h0r0O</span>
          <span class="date">2023.03.09</span>
        </div>
      </div>
      <div class="side-box-cont">
        <p>제 22대 국회의원선거를 위해 한시적으로 이용 가능한 계정입니다.</p>
        <p class="period-data">이용 기간 : 2023.01.01~2024.05.30</p>
      </div>
    </div>
    <!-- router -->
    <div class="side-btn">
      <!-- 230616 [a태그 + router-link태그] →  [router-link태그] 수정 -->
      <router-link to="" class="btn btn-blue-line">전체 브랜드 운영 관리</router-link>
    </div>
    <!-- // 전체 브랜드 운영 관리 -->
    <div class="side-box side-box__invite">
      <div class="side-box-top">
        <h4>브랜드 운영자 초대하기</h4>
        <p>함께 관리하고 운영하는 멤버를 초대하세요.</p>
        <p>아직 가입하지 않는 멤버도 초대할 수 있어요.</p>
      </div>
      <div class="invate-button__wrap">
        <router-link to=""  class="btn btn-blue-line medium">브랜드 운영권한 초대</router-link>
      </div>
    </div>
    <!-- 매니저 일 경우 노출 -->
    <div class="side-box side-box__invite">
      <div class="side-box-top">
        <h4>브랜드 운영자 초대하기</h4>
        <p>함께 관리하고 운영하는 멤버를 초대하세요.</p>
      </div>
      <div class="side-box-cont">
        <ul class="invite__step">
          <li>
            <strong>1</strong>
            <a>매니저 초대하기</a>
          </li>
          <li>
            <strong>2</strong>
            <router-link to="" class="step-more">마스터 승격 완료</router-link>
          </li>
        </ul>
      </div>
    </div>
    <!-- // 마스터 계정 설정 -->
    <div class="link-area">
      <router-link to="" class="arrow-link">기업 히스토리</router-link>
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style>

</style>
