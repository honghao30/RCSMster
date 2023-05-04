<template>
  <div class="join-step__wrap">
    <ol>
      <li v-for="(step, i) in stepTitle"
        :key="i"
        :class="[{ing: activeStep === i}, {end: activeStep > i}]"
      >
        <div class="join-step__inner">
          <span>{{ step }}</span>
        </div>
      </li>
    </ol>
  </div>
</template>
<script>
export default {
  props: {
    step: Number,
    agency: Boolean
  },
  data() {
    return {
      stepTitle: [],
      stepTitleCompany: ['약관동의', '기업정보 입력', '회원정보 입력', '가입완료'],
      stepTitleAgency: ['약관동의', '대행사정보 입력', '회원정보 입력', '가입완료'],
      activeStep: this.step - 1
    }
  },
  mounted () {
    if (!this.agency) {
      this.stepTitle = this.stepTitleCompany
    } else {
      this.stepTitle = this.stepTitleAgency
    }
  }
}
</script>

<style>

</style>
