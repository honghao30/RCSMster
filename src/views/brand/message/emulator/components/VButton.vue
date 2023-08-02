<template>
  <div class="template-cmp-button"> <!-- 좌우일 때 : horizontal 추가 -->
    <template v-for="(btn, i) in buttonsInfo.btnList">
      <button type="button" :key="i"
        class="btn-template"
        v-if="btn.btnEvent !== 'none'"
      >
        {{ btn.btnName }}
      </button>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    compoInputObj: {
      type: Array,
      default: null
    }
  },
  data () {
    return {
      buttonsInfo : this.compoInputObj[0],
    }
  }
}
</script>
<style>

</style>
