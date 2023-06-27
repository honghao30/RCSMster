<template>
  <h2 class="page-title">
    {{ pagetitle }}
    <span class="flag-progress"
     v-if="progress"
     :class="stepclass"
    >{{ progress }}</span>
    <span class="num" v-if="num">({{ num }})</span>
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
    stepclass () {
      switch (this.progress) {
        case '승인대기':
          return 'weit'
        case '처리중':
          return 'ing'
        case '반려':
          return 'return'
        case '승인완료':
          return 'done'
        default:
          return ''
      }
    }
  }
}
</script>
