<template>
  <div class="button-area"
  >
    <template v-if="Object.keys(info).length !== 0">
      <button
        class="btn"
        v-for="(btn, i) in info.buttons" :key="i"
        :style="`background-color:${info.bgColor};color:#fff;`"
      >
      {{ btn.bgColor }}
        <span v-if="btn.buttonName">{{ btn.buttonName }}</span>
        <span v-else>버튼명을 입력하세요.</span>
      </button>
    </template>
    <button
        v-else
        class="btn"
      >
        <span>버튼명을 입력하세요.</span>
      </button>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object
    }
  }
}
</script>
<style>

</style>
