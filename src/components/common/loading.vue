<template>
  <div class="loading">
    <div class="loading-inner">
      <div class="loading-icon"></div>
    </div>
    <div class="loading-msg">{{ msg }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isTimeCheck: false,
      msg: '로딩 중입니다',
      timeOutId: 0
    }
  },
  mounted() {
    this.timeOutId = setTimeout(() => {
      this.isTimeCheck = true
      // 현재 timeOut 30초 설정
    }, 5000)
  },
  watch: {
    isTimeCheck(val) {
      if (this.isTimeCheck) {
        this.msg = '30초~1분 정도 시간이 소요 됩니다. 잠시만 기다려주세요.'
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timeOutId)
  }

}
</script>
