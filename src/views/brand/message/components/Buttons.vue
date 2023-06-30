<template>
  <div class="button-area"
  >
    <template v-if="Object.keys(info).length !== 0">
      <button
        class="btn"
        v-for="(btn, i) in info.buttons" :key="i"
      >
        <span v-if="btn.buttonName">{{ btn.buttonName }}</span>
        <span v-else>버튼</span>
      </button>
    </template>
    <button
        v-else
        class="btn"
      >
        <span>버튼</span>
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
