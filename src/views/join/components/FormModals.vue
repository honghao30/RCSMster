<template>
  <div
    class="modal__content--inner small-message__modal"
    :class="modalsize"
  >
    <slot name="title"></slot>
    <div class="modal__content--body">
      <slot name="modal-body"></slot>
    </div>
    <div class="modal__content--footer">
      <slot name="button"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    messages: String,
    modalsize: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {
    moveChange () {
      this.$router.push('./pwFind')
    }
  }
}
</script>

<style>

</style>
