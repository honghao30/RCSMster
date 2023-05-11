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
