<template>
  <div class="step__wrap">
    <ol :class="`step--0${stepTitle.length}`">
      <li v-for="(step, i) in stepTitle"
        :key="i"
        :class="[{ing: getStepActiveIndex === i}, {end: getStepActiveIndex > i}]"
      >
        <div class="step__inner">
          <i class="step__icon" v-if="getStepActiveIndex > i"></i>
          <span class="step__num" v-if="getStepActiveIndex <= i">{{ i + 1 }}</span>
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
    stepTitle: Array
  },
  data() {
    return {
      activeStep: 0
    }
  },
  computed: {
    getStepActiveIndex() {
      return this.stepActiveIndex - 1
    }
  }
}
</script>
