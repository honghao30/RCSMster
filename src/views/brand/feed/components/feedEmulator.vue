<template>
  <div class="feed-emulator__wrap">
    <div class="feed-emulator">
      <div class="emulator-header" v-if="showBrandHeader">
        <div class="emulator-header__inner">
          <button class="btn-back"><span class="blind">이전으로</span></button>
          <div class="profile">
            <div class="profile__image">
              <img :src="require('@/assets/images/' + brandInfoData.profileImgFileUrl)" alt="">
            </div>
            <p class="brand-name">{{ brandInfoData.name }}</p>
          </div>
        </div>
      </div>
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
          <ul v-if="feedInfoData.imgFiles.length > 0"
              class="img-list"
              :class="[{'more' : feedInfoData.imgFiles.length > 4 }, `item--${feedInfoData.imgFiles.length}`]"
            >
            <template v-for="(imgUrl, i) in feedInfoData.imgFiles">
              <li v-if="i < 4" :key="i"
                :class="{'more-link' : i === 3}"
              >
                <span class="image" :style="{backgroundImage: `url(${require('@/assets/images/' + imgUrl)})`}"></span>
                <a role="button" v-if="i === 3"><span>더보기</span></a>
              </li>
            </template>
          </ul>
          <div class="item--none" v-else>
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
              <swiper-slide v-for="(slide, i) in feedInfoData.slideData" :key="i">
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
    brandInfoData: {
      type: Object,
      default: null
    },
    feedInfoData: {
      type: Object
    },
    showBrandHeader: {
      type: Boolean,
      default: true
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
