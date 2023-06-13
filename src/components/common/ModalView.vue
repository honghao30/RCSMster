<template>
  <transition
      name="fade"
  >
    <div
    class="modal__wrap"
    >
      <div class="overlay-mask" @click="$emit('closeModal')"></div>
        <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  mounted() {
    document.body.classList.add('modal-open')
  },
  beforeDestroy() {
    document.body.classList.remove('modal-open')
  }
}
</script>
