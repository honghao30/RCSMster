<template>
  <span class="time active" ref="time">{{ time | prettyTime }}</span>
</template>

<script>
export default {
  name: 'Timer',
  props: {
    startTime: {
      type: String,
      default: '03:00' // mm:ss
    }
  },
  data() {
    return {
      time: '',
      polling: '',
      isStart: false
    }
  },
  filters: {
    prettyTime(value) {
      // 시간 형식으로 변환 리턴
      let time = value / 60
      let minutes = parseInt(time)
      let secondes = Math.round((time - minutes) * 60)
      return jglib.pad(minutes, 2) + ':' + jglib.pad(secondes, 2)
    }
  },
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    init() {
      this.time = this.convertTimeToSecond(this.startTime)
    },
    convertTimeToSecond(startTime) {
      // mm:ss 로 받은 시간을 초단위로 변환한다
      let timeArray = startTime.split(':')
      let time = 0
      for (let i = timeArray.length; i > 0; i--) {
        let t = timeArray[i - 1]
        if (i === timeArray.length) {
          // second
          time += parseInt(t)
        } else if (i === timeArray.length - 1) {
          // minute
          time += parseInt(t) * 60
        }
      }
      return time
    },
    start() {
      // 1초에 한번씩 start 호출
      if (this.isStart) {
        this.stop()
        this.reset()
      }
      this.isStart = true
      this.polling = setInterval(() => {
        this.time-- // 1씩 감소
        if (this.time <= 0) this.end()
      }, 1000)
    },
    end() {
      this.stop()
      this.$emit('end')
    },
    stop() {
      clearInterval(this.polling)
    },
    reset() {
      this.stop()
      this.init()
    }
  },
  beforeDestroy() {
    if (this.polling) {
      clearInterval(this.polling)
    }
  }
}
</script>

<style></style>
