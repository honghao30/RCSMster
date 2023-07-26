<template>
  <div class="feed-emulator__wrap">
    <div class="feed-emulator">
      <div class="emulator-header" v-if="showBrandHeader">
        <div class="emulator-header__inner">
          <button class="btn-back"><span class="blind">이전으로</span></button>
          <div class="profile"  v-if="brandInfoData">
            <div class="profile__image">
              <img
                v-if="brandInfoData.bgImgFileUrl"
                :src="brandInfoData.bgImgFileUrl"
                alt=""
              >
            </div>
            <p class="brand-name">{{ brandInfoData.name }}</p>
          </div>
        </div>
      </div>
      <div class="emulator-body">
        <p class="feed-date">{{ feedInfoData.updateDate }}</p>
        <h4 class="feed-title">
          <span v-if="feedInfoData.title">{{ feedInfoData.title }}</span>
          <span v-else>제목을 입력해주세요.</span>
        </h4>
        <!-- 슬라이드 타입이 아닌경우 내용 노출       -->
        <p class="feed-content" v-if="feedInfoData.type !== 'slide'">
          <span v-if="feedInfoData.description" v-html="feedInfoData.description"></span>
          <span v-else>내용을 입력해주세요.</span>
        </p>
        <!-- 갤러리 타입인 경우 이미지 노출       -->
        <div class="preview-gallery" v-if="feedInfoData.type === 'gallery'">
          <ul v-if="feedInfoData.media !== undefined"
              class="img-list"
              :class="[{'more' : feedInfoData.media.length > 4 }, `item--${feedInfoData.media.length}`]"
            >
            <template v-for="(imgUrl, i) in feedInfoData.media">
              <li v-if="i < 4" :key="i"
                :class="{'more-link' : i === 3}"
              >
                <span class="image" :style="{backgroundImage: `url(${ imgUrl.url })`}"></span>
                <a role="button" v-if="i === 3"><span>더보기</span></a>
              </li>
            </template>
          </ul>
          <div class="item--none" v-else>
            <p class="img">이미지를 등록해주세요.</p>
          </div>
        </div>
        <!-- 쉐어 타입인 경우 이미지 노출       -->
        <div class="preview-sharing" v-if="feedInfoData.type === 'share'">
          <div class="item--none">
            <img
              v-if="feedInfoData.share.imageUrl"
              :src="feedInfoData.share.imageUrl"
              alt=""
            >
          </div>
        </div>
        <div class="preview-slideview" v-if="feedInfoData.type === 'slide'">
          <div class="preview__inner">
            <swiper
              :options="swiperOption"
              ref="mySwiper"
            >
              <swiper-slide v-for="(slide, i) in feedInfoData.slide" :key="i">
                  <div class="" v-if="slide.type == 'gallery'">
                    <div class="item--none">
<!--                      <p class="img">이미지를 등록해주세요.</p>-->
                      <img
                        v-if="slide.media[0].url"
                        :src="slide.media[0].url"
                        alt=""
                      >
                    </div>
                  </div>
                  <div class="" v-if="slide.type == 'share'">
                    <div class="item--none">
                    <!--                    <p class="url">URL 입력해주세요.</p>-->
                      <img
                        v-if="slide.share.imageUrl"
                        :src="slide.share.imageUrl"
                        alt=""
                      >
                  </div>
                  </div>
                  <div class="slide-content">
                    <p class="title">
                      <span v-if="slide.title">{{ slide.title }}</span>
                      <span v-else>카드 제목을 입력해주세요.</span>
                    </p>
                    <p class="description">
                      <span v-if="slide.description">{{ slide.description }}</span>
                      <span v-else>카드 내용을 입력해주세요.</span>
                    </p>
                  </div>
                  <div class="preview-button"  v-if="slide.buttons !== undefined">
                    <router-link
                      class="btn-bg-gray"
                      to=""
                      v-for="(btn, index) in slide.buttons"
                      :key="index"
                    >
                      {{ btn.btnName }}
                    </router-link>
                  </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
        <div class="preview-button"  v-if="feedInfoData.buttons !== undefined && !this.showThumbnail">
            <router-link
              class="btn-bg-gray"
              to=""
              v-for="(btn, index) in feedInfoData.buttons"
              :key="index"
            >
              {{ btn.btnName }}
            </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { getOgTagInfo } from '@/api/feed/feed'

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
    },
    showThumbnail: {
      type: Boolean
    }
  },
  mounted() {
    this.$watch('showThumbnail', function(newVal, oldVal) {
      // console.log(this.showThumbnail)
    })
  },
  data() {
    return {
      swiperOption: {
        spaceBetween: 10,
        slidesPerView: 'auto'
      }
    }
  },
  methods: {
    // sharing 타입 url입력 후 적용 버튼 클릭 시
    checkOgtag() {
      // <!-- Native이슈로 임시처리(추후 삭제 필요)
      if (this.snsLink.indexOf('youtube') === -1 && this.snsLink.indexOf('youtu.be') === -1) {
        this.$alertMsg('연결 URL은 YouTube만 등록 가능합니다.')
        return
      }
      // Native이슈로 임시처리(추후 삭제 필요) -->

      if (jglib.isUrl(this.snsLink)) {
        getOgTagInfo(encodeURIComponent(this.snsLink)).then(res => {
          if (res.code === '20000000' && res.result.httpCode === 200) {
            this.ogImage = res.result.image

            // <!-- Native이슈로 임시처리(추후 삭제 필요)
            if (res.result.title === '') {
              this.ogTitle = this.title
            } else {
              this.ogTitle = res.result.title.slice(0, 80)
            }
            // Native이슈로 임시처리(추후 삭제 필요) -->

            /* Native이슈로 임시처리(추후 원복 필요) this.ogTitle = res.result.title.slice(0, 80) */

            if (this.snsLink.indexOf('youtube') !== -1 || this.snsLink.indexOf('youtu.be') !== -1) {
              this.youtubeYn = 'Y'
            } else {
              this.youtubeYn = 'N'
            }
            this.ogYn = true
          } else if (res.code === '20000000' && res.result.httpCode > 299 && res.result.httpCode < 400) {
            this.$alertMsg('redirection URL은 등록 불가 합니다.')
          } else {
            this.$alertMsg('연결 URL을 정확히 입력해주세요.')
          }
        })
          .catch(res => {
            this.$alertMsg('연결 URL을 정확히 입력해주세요.')
          })
      } else {
        this.$alertMsg('연결 URL을 정확히 입력해주세요.')
      }
    }
  }
}
</script>
