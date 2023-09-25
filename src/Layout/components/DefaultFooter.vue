<template>
  <footer class="footer">
    <div class="inner"
      :class="{ respons: respons }"
    >
      <ul class="policy-list">
        <li><router-link to='/terms'>이용약관</router-link></li>
        <li><router-link to='/OnlineInquire'>온라인 문의</router-link></li>
        <li><router-link :to='{ name: "joinAgency" }'>대행사 가입</router-link></li>
      </ul>
      <ul class="agency-info">
        <li><span class="tit">SK 텔레콤㈜</span><span>대표이사/사장: 유영상</span><span>사업자등록번호: 104-81-37225</span></li>
        <li><span class="tit">(주)케이티</span><span>대표이사 : 김영섭</span><span>사업자등록번호 : 102-81-42945</span></li>
        <li><span class="tit">㈜엘지유플러스</span><span>대표이사: 황현식</span><span>사업자등록번호 220-81-39938</span></li>
      </ul>
      <ul class="agency-list">
          <li class="tworld">
            <a href="https://www.sktelecom.com/index.html"  target="_blank"></a>
          </li>
          <li class="kt">
            <a href="https://www.kt.com/" target="_blank"></a>
          </li>
          <li class="uplus">
            <a href="https://www.lguplus.com/" target="_blank"></a>
           </li>
      </ul>
      <p class="copyright">© RCS Biz Center</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'DefaultFooter',
  computed: {
    respons () {
      return this.$route.meta.respons === true
    }
  }
}
</script>

<style>

</style>
