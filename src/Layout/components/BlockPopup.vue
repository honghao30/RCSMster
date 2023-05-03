<template>
  <div class="layer active">
    <div class="layer_cont">
      <div class="layer_body">
        <div class="layer_scroll">
          <div class="search_result">
            <div class="box_result_info center">
              운영자에 의해 로그인이 차단되었습니다.
              <br>
              <br>운영자에게 문의하세요.
              <br>1522-5739
            </div>
          </div>
        </div>
      </div>
      <div class="layer_foot">
        <div class="btn_wrap mar_t30">
          <a href="javascript:void(0);" class="btn sml black" @click="goMain">
            <span>확인</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    goMain() {
      this.$parent.view.visibleBlockPopup = false
      this.$router.push('/')
    }
  }
}
</script>
<style>
</style>
