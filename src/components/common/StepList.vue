<template>
  <div class="step__wrap">
    <ol>
      <li v-for="(step, i) in stepTitle"
        :key="i"
        :class="[{ing: activeStep === i}, {end: activeStep > i}]"
      >
        <div class="step__inner">
          <span>{{ step }}</span>
        </div>
      </li>
    </ol>
  </div>
</template>
<script>
export default {
  props: {
    stepActiveIndex: Number,
    stepTitle: Object
  },
  data() {
    return {
      activeStep: this.stepActiveIndex - 1
    }
  },
  mounted () {
  }
}
</script>
