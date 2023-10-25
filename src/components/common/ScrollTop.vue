<template>
    <button
      ref="topButton"
      class="scroll-to-top"
      :class="{ isFixed: isScrollTop }"
      @click="scrollToTop"
    >
       <span class="irtext">위로</span>
    </button>
</template>

<script>
export default {
  data() {
    return {
      scrollY: null, // scroll-to-Top
      isScrollTop: false // scroll-to-Top
    }
  },
  mounted() {
    window.addEventListener('scroll', () => {
      this.scrollY = Math.round(window.scrollY)
    })
  },
  watch: {
    scrollY(newValue) {
      if (newValue >= 100) {
        this.isScrollTop = true
      } else {
        this.isScrollTop = false
      }
      this.scrollPosition = window.scrollY
    }
  },
  methods: {
    scrollToTop (refName) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>
