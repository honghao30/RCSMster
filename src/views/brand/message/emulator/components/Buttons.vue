<template>
  <div class="template-cmp-button"> <!-- 좌우일 때 : horizontal 추가 -->
    <template v-for="(btn, i) in info">
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
    info: {
      type: Array
    }
  }
}
</script>
<style>

</style>
