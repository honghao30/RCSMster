<template>
    <div class="tooltip-el"
      @mouseenter="mouseover"
      @mouseleave="toolTipHide"
    >
       <span ref="trigger">
        <ButtonCmp
          type="btn-icon-tooltip"
        >
          <span class="irtext">툴팁</span>
        </ButtonCmp>
       </span>
      <div
        class="tool-tip__wrap"
        :style="{'width': width + 'px'}"
        v-if="isActive"
        :class="[mode, direction, elAlign, {'active': isActive}]"
        ref="tooltipMsg"
      >
        <slot name="tooltip-message"></slot>
      </div>
    </div>
</template>

<script>
import ButtonCmp from '@/components/common/ButtonCmp.vue'

export default {
  props: {
    direction: String,
    width: String,
    mode: String,
    elAlign: String
  },
  components: {
    ButtonCmp
  },
  data () {
    return {
      isActive: false,
      selHeight: '',
      topPos: '',
      bottomPos: ''
    }
  },
  methods: {
    mouseover () {
      this.isActive = true
      this.$nextTick()
    },
    toolTipHide () {
      // this.isActive = true
      setTimeout(() => { this.isActive = false }, 300)
    }
  }
}
</script>
