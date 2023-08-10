<template>
  <div class="template-cmp-carousel">
    <swiper
      ref="carousel"
      :options="swiperOption"
    >
      <swiper-slide v-for="(slide, i) in info" :key="i" class="slide">
        <div class="image" >
          <img :src="slide.imgFile" />
        </div>
        <p class="title">{{ slide.slideTitle }}</p>
        <div class="description" >
          <span v-html="slide.slideDescription" v-if="slide.slideDescription"></span>
          <span v-else>내용을 입력하세요.</span>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
export default {
  components: {
    Swiper,
    SwiperSlide
  },
  props: {
    info: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      swiperOption: {
        spaceBetween: 10,
        slidesPerView: 'auto'
      }
    }
  }
}
</script>

<style>

</style>
