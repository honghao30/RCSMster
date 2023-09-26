<template>
  <div
    class="modal__content--inner small-message__modal main-case"
    :class="modalsize"
  >
    <slot name="msg">
    </slot>
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
  methods: {}
}
</script>
