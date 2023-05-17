<template>
  <div class="loading">
    <div class="loading-inner"
      :style="{ 'width': size + 'px', 'height': size + 'px' }"
    >
      <div class="loading-icon"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: String
  }
}
</script>

<style lang="scss" scoped>
.loading {
  width: 100%;
  height: auto;
  margin: 0 auto;
  display: flex;
  align-content: center;
  justify-content: center;
}
.loading-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
.loading-icon {
    width: 100%;
    height: 100%;
    border: 3px solid #DCF2FF;
    border-radius: 50%;
    position: relative;
    z-index: 5;
    &:after {
      content: '';
      display: inline-block;
      width: 100%;
      height: 100%;
      border-top: 3px solid transparent;
      border-bottom: 3px solid transparent;
      border-left: 3px solid transparent;
      border-right: 3px solid #2F77FB;
      border-radius: 50%;
      position: absolute;
      top: 0px;
      left: 0px;
      animation: circle-rotate .80s both linear infinite;
    }
  }
  @keyframes circle-rotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
  }
</style>
