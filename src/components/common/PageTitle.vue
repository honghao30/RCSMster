<template>
  <h2 class="page-title">
    {{ pagetitle }}
    <span class="num" v-show="num !== null && num !== undefined">({{ num }})</span>
    <span class="flag-progress"
     v-if="progress"
     :class="stepclass"
    >{{ progress }}</span>
  </h2>
</template>

<script>
export default {
  props: {
    pagetitle: String,
    progress: String,
    num: Number
  },
  computed: {
    stepclass() {
      const progressMap = {
        '승인대기': 'weit',
        '임시저장': 'weit',
        '미사용': 'weit',
        '처리중': 'ing',
        '반려': 'return',
        '승인완료': 'done',
        '사용': 'done'
      }

      return progressMap[this.progress] || ''
    }
  }
}
</script>
