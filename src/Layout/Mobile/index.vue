<template>
  <div id="wrap">
    <router-view></router-view>
    <div class="loading_layer" v-if="visibleLoading">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutMobile',
  computed: {
    visibleLoading() {
      return this.$store.state.ui.visibleLoading
    }
  }
}
</script>
<!-- 로딩바 임시 -->
<style scoped>
  @import '../../assets/add.css';
  @import '../../assets/accordion.css';
  @import '../../assets/default.css';
  .loading_layer .loader {
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 150px;
    height: 150px;
    transform: translate(-50%, -50%);
    -webkit-border-radius: 8px;
    -ms-border-radius: 8px;
    -moz-border-radius: 8px;
    -o-border-radius: 8px;
    border-radius: 8px;
    box-shadow: 0px 60px 120px 0px rgba(0, 0, 0, 0.25);
    background: #fff url('../../assets/images/common/loading.gif') no-repeat 50% 50%
  }
</style>
