<template>
  <div class="step__wrap">
    <ol :class="`step--0${stepTitle.length}`">
      <li v-for="(step, i) in stepTitle"
        :key="i"
        :class="[{ing: activeStep === i}, {end: activeStep > i}]"
      >
        <div class="step__inner">
          <i class="step__icon" v-if="activeStep > i"></i>
          <span class="step__num" v-if="activeStep <= i">{{ i + 1 }}</span>
          <span class="step__text">{{ step }}</span>
        </div>
      </li>
    </ol>
  </div>
</template>
<script>
export default {
  props: {
    stepActiveIndex: {
      type: Number,
      default: 0
    },
    stepTitle: Object
  },
  mounted() {
    this.activeStep = this.stepActiveIndex - 1
  },
  data() {
    return {
      activeStep: undefined
    }
  }
}
</script>
