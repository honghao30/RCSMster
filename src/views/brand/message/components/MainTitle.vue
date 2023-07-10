<template>
  <div class="main-title">
    <div class="main-title__inner"
    >
      <div class="title--start">
        <span class="logo"
        :style="{'background-image': `url()`}"
        v-if="info.logoUse === 'Y'"
        ></span>
        <p v-if="info.mainTitle">{{ info.mainTitle }}</p>
        <p v-else>제목을 입력하세요.</p>
      </div>
      <div class="title--end" v-if="info.varUse === 'Y'">
        <p style="color:#2F77FB">변수</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },
  props: {
    info: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
    }
  },
  methods: {

  }

}
</script>
