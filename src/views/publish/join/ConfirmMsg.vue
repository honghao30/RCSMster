<template>
  <div
    class="modal__content--inner small-message__modal"
  >
    <div class="modal__content--body">
      <slot name="msg"></slot>
    </div>
    <div class="modal__content--footer">
      <slot name="button"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    messages: String
  },
  data() {
    return {}
  },
  methods: {
    moveChage () {
      this.$router.push('./pwFind')
    }
  }
}
</script>

<style>

</style>
