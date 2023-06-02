<template>
  <div class="emulator-body">
    <p class="feed-date">{{ feedInfoData.feedDate }}</p>
    <h4 class="feed-title">
      <span v-if="feedInfoData.feedTitle">{{ feedInfoData.feedTitle }}</span>
      <span v-else>제목을 입력해주세요.</span>
    </h4>
    <p class="feed-content" v-if="feedInfoData.type !== 'slideView'">
      <span v-if="feedInfoData.feedContent" v-html="feedInfoData.feedContent"></span>
      <span v-else>내용을 입력해주세요.</span>
    </p>
    <div class="preview-gallery" v-if="feedInfoData.type === 'gallery'">
      <div class="item--none">
        <p class="img">이미지를 등록해주세요.</p>
      </div>
    </div>
    <div class="preview-sharing" v-if="feedInfoData.type === 'sharing'">
      <div class="item--none">
        <p class="url">URL 입력해주세요.</p>
      </div>
    </div>
    <div class="preview-slideview" v-if="feedInfoData.type === 'slideView'">
      <div class="preview__inner">
        <swiper
          :options="swiperOption"
          ref="mySwiper"
        >
          <swiper-slide v-for="(slide, i) in slideData" :key="i">
              <div class="" v-if="slide.slideType == 'image'">
                <div class="item--none">
                  <p class="img">이미지를 등록해주세요.</p>
                </div>
              </div>
              <div class="" v-if="slide.slideType == 'url'">
                <div class="item--none">
                <p class="url">URL 입력해주세요.</p>
              </div>
              </div>
              <div class="slide-content">
                <p class="title">
                  <span v-if="slide.slideTitle">{{ slide.slideTitle }}</span>
                  <span v-else>슬라이드 제목을 입력해주세요.</span>
                </p>
                <p class="description">
                  <span v-if="slide.slideDescription">{{ slide.slideDescription }}</span>
                  <span v-else>슬라이드 내용을 입력해주세요.</span>
                </p>
              </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
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
    slideData: {
      type: Array
    },
    feedInfoData: {
      type: Object
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
