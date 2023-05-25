<template>
    <div class="tooltip-el"
      @mouseenter="mouseover"
      @mouseleave="toolTipHide"
      @click="calcPosOfBox"
    >{{ posBoxA }}{{ posBoxB }}{{ selfHeight }}
      <ButtonCmp
        type="btn-icon-tooltip"
      >
        <span class="irtext">툴팁</span>
      </ButtonCmp>
      <div
        class="tool-tip__wrap"
        v-if="isTooltip"
        :style="{ 'width': width + 'px' }"
        :class="[mode, direction]"
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
    mode: String
  },
  components: {
    ButtonCmp
  },
  data () {
    return {
      isTooltip: false,
      posBoxA: 0,
      posBoxB: 0,
      selfHeight: 10
    }
  },
  // watch: {
  //   isTooltip(newValue, oldValue) {
  //     if (this.isTooltip === true) {
  //       alert('떳다')
  //       this.posBoxA = this.$refs.tooltipMsg.getBoundingClientRect().x
  //     }
  //     this.posBoxA = this.$refs.tooltipMsg.getBoundingClientRect().x
  //   }
  // },
  // mounted () {
  //   this.calcPosOfBox()
  // },
  methods: {
    mouseover () {
      this.isTooltip = true
    },
    toolTipHide () {
      this.isTooltip = false
      // setTimeout(() => { this.isTooltip = false }, 500)
    }
    // calcPosOfBox () {
    //   this.posBoxA = this.$refs.tooltipMsg.getBoundingClientRect().x
    //   this.posBoxB = this.$refs.tooltipMsg.getBoundingClientRect().y
    //   this.selfHeight = this.$refs.tooltipMsg.clientHeight
    //   console.log(this.$refs.tooltipMsg1)
    // }
  }
}
</script>
