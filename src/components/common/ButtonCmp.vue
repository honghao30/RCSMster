<template>
  <button
    type="button"
    class="btn"
    :class="[type, size, icondrection]"
    :disabled="disabled"
    @click="$emit('click')"
    @mousedown="$emit('mousedown')"
    >
    <i
      v-if="iconname !== null"
      :class="iconname"
      >
    </i>
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: String,
    disabled: [String, Boolean],
    size: String,
    icondrection: String,
    iconname: {
      type: String,
      default: null
    }
  }
}
</script>
