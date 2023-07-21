<template>
  <div class="template-cmp-carousel">
    <swiper
      ref="carousel"
      :options="swiperOption"
    >
      <swiper-slide v-for="(slide, i) in info" :key="i" class="slide">
        <div class="image">
          <img :src="slide.imgFile" />
        </div>
        <div class="description" >
          <p class="title" v-if="slide.title">{{ slide.title }}</p>
          <div class="content">
            <span v-html="slide.content" v-if="slide.content"></span>
            <span v-else>내용을 입력하세요.</span>
          </div>
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
        spaceBetween: 12,
        slidesPerView: 'auto'
      }
    }
  }
}
</script>

<style>

</style>
